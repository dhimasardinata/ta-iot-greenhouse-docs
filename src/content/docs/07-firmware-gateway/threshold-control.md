---
title: "Threshold Control"
---

# Threshold Control

Threshold control adalah keputusan berdasarkan batas suhu, kelembapan, atau cahaya.

## Bukti dari Kode

`SensorDataManager` menyimpan threshold lokal dan cloud:

- `_localThresholds`,
- `_cloudThresholds`.

File ini memakai `ThresholdValidation` untuk memastikan range valid sebelum disimpan atau diterapkan.

## Runtime Threshold

`activeThresholdProfile()` memilih threshold berdasarkan apakah runtime memakai local data atau cloud data.

Fungsi getter seperti `getTempMin()`, `getTempMax()`, `getHumMin()`, dan `getHumMax()` mengambil nilai dari profil aktif.

## Hubungan dengan Relay

`runControlLogic()` mengambil threshold aktif lalu memanggil:

- `relay.updateSingleRelayState(RELAY_EXHAUST, ...)`
- `relay.updateSingleRelayState(RELAY_DEHUMIDIFIER, ...)`
- `relay.updateSingleRelayState(RELAY_BLOWER, ...)`

## Catatan Penting

Threshold invalid ditolak sebelum mempengaruhi kontrol. Halaman file terkait menjelaskan aturan validasi di `ThresholdValidation.h`.

Lanjutkan ke [Scheduling Control](./scheduling-control.md).
