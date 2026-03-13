import { useState } from "react";
import specialRulesData from "../../data/specialRules.json";

interface KeywordBadgeProps {
  keyword: string;
}

export function KeywordBadge({ keyword }: KeywordBadgeProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  // Normalize: "AP (2)" -> match against "AP (X)"
  const baseKeyword = keyword.replace(/\(\d+\)/, "(X)").trim();
  const rule = specialRulesData.find(
    (r) => r.name.toLowerCase() === baseKeyword.toLowerCase() ||
           r.name.toLowerCase() === keyword.toLowerCase()
  );

  return (
    <span className="relative inline-block">
      <button
        className="inline-flex items-center px-1.5 py-0.5 text-[11px] font-mono rounded
          bg-teal-dim/30 text-teal-light border border-teal-dim/50
          hover:bg-teal-dim/50 transition-colors cursor-help"
        onClick={() => setShowTooltip(!showTooltip)}
        onBlur={() => setShowTooltip(false)}
      >
        {keyword}
      </button>
      {showTooltip && rule && (
        <div className="absolute z-50 bottom-full left-0 mb-1 w-64 p-2 rounded bg-bg-primary border border-border-light shadow-lg">
          <div className="text-xs font-bold text-amber-light mb-1">{rule.name}</div>
          <div className="text-xs text-text-secondary leading-relaxed">{rule.description}</div>
        </div>
      )}
    </span>
  );
}
