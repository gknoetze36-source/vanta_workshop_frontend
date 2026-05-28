import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";
import { API_BASE_URL } from "@/lib/config";

const errorMessages: Record<string, string> = {
  branch_required: "Choose a branch before creating the booking.",
  phone_must_include_region_code: "Phone number must start with a region code, for example +27821234567.",
  service_required: "Enter the service or work required.",
};

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const cookieStore = await cookies();
  const token = cookieStore.get("vanta_session")?.value;
  const redirectUrl = new URL("/bookings", request.url);

  if (!token) {
    redirectUrl.pathname = "/login";
    redirectUrl.searchParams.set("next", "/bookings");
    return NextResponse.redirect(redirectUrl, 303);
  }

  const payload = Object.fromEntries(formData.entries());
  const response = await fetch(`${API_BASE_URL}/api/bookings`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  }).catch(() => null);

  if (!response) {
    redirectUrl.searchParams.set("error", "The backend booking service is not reachable.");
    return NextResponse.redirect(redirectUrl, 303);
  }

  const result = (await response.json().catch(() => null)) as { booking_reference?: string; error?: string } | null;
  if (!response.ok) {
    redirectUrl.searchParams.set("error", errorMessages[result?.error || ""] || result?.error || "Booking could not be created.");
    return NextResponse.redirect(redirectUrl, 303);
  }

  redirectUrl.searchParams.set("created", result?.booking_reference || "booking");
  return NextResponse.redirect(redirectUrl, 303);
}
