"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion, isHoverCapable } from "@/lib/gsap";
import { colors } from "@/lib/theme";

/** Footer link that slides right and turns gold on hover. */
export default function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion() || !isHoverCapable()) return;

      const onEnter = () => gsap.to(el, { x: 6, color: colors.gold, duration: 0.3, ease: "power3.out" });
      const onLeave = () => gsap.to(el, { x: 0, color: colors.bg, duration: 0.3, ease: "power3.out" });

      el.addEventListener("pointerenter", onEnter);
      el.addEventListener("pointerleave", onLeave);
      el.addEventListener("focus", onEnter);
      el.addEventListener("blur", onLeave);
      return () => {
        el.removeEventListener("pointerenter", onEnter);
        el.removeEventListener("pointerleave", onLeave);
        el.removeEventListener("focus", onEnter);
        el.removeEventListener("blur", onLeave);
      };
    },
    { scope: ref }
  );

  return (
    <Link ref={ref} href={href} style={{ fontSize: 13, color: colors.bg, display: "inline-block", width: "fit-content" }}>
      {children}
    </Link>
  );
}
