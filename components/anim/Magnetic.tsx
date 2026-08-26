"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion, isHoverCapable } from "@/lib/gsap";

/**
 * Pulls its content gently toward the cursor while hovered, then springs back.
 * Wrap CTAs with it. Inert on touch devices and under reduced-motion.
 */
export default function Magnetic({
  children,
  strength = 0.3,
  scale = 1.04,
  className,
  style,
}: {
  children: ReactNode;
  strength?: number;
  scale?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion() || !isHoverCapable()) return;

      const xTo = gsap.quickTo(el, "x", { duration: 0.55, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.55, ease: "power3.out" });

      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * strength);
        yTo((e.clientY - (r.top + r.height / 2)) * strength);
      };
      const onEnter = () => gsap.to(el, { scale, duration: 0.4, ease: "power3.out" });
      const onLeave = () => {
        xTo(0);
        yTo(0);
        gsap.to(el, { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.6)" });
      };

      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerenter", onEnter);
      el.addEventListener("pointerleave", onLeave);

      return () => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerenter", onEnter);
        el.removeEventListener("pointerleave", onLeave);
      };
    },
    { scope: ref, dependencies: [strength, scale] }
  );

  return (
    <span
      ref={ref}
      className={className}
      style={{ display: "inline-block", willChange: "transform", ...style }}
    >
      {children}
    </span>
  );
}
