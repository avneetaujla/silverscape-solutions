import { z } from "zod";

/**
 * Business pricing formula (do not change without owner sign-off):
 *   total = (4.20 × 1.13 × rolls) + (total route km × 1.50)
 * Sod is $4.20/roll plus 13% HST. Delivery is $1.50 per km of the full
 * round trip: Guelph base → sod farm → customer → Guelph base.
 * All maths is done in integer cents; route km is rounded to 0.1 km.
 *
 * BLOCKER: ACCOUNTANT TO CONFIRM HST TREATMENT OF SOD + DELIVERY BEFORE PAID
 * CHECKOUT GOES LIVE. This formula is not asserted to be the correct tax
 * treatment. Record the accountant's sign-off in TAX_REVIEW (src/lib/legal.ts).
 */
export { SOD_PRODUCT } from "@/lib/sod/product";

export const SOD_PRICE_PER_ROLL_CENTS = 420;
export const HST_PERCENT = 13;
export const DELIVERY_CENTS_PER_KM = 150;
export const MIN_ROLLS = 1;
export const MAX_ROLLS = 2000;

export type SodQuote = {
  rolls: number;
  coverageSqFt: number;
  routeKm: number;
  legs: { label: string; km: number }[];
  sodSubtotalCents: number;
  sodHstCents: number;
  sodTotalCents: number;
  deliveryCents: number;
  totalCents: number;
  deliveryAddress: string;
};

export function calculateSodPrice(rolls: number, routeKm: number) {
  if (!Number.isInteger(rolls) || rolls < MIN_ROLLS || rolls > MAX_ROLLS) {
    throw new Error("Invalid roll count");
  }
  if (!Number.isFinite(routeKm) || routeKm <= 0) {
    throw new Error("Invalid route distance");
  }
  const sodSubtotalCents = SOD_PRICE_PER_ROLL_CENTS * rolls;
  // 420 × 1.13 = 474.6 cents per roll → (420 × 113 × rolls) / 100, rounded to the cent.
  const sodTotalCents = Math.round(
    (SOD_PRICE_PER_ROLL_CENTS * (100 + HST_PERCENT) * rolls) / 100,
  );
  const routeTenthsKm = Math.round(routeKm * 10);
  // $1.50/km = 15¢ per 0.1 km, so this stays exact in integer cents.
  const deliveryCents = (routeTenthsKm * DELIVERY_CENTS_PER_KM) / 10;
  return {
    sodSubtotalCents,
    sodHstCents: sodTotalCents - sodSubtotalCents,
    sodTotalCents,
    routeKm: routeTenthsKm / 10,
    deliveryCents,
    totalCents: sodTotalCents + deliveryCents,
  };
}

export function formatCents(cents: number) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
  }).format(cents / 100);
}

const POSTAL_CODE =
  /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i;

export const sodOrderSchema = z.object({
  rolls: z
    .number()
    .int("Whole rolls only")
    .min(MIN_ROLLS, `Minimum ${MIN_ROLLS} roll`)
    .max(MAX_ROLLS, `For orders over ${MAX_ROLLS} rolls, please call us`),
  street: z.string().trim().min(4, "Enter your street address").max(160),
  city: z.string().trim().min(2, "Enter your city or town").max(80),
  postalCode: z
    .string()
    .trim()
    .regex(POSTAL_CODE, "Enter a valid Canadian postal code"),
  name: z.string().trim().min(2, "Enter your full name").max(100),
  email: z.string().trim().email("Enter a valid email").max(200),
  phone: z
    .string()
    .trim()
    .refine(
      (v) => v.replace(/\D/g, "").length >= 10,
      "Enter a valid phone number",
    )
    .refine((v) => /^[\d\s()+.-]+$/.test(v), "Enter a valid phone number"),
  notes: z
    .string()
    .trim()
    .max(500, "Keep notes under 500 characters")
    .optional(),
});

export type SodOrderInput = z.infer<typeof sodOrderSchema>;

export type SodResult<T> =
  | { ok: true; data: T }
  | {
      ok: false;
      code:
        | "not_configured"
        | "address_not_found"
        | "outside_service_area"
        | "route_failed"
        | "price_changed"
        | "payment_failed"
        | "invalid";
      message: string;
    };
