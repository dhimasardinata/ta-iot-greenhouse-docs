---
title: "node/lib/NodeCore/commands/CheckUpdateCommand.h"
---

# node/lib/NodeCore/commands/CheckUpdateCommand.h

Header ini mendeklarasikan command `checkupdate`.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/commands/CheckUpdateCommand.h` |
| Komponen | Firmware Node |
| Level | Dasar |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

`checkupdate` memaksa firmware menjadwalkan pengecekan OTA.

## Isi Penting

Command ini membutuhkan `OtaManager`, `WifiManager`, dan `NtpClient` karena pengecekan OTA perlu jaringan dan waktu yang sudah sinkron.

## Catatan Keamanan

Command ini perlu autentikasi karena bisa memicu proses update firmware.
