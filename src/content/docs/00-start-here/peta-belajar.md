---
title: "Peta Belajar"
---

# Peta Belajar

Peta belajar ini membantu pembaca menentukan jalur membaca sesuai tingkat pemahaman.

## Level 0: Belum Pernah Membaca Kode

Target level ini adalah tahu apa itu file, folder, project, program, dan source code.

Baca:

1. [Apa Itu Program](../01-programming-fundamentals/apa-itu-program.md)
2. [File, Folder, dan Project](../01-programming-fundamentals/file-folder-project.md)
3. [Variabel dan Tipe Data](../01-programming-fundamentals/variabel-dan-tipe-data.md)

Setelah level ini, pembaca diharapkan bisa melihat file kode tanpa merasa semuanya acak.

## Level 1: Dasar Logika Program

Target level ini adalah memahami bahwa program berjalan mengikuti urutan, kondisi, dan perulangan.

Baca:

1. [Kondisi dan Perulangan](../01-programming-fundamentals/kondisi-dan-perulangan.md)
2. [Fungsi dan Parameter](../01-programming-fundamentals/fungsi-dan-parameter.md)
3. [Algoritma Dasar](../01-programming-fundamentals/algoritma-dasar.md)

Setelah level ini, pembaca mulai bisa memahami alur `jika suhu terlalu tinggi, nyalakan fan`.

## Level 2: Data dan Struktur

Target level ini adalah memahami bagaimana data disimpan dan dibawa antar bagian program.

Baca:

1. [Array, Object, Struct, dan Enum](../01-programming-fundamentals/array-object-struct-enum.md)
2. [Debugging Dasar](../01-programming-fundamentals/debugging-dasar.md)

Setelah level ini, pembaca mulai bisa memahami payload sensor, data JSON, status perangkat, dan konfigurasi.

## Level 3: Sistem TA

Target level ini adalah memahami mengapa sistem dibuat dan komponen apa saja yang terlibat.

Baca bagian konteks TA setelah halaman-halaman dasar selesai. Fokusnya bukan lagi istilah program, tetapi masalah greenhouse, tujuan sistem, dan manfaat penelitian.

## Level 4: Arsitektur

Target level ini adalah memahami alur besar:

1. Node membaca sensor.
2. Node mengirim data.
3. Gateway menerima atau mengambil data.
4. Backend menyimpan data.
5. Web dan Android menampilkan data.
6. Gateway mengendalikan aktuator.

Arsitektur harus dibaca sebelum file-by-file agar pembaca tahu posisi setiap file.

## Level 5: File-by-File

Target level ini adalah memahami file nyata satu per satu. Jangan mulai dari level ini jika belum memahami gambaran besar, karena detail kode akan terasa terpisah-pisah.

Gunakan [Coverage Report](../14-complete-file-walkthrough/coverage-report.md) untuk memilih file. Mulai dari file utama seperti `main.cpp`, controller utama, atau komponen UI utama, lalu lanjut ke file pendukung.

## Level 6: Maintenance

Target level ini adalah mampu mengubah sistem dengan aman.

Sebelum mengubah kode:

1. Baca dokumentasi file yang akan diubah.
2. Baca file yang memanggilnya.
3. Baca file yang dipanggilnya.
4. Pahami input, output, error, dan side effect.
5. Jalankan pengujian yang relevan jika tersedia.

Jika belum yakin efeknya, tulis dulu catatan `Belum terkonfirmasi dari kode` dan verifikasi lebih lanjut.
