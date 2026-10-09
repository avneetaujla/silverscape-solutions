import { z } from "zod";
import {
  LEAD_CITIES,
  LEAD_SERVICES,
  LEAD_TIMING,
} from "@/lib/leads/lead-options";

export { LEAD_CITIES, LEAD_SERVICES, LEAD_TIMING };

export const leadSchema = z
  .object({
    name: z.string().trim().min(2, "Enter your name").max(100),
    phone: z
      .string()
      .trim()
      .refine(
        (v) => /^[\d\s()+.-]+$/.test(v) && v.replace(/\D/g, "").length >= 10,
        {
          message: "Enter a valid phone number",
        },
      ),
    email: z.string().trim().email("Enter a valid email address").max(200),
    city: z.enum(LEAD_CITIES, {
      errorMap: () => ({ message: "Choose your city" }),
    }),
    division: z.enum(["outdoor", "interior"], {
      errorMap: () => ({ message: "Choose outdoor or interior" }),
    }),
    service: z.string().trim().min(1, "Choose a service").max(80),
    timing: z.enum(LEAD_TIMING, {
      errorMap: () => ({ message: "Choose a timeframe" }),
    }),
    description: z
      .string()
      .trim()
      .min(15, "Tell us a little more about the project (15+ characters)")
      .max(3000, "Please keep the description under 3,000 characters"),
    /** Honeypot — real visitors never see or fill this. */
    website: z.string().max(0).optional().default(""),
    elapsedMs: z.number().int().nonnegative(),
    pagePath: z.string().max(200).optional().default("/"),
  })
  .refine(
    (d) => (LEAD_SERVICES[d.division] as readonly string[]).includes(d.service),
    { path: ["service"], message: "Choose a service" },
  );

export type LeadInput = z.input<typeof leadSchema>;
export type Lead = z.output<typeof leadSchema>;
