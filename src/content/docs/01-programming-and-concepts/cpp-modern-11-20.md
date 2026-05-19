---
title: "Modern C++ 11-20 di Firmware"
---

# Modern C++ 11-20 di Firmware

Firmware node memakai `-std=gnu++20`. Gateway memakai gaya C++ modern juga, walau standard C++ belum ditulis eksplisit di `gateway/platformio.ini`.

Modern C++ di firmware bukan sekadar membuat kode terlihat baru. Tujuannya adalah membuat batas memori, tipe data, dan error lebih jelas sebelum perangkat dipasang di greenhouse.

## Ringkasan Versi

| Versi | Fitur yang Relevan | Contoh Peran di Firmware |
|---|---|---|
| C++11 | `auto`, lambda, `constexpr`, `enum class`, `static_assert`, move semantics, `std::array`, `std::unique_ptr` | Membuat state dan buffer lebih aman tanpa banyak macro. |
| C++14 | Generic lambda, `constexpr` lebih longgar | Helper kecil bisa lebih fleksibel. |
| C++17 | `if constexpr`, inline variable, structured binding | Template bisa memilih jalur saat compile time. |
| C++20 | `consteval`, `std::span`, NTTP class type, template lambda lebih kuat | Compile-time JSON dan view buffer tanpa copy. |

## `auto`

`auto` membuat compiler menebak tipe dari nilai di kanan. Ini berguna saat tipe panjang atau mudah berubah.

Contoh pola yang terlihat di source:

```cpp
auto& health = SystemHealth::HealthMonitor::instance();
const auto& cfg = m_deps.configManager.getConfig();
auto saved = savedSpan();
```

Makna teknisnya berbeda:

| Bentuk | Efek |
|---|---|
| `auto value = expr;` | Membuat copy jika `expr` bukan reference yang dipertahankan. |
| `auto& value = expr;` | Reference mutable, tidak copy. |
| `const auto& value = expr;` | Reference read-only, aman untuk object besar. |
| `auto* p = expr;` | Pointer tetap terlihat sebagai pointer. |

Edge case penting:

- `auto` biasa menghapus top-level `const` dan reference. Jika tidak ingin copy, pakai `auto&` atau `const auto&`.
- Pada range loop, `for (auto x : items)` menyalin tiap item. Untuk struct besar, gunakan `for (const auto& x : items)`.
- `auto list = {1, 2, 3};` bisa menjadi `std::initializer_list<int>`, bukan array biasa.
- `auto` pada lambda capture tidak menyelesaikan masalah lifetime. Jika lambda menyimpan reference ke object lokal yang sudah hilang, hasilnya tetap berbahaya.
- `auto` dapat menyembunyikan alokasi. Misalnya fungsi mengembalikan `String` atau `std::vector`, variabel `auto` tetap membawa biaya heap dari tipe tersebut.

## Lambda

Lambda adalah fungsi kecil di tempat. Firmware memakai lambda untuk helper lokal, callback web, dan operasi kecil yang dekat dengan konteksnya.

Contoh pola:

```cpp
auto append = /* captures local state by reference */ [](const char* text, size_t len) {
  // pakai state lokal di sekitar fungsi
};
```

Edge case lambda di firmware:

- Capture `[&]` mengambil semua yang dipakai sebagai reference. Aman jika lambda langsung dipakai, rawan jika lambda disimpan untuk callback yang hidup lebih lama.
- Capture `[=]` membuat copy. Copy object besar bisa membebani stack atau heap.
- Lambda yang masuk `std::function` bisa memicu alokasi heap jika capture terlalu besar atau implementasi tidak cukup memakai small buffer.
- Callback async perlu hati-hati dengan pointer ke object yang bisa dihancurkan lebih dulu.

## `constexpr`

`constexpr` berarti nilai atau fungsi bisa dievaluasi saat compile time jika inputnya juga compile-time.

Di project ini, `constexpr` dipakai untuk:

- port DNS,
- timeout Wi-Fi,
- limit WebSocket,
- batas heap,
- ukuran buffer TLS,
- kapasitas queue,
- hash seed,
- ukuran payload.

Contoh:

```cpp
constexpr uint32_t HEAP_WARNING_THRESHOLD = 8192;
constexpr uint16_t TLS_RX_BUF_SIZE = 2048;
```

Edge case:

- `constexpr` tidak selalu berarti pasti compile-time. Fungsi `constexpr` bisa berjalan runtime jika dipanggil dengan input runtime.
- `constexpr` object global tetap bisa memakai storage. Untuk array besar, lokasi memory tetap penting.
- Operasi `constexpr` yang kompleks bisa memperbesar waktu compile dan pesan error.
- Pada firmware lama, library belum tentu siap dipakai dalam konteks `constexpr`.

## `consteval`

`consteval` adalah C++20. Fungsi `consteval` wajib selesai saat compile time. Jika dipanggil dengan data runtime, compile gagal.

Project node memakai `consteval` di `CompileTimeJSON.h` untuk membangun string JSON statis saat build. Tujuannya mengurangi:

- runtime string concatenation,
- alokasi heap,
- kerja `snprintf` untuk bagian JSON yang tetap.

Contoh pola:

```cpp
consteval auto placeholder_int() {
  return FixedString("%d");
}
```

Edge case:

- `consteval` hanya bisa dipakai di build C++20 atau lebih baru.
- Tidak bisa menerima data sensor, SSID hasil scan, response HTTP, atau nilai runtime lain.
- Error compile bisa panjang karena template dan immediate function saling menumpuk.
- Hasil compile-time string tetap masuk binary. Jika template JSON terlalu banyak, flash bisa bertambah.

## `static_assert`

`static_assert` menghentikan build jika syarat compile-time tidak terpenuhi.

Project ini memakainya untuk:

- memastikan timeout masuk akal,
- memastikan threshold heap berurutan,
- memastikan ukuran `WifiCredential` tidak berubah tanpa migrasi storage,
- memastikan kapasitas command tidak terlalu besar.

Contoh konsep:

```cpp
static_assert(sizeof(WifiCredential) == WIFI_CRED_EXPECTED_SIZE,
              "WifiCredential size changed; storage format requires migration.");
```

Ini penting karena firmware menyimpan data ke flash/NVS/filesystem. Jika layout struct berubah tetapi data lama masih dibaca dengan layout baru, konfigurasi bisa rusak.

## `if constexpr`

`if constexpr` memilih cabang saat compile time. Cabang yang tidak dipilih tidak diinstansiasi untuk tipe template tersebut.

Pola ini terlihat di compile-time JSON untuk kasus variadic:

```cpp
if constexpr (sizeof...(strings) == 0) {
  return FixedString("");
}
```

Edge case:

- Kondisi harus compile-time.
- Cabang yang tidak dipilih tetap perlu valid secara sintaks umum. Untuk kode bergantung tipe, kesalahan bisa tetap muncul jika tidak ditulis sebagai dependent expression.
- Terlalu banyak cabang compile-time bisa membuat template sulit dibaca.

## `enum class`

`enum class` membuat enum lebih aman daripada enum C biasa. Nilainya tidak otomatis bercampur dengan integer.

Contoh di firmware:

- `UploadRecordSource`,
- `UploadRecordLoad`,
- `EmergencyQueueReason`,
- `UploadState`,
- `HttpState`,
- `QosTaskType`.

Edge case:

- Untuk disimpan ke flash atau dikirim sebagai byte, underlying type perlu jelas, misalnya `enum class Mode : uint8_t`.
- Log dan JSON tetap perlu mapping manual dari enum ke teks.
- Jangan mengandalkan nilai enum default jika format persistence perlu kompatibel jangka panjang.

## Move Semantics dan RAII

RAII berarti resource dibersihkan oleh destructor saat object keluar scope. `std::unique_ptr` adalah contoh utama.

Di firmware, RAII membantu agar buffer heap, HTTP client, trust anchor TLS, atau queue text tidak bocor saat return lebih awal.

Edge case:

- RAII tidak menghapus risiko OOM. `new (std::nothrow)` tetap bisa gagal dan perlu dicek.
- `std::unique_ptr<T[]>` menunjukkan array heap, bukan stack.
- Move membuat pemilik lama kosong. Setelah `std::move`, object lama hanya boleh dipakai dalam keadaan valid tetapi tidak diasumsikan masih punya data.

## Fitur yang Perlu Dihindari atau Dipakai Terbatas

Project node mengaktifkan `-fno-rtti` dan `-fno-exceptions`. Artinya:

- `dynamic_cast` dan `typeid` bukan pola utama,
- exception C++ tidak menjadi jalur error,
- error perlu dikembalikan lewat status, enum, boolean, atau log.

Untuk firmware kecil, fitur seperti `std::thread`, iostream berat, allocation-heavy container, dan exception biasanya tidak cocok kecuali benar-benar diukur.

## File yang Relevan

- [node/platformio.ini](../14-complete-file-walkthrough/config/node/platformio.ini.md)
- [node/include/config/constants.h](../14-complete-file-walkthrough/node/include/config/constants.h.md)
- [node/lib/NodeCore/support/CompileTimeJSON.h](../14-complete-file-walkthrough/node/lib/NodeCore/support/CompileTimeJSON.h.md)
- [node/lib/NodeCore/net/WifiCredentialStore.h](../14-complete-file-walkthrough/node/lib/NodeCore/net/WifiCredentialStore.h.md)
- [node/lib/NodeCore/api/ApiClient.State.h](../14-complete-file-walkthrough/node/lib/NodeCore/api/ApiClient.State.h.md)
