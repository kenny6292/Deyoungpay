import { NextResponse } from "next/server";
import { verifyPaystackSignature } from "@/lib/payments/paystack";

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-paystack-signature");

  try {
    if (!verifyPaystackSignature(rawBody, signature)) {
      return NextResponse.json({ error: "Invalid webhook signature" }, { status: 401 });
    }

    const event = JSON.parse(rawBody) as {
      event?: string;
      data?: {
        reference?: string;
        amount?: number;
        currency?: string;
        status?: string;
      };
    };

    // Paystack recommends acknowledging webhooks quickly. Fulfilment/reconciliation
    // should be idempotent and performed against your own transaction record.
    if (event.event === "charge.success" && event.data?.reference) {
      // The transaction update is intentionally not performed here until
      // SUPABASE_SERVICE_ROLE_KEY is configured for this server-side worker.
      // Never trust the webhook alone for amount/value delivery.
    }

    return NextResponse.json({ received: true });
  } catch {
    return NextResponse.json({ error: "Invalid webhook payload" }, { status: 400 });
  }
}
