---
title: "Security, OTA, and Cache"
---

# Security, OTA, and Cache

Dalam lingkungan greenhouse komersial, keamanan data dan keandalan sistem IoT sangat penting. Kerusakan firmware akibat injeksi biner jahat atau manipulasi konfigurasi dapat menyebabkan aktuator mati total dan membahayakan tanaman di dalam greenhouse.

Proyek ini menerapkan tiga pilar keamanan utama: **Keamanan Jalur Transmisi (Transit Security)**, **Validasi Integritas File Lokal (Cache Security)**, dan **Perlindungan Pembaruan Jarak Jauh (OTA Security)**.

---

## 1. Transit Security: Enkripsi SSL/TLS dan Signature Firmware

Semua komunikasi data sensor dari node/gateway menuju server web Laravel dienkripsi menggunakan protokol **HTTPS (SSL/TLS)**.

### Optimasi SSL/TLS BearSSL
ESP8266 memiliki kapasitas RAM yang sangat terbatas. Melakukan jabat tangan (*handshake*) TLS penuh menggunakan kunci RSA yang besar dapat menghabiskan seluruh tumpukan heap memori.
- Firmware menggunakan pustaka **BearSSL** (`WiFiClientSecureBearSSL`) yang dikonfigurasi melalui sertifikat root CA ringkas.
- Sertifikat root CA ini dikonversi dari format PEM ke array biner C++ menggunakan script `node/scripts/convert_certs.py`.
- Selama proses koneksi HTTPS, alokasi memori dipantau ketat untuk menghindari error `HTTPC_ERROR_TOO_LESS_RAM` (seperti yang ditangani di [ApiClient.Transport.cpp](file:///home/dhimasardinata/Dokumen/ta/node/lib/NodeCore/api/ApiClient.Transport.cpp)).

### Signature Payload di Firmware Node
Firmware node memiliki fungsi `signPayload()` yang membuat signature HMAC-SHA256 dari payload menggunakan token upload efektif.

Berdasarkan implementasi di [ApiClient.TransportSupport.cpp](file:///home/dhimasardinata/Dokumen/ta/node/lib/NodeCore/api/ApiClient.TransportSupport.cpp), proses pembuatan tanda tangan digital dilakukan sebagai berikut:

```cpp
void ApiClientTransportController::signPayload(const char* payload, size_t payload_len, char* signatureBuffer) {
  br_hmac_key_context kc;
  br_hmac_context ctx;

  const char* token = m_deps.configManager.getEffectiveUploadAuthToken();
  const size_t token_len = strnlen(token, MAX_TOKEN_LEN);

  // Inisialisasi BearSSL HMAC menggunakan algoritma SHA-256 dan Kunci Token API
  br_hmac_key_init(&kc, &br_sha256_vtable, token, token_len);
  br_hmac_init(&ctx, &kc, 0);
  br_hmac_update(&ctx, payload, payload_len);

  uint8_t digest[32];
  br_hmac_out(&ctx, digest);

  // Konversi byte signature menjadi format teks hex...
}
```
Pada jalur upload state machine, signature ini dikirim sebagai header `X-Signature` bersama `X-Timestamp`. Catatan batas fakta: controller Laravel yang terlihat pada snapshot tidak memverifikasi HMAC ini secara eksplisit di `saveSensorData`, sehingga dokumen ini tidak boleh menyebut server sudah menolak payload berdasarkan signature.

---

## 2. Cache Security: Validasi Data dan Failsafe

Ketika memori cache LittleFS lokal dibaca (dikelola oleh [CacheManager.h](file:///home/dhimasardinata/Dokumen/ta/node/lib/NodeCore/storage/CacheManager.h)), firmware melakukan validasi integritas record menggunakan **CRC32**:
1. Setiap data sensor yang hendak ditulis ke flash dihitung nilai CRC-nya dan disimpan bersama payload.
2. Saat data dibaca dari LittleFS untuk diunggah, firmware menghitung ulang CRC data tersebut.
3. Jika CRC tidak cocok (menandakan sektor flash korup), baris data tersebut segera dibuang secara terisolasi tanpa merusak data sensor lain dalam antrean.
4. Jika LittleFS rusak secara fisik sehingga tidak bisa diakses, sistem beralih ke antrean darurat di RAM (*Emergency RAM Queue*) sebagai mekanisme penyelamatan terakhir agar node tidak hang.

---

## 3. OTA Security: Otentikasi dan BootGuard

Proses pembaruan biner firmware secara nirkabel (*Over-The-Air* atau OTA) memiliki risiko keamanan yang tinggi jika tidak dilindungi:
- **Header OTA dari firmware node**: `OtaManager` dapat mengirim header `Authorization: Bearer ...` dan `X-Device-ID` saat mengecek atau mengunduh firmware jika token efektif tersedia. Controller OTA Laravel yang terlihat tidak memperlihatkan validasi token pada `getFirmwareInfo`, sehingga validasi server-side tidak diasumsikan.
- **Proteksi Kegagalan Boot (BootGuard)**: Firmware baru yang korup atau tidak kompatibel dapat membuat mikrokontroler crash terus-menerus. Modul [BootGuard.h](file:///home/dhimasardinata/Dokumen/ta/node/lib/NodeCore/ota/BootGuard.h) menyimpan crash counter di RTC memory dengan CRC. [BootManager.cpp](file:///home/dhimasardinata/Dokumen/ta/node/src/BootManager.cpp) memakai counter ini untuk membersihkan `/cache.dat`, memformat LittleFS pada level crash lebih tinggi, atau melakukan cooldown/restart. Source node yang terlihat tidak menunjukkan rollback otomatis ke partisi firmware lama.

---

## 4. Keamanan Penyimpanan Konfigurasi lokal

Semua kredensial penting seperti kata sandi Wi-Fi portal, token akses API, dan konfigurasi threshold disimpan di memori non-volatile (NVS Preferences pada gateway) melalui [ConfigManager.cpp](file:///home/dhimasardinata/Dokumen/ta/gateway/src/ConfigManager.cpp).

- Data sensitif dipisahkan dari parameter publik untuk mencegah pembacaan tidak sah.
- Jika terjadi kerusakan konfigurasi total, firmware menyediakan nilai cadangan (*factory fallback values*) yang tertanam aman di compiler dari file header statis.
