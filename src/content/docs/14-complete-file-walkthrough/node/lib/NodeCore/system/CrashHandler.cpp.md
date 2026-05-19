---
title: "node/lib/NodeCore/system/CrashHandler.cpp"
---

# node/lib/NodeCore/system/CrashHandler.cpp

File ini menangani catatan crash supaya penyebab restart atau kegagalan firmware bisa ditelusuri saat debugging.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/system/CrashHandler.cpp` |
| Komponen | Firmware Node |
| Jenis file | modul sistem firmware |
| Level | Advanced |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |
| Jumlah baris | 205 |

## Kenapa File Ini Ada

Dalam sistem TA IoT Greenhouse, file ini menjaga satu bagian tanggung jawab agar tidak bercampur dengan modul lain. Pembagian seperti ini membuat node, gateway, web, dan tooling lebih mudah dibaca oleh pemula: satu file dipelajari sebagai satu peran.

## Kapan File Ini Dipakai

File ini dipakai ketika bagian Firmware Node membutuhkan fungsi modul sistem firmware. Relasi pemanggil yang eksplisit hanya dianggap pasti jika terlihat dari include, import, atau pemanggilan di source. Jika relasi runtime tidak tertulis langsung di file, dokumentasi ini tidak menebaknya sebagai fakta.

## Bukti dari Source

| Jenis bukti | Ditemukan di source |
|---|---|
| Include | `system/CrashHandler.h`, `LittleFS.h`, `cstring`, `user_interface.h`, `storage/Paths.h`, `generated/node_config.h` |
| Class/Struct | `rst_info` |
| Fungsi C/C++ | `isNormalReset`, `ensureLogSpace`, `getResetReason_P`, `PSTR`, `CrashHandler::process`, `CrashHandler::getLog`, `String`, `CrashHandler::streamLogTo`, `CrashHandler::clearLog`, `CrashHandler::hasCrashLog` |

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
#include "system/CrashHandler.h"
#include <LittleFS.h>
#include <cstring>
#include <user_interface.h>  // For struct rst_info
#include "storage/Paths.h"
#include "generated/node_config.h"  // For FIRMWARE_VERSION
namespace {
  bool isNormalReset(rst_info* rst) {
    if (!rst)
      return true;
    return rst->reason == REASON_DEFAULT_RST || rst->reason == REASON_EXT_SYS_RST ||
           rst->reason == REASON_DEEP_SLEEP_AWAKE;
```

## Hubungan ke Sistem TA

File ini membantu sistem IoT Greenhouse tetap bisa membaca data, menyimpan status, berkomunikasi, diuji, atau dioperasikan sesuai perannya. Dokumentasi ini sengaja menghubungkan file ke konteks TA, bukan hanya menjelaskan sintaks kode.

## Batas Verifikasi

Halaman ini dibuat dari pembacaan source file aktual pada 2026-05-19. Jika ada hubungan yang tidak terlihat langsung dari source, bagian tersebut ditulis sebagai belum terkonfirmasi, bukan diasumsikan.
