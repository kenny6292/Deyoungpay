import crypto from "node:crypto";
import type { CreatePaymentInput, PaymentAdapter, PaymentResult } from "./types";

const PAYSTACK_API = "https://api.paystack.co";

type PaystackResponse<T> = {
  status: boolean;
  message: string;
  data?: T;
};

type InitializeData = {
  authorization_url: string;
  access_code: string;
  reference: string;
};

type VerifyData = {
  id: number;
  status: string;
  reference: string;
  amount: number;
  currency: string;
};

function getSecretKey() {
  const key = process.env.PAYSTACK_SECRET_KEY;
  if (!key) throw new Error("PAYSTACK_SECRET_KEY is not configured.");
  return key;
}

async function paystack<T>(path: string, init: RequestInit = {}): Promise<PaystackResponse<T>> {
  const response = await fetch(`${PAYSTACK_API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${getSecretKey()}`,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
    cache: "no-store",
  });

  const body = (await response.json()) as PaystackResponse<T>;
  if (!response.ok || !body.status) {
    throw new Error(body.message || `Paystack request failed with status ${response.status}`);
  }
  return body;
}

export class PaystackPaymentAdapter implements PaymentAdapter {
  async createPayment(input: CreatePaymentInput): Promise<PaymentResult> {
    const body = await paystack<InitializeData>("/transaction/initialize", {
      method: "POST",
      body: JSON.stringify({
        email: input.email,
        amount: String(input.amountMinor),
        currency: input.currency,
        reference: input.reference,
        callback_url: process.env.NEXT_PUBLIC_APP_URL
          ? `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/paystack/callback`
          : undefined,
        metadata: input.metadata || {},
      }),
    });

    if (!body.data) throw new Error("Paystack did not return checkout data.");

    return {
      provider: "paystack",
      providerReference: body.data.reference,
      status: "pending",
      amountMinor: input.amountMinor,
      currency: input.currency,
      checkoutUrl: body.data.authorization_url,
      accessCode: body.data.access_code,
    };
  }

  async verifyPayment(reference: string): Promise<PaymentResult> {
    const body = await paystack<VerifyData>(
      `/transaction/verify/${encodeURIComponent(reference)}`,
      { method: "GET" },
    );

    if (!body.data) throw new Error("Paystack did not return verification data.");

    const status =
      body.data.status === "success"
        ? "completed"
        : ["failed", "reversed"].includes(body.data.status)
          ? body.data.status
          : "processing";

    return {
      provider: "paystack",
      providerReference: body.data.reference,
      status,
      amountMinor: body.data.amount,
      currency: body.data.currency as PaymentResult["currency"],
    };
  }
}

export function verifyPaystackSignature(rawBody: string, signature: string | null) {
  const secret = getSecretKey();
  if (!signature) return false;

  const expected = crypto
    .createHmac("sha512", secret)
    .update(rawBody)
    .digest("hex");

  const a = Buffer.from(expected, "utf8");
  const b = Buffer.from(signature, "utf8");
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
