import { headers } from "next/headers";
import Stripe from "stripe";
import prisma from "@/libs/prismadb";

export const dynamic = "force-dynamic";

const stripe = new Stripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,
  {
    apiVersion: "2024-04-10",
  }
);

export async function POST(req: Request) {
  const buf = await req.text();
  const sig = headers().get("stripe-signature") as string;

  if (!sig) {
    throw new Error("Missing the stripe signature");
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    return new Response("Webhook error " + error, { status: 400 });
  }

  switch (event.type) {
    case "charge.succeeded":
      const charge: any = event.data.object as Stripe.Charge;

      if (typeof charge.payment_intent === "string") {
        await prisma?.order.update({
          where: {
            paymentIntentId: charge.payment_intent,
          },
          data: {
            status: "complete",
            address: {
              set: {
                city: charge.billing_details.address.city,
                country: charge.billing_details.address.country,
                line1: charge.billing_details.address.line1,
                line2: charge.billing_details.address.line2 || " ",
                postal_code: charge.billing_details.address.postal_code,
                state: charge.billing_details.address.state,
              },
            },
          },
        });
      }
      break;
    default:
      console.log("Unhandled Event Type:" + event.type);
  }

  return new Response("OK", { status: 200 });
}
