---
title: "gateway/src/SensorDataManager.cpp"
---

# gateway/src/SensorDataManager.cpp

File ini mengimplementasikan pengelolaan data sensor gateway.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `gateway/src/SensorDataManager.cpp` |
| Komponen | Firmware Gateway |
| Level | Advanced |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Kenapa File Ini Ada

Gateway harus menggabungkan data dari cloud dan node lokal. File ini menyimpan threshold, mode sumber data, data node, rata-rata lokal, status fog, freshness cloud/local, dan fallback runtime.

## Alur Begin

`begin()` memuat threshold lokal, threshold cloud, data node terakhir dari NVS, lalu menghitung ulang rata-rata lokal.

## Mode Sumber Data

`setSourceMode(...)` menyimpan mode ke namespace `thresholds`, reset fallback runtime, reset counter cloud jika bukan auto, dan refresh display data.

Mode yang dipakai:

- `SOURCE_CLOUD`,
- `SOURCE_LOCAL`,
- `SOURCE_AUTO`.

## Data Node Lokal

`updateFromNode(...)` memetakan:

- `node-1` sampai `node-10` ke index 0 sampai 9,
- `cam-1` ke index 10,
- `cam-2` ke index 11.

Data yang valid disimpan ke array node, backup ke NVS, lalu rata-rata lokal dihitung ulang.

## Rata-rata Lokal

`recalculateLocalAverage()` hanya menghitung node sensor biasa index 0 sampai 9 yang aktif dan belum melewati `LOCAL_DATA_VALID_MS`. Kamera index 10 dan 11 dipakai untuk fog.

Jika tidak ada sensor valid, nilai lokal diisi sentinel:

- suhu `-99.9`,
- kelembapan `-1.0`,
- cahaya `-1.0`.

## Threshold

Threshold lokal dan cloud disimpan terpisah:

- lokal di namespace `thresholds`,
- cloud di namespace `thresholds_cld`.

Threshold cloud baru dianggap valid jika suhu dan kelembapan valid. Light bisa ikut disimpan jika valid.

## Freshness

File ini menyediakan pengecekan freshness untuk:

- cloud sensor data,
- cloud threshold,
- cloud fog,
- local fog,
- active node count,
- usable local node count.

## Data Masuk

Data masuk berasal dari cloud, node lokal, kamera, NVS, log CSV legacy, dan perubahan mode/threshold.

## Data Keluar

Data keluar berupa nilai sensor runtime, threshold aktif, mode display, freshness flags, node count, dan status fallback lokal.

## Error yang Mungkin Terjadi

- Nama node di luar pola `node-N`, `cam-1`, atau `cam-2` diabaikan.
- Backup NVS node dipulihkan sebagai tidak aktif sampai packet baru datang.
- CSV parser `loadFromLog()` sederhana dan tidak menangani quoting kompleks.
- Jika data cloud threshold hanya light yang valid, profile cloud belum menjadi valid penuh.

## Bagian untuk Pemula

File ini menjawab pertanyaan: data sensor yang dipakai gateway sekarang berasal dari cloud atau node lokal, dan nilainya berapa.

## Bagian Advanced

File ini memisahkan buffer `_c...` untuk cloud dan `_l...` untuk lokal. `refreshDisplayData()` memilih salah satunya berdasarkan mode runtime.

## Hubungan ke Sistem TA

Data suhu, kelembapan, cahaya, fog, threshold, dan fallback cloud/edge adalah dasar keputusan kontrol greenhouse.
