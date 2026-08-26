"use client";

import { useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/**
 * Eases each route in on navigation and re-measures ScrollTriggers once the
 * new page has laid out.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      if (prefersReducedMotion()) {
        gsap.set(el, { autoAlpha: 1, y: 0 });
      } else {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.55, ease: "power2.out" }
        );
      }

      // Reveal wrappers on the incoming page register their triggers during
      // this same commit; refresh so their start positions use final layout.
      requestAnimationFrame(() => ScrollTrigger.refresh());
    },
    { scope: ref, dependencies: [pathname] }
  );

  return <div ref={ref}>{children}</div>;
}
