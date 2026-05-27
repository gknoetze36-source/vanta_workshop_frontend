export function PageSkeleton() {
  return (
    <main className="min-h-screen bg-surface p-6">
      <div className="mx-auto grid max-w-7xl gap-4">
        <div className="h-12 animate-pulse rounded-lg bg-white/10" />
        <div className="grid gap-4 md:grid-cols-4">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-32 animate-pulse rounded-lg bg-white/10" />)}</div>
        <div className="h-96 animate-pulse rounded-lg bg-white/10" />
      </div>
    </main>
  );
}

export function EmptyState({ title, description, action }: { title: string; description: string; action?: React.ReactNode }) {
  return (
    <div className="panel grid place-items-center gap-3 p-8 text-center">
      <div className="grid h-12 w-12 place-items-center rounded-lg bg-white/5 text-cyan">∅</div>
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      <p className="max-w-md text-sm text-muted">{description}</p>
      {action}
    </div>
  );
}
