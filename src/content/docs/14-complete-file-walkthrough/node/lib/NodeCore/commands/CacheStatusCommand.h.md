---
title: "node/lib/NodeCore/commands/CacheStatusCommand.h"
---

# node/lib/NodeCore/commands/CacheStatusCommand.h

Header ini mendeklarasikan command `cache`.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/commands/CacheStatusCommand.h` |
| Komponen | Firmware Node |
| Level | Dasar |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

Command `cache` menampilkan status cache data sensor, termasuk RTC, LittleFS, emergency queue, dan perkiraan lama data bisa ditampung.

## Isi Penting

| Bagian | Fungsi |
|---|---|
| `getName_P` | Nama command: `cache`. |
| `helpSection` | Masuk bagian `SENSORS_DATA`. |
| `requiresAuth` | Perlu login. |
| Constructor | Menerima `CacheManager`, `ApiClient`, dan `ConfigManager`. |

## Dependency Internal

`CacheManager` memberi ukuran cache, `ApiClient` memberi status emergency queue, dan `ConfigManager` memberi interval sampling.
