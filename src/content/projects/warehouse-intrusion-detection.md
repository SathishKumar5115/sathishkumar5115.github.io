---
title: Warehouse Intrusion Detection
summary: A low-cost IoT security system for warehouses. A motion sensor and alarm on an ESP32 send real-time alerts to a Flutter app over MQTT.
status: completed
tags: [IoT, ESP32, MQTT, Flutter, Firebase]
order: 9
links:
  repo: https://github.com/SathishKumar5115/Warehouse-Intrusion-Detection
started: 2024-01-01
updated: 2024-04-17
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
