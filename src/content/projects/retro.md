---
title: Retro
tag: agents
order: 4
summary: "An evidence-based weekly review: it compares what you planned with what you actually did, and learns your real capacity over time."
status: "Stage 0, manual weekly review"
started: "October 2026"
stack: ["Agents", "MCP", "Skills", "Evals"]
featured: false
---

## Problem

People plan constantly (to-do lists, time blocks, goals) but rarely review honestly. When they do, it is from memory, which is biased, so the same mistakes repeat: overcommitting, underestimating tasks, goals quietly abandoned. The weekly review is the most recommended and most skipped productivity habit.

## Approach

Retro gathers evidence of what actually happened (completed and slipped tasks, commits, focus sessions) and compares it with what was planned. From that it calibrates estimates, checks off habits from evidence, flags stalled projects, and drafts next week's plan to fit measured capacity. Nothing changes without approval.

It is built as an agent: one collector per data source, a synthesizer that writes the review, review styles as skills, guardrails as hooks, and evals on synthetic weeks with known answers.

## Key decisions

- **Run it by hand first.** Do the weekly review manually for a few weeks before writing any code, so the code automates something that already works.
- **Push, not pull.** The review comes to you. Weekly reviews fail when they wait to be opened.
- **Measure only what can be measured.** Calendars show plans, not actuals, so Retro relies on slip rates, carry-over and explicit check-ins.
- **Free to run.** Local-first; inference comes from your own assistant or API key.

## What I would change

Nothing yet, because no code exists. The manual weeks will show which parts of the review are worth automating.
