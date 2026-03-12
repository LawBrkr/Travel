/**
 * stripe.ts — Singleton Stripe client (server-side only).
 *
 * Per SKILL.md security rules:
 *   - STRIPE_SECRET_KEY is NEVER exposed to the client bundle.
 *   - This file must only be imported in server-side code (API routes, Server Components).
 */

import Stripe from "stripe";

// Stripe is optional — if STRIPE_SECRET_KEY is not set, stripe will be null
// and the checkout API will return a 503 until keys are configured.
export const stripe = process.env.STRIPE_SECRET_KEY
    ? new Stripe(process.env.STRIPE_SECRET_KEY, {
          apiVersion: "2026-02-25.clover",
          typescript: true,
      })
    : null;
