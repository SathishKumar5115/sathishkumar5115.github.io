---
title: Overlord
tag: tools
order: 6
summary: "A multi-purpose Discord bot with a virtual economy, games and moderation tools, used by 6,000+ people across 20+ servers."
status: "Completed"
started: "June 2022"
stack: ["Python", "discord.py", "MongoDB", "Flask"]
featured: false
links:
  repo: https://github.com/SathishKumar5115/Discord_Py_Overlord
---

## Problem

Small Discord communities want fun features (games, a currency to earn and spend) and moderation help, without stitching together several bots.

## Approach

- One bot built with Python and discord.py: a virtual currency system, games like tic-tac-toe, GIFs and moderation tools.
- MongoDB for user data and balances; hosted on Heroku with a small Flask service.
- At its peak it served 6,000+ users across 20+ servers, handling around 50,000 commands a day with 99.8% uptime.

## Key decisions

- **Open source for beginners.** The repository doubles as a starting point for people learning to contribute to open source, with step-by-step setup instructions.
- **One bot, many features.** Communities install one thing instead of several.

## What I would change

I would add automated tests and structured logging; most bugs were found by users, not by me.
