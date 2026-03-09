"use client";
import { useState, useMemo } from "react";
const COLORS = {
  bg: "#0f1117",
  card: "#1a1d27",
  cardHover: "#222632",
  border: "#2a2e3a",
  text: "#e2e4e9",
  textMuted: "#8b8fa3",
  accent: "#6366f1",
  accentLight: "#818cf8",
  green: "#22c55e",
  greenBg: "#22c55e18",
  yellow: "#eab308",
  yellowBg: "#eab30818",
  red: "#ef4444",
  redBg: "#ef444418",
  blue: "#3b82f6",
  blueBg: "#3b82f618",
  purple: "#a855f7",
  purpleBg: "#a855f718",
  orange: "#f97316",
  orangeBg: "#f9731618",
};
const TEAM = [
  { id: "tobey", name: "Tobey", role: "Lead Developer", color: "#6366f1" },
  { id: "hazel", name: "Hazel", role: "Implementation", color: "#a855f7" },
  { id: "harry", name: "Harry", role: "Sales Lead", color: "#3b82f6" },
  { id: "matt", name: "Matt", role: "Chief Strategy", color: "#22c55e" },
  { id: "mitch", name: "Mitch", role: "CEO / PM", color: "#eab308" },
];
const PROJECTS = [
  {
    id: "bwog", name: "BWOG", client: "Laura Robichaux", type: "Client",
    status: "Phase 1 Incomplete / Phase 2 Live", health: "YELLOW", deadline: "Performance-based (10 discovery calls)",
    progress: 55, phase: "Phase 1 Incomplete \u00b7 Phase 2 Live",
    tasks: [
      { id: "b1", name: "Reply handling \u2014 define path (Instantly reply \u2192 triggers \u2192 handoff)", owner: "mitch", priority: "HIGH", status: "open", due: "2026-03-10" },
      { id: "b2", name: "Warm nurture sequence (MQL) \u2014 not built, leads sitting with no follow-up", owner: "tobey", priority: "HIGH", status: "open", due: "2026-03-12" },
      { id: "b3", name: "Hot lead pre-call sequence (SQL) \u2014 must route through Google Workspace inbox", owner: "tobey", priority: "HIGH", status: "open", due: "2026-03-12" },
      { id: "b4", name: "HubSpot lifecycle workflow audit \u2014 active vs draft vs missing", owner: "tobey", priority: "HIGH", status: "carry-over", due: "2026-03-09" },
      { id: "b5", name: "Verify all 5 Stan Store \u2192 HubSpot Zaps (all trigger paths)", owner: "tobey", priority: "MEDIUM", status: "carry-over", due: "2026-03-09" },
      { id: "b6", name: "Laura's 3 outstanding HubSpot questions", owner: "tobey", priority: "MEDIUM", status: "carry-over", due: "2026-03-09" },
      { id: "b7", name: "Test deal identification \u2014 keep or delete", owner: "tobey", priority: "LOW", status: "carry-over", due: "2026-03-09" },
      { id: "b8", name: "Google Drive link embedding in contact fields", owner: "tobey", priority: "LOW", status: "carry-over", due: "2026-03-09" },
      { id: "b9", name: "Lead Status verification (Feb changes)", owner: "tobey", priority: "MEDIUM", status: "carry-over", due: "2026-03-09" },
      { id: "b10", name: "Written audit report \u2192 #internal-by-way-of-grey (Mon EOD)", owner: "tobey", priority: "HIGH", status: "open", due: "2026-03-09" },
      { id: "b11", name: "Communicate exit KPI to Laura (10 discovery calls)", owner: "mitch", priority: "MEDIUM", status: "open", due: "2026-03-10" },
      { id: "b12", name: "Respond to Hazel's unanswered questions", owner: "mitch", priority: "MEDIUM", status: "open", due: "2026-03-09" },
      { id: "b13", name: "Slack notification routing verification", owner: "tobey", priority: "LOW", status: "in-progress", due: "2026-03-12" },
      { id: "b14", name: "Daily Instantly monitoring + lead uploads", owner: "hazel", priority: "MEDIUM", status: "ongoing", due: null },
      { id: "b15", name: "Stan Store \u2192 HubSpot Zap field mappings confirmed", owner: "tobey", priority: "MEDIUM", status: "complete", due: "2026-03-07" },
      { id: "b16", name: "ManyChat keyword trigger replacement", owner: "tobey", priority: "HIGH", status: "complete", due: "2026-03-07" },
      { id: "b17", name: "Contact Source property update + Zapier mapping", owner: "tobey", priority: "MEDIUM", status: "complete", due: "2026-03-07" },
    ],
    milestones: [
      { name: "Phase 1 CRM deployed (partial)", date: "2025-07-01", done: true },
      { name: "Outbound live", date: "2026-02-11", done: true },
      { name: "hello@ joined campaign", date: "2026-02-24", done: true },
      { name: "HubSpot audit report", date: "2026-03-09", done: false },
      { name: "Reply handling defined", date: "2026-03-10", done: false },
      { name: "MQL + SQL sequences built", date: "2026-03-12", done: false },
      { name: "Exit KPI: 10 discovery calls", date: null, done: false },
    ],
  },
  {
    id: "anarti", name: "Anarti Therapeutics", client: "Alka Badshah", type: "Client",
    status: "Infrastructure Warming", health: "RED", deadline: "Apr 3, 2026",
    progress: 28, phase: "Month Zero Build",
    tasks: [
      { id: "a1", name: "Tracks 2-4 full email copy (Emails 2-7 each)", owner: "matt", priority: "CRITICAL", status: "overdue", due: "2026-03-03" },
      { id: "a2", name: "Contact list rerun from John (remove competitor contamination)", owner: "mitch", priority: "HIGH", status: "blocked", due: "2026-03-10" },
      { id: "a3", name: "Infrastructure sizing \u2014 list rerun count determines 3 vs 4-5 domains", owner: "mitch", priority: "HIGH", status: "blocked", due: "2026-03-10" },
      { id: "a4", name: "KPI definition alignment (booked meeting \u2260 closed account)", owner: "matt", priority: "HIGH", status: "open", due: "2026-03-10" },
      { id: "a5", name: "Pricing discrepancy resolution ($15-25 vs $25-30)", owner: "matt", priority: "MEDIUM", status: "open", due: "2026-03-10" },
      { id: "a6", name: "Track 1 (Massage Therapists) \u2014 template + load into Instantly", owner: "hazel", priority: "HIGH", status: "ready", due: "2026-03-10" },
      { id: "a7", name: "Conference sequences \u2014 pre-build templates from outlines now", owner: "hazel", priority: "MEDIUM", status: "ready", due: "2026-03-14" },
      { id: "a8", name: "Attendee list staging spreadsheet (answer Hazel's Mar 6 question)", owner: "mitch", priority: "MEDIUM", status: "open", due: "2026-03-09" },
      { id: "a9", name: "GTM session presentation (implementation plan, not kickoff)", owner: "mitch", priority: "HIGH", status: "in-progress", due: "2026-03-10" },
      { id: "a10", name: "Month Zero \u2014 all systems ready", owner: "tobey", priority: "HIGH", status: "open", due: "2026-03-14" },
      { id: "a11", name: "Content extraction \u2014 Session 1 (3-4 pieces target)", owner: "hazel", priority: "MEDIUM", status: "open", due: "2026-03-13" },
      { id: "a12", name: "Content Session 2 scheduling", owner: "mitch", priority: "LOW", status: "open", due: "2026-03-17" },
      { id: "a13", name: "Email signature + template assets", owner: "hazel", priority: "MEDIUM", status: "complete", due: "2026-03-07" },
      { id: "a14", name: "Brand asset extraction from Google Drive", owner: "hazel", priority: "LOW", status: "complete", due: "2026-03-07" },
      { id: "a15", name: "AI SDR data tables \u2014 Anarti (9 personas, 3 domains, 4 tracks)", owner: "mitch", priority: "HIGH", status: "blocked", due: "2026-03-11" },
    ],
    milestones: [
      { name: "Infrastructure warming started", date: "2026-02-24", done: true },
      { name: "Track 1 copy delivered", date: "2026-03-01", done: true },
      { name: "Session 1 content extracted", date: "2026-03-06", done: true },
      { name: "GTM session with Alka", date: "2026-03-10", done: false },
      { name: "Track 1 loaded in Instantly", date: "2026-03-10", done: false },
      { name: "Month Zero complete", date: "2026-03-14", done: false },
      { name: "System launch / KPI clock starts", date: "2026-03-17", done: false },
      { name: "Conference attendee list arrives", date: "2026-03-25", done: false },
      { name: "Alka travels to conference", date: "2026-04-03", done: false },
      { name: "Conference (Apr 6-9)", date: "2026-04-06", done: false },
      { name: "60-day KPI evaluation", date: "2026-05-16", done: false },
    ],
  },
  {
    id: "tec", name: "TEC+ Consulting", client: "Joseph Gaunt", type: "Client",
    status: "Infrastructure Warming", health: "YELLOW", deadline: "Mid-March launch \u2192 90-day clock",
    progress: 22, phase: "Pre-Launch",
    tasks: [
      { id: "t1", name: "Gaming sequences (4-touch) \u2014 confirm status Monday", owner: "harry", priority: "HIGH", status: "overdue", due: "2026-02-28" },
      { id: "t2", name: "Mining sequences (4-touch) \u2014 confirm status Monday", owner: "harry", priority: "HIGH", status: "overdue", due: "2026-02-28" },
      { id: "t3", name: "Contact lists \u2014 Gaming (MGA/GBGA/AGCC, 200-2K employees)", owner: "hazel", priority: "HIGH", status: "open", due: "2026-03-12" },
      { id: "t4", name: "Contact lists \u2014 Mining (FTSE 250/350, 500+ emp, UK/London HQ)", owner: "hazel", priority: "HIGH", status: "open", due: "2026-03-12" },
      { id: "t5", name: "Pending items from Joe (domain, Outlook, booking, footer, sign-off, LIA)", owner: "harry", priority: "HIGH", status: "blocked", due: "2026-03-10" },
      { id: "t6", name: "Slack channel removal follow-up", owner: "mitch", priority: "LOW", status: "open", due: "2026-03-10" },
      { id: "t7", name: "AI SDR data tables \u2014 TEC+ (6 personas, 2 domains, 2 campaigns)", owner: "mitch", priority: "HIGH", status: "blocked", due: "2026-03-11" },
    ],
    milestones: [
      { name: "Contract signed", date: "2026-01-15", done: true },
      { name: "Domains purchased + warming", date: "2026-02-01", done: true },
      { name: "Sequences drafted", date: "2026-03-10", done: false },
      { name: "Sequences approved by Joe", date: "2026-03-12", done: false },
      { name: "Campaign launch / 90-day clock starts", date: "2026-03-17", done: false },
      { name: "Phase 2 Financial Services (if needed)", date: "2026-04-17", done: false },
      { name: "90-day KPI window ends", date: "2026-06-15", done: false },
    ],
  },
  {
    id: "ryse", name: "RYSE Creative", client: "Ryan & Martina Sebring", type: "Client",
    status: "Discovery", health: "GREEN", deadline: "Aug 2026",
    progress: 15, phase: "Phase 1 \u2014 Discovery",
    tasks: [
      { id: "r1", name: "Session 3 \u2014 workflow extraction (Matt leads)", owner: "matt", priority: "MEDIUM", status: "open", due: "2026-03-14" },
      { id: "r2", name: "Session 4 \u2014 final discovery", owner: "matt", priority: "MEDIUM", status: "open", due: "2026-03-21" },
      { id: "r3", name: "Central Brain build (Pillar 1, Week 5)", owner: "tobey", priority: "HIGH", status: "open", due: "2026-03-28" },
    ],
    milestones: [
      { name: "Session 1 complete", date: "2026-02-17", done: true },
      { name: "Session 2 complete", date: "2026-02-24", done: true },
      { name: "Pillar 1 tech spec posted", date: "2026-03-01", done: true },
      { name: "Discovery complete (Session 4)", date: "2026-03-21", done: false },
      { name: "Central Brain build starts", date: "2026-03-24", done: false },
      { name: "GHL CRM spec (Pillar 2, Month 3)", date: "2026-05-01", done: false },
    ],
  },
  {
    id: "aisdr", name: "AI SDR", client: null, type: "Internal",
    status: "Near Complete", health: "YELLOW", deadline: "Blocks TEC+ and 1760 launches",
    progress: 78, phase: "Testing \u2192 Configuration",
    tasks: [
      { id: "s1", name: "Playbook layer: campaign-level confirmed \u2192 communicate to Tobey", owner: "mitch", priority: "HIGH", status: "ready", due: "2026-03-09" },
      { id: "s2", name: "Interested-prospect behavior: per-project (auto-book URL + human routing toggle)", owner: "tobey", priority: "HIGH", status: "open", due: "2026-03-10" },
      { id: "s3", name: "Data table template document \u2192 Mitch", owner: "tobey", priority: "HIGH", status: "overdue", due: "2026-03-05" },
      { id: "s4", name: "Populate tables \u2014 Anarti (9 personas, 3 domains, 4 tracks)", owner: "mitch", priority: "HIGH", status: "blocked", due: "2026-03-11" },
      { id: "s5", name: "Populate tables \u2014 TEC+ (6 personas, 2 domains, 2 campaigns)", owner: "mitch", priority: "HIGH", status: "blocked", due: "2026-03-11" },
      { id: "s6", name: "Populate tables \u2014 1760 Internal (15 personas, 5 domains)", owner: "mitch", priority: "MEDIUM", status: "blocked", due: "2026-03-12" },
      { id: "s7", name: "Validate config for all 3 campaigns", owner: "tobey", priority: "HIGH", status: "blocked", due: "2026-03-12" },
      { id: "s8", name: "Walkthrough with Mitch \u2014 classification + GHL write-back", owner: "tobey", priority: "MEDIUM", status: "open", due: "2026-03-13" },
      { id: "s9", name: "Per-sender identity routing", owner: "tobey", priority: "HIGH", status: "complete", due: "2026-03-07" },
      { id: "s10", name: "Classification branch testing (all 6 branches)", owner: "tobey", priority: "HIGH", status: "complete", due: "2026-03-07" },
    ],
    milestones: [
      { name: "Classification testing complete", date: "2026-03-07", done: true },
      { name: "Sender identity routing complete", date: "2026-03-07", done: true },
      { name: "Data table template sent", date: "2026-03-09", done: false },
      { name: "All 3 campaign tables populated", date: "2026-03-12", done: false },
      { name: "Walkthrough complete", date: "2026-03-13", done: false },
      { name: "Production deployment", date: "2026-03-14", done: false },
    ],
  },
  {
    id: "ghl", name: "Internal CRM (GHL)", client: null, type: "Internal",
    status: "Build", health: "GREEN", deadline: null,
    progress: 65, phase: "Build",
    tasks: [
      { id: "g1", name: "Coaching CRM Starter snapshot testing", owner: "hazel", priority: "MEDIUM", status: "in-progress", due: "2026-03-12" },
      { id: "g2", name: "Harry lead import \u2014 Google Sheet location (Tobey asked, unanswered)", owner: "mitch", priority: "MEDIUM", status: "open", due: "2026-03-09" },
      { id: "g3", name: "Booking flow + automations", owner: "hazel", priority: "HIGH", status: "complete", due: "2026-03-07" },
      { id: "g4", name: "Email templates (6)", owner: "hazel", priority: "MEDIUM", status: "complete", due: "2026-03-07" },
      { id: "g5", name: "Slack notification automations (7 Zapier webhooks)", owner: "hazel", priority: "MEDIUM", status: "complete", due: "2026-03-07" },
      { id: "g6", name: "New lead \u2192 Harry owner assignment", owner: "hazel", priority: "HIGH", status: "complete", due: "2026-03-07" },
    ],
    milestones: [
      { name: "Booking flow live", date: "2026-03-07", done: true },
      { name: "Slack notifications wired", date: "2026-03-07", done: true },
      { name: "Snapshot tested + clean", date: "2026-03-12", done: false },
    ],
  },
  {
    id: "leadgen", name: "1760 Lead Gen", client: null, type: "Internal",
    status: "Pre-Launch", health: "YELLOW", deadline: null,
    progress: 18, phase: "ICP + Messaging",
    tasks: [
      { id: "l1", name: "ICP criteria posted to #internal-lead-gen", owner: "matt", priority: "HIGH", status: "blocked", due: "2026-03-09" },
      { id: "l2", name: "Display name changes on 10 inboxes (warming preserved)", owner: "hazel", priority: "MEDIUM", status: "in-progress", due: "2026-03-10" },
      { id: "l3", name: "5 new persona inboxes \u2014 fresh warming required", owner: "hazel", priority: "MEDIUM", status: "in-progress", due: "2026-03-24" },
      { id: "l4", name: "AI SDR data tables \u2014 1760 (15 personas, 5 domains)", owner: "mitch", priority: "MEDIUM", status: "blocked", due: "2026-03-12" },
    ],
    milestones: [
      { name: "ICP finalized", date: "2026-03-06", done: true },
      { name: "Growth Playbook posted", date: "2026-03-06", done: true },
      { name: "AI SDR ready (dependency)", date: "2026-03-14", done: false },
      { name: "Campaign launch", date: "2026-03-24", done: false },
    ],
  },
  {
    id: "notion", name: "Notion PM Workspace", client: null, type: "Internal",
    status: "Setup", health: "GREEN", deadline: null,
    progress: 40, phase: "Setup",
    tasks: [
      { id: "n1", name: "Populate Status property on Deliverables", owner: "mitch", priority: "LOW", status: "open", due: null },
      { id: "n2", name: "Populate target dates on Deliverables", owner: "mitch", priority: "LOW", status: "open", due: null },
      { id: "n3", name: "Create Decisions Log database", owner: "mitch", priority: "LOW", status: "open", due: null },
      { id: "n4", name: "Build filtered views", owner: "mitch", priority: "LOW", status: "open", due: null },
    ],
    milestones: [
      { name: "Databases created + seeded", date: "2026-03-01", done: true },
    ],
  },
];
const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  complete: { label: "Complete", color: COLORS.green, bg: COLORS.greenBg },
  ongoing: { label: "Ongoing", color: COLORS.blue, bg: COLORS.blueBg },
  "in-progress": { label: "In Progress", color: COLORS.blue, bg: COLORS.blueBg },
  ready: { label: "Ready", color: COLORS.accentLight, bg: "#818cf818" },
  open: { label: "Open", color: COLORS.textMuted, bg: "#8b8fa318" },
  "carry-over": { label: "Carry-Over", color: COLORS.yellow, bg: COLORS.yellowBg },
  blocked: { label: "Blocked", color: COLORS.red, bg: COLORS.redBg },
  overdue: { label: "Overdue", color: COLORS.red, bg: COLORS.redBg },
};
const PRIORITY_CONFIG: Record<string, { color: string; weight: number }> = {
  CRITICAL: { color: COLORS.red, weight: 4 },
  HIGH: { color: COLORS.orange, weight: 3 },
  MEDIUM: { color: COLORS.yellow, weight: 2 },
  LOW: { color: COLORS.textMuted, weight: 1 },
};
const HEALTH_CONFIG: Record<string, { color: string; bg: string }> = {
  GREEN: { color: COLORS.green, bg: COLORS.greenBg },
  YELLOW: { color: COLORS.yellow, bg: COLORS.yellowBg },
  RED: { color: COLORS.red, bg: COLORS.redBg },
};
const TODAY = new Date("2026-03-08");
const GANTT_START = new Date("2026-02-23");
const GANTT_END = new Date("2026-04-12");
const GANTT_DAYS = Math.ceil((GANTT_END.getTime() - GANTT_START.getTime()) / 86400000);
function daysBetween(a: Date, b: Date) { return Math.ceil((b.getTime() - a.getTime()) / 86400000); }
function formatDate(d: string | Date | null) {
  if (!d) return "\u2014";
  const dt = new Date(d as string);
  return dt.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
function daysUntil(d: string | null) {
  if (!d) return null;
  return daysBetween(TODAY, new Date(d));
}
function Pill({ label, color, bg }: { label: string; color: string; bg: string }) {
  return (
    <span style={{ display: "inline-block", padding: "2px 8px", borderRadius: 4, fontSize: 11, fontWeight: 600, color, background: bg, letterSpacing: "0.02em", whiteSpace: "nowrap" }}>
      {label}
    </span>
  );
}
function ProgressBar({ value, color = COLORS.accent, height = 6, bg = COLORS.border }: { value: number; color?: string; height?: number; bg?: string }) {
  return (
    <div style={{ width: "100%", height, borderRadius: height / 2, background: bg, overflow: "hidden" }}>
      <div style={{ width: `${Math.min(100, Math.max(0, value))}%`, height: "100%", borderRadius: height / 2, background: color, transition: "width 0.4s ease" }} />
    </div>
  );
}
function Card({ children, style, onClick, className }: { children: React.ReactNode; style?: React.CSSProperties; onClick?: () => void; className?: string }) {
  return (
    <div onClick={onClick} className={className} style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 16, ...style }}>
      {children}
    </div>
  );
}
function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 style={{ margin: "0 0 12px 0", fontSize: 13, fontWeight: 700, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: "0.06em" }}>{children}</h3>;
}
function WeeklyPriorities({ onNav }: { onNav: (pid: string) => void }) {
  const priorities = [
    { id: "P1", label: "BWOG HubSpot Audit", project: "bwog" as string | null, desc: "Confirm Phase 1 state before anything else ships", color: COLORS.red },
    { id: "P2", label: "AI SDR Config", project: "aisdr" as string | null, desc: "Configure for Anarti, TEC+, 1760 \u2014 both launch next week", color: COLORS.orange },
    { id: "P3", label: "Outbound Sequences", project: "anarti" as string | null, desc: "Anarti Track 1 load + TEC+ sequence status", color: COLORS.yellow },
    { id: "P4", label: "Authority Content", project: "anarti" as string | null, desc: "Anarti Session 1 \u2192 3-4 content pieces", color: COLORS.blue },
    { id: "P5", label: "Pipeline + Internal", project: null as string | null, desc: "GHL snapshot test, RYSE, Notion, 1760 Lead Gen", color: COLORS.textMuted },
  ];
  return (
    <Card style={{ marginBottom: 16, padding: 12, borderColor: COLORS.accent + "44" }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.accent, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Week of Mar 9-13 \u2014 Ranked Priorities</div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {priorities.map(p => (
          <div key={p.id} onClick={() => p.project && onNav(p.project)} style={{
            flex: "1 1 130px", minWidth: 130, padding: "8px 10px", borderRadius: 6,
            background: `${p.color}0a`, border: `1px solid ${p.color}33`, cursor: p.project ? "pointer" : "default"
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: p.color, marginBottom: 2 }}>{p.id}</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.text, marginBottom: 2 }}>{p.label}</div>
            <div style={{ fontSize: 10, color: COLORS.textMuted, lineHeight: 1.3 }}>{p.desc}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}
export default function Deck() {
  const [filterTeam, setFilterTeam] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const allTasks = useMemo(() => PROJECTS.flatMap(p => p.tasks.map(t => ({ ...t, project: p.id, projectName: p.name }))), []);
  const filtered = useMemo(() => {
    return allTasks.filter(t => {
      if (filterTeam !== "all" && t.owner !== filterTeam) return false;
      if (filterPriority !== "all" && t.priority !== filterPriority) return false;
      if (filterStatus !== "all" && t.status !== filterStatus) return false;
      if (filterType !== "all") {
        const proj = PROJECTS.find(p => p.id === t.project);
        if (filterType === "client" && proj?.type !== "Client") return false;
        if (filterType === "internal" && proj?.type !== "Internal") return false;
      }
      return true;
    });
  }, [allTasks, filterTeam, filterPriority, filterStatus, filterType]);
  const filteredProjects = useMemo(() => {
    if (filterType === "all") return PROJECTS;
    return PROJECTS.filter(p => filterType === "client" ? p.type === "Client" : p.type === "Internal");
  }, [filterType]);
  const stats = useMemo(() => {
    const total = filtered.length;
    const complete = filtered.filter(t => t.status === "complete").length;
    const blocked = filtered.filter(t => t.status === "blocked" || t.status === "overdue").length;
    const inFlight = total - complete - blocked;
    return { total, complete, blocked, inFlight, pct: total ? Math.round((complete / total) * 100) : 0 };
  }, [filtered]);
  const upcoming = useMemo(() => {
    return filtered
      .filter(t => t.due && t.status !== "complete")
      .sort((a, b) => new Date(a.due!).getTime() - new Date(b.due!).getTime())
      .slice(0, 10);
  }, [filtered]);
  const workload = useMemo(() => {
    return TEAM.map(m => {
      const tasks = filtered.filter(t => t.owner === m.id && t.status !== "complete");
      const crit = tasks.filter(t => t.priority === "CRITICAL" || t.priority === "HIGH").length;
      const blk = tasks.filter(t => t.status === "blocked" || t.status === "overdue").length;
      return { ...m, tasks: tasks.length, critical: crit, blocked: blk };
    });
  }, [filtered]);
  const selStyle = (active: boolean): React.CSSProperties => ({
    padding: "4px 10px", borderRadius: 6, fontSize: 12, fontWeight: 500, cursor: "pointer", border: "1px solid",
    borderColor: active ? COLORS.accent : COLORS.border, background: active ? COLORS.accent + "22" : "transparent",
    color: active ? COLORS.accentLight : COLORS.textMuted, transition: "all 0.15s",
  });
  const handleProjectNav = (pid: string) => {
    setActiveProject(prev => prev === pid ? null : pid);
  };
  return (
    <div style={{ background: COLORS.bg, color: COLORS.text, minHeight: "100vh", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", padding: "24px 20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: "-0.01em" }}>1760 Strategic AI</h1>
          <p style={{ margin: "2px 0 0", fontSize: 13, color: COLORS.textMuted }}>Operations Dashboard \u2014 March 8, 2026</p>
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {[{ v: "all", l: "All" }, { v: "client", l: "Clients" }, { v: "internal", l: "Internal" }].map(f => (
            <button key={f.v} onClick={() => setFilterType(f.v)} style={selStyle(filterType === f.v)}>{f.l}</button>
          ))}
        </div>
      </div>
      <WeeklyPriorities onNav={handleProjectNav} />
      <Card style={{ marginBottom: 16, padding: 12 }}>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: "0.06em" }}>Filter</span>
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            <button onClick={() => setFilterTeam("all")} style={selStyle(filterTeam === "all")}>All Team</button>
            {TEAM.map(m => <button key={m.id} onClick={() => setFilterTeam(m.id)} style={selStyle(filterTeam === m.id)}>{m.name}</button>)}
          </div>
          <div style={{ width: 1, height: 20, background: COLORS.border }} />
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            <button onClick={() => setFilterPriority("all")} style={selStyle(filterPriority === "all")}>All Priority</button>
            {["CRITICAL", "HIGH", "MEDIUM", "LOW"].map(p => <button key={p} onClick={() => setFilterPriority(p)} style={selStyle(filterPriority === p)}>{p}</button>)}
          </div>
          <div style={{ width: 1, height: 20, background: COLORS.border }} />
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            <button onClick={() => setFilterStatus("all")} style={selStyle(filterStatus === "all")}>All Status</button>
            {["blocked", "overdue", "carry-over", "in-progress", "open", "ready", "complete"].map(s => (
              <button key={s} onClick={() => setFilterStatus(s)} style={selStyle(filterStatus === s)}>{STATUS_CONFIG[s]?.label || s}</button>
            ))}
          </div>
        </div>
      </Card>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10, marginBottom: 16 }}>
        {[
          { label: "Total Tasks", value: stats.total, color: COLORS.text },
          { label: "Complete", value: stats.complete, color: COLORS.green },
          { label: "In Flight", value: stats.inFlight, color: COLORS.blue },
          { label: "Blocked / Overdue", value: stats.blocked, color: COLORS.red },
          { label: "Completion", value: `${stats.pct}%`, color: COLORS.accent },
        ].map((s, i) => (
          <Card key={i} style={{ textAlign: "center", padding: 12 }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 2 }}>{s.label}</div>
          </Card>
        ))}
      </div>
      <SectionTitle>Project Health</SectionTitle>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 10, marginBottom: 20 }}>
        {filteredProjects.map(p => {
          const hc = HEALTH_CONFIG[p.health];
          const projTasks = filtered.filter(t => t.project === p.id);
          const projComplete = projTasks.filter(t => t.status === "complete").length;
          const projPct = projTasks.length ? Math.round((projComplete / projTasks.length) * 100) : p.progress;
          const projBlocked = projTasks.filter(t => t.status === "blocked" || t.status === "overdue").length;
          const isActive = activeProject === p.id;
          return (
            <Card key={p.id} style={{ cursor: "pointer", borderColor: isActive ? COLORS.accent : COLORS.border, padding: 14 }}
              onClick={() => handleProjectNav(p.id)}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <span style={{ fontSize: 14, fontWeight: 600 }}>{p.name}</span>
                <Pill label={p.health} color={hc.color} bg={hc.bg} />
              </div>
              <div style={{ fontSize: 11, color: COLORS.textMuted, marginBottom: 2 }}>{p.phase}</div>
              <div style={{ fontSize: 11, color: COLORS.textMuted, marginBottom: 8 }}>
                {p.deadline ? `Deadline: ${p.deadline}` : "No hard deadline"}
              </div>
              <ProgressBar value={projPct} color={hc.color} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: COLORS.textMuted, marginTop: 4 }}>
                <span>{projComplete}/{projTasks.length} tasks</span>
                {projBlocked > 0 && <span style={{ color: COLORS.red }}>{projBlocked} blocked</span>}
              </div>
            </Card>
          );
        })}
      </div>
      <SectionTitle>Timeline (Feb 23 \u2014 Apr 12)</SectionTitle>
      <style>{`
        .gantt-scroll::-webkit-scrollbar { height: 4px; }
        .gantt-scroll::-webkit-scrollbar-track { background: transparent; }
        .gantt-scroll::-webkit-scrollbar-thumb { background: #2a2e3a; border-radius: 4px; }
        .gantt-scroll::-webkit-scrollbar-thumb:hover { background: #6366f1; }
        .gantt-scroll { scrollbar-width: thin; scrollbar-color: #2a2e3a transparent; }
      `}</style>
      <Card className="gantt-scroll" style={{ marginBottom: 20, overflowX: "auto" }}>
        <div style={{ minWidth: 700 }}>
          <div style={{ display: "flex", borderBottom: `1px solid ${COLORS.border}`, paddingBottom: 6, marginBottom: 8 }}>
            <div style={{ width: 170, flexShrink: 0 }} />
            <div style={{ flex: 1, display: "flex" }}>
              {Array.from({ length: Math.ceil(GANTT_DAYS / 7) }, (_, i) => {
                const d = new Date(GANTT_START); d.setDate(d.getDate() + i * 7);
                return (
                  <div key={i} style={{ flex: "0 0 auto", width: `${(7 / GANTT_DAYS) * 100}%`, fontSize: 10, color: COLORS.textMuted }}>
                    {formatDate(d)}
                  </div>
                );
              })}
            </div>
          </div>
          {(activeProject ? filteredProjects.filter(p => p.id === activeProject) : filteredProjects).map(p => {
            const todayPct = (daysBetween(GANTT_START, TODAY) / GANTT_DAYS) * 100;
            const hc = HEALTH_CONFIG[p.health];
            return (
              <div key={p.id} style={{ display: "flex", alignItems: "center", height: 28, marginBottom: 2 }}>
                <div style={{ width: 170, flexShrink: 0, fontSize: 12, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", paddingRight: 8 }}>
                  <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: 4, background: hc.color, marginRight: 6 }} />
                  {p.name}
                </div>
                <div style={{ flex: 1, position: "relative", height: "100%", background: `${COLORS.border}44`, borderRadius: 3 }}>
                  <div style={{ position: "absolute", left: `${todayPct}%`, top: 0, bottom: 0, width: 1, background: COLORS.accent, opacity: 0.5, zIndex: 2 }} />
                  {p.milestones.filter(m => m.date).map((m, i) => {
                    const md = new Date(m.date!);
                    if (md < GANTT_START || md > GANTT_END) return null;
                    const pct = (daysBetween(GANTT_START, md) / GANTT_DAYS) * 100;
                    return (
                      <div key={i} title={`${m.name} \u2014 ${formatDate(m.date)}`} style={{
                        position: "absolute", left: `${pct}%`, top: "50%", transform: "translate(-50%, -50%) rotate(45deg)",
                        width: m.done ? 8 : 7, height: m.done ? 8 : 7,
                        background: m.done ? COLORS.green : hc.color,
                        border: m.done ? "none" : `1.5px solid ${hc.color}`,
                        borderRadius: 1, zIndex: 3, cursor: "default",
                      }} />
                    );
                  })}
                  {p.tasks.filter(t => t.due && filtered.some(f => f.id === t.id)).map(t => {
                    const td = new Date(t.due!);
                    if (td < GANTT_START || td > GANTT_END) return null;
                    const pct = (daysBetween(GANTT_START, td) / GANTT_DAYS) * 100;
                    const sc = STATUS_CONFIG[t.status];
                    return (
                      <div key={t.id} title={`${t.name} \u2014 ${formatDate(t.due)} [${t.status}]`} style={{
                        position: "absolute", left: `${pct}%`, top: "50%", transform: "translate(-50%, -50%)",
                        width: 6, height: 6, borderRadius: "50%",
                        background: sc?.color || COLORS.textMuted, zIndex: 3, cursor: "default",
                      }} />
                    );
                  })}
                </div>
              </div>
            );
          })}
          <div style={{ display: "flex", gap: 16, marginTop: 10, paddingLeft: 170 }}>
            {[
              { el: <div style={{ width: 7, height: 7, transform: "rotate(45deg)", background: COLORS.green, borderRadius: 1 }} />, t: "Milestone (done)" },
              { el: <div style={{ width: 7, height: 7, transform: "rotate(45deg)", border: `1.5px solid ${COLORS.yellow}`, borderRadius: 1 }} />, t: "Milestone (pending)" },
              { el: <div style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS.blue }} />, t: "Task" },
              { el: <div style={{ width: 1, height: 12, background: COLORS.accent }} />, t: "Today" },
            ].map((l, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10, color: COLORS.textMuted }}>{l.el} {l.t}</div>
            ))}
          </div>
        </div>
      </Card>
      <SectionTitle>Team Workload (Active Tasks)</SectionTitle>
      <Card style={{ marginBottom: 20 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 }}>
          {workload.map(m => {
            const maxTasks = Math.max(...workload.map(w => w.tasks), 1);
            return (
              <div key={m.id} style={{ padding: 10, borderRadius: 8, background: `${m.color}08`, border: `1px solid ${m.color}22` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: m.color }}>{m.name}</span>
                  <span style={{ fontSize: 18, fontWeight: 700 }}>{m.tasks}</span>
                </div>
                <div style={{ fontSize: 10, color: COLORS.textMuted, marginBottom: 6 }}>{m.role}</div>
                <ProgressBar value={(m.tasks / maxTasks) * 100} color={m.color} height={4} />
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                  {m.critical > 0 && <span style={{ fontSize: 10, color: COLORS.orange }}>{m.critical} crit/high</span>}
                  {m.blocked > 0 && <span style={{ fontSize: 10, color: COLORS.red }}>{m.blocked} blocked</span>}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
        <div>
          <SectionTitle>Upcoming Deadlines</SectionTitle>
          <Card style={{ padding: 0 }}>
            {upcoming.length === 0 ? (
              <div style={{ padding: 16, fontSize: 12, color: COLORS.textMuted }}>No upcoming deadlines match filters.</div>
            ) : upcoming.map((t, i) => {
              const days = daysUntil(t.due);
              const overdue = days !== null && days < 0;
              const urgent = days !== null && days <= 2 && !overdue;
              const sc = STATUS_CONFIG[t.status];
              const owner = TEAM.find(m => m.id === t.owner);
              return (
                <div key={t.id} style={{
                  padding: "10px 14px", borderBottom: i < upcoming.length - 1 ? `1px solid ${COLORS.border}` : "none",
                  display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8
                }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.name}</div>
                    <div style={{ display: "flex", gap: 6, marginTop: 3, alignItems: "center", flexWrap: "wrap" }}>
                      <span style={{ fontSize: 10, color: owner?.color || COLORS.textMuted }}>{owner?.name}</span>
                      <span style={{ fontSize: 10, color: COLORS.textMuted }}>\u00b7</span>
                      <span style={{ fontSize: 10, color: COLORS.textMuted }}>{t.projectName}</span>
                      {sc && <Pill label={sc.label} color={sc.color} bg={sc.bg} />}
                    </div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: overdue ? COLORS.red : urgent ? COLORS.yellow : COLORS.text }}>
                      {formatDate(t.due)}
                    </div>
                    <div style={{ fontSize: 10, color: overdue ? COLORS.red : urgent ? COLORS.yellow : COLORS.textMuted }}>
                      {overdue ? `${Math.abs(days!)}d overdue` : days === 0 ? "Today" : `${days}d`}
                    </div>
                  </div>
                </div>
              );
            })}
          </Card>
        </div>
        <div>
          <SectionTitle>Milestone Timeline</SectionTitle>
          <Card style={{ padding: "12px 14px", maxHeight: 420, overflowY: "auto" }}>
            {(() => {
              const allMs = (activeProject ? filteredProjects.filter(p => p.id === activeProject) : filteredProjects)
                .flatMap(p => p.milestones.filter(m => m.date).map(m => ({ ...m, project: p.name, health: p.health })))
                .sort((a, b) => new Date(a.date!).getTime() - new Date(b.date!).getTime());
              return allMs.length === 0 ? (
                <div style={{ fontSize: 12, color: COLORS.textMuted }}>No milestones match filters.</div>
              ) : (
                <div style={{ position: "relative", paddingLeft: 16 }}>
                  <div style={{ position: "absolute", left: 5, top: 4, bottom: 4, width: 1, background: COLORS.border }} />
                  {allMs.map((m, i) => {
                    const days = daysUntil(m.date);
                    const isPast = days !== null && days < 0;
                    return (
                      <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start", position: "relative" }}>
                        <div style={{
                          position: "absolute", left: -13, top: 4,
                          width: 10, height: 10, borderRadius: "50%",
                          background: m.done ? COLORS.green : isPast ? COLORS.red : COLORS.border,
                          border: m.done ? "none" : `2px solid ${HEALTH_CONFIG[m.health]?.color || COLORS.border}`,
                        }} />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 12, fontWeight: 500, color: m.done ? COLORS.green : COLORS.text }}>{m.name}</div>
                          <div style={{ fontSize: 10, color: COLORS.textMuted }}>{m.project} \u00b7 {formatDate(m.date)}</div>
                        </div>
                        {m.done && <span style={{ fontSize: 10, color: COLORS.green }}>done</span>}
                        {!m.done && isPast && <span style={{ fontSize: 10, color: COLORS.red }}>past due</span>}
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </Card>
        </div>
      </div>
      <SectionTitle>Cross-Project Blockers</SectionTitle>
      <Card style={{ padding: 0, marginBottom: 20 }}>
        {[
          { issue: "Anarti Tracks 2-4 full email copy (Emails 2-7)", projects: "Anarti", owner: "Matt", due: "Mar 3 \u2014 overdue", sev: "CRITICAL" },
          { issue: "BWOG reply handling automation (Instantly \u2192 HubSpot lifecycle)", projects: "BWOG", owner: "Mitch/Tobey", due: "This week", sev: "HIGH" },
          { issue: "Anarti contact list rerun from John (competitor contamination)", projects: "Anarti", owner: "Alka/John", due: "Before Mar 10 GTM", sev: "HIGH" },
          { issue: "TEC+ pending items from Joe (domain, Outlook, booking, footer, sign-off, LIA)", projects: "TEC+", owner: "Joe/Harry", due: "Before launch", sev: "HIGH" },
          { issue: "Harry's TEC+ draft sequences (Gaming + Mining, 4-touch each)", projects: "TEC+", owner: "Harry", due: "Feb 28 \u2014 status unknown", sev: "HIGH" },
          { issue: "Attendee list staging spreadsheet (Hazel's question unanswered)", projects: "Anarti", owner: "Mitch", due: "Monday", sev: "MEDIUM" },
          { issue: "AI SDR data table template document from Tobey", projects: "AI SDR", owner: "Tobey", due: "Mar 5 \u2014 overdue", sev: "MEDIUM" },
        ].map((b, i, arr) => (
          <div key={i} style={{ padding: "10px 14px", borderBottom: i < arr.length - 1 ? `1px solid ${COLORS.border}` : "none", display: "flex", alignItems: "center", gap: 10 }}>
            <Pill label={b.sev} color={PRIORITY_CONFIG[b.sev]?.color} bg={PRIORITY_CONFIG[b.sev]?.color + "18"} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 500 }}>{b.issue}</div>
              <div style={{ fontSize: 10, color: COLORS.textMuted }}>{b.projects} \u00b7 {b.owner}</div>
            </div>
            <div style={{ fontSize: 11, color: b.due.includes("overdue") || b.due === "ASAP" || b.due.includes("unknown") ? COLORS.red : COLORS.textMuted, flexShrink: 0, textAlign: "right" }}>{b.due}</div>
          </div>
        ))}
      </Card>
      <SectionTitle>Decisions Needed</SectionTitle>
      <Card style={{ padding: 0, marginBottom: 20 }}>
        {[
          { q: "AI SDR: Campaign-level playbook confirmed \u2014 communicate to Tobey, remove persona-level branching", owner: "Mitch \u2192 Tobey", impact: "Resolved \u2014 needs communication", resolved: true },
          { q: "AI SDR: Interested-prospect behavior is per-project \u2014 data table needs auto-book URL + human routing toggle", owner: "Tobey", impact: "Resolved \u2014 needs build (1760 = auto-book Harry, clients = per engagement)", resolved: true },
          { q: "Anarti: Pricing in outreach copy \u2014 $15-25 or $25-30? Asking Alka at Mar 10 GTM", owner: "Mitch/Alka", impact: "Sequences blocked until locked", resolved: false },
        ].map((d, i, arr) => (
          <div key={i} style={{ padding: "10px 14px", borderBottom: i < arr.length - 1 ? `1px solid ${COLORS.border}` : "none", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: d.resolved ? COLORS.green : COLORS.accent, flexShrink: 0, width: 20 }}>{d.resolved ? "\u2713" : i + 1}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 500, color: d.resolved ? COLORS.green : COLORS.text }}>{d.q}</div>
              <div style={{ fontSize: 10, color: COLORS.textMuted }}>{d.owner} \u00b7 {d.impact}</div>
            </div>
          </div>
        ))}
      </Card>
      <div style={{ textAlign: "center", fontSize: 10, color: COLORS.textMuted, paddingTop: 8 }}>
        1760 Strategic AI \u2014 Generated from ops-snapshot.md (Mar 8, 2026) \u00b7 Click any project card to isolate its timeline
      </div>
    </div>
  );
}
