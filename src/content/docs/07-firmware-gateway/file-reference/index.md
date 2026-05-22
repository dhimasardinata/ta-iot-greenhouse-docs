---
title: "Referensi Berkas Gateway"
description: "Daftar referensi lengkap berkas kode sumber C++ (.cpp dan .h) pada firmware ESP32 Gateway beserta deskripsi teknis masing-masing komponen."
---

# Referensi Berkas Firmware Gateway

Berikut adalah daftar lengkap berkas kode sumber C++ yang menyusun firmware ESP32 Gateway. Anda dapat mengeklik tautan berkas langsung di bawah ini untuk membuka kode sumber di ruang kerja lokal Anda.

---

## Berkas Utama & Konfigurasi

*   [main.cpp](file:///home/dhimasardinata/Dokumen/ta/gateway/src/main.cpp)
    *   Berkas utama (*entry point*) firmware gateway. Mengatur inisialisasi boot perangkat, siklus scheduler non-blocking time-sliced utama, pendaftaran route HTTP API lokal, koordinasi transisi state failsafe, dan pengecekan OTA.
*   [config.h](file:///home/dhimasardinata/Dokumen/ta/gateway/include/config.h)
    *   Mengatur seluruh definisi makro pin GPIO (relai Active-Low, bus SPI kartu SD, bus I2C LCD), alamat default API cloud, parameter konstanta watchdog timer, rentang default threshold lokal, dan identifikasi versi firmware.

---

## Manajemen Jaringan & Protokol HTTP

*   [MyNetworkManager.cpp](file:///home/dhimasardinata/Dokumen/ta/gateway/src/MyNetworkManager.cpp) & [MyNetworkManager.h](file:///home/dhimasardinata/Dokumen/ta/gateway/include/MyNetworkManager.h)
    *   Mengelola konektivitas jaringan Wi-Fi dan GPRS seluler via SIM800L. Menangani pembagian bandwidth socket nirkabel, deteksi block WAF, konversi rute otomatis via relay server (30 menit pin), dan kalkulasi metrik QoS (*Quality of Service*).
*   [WiFiCredentialStore.cpp](file:///home/dhimasardinata/Dokumen/ta/gateway/src/WiFiCredentialStore.cpp) & [WiFiCredentialStore.h](file:///home/dhimasardinata/Dokumen/ta/gateway/include/WiFiCredentialStore.h)
    *   Mengelola penyimpanan kredensial SSID dan kata sandi Wi-Fi pada memori non-volatile (NVS). Mendukung pencarian berulang jaringan tersembunyi (*hidden SSID scan*) dan penyimpanan multi-profil.

---

## Manajemen Kontrol Relai & Validasi Threshold

*   [RelayController.cpp](file:///home/dhimasardinata/Dokumen/ta/gateway/src/RelayController.cpp) & [RelayController.h](file:///home/dhimasardinata/Dokumen/ta/gateway/include/RelayController.h)
    *   Mengemudikan pin fisik relai kontrol greenhouse menggunakan logika Active-Low. Menangani komparasi data sensor terhadap batas threshold lokal dengan aturan hysteresis, mencocokkan jadwal waktu aktif, serta memutus daya relai secara instan pada kondisi failsafe.
*   [GatewayControlState.cpp](file:///home/dhimasardinata/Dokumen/ta/gateway/src/GatewayControlState.cpp) & [GatewayControlState.h](file:///home/dhimasardinata/Dokumen/ta/gateway/include/GatewayControlState.h)
    *   Menyimpan status runtime kesehatan sistem kontrol dan jaringan. Berisi algoritma penentu rute runtime (`resolveShouldUseLocalRuntime`) dan pelacak trigger kondisi darurat (`resolveShouldEnterFailSafe`).
*   [ThresholdValidation.h](file:///home/dhimasardinata/Dokumen/ta/gateway/include/ThresholdValidation.h)
    *   Berisi fungsi validasi batas threshold sensor (Suhu `[-20.0, 80.0]`, Kelembapan `[0.0, 100.0]`, Cahaya `[0.0, 65535.0]`) untuk mencegah kesalahan konfigurasi dari cloud maupun lokal.
*   [ScheduleValidation.h](file:///home/dhimasardinata/Dokumen/ta/gateway/include/ScheduleValidation.h)
    *   Menangani parsing konfigurasi jadwal relai dari JSON dan validasi rentang waktu operasional relai (jam/menit) untuk mendeteksi tumpang tindih waktu.

---

## Pengolahan Data Sensor

*   [SensorDataManager.cpp](file:///home/dhimasardinata/Dokumen/ta/gateway/src/SensorDataManager.cpp) & [SensorDataManager.h](file:///home/dhimasardinata/Dokumen/ta/gateway/include/SensorDataManager.h)
    *   Mengelola database internal pembacaan sensor baik dari node nirkabel lokal maupun server cloud. Berisi logika penentuan rata-rata aritmatika (`recalculateLocalAverage`) dan penanganan redundansi sensor.
*   [SensorNormalization.h](file:///home/dhimasardinata/Dokumen/ta/gateway/include/SensorNormalization.h)
    *   Berisi pustaka utilitas pemotongan nilai sensor (*clamping*) untuk memastikan pembacaan ekstrim yang tidak wajar tidak merusak kestabilan algoritma kontrol greenhouse.

---

## Log Data, Waktu Real-Time & Tampilan Lokal

*   [SDCardLogger.cpp](file:///home/dhimasardinata/Dokumen/ta/gateway/src/SDCardLogger.cpp) & [SDCardLogger.h](file:///home/dhimasardinata/Dokumen/ta/gateway/include/SDCardLogger.h)
    *   Menulis pembacaan sensor ke file `/log.csv` dan performa jaringan ke file `/qos.csv` pada kartu SD via SPI 4MHz. Menggunakan sistem buffer flush setiap 12 rekaman dan kunci kesibukan `_isBusy` untuk mencegah konflik saat file diunduh.
*   [RTCManager.cpp](file:///home/dhimasardinata/Dokumen/ta/gateway/src/RTCManager.cpp) & [RTCManager.h](file:///home/dhimasardinata/Dokumen/ta/gateway/include/RTCManager.h)
    *   Mengelola sinkronisasi modul real-time clock DS3231 eksternal. Memanfaatkan sinkronisasi bertingkat melalui server NTP, respons HTTP header, dan string waktu modem seluler.
*   [LCDDisplay.cpp](file:///home/dhimasardinata/Dokumen/ta/gateway/src/LCDDisplay.cpp) & [LCDDisplay.h](file:///home/dhimasardinata/Dokumen/ta/gateway/include/LCDDisplay.h)
    *   Mengemudikan layar LCD 20x4 baris melalui komunikasi I2C. Berisi logika pemantauan berkala kehadiran perangkat LCD pada alamat `0x27` setiap 5 detik untuk mendukung hot-plugging.

---

## Portal Konfigurasi, Terminal & Enkripsi

*   [ConfigManager.cpp](file:///home/dhimasardinata/Dokumen/ta/gateway/src/ConfigManager.cpp) & [ConfigManager.h](file:///home/dhimasardinata/Dokumen/ta/gateway/include/ConfigManager.h)
    *   Mengelola jalannya portal konfigurasi nirkabel AP/STA lokal. Menyediakan endpoint upload OTA `/doUpdate` dengan perlindungan admin session rate-limit dan validasi hash berkas biner.
*   [WebSocketManager.cpp](file:///home/dhimasardinata/Dokumen/ta/gateway/src/WebSocketManager.cpp) & [WebSocketManager.h](file:///home/dhimasardinata/Dokumen/ta/gateway/include/WebSocketManager.h)
    *   Mengelola koneksi WebSocket untuk pertukaran status data visual greenhouse. Payload dienkripsi menggunakan sandi AES-256-CBC dengan skema PKCS7 padding.
*   [CryptoUtils.cpp](file:///home/dhimasardinata/Dokumen/ta/gateway/src/CryptoUtils.cpp) & [CryptoUtils.h](file:///home/dhimasardinata/Dokumen/ta/gateway/include/CryptoUtils.h)
    *   Menyediakan fungsi kriptografi pendukung untuk proses enkripsi/deskripsi AES-256-CBC dan mbedtls SHA-256 terverifikasi.
*   [WebSerial.cpp](file:///home/dhimasardinata/Dokumen/ta/gateway/src/WebSerial.cpp) & [WebSerial.h](file:///home/dhimasardinata/Dokumen/ta/gateway/include/WebSerial.h)
    *   Mengimplementasikan konsol serial diagnostik interaktif berbasis peramban web (*browser-based*), mendukung eksekusi perintah status terverifikasi.
*   [DeferredControlActions.h](file:///home/dhimasardinata/Dokumen/ta/gateway/include/DeferredControlActions.h)
    *   Menampung daftar aksi kontrol relai yang ditunda (*queued actions*) untuk memastikan tidak ada perubahan status relai yang dieksekusi di tengah-tengah transaksi HTTP yang sensitif waktu.
