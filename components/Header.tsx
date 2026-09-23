import Link from "next/link";

const navLinks = [
  { href: "/explore", label: "Explore" },
  { href: "/map", label: "Routes" },
  { href: "/methodology", label: "Methodology" },
  { href: "/about", label: "About" },
];

export default function Header() {
  return (
    <header className="border-b border-border bg-paper-raised">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-8 gap-y-3 px-5 py-5 sm:px-8">
        <Link
          href="/"
          className="focus-ring rounded-sm font-serif-display text-xl font-semibold tracking-tight text-ink"
        >
          hindsight
        </Link>
        <nav aria-label="Primary" className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="focus-ring rounded-sm text-ink-muted underline decoration-border-strong decoration-1 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
