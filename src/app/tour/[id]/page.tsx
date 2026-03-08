import { notFound } from "next/navigation";
import Image from "next/image";
import { getTripById } from "@/lib/trips";
import { formatPrice } from "@/lib/formatPrice";
import CheckoutButton from "@/components/payment/CheckoutButton";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const trip = getTripById(id);
    if (!trip) return { title: "Tour no encontrado" };
    return {
        title: `${trip.name} - Viajes Premium`,
        description: trip.description,
    };
}

export default async function TourDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const trip = getTripById(id);

    if (!trip) {
        notFound();
    }

    const formattedPrice = formatPrice({ amount: trip.priceUnit / 100, currency: trip.currency, locale: trip.locale, compact: false });

    // Default image if not provided
    const heroImage = trip.image || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop";

    return (
        <main className="min-h-screen bg-gray-50 flex flex-col pt-16 md:pt-20"> {/* Offset for navbar */}
            {/* ── Hero Section ── */}
            <section className="relative w-full h-[50vh] min-h-[400px] flex items-end justify-center pb-12 md:pb-16 bg-gray-900 overflow-hidden">
                <Image
                    src={heroImage}
                    alt={trip.name}
                    fill
                    className="object-cover"
                    priority
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/10" />

                <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-up">
                    <div className="mb-4">
                        <span
                            className="inline-block px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[#f4b942] rounded-full backdrop-blur-md"
                            style={{ background: "rgba(244,185,66,0.15)", border: "1px solid rgba(244,185,66,0.3)" }}
                        >
                            {trip.region === "EUROPE" ? "Europa" : "Asia"} • {trip.country}
                        </span>
                    </div>
                    <h1
                        className="text-4xl md:text-5xl lg:text-7xl font-black text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] leading-tight mb-4"
                        style={{ fontFamily: "var(--font-serif)" }}
                    >
                        {trip.name}
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto drop-shadow-md">
                        {trip.description}
                    </p>
                </div>
            </section>

            {/* ── Content Section ── */}
            <section className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 relative">

                    {/* Left Pane (Details) */}
                    <div className="flex-1 flex flex-col gap-12">

                        {/* Itinerary */}
                        {trip.itinerary && trip.itinerary.length > 0 && (
                            <div className="bg-white rounded-[2rem] p-6 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-gray-100">
                                <h2 className="text-2xl sm:text-3xl font-black mb-8" style={{ fontFamily: "var(--font-serif)", color: "var(--color-navy-950)" }}>
                                    Itinerario del Viaje
                                </h2>
                                <div className="flex flex-col gap-8">
                                    {trip.itinerary.map((day, idx) => (
                                        <div key={idx} className="flex gap-4 sm:gap-6 group">
                                            <div className="flex flex-col items-center">
                                                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center font-black text-blue-600 shrink-0 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                                    {idx + 1}
                                                </div>
                                                {idx !== trip.itinerary!.length - 1 && (
                                                    <div className="w-0.5 h-full bg-gradient-to-b from-blue-100 to-transparent my-2 rounded-full"></div>
                                                )}
                                            </div>
                                            <div className="pt-1.5 pb-4">
                                                <p className="text-gray-700 leading-relaxed sm:text-lg">{day}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Includes & Excludes */}
                        {((trip.includes && trip.includes.length > 0) || (trip.excludes && trip.excludes.length > 0)) && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                                {/* Includes */}
                                {trip.includes && trip.includes.length > 0 && (
                                    <div className="bg-green-50/50 rounded-[2rem] p-6 sm:p-8 border border-green-100">
                                        <h3 className="text-xl font-bold text-green-900 mb-6 flex items-center gap-3">
                                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-200/50 text-green-700">✓</span>
                                            Qué Incluye
                                        </h3>
                                        <ul className="flex flex-col gap-4">
                                            {trip.includes.map((item, i) => (
                                                <li key={i} className="text-green-800 flex items-start gap-3">
                                                    <span className="mt-1 text-sm text-green-600 font-bold">•</span>
                                                    <span className="leading-relaxed">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Excludes */}
                                {trip.excludes && trip.excludes.length > 0 && (
                                    <div className="bg-red-50/50 rounded-[2rem] p-6 sm:p-8 border border-red-100">
                                        <h3 className="text-xl font-bold text-red-900 mb-6 flex items-center gap-3">
                                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-200/50 text-red-700">✕</span>
                                            No Incluye
                                        </h3>
                                        <ul className="flex flex-col gap-4">
                                            {trip.excludes.map((item, i) => (
                                                <li key={i} className="text-red-800 flex items-start gap-3">
                                                    <span className="mt-1 text-sm text-red-600 font-bold">•</span>
                                                    <span className="leading-relaxed">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Terms */}
                        {trip.terms && (
                            <div className="bg-white rounded-3xl p-6 sm:p-8 text-sm text-gray-500 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
                                <h4 className="font-bold text-gray-700 mb-3 text-base flex items-center gap-2">
                                    <span>📄</span> Términos y Condiciones
                                </h4>
                                {Array.isArray(trip.terms) ? (
                                    <ul className="flex flex-col gap-2">
                                        {trip.terms.map((term, i) => (
                                            <li key={i} className="flex items-start gap-2">
                                                <span className="text-gray-400 mt-0.5">•</span>
                                                <span className="leading-relaxed">{term}</span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="leading-relaxed">{trip.terms}</p>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Right Pane (Sticky Sidebar) */}
                    <div className="w-full lg:w-[380px] shrink-0">
                        <div className="sticky top-28 bg-white rounded-[2rem] p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col gap-8">

                            {/* Price Summary */}
                            <div className="flex flex-col gap-2">
                                <span className="text-xs font-bold uppercase tracking-widest text-[#f4b942]">Resumen del Viaje</span>
                                <div className="flex items-end gap-2 mt-1">
                                    <span className="text-5xl font-black tracking-tight" style={{ color: "var(--color-navy-950)" }}>{formattedPrice}</span>
                                    <span className="text-xl font-bold text-gray-400 mb-1">{trip.currency}</span>
                                </div>
                                <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-3">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-500">Duración</span>
                                        <span className="font-bold text-gray-900">{trip.nights} noches</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-500">Fechas</span>
                                        <span className="font-bold text-gray-900">{trip.travelDates}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Promo Badges */}
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-4 px-5 py-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200/50">
                                    <span className="text-3xl drop-shadow-sm">💳</span>
                                    <div>
                                        <p className="text-sm font-black text-amber-900">12 Meses Sin Intereses</p>
                                        <p className="text-xs font-medium text-amber-700/80">Con tarjetas participantes</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 px-5 py-4 bg-gradient-to-r from-red-50 to-rose-50 rounded-2xl border border-red-200/50">
                                    <span className="text-3xl drop-shadow-sm">💸</span>
                                    <div>
                                        <p className="text-sm font-black text-red-900">5% OFF de Contado</p>
                                        <p className="text-xs font-medium text-red-700/80">Ahorra en una exhibición</p>
                                    </div>
                                </div>
                            </div>

                            {/* CTA */}
                            <div className="flex flex-col gap-4">
                                <div className="w-full flex *:w-full *:min-h-[60px] *:text-lg [&_button]:w-full hover:scale-[1.02] active:scale-[0.98] transition-transform">
                                    <CheckoutButton tripId={trip.id} passengers={1} label="✈ Reservar Ahora" />
                                </div>
                                <p className="text-center text-xs font-medium text-gray-400 flex items-center justify-center gap-1.5">
                                    <span>🔒</span> Pagos seguros y cifrados por Stripe
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </main>
    );
}
