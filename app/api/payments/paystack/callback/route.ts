import { NextResponse } from "next/server";
import { PaystackPaymentAdapter } from "@/lib/payments/paystack";

export async function GET(request: Request) {
  const reference = new URL(request.url).searchParams.get("reference");
  if (!reference) {
    return NextResponse.json({ error: "Missing payment reference" }, { status: 400 });
  }

  try {
    const result = await new PaystackPaymentAdapter().verifyPayment(reference);
    const appUrl = process.env.NEXT_PUBLIC_APP_URL;
    if (!appUrl) return NextResponse.json(result);

    const url = new URL("/dashboard", appUrl);
    url.searchParams.set("payment", result.status);
    url.searchParams.set("reference", reference);
    return NextResponse.redirect(url);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Payment callback verification failed" },
      { status: 502 },
    );
  }
}
