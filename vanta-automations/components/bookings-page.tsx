import Link from "next/link";
import { Card, StatusPill } from "@/components/ui";
import { apiGet } from "@/lib/api";
import type { Branch, WorkshopJob } from "@/lib/types";

type SearchParams = {
  created?: string;
  error?: string;
};

type SettingsResponse = {
  branches?: Branch[];
};

type RecordsResponse = {
  data?: WorkshopJob[];
};

const inputClass = "focus-ring mt-1 w-full rounded-md border border-line bg-black/30 px-3 py-2 text-sm outline-none";

export async function BookingsPage({ searchParams }: { searchParams: SearchParams }) {
  const [settings, bookings] = await Promise.all([
    apiGet<SettingsResponse>("/api/settings"),
    apiGet<RecordsResponse>("/api/bookings"),
  ]);
  const branches = settings?.branches || [];
  const records = bookings?.data || [];
  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="space-y-5">
      <header className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-medium text-cyan">VANTA Automations</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">Bookings</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted">Create reception bookings and manage live workshop intake from the connected backend.</p>
        </div>
        <Link href="/" className="focus-ring rounded-md border border-line px-4 py-2 text-sm text-muted hover:text-white">
          Dashboard
        </Link>
      </header>

      {searchParams.created ? (
        <div className="rounded-md border border-cyan/30 bg-cyan/10 px-4 py-3 text-sm text-cyan">Booking {searchParams.created} created.</div>
      ) : null}
      {searchParams.error ? (
        <div className="rounded-md border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{searchParams.error}</div>
      ) : null}

      <section className="grid gap-5 xl:grid-cols-[0.85fr_1.15fr]">
        <Card title="New booking" action={<span className="text-xs text-cyan">Live backend</span>}>
          <form action="/api/bookings" method="post" className="grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm text-muted">
                Branch
                <select name="branch_id" required className={inputClass} defaultValue={branches[0]?.id || ""}>
                  <option value="" disabled>Choose branch</option>
                  {branches.map((branch) => (
                    <option key={branch.id} value={branch.id}>
                      {branch.franchise_name ? `${branch.franchise_name} - ` : ""}{branch.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-sm text-muted">
                Scheduled date
                <input name="scheduled_date" type="date" required defaultValue={today} className={inputClass} />
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm text-muted">
                First name
                <input name="first_name" required className={inputClass} />
              </label>
              <label className="text-sm text-muted">
                Surname
                <input name="surname" className={inputClass} />
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm text-muted">
                Phone
                <input name="phone" required type="tel" placeholder="0821234567 or +27821234567" className={inputClass} />
              </label>
              <label className="text-sm text-muted">
                Email
                <input name="customer_email" type="email" className={inputClass} />
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm text-muted">
                Make
                <input name="make" placeholder="Toyota" className={inputClass} />
              </label>
              <label className="text-sm text-muted">
                Model
                <input name="model" placeholder="Hilux" className={inputClass} />
              </label>
            </div>

            <label className="text-sm text-muted">
              Service or work required
              <input name="service" required placeholder="Major service" className={inputClass} />
            </label>

            <label className="text-sm text-muted">
              Notes
              <textarea name="work_to_be_done" rows={3} className={inputClass} />
            </label>

            <input type="hidden" name="preferred_contact_method" value="WhatsApp" />
            <input type="hidden" name="privacy_consent" value="true" />
            <button className="focus-ring rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-black" type="submit">
              Create booking
            </button>
          </form>
        </Card>

        <Card title="Live bookings" action={<span className="text-xs text-muted">{records.length} records</span>}>
          <div className="overflow-x-auto rounded-md border border-line">
            <table className="min-w-[760px] w-full text-left text-sm">
              <thead className="bg-black/25 text-xs uppercase text-muted">
                <tr>
                  <th className="px-4 py-3">Booking</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Vehicle</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {records.length ? records.map((booking) => (
                  <tr key={booking.id}>
                    <td className="px-4 py-3 font-medium">{booking.title}<div className="text-xs text-muted">{booking.id}</div></td>
                    <td className="px-4 py-3 text-muted">{booking.customer}</td>
                    <td className="px-4 py-3 text-muted">{booking.vehicle}</td>
                    <td className="px-4 py-3"><StatusPill status={booking.status} /></td>
                    <td className="px-4 py-3 text-muted">{booking.dueAt || "-"}</td>
                  </tr>
                )) : (
                  <tr><td className="px-4 py-6 text-muted" colSpan={5}>No bookings available for this workspace yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </section>
    </div>
  );
}
