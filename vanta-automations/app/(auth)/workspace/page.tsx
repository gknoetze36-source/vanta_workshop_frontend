import Link from "next/link";
import { AuthCard } from "@/components/auth-card";
import { workspaces } from "@/lib/data";

export default function WorkspacePage() {
  return (
    <AuthCard
      title="Choose workspace"
      subtitle="Select the business environment you want to operate."
      footer={<Link href="/login" className="font-medium text-cyan">Use another account</Link>}
    >
      <div className="space-y-3">
        {workspaces.map((workspace) => (
          <Link
            key={workspace.id}
            href="/"
            className="focus-ring block rounded-md border border-line bg-black/20 p-4 transition hover:border-cyan/60"
          >
            <p className="font-medium">{workspace.name}</p>
            <p className="mt-1 text-sm text-muted">{workspace.plan} plan • {workspace.role}</p>
          </Link>
        ))}
      </div>
    </AuthCard>
  );
}
