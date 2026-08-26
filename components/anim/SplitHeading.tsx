"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/**
 * Headline whose lines rise out from behind a mask. Splitting waits on
 * document.fonts so lines break against the real Montserrat metrics rather
 * than the fallback face.
 */
export default function SplitHeading({
  children,
  delay = 0,
  as: Tag = "h1",
  className,
  style,
}: {
  children: ReactNode;
  delay?: number;
  as?: "h1" | "h2";
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      if (prefersReducedMotion()) {
        gsap.set(el, { autoAlpha: 1 });
        return;
      }

      let split: SplitText | undefined;
      let cancelled = false;

      document.fonts.ready.then(() => {
        if (cancelled || !ref.current) return;
        gsap.set(el, { autoAlpha: 1 });

        split = SplitText.create(el, { type: "lines", mask: "lines", linesClass: "split-line" });
        gsap.from(split.lines, {
          yPercent: 115,
          duration: 1,
          delay,
          ease: "power4.out",
          stagger: 0.11,
        });
      });

      return () => {
        cancelled = true;
        split?.revert();
      };
    },
    { scope: ref, dependencies: [delay] }
  );

  return (
    <Tag ref={ref} data-reveal className={className} style={{ visibility: "hidden", ...style }}>
      {children}
    </Tag>
  );
}
