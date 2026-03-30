/**
 * Employee Deliverables Data
 * ----------------------------------------------------------
 * To add a new employee:
 *   1. Add a new object to the EMPLOYEES array below
 *   2. Each employee needs: id, name, initials, role, week, reviewer, projects, days, hours, openQuestions, notifications (optional), priorities
 *   3. That's it — the UI picks it up automatically
 */

export const TAG_COLORS = {
  'ryse-testing': { bg: 'var(--accent-amber-dim)', color: 'var(--accent-amber)', border: 'rgba(251, 191, 36, 0.25)' },
  'ryse-phase2': { bg: 'var(--accent-purple-dim)', color: 'var(--accent-purple)', border: 'rgba(167, 139, 250, 0.25)' },
  'ryse-admin': { bg: 'var(--accent-blue-dim)', color: 'var(--accent-blue)', border: 'rgba(96, 165, 250, 0.25)' },
  'ryse-infra': { bg: 'var(--accent-teal-dim)', color: 'var(--accent-teal)', border: 'rgba(45, 212, 191, 0.25)' },
  'ghl-mcp': { bg: 'var(--accent-green-dim)', color: 'var(--accent-green)', border: 'rgba(74, 222, 128, 0.25)' },
  'crm-build': { bg: 'var(--accent-blue-dim)', color: 'var(--accent-blue)', border: 'rgba(96, 165, 250, 0.25)' },
  'n8n-build': { bg: 'var(--accent-red-dim)', color: 'var(--accent-red)', border: 'rgba(248, 113, 113, 0.25)' },
  'react-frontend': { bg: 'var(--accent-teal-dim)', color: 'var(--accent-teal)', border: 'rgba(45, 212, 191, 0.25)' },
}

export const EMPLOYEES = [
  {
    id: 'tobey',
    name: 'Tobey',
    initials: 'TB',
    role: 'AI Engineer',
    week: { number: 14, year: 2026, label: 'Week of March 30, 2026' },
    reviewer: 'Mitch',
    projects: ['RYSE Ask Brian Phase 2', 'GHL Whitelabel CRM Build'],
    days: [
      {
        day: 'Monday',
        short: 'Mon',
        date: 'Mar 30',
        project: 'RYSE',
        focus: 'Phase 1 Beta Testing Kickoff + Phase 2 QA Scenarios',
        tasks: [
          { id: 1, task: 'Post in #project-ryse to kick off Phase 1 beta testing with Ryan. Include review process: 3 skills to test (COMM-01, BILL-01, SCOPE-01), 3-5 real-world prompts each, feedback format, G4 gate criteria.', est: '1h', tag: 'ryse-testing' },
          { id: 2, task: 'Write QA test scenarios for Phase 2 skills. 5 scenarios per skill, 10+ edge cases each. Skills: PROP-01, EVAL-01, STATUS-01, ONBOARD-01, DIFF-01.', est: '3h', tag: 'ryse-phase2' },
          { id: 3, task: 'Run QA scenarios on PROP-01 and EVAL-01. Score on accuracy, voice match, completeness, actionability. Target 80%+. Document and iterate.', est: '2.5h', tag: 'ryse-phase2' },
          { id: 4, task: 'Iterate on EVAL-01 (70% readiness). Verify KB docs retrieval-tested and skill logic handles 5 absorption patterns.', est: '1h', tag: 'ryse-phase2' },
        ],
        done: 'Beta testing request posted with clear instructions. QA scenarios documented for all 5 Phase 2 skills. PROP-01 and EVAL-01 tested and iterated.',
        blockers: ['Ryan\'s availability for beta testing. If no response by EOD, flag to Matt.'],
      },
      {
        day: 'Tuesday',
        short: 'Tue',
        date: 'Mar 31',
        project: 'RYSE',
        focus: 'Phase 2 Iteration + Regression Testing',
        tasks: [
          { id: 1, task: 'Run QA on STATUS-01 (Project Status Interpreter). Test in manual-input mode since Asana MCP pending. Document pass/fail.', est: '1.5h', tag: 'ryse-phase2' },
          { id: 2, task: 'Run QA on ONBOARD-01 (65% readiness) and DIFF-01 (72% readiness). Expect multiple iteration rounds.', est: '2.5h', tag: 'ryse-phase2' },
          { id: 3, task: 'Regression testing (G5): 3 test queries per Phase 1 skill (COMM-01, BILL-01, SCOPE-01). Confirm still working after Phase 2 additions.', est: '1.5h', tag: 'ryse-testing' },
          { id: 4, task: 'Follow up on Asana MCP connector. Coordinate with RYSE for OAuth authorization.', est: '0.5h', tag: 'ryse-infra' },
          { id: 5, task: 'Post RYSE status update in #internal-ryse. Cover: Phase 1 beta status, Phase 2 QA results, blockers, next steps.', est: '0.5h', tag: 'ryse-admin' },
        ],
        done: 'All 5 Phase 2 skills QA tested. Phase 1 regression tests pass. Asana MCP follow-up sent. Status update posted.',
        blockers: [],
      },
      {
        day: 'Wednesday',
        short: 'Wed',
        date: 'Apr 1',
        project: 'GHL CRM',
        focus: 'GHL MCP Server Setup + Connection Testing',
        tasks: [
          { id: 1, task: 'Install and configure GHL MCP server in Claude Code. Connect to 1760 Strategic AI sub-account.', est: '2h', tag: 'ghl-mcp' },
          { id: 2, task: 'Test read access: pull contacts, pipeline stages, custom fields, tags, calendars, automations via MCP. Verify against Hazel\'s ID export.', est: '1.5h', tag: 'ghl-mcp' },
          { id: 3, task: 'Test write access: create test contact, move through pipeline stages, update custom fields, apply tags. Confirm CRUD.', est: '1.5h', tag: 'ghl-mcp' },
          { id: 4, task: 'Test webhook registration via MCP. Document webhook costs per event type.', est: '1h', tag: 'ghl-mcp' },
          { id: 5, task: 'Write CLAUDE.md config for GHL CRM project repo. Document MCP setup steps for team.', est: '1h', tag: 'ghl-mcp' },
        ],
        done: 'Claude Code reads/writes to GHL sub-account via MCP. Test contact created and moved. Webhook costs documented. Setup guide written.',
        blockers: ['GHL API key access. Confirm sub-account key or Mitch provides via Bitwarden Send.', 'If official GHL MCP doesn\'t exist, may need custom wrapper. Flag to Mitch by EOD.'],
      },
      {
        day: 'Thursday',
        short: 'Thu',
        date: 'Apr 2',
        project: 'GHL CRM',
        focus: 'Build Out 1760 Strategic AI CRM + N8N Workflows',
        tasks: [
          { id: 1, task: 'Audit existing 1760 sub-account via Claude Code. Pull pipeline stages, custom fields, tags, automations. Compare against Internal CRM Spec.', est: '1.5h', tag: 'crm-build' },
          { id: 2, task: 'Fix gaps: add missing fields, correct tag naming (1760_ prefix), verify pipeline stage order matches spec. All via Claude Code + GHL MCP.', est: '2h', tag: 'crm-build' },
          { id: 3, task: 'Build/verify native GHL automations: stage change triggers, task creation, email placeholders, Slack notifications.', est: '2h', tag: 'crm-build' },
          { id: 4, task: 'Verify calendar integrations. Confirm Intro Call and AI Audit Call calendars assigned to Harry and Matt.', est: '1h', tag: 'crm-build' },
          { id: 5, task: 'Export updated full list of all GHL IDs from Claude Code session. Post in #internal-crm-project.', est: '0.5h', tag: 'crm-build' },
        ],
        done: 'Sub-account fully matches spec. All fields, tags, pipeline stages, calendars, and automations verified. Updated ID export posted.',
        blockers: ['GHL MCP write access for automations may be limited. Document what requires UI.'],
      },
      {
        day: 'Friday',
        short: 'Fri',
        date: 'Apr 3',
        project: 'GHL CRM',
        focus: 'N8N Automation Workflows + React Frontend Scaffold',
        tasks: [
          { id: 1, task: 'N8N Workflow 1: Instantly Reply to AI SDR to CRM. Trigger on webhook, LLM classification (5 categories), auto-respond, create/update GHL contact, Slack notify.', est: '3h', tag: 'n8n-build' },
          { id: 2, task: 'N8N Workflow 2: Booking to CRM to Notification. Calendar trigger, create/update GHL contact, update Notion, Slack notify Harry.', est: '2h', tag: 'n8n-build' },
          { id: 3, task: 'N8N Workflow 3: GHL Stage Change to Notion + Slack. Route by stage with appropriate notifications and actions.', est: '1.5h', tag: 'n8n-build' },
          { id: 4, task: 'Scaffold React frontend project. Repo setup, component architecture, GHL API integration layer. Plan: pipeline board, contact detail, activity feed, dashboard.', est: '1.5h', tag: 'react-frontend' },
        ],
        done: 'All 3 N8N workflows built. React project scaffolded with GHL API integration pulling live data.',
        blockers: ['OpenRouter API key access', 'Instantly API webhook configuration', 'Harry\'s Google Calendar API access'],
      },
    ],
    hours: {
      'ryse-phase2': 10.5,
      'ryse-testing': 2.5,
      'ryse-admin': 0.5,
      'ryse-infra': 0.5,
      'ghl-mcp': 7,
      'crm-build': 7,
      'n8n-build': 6.5,
      'react-frontend': 1.5,
    },
    openQuestions: [
      { project: 'RYSE', q: 'Have you heard back from Ryan on Phase 1 skill testing? If not, kick it off first thing Monday.' },
      { project: 'RYSE', q: 'For STATUS-01 manual fallback: how well does it perform without Asana data? Can we get G3 approval in manual mode?' },
      { project: 'GHL CRM', q: 'Does an official GHL MCP server exist, or do we need a custom wrapper?' },
      { project: 'GHL CRM', q: 'GHL webhook costs at expected volume. Document per-event pricing.' },
      { project: 'GHL CRM', q: 'Can the GHL MCP handle automation configuration, or is that UI-only?' },
      { project: 'GHL CRM', q: 'React frontend auth: GHL OAuth, API key, or proxy through our own backend?' },
    ],
    notifications: [
      { event: 'New booking', who: 'Harry' },
      { event: 'Positive reply (qualified)', who: 'Harry' },
      { event: 'Borderline reply', who: 'Harry' },
      { event: 'Breakup reply', who: 'Harry (priority)' },
      { event: 'Audit Booked', who: 'Matt + Harry' },
      { event: 'Proposal Sent', who: 'Matt' },
      { event: 'Deal Won', who: 'Team channel' },
      { event: 'Deal Lost', who: 'Matt' },
    ],
    priorities: [
      {
        project: 'RYSE',
        items: [
          { text: 'Phase 1 beta testing kickoff with Ryan', note: 'G4 gate blocking' },
          { text: 'Phase 2 QA on lowest-readiness skills', note: 'ONBOARD-01, EVAL-01, STATUS-01' },
          { text: 'Regression testing', note: null },
          { text: 'Asana MCP', note: 'can continue next week' },
        ],
      },
      {
        project: 'GHL CRM',
        items: [
          { text: 'GHL MCP connection', note: 'everything depends on this' },
          { text: 'CRM build via Claude Code', note: 'can\'t snapshot until right' },
          { text: 'N8N workflows', note: 'core automation layer' },
          { text: 'React frontend', note: 'can extend into next week' },
        ],
      },
    ],
  },

  // -------------------------------------------------------
  // ADD MORE EMPLOYEES HERE
  // -------------------------------------------------------
  // {
  //   id: 'hazel',
  //   name: 'Hazel',
  //   initials: 'HZ',
  //   role: 'Ops Manager',
  //   week: { number: 14, year: 2026, label: 'Week of March 30, 2026' },
  //   reviewer: 'Mitch',
  //   projects: ['...'],
  //   days: [ ... ],
  //   hours: { ... },
  //   openQuestions: [ ... ],
  //   priorities: [ ... ],
  // },
]
