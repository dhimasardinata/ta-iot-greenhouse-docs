---
title: "Relay & SSR"
---

# Sakelar Pengendali (Relay vs Solid State Relay)

Mikrokontroler ESP32 bekerja pada tegangan rendah **3.3V DC** dengan batas keluaran arus GPIO hanya sekitar **12-20 mA**. Arus sekecil ini mustahil digunakan untuk menyalakan kipas blower atau dehumidifier AC 220V secara langsung.

Oleh karena itu, kita membutuhkan **Relay** atau **Solid State Relay (SSR)** yang bertindak sebagai jembatan sakelar elektronik.

---

## Perbandingan Tipe Sakelar Elektronik

Dalam sistem kontrol otomatis greenhouse, kita dapat menggunakan dua jenis relay berikut:

### 1. Relay Elektromekanik (Mechanical Relay)
*   **Cara Kerja:** Menggunakan koil (kumparan) magnet untuk menarik kontak logam secara fisik agar terhubung (ON) atau terputus (OFF). Terdengar bunyi klik khas saat aktif.
*   **Kelebihan:** Sangat murah, tidak mudah panas, dan mampu menangani beban AC maupun DC dengan rentang tegangan lebar.
*   **Kekurangan:** Kontak logam dapat aus seiring waktu akibat busur percikan listrik (*electrical arcing*) saat memutus beban motor induktif (seperti exhaust fan). Kelembapan udara tinggi juga dapat mempercepat korosi pada plat kontak logam.

### 2. Solid State Relay (SSR)
*   **Cara Kerja:** Menggunakan komponen semikonduktor (Optokopler + Triac/Thyristor) untuk melewatkan arus listrik tanpa ada kontak fisik yang bergerak. Sakelar aktif secara optik (cahaya internal).
*   **Kelebihan:** Tidak berisik, masa pakai sangat panjang (tahan jutaan kali pensaklaran), tidak menghasilkan percikan api listrik (aman di lingkungan lembap), dan berpindah status sangat cepat.
*   **Kekurangan:** Lebih mahal dari relay mekanik, menghasilkan sedikit panas saat dialiri arus besar (sehingga butuh heatsink aluminium pada beban berat), dan hanya bisa digunakan untuk beban AC (untuk tipe SSR AC standard).

---

## Logika Pemicu: Active-Low vs Active-High

Modul relay komersial yang digunakan di pasaran umumnya menggunakan konfigurasi logika **Active-Low**. Hal ini sangat penting dipahami saat menulis firmware:

```text
GPIO ESP32 = HIGH (3.3V)  ──> LED Optokopler OFF ──> Relay Terbuka (OFF) / Alat Mati
GPIO ESP32 = LOW (0V)     ──> LED Optokopler ON  ──> Relay Tertutup (ON)  / Alat Menyala
```

*   **Mengapa Active-Low?** Logika ini mengamankan mikrokontroler dari beban arus balik koil relay. Arus untuk mengaktifkan LED optokopler disalurkan dari rel VCC 5V modul ke pin GPIO ESP32 (*sinking current*), bukan dipompa langsung dari GPIO (*sourcing current*).
*   **Pencegahan Flickering Saat Booting:** Saat ESP32 melakukan booting ulang atau crash, semua pin GPIO secara bawaan berada pada mode input ber-impedansi tinggi (*floating*). Kondisi ini bisa membuat relay terpicu menyala-mati secara acak. Di dalam firmware `setup()`, pin relay wajib dideklarasikan sebagai `OUTPUT` dan langsung ditulis `HIGH` sebelum memulai kontrol loop utama:
    ```cpp
    pinMode(RELAY_CH1, OUTPUT);
    digitalWrite(RELAY_CH1, HIGH); // Pastikan alat mati saat awal menyala
    ```

---

## Proteksi Beban Induktif (RC Snubber)

Motor AC pada kipas Blower dan Exhaust Fan adalah **beban induktif**. Ketika relay memutus aliran listrik ke motor AC, kumparan motor akan melepas energi magnetiknya secara mendadak, menghasilkan tegangan kejut balik yang sangat tinggi (bisa mencapai ribuan volt sesaat).

Tegangan kejut ini dapat melompati celah udara kontak relay mekanik (menyebabkan percikan api besar yang merusak relay) atau menembus triac pada SSR (membuat SSR jebol dalam kondisi short-circuit konstan).

Untuk mengamankan sakelar, kita wajib memasang **RC Snubber Circuit** secara paralel dengan terminal kontak relay:

```text
       Terminal Sakelar Relay / SSR
       ┌───────────[ ]───────────┐
       │                         │
       └─────[R: 100 Ohm]──[C: 0.1 uF]──┘
```
RC Snubber ini bertindak sebagai peredam kejut tegangan tinggi, memperpanjang umur modul relay Anda secara signifikan.

Lanjutkan ke [Layar LCD](./lcd.md) untuk melihat konfigurasi display diagnosa sistem di lapangan!
