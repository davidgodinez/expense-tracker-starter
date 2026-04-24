# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project context

Starter project for a Claude Code course (codewithmosh.com). Per the README, it "intentionally has a bug, poor UI, and messy code — all of which we fix together throughout the course." Do not treat existing quirks as conventions to preserve; they are teaching material.

## Commands

```bash
npm install
npm run dev       # Vite dev server at http://localhost:5173
npm run build     # production build to dist/
npm run preview   # serve the built bundle
npm run lint      # eslint over **/*.{js,jsx}
```

No test framework is configured.

## Toolchain requirements

- Vite 7 requires **Node.js ≥20.19 or ≥22.12**. Running on Node 18 fails at dev-server startup with `crypto.hash is not a function`.

## Architecture

- Single-component React 19 app. All UI, state, derived totals, filters, and the add-transaction form live in `src/App.jsx`. `src/main.jsx` mounts it in `StrictMode`.
- Transactions are held in `useState` as an in-memory seed array — there is no persistence, routing, or API layer.
- `amount` is stored as a **string** (from the `<input type="number">` value). The income/expense reducers do `sum + t.amount`, which concatenates rather than sums — this is the intentional bug referenced in the README. Keep this in mind when touching totals, filters, or new features that read `amount`.

## ESLint specifics

Flat config in `eslint.config.js`. `no-unused-vars` is configured with `varsIgnorePattern: '^[A-Z_]'`, so unused identifiers starting with an uppercase letter or underscore (e.g. imported components, constants) will not error.
