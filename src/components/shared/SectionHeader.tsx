interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  accent?: "amber" | "teal";
}

export function SectionHeader({ title, subtitle, accent = "amber" }: SectionHeaderProps) {
  const accentColor = accent === "amber" ? "bg-amber" : "bg-teal";
  const textColor = accent === "amber" ? "text-amber-light" : "text-teal-light";

  return (
    <div className="flex items-center gap-3 mb-4">
      <div className={`w-1 h-6 ${accentColor} rounded-full`} />
      <div>
        <h2 className={`font-stencil text-base tracking-wider ${textColor}`}>
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs text-text-muted mt-0.5">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
