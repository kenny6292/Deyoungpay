import type { CreatePaymentInput, PaymentAdapter, PaymentResult } from "./types";
export class MockPaymentAdapter implements PaymentAdapter {
 async createPayment(input:CreatePaymentInput):Promise<PaymentResult>{return {provider:"mock",providerReference:`demo_${input.reference}`,status:"pending",amountMinor:input.amountMinor,currency:input.currency};}
 async verifyPayment(reference:string):Promise<PaymentResult>{return {provider:"mock",providerReference:reference,status:"completed",amountMinor:0,currency:"USD"};}
}
