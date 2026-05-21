---
title: "Caching (Penyimpanan Sementara)"
---

# Caching Data Sensor secara Circular (Lokal)

Saat koneksi internet terputus, node sensor tidak boleh berhenti mencatat kondisi greenhouse. Untuk mencegah hilangnya data penting Tugas Akhir ini, firmware kita dilengkapi dengan sistem **Caching Lokal** berbasis **Circular FIFO (First-In, First-Out) Buffer Queue** yang dikelola oleh kelas `CacheManager`.

Berikut adalah rancangan detail mengenai cara penyimpanan dan pemulihan data sensor secara offline.

---

## Struktur File Cache (`CacheHeader`)

Penyimpanan cache flash dilakukan di filesystem **LittleFS** pada file `/cache.dat`. Di awal file, terdapat struktur header bernama `CacheHeader` yang melacak indeks penulisan dan pembacaan:

```cpp
struct CacheHeader {
  uint32_t magic;      // Penanda unik berkas cache (CACHE_MAGIC)
  uint32_t head;       // Pointer tulis (offset posisi data terbaru)
  uint32_t tail;       // Pointer baca (offset posisi data terlama)
  uint32_t size;       // Ukuran total data cache saat ini (byte)
  uint16_t version;    // Versi struktur (versi 4)
  uint32_t crc;        // Checksum CRC32 dari seluruh isi header
};
```

---

## Cara Kerja Circular Buffer (Antrean Melingkar)

Memori flash ESP8266 memiliki kapasitas yang sangat terbatas. Jika kita menulis data secara linier terus-menerus, memori perangkat akan cepat penuh dan crash.

Untuk mengatasinya, `CacheManager` memperlakukan file cache seperti sebuah lingkaran tanpa ujung:

1. **Penulisan Data (`head`):**
   Data sensor yang perlu dikirim ulang disimpan sebagai antrean lokal. Pada jalur cepat, rekaman masuk lebih dulu ke RTC RAM; ketika RTC penuh atau gagal ditulis, data dipindahkan ke LittleFS pada posisi index `head`. Pointer `head` kemudian bergeser maju.

2. **Wrap-Around (Berputar Kembali):**
   Jika posisi `head` mencapai batas maksimal kapasitas cache (`MAX_CACHE_DATA_SIZE`), pointer `head` akan berputar kembali ke awal data (`CACHE_DATA_START`) dan menimpa data paling lama jika antrean sudah penuh.

3. **Pembacaan Data (`tail`):**
   Saat koneksi internet pulih, `CacheManager` akan mulai membaca data sensor terlama dari posisi index `tail`, memverifikasi datanya, mengirimkannya ke Laravel Cloud, dan menggeser pointer `tail` maju.

4. **Wrap-Around saat Membaca:**
   Jika pointer `tail` mencapai batas akhir file, fungsi `readWithWrap()` akan secara otomatis melompat kembali ke awal data di flash untuk melanjutkan pembacaan.

```
Posisi Awal file: [ HEADER ] [ DATA TERLAMA (tail) ] ... [ DATA TERBARU (head) ] ... [ BATAS CACHE ]
Data Masuk Baru : [ HEADER ] [ DATA TERLAMA (tail) ] ... [ ... ] [ DATA TERBARU ] ──> (head melompat ke awal jika penuh)
```

---

## Proteksi Integritas Header dengan CRC32

Saat membuka cache, `CacheManager` menghitung ulang checksum CRC32 dari `CacheHeader` dan mencocokkannya dengan `cacheHeader.crc`.
* **Jika CRC32 Cocok:** Sistem aman melanjutkan proses baca-tulis.
* **Jika CRC32 Rusak (Mismatch):** Berarti terjadi mati lampu mendadak di tengah-tengah proses penulisan header. Sistem akan menganggap seluruh cache rusak, me-reset seluruh pointer `head` & `tail` ke posisi awal (`CACHE_DATA_START`), dan mengosongkan cache agar pointer corrupt tidak membaca data sampah yang memicu crash.

---

## Pencegahan Kerusakan Memori Flash (Flash Wear Out)

Memori Flash (LittleFS) memiliki batas usia penulisan. Karena itu firmware menghindari penulisan flash yang terlalu sering.

Untuk memperpanjang umur perangkat:
1. **RTC RAM Cache:** Rekaman sensor offline disimpan lebih dulu di RTC RAM melalui `RtcManager`. Kapasitasnya kecil (`RTC_MAX_RECORDS`), tetapi cukup untuk menahan antrean pendek tanpa langsung menyentuh flash.
2. **Fallback ke LittleFS:** Jika RTC RAM penuh atau gagal ditulis, firmware memindahkan rekaman ke file `/cache.dat` di LittleFS.
3. **Flush Header Bertahap:** `CacheManager` menunda `flush()` header sampai jumlah mutasi tertentu atau timer flush tercapai. Ini mengurangi frekuensi penulisan fisik tanpa mengarang mode hemat daya yang tidak ada di kode.

---

## Alur Navigasi Pembahasan Fondasi Sistem

Selamat! Kamu telah membaca seluruh halaman fondasi dasar sistem Tugas Akhir ini. Silakan kembali ke [Dasar IoT](./iot.md) untuk membaca ulang, atau lanjutkan ke bagian **Arsitektur Sistem** untuk melihat bagaimana komponen-komponen ini saling terintegrasi dalam cetak biru arsitektur aplikasi!
