"use client";

/**
 * Scroll-linked reveal: fades and lifts an element in as it enters the
 * viewport. Built on Framer Motion's useScroll/useTransform so it needs no
 * extra dependency. A GSAP ScrollTrigger equivalent is documented below for
 * projects that already depend on GSAP — don't add GSAP solely for this.
 */

import { useRef, type RefObject } from "react";
import { useScroll, useTransform, type MotionValue } from "framer-motion";
import { useMotionPreferences } from "./motion-provider";

interface PremiumScrollResult<T extends HTMLElement> {
  // T itself (not `T | null`) — matches the standard `useRef<T>(null)`
  // idiom. Parameterizing RefObject with `T | null` instead is a common trap:
  // it type-checks here but silently fails variance-based assignability
  // elsewhere (e.g. passing it straight to `ref=` on an `m.div`), because TS
  // compares generic RefObject<T> instantiations by their type argument
  // rather than always expanding the member type first.
  ref: RefObject<T>;
  opacity: MotionValue<number>;
  y: MotionValue<number>;
}

export function usePremiumScroll<
  T extends HTMLElement = HTMLElement,
>(): PremiumScrollResult<T> {
  const ref = useRef<T>(null);
  const { reducedMotion } = useMotionPreferences();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "start 40%"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : [24, 0]);

  return { ref, opacity, y };
}

/**
 * GSAP ScrollTrigger variant (only if GSAP is already a dependency):
 *
 *   import gsap from "gsap";
 *   import { ScrollTrigger } from "gsap/ScrollTrigger";
 *   gsap.registerPlugin(ScrollTrigger); // once, at app root, client-side only
 *
 *   useEffect(() => {
 *     if (!ref.current || reducedMotion) return;
 *
 *     const ctx = gsap.context(() => {
 *       gsap.from(ref.current, {
 *         opacity: 0,
 *         y: 24,
 *         duration: 0.4,
 *         ease: "power2.out",
 *         scrollTrigger: { trigger: ref.current, start: "top 90%" },
 *       });
 *     });
 *
 *     // Always clean up — leaked ScrollTriggers after unmount/route change
 *     // are the most common source of scroll jank in SPA navigation.
 *     return () => ctx.revert();
 *   }, [reducedMotion]);
 */
