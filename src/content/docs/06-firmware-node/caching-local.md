---
title: "Caching Local & LittleFS"
---

# Caching Local & Struktur Berkas Sirkular

Ketika koneksi Wi-Fi terputus atau server cloud/gateway lokal tidak dapat dijangkau, data sensor tidak boleh hilang. Firmware node menyertakan modul [CacheManager](file:///home/dhimasardinata/Dokumen/ta/node/lib/NodeCore/storage/CacheManager.h) yang menyimpan data secara persisten dalam sistem berkas LittleFS di flash memori lokal.

Penyimpanan ini menggunakan format biner sirkular (*circular buffer file*) bernama `/cache.dat` untuk mengoptimalkan kinerja penulisan dan meminimalkan degradasi sel flash memori (*wear leveling*).

---

## Struktur Header & Record Berkas Biner

Berkas `/cache.dat` dibagi menjadi dua bagian: satu **Header Blok** di awal berkas, diikuti oleh area data biner sirkular.

### 1. Header Blok Sistem (`CacheHeader`)
Struktur header terletak pada offset `0` dengan ukuran `24 byte`:

```cpp
struct CacheHeader {
  uint32_t magic;    // Harus bernilai CACHE_MAGIC = 0xDEADBEEF
  uint32_t head;     // Pointer offset penulisan data baru (0-indexed dari awal berkas data)
  uint32_t tail;     // Pointer offset pembacaan data terlama (FIFO)
  uint32_t size;     // Jumlah byte data aktif dalam antrean cache
  uint16_t version;  // Versi struktur data (saat ini versi 4)
  uint32_t crc;      // CRC32 checksum dari field sebelumnya untuk verifikasi integritas
};
```

Setiap kali header dibaca, sistem memverifikasi integritasnya dengan menghitung ulang CRC32 menggunakan pustaka pembantu [Crc32.h](file:///home/dhimasardinata/Dokumen/ta/node/lib/NodeCore/support/Crc32.h). Jika tidak cocok atau magic byte tidak sesuai, filesystem cache diformat ulang secara otomatis melalui `resetImpl()`.

### 2. Format Rekaman Data (*Record*)
Setiap payload sensor disimpan dengan format pembungkus (*envelope*) berikut:

```text
+---------------------+---------------------+----------------------+---------------------+
| MAGIC (RECORD_MAGIC)| LENGTH (record_len) |     DATA PAYLOAD     |     PAYLOAD CRC     |
| 2 Byte (0xA55A)     | 2 Byte (uint16_t)   |  N Byte (JSON/Biner) |  4 Byte (uint32_t)  |
+---------------------+---------------------+----------------------+---------------------+
```

---

## Prosedur Pemulihan Tingkat Dalam (Deep Recovery Heuristics)

Jika terjadi pemadaman listrik secara mendadak saat proses penulisan sedang berjalan, data biner dapat mengalami kerusakan parsial (*bit rot* atau pemotongan berkas). [CacheManager.cpp](file:///home/dhimasardinata/Dokumen/ta/node/lib/NodeCore/storage/CacheManager.cpp) mengimplementasikan dua langkah pemulihan otomatis:

### 1. Penyelamatan Record Rusak (CRC Salvaging)
Ketika fungsi `read_oneImpl()` membaca record dan mendapati magic byte record tidak cocok dengan `RECORD_MAGIC` (0xA55A), sistem tidak langsung membuang seluruh berkas.

Sistem akan mencoba melakukan prosedur **Deep Recovery**:
*   Membaca 2 byte berikutnya setelah posisi `tail` sebagai panjang record terduga (*presumed length*).
*   Jika panjang terduga masuk akal (`0 < len <= MAX_PAYLOAD_SIZE`), sistem membaca data payload dan 4 byte CRC di akhir data secara spekulatif.
*   Sistem menghitung kembali CRC32 dari data yang dibaca tersebut. Jika CRC cocok dengan nilai yang tersimpan, data tersebut dinyatakan selamat (*salvaged*). Magic byte yang rusak dilewati, dan data sukses didekodekan.

### 2. Pemindaian Ulang Sinkronisasi (Sync Scan)
Apabila penyelamatan record gagal, sistem menyimpulkan bahwa area tersebut adalah sampah biner (*corruption*). Untuk memulihkan jalurnya, sistem memanggil `performSyncScan()`:
*   Sistem memindai berkas byte-demi-byte menggunakan buffer tumpukan (*stack buffer*) berukuran `64 byte` untuk mencari kemunculan marker `0xA55A`.
*   Pemindaian dibatasi oleh anggaran kinerja `SYNC_SCAN_BUDGET_BYTES = 1024 byte` per satu panggilan loop utama agar tidak mengunci (*blocking*) pemrosesan kooperatif lainnya.
*   Jika penanda ditemukan, pointer `tail` digeser mendekati offset tersebut untuk menyinkronkan kembali pembacaan selanjutnya.

---

## Pengurangan Wear-Amplifikasi Flash (Deferred Header Flushing)

Penyimpanan flash berbasis transistor memiliki batas siklus hapus-tulis (*write endurance*). Menulis ke LittleFS setiap kali record masuk akan mempercepat kerusakan flash.

`CacheManager` menyelesaikan masalah ini dengan mekanisme **Deferred Header Flushing**:
*   Saat record baru ditulis via `writeImpl()`, data langsung ditulis ke sektor LittleFS dan status cache ditandai kotor (`m_dirty = true`).
*   Header berkas (`CacheHeader`) **tidak** langsung ditulis ke flash disk.
*   Header hanya akan diflush fisik ke flash jika salah satu kondisi berikut terpenuhi:
    1.  Akumulasi mutasi data mencapai `CACHE_FLUSH_MUTATION_THRESHOLD = 32` kali mutasi (gabungan write/pop).
    2.  Waktu tunda mencapai batas maksimal `CACHE_FLUSH_MAX_DELAY_MS = 120.000 ms` (2 menit).
    3.  Node dimatikan secara terkendali atau masuk ke mode update OTA.

---

## Kebijakan Pemangkasan Cache (Trim Policy)

Untuk mencegah memori LittleFS penuh yang dapat menyebabkan kegagalan sistem berkas secara keseluruhan, `CacheManager` melakukan pembersihan data lama secara otomatis sebelum melakukan penulisan data baru:

*   Jika total ukuran antrean (`size`) ditambah panjang data baru melebihi `MAX_CACHE_DATA_SIZE`, fungsi `trimCacheForWrite()` dipanggil.
*   Fungsi ini akan menghapus (*pop*) record terlama dari antrean (FIFO) secara bergantian.
*   Proses pemangkasan dibatasi oleh anggaran pangkas `TRIM_BUDGET_BYTES = 2048 byte` per penulisan. Jika penghapusan melebihi batas anggaran ini dalam satu operasi, penulisan baru akan ditunda sementara demi menghindari penundaan (*latency spikes*) pembacaan sensor utama.
*   Selama pemangkasan intensif, pengawas perangkat keras secara berkala diberi makan (`ESP.wdtFeed()`) untuk menghindari reset akibat stall proses.
