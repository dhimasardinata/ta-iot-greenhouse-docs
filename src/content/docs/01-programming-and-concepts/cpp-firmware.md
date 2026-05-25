---
title: "C++ Firmware Concepts"
description: "Panduan konsep C++ sistem tertanam, perbedaan berkas header dan implementasi, serta konfigurasi build PlatformIO pada mikrokontroler."
---

# C++ Firmware Concepts

C++ adalah bahasa pemrograman utama yang digunakan pada firmware *Node* dan *Gateway* dalam proyek ini. C++ dipilih karena kemampuannya untuk berjalan sangat dekat dengan perangkat keras (hardware) dengan overhead minimal, namun tetap menyediakan abstraksi kelas dan templat yang kuat untuk mengelola kompleksitas sistem.

Dalam bab ini, kita akan membahas dasar-dasar C++ yang diterapkan di lingkungan sistem tertanam (*embedded systems*), pembagian struktur berkas, dan bagaimana PlatformIO mengelola build sistem ini.

---

## Pemisahan Header (`.h`) dan Implementasi (`.cpp`)

Untuk menjaga kerapian dan mempercepat waktu kompilasi, proyek ini memisahkan deklarasi dan definisi kode ke dalam berkas terpisah:

### 1. Berkas Header (`.h` / `.hpp`)
Berkas header berisi "cetak biru" atau kontrak fungsi, variabel, struktur data (`struct`), kelas (`class`), dan konstanta. Berkas ini bertindak seperti katalog yang memberi tahu kompiler apa saja fitur yang tersedia.

Contoh nyata:
*   [Paths.h](file:///home/dhimasardinata/Dokumen/ta/node/lib/NodeCore/storage/Paths.h): Mendeklarasikan jalur penyimpanan LittleFS dan route HTTP lokal di dalam *Node* menggunakan namespace `Paths`.
*   [ISensorManager.h](file:///home/dhimasardinata/Dokumen/ta/node/lib/NodeCore/interfaces/ISensorManager.h): Mendefinisikan antarmuka templat untuk pembacaan sensor menggunakan pola CRTP.
*   [ConfigManager.h](file:///home/dhimasardinata/Dokumen/ta/gateway/include/ConfigManager.h): Mendeklarasikan fungsi manajemen konfigurasi eksternal untuk *Gateway*.

### 2. Berkas Implementasi (`.cpp`)
Berkas ini berisi logika nyata dari fungsi-fungsi yang telah dideklarasikan di berkas header. Kompiler akan mengubah setiap berkas `.cpp` menjadi berkas objek (`.o`) secara terpisah sebelum menggabungkannya (*linking*) menjadi berkas biner firmware (`.bin`).

Contoh nyata:
*   [ConfigManager.cpp](file:///home/dhimasardinata/Dokumen/ta/gateway/src/ConfigManager.cpp): Mengimplementasikan cara membaca dan menulis konfigurasi ke NVS (*Non-Volatile Storage*).
*   [main.cpp](file:///home/dhimasardinata/Dokumen/ta/node/src/main.cpp): Berisi fungsi utama Arduino seperti `setup()` dan `loop()` untuk inisialisasi perangkat keras *Node*.

---

## Standar C++ pada Proyek IoT Greenhouse

Fitur C++ yang dapat kita gunakan sangat bergantung pada konfigurasi kompiler yang didefinisikan di berkas konfigurasi PlatformIO.

### 1. Firmware Node (ESP8266)
Firmware *Node* memaksa penggunaan standar C++20 melalui konfigurasi flag di `node/platformio.ini`:

```ini
build_flags =
    -std=gnu++20
    -fno-rtti
    -fno-exceptions
```

*   `-std=gnu++20`: Mengaktifkan standar C++20 dengan ekstensi GNU. Ini memungkinkan kita memakai fitur modern seperti `std::span`, `consteval`, dan *Fold Expressions*.
*   `-fno-rtti` & `-fno-exceptions`: Menonaktifkan RTTI (*Runtime Type Information*) dan *Exceptions* C++. Pada mikrokontroler kecil seperti ESP8266 dengan RAM terbatas, kedua fitur ini sangat mahal karena memakan ruang penyimpanan biner dan RAM secara signifikan. Segala penanganan error wajib dilakukan secara manual menggunakan nilai kembalian (*return value*), kode kesalahan (*error code*), atau status boolean.

### 2. Firmware Gateway (ESP32)
Firmware *Gateway* tidak menetapkan flag standar C++ eksplisit di `gateway/platformio.ini`. Jadi standar pastinya mengikuti toolchain/framework Arduino ESP32 yang dipakai PlatformIO, sementara source gateway tetap memakai gaya C++ modern seperti `auto`, `constexpr`, dan struktur data bertipe aman (`enum class`).

---

## Keamanan Kompiler (*Compiler Hardening*)

Untuk memastikan perangkat stabil sebelum dipasang di greenhouse, konfigurasi build proyek ini dikeraskan melalui opsi kompiler yang ketat pada `node/platformio.ini`.

Beberapa flag penting dalam menjaga kualitas kode meliputi:
*   `-Werror`: Mengubah semua peringatan kompiler (*warnings*) menjadi kegagalan build (*errors*). Hal ini memaksa pengembang menulis kode yang bersih tanpa ada variabel yang tidak terpakai atau konversi tipe yang berbahaya.
*   `-Wstack-usage=1024` & `-fstack-usage`: Menganalisis penggunaan memori stack pada fungsi. Jika sebuah fungsi menggunakan memori lokal lebih dari 1 KB (misal membuat buffer besar di stack), build akan langsung gagal untuk menghindari bahaya *Stack Overflow*.

---

## Pertanyaan Audit Pengembang Saat Membaca Kode

Setiap kali Anda membaca atau menulis kode C++ untuk firmware ini, selalu tanyakan hal-hal berikut:

1.  **Di mana data ini disimpan?** (Apakah di stack lokal, heap dinamis, RAM global, atau Flash/PROGMEM?)
2.  **Kapan alokasi memori terjadi?** (Apakah saat *compile-time* atau dinamis saat *runtime*?)
3.  **Apakah ada kemungkinan pointer menggantung (*dangling pointer*)?** (Misalnya referensi ke objek lokal yang umurnya sudah habis).
4.  **Bagaimana fungsi ini berperilaku jika memori sedang kritis?** (Apakah ia dapat menangani kegagalan alokasi memori secara aman?)

Topik-topik di atas akan dibahas lebih mendalam pada bagian selanjutnya:
*   [Modern C++ 11-20 di Firmware](./cpp-modern-11-20.md)
*   [Peta Memori Embedded](./embedded-memory-map.md)
*   [Standard Library dan Memori Firmware](./cpp-stdlib-memory.md)
