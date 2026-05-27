import Link from "next/link";
import { Brand } from "@/components/brand";

type AuthCardProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
};

export function AuthCard({ title, subtitle, children, footer }: AuthCardProps) {
  return (
    <main className="grid min-h-screen place-items-center px-4 py-8">
      <section className="w-full max-w-md rounded-lg border border-line bg-panel/90 p-6 shadow-2xl">
        <Brand compact />
        <div className="mt-7">
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-2 text-sm text-muted">{subtitle}</p>
        </div>
        <div className="mt-6">{children}</div>
        <div className="mt-6 border-t border-line pt-5 text-sm text-muted">{footer}</div>
      </section>
    </main>
  );
}

export function AuthInput({
  label,
  type = "text",
  placeholder,
}: {
  label: string;
  type?: string;
  placeholder: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium uppercase tracking-wide text-muted">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="focus-ring mt-2 w-full rounded-md border border-line bg-black/30 px-3 py-2.5 text-sm outline-none placeholder:text-muted/60"
      />
    </label>
  );
}

export function SubmitButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="focus-ring mt-5 w-full rounded-md bg-gradient-to-r from-electric to-cyan px-4 py-2.5 text-sm font-semibold text-black">
      {children}
    </button>
  );
}

export function AuthLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="font-medium text-cyan hover:text-white">
      {children}
    </Link>
  );
}
