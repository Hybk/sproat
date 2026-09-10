"use client";

import { gsap, ScrollTrigger } from "@/animations/gsap";

const SETTLE = 0.5;
const ROCKET_LEAD = 0.3;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeOut = (t: number) => 1 - (1 - t) * (1 - t);

export function initHowItWorks(track: HTMLElement) {
  const anchor = track.querySelector<HTMLElement>("[data-phone-anchor]");
  const slot = track.querySelector<HTMLElement>("[data-phone-slot]");
  const phone = track.querySelector<HTMLElement>("[data-phone]");
  const pinWrap = track.querySelector<HTMLElement>("[data-pin-wrap]");
  const rocketRun = track.querySelector<HTMLElement>("[data-rocket-run]");
  const section = track.querySelector<HTMLElement>("[data-hiw-pending]");
  const strokes = Array.from(
    track.querySelectorAll<SVGPathElement>("[data-rocket-part]"),
  );

  if (!anchor || !slot || !phone || !pinWrap || !rocketRun || !strokes.length) {
    return () => {};
  }

  const pinDistance = () =>
    Math.max(1, pinWrap.offsetHeight - window.innerHeight);

  const boxOf = (el: HTMLElement) => {
    const r = el.getBoundingClientRect();
    return { cx: r.left + r.width / 2, cy: r.top + r.height / 2, w: r.width };
  };

  let pSettle = SETTLE;

  const placePhone = (progress: number) => {
    const docked = boxOf(slot);
    const from = boxOf(anchor);
    if (!docked.w || !from.w) return;

    const t = easeOut(gsap.utils.clamp(0, 1, progress / pSettle));
    gsap.set(phone, {
      x: lerp(from.cx, docked.cx, t) - docked.cx,
      y: lerp(from.cy, docked.cy, t) - docked.cy,
      scale: lerp(from.w, docked.w, t) / docked.w,
    });
  };

  const dock = ScrollTrigger.create({
    trigger: track,
    start: "top top",
    end: () => `+=${Math.max(1, track.offsetHeight - window.innerHeight)}`,
    scrub: true,
    onRefresh: (self) => {
      const total = self.end - self.start;
      const settleAt =
        pinWrap.getBoundingClientRect().top +
        window.scrollY +
        pinDistance() * SETTLE;
      pSettle =
        total > 0
          ? gsap.utils.clamp(0.05, 0.95, (settleAt - self.start) / total)
          : SETTLE;
      placePhone(self.progress);
    },
    onUpdate: (self) => placePhone(self.progress),
  });

  const chars = track.querySelectorAll("#how-it-works [data-char]");
  const bits = track.querySelectorAll("#how-it-works [data-hiw-anim]");
  const doodles = track.querySelectorAll<SVGRectElement | SVGCircleElement>(
    "#how-it-works [data-doodle-reveal]",
  );

  const headline = gsap.timeline({
    paused: true,
    defaults: { ease: "back.out(2)" },
  });

  headline
    .from(
      chars,
      {
        opacity: 0,
        yPercent: 70,
        scale: 0.7,
        rotate: (i: number) => (i % 2 ? 9 : -9),
        duration: 0.5,
        stagger: 0.026,
      },
      0,
    )
    .from(bits, { opacity: 0, scale: 0.5, duration: 0.5, stagger: 0.08 }, 0.1);

  doodles.forEach((el, i) => {
    const at = 0.15 + i * 0.08;
    if (el.tagName === "rect") {
      const shift = -2 * Number(el.getAttribute("width"));
      headline.fromTo(
        el,
        { x: shift },
        { x: 0, duration: 0.6, ease: "power1.inOut" },
        at,
      );
    } else {
      const len = Number(el.getAttribute("stroke-dasharray"));
      headline.fromTo(
        el,
        { strokeDashoffset: len },
        { strokeDashoffset: 0, duration: 0.6, ease: "power1.inOut" },
        at,
      );
    }
  });

  section?.removeAttribute("data-hiw-pending");

  const headlineTrigger = ScrollTrigger.create({
    trigger: pinWrap,
    start: () => `top top-=${pinDistance() * SETTLE}`,
    onEnter: () => headline.play(),
    onLeaveBack: () => headline.reverse(),
  });

  // Drawn stroke by stroke in pen order, the way you would sketch it. Runs from
  // the point the unpinned heading has scrolled clear to the end of the track,
  // which is exactly when the sticky rocket + phone stop sticking.
  strokes.forEach((path) => {
    const len = path.getTotalLength();
    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
  });

  const draw = gsap.timeline({
    scrollTrigger: {
      trigger: pinWrap,
      start: () =>
        `top top-=${pinDistance() + rocketRun.offsetHeight * ROCKET_LEAD}`,
      end: () => `top top-=${pinDistance() + rocketRun.offsetHeight}`,
      scrub: true,
    },
  });

  strokes.forEach((path, i) => {
    draw.to(
      path,
      { strokeDashoffset: 0, duration: 0.95, ease: "power2.out" },
      i * 0.075,
    );
  });

  return () => {
    dock.kill();
    headlineTrigger.kill();
    headline.kill();
    draw.scrollTrigger?.kill();
    draw.kill();
    gsap.set(strokes, { clearProps: "strokeDasharray,strokeDashoffset" });
  };
}
