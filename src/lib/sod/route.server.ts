const DEFAULT_BASE_ADDRESS = "189 Stephanie Drive, Guelph, ON, Canada";
const DEFAULT_FARM_ADDRESS =
  "Greenhorizons Sod Farms, 1625 Kossuth Road, Cambridge, ON N3H 4R6, Canada";

const PRECISE_TYPES = new Set(["street_address", "premise", "subpremise"]);

export function mapsKey() {
  return process.env.GOOGLE_MAPS_API_KEY?.trim() || "";
}

export function routeAddresses() {
  return {
    base: process.env.SOD_BASE_ADDRESS?.trim() || DEFAULT_BASE_ADDRESS,
    farm: process.env.SOD_FARM_ADDRESS?.trim() || DEFAULT_FARM_ADDRESS,
  };
}

type GeocodeResult =
  | { ok: true; formatted: string; lat: number; lng: number }
  | {
      ok: false;
      reason: "not_found" | "imprecise" | "outside_ontario" | "error";
    };

type GeocodeApiResponse = {
  status: string;
  results: {
    formatted_address: string;
    types: string[];
    partial_match?: boolean;
    geometry: { location: { lat: number; lng: number } };
    address_components: { short_name: string; types: string[] }[];
  }[];
};

/** Resolves a customer address to coordinates and confirms it is a precise Ontario street address. */
export async function geocodeOntarioAddress(
  address: string,
): Promise<GeocodeResult> {
  const params = new URLSearchParams({
    address,
    components: "country:CA",
    region: "ca",
    key: mapsKey(),
  });
  let body: GeocodeApiResponse;
  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?${params}`,
    );
    if (!res.ok) return { ok: false, reason: "error" };
    body = (await res.json()) as GeocodeApiResponse;
  } catch {
    return { ok: false, reason: "error" };
  }
  if (body.status === "ZERO_RESULTS") return { ok: false, reason: "not_found" };
  if (body.status !== "OK" || !body.results.length) {
    console.error("[sod] geocode failed", body.status);
    return { ok: false, reason: "error" };
  }
  const top = body.results[0];
  const province = top.address_components.find((c) =>
    c.types.includes("administrative_area_level_1"),
  )?.short_name;
  if (province !== "ON") return { ok: false, reason: "outside_ontario" };
  if (!top.types.some((t) => PRECISE_TYPES.has(t))) {
    return { ok: false, reason: "imprecise" };
  }
  return {
    ok: true,
    formatted: top.formatted_address,
    lat: top.geometry.location.lat,
    lng: top.geometry.location.lng,
  };
}

type RoutesApiResponse = {
  routes?: { distanceMeters?: number; legs?: { distanceMeters?: number }[] }[];
};

/**
 * Real driving distance for the full delivery loop via Google Routes API:
 * base → farm → customer → base. Never a straight-line estimate.
 */
export async function computeDeliveryRoute(customer: {
  lat: number;
  lng: number;
}) {
  const { base, farm } = routeAddresses();
  const res = await fetch(
    "https://routes.googleapis.com/directions/v2:computeRoutes",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": mapsKey(),
        "X-Goog-FieldMask": "routes.distanceMeters,routes.legs.distanceMeters",
      },
      body: JSON.stringify({
        origin: { address: base },
        destination: { address: base },
        intermediates: [
          { address: farm },
          {
            location: {
              latLng: { latitude: customer.lat, longitude: customer.lng },
            },
          },
        ],
        travelMode: "DRIVE",
        routingPreference: "TRAFFIC_UNAWARE",
        units: "METRIC",
        regionCode: "CA",
      }),
    },
  );
  if (!res.ok) {
    console.error(
      "[sod] routes failed",
      res.status,
      await res.text().catch(() => ""),
    );
    return null;
  }
  const body = (await res.json()) as RoutesApiResponse;
  const route = body.routes?.[0];
  const legs = route?.legs ?? [];
  if (!route?.distanceMeters || legs.length !== 3) return null;
  const km = (m?: number) => Math.round(((m ?? 0) / 1000) * 10) / 10;
  return {
    totalKm: route.distanceMeters / 1000,
    legs: [
      { label: "Guelph base → pickup", km: km(legs[0].distanceMeters) },
      { label: "Pickup → your address", km: km(legs[1].distanceMeters) },
      { label: "Your address → Guelph base", km: km(legs[2].distanceMeters) },
    ],
  };
}
