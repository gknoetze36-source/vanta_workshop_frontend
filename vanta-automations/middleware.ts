import { NextResponse, type NextRequest } from "next/server";

const publicPaths = new Set(["/login", "/register", "/forgot-password"]);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (publicPaths.has(pathname)) {
    return NextResponse.next();
  }

  const hasSession = Boolean(request.cookies.get("vanta_session")?.value);
  if (!hasSession) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/assistant",
    "/automations",
    "/billing",
    "/bookings",
    "/customers",
    "/inventory",
    "/jobs",
    "/reports",
    "/settings",
    "/staff",
    "/vehicles",
    "/workspace",
  ],
};
