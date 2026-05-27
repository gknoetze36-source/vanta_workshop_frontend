import { AuthCard, AuthInput, AuthLink, SubmitButton } from "@/components/auth-card";

export default function RegisterPage() {
  return (
    <AuthCard
      title="Create workspace"
      subtitle="Start with workshop operations and expand into automation."
      footer={<>Already registered? <AuthLink href="/login">Sign in</AuthLink></>}
    >
      <div className="space-y-4">
        <AuthInput label="Name" placeholder="Your name" />
        <AuthInput label="Work email" type="email" placeholder="you@company.com" />
        <AuthInput label="Password" type="password" placeholder="Create a password" />
      </div>
      <SubmitButton>Create account</SubmitButton>
    </AuthCard>
  );
}
