import Image from "next/image";

import { Doodle } from "@/components/Doodle";
import { SplitWord } from "@/components/SplitWord";

const kids = [
  {
    src: "/images/Kids Portrait Fun.jpg",
    place: "top-[30%] left-[17%] w-[7vw] max-w-[104px]",
  },
  {
    src: "/images/Happy Little African Girl Portrait.jpg",
    place: "top-[20%] left-[63%] w-[5.6vw] max-w-[84px]",
  },
  {
    src: "/images/Kids Portrait Mockup.jpg",
    place: "top-[52%] left-[78%] w-[7.6vw] max-w-[112px]",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      data-hiw-pending
      className="relative font-[Manrope,sans-serif] text-white"
    >
      <noscript>
        <style>{`[data-hiw-pending] [data-hiw-anim],[data-hiw-pending] [data-char]{opacity:1}`}</style>
      </noscript>

      <div data-pin-wrap className="relative h-[160svh]">
        <div className="sticky top-0 h-svh overflow-hidden">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <Doodle
              name="star-md"
              uid="hiw"
              reveal="radial"
              className="absolute top-[24%] left-[20%] h-auto w-[3.4vw] -translate-x-1/2 -translate-y-1/2 rotate-[14.94deg]"
            />
            <Doodle
              name="sparkle"
              uid="hiw"
              reveal="radial"
              className="absolute top-[16%] left-[66%] h-auto w-[3vw] -translate-x-1/2 -translate-y-1/2"
            />
            <Doodle
              name="leaves"
              uid="hiw"
              reveal="sweep"
              angle={45}
              className="absolute top-[46%] left-[80%] h-auto w-[4.6vw] -translate-x-1/2 -translate-y-1/2 rotate-[-37.88deg]"
            />

            {kids.map((kid) => (
              <span
                key={kid.src}
                data-hiw-anim
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

          <div className="absolute inset-x-0 top-[5%] z-20 px-6 text-center">
            <h2 className="font-['Shooting_Star'] text-[clamp(1.75rem,5.4vw,6.75rem)] leading-[0.6977] font-normal tracking-[-0.03em]">
              <span className="flex items-center justify-center gap-[0.093em] whitespace-nowrap">
                <SplitWord text="Earn" className="text-[#396FD5]" />
                <SplitWord text="it." className="text-[#E6E6E9]" />
                <SplitWord text="Spend" className="text-[#E8DB00]" />
                <SplitWord text="it." className="text-[#E6E6E9]" />
              </span>
              <span className="mt-[0.279em] flex items-center justify-center gap-[0.093em] whitespace-nowrap">
                <SplitWord text="Ask." className="text-[#FB21E9]" />
                <SplitWord text="Save." className="text-[#9487FF]" />
              </span>
            </h2>

            <p
              data-hiw-anim
              className="mx-auto mt-[clamp(0.75rem,1.6vw,2rem)] max-w-[min(90%,26em)] text-[clamp(0.875rem,1.042vw,1.3rem)] leading-[1.5] font-medium text-[#F1F1F1]"
            >
              Four moments that repeat every week. Your kid runs all four — you
              set the edges. Scroll, and the whole thing builds itself.
            </p>
          </div>
        </div>
      </div>

      <div data-rocket-run className="h-[110svh]" />
    </section>
  );
}
