import { useState, useCallback } from 'react'
import { EMPLOYEES, TAG_COLORS } from './data/employees'
import { useDeliverableState } from './hooks/useDeliverableState'
import './App.css'

// ---- Helpers ----

function dayKey(day) {
  return day.day.toLowerCase()
}

function relativeTime(ts) {
  if (!ts) return null
  const diff = Date.now() - ts
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  return `${days}d ago`
}

function formatSlackExport(day, progress, taskStatuses, dayNote, taskNotes) {
  const statusIcon = { pending: '\u2022', progress: '\u25B6', done: '\u2713' }
  let text = `*${day.day}, ${day.date}* \u2014 ${day.project}\n`
  text += `${day.focus}\n`
  text += `Progress: ${progress.done}/${progress.total} done`
  if (progress.inProgress > 0) text += `, ${progress.inProgress} in progress`
  text += `\n\n`
  for (const t of day.tasks) {
    const s = taskStatuses[t.id] || 'pending'
    text += `${statusIcon[s]} ${t.task} (${t.est})\n`
    const tn = taskNotes[t.id]
    if (tn) text += `   _\u2192 ${tn}_\n`
  }
  if (dayNote) {
    text += `\n_Day notes: ${dayNote}_\n`
  }
  return text
}

// ---- Components ----

function Tag({ tag }) {
  const style = TAG_COLORS[tag] || { bg: 'var(--gold-glow)', color: 'var(--gold)', border: 'var(--border-active)' }
  return (
    <span className="tag" style={{ background: style.bg, color: style.color, borderColor: style.border }}>
      {tag}
    </span>
  )
}

function StatusCheckbox({ status, onClick }) {
  return (
    <button
      className={`status-check ${status}`}
      onClick={onClick}
      title={`Status: ${status}. Click to cycle.`}
      aria-label={`Task status: ${status}`}
    >
      {status === 'done' && (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      )}
      {status === 'progress' && (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M3.5 2L7.5 5L3.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      )}
    </button>
  )
}

function ProgressRing({ done, total, size = 24 }) {
  const pct = total > 0 ? done / total : 0
  const r = (size - 4) / 2
  const circ = 2 * Math.PI * r
  const offset = circ * (1 - pct)

  return (
    <svg className="progress-ring" width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--bg-elevated)" strokeWidth="2.5" />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={pct === 1 ? 'var(--accent-green)' : 'var(--gold)'} strokeWidth="2.5"
        strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
        style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%', transition: 'stroke-dashoffset 0.4s ease' }}
      />
    </svg>
  )
}

function InlineNote({ value, onChange, placeholder }) {
  const [open, setOpen] = useState(!!value)

  return (
    <div className="inline-note">
      {!open ? (
        <button className="inline-note-toggle" onClick={() => setOpen(true)}>
          {value ? (
            <span className="inline-note-preview">{value.slice(0, 80)}{value.length > 80 ? '...' : ''}</span>
          ) : (
            <span className="inline-note-add">+ note</span>
          )}
        </button>
      ) : (
        <div className="inline-note-editor">
          <textarea
            className="inline-note-input"
            placeholder={placeholder || 'Add a note...'}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            rows={2}
            autoFocus
          />
          <button className="inline-note-close" onClick={() => setOpen(false)}>&#10005;</button>
        </div>
      )}
    </div>
  )
}

function DayNotes({ value, onChange }) {
  const [open, setOpen] = useState(!!value)

  return (
    <div className="day-notes">
      <button className="notes-toggle" onClick={() => setOpen(!open)}>
        <span className="notes-icon">&#9998;</span>
        <span>Day Notes</span>
        {value && !open && <span className="notes-preview">{value.slice(0, 60)}{value.length > 60 ? '...' : ''}</span>}
        <span className={`notes-chevron ${open ? 'open' : ''}`}>&#9662;</span>
      </button>
      {open && (
        <textarea
          className="notes-textarea"
          placeholder="Add notes for this day..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
        />
      )}
    </div>
  )
}

function CopyButton({ onClick }) {
  const [copied, setCopied] = useState(false)

  const handleClick = () => {
    onClick()
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button className={`copy-btn ${copied ? 'copied' : ''}`} onClick={handleClick} title="Copy status for Slack">
      {copied ? (
        <>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7L6 10L11 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span>Copied</span>
        </>
      ) : (
        <>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="4.5" y="1.5" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><path d="M9.5 4.5H3a1.5 1.5 0 00-1.5 1.5v5A1.5 1.5 0 003 12.5h5a1.5 1.5 0 001.5-1.5V4.5z" stroke="currentColor" strokeWidth="1.2"/></svg>
          <span>Copy for Slack</span>
        </>
      )}
    </button>
  )
}

function DayPanel({ data, state, dayIdx }) {
  const dk = dayKey(data)
  const totalHours = data.tasks.reduce((sum, t) => sum + parseFloat(t.est), 0)
  const isRyse = data.project === 'RYSE'
  const progress = state.getDayProgress(dk, data.tasks.length)
  const note = state.getNote(dk)

  const taskStatuses = {}
  const taskNotes = {}
  for (const t of data.tasks) {
    taskStatuses[t.id] = state.getTaskStatus(dk, t.id)
    taskNotes[t.id] = state.getNote(`${dk}-task-${t.id}`)
  }

  const handleCopy = () => {
    const text = formatSlackExport(data, progress, taskStatuses, note, taskNotes)
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="panel" key={data.day}>
      <div className="panel-header">
        <div>
          <div className="panel-title-row">
            <h2 className="panel-day">{data.day}</h2>
            <span className="panel-date">{data.date}</span>
            <span className={`project-badge ${isRyse ? 'ryse' : 'ghl'}`}>{data.project}</span>
          </div>
          <div className="panel-focus">{data.focus}</div>
        </div>
        <div className="panel-header-right">
          <div className="panel-progress-badge">
            <ProgressRing done={progress.done} total={progress.total} size={28} />
            <span className="progress-text">{progress.done}/{progress.total}</span>
          </div>
          <div className="panel-hours">
            <span className="hours-num">{totalHours}</span>
            <span className="hours-unit">hours</span>
          </div>
        </div>
      </div>

      <div className="tasks-list">
        {data.tasks.map((task) => {
          const status = state.getTaskStatus(dk, task.id)
          const taskNoteKey = `${dk}-task-${task.id}`
          const taskNote = state.getNote(taskNoteKey)
          return (
            <div key={task.id} className={`task-row status-${status}`}>
              <StatusCheckbox status={status} onClick={() => state.cycleTask(dk, task.id)} />
              <div className="task-content">
                <p className={`task-text ${status === 'done' ? 'task-done' : ''}`}>{task.task}</p>
                <div className="task-meta">
                  <Tag tag={task.tag} />
                  <span className="task-est">{task.est}</span>
                </div>
                <InlineNote
                  value={taskNote}
                  onChange={(text) => state.setNote(taskNoteKey, text)}
                  placeholder="Add a note for this task..."
                />
              </div>
            </div>
          )
        })}
      </div>

      <div className="panel-actions">
        <DayNotes value={note} onChange={(text) => state.setNote(dk, text)} />
        <CopyButton onClick={handleCopy} />
      </div>

      <div className="panel-footer">
        <div className="done-section">
          <div className="section-tag green">Definition of Done</div>
          <p className="section-body">{data.done}</p>
        </div>
        {data.blockers.length > 0 && (
          <div className="blockers-section">
            <div className="section-tag red">Blockers</div>
            {data.blockers.map((b, i) => (
              <p key={i} className="section-body">{b}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function OverviewPanel({ employee, state }) {
  const totalHours = Object.values(employee.hours).reduce((a, b) => a + b, 0)

  const projectGroups = {}
  for (const day of employee.days) {
    const proj = day.project
    const dayHours = day.tasks.reduce((sum, t) => sum + parseFloat(t.est), 0)
    projectGroups[proj] = (projectGroups[proj] || 0) + dayHours
  }

  // Overall progress
  let totalTasks = 0, totalDone = 0, totalInProgress = 0
  for (const day of employee.days) {
    const dk = dayKey(day)
    const p = state.getDayProgress(dk, day.tasks.length)
    totalTasks += p.total
    totalDone += p.done
    totalInProgress += p.inProgress
  }

  return (
    <div className="panel" key="overview">
      <div className="overview-stats">
        <div className="ov-stat">
          <div className="ov-stat-value gold">{totalHours}h</div>
          <div className="ov-stat-label">Total</div>
        </div>
        {Object.entries(projectGroups).map(([proj, hrs]) => (
          <div key={proj} className="ov-stat">
            <div className={`ov-stat-value ${proj === 'RYSE' ? 'ryse' : 'ghl'}`}>{hrs}h</div>
            <div className="ov-stat-label">{proj}</div>
          </div>
        ))}
        <div className="ov-stat">
          <div className="ov-stat-value gold">
            <div className="ov-progress-row">
              <ProgressRing done={totalDone} total={totalTasks} size={32} />
              <span>{totalDone}/{totalTasks}</span>
            </div>
          </div>
          <div className="ov-stat-label">Tasks Done</div>
        </div>
      </div>

      <div className="overview-grid">
        <div className="overview-col">
          <div className="ov-section">
            <div className="ov-section-title">Hour Allocation</div>
            <div className="allocation-grid">
              {Object.entries(employee.hours).map(([tag, hours]) => (
                <div key={tag} className="alloc-item">
                  <div className="alloc-bar-track">
                    <div className="alloc-bar-fill" style={{ width: `${(hours / totalHours) * 100}%`, background: TAG_COLORS[tag]?.color || 'var(--gold)' }} />
                  </div>
                  <div className="alloc-info">
                    <Tag tag={tag} />
                    <span className="alloc-hours">{hours}h</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {employee.priorities && (
            <div className="ov-section">
              <div className="ov-section-title">Carry-Forward Priority</div>
              <div className="priority-stack">
                {employee.priorities.map((p) => (
                  <div key={p.project} className="priority-card">
                    <div className={`priority-card-header ${p.project === 'RYSE' ? 'ryse' : 'ghl'}`}>{p.project}</div>
                    <ol className="priority-list">
                      {p.items.map((item, j) => (
                        <li key={j}>{item.text} {item.note && <span className="pn">({item.note})</span>}</li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="overview-col">
          {employee.openQuestions && employee.openQuestions.length > 0 && (
            <div className="ov-section">
              <div className="ov-section-title">Open Questions for {employee.name}</div>
              <div className="questions-list">
                {employee.openQuestions.map((q, i) => (
                  <div key={i} className="question-row">
                    <div className="question-number">Q{i + 1}</div>
                    <div className="question-content">
                      <span className={`question-project ${q.project === 'RYSE' ? 'ryse' : 'ghl'}`}>{q.project}</span>
                      <p>{q.q}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {employee.notifications && employee.notifications.length > 0 && (
            <div className="ov-section">
              <div className="ov-section-title">Slack Notifications</div>
              <div className="notif-table">
                <div className="notif-header-row">
                  <div className="notif-cell head">Event</div>
                  <div className="notif-cell head">Notify</div>
                </div>
                {employee.notifications.map((row, i) => (
                  <div key={i} className="notif-row">
                    <div className="notif-cell">{row.event}</div>
                    <div className="notif-cell notify">{row.who}</div>
                  </div>
                ))}
                <div className="notif-channel">All via #internal-crm-project</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function App() {
  const [activeEmployee, setActiveEmployee] = useState(0)
  const [activeTab, setActiveTab] = useState(0)

  const employee = EMPLOYEES[activeEmployee]
  const totalHours = Object.values(employee.hours).reduce((a, b) => a + b, 0)
  const overviewIdx = employee.days.length

  const state = useDeliverableState(employee.id, employee.week)

  return (
    <div className="app">
      {/* Top bar */}
      <header className="topbar">
        <div className="topbar-brand">
          <span className="logo-mark">1760</span>
          <span className="topbar-sep">/</span>
          <span className="topbar-title">Deliverables</span>
        </div>

        <div className="person-selector">
          {EMPLOYEES.map((emp, i) => (
            <button
              key={emp.id}
              className={`person-btn ${activeEmployee === i ? 'active' : ''}`}
              onClick={() => { setActiveEmployee(i); setActiveTab(0) }}
            >
              <span className="person-avatar">{emp.initials}</span>
              <span className="person-name">{emp.name}</span>
            </button>
          ))}
        </div>

        <div className="topbar-meta">
          <span>W{employee.week.number}</span>
          <span className="topbar-dot" />
          <span>{employee.week.year}</span>
        </div>
      </header>

      {/* Day tabs with progress */}
      <nav className="day-tabs">
        {employee.days.map((d, i) => {
          const isRyse = d.project === 'RYSE'
          const totalH = d.tasks.reduce((sum, t) => sum + parseFloat(t.est), 0)
          const dk = dayKey(d)
          const prog = state.getDayProgress(dk, d.tasks.length)

          return (
            <button
              key={d.day}
              className={`day-tab ${activeTab === i ? 'active' : ''} ${isRyse ? 'ryse' : 'ghl'}`}
              onClick={() => setActiveTab(i)}
            >
              <span className="tab-short">{d.short}</span>
              <span className="tab-date">{d.date}</span>
              <span className="tab-progress-row">
                <ProgressRing done={prog.done} total={prog.total} size={16} />
                <span className="tab-hours">{prog.done}/{prog.total}</span>
              </span>
            </button>
          )
        })}
        <button
          className={`day-tab overview-tab ${activeTab === overviewIdx ? 'active' : ''}`}
          onClick={() => setActiveTab(overviewIdx)}
        >
          <span className="tab-short">All</span>
          <span className="tab-date">Overview</span>
          <span className="tab-hours">{totalHours}h</span>
        </button>
      </nav>

      {/* Content */}
      <main className="content">
        {activeTab < overviewIdx ? (
          <DayPanel data={employee.days[activeTab]} state={state} dayIdx={activeTab} />
        ) : (
          <OverviewPanel employee={employee} state={state} />
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <span>Owner: <strong>{employee.name}</strong></span>
        <span className="footer-sep">|</span>
        <span>Reviewer: <strong>{employee.reviewer}</strong></span>
        <span className="footer-sep">|</span>
        <span>{employee.projects.join(' + ')}</span>
        {state.updatedAt && (
          <>
            <span className="footer-sep">|</span>
            <span className="footer-updated">Updated {relativeTime(state.updatedAt)}</span>
          </>
        )}
      </footer>
    </div>
  )
}

export default App
