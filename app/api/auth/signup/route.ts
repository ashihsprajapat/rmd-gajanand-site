import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { createSessionToken, AUTH_COOKIE } from "@/lib/auth";
import { getDb } from "@/db";
import { users } from "@/db/schema";
import { corsPreflight, withCors } from "@/lib/cors";

export const runtime = "edge";
const fail = (request: Request, error: string, status = 400) => withCors(request, NextResponse.json({ error }, { status }));

export function OPTIONS(request: Request) { return corsPreflight(request); }

export async function POST(request: Request) {
  try {
    const body = await request.json() as { name?: unknown; email?: unknown; password?: unknown };
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const password = typeof body.password === "string" ? body.password : "";
    if (name.length < 2 || name.length > 100) return fail(request, "Enter a name between 2 and 100 characters.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) return fail(request, "Enter a valid email address.");
    if (password.length < 8 || password.length > 128) return fail(request, "Password must be between 8 and 128 characters.");
    const db = getDb();
    const [existing] = await db.select({ id: users.id }).from(users).where(eq(users.email, email)).limit(1);
    if (existing) return fail(request, "An account with that email already exists.", 409);
    const user = { id: crypto.randomUUID(), name, email, role: "customer" as const };
    await db.insert(users).values({ ...user, passwordHash: await bcrypt.hash(password, 12), createdAt: new Date() });
    const response = NextResponse.json({ user }, { status: 201 });
    response.cookies.set(AUTH_COOKIE, await createSessionToken(user), { httpOnly: true, sameSite: "lax", secure: new URL(request.url).protocol === "https:", path: "/", maxAge: 604800 });
    return withCors(request, response);
  } catch (error) { console.error("Signup failed", error); return fail(request, "Unable to create your account. Please try again.", 500); }
}
