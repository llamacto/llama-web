# Agent Guide

This project is a Next.js scaffold optimized for fast feature delivery with a clean separation between:

- A **public website** that can use SSR for SEO
- A **console/admin app** that can stay client-rendered

The key productivity feature is a built-in **BFF (Backend For Frontend)** layer using Next.js Route Handlers, enabling **httpOnly cookie sessions** and a single same-origin API surface.

## What has been implemented

### Cookie-based authentication (httpOnly)

Authentication is handled by internal endpoints under `/api/auth/*`:

- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`
- `POST /api/auth/register`
- `POST /api/auth/setup`
- `GET /api/auth/setup-status`
- `GET /api/auth/system-features`

All successful responses use a consistent envelope:

- `{ "data": ... }`

### Generic backend proxy

A generic proxy exists at:

- `/api/backend/[...path]`

It forwards requests to the upstream backend and automatically injects:

- `Authorization: Bearer <token>` from **httpOnly cookies**

### Transport-only HTTP client

`src/http/request.ts` is now transport-only:

- No `localStorage` token management
- No redirects
- No backend-specific response normalization

This keeps the HTTP layer reusable across projects.

### Service + store wiring

- `src/services/auth.ts` calls the BFF endpoints (`/api/auth/*`) and the proxy (`/api/backend/*`)
- `src/store/auth-store.ts` uses `/api/auth/me` to probe session state (cookie-driven)
- `src/components/features/auth/login-form.tsx` passes the `remember` flag to `login(...)`

## Why this improves developer efficiency

- **No CORS pain**: the browser only talks to same-origin `/api/*`.
- **SSR-friendly auth**: session is stored in httpOnly cookies; server components and Route Handlers can read it.
- **Less repetition**: auth/session logic is centralized in one BFF layer.
- **Safer by default**: tokens never touch `localStorage`.
- **Consistent DX**: internal APIs return `{ data: ... }`, so client code is predictable.

## How to use (daily workflow)

### Environment variables

You must configure the upstream backend base URL (server-side):

- `UPSTREAM_API_BASE` (recommended)

Fallback (backward compatible):

- `ZGI_API_BASE`
- `NEXT_PUBLIC_UPSTREAM_API_BASE`
- `NEXT_PUBLIC_ZGI_API_BASE`

Optional:

- `NEXT_PUBLIC_API_URL` (browser baseURL, defaults to `/api`)
- `INTERNAL_API_URL` (server-side absolute URL for axios, defaults to `http://localhost:3000/api`)

### Authentication flow

- The login page posts to `/api/auth/login`.
- The Route Handler calls the upstream login endpoint, then fetches the profile.
- The Route Handler sets httpOnly cookies:
  - `llama_web_access_token`
  - `llama_web_refresh_token` (if provided)

### Calling upstream APIs from the client

Prefer calling the proxy so cookies are used and tokens remain server-managed:

- `GET /api/backend/console/api/account-ex/list?page=1&limit=30`

In client code, this is already supported via `AuthService.getAccountList()`.

### SSR vs CSR guidance

- **Public website**: can use SSR/Server Components. For authenticated server reads, prefer calling internal endpoints via `fetch` to `/api/auth/me` or through server-only helpers.
- **Console/admin**: keep CSR. Use Zustand + React Query and call `/api/*` endpoints.

## Codebase conventions (for humans and AI agents)

- Use **pnpm** for dependency management.
- Do **not** start or restart the dev server automatically; the environment is hot-updated.
- Keep code comments in **English only**.
- Prefer feature code to depend on **services** or **hooks**, not directly on low-level HTTP.
- Tests must be placed under the `tests/` directory (do not put tests in business modules).

## Notes

If you have a specific reference link for the `agents.md` format you want to match, share it and this document can be aligned exactly with that style.
