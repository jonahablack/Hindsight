import { researchStatusLabels } from "@/data/taxonomy";
import type { ResearchStatus } from "@/types/case";

const styles: Record<ResearchStatus, string> = {
  "prototype-verification-in-progress":
    "bg-warn-soft text-warn border-warn/30",
  "research-backed-sources-linked":
    "bg-accent-soft text-accent-strong border-accent/30",
  "interpretive-framing-under-development":
    "bg-paper-raised text-ink-muted border-border-strong",
};

export default function ResearchStatusBadge({
  status,
  className = "",
}: {
  status: ResearchStatus;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-sm border px-2 py-1 text-xs font-medium ${styles[status]} ${className}`}
    >
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-current" />
      {researchStatusLabels[status]}
    </span>
  );
}
