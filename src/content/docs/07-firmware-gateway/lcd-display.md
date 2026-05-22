---
title: "LCD Display"
description: "Panduan lengkap modul LCD Display 20x4 pada ESP32 Gateway, termasuk tata letak baris informasi dan mekanisme deteksi I2C non-blocking."
---

# LCD Display (I2C 20x4)

Untuk memantau status operasional secara langsung (on-site) tanpa perlu membuka serial monitor atau dashboard cloud, ESP32 Gateway dilengkapi dengan penampil karakter LCD 20x4 berbasis antarmuka I2C. Komponen ini dikendalikan oleh kelas [LCDDisplay](file:///home/dhimasardinata/Dokumen/ta/gateway/include/LCDDisplay.h) yang diimplementasikan di [LCDDisplay.cpp](file:///home/dhimasardinata/Dokumen/ta/gateway/src/LCDDisplay.cpp).

---

## Spesifikasi Hardware & Koneksi

Secara default, LCD terhubung ke bus I2C utama ESP32 dengan konfigurasi berikut:
*   **Alamat I2C**: `0x27` (didefinisikan melalui konstanta `LCD_ADDR` di [config.h](file:///home/dhimasardinata/Dokumen/ta/gateway/include/config.h#L87))
*   **Pin SDA**: GPIO 21 (didefinisikan sebagai `SDA_PIN` di [config.h](file:///home/dhimasardinata/Dokumen/ta/gateway/include/config.h#L83))
*   **Pin SCL**: GPIO 22 (didefinisikan sebagai `SCL_PIN` di [config.h](file:///home/dhimasardinata/Dokumen/ta/gateway/include/config.h#L84))
*   **Dimensi**: 20 karakter × 4 baris

---

## Mekanisme Deteksi Toleran Kesalahan (Fault-Tolerant)

Salah satu kelemahan umum pada driver LCD I2C standar adalah kecenderungan sistem untuk mengalami *freeze* (macet) atau membanjiri log serial dengan pesan error jika kabel LCD terputus atau mengalami gangguan kontak saat runtime (hot-plugging).

Untuk mengatasi masalah ini, kelas `LCDDisplay` menggunakan sistem deteksi berkala non-blocking:
1.  **Pengecekan Ketersediaan (`checkAvailability`)**:
    Sebelum mengirim data ke LCD, gateway memverifikasi keberadaan modul LCD di bus I2C menggunakan fungsi `Wire.beginTransmission(0x27)` dan `Wire.endTransmission()`.
2.  **Debounce & Jeda Waktu (`CHECK_INTERVAL_MS = 5000`)**:
    Gateway membatasi frekuensi probing I2C setiap **5 detik** sekali (5000 ms). Jika LCD tidak terdeteksi, gateway tidak akan mencoba mengirim perintah LCD biasa (seperti pembersihan layar atau penulisan teks) untuk menghindari penyumbatan bus I2C dan spam log debug.
3.  **Hot-Plugging**:
    Jika LCD dicabut lalu dipasang kembali, modul secara otomatis terdeteksi dalam siklus 5 detik berikutnya, lalu di-inisialisasi ulang secara instan tanpa perlu me-reset mikrokontroler gateway.

---

## Tata Letak Baris Tampilan (Row Layout)

Metode `LCDDisplay::update()` bertanggung jawab memformat data dan memperbarui tampilan LCD secara berkala. Berikut adalah visualisasi dan struktur detail data pada layar 20x4:

```text
+--------------------+
|14:30:15 WF:OK [-72]| -> Baris 0: Status Waktu & Jaringan
|T:27.5C H:68% L:450 | -> Baris 1: Data Sensor Terkini
|Ex:Y Dh:N Bl:Y f=0  | -> Baris 2: Status Output Aktuator
|T:25-30 H:60-80     | -> Baris 3: Target Threshold Aktif
+--------------------+
```

### Rincian Informasi per Baris:

#### Baris 0: Status Jaringan & Keamanan
*   **Mode Failsafe**: Jika sistem berada dalam mode darurat, baris pertama akan menampilkan string:
    ```text
    ** FAILSAFE ** <waktu>
    ```
*   **Mode Normal**: Menampilkan jam, tipe koneksi, status data, dan kekuatan sinyal:
    ```text
    HH:MM:SS <netType>:<netStatus> [<rssi>]
    ```
    *   `netType`: `WF` jika terkoneksi melalui WiFi, atau `GP` jika terkoneksi melalui jaringan seluler GPRS (SIM800L).
    *   `netStatus`:
        *   `OK` : Terkoneksi ke server dan data sinkronisasi berjalan normal.
        *   `ST` (*Stale*): Terkoneksi, tetapi data yang dibaca sudah usang/terlambat dari batas waktu.
        *   `OF` (*Offline*): Koneksi internet terputus.
    *   `rssi`: Nilai kekuatan sinyal dalam dBm (misalnya `[-72]`).

#### Baris 1: Data Sensor Fisik Greenhouse
Menampilkan metrik lingkungan yang diterima dari node sensor:
```text
T:<Suhu>C H:<Kelembapan>% L:<Cahaya>
```
*   `T`: Nilai suhu (format desimal 1 angka di belakang koma, contoh: `27.5C`).
*   `H`: Persentase kelembapan relatif (dibulatkan tanpa pecahan, contoh: `68%`).
*   `L`: Tingkat kecerahan cahaya dalam lux (dibulatkan tanpa pecahan, contoh: `450`).

#### Baris 2: Status Relay dan Aktuator
Menampilkan status kerja masing-masing output fisik relay:
```text
Ex:<Y/N> Dh:<Y/N> Bl:<Y/N> f=<0/1>
```
*   `Ex` (*Exhaust Fan*): `Y` (Aktif/Hidup) atau `N` (Mati).
*   `Dh` (*Dehumidifier*): `Y` (Aktif) atau `N` (Mati).
*   `Bl` (*Blower/Kipas Sirkulasi*): `Y` (Aktif) atau `N` (Mati).
*   `f` (*Fogger / Kamera Status*): Menunjukkan status aktivasi pompa kabut (`1` untuk aktif, `0` untuk mati).

#### Baris 3: Batasan Ambang Batas (Thresholds)
Menampilkan rentang kontrol parameter target yang sedang dijadikan acuan oleh algoritma otomatis:
```text
T:<Min>-<Max> H:<Min>-<Max>
```
*   `T`: Rentang target suhu minimum hingga maksimum dalam °C (contoh: `25-30`).
*   `H`: Rentang target kelembapan minimum hingga maksimum dalam % (contoh: `60-80`).

---

## Panduan Penanganan Masalah (Troubleshooting)

Jika layar LCD tidak menampilkan tulisan apa pun atau terlihat redup:

1.  **Kontras Potensiometer**:
    Putar sekrup trimpot kontras di bagian belakang modul backpack LCD I2C dengan obeng kecil hingga karakter terlihat jelas.
2.  **Verifikasi Jalur I2C**:
    Pastikan pin SDA (GPIO 21) dan SCL (GPIO 22) tidak tertukar dan terhubung dengan kencang ke pin LCD.
3.  **Pemeriksaan Tegangan Catu Daya**:
    Modul LCD 20x4 umumnya membutuhkan tegangan stabil **5V**. Pastikan pin VCC pada LCD terhubung ke output regulator 5V (catu daya eksternal 5V 3A), bukan pin 3.3V ESP32, karena tegangan yang terlalu rendah akan membuat backlight redup dan karakter tidak terbaca.
4.  **Alamat I2C Berbeda**:
    Secara default modul menggunakan alamat `0x27`. Jika modul Anda menggunakan chip PCF8574 yang berbeda, alamatnya bisa saja berupa `0x3F`. Jalankan kode utilitas *I2C Scanner* untuk mendeteksi alamat pastinya lalu sesuaikan variabel `LCD_ADDR` di [config.h](file:///home/dhimasardinata/Dokumen/ta/gateway/include/config.h#L87).
