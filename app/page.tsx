import Link from "next/link";
import { getAllCases } from "@/data/cases";
import { categoryExamples, categoryGuidingQuestion, categoryLabels, categoryOrder } from "@/data/taxonomy";
import CaseCard from "@/components/CaseCard";
import ResearchStatusBadge from "@/components/ResearchStatusBadge";
import SocialAdjustmentMap from "@/components/SocialAdjustmentMap";
import WhatChangedPathway from "@/components/WhatChangedPathway";

const featuredCaseId = "germ-theory-antisepsis-hospital-practice";

export default function HomePage() {
  const cases = getAllCases();
  const featured = cases.find((c) => c.id === featuredCaseId) ?? cases[0];

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="border-b border-border bg-paper-raised">
        <div className="paper-texture mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <p className="text-sm font-medium uppercase tracking-widest text-accent">
            hindsight
          </p>
          <h1 className="mt-4 max-w-3xl font-serif-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            An Archive of Disruptive Innovations
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted">
            How historical societies adapted to the introduction and spread of new sciences and technologies.
          </p>
          <p className="mt-6 max-w-2xl leading-relaxed text-ink-muted">
            Discoveries are not made in a vacuum. Innovations are prone to disrupt
            established habits, institutions, beliefs, and forms of
            authority. This project tracks the course of several notable innovations over 
            the course of history
            including the circumstances that shaped their reception, manners of adaption and resitance,
            and the aftermath of their implementation.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/explore"
              className="focus-ring rounded-sm bg-accent px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-accent-strong"
            >
              Explore the cases
            </Link>
            <Link
              href="/methodology"
              className="focus-ring rounded-sm border border-border-strong px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent-strong"
            >
              Read the methodology
            </Link>
          </div>
        </div>
      </section>

      {/* Seven category cards */}
      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <h2 className="font-serif-display text-xl font-semibold text-ink">
          Start from a category
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted">
          Cases are grouped by what kind of new thing arrived, not by year
          or place.
        </p>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categoryOrder.map((cat) => (
            <Link
              key={cat}
              href={`/explore?category=${cat}`}
              className="focus-ring group rounded-sm border border-border-strong bg-paper-raised p-4 transition-colors hover:border-accent"
            >
              <h3 className="font-serif-display text-base font-semibold text-ink group-hover:text-accent-strong">
                {categoryLabels[cat]}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {categoryGuidingQuestion[cat]}
              </p>
              <p className="mt-2 text-xs text-ink-faint">
                {categoryExamples[cat]}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured case */}
      <section className="border-y border-border bg-paper-raised">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <p className="text-sm font-medium uppercase tracking-widest text-ink-faint">
            Featured case
          </p>
          <div className="mt-5 grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <ResearchStatusBadge status={featured.researchStatus} />
              <h3 className="mt-3 font-serif-display text-2xl font-semibold leading-snug text-ink">
                {featured.title}
              </h3>
              <p className="mt-2 text-ink-muted">{featured.subtitle}</p>
              <p className="mt-4 leading-relaxed text-ink-muted">
                {featured.whatArrived.replace(/\[\d+\]/g, "")}
              </p>
              <Link
                href={`/case/${featured.id}`}
                className="focus-ring mt-5 inline-block rounded-sm text-sm font-medium text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
              >
                Read the full case →
              </Link>
            </div>
            <div className="rounded-sm border border-border bg-paper p-5">
              <SocialAdjustmentMap steps={featured.adjustmentMap} />
            </div>
          </div>
        </div>
      </section>

      {/* How to read a case */}
      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <h2 className="font-serif-display text-xl font-semibold text-ink">
          How to read a case
        </h2>
        <div className="mt-5 grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div>
            <h3 className="font-medium text-ink">Nine questions, one path</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              Each case moves from what arrived, through the first promise
              and the first resistance, to what had to change and what
              people could not yet see.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-ink">Grouped by category</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              Cases are grouped by what kind of new thing arrived: a way
              of seeing, healing, communicating, measuring, making,
              knowing, or organizing.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-ink">Provisional by design</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              Every case shows its own research status and lists its
              sources. This is a small, early set of cases, not a finished
              archive.
            </p>
          </div>
        </div>
        <Link
          href="/methodology"
          className="focus-ring mt-6 inline-block rounded-sm text-sm font-medium text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
        >
          Read the full methodology →
        </Link>
      </section>

      {/* What changed? interactive pathway */}
      <section className="border-t border-border bg-paper-raised">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <h2 className="font-serif-display text-xl font-semibold text-ink">
            What changed?
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted">
            Every case in this archive follows the same rough path. Select
            a stage to see what it asks.
          </p>
          <div className="mt-6">
            <WhatChangedPathway />
          </div>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-ink-muted">
            Discoveries and inventions are not treated here as isolated
            achievements. Each one is an event that entered a social
            world already full of habits, institutions, and beliefs, and
            changed some part of it.
          </p>
        </div>
      </section>

      {/* Sample of cases */}
      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-serif-display text-xl font-semibold text-ink">
            Recently added
          </h2>
          <Link
            href="/explore"
            className="focus-ring rounded-sm text-sm font-medium text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
          >
            Open the full explorer ({cases.length} cases) →
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cases.slice(-9).reverse().map((c) => (
            <CaseCard key={c.id} caseItem={c} />
          ))}
        </div>
      </section>
    </div>
  );
}
