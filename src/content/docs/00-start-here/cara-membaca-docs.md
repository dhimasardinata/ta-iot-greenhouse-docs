---
title: "Cara Membaca Dokumentasi Ini"
---

# Cara Membaca Dokumentasi Ini

Dokumentasi ini disusun seperti jalur belajar. Artinya, pembaca tidak diminta langsung memahami semua kode. Pembaca diajak naik pelan-pelan dari konsep paling dasar sampai detail file.

## Prinsip Membaca

Gunakan prinsip ini:

1. Baca gambaran besar dulu.
2. Pahami istilah sebelum masuk kode.
3. Baca alur data sebelum membaca fungsi.
4. Baca file utama sebelum file pendukung.
5. Jangan mengubah kode sebelum memahami efeknya.

Pada sistem IoT Greenhouse, satu perubahan kecil bisa berdampak ke perangkat fisik. Misalnya perubahan threshold bisa membuat fan menyala atau mati pada waktu yang salah.

## Urutan yang Disarankan

Untuk pembaca pemula:

1. `00-start-here` untuk arah membaca.
2. `01-programming-fundamentals` untuk dasar program.
3. `02-ta-context` untuk konteks Tugas Akhir.
4. `03-system-foundation` untuk dasar IoT, database, API, jaringan, dan keamanan.
5. `04-system-architecture` untuk alur sistem.
6. `05-hardware` untuk perangkat fisik.
7. Komponen source: node, gateway, backend, web, Android.
8. `14-complete-file-walkthrough` untuk detail file-by-file.

Untuk developer yang sudah paham dasar:

1. Baca arsitektur.
2. Baca coverage report.
3. Pilih komponen yang ingin diubah.
4. Baca folder overview.
5. Baca file-by-file yang relevan.
6. Baru lakukan perubahan.

## Bagian Teori dan Bagian Kode

Bagian teori menjelaskan istilah dan konsep. Contohnya program, API, database, firmware, atau WebSocket.

Bagian kode menjelaskan file nyata di repository. Jika ada detail yang belum terlihat dari source, dokumentasi akan menandainya sebagai hal yang belum terlihat di snapshot kode saat ini.

## Cara Membaca File-by-File

Halaman file-by-file umumnya menjawab pertanyaan yang sama:

1. Ringkasan sederhana.
2. Posisi file dalam sistem.
3. Alasan file dibutuhkan.
4. Kapan file dipakai.
5. Alur kerja file.
6. Bagian penting seperti fungsi, variabel, input, output, dependency, error handling, keamanan, performa, dan debugging.

Pola ini membantu pembaca menemukan informasi penting tanpa harus menebak struktur halaman.

## Cara Menilai Status Dokumentasi

Status penting:

- `Pending`: file sudah ditemukan, tetapi belum didokumentasikan.
- `Drafted`: halaman awal sudah dibuat, tetapi belum direview penuh.
- `Reviewed`: halaman sudah dicek ulang.
- `Needs Verification`: ada bagian yang perlu dicek lagi ke kode atau perangkat.
- `Skipped With Reason`: file tidak didokumentasikan karena alasan jelas, misalnya dependency hasil install atau cache.

Lihat status terbaru di [Coverage Report](../14-complete-file-walkthrough/coverage-report.md).

## Jika Bingung Mulai Dari Mana

Mulai dari [Glossary](./glossary.md), lalu lanjut ke [Peta Belajar](./peta-belajar.md). Setelah itu baca dasar pemrograman satu per satu.
