---
title: "Variabel dan Tipe Data"
---

# Variabel dan Tipe Data

Halo, rekan developer! Ketika kita menulis program, komputer membutuhkan cara untuk mengingat informasi yang sedang diproses. Di sinilah **variabel** dan **tipe data** memainkan peranan penting.

Variabel dapat dianalogikan sebagai sebuah wadah atau kotak penyimpanan di dalam memori komputer, sedangkan tipe data menentukan jenis benda apa yang boleh dimasukkan ke dalam wadah tersebut.

Di bawah ini adalah penjelasan mengenai bagaimana variabel dan tipe data digunakan secara nyata di dalam kode proyek Smart Greenhouse kita.

---

## 1. Variabel Nyata dalam Proyek Greenhouse

Di dalam kode program kita, ada banyak informasi lingkungan dan konfigurasi yang harus disimpan dan dimanipulasi. Berikut adalah beberapa contoh variabel penting yang akan sering Anda temui:

| Nama Variabel | Jenis Tipe Data | Representasi Fisik / Fungsi |
| :--- | :--- | :--- |
| `gh_id` | Integer (`int`) | Identitas unik dari bangunan Greenhouse (misal: `1`, `2`). |
| `node_id` | Integer (`int` / `uint16_t`) | Identitas unik dari node sensor yang mengirimkan data. |
| `temperature` | Float / Double (`float`) | Nilai suhu udara hasil pembacaan sensor (misal: `28.5` °C). |
| `humidity` | Float / Double (`float`) | Nilai kelembapan udara (misal: `75.2` %). |
| `lux` | Integer (`uint16_t`) | Intensitas cahaya dalam satuan lux (misal: `450`). |
| `rssi` | Integer (`int16_t`) | Kekuatan sinyal Wi-Fi node dalam satuan dBm (misal: `-65`). |
| `enabled` | Boolean (`bool` / `boolean`) | Status apakah suatu jadwal otomatisasi aktif atau tidak (`true` / `false`). |
| `start_time` / `end_time` | String | Waktu mulai dan selesai aktifnya aktuator (misal: `"08:00"`). |
| `isFoggy` | Boolean | Deteksi kabut dari pemrosesan citra kamera (`true` jika berkabut). |
| `image` | String | Data gambar dalam bentuk base64 atau path berkas gambar. |

---

## 2. Penggunaan Tipe Data di Berbagai Sisi Proyek

Karena proyek kita menggunakan beberapa bahasa pemrograman (C++ di mikrokontroler, PHP di Laravel, Javascript/TypeScript di Vue, dan Kotlin di Android), pemetaan tipe data harus disesuaikan agar tidak terjadi ketidakcocokan (*type mismatch*).

### A. Tipe Data Primitif
Tipe data dasar yang menyimpan nilai tunggal sederhana:

1.  **Integer (Bilangan Bulat)**:
    *   Di C++ firmware: Digunakan tipe data spesifik ukuran seperti `uint16_t` untuk menghemat RAM (misal pada struct `RtcRecordV2` di berkas [RtcManager.h](file:///home/dhimasardinata/Dokumen/ta/node/lib/NodeCore/storage/RtcManager.h)).
    *   Di Laravel: Digunakan tipe data `integer` untuk memvalidasi input `$request->gh_id` di berkas [ApiController.php](file:///home/dhimasardinata/Dokumen/ta/web/ApiController.php).
2.  **Float / Double (Bilangan Desimal)**:
    *   Digunakan untuk nilai presisi seperti suhu (`temperature`) dan kelembapan (`humidity`). Pada penyimpanan database dan API, data desimal dibulatkan demi estetika visual (misal menggunakan fungsi `round($row->avg_value, 2)` pada API rata-rata sensor).
3.  **Boolean (Benar/Salah)**:
    *   Digunakan untuk status biner. Contohnya variabel `isFoggy` untuk menandai apakah kamera menangkap kabut atau status `enabled` pada jadwal aktuator.
4.  **String (Teks)**:
    *   Digunakan untuk representasi waktu seperti `start_time` (`"08:00"`) atau path lokasi gambar kamera di server.

### B. Tipe Data Kompleks
Tipe data yang menampung sekumpulan informasi terstruktur:

1.  **Array**:
    *   Kumpulan elemen sejenis. Misalnya di Laravel [ScheduleController.php](file:///home/dhimasardinata/Dokumen/ta/web/ScheduleController.php), input `schedules` divalidasi sebagai tipe data array:
        ```php
        'schedules' => 'present|array|max:4'
        ```
2.  **Object / Struct / Class**:
    *   Di C++, kita menggunakan `struct` untuk mendefinisikan bentuk data sensor dalam memori RTC yang berukuran tetap (20 bytes) seperti `RtcRecordV2` pada berkas [RtcManager.h](file:///home/dhimasardinata/Dokumen/ta/node/lib/NodeCore/storage/RtcManager.h).
    *   Di JavaScript/Vue, representasi data sensor dikirimkan dalam format objek JSON yang dinamis.

---

## 3. Konstanta: Variabel yang Tidak Boleh Berubah

Selain variabel biasa, kita juga menggunakan **konstanta** (`const` di C++, `const` di JS, atau `define` di PHP/C++). Nilai konstanta ini ditetapkan sekali di awal dan tidak dapat diubah selama program berjalan.

Contoh nyata pada firmware node ([RtcManager.h](file:///home/dhimasardinata/Dokumen/ta/node/lib/NodeCore/storage/RtcManager.h)):
```cpp
#define RTC_MAX_RECORDS 17
#define RTC_LAYOUT_VERSION 2
```
Konstanta di atas menjamin bahwa ukuran maksimum antrean cache data sensor di memori RTC selalu konsisten sebesar 17 record tanpa risiko terubah secara tidak sengaja di bagian kode lain yang bisa merusak struktur memori (*memory corruption*).

---

## Ringkasan untuk Developer

Memilih tipe data yang tepat sangat berpengaruh terhadap performa sistem kita:
*   Di **Mikrokontroler**, penggunaan memori sangat terbatas. Gunakan tipe integer berukuran kecil (seperti `uint16_t` dibanding `int` biasa) untuk menghemat RAM.
*   Di **Database & Backend**, pastikan tipe data kolom (misalnya float untuk sensor, boolean untuk status) selaras dengan validasi request API agar integritas data tetap terjaga.

---

Lanjutkan ke langkah berikutnya: **[Kondisi dan Perulangan](./kondisi-dan-perulangan.md)**.
