---
title: "Standard Library dan Memori Firmware"
---

# Standard Library dan Memori Firmware

Standard library C++ membantu membuat kode lebih aman, tetapi di firmware setiap container punya konsekuensi memori. Pertanyaan utamanya bukan hanya "fitur ini ada atau tidak", tetapi "memori fitur ini berada di mana dan kapan alokasinya terjadi".

## Ringkasan Cepat

| Tipe | Memiliki Memori? | Biasanya Memakai Heap? | Catatan Embedded |
|---|---:|---:|---|
| `std::array<T, N>` | Ya | Tidak, kecuali object pemiliknya di heap | Ukuran tetap, bagus untuk buffer firmware. |
| C array `T buf[N]` | Ya | Tidak, kecuali object pemiliknya di heap | Ringan, tetapi tidak membawa ukuran secara aman. |
| `std::span<T>` | Tidak | Tidak | View ke buffer lain, rawan dangling jika pemilik mati. |
| `std::string_view` | Tidak | Tidak | View ke string lain, tidak otomatis null-terminated. |
| `std::unique_ptr<T>` | Ya, sebagai pemilik | Ya untuk object yang ditunjuk | RAII untuk heap, tetap perlu cek OOM. |
| `std::vector<T>` | Ya | Ya | Fleksibel, tetapi bisa fragmentasi dan reallocation. |
| `std::string` / Arduino `String` | Ya | Sering heap | Mudah dipakai, perlu hati-hati di jalur sering dipanggil. |
| `std::optional<T>` | Ya, inline | Tidak jika `T` tidak heap | Cocok untuk nilai opsional kecil. |
| `std::variant<A, B>` | Ya, inline sebesar alternatif terbesar | Tidak jika alternatif tidak heap | Cocok untuk state terbatas, bisa memperbesar object. |
| `std::function` | Ya | Bisa | Callback mudah, capture besar bisa alokasi. |

## `std::array`

`std::array<T, N>` adalah wrapper untuk array ukuran tetap. Ia tidak melakukan alokasi heap sendiri.

Lokasi memorinya mengikuti lokasi object:

| Ditulis Di Mana | Lokasi Memori |
|---|---|
| Lokal di fungsi | Stack. |
| Member dari object global/static | `.bss` atau `.data` di RAM. |
| Member dari object yang dibuat dengan `new` | Heap. |
| `const` global yang benar-benar read-only | Bisa masuk flash/rodata, bergantung toolchain dan atribut. |

Contoh di project:

- `std::array<char, MAX_TOKEN_LEN>` untuk konfigurasi string node,
- `std::array<EmergencyRecord, kEmergencyQueueCapacity>` untuk emergency queue,
- `std::array<char, CryptoUtils::ENCRYPTION_BUFFER_SIZE>` untuk scratch buffer encryption,
- `std::array<WifiCredential, MAX_SAVED_NETWORKS>` di gateway.

Edge case:

- `std::array<char, 2048>` lokal tetap memakai stack 2 KB.
- `std::array` sebagai member object global tetap mengurangi RAM dari awal boot.
- Copy `std::array` menyalin seluruh isi. Untuk ukuran besar, pakai reference.
- `std::array<T, 0>` valid, tetapi `data()` bisa tidak boleh dereference.

## `std::vector`

`std::vector<T>` menyimpan data di heap dan bisa bertambah saat runtime. Gateway memakai `std::vector` pada crypto buffer di `CryptoUtils.cpp`.

Kelebihannya:

- ukuran fleksibel,
- mudah dipakai untuk output decode atau data yang panjangnya baru diketahui runtime,
- otomatis membersihkan memori saat keluar scope.

Risikonya:

- reallocation memindahkan data dan membatalkan pointer/reference/iterator lama,
- capacity bisa lebih besar dari size,
- gagal alokasi bisa terjadi saat heap kecil,
- allocation/free berulang bisa membuat fragmentasi,
- `clear()` menghapus isi tetapi biasanya tidak melepas capacity.

Pola aman:

```cpp
std::vector<uint8_t> buf;
buf.reserve(maxExpected);
```

Tetapi `reserve` juga tetap alokasi. Pada jalur request atau crypto, batas maksimum tetap perlu ada agar request besar tidak menguras heap.

## `std::span`

`std::span<T>` adalah view ke memori yang dimiliki pihak lain. Ia menyimpan pointer dan panjang.

Project node memakai `std::span` untuk:

- buffer credential,
- sanitasi string,
- hashing,
- escaping JSON,
- akses list credential tanpa copy.

Keuntungannya:

- fungsi tahu panjang buffer,
- tidak perlu template ukuran array di semua fungsi,
- tidak copy data.

Edge case:

- `std::span` tidak memperpanjang umur buffer.
- Jangan kembalikan span ke array lokal.
- Span ke `std::vector` menjadi invalid jika vector reallocation.
- `std::span<char>` mutable, `std::span<const char>` read-only.

## `std::string_view`

`std::string_view` adalah view ke teks. Ia tidak memiliki string dan tidak menjamin ada null terminator.

Project node memakainya untuk input command, URL, password, payload OTA, dan helper string.

Edge case:

- Jangan kirim `string_view.data()` ke fungsi C yang butuh null terminator kecuali buffer memang null-terminated.
- View ke temporary `String(...).c_str()` bisa dangling setelah temporary hilang.
- Jika data binary atau bisa berisi `\0`, panjang harus selalu ikut dipakai.

## `std::unique_ptr`

`std::unique_ptr<T>` memegang object heap dan membersihkannya otomatis.

Project node memakainya untuk:

- buffer heap yang hanya aktif saat diperlukan,
- trust anchor TLS,
- HTTP client,
- queue command terminal,
- buffer output terminal,
- config string besar.

Pola yang terlihat:

```cpp
std::unique_ptr<PayloadBuffer> sharedBuffer;
std::unique_ptr<BearSSL::X509List> localTrustAnchors;
```

Edge case:

- `unique_ptr` hanya mengelola lifetime. Ia tidak membuat alokasi menjadi murah.
- `new (std::nothrow)` bisa mengembalikan `nullptr`, jadi hasilnya perlu dicek.
- `unique_ptr<T[]>` berbeda dari `unique_ptr<T>`.
- Jika alokasi sering dibuat dan dihancurkan, fragmentasi tetap bisa terjadi.

## Arduino `String` dan `std::string`

Arduino `String` dan `std::string` memudahkan manipulasi teks, tetapi biasanya memakai heap.

Gateway banyak memakai `String`, misalnya untuk payload WebSocket, URL, dan konfigurasi. Ini wajar pada ESP32 yang RAM-nya lebih longgar daripada ESP8266, tetapi tetap perlu dipantau pada jalur request yang sering dipanggil.

Edge case:

- concat berulang seperti `a + b + c` bisa membuat beberapa alokasi sementara.
- Fragmentasi lebih berbahaya daripada sekadar total free heap. TLS bisa gagal jika blok kontigu tidak cukup.
- `reserve()` membantu, tetapi tetap perlu batas maksimum.
- `String` yang menyimpan credential atau token perlu dibersihkan atau dibatasi lifetime jika sensitif.

## `std::function`

`std::function` menyimpan callable seperti lambda atau function object. Project node memakainya untuk callback web seperti request flashing.

Edge case:

- Capture lambda kecil bisa masuk small buffer internal.
- Capture besar bisa alokasi heap.
- Capture reference ke object yang sudah mati akan dangling.
- Untuk callback firmware, pastikan owner callback hidup lebih lama daripada callback.

## Kenapa `std::array` Banyak Dipakai

Di firmware kecil, banyak buffer punya batas jelas:

- SSID maksimal 32 karakter plus terminator,
- password maksimal 64 karakter plus terminator,
- token punya batas,
- URL punya batas,
- packet WebSocket punya batas,
- payload sensor punya batas.

`std::array` membuat batas ini terlihat di tipe, sehingga compiler bisa membantu. Ini lebih mudah diaudit daripada pointer mentah tanpa panjang.

## Pilihan Praktis

| Kebutuhan | Pilihan yang Cocok |
|---|---|
| Buffer kecil sementara | C array lokal atau `std::array` lokal, cek ukuran stack. |
| Buffer besar yang jarang dipakai | `std::unique_ptr<std::array<...>>` atau heap buffer dengan guard. |
| Daftar ukuran tetap | `std::array`. |
| Daftar runtime yang benar-benar berubah | `std::vector` dengan batas, reserve, dan fallback OOM. |
| Passing buffer ke fungsi | `std::span`. |
| Passing teks tanpa copy | `std::string_view`, selama lifetime jelas. |
| String UI atau URL di ESP32 | `String` bisa dipakai, tetapi hindari concat liar di loop cepat. |
| String di ESP8266 jalur panas | Prefer buffer char, `snprintf`, `PSTR`, `F()`, dan helper `_P`. |

## File yang Relevan

- [gateway/src/CryptoUtils.cpp](../14-complete-file-walkthrough/gateway/src/CryptoUtils.cpp.md)
- [node/lib/NodeCore/api/ApiClient.Context.h](../14-complete-file-walkthrough/node/lib/NodeCore/api/ApiClient.Context.h.md)
- [node/lib/NodeCore/api/ApiClient.State.h](../14-complete-file-walkthrough/node/lib/NodeCore/api/ApiClient.State.h.md)
- [node/lib/NodeCore/system/ConfigManager.h](../14-complete-file-walkthrough/node/lib/NodeCore/system/ConfigManager.h.md)
- [node/lib/NodeCore/net/WifiCredentialStore.h](../14-complete-file-walkthrough/node/lib/NodeCore/net/WifiCredentialStore.h.md)
- [gateway/include/WiFiCredentialStore.h](../14-complete-file-walkthrough/gateway/include/WiFiCredentialStore.h.md)
