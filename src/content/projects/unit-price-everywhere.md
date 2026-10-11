---
title: Unit Price Everywhere
summary: A browser extension that shows and sorts by price per ounce, pound or count on grocery and shopping sites.
status: idea
track: B
tags: [browser extension, shopping, open source]
featured: true
order: 2
started: 2026-10-11
updated: 2026-10-11
---

## Problem

Is a 24 oz box at $4.29 cheaper than a two-pack of 15 oz at $6.99? Many shopping sites don't show a unit price, show it in mixed units, or don't let you sort by it. The extensions that tried to fix this are abandoned or cover a single store.

## Approach

- Read the size and quantity from each product listing ("2 x 15 oz", "12 ct", "1.5 L"), normalize the units, and show a unit-price badge on every product card.
- Sort and highlight the cheapest per unit on search and category pages.
- Flag when the bigger pack costs more per unit.
- One adapter per store (Walmart, Target, Amazon, Instacart, Kroger, Costco), plus a fallback for any product page that publishes standard product data.

## Key decisions

- **Free, local, no account.** Everything runs in the browser; no data leaves it.
- **No affiliate links, ever.** Trust is the product.
- **Adapters, not "every website".** A handful of stores covers most online grocery shopping; open-source adapters let others add more.
- **Validate before building.** Next step is testing the existing extensions and talking to people who shop online.
