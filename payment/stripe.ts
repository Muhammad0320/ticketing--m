import Stripe from "stripe";

if (!process.env.STRIPE_KEY) {
  throw new Error("Stripe key not found");
}

export const stripe = new Stripe(process.env.STRIPE_KEY);
