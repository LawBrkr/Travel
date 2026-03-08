"use client";

import { useState } from "react";
import TravelCard from "@/components/ui/TravelCard";
import { formatPrice } from "@/lib/formatPrice";

// ─── Data ─────────────────────────────────────────────────────────────────────
import { TRIPS_CATALOGUE } from "@/lib/trips";

const DESTINATIONS = Object.values(TRIPS_CATALOGUE).map((trip) => ({
    id: trip.id,
    destination: trip.destination,
    country: trip.country,
    region: trip.region,
    imageSrc: trip.image || "/destinations/paris-night.png",
    duration: trip.nights,
    price: trip.priceUnit / 100,
    currency: trip.currency,
    locale: trip.locale,
    description: trip.description,
    travelDates: trip.travelDates,
    flightIncluded: trip.flightIncluded,
}));

// ─── Filter Tab ───────────────────────────────────────────────────────────────
type Filter = "ALL" | "ASIA" | "EUROPE" | "AFRICA";

const FILTER_OPTIONS: { key: Filter; label: string; emoji: string }[] = [
    { key: "ALL", label: "Todos", emoji: "🌍" },
    { key: "EUROPE", label: "Europa", emoji: "🗼" },
    { key: "ASIA", label: "Asia", emoji: "🗾" },
    { key: "AFRICA", label: "África", emoji: "🐪" },
];

function FilterTabs({
    active,
    onChange,
}: {
    active: Filter;
    onChange: (f: Filter) => void;
}) {
    return (
        <div
            role="tablist"
            aria-label="Filtrar destinos"
            className="flex gap-2 p-1 rounded-2xl"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
            {FILTER_OPTIONS.map(({ key, label, emoji }) => {
                const isActive = active === key;
                return (
                    <button
                        key={key}
                        id={`filter-tab-${key.toLowerCase()}`}
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => onChange(key)}
                        className="flex-1 flex items-center justify-center gap-1.5 rounded-xl font-semibold text-sm transition-all cursor-pointer"
                        style={{
                            minHeight: "44px",
                            background: isActive
                                ? "linear-gradient(135deg, rgba(244,185,66,0.2), rgba(96,184,212,0.12))"
                                : "transparent",
                            border: isActive ? "1px solid rgba(244,185,66,0.35)" : "1px solid transparent",
                            color: isActive ? "var(--color-gold-400)" : "rgba(255,255,255,0.55)",
                            transition: "all 200ms cubic-bezier(0.4,0,0.2,1)",
                        }}
                    >
                        <span aria-hidden="true">{emoji}</span>
                        <span>{label}</span>
                    </button>
                );
            })}
        </div>
    );
}

// ─── DestinationsGrid ──────────────────────────────────────────────────────────
/**
 * DestinationsGrid — responsive section with filter tabs.
 * SKILL.md compliance:
 *  - 1-column on mobile (default)
 *  - 2-column at ≥ 640px (sm)
 *  - 3-column at ≥ 1024px (lg)
 *  - Filter tabs min-height 44px
 *  - Staggered fade-up animations
 */
export default function DestinationsGrid() {
    const [activeFilter, setActiveFilter] = useState<Filter>("ALL");

    const filtered =
        activeFilter === "ALL"
            ? DESTINATIONS
            : DESTINATIONS.filter((d) => d.region === activeFilter);

    return (
        <section
            id="destinations-grid-section"
            aria-labelledby="destinations-heading"
            className="relative px-4 py-16"
            style={{ background: "var(--color-navy-950)" }}
        >
            {/* Background decoration */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px pointer-events-none"
                style={{ background: "linear-gradient(90deg, transparent, rgba(244,185,66,0.3), transparent)" }}
                aria-hidden="true"
            />

            <div className="max-w-6xl mx-auto flex flex-col gap-8">
                {/* ── Section header ── */}
                <header className="flex flex-col gap-4 animate-fade-up">
                    <div className="flex items-end justify-between gap-4">
                        <div className="flex flex-col gap-2">
                            <span
                                className="text-[11px] font-bold uppercase tracking-widest"
                                style={{ color: "var(--color-gold-400)" }}
                            >
                                Explora el Mundo
                            </span>
                            <h2
                                id="destinations-heading"
                                className="text-3xl font-black leading-tight"
                                style={{ fontFamily: "var(--font-serif)" }}
                            >
                                Destinos{" "}
                                <span className="gradient-gold">Exclusivos</span>
                            </h2>
                            <p className="text-sm max-w-md" style={{ color: "rgba(255,255,255,0.5)" }}>
                                Itinerarios de lujo en Europa y Asia. Pago en moneda local, sin comisiones ocultas.
                            </p>
                        </div>

                        {/* Count badge */}
                        <span
                            className="shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full hidden sm:inline-flex items-center gap-1"
                            style={{
                                background: "rgba(244,185,66,0.12)",
                                border: "1px solid rgba(244,185,66,0.25)",
                                color: "var(--color-gold-400)",
                            }}
                        >
                            {filtered.length} destinos
                        </span>
                    </div>

                    {/* Filter tabs */}
                    <FilterTabs active={activeFilter} onChange={setActiveFilter} />
                </header>

                {/* ── Grid ── */}
                <div
                    id="destinations-grid"
                    role="list"
                    aria-label={`Destinos: ${activeFilter === "ALL" ? "Todos" : activeFilter}`}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                >
                    {filtered.map((dest, i) => (
                        <div
                            key={dest.id}
                            role="listitem"
                            className="animate-fade-up"
                            style={{ animationDelay: `${i * 80}ms` }}
                        >
                            <TravelCard {...dest} />
                        </div>
                    ))}
                </div>

                {/* ── See More CTA ── */}
                <div className="flex justify-center animate-fade-up">
                    <button
                        id="btn-see-more-destinations"
                        className="flex items-center gap-2 px-8 rounded-2xl font-semibold text-sm cursor-pointer transition-all"
                        style={{
                            minHeight: "52px",
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.12)",
                            color: "rgba(255,255,255,0.7)",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = "rgba(255,255,255,0.09)";
                            e.currentTarget.style.color = "#fff";
                            e.currentTarget.style.borderColor = "rgba(244,185,66,0.35)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                            e.currentTarget.style.color = "rgba(255,255,255,0.7)";
                            e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                        }}
                    >
                        Ver todos los destinos →
                    </button>
                </div>
            </div>
        </section>
    );
}
