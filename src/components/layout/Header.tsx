export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-bg-primary/90 backdrop-blur-sm border-b border-border">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber animate-pulse" />
          <h1 className="font-stencil text-lg tracking-[0.15em] text-amber-light font-bold">
            BLKOUT
          </h1>
          <span className="text-text-muted text-xs font-mono">//</span>
          <span className="font-stencil text-xs tracking-[0.15em] text-text-secondary">
            COMPANION
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-text-muted">
            ABOL // 2110
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
        </div>
      </div>
    </header>
  );
}
