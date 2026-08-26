"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion, isHoverCapable } from "@/lib/gsap";
import { colors } from "@/lib/theme";

/**
 * One service in the stacked list. Enters with its icon, copy, and bullets
 * cascading; on hover the whole row slides right against a gold edge rule.
 */
export default function ServiceRow({
  icon,
  children,
  style,
}: {
  icon: ReactNode;
  children: ReactNode;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const iconEl = el.querySelector("[data-service-icon]");
      const bodyEls = el.querySelectorAll("[data-service-body] > *");
      const rule = el.querySelector("[data-service-rule]");

      if (prefersReducedMotion()) {
        gsap.set(el, { autoAlpha: 1 });
        return;
      }

      gsap.set(el, { autoAlpha: 1 });

      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 82%", once: true } });
      tl.from(iconEl, { autoAlpha: 0, scale: 0.6, rotate: -12, duration: 0.6, ease: "back.out(1.7)" })
        .from(bodyEls, { autoAlpha: 0, y: 24, duration: 0.6, stagger: 0.08, ease: "power3.out" }, "-=0.35");

      if (!isHoverCapable()) return;

      const onEnter = () => {
        gsap.to(el, { x: 10, duration: 0.4, ease: "power3.out" });
        if (rule) gsap.to(rule, { scaleY: 1, duration: 0.4, ease: "power3.out" });
        if (iconEl) gsap.to(iconEl, { scale: 1.08, duration: 0.4, ease: "power3.out" });
      };
      const onLeave = () => {
        gsap.to(el, { x: 0, duration: 0.45, ease: "power3.out" });
        if (rule) gsap.to(rule, { scaleY: 0, duration: 0.35, ease: "power3.inOut" });
        if (iconEl) gsap.to(iconEl, { scale: 1, duration: 0.4, ease: "power3.out" });
      };

      el.addEventListener("pointerenter", onEnter);
      el.addEventListener("pointerleave", onLeave);
      return () => {
        el.removeEventListener("pointerenter", onEnter);
        el.removeEventListener("pointerleave", onLeave);
      };
    },
    { scope: ref }
  );

  return (
    <div
      ref={ref}
      data-reveal
      style={{
        position: "relative",
        visibility: "hidden",
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        gap: 40,
        alignItems: "start",
        padding: "48px 0",
        ...style,
      }}
    >
      <span
        data-service-rule
        aria-hidden
        style={{
          position: "absolute",
          left: -16,
          top: 32,
          bottom: 32,
          width: 2,
          background: colors.gold,
          transform: "scaleY(0)",
          transformOrigin: "top center",
          pointerEvents: "none",
        }}
      />
      <div data-service-icon>{icon}</div>
      <div data-service-body>{children}</div>
    </div>
  );
}
