---
title: "Pengiriman Data & TLS/Security"
---

# Pengiriman Data & Keamanan TLS BearSSL

Prosedur enkapsulasi, penandatanganan kriptografi, dan transmisi data sensor ditangani oleh modul [ApiClient](file:///home/dhimasardinata/Dokumen/ta/node/lib/NodeCore/api/ApiClient.h). Modul ini bekerja secara asinkron dalam mesin status non-blocking berbasis soket mentah (*raw client socket*) untuk meminimalkan alokasi heap memori serta memastikan komunikasi aman menggunakan TLS.

---

## Manajemen Memori Dinamis: Penyesuaian Buffer TLS (BearSSL Buffer Sizing)

Keterbatasan memori bebas (*heap*) pada arsitektur ESP8266 merupakan tantangan utama saat menggunakan enkripsi SSL/TLS. Untuk mencegah kegagalan alokasi memori (*Out of Memory* / crash), `ApiClient` membagi alokasi memori buffer TLS secara dinamis berdasarkan status operasionalnya:

| Status Koneksi | Buffer Penerimaan (RX) | Buffer Pengiriman (TX) | Deskripsi |
| :--- | :---: | :---: | :--- |
| **Portal Mode / Idle** | `512 byte` | `256 byte` | Buffer minimal untuk menghemat RAM saat portal konfigurasi aktif atau jaringan idle. |
| **Active Transport Mode** | `2048 byte` | `1024 byte` | Diperbesar otomatis saat melakukan jabat tangan (*handshake*) TLS dan transaksi HTTP API. |

### Prosedur Alokasi:
1.  **Heap Guard Checks**: Sebelum memulai transaksi SSL, fungsi `acquireTlsResources()` memverifikasi kesehatan memori. Jika free heap kurang dari `8000 byte` atau blok terbesar (*largest contiguous free block*) kurang dari `4096 byte`, inisialisasi TLS aman dibatalkan.
2.  **Insecure Fallback**: Jika memori terlalu terfragmentasi, sistem secara otomatis melakukan penurunan tingkat (*fallback*) ke mode koneksi non-verifikasi (`setInsecure()`) untuk menghindari kegagalan total transmisi data penting.
3.  **Tear-down & Release**: Segera setelah pengiriman selesai (baik berhasil maupun gagal), `releaseTlsResources()` dipanggil untuk membebaskan alokasi buffer kembali ke ukuran portal (`512/256 byte`), serta membersihkan memori cache sertifikat root CA secara paksa.

---

## Kriptografi: Tanda Tangan HMAC-SHA256 Payload

Untuk menjamin keaslian data (*authenticity*) dan mencegah manipulasi data oleh pihak ketiga (*tampering*), setiap data yang dikirimkan ke target Gateway lokal diverifikasi menggunakan tanda tangan kriptografi HMAC-SHA256.

Fungsi `signPayload()` pada [ApiClient.TransportSupport.cpp](file:///home/dhimasardinata/Dokumen/ta/node/lib/NodeCore/api/ApiClient.TransportSupport.cpp) menjalankan urutan berikut:

1.  **Pengambilan Kunci**: Sistem mengambil kunci token unggah (*upload token*) efektif dari `ConfigManager`.
2.  **BearSSL HMAC Init**: Inisialisasi konteks kunci HMAC dengan hash standar SHA-256 menggunakan algoritme BearSSL:
    ```cpp
    br_hmac_key_init(&kc, &br_sha256_vtable, token, token_len);
    br_hmac_init(&ctx, &kc, 0);
    ```
3.  **Hashing**: Konten string JSON payload di-hash melalui `br_hmac_update()`.
4.  **Konversi Hex**: Output digest biner berukuran 32-byte dikonversi menjadi representasi string heksadesimal 64-karakter dengan menambahkan null-terminator (`\0` pada index ke-64) untuk menghasilkan string tanda tangan (*signature*) yang valid.

---

## Struktur Protokol HTTP & Custom Headers

Pengiriman data dibedakan berdasarkan target tujuannya (Cloud vs Edge Gateway lokal) di dalam berkas [ApiClient.TransportState.cpp](file:///home/dhimasardinata/Dokumen/ta/node/lib/NodeCore/api/ApiClient.TransportState.cpp):

### 1. Struktur Header Target Edge (Gateway Lokal)
Jika node mengirimkan data ke gateway lokal, ia menyertakan custom headers khusus untuk verifikasi lokal:

```http
POST /api/node/data HTTP/1.1
Host: <gateway-ip>
Connection: close
Content-Type: application/json
Accept: application/json
User-Agent: ESP8266-Node
X-Device-ID: <mac-address-or-unique-id>
X-Node-ID: 1         # ID unik node dalam greenhouse
X-GH-ID: 1           # ID unik greenhouse
X-Signature: c811a2f646... # 64-karakter hex signature HMAC-SHA256
X-Timestamp: 1782384910     # Epoch timestamp detik dari NTP client
Content-Length: 142

{ ... json payload ... }
```

### 2. Struktur Header Target Cloud
Jika node mengirimkan data secara langsung ke server cloud, otorisasi dilakukan melalui header standar JWT token:

```http
POST /api/v1/telemetry HTTP/1.1
Host: <cloud-host>
Connection: close
Content-Type: application/json
Accept: application/json
User-Agent: ESP8266-Node
X-Device-ID: <mac-address-or-unique-id>
Authorization: Bearer <upload-token>
Content-Length: 142

{ ... json payload ... }
```
