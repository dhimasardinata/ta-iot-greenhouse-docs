---
title: "File, Folder, dan Project"
---

# File, Folder, dan Project

Halo, rekan developer! Sebelum Anda mulai menyelami baris-baris kode program, penting untuk memiliki pemahaman yang solid mengenai struktur repositori proyek Smart Greenhouse ini.

Sebagai proyek berskala Tugas Akhir (TA) tingkat lanjut, repositori ini mengorganisasikan berbagai komponen program (firmware, backend, frontend, dan mobile client) ke dalam sub-folder tersendiri.

Berikut adalah peta struktur folder dan berkas utama dari repositori proyek TA `/home/dhimasardinata/Dokumen/ta/`.

---

## 1. Folder `node/` (Firmware Node Sensor)

Folder ini berisi kode pemrograman untuk mikrokontroler ESP8266 yang bertindak sebagai pemantau kondisi lingkungan greenhouse (membaca sensor suhu, kelembapan, dan cahaya).

*   `node/platformio.ini`: Berkas konfigurasi utama proyek PlatformIO. Di sini didefinisikan setelan board hardware, dependensi pustaka (*libraries*), dan *build flags*.
*   [node/src/main.cpp](file:///home/dhimasardinata/Dokumen/ta/node/src/main.cpp): Berkas titik masuk utama (*main entrypoint*) firmware node, mendefinisikan setup sistem (`setup()`) dan perulangan berkala (`loop()`).
*   [node/src/Application.cpp](file:///home/dhimasardinata/Dokumen/ta/node/src/Application.cpp): Mengimplementasikan mesin keadaan (*state machine*) dan alur kerja utama node sensor.
*   [node/include/app/Application.h](file:///home/dhimasardinata/Dokumen/ta/node/include/app/Application.h): Deklarasi pustaka kelas aplikasi, termasuk penentuan struktur enum class `State`.
*   [node/lib/NodeCore/storage/RtcManager.h](file:///home/dhimasardinata/Dokumen/ta/node/lib/NodeCore/storage/RtcManager.h): Mengelola caching data sensor langsung ke memori internal RTC SRAM menggunakan struktur `RtcRecordV2`.

---

## 2. Folder `gateway/` (Firmware Edge Gateway)

Gateway bertindak sebagai koordinator komunikasi lokal di lapangan. Ia mengumpulkan data dari node sensor, membandingkannya dengan parameter otomatisasi, serta mengendalikan sakelar relai fisik.

*   `gateway/platformio.ini`: Setelan kompilasi untuk unit Gateway (ESP32).
*   [gateway/src/main.cpp](file:///home/dhimasardinata/Dokumen/ta/gateway/src/main.cpp): Program inisialisasi awal Gateway, pemrosesan request HTTP, dan penjadwalan berkala.
*   [gateway/src/RelayController.cpp](file:///home/dhimasardinata/Dokumen/ta/gateway/src/RelayController.cpp): Mengandung logika pengambilan keputusan sakelar relai blower/exhaust berdasarkan gabungan aturan threshold sensor (hysteresis) dan waktu jadwal.
*   [gateway/src/CryptoUtils.cpp](file:///home/dhimasardinata/Dokumen/ta/gateway/src/CryptoUtils.cpp): Pustaka pembantu fungsi kriptografi untuk dekripsi payload aman dari node sensor.
*   [gateway/src/WebSerial.cpp](file:///home/dhimasardinata/Dokumen/ta/gateway/src/WebSerial.cpp): Konsol debug berbasis web yang mengirimkan data via WebSocket klien.

---

## 3. Folder `web/` (Backend Laravel & Frontend Vue)

Folder ini mengelompokkan potongan kode sistem web pemantau utama yang berjalan di server cloud.

*   [web/ApiController.php](file:///home/dhimasardinata/Dokumen/ta/web/ApiController.php): Controller Laravel yang bertugas memproses data masukan dari perangkat keras, melayani data rata-rata sensor, dan mengelola unggahan berkas foto kamera greenhouse.
*   [web/ScheduleController.php](file:///home/dhimasardinata/Dokumen/ta/web/ScheduleController.php): Controller Laravel untuk validasi dan penyimpanan konfigurasi jadwal kerja aktuator ke database.
*   [web/Controlling.vue](file:///home/dhimasardinata/Dokumen/ta/web/Controlling.vue): Halaman antarmuka Vue untuk panel kontrol pengguna (mengedit batas suhu dan mengaktifkan sakelar relai secara manual/otomatis).
*   [web/Heatmap.vue](file:///home/dhimasardinata/Dokumen/ta/web/Heatmap.vue): Komponen Vue untuk memvisualisasikan data sensor dalam bentuk peta persebaran suhu/kelembapan spasial.

---

## 4. Folder `android/` (Mobile WebView Client)

Folder ini berisi potongan kode aplikasi smartphone Android yang membungkus antarmuka web dashboard menjadi aplikasi mobile native.

*   [android/MainActivity.kt.txt](file:///home/dhimasardinata/Dokumen/ta/android/MainActivity.kt.txt): Aktivitas utama aplikasi Android dalam bahasa Kotlin. Menangani siklus hidup WebView, pendaftaran topic FCM, serta penangkapan berkas BLOB dari JavaScript untuk diunduh ke folder penyimpanan lokal.
*   [android/AndroidManifest.xml.txt](file:///home/dhimasardinata/Dokumen/ta/android/AndroidManifest.xml.txt): Berkas konfigurasi sistem Android untuk mendaftarkan izin akses internet (`android.permission.INTERNET`) dan layanan notifikasi.
*   [android/activity_main.xml.txt](file:///home/dhimasardinata/Dokumen/ta/android/activity_main.xml.txt): Layout visual XML untuk aplikasi, menampung komponen `WebView` dan tampilan layar loading.

---

## 5. Folder `docs-site/` (Dokumentasi Teknis)

Folder ini berisi sumber (*source*) situs dokumentasi proyek yang sedang Anda baca saat ini. Ditulis menggunakan format Markdown dan terintegrasi dengan generator static site untuk publikasi online.

---

## Ringkasan Struktur Hubungan Berkas

Ketika Anda ingin menelusuri bagaimana sebuah data sensor mengalir dari lingkungan greenhouse hingga ke tampilan HP, berikut berkas-berkas yang saling berinteraksi secara berurutan:

```text
[SHT / BH1750 Sensor]
       │ (bacaan fisik)
       ▼
[node/src/main.cpp] ──────► [node/lib/NodeCore/storage/RtcManager.cpp] (simpan ke RAM RTC)
       │ (kirim enkripsi)
       ▼
[gateway/src/main.cpp] ───► [gateway/src/CryptoUtils.cpp] (dekripsi payload aman)
       │
       ├──────────────────► [gateway/src/RelayController.cpp] (kontrol sakelar fisik)
       │ (kirim JSON ke cloud)
       ▼
[web/ApiController.php] ──► (simpan database di server cloud)
       │ (JSON API endpoint)
       ▼
[web/Controlling.vue] ────► (tampilan visual di browser)
       │ (dimuat dalam WebView)
       ▼
[android/MainActivity.kt.txt] (tampilan WebView di aplikasi HP pengguna)
```

Dengan mengerti peta struktur ini, Anda dapat mencari berkas kode dengan cepat saat melakukan troubleshooting ataupun saat merancang fitur tambahan!

---

Lanjutkan ke langkah berikutnya: **[Variabel dan Tipe Data](./variabel-dan-tipe-data.md)**.
