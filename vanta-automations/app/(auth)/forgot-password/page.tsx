import { AuthCard, AuthInput, AuthLink, SubmitButton } from "@/components/auth-card";

export default function ForgotPasswordPage() {
  return (
    <AuthCard
      title="Reset password"
      subtitle="Send a secure recovery link to your workspace email."
      footer={<AuthLink href="/login">Back to login</AuthLink>}
    >
      <AuthInput label="Email" name="email" type="email" placeholder="you@company.com" />
      <SubmitButton>Send reset link</SubmitButton>
    </AuthCard>
  );
}
