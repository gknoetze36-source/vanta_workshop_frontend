"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Brand } from "@/components/brand";
import { SearchBox } from "@/components/ui";
import { navModules, notifications } from "@/lib/data";

type AppShellProps = {
  children: React.ReactNode;
};

const iconMap: Record<string, string> = {
  Overview: "OV",
  "Workshop Jobs": "WJ",
  Customers: "CU",
  Vehicles: "VE",
  Inventory: "IN",
  Bookings: "BK",
  Staff: "ST",
  Automations: "AU",
  "AI Assistant": "AI",
  Reports: "RP",
  Billing: "BI",
  Settings: "SE",
};

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

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

      <div className="xl:pl-72">
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
              <SearchBox placeholder="Search jobs, customers, automations..." />
            </div>
            <div className="ml-auto flex items-center gap-2">
              <button className="focus-ring relative grid size-10 place-items-center rounded-md border border-line bg-panel text-sm text-muted">
                N
                <span className="absolute right-2 top-2 size-2 rounded-full bg-cyan" />
              </button>
              <div className="hidden min-w-44 rounded-md border border-line bg-panel px-3 py-2 sm:block">
                <p className="text-xs text-muted">Workspace</p>
                <p className="truncate text-sm font-medium">VANTA Workshop Pro</p>
              </div>
              <button className="focus-ring grid size-10 place-items-center rounded-md bg-gradient-to-br from-electric to-cyan text-sm font-bold text-black">
                GK
              </button>
            </div>
          </div>
        </header>
        <main className="px-4 py-5 sm:px-6 lg:py-7">{children}</main>
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
        <p className="text-sm font-medium">Smart notifications</p>
        <p className="mt-1 text-xs text-muted">{notifications.length} operational alerts need review.</p>
        <Link href="/automations" className="mt-3 inline-flex text-xs font-medium text-cyan">
          Open monitor
        </Link>
      </div>
    </div>
  );
}
