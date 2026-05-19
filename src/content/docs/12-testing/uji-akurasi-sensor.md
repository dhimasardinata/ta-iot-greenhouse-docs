---
title: "Uji Akurasi Sensor"
---

# Uji Akurasi Sensor

Uji akurasi sensor memastikan angka suhu, kelembapan, cahaya, dan RSSI yang dikirim sistem tidak asal muncul, tetapi berasal dari pembacaan sensor yang masuk akal.

## Yang Harus Diuji

- Sensor suhu.
- Sensor kelembapan.
- Sensor intensitas cahaya.
- Nilai RSSI Wi-Fi.
- Offset atau kalibrasi sensor.
- Perilaku saat sensor gagal dibaca.

## Bukti dari Kode

Firmware node memiliki area sensor di:

- `node/include/config/calibration.h`
- `node/lib/NodeCore/sensor/SensorManager.h`
- `node/lib/NodeCore/sensor/SensorManager.cpp`
- `node/lib/NodeCore/sensor/SensorData.h`
- `node/lib/NodeCore/commands/ReadSensorsCommand.*`
- `node/lib/NodeCore/commands/GetCalibrationCommand.*`
- `node/lib/NodeCore/commands/SetCalibrationCommand.*`
- `node/lib/NodeCore/commands/ResetCalibrationCommand.*`
- `node/lib/NodeCore/commands/ZeroCalibrationCommand.*`

Test yang terlihat:

- `node/test/test_cache_manager/test_main.cpp` membuat payload dari data sensor mock dan mengecek suhu serta kelembapan setelah kalibrasi.
- `node/test/test_integration/test_main.cpp` mengecek payload valid dan payload invalid.

## Untuk Pemula

Sensor tidak otomatis benar hanya karena ada angka. Angka sensor harus dibandingkan dengan alat pembanding, misalnya termometer atau lux meter. Jika ada selisih tetap, sistem bisa memakai kalibrasi.

## Format Pengujian Manual

| Langkah | Yang Dicatat |
|---|---|
| Letakkan sensor di kondisi stabil | waktu, lokasi, greenhouse |
| Baca nilai dari terminal atau dashboard | suhu, kelembapan, lux, RSSI |
| Bandingkan dengan alat pembanding | nilai acuan |
| Hitung selisih | error absolut dan persen |
| Ulangi beberapa titik | pagi, siang, sore, kondisi lembap |

## Status Bukti

Belum terlihat file hasil pengukuran sensor fisik di snapshot ini. Halaman file-by-file nanti harus memastikan apakah data uji lapangan disimpan di folder lain atau masih perlu dibuat.

Lanjutkan ke [Uji Node ke Cloud](./uji-node-ke-cloud.md).
