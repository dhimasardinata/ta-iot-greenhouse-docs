---
title: "Sensor Suhu & Kelembapan"
---

# Sensor Suhu dan Kelembapan (SHT)

Kelembapan udara (Humidity) dan Suhu (Temperature) adalah dua parameter krusial bagi pertumbuhan tanaman anggrek. Anggrek membutuhkan lingkungan dengan sirkulasi udara yang baik, suhu hangat yang stabil, dan tingkat kelembapan yang relatif tinggi (sekitar 60% s.d. 80% RH).

Untuk mengukur kedua parameter ini secara presisi, firmware node memakai keluarga sensor **Sensirion SHT** melalui bus I2C. Dokumentasi lama menyebut DHT22 sebagai cadangan, tetapi kode node saat ini tidak memiliki driver DHT22.

---

## Sensor Utama: Sensirion SHT

Sensor keluarga SHT merupakan sensor digital yang memiliki tingkat akurasi tinggi dan stabilitas jangka panjang yang baik.

### Spesifikasi Teknis SHT
*   **Antarmuka Komunikasi:** I2C Bus.
*   **Alamat I2C Default:** `0x44` (Pin ADR di-ground-kan) atau `0x45` (Pin ADR ditarik ke VCC).
*   **Rentang Pengukuran Suhu:** -40°C hingga +125°C.
    *   *Akurasi:* $\pm$0.3°C pada rentang suhu operasional anggrek (0°C s.d. 60°C).
*   **Rentang Pengukuran Kelembapan:** 0% hingga 100% RH.
    *   *Akurasi:* $\pm$2% RH pada kondisi kelembapan 10% s.d. 90%.
*   **Catatan Implementasi:** Firmware menginisialisasi sensor lewat `SensorManager::tryInitSht()` dan membaca data melalui `m_sht.readSample()`. Jika ingin memakai DHT22, firmware perlu driver dan jalur pin tambahan terlebih dahulu.

---

## Panduan Pemasangan Fisik di Greenhouse

Untuk mendapatkan data yang mewakili kondisi lingkungan anggrek yang sebenarnya (*representative sampling*):

```
BENAR:
┌──────────────────────────────────────┐
│  [Atap Greenhouse / Paranet]         │
│                                      │
│      [Pohon / Daun Anggrek]          │
│          [SENSOR SHT31] (Teduh)      │
└──────────────────────────────────────┘

SALAH (Terkena Sinar Matahari Langsung):
┌──────────────────────────────────────┐
│  [Atap Greenhouse]     (Matahari) ☼  │
│                           │          │
│                           ▼          │
│                     [SENSOR SHT31]   │
└──────────────────────────────────────┘
```

1.  **Hindari Cahaya Matahari Langsung:** Jangan memasang sensor di titik terbuka yang terpapar matahari langsung. Panas radiasi matahari akan membuat casing sensor memanas dan melaporkan suhu yang jauh lebih tinggi dari suhu udara sebenarnya. Pasang sensor di bawah naungan dedaunan anggrek atau gunakan *radiation shield* (pelindung radiasi berbentuk piringan bertumpuk).
2.  **Jauhi Semburan Mist/Fogger:** Pasang sensor pada jarak aman dari nozzle kabut (*misting nozzle*). Jika air menyembur langsung mengenai filter sensor, udara di dalam sensor akan jenuh pada 100% RH dalam waktu lama, dan air yang masuk dapat merusak elemen kapasitif sensor.
3.  **Ketinggian yang Sesuai:** Tempatkan sensor sejajar dengan ketinggian tanaman anggrek digantung, bukan di lantai tanah (yang cenderung lebih dingin dan basah) atau terlalu dekat dengan atap seng/paranet (yang cenderung sangat panas).

Lanjutkan ke [Sensor Cahaya](./sensor-cahaya.md) untuk mempelajari pengukuran intensitas penyinaran matahari!
