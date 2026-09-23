// Labels, guiding questions, and ordering for every controlled vocabulary
// used across the archive. Keeping this separate from data/cases.ts means
// the filter UI and case detail pages always render consistent language.

import type {
  AdjustmentStage,
  CaseCategory,
  ResearchStatus,
  Reversibility,
  Scale,
} from "@/types/case";

export const categoryLabels: Record<CaseCategory, string> = {
  "ways-of-seeing": "Ways of seeing",
  "ways-of-measuring": "Ways of measuring",
  "ways-of-communicating": "Ways of communicating",
  "ways-of-healing": "Ways of healing",
  "ways-of-making-and-moving": "Ways of making and moving",
  "ways-of-knowing": "Ways of knowing",
  "ways-of-organizing-society": "Ways of organizing society",
};

export const categoryOrder: CaseCategory[] = [
  "ways-of-seeing",
  "ways-of-measuring",
  "ways-of-communicating",
  "ways-of-healing",
  "ways-of-making-and-moving",
  "ways-of-knowing",
  "ways-of-organizing-society",
];

export const categoryGuidingQuestion: Record<CaseCategory, string> = {
  "ways-of-seeing": "What changed when people could see something that had been hidden before?",
  "ways-of-measuring": "What became governable once it could be counted, compared, or standardized?",
  "ways-of-communicating": "What happened when ideas moved faster, reached new publics, or slipped past older gatekeepers?",
  "ways-of-healing": "How did a new medical practice change trust, authority, risk, and the experience of the body?",
  "ways-of-making-and-moving": "How did new infrastructure reorganize time, work, distance, and daily life?",
  "ways-of-knowing": "What happened when a theory changed how people understood nature, themselves, or their place in the world?",
  "ways-of-organizing-society": "How did a technical system redistribute authority, responsibility, and visibility?",
};

export const categoryExamples: Record<CaseCategory, string> = {
  "ways-of-seeing": "telescope, microscope, X-ray, photography, satellite imaging",
  "ways-of-measuring": "clocks, censuses, statistics, standard measures, risk calculation, computing",
  "ways-of-communicating": "printing, telegraph, radio, television, internet, social media",
  "ways-of-healing": "inoculation, vaccination, anesthesia, germ theory, antisepsis, antibiotics, contraception",
  "ways-of-making-and-moving": "steam power, railroads, electricity, industrial machinery, automobiles",
  "ways-of-knowing": "Copernican astronomy, evolution, plate tectonics, climate science, genetics, computing",
  "ways-of-organizing-society": "bureaucratic records, public-health surveillance, identification systems, algorithms, communication networks",
};

export const scaleLabels: Record<Scale, string> = {
  "individual-household": "Individual or household",
  "local-institution": "Local institution",
  "city-regional-authority": "City or regional authority",
  "national-government": "National government",
  "international-transnational-network": "International or transnational network",
  "civilizational-long-horizon": "Civilizational or long-horizon reach",
};

export const scaleOrder: Scale[] = [
  "individual-household",
  "local-institution",
  "city-regional-authority",
  "national-government",
  "international-transnational-network",
  "civilizational-long-horizon",
];

export const reversibilityLabels: Record<Reversibility, string> = {
  "easily-reversible": "Easily reversible",
  "reversible-with-cost": "Reversible with significant cost",
  "hard-to-reverse": "Hard to reverse",
  "effectively-irreversible": "Effectively irreversible",
};

export const reversibilityOrder: Reversibility[] = [
  "easily-reversible",
  "reversible-with-cost",
  "hard-to-reverse",
  "effectively-irreversible",
];

export const researchStatusLabels: Record<ResearchStatus, string> = {
  "prototype-verification-in-progress":
    "Prototype: source verification in progress",
  "research-backed-sources-linked": "Research-backed: sources linked",
  "interpretive-framing-under-development":
    "Interpretive framing: under development",
};

export const researchStatusOrder: ResearchStatus[] = [
  "prototype-verification-in-progress",
  "research-backed-sources-linked",
  "interpretive-framing-under-development",
];

export const adjustmentStageLabels: Record<AdjustmentStage, string> = {
  "new-thing": "New thing introduced",
  "existing-habits": "Existing habits and institutions",
  "early-adopters": "Early adopters",
  "opposition-or-hesitation": "Opposition or hesitation",
  "new-practices-and-infrastructures": "New practices and infrastructures",
  "longer-term-consequences": "Longer-term consequences",
};

export const adjustmentStageOrder: AdjustmentStage[] = [
  "new-thing",
  "existing-habits",
  "early-adopters",
  "opposition-or-hesitation",
  "new-practices-and-infrastructures",
  "longer-term-consequences",
];

export const adjustmentStageHelp: Record<AdjustmentStage, string> = {
  "new-thing": "The science, technology, medical practice, or system of knowledge that arrived.",
  "existing-habits": "The habits, institutions, beliefs, and forms of authority already in place when it arrived.",
  "early-adopters": "Who took it up first, and why.",
  "opposition-or-hesitation": "Who hesitated or resisted, and on what grounds.",
  "new-practices-and-infrastructures": "What had to be built, trained, licensed, or rebuilt around it.",
  "longer-term-consequences": "What followed later, including effects early adopters could not see coming.",
};
