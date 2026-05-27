import { Card, MetricCard, StatusPill } from "@/components/ui";
import { automations, jobs, metrics, notifications, pipeline } from "@/lib/data";

export function DashboardOverview() {
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
              <div key={stage.label} className="rounded-md border border-line bg-black/20 p-3">
                <p className="text-xs text-muted">{stage.label}</p>
                <p className="mt-2 text-2xl font-semibold">{stage.count}</p>
                <div className="mt-3 h-1.5 rounded-full bg-line">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-electric to-cyan"
                    style={{ width: `${Math.min(stage.count * 12, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 overflow-hidden rounded-md border border-line">
            <table className="w-full text-left text-sm">
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
                {jobs.map((job) => (
                  <tr key={job.id} className="bg-panel/30">
                    <td className="px-4 py-3 font-medium">{job.title}</td>
                    <td className="px-4 py-3 text-muted">{job.vehicle}</td>
                    <td className="px-4 py-3 text-muted">{job.technician}</td>
                    <td className="px-4 py-3"><StatusPill status={job.status} /></td>
                    <td className="px-4 py-3 text-muted">{job.invoiceState}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title="AI assistant" action="Ready">
          <div className="rounded-md border border-cyan/20 bg-cyan/5 p-4">
            <p className="text-sm font-medium">Recommended next action</p>
            <p className="mt-2 text-sm text-muted">
              Two jobs are waiting on parts. Notify customers, confirm supplier ETAs, and rebalance technician capacity.
            </p>
          </div>
          <div className="mt-4 space-y-3">
            {notifications.map((item) => (
              <div key={item.id} className="rounded-md border border-line bg-black/20 p-3">
                <p className="text-sm font-medium">{item.title}</p>
                <p className="mt-1 text-xs text-muted">{item.message}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="grid gap-5 xl:grid-cols-3">
        <Card title="Automation monitor">
          <div className="space-y-3">
            {automations.map((automation) => (
              <div key={automation.id} className="flex items-center justify-between rounded-md border border-line bg-black/20 p-3">
                <div>
                  <p className="text-sm font-medium">{automation.name}</p>
                  <p className="text-xs text-muted">{automation.trigger}</p>
                </div>
                <span className="rounded-full bg-electric/15 px-2.5 py-1 text-xs text-cyan">{automation.runsToday} runs</span>
              </div>
            ))}
          </div>
        </Card>
        <Card title="Booking calendar">
          <div className="grid grid-cols-5 gap-2 text-center text-xs">
            {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day, index) => (
              <div key={day} className="rounded-md border border-line bg-black/20 p-3">
                <p className="text-muted">{day}</p>
                <p className="mt-2 text-xl font-semibold">{index + 4}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 rounded-md border border-line bg-black/20 p-3 text-sm text-muted">
            14:00 inspection slot open. Reception can assign to Sipho or queue follow-up.
          </p>
        </Card>
        <Card title="Inventory signals">
          {["Brake pads", "Oil filters", "Battery stock"].map((item, index) => (
            <div key={item} className="mb-3 flex items-center justify-between rounded-md border border-line bg-black/20 p-3 text-sm">
              <span>{item}</span>
              <span className={index === 0 ? "text-cyan" : "text-muted"}>{index === 0 ? "Reorder" : "Stable"}</span>
            </div>
          ))}
        </Card>
      </section>
    </div>
  );
}
