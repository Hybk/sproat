import { Header } from "@/components/Header";
import { Rocket } from "@/components/Rocket";
import { Hero } from "@/components/sections/Hero";
import { HeroIntro } from "@/components/sections/HeroIntro";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { StickyPhone } from "@/components/sections/StickyPhone";

export default function Home() {
  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <main>
        <HeroIntro>
          <div data-track className="relative">
            <Hero />
            <HowItWorks />
            <StickyPhone trackRef="[data-track]">
              <Rocket className="h-full w-full" />
            </StickyPhone>
          </div>
        </HeroIntro>
      </main>
    </div>
  );
}
