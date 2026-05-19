---
title: "node/tools/certs/dev-cert.pem"
---

# node/tools/certs/dev-cert.pem

File ini adalah sertifikat development untuk proyek node.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/tools/certs/dev-cert.pem` |
| Komponen | Config |
| Level | Advanced |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Kenapa File Ini Ada

Firmware dan tooling node memiliki jalur TLS/sertifikat. File ini menyediakan sertifikat lokal untuk kebutuhan development atau uji internal.

## Informasi Sertifikat

Hasil pemeriksaan `openssl x509` menunjukkan:

| Item | Nilai |
|---|---|
| Subject | `C=ID, ST=Jawa Tengah, L=Kendal, O=Atomic Project, OU=IoT Sensor Network, CN=gh-1-node-1.local` |
| Issuer | Sama dengan subject, berarti self-signed. |
| Berlaku mulai | 2025-10-18 08:28:40 GMT |
| Berlaku sampai | 2035-10-16 08:28:40 GMT |
| Extension | Tidak ada extension yang terbaca dari output OpenSSL. |

## Error yang Mungkin Terjadi

- Karena self-signed, client umum tidak otomatis percaya sertifikat ini.
- Jika hostname yang dipakai tidak cocok, validasi TLS bisa gagal.
- Jika sertifikat dipakai produksi tanpa trust chain yang benar, koneksi aman bisa bermasalah.

## Bagian untuk Pemula

Sertifikat ini seperti kartu pengenal digital untuk koneksi aman. Karena dibuat sendiri untuk pengembangan, perangkat lain belum tentu percaya otomatis.

## Bagian Advanced

Walau `openssl-san.conf` mendefinisikan beberapa nama DNS, output sertifikat ini menunjukkan tidak ada extension yang terbaca. Jika SAN benar-benar dibutuhkan, proses pembuatan sertifikat perlu diverifikasi.

## Hubungan ke Sistem TA

Sertifikat membantu jalur komunikasi aman pada development node dan perlu dipahami agar uji TLS tidak disamakan dengan sertifikat produksi.

