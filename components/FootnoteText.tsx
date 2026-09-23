import { Fragment } from "react";

/**
 * Renders a string that may contain inline citation markers like "...claim.[2]"
 * The number is 1-indexed into that case's `sources` array. Each marker becomes
 * a small superscript link to the matching entry in the Sources section
 * (which must render an element with id={`source-${n}`}).
 */
export default function FootnoteText({ text }: { text: string }) {
  const parts = text.split(/(\[\d+\])/g);
  return (
    <>
      {parts.map((part, i) => {
        const match = part.match(/^\[(\d+)\]$/);
        if (!match) return <Fragment key={i}>{part}</Fragment>;
        const n = match[1];
        return (
          <sup key={i} className="ml-0.5">
            <a
              href={`#source-${n}`}
              className="focus-ring rounded-sm text-accent no-underline hover:underline"
              aria-label={`Footnote ${n}`}
            >
              [{n}]
            </a>
          </sup>
        );
      })}
    </>
  );
}
