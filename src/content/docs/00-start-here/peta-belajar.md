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

## Level 3: C++ Firmware dan Memori

Target level ini adalah memahami C++ modern yang dipakai firmware serta konsekuensi memorinya.

Baca:

1. [C++ Firmware Concepts](../01-programming-and-concepts/cpp-firmware.md)
2. [Modern C++ 11-20 di Firmware](../01-programming-and-concepts/cpp-modern-11-20.md)
3. [Template Metaprogramming dan Compile-Time JSON](../01-programming-and-concepts/cpp-template-metaprogramming.md)
4. [Standard Library dan Memori Firmware](../01-programming-and-concepts/cpp-stdlib-memory.md)
5. [Peta Memori Embedded](../01-programming-and-concepts/embedded-memory-map.md)
6. [Stack Firmware Arduino dan PlatformIO](../01-programming-and-concepts/firmware-arduino-platformio.md)
7. [Runtime Jaringan Firmware](../01-programming-and-concepts/firmware-network-runtime.md)
8. [Storage, Cache, dan OTA Firmware](../01-programming-and-concepts/firmware-storage-cache-ota.md)
9. [Sensor, Aktuator, dan Waktu Firmware](../01-programming-and-concepts/firmware-sensor-actuator-time.md)
10. [Web UI Tertanam di Firmware](../01-programming-and-concepts/firmware-embedded-web-ui.md)
11. [GPRS dan Fallback Gateway](../01-programming-and-concepts/gateway-gprs-fallback.md)

Setelah level ini, pembaca mulai bisa membaca `auto`, `constexpr`, `consteval`, `std::array`, `std::span`, stack, heap, flash, `PROGMEM`, route web lokal, enkripsi browser, dan fallback modem tanpa melihatnya sebagai istilah terpisah.

## Level 4: Web dan API

Target level ini adalah memahami kode backend Laravel, frontend Vue, dan platform dokumentasi.

Baca:

1. [Laravel, Vue, and Android](../01-programming-and-concepts/laravel-vue-android.md)
2. [Laravel API dan Database Query](../01-programming-and-concepts/web-laravel-api-database.md)
3. [Vue Reactivity dan UI Greenhouse](../01-programming-and-concepts/web-vue-reactivity-ui.md)
4. [Visualisasi Web Leaflet dan Canvas](../01-programming-and-concepts/web-visualization-leaflet.md)
5. [JavaScript and TypeScript Tooling](../01-programming-and-concepts/javascript-typescript-tooling.md)
6. [Next.js, Fumadocs, dan Search Docs](../01-programming-and-concepts/docs-platform-next-fumadocs.md)

Setelah level ini, pembaca mulai memahami `Request`, `response()->json`, query builder, cache backend, Vue `ref`, `computed`, `watch`, Inertia props, Axios, Leaflet, canvas heatmap, TSX, route handler, dan search docs.

## Level 5: Sistem TA

Target level ini adalah memahami mengapa sistem dibuat dan komponen apa saja yang terlibat.

Baca bagian konteks TA setelah halaman-halaman dasar selesai. Fokusnya bukan lagi istilah program, tetapi masalah greenhouse, tujuan sistem, dan manfaat penelitian.

## Level 6: Arsitektur

Target level ini adalah memahami alur besar:

1. Node membaca sensor.
2. Node mengirim data.
3. Gateway menerima atau mengambil data.
4. Backend menyimpan data.
5. Web dan Android menampilkan data.
6. Gateway mengendalikan aktuator.

Arsitektur harus dibaca sebelum file-by-file agar pembaca tahu posisi setiap file.

## Level 7: File-by-File

Target level ini adalah memahami file nyata satu per satu. Jangan mulai dari level ini jika belum memahami gambaran besar, karena detail kode akan terasa terpisah-pisah.

Gunakan [Coverage Report](../14-complete-file-walkthrough/coverage-report.md) untuk memilih file. Mulai dari file utama seperti `main.cpp`, controller utama, atau komponen UI utama, lalu lanjut ke file pendukung.

## Level 8: Maintenance

Target level ini adalah mampu mengubah sistem dengan aman.

Sebelum mengubah kode:

1. Baca dokumentasi file yang akan diubah.
2. Baca file yang memanggilnya.
3. Baca file yang dipanggilnya.
4. Pahami input, output, error, dan side effect.
5. Jalankan pengujian yang relevan jika tersedia.

Jika belum yakin efeknya, beri catatan bahwa detail belum terlihat dari kode, lalu cek bagian terkait lebih lanjut.
