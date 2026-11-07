import { NextResponse } from "next/server";
import { env } from "cloudflare:workers";

function isAllowedOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return null;

  try {
    const originUrl = new URL(origin);
    const requestUrl = new URL(request.url);
    const configuredOrigins = (env.CORS_ORIGIN ?? "").split(",").map((value) => value.trim());
    if (originUrl.origin === requestUrl.origin || originUrl.hostname === "localhost" || originUrl.hostname === "127.0.0.1" || configuredOrigins.includes(originUrl.origin)) return originUrl.origin;
  } catch { /* Invalid Origin headers are not allowed. */ }
  return null;
}

export function withCors(request: Request, response: NextResponse) {
  const origin = isAllowedOrigin(request);
  if (origin) {
    response.headers.set("Access-Control-Allow-Origin", origin);
    response.headers.set("Access-Control-Allow-Credentials", "true");
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");
    response.headers.set("Vary", "Origin");
  }
  return response;
}

export function corsPreflight(request: Request) {
  return withCors(request, new NextResponse(null, { status: 204 }));
}
