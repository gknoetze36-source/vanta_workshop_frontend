import type { Metric } from "@/lib/types";

const toneMap: Record<Metric["tone"], string> = {
  blue: "from-electric/25 to-electric/5 text-electric",
  cyan: "from-cyan/25 to-cyan/5 text-cyan",
  green: "from-emerald-400/25 to-emerald-400/5 text-emerald-300",
  amber: "from-amber-300/25 to-amber-300/5 text-amber-200",
};

export function Card({ title, action, children, className = "" }: { title?: string; action?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <section className={`panel p-4 ${className}`}>
      {(title || action) && (
        <div className="mb-4 flex items-center justify-between gap-3">
          {title && <h2 className="text-sm font-semibold text-white">{title}</h2>}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

export function MetricCard({ metric }: { metric: Metric }) {
  return (
    <div className={`rounded-lg border border-line bg-gradient-to-br p-4 ${toneMap[metric.tone]}`}>
      <div className="text-xs text-muted">{metric.label}</div>
      <div className="mt-3 text-2xl font-semibold text-white">{metric.value}</div>
      <div className="mt-2 text-xs">{metric.delta}</div>
    </div>
  );
}

export function StatusPill({ status, value }: { status?: string; value?: string }) {
  const label = status ?? value ?? "Unknown";
  const live = label === "Live" || label === "Ready";
  return <span className={`rounded-full px-2.5 py-1 text-xs ${live ? "bg-cyan/10 text-cyan" : "bg-white/8 text-slate-300"}`}>{label}</span>;
}

export function SearchBox({ placeholder = "Search jobs, customers, automations" }: { placeholder?: string }) {
  return <input className="focus-ring h-10 w-full rounded-md border border-line bg-white/[0.04] px-3 text-sm text-white placeholder:text-muted md:w-96" placeholder={placeholder} />;
}
