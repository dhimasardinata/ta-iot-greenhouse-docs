---
title: "File Reference Backend Laravel"
description: "Daftar rujukan berkas kode sumber PHP pengontrol (controllers) di backend Laravel beserta deskripsi peran fisiknya."
---

# File Reference Backend Laravel

Bagian ini menyajikan direktori rujukan cepat untuk seluruh berkas kode sumber pengontrol PHP yang diimplementasikan pada Central Hub Laravel. Semua berkas nyata ini berlokasi di dalam folder [web/](file:///home/dhimasardinata/Dokumen/ta/web/) pada repositori utama.

---

## Daftar Berkas Pengontrol Utama

Klik tautan berkas di bawah ini untuk melihat langsung kode sumber fisiknya di editor Anda:

### 1. **[ApiController.php](file:///home/dhimasardinata/Dokumen/ta/web/ApiController.php)**
*   **Peran Utama**: Mengelola seluruh alur request API masuk stateless dari perangkat keras IoT.
*   **Fitur Kunci**:
    *   Pengambilan data historis tabular terpaginasi cepat via method `tablePerGH`.
    *   Penerimaan unggahan data sensor mentah dan pembaruan snapshots via `saveSensorData`.
    *   Penerimaan unggahan foto Base64 ESP32-CAM dan pemicu peringatan FCM via `saveCameraData`.
    *   Pembaruan ambang batas sensor spasial via `updateThresholds`.

### 2. **[ScheduleController.php](file:///home/dhimasardinata/Dokumen/ta/web/ScheduleController.php)**
*   **Peran Utama**: Mengelola manipulasi database untuk jadwal aktif aktuator.
*   **Fitur Kunci**:
    *   Menyajikan kueri jadwal terpadat dalam bentuk string biner ringkas via `getSchedule` untuk konsumsi gateway.
    *   Melakukan penyimpanan massal skema "Purge-and-Insert" jadwal dari web dashboard via `saveSchedules`.
    *   Menyajikan kueri berstruktur lengkap untuk visualisasi editor di dashboard web via `getSchedulesForWeb`.

### 3. **[OtaController.php](file:///home/dhimasardinata/Dokumen/ta/web/OtaController.php)**
*   **Peran Utama**: Pusat pengelolaan distribusi binary firmware update (.bin) untuk perangkat IoT.
*   **Fitur Kunci**:
    *   Validasi keabsahan ekstensi, tipe biner, dan ukuran file firmware terunggah via `uploadFirmware`.
    *   Manajemen status aktif tunggal (Single-Active) versi firmware per node sensor.
    *   Kueri informasi firmware terbaru dengan penghematan polling database via `getFirmwareInfo`.

### 4. **[PageController.php](file:///home/dhimasardinata/Dokumen/ta/web/PageController.php)**
*   **Peran Utama**: Orkestrator render visual halaman web dashboard berbasis Inertia.js.
*   **Fitur Kunci**:
    *   Deteksi status konektivitas gateway (Online/Offline) secara berkala via `buildMonitoringActuatorStatus`.
    *   Regenerasi data rata-rata harian sensor via `monitoring`.
    *   Pemuatan data spasial koordinat node untuk visualisasi peta sebaran spasial via `heatmap`.
