"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/**
 * Drifts its content vertically as the section scrolls past. `amount` is the
 * total travel in pixels across the whole pass — keep it small (30–80) so it
 * reads as depth rather than as a slide.
 */
export default function Parallax({
  children,
  amount = 56,
  className,
  style,
}: {
  children: ReactNode;
  amount?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      const inner = el?.firstElementChild;
      if (!el || !inner || prefersReducedMotion()) return;

      gsap.fromTo(
        inner,
        { y: amount / 2 },
        {
          y: -amount / 2,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        }
      );
    },
    { scope: ref, dependencies: [amount] }
  );

  return (
    <div ref={ref} className={className} style={{ overflow: "hidden", ...style }}>
      {/* Overscanned by `amount` and pulled up half of it, so the travel
          never drags an empty edge into the frame. */}
      <div
        style={{
          width: "100%",
          height: `calc(100% + ${amount}px)`,
          marginTop: -amount / 2,
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </div>
  );
}
