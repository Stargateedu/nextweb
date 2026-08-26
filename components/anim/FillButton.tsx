"use client";

import Link from "next/link";
import { useRef, type CSSProperties, type ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion, isHoverCapable } from "@/lib/gsap";
import { colors } from "@/lib/theme";

type Tone = "ink" | "gold" | "outline";

const TONES: Record<Tone, { bg: string; fg: string; fill: string; fillFg: string; border?: string }> = {
  ink: { bg: colors.ink, fg: colors.bg, fill: colors.gold, fillFg: colors.ink },
  gold: { bg: colors.gold, fg: colors.ink, fill: colors.ink, fillFg: colors.bg },
  outline: { bg: "transparent", fg: colors.ink, fill: colors.ink, fillFg: colors.bg, border: `1.5px solid ${colors.ink}` },
};

/**
 * Primary call-to-action. A colour panel wipes up from the bottom edge on
 * hover and the label crossfades to the contrasting tone. Clicking dips the
 * button slightly for tactile feedback.
 */
export default function FillButton({
  href,
  children,
  tone = "ink",
  padding = "16px 32px",
  hoverColor,
  style,
}: {
  href: string;
  children: ReactNode;
  tone?: Tone;
  padding?: string;
  hoverColor?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const t = TONES[tone];

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion() || !isHoverCapable()) return;

      const fill = el.querySelector("[data-fill]");
      const label = el.querySelector("[data-label]");

      const onEnter = () => {
        if (fill) gsap.to(fill, { yPercent: 0, duration: 0.45, ease: "power3.out" });
        if (label) gsap.to(label, { color: hoverColor ?? t.fillFg, duration: 0.3, ease: "power2.out" });
      };
      const onLeave = () => {
        if (fill) gsap.to(fill, { yPercent: 101, duration: 0.4, ease: "power3.inOut" });
        if (label) gsap.to(label, { color: t.fg, duration: 0.3, ease: "power2.out" });
      };
      const onDown = () => gsap.to(el, { scale: 0.96, duration: 0.15, ease: "power2.out" });
      const onUp = () => gsap.to(el, { scale: 1, duration: 0.35, ease: "back.out(2)" });

      el.addEventListener("pointerenter", onEnter);
      el.addEventListener("pointerleave", onLeave);
      el.addEventListener("pointerdown", onDown);
      el.addEventListener("pointerup", onUp);

      return () => {
        el.removeEventListener("pointerenter", onEnter);
        el.removeEventListener("pointerleave", onLeave);
        el.removeEventListener("pointerdown", onDown);
        el.removeEventListener("pointerup", onUp);
      };
    },
    { scope: ref, dependencies: [tone, hoverColor] }
  );

  return (
    <Link
      ref={ref}
      href={href}
      style={{
        position: "relative",
        display: "inline-block",
        overflow: "hidden",
        background: t.bg,
        border: t.border,
        padding,
        fontSize: 13,
        fontWeight: 700,
        letterSpacing: 1,
        textTransform: "uppercase",
        ...style,
      }}
    >
      <span
        data-fill
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: t.fill,
          transform: "translateY(101%)",
          pointerEvents: "none",
        }}
      />
      <span data-label style={{ position: "relative", color: t.fg }}>
        {children}
      </span>
    </Link>
  );
}
