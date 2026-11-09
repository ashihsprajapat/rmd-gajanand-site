import { NextResponse } from "next/server";
import { AUTH_COOKIE } from "@/lib/auth";
import { corsPreflight, withCors } from "@/lib/cors";

export function OPTIONS(request: Request) { return corsPreflight(request); }

export async function POST(request: Request) {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(AUTH_COOKIE, "", { httpOnly: true, sameSite: "lax", path: "/", maxAge: 0 });
  return withCors(request, response);
}
