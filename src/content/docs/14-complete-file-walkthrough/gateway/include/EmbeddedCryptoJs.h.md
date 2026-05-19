---
title: "gateway/include/EmbeddedCryptoJs.h"
---

# gateway/include/EmbeddedCryptoJs.h

File ini menyimpan library JavaScript kriptografi kecil di dalam firmware gateway.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `gateway/include/EmbeddedCryptoJs.h` |
| Komponen | Firmware Gateway |
| Level | Advanced |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Kenapa File Ini Ada

Portal gateway membutuhkan JavaScript untuk enkripsi/dekripsi AES-CBC di browser. Daripada membawa CryptoJS penuh yang besar, file ini menyimpan versi minimal di `PROGMEM` agar bisa disajikan oleh gateway sebagai asset embedded.

## Isi Utama

File ini mendefinisikan konstanta:

```cpp
const char EMBEDDED_CRYPTO_JS[] PROGMEM = ...
```

Isi string JavaScript mencakup:

- `WordArray`,
- encoder Hex, Base64, UTF-8, dan Latin1,
- padding PKCS7,
- mode CBC,
- AES encrypt/decrypt,
- export API mirip `CryptoJS`.

Komentar di file menyebut ukuran sekitar 15 KB dibanding 202 KB CryptoJS penuh.

## Data Masuk

Data masuk terjadi di browser saat JavaScript dipakai, misalnya message, key, IV, ciphertext, atau string encoded.

## Data Keluar

Data keluar berupa ciphertext, plaintext hasil decrypt, atau object yang kompatibel dengan pola CryptoJS minimal.

## Kapan Dipakai

File ini dipakai ketika gateway menyajikan halaman lokal yang membutuhkan kriptografi client-side. Pemanggil pastinya perlu dikonfirmasi di source web/server gateway.

## Error yang Mungkin Terjadi

- Jika browser tidak punya API JavaScript yang diasumsikan, enkripsi dapat gagal.
- Fungsi random memakai `Math.random()`, sehingga perlu hati-hati jika dipakai untuk keamanan kuat.
- Jika format payload browser tidak sama dengan implementasi C++ gateway, decrypt di sisi lain bisa gagal.
- Karena file ini besar dan embedded, perubahan kecil tetap ikut menambah ukuran firmware.

## Bagian untuk Pemula

File ini seperti menyimpan file `.js` di dalam program C++. Gateway bisa mengirim JavaScript itu ke browser tanpa perlu filesystem terpisah.

## Bagian Advanced

Karena ini implementasi crypto custom/minimal, kesesuaian mode AES-CBC, padding PKCS7, IV, encoding, dan key harus diuji lintas sisi browser dan firmware. Dokumentasi final perlu mengaitkan file ini dengan route yang menyajikannya.

## Hubungan ke Sistem TA

Portal lokal gateway dan jalur admin terenkripsi membutuhkan asset ini agar browser dapat membentuk payload yang cocok dengan gateway.
