"use client";

import Link from "next/link";
import { useRef, type CSSProperties, type ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion, isHoverCapable } from "@/lib/gsap";
import { colors } from "@/lib/theme";

/**
 * Inline text link with a trailing arrow. On hover the arrow slides forward
 * and a gold rule wipes across the underline from left to right.
 */
export default function ArrowLink({
  href,
  children,
  style,
}: {
  href: string;
  children: ReactNode;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion() || !isHoverCapable()) return;

      const arrow = el.querySelector("[data-arrow]");
      const rule = el.querySelector("[data-rule]");

      const onEnter = () => {
        if (arrow) gsap.to(arrow, { x: 7, duration: 0.4, ease: "power3.out" });
        if (rule) gsap.to(rule, { scaleX: 1, duration: 0.45, ease: "power3.out" });
      };
      const onLeave = () => {
        if (arrow) gsap.to(arrow, { x: 0, duration: 0.4, ease: "power3.out" });
        if (rule) gsap.to(rule, { scaleX: 0, duration: 0.35, ease: "power3.inOut" });
      };

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
    <Link
      ref={ref}
      href={href}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontSize: 13,
        fontWeight: 700,
        letterSpacing: 0.5,
        paddingBottom: 4,
        borderBottom: `1.5px solid ${colors.ink}`,
        ...style,
      }}
    >
      <span>{children}</span>
      <span data-arrow aria-hidden style={{ display: "inline-block" }}>
        →
      </span>
      <span
        data-rule
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: -1.5,
          height: 1.5,
          background: colors.gold,
          transform: "scaleX(0)",
          transformOrigin: "left center",
          pointerEvents: "none",
        }}
      />
    </Link>
  );
}
