---
title: "node/lib/NodeCore/commands/SetGatewayCommand.cpp"
---

# node/lib/NodeCore/commands/SetGatewayCommand.cpp

File ini mengimplementasikan command `setgateway`.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/commands/SetGatewayCommand.cpp` |
| Komponen | Firmware Node |
| Level | Lanjutan |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

Command ini bisa menampilkan semua gateway, menampilkan field tertentu, mengatur host/IP, mengembalikan default, atau menghapus override gateway.

## Validasi

Host tidak boleh berisi protocol, path, port, slash, backslash, karakter kontrol, atau string kosong. IP harus valid sebagai IPv4.

## Error Handling

Argumen salah, host terlalu panjang, IP terlalu panjang, host invalid, IP invalid, atau save gagal semuanya menghasilkan pesan error tanpa mengubah state lebih lanjut.

## Hubungan dengan Laporan TA

File ini menjelaskan cara node diarahkan ke gateway lokal yang benar untuk tiap greenhouse.
