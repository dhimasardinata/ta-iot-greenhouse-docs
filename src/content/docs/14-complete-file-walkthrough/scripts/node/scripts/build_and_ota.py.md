---
title: "node/scripts/build_and_ota.py"
---

# node/scripts/build_and_ota.py

File ini adalah script pendukung untuk pekerjaan pengembangan, build, release, pengujian, atau perawatan proyek node. Script ini bukan firmware runtime, tetapi penting untuk menjaga proses kerja proyek tetap bisa diulang.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/scripts/build_and_ota.py` |
| Komponen | Script |
| Jenis file | script operasional |
| Level | Menengah |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |
| Jumlah baris | 130 |

## Kenapa File Ini Ada

Dalam sistem TA IoT Greenhouse, file ini menjaga satu bagian tanggung jawab agar tidak bercampur dengan modul lain. Pembagian seperti ini membuat node, gateway, web, dan tooling lebih mudah dibaca oleh pemula: satu file dipelajari sebagai satu peran.

## Kapan File Ini Dipakai

File ini dipakai ketika bagian Script membutuhkan fungsi script operasional. Relasi pemanggil yang eksplisit hanya dianggap pasti jika terlihat dari include, import, atau pemanggilan di source. Jika relasi runtime tidak tertulis langsung di file, dokumentasi ini tidak menebaknya sebagai fakta.

## Bukti dari Source

| Jenis bukti | Ditemukan di source |
|---|---|
| Import | `__future__ import annotations`, `argparse`, `configparser`, `shlex`, `subprocess`, `sys`, `pathlib import Path` |
| Fungsi Python | `load_defaults`, `print_command`, `main` |
| String command/konfigurasi | `settings`, `firmware_version`, `factory_ota_token`, `factory_api_token`, `all`, `wemosd1mini_usb`, `store_true`, `scripts` |

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
Build firmware binaries and upload them to the OTA files API in one command.
Default flow:
- build node 1..10 into var/dist/node1.bin .. var/dist/node10.bin
- upload those same files to https://atomic.web.id/api/files
This wrapper is intentionally flexible:
- build and upload can target the same nodes, or different ones
- build version and OTA-posted version can be overridden separately
- upload can reuse a different directory/file than the current build output
- either phase can be skipped when needed
"""
```

## Hubungan ke Sistem TA

File ini membantu sistem IoT Greenhouse tetap bisa membaca data, menyimpan status, berkomunikasi, diuji, atau dioperasikan sesuai perannya. Dokumentasi ini sengaja menghubungkan file ke konteks TA, bukan hanya menjelaskan sintaks kode.

## Batas Verifikasi

Halaman ini dibuat dari pembacaan source file aktual pada 2026-05-19. Jika ada hubungan yang tidak terlihat langsung dari source, bagian tersebut ditulis sebagai belum terkonfirmasi, bukan diasumsikan.
