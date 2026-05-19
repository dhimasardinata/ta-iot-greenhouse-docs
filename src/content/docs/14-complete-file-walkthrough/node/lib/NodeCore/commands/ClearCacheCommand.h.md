---
title: "node/lib/NodeCore/commands/ClearCacheCommand.h"
---

# node/lib/NodeCore/commands/ClearCacheCommand.h

Header ini mendeklarasikan command `clearcache`.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/commands/ClearCacheCommand.h` |
| Komponen | Firmware Node |
| Level | Dasar |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

Command `clearcache` menghapus cache data sensor yang belum terkirim.

## Isi Penting

Command ini memakai `CacheManager` dan membutuhkan autentikasi. Karena bersifat destruktif, implementasinya meminta konfirmasi.
