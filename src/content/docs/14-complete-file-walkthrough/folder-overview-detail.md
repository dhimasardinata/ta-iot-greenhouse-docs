---
title: "Folder Overview Subfolder Detail"
---

# Folder Overview Subfolder Detail

Halaman ini adalah jembatan sebelum dokumentasi file-by-file. Tujuannya membantu pembaca awam memahami fungsi setiap folder dan subfolder besar lebih dulu, supaya nanti saat membaca satu file tertentu pembaca sudah tahu posisi file itu di sistem TA IoT Greenhouse.

Sumber utama halaman ini adalah inventory folder dan daftar file nyata pada repository. Jika fungsi detail sebuah file belum dibaca langsung, penjelasan di halaman ini tetap dianggap overview, bukan pengganti halaman file-by-file.

## Cara Membaca

Mulai dari folder utama, lalu masuk ke subfolder. Untuk firmware node dan gateway, pahami dulu urutan besar sistem: boot, konfigurasi, jaringan, pembacaan data, penyimpanan/cache, pengiriman data, antarmuka lokal, lalu OTA.

## Ringkasan Folder Utama

| Folder | Peran dalam sistem | Catatan untuk pemula |
|---|---|---|
| `android/` | Potongan aplikasi Android WebView. | Mulai dari manifest, layout, lalu activity. |
| `gateway/` | Firmware gateway IoT berbasis ESP32/TTGO T-Call. | Ini pusat kendali lokal yang menghubungkan data, threshold, jadwal, LCD, SD Card, dan relay. |
| `node/` | Firmware node sensor berbasis ESP8266/Wemos D1 Mini. | Ini bagian paling besar; baca bertahap dari boot sampai pengiriman data. |
| `web/` | Potongan backend Laravel dan frontend Vue yang tersedia di snapshot. | Folder ini berisi controller PHP dan komponen Vue, bukan struktur Laravel/Vue penuh. |
| `docs-site/` | Platform dokumentasi berbasis Next.js dan Fumadocs. | Ini alat untuk membaca dokumentasi, bukan runtime greenhouse. |
| `docs/` | Catatan progress dokumentasi. | Dipakai untuk melanjutkan batch tanpa mengulang scan awal. |

## Gateway

Folder `gateway/` adalah firmware gateway. Gateway menjadi penghubung lokal antara node, cloud, tampilan lokal, dan aktuator.

| Subfolder/file | Isi utama | Yang perlu dipahami dulu |
|---|---|---|
| `gateway/src/` | Implementasi utama firmware gateway dalam C++. | `main.cpp` mengikat setup dan loop, lalu memanggil modul lain. |
| `gateway/include/` | Header, deklarasi class, konfigurasi, validasi, dan asset embedded. | Header menjelaskan bentuk modul sebelum melihat implementasi `.cpp`. |
| `gateway/platformio.ini` | Konfigurasi build PlatformIO. | Board, library, flags, dan upload environment biasanya terlihat di sini. |
| `gateway/partitions_custom.csv` | Layout partisi flash. | Penting untuk OTA dan ruang penyimpanan firmware. |
| `gateway/lib/` | Placeholder PlatformIO. | Di-skip karena bukan runtime source utama pada snapshot ini. |
| `gateway/test/` | Placeholder test PlatformIO. | Di-skip karena hanya README placeholder pada snapshot ini. |

### Gateway Include

| Area file | Fungsi awal |
|---|---|
| `config.h`, `root_ca.h` | Konfigurasi global dan sertifikat/anchor TLS. |
| `ConfigManager.h`, `WiFiCredentialStore.h` | Penyimpanan dan pengambilan konfigurasi. |
| `MyNetworkManager.h` | Pengelolaan koneksi jaringan gateway. |
| `SensorDataManager.h`, `SensorNormalization.h` | Pengumpulan dan normalisasi data sensor. |
| `ThresholdValidation.h`, `ScheduleValidation.h` | Validasi input threshold dan jadwal. |
| `RelayController.h`, `DeferredControlActions.h`, `GatewayControlState.h` | Logika kontrol aktuator dan status kontrol. |
| `RTCManager.h`, `SDCardLogger.h`, `LCDDisplay.h` | Waktu, logging SD Card, dan tampilan LCD. |
| `WebSerial.h`, `WebSocketManager.h`, `PortalAssets.h` | Terminal lokal, WebSocket, dan asset halaman lokal. |
| `CryptoUtils.h`, `EmbeddedCryptoJs.h` | Bagian pendukung kriptografi dan asset JavaScript crypto. |

### Gateway Source

| File/kelompok | Fungsi awal |
|---|---|
| `main.cpp` | Titik masuk firmware gateway. |
| `ConfigManager.cpp`, `WiFiCredentialStore.cpp` | Implementasi konfigurasi dan kredensial Wi-Fi. |
| `MyNetworkManager.cpp` | Implementasi koneksi jaringan. |
| `SensorDataManager.cpp` | Implementasi pengolahan data sensor. |
| `RelayController.cpp`, `GatewayControlState.cpp` | Implementasi kontrol aktuator dan status. |
| `RTCManager.cpp`, `SDCardLogger.cpp`, `LCDDisplay.cpp` | Implementasi waktu, log, dan tampilan. |
| `WebSerial.cpp`, `WebSocketManager.cpp` | Implementasi terminal lokal dan komunikasi real-time. |
| `CryptoUtils.cpp` | Implementasi utilitas kriptografi gateway. |

## Node Sensor

Folder `node/` adalah bagian terbesar. Node sensor membaca kondisi greenhouse, menyimpan data sementara, lalu mengirim data ke gateway atau cloud sesuai mode.

| Subfolder/file | Isi utama | Yang perlu dipahami dulu |
|---|---|---|
| `node/src/` | Titik masuk aplikasi dan lifecycle utama. | Baca `main.cpp`, `Application.cpp`, lalu `BootManager.cpp`. |
| `node/include/app/` | Header aplikasi utama, boot, dan HAL. | Membantu melihat batas antara logika aplikasi dan hardware. |
| `node/include/config/` | Konfigurasi kalibrasi, konstanta, dan pin hardware. | Penting untuk memahami nilai sensor dan wiring. |
| `node/include/generated/` | Header hasil generate. | Biasanya berisi asset web, cert, dan konfigurasi node hasil proses script. |
| `node/data/` | Asset runtime portal lokal. | HTML/CSS/JS yang disajikan oleh node saat konfigurasi atau terminal lokal. |
| `node/lib/NodeCore/` | Library internal firmware node. | Ini pusat logika node: API, cache, sensor, network, OTA, terminal, web lokal. |
| `node/test/` | Test dan mock untuk firmware node. | Dipakai untuk memahami perilaku yang diharapkan tanpa hardware asli. |
| `node/scripts/` | Script build, OTA, asset generation, sanitasi, dan analisis. | Banyak file generated/config dipengaruhi script di sini. |
| `node/tools/` | Tool pendukung, cert, repro, watcher, dan snapshot prompt. | `node/tools/prompt/` di-skip karena duplikasi source untuk prompt/context. |

### Node Data

| File | Fungsi awal |
|---|---|
| `index.html`, `portal.html` | Halaman utama/portal lokal node. |
| `connecting.html`, `success.html`, `rebooting.html` | Halaman status saat koneksi, berhasil, atau reboot. |
| `terminal.html`, `terminal.css`, `terminal.js` | UI terminal lokal. |
| `update.html` | UI update firmware lokal. |
| `crypto.js` | Bantuan kriptografi di sisi halaman lokal. |

### Node Include

| Subfolder | Fungsi awal |
|---|---|
| `node/include/app/` | Deklarasi `Application`, `BootManager`, dan HAL. |
| `node/include/config/` | Kalibrasi, konstanta, dan pin hardware. |
| `node/include/generated/` | Web app data, sertifikat, konfigurasi node, dan root CA hasil generate. |

### Node Source

| File | Fungsi awal |
|---|---|
| `node/src/main.cpp` | Titik masuk firmware node. |
| `node/src/Application.cpp` | Lifecycle aplikasi node setelah boot. |
| `node/src/BootManager.cpp` | Urutan boot dan kesiapan sistem. |
| `node/src/generated/WebAppData.cpp` | Data asset web hasil generate untuk firmware. |

## NodeCore

`node/lib/NodeCore/` adalah library internal node. Untuk pemula, anggap folder ini sebagai kumpulan bagian kerja node yang dipisah supaya tidak semua logika ditaruh di `main.cpp`.

| Subfolder | Jumlah file | Peran utama |
|---|---:|---|
| `api/` | 35 | Pengiriman data, upload, queue, QoS, transport HTTP/TLS, lifecycle client API. |
| `commands/` | 69 | Perintah terminal seperti baca sensor, set konfigurasi, Wi-Fi, OTA, cache, reboot, dan kalibrasi. |
| `interfaces/` | 5 | Kontrak kecil antar modul, misalnya auth, cache, sensor, config observer, dan Wi-Fi observer. |
| `net/` | 6 | Wi-Fi, credential store, dan NTP. |
| `ota/` | 7 | OTA manager, boot guard, health, dan keamanan update. |
| `security/` | 4 | Operasi TLS dan trust anchors. |
| `sensor/` | 4 | Struktur data sensor, pembacaan sensor, dan normalisasi. |
| `storage/` | 5 | Cache manager, path storage, dan RTC manager. |
| `support/` | 14 | Utilitas umum seperti CRC32, crypto, parsing, formatting, tipe presisi, dan clock runtime. |
| `system/` | 10 | Config manager, crash handler, logger, timer, identitas node, memori, dan health. |
| `terminal/` | 5 | Terminal diagnostik dan formatting output terminal. |
| `web/` | 7 | App server, portal server, route lokal, dan utilitas route Wi-Fi. |

### Urutan Membaca NodeCore

1. `system/` untuk konfigurasi, logging, dan kondisi sistem.
2. `sensor/` untuk asal data lingkungan.
3. `storage/` untuk cache dan path data lokal.
4. `net/` untuk koneksi Wi-Fi dan waktu.
5. `api/` untuk pengiriman data ke server/gateway.
6. `web/` dan `terminal/` untuk antarmuka lokal.
7. `commands/` untuk operasi manual/debugging.
8. `ota/` dan `security/` untuk update dan keamanan komunikasi.
9. `support/` dan `interfaces/` sebagai pondasi lintas modul.

## Test Node

Folder `node/test/` membantu menjelaskan perilaku tanpa harus selalu menjalankan hardware.

| Subfolder | Fungsi awal |
|---|---|
| `node/test/mocks/` | Mock Arduino, Wi-Fi, filesystem, OTA, web server, dan BearSSL untuk test native. |
| `node/test/fault_injection/` | Skenario gangguan cache. |
| `node/test/test_cache_manager/` | Test cache manager. |
| `node/test/test_integration/` | Test integrasi dengan mock cache dan mock sensor. |
| `node/test/test_native_json/` | Test logika JSON native. |
| `node/test/test_native_stress/` | Test stress/simulasi sistem. |

## Script dan Tool Node

| Area | Fungsi awal |
|---|---|
| `node/scripts/build_all.py`, `build_all.bat`, `build_and_ota.py` | Build dan OTA helper. |
| `node/scripts/prepare_assets.py`, `web_to_header.py` | Mengubah asset web menjadi data yang bisa masuk firmware. |
| `node/scripts/convert_certs.py`, `node/tools/certs/` | Pengolahan sertifikat untuk TLS/HTTPS. |
| `node/scripts/inject_config.py`, `patch_header.py` | Menyiapkan atau mengubah header konfigurasi/generated. |
| `node/scripts/check_coding_standard.py`, `format_all.py`, `analyze_stack.py` | Pemeriksaan standar, formatting, dan analisis stack. |
| `node/scripts/curl_ota_post.py`, `curl_ota_post_all.py`, `test_ota_upload.py` | Pengujian upload OTA. |
| `node/scripts/sanitize_for_public.py`, `collect_prompt_files.py` | Sanitasi dan pengumpulan konteks. |
| `node/tools/repro/` | Reproduksi bug kecil berbasis JavaScript. |
| `node/tools/watch/` | Watcher repository. |

## Web dan Android

| Folder | File | Fungsi awal |
|---|---|---|
| `web/` | `ApiController.php`, `OtaController.php`, `PageController.php`, `ScheduleController.php` | Potongan controller Laravel untuk API, OTA, halaman, dan jadwal. |
| `web/` | `Controlling.vue`, `Heatmap.vue` | Potongan frontend Vue untuk kontrol dan tampilan heatmap. |
| `android/` | `AndroidManifest.xml.txt` | Izin dan deklarasi aplikasi Android. |
| `android/` | `activity_main.xml.txt` | Layout WebView. |
| `android/` | `MainActivity.kt.txt` | Activity yang memuat WebView. |

## Folder yang Di-skip Dengan Alasan

| Folder | Alasan |
|---|---|
| `node/.cache/` | Cache lokal/editor/build, bukan source yang dirawat. |
| `node/.git/` | Metadata Git nested project, bukan source aplikasi. |
| `node/node_modules/` | Dependency hasil install; dependency cukup diwakili manifest. |
| `node/tools/prompt/` | Mirror/snapshot prompt yang menduplikasi source asli. |
| `node/var/` | Output build, smoke test, dan log generated. |
| `node/vendor/` | PlatformIO platform/package/library vendor; governance dependency dibahas lewat manifest dan konfigurasi. |

## Batas Halaman Ini

Halaman ini belum menggantikan kewajiban file-by-file. Setiap file yang masih `Pending` di coverage report tetap harus punya halaman sendiri yang menjelaskan tujuan file, pemanggil, input, output, risiko, error, dan hubungan ke sistem TA.
