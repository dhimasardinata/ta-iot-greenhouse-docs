---
title: "node/tools/certs/dev-private.key"
---

# node/tools/certs/dev-private.key

File ini adalah private key development yang berpasangan dengan sertifikat lokal node.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/tools/certs/dev-private.key` |
| Komponen | Config |
| Level | Advanced |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Kenapa File Ini Ada

Sertifikat TLS membutuhkan private key untuk membuktikan identitas server atau layanan. File ini menyimpan kunci private untuk sertifikat development.

## Catatan Keamanan

Dokumentasi ini sengaja tidak menyalin isi private key. Private key harus dianggap rahasia. Jika file ini pernah tersebar ke repository publik atau lingkungan yang tidak dipercaya, sertifikat pasangan kunci ini harus diganti.

## Data Masuk dan Keluar

File ini menjadi input untuk proses TLS atau proses konversi sertifikat. Outputnya bukan data sensor, tetapi kemampuan perangkat/tooling untuk memakai sertifikat terkait.

## Error yang Mungkin Terjadi

- Jika private key tidak cocok dengan sertifikat, TLS gagal.
- Jika private key bocor, pihak lain bisa meniru identitas development tersebut.
- Jika file key hilang, sertifikat development perlu dibuat ulang.

## Bagian untuk Pemula

Private key ini seperti kunci rumah digital. Sertifikat boleh dikenal orang, tetapi kunci private tidak boleh disebarkan.

## Bagian Advanced

File ini masuk coverage sebagai config karena berada di source tree. Namun untuk proyek produksi, private key sebaiknya dibuat lokal atau disimpan lewat secret manager, bukan disimpan langsung bersama source.

## Hubungan ke Sistem TA

Kunci ini mendukung uji komunikasi aman pada node. Risiko kebocoran perlu dicatat dalam dokumentasi TA agar batas antara development dan produksi jelas.

