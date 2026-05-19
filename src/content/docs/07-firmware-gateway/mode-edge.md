---
title: "Mode Edge Gateway"
---

# Mode Edge Gateway

Mode edge atau local berarti gateway memakai data node lokal dan konfigurasi lokal.

## Bukti dari Kode

`SensorDataManager::setSourceMode(SOURCE_LOCAL)` memaksa local average. Fungsi `recalculateLocalAverage()` menghitung rata-rata dari node aktif.

`SensorDataManager::updateFromNode()` menerima update dari node atau kamera lokal, menyimpan data ke array `nodes`, mencatat waktu update, dan menyimpan backup ke NVS.

## Local Average

Gateway menghitung:

- rata-rata suhu,
- rata-rata kelembapan,
- rata-rata cahaya,
- status fog dari node kamera `cam-1` atau `cam-2`.

Node sensor biasa memakai index 0 sampai 9, sedangkan kamera memakai index 10 dan 11.

## Kapan Dipakai

Edge dipakai saat:

- mode diset local,
- auto fallback memilih local,
- cloud stale atau tidak sehat,
- operator ingin kontrol tetap dari data lokal.

Lanjutkan ke [Mode Auto](./mode-auto.md).
