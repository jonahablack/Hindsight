# Contributing a case

This project is a small, openly unfinished archive. The most useful
contribution most people can make is: verify a claim, add a real source,
turn one of the entries in `data/1001-inventions-seed-candidates.json` or
`data/haven-seed-candidates.json` into a full case, or propose a new case
that fills a gap in the current set.

## Before you add a case

Ask whether the case fits the project's guiding question: *what happens
after a society acquires a new way of seeing, healing, communicating,
measuring, making, or organizing life, before it has learned how to live
with it?* A case belongs here when a scientific claim, medical practice,
technical device, infrastructure, or knowledge system entered an
established social setting, and its arrival required people to revise
how they understood authority, health, risk, communication, work,
education, family life, or ordinary practice.

Stay away from cases that are only political or biographical unless a
concrete science, technology, medicine, or communication system sits at
the center of the story. A figure like Martin Luther belongs only as
part of a case about the technology and its effects (printing,
vernacular scripture, pamphlet circulation), not as a case about the
person. Purely political, religious, or philosophical episodes with no
science, technology, medicine, or communication system at their center
do not belong in this set, even if they involve a fascinating decision
under uncertainty.

## Adding a case

1. Open `data/cases.ts`.
2. Copy the shape of an existing case object as a starting point.
3. Fill in every field of the `Case` type (see `types/case.ts` for the
   full model and inline comments). Nothing is optional. If you don't
   know something yet, say so honestly in `uncertaintyNotes` or `caution`
   rather than guessing.
4. Choose a `category` from the seven values in `types/case.ts`
   (`ways-of-seeing`, `ways-of-measuring`, `ways-of-communicating`,
   `ways-of-healing`, `ways-of-making-and-moving`, `ways-of-knowing`,
   `ways-of-organizing-society`), and a `scale` and `reversibility` from
   their own union types. TypeScript will catch a typo or an invalid
   value at build time.
5. Set `researchStatus` honestly:
   - `"prototype-verification-in-progress"` — the default for a new case;
     use this until sources are checked.
   - `"research-backed-sources-linked"` — only once the case's key claims
     are backed by real, checked sources in the `sources` array.
   - `"interpretive-framing-under-development"` — for a case whose facts
     are reasonably solid but whose framing is still being worked out.
6. Write the eight narrative fields in order: `whatArrived`,
   `whatItEntered`, `firstPromise`, `firstResistance`, `whatHadToChange`,
   `whatPeopleCouldNotYetSee`, `turningPoint`, and `questionsForPresent`
   (an array of open questions, not conclusions). These map directly to
   sections 1 through 8 on the case detail page; `sources` is the 9th.
7. Fill in `adjustmentMap`: six steps following the fixed sequence
   `new-thing → existing-habits → early-adopters →
   opposition-or-hesitation → new-practices-and-infrastructures →
   longer-term-consequences`, each with a one- or two-sentence summary
   specific to your case.
8. Fill in `sources`. If you don't have a real source yet, use:
   ```ts
   { citation: "[Source to be added]", note: "What kind of source is needed and why." }
   ```
   Do not invent a citation, a quotation, a date, or an outcome to fill
   the space. An honest placeholder is always better than a fabricated
   source.
9. Write the `caution` field last. It should tell a reader plainly which
   parts of the case are established historical fact and which parts
   are this project's own interpretive framing.
10. Add coordinates for `primaryLocation` (and `relatedLocations` for any
    other place that played a part in the case's travel, adoption, or
    resistance). These are used by the Routes and Networks map and
    should be approximate, not falsely precise.
11. Run `npm run build` and `npx tsc --noEmit` to confirm nothing is
    broken. The case will automatically appear in the explorer, the map,
    and get its own detail page at `/case/<your-id>` — there is no other
    file to update.

## Working from the seed lists

Two files hold preliminary, unreviewed extractions from books, meant as
starting points, not sources you cite directly:

- `data/1001-inventions-seed-candidates.json` — all 1,001 chapters of
  Jack Challoner's edited collection *1,001 Inventions That Changed the
  World*, each read individually and given a `notableForFullCase` flag.
  Start here; about a quarter of entries are flagged `true`, meaning the
  chapter's own text described a concrete episode of adoption,
  resistance, competition, or consequence, worth a closer look. A `false`
  flag does not mean the invention was unimportant, only that this
  extraction pass didn't find that kind of material in the chapter text.
- `data/haven-seed-candidates.json` — Kendall Haven's *100 Greatest
  Science Discoveries of All Time*. Most entries describe a discovery in
  Haven's narrow sense, a fact found out about nature, which is usually
  not the kind of social arrival this project follows.

Before turning any entry into a case, check that it can actually answer
this project's guiding question: who adopted it, who resisted it, and
what had to change around it. If it can't, it may still be useful
background for a case about something built on top of it, but it
probably isn't a case on its own. Never cite either book as a source for
a claim beyond what is in these files' `sourcePage`/`havenPage` fields
unless you have read the relevant chapter yourself.

## Writing style

Write case text in plain, careful, historically curious prose: short
sentences, common words. Avoid em dashes, "not X but Y" constructions,
and startup or policy-consultancy language. Avoid words like
"transformative," "game-changing," "revolutionary," "robust,"
"seamless," "leverage," "harness," "navigate," and "landscape." Prefer
direct questions over declarations. This applies to every text field in
a case (`whatArrived`, `firstResistance`, and so on) and to page copy in
`app/`. It does not apply to the fixed category labels in
`data/taxonomy.ts`, which are part of the site's data model.

## Editing taxonomy labels

If you need to change how a category is labeled or ordered across the
whole site, edit `data/taxonomy.ts`, not individual components. Every
page reads labels from there.

## Suggesting a correction or a source

If you're not comfortable editing code, the fastest way to flag a
problem is to open an issue (or send a pull request, if you can)
describing:

- Which case
- What's wrong or missing
- A source, if you have one, that supports the correction

Small, specific corrections, a fixed date, a better source, a softened
claim that was stated too strongly, are exactly what this project needs
most right now.
