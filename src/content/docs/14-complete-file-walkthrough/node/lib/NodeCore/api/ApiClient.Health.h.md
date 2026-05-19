---
title: "node/lib/NodeCore/api/ApiClient.Health.h"
---

# node/lib/NodeCore/api/ApiClient.Health.h

File ini mengambil snapshot kesehatan runtime `ApiClient`.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/api/ApiClient.Health.h` |
| Komponen | Firmware Node |
| Level | Menengah |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

File ini mengecek RAM, koneksi Wi-Fi, status scan Wi-Fi, kapasitas RTC/LittleFS, backpressure storage, dan kesiapan heap untuk TLS.

## Kenapa File Ini Ada

Upload HTTPS membutuhkan blok heap yang cukup besar. Jika firmware tetap memaksa upload saat heap tidak sehat, upload bisa gagal atau sistem menjadi tidak stabil. File ini memberi dasar keputusan sebelum upload berjalan.

## Isi Penting

| Fungsi / Struct | Fungsi sederhana |
|---|---|
| `HeapBudget` | Menyimpan free heap, max block, batas minimal, dan status sehat. |
| `captureTlsHeapBudget` | Menghitung apakah heap cukup untuk TLS. Jika WebSocket aktif, margin ditambah. |
| `captureApiHeapBudget` | Menghitung apakah heap cukup untuk operasi API umum. |
| `captureRuntimeHealth` | Mengambil snapshot kondisi runtime lengkap. |
| `refreshRuntimeHealth` | Menyimpan snapshot terbaru ke context. |

## Dependency Internal

| Dependency | Fungsi |
|---|---|
| `ApiClient.Context.h` | Sumber policy, dependency, dan tempat health disimpan. |
| `CacheManager` | Mengecek ukuran cache LittleFS. |
| `RtcManager` | Mengecek kapasitas RTC cache. |
| `WifiManager` | Mengecek status Wi-Fi dan scan. |
| `config/constants.h` | Batas ukuran cache dan heap minimum. |

## Error Handling

File ini tidak memperbaiki error langsung. Ia memberi status `healthy` atau flag health lain yang dipakai controller untuk menunda, memilih fallback, atau mencatat peringatan.

## Catatan Performa

Pengecekan memakai API ringan seperti `ESP.getFreeHeap()` dan `ESP.getMaxFreeBlockSize()`. Hasilnya disimpan sebagai snapshot agar modul lain tidak harus menghitung ulang terus-menerus.

## Catatan Debugging

Jika upload HTTPS sering gagal saat terminal web terbuka, perhatikan log heap dan margin WebSocket di `captureTlsHeapBudget`.

## Hubungan dengan Laporan TA

File ini mendukung argumen bahwa firmware tidak hanya mengirim data, tetapi juga menjaga stabilitas perangkat kecil dengan RAM terbatas.
