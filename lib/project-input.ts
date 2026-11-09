export type ProjectInput = {
  title: string;
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
};

const text = (value: unknown, field: string, maximum = 2_000) => {
  if (typeof value !== "string") throw new Error(`${field} must be text.`);
  const result = value.trim();
  if (result.length > maximum) throw new Error(`${field} is too long.`);
  return result;
};

const count = (value: unknown, field: string, maximum = 1_000_000) => {
  if (typeof value !== "number" || !Number.isInteger(value) || value < 0 || value > maximum) {
    throw new Error(`${field} must be a whole number between 0 and ${maximum}.`);
  }
  return value;
};

const media = (value: unknown, field: string) => {
  if (!Array.isArray(value) || value.length > 20 || !value.every((item) => typeof item === "string" && item.length <= 2_048 && /^https?:\/\//.test(item))) {
    throw new Error(`${field} must contain at most 20 valid HTTP(S) URLs.`);
  }
  return value;
};

export function parseProjectInput(body: unknown): ProjectInput {
  if (!body || typeof body !== "object" || Array.isArray(body)) throw new Error("A project object is required.");
  const value = body as Record<string, unknown>;
  const input = {
    title: text(value.title, "Title", 160),
    description: text(value.description ?? "", "Description", 5_000),
    location: text(value.location ?? "", "Location", 250),
    address: text(value.address ?? "", "Address", 1_000),
    lengthFeet: count(value.lengthFeet, "Length in feet"),
    heightFeet: count(value.heightFeet, "Height in feet", 1_000),
    progressPercent: count(value.progressPercent, "Progress", 100),
    pattisDelivered: count(value.pattisDelivered, "Pattis delivered"),
    pattisInstalled: count(value.pattisInstalled, "Pattis installed"),
    totalPattis: count(value.totalPattis, "Total pattis"),
    pillarsDelivered: count(value.pillarsDelivered, "Pillars delivered"),
    pillarsInstalled: count(value.pillarsInstalled, "Pillars installed"),
    totalPillars: count(value.totalPillars, "Total pillars"),
    photos: media(value.photos ?? [], "Photos"),
    videos: media(value.videos ?? [], "Videos"),
  };
  if (input.title.length < 2) throw new Error("Title must be at least 2 characters.");
  if (input.pattisInstalled > input.pattisDelivered || input.pattisDelivered > input.totalPattis) throw new Error("Patti counts must be installed ≤ delivered ≤ total.");
  if (input.pillarsInstalled > input.pillarsDelivered || input.pillarsDelivered > input.totalPillars) throw new Error("Pillar counts must be installed ≤ delivered ≤ total.");
  return input;
}
