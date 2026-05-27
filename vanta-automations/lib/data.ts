import type { Automation, Metric, NavModule, Notification, Workspace, WorkshopJob } from "./types";

export const workspaces: Workspace[] = [
];

export const navModules: NavModule[] = [
  { label: "Overview", href: "/" },
  { label: "Workshop Jobs", href: "/jobs" },
  { label: "Customers", href: "/customers" },
  { label: "Vehicles", href: "/vehicles" },
  { label: "Inventory", href: "/inventory" },
  { label: "Bookings", href: "/bookings" },
  { label: "Staff", href: "/staff" },
  { label: "Automations", href: "/automations" },
  { label: "AI Assistant", href: "/assistant" },
  { label: "Reports", href: "/reports" },
  { label: "Billing", href: "/billing" },
  { label: "Settings", href: "/settings" },
];

export const metrics: Metric[] = [
  { label: "Open jobs", value: "-", delta: "Connect backend", tone: "blue" },
  { label: "Bookings", value: "-", delta: "Connect backend", tone: "cyan" },
  { label: "Automation runs", value: "-", delta: "Connect backend", tone: "green" },
  { label: "Revenue tracked", value: "-", delta: "Connect backend", tone: "amber" },
];

export const jobs: WorkshopJob[] = [
];

export const automations: Automation[] = [
];

export const notifications: Notification[] = [
];

export const pipeline = [
  { label: "Booked", count: 0 },
  { label: "Checked in", count: 0 },
  { label: "Technician", count: 0 },
  { label: "Quality check", count: 0 },
  { label: "Ready", count: 0 },
];

export async function getDashboardData() {
  return { workspaces, navModules, metrics, jobs, automations, notifications, pipeline };
}
