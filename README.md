# GLOBAL PAY

Global Pay is a fintech platform foundation for wallets, payments, transfers, merchants, invoicing and developer APIs.

## Important
This repository is structured for real integrations, but it does **not** enable real-money movement by itself. Production financial services require regulated payment/banking partners, KYC/AML controls, secrets, provider approval and applicable regulatory permissions.

## Architecture
- Next.js App Router + TypeScript
- Provider-agnostic payment adapter
- Double-entry-ready ledger schema
- Transaction state machine
- Idempotency keys
- Server-only provider secrets
- Supabase-ready data layer

## Environment
Copy `.env.example` to `.env.local`. Never expose provider secret keys through `NEXT_PUBLIC_*` variables.


## Authentication
Supabase Auth is wired into the application using the current Next.js SSR pattern. The login and signup pages use password authentication, the dashboard requires an authenticated session, and wallet/transaction queries are scoped by the authenticated user through Row Level Security.

Set these deployment variables:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

The Supabase publishable key is safe for browser use; provider secrets and service-role/secret keys must remain server-side.

## Current production boundary
Authentication and the wallet data layer are real and connected to the Supabase project. Payment processing remains in mock mode until an approved payment provider is configured with server-side credentials and verified webhooks. Do not switch to live money movement until provider approval, KYC/AML, reconciliation and applicable regulatory requirements are in place.
