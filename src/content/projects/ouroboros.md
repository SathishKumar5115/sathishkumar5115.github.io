---
title: Ouroboros
tag: security
order: 1
summary: "An SSH honeypot that uses an LLM to answer any command an attacker types, so it is much harder to fingerprint than one with canned responses."
status: "In progress"
started: "June 2025"
stack: ["Python", "Paramiko", "Gemini", "React", "D3.js", "Flask"]
featured: true
links:
  repo: https://github.com/Gin5115/Ouroboros
cover:
  src: /images/projects/ouroboros-dashboard.png
  alt: "Ouroboros dashboard showing login attempts, unique IPs, the attack kill chain, password strength, and the top usernames and passwords attackers tried."
---

## Problem

Traditional honeypots answer a fixed set of commands with hardcoded output. Attackers notice quickly: an unknown command returns nothing useful, and the session ends before you learn anything about their techniques.

## Approach

- **Custom SSH server** built from scratch with Python and Paramiko, posing as a production database host.
- **Adaptive responses:** commands without a static response go to Gemini 2.5 Flash-Lite, which generates realistic terminal output in real time.
- **Automatic classification:** every session is labelled by attack type, skill level and severity, and techniques are mapped to MITRE ATT&CK.
- **Live dashboard** in React and D3.js: world map, heatmap, kill chain and session replay, backed by a Flask API.

## Key decisions

- **Static first, LLM second.** Common commands and the fake filesystem are configured statically; the model only fills the gaps, which keeps responses fast and consistent.
- **Structured logs.** Every event is written as NDJSON, so sessions can be analysed and replayed without the dashboard.
- **Run it isolated.** The honeypot is meant for a separate VM or server, never a machine that matters.

## What I would change

Add an evaluation of how often the model's output gives the honeypot away, instead of judging realism by eye.
