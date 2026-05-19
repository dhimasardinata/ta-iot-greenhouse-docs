---
title: "gateway/include/SensorDataManager.h"
---

# gateway/include/SensorDataManager.h

File ini mendeklarasikan pengelola data sensor gateway.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `gateway/include/SensorDataManager.h` |
| Komponen | Firmware Gateway |
| Level | Advanced |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Kenapa File Ini Ada

Gateway dapat memakai data cloud, data lokal dari node, atau mode auto. File ini menyimpan data sensor, threshold, status fog, freshness data, node aktif, dan aturan fallback saat cloud gagal.

## Konstanta Penting

| Konstanta | Nilai | Fungsi awal |
|---|---:|---|
| `MAX_NODES` | 12 | Batas jumlah node yang dicatat. |
| `NODE_TIMEOUT_MS` | 300000 ms | Batas umur data node. |
| `LOCAL_DATA_VALID_MS` | sama dengan `NODE_TIMEOUT_MS` | Batas data lokal dianggap valid. |
| `AUTO_CLOUD_FAILURE_THRESHOLD` | 2 | Batas kegagalan cloud sebelum auto condong ke lokal. |
| `AUTO_CLOUD_RECOVERY_THRESHOLD` | 3 | Batas sukses cloud sebelum pulih. |
| `AUTO_CLOUD_RETRY_INTERVAL_MS` | 60000 ms | Interval probe cloud saat auto memakai lokal. |

## Struktur Data

`ThresholdProfile` menyimpan threshold suhu, kelembapan, cahaya, dan flag valid.

`NodeDataEntry` menyimpan nama node, suhu, kelembapan, lux, status fog, confidence kamera, waktu update, epoch kirim/terima, ukuran payload, dan status aktif.

## Fungsi Publik Utama

Class `SensorDataManager` menyediakan:

- inisialisasi,
- update threshold lokal/cloud,
- update data dari cloud,
- update data dari node lokal,
- hitung rata-rata lokal,
- load dari log,
- set mode sumber data,
- getter mode dan hak edit,
- getter threshold runtime/lokal/cloud,
- freshness cloud/local/fog,
- pencatatan sukses/gagal cloud,
- runtime fallback ke lokal,
- jumlah node aktif,
- refresh display data.

## Data Masuk

Data masuk berasal dari cloud API, node lokal, kamera/fog, NVS, log lokal, dan keputusan mode dari operator atau sistem auto.

## Data Keluar

Data keluar berupa nilai sensor runtime, threshold aktif, status mode, status freshness, jumlah node, dan data node untuk modul lain.

## Kapan Dipakai

File ini dipakai saat gateway menerima data node, mengambil data cloud, mengevaluasi kontrol, menampilkan LCD/dashboard, dan memutuskan fallback cloud/local.

## Error yang Mungkin Terjadi

- Jika jumlah node melebihi `MAX_NODES`, sebagian node tidak bisa disimpan.
- Jika freshness tidak dihitung benar, gateway bisa memakai data lama.
- Jika threshold lokal/cloud tidak valid, kontrol relay bisa keliru.
- Jika mode auto salah membaca failure/success count, fallback bisa terlalu cepat atau terlalu lambat.

## Bagian untuk Pemula

File ini adalah pusat penyimpanan data sensor di gateway. Gateway bertanya ke bagian ini: data sekarang dari mana, nilainya berapa, masih segar atau sudah lama, dan threshold mana yang dipakai.

## Bagian Advanced

File ini memisahkan buffer cloud dan lokal. Dokumentasi final perlu membaca implementasi agar jelas kapan `_cTemp`, `_lTemp`, threshold runtime, dan `runtimeFallbackToLocal` berubah.

## Hubungan ke Sistem TA

Keputusan greenhouse berbasis suhu, kelembapan, cahaya, fog, threshold, dan mode cloud/edge/auto bergantung pada file ini.
