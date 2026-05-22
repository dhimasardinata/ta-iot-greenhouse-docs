---
title: "WebSocket & Terminal Diagnostik"
---

# WebSocket Lokal & Terminal Diagnostik Offline

Firmware node menyediakan antarmuka diagnostik interaktif berbasis real-time melalui WebSocket pada path `/ws` yang dikelola oleh modul [DiagnosticsTerminal](file:///home/dhimasardinata/Dokumen/ta/node/lib/NodeCore/terminal/DiagnosticsTerminal.h). Layanan ini dirancang untuk dapat diakses langsung oleh teknisi di lapangan menggunakan koneksi Wi-Fi Access Point lokal (offline) tanpa bergantung pada jaringan internet.

---

## Mekanisme Eksekusi: O(1) Compile-Time Command Dispatch

Untuk menjaga efisiensi pemrosesan dan meminimalkan beban CPU ESP8266 saat parsing perintah teks, terminal diagnostik menggunakan pencocokan perintah berbasis **hash waktu kompilasi** (*compile-time hashing*) menggunakan helper [CompileTimeUtils.h](file:///home/dhimasardinata/Dokumen/ta/node/lib/NodeCore/support/CompileTimeUtils.h):

```cpp
namespace CmdHash {
  constexpr uint32_t STATUS = CompileTimeUtils::ct_hash("status");
  constexpr uint32_t READ = CompileTimeUtils::ct_hash("read");
  // ...
}
```

Ketika client mengirimkan perintah teks, firmware menghitung nilai hash dari perintah tersebut dan melakukan percabangan `switch-case` secara langsung ($O(1)$ complexity) alih-alih melakukan komparasi string (`strcmp`) berulang kali yang lambat.

---

## Daftar Perintah Diagnostik Terminal

Antarmuka terminal membagi tingkat akses perintah menjadi dua jenis berdasarkan kebutuhan otentikasi:

### 1. Perintah Umum (Tanpa Otentikasi)
Dapat diakses langsung oleh client setelah terhubung:
*   `help`: Menampilkan menu bantuan dan informasi daftar perintah.
*   `login <password>`: Memulai sesi terotentikasi menggunakan kata sandi portal yang disimpan di `ConfigManager`.
*   `status`: Memeriksa kondisi operasional utama node (status Wi-Fi, waktu NTP, dan telemetri memori).
*   `sysinfo`: Menampilkan detail perangkat keras (MAC Address, Chip ID, versi firmware, status boot, dan reset reason).

### 2. Perintah Administratif (Membutuhkan Otentikasi)
Hanya dapat dieksekusi setelah status client terotentikasi (`isAuthenticated = true`):
*   `read`: Memicu dan menampilkan pembacaan sensor SHT dan BH1750 secara langsung (*live sensor reading*).
*   `sendnow`: Memaksa `ApiClient` untuk segera menyusun payload dan mengirimkannya ke cloud atau gateway lokal (*immediate upload*).
*   `cache`: Menampilkan statistik antrean cache biner lokal (ukuran byte, posisi pointer head, dan tail).
*   `clearcache`: Mengosongkan seluruh antrean data pada berkas `/cache.dat` di LittleFS.
*   `crashlog`: Membaca catatan riwayat crash sistem yang disimpan di RTC RAM.
*   `clearcrash`: Mereset ulang indikator crash counter pada RTC RAM block 96 ke nilai `0`.
*   `fsstatus`: Menampilkan statistik memori sistem berkas LittleFS (total ruang, ruang terpakai, dan sisa ruang).
*   `format`: Melakukan format fisik pada flash memori partisi LittleFS (memicu pembersihan total).
*   `reboot`: Memicu restart fisik mikrokontroler.
*   `factoryreset`: Menghapus seluruh file konfigurasi dan cache di LittleFS, lalu merestart perangkat kembali ke setelan pabrik.

---

## Manajemen Memori Dinamis & Pencegahan Fragmentasi RAM

Karena WebSocket memproses paket data asinkron dan enkripsi biner, ia rentan menghabiskan RAM bebas ESP8266. Desain penghematan RAM diimplementasikan sebagai berikut:

1.  **Buffer Enkripsi On-Demand**: Buffer penerimaan (`m_rxBuffer`) dan dekripsi (`m_decBuffer`) hanya dialokasikan secara dinamis di RAM ketika ada paket data masuk. Segera setelah perintah diproses, memori buffer dibebaskan kembali (`releaseBuffers()`) untuk menjaga heap tetap luas bagi penanganan koneksi TLS BearSSL.
2.  **Antrean Komando Siklik Statis (Circular Command Queue)**: Terminal menggunakan antrean komando sirkular statis berukuran tetap (`CMD_QUEUE_SIZE = 2`) tanpa alokasi dinamis baru saat runtime, mencegah terjadinya kebocoran memori (*memory leak*).
3.  **Pembatasan Sesi & Keamanan**:
    *   **Batas Client**: Jumlah client WebSocket dibatasi melalui konstanta untuk menghindari beban soket berlebih.
    *   **Rate Limiting**: Membatasi frekuensi pengiriman komando per client (`rateWindowStart` dan `rateCount`) untuk mencegah serangan denial-of-service (DoS) lokal.
    *   **Session Timeout**: Otomatis mengeluarkan status otentikasi client jika tidak terdeteksi adanya aktivitas dalam durasi tertentu (diperiksa berkala setiap `WS_SESSION_CHECK_INTERVAL_MS`).
