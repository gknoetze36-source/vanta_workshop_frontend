import { AuthCard, AuthInput, AuthLink, SubmitButton } from "@/components/auth-card";

const errorMessages: Record<string, string> = {
  invalid_credentials: "Invalid username or password.",
  backend_unavailable: "The backend login service is not reachable. Try again after the deployment finishes.",
  missing_token: "Login succeeded but no session token was returned.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams?: Promise<{ error?: string; next?: string }>;
}) {
  const params = await searchParams;
  const error = params?.error ? errorMessages[params.error] ?? "Login failed. Try again." : "";
  const next = params?.next || "/dashboard";

  return (
    <AuthCard
      title="Sign in"
      subtitle="Access your workspace command center."
      footer={<>No account? <AuthLink href="/register">Create one</AuthLink></>}
    >
      <form action={`/api/login?next=${encodeURIComponent(next)}`} method="post">
        <div className="space-y-4">
          <AuthInput label="Username or email" name="username" placeholder="superadmin or you@company.com" />
          <AuthInput label="Password" name="password" type="password" placeholder="Password" />
        </div>
        {error ? (
          <p className="mt-4 rounded-md border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
            {error}
          </p>
        ) : null}
        <p className="mt-4 rounded-md border border-line bg-black/20 p-3 text-xs text-muted">
          This signs in against the Railway backend and unlocks only the data your user role can access.
        </p>
        <div className="mt-3 text-right text-sm">
          <AuthLink href="/forgot-password">Forgot password?</AuthLink>
        </div>
        <SubmitButton>Continue</SubmitButton>
      </form>
    </AuthCard>
  );
}
