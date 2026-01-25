# Blogify Frontend

This repository contains the Next.js frontend for the Blogify application.

## Prerequisites

- Node.js 18+ (recommended)
- bun (or npm/pnpm/yarn)

## Quick setup

### 1. Install dependencies:

    ```bash
    cd frontend
    bun install
    ```

### 2. Create a `.env` file in the `frontend` folder (see Environment variables below).

### 3. Run the development server:

    ```bash
    bun run dev
    # opens at http://localhost:3000 by default
    ```

## Available scripts (from `package.json`)

- `bun run dev` — run Next.js in development mode
- `bun run build` — build the app for production
- `bun run start` — start the production server (requires a prior `build`)
- `bun run lint` — run ESLint

Example: build and start production server:

```bash
bun run build
bun run start
```

**Note:** Next.js reads `NEXT_PUBLIC_` environment variables at build time. If you change `NEXT_PUBLIC_*` values, rebuild the app for changes to take effect in production.

## Environment variables

Create a `.env` file at the root of the `frontend` folder with the variables below.

- `NEXT_PUBLIC_BASE_URL` — The base URL of the backend API. Example:

  ```dotenv
  NEXT_PUBLIC_BASE_URL=http://localhost:4000
  ```

  This variable is used by the frontend to call the backend API (client-side). Ensure the backend is running and accessible at this URL when developing locally.

## Ports & host

- Development server defaults to port `3000`. To change the port when running locally, set the `PORT` environment variable before running `bun run dev`.

## Common issues / troubleshooting

- If API requests fail, confirm the backend is running and `NEXT_PUBLIC_BASE_URL` is correct.
- For CORS errors, ensure the backend allows requests from the frontend origin (e.g., `http://localhost:3000`).
- If changes to `NEXT_PUBLIC_BASE_URL` don't appear in production, rebuild the frontend.

## Useful links

- Next.js: https://nextjs.org/docs
- bun: https://bun.sh/docs/quickstart