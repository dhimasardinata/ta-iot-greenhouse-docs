---
title: "node/lib/NodeCore/commands/FactoryResetCommand.cpp"
---

# node/lib/NodeCore/commands/FactoryResetCommand.cpp

File ini mengimplementasikan command `factoryreset`.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/commands/FactoryResetCommand.cpp` |
| Komponen | Firmware Node |
| Level | Menengah |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

Command ini menjalankan reset pabrik hanya jika operator memberi konfirmasi `yes` atau `confirm`.

## Alur Kerja

1. Tolak jika argumen belum konfirmasi.
2. Reset cache RAM agar tidak ada write saat format.
3. Panggil `ConfigManager::factoryReset`.
4. Jika sukses, bersihkan `BootGuard` dan reboot.
5. Jika gagal, minta operator reboot manual dan coba format filesystem.

## Catatan Debugging

Jika perangkat terus masuk boot guard setelah reset, perhatikan bahwa file ini memanggil `BootGuard::clear()` saat reset sukses.
