---
title: "node/lib/NodeCore/commands/NetConfigCommand.h"
---

# node/lib/NodeCore/commands/NetConfigCommand.h

Header ini mendeklarasikan command `netconfig`.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/commands/NetConfigCommand.h` |
| Komponen | Firmware Node |
| Level | Dasar |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

`netconfig` menampilkan ringkasan konfigurasi jaringan, URL, token state, gateway, dan mode uplink.

## Dependency Internal

Command ini memakai `ConfigManager` untuk endpoint dan `ApiClient` untuk mode upload/uplink.
