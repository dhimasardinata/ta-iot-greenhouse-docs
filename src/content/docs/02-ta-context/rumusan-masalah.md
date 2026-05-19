---
title: "Rumusan Masalah"
---

# Rumusan Masalah

Rumusan masalah adalah pertanyaan utama yang ingin dijawab oleh sistem Tugas Akhir.

## Rumusan Masalah Utama

Berdasarkan ruang lingkup `goal.md`, rumusan masalah dapat ditulis sebagai berikut:

1. Bagaimana merancang sistem IoT-WSN untuk memantau kondisi greenhouse anggrek?
2. Bagaimana node sensor membaca dan mengirim data lingkungan?
3. Bagaimana gateway menghubungkan pemantauan lokal, pengambilan data, dan kendali aktuator?
4. Bagaimana backend menyimpan dan menyediakan data untuk dashboard?
5. Bagaimana web dan Android menampilkan data serta menyediakan kontrol?
6. Bagaimana sistem menangani koneksi yang tidak selalu stabil?
7. Bagaimana keamanan komunikasi data dijaga?

## Kenapa Rumusan Ini Penting

Rumusan masalah membantu dokumentasi tetap fokus. Setiap file yang didokumentasikan harus dikaitkan kembali ke salah satu kebutuhan sistem.

Contoh:

- file sensor berkaitan dengan pemantauan data lingkungan,
- file API berkaitan dengan pengiriman dan penyimpanan data,
- file cache berkaitan dengan koneksi tidak stabil,
- file OTA berkaitan dengan maintenance firmware,
- file WebView berkaitan dengan akses mobile.

## Yang Belum Boleh Dikarang

Dokumentasi tidak boleh mengarang hasil penelitian seperti nilai akurasi sensor, delay, throughput, atau data loss jika belum ada file atau data pengujian yang membuktikannya.

Jika hasil belum tersedia, tulis:

> Belum terkonfirmasi dari kode atau data pengujian.

Lanjutkan ke [Tujuan](./tujuan.md).
