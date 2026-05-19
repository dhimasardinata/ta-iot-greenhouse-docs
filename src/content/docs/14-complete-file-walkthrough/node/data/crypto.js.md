---
title: "node/data/crypto.js"
---

# node/data/crypto.js

File ini adalah library crypto JavaScript minimal untuk portal dan terminal node.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/data/crypto.js` |
| Komponen | Firmware Node |
| Level | Advanced |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

File ini bertugas menyediakan object mirip `CryptoJS` yang cukup untuk AES-CBC, PKCS7 padding, Base64, Hex, UTF-8, Latin1, random IV, encrypt, dan decrypt.

## Kenapa File Ini Ada

Full CryptoJS terlalu besar untuk asset ESP8266. File ini mengambil fungsi minimum yang dibutuhkan agar portal dan terminal tetap bisa mengenkripsi data tanpa membawa library besar.

## Isi Utama

| Bagian | Fungsi |
|---|---|
| `WordArray` | Struktur data byte/word seperti CryptoJS. |
| `Hex`, `Base64`, `Utf8`, `Latin1` | Encoder dan decoder string. |
| `Pkcs7` | Padding agar data cocok dengan block AES. |
| `CBC` | Mode cipher block chaining. |
| `AES` | Implementasi AES encrypt/decrypt. |
| Export `root.CryptoJS` | API kompatibel minimal untuk file lain. |

## Kapan Dipakai

File ini dipakai oleh `portal.html` saat mengenkripsi password Wi-Fi dan oleh `terminal.js` saat mengenkripsi command serta mendekripsi response terminal.

## Konsep Dasar yang Perlu Dipahami

- AES adalah algoritma enkripsi simetris.
- CBC memakai IV agar ciphertext tidak selalu sama.
- PKCS7 padding menambah byte agar panjang data pas dengan ukuran block.
- Base64 membuat data biner aman dikirim sebagai teks.

## Dependency Internal

| Dependency | Fungsi |
|---|---|
| `node/data/portal.html` | Memakai CryptoJS untuk password Wi-Fi. |
| `node/data/terminal.js` | Memakai CryptoJS untuk WebSocket terminal. |
| `node/lib/NodeCore/support/CryptoUtils.cpp` | Pasangan crypto di firmware. |
| `node/include/generated/WebAppData.h` | Menyimpan file ini dalam firmware. |

## Input

Input berupa plaintext, key, IV, ciphertext, dan string encoded seperti Base64/Hex/UTF-8.

## Output

Output berupa ciphertext, plaintext, WordArray, dan object `CryptoJS` global.

## Error Handling

File ini tidak memakai exception kompleks. Beberapa decoder mencoba fallback string jika decode UTF-8 gagal. Pemanggil tetap harus mengecek hasil encrypt/decrypt.

## Catatan Keamanan

Karena library ini dikirim ke browser, logic enkripsi terlihat oleh pengguna. Keamanan utama tetap tergantung pada kunci, timestamp, validasi firmware, dan pembatasan akses jaringan lokal. Jangan menganggap asset JavaScript sebagai tempat menyimpan rahasia kuat.

## Catatan Performa

Ukuran komentar file menyebut sekitar 15 KB dibanding 202 KB full CryptoJS. Ini penting karena ESP8266 punya flash dan heap terbatas.

## Catatan Debugging

Jika password portal atau command terminal gagal didekripsi, cek format `iv:ciphertext`, panjang IV 16 byte, padding, encoding Base64, dan kesamaan key dengan firmware.

## Hubungan dengan Laporan TA

File ini mendukung pembahasan AES-256-CBC, keamanan komunikasi lokal, dan trade-off ukuran asset pada firmware node.
