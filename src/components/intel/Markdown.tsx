import { Fragment, type ReactNode } from "react";
import { slugify } from "./slugify";

// Minimal Markdown renderer for the static intel dossiers: headings, paragraphs,
// lists, tables, blockquotes, rules, and inline bold / italic / code / links.

function renderInline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\)|\*[^*\s][^*]*\*|_[^_\s][^_]*_)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const tok = m[0];
    if (tok.startsWith("**")) {
      out.push(<strong key={key++} className="text-text-primary font-semibold">{renderInline(tok.slice(2, -2))}</strong>);
    } else if (tok.startsWith("`")) {
      out.push(<code key={key++} className="font-mono text-[0.85em] text-teal-light bg-bg-tertiary px-1 rounded">{tok.slice(1, -1)}</code>);
    } else if (tok.startsWith("[")) {
      const lm = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(tok)!;
      out.push(
        <a key={key++} href={lm[2]} target="_blank" rel="noopener noreferrer" className="text-amber-light underline underline-offset-2 break-words">
          {lm[1]}
        </a>
      );
    } else {
      out.push(<em key={key++}>{tok.slice(1, -1)}</em>);
    }
    last = m.index + tok.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

const splitRow = (line: string) =>
  line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => c.trim());

export function Markdown({ source }: { source: string }) {
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  const blocks: ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) { i++; continue; }

    const h = /^(#{1,6})\s+(.*)$/.exec(trimmed);
    if (h) {
      const level = h[1].length;
      const content = renderInline(h[2]);
      const id = slugify(h[2].replace(/[*`]/g, ""));
      if (level === 1) {
        blocks.push(<h2 key={key++} id={id} className="font-stencil text-xl tracking-wider text-amber-light mt-2 mb-3">{content}</h2>);
      } else if (level === 2) {
        blocks.push(
          <h3 key={key++} id={id} className="font-stencil text-lg tracking-wider text-amber-light mt-8 mb-3 pb-1 border-b border-border scroll-mt-16">
            {content}
          </h3>
        );
      } else if (level === 3) {
        blocks.push(<h4 key={key++} id={id} className="font-stencil text-base tracking-wider text-teal-light mt-6 mb-2 scroll-mt-16">{content}</h4>);
      } else {
        blocks.push(<h5 key={key++} id={id} className="font-stencil text-sm tracking-wider text-text-primary mt-4 mb-1.5">{content}</h5>);
      }
      i++;
      continue;
    }

    if (/^(-{3,}|\*{3,}|_{3,})$/.test(trimmed)) {
      blocks.push(<hr key={key++} className="border-border my-6" />);
      i++;
      continue;
    }

    if (trimmed.startsWith("|") && i + 1 < lines.length && /^\s*\|?\s*:?-{2,}/.test(lines[i + 1])) {
      const header = splitRow(trimmed);
      const rows: string[][] = [];
      i += 2;
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        rows.push(splitRow(lines[i]));
        i++;
      }
      blocks.push(
        <div key={key++} className="overflow-x-auto my-3 border border-border rounded">
          <table className="w-full text-xs">
            <thead className="bg-bg-tertiary">
              <tr>
                {header.map((c, j) => (
                  <th key={j} className="text-left font-stencil tracking-wider text-text-secondary px-2 py-1.5 whitespace-nowrap">{renderInline(c)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, ri) => (
                <tr key={ri} className="border-t border-border align-top">
                  {r.map((c, j) => (
                    <td key={j} className="px-2 py-1.5 text-text-secondary">{renderInline(c)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    if (trimmed.startsWith(">")) {
      const quote: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        quote.push(lines[i].trim().replace(/^>\s?/, ""));
        i++;
      }
      blocks.push(
        <blockquote key={key++} className="border-l-2 border-amber-dim bg-bg-card pl-3 pr-2 py-2 my-3 text-sm text-text-secondary italic">
          {renderInline(quote.join(" "))}
        </blockquote>
      );
      continue;
    }

    if (/^\s*([-*+]|\d+\.)\s+/.test(line)) {
      const ordered = /^\s*\d+\./.test(line);
      const items: { depth: number; text: string }[] = [];
      while (i < lines.length && lines[i].trim()) {
        const lm = /^(\s*)([-*+]|\d+\.)\s+(.*)$/.exec(lines[i]);
        if (lm) {
          items.push({ depth: lm[1].length >= 2 ? 1 : 0, text: lm[3] });
        } else if (items.length) {
          items[items.length - 1].text += " " + lines[i].trim();
        }
        i++;
      }
      const ListTag = ordered ? "ol" : "ul";
      blocks.push(
        <ListTag key={key++} className={`my-2 space-y-1 text-sm text-text-secondary ${ordered ? "list-decimal" : "list-disc"} pl-5 marker:text-amber-dim`}>
          {items.map((it, j) => (
            <li key={j} className={it.depth ? "ml-4" : ""}>{renderInline(it.text)}</li>
          ))}
        </ListTag>
      );
      continue;
    }

    const para: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^(#{1,6}\s|>|\||\s*([-*+]|\d+\.)\s+|-{3,}$)/.test(lines[i].trim())
    ) {
      para.push(lines[i].trim());
      i++;
    }
    if (para.length === 0) {
      // Unrecognised line shape; emit it as-is so the loop always advances.
      para.push(lines[i].trim());
      i++;
    }
    blocks.push(
      <p key={key++} className="text-sm leading-relaxed text-text-secondary my-2">
        {para.map((p, j) => (
          <Fragment key={j}>{j > 0 && " "}{renderInline(p)}</Fragment>
        ))}
      </p>
    );
  }

  return <div>{blocks}</div>;
}
