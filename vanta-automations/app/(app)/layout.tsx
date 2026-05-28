import { AppShell } from "@/components/app-shell";
import { apiGet } from "@/lib/api";
import type { CurrentUser } from "@/lib/types";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const me = await apiGet<{ user: CurrentUser }>("/api/me");
  return <AppShell user={me?.user}>{children}</AppShell>;
}
