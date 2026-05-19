---
title: "web/OtaController.php"
---

# web/OtaController.php

File ini mengatur upload firmware dan pengecekan firmware terbaru untuk node atau perangkat.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `web/OtaController.php` |
| Komponen | Backend Laravel |
| Level | Menengah |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Kenapa File Ini Ada

Sistem TA memakai OTA agar firmware bisa diperbarui lewat jaringan. Backend perlu menyimpan file firmware dan memberi tahu perangkat apakah ada update.

## Method yang Terlihat

- `uploadFirmware()`
- `getFirmwareInfo()`

## Data Masuk

Upload firmware menerima:

- `status`
- `version`
- `file`
- `sensor_id` atau `node_id`

Pengecekan firmware menerima:

- path `{nodeId}`,
- query `node_id`,
- query `sensor_id`,
- atau query legacy `fw_id`.

## Validasi Upload

File ini memvalidasi:

- `status` wajib boolean,
- `version` wajib string maksimal 20 karakter,
- `file` wajib `.bin` maksimal 2048 KB,
- `sensor_id` atau `node_id` harus ada dan minimal 1.

## Data Keluar

Upload berhasil mengembalikan:

- `file_url`
- `status`
- `sensor_id`
- `node_id`
- `version`
- `metadata_persisted`

Pengecekan firmware mengembalikan:

- `version`
- `file_url`
- `status`
- `node_id`

## Cache yang Terlihat

Firmware terbaru disimpan sementara dengan key:

```txt
firmware_latest_node_{nodeId}
```

Cache ini dihapus setelah upload firmware untuk node yang sama.

## Error yang Mungkin Terjadi

- File selain `.bin` ditolak.
- File lebih dari 2 MB ditolak.
- Jika metadata database gagal disimpan, file tetap bisa tersimpan dan response memberi `metadata_persisted=false`.
- Jika node ID tidak valid pada pengecekan firmware, response tetap HTTP 200 tetapi status update kosong.
- Jika storage public tidak tersedia, upload firmware bisa gagal.

## Bagian untuk Pemula

OTA mirip mengirim file update ke perangkat. Controller ini menyimpan file update dan memberi tahu perangkat, "ada firmware baru atau tidak".

## Bagian Advanced

Saat satu firmware aktif untuk node tertentu, file ini menonaktifkan firmware lain untuk node yang sama. Ini membuat lookup lebih sederhana, tetapi proses release harus hati-hati agar firmware aktif tidak salah versi.

## Hubungan ke Sistem TA

File ini adalah jembatan antara script build/OTA node dan perangkat di greenhouse. Tanpa endpoint ini, update firmware jarak jauh tidak punya pusat distribusi.

Lanjutkan ke [web/PageController.php](./PageController.php.md).
