import type { Automation, Metric, Notification, Workspace, WorkshopJob } from "./types";
import { apiGetAny, asArray, asDashboardData, type DashboardData } from "./api";
import { navModules } from "./nav";

export const workspaces: Workspace[] = [];

export const metrics: Metric[] = [
  { label: "Open jobs", value: "-", delta: "Connect backend", tone: "blue" },
  { label: "Bookings", value: "-", delta: "Connect backend", tone: "cyan" },
  { label: "Automation runs", value: "-", delta: "Connect backend", tone: "green" },
  { label: "Revenue tracked", value: "-", delta: "Connect backend", tone: "amber" },
];

export const jobs: WorkshopJob[] = [];

export const automations: Automation[] = [];

export const notifications: Notification[] = [];

export const pipeline = [
  { label: "Booked", count: 0 },
  { label: "Checked in", count: 0 },
  { label: "Technician", count: 0 },
  { label: "Quality check", count: 0 },
  { label: "Ready", count: 0 },
];

export async function getDashboardData() {
  const fallback: DashboardData = { workspaces, metrics, jobs, automations, notifications, pipeline };
  const data = await apiGetAny<unknown>(["/api/dashboard", "/api/v1/dashboard", "/dashboard"]);
  return { navModules, ...asDashboardData(data, fallback) };
}

export async function getModuleRecords(module: string) {
  const data = await apiGetAny<unknown>([`/api/${module}`, `/api/v1/${module}`, `/${module}`]);
  return asArray<unknown>(data);
}
