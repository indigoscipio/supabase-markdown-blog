"use server";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const checkout = async (email, redirectTo) => {
  const result = await stripe.checkout.sessions.create({
    success_url: redirectTo || process.env.SITE_URL,
    cancel_url: process.env.SITE_URL,
    customer_email: email,
    line_items: [{ price: process.env.PRO_PRICE_ID, quantity: 1 }],
    mode: "subscription",
  });

  return result;
};

console.log(stripe);
