---
title: "node/lib/NodeCore/commands/FsStatusCommand.h"
---

# node/lib/NodeCore/commands/FsStatusCommand.h

Header ini mendeklarasikan command `fsstatus`.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/commands/FsStatusCommand.h` |
| Komponen | Firmware Node |
| Level | Dasar |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

`fsstatus` menampilkan statistik penggunaan LittleFS.

## Hubungan dengan File Lain

Implementasinya membaca `LittleFS.info` dan mencetak total byte, used byte, serta persentase.
