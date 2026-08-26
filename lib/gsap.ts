"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText, useGSAP);

/** True when the visitor has asked the OS to minimise motion. */
export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** True for touch/pen surfaces where hover effects never fire. */
export function isHoverCapable() {
  return typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;
}

export { gsap, ScrollTrigger, ScrollToPlugin, SplitText, useGSAP };
