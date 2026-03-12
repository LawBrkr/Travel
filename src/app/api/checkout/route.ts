/**
 * POST /api/checkout
 *
 * Creates a Stripe Checkout Session for a travel package.
 *
 * Security guarantees (per SKILL.md):
 *   ✅ Price is looked up server-side from TRIPS_CATALOGUE — never trusted from client.
 *   ✅ STRIPE_SECRET_KEY only lives on the server (no "NEXT_PUBLIC_" prefix).
 *   ✅ Input validated before any Stripe call.
 *   ✅ try/catch wraps all I/O operations.
 *
 * Request body:
 *   { tripId: string; passengers: number }
 *
 * Response:
 *   200 → { url: string }        — Stripe-hosted checkout URL
 *   400 → { error: string }      — Validation error
 *   404 → { error: string }      — Trip not found
 *   500 → { error: string }      — Internal / Stripe API error
 */

import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getTripById } from "@/lib/trips";

// ─── Constants ───────────────────────────────────────────────────────────────

const MAX_PASSENGERS = 12;
const MIN_PASSENGERS = 1;

// ─── Types ───────────────────────────────────────────────────────────────────

interface CheckoutRequestBody {
    tripId: string;
    passengers: number;
}

// ─── Handler ─────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest): Promise<NextResponse> {
    // ── 0. Guard: Stripe not configured ───────────────────────────────────────
    if (!stripe) {
        return NextResponse.json(
            { error: "Los pagos en línea no están disponibles en este momento." },
            { status: 503 }
        );
    }

    try {
        // ── 1. Parse & validate request body ──────────────────────────────────
        let body: CheckoutRequestBody;

        try {
            body = (await req.json()) as CheckoutRequestBody;
        } catch {
            return NextResponse.json(
                { error: "Cuerpo de la solicitud inválido. Se esperaba JSON." },
                { status: 400 }
            );
        }

        const { tripId, passengers } = body;

        if (!tripId || typeof tripId !== "string" || tripId.trim() === "") {
            return NextResponse.json(
                { error: "El campo 'tripId' es obligatorio." },
                { status: 400 }
            );
        }

        if (
            typeof passengers !== "number" ||
            !Number.isInteger(passengers) ||
            passengers < MIN_PASSENGERS ||
            passengers > MAX_PASSENGERS
        ) {
            return NextResponse.json(
                {
                    error: `El número de pasajeros debe ser un entero entre ${MIN_PASSENGERS} y ${MAX_PASSENGERS}.`,
                },
                { status: 400 }
            );
        }

        // ── 2. Look up canonical price (server-side only — NEVER trust client price) ──
        const trip = getTripById(tripId.trim());

        if (!trip) {
            return NextResponse.json(
                { error: `El viaje con ID '${tripId}' no existe.` },
                { status: 404 }
            );
        }

        // ── 3. Calculate total in smallest currency unit ───────────────────────
        const totalAmount = trip.priceUnit * passengers;

        // ── 4. Build success/cancel URLs ──────────────────────────────────────
        const appUrl =
            process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

        const successUrl = `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}&trip=${encodeURIComponent(trip.id)}`;
        const cancelUrl = `${appUrl}/checkout/cancel?trip=${encodeURIComponent(trip.id)}`;

        // ── 5. Create Stripe Checkout Session ─────────────────────────────────
        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            payment_method_types: ["card"],
            currency: trip.currency.toLowerCase(),

            line_items: [
                {
                    quantity: passengers,
                    price_data: {
                        currency: trip.currency.toLowerCase(),
                        unit_amount: trip.priceUnit,
                        product_data: {
                            name: `${trip.emoji} ${trip.name}`,
                            description: trip.description,
                            metadata: {
                                tripId: trip.id,
                                destination: trip.destination,
                                country: trip.country,
                                region: trip.region,
                                nights: String(trip.nights),
                            },
                        },
                    },
                },
            ],

            metadata: {
                tripId: trip.id,
                passengers: String(passengers),
                totalAmount: String(totalAmount),
                currency: trip.currency,
            },

            // Expire session after 30 minutes (Stripe minimum is 30 min)
            expires_at: Math.floor(Date.now() / 1000) + 30 * 60,

            success_url: successUrl,
            cancel_url: cancelUrl,
        });

        if (!session.url) {
            throw new Error("Stripe devolvió una sesión sin URL de pago.");
        }

        // ── 6. Return the hosted checkout URL to the client ───────────────────
        return NextResponse.json({ url: session.url }, { status: 200 });
    } catch (err: unknown) {
        // ── Error handling — distinguish Stripe errors from generic ones ───────
        const isStripeError =
            err !== null &&
            typeof err === "object" &&
            "type" in err &&
            typeof (err as Record<string, unknown>).type === "string" &&
            ((err as Record<string, unknown>).type as string).startsWith("Stripe");

        if (isStripeError) {
            const stripeErr = err as { message?: string; code?: string; type: string };
            console.error("[/api/checkout] Stripe error:", {
                type: stripeErr.type,
                code: stripeErr.code,
                message: stripeErr.message,
            });

            return NextResponse.json(
                {
                    error:
                        stripeErr.message ??
                        "Error al procesar el pago. Intenta de nuevo.",
                    code: stripeErr.code,
                },
                { status: 502 }
            );
        }

        const message = err instanceof Error ? err.message : "Error desconocido";
        console.error("[/api/checkout] Unexpected error:", message);

        return NextResponse.json(
            { error: "Error interno del servidor. Inténtalo en unos minutos." },
            { status: 500 }
        );
    }
}

// Block non-POST methods
export function GET(): NextResponse {
    return NextResponse.json(
        { error: "Método no permitido. Usa POST." },
        { status: 405 }
    );
}
