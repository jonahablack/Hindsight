import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllCases, getCaseById } from "@/data/cases";
import {
  categoryLabels,
  reversibilityLabels,
  scaleLabels,
} from "@/data/taxonomy";
import ResearchStatusBadge from "@/components/ResearchStatusBadge";
import SocialAdjustmentMap from "@/components/SocialAdjustmentMap";
import TagPill from "@/components/TagPill";
import FootnoteText from "@/components/FootnoteText";

export function generateStaticParams() {
  return getAllCases().map((c) => ({ id: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const caseItem = getCaseById(id);
  if (!caseItem) return { title: "Case not found" };
  return {
    title: caseItem.title,
    description: caseItem.subtitle,
  };
}

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-border py-8 first:border-t-0 first:pt-0">
      <h2 className="font-serif-display text-xl font-semibold text-ink">
        {title}
      </h2>
      <div className="mt-3 max-w-3xl leading-relaxed text-ink-muted">
        {children}
      </div>
    </section>
  );
}

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const caseItem = getCaseById(id);
  if (!caseItem) notFound();

  return (
    <div className="mx-auto max-w-4xl px-5 py-10 sm:px-8 sm:py-14">
      <Link
        href="/explore"
        className="focus-ring rounded-sm text-sm text-ink-muted underline decoration-border-strong underline-offset-4 hover:text-accent hover:decoration-accent"
      >
        ← Back to all cases
      </Link>

      <header className="mt-6">
        <div className="flex flex-wrap items-center gap-3">
          <ResearchStatusBadge status={caseItem.researchStatus} />
          <span className="text-sm text-ink-faint">{caseItem.period}</span>
        </div>
        <h1 className="mt-3 font-serif-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
          {caseItem.title}
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-ink-muted">
          {caseItem.subtitle}
        </p>
        <p className="mt-2 text-sm text-ink-faint">{caseItem.geography}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          <TagPill label={categoryLabels[caseItem.category]} variant="accent" />
          <TagPill label={scaleLabels[caseItem.scale]} />
          <TagPill label={reversibilityLabels[caseItem.reversibility]} />
        </div>
      </header>

      <div className="mt-8 rounded-sm border border-border bg-paper-raised p-5">
        <h2 className="font-serif-display text-lg font-semibold text-ink">
          A note on fact vs. framing
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">
          {caseItem.caution}
        </p>
      </div>

      <div className="mt-10">
        <h2 className="font-serif-display text-xl font-semibold text-ink">
          Social Adjustment Map
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted">
          A simple path from arrival to consequence. Real cases rarely move
          through these steps so cleanly, and stages often overlap or run
          in parallel. This is one way to read the case, not a claim about
          exactly how events unfolded.
        </p>
        <div className="mt-6 rounded-sm border border-border bg-paper-raised p-6">
          <SocialAdjustmentMap steps={caseItem.adjustmentMap} />
        </div>
      </div>

      <div className="mt-4">
        <Section title="1. What arrived">
          <p><FootnoteText text={caseItem.whatArrived} /></p>
        </Section>

        <Section title="2. What it entered">
          <p><FootnoteText text={caseItem.whatItEntered} /></p>
        </Section>

        <Section title="3. The first promise">
          <p><FootnoteText text={caseItem.firstPromise} /></p>
        </Section>

        <Section title="4. The first resistance">
          <p><FootnoteText text={caseItem.firstResistance} /></p>
        </Section>

        <Section title="5. What had to change">
          <p><FootnoteText text={caseItem.whatHadToChange} /></p>
        </Section>

        <Section title="6. What people could not yet see">
          <p><FootnoteText text={caseItem.whatPeopleCouldNotYetSee} /></p>
        </Section>

        <Section title="7. The turning point">
          <p><FootnoteText text={caseItem.turningPoint} /></p>
        </Section>

        <Section title="8. Questions for the present">
          <ul className="list-disc space-y-2 pl-5 text-sm">
            {caseItem.questionsForPresent.map((q) => (
              <li key={q}><FootnoteText text={q} /></li>
            ))}
          </ul>
        </Section>

        <Section title="9. Sources and research status">
          <div className="flex items-center gap-2">
            <ResearchStatusBadge status={caseItem.researchStatus} />
          </div>
          <p className="mt-3 text-sm">{caseItem.uncertaintyNotes}</p>
          <ol className="mt-4 space-y-3">
            {caseItem.sources.length === 0 ? (
              <li className="text-sm italic text-ink-faint">
                No sources listed yet for this case.
              </li>
            ) : (
              caseItem.sources.map((s, i) => (
                <li key={i} id={`source-${i + 1}`} className="scroll-mt-20 text-sm">
                  <span className="text-ink-faint">{i + 1}. </span>
                  {s.url ? (
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="focus-ring rounded-sm text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
                    >
                      {s.citation}
                    </a>
                  ) : (
                    <span className="font-medium text-ink">{s.citation}</span>
                  )}
                  {s.note && (
                    <span className="block pl-4 text-ink-faint">{s.note}</span>
                  )}
                </li>
              ))
            )}
          </ol>
        </Section>
      </div>
    </div>
  );
}
