---
title: "gateway/include/SensorNormalization.h"
---

# gateway/include/SensorNormalization.h

File ini berisi fungsi normalisasi nilai sensor.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `gateway/include/SensorNormalization.h` |
| Komponen | Firmware Gateway |
| Level | Pemula |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Kenapa File Ini Ada

Data sensor bisa rusak, tidak terbaca, atau berada di luar batas wajar. File ini menyediakan fungsi kecil untuk memastikan suhu, kelembapan, dan cahaya masuk rentang yang dapat dipakai gateway.

## Fungsi Utama

| Fungsi | Batas/Perilaku |
|---|---|
| `normalizeTemperature(...)` | Menolak nilai tidak finite, clamp ke -40 sampai 100. |
| `normalizeHumidity(...)` | Menolak nilai tidak finite atau negatif, clamp maksimum 100. |
| `normalizeLight(...)` | Menolak nilai tidak finite atau negatif, clamp maksimum 65535. |
| `sanitizeHumidityOrZero(...)` | Mengembalikan 0 jika kelembapan invalid. |
| `sanitizeLightOrZero(...)` | Mengembalikan 0 jika cahaya invalid. |
| `sanitizeTemperatureOr(...)` | Mengembalikan fallback jika suhu invalid. |

## Data Masuk

Data masuk berupa nilai `float` suhu, kelembapan, atau cahaya.

## Data Keluar

Data keluar berupa nilai yang sudah dinormalisasi atau status valid/tidak valid.

## Kapan Dipakai

File ini dipakai sebelum data sensor dipakai untuk display, log, atau kontrol.

## Error yang Mungkin Terjadi

- Nilai yang terlalu tinggi akan dipotong ke batas maksimum, sehingga data asli ekstrem tidak terlihat lagi setelah normalisasi.
- Nilai invalid kelembapan/cahaya dapat berubah menjadi 0 pada fungsi sanitize, yang perlu dibedakan dari pembacaan 0 yang benar-benar nyata.

## Bagian untuk Pemula

Normalisasi berarti merapikan angka sebelum dipakai. Kalau sensor memberi angka aneh, gateway tidak langsung percaya angka itu.

## Bagian Advanced

Fungsi ini `inline` dan mutasi nilai lewat referensi. Caller harus sadar bahwa nilai input bisa berubah setelah fungsi dipanggil.

## Hubungan ke Sistem TA

Normalisasi membantu mencegah data sensor buruk langsung memengaruhi dashboard, log, dan keputusan aktuator.
