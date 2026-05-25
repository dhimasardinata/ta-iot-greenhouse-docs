---
title: "Apa Itu Program"
---

# Apa Itu Program

Halo, rekan developer! Selamat datang di dokumentasi pemrograman dasar untuk proyek Tugas Akhir (TA) Smart Greenhouse IoT.

Secara sederhana, **program** adalah kumpulan instruksi atau perintah terstruktur yang diberikan kepada komputer, server, smartphone, atau mikrokontroler agar mereka dapat melakukan tugas tertentu secara otomatis. Di dalam sistem greenhouse terdistribusi ini, kita tidak hanya berurusan dengan satu program tunggal, melainkan sebuah ekosistem berisi berbagai jenis program yang saling terintegrasi.

Berikut adalah 5 komponen program utama yang menyusun proyek TA greenhouse ini:

---

## 1. Node Sensor (Firmware C++)
Program yang ditanam di dalam chip mikrokontroler ESP8266 disebut sebagai **firmware node**. Firmware ini berinteraksi langsung dengan perangkat keras fisik.
*   **Fungsi Utama**: Membaca sensor suhu/kelembapan/cahaya, melakukan caching data lokal ke RAM RTC jika koneksi mati, serta mengirimkan data tersebut ke Gateway.
*   **Representasi Kode**: Silakan pelajari kode inisialisasi dan alur loop utama node pada berkas [node/src/main.cpp](file:///home/dhimasardinata/Dokumen/ta/node/src/main.cpp).

## 2. Gateway (Firmware C++)
Gateway bertindak sebagai jembatan komunikasi lokal serta unit pengendali keputusan di lapangan (*edge controller*).
*   **Fungsi Utama**: Menerima data sensor dari node-node lokal, membandingkan data dengan ambang batas (*threshold*), menyalakan/mematikan relai aktuator fisik (seperti blower, exhaust, dan dehumidifier), serta mengambil jadwal kontrol terbaru dari server cloud.
*   **Representasi Kode**: Anda bisa melihat bagaimana Gateway mengontrol siklus programnya di berkas [gateway/src/main.cpp](file:///home/dhimasardinata/Dokumen/ta/gateway/src/main.cpp).

## 3. Backend Laravel (Web API)
Program yang berjalan di server cloud untuk memproses data dari perangkat keras serta melayani kebutuhan aplikasi web dan mobile.
*   **Fungsi Utama**: Menyediakan endpoint REST API untuk menerima unggahan data sensor, mengagregasikan nilai rata-rata sensor, menyimpan konfigurasi jadwal dan threshold di database, serta menyediakan berkas biner untuk fitur pembaruan firmware otomatis (*OTA Update*).
*   **Representasi Kode**: Alur pengolahan data dan rute API didefinisikan dalam kontroler Laravel seperti [web/ApiController.php](file:///home/dhimasardinata/Dokumen/ta/web/ApiController.php) dan [web/ScheduleController.php](file:///home/dhimasardinata/Dokumen/ta/web/ScheduleController.php).

## 4. Frontend Vue (Dashboard Web)
Aplikasi antarmuka pengguna berbasis web yang berjalan langsung di browser pengguna (sisi klien).
*   **Fungsi Utama**: Menampilkan grafik pemantauan, memvisualisasikan sebaran parameter fisik lewat heatmap, serta menyediakan panel interaktif untuk mengatur parameter otomatisasi.
*   **Representasi Kode**: Struktur tampilan panel kontrol web dapat Anda lihat pada berkas komponen Vue seperti [web/Controlling.vue](file:///home/dhimasardinata/Dokumen/ta/web/Controlling.vue) dan [web/Heatmap.vue](file:///home/dhimasardinata/Dokumen/ta/web/Heatmap.vue).

## 5. Android Client (WebView Kotlin)
Aplikasi mobile native yang membungkus (*wrapper*) dashboard web agar dapat diakses dengan mudah oleh pengguna langsung dari smartphone Android.
*   **Fungsi Utama**: Memuat URL dashboard web di dalam kontainer `WebView`, menangani konversi dan pengunduhan berkas laporan (seperti konversi ekspor berkas BLOB base64 menjadi unduhan PDF/CSV nyata), serta mendaftarkan perangkat ke topic FCM peringatan kabut. Penerimaan notifikasi background tetap bergantung pada konfigurasi Firebase dan service penerima yang lengkap.
*   **Representasi Kode**: Logika native untuk menangani interaksi web dan push notification ini berada pada berkas [android/MainActivity.kt.txt](file:///home/dhimasardinata/Dokumen/ta/android/MainActivity.kt.txt).

---

## Bagaimana Mereka Saling Berhubungan?

Alur kerja ekosistem program ini dapat divisualisasikan sebagai berikut:

1.  **Node Sensor** membaca data fisik lingkungan.
2.  Data dikirim ke **Gateway**, lalu Gateway mengevaluasi logika aktuasi lokal (misal: jika terlalu panas, hidupkan blower).
3.  **Gateway** meneruskan data sensor tersebut ke **Backend Laravel** di server.
4.  **Backend Laravel** menyimpan data ke database dan menyajikannya dalam format JSON yang siap dikonsumsi.
5.  **Frontend Vue** mengambil data JSON tersebut lalu merendernya menjadi grafik interaktif.
6.  Pengguna membuka dashboard tersebut melalui aplikasi **Android WebView** dan dapat menerima notifikasi jika konfigurasi FCM pada project Android lengkap tersedia.

Dengan memahami bahwa proyek ini terdiri dari berbagai program yang saling melengkapi, Anda akan lebih mudah melakukan pelacakan kode ataupun pengembangan fitur baru di masa mendatang!

---

Lanjutkan ke langkah berikutnya: **[File, Folder, dan Project](./file-folder-project.md)**.
