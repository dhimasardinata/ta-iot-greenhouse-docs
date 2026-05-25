---
title: "GPRS dan Fallback Gateway"
---

# GPRS dan Fallback Gateway

Pada sistem IoT greenhouse, gateway (ESP32) berfungsi sebagai jembatan utama untuk meneruskan data sensor dari node ke cloud. Wi-Fi ditetapkan sebagai jalur transmisi utama. Jika fitur GPRS diaktifkan di konfigurasi dan kegagalan koneksi melewati ambang tertentu, gateway dapat mengaktifkan koneksi seluler **GPRS (SIM800)** sebagai jalur cadangan (*fallback*).

---

## 1. Arsitektur Komponen GPRS

Koneksi seluler di gateway dibangun dengan mengintegrasikan pustaka **TinyGSM** bersama perangkat keras modem SIM800:

| Komponen | Fungsi dalam Proyek | File Terkait |
| :--- | :--- | :--- |
| **TinyGSM Client** | Antarmuka perangkat lunak untuk berkomunikasi dengan modul SIM800 menggunakan AT Commands. | [MyNetworkManager.h](file:///home/dhimasardinata/Dokumen/ta/gateway/include/MyNetworkManager.h) |
| **gprsClient / gprsSecureClient** | Mengelola soket TCP biasa (HTTP) dan terenkripsi TLS (HTTPS) melalui modem seluler. | [MyNetworkManager.cpp](file:///home/dhimasardinata/Dokumen/ta/gateway/src/MyNetworkManager.cpp) |
| **ConfigManager** | Menyimpan profil APN (Access Point Name), SIM PIN, dan kredensial seluler secara persisten di NVS. | [ConfigManager.cpp](file:///home/dhimasardinata/Dokumen/ta/gateway/src/ConfigManager.cpp) |
| **RTC / Time Service** | Sinkronisasi waktu sistem dari stasiun pemancar seluler (GSM Network Time) saat NTP Wi-Fi mati. | [RTCManager.cpp](file:///home/dhimasardinata/Dokumen/ta/gateway/src/RTCManager.cpp) |

---

## 2. State Machine Fallback GPRS

Gateway tidak langsung menyalakan modem GPRS saat terjadi putus Wi-Fi sementara, karena inisialisasi modul GSM memakan waktu dan daya listrik yang besar. Gateway menggunakan mesin status (*state machine*) asinkron untuk berpindah jalur koneksi secara bertahap.

Berdasarkan implementasi di [MyNetworkManager.cpp](file:///home/dhimasardinata/Dokumen/ta/gateway/src/MyNetworkManager.cpp), transisi status didefinisikan sebagai berikut:

```cpp
// Representasi transisi status koneksi GPRS pada mesin status
switch (state) {
  case WiFiState::FALLBACK_GPRS_WAIT:
    // Menunggu cooldown sebelum mencoba menyalakan modem
    break;
  case WiFiState::FALLBACK_GPRS_MODEM_INIT:
    // Mengirim AT command awal untuk memastikan modem SIM800 merespons
    break;
  case WiFiState::FALLBACK_GPRS_SIM_READY:
    // Memeriksa status kartu SIM dan memasukkan PIN jika terkunci
    break;
  case WiFiState::FALLBACK_GPRS_NETWORK_ATTACH:
    // Mencoba terhubung ke BTS operator seluler terdekat
    break;
  case WiFiState::FALLBACK_GPRS_CONNECTING:
    // Mengaktifkan sesi data APN untuk mendapatkan alamat IP lokal
    break;
}
```

Transisi ke status `FALLBACK_GPRS_WAIT` dipicu secara otomatis oleh variabel penghitung kegagalan `m_connectionFailures` yang melampaui batas konstanta `MAX_FAILURES_BEFORE_GPRS` (dikonfigurasi di [config.h](file:///home/dhimasardinata/Dokumen/ta/gateway/include/config.h)).

---

## 3. Eksekusi HTTP Lewat GPRS

Ketika gateway terhubung menggunakan GPRS, pengiriman data sensor atau sinkronisasi konfigurasi dilakukan melalui fungsi internal `_performHttpRequestGPRS` di [MyNetworkManager.cpp](file:///home/dhimasardinata/Dokumen/ta/gateway/src/MyNetworkManager.cpp).

Karena latensi jaringan seluler 2G/GPRS jauh lebih tinggi daripada Wi-Fi, terdapat beberapa penyesuaian khusus:
- **Peningkatan Timeout**: Batas waktu tunggu socket (`setTimeout`) diperlonggar menggunakan konstanta khusus agar request tidak gugur di tengah jalan saat sinyal lemah.
- **Manajemen Alokasi Soket**: Pemilihan antara soket aman `gprsSecureClient` (untuk HTTPS) dan soket biasa `gprsClient` (untuk HTTP) didasarkan pada URL target:

```cpp
bool MyNetworkManager::_performHttpRequestGPRS(
    const String& url_in, const char* method, const String& payload,
    bool useOtaToken, bool useTaToken, int& httpCodeOut,
    bool& wafBlocked, String* responseOut, unsigned long timeoutMs)
{
  gprsSecureClient.setTimeout(timeoutMs);
  gprsClient.setTimeout(timeoutMs);

  bool connected = false;
  if (isSecure) {
    connected = gprsSecureClient.connect(host.c_str(), port);
  } else {
    connected = gprsClient.connect(host.c_str(), port);
  }

  // Mengirim header HTTP dan body payload secara manual lewat soket...
}
```

- **Verifikasi Koneksi Berkala**: Fungsi `isGprsConnected()` membatasi validitas sesi data menggunakan selang waktu `kGprsVerifiedMaxAgeMs` (30 detik). Jika tidak ada aktivitas pengiriman data yang berhasil dalam durasi tersebut, status koneksi akan diverifikasi ulang ke modem.

---

## 4. Portal Aset dan SD Card Logger

Pengguna dapat mengaktifkan/menonaktifkan fitur fallback GPRS serta memodifikasi nama APN melalui halaman pengaturan captive portal gateway yang kode antarmuka HTML-nya disimpan di [PortalAssets.h](file:///home/dhimasardinata/Dokumen/ta/gateway/include/PortalAssets.h).

[SDCardLogger.cpp](file:///home/dhimasardinata/Dokumen/ta/gateway/src/SDCardLogger.cpp) mencatat data sensor dan QoS; baris `logData()` juga menyimpan tipe jaringan (`WiFi` atau `GPRS`). Source yang terlihat tidak menunjukkan logger event terpisah untuk setiap kegagalan SIM atau kuota habis.
