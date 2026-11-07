import { MongoClient, type Collection } from "mongodb";
import { env } from "cloudflare:workers";
import type { UserRole } from "@/lib/auth";

export type UserDocument = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  createdAt: Date;
};

export type ProjectDocument = {
  id: string;
  title: string;
  ownerId: string;
  ownerEmail: string;
  description: string;
  location: string;
  address: string;
  lengthFeet: number;
  heightFeet: number;
  progressPercent: number;
  pattisDelivered: number;
  pattisInstalled: number;
  totalPattis: number;
  pillarsDelivered: number;
  pillarsInstalled: number;
  totalPillars: number;
  photos: string[];
  videos: string[];
  createdAt: Date;
  updatedAt: Date;
};

let client: MongoClient | undefined;
let connected: Promise<MongoClient> | undefined;

function connectionString() {
  const value = env.MONGODB_URI ?? process.env.MONGODB_URI;
  if (!value) throw new Error("MONGODB_URI must be configured.");
  return value;
}

async function getClient() {
  if (!client) client = new MongoClient(connectionString(), { serverSelectionTimeoutMS: 8_000 });
  connected ??= client.connect();
  return connected;
}

async function database() {
  const mongo = await getClient();
  return mongo.db(env.MONGODB_DB_NAME ?? process.env.MONGODB_DB_NAME ?? "remdDB");
}

export async function getUsersCollection(): Promise<Collection<UserDocument>> {
  const collection = (await database()).collection<UserDocument>("users");
  await collection.createIndex({ email: 1 }, { unique: true });
  return collection;
}

export async function getProjectsCollection(): Promise<Collection<ProjectDocument>> {
  const collection = (await database()).collection<ProjectDocument>("projects");
  await collection.createIndex({ ownerId: 1 });
  return collection;
}
