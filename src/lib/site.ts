export const SITE_URL = String(import.meta.env.VITE_SITE_URL ?? "").replace(
  /\/+$/,
  "",
);

export const BUSINESS = {
  name: "SilverScape Solutions",
  phoneDisplay: "226-500-4608",
  phoneE164: "+12265004608",
  phoneHref: "tel:+12265004608",
  email: "silverscapesolutions@gmail.com",
  emailHref: "mailto:silverscapesolutions@gmail.com",
  baseLocality: "Guelph",
  region: "ON",
  country: "CA",
} as const;

export const PRIMARY_MARKETS = [
  "Guelph",
  "Kitchener",
  "Waterloo",
  "Cambridge",
  "Greater Toronto Area",
] as const;

export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return SITE_URL
    ? `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`
    : path;
}
