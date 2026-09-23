"use client";

import { useState } from "react";
import { adjustmentStageHelp, adjustmentStageLabels, adjustmentStageOrder } from "@/data/taxonomy";

export default function WhatChangedPathway() {
  const [active, setActive] = useState(adjustmentStageOrder[0]);

  return (
    <div className="rounded-sm border border-border bg-paper-raised p-5">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Stages of a case">
        {adjustmentStageOrder.map((stage, i) => (
          <button
            key={stage}
            type="button"
            role="tab"
            aria-selected={active === stage}
            onClick={() => setActive(stage)}
            className={`focus-ring rounded-sm border px-3 py-1.5 text-xs transition-colors sm:text-sm ${
              active === stage
                ? "border-accent bg-accent-soft text-accent-strong"
                : "border-border-strong text-ink-muted hover:border-accent hover:text-accent-strong"
            }`}
          >
            {i + 1}. {adjustmentStageLabels[stage]}
          </button>
        ))}
      </div>
      <p role="tabpanel" className="mt-4 max-w-xl text-sm leading-relaxed text-ink-muted">
        {adjustmentStageHelp[active]}
      </p>
    </div>
  );
}
