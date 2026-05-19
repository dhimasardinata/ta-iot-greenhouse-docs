---
title: "node/include/config/calibration.h"
---

# node/include/config/calibration.h

File ini menyimpan nilai kalibrasi bawaan berdasarkan `NODE_ID`.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/include/config/calibration.h` |
| Komponen | Firmware Node |
| Level | Menengah |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

File ini bertugas memberi nilai koreksi suhu, kelembapan, dan cahaya untuk node tertentu saat firmware dikompilasi.

## Kenapa File Ini Ada

Setiap sensor bisa punya selisih pembacaan. Karena itu node 1 sampai node 10 diberi nilai offset atau faktor skala berbeda. Dengan begitu data greenhouse lebih mendekati kondisi sebenarnya.

## Data Penting

| Nama | Fungsi |
|---|---|
| `TEMP_OFFSET` | Koreksi pembacaan suhu. |
| `HUMIDITY_OFFSET` | Koreksi pembacaan kelembapan. |
| `LUX_SCALING_FACTOR` | Pengali pembacaan intensitas cahaya. |
| `NODE_ID` | Penentu set kalibrasi yang dipilih. |

## Alur Kerja File

1. File mengambil `NODE_ID` dari `generated/node_config.h`.
2. Jika `NODE_ID` tidak tersedia, proses compile dihentikan dengan `#error`.
3. Preprocessor memilih blok nilai sesuai `NODE_ID`.
4. Jika `NODE_ID` tidak dikenal, firmware memakai default dan mengeluarkan `#warning`.

## Konsep Dasar yang Perlu Dipahami

- `constexpr` berarti nilai sudah diketahui saat compile.
- `#if`, `#elif`, dan `#else` memilih kode berdasarkan kondisi compile-time.
- Offset suhu/kelembapan ditambahkan ke hasil sensor.
- Faktor lux mengalikan hasil sensor cahaya.

## Error Handling

Jika `NODE_ID` tidak didefinisikan, compile gagal. Ini bagus karena firmware tidak boleh dibangun tanpa identitas node yang jelas.

## Catatan Keamanan

Tidak ada aspek keamanan langsung. Namun nilai kalibrasi memengaruhi validitas data yang dipakai untuk keputusan greenhouse.

## Catatan Debugging

Jika data sensor terasa meleset hanya pada node tertentu, cek `NODE_ID` yang aktif dan nilai offset/faktor di file ini.

## Hubungan dengan Laporan TA

File ini berhubungan dengan uji akurasi sensor, kalibrasi node, dan kualitas data sensor pada Bab IV.
