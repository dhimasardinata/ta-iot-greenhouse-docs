---
title: "Runtime Jaringan Firmware"
---

# Runtime Jaringan Firmware

Jaringan pada sistem IoT greenhouse dirancang dengan prinsip **konektivitas tidak andal**. Karena node sensor dan gateway diletakkan di lapangan, firmware harus mampu menangani kondisi kegagalan jaringan (Wi-Fi putus, DNS error, TLS overload) tanpa menyebabkan sistem hang atau mengganggu kontrol aktuator.

Untuk mencapainya, firmware menggunakan arsitektur non-blocking, mesin status (state machine) untuk upload, retry policy dengan backoff, serta fallback otomatis antara cloud dan edge (lokal).

---

## Arsitektur Jaringan dan Protokol

| Protokol | Peran dalam Proyek | Implementasi Kode |
| :--- | :--- | :--- |
| **Wi-Fi STA** | Menghubungkan node/gateway ke router greenhouse. | [WifiManager.h](file:///home/dhimasardinata/Dokumen/ta/node/lib/NodeCore/net/WifiManager.h) |
| **Wi-Fi AP & Portal** | Captive portal untuk konfigurasi SSID dan password saat jaringan gagal terhubung. | [PortalServer.h](file:///home/dhimasardinata/Dokumen/ta/node/lib/NodeCore/web/PortalServer.h) |
| **HTTP / HTTPS Client** | Mengirim data sensor ke API server dan mengunduh firmware update. | [ApiClient.Transport.cpp](file:///home/dhimasardinata/Dokumen/ta/node/lib/NodeCore/api/ApiClient.Transport.cpp) |
| **WebSocket** | Komunikasi dua arah untuk terminal diagnostik jarak jauh. | [DiagnosticsTerminal.h](file:///home/dhimasardinata/Dokumen/ta/node/lib/NodeCore/terminal/DiagnosticsTerminal.h) |
| **NTP Client** | Sinkronisasi waktu untuk validasi sertifikat SSL dan logging presisi. | [NtpClient.h](file:///home/dhimasardinata/Dokumen/ta/node/lib/NodeCore/net/NtpClient.h) |

---

## Manajemen Kredensial Wi-Fi & Scan Jaringan

Kredensial Wi-Fi tersimpan pada jalur yang dikelola [WifiCredentialStore.h](file:///home/dhimasardinata/Dokumen/ta/node/lib/NodeCore/net/WifiCredentialStore.h) dan implementasinya di `WifiCredentialStore.cpp`. Source yang terlihat menggunakan file binary di filesystem, bukan EEPROM mentah.

Pada gateway ([MyNetworkManager.h](file:///home/dhimasardinata/Dokumen/ta/gateway/include/MyNetworkManager.h)), proses pemindaian (Wi-Fi scan) dilakukan secara asinkron. Hal ini penting karena fungsi pemindaian bawaan SDK yang bersifat sinkron dapat memakan waktu hingga beberapa detik dan memblokir thread utama, yang berisiko memicu *Software Watchdog Reset* (WDT).

---

## Pembatasan TLS & RAM (Heap Guard)

Komunikasi HTTPS menggunakan BearSSL membutuhkan memori RAM yang cukup besar untuk enkripsi. Pada ESP8266 (dengan RAM terbatas), inisialisasi TLS tanpa pengawasan bisa memicu *Out of Memory* (OOM).

Untuk mengatasinya, firmware mengimplementasikan **Heap Guard** pada [ApiClient.Transport.cpp](file:///home/dhimasardinata/Dokumen/ta/node/lib/NodeCore/api/ApiClient.Transport.cpp):
1. Sebelum membuat koneksi HTTPS, firmware memeriksa sisa memori dinamis bebas (`ESP.getFreeHeap()`).
2. Jika memori berada di bawah batas aman, request ditolak secara lokal dengan kode error khusus `HTTPC_ERROR_TOO_LESS_RAM` daripada membiarkan mikrokontroler crash di tengah handshake TLS.

---

## Komunikasi Realtime Lewat WebSocket

Untuk keperluan kontrol jarak jauh dan pemantauan interaktif, proyek ini menggunakan koneksi WebSocket:
- Pada gateway ([WebSocketManager.cpp](file:///home/dhimasardinata/Dokumen/ta/gateway/src/WebSocketManager.cpp)), koneksi WebSocket memancarkan status relay dan menerima perintah kontrol langsung dari antarmuka web.
- Pada node, [DiagnosticsTerminal.h](file:///home/dhimasardinata/Dokumen/ta/node/lib/NodeCore/terminal/DiagnosticsTerminal.h) memanfaatkan WebSocket untuk memancarkan keluaran serial konsol (seperti `WebSerial`) langsung ke browser pengguna, lengkap dengan pembatasan ukuran payload agar buffer memori tidak membludak.

---

## Kebijakan Fallback Cloud-Edge (Auto mode)

Ketika koneksi ke API Cloud utama terganggu, sistem dapat beralih menggunakan server gateway lokal (Edge) atau server Relay.

Logika pemilihan rute ini diatur dalam `shouldUseRelayForCloudUpload()` di [ApiClient.Transport.cpp](file:///home/dhimasardinata/Dokumen/ta/node/lib/NodeCore/api/ApiClient.Transport.cpp):
```cpp
bool ApiClient::shouldUseRelayForCloudUpload() const {
  switch (m_runtime.route.uplinkMode) {
    case UplinkMode::DIRECT:
      return false;
    case UplinkMode::RELAY:
      return true;
    case UplinkMode::AUTO:
    default:
      if (m_runtime.route.forceRelayNextCloudAttempt) {
        return true;
      }
      if (m_runtime.route.relayPinnedUntil == 0) {
        return false;
      }
      return static_cast<int32_t>(millis() - m_runtime.route.relayPinnedUntil) < 0;
  }
}
```

Kebijakan ini diatur lebih lanjut oleh [ApiClient.UploadRuntimePolicy.cpp](file:///home/dhimasardinata/Dokumen/ta/node/lib/NodeCore/api/ApiClient.UploadRuntimePolicy.cpp) yang menentukan kapan koneksi harus diturunkan (*downgraded*) ke server lokal dan kapan harus dicoba kembali ke Cloud utama.

---

## Loop Runtime Non-Blocking

Untuk menjamin layanan latar belakang (seperti *network stack*, *OTA updates*, dan *watchdog timer*) tetap berjalan, fungsi `loop()` utama di [main.cpp](file:///home/dhimasardinata/Dokumen/ta/node/src/main.cpp) didesain tanpa menggunakan fungsi `delay()` yang memblokir jalannya proses:

```cpp
void loop() {
  // Biarkan proses internal SDK berjalan
  yield();

  // Jalankan loop manajer sistem secara berkala
  wifiManager.loop();
  apiClient.loop();
  sensorManager.loop();
}
```
Setiap modul menggunakan pemeriksaan berbasis `millis()` untuk mengukur interval waktu eksekusinya sendiri, menjaga kinerja mikrokontroler tetap responsif.
