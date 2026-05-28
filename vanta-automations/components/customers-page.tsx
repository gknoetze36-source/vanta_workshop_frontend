import { Card } from "@/components/ui";
import { apiGet } from "@/lib/api";
import type { CustomerRecord } from "@/lib/types";

type CustomersResponse = {
  data?: CustomerRecord[];
};

export async function CustomersPage() {
  const response = await apiGet<CustomersResponse>("/api/customers");
  const customers = response?.data || [];

  return (
    <div className="space-y-5">
      <header className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-medium text-cyan">VANTA Automations</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">Customers</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted">
            Customer records with the latest workshop work notes and internal comments from live bookings.
          </p>
        </div>
      </header>

      <Card title="Client list" action={<span className="text-xs text-muted">{customers.length} records</span>}>
        <div className="overflow-x-auto rounded-md border border-line">
          <table className="min-w-[1040px] w-full text-left text-sm">
            <thead className="bg-black/25 text-xs uppercase text-muted">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Branch</th>
                <th className="px-4 py-3">Latest booking</th>
                <th className="px-4 py-3">Work to be done</th>
                <th className="px-4 py-3">Internal comments</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {customers.length ? customers.map((customer) => (
                <tr key={customer.id}>
                  <td className="px-4 py-3 font-medium">{customer.name || "Unknown"}</td>
                  <td className="px-4 py-3 text-muted">{customer.phone || "-"}</td>
                  <td className="px-4 py-3 text-muted">{customer.email || "-"}</td>
                  <td className="px-4 py-3 text-muted">{customer.branch_name || "-"}</td>
                  <td className="px-4 py-3 text-muted">{customer.latest_booking || "-"}</td>
                  <td className="max-w-xs px-4 py-3 text-muted">{customer.work_to_be_done || "-"}</td>
                  <td className="max-w-xs px-4 py-3 text-muted">{customer.internal_notes || "-"}</td>
                </tr>
              )) : (
                <tr>
                  <td className="px-4 py-6 text-muted" colSpan={7}>No customers available for this workspace yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
