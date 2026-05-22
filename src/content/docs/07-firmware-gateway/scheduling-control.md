---
title: "Scheduling Control"
description: "Sistem penjadwalan relay, mode kontrol otomatis, integrasi NVS, dan algoritma penanganan batas waktu melewati tengah malam."
---

# Kontrol Penjadwalan (Scheduling Control)

Selain kendali berbasis parameter sensor instan, ESP32 Gateway mendukung kendali berbasis waktu atau jadwal (*scheduling*). Fitur ini diatur oleh komponen [RelayController](file:///home/dhimasardinata/Dokumen/ta/gateway/src/RelayController.cpp) dengan memanfaatkan validasi masukan dari [ScheduleValidation](file:///home/dhimasardinata/Dokumen/ta/gateway/include/ScheduleValidation.h) untuk memastikan stabilitas eksekusi.

---

## Spesifikasi Mode Kerja Relay

Setiap jadwal mengonfigurasi kondisi kerja tiga relay utama (`RELAY_EXHAUST`, `RELAY_DEHUMIDIFIER`, dan `RELAY_BLOWER`) menggunakan kode karakter berikut:

*   **`'0'` (Forced OFF)**:
    Relay dipaksa mati sepanjang jendela waktu jadwal aktif, mengabaikan kondisi sensor lingkungan.
*   **`'1'` (Forced ON)**:
    Relay dipaksa hidup sepanjang jendela waktu jadwal aktif, mengabaikan kondisi sensor lingkungan.
*   **`'2'` (Threshold Fallback / Otomatis)**:
    Relay diserahkan ke algoritma kontrol ambang batas sensor (*deadband hysteresis*). Mode ini merupakan default untuk memastikan transisi yang aman.

---

## Struktur Data & Penyimpanan NVS

Gateway mendukung hingga **4 jadwal aktif** (`MAX_SCHEDULES = 4`). Struktur konfigurasi didefinisikan sebagai `ScheduleConfig` di [RelayController.h](file:///home/dhimasardinata/Dokumen/ta/gateway/include/RelayController.h#L19):

```cpp
struct ScheduleConfig {
    int id;
    bool active;
    uint8_t startHour;
    uint8_t startMin;
    uint8_t endHour;
    uint8_t endMin;
    char r1Mode; // '0', '1', '2'
    char r2Mode;
    char r3Mode;
};
```

Data ini disimpan di NVS flash menggunakan dua namespace terpisah:

1.  **Jadwal Lokal (`"scheduler"`)**:
    Digunakan saat berjalan offline atau mode lokal. Menyimpan data jadwal dengan keys `s0` hingga `s3` (berupa bytes biner `ScheduleConfig`), serta flag boolean `local_valid` untuk menandai keberadaan konfigurasi lokal yang sah.
2.  **Jadwal Cloud (`"scheduler_cloud"`)**:
    Disinkronkan dari platform cloud. Menyimpan data jadwal dengan keys `s0` hingga `s3` dan flag boolean `cloud_valid`.

---

## Algoritma Penjadwalan Melewati Tengah Malam (Cross-Midnight)

Tantangan utama sistem penjadwalan sederhana adalah ketidakmampuannya mengevaluasi jendela waktu yang melintasi tengah malam (misal, aktif dari pukul 22:00 malam hingga 04:00 pagi hari berikutnya).

ESP32 Gateway memecahkan masalah ini di fungsi `RelayController::isScheduleActive` dengan membandingkan representasi menit total harian (`Hour * 60 + Minute`):

```cpp
bool RelayController::isScheduleActive(const ScheduleConfig& cfg, int currentHour, int currentMin) const {
    if (!cfg.active || !ScheduleValidation::isScheduleConfigValid(cfg)) return false;
    int nowMins = (currentHour * 60) + currentMin;
    int startMins = (cfg.startHour * 60) + cfg.startMin;
    int endMins = (cfg.endHour * 60) + cfg.endMin;

    if (startMins < endMins) {
        // Kasus Normal (dalam hari yang sama)
        return (nowMins >= startMins && nowMins < endMins);
    } else {
        // Kasus Melewati Tengah Malam (Cross-Midnight)
        return (nowMins >= startMins || nowMins < endMins);
    }
}
```

### Simulasi Jalannya Algoritma:
Target Jadwal: **22:00 (1320 menit)** s.d. **04:00 (240 menit)**. Karena `1320 > 240`, kondisi masuk ke blok `else`.

*   **Kasus A: Waktu Saat Ini 23:00 (1380 menit)**
    Evaluasi: `1380 >= 1320 || 1380 < 240` $\rightarrow$ `True || False` $\rightarrow$ **Jadwal Aktif (ON)**.
*   **Kasus B: Waktu Saat Ini 02:00 (120 menit)**
    Evaluasi: `120 >= 1320 || 120 < 240` $\rightarrow$ `False || True` $\rightarrow$ **Jadwal Aktif (ON)**.
*   **Kasus C: Waktu Saat Ini 10:00 (600 menit)**
    Evaluasi: `600 >= 1320 || 600 < 240` $\rightarrow$ `False || False` $\rightarrow$ **Jadwal Tidak Aktif (OFF)**.

---

## Manajemen Waktu RTC (Real-Time Clock)

Jadwal sangat bergantung pada akurasi waktu lokal. Sistem gateway dilengkapi dengan RTC internal (DS3231) yang dikelola oleh kelas [RTCManager](file:///home/dhimasardinata/Dokumen/ta/gateway/src/RTCManager.cpp).

> [!CAUTION]
> Jika RTC mengalami kegagalan hardware atau kehabisan daya cadangan, dan gateway gagal menyinkronkan waktu melalui NTP (Network Time Protocol) saat boot, maka evaluasi jadwal (`allowScheduleEvaluation`) akan ditangguhkan secara otomatis untuk mencegah kesalahan aktivasi aktuator di luar jam operasional. Sistem akan menahan aktuator pada logika ambang batas sensor murni sampai waktu yang valid didapatkan.
