---
title: "Sensor Cahaya"
---

# Sensor Cahaya (BH1750 Lux Sensor)

Intensitas cahaya matahari sangat mempengaruhi proses fotosintesis pada tanaman anggrek. Kurang cahaya membuat anggrek sulit berbunga, sementara kelebihan cahaya matahari langsung dapat membuat daun anggrek terbakar (*sunburn*) dan menguning.

Sistem Tugas Akhir ini menggunakan sensor **BH1750** untuk memantau intensitas cahaya di dalam greenhouse dalam satuan **Lux**.

---

## Sensor BH1750

BH1750 adalah sensor intensitas cahaya digital (ambient light sensor) yang memiliki konverter ADC 16-bit internal, menghasilkan data digital langsung tanpa memerlukan kalibrasi rumus analog yang rumit.

### Spesifikasi Teknis BH1750
*   **Antarmuka Komunikasi:** I2C Bus.
*   **Alamat I2C Default:**
    *   `0x23` (Pin ADDR ditarik ke `GND` atau dibiarkan mengambang).
    *   `0x5C` (Pin ADDR ditarik ke `VCC` 3.3V).
*   **Satuan Output:** Lux (Lumen per meter persegi).
*   **Rentang Pengukuran:** 1 s.d. 65.535 Lux.
*   **Karakteristik Respon:** Sensitivitas spektral sensor BH1750 dirancang mendekati kurva sensitivitas mata manusia (puncak sensitivitas pada spektrum cahaya tampak).
*   **Ketergantungan Suhu:** Sangat rendah, sehingga hasil pembacaan Lux tetap konsisten meskipun suhu di dalam greenhouse berubah drastis dari siang ke malam.

---

## Panduan Pemasangan Fisik di Greenhouse

Untuk mendapatkan pembacaan intensitas cahaya matahari yang akurat:

```
BENAR (Menghadap Langit, Bebas Halangan):
      [ Langit / Arah Datang Sinar ]
                 │ │ │
                 ▼ ▼ ▼
             [SENSOR BH1750]  (Posisikan Horizontal Rata Air)
      ============================ (Dudukan Penyangga)

SALAH (Terhalang Tiang / Kabel):
      [ Langit / Arah Datang Sinar ]
                 │
                 ▼ [Tiang Rangka / Paranet Tebal]
               (Bayangan)
                   ░
             [SENSOR BH1750]
```

1.  **Arah Sensor Menghadap Tegak Lurus ke Atas:** Pasang sensor BH1750 dengan posisi horizontal (mendatar/rata air) dengan kubah sensor menghadap tegak lurus ke langit. Hal ini menjamin sensor menerima sinar matahari secara merata dari segala sudut datang (*cosine corrected response*).
2.  **Hindari Bayangan Permanen:** Pastikan posisi penempatan sensor bebas dari bayangan permanen seperti bayangan tiang rangka greenhouse, kabel listrik, atau instalasi misting. Bayangan tiang tipis sekalipun yang menutupi sensor saat jam tertentu akan mengacaukan pembacaan data harian.
3.  **Tempatkan di bawah Paranet (di area tanaman):** Karena tujuan kita adalah mengukur cahaya yang diterima anggrek, letakkan sensor di bawah jaring paranet (dalam greenhouse), sejajar dengan posisi daun anggrek digantung.
4.  **Perawatan Kebersihan Berkala:** Casing transparan pelindung sensor BH1750 harus dibersihkan secara berkala dari debu, kotoran burung, atau lumut yang tumbuh akibat kelembapan tinggi. Kotoran yang menempel akan memblokir cahaya masuk dan membuat pembacaan Lux lebih rendah dari kondisi asli.

Lanjutkan ke [Aktuator](./aktuator.md) untuk mempelajari peralatan pengatur sirkulasi iklim mikro di dalam greenhouse!
