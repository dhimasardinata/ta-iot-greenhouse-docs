---
title: "node/lib/NodeCore/commands/SendNowCommand.h"
---

# node/lib/NodeCore/commands/SendNowCommand.h

Header ini mendeklarasikan command `sendnow`.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/commands/SendNowCommand.h` |
| Komponen | Firmware Node |
| Level | Dasar |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

`sendnow` membuat record data dan meminta upload langsung.

## Dependency Internal

Command ini memakai `ApiClient` karena upload langsung dikelola oleh modul API.
