---
title: "node/lib/NodeCore/commands/LoginCommand.h"
---

# node/lib/NodeCore/commands/LoginCommand.h

Header ini mendeklarasikan command `login`.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/commands/LoginCommand.h` |
| Komponen | Firmware Node |
| Level | Dasar |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

`login` mengautentikasi terminal agar bisa menjalankan command yang dilindungi.

## Dependency Internal

Command ini memakai `ConfigManager` untuk password dan `DiagnosticsTerminal` untuk status autentikasi per client.
