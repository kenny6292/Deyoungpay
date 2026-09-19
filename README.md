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
