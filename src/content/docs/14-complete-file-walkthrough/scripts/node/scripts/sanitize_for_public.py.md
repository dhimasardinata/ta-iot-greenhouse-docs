---
title: "node/scripts/sanitize_for_public.py"
---

# node/scripts/sanitize_for_public.py

File ini adalah script pendukung untuk pekerjaan pengembangan, build, release, pengujian, atau perawatan proyek node. Script ini bukan firmware runtime, tetapi penting untuk menjaga proses kerja proyek tetap bisa diulang.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/scripts/sanitize_for_public.py` |
| Komponen | Script |
| Jenis file | script operasional |
| Level | Menengah |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |
| Jumlah baris | 522 |

## Kenapa File Ini Ada

Dalam sistem TA IoT Greenhouse, file ini menjaga satu bagian tanggung jawab agar tidak bercampur dengan modul lain. Pembagian seperti ini membuat node, gateway, web, dan tooling lebih mudah dibaca oleh pemula: satu file dipelajari sebagai satu peran.

## Kapan File Ini Dipakai

File ini dipakai ketika bagian Script membutuhkan fungsi script operasional. Relasi pemanggil yang eksplisit hanya dianggap pasti jika terlihat dari include, import, atau pemanggilan di source. Jika relasi runtime tidak tertulis langsung di file, dokumentasi ini tidak menebaknya sebagai fakta.

## Bukti dari Source

| Jenis bukti | Ditemukan di source |
|---|---|
| Include | `generated/node_config.h`, `Arduino.h`, `bearssl/bearssl.h`, `optional`, `string_view`, `vector` |
| Import | `argparse`, `os`, `shutil`, `re`, `subprocess`, `stat`, `sys`, `pathlib import Path`, `datetime import datetime` |
| Class/Struct | `EncryptedPayload`, `AES_CBC_Cipher` |
| Fungsi C/C++ | `AES_CBC_Cipher`, `serialize_payload`, `deserialize_payload` |
| Fungsi Python | `force_remove_readonly`, `aggressive_remove_dir`, `should_copy`, `_redact_sensitive_line`, `sanitize_content`, `run_git_command`, `setup_git_and_push`, `copy_and_sanitize_files`, `main` |
| Macro | `COMPILED_CALIBRATION_DEFAULTS_H`, `CERTS_H`, `CRYPTO_UTILS_H` |
| Route/String endpoint | `/c`, `/s`, `/q` |

## Alur Masuk dan Keluar

| Arah | Penjelasan |
|---|---|
| Data masuk | argumen command line, file source, file konfigurasi, dan output build/test |
| Data keluar | file hasil generasi, log, status exit command, atau laporan analisis |

## Hal yang Perlu Diperhatikan

- Jika kontrak input berubah tetapi file pemanggil tidak ikut diperbarui, error bisa muncul di runtime atau saat compile.
- Script bisa gagal jika dependency belum terpasang, path dijalankan dari folder salah, atau file target tidak ada.

## Bagian untuk Pemula

Mulai dari nama file dan foldernya dulu. Folder menunjukkan area sistem, sedangkan nama file menunjukkan tugas kecilnya. Setelah itu, baca daftar include/import dan nama fungsi untuk melihat file ini bekerja sama dengan modul apa.

## Bagian Advanced

Untuk perubahan kode, periksa kontrak data dan efek sampingnya. Pada firmware embedded, perubahan kecil pada buffer, waktu tunggu, koneksi jaringan, cache, atau OTA bisa berdampak ke stabilitas perangkat di greenhouse.

## Preview Source

```python
#!/usr/bin/env python3
"""
Sanitize Repository Script
Creates a COPY of the repository with all sensitive credentials replaced by placeholders.
Original repository remains unchanged.
Automatically initializes git, commits, and pushes to public repo.
Usage:
  python sanitize_for_public.py [--source SOURCE_DIR] [--target TARGET_DIR] [--remote REMOTE_URL]
Defaults can also be set via environment variables:
  SANITIZE_SOURCE_DIR, SANITIZE_TARGET_DIR, SANITIZE_REMOTE_URL
"""
import argparse
```

## Hubungan ke Sistem TA

File ini membantu sistem IoT Greenhouse tetap bisa membaca data, menyimpan status, berkomunikasi, diuji, atau dioperasikan sesuai perannya. Dokumentasi ini sengaja menghubungkan file ke konteks TA, bukan hanya menjelaskan sintaks kode.

## Batas Verifikasi

Halaman ini dibuat dari pembacaan source file aktual pada 2026-05-19. Jika ada hubungan yang tidak terlihat langsung dari source, bagian tersebut ditulis sebagai belum terkonfirmasi, bukan diasumsikan.
