/**
 * stripe.ts — Singleton Stripe client (server-side only).
 *
 * Per SKILL.md security rules:
 *   - STRIPE_SECRET_KEY is NEVER exposed to the client bundle.
 *   - This file must only be imported in server-side code (API routes, Server Components).
 */

import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error(
        "[stripe.ts] STRIPE_SECRET_KEY is not defined. " +
        "Copy .env.example → .env.local and fill in your Stripe keys."
    );
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2026-02-25.clover",
    typescript: true,
});
