require("dotenv").config({ quiet: true });
const Stripe = require("stripe");

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  let body = req.body;
  if (typeof body === "string" || Buffer.isBuffer(body)) {
    try {
      body = JSON.parse(body.toString());
    } catch {
      return res.status(400).json({ error: "Request body must be valid JSON" });
    }
  }

  const amount = body?.amount;
  if (!Number.isSafeInteger(amount) || amount <= 0) {
    return res.status(400).json({
      error: "amount must be a positive integer in cents",
    });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    console.error("STRIPE_SECRET_KEY is not configured");
    return res.status(500).json({ error: "Payment service is not configured" });
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      // The existing card form confirms payments without a redirect URL.
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never",
      },
    });

    return res.status(200).json({ paymentIntent });
  } catch (error) {
    console.error("Failed to create payment intent", {
      type: error.type,
      code: error.code,
      message: error.message,
      param: error.param,
      requestId: error.requestId,
    });
    const status = error.type === "StripeInvalidRequestError" ? 400 : 500;
    return res.status(status).json({ error: "Unable to create payment intent" });
  }
};
