---
title: "node/src/main.cpp"
---

# node/src/main.cpp

File ini adalah titik masuk utama firmware node sensor.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/src/main.cpp` |
| Komponen | Firmware Node |
| Level | Advanced |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

File ini bertugas untuk membuat semua layanan utama node, menyambungkannya satu sama lain, menjalankan urutan boot, lalu memanggil loop aplikasi terus-menerus.

## Kenapa File Ini Ada

Firmware ESP8266 membutuhkan fungsi `setup()` dan `loop()`. Di proyek ini, dua fungsi itu sengaja dibuat tipis. Pekerjaan besar dipindahkan ke class seperti `Application`, `WifiManager`, `SensorManager`, `ApiClient`, `OtaManager`, `AppServer`, `PortalServer`, `CacheManager`, dan `DiagnosticsTerminal`.

## Posisi File dalam Sistem

File ini berada di firmware node sensor. Perannya seperti meja perakitan: semua modul yang membaca sensor, mengatur Wi-Fi, mengirim data, menyimpan cache, menjalankan OTA, dan menyediakan portal lokal dibuat di sini.

## Alur Kerja File

1. `setup()` menunggu sebentar agar perangkat stabil.
2. `SerialManager` mengaktifkan Serial Monitor.
3. `BootManager::run()` menjalankan pemeriksaan boot, factory reset, crash recovery, dan mount filesystem.
4. `RtcManager::init()` menyiapkan cache RTC yang sifatnya sementara.
5. Object `Runtime` dibuat secara statis agar hidup selama firmware berjalan.
6. `Runtime::init()` memuat konfigurasi, menyiapkan TLS, HTTP server, WebSocket, observer Wi-Fi, cache, sensor, NTP, API, OTA, terminal, dan aplikasi utama.
7. `loop()` memanggil `g_runtime->app.loop()` jika runtime sudah siap.

## Objek Penting

| Objek | Fungsi |
|---|---|
| `AsyncWebServer server` | Menyediakan HTTP server lokal pada port 80. |
| `AsyncWebSocket ws` | Menyediakan kanal WebSocket lokal di path `/ws`. |
| `ConfigManager configManager` | Menyimpan dan membagikan konfigurasi node. |
| `BearSSL::WiFiClientSecure secureClient` | Client HTTPS untuk koneksi aman ke cloud. |
| `SensorManager sensorManager` | Membaca dan menjaga status sensor. |
| `WifiManager wifiManager` | Mengatur Wi-Fi station dan portal mode. |
| `CacheManager cacheManager` | Menyimpan data ketika upload tidak bisa langsung dilakukan. |
| `NtpClient ntpClient` | Menyinkronkan waktu perangkat. |
| `ApiClient apiClient` | Mengirim data dan menerima konfigurasi dari server. |
| `OtaManager otaManager` | Mengecek dan menjalankan update firmware dari cloud. |
| `DiagnosticsTerminal terminal` | Menangani command terminal lokal. |
| `Application app` | State machine utama firmware. |

## Konsep Dasar yang Perlu Dipahami

- `setup()` adalah fungsi Arduino yang dipanggil sekali ketika perangkat menyala.
- `loop()` adalah fungsi Arduino yang dipanggil berulang selama perangkat hidup.
- `static Runtime runtime` berarti object dibuat sekali dan tetap hidup.
- Observer adalah pola ketika satu modul diberi tahu saat state modul lain berubah.
- `BearSSL::WiFiClientSecure` dipakai agar node bisa melakukan HTTPS.

## Dependency Internal

| Dependency | Fungsi |
|---|---|
| `app/Application.h` | State machine utama node. |
| `app/BootManager.h` | Boot recovery dan factory reset. |
| `app/HAL.h` | Inisialisasi Serial dan LittleFS. |
| `sensor/SensorManager.h` | Pembacaan sensor. |
| `net/WifiManager.h` | Koneksi Wi-Fi dan portal. |
| `api/ApiClient.h` | Upload data, kontrol, dan fallback komunikasi. |
| `ota/OtaManager.h` | OTA update dari cloud. |
| `web/AppServer.h` | Dashboard atau API lokal saat node aktif. |
| `web/PortalServer.h` | Portal konfigurasi lokal. |
| `terminal/DiagnosticsTerminal.h` | Command terminal lokal. |

## Dependency External

| Dependency | Fungsi |
|---|---|
| `Arduino.h` | Dasar runtime Arduino ESP8266. |
| `ESPAsyncWebServer.h` | HTTP server dan WebSocket asinkron. |
| `WiFiClientSecureBearSSL.h` | HTTPS client berbasis BearSSL. |
| `std::unique_ptr` | Mengelola heap reserve tanpa delete manual. |

## Side Effect

File ini memulai server lokal, mengaktifkan WebSocket, membuka koneksi TLS sesuai mode, menginisialisasi sensor, mengatur portal Wi-Fi, dan memulai state machine aplikasi.

## Error Handling

File ini tidak menangani semua error secara langsung. Sebagian error diteruskan ke modul masing-masing. Bagian yang terlihat jelas adalah `WifiMemoryModeObserver`, yang mengubah mode memori/TLS ketika Wi-Fi masuk portal mode atau connected station mode agar node tidak kehabisan heap.

## Catatan Keamanan

Jika konfigurasi mengizinkan insecure HTTPS, `secureClient.setInsecure()` dapat dipakai. Itu berguna untuk kondisi tertentu, tetapi mengurangi verifikasi sertifikat TLS. Dalam sistem TA, bagian ini terkait langsung dengan batasan keamanan koneksi cloud node.

## Catatan Performa

ESP8266 memiliki heap kecil. File ini mengatur ukuran buffer TLS berbeda untuk portal mode dan connected mode agar portal lokal tetap bisa berjalan. Ada juga konstanta heap reserve, tetapi nilainya `0`, sehingga reserve heap sedang tidak aktif.

## Catatan Debugging

Jika node tidak masuk aplikasi utama, cek urutan log dari `BOOT`, `HAL`, `FS`, `WIFI`, `SEC`, dan `APP` pada Serial Monitor. Jika WebSocket tidak aktif, cek state Wi-Fi dan apakah terminal berhasil mengalokasikan buffer.

## Hubungan dengan Laporan TA

File ini berhubungan dengan Bab III perancangan firmware node, Bab IV pengujian node, pengujian QoS, caching, OTA, keamanan HTTPS, dan operasi mode cloud/edge/auto.
