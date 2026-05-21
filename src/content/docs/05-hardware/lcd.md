---
title: "Layar LCD Lokal"
---

# Layar LCD Lokal (I2C Character Display)

Meskipun status greenhouse dapat dipantau dari jarak jauh melalui dashboard web dan HP Android, sistem tetap membutuhkan tampilan visual langsung (*local interface*) di dekat pintu masuk greenhouse. Tampilan ini memudahkan teknisi di lapangan untuk memeriksa kondisi sistem secara instan tanpa perlu membuka HP.

Sistem kita menggunakan **Layar LCD Karakter (16x2 atau 20x4)** yang dilengkapi dengan modul backpack **I2C PCF8574**.

---

## Spesifikasi Teknis LCD I2C

*   **Ukuran Layar:** 16 karakter x 2 baris (atau 20 karakter x 4 baris untuk informasi lebih padat).
*   **Modul Backpack (Driver):** PCF8574 I/O Expander. Modul ini mengonversi komunikasi data paralel 8-bit LCD menjadi protokol serial I2C. Berkat modul ini, kita hanya membutuhkan **2 pin data (SDA/SCL)** pada ESP32, menghemat penggunaan pin GPIO hingga 10 pin.
*   **Tegangan Kerja:** 5V DC.
    *   *Peringatan:* Jika LCD diberi daya 3.3V, kontras karakter akan sangat redup atau bahkan tidak terlihat sama sekali meskipun backlight menyala. Hubungkan pin VCC LCD ke pin `5V` pada ESP32 Gateway.
*   **Alamat I2C Default:** Umumnya `0x27` atau `0x3F`. Alamat ini dapat diubah dengan menjembatani titik solder pad A0, A1, dan A2 di bagian belakang modul PCF8574.

---

## Informasi yang Ditampilkan Layar LCD

Layar LCD pada gateway diprogram untuk berganti tampilan secara bergantian (*cycling screens*) setiap beberapa detik, menampilkan parameter diagnosa sebagai berikut:

### Halaman 1: Kondisi Sensor Lingkungan
Menampilkan nilai suhu, kelembapan, dan intensitas cahaya rata-rata greenhouse saat ini:
```
TEMP : 28.4 C
HUMI : 72.1 %  LUX:12400
```

### Halaman 2: Status Jaringan dan API Cloud
Menampilkan status koneksi Wi-Fi atau GSM, alamat IP lokal, dan status HTTP push ke cloud server:
```
IP: 192.168.1.105
CLOUD: CONNECTED (OK)
```

### Halaman 3: Status Aktuator dan File Log
Menampilkan status aktif sakelar relay dan ketersediaan penyimpanan SD Card lokal:
```
RELAY: EXH:ON BLW:OFF
LOG  : SD:OK CACHE:0
```

---

## Troubleshooting LCD Redup

Jika layar LCD menyala biru/hijau tetapi tidak menampilkan teks karakter sama sekali:
1.  **Atur Potensiometer Kontras:** Di bagian belakang backpack I2C terdapat potensiometer biru kecil berpaku minus. Putar perlahan menggunakan obeng mini untuk menyesuaikan tingkat kontras piksel karakter hingga teks terlihat tajam.
2.  **Periksa Tegangan SDA/SCL Level:** Level logika I2C ESP32 adalah 3.3V, sedangkan LCD ditenagai 5V. PCF8574 biasanya masih mendeteksi logika 3.3V dengan baik. Namun, jika sering terjadi error transfer karakter (*tampilan menjadi berantakan/garis-garis*), pasang **I2C Logic Level Converter (3.3V to 5V)** pada jalur SDA/SCL.

Lanjutkan ke [Modul RTC DS3231](./rtc.md) untuk melihat bagaimana waktu lokal dipertahankan tanpa jaringan internet!
