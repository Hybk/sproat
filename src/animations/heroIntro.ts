"use client";

import { gsap } from "@/animations/gsap";

const CHAR_STAGGER = 0.028;

export function playHeroIntro(root: HTMLElement) {
  const q = gsap.utils.selector(root);
  const chars = q("[data-char]");
  const reveals = q("[data-doodle-reveal]");

  const sweeps = reveals.filter((el) => el.tagName === "rect");
  const pies = reveals.filter((el) => el.tagName === "circle");
  const sweepShift = (el: Element) =>
    -2 * Number((el as SVGRectElement).getAttribute("width"));
  const pieLength = (el: Element) =>
    Number((el as SVGCircleElement).getAttribute("stroke-dasharray"));

  gsap.set(sweeps, { x: (i, el) => sweepShift(el) });
  gsap.set(pies, { strokeDashoffset: (i, el) => pieLength(el) });

  const tl = gsap.timeline({
    paused: true,
    defaults: { ease: "power2.out" },
    onComplete: () => {
      root.dataset.intro = "done";
    },
  });

  tl.from(
    q("[data-anim='pill']"),
    {
      opacity: 0,
      y: -12,
      scale: 0.85,
      duration: 0.45,
      ease: "back.out(2)",
    },
    0,
  );

  tl.from(
    chars,
    {
      opacity: 0,
      yPercent: 70,
      scale: 0.7,
      rotate: (i) => (i % 2 ? 9 : -9),
      duration: 0.5,
      ease: "back.out(2.2)",
      stagger: CHAR_STAGGER,
    },
    0.05,
  );

  q("[data-anim='chip']").forEach((chip, i) => {
    tl.from(
      chip,
      {
        opacity: 0,
        scale: 0.4,
        rotate: -18,
        duration: 0.5,
        ease: "back.out(3)",
      },
      i === 0 ? 0.44 : 0.72,
    );
  });

  tl.to(
    sweeps,
    {
      x: 0,
      duration: 0.55,
      ease: "power1.inOut",
      stagger: 0.07,
    },
    0.15,
  );

  tl.to(
    pies,
    {
      strokeDashoffset: 0,
      duration: 0.6,
      ease: "power1.inOut",
      stagger: 0.07,
    },
    0.15,
  );

  tl.from(
    q("[data-anim='laptop']"),
    {
      opacity: 0,
      x: -70,
      y: -50,
      rotate: -10,
      duration: 0.7,
      ease: "steps(5)",
    },
    0,
  );

  tl.from(
    q("[data-anim='headphones']"),
    {
      opacity: 0,
      x: 90,
      y: 40,
      rotate: 12,
      duration: 0.7,
      ease: "steps(5)",
    },
    0.12,
  );

  tl.from(
    q("[data-anim='sub']"),
    {
      opacity: 0,
      y: 18,
      duration: 0.5,
    },
    0.95,
  );

  tl.from(
    q("[data-anim='cta']"),
    {
      opacity: 0,
      y: 16,
      scale: 0.9,
      duration: 0.45,
      ease: "back.out(2)",
      stagger: 0.09,
    },
    1.05,
  );

  tl.from(
    q("[data-anim='phone']"),
    {
      opacity: 0,
      yPercent: 22,
      rotate: 4,
      duration: 0.85,
      ease: "steps(6)",
    },
    0.9,
  );

  root.dataset.intro = "running";
  tl.play();

  return () => {
    tl.kill();
  };
}
