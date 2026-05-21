---
title: "Modul SD Card"
---

# Modul SD Card (Penyimpanan Log Lokal)

Koneksi internet seluler di pedesaan atau daerah dataran tinggi (tempat budidaya anggrek) sering mengalami gangguan akibat cuaca buruk atau pemadaman listrik router. Agar data historis sensor berbulan-bulan tidak hilang saat terjadi pemutusan jaringan jangka panjang, Gateway IoT dilengkapi modul **SD Card Reader**.

Modul ini berfungsi sebagai "kotak hitam" (flight recorder) lokal untuk menyimpan seluruh riwayat sensor.

---

## Spesifikasi Teknis SD Card

*   **Antarmuka Komunikasi:** SPI (Serial Peripheral Interface) Bus.
*   **Pin Hubungan:**
    *   **CS (Chip Select):** GPIO 2 (Digunakan untuk mengaktifkan kartu).
    *   **SCK (Serial Clock):** GPIO 18.
    *   **MISO (Master In Slave Out):** GPIO 19.
    *   **MOSI (Master Out Slave In):** GPIO 13.
*   **Format Sistem Berkas:** Wajib menggunakan format **FAT16** atau **FAT32**. Format modern seperti exFAT atau NTFS tidak didukung oleh pustaka standard Arduino `SD.h` bawaan ESP32.
*   **Kapasitas yang Direkomendasikan:** Kartu MicroSD kelas 4 atau kelas 10 berkapasitas **4 GB hingga 32 GB** sudah lebih dari cukup untuk menampung data teks log sensor selama beberapa tahun.
*   **Level Shifter Tegangan:** Gunakan modul MicroSD adapter yang memiliki regulator 3.3V internal dan IC level shifter (seperti LVC125A) jika Anda menghubungkannya ke rel daya 5V, untuk melindungi pin logika input kartu SD dari tegangan berlebih.

---

## Mekanisme Logging dan Struktur File

Data sensor dicatat dalam berkas teks berekstensi `.csv` (Comma Separated Values) yang disimpan ke dalam folder `/logs/` dengan nama berkas berdasarkan tanggal saat itu (diperoleh dari jam RTC), misalnya: `/logs/2026-05-21.csv`.

Format satu baris data di dalam CSV adalah sebagai berikut:
```csv
timestamp,node_id,temperature,humidity,light_lux,relay_exhaust,relay_dehumidifier,relay_blower
1716274200,1,28.40,72.10,12400,1,0,0
```

Dengan struktur ini, pemilik greenhouse dapat melepas kartu SD sewaktu-waktu dan membacanya di komputer menggunakan aplikasi spreadsheet seperti Microsoft Excel untuk analisis pertumbuhan tanaman.

---

## Pencegahan Kerusakan Berkas (File Corruption)

Kartu SD sangat rentan mengalami kerusakan sistem berkas (*file corruption*) jika listrik padam mendadak tepat saat mikrokontroler sedang menulis data ke kartu. Untuk mengatasi kelemahan fisik ini, firmware Gateway (`SDCardLogger.cpp`) menerapkan prosedur menulis aman:

1.  **Siklus Open-Write-Close Instan:** Pustaka tidak membiarkan file terbuka terus-menerus. Setiap kali data masuk, file dibuka (`file = SD.open(...)`), data ditulis dengan cepat, lalu file langsung ditutup kembali (`file.close()`). Ini memastikan penulisan buffer ke memori fisik selesai dalam milidetik.
2.  **Retry Timer Tanpa Blokir:** Jika kartu SD rusak atau tidak sengaja tercabut, sistem tidak akan mogok (*freeze*). Firmware melacak waktu kegagalan terakhir dan hanya akan mencoba mendeteksi ulang kartu SD setiap **5 menit sekali** (`SD_RETRY_INTERVAL_MS`), membiarkan *control loop* utama tetap berjalan tanpa hambatan.

Kembali ke **[Overview Arsitektur](../04-system-architecture/overview.md)** atau lanjutkan membaca bagian kode di **[Firmware Node](../06-firmware-node/overview.md)**!
