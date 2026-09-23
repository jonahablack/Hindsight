# Hindsight

How societies learned to live with new sciences, technologies, and
medicines.

This project tracks the impact of a scientific or technological innovation, to determine what
happens after a society acquires a new way of seeing, healing,
communicating, measuring, making, or organizing life, and what choices are made to adapt.

Cases are grouped by what kind of new thing arrived. Categories include ways of seeing, measuring, communicating,
healing, making and moving, knowing, or organizing society.

## Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com)
- Static local data (`data/cases.ts`) — no database, no auth, no external APIs at runtime
- [react-globe.gl](https://github.com/vasturiano/react-globe.gl) (Three.js/WebGL) for the Routes and Networks page's interactive 3D globe, drawing a real (though simplified) world outline from a static file at `public/data/land-110m.json`, sourced once from the `world-atlas` package. The globe surface is a plain colored material, not a photographic texture, so there's still no live map tiles or external map API calls. Rendered client-only (`next/dynamic` with `ssr: false`) since WebGL needs a browser.

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
  WorldMap.tsx             The Routes and Networks page shell (sidebar, legend, selection state)
  Globe3D.tsx               The 3D globe itself (react-globe.gl), loaded client-only
  SocialAdjustmentMap.tsx   The six-stage adjustment path shown on each case
  WhatChangedPathway.tsx    The small interactive pathway on the home page
data/
  cases.ts                 257 cases (edit this to add/change a case): 6 originally hand-written, 242 built from the 1001-inventions seed list (239 from the automated notability pass, plus 3 Industrial Revolution cases added by hand afterward), and 9 from a triaged subset of the Haven seed list
  taxonomy.ts               Labels and guiding questions for the seven categories
  haven-seed-candidates.json  Kendall Haven's 100-title list, used as a non-authoritative seed list; each entry now carries a final `candidateStatus` (`built`, `excluded-duplicate`, or `excluded-thin-social-narrative`) recording why it did or didn't become a case
  1001-inventions-seed-candidates.json  All 1,001 chapters of Jack Challoner's edited collection, extracted and read individually; the 239 entries flagged `notableForFullCase: true` are the ones built into cases
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

If a claim has no source yet, use `"[Source to be added]"` as the
citation.
