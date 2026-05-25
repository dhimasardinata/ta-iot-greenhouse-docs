---
title: "Algoritma Dasar"
---

# Algoritma Dasar

Halo, rekan developer! Pada bab terakhir dari fundamental pemrograman ini, kita akan membahas mengenai **algoritma** spesifik yang menjadi otak pengendali otomatisasi di dalam greenhouse kita.

Algoritma adalah deretan langkah logis dan sistematis untuk memecahkan suatu masalah. Di proyek ini, dua algoritma paling krusial yang berjalan pada firmware Gateway adalah **Deadband Hysteresis** untuk membaca kondisi sensor dan **Evaluasi Jadwal Aktif** (termasuk penanganan pergantian hari/tengah malam).

Mari kita bahas logika kerja keduanya berdasarkan berkas kode riil di dalam proyek.

---

## 1. Algoritma Deadband Hysteresis (Kontrol Ambang Batas Sensor)

Dalam mengontrol kipas atau pelembap udara menggunakan sensor, kita menghadapi masalah fisik: nilai sensor sering berfluktuasi naik-turun sangat tipis di sekitar batas target (misalnya suhu melompat antara `29.9`°C dan `30.0`°C dalam hitungan milidetik).

Jika kita hanya memakai kondisi sederhana `if (suhu >= 30.0) nyalakan_kipas; else matikan_kipas;`, maka relai fisik kipas akan hidup-mati dengan sangat cepat (*relay chattering*). Hal ini bisa merusak sakelar relai dan dinamo kipas dalam beberapa hari.

### Solusinya: Deadband Hysteresis
Kita membuat batas rentang pengaman (*deadband*) menggunakan ambang batas atas (`vMax`) untuk menyalakan relai, dan ambang batas bawah (`vMin`) untuk mematikannya.

Buka berkas [gateway/src/RelayController.cpp](file:///home/dhimasardinata/Dokumen/ta/gateway/src/RelayController.cpp):

```cpp
auto applyDeadband = [&](float val, float vMin, float vMax) -> bool {
    if (states[rI]) {
        return (val > vMin);
    }
    return (val >= vMax);
};
```

### Visualisasi Langkah Kerja Algoritma:
Misalkan parameter untuk kipas Blower pendingin diatur pada suhu batas atas `30.0`°C (`vMax`) dan suhu batas bawah `28.0`°C (`vMin`).

```text
Suhu Naik (Kipas OFF):
27.5°C ──► 28.5°C (kipas OFF) ──► 29.9°C (kipas OFF) ──► 30.1°C (Kondisi val >= vMax terpenuhi ──► Kipas ON!)

Suhu Turun (Kipas ON):
30.1°C ──► 29.5°C (kipas tetap ON) ──► 28.5°C (kipas tetap ON) ──► 27.9°C (Kondisi val > vMin gugur ──► Kipas OFF!)
```

Dengan logika ini, ketika kipas sudah menyala, ia tidak akan langsung mati saat suhu turun ke `29.9`°C. Kipas akan terus bekerja menurunkan suhu hingga mencapai batas aman bawah di bawah `28.0`°C.

---

## 2. Algoritma Pencocokan Waktu Jadwal (Schedule Comparison)

Pencocokan waktu pada jam digital memiliki tantangan tersendiri ketika jadwal berjalan melewati tengah malam (misal jadwal lampu pemanas aktif dari pukul `22:00` malam hingga `06:00` pagi).

Jika kita membandingkan jam secara naif (`jam_sekarang >= jam_mulai && jam_sekarang < jam_selesai`), maka jadwal melewati tengah malam tersebut akan dianggap tidak valid karena angka `22` (malam) lebih besar dari `06` (pagi).

### Algoritma Konversi Menit & Rentang Melingkar
Untuk mengatasinya, kita mengubah seluruh format jam:menit menjadi angka **total menit sejak tengah malam** (`jam * 60 + menit`). Hari memiliki total `1440` menit (dari menit `0` hingga `1439`).

Perhatikan fungsi pencocokan jadwal dalam berkas [gateway/src/RelayController.cpp](file:///home/dhimasardinata/Dokumen/ta/gateway/src/RelayController.cpp):

```cpp
bool RelayController::isScheduleActive(const ScheduleConfig& cfg, int currentHour, int currentMin) const {
    if (!cfg.active || !ScheduleValidation::isScheduleConfigValid(cfg)) return false;

    // 1. Konversi ke representasi menit
    int nowMins = (currentHour * 60) + currentMin;
    int startMins = (cfg.startHour * 60) + cfg.startMin;
    int endMins = (cfg.endHour * 60) + cfg.endMin;

    // 2. Evaluasi rentang waktu
    if (startMins < endMins) {
        // Jadwal pada hari yang sama (misal 08:00 sampai 17:00)
        return (nowMins >= startMins && nowMins < endMins);
    } else {
        // Jadwal melewati tengah malam (misal 22:00 sampai 06:00)
        return (nowMins >= startMins || nowMins < endMins);
    }
}
```

### Penjelasan Logika Pembagian:
1.  **Jika `startMins < endMins`** (Contoh: `08:00` ke `17:00` -> `480` ke `1020` menit):
    Waktu sekarang (`nowMins`) harus berada di tengah-tengah kedua batas tersebut.
    *Logika: `nowMins >= 480 AND nowMins < 1020`.*
2.  **Jika `startMins >= endMins`** (Contoh: `22:00` ke `06:00` -> `1320` ke `360` menit):
    Waktu sekarang aktif jika ia berada di ujung malam hari sebelum jam 24:00 (dari menit `1320` s/d `1439`) **ATAU** berada di awal dini hari keesokannya (dari menit `0` s/d `359`).
    *Logika: `nowMins >= 1320 OR nowMins < 360`.*

---

## 3. Prioritas Pengambilan Keputusan (Schedule vs Threshold)

Di dalam sistem otomatisasi greenhouse kita, bagaimana jika terjadi bentrok? Misalnya, sensor kelembapan mendeteksi udara sangat basah sehingga kipas exhaust harus hidup (berdasarkan Threshold), namun pada saat bersamaan ada jadwal malam hari yang memaksa exhaust mati (berdasarkan Schedule).

Sistem kita mengadopsi algoritma prioritas berjenjang dalam fungsi `updateSingleRelayState` berkas [gateway/src/RelayController.cpp](file:///home/dhimasardinata/Dokumen/ta/gateway/src/RelayController.cpp):

1.  **Prioritas 1: Override Jadwal Eksplisit (`rI` bernilai '1' atau '0')**
    Jika jadwal aktif saat ini diset ke mode `'1'` (Selalu ON) atau `'0'` (Selalu OFF), maka instruksi ini langsung dieksekusi. Evaluasi sensor diabaikan (`logicDetermined = true`).
2.  **Prioritas 2: Delegasi Sensor (`rI` bernilai '2')**
    Jika jadwal aktif saat ini diset ke mode `'2'` (Threshold) atau tidak ada jadwal yang aktif, maka evaluasi dilanjutkan ke pembacaan sensor fisik. Keputusan akhir sakelar ditentukan oleh algoritma **Deadband Hysteresis** sensor.
3.  **Prioritas 3: Pertahankan Status Terakhir (*Failsafe Hold*)**
    Jika sistem kehilangan pembacaan sensor fisik dan tidak ada jadwal terdaftar, status relai akan dipertahankan pada kondisi terakhirnya demi keamanan perangkat.

Pemahaman alur prioritas ini sangat penting bagi developer agar tidak bingung ketika menganalisis mengapa suatu kipas atau pompa tiba-tiba mati/hidup di lapangan.

---

## Ringkasan Akhir

Dengan selesainya bab algoritma dasar ini, Anda kini telah memahami dasar-dasar logika pemrograman yang menopang seluruh sistem Smart Greenhouse. Dari mulai pengenalan program, variabel, perulangan, penanganan error (debugging), struktur file repositori, hingga ke algoritma otomatisasi tingkat lanjut.

Selamat melanjutkan pengembangan dan semoga sukses dengan proyek Tugas Akhir Anda!

---

Kembali ke halaman utama: **[Peta Belajar](../00-start-here/peta-belajar.md)**.
