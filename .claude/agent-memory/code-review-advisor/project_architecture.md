---
name: Project Architecture
description: Transaction shape, component ownership, key invariants to preserve during reviews
type: project
---

Transaction object shape: `{ id, date (ISO string), description, amount (Number), type ("income"|"expense"), category (string) }`

**Why:** amount MUST be Number — Summary derives totals numerically. String concatenation silently breaks totals.
**How to apply:** Flag any code path that stores amount as a string or skips `Number()` coercion.

State ownership:
- `transactions` array lives in `App.jsx` useState
- `TransactionForm` owns its own form field state; builds the transaction object and calls `onAdd(transaction)`
- `TransactionList` owns `filterType` and `filterCategory` state locally
- `CATEGORIES` is a module-level constant in `App.jsx`, passed as a prop to `TransactionForm` and `TransactionList`

Callbacks: `onAdd(transaction)` from App → TransactionForm; `onDelete(id)` from App → TransactionList (guarded by window.confirm).

Seed data bug (pre-existing, intentional teaching material): transaction id=4 "Freelance Work" is type="expense" but category="salary" — likely an intentional seeded bug.

Known dead code as of Bauhaus redesign (2026-04-25):
- `@keyframes spin-slow` and `@keyframes draw-stroke` defined in App.css but never referenced
- CSS variable `--black: #111111` defined in index.css but never used (duplicates `--ink`)
