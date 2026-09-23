"use client";

import {
  categoryLabels,
  categoryOrder,
  researchStatusLabels,
  researchStatusOrder,
  reversibilityLabels,
  reversibilityOrder,
  scaleLabels,
  scaleOrder,
} from "@/data/taxonomy";
import { defaultFilters, type CaseFilters } from "@/lib/filters";

interface FilterBarProps {
  filters: CaseFilters;
  onChange: (filters: CaseFilters) => void;
  resultCount: number;
}

function Select({
  id,
  label,
  value,
  onChange,
  options,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-xs font-medium text-ink-muted">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="focus-ring rounded-sm border border-border-strong bg-paper-raised px-2.5 py-2 text-sm text-ink"
      >
        <option value="all">All</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function FilterBar({ filters, onChange, resultCount }: FilterBarProps) {
  const hasActiveFilters =
    filters.category !== "all" ||
    filters.scale !== "all" ||
    filters.reversibility !== "all" ||
    filters.researchStatus !== "all" ||
    filters.periodQuery.trim().length > 0;

  return (
    <div className="rounded-sm border border-border bg-paper-raised p-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Select
          id="filter-category"
          label="Category"
          value={filters.category}
          onChange={(v) => onChange({ ...filters, category: v as CaseFilters["category"] })}
          options={categoryOrder.map((t) => ({ value: t, label: categoryLabels[t] }))}
        />
        <Select
          id="filter-reversibility"
          label="Reversibility"
          value={filters.reversibility}
          onChange={(v) => onChange({ ...filters, reversibility: v as CaseFilters["reversibility"] })}
          options={reversibilityOrder.map((t) => ({ value: t, label: reversibilityLabels[t] }))}
        />
        <Select
          id="filter-scale"
          label="Scale"
          value={filters.scale}
          onChange={(v) => onChange({ ...filters, scale: v as CaseFilters["scale"] })}
          options={scaleOrder.map((t) => ({ value: t, label: scaleLabels[t] }))}
        />
        <Select
          id="filter-research-status"
          label="Research status"
          value={filters.researchStatus}
          onChange={(v) => onChange({ ...filters, researchStatus: v as CaseFilters["researchStatus"] })}
          options={researchStatusOrder.map((t) => ({ value: t, label: researchStatusLabels[t] }))}
        />
      </div>

      <div className="mt-4 flex flex-col gap-1 sm:max-w-xs">
        <label htmlFor="filter-period" className="text-xs font-medium text-ink-muted">
          Period or geography contains
        </label>
        <input
          id="filter-period"
          type="text"
          placeholder="e.g. 1844, Vienna, national"
          value={filters.periodQuery}
          onChange={(e) => onChange({ ...filters, periodQuery: e.target.value })}
          className="focus-ring rounded-sm border border-border-strong bg-paper-raised px-2.5 py-2 text-sm text-ink placeholder:text-ink-faint"
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
        <p className="text-sm text-ink-muted" aria-live="polite">
          {resultCount} {resultCount === 1 ? "case" : "cases"} match
        </p>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={() => onChange({ ...defaultFilters })}
            className="focus-ring rounded-sm text-sm text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}
