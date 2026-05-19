---
title: "node/lib/NodeCore/commands/LoginCommand.cpp"
---

# node/lib/NodeCore/commands/LoginCommand.cpp

File ini mengimplementasikan command `login`.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/commands/LoginCommand.cpp` |
| Komponen | Firmware Node |
| Level | Menengah |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

Command ini memeriksa password terminal. Password di-trim, di-hash SHA-256, dibandingkan constant-time dengan admin password, lalu fallback membandingkan portal password plain text.

## Error Handling

Jika client lockout, argumen kosong, atau password salah, command mengirim error dan mencatat gagal login.

## Catatan Keamanan

Perbandingan admin hash memakai `consttime_equal` agar lebih aman dari timing leak.
