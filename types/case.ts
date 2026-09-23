// Core data model for a case in the "Knowing Enough to Act" archive.
// Every field here is meant to stay legible to a non-technical contributor
// editing data/cases.ts by hand — see CONTRIBUTING.md.
//
// The project's question: what happens after a society acquires a new way
// of seeing, healing, communicating, measuring, making, or organizing
// life, before it has learned how to live with it? Each case follows one
// science, technology, medical practice, or system of knowledge from its
// arrival in an existing social world through what had to change around
// it.

/** The seven primary categories. See data/taxonomy.ts for labels and guiding questions. */
export type CaseCategory =
  | "ways-of-seeing"
  | "ways-of-measuring"
  | "ways-of-communicating"
  | "ways-of-healing"
  | "ways-of-making-and-moving"
  | "ways-of-knowing"
  | "ways-of-organizing-society";

/** How far the new thing's reach extended, as a rough secondary filter. */
export type Scale =
  | "individual-household"
  | "local-institution"
  | "city-regional-authority"
  | "national-government"
  | "international-transnational-network"
  | "civilizational-long-horizon";

/** How hard the new thing was to undo once it took hold. */
export type Reversibility =
  | "easily-reversible"
  | "reversible-with-cost"
  | "hard-to-reverse"
  | "effectively-irreversible";

export type ResearchStatus =
  | "prototype-verification-in-progress"
  | "research-backed-sources-linked"
  | "interpretive-framing-under-development";

/** One stage in the Social Adjustment Map, shown on the case detail page. */
export type AdjustmentStage =
  | "new-thing"
  | "existing-habits"
  | "early-adopters"
  | "opposition-or-hesitation"
  | "new-practices-and-infrastructures"
  | "longer-term-consequences";

export interface AdjustmentStep {
  stage: AdjustmentStage;
  summary: string;
}

export interface CaseLocation {
  label: string;
  latitude: number;
  longitude: number;
  /** This point's role in the case, e.g. "origin", "a site of resistance", "where it was first adopted". */
  role?: string;
}

export interface CaseSource {
  citation: string;
  url?: string;
  note?: string;
}

export interface Case {
  id: string;
  title: string;
  subtitle: string;

  category: CaseCategory;
  scale: Scale;
  reversibility: Reversibility;
  researchStatus: ResearchStatus;

  /** Human-readable historical period, e.g. "1517–1534" or "1960". Kept as text, not a strict date. */
  period: string;
  /** Approximate start year, used only for optional secondary sorting/filtering. */
  periodStartYear: number;

  /** Human-readable geography or network description. */
  geography: string;
  /** Primary marker location for the map. */
  primaryLocation: CaseLocation;
  /** Additional points along the route of circulation, adoption, or resistance. */
  relatedLocations: CaseLocation[];

  // The nine sections of the case detail page.
  /** 1. What arrived: the thing itself, plainly described. */
  whatArrived: string;
  /** 2. What it entered: the habits, institutions, beliefs, and authorities already in place. */
  whatItEntered: string;
  /** 3. The first promise: what its earliest advocates said it would do. */
  firstPromise: string;
  /** 4. The first resistance: who hesitated or objected, and on what grounds. */
  firstResistance: string;
  /** 5. What had to change: the practices, roles, or institutions that had to adjust around it. */
  whatHadToChange: string;
  /** 6. What people could not yet see: consequences that were not visible to people at the time. */
  whatPeopleCouldNotYetSee: string;
  /** 7. The turning point: when and how it moved from contested to ordinary. */
  turningPoint: string;
  /** 8. Questions for the present: open questions this case raises, not conclusions. */
  questionsForPresent: string[];

  /** The Social Adjustment Map shown on the case detail page. */
  adjustmentMap: AdjustmentStep[];

  /** Distinguishes established historical fact from this project's interpretive framing. */
  caution: string;
  uncertaintyNotes: string;

  // 9. Sources and research status.
  sources: CaseSource[];
}
