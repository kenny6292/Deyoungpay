import { MockPaymentAdapter } from "./mock";
import type { PaymentAdapter, PaymentProvider } from "./types";
export function getPaymentAdapter(provider=(process.env.PAYMENT_PROVIDER||"mock") as PaymentProvider):PaymentAdapter { if(provider==="mock") return new MockPaymentAdapter(); throw new Error(`Payment provider "${provider}" is not configured. Add a server-side adapter before enabling live payments.`); }
