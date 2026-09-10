import { Header } from "@/components/Header";
import { Hero } from "@/components/sections/Hero";

export default function Home() {
  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <main className="flex flex-1 flex-col">
        <Hero />
      </main>
    </div>
  );
}
