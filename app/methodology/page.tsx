import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Methodology",
  description: "How this project picks, builds, and labels its cases, and what its limits are.",
};

export default function MethodologyPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
      <h1 className="font-serif-display text-3xl font-semibold text-ink sm:text-4xl">
        Methodology
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-ink-muted">
        This project is interested in patterns, not timeless rules.
      </p>

      <div className="mt-10 flex flex-col gap-10">
        <section>
          <h2 className="font-serif-display text-xl font-semibold text-ink">
            The guiding question
          </h2>
          <p className="mt-3 leading-relaxed text-ink-muted">
            What happens after a society acquires a new way of seeing,
            healing, communicating, measuring, making, or organizing life,
            before it has learned how to live with it? This project
            follows one science, technology, medical practice, or system
            of knowledge at a time, from its arrival in an existing social
            world through what had to change around it. It is not a map
            of disasters and warnings, a general policy site, or a
            timeline of great inventions. It does not celebrate
            inventors, and it does not organize cases mainly by year or
            place.
          </p>
        </section>

        <section>
          <h2 className="font-serif-display text-xl font-semibold text-ink">
            The seven categories
          </h2>
          <p className="mt-3 leading-relaxed text-ink-muted">
            Cases are grouped by what kind of new thing arrived: a way of
            seeing, measuring, communicating, healing, making and moving,
            knowing, or organizing society. Each category carries its own
            guiding question, shown on the explore page and on each
            category card on the home page. A telescope and an X-ray
            machine, invented centuries apart, share more in common on
            these terms, both changed what people could see, than either
            does with an invention from the same decade in a different
            category.
          </p>
        </section>

        <section>
          <h2 className="font-serif-display text-xl font-semibold text-ink">
            What belongs in this project
          </h2>
          <p className="mt-3 leading-relaxed text-ink-muted">
            A case belongs here when a scientific claim, medical practice,
            technical device, infrastructure, or knowledge system entered
            an established social setting, and its arrival required
            people to revise how they understood authority, health, risk,
            communication, work, education, family life, or ordinary
            practice. This project stays away from cases that are only
            political or biographical unless a concrete science,
            technology, medicine, or communication system sits at the
            center of the story. Martin Luther appears here only as part
            of a case about printing, vernacular scripture, pamphlet
            circulation, and the reading publics that grew around them,
            not as a case about Luther himself. Socrates is not included
            in this set of cases. His trial is closer to a political and
            religious prosecution than to the arrival of a science,
            technology, or medical practice, and a rigorous case about
            orality, literacy, or the social consequences of writing would
            need real development before it could meet this bar.
          </p>
        </section>

        <section>
          <h2 className="font-serif-display text-xl font-semibold text-ink">
            Starting from two seed lists
          </h2>
          <p className="mt-3 leading-relaxed text-ink-muted">
            This project uses two books as practical starting lists of
            candidate cases, not as authoritative or complete sources, and
            not as this project&apos;s own organizing language.
          </p>
          <p className="mt-3 leading-relaxed text-ink-muted">
            Kendall Haven&apos;s{" "}
            <span className="text-ink">100 Greatest Science Discoveries of All Time</span>{" "}
            covers discoveries in a narrow sense, a fact found out about
            nature, which is usually not the kind of social arrival this
            project follows, so only a fraction of his list will ever
            become a full case here. A preliminary, unreviewed extraction
            of his table of contents lives in{" "}
            <span className="text-ink">data/haven-seed-candidates.json</span>.
          </p>
          <p className="mt-3 leading-relaxed text-ink-muted">
            Jack Challoner&apos;s edited collection{" "}
            <span className="text-ink">1,001 Inventions That Changed the World</span>{" "}
            covers inventions rather than discoveries, and its short
            chapters often describe adoption, resistance, or consequence
            directly, which makes it a closer match for this project&apos;s
            question. A preliminary, unreviewed extraction of all 1,001
            chapters, each read individually rather than taken from a
            title alone, lives in{" "}
            <span className="text-ink">data/1001-inventions-seed-candidates.json</span>.
            About a quarter of its entries are flagged as worth a closer
            look, based on whether the chapter&apos;s own text described a
            concrete episode of adoption, resistance, or consequence, not
            on whether the invention sounds important. Both files will
            expand and get corrected through real scholarly sources over
            time, not stay fixed to two books.
          </p>
        </section>

        <section>
          <h2 className="font-serif-display text-xl font-semibold text-ink">
            Why this focus
          </h2>
          <p className="mt-3 leading-relaxed text-ink-muted">
            This project stays focused on science, technology, medicine,
            and systems of knowledge because that is where the clearest
            record exists of a new capability entering an established
            social order: who adopted it, who resisted it, and what had
            to change before it became ordinary. That pattern is not
            unique to any one era. Readers are free to draw their own
            connections to what is arriving now; this project describes
            what happened in each historical case and leaves that
            connection to the reader rather than arguing it directly.
          </p>
        </section>

        <section>
          <h2 className="font-serif-display text-xl font-semibold text-ink">
            What the historical record leaves out
          </h2>
          <p className="mt-3 leading-relaxed text-ink-muted">
            Historical records are not complete. They were not kept
            evenly, and they were shaped by who had the power to write
            things down, print them, or be believed. Whose early
            objections got written down, whose were ignored and left no
            record, and whose voices are missing from the record at all
            are open questions for every case here, not settled ones.
            Each case is provisional and should be read with attention to
            its source base.
          </p>
        </section>

        <section>
          <h2 className="font-serif-display text-xl font-semibold text-ink">
            Research integrity
          </h2>
          <p className="mt-3 leading-relaxed text-ink-muted">
            This project is interested in what happens after discovery. It
            does not assume that scientific or technical change follows a
            single path, that adoption equals progress, or that historical
            cases provide simple answers for present problems.
          </p>
        </section>

        <section id="contribute">
          <h2 className="font-serif-display text-xl font-semibold text-ink">
            How to suggest a source, a fix, or a new case
          </h2>
          <p className="mt-3 leading-relaxed text-ink-muted">
            This project is small and still unfinished. If you know a
            source that should be added, a claim that needs a fix, or a
            case that belongs here, see{" "}
            <span className="font-medium text-ink">CONTRIBUTING.md</span> in
            the project code. It explains how cases are built and how to
            propose a change.
          </p>
        </section>

        <section>
          <h2 className="font-serif-display text-xl font-semibold text-ink">
            What comes next
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed text-ink-muted">
            <li>Check each case against scholarly sources, and add primary sources where they exist.</li>
            <li>Review the entries flagged notable in data/1001-inventions-seed-candidates.json first, then data/haven-seed-candidates.json, and turn the strongest ones into full cases.</li>
            <li>Add cases from parts of the world this project has not reached yet. The cases here now lean toward Europe and the United States.</li>
            <li>Build a clearer way to handle facts that different sources disagree on.</li>
            <li>Open a public way for readers to send in sources and fixes.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
