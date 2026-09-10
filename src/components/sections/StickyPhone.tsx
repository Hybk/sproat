"use client";

import Image from "next/image";
import { type ReactNode, useEffect, useRef } from "react";

import { gsap } from "@/animations/gsap";
import { initHowItWorks } from "@/animations/howItWorks";
import { PHONE_SLOT, STAGE } from "@/components/sections/stage";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function StickyPhone({
  trackRef,
  children,
}: {
  trackRef: string;
  children: ReactNode;
}) {
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
        <div data-stage-slot className={STAGE}>
          {children}
          <span data-phone-slot className={`${PHONE_SLOT} invisible`} />
          <span data-phone className={PHONE_SLOT}>
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
