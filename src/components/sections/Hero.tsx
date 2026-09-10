import Image from "next/image";
import Link from "next/link";

import { WaitlistButton } from "@/components/WaitlistButton";

const MONEY_CHIP = "/images/curved-stack-money-icon-3d-illustration.png";
const CARD_CHIP =
  "/images/clicking-remote-control-device-cartoon-character-hand-illustration-pressing-buttons-tv-remote-controller-2d-vector-image-isolated-white-background-change-channels-editable-flat-clipart-color.png";

const doodles = [
  {
    src: "/figma/sparkle.svg",
    w: 76,
    h: 92,
    place: "left-[8.958%] top-[22.325%] w-[5.278%]",
  },
  {
    src: "/figma/arcs.svg",
    w: 86,
    h: 84,
    place: "left-[72.222%] top-[11.275%] w-[5.972%]",
  },
  {
    src: "/figma/star-md.svg",
    w: 93,
    h: 93,
    place: "left-[89.944%] top-[38.378%] w-[6.49%] rotate-[14.94deg]",
  },
  {
    src: "/figma/star-sm.svg",
    w: 59,
    h: 47,
    place: "left-[11.566%] top-[47.998%] w-[4.105%] rotate-[14.94deg]",
  },
  {
    src: "/figma/leaves.svg",
    w: 129,
    h: 131,
    place: "left-[28.065%] top-[65.58%] w-[8.947%] rotate-[-37.88deg]",
  },
  {
    src: "/figma/star-lg.svg",
    w: 173,
    h: 173,
    place: "left-[69.053%] top-[76.492%] w-[12.014%] rotate-[14.94deg]",
  },
  {
    src: "/figma/arrow.svg",
    w: 192,
    h: 207,
    place: "left-[4.309%] top-[86.316%] w-[13.354%] rotate-[-39.18deg]",
  },
];

function Chip({ src, art }: { src: string; art: string }) {
  return (
    <span className="relative inline-block h-[0.8605em] w-[1.4302em] shrink-0 overflow-hidden rounded-full bg-[#E6E6E9] align-middle shadow-[inset_0_0.0465em_0.1209em_-0.0349em_rgba(0,0,0,0.16)]">
      <span className={`absolute ${art}`}>
        <Image src={src} alt="" fill sizes="14vw" className="object-cover" />
      </span>
    </span>
  );
}

export function Hero() {
  return (
    <section className="relative flex flex-1 flex-col items-center overflow-x-clip font-[Manrope,sans-serif] text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 select-none"
      >
        <span className="absolute top-[33.251%] left-[-3.651%] aspect-[1.9493] w-[55.366%] -translate-x-1/2 -translate-y-1/2 rotate-[-22.32deg]">
          <Image
            src="/figma/laptop.png"
            alt=""
            fill
            priority
            sizes="56vw"
            className="object-cover"
          />
        </span>

        <span className="absolute top-[57.218%] left-[96.528%] aspect-square w-[36.806%] -translate-x-1/2 -translate-y-1/2">
          <Image
            src="/figma/headphones.png"
            alt=""
            fill
            priority
            sizes="37vw"
            className="object-cover"
          />
        </span>

        {doodles.map((doodle) => (
          <Image
            key={doodle.src}
            src={doodle.src}
            alt=""
            width={doodle.w}
            height={doodle.h}
            unoptimized
            className={`absolute -translate-x-1/2 -translate-y-1/2 ${doodle.place}`}
          />
        ))}
      </div>

      <div className="flex-[1]" />

      <div className="relative z-10 flex w-full flex-col items-center px-6 text-center">
        <span className="rounded-full border border-white/20 bg-white/15 px-[13px] py-[4px] text-[clamp(0.6875rem,0.764vw,1rem)] leading-[1.45] font-bold">
          Backed by Y Combinator
        </span>

        <h1 className="mt-[clamp(1rem,3.611vw,4.25rem)] font-['Shooting_Star'] text-[clamp(1.55rem,5.972vw,7.5rem)] leading-[0.6977] font-normal tracking-[-0.03em]">
          <span className="flex items-center justify-center gap-[0.093em] whitespace-nowrap">
            <span className="text-[#396FD5]">Their</span>
            <span className="text-[#E6E6E9]">first</span>
            <span className="text-[#E8DB00]">real</span>
            <Chip
              src={MONEY_CHIP}
              art="top-[99.6%] left-[41.59%] h-[198.64%] w-[135.27%] -translate-x-1/2 -translate-y-1/2 rotate-[-32.52deg]"
            />
            <span className="text-[#9487FF]">money.</span>
          </span>
          <span className="mt-[0.279em] flex items-center justify-center gap-[0.093em] whitespace-nowrap">
            <span className="text-[#FB21E9]">Your</span>
            <Chip
              src={CARD_CHIP}
              art="top-[-22%] left-[9.35%] h-[203.33%] w-[123.98%]"
            />
            <span className="text-[#E6E6E9]">rules</span>
          </span>
        </h1>

        <p className="mt-[clamp(1rem,2.361vw,2.75rem)] max-w-[min(90%,30.867em)] text-[clamp(0.875rem,1.042vw,1.3rem)] leading-[1.5] font-medium text-[#F1F1F1]">
          Sprout is a debit card and money app built for two people at once — a
          parent who needs visibility, and a kid who needs practice.
        </p>

        <div className="mt-[clamp(1rem,1.597vw,1.875rem)] flex flex-wrap items-center justify-center gap-4">
          <WaitlistButton />
          <Link
            href="#product"
            className="inline-flex shrink-0 items-center justify-center rounded-full border border-white px-[18px] py-[12px] text-base leading-[19px] font-semibold text-white transition-colors hover:bg-white/10"
          >
            View Product
          </Link>
        </div>
      </div>

      <div className="flex-[2.725]" />

      <span className="absolute top-[64.805%] left-1/2 aspect-[0.48374] w-[29.998%] -translate-x-1/2">
        <Image
          src="/iphone 1 big.png"
          alt="The Sproat app showing a kid's spendable balance, recent allowance and transactions"
          fill
          priority
          sizes="30vw"
          className="object-cover"
        />
      </span>
    </section>
  );
}
