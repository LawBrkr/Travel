"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { formatPrice } from "@/lib/formatPrice";
import CheckoutButton from "@/components/payment/CheckoutButton";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface TravelCardProps {
    /** Unique id used for aria labels and test selectors */
    id: string;
    destination: string;
    country: string;
    region: "ASIA" | "EUROPE";
    imageSrc: string;
    /** Duration in days */
    duration: number;
    /** Raw price amount */
    price: number;
    currency: string;
    locale: string;
    /** Optional promotional badge text, e.g. "Más Vendido" */
    badge?: string;
    /** Human-readable description */
    description: string;
    /** Travel dates */
    travelDates: string;
}

// ─── Region Badge ─────────────────────────────────────────────────────────────
function RegionBadge({ region }: { region: "ASIA" | "EUROPE" }) {
    const isAsia = region === "ASIA";
    return (
        <span
            style={{
                backgroundColor: isAsia ? "rgba(96,184,212,0.25)" : "rgba(244,185,66,0.25)",
                color: isAsia ? "#8dd0e4" : "#f4b942",
                border: `1px solid ${isAsia ? "rgba(96,184,212,0.4)" : "rgba(244,185,66,0.4)"}`,
            }}
            className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full backdrop-blur-sm"
        >
            {isAsia ? "Asia" : "Europa"}
        </span>
    );
}

// ─── Duration Pill ────────────────────────────────────────────────────────────
function DurationPill({ days }: { days: number }) {
    return (
        <span
            className="text-[11px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm"
            style={{
                background: "rgba(10,15,30,0.7)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.85)",
            }}
        >
            🗓 {days} días
        </span>
    );
}

// ─── TravelCard ───────────────────────────────────────────────────────────────
/**
 * TravelCard — individual destination card.
 * SKILL.md compliance:
 *  - CTA min-height 52px (≥ 44px touch target)
 *  - Uses next/image with loading="lazy" and fill
 *  - No horizontal overflow by design
 */
export default function TravelCard({
    id,
    destination,
    country,
    region,
    imageSrc,
    duration,
    price,
    currency,
    locale,
    badge,
    description,
    travelDates,
}: TravelCardProps) {
    const [imgLoaded, setImgLoaded] = useState(false);

    const formattedPrice = formatPrice({ amount: price, currency, locale, compact: false });

    return (
        <article
            id={`travel-card-${id}`}
            className="group relative flex flex-col rounded-3xl overflow-hidden"
            style={{
                background: "rgba(13,20,38,0.9)",
                border: "1px solid rgba(255,255,255,0.07)",
                boxShadow: "0 4px 32px rgba(0,0,0,0.4)",
                transition: "transform 350ms cubic-bezier(0.4,0,0.2,1), box-shadow 350ms cubic-bezier(0.4,0,0.2,1)",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 12px 48px rgba(0,0,0,0.6)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 32px rgba(0,0,0,0.4)";
            }}
        >
            {/* ── Image container ── */}
            <Link href={`/tour/${id}`} className="relative w-full overflow-hidden block group-hover:cursor-pointer" style={{ aspectRatio: "16/10" }}>
                {/* Skeleton shimmer while image loads */}
                {!imgLoaded && (
                    <div
                        className="absolute inset-0 skeleton"
                        aria-hidden="true"
                    />
                )}

                <Image
                    src={imageSrc}
                    alt={`${destination}, ${country}`}
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    onLoad={() => setImgLoaded(true)}
                />

                {/* Gradient overlay — bottom-up dark scrim */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background:
                            "linear-gradient(to top, rgba(10,15,30,0.92) 0%, rgba(10,15,30,0.4) 45%, transparent 100%)",
                    }}
                    aria-hidden="true"
                />

                {/* Top badges row */}
                <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2 z-10">
                    {/* Region badge (top-right) */}
                    <RegionBadge region={region} />
                </div>
            </Link>

            {/* ── Card body ── */}
            <div className="flex flex-col gap-3 p-4 flex-1">
                {/* Destination info */}
                <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-col gap-0.5">
                        <Link href={`/tour/${id}`}>
                            <h3
                                className="font-bold text-white leading-tight text-base hover:text-gray-300 transition-colors"
                                style={{ fontFamily: "var(--font-serif)" }}
                            >
                                {destination}
                            </h3>
                        </Link>
                        <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                            {country}
                        </p>
                    </div>
                    <DurationPill days={duration} />
                </div>

                {/* Description & Travel Dates */}
                <div className="flex flex-col gap-1.5 mt-1">
                    <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
                        {description}
                    </p>
                    <p className="text-[10px] font-bold tracking-wide uppercase" style={{ color: "var(--color-gold-400)" }}>
                        {travelDates}
                    </p>
                </div>

                {/* Price row */}
                <div className="flex items-baseline gap-1.5">
                    <span
                        className="text-lg font-black leading-none"
                        style={{ color: "var(--color-gold-400)" }}
                    >
                        {formattedPrice} {currency}
                    </span>
                    <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.4)" }}>
                        / persona
                    </span>
                </div>

                {/* CTA — Descubrir Itinerario */}
                <div className="flex flex-col gap-2 mt-4 relative z-20 w-full rounded-2xl overflow-hidden p-[1px] bg-gradient-to-r from-gold-400 to-gold-600">
                    <Link
                        href={`/tour/${id}`}
                        className="flex items-center justify-center w-full text-xs md:text-sm font-bold rounded-[15px] bg-navy-950 text-gold-400 hover:bg-gold-500 hover:text-navy-950 transition-all duration-300 uppercase tracking-wider"
                        style={{ minHeight: "44px" }}
                    >
                        Descubrir Itinerario
                    </Link>
                </div>
            </div>
        </article>
    );
}
