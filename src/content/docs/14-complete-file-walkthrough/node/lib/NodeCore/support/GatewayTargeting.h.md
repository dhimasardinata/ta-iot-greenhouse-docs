---
title: "node/lib/NodeCore/support/GatewayTargeting.h"
---

# node/lib/NodeCore/support/GatewayTargeting.h

File ini membantu menentukan target gateway ketika node bekerja pada mode edge atau auto.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/support/GatewayTargeting.h` |
| Komponen | Firmware Node |
| Jenis file | helper pendukung firmware |
| Level | Menengah |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |
| Jumlah baris | 36 |

## Kenapa File Ini Ada

Dalam sistem TA IoT Greenhouse, file ini menjaga satu bagian tanggung jawab agar tidak bercampur dengan modul lain. Pembagian seperti ini membuat node, gateway, web, dan tooling lebih mudah dibaca oleh pemula: satu file dipelajari sebagai satu peran.

## Kapan File Ini Dipakai

File ini dipakai ketika bagian Firmware Node membutuhkan fungsi helper pendukung firmware. Relasi pemanggil yang eksplisit hanya dianggap pasti jika terlihat dari include, import, atau pemanggilan di source. Jika relasi runtime tidak tertulis langsung di file, dokumentasi ini tidak menebaknya sebagai fakta.

## Bukti dari Source

| Jenis bukti | Ditemukan di source |
|---|---|
| Include | `Arduino.h`, `generated/node_config.h` |
| Class/Struct | `GatewayPairIds` |
| Fungsi C/C++ | `prefersGatewayGh1`, `resolvePreferredPair` |
| Macro | `GATEWAY_TARGETING_H` |

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
#ifndef GATEWAY_TARGETING_H
#define GATEWAY_TARGETING_H
#include <Arduino.h>
#include "generated/node_config.h"
namespace GatewayTargeting {
  struct GatewayPairIds {
    uint8_t primary = 1;
    uint8_t secondary = 2;
  };
  inline bool prefersGatewayGh1() {
    if (GH_ID == 1) {
      return NODE_ID <= 5;
```

## Hubungan ke Sistem TA

File ini membantu sistem IoT Greenhouse tetap bisa membaca data, menyimpan status, berkomunikasi, diuji, atau dioperasikan sesuai perannya. Dokumentasi ini sengaja menghubungkan file ke konteks TA, bukan hanya menjelaskan sintaks kode.

## Batas Verifikasi

Halaman ini dibuat dari pembacaan source file aktual pada 2026-05-19. Jika ada hubungan yang tidak terlihat langsung dari source, bagian tersebut ditulis sebagai belum terkonfirmasi, bukan diasumsikan.
