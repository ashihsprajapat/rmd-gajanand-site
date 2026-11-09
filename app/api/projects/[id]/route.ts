import { NextResponse } from "next/server";
import { getProjectsCollection } from "@/db/mongodb";
import { getSessionUser } from "@/lib/auth";
import { corsPreflight, withCors } from "@/lib/cors";
import { parseProjectInput } from "@/lib/project-input";

export const runtime = "edge";
type RouteContext = { params: Promise<{ id: string }> };
const response = (request: Request, body: unknown, status = 200) => withCors(request, NextResponse.json(body, { status }));
export function OPTIONS(request: Request) { return corsPreflight(request); }

async function projectForUser(id: string, user: NonNullable<Awaited<ReturnType<typeof getSessionUser>>>) {
  return (await getProjectsCollection()).findOne(user.role === "admin" ? { id } : { id, ownerId: user.id });
}

export async function GET(request: Request, context: RouteContext) {
  const user = await getSessionUser();
  if (!user) return response(request, { error: "Unauthenticated" }, 401);
  const project = await projectForUser((await context.params).id, user);
  return project ? response(request, { project }) : response(request, { error: "Project not found." }, 404);
}

export async function PATCH(request: Request, context: RouteContext) {
  const user = await getSessionUser();
  if (!user) return response(request, { error: "Unauthenticated" }, 401);
  const id = (await context.params).id;
  const existing = await projectForUser(id, user);
  if (!existing) return response(request, { error: "Project not found." }, 404);
  try {
    const input = parseProjectInput(await request.json());
    const updatedAt = new Date();
    await (await getProjectsCollection()).updateOne({ id }, { $set: { ...input, updatedAt } });
    return response(request, { project: { ...existing, ...input, updatedAt } });
  } catch (error) {
    return response(request, { error: error instanceof Error ? error.message : "Unable to update project." }, 400);
  }
}
