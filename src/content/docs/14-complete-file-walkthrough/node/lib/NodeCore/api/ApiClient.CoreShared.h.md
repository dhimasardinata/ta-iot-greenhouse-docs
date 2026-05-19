---
title: "node/lib/NodeCore/api/ApiClient.CoreShared.h"
---

# node/lib/NodeCore/api/ApiClient.CoreShared.h

File ini berisi helper kecil untuk menulis string dengan aman.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/api/ApiClient.CoreShared.h` |
| Komponen | Firmware Node |
| Level | Menengah |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

File ini menyediakan fungsi append/copy untuk buffer `char`. Tujuannya sederhana: menyusun teks atau angka ke buffer tanpa melewati batas ukuran buffer.

## Kenapa File Ini Ada

Di firmware embedded, string dinamis bisa boros RAM. File ini membantu menyusun pesan, JSON kecil, atau label dengan cara yang lebih terkontrol memakai buffer tetap.

## Isi Penting

| Fungsi | Fungsi sederhana |
|---|---|
| `u32_to_dec` | Mengubah angka `uint32_t` menjadi teks desimal. |
| `append_literal` | Menambahkan teks biasa ke buffer. |
| `append_literal_P` | Menambahkan teks dari flash/PROGMEM ke buffer. |
| `copy_trunc_P` | Menyalin teks flash dengan batas panjang. |
| `append_u32` | Menambahkan angka unsigned ke buffer. |
| `append_i32` | Menambahkan angka signed ke buffer, termasuk tanda minus. |
| `append_cstr` | Alias untuk menambahkan string C biasa. |

## Dependency Internal

| Dependency | Fungsi |
|---|---|
| Arduino/ESP8266 string helpers | Dipakai untuk `PGM_P`, `strlen_P`, `memcpy_P`, dan `PSTR`. |
| Modul `ApiClient.*` | Memakai helper ini saat membangun teks pendek atau payload. |

## Catatan Desain

Semua fungsi menerima `out_len` dan menjaga karakter akhir `'\0'`. Ini mengurangi risiko string tidak tertutup atau buffer overflow.

## Error Handling

Jika pointer kosong, ukuran nol, atau posisi sudah melewati batas, fungsi langsung kembali tanpa menulis data.

## Catatan Performa

Helper ini menghindari `String` dinamis untuk operasi kecil. Ini cocok untuk ESP8266 karena fragmentasi heap bisa membuat alokasi berikutnya gagal.

## Catatan Debugging

Jika teks hasil upload atau log terpotong, cek ukuran buffer pemanggil. File ini memang memotong isi agar tetap aman.

## Hubungan dengan Laporan TA

File ini adalah contoh praktik memori aman di firmware: lebih baik output terpotong daripada perangkat crash karena buffer meluap.
