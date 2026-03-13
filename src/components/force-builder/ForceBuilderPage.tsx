import { useState } from "react";
import factionsData from "../../data/factions.json";
import unitsData from "../../data/units.json";
import forceCardsData from "../../data/forceCards.json";
import dustersData from "../../data/dusters.json";
import { SectionHeader } from "../shared/SectionHeader";
import { KeywordBadge } from "../shared/KeywordBadge";

type View = "factions" | "roster";

export function ForceBuilderPage() {
  const [view, setView] = useState<View>("factions");
  const [selectedFaction, setSelectedFaction] = useState<string | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);

  const faction = factionsData.find((f) => f.id === selectedFaction);
  const factionUnits = unitsData.filter((u) => u.factionId === selectedFaction);
  const forceCard = forceCardsData.find((fc) => fc.factionId === selectedFaction);

  return (
    <div className="px-4 py-4">
      {/* Sub-tabs */}
      <div className="flex gap-1 mb-4">
        <button
          onClick={() => setView("factions")}
          className={`px-3 py-1.5 text-xs font-stencil tracking-wider rounded transition-colors ${
            view === "factions"
              ? "bg-amber/20 text-amber-light border border-amber-dim"
              : "text-text-muted hover:text-text-secondary border border-transparent"
          }`}
        >
          FACTIONS
        </button>
        <button
          onClick={() => setView("roster")}
          className={`px-3 py-1.5 text-xs font-stencil tracking-wider rounded transition-colors ${
            view === "roster"
              ? "bg-amber/20 text-amber-light border border-amber-dim"
              : "text-text-muted hover:text-text-secondary border border-transparent"
          }`}
        >
          UNIT CARDS
        </button>
      </div>

      {view === "factions" && (
        <FactionList
          selectedFaction={selectedFaction}
          onSelect={(id) => {
            setSelectedFaction(id);
            setSelectedUnit(null);
            setView("roster");
          }}
        />
      )}

      {view === "roster" && faction && (
        <div className="space-y-4">
          {/* Faction header */}
          <div className="border rounded p-3 bg-bg-card" style={{ borderColor: faction.color + "40" }}>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: faction.color }} />
              <h2 className="font-stencil text-sm tracking-wider" style={{ color: faction.color }}>
                {faction.name}
              </h2>
              <span className="text-[10px] font-mono text-text-muted ml-auto">{faction.code}</span>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed">{faction.description}</p>
          </div>

          {/* Force Rule */}
          {forceCard && (
            <div className="border border-amber-dim/30 rounded p-3 bg-amber/5">
              <div className="text-[10px] font-stencil tracking-wider text-amber-dim mb-1">FORCE RULE</div>
              <p className="text-xs text-text-secondary">{forceCard.forceRule}</p>
            </div>
          )}

          {/* Battle Drills */}
          {forceCard && (
            <div>
              <SectionHeader title="BATTLE DRILLS" subtitle={`${forceCard.battleDrills.length} available`} accent="teal" />
              <div className="space-y-2">
                {forceCard.battleDrills.map((drill) => (
                  <div key={drill.name} className="border border-border rounded p-2.5 bg-bg-card">
                    <div className="text-xs font-bold text-teal-light">{drill.name}</div>
                    <p className="text-[11px] text-text-secondary mt-1">{drill.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Armory */}
          {forceCard && (
            <div>
              <SectionHeader title="ARMORY" subtitle="Combat Load equipment" />
              <div className="grid grid-cols-2 gap-2">
                {forceCard.armory.map((item) => (
                  <div key={item.name} className="border border-border rounded p-2 bg-bg-card">
                    <div className="text-[11px] font-bold text-amber-light">{item.name}</div>
                    {item.weapon && (
                      <div className="text-[10px] text-text-muted font-mono mt-0.5">
                        {item.weapon.range}/{item.weapon.damage}
                        <div className="flex flex-wrap gap-0.5 mt-0.5">
                          {item.weapon.keywords.map((kw) => (
                            <KeywordBadge key={kw} keyword={kw} />
                          ))}
                        </div>
                      </div>
                    )}
                    {item.ability && (
                      <p className="text-[10px] text-text-secondary mt-0.5">{item.ability}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Unit list */}
          <SectionHeader title="UNITS" subtitle={`${factionUnits.length} unit types`} />
          <div className="space-y-2">
            {factionUnits.map((unit) => (
              <UnitCard
                key={unit.id}
                unit={unit}
                factionColor={faction.color}
                isExpanded={selectedUnit === unit.id}
                onToggle={() => setSelectedUnit(selectedUnit === unit.id ? null : unit.id)}
              />
            ))}
          </div>

          {/* Dusters */}
          <SectionHeader title="DUSTERS" subtitle="Heavy combat walkers" accent="teal" />
          <div className="space-y-2">
            {dustersData.map((duster) => (
              <DusterCard key={duster.id} duster={duster} />
            ))}
          </div>

          {/* Back button */}
          <button
            onClick={() => { setView("factions"); setSelectedFaction(null); }}
            className="w-full py-2 text-xs font-stencil tracking-wider text-text-muted border border-border rounded hover:text-text-secondary hover:border-border-light transition-colors"
          >
            ← ALL FACTIONS
          </button>
        </div>
      )}

      {view === "roster" && !faction && (
        <div className="text-center py-12 text-text-muted text-sm">
          Select a faction to view units
          <button
            onClick={() => setView("factions")}
            className="block mx-auto mt-3 text-amber-light text-xs font-stencil"
          >
            CHOOSE FACTION →
          </button>
        </div>
      )}
    </div>
  );
}

function FactionList({
  selectedFaction,
  onSelect,
}: {
  selectedFaction: string | null;
  onSelect: (id: string) => void;
}) {
  const byAllegiance: Record<string, typeof factionsData> = {};
  for (const f of factionsData) {
    const key = f.allegiance.charAt(0).toUpperCase() + f.allegiance.slice(1);
    if (!byAllegiance[key]) byAllegiance[key] = [];
    byAllegiance[key].push(f);
  }

  return (
    <div className="space-y-6">
      <SectionHeader title="SELECT FACTION" subtitle="Choose your force" />
      {Object.entries(byAllegiance).map(([allegiance, factions]) => (
        <div key={allegiance}>
          <h3 className="text-[10px] font-stencil tracking-wider text-text-muted mb-2 uppercase">
            {allegiance}
          </h3>
          <div className="space-y-2">
            {factions.map((faction) => {
              const unitCount = unitsData.filter((u) => u.factionId === faction.id).length;
              return (
                <button
                  key={faction.id}
                  onClick={() => onSelect(faction.id)}
                  className={`w-full text-left border rounded p-3 transition-all ${
                    selectedFaction === faction.id
                      ? "border-amber bg-amber/10"
                      : "border-border bg-bg-card hover:border-border-light"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: faction.color }}
                    />
                    <span className="text-sm font-medium text-text-primary">{faction.name}</span>
                    <span className="text-[10px] font-mono text-text-muted ml-auto">
                      {unitCount > 0 ? `${unitCount} units` : "LORE ONLY"}
                    </span>
                  </div>
                  <p className="text-[11px] text-text-secondary mt-1 line-clamp-2 ml-5">{faction.description}</p>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

interface UnitCardProps {
  unit: (typeof unitsData)[number];
  factionColor: string;
  isExpanded: boolean;
  onToggle: () => void;
}

function UnitCard({ unit, factionColor, isExpanded, onToggle }: UnitCardProps) {
  return (
    <div className="border border-border rounded bg-bg-card overflow-hidden">
      <button onClick={onToggle} className="w-full text-left px-3 py-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: factionColor }} />
            <span className="text-sm font-medium text-text-primary">{unit.fullName}</span>
          </div>
          <div className="flex items-center gap-2">
            {unit.isAI && <span className="text-[9px] font-mono px-1 py-0.5 rounded bg-teal-dim/30 text-teal-light">AI</span>}
            {unit.isPowered && <span className="text-[9px] font-mono px-1 py-0.5 rounded bg-red/20 text-red-light">PWR</span>}
            <svg
              className={`w-4 h-4 text-text-muted transition-transform ${isExpanded ? "rotate-180" : ""}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {/* Stat line */}
        <div className="flex gap-3 mt-1.5 ml-3.5">
          <StatPip label="MOV" value={unit.movement} />
          <StatPip label="SKL" value={unit.skill} />
          <StatPip label="ARM" value={unit.armor} />
          <StatPip label="CL" value={unit.combatLoads} />
        </div>
      </button>

      {isExpanded && (
        <div className="px-3 pb-3 border-t border-border space-y-3 pt-2.5">
          {/* Catalog code */}
          <div className="text-[10px] font-mono text-text-muted">{unit.catalogCode}</div>

          {/* Weapons */}
          <div>
            <div className="text-[10px] font-stencil tracking-wider text-text-muted mb-1">WEAPONS</div>
            {unit.weapons.map((w, i) => (
              <div key={i} className="flex items-baseline gap-2 mb-1">
                <span className="text-xs font-medium text-text-primary">{w.name}</span>
                <span className="text-[10px] font-mono text-text-muted">{w.range}/{w.damage}</span>
                <div className="flex gap-0.5 flex-wrap">
                  {w.keywords.map((kw) => (
                    <KeywordBadge key={kw} keyword={kw} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Specialists */}
          {unit.specialists.length > 0 && (
            <div>
              <div className="text-[10px] font-stencil tracking-wider text-text-muted mb-1">SPECIALISTS</div>
              {unit.specialists.map((spec, i) => {
                const s = spec as { slot: number; title: string; weapon?: { name: string; range: string; damage: number; keywords: string[] }; ability?: string };
                return (
                  <div key={i} className="mb-1.5">
                    <div className="text-xs text-teal-light font-medium">
                      Specialist {s.slot}: {s.title}
                    </div>
                    {s.weapon && (
                      <div className="flex items-baseline gap-2 ml-2 mt-0.5">
                        <span className="text-[11px] text-text-primary">{s.weapon.name}</span>
                        <span className="text-[10px] font-mono text-text-muted">
                          {s.weapon.range}/{s.weapon.damage}
                        </span>
                        <div className="flex gap-0.5 flex-wrap">
                          {s.weapon.keywords.map((kw: string) => (
                            <KeywordBadge key={kw} keyword={kw} />
                          ))}
                        </div>
                      </div>
                    )}
                    {s.ability && (
                      <p className="text-[11px] text-text-secondary ml-2 mt-0.5">{s.ability}</p>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Special Rules */}
          {unit.specialRules.length > 0 && (
            <div>
              <div className="text-[10px] font-stencil tracking-wider text-text-muted mb-1">SPECIAL RULES</div>
              <div className="flex flex-wrap gap-1">
                {unit.specialRules.map((sr) => (
                  <KeywordBadge key={sr} keyword={sr} />
                ))}
              </div>
            </div>
          )}

          {/* Unit Ability */}
          {unit.unitAbility && (
            <div className="border-l-2 border-amber-dim pl-2">
              <div className="text-[10px] font-stencil tracking-wider text-amber-dim mb-0.5">UNIT ABILITY</div>
              <p className="text-[11px] text-text-secondary">{unit.unitAbility}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function StatPip({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="text-center">
      <div className="text-[9px] font-stencil tracking-wider text-text-muted">{label}</div>
      <div className="text-xs font-mono font-bold text-text-primary">{value}</div>
    </div>
  );
}

function DusterCard({ duster }: { duster: (typeof dustersData)[number] }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-border rounded bg-bg-card">
      <button onClick={() => setExpanded(!expanded)} className="w-full text-left px-3 py-2.5">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-text-primary">{duster.name}</span>
          <svg
            className={`w-4 h-4 text-text-muted transition-transform ${expanded ? "rotate-180" : ""}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        <div className="flex gap-3 mt-1.5">
          <StatPip label="SKL" value={duster.skill} />
          <StatPip label="MOB" value={duster.mobility} />
          <StatPip label="ARM" value={duster.armor} />
        </div>
      </button>
      {expanded && (
        <div className="px-3 pb-3 border-t border-border pt-2.5 space-y-2">
          {duster.weapons.map((w, i) => (
            <div key={i} className="flex items-baseline gap-2">
              <span className="text-xs font-medium text-text-primary">{w.name}</span>
              <span className="text-[10px] font-mono text-text-muted">{w.range}/{w.damage}</span>
              <div className="flex gap-0.5 flex-wrap">
                {w.keywords.map((kw) => (
                  <KeywordBadge key={kw} keyword={kw} />
                ))}
              </div>
            </div>
          ))}
          {duster.specialRules.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {duster.specialRules.map((sr) => (
                <KeywordBadge key={sr} keyword={sr} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
