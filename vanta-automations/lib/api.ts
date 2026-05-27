import type { Automation, Metric, Notification, Workspace, WorkshopJob } from "./types";

export type DashboardData = {
  workspaces: Workspace[];
  metrics: Metric[];
  jobs: WorkshopJob[];
  automations: Automation[];
  notifications: Notification[];
  pipeline: { label: string; count: number }[];
};

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ||
  "https://vanta-automation.up.railway.app";

export async function apiGet<T>(path: string): Promise<T | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      cache: "no-store",
      signal: controller.signal,
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as T;
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

export async function apiGetAny<T>(paths: string[]): Promise<T | null> {
  for (const path of paths) {
    const data = await apiGet<T>(path);
    if (data) return data;
  }
  return null;
}

export function asArray<T>(value: unknown): T[] {
  if (Array.isArray(value)) return value as T[];
  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    for (const key of ["data", "results", "items", "rows"]) {
      if (Array.isArray(record[key])) return record[key] as T[];
    }
  }
  return [];
}

export function asDashboardData(value: unknown, fallback: DashboardData): DashboardData {
  if (!value || typeof value !== "object") return fallback;
  const record = value as Partial<DashboardData>;

  return {
    workspaces: asArray<Workspace>(record.workspaces),
    metrics: asArray<Metric>(record.metrics).length ? asArray<Metric>(record.metrics) : fallback.metrics,
    jobs: asArray<WorkshopJob>(record.jobs),
    automations: asArray<Automation>(record.automations),
    notifications: asArray<Notification>(record.notifications),
    pipeline: asArray<{ label: string; count: number }>(record.pipeline).length
      ? asArray<{ label: string; count: number }>(record.pipeline)
      : fallback.pipeline,
  };
}
