---
title: "node/lib/NodeCore/support/CryptoUtils.h"
---

# node/lib/NodeCore/support/CryptoUtils.h

File ini menyediakan helper kriptografi yang dipakai node untuk kebutuhan keamanan data.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/support/CryptoUtils.h` |
| Komponen | Firmware Node |
| Jenis file | helper pendukung firmware |
| Level | Menengah |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |
| Jumlah baris | 93 |

## Kenapa File Ini Ada

Dalam sistem TA IoT Greenhouse, file ini menjaga satu bagian tanggung jawab agar tidak bercampur dengan modul lain. Pembagian seperti ini membuat node, gateway, web, dan tooling lebih mudah dibaca oleh pemula: satu file dipelajari sebagai satu peran.

## Kapan File Ini Dipakai

File ini dipakai ketika bagian Firmware Node membutuhkan fungsi helper pendukung firmware. Relasi pemanggil yang eksplisit hanya dianggap pasti jika terlihat dari include, import, atau pemanggilan di source. Jika relasi runtime tidak tertulis langsung di file, dokumentasi ini tidak menebaknya sebagai fakta.

## Bukti dari Source

| Jenis bukti | Ditemukan di source |
|---|---|
| Include | `Arduino.h`, `bearssl/bearssl.h`, `array`, `memory`, `optional`, `string_view` |
| Class/Struct | `EncryptedPayload`, `AES_CBC_Cipher` |
| Fungsi C/C++ | `AES_CBC_Cipher`, `releaseScratchBuffers`, `get_enc_ctx`, `sharedCipher`, `sharedCipherWs`, `releaseMainCipherScratch`, `releaseWsCipher`, `setReplaySkewWindow`, `getReplaySkewWindow`, `fast_serialize_encrypted`, `fast_serialize_encrypted_main`, `fast_serialize_encrypted_ws`, `deserialize_payload` |
| Macro | `CRYPTO_UTILS_H`, `DEVICE_AES_KEY` |

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
#ifndef CRYPTO_UTILS_H
#define CRYPTO_UTILS_H
#include <Arduino.h>
#include <bearssl/bearssl.h>
#include <array>
#include <memory>  // Added for unique_ptr
#include <optional>
#include <string_view>
namespace CryptoUtils {
  // The AES-256 key (Static per user request).
  // Override via build flag: -D DEVICE_AES_KEY={...32 bytes...}
#ifndef DEVICE_AES_KEY
```

## Hubungan ke Sistem TA

File ini membantu sistem IoT Greenhouse tetap bisa membaca data, menyimpan status, berkomunikasi, diuji, atau dioperasikan sesuai perannya. Dokumentasi ini sengaja menghubungkan file ke konteks TA, bukan hanya menjelaskan sintaks kode.

## Batas Verifikasi

Halaman ini dibuat dari pembacaan source file aktual pada 2026-05-19. Jika ada hubungan yang tidak terlihat langsung dari source, bagian tersebut ditulis sebagai belum terkonfirmasi, bukan diasumsikan.
