"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion, isHoverCapable } from "@/lib/gsap";
import { colors } from "@/lib/theme";

/**
 * Hover state for cards: lifts, drops a soft shadow, and slides a gold rule
 * across the top edge. Any element inside marked `data-lift-icon` nudges up
 * with it.
 */
export default function LiftCard({
  children,
  lift = -8,
  accent = true,
  className,
  style,
}: {
  children: ReactNode;
  lift?: number;
  accent?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion() || !isHoverCapable()) return;

      const rule = el.querySelector("[data-lift-rule]");
      const icon = el.querySelector("[data-lift-icon]");

      const onEnter = () => {
        gsap.to(el, {
          y: lift,
          boxShadow: "0 22px 48px rgba(18,18,20,0.13)",
          duration: 0.45,
          ease: "power3.out",
        });
        if (rule) gsap.to(rule, { scaleX: 1, duration: 0.5, ease: "power3.out" });
        if (icon) gsap.to(icon, { y: -4, duration: 0.45, ease: "power3.out" });
      };

      const onLeave = () => {
        gsap.to(el, {
          y: 0,
          boxShadow: "0 0px 0px rgba(18,18,20,0)",
          duration: 0.5,
          ease: "power3.out",
        });
        if (rule) gsap.to(rule, { scaleX: 0, duration: 0.4, ease: "power3.inOut" });
        if (icon) gsap.to(icon, { y: 0, duration: 0.45, ease: "power3.out" });
      };

      el.addEventListener("pointerenter", onEnter);
      el.addEventListener("pointerleave", onLeave);
      return () => {
        el.removeEventListener("pointerenter", onEnter);
        el.removeEventListener("pointerleave", onLeave);
      };
    },
    { scope: ref, dependencies: [lift] }
  );

  return (
    <div
      ref={ref}
      className={className}
      style={{ position: "relative", boxShadow: "0 0px 0px rgba(18,18,20,0)", ...style }}
    >
      {accent && (
        <span
          data-lift-rule
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            background: colors.gold,
            transform: "scaleX(0)",
            transformOrigin: "left center",
            pointerEvents: "none",
          }}
        />
      )}
      {children}
    </div>
  );
}
