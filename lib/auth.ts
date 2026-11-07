import { SignJWT, jwtVerify } from "jose";
import { env } from "cloudflare:workers";
import { cookies } from "next/headers";

export const AUTH_COOKIE = "rmd_session";
const issuer = "rmd-gajanand";

export type UserRole = "customer" | "admin";
export type SessionUser = { id: string; email: string; name: string; role: UserRole };

function secret() {
  // Cloudflare supplies runtime secrets on `env`; Vinext's local Worker preview
  // loads .env values through process.env. Keep the Worker binding first so the
  // hosted secret remains the source of truth.
  const value = env.JWT_SECRET ?? process.env.JWT_SECRET;
  if (!value || value === "replace-with-a-long-random-secret") throw new Error("JWT_SECRET must be set to a long, random secret.");
  return new TextEncoder().encode(value);
}

export async function createSessionToken(user: SessionUser) {
  return new SignJWT({ email: user.email, name: user.name, role: user.role }).setProtectedHeader({ alg: "HS256" }).setIssuer(issuer).setSubject(user.id).setIssuedAt().setExpirationTime("7d").sign(secret());
}

export async function verifySessionToken(token: string): Promise<SessionUser | null> {
  try {
    const { payload } = await jwtVerify(token, secret(), { issuer });
    if (typeof payload.sub !== "string" || typeof payload.email !== "string" || typeof payload.name !== "string" || (payload.role !== "customer" && payload.role !== "admin")) return null;
    return { id: payload.sub, email: payload.email, name: payload.name, role: payload.role };
  } catch { return null; }
}

export async function getSessionUser() {
  const token = (await cookies()).get(AUTH_COOKIE)?.value;
  return token ? verifySessionToken(token) : null;
}
