---
title: "node/lib/NodeCore/commands/GetConfigCommand.h"
---

# node/lib/NodeCore/commands/GetConfigCommand.h

Header ini mendeklarasikan command `getconfig`.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/commands/GetConfigCommand.h` |
| Komponen | Firmware Node |
| Level | Dasar |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

`getconfig` mencetak ringkasan konfigurasi aplikasi, timer, URL, gateway, token state, dan status provisioned.

## Catatan Keamanan

Nilai token dan portal password tidak ditampilkan mentah; output hanya menampilkan statusnya.
