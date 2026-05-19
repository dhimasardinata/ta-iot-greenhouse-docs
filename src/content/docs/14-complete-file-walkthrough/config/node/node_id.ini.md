---
title: "node/node_id.ini"
---

# node/node_id.ini

File ini menyimpan identitas node, alamat OTA, alamat gateway, URL cloud, dan nilai bawaan pabrik.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/node_id.ini` |
| Komponen | Config |
| Level | Advanced |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Kenapa File Ini Ada

Firmware node perlu tahu greenhouse mana yang dipakai, node nomor berapa yang sedang dibangun, alamat perangkat lain, versi firmware, dan endpoint upload. File ini menjadi sumber konfigurasi yang kemudian dapat disuntikkan ke firmware oleh script build.

## Nilai Utama

| Kunci | Makna |
|---|---|
| `gh_id` | ID greenhouse aktif. Pada snapshot ini bernilai `2`. |
| `node_id` | ID node aktif. Pada snapshot ini bernilai `9`. |
| `ota_ip_1` sampai `ota_ip_10` | Daftar IP node untuk OTA. |
| `gateway_ip_1` dan `gateway_ip_2` | IP gateway greenhouse. |
| `firmware_version` | Versi firmware yang disiapkan. |
| `factory_wifi_pass` | Password WiFi bawaan pabrik. |
| `factory_api_token` | Token API bawaan pabrik. |
| `factory_ota_token` | Token OTA bawaan pabrik. |
| `data_upload_url` | URL upload data sensor utama. |
| `ota_url_base` | URL dasar download firmware. |
| `relay_data_upload_url` | URL upload data lewat relay/proxy. |
| `relay_ota_url_base` | URL OTA lewat relay/proxy. |

## Catatan Keamanan

File ini berisi nilai yang terlihat seperti password dan token. Dokumentasi ini sengaja tidak menyalin nilai rahasia tersebut. Jika file ini masuk repository publik, token dan password perlu dianggap bocor dan harus diganti.

## Error yang Mungkin Terjadi

- Jika `gh_id` atau `node_id` salah, firmware bisa mengirim data sebagai perangkat yang keliru.
- Jika IP OTA salah, upload firmware jarak jauh gagal.
- Jika URL cloud berubah tetapi file ini tidak diperbarui, upload data atau OTA gagal.
- Jika token bocor, endpoint API atau OTA bisa disalahgunakan.

## Bagian untuk Pemula

File ini seperti kartu identitas node. Di sini tertulis node ini nomor berapa, masuk greenhouse mana, dan harus bicara ke alamat server mana.

## Bagian Advanced

Karena nilai ini dapat disuntikkan saat build, perubahan konfigurasi mungkin memerlukan rebuild firmware. Lihat juga `scripts/inject_config.py` dan file generated `include/generated/node_config.h`.

## Hubungan ke Sistem TA

Identitas node menentukan data sensor dari greenhouse mana dan node mana. Ini penting agar dashboard, gateway, dan backend tidak mencampur data antar perangkat.

