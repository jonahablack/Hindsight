import type { Metadata } from "next";
import { getAllCases } from "@/data/cases";
import WorldMap from "@/components/WorldMap";

export const metadata: Metadata = {
  title: "Routes and Networks",
  description: "Where each case originated, traveled, and met resistance or adoption.",
};

export default function MapPage() {
  const cases = getAllCases();

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
      <header className="max-w-2xl">
        <h1 className="font-serif-display text-3xl font-semibold text-ink sm:text-4xl">
          Routes and Networks
        </h1>
        <p className="mt-3 leading-relaxed text-ink-muted">
          This map shows, in a rough way, where each case originated, where
          it traveled, and which places played a part in its adoption or
          its resistance. Geography is a secondary lens here. It does not
          explain why a society accepted or resisted something on its
          own, and several cases involve a network of places and
          institutions that one point on a map cannot fully show.
        </p>
      </header>
      <div className="mt-8">
        <WorldMap cases={cases} />
      </div>
    </div>
  );
}
