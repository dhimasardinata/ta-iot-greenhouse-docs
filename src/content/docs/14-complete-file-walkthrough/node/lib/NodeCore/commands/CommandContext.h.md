---
title: "node/lib/NodeCore/commands/CommandContext.h"
---

# node/lib/NodeCore/commands/CommandContext.h

File ini mendefinisikan data konteks saat command terminal dijalankan.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/commands/CommandContext.h` |
| Komponen | Firmware Node |
| Level | Dasar |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

`CommandContext` membawa argumen command, koneksi WebSocket client yang mengirim command, dan status apakah client sudah login.

## Isi Penting

| Field | Fungsi |
|---|---|
| `args` | Teks setelah nama command. |
| `client` | Client WebSocket yang akan menerima output command. |
| `isAuthenticated` | Status autentikasi terminal. |

## Hubungan dengan File Lain

Semua class turunan `ICommand` menerima `const CommandContext&` di method `execute`.

## Catatan Debugging

Jika command tidak bisa membalas ke terminal, cek apakah `context.client` ada dan masih bisa mengirim.
