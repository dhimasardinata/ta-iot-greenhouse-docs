---
title: "Kondisi dan Perulangan"
---

# Kondisi dan Perulangan

Program tidak selalu berjalan lurus dari atas ke bawah. Program sering perlu memilih jalan atau mengulang pekerjaan. Di sinilah kondisi dan perulangan dipakai.

## Kondisi

Kondisi adalah pertanyaan yang jawabannya benar atau salah.

Contoh dalam greenhouse:

```txt
Jika suhu lebih tinggi dari batas aman, nyalakan fan.
Jika kelembapan terlalu tinggi, aktifkan dehumidifier.
Jika Wi-Fi gagal, coba lagi atau simpan data ke cache.
```

Dalam banyak bahasa pemrograman, kondisi ditulis dengan `if`, `else`, atau `switch`.

## If dan Else

`if` berarti `jika`. Program menjalankan blok tertentu hanya jika syarat terpenuhi.

Contoh alur:

1. Baca suhu.
2. Bandingkan suhu dengan threshold.
3. Jika suhu melewati threshold, nyalakan aktuator.
4. Jika tidak, biarkan aktuator mati atau ikuti aturan lain.

## Switch atau Case

`switch` atau `case` dipakai ketika pilihan lebih dari dua. Contohnya mode sistem:

- `cloud`,
- `edge`,
- `auto`.

Mode seperti ini bisa membuat alur program berbeda sesuai kondisi jaringan dan kebutuhan sistem.

## Perulangan

Perulangan adalah proses mengulang pekerjaan.

Contoh:

```txt
Setiap beberapa detik, baca sensor.
Setiap beberapa menit, kirim data.
Selama Wi-Fi belum terhubung, coba koneksi ulang.
```

Dalam kode, perulangan sering ditulis dengan `for`, `while`, atau loop utama firmware.

## Risiko Perulangan

Perulangan harus hati-hati. Jika program terus mengulang tanpa jeda, perangkat bisa macet, watchdog bisa reset, atau jaringan bisa terlalu banyak request.

Pada firmware, perulangan perlu memperhatikan:

- delay,
- timeout,
- watchdog,
- penggunaan memori,
- batas retry,
- kondisi keluar dari loop.

## Kesimpulan

Kondisi membuat program bisa mengambil keputusan. Perulangan membuat program bisa melakukan pekerjaan berulang. Dua konsep ini sangat penting dalam pembacaan sensor, retry jaringan, caching, threshold, scheduling, dan kontrol aktuator.

Lanjutkan ke [Fungsi dan Parameter](./fungsi-dan-parameter.md).
