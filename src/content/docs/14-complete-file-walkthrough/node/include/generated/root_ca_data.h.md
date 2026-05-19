---
title: "node/include/generated/root_ca_data.h"
---

# node/include/generated/root_ca_data.h

File ini menyimpan Root CA untuk koneksi HTTPS node.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/include/generated/root_ca_data.h` |
| Komponen | Firmware Node |
| Level | Advanced |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

File ini bertugas menyediakan sertifikat root yang dipakai BearSSL untuk memverifikasi server HTTPS saat node mengirim data API atau mengecek OTA.

## Kenapa File Ini Ada

HTTPS perlu trust anchor agar node bisa memastikan server yang dihubungi benar. Tanpa Root CA, firmware bisa gagal validasi TLS atau terpaksa memakai mode insecure.

## Isi Utama

File ini mendefinisikan `ROOT_CA_PEM` di `PROGMEM`. Komentar file menyebut bundle mencakup ISRG Root X1 untuk endpoint origin lama dan GTS Root R1 untuk hostname relay `*.vercel.app`.

## Dependency Internal

| Dependency | Fungsi |
|---|---|
| `node/lib/NodeCore/api/ApiClient.Security.cpp` | Membuat `BearSSL::X509List` dari `ROOT_CA_PEM` untuk API. |
| `node/lib/NodeCore/ota/OtaManager.Security.cpp` | Membuat trust anchor untuk OTA HTTPS. |
| `node/tools/certs/isrg-root-x1.pem` | Salah satu sumber sertifikat. |
| `node/scripts/convert_certs.py` | Script terkait konversi sertifikat. |

## Konsep Dasar yang Perlu Dipahami

- Root CA adalah sertifikat akar yang dipercaya.
- TLS verification memeriksa sertifikat server terhadap CA yang dipercaya.
- `PROGMEM` menyimpan string panjang di flash.
- Trust anchor membantu menghindari `setInsecure()`.

## Input

Input berasal dari file sertifikat sumber dan script konversi.

## Output

Output berupa string PEM yang dipakai BearSSL.

## Error Handling

File ini tidak menangani error. Jika sertifikat kedaluwarsa, salah, atau tidak cocok dengan endpoint, koneksi HTTPS bisa gagal.

## Catatan Keamanan

File ini adalah bagian penting keamanan cloud dan OTA. Jika CA tidak sesuai lalu firmware dipaksa insecure, risiko penyadapan dan manipulasi firmware/data meningkat.

## Catatan Debugging

Jika API atau OTA HTTPS gagal padahal jaringan hidup, cek rantai sertifikat endpoint dan apakah root yang diperlukan ada di `ROOT_CA_PEM`.

## Hubungan dengan Laporan TA

File ini mendukung pembahasan HTTPS, keamanan data, OTA aman, dan batasan trust anchor pada perangkat IoT.
