import { NextResponse, type NextRequest } from "next/server";
import { appUrl } from "@/lib/request-url";

export async function POST(request: NextRequest) {
  const response = NextResponse.redirect(appUrl(request, "/login"), 303);
  response.cookies.delete("vanta_session");
  return response;
}

export async function GET(request: NextRequest) {
  const response = NextResponse.redirect(appUrl(request, "/login"), 303);
  response.cookies.delete("vanta_session");
  return response;
}
