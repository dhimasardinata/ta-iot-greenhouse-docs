---
title: "node/lib/NodeCore/ota/BootGuard.cpp"
---

# node/lib/NodeCore/ota/BootGuard.cpp

File ini menjaga proses boot setelah update firmware. Tujuannya mengurangi risiko perangkat terjebak pada firmware baru yang gagal berjalan stabil.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/ota/BootGuard.cpp` |
| Komponen | Firmware Node |
| Jenis file | modul OTA firmware |
| Level | Advanced |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |
| Jumlah baris | 222 |

## Kenapa File Ini Ada

Dalam sistem TA IoT Greenhouse, file ini menjaga satu bagian tanggung jawab agar tidak bercampur dengan modul lain. Pembagian seperti ini membuat node, gateway, web, dan tooling lebih mudah dibaca oleh pemula: satu file dipelajari sebagai satu peran.

## Kapan File Ini Dipakai

File ini dipakai ketika bagian Firmware Node membutuhkan fungsi modul OTA firmware. Relasi pemanggil yang eksplisit hanya dianggap pasti jika terlihat dari include, import, atau pemanggilan di source. Jika relasi runtime tidak tertulis langsung di file, dokumentasi ini tidak menebaknya sebagai fakta.

## Bukti dari Source

| Jenis bukti | Ditemukan di source |
|---|---|
| Include | `ota/BootGuard.h`, `string.h`, `user_interface.h`, `support/Crc32.h`, `system/Logger.h` |
| Class/Struct | `rst_info`, `including` |
| Enum | `value`, `if` |
| Fungsi C/C++ | `isCrashReset`, `BootGuard::calculateCRC`, `BootGuard::read`, `BootGuard::write`, `BootGuard::isValidReason`, `BootGuard::incrementCrashCount`, `BootGuard::setRebootReason`, `BootGuard::getLastRebootReason`, `BootGuard::getCrashCount`, `BootGuard::markStable`, `BootGuard::clear` |
| Macro | `RTC_MAGIC`, `RTC_BLOCK_OFFSET`, `MAX_CRASH_COUNT`, `RAPID_CRASH_THRESHOLD_MS` |

## Alur Masuk dan Keluar

| Arah | Penjelasan |
|---|---|
| Data masuk | metadata update, URL firmware, status boot, dan response server OTA |
| Data keluar | keputusan update, status validasi firmware, dan tanda boot sukses/gagal |

## Hal yang Perlu Diperhatikan

- Jika kontrak input berubah tetapi file pemanggil tidak ikut diperbarui, error bisa muncul di runtime atau saat compile.
- OTA bisa gagal karena URL salah, firmware tidak cocok, koneksi putus, validasi boot gagal, atau ruang flash tidak cukup.

## Bagian untuk Pemula

Mulai dari nama file dan foldernya dulu. Folder menunjukkan area sistem, sedangkan nama file menunjukkan tugas kecilnya. Setelah itu, baca daftar include/import dan nama fungsi untuk melihat file ini bekerja sama dengan modul apa.

## Bagian Advanced

Untuk perubahan kode, periksa kontrak data dan efek sampingnya. Pada firmware embedded, perubahan kecil pada buffer, waktu tunggu, koneksi jaringan, cache, atau OTA bisa berdampak ke stabilitas perangkat di greenhouse.

## Preview Source

```cpp
#include "ota/BootGuard.h"
#include <string.h>
#include <user_interface.h>  // Required for rst_info
#include "support/Crc32.h"
#include "system/Logger.h"
#define RTC_MAGIC 0xDEADCAFE
// FIX: Move to safer RTC block (away from WiFi and ArduinoOTA)
// RTC Memory Map:
// Blocks 0-31:   Reserved by WiFi/System
// Blocks 32-63:  Available for user
// Block 64:      Used by ArduinoOTA (if enabled)
// Block 96:      BootGuard (THIS MODULE) - SAFE ZONE
```

## Hubungan ke Sistem TA

File ini membantu sistem IoT Greenhouse tetap bisa membaca data, menyimpan status, berkomunikasi, diuji, atau dioperasikan sesuai perannya. Dokumentasi ini sengaja menghubungkan file ke konteks TA, bukan hanya menjelaskan sintaks kode.

## Batas Verifikasi

Halaman ini dibuat dari pembacaan source file aktual pada 2026-05-19. Jika ada hubungan yang tidak terlihat langsung dari source, bagian tersebut ditulis sebagai belum terkonfirmasi, bukan diasumsikan.
