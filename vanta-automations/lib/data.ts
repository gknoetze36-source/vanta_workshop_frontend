import type { Automation, Metric, NavModule, Notification, Workspace, WorkshopJob } from "./types";

export const workspaces: Workspace[] = [
  { id: "demo-motor", name: "Demo Motor Group", plan: "Premium", role: "owner" },
  { id: "riverside", name: "Riverside Workshop", plan: "Growth", role: "manager" },
  { id: "lakeside", name: "Lakeside Branch", plan: "Growth", role: "reception" },
];

export const navModules: NavModule[] = [
  { label: "Overview", href: "/" },
  { label: "Workshop Jobs", href: "/jobs", badge: "18" },
  { label: "Customers", href: "/customers" },
  { label: "Vehicles", href: "/vehicles" },
  { label: "Inventory", href: "/inventory" },
  { label: "Bookings", href: "/bookings" },
  { label: "Staff", href: "/staff" },
  { label: "Automations", href: "/automations", badge: "9" },
  { label: "AI Assistant", href: "/assistant" },
  { label: "Reports", href: "/reports" },
  { label: "Billing", href: "/billing" },
  { label: "Settings", href: "/settings" },
];

export const metrics: Metric[] = [
  { label: "Open jobs", value: "42", delta: "+8 today", tone: "blue" },
  { label: "Bookings", value: "128", delta: "+14%", tone: "cyan" },
  { label: "Automation runs", value: "3.8k", delta: "99.2% success", tone: "green" },
  { label: "Revenue tracked", value: "R286k", delta: "+22%", tone: "amber" },
];

export const jobs: WorkshopJob[] = [
  { id: "JOB-1048", title: "Major service", customer: "Lerato M.", vehicle: "Toyota Hilux", plate: "CA 448 221", technician: "Mika", status: "In Progress", dueAt: "10:30", value: "R4,850", invoiceState: "Draft" },
  { id: "JOB-1049", title: "Diagnostics", customer: "James K.", vehicle: "BMW 320i", plate: "GP 19 WK", technician: "Ava", status: "Waiting Parts", dueAt: "12:00", value: "R1,250", invoiceState: "Pending" },
  { id: "JOB-1050", title: "Brake replacement", customer: "Nadia P.", vehicle: "Ford Ranger", plate: "ND 802 009", technician: "Thabo", status: "Ready", dueAt: "14:15", value: "R3,400", invoiceState: "Sent" },
  { id: "JOB-1051", title: "Walk-in inspection", customer: "Sipho D.", vehicle: "VW Polo", plate: "CY 229 330", technician: "Unassigned", status: "Booked", dueAt: "15:00", value: "R650", invoiceState: "Draft" },
];

export const automations: Automation[] = [
  { id: "AUT-01", name: "Booking confirmation", trigger: "Booking created", runsToday: 921, successRate: 99, status: "Live" },
  { id: "AUT-02", name: "Missed booking recovery", trigger: "No-show detected", runsToday: 178, successRate: 94, status: "Live" },
  { id: "AUT-03", name: "Annual service reminder", trigger: "Service due date", runsToday: 724, successRate: 98, status: "Live" },
  { id: "AUT-04", name: "Parts low stock alert", trigger: "Inventory threshold", runsToday: 43, successRate: 87, status: "Draft" },
];

export const notifications: Notification[] = [
  { id: "NOT-01", title: "3 bookings need confirmation", message: "WhatsApp queue is ready", time: "4m" },
  { id: "NOT-02", title: "Low stock: oil filters", message: "Riverside Branch below threshold", time: "18m" },
  { id: "NOT-03", title: "Invoice batch prepared", message: "12 customer invoices awaiting review", time: "42m" },
];

export const pipeline = [
  { label: "Booked", count: 12 },
  { label: "Checked in", count: 9 },
  { label: "Technician", count: 14 },
  { label: "Quality check", count: 5 },
  { label: "Ready", count: 8 },
];

export async function getDashboardData() {
  return { workspaces, navModules, metrics, jobs, automations, notifications, pipeline };
}
