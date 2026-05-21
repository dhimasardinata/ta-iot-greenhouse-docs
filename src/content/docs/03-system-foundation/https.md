---
title: "HTTPS"
---

# HTTPS (Hypertext Transfer Protocol Secure)

Ketika node sensor atau gateway mengirimkan data suhu greenhouse ke Laravel Cloud, data tersebut melewati internet publik. Jika data dikirim secara polos (HTTP biasa), data sensor serta token otorisasi perangkat bisa dengan mudah disadap oleh pihak ketiga.

Oleh karena itu, sistem kita menggunakan **HTTPS** (HTTP di atas enkripsi TLS) untuk menjamin keamanan dan keaslian data.

---

## Bagaimana HTTPS Dijalankan di Perangkat Kecil?

Perangkat kelas komputer memiliki RAM bergiga-giga untuk memproses enkripsi SSL/TLS. Namun, node sensor **ESP8266** kita hanya memiliki RAM yang sangat terbatas.

Untuk mengatasi ini, firmware kita menggunakan library **BearSSL** via `WiFiClientSecureBearSSL.h`. BearSSL dirancang khusus untuk sistem mikro kontroler agar dapat melakukan jabat tangan (handshake) TLS secara efisien.

Berikut adalah taktik optimasi HTTPS di firmware kita (`ApiClient.Security.cpp`):

### 1. Penyesuaian Ukuran Buffer TLS (`setBufferSizes`)
Secara standar, protokol TLS membutuhkan buffer penerimaan data (RX) sebesar **16 KB** untuk menampung paket enkripsi. Ukuran 16 KB ini dapat langsung menghabiskan sisa RAM ESP8266 dan memicu crash.
* Sistem kita memotong ukuran buffer penerimaan dan pengiriman secara dinamis (`setBufferSizes`) menggunakan batas kustom (`AppConstants::TLS_RX_BUF_SIZE`).
* Saat berkomunikasi dengan API utama, buffer disetel seefisien mungkin agar muat di RAM.
* Saat melayani portal lokal, buffer disetel ke ukuran portal yang lebih hemat lagi (`TLS_RX_BUF_PORTAL`).

### 2. Pilihan Mode Validasi Sertifikat
Di dalam file `ApiClient.Security.cpp`, terdapat dua opsi validasi keamanan sertifikat SSL:

* **Mode Produksi (Strict Verification):**
  Menggunakan `setTrustAnchors(anchors)`. Sistem memuat sertifikat Root CA (Certificate Authority) tepercaya ke dalam memori. ESP8266 akan memverifikasi rantai sertifikat server cloud Laravel untuk memastikan perangkat benar-benar terhubung ke server asli kita, bukan server tiruan (mencegah serangan *Man-in-the-Middle*).

* **Mode Pengembangan (Development Mode):**
  Menggunakan `setInsecure()`. Mode ini menonaktifkan verifikasi rantai sertifikat. Mode ini sangat membantu saat masa pengujian di mana server Laravel lokal dijalankan tanpa sertifikat SSL resmi (menggunakan IP lokal atau self-signed certificate).

```mermaid
flowchart TD
    Node[Node ESP8266] -->|Koneksi HTTPS ke Port 443| Server[(Laravel Cloud Server)]
    subgraph Jabat Tangan TLS (BearSSL)
        Node -->|1. Minta Sertifikat SSL| Server
        Server -->|2. Kirim Sertifikat SSL| Node
        Node -->|3. Cocokkan dengan Trust Anchors| Node
        Node -->|4. Sertifikat Valid -> Mulai Enkripsi| Node
    end
    Node <==>|Kirim JSON Data Sensor Aman| Server
```

---

## Batasan Penggunaan HTTPS

Meskipun HTTPS sangat aman, proses enkripsi kunci publik (Asymmetric Cryptography) selama jabat tangan TLS memakan waktu pemrosesan CPU yang cukup tinggi pada ESP8266 (bisa memakan waktu 1 hingga 3 detik hanya untuk melakukan handshake).

Oleh karena itu:
* Node menjaga antrean lokal terlebih dahulu, lalu mengirim record secara bertahap saat `cacheSendTimer` berjalan dan kondisi heap cukup aman.
* Jika internet terputus, sistem menyimpan data ke RTC RAM atau LittleFS, kemudian mengirim ulang satu per satu dengan retry/backoff ketika koneksi kembali tersedia.

Lanjutkan ke [AES-256-CBC](./aes-256-cbc.md) untuk melihat mekanisme enkripsi aplikasi yang dipakai pada jalur lokal/terminal tertentu di firmware.
