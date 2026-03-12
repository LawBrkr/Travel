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
            {/* Background — Premium vibrant image with gradient overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=2020&auto=format&fit=crop')",
                }}
                aria-hidden="true"
            >
                {/* Overlay to ensure text readability while keeping it vibrant */}
                <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(10, 15, 30, 0.4) 0%, rgba(10, 26, 48, 0.95) 100%)" }} />
            </div>

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
                    <a
                        id="btn-nav-whatsapp"
                        href="https://wa.me/5215666673841?text=Hola,%20me%20interesa%20obtener%20información%20sobre%20los%20tours%20a%20Europa%20y%20Asia."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-full cursor-pointer transition-all hover:scale-105 shadow-lg"
                        style={{
                            background: "linear-gradient(135deg, #25D366, #128C7E)",
                            color: "#ffffff",
                            minHeight: "44px",
                            boxShadow: "0 4px 14px 0 rgba(37, 211, 102, 0.39)"
                        }}
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                        </svg>
                        Escríbenos
                    </a>
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

                    <p className="text-sm font-bold tracking-widest uppercase mb-1 drop-shadow-md" style={{ color: "var(--color-gold-400)" }}>
                        ¡Viaja con nosotros!
                    </p>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl leading-tight font-black drop-shadow-xl" style={{ fontFamily: "var(--font-serif)" }}>
                        Descubre{" "}
                        <br className="hidden md:block" />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500">
                            Europa
                        </span>
                        {" & "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500">
                            Asia
                        </span>
                        <br />
                        <span className="text-white font-bold text-3xl md:text-5xl mt-2 block drop-shadow-md">como nunca antes</span>
                    </h1>

                    <p className="text-base font-medium text-white/95 leading-relaxed max-w-md mt-3 drop-shadow-md">
                        Itinerarios exclusivos, hoteles boutique y reserva segura. Vive aventuras inolvidables y paga en la moneda de tu destino.
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
