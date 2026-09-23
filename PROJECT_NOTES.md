# Project notes

Internal notes for whoever picks this project up next.

## The 1,001 Inventions extraction

`data/1001-inventions-seed-candidates.json` was built by extracting every
chapter of Jack Challoner's edited collection *1,001 Inventions That
Changed the World* directly from its EPUB file (not just the table of
contents, unlike the Haven file). The EPUB was 206MB, almost entirely
embedded images; only the ~2.9MB of chapter XHTML text was extracted and
read.

The work was split across 8 parallel subagents, one per the book's own
chronological part (roughly 90-150 chapters each), each reading its
chapters' actual text (a stated date, a one-line tagline, and 2-3
paragraphs of context per chapter) rather than guessing from titles.
Two of the eight agents (Parts 2 and 3) hit a session-wide rate limit
partway through and were relaunched fresh once the limit cleared; their
second attempts completed cleanly. The other six finished on the first
try. All 1,001 entries were merged, validated (zero duplicate titles,
zero missing fields, zero invalid category values), and copied into
`data/`.

Results: 1,001 entries, 239 (23.9%) flagged `notableForFullCase: true`
during extraction, meaning the chapter's own text described a concrete
episode of adoption, resistance, competition, or consequence, not just
that the invention sounded important. Category distribution is heavily
skewed toward `ways-of-making-and-moving` (570 of 1,001), which reflects
the book's own emphasis on physical technology over abstract theory —
`ways-of-knowing` has only 19 entries total, of which just 2 were flagged
notable (Tachistoscope, Artificial Intelligence). This confirms the
imbalance already visible in the current 6-case set and should shape
what gets picked next (see below).

A few standout notable entries worth a look before anything else,
picked because they fill the categories the current 6 cases don't touch
and because they sound genuinely well matched to this project's
question:

- **Map** (c. 6500 BCE, ways of seeing) — the chapter apparently
  discusses Ptolemy's map error misleading Columbus.
- **Standard Measures** (c. 2500 BCE, ways of measuring) — competing
  Indus Valley and Mesopotamian standardization systems.
- **Artificial Intelligence** (1956, ways of knowing) — flagged notable
  by the Part 8 agent in its own right, independent of this project's
  broader AI framing; worth reading closely since it may be more
  directly relevant than any comparison module could make it.
- **Fingerprinting** (organizing society) — replaced Bertillonage as the
  trusted identification method.
- **Municipal Water Treatment** and **Water Filter** (healing/seeing) —
  the 1855 London cholera outbreak proving invisible contaminants cause
  disease, a strong companion or alternative to the existing germ theory
  case.
- **Bourke Engine** (making and moving) — a rare documented case of
  non-adoption despite a free, expired patent. Useful as a contrast case
  where a project about how societies act on new technology gets to
  show a technology nobody acted on at all.
- **Bicycle Derailleur Gears** — the inventor staged a race to overcome
  cyclists' skepticism, a clean small-scale adoption story.
- Several entries document technologies adopted enthusiastically then
  reversed after harm was recognized (DDT, Freon), which would extend
  the leaded-gasoline-style pattern from the project's first phase into
  the new framing.

Every one of these got that treatment as part of the mass case-building
pass described below; see "What is in the current case set."

## Mass case-building pipeline (all 239 notable 1001-inventions entries, plus a Haven triage)

Once the two seed files existed, the next request was to turn everything
eligible from both into real cases, at scale, each with sources found
independently of the seed books and footnoted per the established
inline-citation convention (`[1]`, `[2]`, tied to that case's own
`sources` array).

The 239 entries flagged `notableForFullCase: true` in the 1001-inventions
file were split into 5 waves of 48 (`case-batch-{1-5}.json`), each wave
further split into 6 chunks of 8 (`wave{N}-agent{1-6}.json`) for 6
parallel research subagents. Each agent independently researched its 8
entries (2-3 web searches per entry against real, credible, publicly
accessible sources: Wikipedia, museum and institutional pages, Britannica,
academic and government sources), wrote full `Case` objects matching
`types/case.ts`, and wrote its output to an independent scratchpad file.
After each wave, the 6 files were merged and run through an automated
validation script checking: JSON validity, id uniqueness against every
previously-built case, required-field completeness, enum validity,
adjustment-map stage order and count, footnote-marker-to-source-index
validity, and house-style compliance (no em dashes, no "not X but Y"
constructions, no banned marketing buzzwords used in their hype sense).
Violations were fixed with targeted string replacement and re-validated
before merging into `data/cases.ts`, followed by `tsc --noEmit`, `eslint`,
and `next build` after every wave.

After the 5 waves closed out the 1001-inventions list, Haven's 100-title
list got a one-time manual triage rather than the wave treatment, because
most of it is pure scientific-discovery content (quarks, black holes, the
uncertainty principle, and similar) with no documentable
arrival-into-society adoption or resistance story distinct from the
discovery itself, which the project's own eligibility rule excludes. Six
titles (Vaccinations, Germ Theory, X-Rays, Radio Waves, Blood Types, Blood
Plasma) were excluded as duplicates of cases already built from the other
seed file or the original six. Ten titles across 9 cases (Antibiotics and
Penicillin were merged into one case) had genuine, well-documented
institutional resistance and were built: heliocentrism/Galileo, Vesalius's
anatomy, Darwin's evolution, Wegener's continental drift, vitamins and
food fortification, insulin, penicillin, radioactivity (Curie through the
Radium Girls), and the Human Genome Project/gene-patenting fight. The
remaining 84 titles are marked `excluded-thin-social-narrative` in
`data/haven-seed-candidates.json`, with the reasoning recorded inline on
each entry rather than only here.

Two rate-limit incidents occurred during this pass (Wave 2 and Wave 4),
both affecting all 6 parallel agents in a wave simultaneously. In both
cases, checking the scratchpad before relaunching found that most agents
had actually completed their research and written valid output before
failing on the final report-back call; only the genuinely incomplete
agents were relaunched. This is now the standard first move on any
rate-limit failure in this kind of pipeline, ahead of relaunching
everything from scratch.

House-style notes worth keeping in mind for future cases: words like
"harness," "revolutionary," "landscape," "disrupt," "leverage," and
"navigate" are only banned in their marketing/hype sense. A literal
physical harness, "revolutionary France," a ship that "navigated" a
strait, or a word inside a direct historical quotation are all fine and
were kept as-is across the built cases rather than being reflexively
flagged.

## A note on project history

This project went through an earlier phase organized around a different
question, warnings and institutional decisions under uncertainty, with a
larger set of cases spanning ancient Greece through 2020, and an
original-research framing around "productive friction" in information
systems. That framing has been fully replaced. The project is now
organized around a narrower question: what happens after a society
acquires a new way of seeing, healing, communicating, measuring, making,
or organizing life, before it has learned how to live with it. The case
set, the taxonomy, the case detail page structure, and the data model
were all rebuilt to match. The friction framework was dropped entirely,
since it no longer fit the new case structure; if a future pass wants it
back, note that the fully-cited version (crediting Sunstein, Munger, and
the relevant npj Complexity papers) is recoverable from git history
rather than needing to be rebuilt from scratch.

## What is in the current case set

257 cases in `data/cases.ts` as of this pass:

- **6 original hand-written cases** (the founding set, described below).
- **242 cases** built from the 1001-inventions seed list: 239 from every
  `notableForFullCase: true` entry, across 5 waves of parallel research
  agents, plus 3 more (the water frame, spinning mule, and power loom)
  added by hand afterward. All three had been marked
  `notableForFullCase: false` by the original automated extraction pass
  despite being foundational Industrial Revolution cases with rich,
  well-documented adoption and resistance narratives, a reminder that the
  automated flag is a starting filter, not a final word; see
  `data/1001-inventions-seed-candidates.json` for other entries the
  automated pass may have under-flagged the same way.
- **9 cases** built from a manually triaged subset of
  `data/haven-seed-candidates.json` (10 titles, 2 merged into 1 case).

All 257 cases follow the same nine-section structure and the six-stage
Social Adjustment Map. Every case has 2-4 real sources with working URLs.
Every case's `researchStatus` is `"research-backed-sources-linked"`: the
248 cases built during the mass-production pass started at either
`"prototype-verification-in-progress"` or (for a handful with genuinely
thin adoption/resistance narratives) `"interpretive-framing-under-development"`,
and were upgraded once every source URL across the archive was checked
(directly, or via search where a site's bot protection blocked a direct
fetch) and confirmed real; any narrative-thinness caveat from that
earlier status still lives in the case's own `uncertaintyNotes` field
even though the status label no longer shows it. A case's `aiQuestion`
module (a compact "structural comparison to AI" box) was part of the
schema through the mass-production pass but was removed afterward,
schema and all, in favor of keeping the project's connection to present
AI and digital-technology questions implicit rather than spelled out
case by case; see the methodology page's "Why this focus" section.
Category and geographic balance is much better than the original
six-case set, but still skews Western and toward
`ways-of-making-and-moving`, reflecting the source books' own emphasis;
see "Suggested next development tasks."

The original six founding cases:

1. **Print, vernacular scripture, and Reformation publics** (1517–1534)
   — Ways of communicating.
2. **Smallpox inoculation and vaccination** (1721–1853) — Ways of
   healing.
3. **Germ theory, antisepsis, and hospital practice** (1847–1870s) —
   Ways of healing. Used as the style model for every subsequent case.
4. **The telegraph and synchronized public life** (1844–1870s) — Ways of
   communicating.
5. **The oral contraceptive pill and intimate life** (1960–1968) — Ways
   of healing.
6. **The internet and the collapse of editorial scarcity** (1994–2008)
   — Ways of communicating.

## Content that needs deeper verification

The sources for every case in the archive are real secondary accounts
(encyclopedia entries, museum and history-organization pages, government
and institutional pages, narrative medical/science reviews), not full
archival studies. Each case's own `caution` and `uncertaintyNotes` fields
carry the case-specific caveats; below are the notes for the original six
founding cases only. For the 248 cases added in the mass-production pass,
trust those two fields on the case itself over anything summarized here.

1. **Print and Reformation publics** — well sourced on Luther's
   translation and its sales. The pamphlet circulation estimate (six to
   seven million copies in the first decade) is a historical estimate,
   not a complete count, and is flagged as such in the case's `caution`
   field.
2. **Smallpox inoculation and vaccination** — well sourced on Montagu,
   Jenner, and the 1853 Act. The scale of organized public resistance
   before and after 1853 is described in general terms.
3. **Germ theory, antisepsis, hospital practice** — well sourced on
   Semmelweis's data and the Pasteur/Lister sequence. The exact mix of
   motives behind his colleagues' rejection is genuinely debated by
   historians.
4. **The telegraph** — well sourced on the 1844 opening and its effect
   on markets and news, including Tom Standage's widely cited history.
   Claims about specific newsroom or trading-house practices are general.
5. **The oral contraceptive pill** — well sourced on FDA approval and
   the 1968 papal declaration, using FDA's own historical materials.
   Causal claims connecting the pill to feminist and workforce outcomes
   are contested among historians and treated here as one factor among
   several, not a single cause.
6. **The internet and editorial scarcity** — the most contemporary case
   in the set, and the one whose longer-term consequences are least
   settled. Well sourced on the Drudge Report, early blogging platforms,
   and Shirky's argument; the claim about declining trust in online
   information draws on survey research cited by secondary sources
   rather than one authoritative study.

## Suggested next development tasks

- Both seed files have had every `notableForFullCase: true` /
  `candidateStatus` entry either built or excluded with a reason. What
  they have not had is a full manual re-review of every entry the
  automated extraction pass marked *not* notable: the water frame,
  spinning mule, and power loom all sat there with `notableForFullCase:
  false` despite being some of the richest Industrial Revolution cases
  in the whole archive, found only because someone thought to double
  check a specific gap (textile mills and the factory system) rather
  than trusting the flag. The 1001-inventions file in particular is
  large enough (1,001 entries, only 239 flagged notable) that it is
  worth spot-checking by topic area for other gaps like this one before
  treating the seed files as fully mined.
- Geographic and cultural balance is still a real gap. Both source books
  lean Western/Anglo-American, and the mass-production pass inherited
  that bias rather than correcting it. A deliberate push to find and
  research non-Western cases (e.g. printing and papermaking's path
  through the Islamic world before Europe, agricultural and medical
  innovations from South and East Asian history, etc.) would do more for
  the project's balance than adding more cases from the existing seed
  pool would.
- Source-link verification is done: every source URL across the archive
  was checked (directly via HTTP request, or via search where a site's
  bot protection blocked a direct fetch) as of this pass, and every case
  is now `"research-backed-sources-linked"`. A newly added case should
  still get the same check before being marked that way.
- Add automated tests around `lib/filters.ts` if the filter logic grows
  more complex, and consider one around the case-schema validation logic
  used during the mass-production pass (currently a one-off script in
  the session scratchpad, not checked into the repo) if more cases get
  added by the same wave-based pattern later.
- Consider persisting Explore page filter state in the URL beyond the
  current one-way deep link from the home page's category cards.
- The globe currently draws an arc only between a case's `primaryLocation`
  and each of its `relatedLocations`. A case with a longer chain of
  places (a technology that moved through three or four cities in
  sequence) would need a small change to `Globe3D.tsx` (a `pathsData`
  layer instead of, or alongside, the current `arcsData` layer) to draw
  a route through more than two points in order.
- **Routes and Networks map is now a 3D WebGL globe** (`react-globe.gl`,
  replacing the earlier `react-simple-maps` flat projection). One real
  accessibility tradeoff worth knowing about: the flat map's markers
  were individually keyboard-focusable SVG circles; the globe's markers
  are Three.js objects on a canvas and are not individually
  tab-reachable the same way. The sidebar's case list is still fully
  keyboard-operable (tab to a case, Enter to select and fly to it) and
  remains the accessible path to every case; a future pass could look at
  whether an `aria-live` announcement on selection change is enough or
  whether the page needs an additional non-canvas way to browse markers.
- Add a real issue-reporting or contribution-intake path (a form, or a
  linked code host with issues enabled). CONTRIBUTING.md currently
  describes a process that assumes one exists.

## Possible future data sources

- Primary Wittenberg printing records and press-run counts, to replace
  the estimated pamphlet circulation figures in the Reformation case.
- Parliamentary debate records around the Vaccination Act 1853, for a
  more precise account of the resistance movement it triggered.
- Semmelweis's original hospital mortality records and contemporary
  medical society correspondence.
- Trading-house and newsroom archives from the 1840s-1850s for a more
  specific account of how the telegraph changed daily practice.
- Oral histories or archival material from Enovid's early clinical
  trials and FDA review process.
- Academic (not survey-only) research on trust in online information
  since the mid-1990s, to replace the general claim in the internet case.
