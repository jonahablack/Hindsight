import type { AdjustmentStep } from "@/types/case";
import { adjustmentStageLabels } from "@/data/taxonomy";

export default function SocialAdjustmentMap({ steps }: { steps: AdjustmentStep[] }) {
  return (
    <ol className="flex flex-col gap-0">
      {steps.map((step, index) => (
        <li key={step.stage} className="relative flex gap-4 pb-8 last:pb-0">
          <div className="flex flex-col items-center">
            <span
              aria-hidden
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent-soft text-xs font-semibold text-accent-strong"
            >
              {index + 1}
            </span>
            {index < steps.length - 1 && (
              <span aria-hidden className="mt-1 flex flex-1 flex-col items-center">
                <span className="w-px flex-1 bg-border-strong" />
                <span className="text-xs leading-none text-border-strong" aria-hidden>
                  ↓
                </span>
              </span>
            )}
          </div>
          <div className="pt-0.5">
            <h3 className="font-serif-display text-base font-semibold text-ink">
              {adjustmentStageLabels[step.stage]}
            </h3>
            <p className="mt-1 max-w-xl text-sm leading-relaxed text-ink-muted">
              {step.summary}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
