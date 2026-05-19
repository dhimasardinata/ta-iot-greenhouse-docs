---
title: "Tujuan"
---

# Tujuan

Tujuan menjelaskan apa yang ingin dicapai oleh sistem.

## Tujuan Utama

Tujuan utama sistem ini adalah membangun sistem IoT Greenhouse yang dapat membantu pemantauan, pengendalian, dan manajemen data greenhouse anggrek melalui node sensor, gateway, backend, web, Android, dan database.

## Tujuan Teknis

Tujuan teknis yang terlihat dari ruang lingkup dokumentasi:

1. Node sensor membaca data lingkungan.
2. Node mengirim data ke cloud atau gateway.
3. Gateway mengambil data, threshold, dan jadwal.
4. Gateway mengendalikan aktuator sesuai aturan sistem.
5. Backend menyediakan endpoint API.
6. Database menyimpan data historis dan snapshot.
7. Web dashboard menampilkan monitoring dan kontrol.
8. Android WebView menyediakan akses mobile.
9. Sistem memiliki mekanisme OTA update.
10. Sistem memiliki pendekatan keamanan komunikasi.

## Tujuan Dokumentasi

Dokumentasi ini juga punya tujuan sendiri:

1. membantu pembaca awam memahami sistem dari nol,
2. menjelaskan semua komponen secara runtut,
3. memastikan tidak ada source file penting yang terlewat,
4. membantu developer baru melakukan maintenance,
5. membantu penyusunan atau pembelaan laporan TA.

## Hubungan dengan File-by-File

Setiap halaman file-by-file nanti harus menjawab pertanyaan: file ini membantu tujuan sistem yang mana?

Contoh:

- `main.cpp` membantu proses boot dan loop utama,
- controller Laravel membantu API,
- komponen Vue membantu tampilan dashboard,
- file Android membantu akses mobile,
- file cache membantu keandalan data.

Lanjutkan ke [Batasan Masalah](./batasan-masalah.md).
