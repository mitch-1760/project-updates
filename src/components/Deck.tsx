"use client";

import React, { useState } from 'react';
import {
  AlertTriangle,
  Calendar,
  CheckCircle2,
  Clock,
  ChevronRight,
  Users,
  Cpu,
  Briefcase,
  Settings,
  PenTool,
  GitBranch,
  TrendingUp,
  Activity
} from 'lucide-react';
// --- MOCK DATA STRIPPED FROM MD ---
const blockers = [
  { id: 1, text: "Anarti copy not finalized (Tracks 2-4 + conference)", owner: "Harry", blocking: "Hazel cannot build sequences; April 3 deadline is 33 days out" },
  { id: 2, text: "Anarti contact list rerun pending", owner: "External", blocking: "List segmentation and sequence targeting delayed" },
  { id: 3, text: "BWOG reply-to not connected (oAuth needed)", owner: "Tobey + Laura", blocking: "Replies from prospects not landing in Laura's inbox" },
  { id: 4, text: "Internal AI SDR — GHL CRM write-back not built", owner: "Tobey", blocking: "Only remaining item before internal deployment" },
];
const clientProjects = [
  {
    name: "By Way of Grey (BWOG)",
    phase: "Lead Gen — Live & Support",
    status: "live",
    tasks: [
      { text: "Verify all 5 Stan Store to HubSpot Zaps are firing in production. Audit lifecycle workflows.", owner: "Tobey", priority: true },
      { text: "Complete Instantly reply-to setup (Requires Laura's 2FA).", owner: "Tobey" },
      { text: "Draft warm nurture and cold outreach email copy by March 5.", owner: "Harry" },
      { text: "Continue daily Instantly monitoring. Upload next batch of 245 verified leads.", owner: "Hazel" },
    ]
  },
  {
    name: "Anarti Therapeutics",
    phase: "Build — Lead Gen Infrastructure",
    status: "building",
    deadline: "April 3",
    tasks: [
      { text: "Finish Track 2-4 emails and write 8 conference emails by March 7.", owner: "Harry" },
      { text: "Hold on building sequences until copy is final. Prep conference attendee list ingestion process.", owner: "Hazel" },
      { text: "Verify Instantly's policy on CBD content in cold outreach before sequences go live.", owner: "Mitch" },
    ]
  },
  {
    name: "TEC+ Consulting",
    phase: "Active Build",
    status: "building",
    tasks: [
      { text: "7-touch email sequence finalized and adjusted.", owner: "System", done: true },
      { text: "Domains purchased; minimum 2-week warming underway.", owner: "System", done: true },
      { text: "Send Joe final sequence drafts for written approval (Hard deadline: Mar 7).", owner: "Matt/Harry" },
      { text: "Prep launch checklist and monitor inbox health.", owner: "Mitch" },
    ]
  },
  {
    name: "Ryse Creative Agency",
    phase: "Discovery (2 of 4 Complete)",
    status: "discovery",
    tasks: [
      { text: "Session 2 completed (Focus: billing automation, hour tracking).", owner: "System", done: true },
      { text: "Complete Session 3 on Thursday. Continue technical implementation brief.", owner: "Matt" },
      { text: "Review technical brief for context prep. No build work starts until discovery ends.", owner: "Tobey" },
    ]
  }
];
const pipeline = [
  { prospect: "Tiger Medical", status: "Pitch call Mar 1", action: "Deliver 4-pillar growth plan deck", owner: "Matt / Harry" },
  { prospect: "Scroll.Care", status: "Proposal Out", action: "Send two billing option breakdown (6 vs 9 month)", owner: "Matt" },
  { prospect: "Andrew Ayers", status: "Proposal Sent", action: "Awaiting workflow map for integration assessment", owner: "Harry" },
  { prospect: "Project Victory Gardens", status: "In Discussions", action: "Refine MVP approach; continue follow-up", owner: "Harry" },
];
const deadlines = [
  { date: "Mar 1", client: "Tiger Medical", event: "Pitch Call Presentation" },
  { date: "Mar 4", client: "AI SDR Delivery", event: "Final product delivered by Tobey" },
  { date: "Mar 6", client: "AI SDR Review", event: "Walkthrough & GHL demo (8am PT)" },
  { date: "Mar 7", client: "Anarti & TEC+", event: "All sequence copy finalized & approved" },
];
// --- COMPONENTS ---
const Card = ({ children, className = "" }) => (
  <div className={`bg-zinc-900 border border-zinc-800 rounded-xl p-6 ${className}`}>
    {children}
  </div>
);
const Badge = ({ children, type = "default" }) => {
  const styles = {
    danger: "bg-red-500/10 text-red-400 border-red-500/20",
    success: "bg-[#deff9a]/10 text-[#deff9a] border-[#deff9a]/20",
    warning: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    default: "bg-zinc-800 text-zinc-300 border-zinc-700"
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[type]}`}>
      {children}
    </span>
  );
};
export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-[#deff9a]/30">

      {/* Top Navigation */}
      <nav className="border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-[#deff9a] flex items-center justify-center">
                <Activity className="w-5 h-5 text-zinc-950" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight">1760 <span className="text-[#deff9a]">Strategic AI</span></h1>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-zinc-400 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Week of March 1–7, 2026
              </span>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* Blockers Section */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <h2 className="text-lg font-semibold text-zinc-100">Open Blockers</h2>
            <Badge type="danger">Resolve First</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {blockers.map(blocker => (
              <Card key={blocker.id} className="border-red-900/30 bg-red-950/10">
                <div className="flex flex-col h-full justify-between gap-4">
                  <p className="text-zinc-200 text-sm font-medium">{blocker.text}</p>
                  <div>
                    <div className="text-xs text-red-400/80 mb-1">Blocking:</div>
                    <p className="text-xs text-zinc-400 mb-3">{blocker.blocking}</p>
                    <div className="flex items-center gap-2 text-xs font-medium text-zinc-300 bg-zinc-950/50 w-fit px-2 py-1 rounded">
                      <Users className="w-3 h-3 text-[#deff9a]" />
                      {blocker.owner}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

          {/* Main Content Column */}
          <div className="xl:col-span-2 space-y-8">

            {/* Client Projects */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="w-5 h-5 text-[#deff9a]" />
                <h2 className="text-lg font-semibold">Client Projects</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {clientProjects.map((project, idx) => (
                  <Card key={idx} className="flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-[#deff9a]">{project.name}</h3>
                        <p className="text-sm text-[#daffde]/80">{project.phase}</p>
                      </div>
                      {project.deadline && (
                        <Badge type="warning">Due {project.deadline}</Badge>
                      )}
                    </div>
                    <div className="space-y-3 flex-grow">
                      {project.tasks.map((task, tidx) => (
                        <div key={tidx} className="flex items-start gap-3 text-sm">
                          {task.done ? (
                            <CheckCircle2 className="w-4 h-4 text-[#deff9a] mt-0.5 shrink-0" />
                          ) : task.priority ? (
                            <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                          ) : (
                            <div className="w-1.5 h-1.5 rounded-full bg-zinc-600 mt-2 shrink-0 ml-1" />
                          )}
                          <div>
                            <span className={task.done ? "text-zinc-500 line-through" : "text-zinc-300"}>
                              {task.text}
                            </span>
                            {!task.done && (
                              <span className="ml-2 text-xs text-[#deff9a]/70 font-medium px-1.5 py-0.5 bg-[#deff9a]/10 rounded">
                                {task.owner}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </section>
            {/* Internal Projects */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Cpu className="w-5 h-5 text-[#deff9a]" />
                <h2 className="text-lg font-semibold">Internal Operations</h2>
              </div>
              <div className="grid grid-cols-1 gap-4">

                {/* AI SDR */}
                <Card className="border-[#deff9a]/20 bg-[#deff9a]/5">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3 border-b md:border-b-0 md:border-r border-zinc-800 pb-4 md:pb-0 md:pr-6">
                      <h3 className="text-xl font-bold text-white mb-1">AI SDR</h3>
                      <p className="text-sm text-[#daffde] mb-4">Internal Lead Gen</p>
                      <Badge type="success">Delivery: Mar 4</Badge>
                    </div>
                    <div className="md:w-2/3 space-y-3">
                      <div className="flex items-start gap-3 text-sm text-zinc-300">
                        <CheckCircle2 className="w-4 h-4 text-[#deff9a] mt-0.5 shrink-0" />
                        <span>Core infrastructure is complete (webhooks, routing, OpenAI 4.1 integration, prompt builder).</span>
                      </div>
                      <div className="flex items-start gap-3 text-sm text-zinc-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-600 mt-2 shrink-0 ml-1" />
                        <span><strong>Tobey:</strong> Build GHL CRM write-back to mirror HubSpot setup. Deliver final product Tuesday.</span>
                      </div>
                      <div className="flex items-start gap-3 text-sm text-zinc-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-600 mt-2 shrink-0 ml-1" />
                        <span><strong>Matt/Harry:</strong> Finalize ICP filters for Apollo and internal messaging sequence this week.</span>
                      </div>
                    </div>
                  </div>
                </Card>
                {/* GHL CRM */}
                <Card>
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-[#deff9a]">1760 Internal GHL CRM</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-zinc-950 p-4 rounded-lg border border-zinc-800/50">
                      <div className="flex items-center gap-2 mb-2">
                        <Settings className="w-4 h-4 text-zinc-400" />
                        <span className="font-medium text-sm text-white">Hazel</span>
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed">Rebuild Coaching CRM Starter snapshot in sub-account. Complete Slack notifications via Zapier.</p>
                    </div>
                    <div className="bg-zinc-950 p-4 rounded-lg border border-zinc-800/50">
                      <div className="flex items-center gap-2 mb-2">
                        <PenTool className="w-4 h-4 text-zinc-400" />
                        <span className="font-medium text-sm text-white">Matt / Harry</span>
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed">Write email copy for the 8 placeholder templates currently in draft. Unblocks automation mapping.</p>
                    </div>
                    <div className="bg-zinc-950 p-4 rounded-lg border border-zinc-800/50">
                      <div className="flex items-center gap-2 mb-2">
                        <GitBranch className="w-4 h-4 text-zinc-400" />
                        <span className="font-medium text-sm text-white">Tobey</span>
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed">Review GHL ID export. Begin drafting n8n integration spec once AI SDR write-back is done.</p>
                    </div>
                  </div>
                </Card>
              </div>
            </section>
          </div>
          {/* Sidebar Column */}
          <div className="space-y-8">

            {/* Timeline */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-[#deff9a]" />
                <h2 className="text-lg font-semibold">Critical Deadlines</h2>
              </div>
              <Card>
                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-[#deff9a] before:via-zinc-800 before:to-transparent">
                  {deadlines.map((item, idx) => (
                    <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-4 h-4 rounded-full border-[3px] border-[#deff9a] bg-zinc-950 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow absolute left-0 md:left-1/2 transform -translate-x-1/2" />
                      <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] ml-6 md:ml-0 p-3 rounded-lg border border-zinc-800 bg-zinc-950/50">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-[#deff9a] text-sm">{item.date}</span>
                        </div>
                        <h4 className="font-medium text-zinc-200 text-sm mb-0.5">{item.client}</h4>
                        <p className="text-xs text-zinc-400">{item.event}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </section>
            {/* Pipeline Table */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-[#deff9a]" />
                <h2 className="text-lg font-semibold">Active Pipeline</h2>
              </div>
              <Card className="p-0 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase bg-zinc-950/50 text-zinc-400 border-b border-zinc-800">
                      <tr>
                        <th className="px-4 py-3 font-medium">Prospect</th>
                        <th className="px-4 py-3 font-medium">Status / Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800">
                      {pipeline.map((item, idx) => (
                        <tr key={idx} className="hover:bg-zinc-800/20 transition-colors">
                          <td className="px-4 py-3">
                            <div className="font-medium text-zinc-200">{item.prospect}</div>
                            <div className="text-xs text-zinc-500 mt-0.5">{item.owner}</div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="text-[#daffde] mb-0.5">{item.status}</div>
                            <div className="text-xs text-zinc-400">{item.action}</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
