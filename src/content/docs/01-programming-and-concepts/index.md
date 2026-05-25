---
title: "Pemrograman & Konsep"
description: "Indeks panduan pemrograman C++ modern dan konsep sistem tertanam (embedded systems) pada proyek IoT Greenhouse."
---

# Pemrograman & Konsep

Selamat datang di modul dokumentasi konsep pemrograman untuk proyek IoT Greenhouse! Bagian ini dirancang untuk menjembatani kode C++ di firmware dengan konsep dasar sistem tertanam (*embedded systems*) yang digunakan pada perangkat *Node* dan *Gateway*.

Dokumentasi ini ditulis dalam bahasa Indonesia yang ramah pengembang (*developer-friendly*) namun tetap profesional, lengkap dengan contoh nyata dari struktur kode proyek ini.

## Navigasi Panduan C++ & Firmware

Untuk memahami cara kerja firmware *Node* dan *Gateway* secara mendalam, kami menyarankan Anda membaca topik-topik berikut secara berurutan:

1. **[C++ Firmware Concepts](./cpp-firmware.md)**
   Dasar-dasar C++ pada firmware, struktur kompilasi dengan berkas header (`.h`) dan implementasi (`.cpp`), serta alur build menggunakan PlatformIO.
2. **[Modern C++ 11-20 di Firmware](./cpp-modern-11-20.md)**
   Penerapan fitur modern seperti `auto`, `constexpr`, `std::unique_ptr`, `std::span`, dan `std::array` untuk performa tinggi dan alokasi memori statis.
3. **[Pola C++ di Firmware](./cpp-patterns-firmware.md)**
   Pola desain (*design patterns*) yang umum digunakan di sistem tertanam seperti CRTP (*Curiously Recurring Template Pattern*), Facade, Observer, State Machine, dan Singleton.
4. **[Template Metaprogramming & Compile-Time JSON](./cpp-template-metaprogramming.md)**
   Metaprogramming berbasis template untuk memindahkan pemrosesan payload JSON ke waktu kompilasi (*compile-time*) demi menghindari fragmentasi memori runtime.
5. **[Standard Library & Memori Firmware](./cpp-stdlib-memory.md)**
   Cara menggunakan C++ Standard Library secara aman pada mikrokontroler dengan meminimalisir alokasi heap dinamis.
6. **[Peta Memori Embedded](./embedded-memory-map.md)**
   Pembagian sektor memori (Flash, RAM, IRAM, DRAM, RTC RAM, NVS, LittleFS) pada chip ESP8266/ESP32 dan teknik optimasinya.
7. **[Web UI Tertanam di Firmware](./firmware-embedded-web-ui.md)**
   Pengembangan antarmuka konfigurasi lokal menggunakan Captive Portal, WebSerial, WebSocket, dan optimalisasi aset web di dalam Flash.

## Mengapa Dokumentasi Ini Penting?

Dengan membaca seri dokumentasi ini, Anda akan memahami keputusan arsitektural yang diambil dalam kode proyek, seperti:
- Mengapa kami menggunakan `std::span` daripada menyalin array byte mentah?
- Bagaimana `consteval` membantu menghemat alokasi memori dinamis hingga 0 byte saat merangkai payload JSON?
- Mengapa observer tertentu didefinisikan secara virtual sedangkan manajer sensor menggunakan templat CRTP statis?

Semua jawaban tersebut disertai rujukan langsung ke berkas kode proyek agar Anda dapat mempelajari kode sumber aslinya.
