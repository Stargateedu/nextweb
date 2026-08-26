"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type Variant = "up" | "down" | "left" | "right" | "fade" | "scale";

const OFFSETS: Record<Variant, gsap.TweenVars> = {
  up: { y: 44 },
  down: { y: -44 },
  left: { x: -52 },
  right: { x: 52 },
  fade: {},
  scale: { scale: 0.94 },
};

/**
 * Scroll-triggered entrance. Wraps content and reveals it once as it enters
 * the viewport. Pass `stagger` to animate the wrapper's direct children in
 * sequence instead of the wrapper itself — useful for grids and card rows.
 *
 * The wrapper ships `visibility:hidden` so nothing flashes before GSAP takes
 * over; globals.css restores visibility when scripting is unavailable.
 */
export default function Reveal({
  children,
  variant = "up",
  delay = 0,
  duration = 0.85,
  stagger,
  start = "top 85%",
  className,
  style,
}: {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  duration?: number;
  stagger?: number;
  start?: string;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const targets: Element[] = stagger != null ? Array.from(el.children) : [el];
      if (!targets.length) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([el, ...targets], { autoAlpha: 1 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Uncover the wrapper first; the .from() below re-hides whichever
        // elements are actually animating, so this never flashes.
        gsap.set(el, { autoAlpha: 1 });
        gsap
          .timeline({ scrollTrigger: { trigger: el, start, once: true } })
          .from(targets, {
            autoAlpha: 0,
            duration,
            delay,
            ease: "power3.out",
            stagger: stagger ?? 0,
            ...OFFSETS[variant],
          });
      });

      return () => mm.revert();
    },
    { scope: ref, dependencies: [variant, delay, duration, stagger, start] }
  );

  return (
    <div ref={ref} data-reveal className={className} style={{ visibility: "hidden", ...style }}>
      {children}
    </div>
  );
}
