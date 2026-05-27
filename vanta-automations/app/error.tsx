"use client";

import { EmptyState } from "@/components/states";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-surface p-6">
      <EmptyState
        title="Something failed"
        description="The workspace could not be loaded. Retry or check the integration status."
        action={<button onClick={reset} className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-surface">Retry</button>}
      />
    </main>
  );
}
