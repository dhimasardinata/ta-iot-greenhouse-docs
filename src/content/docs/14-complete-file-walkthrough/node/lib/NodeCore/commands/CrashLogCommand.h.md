---
title: "node/lib/NodeCore/commands/CrashLogCommand.h"
---

# node/lib/NodeCore/commands/CrashLogCommand.h

Header ini mendeklarasikan command crash log.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/commands/CrashLogCommand.h` |
| Komponen | Firmware Node |
| Level | Dasar |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

File ini berisi dua command: `crashlog` untuk menampilkan riwayat crash dan `clearcrash` untuk menghapusnya.

## Isi Penting

Kedua command masuk bagian `SYSTEM` dan membutuhkan autentikasi karena berhubungan dengan data diagnostik internal perangkat.
