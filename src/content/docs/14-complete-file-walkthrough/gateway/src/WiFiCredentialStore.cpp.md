---
title: "gateway/src/WiFiCredentialStore.cpp"
---

# gateway/src/WiFiCredentialStore.cpp

File ini mengimplementasikan penyimpanan dan pemilihan kredensial Wi-Fi gateway.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `gateway/src/WiFiCredentialStore.cpp` |
| Komponen | Firmware Gateway |
| Level | Menengah |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Kenapa File Ini Ada

Gateway tidak hanya mencoba satu Wi-Fi. File ini menyimpan kredensial built-in untuk GH Atas/GH Bawah, kredensial tambahan dari pengguna, hasil scan terakhir, dan urutan jaringan yang akan dicoba.

## Kredensial Built-in

Source mendefinisikan SSID bawaan `GH Atas` dan `GH Bawah` serta satu password bawaan. Prioritasnya tergantung `GH_ID_CONFIG`: GH1 memprioritaskan GH Atas, GH2 memprioritaskan GH Bawah.

Untuk dokumentasi keamanan, nilai password bawaan tidak perlu disalin ulang di halaman ini. Yang penting: password built-in terlihat hardcoded di source dan perlu diperlakukan sebagai risiko produksi.

## Penyimpanan NVS

Kredensial pengguna disimpan di namespace Preferences `wifi_store` dengan key seperti:

- `count`,
- `ssid0`, `pass0`, `hide0`,
- sampai batas `MAX_SAVED_NETWORKS`.

## Alur Pemilihan Wi-Fi

`getNextCredential()` mencoba urutan:

1. primary GH jika terlihat di scan,
2. secondary GH jika terlihat di scan,
3. semua credential pengguna yang tidak kosong,
4. fallback primary GH walau tidak terlihat di scan,
5. fallback secondary GH walau tidak terlihat di scan.

## Data Masuk

Data masuk berupa hasil scan Wi-Fi dari `WiFi.SSID()`, `WiFi.RSSI()`, `WiFi.encryptionType()`, serta input SSID/password/hidden dari operator.

## Data Keluar

Data keluar berupa credential berikutnya untuk dicoba, cache scan, jumlah jaringan, dan status ke stream terminal.

## Error yang Mungkin Terjadi

- Jika namespace NVS tidak bisa dibuka, credential tersimpan tidak dimuat.
- Jika semua slot pengguna penuh, credential baru ditolak.
- Jika scan melewatkan jaringan hidden, gateway masih mencoba credential pengguna dan fallback built-in.
- Jika SSID/password terlalu panjang, implementasi memakai `strncpy`; kontrak terminasi string harus dijaga.

## Bagian untuk Pemula

File ini seperti daftar Wi-Fi yang dikenal gateway. Gateway melihat jaringan sekitar, lalu memilih yang paling masuk akal untuk dicoba.

## Bagian Advanced

Sorting credential pengguna memakai availability dan RSSI, tetapi built-in GH tetap punya prioritas khusus sebelum jaringan pengguna.

## Hubungan ke Sistem TA

Koneksi gateway ke cloud dan dashboard bergantung pada kemampuan memilih Wi-Fi yang benar di greenhouse.
