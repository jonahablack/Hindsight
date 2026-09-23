"use client";

import { useMemo, useState } from "react";
import type { Case } from "@/types/case";
import { categoryLabels, categoryOrder } from "@/data/taxonomy";
import { defaultFilters, filterCases, type CaseFilters } from "@/lib/filters";
import FilterBar from "@/components/FilterBar";
import ExploreCaseCard from "@/components/ExploreCaseCard";
import CompareView from "@/components/CompareView";

const MAX_COMPARE = 3;
const PAGE_SIZE = 12;

export default function ExploreClient({
  cases,
  initialFilters,
}: {
  cases: Case[];
  initialFilters?: Partial<CaseFilters>;
}) {
  const [filters, setFilters] = useState<CaseFilters>({
    ...defaultFilters,
    ...initialFilters,
  });
  const [compareMode, setCompareMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [visibleCounts, setVisibleCounts] = useState<Record<string, number>>({});

  const filtered = useMemo(() => filterCases(cases, filters), [cases, filters]);

  const grouped = useMemo(() => {
    return categoryOrder
      .map((cat) => ({
        type: cat,
        label: categoryLabels[cat],
        cases: filtered.filter((c) => c.category === cat),
      }))
      .filter((group) => group.cases.length > 0);
  }, [filtered]);

  const selectedCases = useMemo(
    () => cases.filter((c) => selectedIds.includes(c.id)),
    [cases, selectedIds]
  );

  function toggleSelect(id: string) {
    setSelectedIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= MAX_COMPARE) return prev;
      return [...prev, id];
    });
  }

  return (
    <div className="flex flex-col gap-8">
      <FilterBar filters={filters} onChange={setFilters} resultCount={filtered.length} />

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-sm border border-border bg-paper-raised px-5 py-4">
        <div>
          <p className="text-sm font-medium text-ink">Compare cases</p>
          <p className="text-sm text-ink-muted">
            Select 2–3 cases to view them side by side.
            {compareMode && selectedIds.length > 0 && (
              <span> {selectedIds.length} of {MAX_COMPARE} selected.</span>
            )}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setCompareMode((v) => !v)}
          className="focus-ring rounded-sm border border-accent px-4 py-2 text-sm font-medium text-accent-strong transition-colors hover:bg-accent-soft"
          aria-pressed={compareMode}
        >
          {compareMode ? "Exit compare mode" : "Start comparing"}
        </button>
      </div>

      {compareMode && (
        <section aria-label="Case comparison">
          <CompareView cases={selectedCases} />
        </section>
      )}

      {filtered.length === 0 ? (
        <p className="rounded-sm border border-border bg-paper-raised p-8 text-center text-sm text-ink-muted">
          No cases match these filters yet. Try clearing one or two.
        </p>
      ) : (
        <div className="flex flex-col gap-10">
          {grouped.map((group) => {
            const visible = visibleCounts[group.type] ?? PAGE_SIZE;
            const shown = group.cases.slice(0, visible);
            const remaining = group.cases.length - shown.length;
            return (
              <section key={group.type} aria-labelledby={`group-${group.type}`}>
                <h2
                  id={`group-${group.type}`}
                  className="font-serif-display text-xl font-semibold text-ink"
                >
                  {group.label}{" "}
                  <span className="text-base font-normal text-ink-faint">
                    ({group.cases.length})
                  </span>
                </h2>
                <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {shown.map((c) => (
                    <ExploreCaseCard
                      key={c.id}
                      caseItem={c}
                      compareMode={compareMode}
                      selected={selectedIds.includes(c.id)}
                      selectionDisabled={selectedIds.length >= MAX_COMPARE}
                      onToggleSelect={() => toggleSelect(c.id)}
                    />
                  ))}
                </div>
                {remaining > 0 && (
                  <button
                    type="button"
                    onClick={() =>
                      setVisibleCounts((prev) => ({
                        ...prev,
                        [group.type]: visible + PAGE_SIZE * 3,
                      }))
                    }
                    className="focus-ring mt-4 rounded-sm border border-border-strong px-4 py-2 text-sm text-ink-muted transition-colors hover:border-accent hover:text-accent-strong"
                  >
                    Show {Math.min(remaining, PAGE_SIZE * 3)} more ({remaining} left)
                  </button>
                )}
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
