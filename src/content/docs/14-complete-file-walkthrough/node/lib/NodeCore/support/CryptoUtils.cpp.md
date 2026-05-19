---
title: "node/lib/NodeCore/support/CryptoUtils.cpp"
---

# node/lib/NodeCore/support/CryptoUtils.cpp

File ini menyediakan helper kriptografi yang dipakai node untuk kebutuhan keamanan data.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/support/CryptoUtils.cpp` |
| Komponen | Firmware Node |
| Jenis file | helper pendukung firmware |
| Level | Menengah |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |
| Jumlah baris | 440 |

## Kenapa File Ini Ada

Dalam sistem TA IoT Greenhouse, file ini menjaga satu bagian tanggung jawab agar tidak bercampur dengan modul lain. Pembagian seperti ini membuat node, gateway, web, dan tooling lebih mudah dibaca oleh pemula: satu file dipelajari sebagai satu peran.

## Kapan File Ini Dipakai

File ini dipakai ketika bagian Firmware Node membutuhkan fungsi helper pendukung firmware. Relasi pemanggil yang eksplisit hanya dianggap pasti jika terlihat dari include, import, atau pemanggilan di source. Jika relasi runtime tidak tertulis langsung di file, dokumentasi ini tidak menebaknya sebagai fakta.

## Bukti dari Source

| Jenis bukti | Ditemukan di source |
|---|---|
| Include | `support/CryptoUtils.h`, `ESP8266WiFi.h`, `libb64/cdecode.h`, `libb64/cencode.h`, `algorithm`, `memory`, `new`, `system/Logger.h`, `config/constants.h` |
| Fungsi C/C++ | `strip_newlines`, `base64_encode_to_buffer`, `base64_decode_to_buffer`, `validate_pkcs7_padding`, `get_time_stamp`, `zero_buffer`, `setReplaySkewWindow`, `getReplaySkewWindow`, `AES_CBC_Cipher::ensureScratchBuffers`, `AES_CBC_Cipher::releaseScratchBuffers`, `AES_CBC_Cipher::decrypt`, `AES_CBC_Cipher::encrypt`, `fast_serialize_encrypted`, `fast_serialize_encrypted_main`, `fast_serialize_encrypted_ws`, `sharedCipher`, `cipher`, `fallback`, `sharedCipherWs`, `releaseMainCipherScratch`, `releaseWsCipher`, `deserialize_payload` |

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
#include "support/CryptoUtils.h"
#include <ESP8266WiFi.h>
#include <libb64/cdecode.h>
#include <libb64/cencode.h>
#include <algorithm>
#include <memory>
#include <new>
#include "system/Logger.h"
#include "config/constants.h"
namespace {
  // Strip CR/LF from base64 output in-place
  size_t strip_newlines(char* buf, size_t len) {
```

## Hubungan ke Sistem TA

File ini membantu sistem IoT Greenhouse tetap bisa membaca data, menyimpan status, berkomunikasi, diuji, atau dioperasikan sesuai perannya. Dokumentasi ini sengaja menghubungkan file ke konteks TA, bukan hanya menjelaskan sintaks kode.

## Batas Verifikasi

Halaman ini dibuat dari pembacaan source file aktual pada 2026-05-19. Jika ada hubungan yang tidak terlihat langsung dari source, bagian tersebut ditulis sebagai belum terkonfirmasi, bukan diasumsikan.
