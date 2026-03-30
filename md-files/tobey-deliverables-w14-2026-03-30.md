# Tobey Deliverables — Week of March 30, 2026

**Projects:** RYSE Ask Brian Phase 2 (Mon-Tue) + GHL Whitelabel CRM Build (Wed-Fri)
**Owner:** Tobey
**Reviewer:** Mitch
**Status:** Active

---

## Project 1: RYSE — Ask Brian (Founder Intelligence System)

**Slack Channel:** #internal-ryse (C0ACKN2HHF1)

### Context

We're in Week 8 of the RYSE engagement. All 13 skills are built and uploaded (11 original + BRAND-01 + XFER-01). Phase 1 skills (1-3) need Ryan's beta approval (Quality Gate G4). Phase 2 skills (4-8) need QA iteration. Readiness scores on Skills 5, 7, and 8 are at 65-72%, so expect more iteration cycles.

**Key references in Notion:**
- [Implementation Plan: Ask Brian Build Spec](https://www.notion.so/324d1cd65169812db15fe752e329c0cd) — full build sequence, quality gates, per-skill process
- [RYSE Central Brain Architecture Blueprint](https://www.notion.so/324d1cd65169818d87f6d95212a62209) — complete architecture spec

**Current status (from Tobey's March 27 update):**
- 13 skills built and uploaded to RYSE Claude org
- Google Workspace MCP connected to ai@readytoryse account
- Asana MCP still pending (needs RYSE auth)
- QA test scenarios not yet documented for Phase 2 skills
- Phase 1 beta testing with Ryan has not started

---

### Monday, March 30
**Focus: Phase 1 Beta Testing Kickoff + Phase 2 QA Scenarios**

| # | Task | Est. | Tag |
|---|------|------|-----|
| 1 | Post in #project-ryse to kick off Phase 1 beta testing with Ryan. Include a clear review process: which 3 skills to test (COMM-01, BILL-01, SCOPE-01), 3-5 real-world test prompts for each, what feedback format we need, and the G4 gate criteria (Ryan approves 3/5 outputs with minimal edits). | 1h | `ryse-testing` |
| 2 | Write QA test scenarios for Phase 2 skills. 5 documented scenarios per skill, 10+ edge cases each. Cover: PROP-01 (Proposal Generator), EVAL-01 (Scope Change Evaluator), STATUS-01 (Project Status Interpreter), ONBOARD-01 (Client Onboarding Playbook), DIFF-01 (Difficult Conversation Drafter). | 3h | `ryse-phase2` |
| 3 | Run QA scenarios on PROP-01 and EVAL-01. Score on accuracy, voice match, completeness, actionability. Target 80%+. Document results and iterate on any failures. | 2.5h | `ryse-phase2` |
| 4 | Start iterating on EVAL-01 (Scope Change Evaluator, 70% readiness). This skill needs the Scope Change Decision Tree and contract terms by client. Verify KB docs are retrieval-tested and skill logic handles the 5 absorption patterns correctly. | 1h | `ryse-phase2` |

**Definition of done:** Beta testing request posted in #project-ryse with clear instructions for Ryan. QA scenarios documented for all 5 Phase 2 skills. PROP-01 and EVAL-01 tested and iterated. Results documented.

**Blockers:**
- Ryan's availability for beta testing. If no response by end of Monday, flag to Matt.

---

### Tuesday, March 31
**Focus: Phase 2 Iteration + Regression Testing**

| # | Task | Est. | Tag |
|---|------|------|-----|
| 1 | Run QA scenarios on STATUS-01 (Project Status Interpreter). Test in manual-input mode since Asana MCP is still pending. Document which scenarios pass and which require Asana data to validate fully. | 1.5h | `ryse-phase2` |
| 2 | Run QA scenarios on ONBOARD-01 (Client Onboarding Playbook, 65% readiness) and DIFF-01 (Difficult Conversation Drafter, 72% readiness). These are the lowest-readiness skills. Expect multiple iteration rounds. | 2.5h | `ryse-phase2` |
| 3 | Regression testing (G5): Run 3 test queries against each Phase 1 skill (COMM-01, BILL-01, SCOPE-01) to confirm they still work correctly after Phase 2 skills were added. Document pass/fail. | 1.5h | `ryse-testing` |
| 4 | Follow up on Asana MCP connector. Coordinate with RYSE in #project-ryse for OAuth authorization from their account owner. | 0.5h | `ryse-infra` |
| 5 | Post RYSE status update in #internal-ryse. Cover: Phase 1 beta testing status, Phase 2 QA results with readiness scores, blockers, what's needed from Ryan/Matt for next week. | 0.5h | `ryse-admin` |

**Definition of done:** All 5 Phase 2 skills QA tested with documented results. Phase 1 regression tests pass. Asana MCP follow-up sent. Status update posted.

---

## Project 2: GHL Whitelabel CRM Build (Internal)

**Slack Channel:** #internal-crm-project (C0AA11GFULE)

### Context

Build out the 1760 Strategic AI internal CRM using Claude Code with the GHL MCP server. Get the full CRM operational via Claude Code sessions, wire up the N8N automation workflows, and scaffold a custom React frontend. The 1760 Strategic AI sub-account is the primary build. Once solid, we'll snapshot for client-type templates (agency, coach, etc.) later.

**Key references in Notion:**
- [Automation Workflow Flowcharts](https://www.notion.so/320d1cd65169818ead5ded9df2746fa9) — system architecture, 3 core N8N workflows, integration points
- [End-to-End Pipeline Flowchart](https://www.notion.so/320d1cd6516981cd9d3ac4b6edb8f1be) — full lead gen pipeline Apollo to close
- [Pipeline Operations Guide](https://www.notion.so/32bd1cd6516981a5a625d1fea48f62cc) — how the Claude Code pipeline works today

**Hazel's GHL ID exports:**
- [GHL ID Reference Doc](https://docs.google.com/document/d/13kutGydZFDjvTj0-JOzO9ZAC8AwFQG3hyMTWPapEOv0/edit?tab=t.4fck0mxi0kx0)
- [GHL CRM Updates Doc](https://docs.google.com/document/d/1U0TbXNF2Wx4DJwmEF7CM6dqjLIWWo_VLi034G6X9ae8/edit)

---

### Wednesday, April 1
**Focus: GHL MCP Server Setup + Connection Testing**

| # | Task | Est. | Tag |
|---|------|------|-----|
| 1 | Install and configure the GHL MCP server in Claude Code. Connect to the 1760 Strategic AI sub-account. | 2h | `ghl-mcp` |
| 2 | Test read access: pull contacts, pipeline stages, custom fields, tags, calendars, and automations from GHL via MCP. Verify data matches Hazel's ID export doc. | 1.5h | `ghl-mcp` |
| 3 | Test write access: create a test contact, move through pipeline stages, update custom fields, apply tags. Confirm all CRUD operations work. | 1.5h | `ghl-mcp` |
| 4 | Test webhook registration via MCP. Document webhook costs per event type (open question from March 11 meeting). | 1h | `ghl-mcp` |
| 5 | Write a `CLAUDE.md` config for the GHL CRM project repo so the team can run Claude Code sessions against GHL. Document the MCP setup steps. | 1h | `ghl-mcp` |

**Definition of done:** Claude Code can read and write to the 1760 Strategic AI GHL sub-account via MCP. Test contact created and moved through pipeline. Webhook costs documented. Setup guide written.

**Blockers:**
- GHL API key access. Confirm Tobey has the sub-account API key. If not, Mitch to provide via Bitwarden Send.
- If the official GHL MCP server doesn't exist or is limited, Tobey may need to build a custom MCP server wrapper around the GHL API v2. Flag to Mitch by end of day Wednesday.

---

### Thursday, April 2
**Focus: Build Out 1760 Strategic AI CRM + N8N Workflows**

| # | Task | Est. | Tag |
|---|------|------|-----|
| 1 | Audit the existing 1760 Strategic AI sub-account via Claude Code. Pull current state of pipeline stages, custom fields, tags, automations. Compare against the Internal CRM Spec (Slack canvas F0AFR4GJFPF). | 1.5h | `crm-build` |
| 2 | Fix gaps and misconfigurations. Add missing fields, correct tag naming (all must use `1760_` prefix), verify pipeline stage order matches spec. All changes via Claude Code + GHL MCP. | 2h | `crm-build` |
| 3 | Build/verify all native GHL automations via Claude Code. Stage change triggers, task creation, email notification placeholders, Slack notifications (Hazel's Zapier webhooks are already configured). | 2h | `crm-build` |
| 4 | Verify calendar integrations. Confirm Intro Call and AI Audit Call calendars are assigned to Harry and Matt. Booking flows trigger correct automation workflows. | 1h | `crm-build` |
| 5 | Export updated full list of all GHL IDs (fields, stages, tags, automation IDs, calendar IDs) from Claude Code session. Post in #internal-crm-project. | 0.5h | `crm-build` |

**Definition of done:** 1760 Strategic AI sub-account fully matches spec. All fields, tags, pipeline stages, calendars, and native automations verified. Updated ID export posted in Slack.

**Blockers:**
- If GHL MCP write access for automations is limited, some config may require the GHL UI. Document what can and can't be done via MCP.

---

### Friday, April 3
**Focus: N8N Automation Workflows + React Frontend Scaffold**

| # | Task | Est. | Tag |
|---|------|------|-----|
| 1 | Build N8N Workflow 1: Instantly Reply to AI SDR to CRM. Trigger on Instantly webhook. Extract reply text, sender, company, campaign ID, touch number. LLM classification via OpenRouter (5 categories). Route by classification + qualification. Auto-respond via Instantly. Create/update GHL contact. Slack notify on escalations. Build from existing "Hermes" workflow. | 3h | `n8n-build` |
| 2 | Build N8N Workflow 2: Booking to CRM to Notification. Trigger on Google Calendar/Calendly booking. Create/update GHL contact (stage: Podcast Booked). Update Notion Prospects database. Slack notify Harry with full context. | 2h | `n8n-build` |
| 3 | Build N8N Workflow 3: GHL Stage Change to Notion + Slack. Route by stage: Podcast Booked notifies Harry, Audit Booked notifies Matt + Harry, Proposal Sent notifies Matt, Won creates Notion client page + notifies team, Lost logs reason + notifies Matt, Nurture adds to quarterly re-engage. | 1.5h | `n8n-build` |
| 4 | Scaffold the custom React frontend project. Repo setup, component architecture, GHL API integration layer. Plan: pipeline board view, contact detail view, activity feed, dashboard. | 1.5h | `react-frontend` |

**Definition of done:** All 3 N8N workflows built. React project scaffolded with GHL API integration layer pulling live data. Workflows don't need full end-to-end testing today. That's a carry-forward item.

**Key build references:**
- N8N Build Guidance (10 steps) in the [End-to-End Pipeline Flowchart](https://www.notion.so/320d1cd6516981cd9d3ac4b6edb8f1be)
- Instantly status mapping table in the same doc
- One auto-reply per thread max. After that, Harry owns. Only exception: 48-hour nudge.

**Blockers:**
- OpenRouter API key access
- Instantly API webhook configuration
- Harry's Google Calendar API access

---

## Weekly Totals

| Tag | Hours | Project |
|-----|-------|---------|
| `ryse-phase2` | 10.5h | RYSE |
| `ryse-testing` | 2.5h | RYSE |
| `ryse-admin` | 0.5h | RYSE |
| `ryse-infra` | 0.5h | RYSE |
| `ghl-mcp` | 7h | GHL CRM |
| `crm-build` | 7h | GHL CRM |
| `n8n-build` | 6.5h | GHL CRM |
| `react-frontend` | 1.5h | GHL CRM |
| **Total** | **36h** | |

**Split:** RYSE ~14h (Mon-Tue) / GHL CRM ~22h (Wed-Fri)

---

## Carry-Forward Rules

**RYSE priority order if time gets tight:**
1. Phase 1 beta testing kickoff with Ryan (don't let this queue up, G4 gate is blocking launch)
2. Phase 2 QA on lowest-readiness skills (ONBOARD-01, EVAL-01, STATUS-01)
3. Regression testing
4. Asana MCP (can continue next week)

**GHL CRM priority order if time gets tight:**
1. GHL MCP connection (everything else depends on this)
2. CRM build via Claude Code (can't snapshot until it's right)
3. N8N workflows (core automation layer)
4. React frontend (can extend into next week)

---

## Open Questions for Tobey

**RYSE:**
1. Have you heard back from Ryan on Phase 1 skill testing? If not, kick it off first thing Monday.
2. For STATUS-01 manual fallback: how well does it perform without Asana data? Can we get G3 approval in manual mode?

**GHL CRM:**
3. Does an official GHL MCP server exist, or do we need a custom wrapper? Research first thing Wednesday.
4. GHL webhook costs at expected volume. Document per-event pricing.
5. Can the GHL MCP handle automation configuration, or is that UI-only?
6. React frontend auth: GHL OAuth, API key, or proxy through our own backend?

---

## Slack Notification Targets (N8N Workflows)

| Event | Notify | Channel |
|-------|--------|---------|
| New booking | Harry | #internal-crm-project |
| Positive reply (qualified) | Harry | #internal-crm-project |
| Borderline reply | Harry | #internal-crm-project |
| Unclear reply | Harry | #internal-crm-project |
| Breakup reply | Harry (priority) | #internal-crm-project |
| Audit Booked | Matt + Harry | #internal-crm-project |
| Proposal Sent | Matt | #internal-crm-project |
| Deal Won | Team channel | #internal-crm-project |
| Deal Lost | Matt | #internal-crm-project |

---

*Week 14, 2026 // RYSE + GHL CRM // Owner: Tobey // Reviewer: Mitch*
