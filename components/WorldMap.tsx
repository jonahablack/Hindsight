"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import type { Case } from "@/types/case";
import {
  categoryLabels,
  researchStatusLabels,
} from "@/data/taxonomy";
import ResearchStatusBadge from "./ResearchStatusBadge";

const Globe3D = dynamic(() => import("./Globe3D"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[420px] items-center justify-center rounded-sm border border-border bg-paper-raised text-sm text-ink-faint sm:h-[480px]">
      Loading globe…
    </div>
  ),
});

export default function WorldMap({ cases }: { cases: Case[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(cases[0]?.id ?? null);
  const [flyToNonce, setFlyToNonce] = useState(0);

  const selected = cases.find((c) => c.id === selectedId) ?? null;

  function focusCase(c: Case) {
    setSelectedId(c.id);
    setFlyToNonce((n) => n + 1);
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
      <div className="flex flex-col gap-3">
        <Globe3D
          cases={cases}
          selectedId={selectedId}
          onSelect={(id) => setSelectedId(id)}
          flyToNonce={flyToNonce}
        />

        <div className="flex flex-wrap gap-x-5 gap-y-2 rounded-sm border border-border bg-paper-raised px-4 py-3 text-xs text-ink-muted">
          <span className="flex items-center gap-1.5">
            <span aria-hidden className="inline-block h-2.5 w-2.5 rounded-full bg-navy" />
            Point of origin
          </span>
          <span className="flex items-center gap-1.5">
            <span aria-hidden className="inline-block h-2.5 w-2.5 rounded-full bg-accent" />
            Selected case
          </span>
          <span className="flex items-center gap-1.5">
            <span aria-hidden className="inline-block h-2 w-2 rounded-full border-2 border-border-strong bg-paper" />
            Related place
          </span>
          <span className="flex items-center gap-1.5">
            <svg width="18" height="6" aria-hidden>
              <line x1="0" y1="3" x2="18" y2="3" stroke="var(--color-border-strong)" strokeWidth="1" strokeDasharray="3 3" />
            </svg>
            Route of travel
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-xs leading-relaxed text-ink-faint">
          Drag to rotate the globe, scroll or pinch to zoom, and click a
          marker or a case below to select it. This gives a rough sense of
          place. Many cases turn on trust and power more than location, and
          some involve a network of places, not one spot.
        </p>

        <ul aria-label="Cases" className="flex flex-col gap-2">
          {cases.map((c) => (
            <li key={c.id}>
              <button
                type="button"
                onClick={() => focusCase(c)}
                aria-pressed={c.id === selectedId}
                className={`focus-ring w-full rounded-sm border px-3 py-2 text-left text-sm transition-colors ${
                  c.id === selectedId
                    ? "border-accent bg-accent-soft text-accent-strong"
                    : "border-border text-ink-muted hover:border-border-strong hover:text-ink"
                }`}
              >
                {c.title}
              </button>
            </li>
          ))}
        </ul>

        {selected && (
          <div className="fade-in rounded-sm border border-border bg-paper-raised p-4" aria-live="polite">
            <ResearchStatusBadge status={selected.researchStatus} />
            <h3 className="mt-2 font-serif-display text-base font-semibold text-ink">
              {selected.title}
            </h3>
            <p className="mt-1 text-sm text-ink-muted">{selected.geography}</p>
            <dl className="mt-3 space-y-2 text-xs text-ink-muted">
              <div>
                <dt className="font-medium text-ink">Category</dt>
                <dd>{categoryLabels[selected.category]}</dd>
              </div>
              <div>
                <dt className="font-medium text-ink">Research status</dt>
                <dd>{researchStatusLabels[selected.researchStatus]}</dd>
              </div>
            </dl>
            <Link
              href={`/case/${selected.id}`}
              className="focus-ring mt-4 inline-block rounded-sm text-sm font-medium text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
            >
              Read the full case →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
