"use client";

/**
 * CheckoutButton.tsx — Mobile-first CTA for initiating a Stripe checkout.
 *
 * Mobile-first rules (SKILL.md):
 *   ✅ Touch target ≥ 44px (minHeight enforced via style)
 *   ✅ Disabled while loading to prevent double submission
 *   ✅ Shows spinner + "Cargando..." to provide clear feedback
 *   ✅ Error displayed inline (no alert() calls)
 *   ✅ Full-width on mobile, auto-width on larger screens
 */

import { useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface CheckoutButtonProps {
    /** ID of the trip from TRIPS_CATALOGUE */
    tripId: string;
    /** Number of passengers (1–12) */
    passengers: number;
    /** Display label override (defaults to "Reservar Ahora") */
    label?: string;
    /** Called after a Stripe API error */
    onError?: (message: string) => void;
}

// ─── API Response types ───────────────────────────────────────────────────────

interface CheckoutSuccessResponse {
    url: string;
}

interface CheckoutErrorResponse {
    error: string;
    code?: string;
}

type CheckoutResponse = CheckoutSuccessResponse | CheckoutErrorResponse;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function isErrorResponse(r: CheckoutResponse): r is CheckoutErrorResponse {
    return "error" in r;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function CheckoutButton({
    tripId,
    passengers,
    label = "Reservar Ahora",
    onError,
}: CheckoutButtonProps) {
    const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const handleCheckout = async () => {
        // Guard: prevent double-click while loading
        if (status === "loading") return;

        setStatus("loading");
        setErrorMsg(null);

        try {
            const res = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ tripId, passengers }),
            });

            const data: CheckoutResponse = (await res.json()) as CheckoutResponse;

            if (!res.ok || isErrorResponse(data)) {
                const msg = isErrorResponse(data)
                    ? data.error
                    : "Error al conectar con el servidor de pagos.";
                setErrorMsg(msg);
                setStatus("error");
                onError?.(msg);
                return;
            }

            // Redirect to Stripe-hosted checkout (replaces current tab)
            window.location.href = (data as CheckoutSuccessResponse).url;

            // Keep loading state active during redirect to prevent re-clicks
        } catch (err) {
            const msg =
                err instanceof Error
                    ? err.message
                    : "Error de red. Verifica tu conexión e inténtalo de nuevo.";
            setErrorMsg(msg);
            setStatus("error");
            onError?.(msg);
        }
    };

    const isLoading = status === "loading";

    return (
        <div
            id={`checkout-btn-wrapper-${tripId}`}
            style={{ display: "flex", flexDirection: "column", gap: "8px", width: "100%" }}
        >
            <button
                id={`checkout-btn-${tripId}`}
                onClick={handleCheckout}
                disabled={isLoading}
                aria-busy={isLoading}
                aria-label={isLoading ? "Procesando tu reserva..." : label}
                style={{
                    width: "100%",
                    minHeight: "52px", // ≥ 44px touch target per SKILL.md
                    padding: "14px 24px",
                    borderRadius: "16px",
                    border: "none",
                    fontFamily: "var(--font-sans)",
                    fontSize: "15px",
                    fontWeight: "700",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    cursor: isLoading ? "not-allowed" : "pointer",
                    transition: "all 280ms cubic-bezier(0.4,0,0.2,1)",
                    background: isLoading
                        ? "rgba(244,185,66,0.45)"
                        : status === "error"
                            ? "rgba(239,68,68,0.85)"
                            : "linear-gradient(135deg, #f4b942 0%, #e8a020 60%, #f0cc7a 100%)",
                    color: "#0a0f1e",
                    boxShadow: isLoading
                        ? "none"
                        : "0 4px 24px rgba(244,185,66,0.35), 0 1px 4px rgba(0,0,0,0.4)",
                    transform: "scale(1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    position: "relative",
                    overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                    if (!isLoading) {
                        e.currentTarget.style.transform = "translateY(-2px) scale(1.01)";
                        e.currentTarget.style.boxShadow =
                            "0 8px 32px rgba(244,185,66,0.5), 0 2px 8px rgba(0,0,0,0.4)";
                    }
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow =
                        isLoading
                            ? "none"
                            : "0 4px 24px rgba(244,185,66,0.35), 0 1px 4px rgba(0,0,0,0.4)";
                }}
            >
                {/* Shimmer overlay (loading state) */}
                {isLoading && (
                    <span
                        aria-hidden="true"
                        style={{
                            position: "absolute",
                            inset: 0,
                            background:
                                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)",
                            backgroundSize: "200% 100%",
                            animation: "shimmer 1.4s infinite linear",
                        }}
                    />
                )}

                {/* Icon / Spinner */}
                <span aria-hidden="true" style={{ fontSize: "18px", lineHeight: 1 }}>
                    {isLoading ? (
                        <SpinnerIcon />
                    ) : status === "error" ? (
                        "⚠️"
                    ) : (
                        "🔒"
                    )}
                </span>

                {/* Label */}
                <span>
                    {isLoading
                        ? "Procesando..."
                        : status === "error"
                            ? "Reintentar"
                            : label}
                </span>
            </button>

            {/* Inline error message */}
            {status === "error" && errorMsg && (
                <p
                    id={`checkout-error-${tripId}`}
                    role="alert"
                    aria-live="assertive"
                    style={{
                        fontSize: "13px",
                        color: "#f87171",
                        textAlign: "center",
                        padding: "8px 12px",
                        borderRadius: "10px",
                        background: "rgba(239,68,68,0.1)",
                        border: "1px solid rgba(239,68,68,0.25)",
                        margin: 0,
                    }}
                >
                    {errorMsg}
                </p>
            )}

            {/* Security badge */}
            <p
                style={{
                    fontSize: "11px",
                    color: "rgba(255,255,255,0.35)",
                    textAlign: "center",
                    margin: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "4px",
                }}
            >
                <span aria-hidden="true">🔐</span> Pago seguro con cifrado SSL · Stripe
            </p>

            {/* Keyframes injected inline for portability */}
            <style>{`
        @keyframes shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }
      `}</style>
        </div>
    );
}

// ─── Spinner Icon ─────────────────────────────────────────────────────────────

function SpinnerIcon() {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            style={{ animation: "spin 0.8s linear infinite" }}
        >
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="3"
                strokeOpacity="0.25"
            />
            <path
                d="M12 2a10 10 0 0 1 10 10"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
            />
        </svg>
    );
}
