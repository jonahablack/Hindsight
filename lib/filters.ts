import type { Case, CaseCategory, ResearchStatus, Reversibility, Scale } from "@/types/case";

export interface CaseFilters {
  category: CaseCategory | "all";
  scale: Scale | "all";
  reversibility: Reversibility | "all";
  researchStatus: ResearchStatus | "all";
  /** Free-text match against period string, e.g. "16" to find 16th-century cases. */
  periodQuery: string;
}

export const defaultFilters: CaseFilters = {
  category: "all",
  scale: "all",
  reversibility: "all",
  researchStatus: "all",
  periodQuery: "",
};

export function filterCases(cases: Case[], filters: Partial<CaseFilters>): Case[] {
  return cases.filter((c) => {
    if (filters.category && filters.category !== "all" && c.category !== filters.category) {
      return false;
    }
    if (filters.scale && filters.scale !== "all" && c.scale !== filters.scale) {
      return false;
    }
    if (filters.reversibility && filters.reversibility !== "all" && c.reversibility !== filters.reversibility) {
      return false;
    }
    if (filters.researchStatus && filters.researchStatus !== "all" && c.researchStatus !== filters.researchStatus) {
      return false;
    }
    if (filters.periodQuery && filters.periodQuery.trim().length > 0) {
      const q = filters.periodQuery.trim().toLowerCase();
      if (!c.period.toLowerCase().includes(q) && !c.geography.toLowerCase().includes(q)) {
        return false;
      }
    }
    return true;
  });
}
