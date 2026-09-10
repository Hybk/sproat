"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { gsap } from "@/animations/gsap";
import { initHowItWorks } from "@/animations/howItWorks";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const SLOT = "absolute top-[25.667%] left-[24.637%] h-[70.513%] w-[50.407%]";

export function StickyPhone({ trackRef }: { trackRef: string }) {
  const mounted = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const track = document.querySelector<HTMLElement>(trackRef);
    if (!track || prefersReducedMotion) return;

    let cleanup: (() => void) | undefined;
    const ctx = gsap.context(() => {
      cleanup = initHowItWorks(track);
    }, track);

    return () => {
      cleanup?.();
      ctx.revert();
    };
  }, [trackRef, prefersReducedMotion]);

  return (
    <div
      ref={mounted}
      aria-hidden
      className="pointer-events-none absolute inset-0"
    >
      <div className="sticky top-0 h-svh">
        <div className="absolute top-1/2 left-1/2 aspect-[0.6767] h-[83.25svh] -translate-x-1/2 -translate-y-1/2">
          <span data-phone-slot className={`${SLOT} invisible`} />
          <span data-phone className={SLOT}>
            <span data-anim="phone" className="relative block h-full w-full">
              <Image
                src="/iphone 1 big.png"
                alt=""
                fill
                priority
                sizes="30vw"
                className="object-cover"
              />
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
