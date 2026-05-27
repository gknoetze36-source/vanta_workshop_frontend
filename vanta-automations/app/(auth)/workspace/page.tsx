import Link from "next/link";
import { AuthCard } from "@/components/auth-card";
import { EmptyState } from "@/components/states";

export default function WorkspacePage() {
  return (
    <AuthCard
      title="Choose workspace"
      subtitle="Select the business environment you want to operate."
      footer={<Link href="/login" className="font-medium text-cyan">Use another account</Link>}
    >
      <div className="space-y-3">
        <EmptyState title="Authentication required" description="Workspace records are hidden until a signed-in session is available." />
      </div>
    </AuthCard>
  );
}
