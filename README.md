# NorthStar CAD Bank

> **Portfolio prototype using seeded demo data. No real banking, authentication, payments, or customer information.**

A Canadian online banking front-end prototype built with AngularJS and Node.js. Designed to demonstrate financial dashboard UX, multi-screen product flows, and CAD-first banking interface design.

**Live demo:** https://prajit-parmar.github.io/northstar-cad-bank/

---

## Why I Built This

Most portfolio projects pick a safe problem. I wanted to tackle something harder — a product where the UX decisions actually matter. Banking interfaces need to communicate trust, clarity, and confidence in every interaction. Getting those details right (account labelling, balance hierarchy, transfer confirmation flows) requires product thinking, not just front-end skills. NorthStar is my attempt to build that kind of product from scratch.

---

## Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | AngularJS | Two-way data binding fits stateful banking dashboards |
| Server | Node.js + Express | Local dev server with hot reload on port 3000 |
| Storage | LocalStorage API | No database needed for a demo prototype |
| Styling | CSS3 (custom) | Full control over fintech visual language |
| Deploy | GitHub Pages | Static export — no backend required |

---

## Key Features

- **5 seeded demo accounts** — each with unique balances, transaction history, and profile details
- **CAD chequing and savings dashboards** — with real-time balance calculations across transactions
- **Credit card view** — current balance, available credit, and recent charges
- **E-Transfer send and receive** — log out, switch accounts, and the transfer appears in the recipient's history
- **Biometric login toggle** — UI state management demonstrating settings flows
- **FAQ help centre** — structured support content with common banking questions
- **Profile screen** — personal details, notification preferences, and account settings
- **Stateful SPA routing** — clean URL-based navigation between all screens using AngularJS

---

## Demo Accounts

All accounts use the password: `Bank@2026`

| Email | Name |
|---|---|
| `demo@northstar.ca` | Default demo user |
| `maya@northstar.ca` | Maya Singh |
| `liam@northstar.ca` | Liam Thompson |
| `sara@northstar.ca` | Sara Ahmed |
| `noah@northstar.ca` | Noah Williams |

**To test E-Transfer:** Log in as one user, send a transfer to another dummy email, log out, then log in as the recipient. The receiving balance and recent activity will update.

---

## Run Locally

```bash
git clone https://github.com/Prajit-Parmar/northstar-cad-bank.git
cd northstar-cad-bank
node server.js
```

Then open: `http://localhost:3000`

---

## Trade-offs

- **AngularJS over React/Angular** — chosen for its approachable two-way binding model for a first financial prototype. A production version would use React or Angular 17+ with a proper state management layer.
- **LocalStorage over a real backend** — keeps the prototype runnable anywhere without a database setup. Real banking data would use encrypted storage, token-based auth, and a proper API layer.
- **Seeded data over real accounts** — eliminates any privacy or security risk. The trade-off is that balance changes don't persist between sessions on the GitHub Pages deployment (LocalStorage resets).

---

## What I Would Do Differently

- Use React or Next.js for the front-end — better ecosystem, stronger TypeScript support
- Add proper session management and secure token handling for any real auth flow
- Build a REST API layer instead of LocalStorage for persistent account state
- Add end-to-end tests for critical flows (login, transfer, balance display)
- Improve accessibility: better focus management, screen-reader labels on data tables

---

## Project Context

Built as a portfolio project during my Web Development Diploma at Conestoga College (2023–2024). The goal was to demonstrate product-level thinking applied to a high-stakes UX domain — not to ship a real banking product.

**Stack:** AngularJS · Node.js · JavaScript · HTML5 · CSS3 · LocalStorage API
