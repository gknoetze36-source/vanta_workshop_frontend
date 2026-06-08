export default function RemindersPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-md border border-line bg-panel p-6">
        <h1 className="text-2xl font-bold">
          Service Reminders
        </h1>

        <p className="mt-2 text-muted">
          Manage follow-ups, service reminders and customer notifications.
        </p>
      </div>

      <div className="rounded-md border border-line bg-panel p-6">
        <h2 className="text-lg font-semibold">
          Upcoming Reminders
        </h2>

        <p className="mt-2 text-muted">
          No reminders scheduled yet.
        </p>
      </div>

      <div className="rounded-md border border-line bg-panel p-6">
        <h2 className="text-lg font-semibold">
          Reminder Statistics
        </h2>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="rounded-md border border-line p-4">
            <p className="text-sm text-muted">Pending</p>
            <p className="mt-2 text-2xl font-bold">0</p>
          </div>

          <div className="rounded-md border border-line p-4">
            <p className="text-sm text-muted">Sent Today</p>
            <p className="mt-2 text-2xl font-bold">0</p>
          </div>

          <div className="rounded-md border border-line p-4">
            <p className="text-sm text-muted">This Month</p>
            <p className="mt-2 text-2xl font-bold">0</p>
          </div>
        </div>
      </div>
    </div>
  );
}