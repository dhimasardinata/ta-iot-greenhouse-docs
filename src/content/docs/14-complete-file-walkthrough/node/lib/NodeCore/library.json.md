---
title: "node/lib/NodeCore/library.json"
---

# node/lib/NodeCore/library.json

File ini adalah metadata library lokal `NodeCore` untuk PlatformIO.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/library.json` |
| Komponen | Firmware Node |
| Level | Pemula |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

File ini bertugas memberi tahu PlatformIO bahwa folder `node/lib/NodeCore/` adalah library lokal bernama `NodeCore`.

## Kenapa File Ini Ada

Node firmware memiliki banyak modul inti di `lib/NodeCore/`. Dengan metadata ini, PlatformIO bisa memperlakukan modul tersebut sebagai library dan mengatur include path serta dependency scanning.

## Isi Penting

| Field | Fungsi |
|---|---|
| `name` | Nama library lokal: `NodeCore`. |
| `version` | Versi metadata library. |
| `description` | Keterangan singkat fungsi library. |
| `build.includeDir` | Folder include utama library. |
| `build.flags` | Tambahan include path. |
| `build.libLDFMode` | Mode pencarian dependency library. |

## Konsep Dasar yang Perlu Dipahami

- Library lokal adalah kumpulan source code yang dipakai project sendiri.
- `includeDir` membantu compiler menemukan header.
- `libLDFMode` membantu PlatformIO menemukan dependency antar file library.

## Error Handling

Tidak ada error handling runtime. Jika konfigurasi file ini salah, efeknya muncul saat build, misalnya header tidak ditemukan atau file library tidak ikut dikompilasi.

## Catatan Debugging

Jika include seperti `api/ApiClient.h` atau `sensor/SensorManager.h` tidak ditemukan, cek metadata library ini dan include path di `platformio.ini`.

## Hubungan dengan Laporan TA

File ini membantu menjelaskan organisasi firmware node: logic utama dipisah dari `src/` ke library lokal agar lebih terstruktur.
