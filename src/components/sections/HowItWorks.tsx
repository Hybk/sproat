import Image from "next/image";

import { Doodle } from "@/components/Doodle";
import { Rocket } from "@/components/Rocket";

const kids = [
  {
    src: "/images/Kids Portrait Fun.jpg",
    place: "top-[16%] left-[17%] w-[6.7vw] max-w-[96px]",
  },
  {
    src: "/images/Happy Little African Girl Portrait.jpg",
    place: "top-[6%] left-[58.5%] w-[5.6vw] max-w-[80px]",
  },
  {
    src: "/images/Kids Portrait Mockup.jpg",
    place: "top-[62%] left-[71%] w-[7.6vw] max-w-[110px]",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative font-[Manrope,sans-serif] text-white"
    >
      <div className="relative flex min-h-[40svh] flex-col items-center justify-center px-6 py-[6vh] text-center">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <Doodle
            name="star-md"
            uid="hiw"
            reveal="radial"
            className="absolute top-[13%] left-[21%] h-auto w-[3.4vw] -translate-x-1/2 -translate-y-1/2 rotate-[14.94deg]"
          />
          <Doodle
            name="sparkle"
            uid="hiw"
            reveal="radial"
            className="absolute top-[9%] left-[61%] h-auto w-[3vw] -translate-x-1/2 -translate-y-1/2"
          />
          <Doodle
            name="leaves"
            uid="hiw"
            reveal="sweep"
            angle={45}
            className="absolute top-[56%] left-[69%] h-auto w-[4.6vw] -translate-x-1/2 -translate-y-1/2 rotate-[-37.88deg]"
          />

          {kids.map((kid) => (
            <span
              key={kid.src}
              className={`absolute aspect-square overflow-hidden rounded-full border-2 border-white ${kid.place}`}
            >
              <Image
                src={kid.src}
                alt=""
                fill
                sizes="8vw"
                className="object-cover"
              />
            </span>
          ))}
        </div>

        <h2 className="relative z-10 font-['Shooting_Star'] text-[clamp(1.75rem,5.972vw,7.5rem)] leading-[0.6977] font-normal tracking-[-0.03em]">
          <span className="flex items-center justify-center gap-[0.093em] whitespace-nowrap">
            <span className="text-[#396FD5]">Earn</span>
            <span className="text-[#E6E6E9]">it.</span>
            <span className="text-[#E8DB00]">Spend</span>
            <span className="text-[#E6E6E9]">it.</span>
          </span>
          <span className="mt-[0.279em] flex items-center justify-center gap-[0.093em] whitespace-nowrap">
            <span className="text-[#FB21E9]">Ask.</span>
            <span className="text-[#9487FF]">Save.</span>
          </span>
        </h2>

        <p className="relative z-10 mt-[clamp(1rem,2.361vw,2.75rem)] max-w-[min(90%,26em)] text-[clamp(0.875rem,1.042vw,1.3rem)] leading-[1.5] font-medium text-[#F1F1F1]">
          Four moments that repeat every week. Your kid runs all four — you set
          the edges. Scroll, and the whole thing builds itself.
        </p>
      </div>

      <div data-stage className="relative h-svh">
        <div
          data-stage-slot
          className="absolute top-1/2 left-1/2 aspect-[0.6767] h-[83.25svh] -translate-x-1/2 -translate-y-1/2"
        >
          <Rocket className="h-full w-full" />
        </div>
      </div>
    </section>
  );
}
