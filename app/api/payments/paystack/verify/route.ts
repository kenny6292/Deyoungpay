import { NextResponse } from "next/server";
import { PaystackPaymentAdapter } from "@/lib/payments/paystack";

export async function GET(request: Request) {
  const reference = new URL(request.url).searchParams.get("reference");
  if (!reference) {
    return NextResponse.json({ error: "reference is required" }, { status: 400 });
  }

  try {
    const result = await new PaystackPaymentAdapter().verifyPayment(reference);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Payment verification failed" },
      { status: 502 },
    );
  }
}
