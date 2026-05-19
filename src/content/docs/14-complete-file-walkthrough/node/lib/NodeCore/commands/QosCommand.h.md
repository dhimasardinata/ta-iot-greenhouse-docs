---
title: "node/lib/NodeCore/commands/QosCommand.h"
---

# node/lib/NodeCore/commands/QosCommand.h

Header ini mendeklarasikan command QoS upload dan OTA.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/commands/QosCommand.h` |
| Komponen | Firmware Node |
| Level | Dasar |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

File ini menyediakan `qosupload` untuk test API data dan `qosota` untuk test API firmware update.

## Dependency Internal

Kedua command menerima `ApiClient` karena pengujian QoS dijalankan oleh modul API.
