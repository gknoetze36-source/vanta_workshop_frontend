import Link from "next/link";
import { AuthCard } from "@/components/auth-card";
import { EmptyState } from "@/components/states";
import { getDashboardData } from "@/lib/data";

export default async function WorkspacePage() {
  const { workspaces } = await getDashboardData();

  return (
    <AuthCard
      title="Choose workspace"
      subtitle="Select the business environment you want to operate."
      footer={<Link href="/login" className="font-medium text-cyan">Use another account</Link>}
    >
      <div className="space-y-3">
        {workspaces.length > 0 ? workspaces.map((workspace) => (
          <Link
            key={workspace.id}
            href="/"
            className="focus-ring block rounded-md border border-line bg-black/20 p-4 transition hover:border-cyan/60"
          >
            <p className="font-medium">{workspace.name}</p>
            <p className="mt-1 text-sm text-muted">{workspace.plan} plan • {workspace.role}</p>
          </Link>
        )) : <EmptyState title="No workspace connected" description="Workspace records will appear after authentication and backend integration." />}
      </div>
    </AuthCard>
  );
}
