export default function TagPill({
  label,
  variant = "default",
}: {
  label: string;
  variant?: "default" | "accent" | "warn";
}) {
  const variants: Record<string, string> = {
    default: "border-border-strong text-ink-muted",
    accent: "border-accent/40 text-accent-strong",
    warn: "border-warn/40 text-warn",
  };
  return (
    <span
      className={`inline-block rounded-sm border px-2 py-0.5 text-xs leading-5 ${variants[variant]}`}
    >
      {label}
    </span>
  );
}
