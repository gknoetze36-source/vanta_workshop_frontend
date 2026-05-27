import { AuthCard, AuthInput, AuthLink, SubmitButton } from "@/components/auth-card";

export default function LoginPage() {
  return (
    <AuthCard
      title="Sign in"
      subtitle="Access your workspace command center."
      footer={<>No account? <AuthLink href="/register">Create one</AuthLink></>}
    >
      <div className="space-y-4">
        <AuthInput label="Email" type="email" placeholder="you@company.com" />
        <AuthInput label="Password" type="password" placeholder="••••••••" />
      </div>
      <div className="mt-3 text-right text-sm">
        <AuthLink href="/forgot-password">Forgot password?</AuthLink>
      </div>
      <SubmitButton>Continue</SubmitButton>
    </AuthCard>
  );
}
