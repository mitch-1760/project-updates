"use client";

import { useState } from "react";

const slides = [
  // SLIDE 0: Title
  {
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-16">
        <div className="text-xs tracking-widest text-gray-500 uppercase mb-6">1760 Strategic AI</div>
        <h1 className="text-4xl font-bold text-white mb-3">Weekly Roadmap</h1>
        <p className="text-gray-400 text-lg">February 21, 2026</p>
        <div className="mt-10 grid grid-cols-4 gap-3 text-center w-full max-w-2xl">
          {[
            { n: "6", label: "Active Projects" },
            { n: "2", label: "New This Week" },
            { n: "3", label: "Blocked Items" },
            { n: "4", label: "Team Members" },
          ].map((s, i) => (
            <div key={i} className="bg-gray-800/60 border border-gray-700 rounded-lg p-3">
              <div className="text-2xl font-bold text-white">{s.n}</div>
              <div className="text-xs text-gray-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  // SLIDE 1: Project Overview
  {
    content: (
      <div className="flex flex-col h-full px-10 pt-10 pb-6">
        <div className="text-xs tracking-widest text-blue-400 uppercase mb-2">Overview</div>
        <h2 className="text-2xl font-bold text-white mb-4">Active Project Status</h2>
        <div className="flex-1 space-y-2">
          <div className="grid grid-cols-5 gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider px-3">
            <span>Project</span><span>Phase</span><span>Status</span><span>Blocker</span><span>Owner</span>
          </div>
          {[
            { name: "By Way of Grey", phase: "Lead Gen", status: "Live — Sending", color: "#f59e0b", blocker: "Bounce rate 9.4%", owner: "Mitch / Tobey / Hazel" },
            { name: "TEC+ Consulting", phase: "Pre-Build", status: "Domains Warming", color: "#34d399", blocker: "Bookings link from Joe", owner: "Matt → Mitch" },
            { name: "Anarti Therapeutics", phase: "Onboarding", status: "Contract Out", color: "#60a5fa", blocker: "Signature pending", owner: "Matt → Mitch" },
            { name: "RYSE Creative", phase: "Discovery", status: "Session 2 Tue", color: "#facc15", blocker: "Matt prep items", owner: "Matt (discovery)" },
            { name: "Wheelhouse Health", phase: "Support", status: "Monitoring", color: "#34d399", blocker: "None", owner: "Tobey" },
            { name: "1760 Internal CRM", phase: "Build", status: "Fields + Tags Done", color: "#60a5fa", blocker: "API for stage IDs", owner: "Hazel" },
            { name: "1760 Lead Gen", phase: "Infrastructure", status: "SDR Build + Warming", color: "#60a5fa", blocker: "ICP + copy (Fri 2/27)", owner: "Tobey / Harry / Matt" },
          ].map((p, i) => (
            <div key={i} className="grid grid-cols-5 gap-2 items-center bg-gray-800/60 border border-gray-700/50 rounded-lg px-3 py-2 text-sm">
              <span className="font-semibold text-white text-xs">{p.name}</span>
              <span className="text-gray-300 text-xs">{p.phase}</span>
              <span className="flex items-center gap-1.5 text-xs">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: p.color }} />
                <span className="text-gray-300">{p.status}</span>
              </span>
              <span className="text-xs" style={{ color: p.blocker === "None" ? "#6b7280" : "#f87171" }}>{p.blocker}</span>
              <span className="text-gray-400 text-xs">{p.owner}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 flex gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400" /> On Track</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-400" /> In Progress</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400" /> At Risk</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-400" /> Blocked</span>
        </div>
      </div>
    ),
  },
  // SLIDE 2: BWOG
  {
    content: (
      <div className="flex flex-col h-full px-10 pt-10 pb-6">
        <div className="text-xs tracking-widest text-amber-400 uppercase mb-2">At Risk</div>
        <h2 className="text-2xl font-bold text-white mb-4">By Way of Grey — Deliverability</h2>
        <div className="grid grid-cols-2 gap-4 flex-1">
          <div className="space-y-3">
            <div className="bg-red-900/30 border border-red-700/50 rounded-lg p-4">
              <div className="text-red-400 font-semibold text-sm mb-2">Bounce Rate: 9.4% cumulative</div>
              <div className="space-y-1.5 text-xs text-gray-300">
                <div className="flex justify-between"><span>Feb 19</span><span>17 sent / 4 bounced (7%)</span></div>
                <div className="flex justify-between"><span>Feb 20</span><span>26 sent / 4 bounced (6%)</span></div>
                <div className="flex justify-between border-t border-gray-700 pt-1"><span className="font-semibold">Total</span><span className="font-semibold">139 sent / 13 bounced</span></div>
              </div>
            </div>
            <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-4">
              <div className="text-white font-semibold text-sm mb-2">Root Cause</div>
              <p className="text-xs text-gray-300">Entire Apollo pull was CPO/HR titles — all bounces are from those titles by definition, not a title-specific issue. 9.4% bounce may be normal for this data set. Title diversification on next pull will give real comparative data.</p>
            </div>
            <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-4">
              <div className="text-white font-semibold text-sm mb-2">SEO Phase 3</div>
              <p className="text-xs text-gray-400">ON HOLD — Laura paused to focus budget on lead gen. No work until reopened.</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="bg-emerald-900/30 border border-emerald-700/50 rounded-lg p-4">
              <div className="text-emerald-400 font-semibold text-sm mb-2">MillionVerifier Results</div>
              <div className="space-y-1.5 text-xs text-gray-300">
                <div className="flex justify-between"><span>OK (safe to send)</span><span className="text-emerald-400 font-semibold">87</span></div>
                <div className="flex justify-between"><span>Catch-All (risky)</span><span className="text-amber-400 font-semibold">27</span></div>
                <div className="flex justify-between"><span>Invalid</span><span className="text-red-400 font-semibold">1</span></div>
              </div>
            </div>
            <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-4">
              <div className="text-white font-semibold text-sm mb-2">Remediation Plan</div>
              <div className="space-y-2 text-xs text-gray-300">
                <div className="flex gap-2"><span className="text-blue-400 font-bold">1</span><span>Upload 25 MV-verified leads to Campaign 1</span></div>
                <div className="flex gap-2"><span className="text-blue-400 font-bold">2</span><span>Monitor daily bounce on new sends — if &lt;2% over 2 days, ramp</span></div>
                <div className="flex gap-2"><span className="text-blue-400 font-bold">3</span><span>Diversify next pull: VP of People, Head of People Ops, Chief of Staff, Director of Talent + CPO</span></div>
                <div className="flex gap-2"><span className="text-blue-400 font-bold">4</span><span>Instantly Reporter live — daily cumulative stats in channel</span></div>
              </div>
            </div>
            <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-4">
              <div className="text-white font-semibold text-sm mb-2">AI SDR Workflow</div>
              <p className="text-xs text-gray-300">Core pipeline built in n8n. Webhook → classification → routing in place. CRM write-back working on HubSpot. Target: testable by 2/28.</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  // SLIDE 3: TEC+
  {
    content: (
      <div className="flex flex-col h-full px-10 pt-10 pb-6">
        <div className="text-xs tracking-widest text-blue-400 uppercase mb-2">Pre-Build</div>
        <h2 className="text-2xl font-bold text-white mb-4">TEC+ Consulting — Post-Meeting</h2>
        <div className="grid grid-cols-2 gap-4 flex-1">
          <div className="space-y-3">
            <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-4">
              <div className="text-sm font-semibold text-white mb-2">Meeting Outcome (Feb 20)</div>
              <div className="space-y-1.5 text-xs text-gray-300">
                <p>Roadmap presented and approved. Dual campaign structure confirmed: Gaming (AI governance) + Mining (data protection).</p>
                <p className="text-gray-400 mt-2">Voice: direct, dry, practitioner-to-practitioner. No fear-based messaging.</p>
              </div>
            </div>
            <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-4">
              <div className="text-sm font-semibold text-white mb-2">Contract</div>
              <div className="space-y-1 text-xs text-gray-300">
                <div className="flex justify-between"><span>Value</span><span>£6,000</span></div>
                <div className="flex justify-between"><span>Structure</span><span>£3K setup + £1K/mo × 3</span></div>
                <div className="flex justify-between"><span>KPI</span><span>10 discovery calls / 90 days</span></div>
              </div>
            </div>
            <div className="bg-emerald-900/30 border border-emerald-700/50 rounded-lg p-4">
              <div className="text-sm font-semibold text-white mb-2">Infrastructure</div>
              <div className="space-y-1 text-xs text-gray-300">
                <div className="flex justify-between"><span>Domains</span><span className="text-emerald-400">2 × .co.uk — Purchased ✓</span></div>
                <div className="flex justify-between"><span>Inboxes</span><span className="text-emerald-400">6 sending (warming) + 1 admin (auth only) ✓</span></div>
                <div className="flex justify-between"><span>Booking</span><span>Microsoft Bookings</span></div>
                <div className="flex justify-between"><span>Launch target</span><span>~Mar 16</span></div>
              </div>
            </div>
            <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-4">
              <div className="text-sm font-semibold text-white mb-2">SDR Senders</div>
              <div className="grid grid-cols-2 gap-1 text-xs text-gray-300">
                <span>Sophie Rayner</span><span>James Whitfield</span>
                <span>Emma Caldwell</span><span>Daniel Ashworth</span>
                <span>Rachel Thornton</span><span>Tom Ellison</span>
              </div>
              <div className="text-xs text-gray-500 mt-1.5">+ admin@ inbox for Instantly/Google admin</div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="bg-amber-900/30 border border-amber-700/50 rounded-lg p-4">
              <div className="text-amber-400 font-semibold text-sm mb-2">Blocking Items</div>
              <div className="space-y-2 text-xs text-gray-300">
                <div className="flex gap-2 items-start"><span className="text-emerald-400 mt-0.5">✓</span><span className="text-gray-500">Domains purchased and warming in Instantly</span></div>
                <div className="flex gap-2 items-start"><span className="text-emerald-400 mt-0.5">✓</span><span className="text-gray-500">SDR sender names confirmed (6 personas)</span></div>
                <div className="flex gap-2 items-start"><span className="text-emerald-400 mt-0.5">✓</span><span className="text-gray-500">Email footer wording approved by Joe (video call)</span></div>
                <div className="flex gap-2 items-start"><span className="text-red-400 mt-0.5">☐</span><span>Microsoft Bookings link from Joe</span></div>
              </div>
            </div>
            <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-4">
              <div className="text-sm font-semibold text-white mb-2">Timeline</div>
              <div className="space-y-1.5 text-xs text-gray-300">
                <div className="flex justify-between"><span>Feb 21</span><span className="text-emerald-400">Domains + inboxes live, warming started ✓</span></div>
                <div className="flex justify-between"><span>Mar 1–14</span><span className="text-gray-400">Warm-up continues + list build + sequence finalization</span></div>
                <div className="flex justify-between"><span>~Mar 16</span><span className="text-gray-400">Both campaigns launch</span></div>
                <div className="flex justify-between"><span>Feb 28</span><span className="text-gray-400">Next meeting with Joe (3 PM)</span></div>
              </div>
            </div>
            <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-4">
              <div className="text-sm font-semibold text-white mb-2">Exclusions</div>
              <p className="text-xs text-gray-400">Mining: Anglo American, De Beers, Valterra. Gaming: list received Feb 16. No DPOs targeted for AI governance messaging.</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  // SLIDE 4: Anarti
  {
    content: (
      <div className="flex flex-col h-full px-10 pt-10 pb-6">
        <div className="text-xs tracking-widest text-emerald-400 uppercase mb-2">New Client</div>
        <h2 className="text-2xl font-bold text-white mb-4">Anarti Therapeutics — Onboarding</h2>
        <div className="grid grid-cols-2 gap-4 flex-1">
          <div className="space-y-3">
            <div className="bg-emerald-900/30 border border-emerald-700/50 rounded-lg p-4">
              <div className="text-emerald-400 font-semibold text-sm mb-2">Deal Closed Feb 20</div>
              <div className="space-y-1 text-xs text-gray-300">
                <div className="flex justify-between"><span>Client</span><span>Alka Badshah</span></div>
                <div className="flex justify-between"><span>Budget</span><span>~$9,000–$10,000</span></div>
                <div className="flex justify-between"><span>Kickoff</span><span>March 24</span></div>
                <div className="flex justify-between"><span>Term</span><span>3 months (through mid-June)</span></div>
                <div className="flex justify-between"><span>KPI</span><span>10 booked meetings minimum</span></div>
              </div>
            </div>
            <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-4">
              <div className="text-sm font-semibold text-white mb-2">Conference Timeline</div>
              <div className="space-y-1.5 text-xs text-gray-300">
                <div className="flex justify-between"><span>Conference dates</span><span>April 6, 7, 9</span></div>
                <div className="flex justify-between"><span>Attendee list received</span><span>~Last week of March</span></div>
                <div className="flex justify-between"><span>Outreach ready by</span><span>April 3</span></div>
                <div className="flex justify-between"><span>Expected engagement</span><span>~5% (~130 engaged leads)</span></div>
              </div>
            </div>
            <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-4">
              <div className="text-sm font-semibold text-white mb-2">Scope</div>
              <p className="text-xs text-gray-300">AI nurture system for ~2,600 existing leads across practitioner segments. No lead scraping. Conference follow-up automation. 12 original content pieces (video-first). Monthly recording calls with Alka.</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="bg-amber-900/30 border border-amber-700/50 rounded-lg p-4">
              <div className="text-amber-400 font-semibold text-sm mb-2">Pre-Kickoff Requirements</div>
              <div className="space-y-2 text-xs text-gray-300">
                <div className="flex gap-2 items-start"><span className="text-red-400 mt-0.5">☐</span><span>Contract signed (Dropbox e-sign)</span></div>
                <div className="flex gap-2 items-start"><span className="text-red-400 mt-0.5">☐</span><span>Payment received before kickoff</span></div>
                <div className="flex gap-2 items-start"><span className="text-red-400 mt-0.5">☐</span><span>Domain count confirmed (est. 3 domains / 9 inboxes)</span></div>
                <div className="flex gap-2 items-start"><span className="text-red-400 mt-0.5">☐</span><span>Alka organizes Google Drive (photos, banners, testimonials)</span></div>
                <div className="flex gap-2 items-start"><span className="text-red-400 mt-0.5">☐</span><span>Social media access (IG, TikTok) for scheduled posting</span></div>
              </div>
            </div>
            <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-4">
              <div className="text-sm font-semibold text-white mb-2">Infrastructure Plan</div>
              <div className="space-y-1 text-xs text-gray-300">
                <div className="flex justify-between"><span>Domains</span><span>3 (standalone, 1760-owned)</span></div>
                <div className="flex justify-between"><span>Inboxes</span><span>9 (3 per domain)</span></div>
                <div className="flex justify-between"><span>Daily capacity</span><span>~450 emails/day</span></div>
                <div className="flex justify-between"><span>Full list coverage</span><span>~6 sending days</span></div>
              </div>
            </div>
            <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-4">
              <div className="text-sm font-semibold text-white mb-2">Content Deliverables</div>
              <p className="text-xs text-gray-300">12 original content pieces. IG Reels + TikTok preferred. 3-min testimonial from Amber repurposed into clips. Monthly 1-2hr recording sessions with Alka. Automated posting via scheduling tools.</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  // SLIDE 5: RYSE
  {
    content: (
      <div className="flex flex-col h-full px-10 pt-10 pb-6">
        <div className="text-xs tracking-widest text-yellow-400 uppercase mb-2">Discovery</div>
        <h2 className="text-2xl font-bold text-white mb-4">RYSE Creative — Session 2 Prep</h2>
        <div className="grid grid-cols-2 gap-4 flex-1">
          <div className="space-y-3">
            <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-4">
              <div className="text-sm font-semibold text-white mb-2">Contract</div>
              <div className="space-y-1 text-xs text-gray-300">
                <div className="flex justify-between"><span>Value</span><span>$14,000</span></div>
                <div className="flex justify-between"><span>Term</span><span>6 months</span></div>
                <div className="flex justify-between"><span>Session 1</span><span className="text-emerald-400">Complete</span></div>
                <div className="flex justify-between"><span>Session 2</span><span className="text-amber-400">Tuesday Feb 25</span></div>
              </div>
            </div>
            <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-4">
              <div className="text-sm font-semibold text-white mb-2">Three Pillars</div>
              <div className="space-y-2 text-xs text-gray-300">
                <div><span className="text-blue-400 font-semibold">1. Central Brain</span> — Claude Team LLM trained on Ryan&apos;s workflows. Months 1–3.</div>
                <div><span className="text-blue-400 font-semibold">2. CRM + Ops Hub</span> — GHL with Fireflies-to-Asana automation. Months 4–6.</div>
                <div><span className="text-blue-400 font-semibold">3. Strategic Foundation</span> — SOPs, change management, training. Concurrent.</div>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="bg-amber-900/30 border border-amber-700/50 rounded-lg p-4">
              <div className="text-amber-400 font-semibold text-sm mb-2">Session 2 Extraction Targets</div>
              <p className="text-xs text-gray-400 mb-2">Matt must come prepared to extract:</p>
              <div className="space-y-2 text-xs text-gray-300">
                <div className="flex gap-2 items-start"><span className="text-amber-400 font-bold">1</span><span>Where info drops between Ryan&apos;s pricing and Martina&apos;s invoicing</span></div>
                <div className="flex gap-2 items-start"><span className="text-amber-400 font-bold">2</span><span>Every point where Ryan is the approval gate vs. team just missing context</span></div>
                <div className="flex gap-2 items-start"><span className="text-amber-400 font-bold">3</span><span>Ryan&apos;s escalation logic: what Heidi handles vs. what comes back to him</span></div>
                <div className="flex gap-2 items-start"><span className="text-amber-400 font-bold">4</span><span>Templates or docs he screen-shares, even rough ones</span></div>
              </div>
            </div>
            <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-4">
              <div className="text-sm font-semibold text-white mb-2">Implementation Roadmap Built</div>
              <p className="text-xs text-gray-300">Roadmap posted in #internal-ryse. Covers discovery through handoff. Waiting on Session 2 data to finalize Central Brain training dataset and CRM workflow specs.</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  // SLIDE 6: Internal Operations
  {
    content: (
      <div className="flex flex-col h-full px-10 pt-10 pb-6">
        <div className="text-xs tracking-widest text-blue-400 uppercase mb-2">Internal</div>
        <h2 className="text-2xl font-bold text-white mb-4">1760 Internal — CRM + Lead Gen + Notion</h2>
        <div className="grid grid-cols-3 gap-3 flex-1">
          <div className="space-y-3">
            <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-4">
              <div className="text-sm font-semibold text-white mb-2">GHL CRM Build</div>
              <div className="text-xs text-gray-400 mb-2">Owner: Hazel</div>
              <div className="space-y-1.5 text-xs">
                {[
                  { t: "Sales pipeline (10 stages)", d: true },
                  { t: "Contact fields (26 total)", d: true },
                  { t: "Tags (5 categories)", d: true },
                  { t: "Calendars (Intro + AI Audit)", d: true },
                  { t: "A2P compliance pages", d: true },
                  { t: "Staff setup (Harry + Matt)", d: false },
                  { t: "Calendar automations", d: false },
                  { t: "Pipeline stage ID export", d: false },
                  { t: "Email templates", d: false },
                  { t: "GHL workflow automations", d: false },
                ].map((x, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className={`w-4 h-4 rounded flex-shrink-0 flex items-center justify-center text-xs ${x.d ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-400" : "bg-gray-700 border border-gray-600 text-gray-500"}`}>{x.d ? "✓" : ""}</span>
                    <span className={x.d ? "text-gray-500" : "text-gray-300"}>{x.t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-4">
              <div className="text-sm font-semibold text-white mb-2">AI SDR Workflow</div>
              <div className="text-xs text-gray-400 mb-2">Owner: Tobey | Due: 2/28</div>
              <div className="space-y-1.5 text-xs">
                {[
                  { t: "Webhook trigger", d: true },
                  { t: "Data normalization", d: true },
                  { t: "Client config (modular)", d: true },
                  { t: "Prospect lookup", d: true },
                  { t: "Conversation retrieval", d: true },
                  { t: "AI prompt builder", d: true },
                  { t: "Classification + routing", d: true },
                  { t: "HubSpot write-back", d: true },
                  { t: "GHL write-back", d: false },
                  { t: "Slack alert (Interested)", d: false },
                  { t: "DNC handling", d: false },
                  { t: "OOO flow", d: false },
                ].map((x, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className={`w-4 h-4 rounded flex-shrink-0 flex items-center justify-center text-xs ${x.d ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-400" : "bg-gray-700 border border-gray-600 text-gray-500"}`}>{x.d ? "✓" : ""}</span>
                    <span className={x.d ? "text-gray-500" : "text-gray-300"}>{x.t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-4">
              <div className="text-sm font-semibold text-white mb-2">Lead Gen Infrastructure</div>
              <div className="text-xs text-gray-400 mb-2">Blocking: ICP + copy from Harry/Matt</div>
              <div className="space-y-1 text-xs text-gray-300">
                <div className="flex justify-between"><span>Inboxes warming</span><span>~10 days out</span></div>
                <div className="flex justify-between"><span>ICP + filters due</span><span>Fri 2/27</span></div>
                <div className="flex justify-between"><span>Sequence copy due</span><span>Fri 2/27</span></div>
                <div className="flex justify-between"><span>Clay research</span><span>Mitch (weekend)</span></div>
              </div>
            </div>
            <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-4">
              <div className="text-sm font-semibold text-white mb-2">Notion Workspace</div>
              <div className="text-xs text-gray-400 mb-2">Owner: Matt</div>
              <div className="space-y-1.5 text-xs">
                {[
                  { t: "Workspace created", d: true },
                  { t: "Team invites sent", d: true },
                  { t: "Claude skills built", d: true },
                  { t: "Client database template", d: false },
                  { t: "Output routing to Notion", d: false },
                ].map((x, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className={`w-4 h-4 rounded flex-shrink-0 flex items-center justify-center text-xs ${x.d ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-400" : "bg-gray-700 border border-gray-600 text-gray-500"}`}>{x.d ? "✓" : ""}</span>
                    <span className={x.d ? "text-gray-500" : "text-gray-300"}>{x.t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  // SLIDE 7: Team Assignments
  {
    content: (
      <div className="flex flex-col h-full px-10 pt-10 pb-6">
        <div className="text-xs tracking-widest text-blue-400 uppercase mb-2">Execution</div>
        <h2 className="text-2xl font-bold text-white mb-4">Next Week — Owner Assignments</h2>
        <div className="grid grid-cols-2 gap-4 flex-1">
          {[
            {
              name: "Tobey",
              role: "Lead Developer",
              color: "blue",
              tasks: [
                "AI SDR workflow — complete GHL write-back, Slack alerts, DNC, OOO branches",
                "BWOG — diversify title mix on next Apollo pull (VP of People, Head of People Ops, Chief of Staff, Dir of Talent + CPO)",
                "Wheelhouse — daily n8n log checks (through ~2/27)",
                "Review Hazel's pipeline stage ID export once posted",
              ],
              deadline: "SDR testable by 2/28",
            },
            {
              name: "Hazel",
              role: "Implementation",
              color: "purple",
              tasks: [
                "BWOG — upload 25 MV-verified leads to Campaign 1",
                "BWOG — daily monitoring continues",
                "GHL — add Harry + Matt as staff, assign calendars",
                "GHL — retrieve pipeline stage IDs via API, post to sheet",
                "GHL — set up calendar confirmation + reminder automations",
              ],
              deadline: "Staff + stage IDs by Tue 2/25",
            },
            {
              name: "Matt",
              role: "Strategy",
              color: "emerald",
              tasks: [
                "RYSE Session 2 — extract the 4 items posted in #internal-ryse",
                "TEC+ — confirm domains + sender names with Joe by Sun",
                "Anarti — get contract signed, confirm infra volume",
                "1760 Lead Gen — deliver ICP + Apollo filters + sequences by Fri",
                "Notion — finish client database template + routing",
              ],
              deadline: "ICP + copy by Fri 2/27",
            },
            {
              name: "Harry",
              role: "Sales",
              color: "amber",
              tasks: [
                "1760 Lead Gen — finalize ICP with Matt",
                "1760 Lead Gen — deliver cold sequence copy by Fri 2/27",
                "TEC+ — draft 8 email templates (4 per campaign)",
                "Confirm phone number for GHL staff setup",
              ],
              deadline: "Sequence copy by Fri 2/27",
            },
          ].map((p, i) => (
            <div key={i} className="bg-gray-800/60 border border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-white font-semibold text-sm">{p.name}</span>
                  <span className="text-gray-500 text-xs ml-2">{p.role}</span>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded ${p.color === "blue" ? "bg-blue-500/20 text-blue-400" : p.color === "purple" ? "bg-purple-500/20 text-purple-400" : p.color === "emerald" ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"}`}>{p.deadline}</span>
              </div>
              <div className="space-y-1.5">
                {p.tasks.map((t, j) => (
                  <div key={j} className="flex gap-2 items-start text-xs">
                    <span className="text-gray-600 mt-0.5">→</span>
                    <span className="text-gray-300">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  // SLIDE 8: Risks
  {
    content: (
      <div className="flex flex-col h-full px-10 pt-10 pb-6">
        <div className="text-xs tracking-widest text-red-400 uppercase mb-2">Risk Register</div>
        <h2 className="text-2xl font-bold text-white mb-4">Active Risks + Decisions Needed</h2>
        <div className="space-y-3 flex-1">
          {[
            {
              risk: "BWOG domain reputation damage",
              impact: "High",
              prob: "Medium",
              mitigation: "MV-verified leads uploading to Campaign 1. 2-day monitoring window before ramp. Title diversification on next pull to get real comparative bounce data.",
              owner: "Mitch",
              color: "red",
            },
            {
              risk: "TEC+ Microsoft Bookings link pending",
              impact: "Low",
              prob: "Low",
              mitigation: "Domains warming, senders confirmed, footer approved. Only remaining dep is Joe's Bookings link — not blocking until sequences are loaded (~Mar 7).",
              owner: "Matt → Joe",
              color: "gray",
            },
            {
              risk: "Anarti infrastructure undersized for 2,600 contacts",
              impact: "High",
              prob: "Low",
              mitigation: "Planning 3 domains / 9 inboxes. Matt needs to confirm volume before domain purchase.",
              owner: "Mitch → Matt",
              color: "amber",
            },
            {
              risk: "Internal lead gen ICP/copy not delivered on time",
              impact: "High",
              prob: "Medium",
              mitigation: "Harry + Matt committed to Friday 2/27. Warmed inboxes hit readiness ~Mar 1. Any slip pushes launch.",
              owner: "Harry + Matt",
              color: "amber",
            },
            {
              risk: "Notion workspace incomplete blocks automation build",
              impact: "Medium",
              prob: "Low",
              mitigation: "Matt created workspace. Routing and templates still pending. Tobey's Central Intelligence automations sequenced off this.",
              owner: "Matt",
              color: "yellow",
            },
            {
              risk: "Coaching snapshot deleted — GHL demo asset lost",
              impact: "Low",
              prob: "N/A (occurred)",
              mitigation: "Rebuild after internal CRM work is complete. Not blocking any client work.",
              owner: "Mitch",
              color: "gray",
            },
          ].map((r, i) => (
            <div key={i} className="bg-gray-800/60 border border-gray-700 rounded-lg p-4 flex gap-4 items-start">
              <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${r.color === "red" ? "bg-red-400" : r.color === "amber" ? "bg-amber-400" : r.color === "yellow" ? "bg-yellow-400" : "bg-gray-500"}`} />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-white font-semibold text-sm">{r.risk}</span>
                  <span className="text-xs text-gray-500">{r.owner}</span>
                </div>
                <div className="flex gap-3 mt-1 text-xs">
                  <span className="text-gray-500">Impact: <span className={r.impact === "High" ? "text-red-400" : r.impact === "Medium" ? "text-amber-400" : "text-gray-400"}>{r.impact}</span></span>
                  <span className="text-gray-500">Probability: <span className="text-gray-400">{r.prob}</span></span>
                </div>
                <p className="text-xs text-gray-400 mt-1">{r.mitigation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

export default function Deck() {
  const [idx, setIdx] = useState(0);
  const s = slides[idx];
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col font-sans">
      <div className="flex-1 relative" style={{ minHeight: 560 }}>
        {s.content}
      </div>
      <div className="flex items-center justify-between px-6 py-3 border-t border-gray-800">
        <button
          onClick={() => setIdx(Math.max(0, idx - 1))}
          disabled={idx === 0}
          className="px-4 py-1.5 rounded bg-gray-800 text-gray-300 text-sm disabled:opacity-30 hover:bg-gray-700"
        >
          ← Prev
        </button>
        <div className="flex gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`w-2 h-2 rounded-full transition-colors ${i === idx ? "bg-blue-400" : "bg-gray-700 hover:bg-gray-600"}`}
            />
          ))}
        </div>
        <button
          onClick={() => setIdx(Math.min(slides.length - 1, idx + 1))}
          disabled={idx === slides.length - 1}
          className="px-4 py-1.5 rounded bg-gray-800 text-gray-300 text-sm disabled:opacity-30 hover:bg-gray-700"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
