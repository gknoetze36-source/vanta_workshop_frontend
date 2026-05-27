import { AuthCard, AuthInput, AuthLink, SubmitButton } from "@/components/auth-card";

export default function LoginPage() {
  return (
    <AuthCard
      title="Sign in"
      subtitle="Access your workspace command center."
      footer={<>No account? <AuthLink href="/register">Create one</AuthLink></>}
    >
      <form action="/api/login" method="post">
        <div className="space-y-4">
          <AuthInput label="Username or email" name="username" placeholder="superadmin or you@company.com" />
          <AuthInput label="Password" name="password" type="password" placeholder="Password" />
        </div>
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
