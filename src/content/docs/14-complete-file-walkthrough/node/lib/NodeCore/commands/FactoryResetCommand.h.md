---
title: "node/lib/NodeCore/commands/FactoryResetCommand.h"
---

# node/lib/NodeCore/commands/FactoryResetCommand.h

Header ini mendeklarasikan command `factoryreset`.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/commands/FactoryResetCommand.h` |
| Komponen | Firmware Node |
| Level | Menengah |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

`factoryreset` menghapus konfigurasi dan data lalu reboot. Command ini memakai `ConfigManager` dan `CacheManager`.

## Catatan Keamanan

Command ini sangat destruktif, masuk bagian `SYSTEM`, dan wajib autentikasi.
