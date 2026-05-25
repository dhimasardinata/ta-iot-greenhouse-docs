---
title: "Fungsi dan Parameter"
---

# Fungsi dan Parameter

Halo, rekan developer! Sebuah aplikasi besar dibangun dari gabungan fungsi-fungsi kecil.

**Fungsi (Function)** adalah sebuah blok kode terisolasi yang dirancang untuk melakukan tugas spesifik tertentu. Dengan memecah program menjadi fungsi-fungsi kecil, kode kita menjadi lebih mudah dibaca, diuji, dan digunakan kembali (*reusable*).

Mari kita pelajari konsep fungsi, parameter masukan (*input parameters*), dan nilai kembalian (*return values*) melalui contoh nyata yang digunakan dalam proyek greenhouse ini.

---

## 1. Fungsi Penghitung CRC32 (Proses Data & Nilai Kembalian)

Ketika mengirim data penting, kita ingin memastikan data tersebut tidak rusak di tengah jalan. Kita menggunakan algoritma CRC32 untuk menghitung checksum data sensor.

Buka berkas [node/lib/NodeCore/support/Crc32.h](file:///home/dhimasardinata/Dokumen/ta/node/lib/NodeCore/support/Crc32.h) dan [.cpp](file:///home/dhimasardinata/Dokumen/ta/node/lib/NodeCore/support/Crc32.cpp). Di sana didefinisikan fungsi berikut:

```cpp
uint32_t compute(const void* data, size_t length, uint32_t initial_crc = 0);
```

Mari kita bedah anatomi fungsi di atas:
*   **Tipe Kembalian (`uint32_t`)**: Tipe data dari hasil akhir yang dikembalikan fungsi setelah selesai memproses. Di sini, fungsi mengembalikan bilangan bulat unsigned 32-bit (nilai CRC32).
*   **Nama Fungsi (`compute`)**: Nama unik yang kita panggil di bagian kode lain untuk menjalankan tugas ini.
*   **Parameter**: Variabel penampung input yang dibutuhkan oleh fungsi:
    1.  `const void* data`: Pointer ke alamat memori data yang ingin dihitung CRC-nya (berfungsi menerima tipe data apa pun).
    2.  `size_t length`: Ukuran data dalam satuan byte.
    3.  `uint32_t initial_crc`: Nilai awal perhitungan (opsional, jika tidak diisi akan bernilai default `0`).

### Contoh Pemanggilan Fungsi
Buka berkas [node/lib/NodeCore/storage/RtcManager.cpp](file:///home/dhimasardinata/Dokumen/ta/node/lib/NodeCore/storage/RtcManager.cpp), fungsi `compute` dipanggil seperti ini:

```cpp
uint32_t RtcManager::calculateRecordCrc(const RtcRecordV2& record) {
    return Crc32::compute(&record, offsetof(RtcRecordV2, crc));
}
```
Di sini, parameter `data` diisi dengan alamat dari record (`&record`), dan parameter `length` diisi dengan offset dari field `crc` dalam struct `RtcRecordV2`. Nilai kembalian dari `Crc32::compute` kemudian langsung dikembalikan lagi oleh fungsi pembungkusnya.

---

## 2. Fungsi Dekripsi Payload (Mengembalikan Nilai Lewat Pointer)

Pada bahasa pemrograman C/C++, sebuah fungsi secara standar hanya dapat mengembalikan satu nilai menggunakan perintah `return`. Lalu bagaimana jika fungsi kita perlu menghasilkan beberapa data sekaligus (misalnya: status keberhasilan dekripsi, isi teks asli, dan panjang datanya)?

Kita dapat menggunakan **Pointer** sebagai parameter keluaran (*output parameters*).

Buka berkas [gateway/include/CryptoUtils.h](file:///home/dhimasardinata/Dokumen/ta/gateway/include/CryptoUtils.h):

```cpp
bool decryptPayload(const char* encPayload, size_t len, char* outBuffer, size_t outBufferSize, size_t* outLen);
```

Mari kita bedah parameter fungsi dekripsi ini:
*   `bool` (Return Value Utama): Menandakan apakah proses dekripsi berhasil (`true`) atau gagal (`false`).
*   `const char* encPayload` (Input): Payload terenkripsi yang masuk.
*   `size_t len` (Input): Panjang payload terenkripsi.
*   `char* outBuffer` (Output): Pointer ke buffer memori tempat menuliskan hasil teks yang sudah didekripsi.
*   `size_t outBufferSize` (Input): Kapasitas maksimal dari buffer keluaran untuk mencegah *buffer overflow*.
*   `size_t* outLen` (Output): Pointer ke variabel untuk mencatat panjang riil dari data hasil dekripsi.

### Contoh Pemanggilan Fungsi
Buka berkas [gateway/src/main.cpp](file:///home/dhimasardinata/Dokumen/ta/gateway/src/main.cpp) pada bagian penerimaan data WebSocket:

```cpp
char decryptBuf[CryptoUtils::MAX_DECRYPTED_SIZE];
size_t dLen = 0;

if (CryptoUtils::decryptPayload(ctx->buffer, payloadLen, decryptBuf, sizeof(decryptBuf), &dLen)) {
    json = decryptBuf;
    // Lakukan pemrosesan json hasil dekripsi...
}
```

**Bagaimana data keluar dari fungsi?**
*   Kita menyiapkan variabel penampung `decryptBuf` dan `dLen` di luar fungsi.
*   Kita memberikan alamat memori variabel tersebut (`decryptBuf` dan `&dLen`) ke dalam parameter fungsi.
*   Di dalam fungsi `decryptPayload`, program akan menulis hasil dekripsi langsung ke alamat memori yang ditunjuk. Setelah fungsi selesai dijalankan, nilai `decryptBuf` dan `dLen` sudah otomatis terisi data baru!

---

## Kesimpulan untuk Developer

Saat membuat fungsi, selalu perhatikan prinsip satu tanggung jawab (*Single Responsibility Principle*):
1.  Buatlah fungsi yang fokus melakukan **satu tugas saja** dengan baik.
2.  Gunakan parameter masukan untuk melewatkan data yang dibutuhkan.
3.  Gunakan pointer atau referensi (`&` atau `*`) jika fungsi harus mengubah variabel di luar ruang lingkupnya (*side effect*) atau mengembalikan lebih dari satu nilai.

---

Lanjutkan ke langkah berikutnya: **[Array, Object, Struct, dan Enum](./array-object-struct-enum.md)**.
