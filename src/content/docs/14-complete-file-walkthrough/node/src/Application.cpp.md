---
title: "node/src/Application.cpp"
---

# node/src/Application.cpp

File ini adalah state machine utama firmware node sensor.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/src/Application.cpp` |
| Komponen | Firmware Node |
| Level | Advanced |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

File ini bertugas mengatur hidup node dari awal menyala, menunggu sensor stabil, menghubungkan Wi-Fi, menjalankan pembacaan sensor, upload data, OTA, server lokal, terminal, sampai recovery jika perangkat tidak sehat.

## Kenapa File Ini Ada

Tanpa pusat state seperti ini, banyak modul akan berjalan sendiri-sendiri dan sulit dikendalikan. `Application.cpp` membuat urutan kerja node menjadi jelas: initializing, sensor stabilization, connecting, running, updating, dan flashing firmware.

## State Aplikasi

| State | Fungsi |
|---|---|
| `INITIALIZING` | Menyiapkan callback OTA, konfigurasi, dan handler flash. |
| `SENSOR_STABILIZATION` | Memberi waktu sensor agar pembacaan awal tidak langsung dipakai. |
| `CONNECTING` | Menjalankan proses koneksi Wi-Fi. |
| `RUNNING` | Menjalankan kerja normal node. |
| `UPDATING` | Menjalankan Arduino OTA. |
| `FLASHING_FIRMWARE` | Menulis file firmware dari LittleFS ke flash. |

## Alur Kerja File

1. `init()` mengaktifkan watchdog, menyiapkan health monitor, dan mengecek boot loop.
2. Jika crash count terlalu tinggi, node masuk safe mode portal.
3. `handleInitializing()` memasang callback ArduinoOTA dan flash request.
4. Setelah konfigurasi diterapkan, aplikasi masuk sensor stabilization.
5. Setelah timer stabilisasi selesai, aplikasi masuk connecting.
6. Setelah Wi-Fi connected atau portal mode aktif, aplikasi masuk running.
7. Pada running, node menjalankan Wi-Fi, NTP, sensor, OTA manager, API client, server lokal, terminal, ArduinoOTA, health monitor, dan maintenance reboot.

## Fungsi Penting

### `Application::init()`

Menyiapkan boot awal aplikasi. Fungsi ini juga memakai `BootGuard::getCrashCount()` untuk mendeteksi boot loop.

### `Application::loop()`

Loop utama aplikasi. Fungsi ini menjaga watchdog, menjalankan portal server, lalu memanggil handler sesuai state.

### `handleRunning()`

Bagian kerja normal node. Di sini sensor dibaca, data diupload, OTA dicek, server lokal diproses, terminal dijaga, dan kesehatan sistem dinilai.

### `handleFlashing()`

Membuka `/update.bin` dari LittleFS, memvalidasi ukuran, menulis firmware dengan `Update.writeStream()`, lalu reboot jika berhasil.

### `applyConfigs()`

Meneruskan konfigurasi aktif ke `ApiClient` dan `OtaManager`.

## Input

Data masuk berasal dari konfigurasi, state Wi-Fi, pembacaan sensor, status heap, RSSI, status SHT/BH1750, file `/update.bin`, dan event ArduinoOTA.

## Output

Output berupa state aplikasi baru, upload data, OTA handling, log sistem, restart perangkat, penghapusan `/update.bin`, dan perubahan mode portal/running.

## Error Handling

- Boot loop lebih dari 5 crash memaksa portal mode.
- Watchdog loop memicu reboot jika loop terlalu lama.
- OTA Arduino punya watchdog khusus jika progress berhenti.
- Flash firmware menolak file kosong dan file yang gagal dibuka.
- Jika `Update.begin()` gagal, file update dihapus dan node kembali running.

## Catatan Keamanan

File ini tidak melakukan autentikasi langsung, tetapi sangat berpengaruh pada keamanan OTA. Saat flash firmware, sumber file `/update.bin` harus sudah divalidasi oleh jalur upload/OTA lain. File ini juga menjaga agar OTA tidak berjalan saat upload API aktif.

## Catatan Performa

`handleRunning()` memanggil banyak service. Timer seperti `m_otaTimer`, `m_heapSampleTimer`, dan `m_healthCheckTimer` mencegah semua pekerjaan berat dilakukan setiap loop. Ini penting untuk ESP8266 yang RAM dan CPU-nya terbatas.

## Catatan Debugging

Untuk masalah node sering restart, cek log `APP`, `BOOT`, `HEALTH`, `FLASH`, dan `CPU`. Untuk masalah OTA, cek apakah state masuk `UPDATING` atau `FLASHING_FIRMWARE`, lalu cek keberadaan `/update.bin` di LittleFS.

## Hubungan dengan Laporan TA

File ini mendukung penjelasan lifecycle node, reliabilitas firmware, OTA update, caching/upload, safe mode, health monitoring, dan operasi node pada greenhouse.
