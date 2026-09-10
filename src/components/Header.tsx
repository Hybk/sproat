import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Two lenses", href: "#two-lenses" },
  { label: "Safety", href: "#safety" },
  { label: "FAQ", href: "#faq" },
];

export function Header() {
  return (
    <header className="w-full px-6 py-6 font-[Manrope,sans-serif] text-white md:px-10 lg:px-14 lg:py-7">
      <div className="flex items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <Link href="/" aria-label="Sproat home">
            <Image
              src="/logo.png"
              alt="Sproat"
              width={288}
              height={68}
              priority
              className="h-[22px] w-auto"
            />
          </Link>

          <span aria-hidden className="hidden h-[22px] w-px bg-white/30 md:block" />

          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center gap-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-lg transition-opacity hover:opacity-70"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <Link
          href="#waitlist"
          className="inline-flex h-11 shrink-0 items-center rounded-full bg-white px-6 text-base font-semibold text-[#1C1C1C] transition-colors hover:bg-white/90 md:h-[50px] md:px-9 md:text-lg"
        >
          Join the waitlist
        </Link>
      </div>
    </header>
  );
}
