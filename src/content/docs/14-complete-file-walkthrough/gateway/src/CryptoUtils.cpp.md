---
title: "gateway/src/CryptoUtils.cpp"
---

# gateway/src/CryptoUtils.cpp

File ini mengimplementasikan utilitas enkripsi dan dekripsi gateway.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `gateway/src/CryptoUtils.cpp` |
| Komponen | Firmware Gateway |
| Level | Advanced |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Kenapa File Ini Ada

Header `CryptoUtils.h` hanya berisi deklarasi. File `.cpp` ini berisi proses nyata untuk membuat payload AES-CBC, membaca payload terenkripsi, validasi padding, decode/encode Base64, dan validasi umur timestamp.

## Library yang Dipakai

File ini memakai `mbedtls/aes.h`, `mbedtls/base64.h`, `esp_system.h`, `std::vector`, dan `time(nullptr)`.

## Alur Enkripsi NodeMedini

1. Payload plaintext diberi prefix timestamp 4 byte.
2. Data diberi padding PKCS7 sampai kelipatan blok AES.
3. IV 16 byte dibuat dari `esp_random()`.
4. AES-256-CBC mengenkripsi buffer.
5. IV dan ciphertext diubah ke Base64.
6. Output menjadi format `base64_iv:base64_ciphertext`.

## Alur Dekripsi NodeMedini

1. Payload dipisah menjadi IV dan ciphertext pada tanda `:`.
2. Keduanya di-decode dari Base64.
3. Ciphertext didekripsi dengan AES-256-CBC.
4. Padding PKCS7 divalidasi.
5. Timestamp 4 byte dibaca.
6. Timestamp divalidasi jika jam sistem sudah masuk waktu valid.
7. Plaintext disalin ke output buffer.

## Fungsi Penting

| Fungsi | Peran |
|---|---|
| `setReplaySkewWindow(...)` | Membatasi replay window antara strict dan max. |
| `isEncryptedPayload(...)` | Mengenali format lama dengan prefix `ENC:`. |
| `isNodeMediniEncryptedPayload(...)` | Mengenali format `base64_iv:base64_ciphertext`. |
| `encryptPayload(...)` | Wrapper enkripsi ke buffer C. |
| `encryptNodeMediniPayload(...)` | Enkripsi utama format NodeMedini. |
| `decryptPayload(...)` | Dekripsi format legacy. |
| `decryptNodeMediniPayload(...)` | Dekripsi format NodeMedini. |
| `validateTimestamp(...)` | Memastikan timestamp berada di window yang diizinkan. |

## Data Masuk

Data masuk berupa plaintext, ciphertext, ukuran buffer, timestamp override, replay max age, dan pointer output.

## Data Keluar

Data keluar berupa payload terenkripsi, plaintext hasil decrypt, panjang plaintext, timestamp payload, dan status berhasil/gagal.

## Error yang Mungkin Terjadi

- Format payload salah atau separator hilang.
- Base64 decode gagal.
- IV bukan 16 byte.
- Ciphertext bukan kelipatan 16 byte.
- Padding PKCS7 tidak valid.
- Output buffer terlalu kecil.
- Timestamp terlalu tua atau terlalu jauh di masa depan.
- Key AES tidak cocok dengan sisi lain.

## Catatan Penting dari Kode

`validateSignature(...)` saat ini mengabaikan semua parameter dan selalu mengembalikan `true`. Jadi, dari file ini saja, validasi signature belum benar-benar terkonfirmasi sebagai proteksi aktif.

## Bagian untuk Pemula

File ini adalah tempat gateway mengunci dan membuka pesan. Kalau pesan rusak, terlalu lama, atau tidak cocok formatnya, gateway menolak pesan itu.

## Bagian Advanced

File ini memakai `std::vector` untuk buffer sementara. Itu membuat kode lebih mudah, tetapi di embedded tetap perlu dipantau karena heap ESP32 terbatas dan operasi crypto bisa terjadi di jalur request.

## Hubungan ke Sistem TA

Keamanan payload lokal/cloud gateway bergantung pada implementasi enkripsi, replay window, dan validasi timestamp di file ini.
