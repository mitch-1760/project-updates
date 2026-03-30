import { useState, useCallback, useEffect, useRef } from 'react'

/**
 * Manages task statuses, notes, and timestamps per employee per week.
 *
 * Storage strategy:
 *   - localStorage for instant reads (no loading spinner)
 *   - Upstash Redis (via /api/state) for shared persistence
 *   - On mount: load localStorage immediately, then fetch Redis and merge (Redis wins if newer)
 *   - On change: write localStorage instantly, debounce Redis writes (500ms)
 *   - Poll Redis every 30s to pick up changes from other users
 */

const STATUS_CYCLE = ['pending', 'progress', 'done']
const DEBOUNCE_MS = 500
const POLL_MS = 30000

function storageKey(employeeId, week) {
  return `deliverables:${employeeId}:w${week.number}:${week.year}`
}

const EMPTY = { tasks: {}, notes: {}, updatedAt: null }

function loadLocal(key) {
  try {
    const raw = localStorage.getItem(key)
    if (raw) return JSON.parse(raw)
  } catch { /* ignore */ }
  return EMPTY
}

function saveLocal(key, state) {
  try { localStorage.setItem(key, JSON.stringify(state)) } catch { /* ignore */ }
}

async function fetchRemote(key) {
  try {
    const res = await fetch(`/api/state?key=${encodeURIComponent(key)}`)
    if (!res.ok) return null
    const { data } = await res.json()
    if (!data) return null
    return typeof data === 'string' ? JSON.parse(data) : data
  } catch { return null }
}

async function pushRemote(key, state) {
  try {
    await fetch(`/api/state?key=${encodeURIComponent(key)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(state),
    })
  } catch { /* fail silently, localStorage is the fallback */ }
}

export function useDeliverableState(employeeId, week) {
  const key = storageKey(employeeId, week)
  const [state, setState] = useState(() => loadLocal(key))
  const debounceRef = useRef(null)
  const keyRef = useRef(key)
  keyRef.current = key

  // On mount + key change: fetch remote and merge if newer
  useEffect(() => {
    let cancelled = false
    fetchRemote(key).then(remote => {
      if (cancelled || !remote) return
      setState(prev => {
        if (remote.updatedAt && (!prev.updatedAt || remote.updatedAt > prev.updatedAt)) {
          saveLocal(key, remote)
          return remote
        }
        return prev
      })
    })
    return () => { cancelled = true }
  }, [key])

  // Poll for remote changes every 30s
  useEffect(() => {
    const interval = setInterval(() => {
      fetchRemote(keyRef.current).then(remote => {
        if (!remote) return
        setState(prev => {
          if (remote.updatedAt && (!prev.updatedAt || remote.updatedAt > prev.updatedAt)) {
            saveLocal(keyRef.current, remote)
            return remote
          }
          return prev
        })
      })
    }, POLL_MS)
    return () => clearInterval(interval)
  }, [])

  const touch = useCallback((updater) => {
    setState(prev => {
      const next = { ...updater(prev), updatedAt: Date.now() }
      saveLocal(keyRef.current, next)

      // Debounced push to Redis
      if (debounceRef.current) clearTimeout(debounceRef.current)
      debounceRef.current = setTimeout(() => {
        pushRemote(keyRef.current, next)
      }, DEBOUNCE_MS)

      return next
    })
  }, [])

  const cycleTask = useCallback((dayKey, taskId) => {
    touch(prev => {
      const taskKey = `${dayKey}-${taskId}`
      const current = prev.tasks[taskKey] || 'pending'
      const idx = STATUS_CYCLE.indexOf(current)
      const next = STATUS_CYCLE[(idx + 1) % STATUS_CYCLE.length]
      return { ...prev, tasks: { ...prev.tasks, [taskKey]: next } }
    })
  }, [touch])

  const getTaskStatus = useCallback((dayKey, taskId) => {
    return state.tasks[`${dayKey}-${taskId}`] || 'pending'
  }, [state.tasks])

  const setNote = useCallback((noteKey, text) => {
    touch(prev => ({
      ...prev,
      notes: { ...prev.notes, [noteKey]: text },
    }))
  }, [touch])

  const getNote = useCallback((noteKey) => {
    return state.notes[noteKey] || ''
  }, [state.notes])

  const getDayProgress = useCallback((dayKey, taskCount) => {
    let done = 0
    let inProgress = 0
    for (let i = 1; i <= taskCount; i++) {
      const s = state.tasks[`${dayKey}-${i}`]
      if (s === 'done') done++
      else if (s === 'progress') inProgress++
    }
    return { done, inProgress, total: taskCount }
  }, [state.tasks])

  return {
    cycleTask,
    getTaskStatus,
    setNote,
    getNote,
    getDayProgress,
    updatedAt: state.updatedAt,
  }
}

export { STATUS_CYCLE }
