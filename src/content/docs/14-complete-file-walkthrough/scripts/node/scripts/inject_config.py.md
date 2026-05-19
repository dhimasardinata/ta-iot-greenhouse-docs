---
title: "node/scripts/inject_config.py"
---

# node/scripts/inject_config.py

File ini adalah script pendukung untuk pekerjaan pengembangan, build, release, pengujian, atau perawatan proyek node. Script ini bukan firmware runtime, tetapi penting untuk menjaga proses kerja proyek tetap bisa diulang.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/scripts/inject_config.py` |
| Komponen | Script |
| Jenis file | script operasional |
| Level | Menengah |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |
| Jumlah baris | 141 |

## Kenapa File Ini Ada

Dalam sistem TA IoT Greenhouse, file ini menjaga satu bagian tanggung jawab agar tidak bercampur dengan modul lain. Pembagian seperti ini membuat node, gateway, web, dan tooling lebih mudah dibaca oleh pemula: satu file dipelajari sebagai satu peran.

## Kapan File Ini Dipakai

File ini dipakai ketika bagian Script membutuhkan fungsi script operasional. Relasi pemanggil yang eksplisit hanya dianggap pasti jika terlihat dari include, import, atau pemanggilan di source. Jika relasi runtime tidak tertulis langsung di file, dokumentasi ini tidak menebaknya sebagai fakta.

## Bukti dari Source

| Jenis bukti | Ditemukan di source |
|---|---|
| Import | `os`, `configparser`, `SCons.Script import Import` |
| Fungsi Python | `_c_escape`, `_to_int` |
| Macro | `DYNAMIC_NODE_CONFIG_H`, `GH_ID`, `NODE_ID`, `FIRMWARE_VERSION`, `FACTORY_WIFI_PASS`, `FACTORY_API_TOKEN`, `FACTORY_OTA_TOKEN`, `DEFAULT_DATA_URL`, `DEFAULT_OTA_URL_BASE`, `DEFAULT_RELAY_DATA_URL`, `DEFAULT_RELAY_OTA_URL_BASE`, `DEFAULT_GATEWAY_IP_GH1`, `DEFAULT_GATEWAY_IP_GH2` |
| String command/konfigurasi | `env`, `settings`, `gh_id`, `node_id`, `gateway_ip_1`, `gateway_ip_2`, `firmware_version`, `factory_wifi_pass`, `password`, `factory_api_token`, `factory_ota_token`, `data_upload_url`, `ota_url_base`, `relay_data_upload_url`, `relay_ota_url_base`, `include`, `utf-8`, `espota` |

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
import os
import configparser
from SCons.Script import Import
Import("env") # noqa: F821
# 1. READ CONFIG FROM EXTERNAL FILE.
config = configparser.ConfigParser()
config.read("node_id.ini")
try:
    gh_id = config.get("settings", "gh_id")
    node_id = config.get("settings", "node_id")
    ota_ip_map = {}
    for i in range(1, 11):
```

## Hubungan ke Sistem TA

File ini membantu sistem IoT Greenhouse tetap bisa membaca data, menyimpan status, berkomunikasi, diuji, atau dioperasikan sesuai perannya. Dokumentasi ini sengaja menghubungkan file ke konteks TA, bukan hanya menjelaskan sintaks kode.

## Batas Verifikasi

Halaman ini dibuat dari pembacaan source file aktual pada 2026-05-19. Jika ada hubungan yang tidak terlihat langsung dari source, bagian tersebut ditulis sebagai belum terkonfirmasi, bukan diasumsikan.
