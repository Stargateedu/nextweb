"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { colors } from "@/lib/theme";

/** Fades in past the first viewport and scrolls the page home when clicked. */
export default function BackToTop() {
  const ref = useRef<HTMLButtonElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      gsap.set(el, { autoAlpha: 0, y: 12 });

      const trigger = ScrollTrigger.create({
        start: () => window.innerHeight * 0.8,
        end: () => document.documentElement.scrollHeight,
        onToggle: (self) =>
          gsap.to(el, {
            autoAlpha: self.isActive ? 1 : 0,
            y: self.isActive ? 0 : 12,
            duration: 0.4,
            ease: "power3.out",
          }),
      });

      const onEnter = () => gsap.to(el, { scale: 1.1, duration: 0.35, ease: "power3.out" });
      const onLeave = () => gsap.to(el, { scale: 1, duration: 0.35, ease: "power3.out" });
      el.addEventListener("pointerenter", onEnter);
      el.addEventListener("pointerleave", onLeave);

      return () => {
        trigger.kill();
        el.removeEventListener("pointerenter", onEnter);
        el.removeEventListener("pointerleave", onLeave);
      };
    },
    { scope: ref }
  );

  function handleClick() {
    if (prefersReducedMotion()) {
      window.scrollTo(0, 0);
      return;
    }
    gsap.to(window, { scrollTo: 0, duration: 0.9, ease: "power3.inOut" });
  }

  return (
    <button
      ref={ref}
      onClick={handleClick}
      aria-label="Back to top"
      style={{
        position: "fixed",
        right: 28,
        bottom: 28,
        zIndex: 90,
        width: 46,
        height: 46,
        borderRadius: "50%",
        border: "none",
        cursor: "pointer",
        background: colors.ink,
        color: colors.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 10px 28px rgba(18,18,20,0.22)",
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 19 V5 M5 12 L12 5 L19 12" />
      </svg>
    </button>
  );
}
