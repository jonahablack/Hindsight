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
        There are recurring patterns that emerge when new technologies disrupt existing norms. This project aims to shed light on these patterns.
      </p>

      <div className="mt-10 flex flex-col gap-8">
        <section>
          <h2 className="font-serif-display text-lg font-semibold text-ink">
            The question
          </h2>
          <p className="mt-2 leading-relaxed text-ink-muted">
            Each case in our archive follows
            one science or technology, from its arrival in an existing
            social world through what had to change around it. Through these cases, we aim to give a broad account of
            what happens after a society acquires a new capability, and how the innovation is received.
          </p>
        </section>

        <section>
          <h2 className="font-serif-display text-lg font-semibold text-ink">
            Categories
          </h2>
          <p className="mt-2 leading-relaxed text-ink-muted">
            Cases are grouped by what <i>kind</i> of new thing arrived,
            not by when or where. A telescope and an X-ray machine,
            invented centuries apart, both changed what people could
            see. These therefore belong to the <i>ways of seeing</i> category.
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
            risk, communication, work, or ordinary practice. As such, purely
            political or biographical episodes do not qualify unless a
            concrete science or technology sits at the center of the
            story.
          </p>
        </section>

        <section>
          <h2 className="font-serif-display text-lg font-semibold text-ink">
            Two seed lists
          </h2>
          <p className="mt-2 leading-relaxed text-ink-muted">
            Two books serve as starting lists of candidate cases.
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed text-ink-muted">
            <li>
              Kendall Haven&apos;s{" "}
              <span className="text-ink">100 Greatest Science Discoveries of All Time</span>{" "}
              covers discoveries in a narrow sense, facts found out about
              nature. Only a fraction of the list becomes a full case.
              See{" "}
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
        </section>

        <section>
          <h2 className="font-serif-display text-lg font-semibold text-ink">
            Why this focus
          </h2>
          <p className="mt-2 leading-relaxed text-ink-muted">
            The clearest record of a new capability entering an
            established order, who adopted it, who resisted it, what had
            to change, comes from science and technology. Readers are
            free to draw their own connections to what is arriving now.
          </p>
        </section>

        <section id="contribute">
          <h2 className="font-serif-display text-lg font-semibold text-ink">
            Contribute
          </h2>
          <p className="mt-2 leading-relaxed text-ink-muted">
            If you know a source that should be added, a claim that
            needs a fix, or a case that belongs here, see{" "}
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
