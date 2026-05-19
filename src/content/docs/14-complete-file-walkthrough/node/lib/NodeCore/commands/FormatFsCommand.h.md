---
title: "node/lib/NodeCore/commands/FormatFsCommand.h"
---

# node/lib/NodeCore/commands/FormatFsCommand.h

Header ini mendeklarasikan command `format`.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/commands/FormatFsCommand.h` |
| Komponen | Firmware Node |
| Level | Menengah |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

`format` adalah command sistem untuk memformat LittleFS dan menghapus semua file.

## Catatan Keamanan

Command ini destruktif dan wajib autentikasi. Implementasi meminta konfirmasi sebelum format.
