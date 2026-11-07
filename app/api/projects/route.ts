import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getDb } from "@/db";
import { projects, users } from "@/db/schema";
import { getSessionUser } from "@/lib/auth";
import { corsPreflight, withCors } from "@/lib/cors";
import { parseProjectInput } from "@/lib/project-input";

export const runtime = "edge";
export function OPTIONS(request: Request) { return corsPreflight(request); }
const response = (request: Request, body: unknown, status = 200) => withCors(request, NextResponse.json(body, { status }));

export async function GET(request: Request) {
  const user = await getSessionUser();
  if (!user) return response(request, { error: "Unauthenticated" }, 401);
  const db = getDb();
  const records = user.role === "admin"
    ? await db.select().from(projects).all()
    : await db.select().from(projects).where(eq(projects.ownerId, user.id)).all();
  return response(request, { projects: records });
}

export async function POST(request: Request) {
  const user = await getSessionUser();
  if (!user) return response(request, { error: "Unauthenticated" }, 401);
  try {
    const body = await request.json() as Record<string, unknown>;
    const input = parseProjectInput(body);
    let owner: { id: string; email: string } = user;
    if (user.role === "admin" && typeof body.ownerId === "string" && body.ownerId) {
      const [selected] = await getDb().select({ id: users.id, email: users.email }).from(users).where(eq(users.id, body.ownerId)).limit(1);
      if (!selected) return response(request, { error: "Project owner was not found." }, 404);
      owner = selected;
    }
    const now = new Date();
    const project = { id: crypto.randomUUID(), ...input, ownerId: owner.id, ownerEmail: owner.email, createdAt: now, updatedAt: now };
    await getDb().insert(projects).values(project);
    return response(request, { project }, 201);
  } catch (error) {
    return response(request, { error: error instanceof Error ? error.message : "Unable to create project." }, 400);
  }
}
