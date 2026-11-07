import { SignJWT, jwtVerify } from "jose";
import { env } from "cloudflare:workers";

export const AUTH_COOKIE = "rmd_session";
const issuer = "rmd-gajanand";

export type SessionUser = { id: string; email: string; name: string };

function secret() {
  const value = env.JWT_SECRET;
  if (!value || value === "replace-with-a-long-random-secret") throw new Error("JWT_SECRET must be set to a long, random secret.");
  return new TextEncoder().encode(value);
}

export async function createSessionToken(user: SessionUser) {
  return new SignJWT({ email: user.email, name: user.name }).setProtectedHeader({ alg: "HS256" }).setIssuer(issuer).setSubject(user.id).setIssuedAt().setExpirationTime("7d").sign(secret());
}

export async function verifySessionToken(token: string): Promise<SessionUser | null> {
  try {
    const { payload } = await jwtVerify(token, secret(), { issuer });
    if (typeof payload.sub !== "string" || typeof payload.email !== "string" || typeof payload.name !== "string") return null;
    return { id: payload.sub, email: payload.email, name: payload.name };
  } catch { return null; }
}
