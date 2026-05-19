---
title: "Template Metaprogramming dan Compile-Time JSON"
---

# Template Metaprogramming dan Compile-Time JSON

Template metaprogramming adalah teknik memakai template C++ agar sebagian pekerjaan selesai saat build, bukan saat perangkat berjalan. Pada firmware, ini berguna jika hasilnya mengurangi alokasi heap, mengurangi copy string, atau menangkap salah ukuran buffer sebelum upload firmware.

Project node punya contoh jelas di `CompileTimeJSON.h`.

## Masalah yang Dipecahkan

Payload JSON sering punya bagian tetap dan bagian runtime.

Bagian tetap:

```json
{"gh_id":...,"node_id":...,"temperature":...}
```

Bagian runtime:

- `gh_id`,
- `node_id`,
- suhu,
- kelembapan,
- lux,
- RSSI,
- timestamp.

Jika semua dirangkai dengan `String` atau concat runtime, heap bisa terfragmentasi. Jika semua ditulis manual dengan `snprintf`, ukuran buffer perlu dihitung teliti. Compile-time helper mencoba memindahkan bagian statis ke compile time.

## `FixedString<N>`

`FixedString<N>` menyimpan string dengan ukuran yang diketahui compiler.

Konsepnya:

```cpp
template <size_t N>
struct FixedString {
  std::array<char, N> data{};
};
```

`N` menjadi bagian dari tipe. Artinya `FixedString<8>` dan `FixedString<16>` adalah dua tipe berbeda. Ini membuat compiler tahu ukuran string saat build.

Edge case:

- Ukuran termasuk null terminator jika dibuat dari string literal C.
- Makin banyak ukuran berbeda berarti makin banyak instansiasi template.
- Data tetap bisa masuk binary, jadi compile-time bukan berarti gratis flash.

## Non-Type Template Parameter

Template seperti ini:

```cpp
template <size_t N>
consteval auto string(const char (&str)[N]);
```

membuat compiler membaca ukuran literal langsung dari tipe parameter. Ini aman karena string literal membawa ukuran lengkap termasuk `\0`.

Edge case:

- Fungsi ini cocok untuk literal atau array yang ukurannya diketahui.
- Tidak cocok untuk `char*` runtime.
- Jika input berasal dari sensor, HTTP, atau filesystem, itu bukan compile-time data.

## Variadic Template

Variadic template menerima jumlah parameter yang berubah-ubah.

Contoh konsep:

```cpp
template <typename... Strings>
consteval auto concat_all(const Strings&... strings);
```

Ini dipakai untuk membuat JSON object dari banyak pasangan key-value.

Edge case:

- Pesan error bisa panjang karena compiler menampilkan banyak instansiasi.
- Recursion atau concat berlapis bisa memperbesar compile time.
- Jika hasil akhir panjang, flash bertambah walau heap runtime berkurang.

## `if constexpr`

`if constexpr` dipakai untuk menangani jumlah parameter:

- nol item menghasilkan `{}` atau `[]`,
- satu item langsung dipakai,
- banyak item digabung dengan koma.

Karena keputusan terjadi saat compile time, cabang yang tidak dipilih tidak menjadi jalur runtime.

Edge case:

- Cabang template yang salah tetap bisa muncul saat instansiasi tipe tertentu.
- Struktur template yang terlalu pintar bisa lebih sulit dirawat daripada `snprintf` biasa.

## `consteval`

`consteval` membuat fungsi wajib compile-time. Ini berbeda dari `constexpr`.

| Kata Kunci | Arti |
|---|---|
| `constexpr` | Bisa compile-time jika inputnya compile-time. Bisa runtime untuk fungsi tertentu. |
| `consteval` | Wajib compile-time. Input runtime ditolak compiler. |

Pada `CompileTimeJSON.h`, builder seperti `string`, `pair`, `object`, dan `buffer_size` dibuat `consteval` supaya template JSON tidak diam-diam dirangkai saat runtime.

## Buffer Size Compile-Time

Compile-time helper juga bisa menghitung ukuran buffer:

```cpp
template <size_t TemplateSize, size_t... PlaceholderMaxLens>
consteval size_t buffer_size() {
  return TemplateSize + (PlaceholderMaxLens + ...);
}
```

Ini memakai fold expression. Semua angka placeholder adalah compile-time, sehingga hasilnya bisa dipakai untuk menentukan ukuran array.

Edge case:

- Hitungan ini hanya benar jika batas maksimum placeholder realistis.
- Float bisa lebih panjang dari perkiraan jika format berubah.
- String runtime tetap perlu divalidasi agar tidak melebihi batas.

## Template Metaprogramming Tidak Selalu Lebih Baik

Template compile-time cocok jika:

- format statis sering dipakai,
- targetnya zero allocation,
- ukuran buffer perlu dikunci,
- biaya compile lebih murah daripada risiko runtime.

Template compile-time kurang cocok jika:

- format berubah dari server,
- payload sangat dinamis,
- error compiler jadi terlalu sulit,
- hasilnya membuat binary terlalu besar,
- tim pembaca belum siap merawat template kompleks.

## Risiko Khusus Embedded

| Risiko | Dampak |
|---|---|
| Code bloat | Banyak instansiasi template bisa menambah flash. |
| RAM tersembunyi | `std::array` besar tetap memakai RAM jika object-nya ditempatkan di RAM. |
| Compile lambat | Template recursion dan immediate function bisa memperlambat build. |
| Error sulit | Pesan error template sering panjang. |
| ABI/layout berubah | Struct yang disimpan ke flash perlu `static_assert` ukuran dan migrasi format. |

## Membaca `CompileTimeJSON.h`

Baca file itu dari lapisan paling bawah:

1. `FixedString<N>` sebagai wadah string berukuran tetap.
2. `concat` dan `concat_all` sebagai penggabung.
3. Primitive JSON seperti `string`, `number`, `bool_true`, `null`.
4. Builder `pair`, `object`, dan `array`.
5. Template payload seperti `SENSOR_PAYLOAD` dan `EDGE_PAYLOAD`.
6. `buffer_size` dan konstanta panjang maksimum.

## File yang Relevan

- [CompileTimeJSON.h](../14-complete-file-walkthrough/node/lib/NodeCore/support/CompileTimeJSON.h.md)
- [CompileTimeUtils.h](../14-complete-file-walkthrough/node/lib/NodeCore/support/CompileTimeUtils.h.md)
- [ApiClient.Context.h](../14-complete-file-walkthrough/node/lib/NodeCore/api/ApiClient.Context.h.md)
- [ApiClient.UploadRuntimeCycle.cpp](../14-complete-file-walkthrough/node/lib/NodeCore/api/ApiClient.UploadRuntimeCycle.cpp.md)
