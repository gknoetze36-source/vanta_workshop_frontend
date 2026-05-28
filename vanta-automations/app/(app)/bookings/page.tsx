import { BookingsPage } from "@/components/bookings-page";

export default async function Page({ searchParams }: { searchParams: Promise<{ created?: string; error?: string }> }) {
  return <BookingsPage searchParams={await searchParams} />;
}
