---
title: "WebSocket & WebSerial Terminal"
description: "Panduan teknis sistem komunikasi nirkabel realtime pada ESP32 Gateway, termasuk perintah diagnosis WebSerial dan pengelolaan pesan terenkripsi pada WebSocket."
---

# WebSocket & WebSerial Terminal

Untuk kebutuhan pemantauan kondisi perangkat jarak jauh (*remote monitoring*) serta pengujian lapangan tanpa kabel serial fisik, ESP32 Gateway menyediakan dua antarmuka diagnosis utama:
1.  **WebSerial**: Terminal berbasis teks interaktif yang berjalan di atas protokol WebSockets.
2.  **WebSocket Manager**: Handler backend terstruktur yang memproses mutasi konfigurasi, pertukaran berkas terenkripsi, dan pembaruan berkas dari dasbor UI.

Komponen-komponen ini diimplementasikan di [main.cpp](file:///home/dhimasardinata/Dokumen/ta/gateway/src/main.cpp), [WebSerial.cpp](file:///home/dhimasardinata/Dokumen/ta/gateway/src/WebSerial.cpp), [WebSocketManager.cpp](file:///home/dhimasardinata/Dokumen/ta/gateway/src/WebSocketManager.cpp), dan [WebSocketManager.h](file:///home/dhimasardinata/Dokumen/ta/gateway/include/WebSocketManager.h).

---

## 1. Terminal Diagnosis WebSerial

WebSerial diakses melalui port web khusus (default pada endpoint `/webserial`). Setiap perintah yang diketikkan pengguna akan diparse di `main.cpp` secara kooperatif.

### Keamanan & Autentikasi WebSerial
Untuk meminimalkan celah keamanan pada jaringan lokal, WebSerial membagi perintah menjadi dua tingkat otorisasi:
*   **Perintah Diagnosis (Read-Only)**: Tidak membutuhkan sesi admin, tetapi tetap harus dikirim melalui frame terenkripsi dari UI WebSerial.
*   **Perintah Administrasi (Write/Config)**: Wajib diawali dengan perintah `login <password>` melalui bingkai data aman terenkripsi (*secureFrame*). Jika tidak terotentikasi, terminal membalas dengan `Auth Required`. Brute force dicegah melalui fungsi pembatasan laju percobaan login (`verifyAdminPasswordWithRateLimit`).

### Daftar Perintah Terintegrasi

| Perintah | Level Otorisasi | Deskripsi Teknis |
| :--- | :--- | :--- |
| **`status`** | Umum (Read-Only) | Menampilkan ringkasan runtime, versi firmware, data sensor rata-rata, tipe koneksi (WiFi/GPRS), rute uplink aktif, dan status cloud sync. |
| **`memo_status`** | Umum (Read-Only) | Menampilkan sisa memori heap bebas dan PSRAM (min / saat ini) dalam bytes. |
| **`sdcard_status`** | Umum (Read-Only) | Menampilkan status kartu SD beserta kapasitas memori terpakai dan total (dalam MB). |
| **`login <password>`** | Umum | Membuka sesi administratif. Wajib dikirim via *secureFrame*. |
| **`logout`** | Admin | Menutup sesi administratif klien saat ini. |
| **`reboot`** | Admin | Melakukan restart software secara langsung (`ESP.restart()`). |
| **`resetwifi`** | Admin | Menghapus seluruh kredensial WiFi dari NVS lalu me-reboot perangkat. |
| **`formatsdcard confirm`** | Admin | Memformat penuh partisi FAT pada kartu SD dan menghapus log. |
| **`settoken <token>`** | Admin | Mengganti token API gateway di NVS dan memperbarui runtime. |
| **`seturldata <url>`** | Admin | Mengganti URL penampung data sensor masuk (node data ingestion). |
| **`seturlth <url>`** | Admin | Mengganti URL sinkronisasi ambang batas (*threshold*). |
| **`setadminpass <pw>`** | Admin | Mengganti kata sandi admin untuk akses login terminal. |
| **`qos_th`** | Admin | Menguji latensi dan integritas endpoint threshold API. |
| **`qos_nd`** | Admin | Menguji latensi endpoint Node Data Ingestion. |
| **`qos_st_get`** / **`qos_st_post`** | Admin | Menguji kueri status GET/POST platform cloud. |
| **`qos_fw`** | Admin | Menguji komunikasi dan validitas endpoint metadata firmware. |

---

## 2. WebSocket Manager

Kelas [WebSocketManager](file:///home/dhimasardinata/Dokumen/ta/gateway/src/WebSocketManager.cpp) berjalan pada endpoint WebSocket status `/status_ws`. Endpoint `/ws` dipakai oleh WebSerial. Modul ini mengemas pertukaran data kompleks dengan dasbor kontrol klien menggunakan format JSON.

### Mekanisme Enkripsi Payload AES-256-CBC
Untuk melindungi data transaksi sensitif (seperti password WiFi baru atau perubahan parameter rahasia), WebSocketManager berintegrasi dengan pustaka kriptografi [CryptoUtils.cpp](file:///home/dhimasardinata/Dokumen/ta/gateway/src/CryptoUtils.cpp).
*   **Deteksi Enkripsi**: Ketika frame biner diterima di event callback `onWsEvent`, sistem memanggil `CryptoUtils::isNodeMediniEncryptedPayload()`.
*   **Dekripsi Runtime**: Jika terdeteksi aman terenkripsi, payload didekripsi terlebih dahulu menggunakan kunci AES-256-CBC bersama sebelum dokumen JSON diparse ke memory heap via `ArduinoJson`.
*   **Enkripsi Balasan**: Tanggapan untuk perintah mutasi sensitif dienkripsi kembali sebelum dikirimkan ke soket klien.

### Manajemen Cache Memori (Bypass I/O Collision)
Karena keterbatasan bandwidth dan CPU ESP32 saat menangani banyak klien WebSocket sekaligus, `WebSocketManager` memelihara cache biner untuk mencegah tubrukan pembacaan memori flash/I2C secara berulang:
1.  **`cachedStatusPayload`**: Cache string status perangkat terpadu yang dibagikan secara berkala ke seluruh klien tanpa perlu melakukan query ulang ke driver sensor/NVS.
2.  **`cachedWifiScanPayload`**: Menyimpan hasil pemindaian (*WiFi Scan*) terakhir. Pemindaian baru hanya dipicu jika klien secara eksplisit meminta (`handleWifiScanRequest`), menghindari terputusnya koneksi WiFi akibat proses scanning yang memblokir modul RF.
3.  **`cachedWifiChangePayload`**: Menahan log status pergantian jaringan WiFi lokal agar status koneksi dapat dipantau dari web UI meskipun gateway sedang melakukan restart jaringan.

---

## Alur Transaksi Pembaruan (Mutation Flow)

Saat dasbor mengirim pembaruan jadwal atau threshold melalui WebSocket:
1.  Klien mengirim dokumen JSON terenkripsi berisi data mutasi baru dan `requestId`.
2.  `WebSocketManager` mendeteksi enkripsi, mendekripsi isi payload, dan memverifikasi token sesi administrator (`isAdminRequestAuthorized`).
3.  Konfigurasi divalidasi keamanannya oleh kelas pembantu (misal `ScheduleValidation` atau `ThresholdValidation`).
4.  Jika valid, konfigurasi ditulis ke NVS dan RAM secara asinkron.
5.  Gateway membalas klien menggunakan fungsi `sendMutationResultToClient` untuk mengonfirmasi status keberhasilan mutasi tanpa memblokir siklus loop utama.

Lanjutkan ke bagian **[Rute Uplink Cloud](./mode-cloud.md)** untuk melihat bagaimana data yang dikumpulkan gateway disinkronkan ke server eksternal.
