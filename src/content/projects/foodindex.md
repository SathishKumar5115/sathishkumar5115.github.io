---
title: FoodIndex
tag: data
order: 2
summary: "A hyper-local marketplace where restaurants sell surplus food at prices that drop automatically as pickup time approaches."
status: "Completed"
started: "January 2026"
stack: ["MongoDB", "Express", "React", "Node.js", "Vite", "Tailwind CSS"]
featured: true
links:
  repo: https://github.com/Gin5115/FoodIndex
---

## Problem

Restaurants and cafés throw away good food at closing time, while nearby people would happily buy it at a discount. Fixed discounts don't work: too small and nothing sells, too large too early and the seller loses money.

## Approach

- **Live pricing engine:** a reverse Dutch auction. Every time a listing is fetched, a 4-factor algorithm computes the price for that moment: time decay (40%), stock pressure (30%), demand (20%) and urgency (10%).
- **Nearby listings** through a MongoDB geospatial query (within 5 km).
- **Demand signals:** view and watcher counts feed the price in real time.
- **Dashboards** for sellers (inventory, orders) and buyers (order history, savings); JWT authentication with buyer and seller roles.

## Key decisions

- **Never store the price.** It is computed on every request, so it can't go stale; purchases record the price paid, which also powers the price-history chart.
- **Re-check the cart.** When the cart loads, it re-fetches live prices and flags items that expired or changed price.

## What I would change

The four factor weights are my own guesses. They should be tuned against real purchase data.
