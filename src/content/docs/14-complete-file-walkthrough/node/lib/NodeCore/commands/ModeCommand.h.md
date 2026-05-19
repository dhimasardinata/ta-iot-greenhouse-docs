---
title: "node/lib/NodeCore/commands/ModeCommand.h"
---

# node/lib/NodeCore/commands/ModeCommand.h

Header ini mendeklarasikan command `mode`.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/commands/ModeCommand.h` |
| Komponen | Firmware Node |
| Level | Dasar |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

`mode` menampilkan atau mengubah upload mode: `auto`, `cloud`, atau `edge`.

## Dependency Internal

Command ini memakai `ApiClient` karena mode upload disimpan di API client.
