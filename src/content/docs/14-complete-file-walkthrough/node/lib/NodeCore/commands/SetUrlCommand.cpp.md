---
title: "node/lib/NodeCore/commands/SetUrlCommand.cpp"
---

# node/lib/NodeCore/commands/SetUrlCommand.cpp

File ini mengimplementasikan command `seturl`.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/commands/SetUrlCommand.cpp` |
| Komponen | Firmware Node |
| Level | Lanjutan |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

Command ini bisa menampilkan URL saat ini, mengatur URL upload/OTA, mengembalikan default, atau mengosongkan override URL.

## Validasi

URL baru harus diawali `http://` atau `https://`, tidak boleh melebihi `MAX_URL_LEN`, dan HTTP plain diblokir bila config tidak mengizinkan mode insecure.

## Error Handling

Argumen kosong, URL terlalu panjang, protocol salah, HTTP plain ditolak, atau save gagal menghasilkan pesan error.

## Hubungan dengan Laporan TA

File ini menunjukkan endpoint cloud/OTA dapat diubah dari terminal untuk deployment atau debugging.
