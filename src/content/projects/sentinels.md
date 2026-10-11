---
title: Sentinels
summary: A self-hosted network intrusion detection system with a heuristic engine and a machine-learning model running side by side, plus a real-time dashboard.
status: completed
tags: [security, Python, Scapy, Flask, machine learning]
featured: true
order: 6
links:
  repo: https://github.com/Gin5115/Sentinels
started: 2025-12-01
updated: 2026-04-16
---

## Problem

Small networks rarely have intrusion detection: commercial tools are heavy, and simple packet sniffers show traffic without telling you whether it's an attack.

## Approach

- **Packet capture** with Scapy on the local interface, every packet logged and pushed live to the browser over Socket.IO.
- **Two detection layers in parallel:**
  - a heuristic engine with five stateful rules over a 5-second sliding window (SYN, UDP and ICMP floods, port scans, blacklisted ports);
  - a Random Forest classifier (200 trees) on CICIDS-2017 flow features, detecting DoS, port scans, brute force, botnets, web attacks and more.
- **Dashboard:** packet rates, protocol mix, top talkers, a geo-IP world map, passive device discovery and a live packet feed that handles 50,000+ packets.
- **Attack simulation** replays CICIDS-2017-style traffic to test both layers end to end.

## Key decisions

- **Heuristics and ML side by side,** each switchable at runtime: rules catch obvious floods instantly, the model catches patterns rules miss.
- **Passive only.** Device discovery never sends ARP scans or probes.
- **Retrain locally.** A script generates synthetic flows matched to the tracker's feature scales, so the model can be retrained without downloading a dataset.
