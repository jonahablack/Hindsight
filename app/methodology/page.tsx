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

      <div className="mt-10 flex flex-col gap-8">
        <section>
          <h2 className="font-serif-display text-lg font-semibold text-ink">
            The question
          </h2>
          <p className="mt-2 leading-relaxed text-ink-muted">
            What happens after a society acquires a new way of seeing,
            healing, communicating, measuring, making, or organizing life,
            before it has learned how to live with it? Each case follows
            one science or technology, from its arrival in an existing
            social world through what had to change around it. It is not
            a timeline of great inventions, and it does not organize
            cases by year, place, or inventor.
          </p>
        </section>

        <section>
          <h2 className="font-serif-display text-lg font-semibold text-ink">
            Categories
          </h2>
          <p className="mt-2 leading-relaxed text-ink-muted">
            Cases are grouped by what kind of new thing arrived, not by
            when or where. A telescope and an X-ray machine, invented
            centuries apart, have more in common here, both changed what
            people could see, than either does with something from the
            same decade in a different category. Each category&apos;s
            guiding question appears on the explore page and on the home
            page&apos;s category cards.
          </p>
        </section>

        <section>
          <h2 className="font-serif-display text-lg font-semibold text-ink">
            What belongs here
          </h2>
          <p className="mt-2 leading-relaxed text-ink-muted">
            A case belongs when a claim, a device, an infrastructure, or
            a system of knowledge entered an established social setting
            and forced people to revise how they understood authority,
            risk, communication, work, or ordinary practice. Purely
            political or biographical episodes do not qualify unless a
            concrete science or technology sits at the center of the
            story. Martin Luther appears here only as part of a case
            about printing and the reading publics it created, not as a
            case about Luther himself. Socrates is not included: his
            trial is a political and religious prosecution, not the
            arrival of a new capability.
          </p>
        </section>

        <section>
          <h2 className="font-serif-display text-lg font-semibold text-ink">
            Two seed lists
          </h2>
          <p className="mt-2 leading-relaxed text-ink-muted">
            Two books serve as practical starting lists of candidate
            cases, not as authoritative sources or this project&apos;s own
            language.
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed text-ink-muted">
            <li>
              Kendall Haven&apos;s{" "}
              <span className="text-ink">100 Greatest Science Discoveries of All Time</span>{" "}
              covers discoveries in a narrow sense, facts found out about
              nature, which usually is not the kind of social arrival
              this project follows. Only a fraction of the list becomes a
              full case. See{" "}
              <span className="text-ink">data/haven-seed-candidates.json</span>.
            </li>
            <li>
              Jack Challoner&apos;s{" "}
              <span className="text-ink">1,001 Inventions That Changed the World</span>{" "}
              covers inventions, and its short chapters often describe
              adoption or resistance directly. About a quarter of its
              entries were flagged as worth a closer look. See{" "}
              <span className="text-ink">data/1001-inventions-seed-candidates.json</span>.
            </li>
          </ul>
          <p className="mt-3 leading-relaxed text-ink-muted">
            Both files will expand and get corrected through real
            scholarly sources over time, not stay fixed to two books.
          </p>
        </section>

        <section>
          <h2 className="font-serif-display text-lg font-semibold text-ink">
            Why this focus
          </h2>
          <p className="mt-2 leading-relaxed text-ink-muted">
            The clearest record of a new capability entering an
            established order, who adopted it, who resisted it, what had
            to change, comes from science and technology. That pattern
            is not unique to any one era. Readers are free to draw their
            own connections to what is arriving now; this project
            describes what happened in each case and leaves that
            connection to the reader.
          </p>
        </section>

        <section>
          <h2 className="font-serif-display text-lg font-semibold text-ink">
            Limits of the record
          </h2>
          <p className="mt-2 leading-relaxed text-ink-muted">
            Historical records are not complete or evenly kept. Whose
            objections got written down, and whose left no record at
            all, is an open question for every case here, not a settled
            one. This project does not assume that adoption equals
            progress or that a historical case hands over a simple
            answer for a present problem. Each case is provisional and
            should be read with attention to its source base.
          </p>
        </section>

        <section id="contribute">
          <h2 className="font-serif-display text-lg font-semibold text-ink">
            Contribute
          </h2>
          <p className="mt-2 leading-relaxed text-ink-muted">
            This project is small and still unfinished. If you know a
            source that should be added, a claim that needs a fix, or a
            case that belongs here, see{" "}
            <span className="font-medium text-ink">CONTRIBUTING.md</span>{" "}
            in the project code.
          </p>
        </section>

        <section>
          <h2 className="font-serif-display text-lg font-semibold text-ink">
            What&apos;s next
          </h2>
          <ul className="mt-2 list-disc space-y-2 pl-5 leading-relaxed text-ink-muted">
            <li>Check each case against scholarly sources, and add primary sources where they exist.</li>
            <li>Add cases from parts of the world this project has not reached yet; the current set leans toward Europe and the United States.</li>
            <li>Build a clearer way to handle facts that sources disagree on.</li>
            <li>Open a public way for readers to send in sources and fixes.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
