import { NextResponse, type NextRequest } from "next/server";
import { API_BASE_URL } from "@/lib/api";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const username = String(formData.get("username") || "").trim();
  const password = String(formData.get("password") || "");

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      cache: "no-store",
    });
  } catch {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("error", "backend_unavailable");
    return NextResponse.redirect(loginUrl, 303);
  }

  if (!response.ok) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("error", "invalid_credentials");
    return NextResponse.redirect(loginUrl, 303);
  }

  const payload = (await response.json().catch(() => null)) as { token?: string } | null;
  if (!payload?.token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("error", "missing_token");
    return NextResponse.redirect(loginUrl, 303);
  }

  const nextPath = request.nextUrl.searchParams.get("next") || "/";
  const redirectUrl = new URL(nextPath.startsWith("/") ? nextPath : "/", request.url);
  const nextResponse = NextResponse.redirect(redirectUrl, 303);
  nextResponse.cookies.set("vanta_session", payload.token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
  return nextResponse;
}
