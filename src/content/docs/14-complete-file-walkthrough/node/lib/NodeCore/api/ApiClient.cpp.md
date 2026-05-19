---
title: "node/lib/NodeCore/api/ApiClient.cpp"
---

# node/lib/NodeCore/api/ApiClient.cpp

File ini mengatur buffer bersama milik `ApiClient`.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/api/ApiClient.cpp` |
| Komponen | Firmware Node |
| Level | Menengah |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

File ini berisi fungsi kecil untuk membuat, mengambil, dan melepas `sharedBuffer`. Buffer ini dipakai controller `ApiClient` saat membuat payload atau membaca hasil sementara tanpa membuat banyak alokasi memori terpisah.

## Kenapa File Ini Ada

ESP8266 punya RAM terbatas. Payload JSON dan proses upload bisa butuh buffer cukup besar. File ini membuat buffer besar hanya saat dibutuhkan, lalu bisa dilepas lagi setelah selesai.

## Isi Penting

| Fungsi | Fungsi sederhana |
|---|---|
| `ensureSharedBuffer()` | Membuat buffer jika belum ada. Jika alokasi gagal, menulis warning log. |
| `releaseSharedBuffer()` | Menghapus buffer dari RAM. |
| `sharedBuffer()` | Mengembalikan pointer `char*` ke isi buffer. |
| `sharedBuffer() const` | Versi baca saja dari pointer buffer. |
| `sharedBufferSize()` | Mengembalikan ukuran buffer yang sedang tersedia. |

## Dependency Internal

| Dependency | Fungsi |
|---|---|
| `ApiClient.h` | Deklarasi class dan tipe `PayloadBuffer`. |
| `system/Logger.h` | Mencatat warning saat alokasi buffer gagal. |
| `ApiClient.Context.h` | Tempat `m_resources.sharedBuffer` disimpan. |

## Alur Kerja

1. Controller memanggil `ensureSharedBuffer()`.
2. Jika buffer belum ada, firmware mencoba membuat `PayloadBuffer` dengan `new (std::nothrow)`.
3. Jika berhasil, byte pertama dibuat `'\0'` supaya aman dibaca sebagai string kosong.
4. Setelah operasi selesai, controller bisa memanggil `releaseSharedBuffer()`.

## Error Handling

Saat RAM tidak cukup, fungsi tidak crash karena memakai `std::nothrow`. Fungsi mengembalikan `false` dan menulis log `Shared buffer alloc failed`.

## Catatan Performa

Desain ini mengurangi alokasi berulang di banyak file upload. Buffer tetap hanya satu, sehingga penggunaan RAM lebih mudah dikontrol.

## Catatan Debugging

Jika payload gagal dibuat atau upload berhenti karena buffer null, cek log kategori `MEM` dan status heap sebelum fungsi ini dipanggil.

## Hubungan dengan Laporan TA

File ini menunjukkan strategi firmware embedded: memori besar dipakai hemat, dibuat saat perlu, dan dilepas saat tidak dipakai.
