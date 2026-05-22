---
title: "C++ Firmware Concepts"
---

# C++ Firmware Concepts

C++ dipakai pada firmware node dan gateway karena bisa berjalan dekat dengan hardware, tetapi tetap punya fitur abstraksi yang kuat. Di source project ini, C++ dipakai untuk membaca sensor, mengelola Wi-Fi, menyimpan cache, mengirim data, menjalankan OTA, membuat terminal lokal, dan menjaga batas memori.

Untuk pemula, anggap header `.h` sebagai daftar janji fungsi atau bentuk data, sedangkan file `.cpp` sebagai tempat pekerjaan sebenarnya dilakukan.

## Standard C++ yang Terlihat

Firmware node menetapkan `-std=gnu++20` di `node/platformio.ini`. Artinya kode node bisa memakai fitur C++20 seperti `std::span`, `consteval`, template lambda, dan compile-time helper yang lebih modern.

Firmware gateway belum menetapkan flag standard C++ eksplisit di `gateway/platformio.ini`, tetapi source gateway memakai fitur C++11+ seperti `auto`, `constexpr`, lambda, dan `std::array`.

## Konsep yang Sering Muncul

| Konsep | Dipakai Untuk |
|---|---|
| `struct` dan `class` | Mengelompokkan data dan perilaku, misalnya state upload, credential Wi-Fi, dan manager service. |
| `enum class` | Status yang lebih aman daripada angka bebas, misalnya mode upload atau keputusan queue. |
| `constexpr` | Konstanta dan perhitungan yang bisa selesai saat build. |
| `consteval` | Fungsi yang wajib berjalan saat compile time, terlihat pada compile-time JSON. |
| `static_assert` | Validasi ukuran buffer, limit, dan layout struct saat build. |
| `auto` | Membuat tipe panjang lebih mudah dibaca, terutama untuk reference, lambda, dan iterator. |
| `std::array` | Buffer ukuran tetap tanpa alokasi heap. |
| `std::span` | View ke buffer tanpa memiliki memori. |
| `std::unique_ptr` | Kepemilikan heap yang otomatis dibersihkan. |
| `PROGMEM`, `F()`, `PSTR()` | Menaruh string/asset di flash agar RAM tidak cepat habis. |

## Pola Desain yang Akan Sering Terlihat

Selain fitur bahasa, firmware ini memakai beberapa pola C++:

- **CRTP** untuk interface tanpa virtual call pada jalur yang perlu ringan, misalnya sensor, cache, dan auth terminal.
- **Observer** agar modul Wi-Fi atau konfigurasi bisa memberi kabar ke modul lain.
- **Facade** agar `ApiClient` menjadi satu pintu masuk untuk upload, TLS, cache, queue, dan QoS.
- **State machine** agar loop firmware bergerak antar status yang jelas, bukan menunggu dengan `delay()` panjang.
- **Controller split** agar detail HTTP, queue, upload, dan QoS tidak menumpuk di satu file besar.

Penjelasan praktisnya ada di [Pola C++ di Firmware](./cpp-patterns-firmware.md).

## Cara Membaca Source C++

Baca C++ firmware dari pertanyaan teknis berikut:

1. Apakah data ini ada di stack, heap, global RAM, atau flash?
2. Apakah ukuran buffer diketahui saat compile time?
3. Apakah ada alokasi dinamis saat runtime?
4. Apakah pointer/view masih hidup saat dipakai?
5. Apakah fungsi ini bisa berjalan saat heap rendah?
6. Apakah kode ini membuat copy besar tanpa sengaja?

Halaman lanjutan:

- [Modern C++ 11-20 di Firmware](./cpp-modern-11-20.md)
- [Pola C++ di Firmware](./cpp-patterns-firmware.md)
- [Template Metaprogramming dan Compile-Time JSON](./cpp-template-metaprogramming.md)
- [Standard Library dan Memori Firmware](./cpp-stdlib-memory.md)
- [Peta Memori Embedded](./embedded-memory-map.md)
