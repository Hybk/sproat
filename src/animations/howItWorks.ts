"use client";

import { gsap, ScrollTrigger } from "@/animations/gsap";

const SETTLE = 0.5;
const ROCKET_LEAD = 0.3;
const PEN_STAGGER = 0.075;
const PEN_DURATION = 0.95;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeOut = (t: number) => 1 - (1 - t) * (1 - t);

export function initHowItWorks(track: HTMLElement) {
  const anchor = track.querySelector<HTMLElement>("[data-phone-anchor]");
  const slot = track.querySelector<HTMLElement>("[data-phone-slot]");
  const phone = track.querySelector<HTMLElement>("[data-phone]");
  const pinWrap = track.querySelector<HTMLElement>("[data-pin-wrap]");
  const rocketRun = track.querySelector<HTMLElement>("[data-rocket-run]");
  const section = track.querySelector<HTMLElement>("[data-hiw-pending]");
  const pens = Array.from(
    track.querySelectorAll<SVGPathElement>("[data-rocket-pen]"),
  );

  if (!anchor || !slot || !phone || !pinWrap || !rocketRun || !pens.length) {
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

  // Only the pens carry the dash, and every pen sits inside a mask, so no dash
  // cap or endpoint can paint onto the page. Runs from the point the unpinned
  // heading has scrolled clear to the end of the track, which is exactly when
  // the sticky rocket + phone stop sticking.
  pens.forEach((pen) => {
    const len = pen.getTotalLength();
    gsap.set(pen, { strokeDasharray: len, strokeDashoffset: len });
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

  pens.forEach((pen, i) => {
    draw.to(
      pen,
      { strokeDashoffset: 0, duration: PEN_DURATION, ease: "power2.out" },
      i * PEN_STAGGER,
    );
  });

  // A pen only approximates the very tips of its stroke, so once a stroke is
  // fully down its mask comes off and Figma's path shows untouched. Decided
  // from the timeline's own time — reading the dash back off an SVG element is
  // unreliable, and per-tween callbacks get skipped while scrubbing.
  const fills = pens.map(
    (pen) =>
      pen.closest("g")?.querySelector<SVGPathElement>("[data-rocket-fill]") ??
      null,
  );
  const maskRefs = fills.map((fill) => fill?.getAttribute("mask") ?? null);

  const syncMasks = () => {
    const time = draw.time();
    pens.forEach((_, i) => {
      const fill = fills[i];
      const maskRef = maskRefs[i];
      if (!fill || !maskRef) return;
      const done = time >= i * PEN_STAGGER + PEN_DURATION;
      if (done) fill.removeAttribute("mask");
      else if (!fill.hasAttribute("mask")) fill.setAttribute("mask", maskRef);
    });
  };

  draw.eventCallback("onUpdate", syncMasks);
  syncMasks();

  return () => {
    dock.kill();
    headlineTrigger.kill();
    headline.kill();
    draw.scrollTrigger?.kill();
    draw.kill();
    gsap.set(pens, { clearProps: "strokeDasharray,strokeDashoffset" });
    fills.forEach((fill, i) => {
      const maskRef = maskRefs[i];
      if (fill && maskRef) fill.setAttribute("mask", maskRef);
    });
  };
}
