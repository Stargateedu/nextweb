"use client";

import Link from "next/link";
import { useAdmin } from "@/components/admin/AdminProvider";
import { statusChip, typeLabels } from "@/lib/admin-data";

export default function DashboardPage() {
  const { users, agents, courses, submissions, unreadCount } = useAdmin();
  const pendingAgents = agents.filter((a) => a.status === "pending").length;
  const recentSubs = submissions.slice(0, 4);

  const stats = [
    { label: "TOTAL USERS", value: users.length, sub: "+12 this month", subColor: "text-gold" },
    { label: "PENDING AGENTS", value: pendingAgents, sub: "awaiting review", subColor: "text-muted" },
    { label: "LIVE COURSES", value: courses.length, sub: "across 40 universities", subColor: "text-muted" },
    { label: "NEW SUBMISSIONS", value: unreadCount, sub: "unread", subColor: "text-gold" },
  ];

  return (
    <div>
      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-5 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-white border border-border p-6">
            <div className="text-[11px] font-bold tracking-[1px] text-silver">{s.label}</div>
            <div className="text-[32px] font-extrabold mt-2.5">{s.value}</div>
            <div className={`text-xs font-semibold mt-1.5 ${s.subColor}`}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Recent submissions + Agent pipeline */}
      <div className="grid grid-cols-[1.3fr_1fr] gap-5">
        {/* Recent Submissions */}
        <div className="bg-white border border-border">
          <div className="px-6 py-5 border-b border-border text-[13px] font-extrabold tracking-[0.6px]">
            RECENT SUBMISSIONS
          </div>
          {recentSubs.map((row) => (
            <div
              key={row.id}
              className="px-6 py-4 border-b border-[#F3F1EC] flex items-center justify-between gap-4"
            >
              <div>
                <div className="text-[13px] font-bold">{row.name}</div>
                <div className="text-xs text-muted mt-0.5">{row.subject}</div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-[10px] font-extrabold tracking-[1px] text-gold">
                  {typeLabels[row.type]}
                </div>
                <div className="text-[11px] text-silver mt-1">{row.date}</div>
              </div>
            </div>
          ))}
          <Link
            href="/admin/submissions"
            className="block px-6 py-3 text-xs font-bold tracking-[0.5px] text-ink hover:text-gold transition-colors text-center"
          >
            VIEW ALL SUBMISSIONS &rarr;
          </Link>
        </div>

        {/* Agent Pipeline */}
        <div className="bg-white border border-border">
          <div className="px-6 py-5 border-b border-border text-[13px] font-extrabold tracking-[0.6px]">
            AGENT PIPELINE
          </div>
          {agents.slice(0, 4).map((row) => {
            const chip = statusChip(row.status);
            return (
              <div
                key={row.id}
                className="px-6 py-4 border-b border-[#F3F1EC] flex items-center justify-between gap-3"
              >
                <div>
                  <div className="text-[13px] font-bold">{row.name}</div>
                  <div className="text-xs text-muted mt-0.5">{row.country}</div>
                </div>
                <span
                  className="text-[10px] font-extrabold tracking-[0.8px] px-2 py-1"
                  style={{ background: chip.bg, color: chip.fg }}
                >
                  {row.status.toUpperCase()}
                </span>
              </div>
            );
          })}
          <Link
            href="/admin/agents"
            className="block px-6 py-3 text-xs font-bold tracking-[0.5px] text-ink hover:text-gold transition-colors text-center"
          >
            VIEW ALL AGENTS &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
