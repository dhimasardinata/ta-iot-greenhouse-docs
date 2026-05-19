---
title: "node/lib/NodeCore/commands/WifiListCommand.cpp"
---

# node/lib/NodeCore/commands/WifiListCommand.cpp

File ini mengimplementasikan command `wifilist`.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/commands/WifiListCommand.cpp` |
| Komponen | Firmware Node |
| Level | Menengah |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

Command ini menampilkan SSID yang sedang tersambung, RSSI, jaringan built-in primary/secondary, dan daftar credential yang disimpan user.

## Catatan Debugging

Gunakan command ini untuk melihat apakah node mengenali jaringan yang diharapkan dan apakah jaringan tersebut tersedia menurut cache scan.
