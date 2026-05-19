---
title: "node/tools/certs/isrg-root-x1.pem"
---

# node/tools/certs/isrg-root-x1.pem

File ini adalah root certificate ISRG Root X1.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/tools/certs/isrg-root-x1.pem` |
| Komponen | Config |
| Level | Menengah |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Kenapa File Ini Ada

Perangkat kecil seperti ESP8266 sering membutuhkan root certificate yang ditanam di firmware agar bisa memverifikasi koneksi HTTPS. File ini menyediakan root certificate ISRG Root X1.

## Informasi Sertifikat

Hasil pemeriksaan `openssl x509` menunjukkan:

| Item | Nilai |
|---|---|
| Subject | `C=US, O=Internet Security Research Group, CN=ISRG Root X1` |
| Issuer | Sama dengan subject, berarti root self-signed. |
| Berlaku mulai | 2015-06-04 11:04:38 GMT |
| Berlaku sampai | 2035-06-04 11:04:38 GMT |

## Error yang Mungkin Terjadi

- Jika server memakai chain sertifikat lain, root ini tidak cukup.
- Jika tanggal perangkat salah, validasi sertifikat bisa gagal.
- Jika root kedaluwarsa atau diganti, firmware perlu update.

## Bagian untuk Pemula

File ini seperti daftar pihak yang dipercaya untuk koneksi HTTPS. Node memakai ini agar tidak sembarang percaya server.

## Bagian Advanced

Root certificate perlu dikonversi ke bentuk header atau data firmware sebelum dipakai ESP8266. Lihat juga `scripts/convert_certs.py` dan generated certificate header.

## Hubungan ke Sistem TA

Node mengirim data dan mengambil OTA dari URL HTTPS. Root certificate membantu memastikan koneksi menuju server dapat diverifikasi.

