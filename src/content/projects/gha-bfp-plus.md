---
title: GHA-BFP+
summary: A GitHub Actions bot that uses a trained model to flag CI runs that are likely to fail, so developers don't wait on doomed builds.
status: completed
tags: [machine learning, GitHub Actions, Python, Flask]
order: 7
links:
  repo: https://github.com/Gin5115/gha-bfp-plus
started: 2025-09-01
updated: 2026-03-06
---

## Problem

Developers push a change and wait minutes for CI, only to see it fail for a predictable reason. Knowing early that a run is likely to fail saves that wait.

## Approach

- A machine-learning model trained on past CI runs predicts the chance that a new run will fail.
- The bot runs in GitHub Actions and flags risky runs, with a small Flask service behind it.

## Key decisions

- **Advise, don't block.** The bot flags runs; developers decide what to do.
- **Live where developers already are.** It's a GitHub Actions bot, not a separate dashboard.
