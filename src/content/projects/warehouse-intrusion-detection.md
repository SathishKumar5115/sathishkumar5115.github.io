---
title: Warehouse Intrusion Detection
tag: security
order: 5
summary: "A low-cost IoT security system for warehouses: a motion sensor and alarm on an ESP32 send real-time alerts to a Flutter app over MQTT."
status: "Completed"
started: "January 2024"
stack: ["ESP32", "C++", "MQTT", "Flutter", "Firebase"]
featured: false
links:
  repo: https://github.com/SathishKumar5115/Warehouse-Intrusion-Detection
---

## Problem

Many warehouses in India still rely on locks and keys. A break-in is often discovered only the next morning, and commercial alarm systems are too expensive for small operators.

## Approach

- **Hardware:** an ESP32 with a PIR motion sensor, buzzer and LED at each entry point.
- **Alerts:** break-ins trigger the local alarm and a notification to the owner's phone over MQTT (EMQX cloud).
- **App** in Flutter with Firebase: login, admin registration, entry-point navigation, and an unlock button so authorised entries don't trigger the alarm.

## Key decisions

- **Cheap, off-the-shelf parts,** so a small warehouse can afford it.
- **MQTT for alerts:** lightweight and reliable on poor connections.
- **Built as a team** with two collaborators.

## What I would change

It was never tested in a real warehouse. A field trial would show false alarms and battery life, which the lab setup could not.
