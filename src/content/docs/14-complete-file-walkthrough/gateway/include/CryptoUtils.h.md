---
title: "gateway/include/CryptoUtils.h"
---

# gateway/include/CryptoUtils.h

File ini mendeklarasikan utilitas kriptografi gateway.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `gateway/include/CryptoUtils.h` |
| Komponen | Firmware Gateway |
| Level | Advanced |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Kenapa File Ini Ada

Sistem TA memakai komunikasi terenkripsi pada beberapa jalur. Gateway membutuhkan fungsi untuk mengenali payload terenkripsi, mengenkripsi payload, mendekripsi payload, memvalidasi signature, dan memeriksa timestamp agar data lama tidak mudah dipakai ulang.

## Isi Utama

Di namespace `CryptoUtils`, file ini mendefinisikan:

- `AES_KEY` berukuran 32 byte,
- `AES_KEY_SIZE`, `AES_BLOCK_SIZE`, dan `MAX_DECRYPTED_SIZE`,
- replay window strict 30 detik, soft 300 detik, dan max 900 detik,
- fungsi deteksi payload terenkripsi,
- fungsi encrypt/decrypt payload,
- fungsi khusus format `NodeMedini`,
- fungsi pengaturan replay skew window,
- fungsi validasi signature dan timestamp.

## Data Masuk

Data masuk berupa:

- payload plaintext,
- payload terenkripsi,
- panjang buffer,
- timestamp,
- signature hex,
- key dan panjang key.

## Data Keluar

Data keluar berupa:

- payload terenkripsi,
- payload hasil decrypt,
- panjang data hasil decrypt,
- timestamp dari payload,
- status valid/tidak valid untuk signature dan timestamp.

## Kapan Dipakai

File ini dipakai oleh bagian gateway yang menangani komunikasi aman, terutama saat data perlu dikirim atau diterima dalam bentuk terenkripsi.

## Error yang Mungkin Terjadi

- Jika ukuran output buffer lebih kecil dari hasil decrypt/encrypt, operasi bisa gagal.
- Jika jam gateway meleset terlalu jauh, validasi timestamp dapat menolak payload yang sebenarnya baru.
- Jika key tidak sama dengan sisi client/server, decrypt gagal.
- `AES_KEY` terlihat hardcoded di header. Untuk produksi, key yang tertanam langsung di firmware perlu diperlakukan sebagai risiko keamanan dan dicatat sebagai keputusan desain.

## Bagian untuk Pemula

Enkripsi membuat pesan tidak mudah dibaca langsung. File ini menyediakan daftar alat untuk mengunci pesan, membuka pesan, dan mengecek apakah pesan masih baru.

## Bagian Advanced

Header ini menyatakan batas replay window dan ukuran buffer maksimum. Implementasi harus konsisten menjaga batas memori karena gateway berjalan di perangkat embedded, bukan server besar.

## Hubungan ke Sistem TA

Keamanan komunikasi gateway, portal, dan jalur data terenkripsi bergantung pada fungsi yang dideklarasikan di file ini.
