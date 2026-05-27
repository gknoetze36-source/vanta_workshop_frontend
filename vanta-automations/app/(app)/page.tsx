import { DashboardOverview } from "@/components/dashboard";
import { getDashboardData } from "@/lib/data";

export default async function OverviewPage() {
  const { navModules: _navModules, ...data } = await getDashboardData();

  return (
    <div className="space-y-5">
      <header>
        <p className="text-sm font-medium text-cyan">Automate. Communicate. Grow.</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">Overview</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Workshop operations, customer communication, automation health, and growth metrics in one command surface.
        </p>
      </header>
      <DashboardOverview data={data} />
    </div>
  );
}
