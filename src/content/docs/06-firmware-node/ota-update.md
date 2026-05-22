---
title: "OTA (Over-the-Air) Update"
---

# Pembaruan Firmware Jarak Jauh (Over-the-Air Update)

Firmware node mendukung pembaruan kode secara jarak jauh (*Over-the-Air*) untuk memudahkan pemeliharaan tanpa akses fisik ke perangkat. Sistem menyediakan tiga jalur pembaruan terpisah yang dikoordinasikan oleh [Application.cpp](file:///home/dhimasardinata/Dokumen/ta/node/src/Application.cpp) dan [OtaManager.h](file:///home/dhimasardinata/Dokumen/ta/node/lib/NodeCore/ota/OtaManager.h):

---

## 1. Web OTA (Local Binary Upload)

Jalur ini digunakan saat teknisi mengunggah berkas firmware biner (`.bin`) secara langsung menggunakan antarmuka web portal lokal offline.

### Mekanisme Eksekusi:
1.  **Penerimaan Berkas**: Server HTTP lokal menerima berkas biner dan menyimpannya ke sistem berkas LittleFS dengan nama `/update.bin`.
2.  **Transisi State**: Setelah berkas terunggah sepenuhnya, server mengirim sinyal balik yang merubah status aplikasi utama menjadi `State::FLASHING_FIRMWARE`.
3.  **Prosedur Flashing Aman (`handleFlashing()`)**:
    *   Sistem mematikan pengawas perangkat keras secara sementara (`ESP.wdtDisable()`) karena operasi penulisan flash sektor dapat berlangsung selama 10 hingga 30 detik.
    *   Inisialisasi memori pembaruan: `Update.begin(actualSize, U_FLASH)` dipanggil dengan menentukan ukuran tepat dari berkas biner. Jika ruang tidak mencukupi, berkas dihapus, WDT diaktifkan kembali (`ESP.wdtEnable(8000)`), dan sistem membatalkan proses dengan kembali ke status `RUNNING`.
    *   **Streaming Tulis**: Data dibaca dari berkas `/update.bin` dan dialirkan langsung ke partisi flash biner baru menggunakan `Update.writeStream(binFile)`.
    *   **Penyelesaian**: Setelah penulisan selesai, WDT diaktifkan kembali. Jika validasi akhir penulisan firmware berhasil via `Update.end(true)`, sistem mencatat alasan reboot sebagai `BootGuard::RebootReason::OTA_UPDATE`, menghapus berkas `/update.bin`, lalu memicu restart perangkat (`ESP.restart()`).

---

## 2. ArduinoOTA (Local Network Broadcast)

ArduinoOTA digunakan oleh pengembang untuk melakukan flashing cepat dari IDE pengembang (PlatformIO/Arduino IDE) melalui jaringan Wi-Fi lokal menggunakan protokol broadcast UDP.

### Siklus Hidup & Pengawas Detak (Watchdog Ticker)
Untuk mencegah perangkat terkunci (*brick* atau *hang*) di tengah jalan akibat gangguan koneksi Wi-Fi saat proses flashing berlangsung, sistem mengaktifkan pengatur waktu berkala (*Hardware Ticker*) sebagai watchdog khusus:

*   **onStart**: Ketika koneksi upload ArduinoOTA dideteksi, status aplikasi bergeser ke `State::UPDATING`. Layanan lain dihentikan dan objek `m_arduinoOtaWatchdog` (Ticker) diaktifkan untuk memeriksa status setiap 1000 ms:
    ```cpp
    m_arduinoOtaWatchdog.attach_ms(1000, [this]() { handleArduinoOtaWatchdog(); });
    ```
*   **onProgress**: Callback ini melacak jumlah data yang masuk dan memperbarui stempel waktu aktivitas terahir (`m_arduinoOtaLastProgressAt = millis()`).
*   **Watchdog Timeout**: Fungsi `handleArduinoOtaWatchdog()` memeriksa dua ambang batas waktu kritis:
    1.  **Stall Timeout (`OTA_ARDUINO_STALL_TIMEOUT_MS = 10.000 ms`)**: Jika tidak ada aktivitas progres data baru selama 10 detik berturut-turut, proses dianggap macet (*stalled*).
    2.  **Maximum Duration (`OTA_ARDUINO_MAX_DURATION_MS = 15 menit`)**: Batas total waktu unggah keseluruhan. Jika melebihi 15 menit, sesi dipaksa berhenti.
    *   *Aksi*: Jika salah satu batas terlampaui, Ticker akan mematikan sesi dan memaksa restart perangkat segera (`ESP.restart()`) agar node kembali beroperasi secara normal menggunakan firmware lama.
*   **onEnd & onError**: Menghapus ikatan ticker pengawas dan mengembalikan mesin status aplikasi ke `State::RUNNING`.

---

## 3. Cloud OTA (Automated Check)

Modul `OtaManager` menangani proses pemeriksaan pembaruan berkala ke server cloud secara otomatis di latar belakang setiap satu jam (`REGULAR_UPDATE_INTERVAL_MS`).

*   **Pemeriksaan Versi**: Mengirimkan HTTP GET ke endpoint API server dengan menyertakan versi firmware berjalan saat ini. Server merespons dengan JSON yang memuat versi rilis terbaru, URL berkas biner, dan checksum MD5.
*   **Keamanan TLS**: Unduhan berkas biner dilindungi sertifikat SSL/TLS BearSSL. Jika terjadi kegagalan pembaruan akibat sertifikat root CA kedaluwarsa di perangkat, terminal diagnostik menyediakan perintah administratif khusus `force-ota-insecure` untuk memaksa bypass verifikasi TLS aman secara sementara demi memulihkan koneksi perangkat.
*   **Watchdog Unduhan**: Dilengkapi pengawas detak ticker serupa untuk mendeteksi kegagalan unduhan biner HTTP dari server cloud.

---

## Penangguhan Layanan (Loop Pausing)

Flashing memori flash adalah operasi sensitif yang membutuhkan stabilitas pasokan daya dan memori. Firmware membedakan efek tiap jalur OTA:
1.  Pada Web OTA, aplikasi masuk ke `State::FLASHING_FIRMWARE` dan memanggil `pause()` pada sensor serta `ApiClient` sebelum menulis firmware dari `/update.bin`.
2.  Pada ArduinoOTA, callback `onStart` menggeser status ke `State::UPDATING`; layanan normal dihentikan sampai upload selesai, gagal, atau watchdog OTA memaksa restart.
3.  Pada Cloud OTA, `OtaManager` menandai dirinya sibuk (`isBusy()`), sehingga siklus upload API ditunda lewat `apiClient.setOtaInProgress(...)`. Pembacaan sensor tidak semuanya dihentikan eksplisit seperti pada Web OTA.
4.  Layanan kembali ke kondisi normal setelah proses OTA gagal, selesai dibatalkan, atau perangkat selesai restart menggunakan firmware baru.
