---
title: "node/lib/NodeCore/api/ApiClient.UploadRecords.cpp"
---

# node/lib/NodeCore/api/ApiClient.UploadRecords.cpp

File ini membuat dan menyimpan emergency record.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/api/ApiClient.UploadRecords.cpp` |
| Komponen | Firmware Node |
| Level | Lanjutan |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

File ini mengambil snapshot sensor, menormalkan nilai suhu/kelembapan/cahaya, menghitung RSSI rata-rata, lalu menyimpan record ke RTC, LittleFS, atau mengirim langsung jika storage gagal.

## Kenapa File Ini Ada

Saat koneksi tidak stabil, node tetap perlu menyimpan data sensor dalam bentuk ringkas. Emergency record menyimpan data penting dalam format kecil agar bisa dibuat payload lagi nanti.

## Isi Penting

| Fungsi | Peran |
|---|---|
| `populateEmergencyRecord` | Membuat record dari sensor, offset config, scaling, timestamp, dan RSSI. |
| `buildPayloadFromEmergencyRecord` | Mengubah record kecil menjadi JSON upload. |
| `appendEmergencyRecordToRtc` | Menulis record ke RTC dengan retry. |
| `appendEmergencyRecordToLittleFs` | Menulis record fallback ke LittleFS dengan retry. |
| `tryDirectSendEmergencyRecord` | Mencoba kirim langsung ke edge atau cloud saat RTC/LittleFS gagal. |

## Error Handling

RTC append dicoba tiga kali. LittleFS fallback dicoba dua kali. Jika semua storage gagal, direct send bisa dipakai bila diizinkan oleh pemanggil.

## Catatan Performa

Record menyimpan nilai terkompresi seperti suhu dan kelembapan dalam persepuluh satuan. Ini lebih hemat daripada menyimpan string JSON sejak awal.

## Catatan Debugging

Jika payload cache berisi nilai 0, cek validitas sensor di `SensorNormalization`, offset config, dan apakah timestamp melewati `NTP_VALID_TIMESTAMP_THRESHOLD`.

## Hubungan dengan Laporan TA

File ini menjelaskan bagaimana data sensor tetap tersimpan walaupun upload utama belum bisa dilakukan.
