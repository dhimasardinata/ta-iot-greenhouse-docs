---
title: "node/tools/certs/openssl-san.conf"
---

# node/tools/certs/openssl-san.conf

File ini adalah konfigurasi OpenSSL untuk membuat sertifikat development dengan nama host node dan gateway.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/tools/certs/openssl-san.conf` |
| Komponen | Config |
| Level | Menengah |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Kenapa File Ini Ada

Saat membuat sertifikat lokal, OpenSSL perlu tahu identitas organisasi dan daftar nama host yang boleh dipakai. File ini menyimpan nilai tersebut.

## Identitas Sertifikat

| Kunci | Nilai |
|---|---|
| `C` | `ID` |
| `ST` | `Jawa Tengah` |
| `L` | `Kendal` |
| `O` | `Atomic Project` |
| `OU` | `IoT Sensor Network` |
| `CN` | `gh-1-node-1.local` |

## Nama Host

Bagian `alt_names` berisi:

- `gh-1-node-1.local` sampai `gh-1-node-5.local`
- `gh-2-node-6.local` sampai `gh-2-node-10.local`
- `gateway-gh-1.local`
- `gateway-gh-2.local`

## Error yang Mungkin Terjadi

- Jika command OpenSSL tidak memakai section ini dengan benar, SAN tidak masuk ke sertifikat.
- Jika hostname perangkat berubah, sertifikat baru perlu dibuat.
- Jika CN dan SAN tidak sesuai host aktual, validasi TLS gagal.

## Bagian untuk Pemula

File ini seperti formulir pembuatan kartu identitas digital. Di sini ditulis nama-nama perangkat yang boleh memakai sertifikat.

## Bagian Advanced

Perlu dicatat bahwa pemeriksaan `dev-cert.pem` pada snapshot ini menunjukkan tidak ada extension yang terbaca. Jadi konfigurasi SAN ini belum otomatis membuktikan sertifikat hasilnya punya SAN.

## Hubungan ke Sistem TA

Nama host lokal membantu perangkat dan gateway dikenali saat uji komunikasi aman di jaringan greenhouse.

