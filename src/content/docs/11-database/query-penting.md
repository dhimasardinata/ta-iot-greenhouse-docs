---
title: "Kueri Penting Database"
description: "Daftar kueri SQL mentah (raw SQL queries) krusial yang berjalan pada sistem basis data untuk sinkronisasi snapshot, pivot paginasi, dan filter waktu jadwal."
---

# Kueri Penting Database

Halaman ini mendokumentasikan kueri basis data SQL mentah (*raw SQL statements*) yang berjalan di backend Laravel. Kueri-kueri ini ditulis secara khusus untuk mengoptimalkan kinerja pembacaan tabel log berukuran besar dan melakukan sinkronisasi data real-time.

---

## 1. Kueri Inisialisasi & Regenerasi Snapshot Sensor (Upsert)

Kueri ini berjalan secara otomatis di latar belakang saat halaman Monitoring atau Heatmap dibuka. Kueri ini mengumpulkan nilai pembacaan terakhir dari setiap sensor dan memperbarui tabel ringkasan `sensor_snapshots` secara massal (*Upsert*):

```sql
INSERT INTO sensor_snapshots (sensor_id, node_id, value, recorded_at, created_at, updated_at)
SELECT sd.sensor_id, sd.node_id, sd.value, sd.recorded_at, NOW(), NOW()
FROM sensor_data sd
INNER JOIN (
    -- Cari ID baris data terakhir per sensor per node
    SELECT sensor_id, node_id, MAX(id) AS latest_id
    FROM sensor_data
    GROUP BY sensor_id, node_id
) latest ON latest.latest_id = sd.id
ON DUPLICATE KEY UPDATE
    value = VALUES(value),
    recorded_at = VALUES(recorded_at),
    updated_at = VALUES(updated_at)
```

---

## 2. Kueri Paginasi & Pivot Tabel Sensor (`tablePerGH`)

Untuk menampilkan data sensor per baris waktu dengan kolom (Suhu, Kelembapan, Lux, RSSI) yang terisi sejajar, backend mengeksekusi kueri agregasi pivot setelah membatasi data unik terpaginasi:

```sql
SELECT
    node_id,
    recorded_at,
    DATE_FORMAT(recorded_at, '%d-%m-%Y') as date,
    TIME(recorded_at) as time,
    MAX(CASE WHEN sensor_id = ? THEN value END) as temperature,
    MAX(CASE WHEN sensor_id = ? THEN value END) as humidity,
    MAX(CASE WHEN sensor_id = ? THEN value END) as light_intensity,
    MAX(CASE WHEN sensor_id = ? THEN value END) as rssi
FROM sensor_data
WHERE sensor_id IN (?, ?, ?, ?)
  AND (
      (node_id = ? AND recorded_at = ?)
      OR (node_id = ? AND recorded_at = ?)
      OR ...
  )
GROUP BY node_id, recorded_at
```

---

## 3. Kueri Bucket Grafik Historis (`fetchChart`)

Kueri ini mengelompokkan data berdasarkan rentang waktu dinamis menggunakan format string `DATE_FORMAT` untuk membentuk label sumbu-X grafik secara kronologis:

```sql
SELECT
    DATE_FORMAT(recorded_at, ?) as label, -- format biner: '%H:00', '%Y-%m-%d', dll.
    AVG(value) as value,
    MIN(recorded_at) as earliest
FROM sensor_data
WHERE sensor_id = ?
  AND recorded_at >= ?
GROUP BY label
ORDER BY earliest ASC
```

---

## 4. Kueri Pencarian Jadwal Aktif Aktuator (Menembus Tengah Malam)

Salah satu kueri paling kritis di [PageController.php](file:///home/dhimasardinata/Dokumen/ta/web/PageController.php) adalah mencocokkan jadwal mana saja yang sedang aktif saat ini. Kueri ini mengimplementasikan logika penanganan rentang waktu yang **menembus batas tengah malam** (misal: Mulai `22:00` s.d Selesai `02:00` subuh):

```sql
SELECT
    gh_id,
    relay_exhaust,
    relay_dehumidifier,
    relay_blower
FROM schedules
WHERE enabled = 1
  AND (
        -- Kasus A: Jadwal standar (dalam hari yang sama, misal 08:00 s.d 17:00)
        (start_time <= end_time AND start_time <= ? AND end_time >= ?)
        OR
        -- Kasus B: Jadwal menembus tengah malam (misal 22:00 s.d 02:00)
        (start_time > end_time AND (start_time <= ? OR end_time >= ?))
      )
ORDER BY gh_id ASC, start_time DESC
```
*Catatan: Tanda tanya `?` diisi dengan string waktu server saat ini (format `H:i:s`, misal `09:15:00`).*
