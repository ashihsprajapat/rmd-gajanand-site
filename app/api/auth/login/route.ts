import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { createSessionToken, AUTH_COOKIE } from "@/lib/auth";
import { getUsersCollection } from "@/db/mongodb";
import { corsPreflight, withCors } from "@/lib/cors";

export const runtime = "edge";
export function OPTIONS(request: Request) { return corsPreflight(request); }

export async function POST(request: Request) {
  try {
    const body = await request.json() as { email?: unknown; password?: unknown };
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const password = typeof body.password === "string" ? body.password : "";
    if (!email || !password) return withCors(request, NextResponse.json({ error: "Enter your email and password." }, { status: 400 }));
    const user = await (await getUsersCollection()).findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) return withCors(request, NextResponse.json({ error: "Incorrect email or password." }, { status: 401 }));
    const publicUser = { id: user.id, name: user.name, email: user.email, role: user.role };
    const response = NextResponse.json({ user: publicUser });
    response.cookies.set(AUTH_COOKIE, await createSessionToken(publicUser), { httpOnly: true, sameSite: "lax", secure: new URL(request.url).protocol === "https:", path: "/", maxAge: 604800 });
    return withCors(request, response);
  } catch (error) { console.error("Login failed", error); return withCors(request, NextResponse.json({ error: "Unable to sign in. Please try again." }, { status: 500 })); }
}
