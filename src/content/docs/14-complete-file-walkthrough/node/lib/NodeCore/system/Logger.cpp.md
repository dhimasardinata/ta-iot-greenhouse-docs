---
title: "node/lib/NodeCore/system/Logger.cpp"
---

# node/lib/NodeCore/system/Logger.cpp

File ini mengatur format log firmware agar pesan diagnostik lebih konsisten saat dilihat lewat serial atau terminal.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/system/Logger.cpp` |
| Komponen | Firmware Node |
| Jenis file | modul sistem firmware |
| Level | Advanced |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |
| Jumlah baris | 79 |

## Kenapa File Ini Ada

Dalam sistem TA IoT Greenhouse, file ini menjaga satu bagian tanggung jawab agar tidak bercampur dengan modul lain. Pembagian seperti ini membuat node, gateway, web, dan tooling lebih mudah dibaca oleh pemula: satu file dipelajari sebagai satu peran.

## Kapan File Ini Dipakai

File ini dipakai ketika bagian Firmware Node membutuhkan fungsi modul sistem firmware. Relasi pemanggil yang eksplisit hanya dianggap pasti jika terlihat dari include, import, atau pemanggilan di source. Jika relasi runtime tidak tertulis langsung di file, dokumentasi ini tidak menebaknya sebagai fakta.

## Bukti dari Source

| Jenis bukti | Ditemukan di source |
|---|---|
| Include | `system/Logger.h`, `cstdarg` |
| Fungsi C/C++ | `shouldLog`, `printLogPrefix`, `Logger::log` |

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
#include "system/Logger.h"
#include <cstdarg>
// Default to DEBUG level
LogLevel Logger::currentLevel = LogLevel::DEBUG;
void Logger::setLevel(LogLevel level) noexcept {
  currentLevel = level;
}
const char* Logger::levelToString(LogLevel level) noexcept {
  // PROGMEM string table for level names
  static const char L_DEBUG[] PROGMEM = "DEBUG";
  static const char L_INFO[] PROGMEM = "INFO";
  static const char L_WARN[] PROGMEM = "WARN";
```

## Hubungan ke Sistem TA

File ini membantu sistem IoT Greenhouse tetap bisa membaca data, menyimpan status, berkomunikasi, diuji, atau dioperasikan sesuai perannya. Dokumentasi ini sengaja menghubungkan file ke konteks TA, bukan hanya menjelaskan sintaks kode.

## Batas Verifikasi

Halaman ini dibuat dari pembacaan source file aktual pada 2026-05-19. Jika ada hubungan yang tidak terlihat langsung dari source, bagian tersebut ditulis sebagai belum terkonfirmasi, bukan diasumsikan.
