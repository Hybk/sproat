"use client";

import Link from "next/link";
import { useRef } from "react";

import { gsap, useGSAP } from "@/animations/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const LABEL = "Join the waitlist";
const CREST = 10;

export function WaitlistButton() {
  const root = useRef<HTMLAnchorElement>(null);
  const liquid = useRef<HTMLSpanElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const wave = useRef<HTMLSpanElement>(null);
  const fill = useRef<gsap.core.Timeline | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        fill.current = null;
        return;
      }

      gsap.set(liquid.current, { yPercent: 100, y: CREST });
      gsap.set(label.current, { yPercent: -100, y: -CREST });

      const ripple = gsap.to(wave.current, {
        xPercent: -50,
        duration: 1.2,
        ease: "none",
        repeat: -1,
        paused: true,
      });

      fill.current = gsap
        .timeline({
          paused: true,
          defaults: { duration: 0.5, ease: "power2.out" },
          onStart: () => ripple.play(),
          onReverseComplete: () => ripple.pause(),
        })
        .to(liquid.current, { yPercent: 0, y: 0 }, 0)
        .to(label.current, { yPercent: 0, y: 0 }, 0);
    },
    { scope: root, dependencies: [prefersReducedMotion] },
  );

  const rise = () => fill.current?.timeScale(1).play();
  const drain = () => fill.current?.timeScale(1.25).reverse();

  return (
    <Link
      ref={root}
      href="#waitlist"
      onMouseEnter={rise}
      onMouseLeave={drain}
      onFocus={rise}
      onBlur={drain}
      className="relative isolate inline-flex h-11 shrink-0 items-center overflow-hidden rounded-full bg-white px-6 text-base font-semibold text-[#1C1C1C] md:h-[50px] md:px-9 md:text-lg"
    >
      <span className="relative z-0">{LABEL}</span>

      <span
        ref={liquid}
        aria-hidden
        className="absolute inset-0 z-10 translate-y-[calc(100%_+_10px)]"
      >
        <span
          ref={wave}
          className="absolute bottom-full left-0 h-[10px] w-[200%]"
        >
          <svg
            viewBox="0 0 200 10"
            preserveAspectRatio="none"
            className="h-full w-full"
          >
            <path
              fill="#396FD5"
              d="M0 10V5c12.5-6.7 37.5-6.7 50 0s37.5 6.7 50 0 37.5-6.7 50 0 37.5 6.7 50 0v5z"
            />
          </svg>
        </span>

        <span className="absolute inset-0 overflow-hidden bg-[#396FD5]">
          <span
            ref={label}
            className="absolute inset-0 flex translate-y-[calc(-100%_-_10px)] items-center justify-center whitespace-nowrap text-white"
          >
            {LABEL}
          </span>
        </span>
      </span>
    </Link>
  );
}
