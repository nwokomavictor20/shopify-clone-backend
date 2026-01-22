import express from "express";
import Stripe from "stripe";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.post("/create-checkout", async (req, res) => {
  const { items } = req.body;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: items,
    mode: "payment",
    success_url: "https://YOUR_STORE_URL?success=true",
    cancel_url: "https://YOUR_STORE_URL?cancel=true"
  });

  res.json({ url: session.url });
});

app.listen(3000, () => console.log("Server running"));
