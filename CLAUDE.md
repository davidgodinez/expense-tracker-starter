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

- React 19 app mounted by `src/main.jsx` in `StrictMode`. `src/App.jsx` is the only stateful owner of the `transactions` list and composes three child components from `src/components/`:
  - `Summary` — receives `transactions` and derives `totalIncome` / `totalExpenses` / `balance` itself.
  - `TransactionForm` — owns its own form fields (description, amount, type, category) and reports completed transactions back to `App` via an `onAdd(transaction)` callback. The form, not the parent, builds the new transaction object (id, ISO date, numeric amount).
  - `TransactionList` — owns its own filter state (`filterType`, `filterCategory`) and renders the table. Receives an `onDelete(id)` callback from `App` for the per-row Delete button (guarded by `window.confirm`).
- The `CATEGORIES` list is a module-level constant in `App.jsx` and is passed as a prop to both `TransactionForm` and `TransactionList`. Add new categories there.
- Transactions are held in `useState` as an in-memory seed array — there is no persistence, routing, or API layer.
- `amount` is stored as a **number**. `<input type="number">` returns a string, so `TransactionForm` coerces with `Number(amount)` before calling `onAdd` — preserve this in any new write path so `Summary`'s totals keep summing numerically.

## ESLint specifics

Flat config in `eslint.config.js`. `no-unused-vars` is configured with `varsIgnorePattern: '^[A-Z_]'`, so unused identifiers starting with an uppercase letter or underscore (e.g. imported components, constants) will not error.
