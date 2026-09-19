export type PaymentProvider = "mock" | "paystack" | "flutterwave" | "stripe";
export type PaymentStatus = "pending" | "processing" | "completed" | "failed" | "reversed" | "refunded";
export type Currency = "USD" | "EUR" | "GBP" | "NGN";
export interface CreatePaymentInput { amountMinor:number; currency:Currency; reference:string; email:string; metadata?:Record<string,string>; }
export interface PaymentResult { provider:PaymentProvider; providerReference:string; status:PaymentStatus; amountMinor:number; currency:Currency; }
export interface PaymentAdapter { createPayment(input:CreatePaymentInput):Promise<PaymentResult>; verifyPayment(reference:string):Promise<PaymentResult>; }
