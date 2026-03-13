import { useState, useMemo } from "react";
import timelineData from "../../data/lore/timeline.json";
import planetData from "../../data/lore/planet.json";
import factionLoreData from "../../data/lore/factionLore.json";
import killwagerData from "../../data/lore/killwager.json";
import factionsData from "../../data/factions.json";
import { SectionHeader } from "../shared/SectionHeader";

type LoreTab = "timeline" | "factions" | "planet" | "killwager";

export function LorePage() {
  const [activeTab, setActiveTab] = useState<LoreTab>("timeline");

  return (
    <div className="px-4 py-4">
      <div className="flex gap-1 mb-4 overflow-x-auto">
        {(["timeline", "factions", "planet", "killwager"] as LoreTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1.5 text-xs font-stencil tracking-wider rounded whitespace-nowrap transition-colors ${
              activeTab === tab
                ? "bg-amber/20 text-amber-light border border-amber-dim"
                : "text-text-muted hover:text-text-secondary border border-transparent"
            }`}
          >
            {tab === "killwager" ? "KILLWAGER" : tab.toUpperCase()}
          </button>
        ))}
      </div>

      {activeTab === "timeline" && <Timeline />}
      {activeTab === "factions" && <FactionDossiers />}
      {activeTab === "planet" && <PlanetCodex />}
      {activeTab === "killwager" && <KillwagerFeed />}
    </div>
  );
}

function Timeline() {
  const [filter, setFilter] = useState<string>("all");
  const categories = ["all", "earth", "transit", "abol", "war"];

  const filtered = useMemo(
    () => filter === "all" ? timelineData : timelineData.filter((e) => e.category === filter),
    [filter]
  );

  const categoryColors: Record<string, string> = {
    earth: "bg-faction-authority",
    transit: "bg-teal",
    abol: "bg-amber",
    war: "bg-red",
  };

  return (
    <div>
      <SectionHeader title="TIMELINE" subtitle="2022 - 2110 // History of ABOL" />

      <div className="flex gap-1 mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-2 py-1 text-[10px] font-stencil tracking-wider rounded transition-colors ${
              filter === cat
                ? "bg-teal/20 text-teal-light border border-teal-dim"
                : "text-text-muted hover:text-text-secondary border border-transparent"
            }`}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-[19px] top-0 bottom-0 w-px bg-border" />

        <div className="space-y-0">
          {filtered.map((event, idx) => (
            <TimelineEntry key={idx} event={event} color={categoryColors[event.category] || "bg-text-muted"} />
          ))}
        </div>
      </div>
    </div>
  );
}

function TimelineEntry({ event, color }: { event: (typeof timelineData)[number]; color: string }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex gap-3 pb-4 relative">
      {/* Dot */}
      <div className={`w-3 h-3 rounded-full shrink-0 mt-1 ${color} z-10 ring-2 ring-bg-primary`} />

      <div className="flex-1 min-w-0">
        <button onClick={() => setExpanded(!expanded)} className="w-full text-left">
          <div className="flex items-baseline gap-2">
            <span className="text-xs font-mono font-bold text-amber-light">{event.year}</span>
            <span className="text-sm font-medium text-text-primary">{event.title}</span>
          </div>
        </button>
        {expanded && (
          <p className="text-xs text-text-secondary mt-1 leading-relaxed">{event.description}</p>
        )}
      </div>
    </div>
  );
}

function FactionDossiers() {
  const [selectedFaction, setSelectedFaction] = useState<string | null>(null);
  const selected = factionLoreData.find((f) => f.factionId === selectedFaction);
  const factionMeta = factionsData.find((f) => f.id === selectedFaction);

  return (
    <div>
      <SectionHeader title="FACTION DOSSIERS" subtitle="Intelligence files" accent="teal" />

      {!selectedFaction ? (
        <div className="space-y-2">
          {factionsData.map((faction) => {
            const lore = factionLoreData.find((fl) => fl.factionId === faction.id);
            return (
              <button
                key={faction.id}
                onClick={() => setSelectedFaction(faction.id)}
                className="w-full text-left border border-border rounded bg-bg-card p-3 hover:border-border-light transition-colors"
              >
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: faction.color }} />
                  <span className="text-sm font-medium text-text-primary">{faction.name}</span>
                  <span className="text-[10px] font-mono text-text-muted ml-auto uppercase">{faction.allegiance}</span>
                </div>
                {lore && (
                  <p className="text-[11px] text-text-secondary mt-1 ml-5 line-clamp-2">{lore.fullHistory}</p>
                )}
              </button>
            );
          })}
        </div>
      ) : (
        <div className="space-y-4">
          {/* Header */}
          <div className="border rounded p-4 bg-bg-card" style={{ borderColor: (factionMeta?.color || "#888") + "40" }}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: factionMeta?.color }} />
              <h2 className="font-stencil text-base tracking-wider" style={{ color: factionMeta?.color }}>
                {factionMeta?.name}
              </h2>
            </div>
            <div className="text-[10px] font-stencil tracking-wider text-text-muted mb-2 uppercase">
              {factionMeta?.allegiance} // {factionMeta?.code}
            </div>
            <p className="text-xs text-text-secondary leading-relaxed">{factionMeta?.description}</p>
          </div>

          {/* Full History */}
          {selected && (
            <>
              <div>
                <div className="text-[10px] font-stencil tracking-wider text-amber-dim mb-2">CLASSIFIED // FULL DOSSIER</div>
                <p className="text-xs text-text-secondary leading-relaxed">{selected.fullHistory}</p>
              </div>

              {/* Key Figures */}
              {selected.keyFigures.length > 0 && (
                <div>
                  <div className="text-[10px] font-stencil tracking-wider text-text-muted mb-2">KEY FIGURES</div>
                  <div className="space-y-1">
                    {selected.keyFigures.map((figure) => (
                      <div key={figure} className="flex items-center gap-2 px-2 py-1.5 rounded bg-bg-tertiary">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-dim" />
                        <span className="text-xs text-text-primary">{figure}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notable Events */}
              {selected.notableEvents.length > 0 && (
                <div>
                  <div className="text-[10px] font-stencil tracking-wider text-text-muted mb-2">NOTABLE EVENTS</div>
                  <div className="space-y-1">
                    {selected.notableEvents.map((evt) => (
                      <div key={evt} className="flex items-start gap-2 px-2 py-1.5 rounded bg-bg-tertiary">
                        <span className="text-text-muted text-xs shrink-0">›</span>
                        <span className="text-xs text-text-secondary">{evt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          <button
            onClick={() => setSelectedFaction(null)}
            className="w-full py-2 text-xs font-stencil tracking-wider text-text-muted border border-border rounded hover:text-text-secondary hover:border-border-light"
          >
            ← ALL FACTIONS
          </button>
        </div>
      )}
    </div>
  );
}

function PlanetCodex() {
  const [filter, setFilter] = useState<string>("all");
  const categories = ["all", "geography", "settlement", "climate", "flora", "fauna"];

  const filtered = useMemo(
    () => filter === "all" ? planetData : planetData.filter((p) => p.category === filter),
    [filter]
  );

  const categoryIcons: Record<string, string> = {
    geography: "🏔",
    settlement: "🏙",
    climate: "🌪",
    flora: "🌿",
    fauna: "🦎",
  };

  return (
    <div>
      <SectionHeader title="PLANET ABOL" subtitle="Codex entries" />

      <div className="flex gap-1 mb-4 overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-2 py-1 text-[10px] font-stencil tracking-wider rounded whitespace-nowrap transition-colors ${
              filter === cat
                ? "bg-teal/20 text-teal-light border border-teal-dim"
                : "text-text-muted hover:text-text-secondary border border-transparent"
            }`}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map((entry) => (
          <PlanetEntry key={entry.id} entry={entry} icon={categoryIcons[entry.category]} />
        ))}
      </div>
    </div>
  );
}

function PlanetEntry({ entry, icon }: { entry: (typeof planetData)[number]; icon?: string }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-border rounded bg-bg-card">
      <button onClick={() => setExpanded(!expanded)} className="w-full text-left px-3 py-2.5">
        <div className="flex items-center gap-2">
          {icon && <span className="text-sm">{icon}</span>}
          <span className="text-sm font-medium text-text-primary">{entry.name}</span>
          <span className="text-[10px] font-mono text-text-muted ml-auto uppercase">{entry.category}</span>
        </div>
      </button>
      {expanded && (
        <div className="px-3 pb-3 border-t border-border">
          <p className="text-xs text-text-secondary leading-relaxed mt-2">{entry.description}</p>
        </div>
      )}
    </div>
  );
}

function KillwagerFeed() {
  const [visibleCount, setVisibleCount] = useState(5);
  const [entries] = useState(() => {
    // Shuffle entries for variety
    return [...killwagerData].sort(() => Math.random() - 0.5);
  });

  const visible = entries.slice(0, visibleCount);

  return (
    <div>
      <SectionHeader title="KILLWAGER FEED" subtitle="In-universe intelligence ticker" accent="teal" />

      <div className="space-y-2">
        {visible.map((entry) => {
          const factions = entry.factionTags
            .map((tag) => factionsData.find((f) => f.id === tag))
            .filter(Boolean);

          return (
            <div key={entry.id} className="border border-border rounded bg-bg-card p-3 relative overflow-hidden">
              {/* Subtle accent line */}
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-amber-dim/50" />
              <p className="text-xs text-text-secondary leading-relaxed font-mono pl-2">
                {entry.text}
              </p>
              {factions.length > 0 && (
                <div className="flex gap-1 mt-2 pl-2">
                  {factions.map((f) => (
                    <span
                      key={f!.id}
                      className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[9px] font-stencil tracking-wider rounded border"
                      style={{
                        color: f!.color,
                        borderColor: f!.color + "40",
                        backgroundColor: f!.color + "10",
                      }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: f!.color }} />
                      {f!.code}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {visibleCount < entries.length && (
        <button
          onClick={() => setVisibleCount((v) => Math.min(v + 5, entries.length))}
          className="w-full mt-3 py-2 text-xs font-stencil tracking-wider text-text-muted border border-border rounded hover:text-text-secondary hover:border-border-light"
        >
          LOAD MORE INTEL ({entries.length - visibleCount} remaining)
        </button>
      )}
    </div>
  );
}
