import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { AUTH_COOKIE, verifySessionToken } from "@/lib/auth";
import { corsPreflight, withCors } from "@/lib/cors";

export function OPTIONS(request: Request) { return corsPreflight(request); }

export async function GET(request: Request) {
  const token = (await cookies()).get(AUTH_COOKIE)?.value;
  const user = token ? await verifySessionToken(token) : null;
  if (!user) return withCors(request, NextResponse.json({ error: "Unauthenticated" }, { status: 401 }));
  return withCors(request, NextResponse.json({ user }));
}
