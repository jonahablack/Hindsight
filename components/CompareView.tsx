import Link from "next/link";
import type { ReactNode } from "react";
import type { Case } from "@/types/case";
import {
  categoryLabels,
  reversibilityLabels,
  scaleLabels,
} from "@/data/taxonomy";
import ResearchStatusBadge from "./ResearchStatusBadge";

/** Compare view has no per-case source list to link to, so footnote markers are dropped rather than shown as dead links. */
function stripFootnotes(text: string) {
  return text.replace(/\[\d+\]/g, "");
}

interface CompareRow {
  label: string;
  render: (c: Case) => ReactNode;
}

const rows: CompareRow[] = [
  { label: "Category", render: (c) => categoryLabels[c.category] },
  { label: "Scale", render: (c) => scaleLabels[c.scale] },
  { label: "Reversibility", render: (c) => reversibilityLabels[c.reversibility] },
  { label: "What arrived", render: (c) => stripFootnotes(c.whatArrived) },
  { label: "What it entered", render: (c) => stripFootnotes(c.whatItEntered) },
  { label: "First promise", render: (c) => stripFootnotes(c.firstPromise) },
  { label: "First resistance", render: (c) => stripFootnotes(c.firstResistance) },
  { label: "What had to change", render: (c) => stripFootnotes(c.whatHadToChange) },
  { label: "The turning point", render: (c) => stripFootnotes(c.turningPoint) },
  { label: "Questions for the present", render: (c) => (
      <ul className="list-disc space-y-1 pl-4">
        {c.questionsForPresent.map((q) => <li key={q}>{stripFootnotes(q)}</li>)}
      </ul>
    ) },
];

export default function CompareView({ cases }: { cases: Case[] }) {
  if (cases.length < 2) {
    return (
      <p className="rounded-sm border border-border bg-paper-raised p-6 text-sm text-ink-muted">
        Select at least two cases to compare them side by side.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] table-fixed border-collapse text-sm">
        <caption className="mb-4 text-left text-xs text-ink-faint">
          This table sets cases side by side. It does not give them a score
          or a rank.
        </caption>
        <thead>
          <tr>
            <th scope="col" className="w-40 border-b border-border-strong pb-3 text-left align-bottom text-xs font-medium uppercase tracking-wide text-ink-faint">
              Dimension
            </th>
            {cases.map((c) => (
              <th
                key={c.id}
                scope="col"
                className="border-b border-border-strong px-4 pb-3 text-left align-bottom"
              >
                <Link
                  href={`/case/${c.id}`}
                  className="focus-ring rounded-sm font-serif-display text-base font-semibold text-ink hover:text-accent-strong"
                >
                  {c.title}
                </Link>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <ResearchStatusBadge status={c.researchStatus} />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.label} className={i % 2 === 0 ? "bg-paper-raised" : ""}>
              <th
                scope="row"
                className="border-b border-border px-0 py-4 pr-4 text-left align-top text-xs font-medium text-ink-muted"
              >
                {row.label}
              </th>
              {cases.map((c) => (
                <td key={c.id} className="border-b border-border px-4 py-4 align-top leading-relaxed text-ink">
                  {row.render(c)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
