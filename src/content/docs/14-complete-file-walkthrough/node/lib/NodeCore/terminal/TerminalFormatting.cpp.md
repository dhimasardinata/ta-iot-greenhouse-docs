---
title: "node/lib/NodeCore/terminal/TerminalFormatting.cpp"
---

# node/lib/NodeCore/terminal/TerminalFormatting.cpp

File ini mengatur format tampilan terminal agar output command lebih mudah dibaca.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/terminal/TerminalFormatting.cpp` |
| Komponen | Firmware Node |
| Jenis file | modul terminal diagnostik |
| Level | Advanced |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |
| Jumlah baris | 230 |

## Kenapa File Ini Ada

Dalam sistem TA IoT Greenhouse, file ini menjaga satu bagian tanggung jawab agar tidak bercampur dengan modul lain. Pembagian seperti ini membuat node, gateway, web, dan tooling lebih mudah dibaca oleh pemula: satu file dipelajari sebagai satu peran.

## Kapan File Ini Dipakai

File ini dipakai ketika bagian Firmware Node membutuhkan fungsi modul terminal diagnostik. Relasi pemanggil yang eksplisit hanya dianggap pasti jika terlihat dari include, import, atau pemanggilan di source. Jika relasi runtime tidak tertulis langsung di file, dokumentasi ini tidak menebaknya sebagai fakta.

## Bukti dari Source

| Jenis bukti | Ditemukan di source |
|---|---|
| Include | `terminal/TerminalFormatting.h`, `config/constants.h`, `support/Utils.h` |
| Fungsi C/C++ | `u32_to_dec`, `append_literal_P`, `copy_literal_P`, `append_u32`, `formatUptime`, `formatTimeSince`, `printHeader`, `printSection`, `printDivider`, `printRow`, `printStatusRow`, `printListItem`, `printError`, `printSuccess`, `printInfo` |

## Alur Masuk dan Keluar

| Arah | Penjelasan |
|---|---|
| Data masuk | command dari terminal lokal, parameter operator, dan status runtime node |
| Data keluar | teks terminal, hasil command, dan aksi diagnostik |

## Hal yang Perlu Diperhatikan

- Jika kontrak input berubah tetapi file pemanggil tidak ikut diperbarui, error bisa muncul di runtime atau saat compile.
- Input operator perlu divalidasi karena command atau request lokal bisa kosong, salah format, atau tidak punya izin.

## Bagian untuk Pemula

Mulai dari nama file dan foldernya dulu. Folder menunjukkan area sistem, sedangkan nama file menunjukkan tugas kecilnya. Setelah itu, baca daftar include/import dan nama fungsi untuk melihat file ini bekerja sama dengan modul apa.

## Bagian Advanced

Untuk perubahan kode, periksa kontrak data dan efek sampingnya. Pada firmware embedded, perubahan kecil pada buffer, waktu tunggu, koneksi jaringan, cache, atau OTA bisa berdampak ke stabilitas perangkat di greenhouse.

## Preview Source

```cpp
#include "terminal/TerminalFormatting.h"
#include "config/constants.h"
#include "support/Utils.h"
namespace TerminalFormat {
  // =========================================================================
  // Time Formatting
  // =========================================================================
  namespace {
    size_t u32_to_dec(char* out, size_t out_len, unsigned long value) {
      if (!out || out_len == 0)
        return 0;
      char tmp[10];
```

## Hubungan ke Sistem TA

File ini membantu sistem IoT Greenhouse tetap bisa membaca data, menyimpan status, berkomunikasi, diuji, atau dioperasikan sesuai perannya. Dokumentasi ini sengaja menghubungkan file ke konteks TA, bukan hanya menjelaskan sintaks kode.

## Batas Verifikasi

Halaman ini dibuat dari pembacaan source file aktual pada 2026-05-19. Jika ada hubungan yang tidak terlihat langsung dari source, bagian tersebut ditulis sebagai belum terkonfirmasi, bukan diasumsikan.
