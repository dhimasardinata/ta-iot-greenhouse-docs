---
title: "Modern C++ 11-20 di Firmware"
description: "Penerapan fitur modern C++11 hingga C++20 untuk keamanan memori, optimasi compile-time, dan efisiensi resource pada ESP8266/ESP32."
---

# Modern C++ 11-20 di Firmware

Firmware node mengaktifkan C++20, sedangkan gateway memakai fitur C++ modern yang didukung toolchain Arduino ESP32. Fitur seperti `auto`, `constexpr`, `consteval`, `static_assert`, `enum class`, dan `std::unique_ptr` membantu membuat batas memori dan kontrak tipe lebih jelas.

Halaman ini membahas fitur C++11 hingga C++20 yang terlihat pada source. Manfaatnya bukan otomatis membuat semua kode lebih cepat, tetapi membuat beberapa keputusan bisa dipindah ke compile time dan mengurangi bug runtime.

---

## 1. Dedupe Tipe dengan `auto`

Kata kunci `auto` meminta kompiler untuk menyimpulkan tipe data variabel berdasarkan nilai inisialisasinya pada saat kompilasi. Penggunaan `auto` yang tepat dapat meningkatkan keterbacaan kode secara drastis.

### Aturan & Praktik Terbaik di Project Ini
*   **Gunakan Referensi (`auto&` / `const auto&`) untuk Menghindari Salinan Berat:**
    Jika objek berukuran besar (seperti kelas `String` Arduino atau struktur data kustom), menggunakan `auto` biasa akan menduplikasi objek tersebut ke stack baru. Gunakan `const auto&` untuk membaca tanpa menyalin.

    Contoh nyata dari [ConfigManager.cpp](file:///home/dhimasardinata/Dokumen/ta/gateway/src/ConfigManager.cpp):
    ```cpp
    for (auto& slot : g_adminAuthRateSlots) {
        // 'slot' adalah referensi ke elemen asli di array, bukan salinan.
    }
    ```
*   **Waspada Dangling References dalam Lambda:**
    Jika variabel lokal di-capture berdasarkan referensi (`[&]`) di dalam lambda async, pastikan lambda tersebut tidak dieksekusi setelah variabel lokal tersebut dihancurkan dari stack.
*   **Hindari Alokasi Heap Tersembunyi:**
    Tipe bawaan Arduino seperti `String` menggunakan alokasi heap dinamis di balik layar. Selalu gunakan `String` seminimal mungkin dan lebih pilih `const char*` atau `std::string_view` jika memungkinkan.

---

## 2. Pemrograman Evaluasi Compile-Time (`constexpr` & `consteval`)

Memindahkan kalkulasi dari runtime (saat alat berjalan) ke compile-time (saat kompilasi di laptop) adalah kunci efisiensi memori pada mikrokontroler dengan RAM kecil.

### constexpr
Mendeklarasikan bahwa nilai suatu variabel atau kembalian fungsi dapat dihitung pada saat kompilasi.

Contoh nyata dari [constants.h](file:///home/dhimasardinata/Dokumen/ta/node/include/config/constants.h):
```cpp
// Batas memori heap aman sebelum peringatan dikeluarkan
constexpr uint32_t HEAP_WARNING_THRESHOLD = 8192;
constexpr uint32_t HEAP_CRITICAL_THRESHOLD = 4096;
```
Dengan menggunakan `constexpr`, nilai tersebut bisa dipakai compiler sebagai konstanta saat build. Lokasi storage final tetap bergantung pada cara nilai dipakai dan hasil optimasi compiler.

### consteval (C++20)
Fungsi `consteval` (disebut juga *immediate function*) **wajib** dievaluasi pada saat kompilasi. Jika kompiler tidak bisa menyelesaikannya secara statis, ia akan menghasilkan error.

Contoh nyata pada generator JSON bebas alokasi dinamis [CompileTimeJSON.h](file:///home/dhimasardinata/Dokumen/ta/node/lib/NodeCore/support/CompileTimeJSON.h):
```cpp
template <size_t N>
struct FixedString {
    std::array<char, N> data{};
    // Konstruktor consteval menjamin parser dijalankan saat kompilasi
    consteval FixedString(const char (&str)[N]) {
        std::copy_n(str, N, data.begin());
    }
};
```
Ini memastikan format payload JSON dihitung tanpa memerlukan alokasi memori dinamis (`std::string` atau buffer runtime) ketika alat dijalankan.

---

## 3. Validasi Kompilasi Statis dengan `static_assert`

`static_assert` digunakan untuk melakukan pengecekan logika/kondisi tipe data pada saat kompilasi. Jika kondisi bernilai `false`, kompilasi akan gagal dengan pesan yang ramah. Ini mencegah bug logika lolos ke firmware biner.

Contoh nyata dari [WifiCredentialStore.h](file:///home/dhimasardinata/Dokumen/ta/node/lib/NodeCore/net/WifiCredentialStore.h):
```cpp
static_assert(sizeof(WifiCredential) == WIFI_CRED_EXPECTED_SIZE,
              "WifiCredential size changed; storage format requires migration.");
```
Jika ada pengembang lain yang tidak sengaja mengubah ukuran struct `WifiCredential` (misal memperlebar panjang buffer SSID), sistem build akan langsung menolak proses kompilasi sebelum sempat di-upload ke hardware.

---

## 4. `if constexpr` untuk Conditional Compile-Time

Dalam fungsi berbasis templat, `if constexpr` memungkinkan kompiler untuk mengevaluasi percabangan logika secara statis dan **hanya mengompilasi cabang yang aktif**. Cabang yang bernilai `false` akan diabaikan sepenuhnya dan tidak akan dimasukkan ke dalam biner akhir.

Pola ini terlihat di generator JSON [CompileTimeJSON.h](file:///home/dhimasardinata/Dokumen/ta/node/lib/NodeCore/support/CompileTimeJSON.h), misalnya untuk memilih bentuk object kosong atau object berisi pasangan key-value pada saat compile time.

---

## 5. Tipe Aman dengan `enum class`

`enum` tradisional memiliki kelemahan karena mengekspos nilainya ke lingkup global (*implicit conversion* ke integer). `enum class` (scoped enum) memecahkan masalah ini dengan mewajibkan resolusi nama lengkap dan melarang konversi tipe implisit tanpa cast eksplisit.

Contoh nyata dari [ApiClient.State.h](file:///home/dhimasardinata/Dokumen/ta/node/lib/NodeCore/api/ApiClient.State.h):
```cpp
enum class UploadRecordSource : uint8_t {
    NONE,
    RTC,
    LITTLEFS
};
```
*   `UploadRecordSource::NONE` tidak akan bentrok dengan konstanta `NONE` di pustaka lain.
*   Pemberian tipe `: uint8_t` memaksa kompiler menggunakan memori hanya **1 byte** untuk menyimpan status ini, alih-alih tipe default `int` (4 byte).

---

## 6. Smart Pointer (`std::unique_ptr`) dan RAII

RAII (*Resource Acquisition Is Initialization*) menjamin bahwa resource (memori heap, file handle, socket) dikelola secara otomatis mengikuti siklus hidup objek (*lifetime*).

Di firmware *Node*, alokasi dinamis dipantau ketat menggunakan `std::unique_ptr` untuk mencegah kebocoran memori (*memory leak*).

Contoh nyata dari [ApiClient.State.h](file:///home/dhimasardinata/Dokumen/ta/node/lib/NodeCore/api/ApiClient.State.h):
```cpp
struct TransportRuntime {
    // ...
    std::unique_ptr<HTTPClient> httpClient;
    // ...
};
```
Ketika objek `TransportRuntime` dihancurkan atau keluar dari *scope*, objek `HTTPClient` di dalamnya yang dialokasikan di heap akan otomatis di-`delete` tanpa memerlukan pemanggilan manual.

> [!WARNING]
> Jangan gunakan `new` mentah jika memungkinkan. Jika terpaksa menggunakan `new` karena keterbatasan alokasi statis, selalu gunakan varian non-throwing `new (std::nothrow)` dan periksa apakah pointer yang dikembalikan bernilai `nullptr`.

---

## Fitur C++ Modern yang Dihindari di Firmware

Untuk menjaga kestabilan sistem tertanam dengan RAM sempit (< 80 KB pada ESP8266), beberapa fitur C++ dilarang digunakan dalam proyek ini:

1.  **Exceptions (`try`, `catch`, `throw`):** Dilarang lewat flag `-fno-exceptions`. Menambahkan ukuran biner berkali-kali lipat dan membahayakan siklus runtime akibat ketidakpastian memori stack.
2.  **RTTI (`dynamic_cast`):** Dilarang lewat flag `-fno-rtti`. Menambahkan overhead runtime untuk pelacakan tipe objek.
3.  **Library `std::thread` & `std::mutex` bawaan C++:** Digantikan oleh mekanisme scheduler non-blocking berbasis timer [IntervalTimer.h](file:///home/dhimasardinata/Dokumen/ta/node/lib/NodeCore/system/IntervalTimer.h) atau task manager FreeRTOS pada ESP32 untuk menghindari *deadlock* dan alokasi stack thread yang boros.
4.  **`std::cout` & `std::cin` (iostreams):** Digantikan oleh `Serial.print` bawaan Arduino karena pustaka iostreams C++ sangat berat untuk mikroprosesor 32-bit sederhana.
