"use client";

import { useState, type FormEvent } from "react";
import { colors, CTA_LABEL } from "@/lib/theme";

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: 14,
  border: `1px solid ${colors.silver}`,
  fontSize: 14,
  background: colors.bg,
  color: colors.ink,
};

const labelStyle: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: 0.5,
  marginBottom: 8,
};

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone"),
      program: data.get("program"),
      message: data.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || "Something went wrong. Please try again.");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div style={{ background: colors.cream, padding: 40, border: `1px solid ${colors.border}` }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: colors.gold, marginBottom: 12 }}>
          THANK YOU
        </div>
        <h2 style={{ fontSize: 24, fontWeight: 800, margin: "0 0 12px" }}>Your message is on its way.</h2>
        <p style={{ fontSize: 15, lineHeight: 1.7, color: colors.muted, margin: "0 0 24px" }}>
          A Stargate advisor will reach out within one business day.
        </p>
        <button
          onClick={() => setStatus("idle")}
          style={{
            cursor: "pointer",
            background: colors.ink,
            color: colors.bg,
            border: "none",
            padding: "14px 28px",
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: 1,
          }}
        >
          SEND ANOTHER MESSAGE
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        <div>
          <div style={labelStyle}>FULL NAME</div>
          <input type="text" name="name" placeholder="Jane Doe" required style={inputStyle} />
        </div>
        <div>
          <div style={labelStyle}>EMAIL</div>
          <input type="email" name="email" placeholder="jane@email.com" required style={inputStyle} />
        </div>
      </div>
      <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        <div>
          <div style={labelStyle}>PHONE</div>
          <input type="tel" name="phone" placeholder="+44 00 0000 0000" style={inputStyle} />
        </div>
        <div>
          <div style={labelStyle}>PROGRAM OF INTEREST</div>
          <select name="program" style={inputStyle} defaultValue="Study-Abroad Placement">
            <option>Study-Abroad Placement</option>
            <option>Visa Support</option>
            <option>Test Preparation</option>
            <option>University Application Guidance</option>
            <option>Scholarships & Funding</option>
          </select>
        </div>
      </div>
      <div style={{ marginBottom: 28 }}>
        <div style={labelStyle}>MESSAGE</div>
        <textarea
          name="message"
          placeholder="Tell us about your goals..."
          rows={4}
          required
          style={{ ...inputStyle, resize: "vertical" }}
        />
      </div>

      {status === "error" && (
        <p style={{ color: "#b3261e", fontSize: 13, marginBottom: 16 }}>{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        style={{
          cursor: status === "submitting" ? "default" : "pointer",
          display: "inline-block",
          background: colors.ink,
          color: colors.bg,
          border: "none",
          padding: "16px 36px",
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: 1,
          opacity: status === "submitting" ? 0.6 : 1,
        }}
      >
        {status === "submitting" ? "SENDING..." : CTA_LABEL.toUpperCase()}
      </button>

      <style>{`
        @media (max-width: 560px) {
          .form-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </form>
  );
}
