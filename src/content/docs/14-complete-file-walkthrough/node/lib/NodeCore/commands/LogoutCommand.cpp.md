---
title: "node/lib/NodeCore/commands/LogoutCommand.cpp"
---

# node/lib/NodeCore/commands/LogoutCommand.cpp

File ini mengimplementasikan command `logout`.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/commands/LogoutCommand.cpp` |
| Komponen | Firmware Node |
| Level | Dasar |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

Command ini mengecek apakah client sedang login. Jika iya, statusnya diubah menjadi tidak autentikasi.

## Output

Terminal menerima pesan `You have been logged out.` atau `You were not logged in.`
