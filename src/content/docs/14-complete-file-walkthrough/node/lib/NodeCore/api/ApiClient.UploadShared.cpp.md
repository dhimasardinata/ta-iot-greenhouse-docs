---
title: "node/lib/NodeCore/api/ApiClient.UploadShared.cpp"
---

# node/lib/NodeCore/api/ApiClient.UploadShared.cpp

File ini mengimplementasikan helper upload bersama.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/api/ApiClient.UploadShared.cpp` |
| Komponen | Firmware Node |
| Level | Lanjutan |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

File ini membuat URL gateway, menyusun kandidat gateway primary/secondary, mengambil RSSI jaringan nonaktif, menghapus/mengambil `recorded_at`, membangun JSON sensor, dan memformat timestamp record.

## Kenapa File Ini Ada

Payload sensor dan URL gateway dipakai di banyak jalur: upload edge, immediate upload, emergency record, dan flush RTC. File ini menjaga formatnya tetap satu sumber.

## Isi Penting

| Fungsi | Peran |
|---|---|
| `build_gateway_url_candidates` | Membuat daftar URL gateway dari mDNS/IP primary dan secondary. |
| `build_gateway_url` | Mengambil kandidat gateway pertama. |
| `resolve_nonactive_rssi` | Mengambil RSSI SSID greenhouse yang sedang tidak aktif. |
| `extract_recorded_at_value` | Mengambil nilai waktu dari payload JSON. |
| `strip_recorded_at_field` | Menghapus field `recorded_at` sebelum payload edge ditambah field lain. |
| `buildSensorPayload` | Membuat JSON sensor dengan `gh_id`, `node_id`, temperature, humidity, light, RSSI, dan recorded_at. |
| `format_record_timestamp` | Mengubah timestamp record menjadi string waktu. |
| `build_payload_from_record_fields` | Membuat payload dari field record numerik. |
| `build_payload_from_rtc_record` | Membuat payload dari `RtcSensorRecord`. |

## Error Handling

Semua builder memakai batas ukuran buffer. Jika buffer tidak cukup, fungsi mengembalikan `false` atau panjang `0`, sehingga pemanggil bisa menunda atau menandai error.

## Catatan Performa

JSON dibuat dengan append ketat ke buffer tetap. Ini menghindari alokasi `String` besar dan membantu mengurangi fragmentasi heap.

## Catatan Debugging

Jika format JSON salah atau field waktu hilang, cek `buildSensorPayload`, `extract_recorded_at_value`, dan `strip_recorded_at_field`.

## Hubungan dengan Laporan TA

File ini menjelaskan bentuk data sensor yang akhirnya dikirim node ke sistem monitoring.
