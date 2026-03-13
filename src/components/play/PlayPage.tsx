import { useState, useCallback } from "react";
import { SectionHeader } from "../shared/SectionHeader";
import burnCardsData from "../../data/burnCards.json";

type PlayTab = "tracker" | "dice" | "burn";

export function PlayPage() {
  const [activeTab, setActiveTab] = useState<PlayTab>("tracker");

  return (
    <div className="px-4 py-4">
      <div className="flex gap-1 mb-4">
        {(["tracker", "dice", "burn"] as PlayTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1.5 text-xs font-stencil tracking-wider rounded transition-colors ${
              activeTab === tab
                ? "bg-amber/20 text-amber-light border border-amber-dim"
                : "text-text-muted hover:text-text-secondary border border-transparent"
            }`}
          >
            {tab === "burn" ? "BURN CARDS" : tab.toUpperCase()}
          </button>
        ))}
      </div>

      {activeTab === "tracker" && <GameTracker />}
      {activeTab === "dice" && <DiceRoller />}
      {activeTab === "burn" && <BurnCards />}
    </div>
  );
}

function GameTracker() {
  const [round, setRound] = useState(1);
  const [phase, setPhase] = useState<"operations" | "execution">("operations");
  const [p1CP, setP1CP] = useState(3);
  const [p2CP, setP2CP] = useState(3);
  const [smokeTokens, setSmokeTokens] = useState<{ id: number; dissOn: number }[]>([]);
  let smokeCounter = smokeTokens.length;

  const advancePhase = () => {
    if (phase === "operations") {
      setPhase("execution");
    } else {
      setPhase("operations");
      setRound((r) => r + 1);
    }
  };

  const addSmoke = (dissipateOn: number) => {
    setSmokeTokens((prev) => [...prev, { id: ++smokeCounter, dissOn: dissipateOn }]);
  };

  const rollSmokeDissipation = () => {
    setSmokeTokens((prev) =>
      prev.filter((s) => {
        const roll = Math.floor(Math.random() * 10) + 1;
        return roll < s.dissOn;
      })
    );
  };

  return (
    <div className="space-y-4">
      {/* Round & Phase */}
      <div className="border border-border rounded bg-bg-card p-4 text-center">
        <div className="text-[10px] font-stencil tracking-wider text-text-muted">ROUND</div>
        <div className="text-4xl font-stencil font-bold text-amber-light my-1">{round}</div>
        <div className={`inline-block px-3 py-1 rounded text-xs font-stencil tracking-wider ${
          phase === "operations"
            ? "bg-teal/20 text-teal-light border border-teal-dim"
            : "bg-red/20 text-red-light border border-red/40"
        }`}>
          {phase.toUpperCase()} PHASE
        </div>
        <div className="flex justify-center gap-2 mt-3">
          <button
            onClick={() => { setRound(1); setPhase("operations"); setP1CP(3); setP2CP(3); setSmokeTokens([]); }}
            className="px-3 py-1.5 text-[10px] font-stencil tracking-wider text-text-muted border border-border rounded hover:border-border-light"
          >
            RESET
          </button>
          <button
            onClick={advancePhase}
            className="px-4 py-1.5 text-[10px] font-stencil tracking-wider text-bg-primary bg-amber-light rounded hover:bg-amber font-bold"
          >
            {phase === "operations" ? "→ EXECUTION" : "→ NEXT ROUND"}
          </button>
        </div>
      </div>

      {/* Control Points */}
      <SectionHeader title="CONTROL POINTS" subtitle="Track CP spending" />
      <div className="grid grid-cols-2 gap-3">
        <CPTracker label="PLAYER 1" cp={p1CP} onChange={setP1CP} />
        <CPTracker label="PLAYER 2" cp={p2CP} onChange={setP2CP} />
      </div>

      {/* Initiative Roller */}
      <SectionHeader title="INITIATIVE" subtitle="Roll off to determine first activation" accent="teal" />
      <InitiativeRoller />

      {/* Smoke Tokens */}
      <SectionHeader title="SMOKE TOKENS" subtitle={`${smokeTokens.length} active`} />
      <div className="border border-border rounded bg-bg-card p-3">
        <div className="flex gap-2 mb-2">
          <button onClick={() => addSmoke(7)} className="px-2 py-1 text-[10px] font-stencil tracking-wider border border-border rounded text-text-secondary hover:border-border-light">
            +SMOKE (7+)
          </button>
          <button onClick={() => addSmoke(10)} className="px-2 py-1 text-[10px] font-stencil tracking-wider border border-border rounded text-text-secondary hover:border-border-light">
            +CHAFF (10+)
          </button>
          {smokeTokens.length > 0 && (
            <button onClick={rollSmokeDissipation} className="px-2 py-1 text-[10px] font-stencil tracking-wider border border-amber-dim rounded text-amber-light hover:bg-amber/10 ml-auto">
              ROLL DISSIPATION
            </button>
          )}
        </div>
        {smokeTokens.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {smokeTokens.map((s) => (
              <span
                key={s.id}
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono cursor-pointer ${
                  s.dissOn >= 10
                    ? "bg-teal-dim/30 text-teal-light border border-teal-dim/50"
                    : "bg-bg-tertiary text-text-secondary border border-border"
                }`}
                onClick={() => setSmokeTokens((prev) => prev.filter((t) => t.id !== s.id))}
                title="Click to remove"
              >
                {s.dissOn >= 10 ? "CHAFF" : "SMOKE"} ({s.dissOn}+) ✕
              </span>
            ))}
          </div>
        ) : (
          <p className="text-[11px] text-text-muted text-center">No smoke on the field</p>
        )}
      </div>
    </div>
  );
}

function CPTracker({ label, cp, onChange }: { label: string; cp: number; onChange: (v: number) => void }) {
  return (
    <div className="border border-border rounded bg-bg-card p-3 text-center">
      <div className="text-[10px] font-stencil tracking-wider text-text-muted mb-1">{label}</div>
      <div className="text-2xl font-mono font-bold text-amber-light">{cp}</div>
      <div className="flex justify-center gap-1 mt-2">
        <button
          onClick={() => onChange(Math.max(0, cp - 1))}
          className="w-8 h-8 rounded border border-border text-text-muted hover:text-red-light hover:border-red/40 text-sm font-bold"
        >
          −
        </button>
        <button
          onClick={() => onChange(cp + 1)}
          className="w-8 h-8 rounded border border-border text-text-muted hover:text-green hover:border-green-dim text-sm font-bold"
        >
          +
        </button>
        <button
          onClick={() => onChange(3)}
          className="w-8 h-8 rounded border border-border text-[9px] font-stencil text-text-muted hover:text-text-secondary"
        >
          RST
        </button>
      </div>
    </div>
  );
}

function InitiativeRoller() {
  const [result, setResult] = useState<{ p1: number[]; p2: number[]; winner: string } | null>(null);

  const roll = () => {
    const p1 = [rollD10(), rollD10()];
    const p2 = [rollD10(), rollD10()];
    const p1Total = Math.max(...p1);
    const p2Total = Math.max(...p2);
    const winner = p1Total > p2Total ? "Player 1" : p2Total > p1Total ? "Player 2" : "Tie - reroll!";
    setResult({ p1, p2, winner });
  };

  return (
    <div className="border border-border rounded bg-bg-card p-3">
      <button
        onClick={roll}
        className="w-full py-2 text-xs font-stencil tracking-wider text-bg-primary bg-teal-light rounded hover:bg-teal font-bold mb-2"
      >
        ROLL INITIATIVE
      </button>
      {result && (
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <div className="text-[10px] font-stencil text-text-muted">P1</div>
            <div className="flex justify-center gap-1">
              {result.p1.map((r, i) => <Die key={i} value={r} />)}
            </div>
          </div>
          <div className="flex items-center justify-center">
            <span className={`text-xs font-stencil tracking-wider ${
              result.winner.startsWith("Tie") ? "text-amber-light" : "text-green"
            }`}>
              {result.winner}
            </span>
          </div>
          <div>
            <div className="text-[10px] font-stencil text-text-muted">P2</div>
            <div className="flex justify-center gap-1">
              {result.p2.map((r, i) => <Die key={i} value={r} />)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DiceRoller() {
  const [numDice, setNumDice] = useState(2);
  const [targetSkill, setTargetSkill] = useState(4);
  const [results, setResults] = useState<number[] | null>(null);

  const roll = useCallback(() => {
    const rolls = Array.from({ length: numDice }, () => rollD10());
    setResults(rolls);
  }, [numDice]);

  const successes = results
    ? results.reduce((acc, r) => {
        if (r === 10) return acc + 2; // Ace
        if (r >= targetSkill) return acc + 1;
        return acc;
      }, 0)
    : 0;

  const aces = results ? results.filter((r) => r === 10).length : 0;

  return (
    <div className="space-y-4">
      <SectionHeader title="DICE ROLLER" subtitle="Skill Check resolution" />

      {/* Controls */}
      <div className="grid grid-cols-2 gap-3">
        <div className="border border-border rounded bg-bg-card p-3">
          <div className="text-[10px] font-stencil tracking-wider text-text-muted mb-2">DICE POOL</div>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setNumDice(Math.max(1, numDice - 1))}
              className="w-8 h-8 rounded border border-border text-text-muted hover:text-text-primary text-lg"
            >
              −
            </button>
            <span className="text-2xl font-mono font-bold text-amber-light w-8 text-center">{numDice}</span>
            <button
              onClick={() => setNumDice(Math.min(10, numDice + 1))}
              className="w-8 h-8 rounded border border-border text-text-muted hover:text-text-primary text-lg"
            >
              +
            </button>
          </div>
        </div>
        <div className="border border-border rounded bg-bg-card p-3">
          <div className="text-[10px] font-stencil tracking-wider text-text-muted mb-2">SKILL TARGET</div>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setTargetSkill(Math.max(2, targetSkill - 1))}
              className="w-8 h-8 rounded border border-border text-text-muted hover:text-text-primary text-lg"
            >
              −
            </button>
            <span className="text-2xl font-mono font-bold text-teal-light w-8 text-center">{targetSkill}+</span>
            <button
              onClick={() => setTargetSkill(Math.min(10, targetSkill + 1))}
              className="w-8 h-8 rounded border border-border text-text-muted hover:text-text-primary text-lg"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Roll Button */}
      <button
        onClick={roll}
        className="w-full py-3 text-sm font-stencil tracking-wider text-bg-primary bg-amber-light rounded hover:bg-amber font-bold"
      >
        ROLL {numDice}D10
      </button>

      {/* Results */}
      {results && (
        <div className="border border-border rounded bg-bg-card p-4">
          <div className="flex flex-wrap justify-center gap-2 mb-3">
            {results.map((r, i) => (
              <Die key={i} value={r} isSuccess={r >= targetSkill} isAce={r === 10} />
            ))}
          </div>
          <div className="flex justify-center gap-6 text-center">
            <div>
              <div className="text-[10px] font-stencil tracking-wider text-text-muted">HITS</div>
              <div className={`text-xl font-mono font-bold ${successes > 0 ? "text-green" : "text-red-light"}`}>
                {successes}
              </div>
            </div>
            {aces > 0 && (
              <div>
                <div className="text-[10px] font-stencil tracking-wider text-text-muted">ACES</div>
                <div className="text-xl font-mono font-bold text-amber-light">{aces}</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Quick Presets */}
      <div>
        <div className="text-[10px] font-stencil tracking-wider text-text-muted mb-2">QUICK PRESETS</div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "1D10 Skill 4+", dice: 1, skill: 4 },
            { label: "2D10 Skill 4+", dice: 2, skill: 4 },
            { label: "3D10 Skill 6+", dice: 3, skill: 6 },
            { label: "1D10 Armor 5+", dice: 1, skill: 5 },
            { label: "2D10 Armor 6+", dice: 2, skill: 6 },
            { label: "1D10 Armor 4+", dice: 1, skill: 4 },
          ].map((preset) => (
            <button
              key={preset.label}
              onClick={() => { setNumDice(preset.dice); setTargetSkill(preset.skill); }}
              className="px-2 py-1.5 text-[10px] font-mono border border-border rounded bg-bg-tertiary text-text-secondary hover:border-border-light hover:text-text-primary transition-colors"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function BurnCards() {
  const [hand, setHand] = useState<string[]>([]);
  const [played, setPlayed] = useState<string[]>([]);

  const drawCard = () => {
    const available = burnCardsData.filter((c) => !hand.includes(c.id) && !played.includes(c.id));
    if (available.length === 0) return;
    const card = available[Math.floor(Math.random() * available.length)];
    setHand((prev) => [...prev, card.id]);
  };

  const playCard = (id: string) => {
    setHand((prev) => prev.filter((c) => c !== id));
    setPlayed((prev) => [...prev, id]);
  };

  const reset = () => {
    setHand([]);
    setPlayed([]);
  };

  return (
    <div className="space-y-4">
      <SectionHeader title="BURN CARDS" subtitle={`${hand.length} in hand / ${played.length} played`} accent="teal" />

      <div className="flex gap-2">
        <button
          onClick={drawCard}
          disabled={hand.length + played.length >= burnCardsData.length}
          className="flex-1 py-2 text-xs font-stencil tracking-wider text-bg-primary bg-teal-light rounded hover:bg-teal font-bold disabled:opacity-40 disabled:cursor-not-allowed"
        >
          DRAW CARD
        </button>
        <button
          onClick={reset}
          className="px-4 py-2 text-xs font-stencil tracking-wider text-text-muted border border-border rounded hover:border-border-light"
        >
          RESET
        </button>
      </div>

      {/* Hand */}
      {hand.length > 0 && (
        <div>
          <div className="text-[10px] font-stencil tracking-wider text-text-muted mb-2">YOUR HAND</div>
          <div className="space-y-2">
            {hand.map((id) => {
              const card = burnCardsData.find((c) => c.id === id)!;
              return (
                <div key={id} className="border border-amber-dim/40 rounded bg-amber/5 p-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-sm font-bold text-amber-light">{card.name}</div>
                      <div className="text-[10px] text-amber-dim mt-0.5">{card.timing}</div>
                    </div>
                    <button
                      onClick={() => playCard(id)}
                      className="px-2 py-1 text-[10px] font-stencil tracking-wider bg-red/20 text-red-light border border-red/30 rounded hover:bg-red/30"
                    >
                      PLAY
                    </button>
                  </div>
                  <p className="text-xs text-text-secondary mt-1.5">{card.effect}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Played */}
      {played.length > 0 && (
        <div>
          <div className="text-[10px] font-stencil tracking-wider text-text-muted mb-2">PLAYED</div>
          <div className="space-y-1">
            {played.map((id) => {
              const card = burnCardsData.find((c) => c.id === id)!;
              return (
                <div key={id} className="flex items-center gap-2 px-2 py-1.5 rounded bg-bg-tertiary opacity-60">
                  <span className="text-xs text-text-muted line-through">{card.name}</span>
                  <span className="text-[10px] text-text-muted ml-auto">BURNED</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* All Cards Reference */}
      <div>
        <SectionHeader title="ALL BURN CARDS" subtitle="Reference" />
        <div className="space-y-2">
          {burnCardsData.map((card) => (
            <div key={card.id} className="border border-border rounded bg-bg-card p-2.5">
              <div className="text-xs font-bold text-text-primary">{card.name}</div>
              <div className="text-[10px] text-text-muted">{card.timing}</div>
              <p className="text-[11px] text-text-secondary mt-1">{card.effect}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Die({ value, isSuccess, isAce }: { value: number; isSuccess?: boolean; isAce?: boolean }) {
  let classes = "w-10 h-10 rounded flex items-center justify-center text-sm font-mono font-bold border ";
  if (isAce) {
    classes += "bg-amber/30 text-amber-light border-amber glow-amber";
  } else if (isSuccess) {
    classes += "bg-green-dim/30 text-green border-green-dim";
  } else if (isSuccess === false) {
    classes += "bg-red/10 text-red-light/60 border-red/20";
  } else {
    classes += "bg-bg-tertiary text-text-primary border-border";
  }

  return <div className={classes}>{value}</div>;
}

function rollD10(): number {
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    const arr = new Uint32Array(1);
    crypto.getRandomValues(arr);
    return (arr[0] % 10) + 1;
  }
  return Math.floor(Math.random() * 10) + 1;
}
