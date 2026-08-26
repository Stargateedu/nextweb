"use client";

import { useRef, useState, type FormEvent } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { colors } from "@/lib/theme";

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: 14,
  border: `1px solid ${colors.silver}`,
  fontSize: 14,
  background: colors.bg,
  color: colors.ink,
  outline: "none",
};

const labelStyle: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: 0.5,
  marginBottom: 8,
};

export interface FieldDef {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "date" | "select" | "textarea";
  placeholder?: string;
  required?: boolean;
  options?: string[];
  rows?: number;
}

type Status = "idle" | "submitting" | "success" | "error";

interface Props {
  type: string;
  fields: FieldDef[];
  submitLabel: string;
  successTitle: string;
  successMessage: string;
}

export default function SubmissionForm({ type, fields, submitLabel, successTitle, successMessage }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const form = formRef.current;
      if (!form || prefersReducedMotion()) return;

      const cleanups: Array<() => void> = [];
      form.querySelectorAll<HTMLElement>("[data-field]").forEach((field) => {
        const control = field.querySelector<HTMLElement>("input, select, textarea");
        const label = field.querySelector<HTMLElement>("[data-field-label]");
        if (!control) return;

        const onFocus = () => {
          gsap.to(control, { borderColor: colors.gold, duration: 0.3, ease: "power2.out" });
          gsap.to(field, { y: -3, duration: 0.3, ease: "power2.out" });
          if (label) gsap.to(label, { color: colors.gold, x: 3, duration: 0.3, ease: "power2.out" });
        };
        const onBlur = () => {
          gsap.to(control, { borderColor: colors.silver, duration: 0.3, ease: "power2.out" });
          gsap.to(field, { y: 0, duration: 0.3, ease: "power2.out" });
          if (label) gsap.to(label, { color: colors.ink, x: 0, duration: 0.3, ease: "power2.out" });
        };

        control.addEventListener("focus", onFocus);
        control.addEventListener("blur", onBlur);
        cleanups.push(() => {
          control.removeEventListener("focus", onFocus);
          control.removeEventListener("blur", onBlur);
        });
      });

      return () => cleanups.forEach((fn) => fn());
    },
    { scope: formRef, dependencies: [status] }
  );

  useGSAP(
    () => {
      const el = successRef.current;
      if (!el) return;
      if (prefersReducedMotion()) { gsap.set(el, { autoAlpha: 1 }); return; }
      gsap.set(el, { autoAlpha: 1 });
      gsap.timeline()
        .from(el, { autoAlpha: 0, scale: 0.96, duration: 0.5, ease: "power3.out" })
        .from(el.children, { autoAlpha: 0, y: 16, duration: 0.5, stagger: 0.08, ease: "power3.out" }, "-=0.25");
    },
    { scope: successRef, dependencies: [status] }
  );

  useGSAP(
    () => {
      const el = errorRef.current;
      if (!el || prefersReducedMotion()) return;
      gsap.timeline()
        .fromTo(el, { autoAlpha: 0, y: -6 }, { autoAlpha: 1, y: 0, duration: 0.3, ease: "power2.out" })
        .fromTo(el, { x: -8 }, { x: 0, duration: 0.5, ease: "elastic.out(1, 0.35)" }, "<");
    },
    { scope: errorRef, dependencies: [errorMsg] }
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const name = (data.get("fullName") as string)?.trim() || (data.get("name") as string)?.trim() || "";

    const detailParts: string[] = [];
    for (const f of fields) {
      if (f.name === "fullName" || f.name === "name") continue;
      const val = (data.get(f.name) as string)?.trim();
      if (val) detailParts.push(`${f.name}: ${val}`);
    }
    const details = detailParts.join(" | ");

    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, type, details }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Something went wrong. Please try again.");
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div
        ref={successRef}
        style={{ visibility: "hidden", background: colors.cream, padding: 40, border: `1px solid ${colors.border}` }}
      >
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: colors.gold, marginBottom: 12 }}>
          THANK YOU
        </div>
        <h2 style={{ fontSize: 24, fontWeight: 800, margin: "0 0 12px" }}>{successTitle}</h2>
        <p style={{ fontSize: 15, lineHeight: 1.7, color: colors.muted, margin: "0 0 24px" }}>{successMessage}</p>
        <FormButton onClick={() => setStatus("idle")}>SUBMIT ANOTHER</FormButton>
      </div>
    );
  }

  const pairs: FieldDef[][] = [];
  for (let i = 0; i < fields.length; i++) {
    const f = fields[i];
    if (f.type === "textarea") {
      pairs.push([f]);
    } else if (i + 1 < fields.length && fields[i + 1].type !== "textarea") {
      pairs.push([f, fields[i + 1]]);
      i++;
    } else {
      pairs.push([f]);
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      {pairs.map((row, ri) => (
        <div
          key={ri}
          className="form-row"
          style={{ display: "grid", gridTemplateColumns: row.length === 2 ? "1fr 1fr" : "1fr", gap: 20, marginBottom: 20 }}
        >
          {row.map((f) => (
            <div key={f.name} data-field>
              <div data-field-label style={labelStyle}>{f.label}</div>
              {f.type === "select" ? (
                <select name={f.name} required={f.required} style={inputStyle} defaultValue="">
                  <option value="" disabled>Select...</option>
                  {f.options?.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              ) : f.type === "textarea" ? (
                <textarea
                  name={f.name}
                  placeholder={f.placeholder}
                  rows={f.rows || 4}
                  required={f.required}
                  style={{ ...inputStyle, resize: "vertical" }}
                />
              ) : (
                <input
                  type={f.type}
                  name={f.name}
                  placeholder={f.placeholder}
                  required={f.required}
                  style={inputStyle}
                />
              )}
            </div>
          ))}
        </div>
      ))}

      {status === "error" && (
        <p ref={errorRef} style={{ color: "#b3261e", fontSize: 13, marginBottom: 16 }}>{errorMsg}</p>
      )}

      <FormButton type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "SUBMITTING..." : submitLabel}
      </FormButton>

      <style>{`
        @media (max-width: 560px) {
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </form>
  );
}

function FormButton({
  children, type = "button", disabled, onClick,
}: {
  children: React.ReactNode; type?: "button" | "submit"; disabled?: boolean; onClick?: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      const fill = el.querySelector("[data-fill]");
      const label = el.querySelector("[data-label]");
      const onEnter = () => { if (el.disabled) return; if (fill) gsap.to(fill, { yPercent: 0, duration: 0.45, ease: "power3.out" }); if (label) gsap.to(label, { color: colors.ink, duration: 0.3, ease: "power2.out" }); };
      const onLeave = () => { if (fill) gsap.to(fill, { yPercent: 101, duration: 0.4, ease: "power3.inOut" }); if (label) gsap.to(label, { color: colors.bg, duration: 0.3, ease: "power2.out" }); };
      const onDown = () => !el.disabled && gsap.to(el, { scale: 0.96, duration: 0.15, ease: "power2.out" });
      const onUp = () => gsap.to(el, { scale: 1, duration: 0.35, ease: "back.out(2)" });
      el.addEventListener("pointerenter", onEnter);
      el.addEventListener("pointerleave", onLeave);
      el.addEventListener("pointerdown", onDown);
      el.addEventListener("pointerup", onUp);
      return () => { el.removeEventListener("pointerenter", onEnter); el.removeEventListener("pointerleave", onLeave); el.removeEventListener("pointerdown", onDown); el.removeEventListener("pointerup", onUp); };
    },
    { scope: ref }
  );

  return (
    <button
      ref={ref} type={type} disabled={disabled} onClick={onClick}
      style={{
        position: "relative", overflow: "hidden", cursor: disabled ? "default" : "pointer",
        display: "inline-block", background: colors.ink, border: "none",
        padding: "16px 36px", fontSize: 13, fontWeight: 700, letterSpacing: 1,
        opacity: disabled ? 0.6 : 1,
      }}
    >
      <span data-fill aria-hidden style={{ position: "absolute", inset: 0, background: colors.gold, transform: "translateY(101%)" }} />
      <span data-label style={{ position: "relative", color: colors.bg }}>{children}</span>
    </button>
  );
}
