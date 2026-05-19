---
title: "node/test/test_native_json/test_json_logic.cpp"
---

# node/test/test_native_json/test_json_logic.cpp

File ini adalah bagian dari test firmware node. Test membantu memastikan cache, JSON, integrasi, dan simulasi tetap berjalan sesuai harapan.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/test/test_native_json/test_json_logic.cpp` |
| Komponen | Firmware Node |
| Jenis file | pengujian firmware node |
| Level | Menengah |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |
| Jumlah baris | 149 |

## Kenapa File Ini Ada

Dalam sistem TA IoT Greenhouse, file ini menjaga satu bagian tanggung jawab agar tidak bercampur dengan modul lain. Pembagian seperti ini membuat node, gateway, web, dan tooling lebih mudah dibaca oleh pemula: satu file dipelajari sebagai satu peran.

## Kapan File Ini Dipakai

File ini dipakai ketika bagian Firmware Node membutuhkan fungsi pengujian firmware node. Relasi pemanggil yang eksplisit hanya dianggap pasti jika terlihat dari include, import, atau pemanggilan di source. Jika relasi runtime tidak tertulis langsung di file, dokumentasi ini tidak menebaknya sebagai fakta.

## Bukti dari Source

| Jenis bukti | Ditemukan di source |
|---|---|
| Include | `unity.h`, `Arduino.h`, `ESPAsyncWebServer.h` |
| Class/Struct | `MockCredentialStore`, `MockWifiManager` |
| Fungsi C/C++ | `hasCredential`, `getCredentialStore`, `logic_sendNetworksJson`, `setUp`, `tearDown`, `test_json_streaming_multiple_networks`, `test_json_scanning_state`, `test_stress_ram_large_dataset`, `main`, `UNITY_END` |
| Fungsi JavaScript | `or` |
| String command/konfigurasi | `true`, `false` |

## Alur Masuk dan Keluar

| Arah | Penjelasan |
|---|---|
| Data masuk | skenario test, mock object, input simulasi, dan fixture pengujian |
| Data keluar | assertion test, hasil simulasi, dan sinyal gagal/lulus untuk pengembang |

## Hal yang Perlu Diperhatikan

- Jika kontrak input berubah tetapi file pemanggil tidak ikut diperbarui, error bisa muncul di runtime atau saat compile.
- Test bisa memberi hasil keliru jika mock tidak lagi mengikuti perilaku firmware sebenarnya.

## Bagian untuk Pemula

Mulai dari nama file dan foldernya dulu. Folder menunjukkan area sistem, sedangkan nama file menunjukkan tugas kecilnya. Setelah itu, baca daftar include/import dan nama fungsi untuk melihat file ini bekerja sama dengan modul apa.

## Bagian Advanced

Untuk perubahan kode, periksa kontrak data dan efek sampingnya. Pada firmware embedded, perubahan kecil pada buffer, waktu tunggu, koneksi jaringan, cache, atau OTA bisa berdampak ke stabilitas perangkat di greenhouse.

## Preview Source

```cpp
#include <unity.h>
#include "Arduino.h"
#include "ESPAsyncWebServer.h"
// --- DUT (Device Under Test) LOGIC ---
// We copy the logic from PortalServer::sendNetworksJson to verify it.
// In a real scenario, this logic would be in a decoupled static function or helper class.
// Mock Credential Store
struct MockCredentialStore {
    bool hasCredential(const char*) { return false; }
};
struct MockWifiManager {
    MockCredentialStore getCredentialStore() { return MockCredentialStore(); }
```

## Hubungan ke Sistem TA

File ini membantu sistem IoT Greenhouse tetap bisa membaca data, menyimpan status, berkomunikasi, diuji, atau dioperasikan sesuai perannya. Dokumentasi ini sengaja menghubungkan file ke konteks TA, bukan hanya menjelaskan sintaks kode.

## Batas Verifikasi

Halaman ini dibuat dari pembacaan source file aktual pada 2026-05-19. Jika ada hubungan yang tidak terlihat langsung dari source, bagian tersebut ditulis sebagai belum terkonfirmasi, bukan diasumsikan.
