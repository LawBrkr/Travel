"use client";

import { useState } from "react";
import { formatPrice, getDestinationLocale } from "@/lib/formatPrice";

// ─── Types ───────────────────────────────────────────────────────────────────
interface SearchState {
    destination: string;
    checkIn: string;
    checkOut: string;
    passengers: number;
}

// ─── Data ────────────────────────────────────────────────────────────────────
const FEATURED_DESTINATIONS = [
    { name: "Tokio", country: "Japón", region: "ASIA", price: 450000, emoji: "🗾" },
    { name: "París", country: "Francia", region: "EUROPE", price: 1350, emoji: "🗼" },
    { name: "Bali", country: "Indonesia", region: "ASIA", price: 18500000, emoji: "🌴" },
    { name: "Roma", country: "Italia", region: "EUROPE", price: 980, emoji: "🏛️" },
    { name: "Bangkok", country: "Tailandia", region: "ASIA", price: 38000, emoji: "🛕" },
    { name: "Santorini", country: "Grecia", region: "EUROPE", price: 1590, emoji: "🏝️" },
];

const HERO_TAGS = ["Hoteles Boutique", "Itinerarios Exclusivos", "Checkout Seguro", "Sin Comisiones Ocultas"];

// ─── Sub-components ──────────────────────────────────────────────────────────

function RegionBadge({ region }: { region: string }) {
    return (
        <span
            style={{
                backgroundColor: region === "ASIA" ? "rgba(96,184,212,0.2)" : "rgba(244,185,66,0.2)",
                color: region === "ASIA" ? "#8dd0e4" : "#f4b942",
                border: `1px solid ${region === "ASIA" ? "rgba(96,184,212,0.35)" : "rgba(244,185,66,0.35)"}`,
            }}
            className="text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full"
        >
            {region === "ASIA" ? "Asia" : "Europa"}
        </span>
    );
}

function DestinationPill({
    dest,
    active,
    onClick,
}: {
    dest: (typeof FEATURED_DESTINATIONS)[0];
    active: boolean;
    onClick: () => void;
}) {
    const { currency, locale } = getDestinationLocale(dest.country);
    const priceStr = formatPrice({ amount: dest.price, currency, locale, compact: true });

    return (
        <button
            id={`dest-pill-${dest.name.toLowerCase()}`}
            onClick={onClick}
            style={{
                background: active
                    ? "linear-gradient(135deg, rgba(244,185,66,0.25), rgba(96,184,212,0.15))"
                    : "rgba(255,255,255,0.05)",
                border: active ? "1px solid rgba(244,185,66,0.5)" : "1px solid rgba(255,255,255,0.08)",
                transform: active ? "scale(1.02)" : "scale(1)",
                transition: "all 200ms cubic-bezier(0.4,0,0.2,1)",
            }}
            className="flex flex-col gap-1 rounded-2xl p-3 text-left backdrop-blur-sm min-h-[44px] w-full cursor-pointer"
            aria-pressed={active}
        >
            <div className="flex items-center justify-between gap-2">
                <span className="text-base leading-none">{dest.emoji}</span>
                <RegionBadge region={dest.region} />
            </div>
            <p className="font-semibold text-white text-sm leading-tight">{dest.name}</p>
            <p className="text-xs" style={{ color: "var(--color-gold-400)" }}>{priceStr} <span className="text-white/40">/ persona</span></p>
        </button>
    );
}

// ─── SearchBar ───────────────────────────────────────────────────────────────
function SearchBar({
    state,
    onChange,
    onSearch,
}: {
    state: SearchState;
    onChange: (s: Partial<SearchState>) => void;
    onSearch: () => void;
}) {
    return (
        <div
            id="search-bar"
            className="glass-dark rounded-2xl p-4 w-full"
            role="search"
            aria-label="Buscar viajes"
        >
            <div className="flex flex-col gap-3">
                {/* Destination */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="input-destination" className="text-xs font-medium text-white/50 uppercase tracking-wider">
                        ¿A dónde vas?
                    </label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm">✈️</span>
                        <input
                            id="input-destination"
                            type="text"
                            placeholder="Tokio, París, Bali..."
                            value={state.destination}
                            onChange={(e) => onChange({ destination: e.target.value })}
                            className="w-full rounded-xl pl-9 pr-3 py-3 text-sm text-white placeholder-white/30"
                            style={{
                                background: "rgba(255,255,255,0.07)",
                                border: "1px solid rgba(255,255,255,0.12)",
                                minHeight: "44px",
                                outline: "none",
                            }}
                            onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(244,185,66,0.6)")}
                            onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")}
                        />
                    </div>
                </div>

                {/* Dates — side by side on both mobile and desktop */}
                <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="input-checkin" className="text-xs font-medium text-white/50 uppercase tracking-wider">
                            Salida
                        </label>
                        <input
                            id="input-checkin"
                            type="date"
                            value={state.checkIn}
                            onChange={(e) => onChange({ checkIn: e.target.value })}
                            className="rounded-xl px-3 py-3 text-sm text-white"
                            style={{
                                background: "rgba(255,255,255,0.07)",
                                border: "1px solid rgba(255,255,255,0.12)",
                                minHeight: "44px",
                                colorScheme: "dark",
                                outline: "none",
                            }}
                            onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(244,185,66,0.6)")}
                            onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="input-checkout" className="text-xs font-medium text-white/50 uppercase tracking-wider">
                            Regreso
                        </label>
                        <input
                            id="input-checkout"
                            type="date"
                            value={state.checkOut}
                            onChange={(e) => onChange({ checkOut: e.target.value })}
                            className="rounded-xl px-3 py-3 text-sm text-white"
                            style={{
                                background: "rgba(255,255,255,0.07)",
                                border: "1px solid rgba(255,255,255,0.12)",
                                minHeight: "44px",
                                colorScheme: "dark",
                                outline: "none",
                            }}
                            onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(244,185,66,0.6)")}
                            onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")}
                        />
                    </div>
                </div>

                {/* Passengers */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="input-passengers" className="text-xs font-medium text-white/50 uppercase tracking-wider">
                        Pasajeros
                    </label>
                    <div className="flex items-center gap-3 rounded-xl px-3 py-2" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}>
                        <button
                            id="btn-passengers-dec"
                            onClick={() => onChange({ passengers: Math.max(1, state.passengers - 1) })}
                            className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white transition-colors cursor-pointer"
                            style={{ background: "rgba(255,255,255,0.1)", minHeight: "44px", minWidth: "44px" }}
                            aria-label="Reducir pasajeros"
                        >
                            −
                        </button>
                        <span id="passengers-count" className="flex-1 text-center text-white font-semibold">
                            {state.passengers} {state.passengers === 1 ? "pasajero" : "pasajeros"}
                        </span>
                        <button
                            id="btn-passengers-inc"
                            onClick={() => onChange({ passengers: Math.min(12, state.passengers + 1) })}
                            className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white transition-colors cursor-pointer"
                            style={{ background: "rgba(255,255,255,0.1)", minHeight: "44px", minWidth: "44px" }}
                            aria-label="Aumentar pasajeros"
                        >
                            +
                        </button>
                    </div>
                </div>

                {/* CTA Button */}
                <button
                    id="btn-search"
                    onClick={onSearch}
                    className="w-full rounded-xl py-4 font-bold text-sm uppercase tracking-wide text-navy-950 transition-all duration-200 cursor-pointer animate-pulse-glow"
                    style={{
                        background: "linear-gradient(135deg, #f4b942, #e8a020)",
                        color: "#0a0f1e",
                        minHeight: "52px",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                    🔍 Buscar Viajes
                </button>
            </div>
        </div>
    );
}

// ─── Hero Component ───────────────────────────────────────────────────────────
/**
 * Hero.tsx — Main hero section for the travel platform.
 * Mobile-first: designed and validated at 375px viewport.
 * Constraints per SKILL.md:
 *   - All touch targets ≥ 44px
 *   - No horizontal overflow
 *   - Single-column layout on mobile
 */
export default function Hero() {
    const [activeDestination, setActiveDestination] = useState<string | null>(null);
    const [search, setSearch] = useState<SearchState>({
        destination: "",
        checkIn: "",
        checkOut: "",
        passengers: 1,
    });

    const handleSearch = () => {
        // Placeholder: will call /api/trips in Phase 2
        console.log("Search:", search);
    };

    return (
        <section
            id="hero"
            className="relative min-h-dvh flex flex-col overflow-hidden"
            aria-label="Hero de búsqueda de viajes"
        >
            {/* Background — gradient fallback (image will be added in Phase 1 with next/image) */}
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "linear-gradient(135deg, #0a0f1e 0%, #111d3c 30%, #0d2240 60%, #0a1a30 100%)",
                }}
                aria-hidden="true"
            />

            {/* Decorative blobs */}
            <div
                className="absolute top-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full opacity-20 pointer-events-none"
                style={{ background: "radial-gradient(circle, #f4b942 0%, transparent 70%)", filter: "blur(80px)" }}
                aria-hidden="true"
            />
            <div
                className="absolute bottom-[-10%] left-[-15%] w-[50vw] h-[50vw] rounded-full opacity-15 pointer-events-none"
                style={{ background: "radial-gradient(circle, #60b8d4 0%, transparent 70%)", filter: "blur(80px)" }}
                aria-hidden="true"
            />

            {/* ── Navigation ── */}
            <nav
                id="main-nav"
                className="relative z-10 flex items-center justify-between px-4 pt-5 pb-3"
                aria-label="Navegación principal"
            >
                <div className="flex items-center gap-2">
                    <span className="text-2xl" aria-hidden="true">✈️</span>
                    <span
                        className="font-bold text-lg leading-none"
                        style={{ fontFamily: "var(--font-serif)", color: "var(--color-gold-400)" }}
                    >
                        EuroAsia
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        id="btn-nav-login"
                        className="text-sm text-white/70 px-3 py-2 rounded-xl cursor-pointer transition-colors hover:text-white"
                        style={{ minHeight: "44px" }}
                    >
                        Iniciar sesión
                    </button>
                    <button
                        id="btn-nav-register"
                        className="text-sm font-semibold px-4 py-2 rounded-xl cursor-pointer transition-all"
                        style={{
                            background: "rgba(244,185,66,0.15)",
                            border: "1px solid rgba(244,185,66,0.35)",
                            color: "#f4b942",
                            minHeight: "44px",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(244,185,66,0.25)")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(244,185,66,0.15)")}
                    >
                        Registrarse
                    </button>
                </div>
            </nav>

            {/* ── Main Content ── */}
            <div className="relative z-10 flex-1 flex flex-col px-4 pt-6 pb-8 gap-6">
                {/* Headline */}
                <header className="flex flex-col gap-3 animate-fade-up">
                    {/* Tags row */}
                    <div id="hero-tags" className="flex flex-wrap gap-2" role="list" aria-label="Características">
                        {HERO_TAGS.map((tag) => (
                            <span
                                key={tag}
                                role="listitem"
                                className="text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full"
                                style={{
                                    background: "rgba(255,255,255,0.08)",
                                    border: "1px solid rgba(255,255,255,0.15)",
                                    color: "rgba(255,255,255,0.65)",
                                }}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    <h1 className="text-[2rem] leading-[1.15] font-black" style={{ fontFamily: "var(--font-serif)" }}>
                        Descubre{" "}
                        <span className="gradient-gold">Europa</span>
                        {" & "}
                        <span className="gradient-text">Asia</span>
                        <br />
                        <span className="text-white/80 font-normal text-2xl">como nunca antes</span>
                    </h1>

                    <p className="text-sm text-white/55 leading-relaxed max-w-sm">
                        Itinerarios exclusivos, hoteles boutique y reserva segura.
                        Paga en la moneda de tu destino.
                    </p>
                </header>

                {/* Search Bar */}
                <div className="animate-fade-up delay-200">
                    <SearchBar
                        state={search}
                        onChange={(partial) => setSearch((prev) => ({ ...prev, ...partial }))}
                        onSearch={handleSearch}
                    />
                </div>

                {/* Destinations grid */}
                <div id="destinations-section" className="flex flex-col gap-3 animate-fade-up delay-300">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xs font-semibold text-white/50 uppercase tracking-widest">
                            Destinos Populares
                        </h2>
                        <button
                            id="btn-see-all"
                            className="text-xs cursor-pointer transition-colors"
                            style={{ color: "var(--color-gold-400)", minHeight: "44px" }}
                        >
                            Ver todos →
                        </button>
                    </div>

                    <div
                        id="destinations-grid"
                        className="grid grid-cols-2 gap-2"
                        role="list"
                        aria-label="Destinos populares"
                    >
                        {FEATURED_DESTINATIONS.map((dest) => (
                            <div key={dest.name} role="listitem">
                                <DestinationPill
                                    dest={dest}
                                    active={activeDestination === dest.name}
                                    onClick={() => {
                                        setActiveDestination(dest.name);
                                        setSearch((prev) => ({ ...prev, destination: dest.name }));
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Stats footer */}
                <footer
                    id="hero-stats"
                    className="glass rounded-2xl p-4 grid grid-cols-3 gap-2 text-center animate-fade-up delay-500"
                    aria-label="Estadísticas de la plataforma"
                >
                    {[
                        { value: "500+", label: "Destinos" },
                        { value: "50K+", label: "Viajeros" },
                        { value: "4.9★", label: "Valoración" },
                    ].map(({ value, label }) => (
                        <div key={label} className="flex flex-col gap-0.5">
                            <span className="font-bold text-sm gradient-gold">{value}</span>
                            <span className="text-[10px] text-white/40">{label}</span>
                        </div>
                    ))}
                </footer>
            </div>
        </section>
    );
}
