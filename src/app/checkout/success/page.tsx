/**
 * /checkout/success — Post-payment confirmation page.
 *
 * This page is the Stripe redirect destination after a successful payment.
 * It renders a confirmation UI and reads the session summary from the URL params.
 *
 * SECURITY NOTE:
 *   The session_id from the URL is used only for display purposes.
 *   The booking is NOT confirmed here — it's confirmed by the webhook at
 *   /api/webhooks/stripe verifying Stripe's HMAC signature.
 *   See checkout-flow-logic.md for the full state diagram.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { getTripById } from "@/lib/trips";
import { formatPrice } from "@/lib/formatPrice";

export const metadata: Metadata = {
    title: "¡Reserva Confirmada! — Traza Travel Viajes",
    description: "Tu pago fue procesado exitosamente. Pronto recibirás un email de confirmación.",
};

// ─── Success Page ─────────────────────────────────────────────────────────────

interface PageProps {
    searchParams: Promise<{ session_id?: string; trip?: string }>;
}

export default async function CheckoutSuccessPage({ searchParams }: PageProps) {
    const params = await searchParams;
    const sessionId = params.session_id ?? null;
    const tripId = params.trip ?? null;
    const trip = tripId ? getTripById(tripId) : null;

    const priceDisplay = trip
        ? formatPrice({ amount: trip.priceUnit / (trip.currency === "JPY" || trip.currency === "IDR" || trip.currency === "KRW" || trip.currency === "VND" ? 1 : 100), currency: trip.currency, locale: trip.locale })
        : null;

    return (
        <main
            id="checkout-success"
            style={{
                minHeight: "100dvh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "24px 16px",
                background: "linear-gradient(135deg, #0a0f1e 0%, #0d1e15 50%, #0a0f1e 100%)",
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
                    background: "radial-gradient(circle, rgba(34,197,94,0.18) 0%, transparent 70%)",
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
                {/* Success icon */}
                <div
                    aria-hidden="true"
                    style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #22c55e, #16a34a)",
                        boxShadow: "0 0 40px rgba(34,197,94,0.4)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "36px",
                        animation: "scaleIn 500ms cubic-bezier(0.34,1.56,0.64,1) 200ms both",
                    }}
                >
                    ✓
                </div>

                {/* Heading */}
                <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: "8px" }}>
                    <h1
                        style={{
                            fontFamily: "var(--font-serif, 'Georgia')",
                            fontSize: "clamp(22px, 6vw, 28px)",
                            fontWeight: 700,
                            color: "#ffffff",
                            margin: 0,
                            lineHeight: 1.2,
                        }}
                    >
                        ¡Pago Exitoso! 🎉
                    </h1>
                    <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", margin: 0, lineHeight: 1.6 }}>
                        Tu reserva ha sido recibida. Recibirás un email de confirmación en los próximos minutos.
                    </p>
                </div>

                {/* Trip summary (if trip found) */}
                {trip && (
                    <div
                        id="success-trip-summary"
                        style={{
                            width: "100%",
                            background: "rgba(244,185,66,0.08)",
                            border: "1px solid rgba(244,185,66,0.2)",
                            borderRadius: "16px",
                            padding: "16px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <span style={{ fontSize: "28px" }}>{trip.emoji}</span>
                            <div>
                                <p style={{ fontSize: "15px", fontWeight: 700, color: "#ffffff", margin: 0 }}>
                                    {trip.name}
                                </p>
                                <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", margin: 0 }}>
                                    {trip.country} · {trip.nights} noches
                                </p>
                            </div>
                        </div>
                        {priceDisplay && (
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                                    Precio por persona
                                </span>
                                <span style={{ fontSize: "16px", fontWeight: 700, color: "#f4b942" }}>
                                    {priceDisplay}
                                </span>
                            </div>
                        )}
                    </div>
                )}

                {/* Session ID (truncated for reference) */}
                {sessionId && (
                    <p
                        id="success-session-id"
                        style={{
                            fontSize: "11px",
                            color: "rgba(255,255,255,0.25)",
                            fontFamily: "monospace",
                            textAlign: "center",
                            margin: 0,
                            wordBreak: "break-all",
                        }}
                    >
                        Ref: {sessionId.slice(0, 24)}…
                    </p>
                )}

                {/* Security note */}
                <div
                    style={{
                        width: "100%",
                        background: "rgba(255,255,255,0.04)",
                        borderRadius: "12px",
                        padding: "12px",
                        display: "flex",
                        gap: "10px",
                        alignItems: "flex-start",
                    }}
                >
                    <span aria-hidden="true" style={{ fontSize: "16px", flexShrink: 0 }}>🔐</span>
                    <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)", margin: 0, lineHeight: 1.5 }}>
                        Tu confirmación definitiva llegará por email una vez que Stripe verifique el pago mediante webhook seguro.
                    </p>
                </div>

                {/* CTA */}
                <Link
                    href="/"
                    id="btn-back-home"
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
                        transition: "transform 200ms ease, box-shadow 200ms ease",
                        boxShadow: "0 4px 20px rgba(244,185,66,0.35)",
                    }}
                >
                    ✈️ Explorar Más Destinos
                </Link>
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
