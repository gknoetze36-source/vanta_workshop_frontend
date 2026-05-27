export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-9 w-9 place-items-center rounded-lg border border-cyan/35 bg-cyan/10 text-sm font-bold text-cyan shadow-glow">VA</div>
      {!compact && (
        <div>
          <div className="text-sm font-semibold tracking-wide text-white">VANTA Automations</div>
          <div className="text-xs text-muted">Automate. Communicate. Grow.</div>
        </div>
      )}
    </div>
  );
}
