---
title: "Threshold Control"
description: "Sistem kendali berbasis ambang batas (threshold) sensor, validasi data NVS, dan mekanisme fallback antara profil lokal dan cloud."
---

# Kontrol Ambang Batas (Threshold Control)

Sistem kendali otomatis pada ESP32 Gateway beroperasi dengan membandingkan parameter rata-rata lingkungan (suhu, kelembapan, dan intensitas cahaya) terhadap profil batas aktif (*active threshold profile*). Logika validasi batas ini didefinisikan secara statis dalam namespace [ThresholdValidation](file:///home/dhimasardinata/Dokumen/ta/gateway/include/ThresholdValidation.h) dan dikelola oleh komponen [SensorDataManager](file:///home/dhimasardinata/Dokumen/ta/gateway/src/SensorDataManager.cpp).

---

## Batas Validasi Parameter (Safety Range Bounds)

Untuk menghindari nilai input tidak masuk akal akibat gangguan transmisi RF atau kegagalan sensor fisik, seluruh ambang batas yang dikirim oleh server cloud atau diatur secara lokal melalui portal konfigurasi wajib lolos uji validasi di [ThresholdValidation.h](file:///home/dhimasardinata/Dokumen/ta/gateway/include/ThresholdValidation.h).

Adapun batasan ketat yang diberlakukan adalah:

| Parameter | Batas Minimum (`MinAllowed`) | Batas Maksimum (`MaxAllowed`) | Catatan Validasi |
| :--- | :--- | :--- | :--- |
| **Suhu (Temperature)** | `-20.0 °C` | `80.0 °C` | `minValue` harus `< maxValue` |
| **Kelembapan (Humidity)** | `0.0 %` | `100.0 %` | `minValue` harus `< maxValue` |
| **Intensitas Cahaya (Light)** | `0.0 Lux` | `65535.0 Lux` | `minValue` harus `< maxValue` |

Fungsi validasi menggunakan fungsi matematika `isfinite()` untuk mendeteksi nilai `NaN` atau `Infinity` sebelum menerapkan konfigurasi tersebut ke sistem kontrol.

---

## Penyimpanan Persisten NVS (Non-Volatile Storage)

Gateway membagi konfigurasi batas menjadi dua namespace terpisah pada NVS flash memory untuk mencegah penimpaan data yang tidak disengaja:

### 1. Profil Ambang Batas Lokal (`"thresholds"`)
Digunakan saat gateway bekerja secara luring (*offline*) atau dalam mode kendali lokal murni.
*   **Keys**:
    *   `tm_min` (Float): Batas suhu minimum.
    *   `tm_max` (Float): Batas suhu maksimum.
    *   `hm_min` (Float): Batas kelembapan minimum.
    *   `hm_max` (Float): Batas kelembapan maksimum.
    *   `lm_min` (Float): Batas intensitas cahaya minimum.
    *   `lm_max` (Float): Batas intensitas cahaya maksimum.
    *   `src_mode` (Int): Mode sumber data aktif (lokal, cloud, atau auto).

### 2. Profil Ambang Batas Cloud (`"thresholds_cld"`)
Menyimpan konfigurasi tersinkronisasi terakhir dari platform server cloud.
*   **Keys**:
    *   `tm_min`, `tm_max`, `hm_min`, `hm_max`, `lm_min`, `lm_max` (Float): Nilai batas yang ditransmisikan dari cloud.
    *   `valid` (Bool): Bendera (*flag*) penanda apakah profil cloud ini terisi dengan data yang sah.

---

## Mekanisme Fallback Profil Runtime

Penentuan profil ambang batas yang akan diuji oleh aktuator dilakukan secara dinamis melalui fungsi `activeThresholdProfile()` di [SensorDataManager.cpp](file:///home/dhimasardinata/Dokumen/ta/gateway/src/SensorDataManager.cpp#L460):

```cpp
const ThresholdProfile& SensorDataManager::activeThresholdProfile() const
{
    if (isUsingLocalData())
        return _localThresholds;
    return _cloudThresholds;
}
```

### Logika Peralihan Otomatis (DataSourceMode):
1.  **`SOURCE_LOCAL`**: Sistem secara eksklusif menggunakan profil `_localThresholds` yang disimpan di NVS lokal.
2.  **`SOURCE_CLOUD`**: Sistem secara eksklusif menggunakan profil `_cloudThresholds` yang disinkronkan dari server.
3.  **`SOURCE_AUTO`**:
    *   Selama gateway berhasil melakukan pertukaran data API dengan server cloud secara normal, profil `_cloudThresholds` akan digunakan.
    *   Jika sinkronisasi cloud gagal dua kali berturut-turut, atau paket data sensor aktif dianggap usang lebih dari 30 menit, flag `runtimeFallbackToLocal` dapat aktif secara otomatis agar kontrol aktuator tetap berjalan aman di lapangan. Profil threshold dan jadwal dari cloud sendiri memiliki batas kesegaran terpisah 24 jam.

---

## Alur Penerapan pada Kontrol Aktuator

Getter nilai threshold (seperti `getTempMin()`, `getTempMax()`, `getHumMin()`, dan `getHumMax()`) secara transparan merujuk pada profil aktif dari hasil evaluasi di atas. Nilai ini kemudian diumpankan ke kelas driver `RelayController` untuk dievaluasi terhadap histeresis (*deadband*) sensor fisik, seperti dijelaskan pada bagian [Actuator Control](./actuator-control.md).
