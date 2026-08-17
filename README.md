# Soko — Handmade Goods Marketplace

Soko is a static online shop for Kenyan artisan goods — woven baskets, kitenge textiles, beaded jewellery, ceramics, woodwork and leatherwork. Built as a mini-project demonstrating a professional Git/GitHub workflow: milestones, issues, a Kanban board, branch protection, Conventional Commits, pull requests, resolved merge conflicts, and continuous deployment via GitHub Pages.

**Live site:** [https://is-project-2026.github.io/onlineshop-168865/](https://is-project-2026.github.io/onlineshop-168865/)

## Features

- Product catalogue rendered from a shared JS data file (`js/products.js`)
- Cart with add / update quantity / remove, persisted in `localStorage` (`js/cart.js`) — no backend required, survives page reloads
- Checkout flow with client-side form validation and an order confirmation state that clears the cart
- Fully responsive layout — nav collapses to just the cart badge on small screens
- Visible keyboard focus states throughout, including fixes for a clipped outline on add-to-cart buttons and a low-contrast outline on the cart link
- `prefers-reduced-motion` respected for anyone with that OS setting on

## Pages

| Page | Purpose |
|---|---|
| `index.html` | Home page — hero and full product grid |
| `cart.html` | View and edit basket contents, running total |
| `checkout.html` | Delivery details form and order confirmation |
| `about.html` | Project and mission description |

## Technologies used

- HTML5 / CSS3 (custom properties, `clamp()`, CSS Grid, Flexbox, media queries)
- Vanilla JavaScript (ES6+, `localStorage` API — no framework, no build step)
- Google Fonts: Fraunces, Work Sans, IBM Plex Mono
- GitHub Pages for deployment
- Git / GitHub for version control, project management and CI/CD

## Project management

This repository uses GitHub Milestones, Issues, and a Kanban Project Board to track development across three phases:

1. **Setup & Catalogue** — repo scaffolding, product data, home page grid, hero and card styling
2. **Cart & Checkout** — cart logic, localStorage persistence, cart page UI, checkout form, order confirmation
3. **Polish & Deployment** — responsive nav, keyboard focus fixes, GitHub Pages deployment, written submission

See the **Issues**, **Milestones**, and **Projects** tabs of this repository for the full task breakdown, and the commit history for the Conventional Commits used across `feat`, `style`, `fix`, and `docs` types.

## Running locally

No build step is required. Clone the repo and open `index.html` in a browser, or serve it locally:

```bash
git clone https://github.com/IS-PROJECT-2026/onlineshop-168865.git
cd onlineshop-168865
python3 -m http.server 8000
# visit http://localhost:8000
```

## Project structure

```
onlineshop-168865/
├── index.html
├── cart.html
├── checkout.html
├── about.html
├── css/
│   └── style.css
├── js/
│   ├── products.js
│   └── cart.js
├── evidence/          # merge conflict screenshots
├── assets/
├── submission.md       # written assessment + conflict write-ups
└── README.md
```

## Merge conflict evidence

Screenshots documenting three merge conflicts (each from a distinct cause) and their resolutions are in [`/evidence`](./evidence). Details and cause explanations are in [`submission.md`](./submission.md).

## Author

Ian Chomba — Strathmore University, admission no. 168865