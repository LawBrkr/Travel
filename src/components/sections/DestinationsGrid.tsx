"use client";

import { useState } from "react";
import TravelCard from "@/components/ui/TravelCard";
import { formatPrice } from "@/lib/formatPrice";

// ─── Data ─────────────────────────────────────────────────────────────────────
const DESTINATIONS = [
    {
        id: "europa-total",
        destination: "Europa total con vuelo",
        country: "Europa",
        region: "EUROPE" as const,
        imageSrc: "/destinations/paris-night.png",
        duration: 14,
        price: 49670,
        currency: "MXN",
        locale: "es-MX",
        description: "Disfruta de este espectacular tour de 14 destinos en un sólo viaje: Madrid, Burgos, Burdeos, Blois, París, Lucerna, Zurich, Venecia, Roma, Florencia, Pisa, Niza, Barcelona y Zaragoza.",
        travelDates: "Enero 2027 - Septiembre 2027",
    },
    {
        id: "gran-vuelta-europa",
        destination: "Gran Vuelta por Europa con Vuelo",
        country: "Europa",
        region: "EUROPE" as const,
        imageSrc: "/destinations/rome-colosseum.png",
        duration: 15,
        price: 47828,
        currency: "MXN",
        locale: "es-MX",
        description: "Disfruta de este espectacular tour de 15 destinos en un sólo viaje, la mejor experiencia en viajes a Europa en un circuito.",
        travelDates: "Enero 2027 - Septiembre 2027",
    },
    {
        id: "escapada-europa",
        destination: "Escapada a Europa",
        country: "Europa",
        region: "EUROPE" as const,
        imageSrc: "/destinations/amalfi-coast.png",
        duration: 5,
        price: 29271,
        currency: "MXN",
        locale: "es-MX",
        description: "Disfruta de este espectacular tour de 5 destinos en un solo viaje: Madrid, Burgos, Burdeos, Blois, París.",
        travelDates: "Enero 2027 - Septiembre 2027",
    },
    {
        id: "paraiso-europeo",
        destination: "Paraíso Europeo",
        country: "Europa",
        region: "EUROPE" as const,
        imageSrc: "/destinations/santorini-view.png",
        duration: 8,
        price: 27660,
        currency: "MXN",
        locale: "es-MX",
        description: "Disfruta de este espectacular tour de 5 destinos en un sólo viaje: Londres, París, Bruselas, Gante, Brujas, Amberes, La Haya, Ámsterdam.",
        travelDates: "Enero 2027 - Septiembre 2027",
    },
    {
        id: "escapada-italia",
        destination: "Escapada a Italia",
        country: "Italia",
        region: "EUROPE" as const,
        imageSrc: "/destinations/rome-colosseum.png",
        duration: 4,
        price: 23371,
        currency: "MXN",
        locale: "es-MX",
        description: "Disfruta de este espectacular tour de 4 destinos en un solo viaje: Roma, Venecia, Florencia y Milán.",
        travelDates: "Enero 2027 - Septiembre 2027",
    },
    {
        id: "europa-magnifica",
        destination: "Europa magnifica",
        country: "Europa",
        region: "EUROPE" as const,
        imageSrc: "/destinations/paris-night.png",
        duration: 10,
        price: 24697,
        currency: "MXN",
        locale: "es-MX",
        description: "Disfruta de este espectacular tour por los mejores destinos de Europa y mucho más.",
        travelDates: "Enero 2027 - Septiembre 2027",
    },
    {
        id: "japon-samurai",
        destination: "Japón camino del Samurai con vuelo",
        country: "Japón",
        region: "ASIA" as const,
        imageSrc: "/destinations/amalfi-coast.png",
        duration: 10,
        price: 58878,
        currency: "MXN",
        locale: "es-MX",
        description: "Disfruta de este espectacular tour de 3 impresionantes destinos en un sólo viaje: Hiroshima, Osaka, Tokio y mucho más.",
        travelDates: "Enero 2027 - Septiembre 2027",
    },
    {
        id: "japon-vuelo",
        destination: "Japón con vuelo",
        country: "Japón",
        region: "ASIA" as const,
        imageSrc: "/destinations/santorini-view.png",
        duration: 10,
        price: 55195,
        currency: "MXN",
        locale: "es-MX",
        description: "Disfruta de este espectacular tour en las entrañas de todo Japón, explorando Tokio y Kioto.",
        travelDates: "Enero 2027 - Septiembre 2027",
    },
    {
        id: "mejor-china",
        destination: "Lo mejor de China",
        country: "China",
        region: "ASIA" as const,
        imageSrc: "/destinations/paris-night.png",
        duration: 10,
        price: 37337,
        currency: "MXN",
        locale: "es-MX",
        description: "Disfruta de este espectacular tour de 3 destinos en un sólo viaje por los mejores lugares de China: Beijing, Xi'an (en tren), Shanghái (en vuelo) y Disney Shanghái.",
        travelDates: "Enero 2027 - Septiembre 2027",
    },
    {
        id: "turquia-vuelo",
        destination: "Turquía con vuelo",
        country: "Turquía",
        region: "EUROPE" as const,
        imageSrc: "/destinations/rome-colosseum.png",
        duration: 10,
        price: 36778,
        currency: "MXN",
        locale: "es-MX",
        description: "Disfruta de este espectacular tour por los mejores destinos de Turquía en un sólo viaje: Estambul, Capadocia, Pamukkale, Ankara, Kusadasi y mucho más.",
        travelDates: "Enero 2027 - Septiembre 2027",
    },
    {
        id: "turquia-clasico",
        destination: "Turquía clásico libre",
        country: "Turquía",
        region: "EUROPE" as const,
        imageSrc: "/destinations/amalfi-coast.png",
        duration: 8,
        price: 10242,
        currency: "MXN",
        locale: "es-MX",
        description: "Disfruta de este espectacular tour de 4 destinos en un solo viaje: Estambul, Ankara, Capadocia, Pamukkale y más.",
        travelDates: "Enero 2027 - Septiembre 2027",
    },
    {
        id: "egipto-clasico",
        destination: "Egipto clásico con crucero en el Nilo",
        country: "Egipto",
        region: "ASIA" as const,
        imageSrc: "/destinations/santorini-view.png",
        duration: 8,
        price: 17809,
        currency: "MXN",
        locale: "es-MX",
        description: "Disfruta de este espectacular tour de 6 destinos en un sólo viaje: Cairo, Luxor, Aswan y mucho más.",
        travelDates: "Enero 2027 - Septiembre 2027",
    }
];

// ─── Filter Tab ───────────────────────────────────────────────────────────────
type Filter = "ALL" | "ASIA" | "EUROPE";

const FILTER_OPTIONS: { key: Filter; label: string; emoji: string }[] = [
    { key: "ALL", label: "Todos", emoji: "🌍" },
    { key: "EUROPE", label: "Europa", emoji: "🗼" },
    { key: "ASIA", label: "Asia", emoji: "🗾" },
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
                    aria-label={`Destinos de ${activeFilter === "ALL" ? "Europa y Asia" : activeFilter === "EUROPE" ? "Europa" : "Asia"}`}
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
