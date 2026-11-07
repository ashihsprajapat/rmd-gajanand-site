import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  // Signup always creates a customer. Administrators are promoted server-side.
  role: text("role", { enum: ["customer", "admin"] }).notNull().default("customer"),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
});

export const projects = sqliteTable("projects", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  ownerId: text("owner_id").notNull().references(() => users.id),
  ownerEmail: text("owner_email").notNull(),
  description: text("description").notNull().default(""),
  location: text("location").notNull().default(""),
  address: text("address").notNull().default(""),
  lengthFeet: integer("length_feet").notNull().default(0),
  heightFeet: integer("height_feet").notNull().default(0),
  progressPercent: integer("progress_percent").notNull().default(0),
  pattisDelivered: integer("pattis_delivered").notNull().default(0),
  pattisInstalled: integer("pattis_installed").notNull().default(0),
  totalPattis: integer("total_pattis").notNull().default(0),
  pillarsDelivered: integer("pillars_delivered").notNull().default(0),
  pillarsInstalled: integer("pillars_installed").notNull().default(0),
  totalPillars: integer("total_pillars").notNull().default(0),
  // JSON string arrays of vetted media URLs. Files themselves should live in object storage.
  photos: text("photos", { mode: "json" }).$type<string[]>().notNull().default([]),
  videos: text("videos", { mode: "json" }).$type<string[]>().notNull().default([]),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).notNull(),
});
