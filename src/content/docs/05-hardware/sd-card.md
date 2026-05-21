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

Data sensor dicatat dalam berkas teks berekstensi `.csv` (Comma Separated Values) di root kartu SD. Kode gateway saat ini memakai dua file utama:

* `/log.csv` untuk riwayat data sensor, status relay, status kabut, threshold, jadwal, dan sumber keputusan kontrol.
* `/qos.csv` untuk catatan kualitas pengiriman data node, seperti waktu terima, waktu kirim, ukuran payload, dan RSSI.

Format satu baris data di dalam CSV adalah sebagai berikut:
```csv
DateTime,Temperature,Humidity,Light,NetworkType,Signal,Relay1,Relay2,Relay3,Relay4,FogStatus,Tmin,Tmax,Hmin,Hmax,GatewayMode,ThresholdSource,ScheduleSource,R1ScheduleActive,R2ScheduleActive,R3ScheduleActive,R1ScheduleId,R2ScheduleId,R3ScheduleId,R1Decision,R2Decision,R3Decision
2026-05-21 09:24:00,28.40,72.1,12400.0,WiFi,-65,ON,OFF,OFF,OFF,0,24.0,30.0,60.0,85.0,AUTO,CLOUD,CLOUD,0,0,0,-1,-1,-1,THRESHOLD,HOLD,HOLD
```

Dengan struktur ini, pemilik greenhouse dapat melepas kartu SD sewaktu-waktu dan membacanya di komputer menggunakan aplikasi spreadsheet seperti Microsoft Excel untuk analisis pertumbuhan tanaman.

---

## Pencegahan Kerusakan Berkas (File Corruption)

Kartu SD sangat rentan mengalami kerusakan sistem berkas (*file corruption*) jika listrik padam mendadak tepat saat mikrokontroler sedang menulis data ke kartu. Untuk mengatasi kelemahan fisik ini, firmware Gateway (`SDCardLogger.cpp`) menerapkan prosedur menulis aman:

1.  **Handle File Dijaga Selama Runtime:** Saat SD berhasil diinisialisasi, gateway membuka `/log.csv` dan `/qos.csv` dalam mode append. Data baru ditulis sebagai baris CSV tanpa membuat file baru setiap tanggal.
2.  **Flush Berkala:** Untuk mengurangi beban tulis kartu SD, `/log.csv` di-flush setiap **12 kali penulisan**. File `/qos.csv` di-flush setiap kali catatan QoS ditulis karena frekuensinya lebih rendah dan dipakai untuk evaluasi jaringan.
3.  **Retry Timer Tanpa Blokir:** Jika kartu SD rusak atau tidak sengaja tercabut, sistem tidak akan mogok (**freeze**). Firmware melacak waktu kegagalan terakhir dan hanya akan mencoba mendeteksi ulang kartu SD setiap **5 menit sekali** (`SD_RETRY_INTERVAL_MS`), membiarkan control loop utama tetap berjalan tanpa hambatan.

Kembali ke **[Overview Arsitektur](../04-system-architecture/overview.md)** atau lanjutkan membaca bagian kode di **[Firmware Node](../06-firmware-node/overview.md)**!
