---
title: "WSN"
---

# WSN

WSN adalah Wireless Sensor Network, yaitu jaringan sensor nirkabel. Dalam sistem greenhouse, WSN berarti beberapa node sensor dapat mengirim data tanpa kabel data langsung ke server.

## Peran WSN

WSN membantu menempatkan sensor di beberapa titik greenhouse. Setiap node dapat membaca kondisi lokasi tertentu.

Contoh alur:

1. Node 1 membaca area dekat pintu.
2. Node 2 membaca area tengah greenhouse.
3. Node 3 membaca area dekat aktuator.
4. Data dikirim ke gateway atau server.
5. Sistem melihat kondisi secara lebih menyeluruh.

## Keuntungan

- pemasangan lebih fleksibel,
- data bisa berasal dari beberapa titik,
- tidak perlu kabel data panjang,
- cocok untuk pemantauan area greenhouse.

## Tantangan

- sinyal Wi-Fi bisa lemah,
- packet loss bisa terjadi,
- delay bisa berubah,
- daya perangkat harus stabil,
- setiap node perlu identitas yang jelas.

## Hubungan dengan TA

WSN berkaitan langsung dengan pengujian QoS seperti RSSI, delay, throughput, dan data loss. Dokumentasi pengujian nanti harus menjelaskan cara data ini diukur jika bukti pengujian tersedia.

Lanjutkan ke [Topologi Star](./topologi-star.md).
