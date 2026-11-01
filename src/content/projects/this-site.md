---
title: This site
tag: tools
order: 7
summary: "My portfolio and blog: designed on a canvas before any code, then built in small pull requests and tested on every change."
status: "In progress"
started: "October 2026"
stack: ["Astro", "TypeScript", "CSS", "Playwright"]
featured: false
links:
  repo: https://github.com/SathishKumar5115/sathishkumar5115.github.io
---

## Problem

I wanted one place to show my projects and write about what I learn, without vibe coding it. The first version was coded before it was designed, and it showed, so I archived it and started again.

## Approach

- **Design first:** every page was drawn on a canvas, in light and dark and at phone width, and signed off before any code.
- **Spec first:** a requirements document, a technical spec and an eight-step build plan were accepted before the first line of code.
- **Small pull requests,** one at a time, each with checks that must pass before it merges.
- **Static site** on Astro with plain CSS, deployed to GitHub Pages for $0.

## Key decisions

- **Two palettes, one config line.** Teal is the default and indigo is ready; changing it for everyone is one line and a deploy.
- **Accessibility as a test.** Colour contrast is calculated for every palette and mode, and axe checks every page type in all four.
- **Own CSS, no framework.** The design is small enough that a framework would add weight without benefit.
- **An empty blog on purpose.** It stays empty until there is a post worth writing carefully.

## What I would change

The project pages have no screenshots yet except Ouroboros. I would add one real image or diagram to each.
