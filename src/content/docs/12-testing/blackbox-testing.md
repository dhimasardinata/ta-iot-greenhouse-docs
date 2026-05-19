---
title: "Blackbox Testing"
---

# Blackbox Testing

Blackbox testing berarti menguji sistem dari luar, seolah-olah penguji tidak membaca kode.

## Kenapa Dipakai

Untuk sidang TA, blackbox testing membantu menunjukkan fitur sistem berjalan dari sudut pandang pengguna:

- login,
- monitoring,
- kontrol,
- jadwal,
- heatmap,
- OTA,
- terminal,
- Android WebView,
- dan error handling.

## Template Pengujian

| ID | Fitur | Input | Langkah | Hasil yang Diharapkan | Hasil Aktual | Status |
|---|---|---|---|---|---|---|
| BB-001 | Login web | username dan password benar | Buka web lalu login | Masuk dashboard | Belum diisi | Pending |
| BB-002 | Monitoring | data sensor terbaru | Buka monitoring | Gauge atau tabel berubah | Belum diisi | Pending |
| BB-003 | Threshold | nilai min/max baru | Simpan threshold | Backend menerima perubahan | Belum diisi | Pending |
| BB-004 | Jadwal | jam mulai dan akhir | Simpan jadwal | Jadwal tampil kembali | Belum diisi | Pending |
| BB-005 | OTA | file `.bin` valid | Upload firmware | Firmware tersimpan | Belum diisi | Pending |
| BB-006 | Android | jaringan aktif | Buka aplikasi | Web tampil di WebView | Belum diisi | Pending |

## Yang Tidak Boleh Dilupakan

Uji juga input salah. Sistem yang baik tidak hanya benar saat input benar, tetapi juga aman saat input salah.

Lanjutkan ke [Analisis Hasil Pengujian](./analisis-hasil-pengujian.md).
