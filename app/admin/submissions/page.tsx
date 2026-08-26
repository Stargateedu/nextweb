"use client";

import { useState, useEffect, useCallback } from "react";

type Submission = {
  id: string;
  type: "CONTACT" | "STUDENT_APPLICATION" | "AGENT_ENQUIRY" | "JOB_APPLICATION";
  name: string;
  details: string;
  read: boolean;
  createdAt: string;
};

type Filter = "all" | "CONTACT" | "STUDENT_APPLICATION" | "AGENT_ENQUIRY" | "JOB_APPLICATION";

const filters: { key: Filter; label: string }[] = [
  { key: "all", label: "ALL" },
  { key: "CONTACT", label: "CONTACT" },
  { key: "STUDENT_APPLICATION", label: "APPLICATIONS" },
  { key: "AGENT_ENQUIRY", label: "AGENT ENQUIRIES" },
  { key: "JOB_APPLICATION", label: "JOBS" },
];

const typeLabels: Record<string, string> = {
  CONTACT: "CONTACT",
  STUDENT_APPLICATION: "APPLICATION",
  AGENT_ENQUIRY: "AGENT",
  JOB_APPLICATION: "JOB",
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function parseDetails(details: string): Record<string, string> {
  const result: Record<string, string> = {};
  details.split(" | ").forEach((pair) => {
    const idx = pair.indexOf(": ");
    if (idx > 0) {
      result[pair.slice(0, idx).trim()] = pair.slice(idx + 2).trim();
    }
  });
  return result;
}

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchSubmissions = useCallback(async () => {
    const res = await fetch("/api/submissions");
    if (res.ok) {
      const data = await res.json();
      setSubmissions(data.submissions);
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchSubmissions(); }, [fetchSubmissions]);

  async function toggleRead(id: string, currentRead: boolean) {
    const res = await fetch(`/api/submissions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read: !currentRead }),
    });
    if (res.ok) {
      setSubmissions((prev) => prev.map((s) => s.id === id ? { ...s, read: !currentRead } : s));
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete submission from "${name}"? This cannot be undone.`)) return;
    const res = await fetch(`/api/submissions/${id}`, { method: "DELETE" });
    if (res.ok) {
      setSubmissions((prev) => prev.filter((s) => s.id !== id));
    }
  }

  const visible = filter === "all" ? submissions : submissions.filter((s) => s.type === filter);
  const unreadCount = submissions.filter((s) => !s.read).length;

  if (loading) {
    return <div className="text-center py-12 text-muted text-sm">Loading submissions...</div>;
  }

  return (
    <div>
      <div className="flex gap-2.5 mb-5 flex-wrap">
        {filters.map((f) => {
          const count = f.key === "all"
            ? submissions.length
            : submissions.filter((s) => s.type === f.key).length;
          return (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4.5 py-2 text-[11px] font-bold tracking-[0.8px] border cursor-pointer transition-colors ${
                filter === f.key
                  ? "bg-ink text-white border-ink"
                  : "bg-white text-muted border-border hover:border-ink hover:text-ink"
              }`}
            >
              {f.label} ({count})
            </button>
          );
        })}
        {unreadCount > 0 && (
          <span className="ml-auto text-[11px] font-bold text-gold self-center">
            {unreadCount} UNREAD
          </span>
        )}
      </div>

      <div className="bg-white border border-border">
        <div className="grid grid-cols-[1.2fr_1fr_2.5fr_0.8fr_0.8fr_1fr] gap-4 px-6 py-3 bg-cream/50 text-[10px] font-extrabold tracking-[1px] text-silver">
          <span>NAME</span>
          <span>TYPE</span>
          <span>DETAILS</span>
          <span>DATE</span>
          <span>STATUS</span>
          <span className="text-right">ACTIONS</span>
        </div>

        {visible.length === 0 ? (
          <div className="px-6 py-12 text-center text-sm text-silver">
            No submissions match this filter.
          </div>
        ) : (
          visible.map((row) => {
            const parsed = parseDetails(row.details);
            const email = parsed.email || "";
            const previewFields = Object.entries(parsed).slice(0, 2).map(([k, v]) => `${k}: ${v}`).join(", ");
            const isExpanded = expandedId === row.id;

            return (
              <div key={row.id} className={`border-b border-[#F3F1EC] ${row.read ? "bg-white" : "bg-[#FDFBF4]"}`}>
                <div
                  className="grid grid-cols-[1.2fr_1fr_2.5fr_0.8fr_0.8fr_1fr] gap-4 px-6 py-4 items-center text-[13px] cursor-pointer hover:bg-cream/30 transition-colors"
                  onClick={() => setExpandedId(isExpanded ? null : row.id)}
                >
                  <div>
                    <div className={row.read ? "font-semibold" : "font-extrabold"}>{row.name}</div>
                    {email && <div className="text-[11px] text-silver">{email}</div>}
                  </div>
                  <span>
                    <span className="text-[10px] font-extrabold tracking-[0.8px] px-2 py-1 bg-cream text-ink inline-block">
                      {typeLabels[row.type]}
                    </span>
                  </span>
                  <span className="text-muted text-xs truncate">{previewFields}</span>
                  <span className="text-silver text-xs">{formatDate(row.createdAt)}</span>
                  <span>
                    <span className={`text-[10px] font-extrabold tracking-[0.8px] px-2 py-1 inline-block ${row.read ? "bg-[#F0F0F0] text-silver" : "bg-ink text-gold"}`}>
                      {row.read ? "READ" : "NEW"}
                    </span>
                  </span>
                  <span className="flex gap-3 justify-end" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => toggleRead(row.id, row.read)}
                      className="text-[11px] font-bold text-ink border-b border-ink bg-transparent p-0 cursor-pointer hover:text-gold hover:border-gold transition-colors"
                    >
                      {row.read ? "UNREAD" : "READ"}
                    </button>
                    <button
                      onClick={() => handleDelete(row.id, row.name)}
                      className="text-[11px] font-bold text-danger border-b border-danger bg-transparent p-0 cursor-pointer hover:opacity-70 transition-opacity"
                    >
                      DELETE
                    </button>
                  </span>
                </div>

                {isExpanded && (
                  <div className="px-6 pb-5 pt-1">
                    <div className="bg-cream/60 border border-border p-5">
                      <div className="text-[10px] font-extrabold tracking-[1px] text-silver mb-3">FULL DETAILS</div>
                      <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                        {Object.entries(parsed).map(([key, val]) => (
                          <div key={key}>
                            <div className="text-[10px] font-bold tracking-[0.5px] text-muted uppercase mb-0.5">{key.replace(/_/g, " ")}</div>
                            <div className="text-[13px] text-ink">{val}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
