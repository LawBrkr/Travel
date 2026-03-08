/**
 * /checkout/cancel — User-cancelled payment page.
 *
 * Shown when the user clicks "Back" or "Cancel" on the Stripe hosted checkout page.
 * No money was charged. Reassures the user and offers to retry.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { getTripById } from "@/lib/trips";

export const metadata: Metadata = {
    title: "Reserva Cancelada — Traza Travel Viajes",
    description: "No se realizó ningún cargo. Puedes intentarlo de nuevo cuando quieras.",
};

// ─── Cancel Page ──────────────────────────────────────────────────────────────

interface PageProps {
    searchParams: Promise<{ trip?: string }>;
}

export default async function CheckoutCancelPage({ searchParams }: PageProps) {
    const params = await searchParams;
    const tripId = params.trip ?? null;
    const trip = tripId ? getTripById(tripId) : null;

    return (
        <main
            id="checkout-cancel"
            style={{
                minHeight: "100dvh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "24px 16px",
                background: "linear-gradient(135deg, #0a0f1e 0%, #1a0f0a 50%, #0a0f1e 100%)",
                fontFamily: "var(--font-sans)",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Background glow */}
            <div
                aria-hidden="true"
                style={{
                    position: "absolute",
                    top: "-20%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "70vw",
                    height: "70vw",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(244,185,66,0.12) 0%, transparent 70%)",
                    filter: "blur(60px)",
                    pointerEvents: "none",
                }}
            />

            {/* Card */}
            <div
                style={{
                    width: "100%",
                    maxWidth: "420px",
                    background: "rgba(255,255,255,0.05)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "28px",
                    padding: "40px 28px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "20px",
                    animation: "fadeUp 450ms cubic-bezier(0.4,0,0.2,1) both",
                    position: "relative",
                    zIndex: 1,
                }}
            >
                {/* Icon */}
                <div
                    aria-hidden="true"
                    style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, rgba(244,185,66,0.25), rgba(232,160,32,0.15))",
                        border: "2px solid rgba(244,185,66,0.4)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "36px",
                        animation: "scaleIn 500ms cubic-bezier(0.34,1.56,0.64,1) 200ms both",
                    }}
                >
                    ✈️
                </div>

                {/* Heading */}
                <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: "8px" }}>
                    <h1
                        style={{
                            fontFamily: "var(--font-serif, 'Georgia')",
                            fontSize: "clamp(20px, 6vw, 26px)",
                            fontWeight: 700,
                            color: "#ffffff",
                            margin: 0,
                            lineHeight: 1.2,
                        }}
                    >
                        Reserva Cancelada
                    </h1>
                    <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", margin: 0, lineHeight: 1.6 }}>
                        No se realizó ningún cargo a tu tarjeta.
                        Tu aventura te está esperando — ¡puedes intentarlo de nuevo cuando quieras!
                    </p>
                </div>

                {/* Trip reminder (if available) */}
                {trip && (
                    <div
                        id="cancel-trip-reminder"
                        style={{
                            width: "100%",
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: "16px",
                            padding: "14px 16px",
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                        }}
                    >
                        <span style={{ fontSize: "28px" }}>{trip.emoji}</span>
                        <div>
                            <p style={{ fontSize: "14px", fontWeight: 600, color: "rgba(255,255,255,0.9)", margin: 0 }}>
                                {trip.name}
                            </p>
                            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", margin: 0 }}>
                                Aún disponible · {trip.country}
                            </p>
                        </div>
                    </div>
                )}

                {/* Reassurance points */}
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                    }}
                >
                    {[
                        { icon: "✅", text: "No se realizó ningún cargo" },
                        { icon: "🔄", text: "Puedes reintentar en cualquier momento" },
                        { icon: "💬", text: "¿Necesitas ayuda? Escríbenos por chat" },
                    ].map(({ icon, text }) => (
                        <div
                            key={text}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                padding: "10px 12px",
                                borderRadius: "10px",
                                background: "rgba(255,255,255,0.03)",
                            }}
                        >
                            <span aria-hidden="true" style={{ fontSize: "15px" }}>{icon}</span>
                            <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.55)" }}>{text}</span>
                        </div>
                    ))}
                </div>

                {/* Actions */}
                <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "10px" }}>
                    {/* Primary: go back to previous trip */}
                    <Link
                        href="/"
                        id="btn-retry-booking"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
                            minHeight: "52px",
                            borderRadius: "14px",
                            background: "linear-gradient(135deg, #f4b942, #e8a020)",
                            color: "#0a0f1e",
                            fontWeight: 700,
                            fontSize: "14px",
                            letterSpacing: "0.04em",
                            textTransform: "uppercase",
                            textDecoration: "none",
                            boxShadow: "0 4px 20px rgba(244,185,66,0.3)",
                        }}
                    >
                        🔁 Intentar de Nuevo
                    </Link>

                    {/* Secondary: browse more */}
                    <Link
                        href="/"
                        id="btn-browse-more"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
                            minHeight: "48px",
                            borderRadius: "14px",
                            background: "rgba(255,255,255,0.06)",
                            border: "1px solid rgba(255,255,255,0.12)",
                            color: "rgba(255,255,255,0.7)",
                            fontWeight: 600,
                            fontSize: "13px",
                            textDecoration: "none",
                        }}
                    >
                        Ver Más Destinos
                    </Link>
                </div>
            </div>

            <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.5); }
          to   { opacity: 1; transform: scale(1);   }
        }
      `}</style>
        </main>
    );
}
