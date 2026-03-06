import contentData from "./content-v1.json";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DestinationSEO {
    title: string;
    metaDescription: string;
    keywords: string[];
}

export interface DestinationOG {
    title: string;
    description: string;
    image: string;
}

export interface DestinationCTA {
    text: string;
    url: string;
}

export type Region = "ASIA" | "EUROPE";

export interface Destination {
    slug: string;
    region: Region;
    country: string;
    currency: string;
    locale: string;
    priceFrom: number;
    headline: string;
    subheadline: string;
    /** Mobile-optimized: short paragraphs, max 3-4 sentences each */
    body: string[];
    /** Bullet-point highlights with emoji (mobile card display) */
    highlights: string[];
    cta: DestinationCTA;
    seo: DestinationSEO;
    og: DestinationOG;
    imageAlt: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

export const destinations: Destination[] = contentData.destinations as Destination[];

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Lookup a destination by slug (e.g. "tokio", "bali", "roma", "santorini").
 * Returns undefined if slug is not found.
 */
export function getDestinationBySlug(slug: string): Destination | undefined {
    return destinations.find((d) => d.slug === slug);
}

/**
 * Get all destinations for a given region.
 */
export function getDestinationsByRegion(region: Region): Destination[] {
    return destinations.filter((d) => d.region === region);
}

/**
 * Returns all valid slugs — used by generateStaticParams in Next.js.
 */
export function getAllSlugs(): string[] {
    return destinations.map((d) => d.slug);
}

/**
 * Format a destination's price using the Intl API (per SKILL.md rule).
 */
export function formatDestinationPrice(destination: Destination): string {
    return new Intl.NumberFormat(destination.locale, {
        style: "currency",
        currency: destination.currency,
        maximumFractionDigits: 0,
    }).format(destination.priceFrom);
}
