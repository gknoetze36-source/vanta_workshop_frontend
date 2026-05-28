export type Role = "owner" | "manager" | "reception" | "technician" | "billing";

export type NavModule = {
  label: string;
  href: string;
  badge?: string;
  roles?: Role[];
};

export type Metric = {
  label: string;
  value: string;
  delta: string;
  tone: "blue" | "cyan" | "green" | "amber";
};

export type JobStatus = "Booked" | "In Progress" | "Waiting Parts" | "Ready" | "Invoiced";

export type WorkshopJob = {
  id: string;
  title: string;
  customer: string;
  vehicle: string;
  plate: string;
  technician: string;
  status: JobStatus;
  dueAt: string;
  value: string;
  invoiceState: "Draft" | "Sent" | "Paid" | "Pending";
};

export type Branch = {
  id: number | string;
  name: string;
  franchise_name?: string;
  location?: string;
};

export type CustomerRecord = {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  branch_name?: string;
  latest_booking?: string;
  work_to_be_done?: string;
  internal_notes?: string;
};

export type Automation = {
  id: string;
  name: string;
  trigger: string;
  runsToday: number;
  successRate: number;
  status: "Live" | "Draft" | "Paused";
};

export type Notification = {
  id: string;
  title: string;
  message: string;
  time: string;
};

export type Workspace = {
  id: string;
  name: string;
  plan: "Basic" | "Growth" | "Premium";
  role: Role;
};

export type CurrentUser = {
  id?: number | string;
  username?: string;
  full_name?: string;
  email?: string;
  role?: string;
  franchise_name?: string;
  branch_name?: string;
};
