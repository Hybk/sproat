import Image from "next/image";
import Link from "next/link";

import { WaitlistButton } from "@/components/WaitlistButton";

const navLinks = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Two lenses", href: "#two-lenses" },
  { label: "Safety", href: "#safety" },
  { label: "FAQ", href: "#faq" },
];

export function Header() {
  return (
    <header className="flex h-[76px] w-full shrink-0 items-center justify-between px-6 font-[Manrope,sans-serif] text-white md:px-8">
      <div className="flex items-center gap-4">
        <Link href="/" aria-label="Sproat home">
          <Image
            src="/figma/logo.svg"
            alt="Sproat"
            width={72}
            height={17}
            unoptimized
            priority
            className="w-[72px]"
          />
        </Link>

        <span aria-hidden className="hidden h-[14px] w-px bg-white md:block" />

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[14px] leading-[17px] transition-opacity hover:opacity-70"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <WaitlistButton />
    </header>
  );
}
