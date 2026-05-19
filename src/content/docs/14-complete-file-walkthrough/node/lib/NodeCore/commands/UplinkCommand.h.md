---
title: "node/lib/NodeCore/commands/UplinkCommand.h"
---

# node/lib/NodeCore/commands/UplinkCommand.h

Header ini mendeklarasikan command `uplink`.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/commands/UplinkCommand.h` |
| Komponen | Firmware Node |
| Level | Dasar |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

`uplink` menampilkan atau mengubah jalur cloud upload: auto, direct, atau relay.

## Dependency Internal

Command ini memakai `ConfigManager` untuk menyimpan mode dan `ApiClient` untuk membaca route aktif.
