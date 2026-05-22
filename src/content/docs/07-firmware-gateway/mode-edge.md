---
title: "Mode Edge Gateway"
description: "Panduan teknis pengoperasian mandiri (Edge/Local Mode) pada ESP32 Gateway, termasuk pengolahan data lokal, kalkulasi rata-rata, dan pencadangan NVS."
---

# Mode Edge Gateway

Mode Edge (atau Mode Lokal) adalah mode operasional mandiri di mana ESP32 Gateway sepenuhnya mengandalkan pembacaan sensor langsung dari node sensor lokal melalui jaringan nirkabel lokal, tanpa bergantung pada server cloud. Keputusan kendali relai, pemantauan batas threshold, dan penjadwalan dikalkulasikan secara mandiri oleh gateway menggunakan parameter konfigurasi lokal yang disimpan di flash internal.

---

## Penerimaan Data Lokal (`/api/data`)

Ketika node sensor memancarkan data pembacaan sensornya, data dikirimkan melalui HTTP POST request ke server web lokal yang berjalan pada ESP32 Gateway di endpoint `/api/data`.

### Skema Pemetaan Node

Di dalam [SensorDataManager.cpp](file:///home/dhimasardinata/Dokumen/ta/gateway/src/SensorDataManager.cpp), data sensor dipetakan ke dalam array internal `nodes` dengan ketentuan indeks sebagai berikut:

*   **Indeks 0 hingga 9 (Maksimal 10 Node)**: Diberikan untuk node sensor standar yang memantau Suhu, Kelembapan, dan Intensitas Cahaya (Lux).
*   **Indeks 10 dan 11**: Diberikan khusus untuk node kamera pengawas (`cam-1` dan `cam-2`) yang melaporkan status kabut (*fog*) atau gambar.

Setiap entri node mencakup metadata waktu kedatangan pesan (`lastUpdateMs`) untuk memantau kesegaran data (*data freshness*).

---

## Algoritma Kalkulasi Rata-Rata Lokal (`recalculateLocalAverage()`)

Untuk menghasilkan satu nilai kontrol tunggal yang representatif bagi greenhouse, gateway menghitung rata-rata dari seluruh node sensor lokal yang berstatus aktif menggunakan metode `recalculateLocalAverage()`:

1.  **Iterasi & Filter Stale**: Gateway memeriksa 10 slot node sensor standar. Node dianggap aktif hanya jika:
    *   `lastUpdateMs != 0` (node pernah mengirim data sejak boot).
    *   `(millis() - lastUpdateMs) <= LOCAL_DATA_MAX_AGE_MS` (data tidak kedaluwarsa, default batas toleransi adalah 5 menit atau 300.000 ms).
2.  **Akumulasi Nilai**:
    *   Jika node lolos filter keaktifan, nilai Suhu (*Temperature*), Kelembapan (*Humidity*), dan Cahaya (*Light*) ditambahkan ke variabel akumulator masing-masing.
    *   Jumlah node aktif yang berkontribusi dicatat (`activeCount`).
3.  **Kalkulasi Rerata**:
    *   Jika `activeCount > 0`, nilai rata-rata adalah hasil pembagian akumulator dengan `activeCount`.
    *   Jika `activeCount == 0`, gateway menandai status data lokal sebagai tidak valid (*not usable*), yang kemudian akan memicu kondisi *failsafe* jika grace period habis.

### Penyimpanan Cadangan ke NVS (`"local_avg"`)

Setiap kali kalkulasi rata-rata lokal berhasil dilakukan, hasilnya segera dicadangkan ke memori flash NVS di bawah namespace `"local_avg"`. Hal ini berguna agar gateway memiliki nilai sensor terakhir yang valid jika perangkat mengalami restart mendadak, sehingga mencegah transisi relai yang mengejutkan akibat data sensor kosong.

---

## Aliran Kontrol Edge

Di bawah Mode Edge, nilai rata-rata lokal ini langsung diteruskan ke [RelayController.cpp](file:///home/dhimasardinata/Dokumen/ta/gateway/src/RelayController.cpp) untuk dicocokkan dengan threshold lokal:

*   **Temperature High/Low Hysteresis**: Kontrol kipas blower dan exhaust menggunakan logika *deadband* untuk mencegah relai berosilasi (berpindah keadaan ON/OFF secara cepat akibat perubahan kecil suhu di sekitar batas threshold).
*   **Humidity Limits**: Mengaktifkan dehumidifier jika kelembapan melebihi batas atas lokal.

> [!NOTE]
> Seluruh proses pemrosesan data lokal di Mode Edge dilakukan secara non-blocking di dalam *main loop* tunggal tanpa thread tambahan, memastikan keandalan eksekusi tanpa risiko tabrakan memori.

Lanjutkan ke [Mode Auto](./mode-auto.md) untuk memahami transisi otomatis antara Cloud dan Edge.
