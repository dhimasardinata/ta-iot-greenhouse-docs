---
title: "gateway/src/SDCardLogger.cpp"
---

# gateway/src/SDCardLogger.cpp

File ini mengimplementasikan logging gateway ke SD Card.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `gateway/src/SDCardLogger.cpp` |
| Komponen | Firmware Gateway |
| Level | Menengah |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Kenapa File Ini Ada

Gateway perlu menyimpan riwayat data sensor, status relay, sumber keputusan, dan QoS node secara lokal. File ini menulis dua CSV utama: `log.csv` dan `qos.csv`.

## File Log yang Dibuat

| File di SD Card | Isi |
|---|---|
| `/log.csv` | Data runtime gateway, sensor, relay, fog, threshold, mode, schedule, dan decision source. |
| `/qos.csv` | Waktu RX, node ID, waktu TX, ukuran payload, RSSI aktif, dan RSSI nonaktif. |

## Alur Begin

1. Menampilkan `Init SD card...`.
2. Mengatur SPI memakai pin dari `config.h`.
3. Mount SD Card pada 4 MHz.
4. Mengecek card type.
5. Membuka `/log.csv` dan menulis header jika file baru.
6. Membuka `/qos.csv` dan menulis header jika file baru.
7. Mengatur `sdOk = true`.

## Alur logData

`logData(...)` menolak operasi jika SD sedang busy. Jika SD tidak siap atau file log hilang, fungsi mencoba re-init. Data ditulis sebagai satu baris CSV dengan buffer 520 karakter. Flush dilakukan setiap 12 tulisan.

## Alur logQoS

`logQoS(...)` menulis satu baris QoS dan langsung flush. Waktu RX diambil dari `time(nullptr)`, sedangkan waktu TX berasal dari epoch node.

## Data Masuk

Data masuk berupa waktu, sensor, RSSI, status GPRS, relay, fog, threshold, mode gateway, sumber threshold, sumber schedule, schedule active/ID, decision source, node ID, payload size, dan RSSI QoS.

## Data Keluar

Data keluar berupa file CSV di SD Card.

## Error yang Mungkin Terjadi

- SD Card mount gagal.
- Card tidak terdeteksi.
- File CSV gagal dibuka.
- SD sedang busy karena download.
- `logData(...)` dapat kehilangan baris jika SD gagal sebelum re-init selesai.
- Buffer CSV punya ukuran tetap; perubahan kolom perlu menjaga agar tidak terpotong.

## Bagian untuk Pemula

File ini menulis catatan gateway ke kartu memori. Catatan ini berguna untuk melihat apa yang terjadi meskipun dashboard tidak dibuka.

## Bagian Advanced

`logFile`, `qosFile`, dan `writeCounter` adalah global file handle/counter di source ini. Ini sederhana, tetapi akses harus hati-hati saat ada fitur download atau format log.

## Hubungan ke Sistem TA

Log SD Card mendukung pengujian, audit data greenhouse, dan analisis saat jaringan cloud tidak stabil.
