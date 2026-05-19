---
title: "node/include/app/BootManager.h"
---

# node/include/app/BootManager.h

File ini mendeklarasikan class `BootManager`.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/include/app/BootManager.h` |
| Komponen | Firmware Node |
| Level | Pemula |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

File ini memberi tahu firmware bahwa ada fungsi `BootManager::run()` yang bisa dipanggil saat perangkat baru menyala.

## Kenapa File Ini Ada

`main.cpp` perlu memanggil boot manager, tetapi implementasi detailnya ada di `node/src/BootManager.cpp`. Header ini menjadi penghubung antara pemanggil dan implementasi.

## Isi Utama

| Bagian | Fungsi |
|---|---|
| Include guard | Mencegah header dibaca berulang oleh compiler. |
| `class BootManager` | Nama class pengelola boot. |
| `static void run()` | Fungsi yang bisa dipanggil tanpa membuat object `BootManager`. |

## Konsep Dasar yang Perlu Dipahami

- Header file berisi deklarasi.
- `static` pada method class berarti method bisa dipanggil sebagai `BootManager::run()`.
- Implementasi fungsi berada di file `.cpp`.

## Dependency Internal

File ini tidak meng-include dependency lain. Itu membuatnya ringan.

## Error Handling

Tidak ada error handling di header ini. Error handling boot berada di `node/src/BootManager.cpp`.

## Hubungan dengan Laporan TA

File ini terkait dengan rancangan boot firmware node dan struktur pemisahan deklarasi/implementasi C++.
