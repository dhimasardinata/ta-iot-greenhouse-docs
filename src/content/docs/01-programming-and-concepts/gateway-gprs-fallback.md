---
title: "GPRS dan Fallback Gateway"
---

# GPRS dan Fallback Gateway

Gateway memakai Wi-Fi sebagai jalur utama, tetapi kode juga menyiapkan jalur GPRS/SIM800 lewat TinyGSM. Halaman ini menjelaskan kenapa ada modem, state machine GPRS, APN, dan fallback HTTP di gateway.

## Fungsi GPRS

GPRS dipakai sebagai jalur cadangan saat Wi-Fi gagal berkali-kali. Dalam sistem greenhouse, ini berguna karena gateway tetap bisa mengirim status atau mengambil data penting walau router lokal bermasalah.

GPRS bukan pengganti sempurna Wi-Fi. Jalur ini lebih lambat, lebih mahal secara daya, dan lebih mudah timeout.

## Komponen Utama

| Komponen | Fungsi |
|---|---|
| TinyGSM | Library untuk berbicara dengan modem SIM800. |
| SIM800 | Modem GSM/GPRS. |
| APN | Nama akses internet dari provider SIM. |
| GPRS client | Client HTTP melalui modem. |
| Secure GPRS client | Client HTTPS melalui modem. |
| Wi-Fi state machine | Menentukan kapan fallback GPRS boleh dicoba. |

## State Machine GPRS

Gateway tidak langsung membuka GPRS setiap Wi-Fi gagal. Kode memakai state agar loop tetap hidup dan kegagalan bisa dilacak.

State penting yang muncul:

- menunggu syarat fallback,
- inisialisasi modem,
- cek SIM ready,
- attach ke jaringan operator,
- connect GPRS,
- kembali retry Wi-Fi setelah interval tertentu.

Alasan memakai state:

- modem bisa lama merespons,
- SIM bisa belum siap,
- sinyal bisa buruk,
- APN bisa salah,
- loop gateway tetap harus mengontrol aktuator.

## Trigger Fallback

Fallback GPRS dipicu setelah beberapa kegagalan Wi-Fi atau request jaringan. Gateway menyimpan jumlah failure dan membandingkannya dengan batas seperti `MAX_FAILURES_BEFORE_GPRS`.

Edge case:

- Wi-Fi terlihat connected tetapi internet mati,
- DNS gagal di Wi-Fi tetapi GPRS bisa,
- GPRS aktif terlalu cepat sehingga boros daya,
- GPRS aktif terlalu lambat sehingga data tertahan,
- user mematikan GPRS dari portal.

## HTTP Lewat GPRS

Kode gateway punya jalur request Wi-Fi dan GPRS. Secara konsep payload API sama, tetapi transport berbeda.

Yang berubah saat memakai GPRS:

- client socket berasal dari modem,
- timeout perlu lebih longgar,
- response lambat lebih sering terjadi,
- TLS handshake lebih berat,
- log perlu mencatat apakah request lewat Wi-Fi atau GPRS.

## Waktu dari Modem

Gateway juga bisa mencoba membaca waktu dari jaringan operator. Ini berguna jika NTP lewat Wi-Fi tidak tersedia.

Namun waktu modem tetap perlu dianggap fallback, bukan sumber utama mutlak, karena:

- operator bisa tidak memberi waktu,
- timezone bisa perlu koreksi,
- response AT command bisa lambat,
- waktu salah dapat mengganggu replay protection.

## Konfigurasi Portal

Portal gateway menyediakan opsi GPRS seperti enable/disable dan parameter default APN. Nilai disimpan ke NVS lewat `ConfigManager`.

Hal yang perlu dijaga:

- jangan menyimpan credential kosong tanpa sengaja,
- perubahan config perlu terlihat di UI,
- perubahan yang butuh reboot harus diberi pesan jelas,
- log tidak boleh membocorkan credential.

## File yang Relevan

- [gateway/include/MyNetworkManager.h](../14-complete-file-walkthrough/gateway/include/MyNetworkManager.h.md)
- [gateway/src/MyNetworkManager.cpp](../14-complete-file-walkthrough/gateway/src/MyNetworkManager.cpp.md)
- [gateway/include/config.h](../14-complete-file-walkthrough/gateway/include/config.h.md)
- [gateway/include/ConfigManager.h](../14-complete-file-walkthrough/gateway/include/ConfigManager.h.md)
- [gateway/src/ConfigManager.cpp](../14-complete-file-walkthrough/gateway/src/ConfigManager.cpp.md)
- [gateway/include/PortalAssets.h](../14-complete-file-walkthrough/gateway/include/PortalAssets.h.md)
- [gateway/src/RTCManager.cpp](../14-complete-file-walkthrough/gateway/src/RTCManager.cpp.md)
- [gateway/src/SDCardLogger.cpp](../14-complete-file-walkthrough/gateway/src/SDCardLogger.cpp.md)
