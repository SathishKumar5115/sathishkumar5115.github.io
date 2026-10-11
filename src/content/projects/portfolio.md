---
title: This site
summary: A portfolio and blog built spec-first with an AI coding agent. PRD, tech spec and milestones before code, and every milestone gated by tests.
status: building
track: C
tags: [Astro, accessibility, spec-driven]
featured: true
order: 3
links:
  repo: https://github.com/SathishKumar5115/sathishkumar5115.github.io
started: 2026-10-11
updated: 2026-10-11
---

## Problem

I wanted one place to show my projects and write about what I learn, without vibe coding it. Every decision should be written down and every feature checked by tests.

## Approach

- **Spec first:** a PRD, a technical spec and a milestone plan were accepted before any code.
- **Small milestones:** each one lands as a pull request with acceptance criteria checked in CI, then a human review.
- **Built with Astro** and the Array UI design system, deployed to GitHub Pages for $0.
- **Quality gates in CI:** type checks, colour-contrast tests, browser tests, and accessibility checks in both themes.

## Key decisions

- **Install the design system, but wrap it.** Pages only use wrapper components, so a component can be swapped later without touching pages.
- **Fix what the design system gets wrong.** Some of its colours failed WCAG contrast, so the site's own tokens correct them, enforced by a test.
- **No Tailwind.** The design system is plain CSS; a second styling system would add weight without benefit.
- **The blog stays hidden until the first post.** No empty pages.
