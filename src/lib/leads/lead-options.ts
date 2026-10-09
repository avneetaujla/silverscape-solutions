import { INTERIOR, OUTDOOR } from "@/lib/services-data";

export const LEAD_CITIES = [
  "Guelph",
  "Kitchener",
  "Waterloo",
  "Cambridge",
  "Toronto",
  "Mississauga",
  "Brampton",
  "Other GTA",
  "Other Southern Ontario",
] as const;

export const LEAD_TIMING = [
  "As soon as possible",
  "Within 1–3 months",
  "In 3–6 months",
  "Next season",
  "Just planning for now",
] as const;

export const LEAD_SERVICES = {
  outdoor: [...OUTDOOR.map((s) => s.label), "Not sure yet"],
  interior: [...INTERIOR.map((s) => s.label), "Not sure yet"],
} as const;
