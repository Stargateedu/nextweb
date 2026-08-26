"use client";

import { useRef, type CSSProperties } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/**
 * Counts a stat up to its final value the first time it scrolls into view.
 * Accepts the display string straight from the content ("500+", "98%", "12")
 * and preserves whatever prefix/suffix it carries.
 */
export default function CountUp({
  value,
  duration = 1.9,
  className,
  style,
}: {
  value: string;
  duration?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;

      const match = /^(\D*)([\d,.]+)(.*)$/.exec(value);
      if (!match) return;

      const [, prefix, digits, suffix] = match;
      const target = Number(digits.replace(/,/g, ""));
      if (!Number.isFinite(target)) return;

      const counter = { n: 0 };
      el.textContent = `${prefix}0${suffix}`;

      gsap.to(counter, {
        n: target,
        duration,
        ease: "power2.out",
        snap: { n: 1 },
        onUpdate: () => {
          el.textContent = `${prefix}${Math.round(counter.n).toLocaleString()}${suffix}`;
        },
        scrollTrigger: { trigger: el, start: "top 92%", once: true },
      });
    },
    { scope: ref, dependencies: [value, duration] }
  );

  // Rendered with the final value so it is correct for crawlers and no-JS.
  return (
    <span ref={ref} className={className} style={style}>
      {value}
    </span>
  );
}
