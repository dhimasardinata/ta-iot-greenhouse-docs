---
title: "node/lib/NodeCore/support/Utils.cpp"
---

# node/lib/NodeCore/support/Utils.cpp

File ini berisi helper umum yang dipakai beberapa modul firmware node.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/support/Utils.cpp` |
| Komponen | Firmware Node |
| Jenis file | helper pendukung firmware |
| Level | Menengah |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |
| Jumlah baris | 751 |

## Kenapa File Ini Ada

Dalam sistem TA IoT Greenhouse, file ini menjaga satu bagian tanggung jawab agar tidak bercampur dengan modul lain. Pembagian seperti ini membuat node, gateway, web, dan tooling lebih mudah dibaca oleh pemula: satu file dipelajari sebagai satu peran.

## Kapan File Ini Dipakai

File ini dipakai ketika bagian Firmware Node membutuhkan fungsi helper pendukung firmware. Relasi pemanggil yang eksplisit hanya dianggap pasti jika terlihat dari include, import, atau pemanggilan di source. Jika relasi runtime tidak tertulis langsung di file, dokumentasi ini tidak menebaknya sebagai fakta.

## Bukti dari Source

| Jenis bukti | Ditemukan di source |
|---|---|
| Include | `support/Utils.h`, `ESP8266WiFi.h`, `ESPAsyncWebServer.h`, `bearssl/bearssl_hash.h`, `time.h`, `array`, `memory`, `new`, `system/Logger.h` |
| Class/Struct | `WsQueuedChunk`, `WsState`, `tm` |
| Fungsi C/C++ | `copy_string`, `trim_inplace`, `hash_sha256`, `tokenize_quoted_args`, `scramble_data`, `redact`, `consttime_equal`, `ws_try_free`, `ws_set_enabled`, `ws_is_enabled`, `ensure_ws_state`, `state`, `ws_send_encrypted`, `ws_printf`, `ws_printf_P`, `get_month_index`, `parse_http_date`, `isSafeString`, `escape_json_string` |
| String command/konfigurasi | `thought` |

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
#include "support/Utils.h"
#include <ESP8266WiFi.h>
#include <ESPAsyncWebServer.h>
#include <bearssl/bearssl_hash.h>
#include <time.h>
#include <array>
#include <memory>
#include <new>
#include "system/Logger.h"
namespace Utils {
  void copy_string(std::span<char> dest, std::string_view src) {
    if (dest.empty())
```

## Hubungan ke Sistem TA

File ini membantu sistem IoT Greenhouse tetap bisa membaca data, menyimpan status, berkomunikasi, diuji, atau dioperasikan sesuai perannya. Dokumentasi ini sengaja menghubungkan file ke konteks TA, bukan hanya menjelaskan sintaks kode.

## Batas Verifikasi

Halaman ini dibuat dari pembacaan source file aktual pada 2026-05-19. Jika ada hubungan yang tidak terlihat langsung dari source, bagian tersebut ditulis sebagai belum terkonfirmasi, bukan diasumsikan.
