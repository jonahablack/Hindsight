import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Why this project exists and where it is headed.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-10 sm:px-8 sm:py-14">
      <h1 className="font-serif-display text-3xl font-semibold text-ink sm:text-4xl">
        About
      </h1>
      <div className="mt-6 flex flex-col gap-5 leading-relaxed text-ink-muted">
        <p>
          Hindsight is a historical project about the technologies, scientific practices, and medical advances that changed how people lived.
          It traces the impact of new inventions, innovations, and ideas as they begin to permeate civilization.
        </p>
        <p>
          The project focuses on moments when science and technology altered how people communicated, worked, healed, learned, coordinated, and decided what to trust. Its cases range across communication media, scientific instruments, medicine, infrastructure, and digital systems.
          Currently, we derive our case studies from Kendall Haven&apos;s &ldquo;100 Greatest Discoveries of All Time&rdquo; and Jack Challoner&apos;s &ldquo;1001 Inventions That Changed The World&rdquo;, which we have supplemented with additional information from other sources. We are continuously working to expand the project to include more cases and a wider range of historical contexts.
        </p>
      </div>
    </div>
  );
}
