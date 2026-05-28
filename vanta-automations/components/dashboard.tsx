import Link from "next/link";
import { EmptyState } from "@/components/states";
import { Card, MetricCard, StatusPill } from "@/components/ui";
import type { DashboardData } from "@/lib/api";

export function DashboardOverview({ data }: { data: DashboardData }) {
  const { automations, jobs, metrics, notifications, pipeline } = data;

  return (
    <div className="space-y-5">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">
        <Card title="Workshop command center" action="Live">
          <div className="grid gap-3 md:grid-cols-3">
            {pipeline.map((stage) => (
              <Link key={stage.label} href="/jobs" className="rounded-md border border-line bg-black/20 p-3 transition hover:border-cyan/50 hover:bg-cyan/5">
                <p className="text-xs text-muted">{stage.label}</p>
                <p className="mt-2 text-2xl font-semibold">{stage.count}</p>
                <div className="mt-3 h-1.5 rounded-full bg-line">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-electric to-cyan"
                    style={{ width: `${Math.min(stage.count * 12, 100)}%` }}
                  />
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-4 overflow-x-auto rounded-md border border-line">
            <table className="min-w-[760px] w-full text-left text-sm">
              <thead className="bg-black/25 text-xs uppercase text-muted">
                <tr>
                  <th className="px-4 py-3">Job</th>
                  <th className="px-4 py-3">Vehicle</th>
                  <th className="px-4 py-3">Technician</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Invoice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {jobs.length > 0 ? jobs.map((job) => (
                  <tr key={job.id} className="bg-panel/30 transition hover:bg-cyan/5">
                    <td className="px-4 py-3 font-medium"><Link href="/jobs" className="hover:text-cyan">{job.title}</Link></td>
                    <td className="px-4 py-3 text-muted">{job.vehicle}</td>
                    <td className="px-4 py-3 text-muted">{job.technician}</td>
                    <td className="px-4 py-3"><StatusPill status={job.status} /></td>
                    <td className="px-4 py-3 text-muted">{job.invoiceState}</td>
                  </tr>
                )) : (
                  <tr>
                    <td className="px-4 py-6 text-muted" colSpan={5}>No live workshop jobs are connected yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title="AI assistant" action="Ready">
          <Link href="/assistant" className="block rounded-md border border-cyan/20 bg-cyan/5 p-4 transition hover:border-cyan/60">
            <p className="text-sm font-medium">Recommended next action</p>
            <p className="mt-2 text-sm text-muted">
              Recommendations will appear when assistant insights are available for the current workspace.
            </p>
          </Link>
          <div className="mt-4 space-y-3">
            {notifications.length > 0 ? notifications.map((item) => (
              <Link key={item.id} href="/automations" className="block rounded-md border border-line bg-black/20 p-3 transition hover:border-cyan/50">
                <p className="text-sm font-medium">{item.title}</p>
                <p className="mt-1 text-xs text-muted">{item.message}</p>
              </Link>
            )) : <EmptyState title="No live notifications" description="Operational alerts will appear when there is activity for this workspace." />}
          </div>
        </Card>
      </section>

      <section className="grid gap-5 xl:grid-cols-3">
        <Card title="Automation monitor">
          <div className="space-y-3">
            {automations.length > 0 ? automations.map((automation) => (
              <Link key={automation.id} href="/automations" className="flex items-center justify-between rounded-md border border-line bg-black/20 p-3 transition hover:border-cyan/50">
                <div>
                  <p className="text-sm font-medium">{automation.name}</p>
                  <p className="text-xs text-muted">{automation.trigger}</p>
                </div>
                <span className="rounded-full bg-electric/15 px-2.5 py-1 text-xs text-cyan">{automation.runsToday} runs</span>
              </Link>
            )) : <EmptyState title="No automations running" description="Workflow activity will appear here after automations start running." />}
          </div>
        </Card>
        <Card title="Booking calendar">
          <div className="grid grid-cols-5 gap-2 text-center text-xs">
            {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day, index) => (
              <Link key={day} href="/bookings" className="rounded-md border border-line bg-black/20 p-3 transition hover:border-cyan/50">
                <p className="text-muted">{day}</p>
                <p className="mt-2 text-xl font-semibold">0</p>
              </Link>
            ))}
          </div>
          <Link href="/bookings" className="mt-4 block rounded-md border border-line bg-black/20 p-3 text-sm text-muted transition hover:border-cyan/50">
            No dated bookings are scheduled yet.
          </Link>
        </Card>
        <Card title="Inventory signals">
          <EmptyState title="No inventory alerts" description="Stock alerts will show when inventory records need attention." />
        </Card>
      </section>
    </div>
  );
}
