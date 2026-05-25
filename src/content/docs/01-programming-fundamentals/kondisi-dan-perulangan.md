---
title: "Kondisi dan Perulangan"
---

# Kondisi dan Perulangan

Halo, rekan developer! Pada bab ini, kita akan membahas bagaimana program mengambil keputusan (**kondisi**) dan melakukan pekerjaan berulang (**perulangan**).

Tanpa kedua struktur kontrol ini, program kita hanya bisa berjalan lurus dari atas ke bawah. Padahal, sistem greenhouse kita dituntut untuk responsif terhadap perubahan lingkungan secara terus-menerus.

Mari kita bedah implementasi nyata struktur kontrol ini langsung dari berkas kode proyek kita!

---

## 1. Kondisi (If-Else & Switch-Case)

Struktur kondisi digunakan untuk mengontrol jalannya program berdasarkan syarat tertentu.

### A. Contoh Logika Hysteresis (If-Else dalam Lambda C++)
Pada Gateway, kita memiliki fitur *deadband hysteresis* untuk mengendalikan kipas blower atau exhaust. Logika ini mencegah aktuator mati-nyala berulang kali dalam waktu singkat (*chattering*) saat suhu berada tepat di batas ambang.

Buka berkas [gateway/src/RelayController.cpp](file:///home/dhimasardinata/Dokumen/ta/gateway/src/RelayController.cpp). Di dalamnya terdapat fungsi ekspresi lambda berikut:

```cpp
auto applyDeadband = [&](float val, float vMin, float vMax) -> bool {
    if (states[rI]) {
        // Jika relai saat ini SEDANG AKTIF (ON)
        // Tetap nyalakan jika suhu/kelembapan di atas batas minimum (vMin)
        return (val > vMin);
    }
    // Jika relai saat ini SEDANG MATI (OFF)
    // Nyalakan hanya jika suhu/kelembapan sudah mencapai atau melewati batas maksimum (vMax)
    return (val >= vMax);
};
```

**Penjelasan Alur Logika**:
1.  Program memeriksa status relai saat ini lewat `states[rI]`.
2.  **Kondisi pertama (`if`)**: Jika relai sudah aktif, kipas tidak akan langsung mati ketika suhu turun sedikit di bawah batas maksimal (`vMax`). Kipas baru mati jika suhu benar-benar turun melewati batas bawah (`vMin`).
3.  **Kondisi kedua (`return`)**: Jika relai mati, kipas baru boleh hidup jika suhu naik menembus batas atas (`vMax`).

### B. Contoh Switch-Case di PHP Backend
Selain `if-else`, kita menggunakan `switch` ketika ada banyak pilihan nilai yang spesifik. Misalnya, untuk menentukan resolusi waktu grafik berdasarkan rentang jam yang dipilih pengguna.

Berikut adalah potongan logika dalam berkas [web/ApiController.php](file:///home/dhimasardinata/Dokumen/ta/web/ApiController.php):

```php
$sub = match ($range) {
    'last_1h' => Carbon::now()->subHour(),
    'last_1w' => Carbon::now()->subWeek(),
    'last_1m' => Carbon::now()->subMonth(),
    'today'   => Carbon::today(),
    default   => Carbon::now()->subDay(),
};
```
*(Catatan: Ekspresi `match` pada PHP 8+ berfungsi serupa dengan `switch-case` klasik tetapi dengan sintaksis yang lebih ringkas).*

---

## 2. Perulangan (Loops - For & Foreach)

Perulangan digunakan untuk memproses kumpulan data (seperti array data sensor atau daftar jadwal) tanpa perlu menulis kode yang sama berulang kali.

### A. Perulangan Menghitung Rata-Rata Sensor di PHP
Ketika memuat dashboard, sistem akan menghitung rata-rata nilai sensor hari ini untuk ditampilkan pada grafik gauge. Kita mengiterasi hasil snapshot database menggunakan perulangan `foreach`.

Buka berkas [web/ApiController.php](file:///home/dhimasardinata/Dokumen/ta/web/ApiController.php) pada fungsi `get_average_sensor_data`:

```php
$result = [
    'temperature' => 0,
    'humidity' => 0,
    'light_intensity' => 0,
    'last_recorded_at' => null,
];

// Perulangan foreach mengiterasi baris demi baris data dari database
foreach ($snapshot as $row) {
    // Normalisasi nama kolom sensor menjadi snake_case
    $key = strtolower(str_replace(' ', '_', $row->name));

    if (array_key_exists($key, $result)) {
        // Simpan nilai rata-rata yang telah dibulatkan ke dalam array hasil
        $result[$key] = round($row->avg_value, 2);

        // Periksa kondisi apakah waktu rekam data ini adalah yang terbaru
        if (!$result['last_recorded_at'] || $row->last_recorded_at > $result['last_recorded_at']) {
            $result['last_recorded_at'] = $row->last_recorded_at;
        }
    }
}
```

**Mengapa Perulangan ini Penting?**
Hasil query `$snapshot` berisi daftar rata-rata suhu, kelembapan, dan cahaya. Menggunakan perulangan `foreach`, kita dapat secara dinamis memetakan nilai-nilai tersebut ke dalam array asosiatif `$result` terlepas dari urutan data yang dikembalikan oleh database.

### B. Perulangan Mencocokkan Jadwal Aktif di C++
Pada firmware Gateway, program harus memeriksa daftar jadwal kontrol yang tersimpan untuk menentukan apakah ada jadwal yang aktif saat ini.

Perhatikan perulangan `for` dalam berkas [gateway/src/RelayController.cpp](file:///home/dhimasardinata/Dokumen/ta/gateway/src/RelayController.cpp):

```cpp
for (int i = 0; i < MAX_SCHEDULES; i++) {
    if (isScheduleActive(activeSchedules[i], currentHour, currentMin)) {
        lastScheduleActive[rI] = true;
        lastScheduleId[rI] = activeSchedules[i].id;

        // Tentukan mode aktuator berdasarkan indeks relai
        if (rI == RELAY_EXHAUST) scheduledMode = activeSchedules[i].r1Mode;
        else if (rI == RELAY_DEHUMIDIFIER) scheduledMode = activeSchedules[i].r2Mode;
        else if (rI == RELAY_BLOWER) scheduledMode = activeSchedules[i].r3Mode;
        break; // Hentikan perulangan jika jadwal aktif sudah ditemukan
    }
}
```

Di sini, perulangan `for` melakukan iterasi dari `i = 0` hingga kurang dari `MAX_SCHEDULES`. Begitu program menemukan jadwal yang cocok dengan jam saat ini melalui fungsi `isScheduleActive`, program akan menyimpan konfigurasi mode aktuator lalu memicu perintah `break` untuk segera keluar dari perulangan demi efisiensi CPU mikrokontroler.

---

## Tips Developer: Hati-Hati dengan Infinite Loop!
Di lingkungan mikrokontroler, perulangan yang tidak terkontrol (seperti `while(true)` tanpa jeda) dapat menyebabkan watchdog timer (WDT) mereset perangkat secara paksa karena CPU dianggap macet. Selalu pastikan ada kondisi keluar (*exit condition*) yang jelas atau gunakan interval non-blocking menggunakan timer.

---

Lanjutkan ke langkah berikutnya: **[Fungsi dan Parameter](./fungsi-dan-parameter.md)**.
