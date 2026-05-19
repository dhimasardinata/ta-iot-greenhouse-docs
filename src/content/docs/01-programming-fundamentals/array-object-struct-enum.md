---
title: "Array, Object, Struct, dan Enum"
---

# Array, Object, Struct, dan Enum

Program sering perlu menyimpan banyak data atau data yang memiliki beberapa bagian. Untuk itu, program memakai struktur seperti array, object, struct, dan enum.

## Array

Array adalah kumpulan data dalam satu nama.

Contoh sederhana:

```txt
data_suhu = [25.1, 25.4, 25.2]
```

Array berguna jika program menyimpan banyak nilai sejenis, seperti beberapa pembacaan sensor atau daftar data yang akan dikirim.

## Object

Object adalah data yang punya nama bagian.

Contoh payload sensor:

```json
{
  "temperature": 25.4,
  "humidity": 82.1,
  "light": 500
}
```

Object mudah dibaca karena setiap nilai punya nama.

## Struct

Struct adalah struktur data yang sering dipakai di C atau C++. Struct mirip object sederhana. Struct mengelompokkan beberapa nilai yang berhubungan.

Contoh konsep:

```txt
SensorData berisi suhu, kelembapan, cahaya, dan waktu.
```

Struct membantu firmware membawa data sensor antar fungsi tanpa membuat banyak parameter terpisah.

## Enum

Enum adalah daftar pilihan tetap.

Contoh mode sistem:

```txt
Mode = cloud, edge, auto
```

Enum membantu program menghindari nilai sembarang. Jika mode hanya boleh tiga pilihan, enum membuat pilihan itu lebih jelas.

## JSON

JSON adalah format data yang sering dipakai saat API berkomunikasi. JSON mudah dibaca manusia dan banyak dipakai di web.

Contoh:

```json
{
  "gh_id": 1,
  "node_id": 4,
  "temperature": 25.4
}
```

Node, gateway, backend, dan frontend dapat memakai JSON untuk saling bertukar data.

## Kesimpulan

Array menyimpan banyak nilai. Object dan struct mengelompokkan data yang punya nama. Enum membatasi pilihan. JSON menjadi format umum untuk pertukaran data antar komponen.

Lanjutkan ke [Algoritma Dasar](./algoritma-dasar.md).
