---
title: Retro
summary: An evidence-based weekly review. It compares what you planned with what you actually did, and learns your real capacity over time.
status: idea
track: A
tags: [agentic, productivity, MCP, evals]
featured: true
order: 1
started: 2026-10-10
updated: 2026-10-11
---

## Problem

People plan constantly (to-do lists, time blocks, goals) but rarely review honestly. When they do, it's from memory, which is biased, so the same mistakes repeat: overcommitting, underestimating tasks, goals quietly abandoned. The weekly review is the most recommended and most skipped productivity habit.

## Approach

Retro gathers evidence of what actually happened (completed and slipped tasks, commits, focus sessions, workouts) and compares it with what was planned. From that it:

- **Calibrates estimates:** "your 'write a post' tasks take 2.5× longer than you plan."
- **Checks off habits automatically** from evidence, e.g. a commit to a side project.
- **Flags stalled projects** and suggests the smallest next step.
- **Drafts next week's plan** to fit your measured capacity. Nothing changes without approval.

It's built as an agent: one collector per data source, a synthesizer that writes the review, review styles as skills, guardrails as hooks, and evals on synthetic weeks with known answers.

## Key decisions

- **Dogfood first.** I'm user #1; the first version is a manual review for a few weeks before any code.
- **Push, not pull.** The review comes to you. Weekly reviews fail when they wait to be opened.
- **Measure only what can be measured.** Calendars show plans, not actuals, so Retro relies on slip rates, carry-over and explicit check-ins.
- **Free to run.** Local-first; inference comes from your own assistant or API key.
