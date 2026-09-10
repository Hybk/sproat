"use client";

import { type ReactNode, useEffect, useRef } from "react";

import { gsap } from "@/animations/gsap";
import { playHeroIntro } from "@/animations/heroIntro";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const FONT_TIMEOUT = 1500;

export function HeroIntro({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    if (prefersReducedMotion) {
      el.dataset.intro = "done";
      return;
    }

    let cleanup: (() => void) | undefined;
    let cancelled = false;
    const ctx = gsap.context(() => {}, el);

    Promise.race([
      document.fonts.ready,
      new Promise((resolve) => setTimeout(resolve, FONT_TIMEOUT)),
    ]).then(() => {
      if (cancelled) return;
      ctx.add(() => {
        cleanup = playHeroIntro(el);
      });
    });

    return () => {
      cancelled = true;
      cleanup?.();
      ctx.revert();
      el.dataset.intro = "done";
    };
  }, [prefersReducedMotion]);

  return (
    <div ref={root} data-intro="pending" className="contents">
      {children}
    </div>
  );
}
