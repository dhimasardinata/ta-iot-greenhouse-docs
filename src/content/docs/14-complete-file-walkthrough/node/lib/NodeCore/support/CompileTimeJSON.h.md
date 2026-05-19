---
title: "node/lib/NodeCore/support/CompileTimeJSON.h"
---

# node/lib/NodeCore/support/CompileTimeJSON.h

File ini membantu validasi atau pembentukan JSON pada waktu compile sehingga sebagian kesalahan format bisa ditangkap lebih awal.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/support/CompileTimeJSON.h` |
| Komponen | Firmware Node |
| Jenis file | helper pendukung firmware |
| Level | Menengah |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |
| Jumlah baris | 279 |

## Kenapa File Ini Ada

Dalam sistem TA IoT Greenhouse, file ini menjaga satu bagian tanggung jawab agar tidak bercampur dengan modul lain. Pembagian seperti ini membuat node, gateway, web, dan tooling lebih mudah dibaca oleh pemula: satu file dipelajari sebagai satu peran.

## Kapan File Ini Dipakai

File ini dipakai ketika bagian Firmware Node membutuhkan fungsi helper pendukung firmware. Relasi pemanggil yang eksplisit hanya dianggap pasti jika terlihat dari include, import, atau pemanggilan di source. Jika relasi runtime tidak tertulis langsung di file, dokumentasi ini tidak menebaknya sebagai fakta.

## Bukti dari Source

| Jenis bukti | Ditemukan di source |
|---|---|
| Include | `algorithm`, `array`, `cstddef` |
| Class/Struct | `FixedString` |
| Fungsi C/C++ | `FixedString`, `size`, `c_str`, `concat`, `concat_all`, `constexpr`, `string`, `number`, `bool_true`, `bool_false`, `null`, `placeholder`, `placeholder_int`, `placeholder_uint`, `placeholder_long`, `placeholder_ulong`, `placeholder_float`, `placeholder_string`, `placeholder_raw`, `pair`, `object`, `object_inner`, `array`, `buffer_size` |
| Macro | `COMPILE_TIME_JSON_H` |
| String command/konfigurasi | `type`, `sensor`, `node_id`, `version`, `value`, `true`, `false`, `null`, `key`, `gh_id`, `temperature`, `humidity`, `light_intensity`, `rssi`, `recorded_at`, `lux`, `timestamp` |

## Alur Masuk dan Keluar

| Arah | Penjelasan |
|---|---|
| Data masuk | data runtime dari modul pemanggil dan konfigurasi firmware yang relevan |
| Data keluar | hasil pemrosesan yang dikembalikan ke modul pemanggil |

## Hal yang Perlu Diperhatikan

- Jika kontrak input berubah tetapi file pemanggil tidak ikut diperbarui, error bisa muncul di runtime atau saat compile.

## Bagian untuk Pemula

Mulai dari nama file dan foldernya dulu. Folder menunjukkan area sistem, sedangkan nama file menunjukkan tugas kecilnya. Setelah itu, baca daftar include/import dan nama fungsi untuk melihat file ini bekerja sama dengan modul apa.

## Bagian Advanced

Untuk perubahan kode, periksa kontrak data dan efek sampingnya. Pada firmware embedded, perubahan kecil pada buffer, waktu tunggu, koneksi jaringan, cache, atau OTA bisa berdampak ke stabilitas perangkat di greenhouse.

## Preview Source

```cpp
#ifndef COMPILE_TIME_JSON_H
#define COMPILE_TIME_JSON_H
/**
 * @file CompileTimeJSON.h
 * @brief Compile-time JSON string building for zero-allocation payloads.
 * 
 * This enables building static JSON templates at compile time, avoiding:
 * - Runtime string concatenation
 * - Heap allocation
 * - snprintf overhead for static parts
 * 
 * Usage:
```

## Hubungan ke Sistem TA

File ini membantu sistem IoT Greenhouse tetap bisa membaca data, menyimpan status, berkomunikasi, diuji, atau dioperasikan sesuai perannya. Dokumentasi ini sengaja menghubungkan file ke konteks TA, bukan hanya menjelaskan sintaks kode.

## Batas Verifikasi

Halaman ini dibuat dari pembacaan source file aktual pada 2026-05-19. Jika ada hubungan yang tidak terlihat langsung dari source, bagian tersebut ditulis sebagai belum terkonfirmasi, bukan diasumsikan.
