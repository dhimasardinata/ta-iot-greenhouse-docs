---
title: "Programming and Concepts"
---

# Programming and Concepts

Bagian ini menjelaskan istilah yang muncul di kode TA IoT Greenhouse. Pembaca diasumsikan mulai dari nol, sehingga istilah bahasa, framework, library, firmware, web, database, jaringan, keamanan, dan pengujian diberi rujukan singkat.

Mulai dari halaman dasar programming jika belum paham file, folder, variabel, tipe data, fungsi, kondisi, dan perulangan. Setelah itu lanjutkan ke halaman C++ firmware, JavaScript tooling, Laravel/Vue, jaringan IoT, keamanan, dan testing.

## Fokus C++ Firmware

Untuk membaca firmware node dan gateway, baca halaman ini berurutan:

1. [C++ Firmware Concepts](./cpp-firmware.md)
2. [Modern C++ 11-20 di Firmware](./cpp-modern-11-20.md)
3. [Template Metaprogramming dan Compile-Time JSON](./cpp-template-metaprogramming.md)
4. [Standard Library dan Memori Firmware](./cpp-stdlib-memory.md)
5. [Peta Memori Embedded](./embedded-memory-map.md)
6. [Stack Firmware Arduino dan PlatformIO](./firmware-arduino-platformio.md)
7. [Runtime Jaringan Firmware](./firmware-network-runtime.md)
8. [Storage, Cache, dan OTA Firmware](./firmware-storage-cache-ota.md)
9. [Sensor, Aktuator, dan Waktu Firmware](./firmware-sensor-actuator-time.md)
10. [Web UI Tertanam di Firmware](./firmware-embedded-web-ui.md)
11. [GPRS dan Fallback Gateway](./gateway-gprs-fallback.md)

Urutan ini membantu pembaca memahami kenapa kode memakai `auto`, `constexpr`, `consteval`, `std::array`, `std::span`, `std::unique_ptr`, `PROGMEM`, guard heap, WebSocket lokal, AES-CBC browser, dan fallback GPRS.

## Fokus Kode Web

Untuk membaca backend, frontend, dan platform docs, baca:

1. [Laravel, Vue, and Android](./laravel-vue-android.md)
2. [Laravel API dan Database Query](./web-laravel-api-database.md)
3. [Vue Reactivity dan UI Greenhouse](./web-vue-reactivity-ui.md)
4. [Visualisasi Web Leaflet dan Canvas](./web-visualization-leaflet.md)
5. [JavaScript and TypeScript Tooling](./javascript-typescript-tooling.md)
6. [Next.js, Fumadocs, dan Search Docs](./docs-platform-next-fumadocs.md)

Coverage lengkap konsep ada di [Concept Coverage](../99-generated/concept-coverage.md).
