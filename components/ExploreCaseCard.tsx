import Link from "next/link";
import type { Case } from "@/types/case";
import {
  categoryLabels,
  reversibilityLabels,
  scaleLabels,
} from "@/data/taxonomy";
import ResearchStatusBadge from "./ResearchStatusBadge";
import TagPill from "./TagPill";

export default function ExploreCaseCard({
  caseItem,
  compareMode,
  selected,
  selectionDisabled,
  onToggleSelect,
}: {
  caseItem: Case;
  compareMode: boolean;
  selected: boolean;
  selectionDisabled: boolean;
  onToggleSelect: () => void;
}) {
  return (
    <article className="fade-in flex h-full flex-col rounded-sm border border-border bg-paper-raised p-5">
      <div className="flex items-start justify-between gap-3">
        <span className="text-xs uppercase tracking-wide text-ink-faint">
          {caseItem.period}
        </span>
        <ResearchStatusBadge status={caseItem.researchStatus} />
      </div>
      <h3 className="mt-3 font-serif-display text-lg font-semibold leading-snug text-ink">
        <Link
          href={`/case/${caseItem.id}`}
          className="focus-ring rounded-sm hover:text-accent-strong"
        >
          {caseItem.title}
        </Link>
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">
        {caseItem.subtitle}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <TagPill label={scaleLabels[caseItem.scale]} />
        <TagPill label={reversibilityLabels[caseItem.reversibility]} />
      </div>
      <div className="mt-4 border-t border-border pt-3 text-sm text-ink-muted">
        <span className="font-medium text-ink">Category: </span>
        {categoryLabels[caseItem.category]}
      </div>
      {compareMode && (
        <label className="focus-ring mt-4 flex items-center gap-2 rounded-sm border border-border-strong px-3 py-2 text-sm text-ink has-[:checked]:border-accent has-[:checked]:bg-accent-soft">
          <input
            type="checkbox"
            checked={selected}
            disabled={selectionDisabled && !selected}
            onChange={onToggleSelect}
            className="h-4 w-4 accent-[var(--color-accent)]"
          />
          {selected ? "Selected for comparison" : "Add to comparison"}
        </label>
      )}
    </article>
  );
}
