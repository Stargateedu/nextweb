"use client";

import { useState, useEffect, useCallback } from "react";

type Agent = {
  id: string;
  agentCode: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  tier: "OG" | "GOLD" | "SILVER" | "BRONZE";
  status: "APPROVED" | "PENDING" | "REJECTED";
};

const tierColors: Record<string, { bg: string; fg: string }> = {
  OG: { bg: "#121214", fg: "#D4AF37" },
  GOLD: { bg: "#FDF6E3", fg: "#B8860B" },
  SILVER: { bg: "#F0F0F0", fg: "#6B6B6B" },
  BRONZE: { bg: "#FBF0E8", fg: "#A0522D" },
};

const SITE_URL = typeof window !== "undefined" ? window.location.origin : "";

type AgentForm = Pick<Agent, "name" | "email" | "phone" | "country" | "tier">;

const emptyForm: AgentForm = { name: "", email: "", phone: "", country: "", tier: "BRONZE" };

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchAgents = useCallback(async () => {
    const res = await fetch("/api/agents");
    if (res.ok) {
      const data = await res.json();
      setAgents(data.agents);
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchAgents(); }, [fetchAgents]);

  function handleCopy(agentCode: string, id: string) {
    const url = `${SITE_URL}/apply/?agentid=${agentCode}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  function startEdit(agent: Agent) {
    setEditingId(agent.id);
    setForm({ name: agent.name, email: agent.email, phone: agent.phone, country: agent.country, tier: agent.tier });
    setShowForm(true);
  }

  function cancelForm() {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim() || !form.country.trim()) return;
    setSaving(true);

    if (editingId) {
      const res = await fetch(`/api/agents/${editingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        await fetchAgents();
        cancelForm();
      }
    } else {
      const res = await fetch("/api/agents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, status: "APPROVED" }),
      });
      if (res.ok) {
        await fetchAgents();
        cancelForm();
      }
    }
    setSaving(false);
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete agent "${name}"? This cannot be undone.`)) return;
    const res = await fetch(`/api/agents/${id}`, { method: "DELETE" });
    if (res.ok) {
      setAgents((prev) => prev.filter((a) => a.id !== id));
    }
  }

  if (loading) {
    return <div className="text-center py-12 text-muted text-sm">Loading agents...</div>;
  }

  return (
    <div>
      {/* ADD / EDIT FORM TOGGLE */}
      <div className="mb-4 flex justify-end">
        {!showForm && (
          <button
            onClick={() => { setEditingId(null); setForm(emptyForm); setShowForm(true); }}
            className="bg-ink text-gold px-4 py-2 text-[11px] font-bold tracking-[0.6px] border-none cursor-pointer hover:opacity-90 transition-opacity"
          >
            + ADD AGENT
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white border border-border mb-4 p-6">
          <div className="text-[13px] font-extrabold tracking-[0.6px] mb-4">
            {editingId ? "EDIT AGENT" : "ADD NEW AGENT"}
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              placeholder="Agent name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="border border-border px-3 py-2 text-[13px] outline-none focus:border-gold"
            />
            <input
              placeholder="Email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="border border-border px-3 py-2 text-[13px] outline-none focus:border-gold"
            />
            <input
              placeholder="Phone number"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
              className="border border-border px-3 py-2 text-[13px] outline-none focus:border-gold"
            />
            <input
              placeholder="Country"
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
              required
              className="border border-border px-3 py-2 text-[13px] outline-none focus:border-gold"
            />
            <select
              value={form.tier}
              onChange={(e) => setForm({ ...form, tier: e.target.value as typeof form.tier })}
              className="border border-border px-3 py-2 text-[13px] outline-none focus:border-gold bg-white"
            >
              <option value="OG">OG</option>
              <option value="GOLD">Gold</option>
              <option value="SILVER">Silver</option>
              <option value="BRONZE">Bronze</option>
            </select>
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="bg-gold text-ink px-5 py-2 text-[11px] font-bold tracking-[0.6px] border-none cursor-pointer hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {saving ? "SAVING..." : editingId ? "UPDATE AGENT" : "SAVE AGENT"}
            </button>
            <button
              type="button"
              onClick={cancelForm}
              className="border border-silver text-muted px-5 py-2 text-[11px] font-bold tracking-[0.6px] bg-transparent cursor-pointer hover:border-ink transition-colors"
            >
              CANCEL
            </button>
          </div>
        </form>
      )}

      {/* AGENTS TABLE */}
      <div className="bg-white border border-border">
        <div className="px-6 py-4.5 border-b border-border text-[13px] font-extrabold tracking-[0.6px]">
          AGENTS ({agents.length})
        </div>

        {/* Header */}
        <div className="grid grid-cols-[0.6fr_1fr_1fr_0.8fr_0.7fr_1.5fr_0.8fr] gap-3 px-6 py-3 bg-cream/50 text-[10px] font-extrabold tracking-[1px] text-silver">
          <span>ID</span>
          <span>NAME</span>
          <span>PHONE</span>
          <span>COUNTRY</span>
          <span>TIER</span>
          <span>REFERRAL URL</span>
          <span className="text-right">ACTIONS</span>
        </div>

        {agents.length === 0 ? (
          <div className="px-6 py-8 text-center text-muted text-sm">No agents yet.</div>
        ) : (
          agents.map((agent) => {
            const tc = tierColors[agent.tier] || tierColors.BRONZE;
            return (
              <div
                key={agent.id}
                className="grid grid-cols-[0.6fr_1fr_1fr_0.8fr_0.7fr_1.5fr_0.8fr] gap-3 px-6 py-4 border-b border-[#F3F1EC] items-center text-[13px]"
              >
                <span className="text-[11px] font-mono text-muted">{agent.agentCode}</span>
                <div>
                  <div className="font-semibold">{agent.name}</div>
                  <div className="text-[11px] text-silver">{agent.email}</div>
                </div>
                <span className="text-muted text-xs">{agent.phone}</span>
                <span className="text-muted text-xs">{agent.country}</span>
                <span>
                  <span
                    className="text-[10px] font-extrabold tracking-[0.8px] px-2 py-1 inline-block"
                    style={{ background: tc.bg, color: tc.fg }}
                  >
                    {agent.tier}
                  </span>
                </span>
                <span className="flex items-center gap-2">
                  <span className="text-[11px] text-muted truncate">
                    /apply/?agentid={agent.agentCode}
                  </span>
                  <button
                    onClick={() => handleCopy(agent.agentCode, agent.id)}
                    title="Copy referral URL"
                    className="border-none bg-transparent cursor-pointer p-1 hover:opacity-70 transition-opacity shrink-0"
                  >
                    {copiedId === agent.id ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2.5">
                        <polyline points="20,6 9,17 4,12" />
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5a5a5c" strokeWidth="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" />
                        <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                      </svg>
                    )}
                  </button>
                </span>
                <span className="flex gap-2 justify-end">
                  <button
                    onClick={() => startEdit(agent)}
                    className="bg-ink text-white px-3 py-1.5 text-[10px] font-bold tracking-[0.6px] border-none cursor-pointer hover:bg-gold hover:text-ink transition-colors"
                  >
                    EDIT
                  </button>
                  <button
                    onClick={() => handleDelete(agent.id, agent.name)}
                    className="border border-silver text-muted px-3 py-1.5 text-[10px] font-bold tracking-[0.6px] bg-transparent cursor-pointer hover:border-danger hover:text-danger transition-colors"
                  >
                    DELETE
                  </button>
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
