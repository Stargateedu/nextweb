"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { colors } from "@/lib/theme";

/** Gold reading-progress rule pinned to the very top of the viewport. */
export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const bar = ref.current;
    if (!bar) return;

    gsap.to(bar, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: 0,
        end: () => document.documentElement.scrollHeight - window.innerHeight,
        scrub: 0.25,
        invalidateOnRefresh: true,
      },
    });
  }, { scope: ref });

  return (
    <div
      aria-hidden
      style={{ position: "fixed", top: 0, left: 0, right: 0, height: 3, zIndex: 100, pointerEvents: "none" }}
    >
      <div
        ref={ref}
        style={{ height: "100%", background: colors.gold, transform: "scaleX(0)", transformOrigin: "left center" }}
      />
    </div>
  );
}
