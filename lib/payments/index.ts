import { MockPaymentAdapter } from "./mock";
import { PaystackPaymentAdapter } from "./paystack";
import type { PaymentAdapter, PaymentProvider } from "./types";
export function getPaymentAdapter(provider=(process.env.PAYMENT_PROVIDER||"mock") as PaymentProvider):PaymentAdapter { if(provider==="mock") return new MockPaymentAdapter(); if(provider==="paystack") return new PaystackPaymentAdapter(); throw new Error(`Payment provider "${provider}" is not configured. Add a server-side adapter before enabling live payments.`); }
