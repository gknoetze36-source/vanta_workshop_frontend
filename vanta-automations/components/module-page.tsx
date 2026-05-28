import Link from "next/link";
import { EmptyState } from "@/components/states";
import { Card, StatusPill } from "@/components/ui";
import { automations, getDashboardData, jobs, metrics } from "@/lib/data";

const copy: Record<string, { title: string; description: string }> = {
  jobs: { title: "Workshop Jobs", description: "Track active work, assignments, status, invoices, and customer updates." },
  customers: { title: "Customers", description: "Manage customer profiles, service history, communication preferences, and lifetime value." },
  vehicles: { title: "Vehicles", description: "Monitor vehicle records, service intervals, diagnostics, and job relationships." },
  inventory: { title: "Inventory", description: "Control stock levels, reorder signals, suppliers, and job-linked parts usage." },
  bookings: { title: "Bookings", description: "Coordinate bookings, reception intake, workshop capacity, and technician calendars." },
  staff: { title: "Staff", description: "Plan technicians, roles, permissions, workload, and operational accountability." },
  automations: { title: "Automations", description: "Build workflows for reminders, WhatsApp updates, job events, and follow-up actions." },
  assistant: { title: "AI Assistant", description: "Use operational AI to summarize work, draft messages, and surface bottlenecks." },
  reports: { title: "Reports", description: "Review revenue, job throughput, customer trends, and team performance." },
  billing: { title: "Billing", description: "Manage subscription plans, invoices, usage, and billing configuration." },
  settings: { title: "Settings", description: "Configure workspace details, roles, permissions, notifications, and integrations." },
};

export async function ModulePage({ module }: { module: string }) {
  const page = copy[module] ?? copy.jobs;
  const data = await getDashboardData();
  const liveJobs = data.jobs.length ? data.jobs : jobs;
  const liveAutomations = data.automations.length ? data.automations : automations;
  const liveMetrics = data.metrics.length ? data.metrics : metrics;

  return (
    <div className="space-y-5">
      <header className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-medium text-cyan">VANTA Automations</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">{page.title}</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted">{page.description}</p>
        </div>
        <Link href={module === "automations" ? "/automations" : "/bookings"} className="focus-ring rounded-md bg-white px-4 py-2 text-sm font-semibold text-black">
          New record
        </Link>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        {liveMetrics.slice(0, 3).map((metric) => (
          <Card key={metric.label}>
            <p className="text-xs uppercase text-muted">{metric.label}</p>
            <p className="mt-2 text-2xl font-semibold">{metric.value}</p>
            <p className="mt-1 text-xs text-cyan">{metric.delta}</p>
          </Card>
        ))}
      </section>

      {module === "automations" || module === "assistant" ? <AutomationWorkbench automations={liveAutomations} /> : <OperationsTable jobs={liveJobs} />}
    </div>
  );
}

function OperationsTable({ jobs }: { jobs: typeof import("@/lib/data").jobs }) {
  return (
    <Card title="Operational queue" action="Synced">
      <div className="overflow-x-auto rounded-md border border-line">
        <table className="min-w-[760px] w-full text-left text-sm">
          <thead className="bg-black/25 text-xs uppercase text-muted">
            <tr>
              <th className="px-4 py-3">Record</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Owner</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Due</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {jobs.length > 0 ? jobs.map((job) => (
              <tr key={job.id}>
                <td className="px-4 py-3 font-medium"><Link href="/jobs" className="hover:text-cyan">{job.title}</Link></td>
                <td className="px-4 py-3 text-muted">{job.customer}</td>
                <td className="px-4 py-3 text-muted">{job.technician}</td>
                <td className="px-4 py-3"><StatusPill status={job.status} /></td>
                <td className="px-4 py-3 text-muted">{job.dueAt}</td>
              </tr>
            )) : (
              <tr>
                <td className="px-4 py-6 text-muted" colSpan={5}>No records available for this workspace yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function AutomationWorkbench({ automations }: { automations: typeof import("@/lib/data").automations }) {
  return (
    <section className="grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
      <Card title="Workflow builder" action="Draft">
        {["Trigger", "Condition", "Action"].map((step, index) => (
          <div key={step} className="mb-3 rounded-md border border-line bg-black/20 p-4">
            <p className="text-xs text-muted">Step {index + 1}</p>
            <p className="mt-1 text-sm font-medium">{step}</p>
          </div>
        ))}
      </Card>
      <Card title="Active automations">
        <div className="grid gap-3 md:grid-cols-2">
          {automations.length > 0 ? automations.map((automation) => (
            <div key={automation.id} className="rounded-md border border-line bg-black/20 p-4">
              <p className="font-medium">{automation.name}</p>
              <p className="mt-2 text-sm text-muted">{automation.trigger}</p>
              <p className="mt-4 text-xs text-cyan">{automation.successRate}% success rate</p>
            </div>
          )) : <EmptyState title="No live automations" description="Workflow runs will show here when automations are active." />}
        </div>
      </Card>
    </section>
  );
}
