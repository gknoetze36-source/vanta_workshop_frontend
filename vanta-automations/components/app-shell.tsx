"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Brand } from "@/components/brand";
import { SearchBox } from "@/components/ui";
import { navModules } from "@/lib/nav";
import type { CurrentUser } from "@/lib/types";

type AppShellProps = {
  children: React.ReactNode;
  user?: CurrentUser;
};

const iconMap: Record<string, string> = {
Dashboard: "DB",
"Bookings & Walk-ins": "BW",
Customers: "CU",
"Service Reminders": "SR",
WhatsApp: "WA",
Reports: "RP",
Settings: "SE",
};

function initialsFor(user?: CurrentUser) {
  const source = user?.full_name || user?.username || "User";
  const parts = source.split(/[.\s_-]+/).filter(Boolean);
  return (parts.length > 1 ? `${parts[0][0]}${parts[1][0]}` : source.slice(0, 2)).toUpperCase();
}

export function AppShell({ children, user }: AppShellProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const workspace = user?.branch_name || user?.franchise_name || "Workspace";
  const onboardingComplete = false;

  
  return (
    <div className="min-h-screen bg-surface text-white">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-line bg-black/30 px-4 py-5 backdrop-blur xl:block">
        <Sidebar pathname={pathname} />
      </aside>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.aside
              className="h-full w-80 border-r border-line bg-surface px-4 py-5"
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              onClick={(event) => event.stopPropagation()}
            >
              <Sidebar pathname={pathname} onNavigate={() => setOpen(false)} />
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="min-h-dvh xl:pl-72">
        <header className="sticky top-0 z-30 border-b border-line bg-surface/82 backdrop-blur-xl">
          <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
            <button
              className="focus-ring grid size-10 place-items-center rounded-md border border-line bg-panel text-sm xl:hidden"
              onClick={() => setOpen(true)}
              aria-label="Open navigation"
            >
              <span className="h-0.5 w-5 bg-white shadow-[0_6px_0_white,0_-6px_0_white]" />
            </button>
            <div className="hidden flex-1 md:block">
              <SearchBox placeholder="Search bookings, customers, reminders..." />
            </div>
            <div className="ml-auto flex items-center gap-2">
              <Link href="/reminders" className="focus-ring relative grid size-10 place-items-center rounded-md border border-line bg-panel text-sm text-muted" aria-label="Open notifications">
                N
                <span className="absolute right-2 top-2 size-2 rounded-full bg-cyan" />
              </Link>
              <Link href="/workspace" className="hidden min-w-44 rounded-md border border-line bg-panel px-3 py-2 transition hover:border-cyan/50 sm:block">
                <p className="text-xs text-muted">Workspace</p>
                <p className="truncate text-sm font-medium">{workspace}</p>
              </Link>
              <form action="/api/logout" method="post" className="flex items-center gap-2">
                <Link href="/settings" className="focus-ring grid size-10 place-items-center rounded-md bg-gradient-to-br from-electric to-cyan text-sm font-bold text-black" aria-label="Open user settings">
                  {initialsFor(user)}
                </Link>
                <button className="focus-ring hidden rounded-md border border-line px-3 py-2 text-sm text-muted hover:text-white sm:block" type="submit">
                  Sign out
                </button>
              </form>
            </div>
          </div>
        </header>
        <main className="min-h-[calc(100dvh-4rem)] px-4 py-5 pb-16 sm:px-6 lg:py-7 lg:pb-20">
          {!onboardingComplete && (
            <div className="mb-6 rounded-md border border-cyan/30 bg-cyan/10 p-4">
            <h3 className="text-sm font-semibold text-cyan">
              Whatsapp Setup Required
            </h3>
            <p className="mt-2 text-sm text-muted">
            Connect your Whatsapp Business account to start receiving bookings,reminders and customer messages
            </p>
            <Link
              href="/whatsapp"
              className="mt-3 inline-flex rounded-md bg-cyan px-4 py-2 text-sm font-medium text-black">
               Start Whatsapp Setup
            </Link> 
            </div>
      )}
          {children}
        </main>
      </div>
    </div> 
);
}

function Sidebar({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <div className="flex h-full flex-col">
      <Brand />
      <nav className="mt-8 space-y-1">
        {navModules.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={`focus-ring flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition ${
                active
                  ? "bg-electric/15 text-white shadow-glow"
                  : "text-muted hover:bg-panel hover:text-white"
              }`}
            >
              <span className={`grid size-7 place-items-center rounded-md border text-[10px] font-bold ${
                active ? "border-cyan/60 bg-cyan/15 text-cyan" : "border-line bg-black/20 text-muted"
              }`}>
                {iconMap[item.label]}
              </span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto rounded-md border border-line bg-panel p-4">
        <p className="text-sm font-medium">Workshop Reminders</p>
        <p className="mt-1 text-xs text-muted">Service follow-ups and customer reminders appear here.</p>
        <Link href="/reminders" className="mt-3 inline-flex text-xs font-medium text-cyan">
          Open monitor
        </Link>
      </div>
    </div>
  );
}
