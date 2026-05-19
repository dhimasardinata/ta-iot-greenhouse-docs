---
title: "Variabel dan Tipe Data"
---

# Variabel dan Tipe Data

Variabel adalah tempat menyimpan nilai. Program memakai variabel agar data bisa dibaca, diubah, dibandingkan, atau dikirim.

## Contoh Variabel

Dalam sistem greenhouse, nilai yang sering disimpan antara lain:

| Contoh Nama | Arti |
|---|---|
| `temperature` | Nilai suhu. |
| `humidity` | Nilai kelembapan. |
| `light` | Nilai intensitas cahaya. |
| `gh_id` | Identitas greenhouse. |
| `node_id` | Identitas node sensor. |
| `token` | Kode autentikasi. |
| `recorded_at` | Waktu data dicatat. |

Nama variabel bisa berbeda di tiap file. Halaman file terkait menjelaskan variabel nyata yang ada di file tersebut.

## Tipe Data

Tipe data memberi tahu jenis nilai yang disimpan.

| Tipe | Arti Sederhana | Contoh |
|---|---|---|
| Integer | Bilangan bulat | `1`, `100`, `-5` |
| Float / Double | Bilangan dengan koma | `25.4`, `82.1` |
| String | Teks | `"GH1"`, `"online"` |
| Boolean | Benar atau salah | `true`, `false` |
| Array | Kumpulan banyak nilai | daftar data sensor |
| Object / Struct | Kumpulan data dengan nama field | satu payload sensor |

## Kenapa Tipe Data Penting

Tipe data penting karena program perlu tahu cara memperlakukan nilai.

Contoh:

- suhu cocok memakai float karena bisa memiliki angka desimal,
- ID biasanya integer atau string,
- status hidup/mati cocok memakai boolean,
- payload API sering dikirim sebagai object JSON.

Jika tipe data salah, program bisa gagal membaca data, salah menghitung, atau salah mengirim response.

## Konstanta

Konstanta mirip variabel, tetapi nilainya tidak seharusnya berubah selama program berjalan. Contohnya batas maksimal antrean, URL API tetap, atau pin hardware tertentu.

Pada firmware, konstanta penting karena bisa menentukan pin sensor, pin relay, interval kirim data, atau ukuran buffer.

## Variabel di Firmware

Firmware berjalan di perangkat dengan memori terbatas. Karena itu, variabel berukuran besar perlu diperhatikan karena bisa memenuhi RAM dan menyebabkan perangkat tidak stabil.

Karena itu dokumentasi file firmware mencatat:

- variabel penting,
- konstanta penting,
- ukuran buffer,
- data yang disimpan sementara,
- data yang ditulis ke flash atau filesystem.

## Kesimpulan

Variabel menyimpan nilai. Tipe data menjelaskan bentuk nilai. Dalam sistem IoT, pemilihan tipe data berpengaruh ke akurasi sensor, ukuran payload, penggunaan memori, dan keamanan data.

Lanjutkan ke [Kondisi dan Perulangan](./kondisi-dan-perulangan.md).
