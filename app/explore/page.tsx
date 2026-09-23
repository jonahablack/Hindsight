import type { Metadata } from "next";
import { getAllCases } from "@/data/cases";
import type { CaseFilters } from "@/lib/filters";
import ExploreClient from "./ExploreClient";

export const metadata: Metadata = {
  title: "Explore",
  description: "Browse and compare cases, grouped by category.",
};

const paramToFilterKey: Record<string, keyof CaseFilters> = {
  category: "category",
  scale: "scale",
  reversibility: "reversibility",
  researchStatus: "researchStatus",
};

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const initialFilters: Partial<CaseFilters> = {};
  for (const [param, key] of Object.entries(paramToFilterKey)) {
    const value = params[param];
    if (typeof value === "string" && value.length > 0) {
      (initialFilters as Record<string, string>)[key] = value;
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
      <header className="max-w-2xl">
        <h1 className="font-serif-display text-3xl font-semibold text-ink sm:text-4xl">
          Explore the cases
        </h1>
        <p className="mt-3 leading-relaxed text-ink-muted">
          Cases are grouped by what kind of new thing arrived, not by when
          or where it happened. Use the filters to sort by scale, how easy
          it was to undo, or research status.
        </p>
      </header>
      <div className="mt-8">
        <ExploreClient cases={getAllCases()} initialFilters={initialFilters} />
      </div>
    </div>
  );
}
