# Knowing Enough to Act

How societies learned to live with new sciences, technologies, and
medicines.

This project follows one science, technology, medical practice, or
system of knowledge at a time, from its arrival in an existing social
world through what had to change around it. The guiding question: what
happens after a society acquires a new way of seeing, healing,
communicating, measuring, making, or organizing life, before it has
learned how to live with it?

This is not a timeline of great inventions, a celebration of inventors,
or a map organized mainly by year and place. Cases are grouped by what
kind of new thing arrived: a way of seeing, measuring, communicating,
healing, making and moving, knowing, or organizing society. The project
stays focused on science, technology, medicine, and systems of
knowledge, because its underlying purpose is to sharpen questions about
AI and digital technology. Every case carries a compact "Question for AI
and digital technology" module that names a structural comparison, asks
open questions, and says plainly where the comparison breaks down. See
the methodology page for the full framing.

## Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com)
- Static local data (`data/cases.ts`) — no database, no auth, no external APIs at runtime
- [react-simple-maps](https://www.react-simple-maps.io/) + [d3-geo](https://github.com/d3/d3-geo) for the Routes and Networks map, drawing a real (though simplified) world outline from a static file at `public/data/land-110m.json`, sourced once from the `world-atlas` package. No live map tiles or external map API calls.

## Running the project

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

Other useful commands:

```bash
npm run build   # production build + type check
npm run start   # run the production build
npm run lint    # ESLint
npx tsc --noEmit  # type check only
```

## Project structure

```
app/                    Routes (App Router)
  page.tsx               Home
  explore/                Explore page (filters, grouping, compare mode)
  map/                    Routes and Networks page
  case/[id]/              Case detail page (the nine-section structure)
  methodology/            Methodology page
  about/                  About page
components/              Reusable UI components
  WorldMap.tsx             The interactive map (react-simple-maps)
  SocialAdjustmentMap.tsx   The six-stage adjustment path shown on each case
  AIQuestionModule.tsx      The "Question for AI and digital technology" box
  WhatChangedPathway.tsx    The small interactive pathway on the home page
data/
  cases.ts                 The six seed cases (edit this to add/change a case)
  taxonomy.ts               Labels and guiding questions for the seven categories
  haven-seed-candidates.json  A preliminary, unreviewed list of 100 candidate discoveries from Kendall Haven's book, used as a seed list, not treated as authoritative
  1001-inventions-seed-candidates.json  A preliminary, unreviewed extraction of all 1,001 chapters of Jack Challoner's edited collection, each read individually, ~24% flagged as worth a closer look
types/
  case.ts                   The Case data model (TypeScript types)
lib/
  filters.ts                 Filtering logic shared by the explore page
public/data/
  land-110m.json              Simplified world landmass shapes used by the map
```

Case data is intentionally kept separate from rendering logic: everything in
`data/` is plain data, and everything in `components/` and `app/` reads from
it. You should never need to touch a component to add a case.

## Editing case data

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the full walkthrough of the
`Case` type and how to add a new case or edit an existing one.

## Adding sources

Every case has a `sources` array:

```ts
sources: [
  {
    citation: "Author or organization, \"Title.\"",
    url: "https://...", // optional
    note: "What this source supports or where to find it.", // optional
  },
]
```

If a claim has no real source yet, use `"[Source to be added]"` as the
citation rather than inventing one. Do not fabricate a citation, a page
number, or a quotation to fill a gap.

## Writing style

Case text and page copy in this project stick to plain, careful,
historically curious prose: short sentences, common words. Avoid em
dashes, "not X but Y" constructions, and startup or policy-consultancy
language (words like "transformative," "game-changing," "revolutionary,"
"robust," "seamless," "leverage," "harness," "navigate," or "landscape").
Prefer direct questions: "What changed?" "Who accepted it?" "Who resisted
it?" "What had to be rebuilt around it?" This applies to every text field
in a case and to page copy in `app/`. It does not apply to the fixed
category labels in `data/taxonomy.ts`, which are part of the site's data
model.

## Research integrity

This project does not invent citations, archive records, quotations,
dates, or outcomes. It does not assume that scientific or technical
change follows a single path, that adoption equals progress, or that
historical cases provide simple answers for present problems. Every case
visibly displays its research status, and the `caution` field on every
case distinguishes established historical fact from this project's own
interpretive framing. See [PROJECT_NOTES.md](./PROJECT_NOTES.md) for what
in the current case set still needs deeper verification.
# Hindsight
