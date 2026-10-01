import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import factionsMd from "../../data/intel/factions.md?raw";
import unitsMd from "../../data/intel/units.md?raw";
import weaponsMd from "../../data/intel/weapons.md?raw";
import tipsMd from "../../data/intel/tips.md?raw";
import { Markdown } from "./Markdown";
import { slugify } from "./slugify";

const dossiers = [
  { id: "factions", label: "FACTIONS", source: factionsMd },
  { id: "units", label: "UNITS", source: unitsMd },
  { id: "weapons", label: "WEAPONS", source: weaponsMd },
  { id: "tips", label: "TIPS", source: tipsMd },
] as const;

export function IntelPage() {
  const [params, setParams] = useSearchParams();
  const active = dossiers.find((d) => d.id === params.get("file")) ?? dossiers[0];

  const contents = useMemo(
    () =>
      active.source
        .split("\n")
        .filter((l) => /^##\s/.test(l))
        .map((l) => l.replace(/^##\s+/, "").replace(/[*`]/g, "").trim()),
    [active]
  );

  return (
    <div className="px-4 py-4 max-w-3xl mx-auto">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[10px] font-mono text-text-muted">INTEL // FIELD DOSSIERS</span>
      </div>

      <div className="flex gap-1 mb-4 overflow-x-auto">
        {dossiers.map((d) => (
          <button
            key={d.id}
            onClick={() => {
              setParams({ file: d.id });
              window.scrollTo({ top: 0 });
            }}
            className={`px-3 py-1.5 text-xs font-stencil tracking-wider rounded whitespace-nowrap transition-colors ${
              active.id === d.id
                ? "bg-amber/20 text-amber-light border border-amber-dim"
                : "text-text-muted hover:text-text-secondary border border-transparent"
            }`}
          >
            {d.label}
          </button>
        ))}
      </div>

      <div className="mb-4 border border-amber-dim/60 bg-amber/10 rounded px-3 py-2 text-xs text-text-secondary leading-relaxed">
        <span className="font-stencil tracking-wider text-amber-light">SOURCE NOTE // </span>
        Stats come from this app's data. Official material was checked against search summaries of
        blkoutgame.com and the BLKOUT wiki, not full pages. Tags show provenance:{" "}
        <span className="font-mono text-text-primary">[repo]</span>,{" "}
        <span className="font-mono text-text-primary">[web]</span>,{" "}
        <span className="font-mono text-text-primary">[inferred]</span> (tactical opinion). Where
        sources disagree, the conflict is flagged: check the current rulebook before relying on it.
      </div>

      {contents.length > 2 && (
        <details className="mb-4 bg-bg-card border border-border rounded">
          <summary className="px-3 py-2 text-xs font-stencil tracking-wider text-text-secondary cursor-pointer">
            CONTENTS ({contents.length})
          </summary>
          <ul className="px-3 pb-3 space-y-1">
            {contents.map((c) => (
              <li key={c}>
                <button
                  onClick={() => document.getElementById(slugify(c))?.scrollIntoView({ behavior: "smooth" })}
                  className="text-left text-xs text-teal-light hover:text-amber-light"
                >
                  {c}
                </button>
              </li>
            ))}
          </ul>
        </details>
      )}

      <article>
        <Markdown source={active.source} />
      </article>
    </div>
  );
}
