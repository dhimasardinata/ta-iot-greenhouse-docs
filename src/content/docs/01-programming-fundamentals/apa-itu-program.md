---
title: "Apa Itu Program"
---

# Apa Itu Program

Program adalah kumpulan perintah yang diberikan kepada komputer, server, ponsel, atau mikrokontroler. Perintah ini ditulis supaya perangkat melakukan pekerjaan tertentu.

Dalam sistem TA IoT Greenhouse, program dipakai di beberapa tempat:

- firmware node sensor,
- firmware gateway,
- backend Laravel,
- frontend Vue,
- aplikasi Android WebView,
- script pendukung build dan deployment.

## Contoh Program dalam Kehidupan Nyata

Bayangkan instruksi sederhana:

1. Baca suhu.
2. Jika suhu terlalu tinggi, nyalakan fan.
3. Kirim data suhu ke server.
4. Tampilkan data di dashboard.

Itu adalah bentuk logika program. Dalam kode nyata, instruksi tersebut ditulis dengan bahasa pemrograman seperti C++, PHP, JavaScript, atau Kotlin.

## Source Code

Source code adalah teks yang ditulis developer. File seperti `main.cpp`, `ApiController.php`, atau `Heatmap.vue` adalah contoh source code.

Komputer tidak memahami semua source code secara langsung. Beberapa bahasa perlu dikompilasi, beberapa bahasa dijalankan oleh interpreter atau runtime.

## Program di Mikrokontroler

Pada node sensor dan gateway, program disebut firmware. Firmware berjalan di board seperti ESP8266 atau ESP32. Firmware dekat dengan perangkat fisik, sehingga perlu memperhatikan Wi-Fi, sensor, relay, memori, listrik, dan waktu tunggu.

Contoh pekerjaan firmware:

- membaca sensor,
- menyimpan cache lokal,
- mengirim request API,
- menerima perintah dari terminal lokal,
- melakukan OTA update,
- mengendalikan relay.

## Program di Server

Backend Laravel adalah program server. Server menerima request, memvalidasi data, menyimpan ke database, dan memberi response.

Contoh pekerjaan backend:

- menerima data sensor,
- mengambil rata-rata sensor,
- menyimpan jadwal,
- menyediakan file firmware OTA,
- mengembalikan data dalam format JSON.

## Program di Web dan Android

Frontend Vue adalah program yang berjalan di browser. Android WebView membuka web tersebut di aplikasi ponsel.

Contoh pekerjaan frontend:

- menampilkan grafik,
- menampilkan heatmap,
- mengirim form threshold,
- mengambil data dari API,
- menampilkan error jika server gagal diakses.

## Kesimpulan

Program adalah instruksi. Sistem TA ini terdiri dari banyak program kecil dan besar yang bekerja bersama. Untuk memahami sistem, pembaca perlu memahami bukan hanya satu file, tetapi hubungan antar program.

Lanjutkan ke [File, Folder, dan Project](./file-folder-project.md).
