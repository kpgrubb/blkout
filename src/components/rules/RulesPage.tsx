import { useState, useMemo } from "react";
import rulesData from "../../data/rules.json";
import faqData from "../../data/faq.json";
import specialRulesData from "../../data/specialRules.json";
import { SectionHeader } from "../shared/SectionHeader";

type Tab = "rules" | "keywords" | "faq" | "quickref";

export function RulesPage() {
  const [activeTab, setActiveTab] = useState<Tab>("rules");
  const [search, setSearch] = useState("");

  return (
    <div className="px-4 py-4">
      {/* Sub-tabs */}
      <div className="flex gap-1 mb-4 overflow-x-auto">
        {(["rules", "keywords", "faq", "quickref"] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => { setActiveTab(tab); setSearch(""); }}
            className={`px-3 py-1.5 text-xs font-stencil tracking-wider rounded whitespace-nowrap transition-colors ${
              activeTab === tab
                ? "bg-amber/20 text-amber-light border border-amber-dim"
                : "text-text-muted hover:text-text-secondary border border-transparent"
            }`}
          >
            {tab === "quickref" ? "QUICK REF" : tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search rules..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-bg-tertiary border border-border rounded px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-amber-dim"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
          >
            ✕
          </button>
        )}
      </div>

      {activeTab === "rules" && <RulesSections search={search} />}
      {activeTab === "keywords" && <KeywordsReference search={search} />}
      {activeTab === "faq" && <FAQSection search={search} />}
      {activeTab === "quickref" && <QuickReference />}
    </div>
  );
}

function RulesSections({ search }: { search: string }) {
  const filtered = useMemo(() => {
    if (!search) return rulesData;
    const q = search.toLowerCase();
    return rulesData.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.content.toLowerCase().includes(q) ||
        r.keywords.some((k) => k.toLowerCase().includes(q))
    );
  }, [search]);

  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="space-y-2">
      <SectionHeader title="RULEBOOK" subtitle={`${filtered.length} sections`} />
      {filtered.map((rule) => (
        <div key={rule.id} className="border border-border rounded bg-bg-card">
          <button
            onClick={() => toggle(rule.id)}
            className="w-full flex items-center justify-between px-3 py-2.5 text-left"
          >
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-amber-dim">[{rule.number}]</span>
              <span className="text-sm font-medium text-text-primary">{rule.title}</span>
            </div>
            <svg
              className={`w-4 h-4 text-text-muted transition-transform ${expanded.has(rule.id) ? "rotate-180" : ""}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {expanded.has(rule.id) && (
            <div className="px-3 pb-3 border-t border-border">
              <p className="text-sm text-text-secondary leading-relaxed mt-2">{rule.content}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {rule.keywords.map((kw) => (
                  <span key={kw} className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-bg-tertiary text-text-muted border border-border">
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
      {filtered.length === 0 && (
        <p className="text-center text-text-muted text-sm py-8">No rules match "{search}"</p>
      )}
    </div>
  );
}

function KeywordsReference({ search }: { search: string }) {
  const filtered = useMemo(() => {
    if (!search) return specialRulesData;
    const q = search.toLowerCase();
    return specialRulesData.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q)
    );
  }, [search]);

  const weaponKeywords = filtered.filter((r) => r.isWeaponKeyword);
  const unitRules = filtered.filter((r) => !r.isWeaponKeyword);

  return (
    <div className="space-y-6">
      {weaponKeywords.length > 0 && (
        <div>
          <SectionHeader title="WEAPON KEYWORDS" subtitle={`${weaponKeywords.length} keywords`} accent="teal" />
          <div className="space-y-2">
            {weaponKeywords.map((rule) => (
              <div key={rule.id} className="px-3 py-2.5 border border-border rounded bg-bg-card">
                <div className="text-sm font-bold text-teal-light">{rule.name}</div>
                <p className="text-xs text-text-secondary mt-1 leading-relaxed">{rule.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {unitRules.length > 0 && (
        <div>
          <SectionHeader title="UNIT SPECIAL RULES" subtitle={`${unitRules.length} rules`} />
          <div className="space-y-2">
            {unitRules.map((rule) => (
              <div key={rule.id} className="px-3 py-2.5 border border-border rounded bg-bg-card">
                <div className="text-sm font-bold text-amber-light">{rule.name}</div>
                <p className="text-xs text-text-secondary mt-1 leading-relaxed">{rule.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {filtered.length === 0 && (
        <p className="text-center text-text-muted text-sm py-8">No keywords match "{search}"</p>
      )}
    </div>
  );
}

function FAQSection({ search }: { search: string }) {
  const categories = useMemo(() => {
    const q = search.toLowerCase();
    const filtered = search
      ? faqData.filter(
          (f) =>
            f.question.toLowerCase().includes(q) ||
            f.answer.toLowerCase().includes(q) ||
            f.category.toLowerCase().includes(q)
        )
      : faqData;

    const grouped: Record<string, typeof faqData> = {};
    for (const entry of filtered) {
      if (!grouped[entry.category]) grouped[entry.category] = [];
      grouped[entry.category].push(entry);
    }
    return grouped;
  }, [search]);

  return (
    <div className="space-y-6">
      <SectionHeader title="FAQ & ERRATA" subtitle="Common questions answered" />
      {Object.entries(categories).map(([category, entries]) => (
        <div key={category}>
          <h3 className="text-xs font-stencil tracking-wider text-text-muted mb-2 uppercase">{category}</h3>
          <div className="space-y-2">
            {entries.map((entry) => (
              <div key={entry.id} className="px-3 py-2.5 border border-border rounded bg-bg-card">
                <div className="text-sm font-medium text-amber-light">{entry.question}</div>
                <p className="text-xs text-text-secondary mt-1.5 leading-relaxed">{entry.answer}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
      {Object.keys(categories).length === 0 && (
        <p className="text-center text-text-muted text-sm py-8">No FAQ entries match "{search}"</p>
      )}
    </div>
  );
}

function QuickReference() {
  return (
    <div className="space-y-4">
      <SectionHeader title="QUICK REFERENCE" subtitle="Key rules at a glance" accent="teal" />

      <QRCard title="ROUND STRUCTURE" items={[
        "1. OPERATIONS PHASE: Pick up tokens, roll Initiative (2D10, highest wins)",
        "2. EXECUTION PHASE: Alternate activating units (spend 1 CP per activation)",
        "3. END OF ROUND: Check scenario objectives, advance round counter",
      ]} />

      <QRCard title="UNIT ACTIVATION" items={[
        "1. Spend 1 Control Point",
        "2. REPOSITION: Move all models up to Movement value",
        "3. ACTIONS: Each model does ONE: Shoot / Ready / Sprint",
        "4. Place Activation Marker on the unit",
      ]} />

      <QRCard title="SHOOTING" items={[
        "1. Declare target (in range + line of sight)",
        "2. Roll D10 equal to weapon's Shots",
        "3. Hits: Results ≥ shooter's Skill value (10 = Ace = 2 hits)",
        "4. Cover: -1D10 if target is in cover",
        "5. Target rolls Armor Check: D10 ≥ Armor value to save",
        "6. AP (X): Adds X to armor target number",
      ]} />

      <QRCard title="REACTIONS" items={[
        "RETURN FIRE: Shoot back when shot at (simultaneous)",
        "OVERWATCH: Shoot at enemy that moves in LOS (needs Ready token)",
        "JUKE: Move 2\" to dodge (vs Melee or when Return Fire isn't possible)",
        "NOTE: Reacting costs the unit its activation for the round",
      ]} />

      <QRCard title="KEY MODIFIERS" items={[
        "Ace (10): Counts as 2 successes on any Skill Check",
        "Cover: -1D10 to attacker",
        "AP (X): +X to armor target number",
        "Sustained (X): Reroll X successful armor saves",
        "Heavy: +1 Shot if model didn't move",
        "CQB: Reroll failed shots within half range",
      ]} />

      <QRCard title="SMOKE & TOKENS" items={[
        "Smoke: Blocks LOS. Dissipates at round start on 7+",
        "Chaff: Special smoke. Dissipates on 10+",
        "Pinned: Penalty marker from Data Attacks",
        "Ready: Enables Overwatch reactions",
        "Activation: Marks unit as having acted this round",
      ]} />
    </div>
  );
}

function QRCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="border border-border rounded bg-bg-card p-3">
      <h3 className="text-xs font-stencil tracking-wider text-amber-light mb-2">{title}</h3>
      <ul className="space-y-1">
        {items.map((item, i) => (
          <li key={i} className="text-xs text-text-secondary leading-relaxed flex gap-2">
            <span className="text-text-muted shrink-0">›</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
