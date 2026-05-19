---
title: "Algoritma Dasar"
---

# Algoritma Dasar

Algoritma adalah langkah-langkah untuk menyelesaikan masalah. Dalam sistem TA IoT Greenhouse, algoritma dipakai untuk membaca data, mengirim data, mengambil keputusan, dan menangani error.

## Contoh Algoritma Pembacaan Sensor

Contoh alur sederhana:

1. Nyalakan sensor atau pastikan sensor siap.
2. Baca suhu, kelembapan, dan cahaya.
3. Cek apakah nilai masuk akal.
4. Simpan nilai ke struktur data.
5. Kirim data ke server atau gateway.
6. Jika gagal, simpan ke cache.

Detail nyata harus dilihat pada file firmware.

## Retry Logic

Retry logic adalah logika mencoba ulang jika sesuatu gagal.

Contoh:

1. Kirim data ke server.
2. Jika gagal, tunggu sebentar.
3. Coba lagi.
4. Jika tetap gagal, simpan data ke cache.

Retry harus punya batas. Jika tidak, perangkat bisa terus mencoba tanpa henti dan mengganggu pekerjaan lain.

## Timeout

Timeout adalah batas waktu menunggu. Jika server tidak menjawab dalam batas waktu tertentu, program berhenti menunggu dan mengambil tindakan lain.

Timeout penting agar firmware tidak macet saat jaringan buruk.

## Queue dan Buffer

Queue adalah antrean. Data yang masuk duluan biasanya diproses duluan. Ini disebut FIFO: First In, First Out.

Buffer adalah tempat penampungan sementara. Pada firmware, ukuran buffer harus dibatasi karena RAM kecil.

## Caching

Caching adalah menyimpan data sementara agar tidak hilang saat jaringan gagal.

Dalam sistem IoT, caching membantu menjaga data sensor tetap aman walaupun koneksi ke server sedang bermasalah.

## Threshold Decision

Threshold decision adalah keputusan berdasarkan batas tertentu.

Contoh:

```txt
Jika suhu lebih dari batas, fan menyala.
Jika kelembapan lebih dari batas, dehumidifier menyala.
```

Logika threshold harus jelas karena langsung berhubungan dengan kondisi greenhouse.

## Scheduling Decision

Scheduling decision adalah keputusan berdasarkan jadwal. Misalnya aktuator menyala pada jam tertentu.

Jika scheduling dan threshold sama-sama ada, dokumentasi harus menjelaskan prioritasnya: apakah jadwal mengalahkan threshold, atau sebaliknya. Jika belum jelas dari kode, tulis `Belum terkonfirmasi dari kode`.

## Kesimpulan

Algoritma adalah langkah kerja. Di sistem ini, algoritma penting muncul pada sensor, retry, cache, API, threshold, scheduling, OTA, dan pengujian QoS.

Lanjutkan ke [Debugging Dasar](./debugging-dasar.md).
