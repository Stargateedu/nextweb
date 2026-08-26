"use client";

import { useRef, useState, type FormEvent } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { colors, CTA_LABEL } from "@/lib/theme";

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

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);

  // Fields lift and take a gold border while focused; their label slides in.
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

  // Confirmation panel scales in with its lines cascading.
  useGSAP(
    () => {
      const el = successRef.current;
      if (!el) return;

      if (prefersReducedMotion()) {
        gsap.set(el, { autoAlpha: 1 });
        return;
      }

      gsap.set(el, { autoAlpha: 1 });
      gsap
        .timeline()
        .from(el, { autoAlpha: 0, scale: 0.96, duration: 0.5, ease: "power3.out" })
        .from(el.children, { autoAlpha: 0, y: 16, duration: 0.5, stagger: 0.08, ease: "power3.out" }, "-=0.25");
    },
    { scope: successRef, dependencies: [status] }
  );

  // A rejected submission shakes the message into view.
  useGSAP(
    () => {
      const el = errorRef.current;
      if (!el || prefersReducedMotion()) return;

      gsap
        .timeline()
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
      <div
        ref={successRef}
        style={{ visibility: "hidden", background: colors.cream, padding: 40, border: `1px solid ${colors.border}` }}
      >
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: colors.gold, marginBottom: 12 }}>
          THANK YOU
        </div>
        <h2 style={{ fontSize: 24, fontWeight: 800, margin: "0 0 12px" }}>Your message is on its way.</h2>
        <p style={{ fontSize: 15, lineHeight: 1.7, color: colors.muted, margin: "0 0 24px" }}>
          A Stargate advisor will reach out within one business day.
        </p>
        <AnimatedButton onClick={() => setStatus("idle")}>SEND ANOTHER MESSAGE</AnimatedButton>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        <div data-field>
          <div data-field-label style={labelStyle}>
            FULL NAME
          </div>
          <input type="text" name="name" placeholder="Jane Doe" required style={inputStyle} />
        </div>
        <div data-field>
          <div data-field-label style={labelStyle}>
            EMAIL
          </div>
          <input type="email" name="email" placeholder="jane@email.com" required style={inputStyle} />
        </div>
      </div>
      <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        <div data-field>
          <div data-field-label style={labelStyle}>
            PHONE
          </div>
          <input type="tel" name="phone" placeholder="+44 00 0000 0000" style={inputStyle} />
        </div>
        <div data-field>
          <div data-field-label style={labelStyle}>
            PROGRAM OF INTEREST
          </div>
          <select name="program" style={inputStyle} defaultValue="Study-Abroad Placement">
            <option>Study-Abroad Placement</option>
            <option>Visa Support</option>
            <option>Test Preparation</option>
            <option>University Application Guidance</option>
            <option>Scholarships & Funding</option>
          </select>
        </div>
      </div>
      <div data-field style={{ marginBottom: 28 }}>
        <div data-field-label style={labelStyle}>
          MESSAGE
        </div>
        <textarea
          name="message"
          placeholder="Tell us about your goals..."
          rows={4}
          required
          style={{ ...inputStyle, resize: "vertical" }}
        />
      </div>

      {status === "error" && (
        <p ref={errorRef} style={{ color: "#b3261e", fontSize: 13, marginBottom: 16 }}>
          {errorMsg}
        </p>
      )}

      <AnimatedButton type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "SENDING..." : CTA_LABEL.toUpperCase()}
      </AnimatedButton>

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

/** Submit/reset button with a gold wipe on hover and a press-dip on click. */
function AnimatedButton({
  children,
  type = "button",
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;

      const fill = el.querySelector("[data-fill]");
      const label = el.querySelector("[data-label]");

      const onEnter = () => {
        if (el.disabled) return;
        if (fill) gsap.to(fill, { yPercent: 0, duration: 0.45, ease: "power3.out" });
        if (label) gsap.to(label, { color: colors.ink, duration: 0.3, ease: "power2.out" });
      };
      const onLeave = () => {
        if (fill) gsap.to(fill, { yPercent: 101, duration: 0.4, ease: "power3.inOut" });
        if (label) gsap.to(label, { color: colors.bg, duration: 0.3, ease: "power2.out" });
      };
      const onDown = () => !el.disabled && gsap.to(el, { scale: 0.96, duration: 0.15, ease: "power2.out" });
      const onUp = () => gsap.to(el, { scale: 1, duration: 0.35, ease: "back.out(2)" });

      el.addEventListener("pointerenter", onEnter);
      el.addEventListener("pointerleave", onLeave);
      el.addEventListener("pointerdown", onDown);
      el.addEventListener("pointerup", onUp);
      return () => {
        el.removeEventListener("pointerenter", onEnter);
        el.removeEventListener("pointerleave", onLeave);
        el.removeEventListener("pointerdown", onDown);
        el.removeEventListener("pointerup", onUp);
      };
    },
    { scope: ref }
  );

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      onClick={onClick}
      style={{
        position: "relative",
        overflow: "hidden",
        cursor: disabled ? "default" : "pointer",
        display: "inline-block",
        background: colors.ink,
        border: "none",
        padding: "16px 36px",
        fontSize: 13,
        fontWeight: 700,
        letterSpacing: 1,
        opacity: disabled ? 0.6 : 1,
      }}
    >
      <span
        data-fill
        aria-hidden
        style={{ position: "absolute", inset: 0, background: colors.gold, transform: "translateY(101%)" }}
      />
      <span data-label style={{ position: "relative", color: colors.bg }}>
        {children}
      </span>
    </button>
  );
}
