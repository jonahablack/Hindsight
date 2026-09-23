import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-paper-raised">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <p className="max-w-2xl text-sm leading-relaxed text-ink-muted">
          Each case shows its own research status and sources. See the{" "}
          <Link href="/methodology" className="focus-ring rounded-sm underline decoration-border-strong underline-offset-4 hover:text-accent hover:decoration-accent">
            methodology
          </Link>{" "}
          to learn how cases are built, and{" "}
          <Link href="/methodology#contribute" className="focus-ring rounded-sm underline decoration-border-strong underline-offset-4 hover:text-accent hover:decoration-accent">
            how to suggest a correction or a source
          </Link>
          .
        </p>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-faint">
          <Link href="/" className="focus-ring rounded-sm hover:text-accent">Home</Link>
          <Link href="/explore" className="focus-ring rounded-sm hover:text-accent">Explore</Link>
          <Link href="/map" className="focus-ring rounded-sm hover:text-accent">Routes</Link>
          <Link href="/methodology" className="focus-ring rounded-sm hover:text-accent">Methodology</Link>
          <Link href="/about" className="focus-ring rounded-sm hover:text-accent">About</Link>
        </div>
      </div>
    </footer>
  );
}
