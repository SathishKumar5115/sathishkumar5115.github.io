---
title: Sentinels
tag: security
order: 3
summary: "A self-hosted network intrusion detection system with a heuristic engine and a machine-learning model running side by side, plus a real-time dashboard."
status: "Completed"
started: "December 2025"
stack: ["Python", "Scapy", "Flask", "Socket.IO", "scikit-learn", "D3.js"]
featured: true
links:
  repo: https://github.com/Gin5115/Sentinels
---

## Problem

Small networks rarely have intrusion detection: commercial tools are heavy, and simple packet sniffers show traffic without telling you whether it is an attack.

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

## What I would change

The model is trained on a public dataset, so its accuracy on a real home network is unmeasured. I would record and label real traffic to test it.
