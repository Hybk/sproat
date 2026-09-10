import Image from "next/image";
import Link from "next/link";

import { WaitlistButton } from "@/components/WaitlistButton";

const doodles = [
  { src: "/doodles/Vector-3.png", w: 304, h: 367, position: "left-[7.5%] top-[19%] w-[5%]", sizes: "5vw" },
  { src: "/doodles/Vector.png", w: 250, h: 189, position: "left-[10%] top-[45%] w-[5%]", sizes: "5vw" },
  { src: "/doodles/Group 31.png", w: 730, h: 731, position: "left-[22%] top-[56%] w-[11%]", sizes: "11vw" },
  { src: "/doodles/Group 17.png", w: 809, h: 1080, position: "left-[0.5%] top-[70%] w-[13.5%]", sizes: "14vw" },
  { src: "/doodles/Group 33.png", w: 344, h: 336, position: "left-[68.5%] top-[8%] w-[6%]", sizes: "6vw" },
  { src: "/doodles/Vector-2.png", w: 403, h: 370, position: "left-[84.5%] top-[33%] w-[7.5%]", sizes: "8vw" },
  { src: "/doodles/Vector-1.png", w: 745, h: 685, position: "left-[64%] top-[67%] w-[10.5%]", sizes: "11vw" },
];

const MONEY_CHIP = "/images/curved-stack-money-icon-3d-illustration.png";
const CARD_CHIP =
  "/images/clicking-remote-control-device-cartoon-character-hand-illustration-pressing-buttons-tv-remote-controller-2d-vector-image-isolated-white-background-change-channels-editable-flat-clipart-color.png";

function Chip({ src, zoom }: { src: string; zoom: string }) {
  return (
    <span className="relative inline-block h-[1.05em] w-[1.55em] overflow-hidden rounded-full bg-[#EDEDED] align-middle">
      <Image
        src={src}
        alt=""
        fill
        sizes="12vw"
        className={`object-cover ${zoom}`}
      />
    </span>
  );
}

export function Hero() {
  return (
    <section className="relative flex flex-1 flex-col items-center font-[Manrope,sans-serif] text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 select-none">
        <Image
          src="/images/laptop-white-background-isolated-top-view 1.png"
          alt=""
          width={1576}
          height={2725}
          priority
          sizes="29vw"
          className="absolute left-0 top-[-3%] w-[29%]"
        />
        <Image
          src="/images/modern-light-beige-wireless-ear-headphones 1.png"
          alt=""
          width={1260}
          height={2120}
          priority
          sizes="23vw"
          className="absolute right-0 top-[32%] w-[23%]"
        />
        {doodles.map((doodle) => (
          <Image
            key={doodle.src}
            src={doodle.src}
            alt=""
            width={doodle.w}
            height={doodle.h}
            sizes={doodle.sizes}
            className={`absolute ${doodle.position}`}
          />
        ))}
      </div>

      <div className="flex-[1.66]" />

      <div className="relative z-10 flex w-full flex-col items-center px-6 text-center">
        <span className="rounded-full bg-white/10 px-4 py-1.5 text-sm">
          Backed by Y Combinator
        </span>

        <h1 className="mt-4 font-['Shooting_Star'] text-[clamp(1.55rem,5.35vw,7rem)] leading-[1.12] font-normal">
          <span className="block whitespace-nowrap">
            <span className="text-[#396FD5]">Their</span>{" "}
            <span className="text-[#EDEDED]">first</span>{" "}
            <span className="text-[#E9E51F]">real</span> <Chip src={MONEY_CHIP} zoom="scale-[1.15]" />{" "}
            <span className="text-[#8B7CF6]">money.</span>
          </span>
          <span className="block whitespace-nowrap">
            <span className="text-[#F81CB0]">Your</span> <Chip src={CARD_CHIP} zoom="scale-[1.18]" />{" "}
            <span className="text-[#EDEDED]">rules</span>
          </span>
        </h1>

        <p className="mt-6 max-w-[min(90%,30.5em)] text-[clamp(0.95rem,1.1vw,1.3rem)] leading-relaxed text-white/85">
          Sprout is a debit card and money app built for two people at once — a
          parent who needs visibility, and a kid who needs practice.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <WaitlistButton size="lg" />
          <Link
            href="#product"
            className="inline-flex h-14 items-center rounded-full border border-white/45 px-8 text-lg font-semibold text-white transition-colors hover:bg-white/10"
          >
            View Product
          </Link>
        </div>
      </div>

      <div className="flex-[4.35]" />

      <Image
        src="/iphone 1 big.png"
        alt="The Sproat app showing a kid's spendable balance, recent allowance and transactions"
        width={1728}
        height={3572}
        priority
        sizes="30vw"
        className="absolute left-1/2 top-[63%] w-[30%] -translate-x-1/2"
      />
    </section>
  );
}
