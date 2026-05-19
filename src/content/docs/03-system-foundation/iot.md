---
title: "IoT"
---

# IoT

IoT adalah singkatan dari Internet of Things. Dalam bahasa sederhana, IoT berarti benda fisik yang bisa membaca kondisi, mengirim data, atau menerima perintah melalui jaringan.

## IoT dalam Sistem Greenhouse

Pada sistem ini, perangkat IoT dapat berupa node sensor dan gateway. Node membaca kondisi lingkungan, sedangkan gateway membantu pengambilan data dan kendali aktuator.

```mermaid
flowchart LR
    A[Sensor] --> B[Node IoT]
    B --> C[Jaringan]
    C --> D[Server]
    D --> E[Dashboard]
```

## Kenapa IoT Dipakai

IoT dipakai karena greenhouse perlu dipantau secara berkala. Jika data hanya dicatat manual, perubahan kondisi bisa terlambat diketahui.

Dengan IoT, sistem dapat:

- membaca data lebih sering,
- menyimpan data historis,
- menampilkan data jarak jauh,
- menjalankan kontrol otomatis,
- membantu pengujian kualitas jaringan.

## Bagian yang Harus Diperhatikan

IoT tidak hanya soal mengirim data. Hal penting lain:

- sensor bisa gagal baca,
- Wi-Fi bisa putus,
- server bisa tidak merespons,
- perangkat bisa kehilangan daya,
- data bisa perlu disimpan sementara,
- komunikasi perlu diamankan.

Lanjutkan ke [WSN](./wsn.md).
