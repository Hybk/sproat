"use client";

import { gsap, ScrollTrigger } from "@/animations/gsap";

export function initHowItWorks(track: HTMLElement) {
  const root = track;
  const anchor = root.querySelector<HTMLElement>("[data-phone-anchor]");
  const slot = root.querySelector<HTMLElement>("[data-phone-slot]");
  const phone = root.querySelector<HTMLElement>("[data-phone]");
  const stage = root.querySelector<HTMLElement>("[data-stage]");
  const reveal = root.querySelector<SVGRectElement>("[data-rocket-reveal]");

  if (!anchor || !slot || !phone || !stage || !reveal) {
    return () => {};
  }

  const dockPhone = (progress: number) => {
    const from = anchor.getBoundingClientRect();
    const to = slot.getBoundingClientRect();
    if (!to.width || !from.width) return;

    const remaining = 1 - progress;
    gsap.set(phone, {
      x: (from.left + from.width / 2 - (to.left + to.width / 2)) * remaining,
      y: (from.top + from.height / 2 - (to.top + to.height / 2)) * remaining,
      scale: 1 + (from.width / to.width - 1) * remaining,
    });
  };

  const dock = ScrollTrigger.create({
    trigger: track,
    start: "top top",
    end: () => `+=${Math.max(1, track.offsetHeight - window.innerHeight)}`,
    scrub: true,
    onUpdate: (self) => dockPhone(self.progress),
    onRefresh: (self) => dockPhone(self.progress),
  });

  const revealHeight = Number(reveal.getAttribute("height"));
  const draw = gsap.fromTo(
    reveal,
    { y: -revealHeight },
    {
      y: 0,
      ease: "none",
      scrollTrigger: {
        trigger: stage,
        start: "top bottom",
        end: "bottom bottom",
        scrub: true,
      },
    },
  );

  return () => {
    dock.kill();
    draw.scrollTrigger?.kill();
    draw.kill();
  };
}
