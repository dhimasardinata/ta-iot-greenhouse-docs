---
title: "Query Penting"
---

# Query Penting

Halaman ini mencatat query penting yang terlihat dari controller.

## Snapshot Init

Controller mengisi `sensor_snapshots` dari `sensor_data` dengan query `INSERT ... SELECT ... ON DUPLICATE KEY UPDATE`. Tujuannya membuat data terbaru tersedia cepat.

## Average Monitoring

Monitoring membaca `sensor_snapshots` join `sensors`, lalu `AVG(ss.value)` per sensor/greenhouse.

## Table Pivot

`tablePerGH()` mengambil data historis dari `sensor_data`, memetakan sensor ke kolom temperature/humidity/light/rssi, lalu melakukan pagination.

## Active Schedule

`PageController` mencari schedule aktif dengan logika waktu normal dan melewati tengah malam:

- start <= end,
- atau start > end.

## Device Status Freshness

Gateway dianggap online jika `device_statuses.updated_at` masih lebih baru dari batas freshness.

## Belum Terkonfirmasi

Index database yang mendukung query-query ini belum terlihat dari migration.
