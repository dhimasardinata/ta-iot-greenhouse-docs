---
title: "Fungsi dan Parameter"
---

# Fungsi dan Parameter

Fungsi adalah bagian program yang diberi nama dan menjalankan tugas tertentu. Fungsi membantu kode lebih rapi karena tugas besar bisa dipecah menjadi bagian kecil.

## Contoh Fungsi

Dalam sistem greenhouse, fungsi bisa dipakai untuk:

- membaca sensor,
- membuat payload JSON,
- mengirim data ke server,
- menyimpan cache,
- membaca jadwal,
- menyalakan relay,
- menampilkan data ke LCD,
- memproses command terminal.

Nama fungsi nyata harus dilihat dari kode file masing-masing.

## Parameter

Parameter adalah data yang diberikan kepada fungsi.

Contoh sederhana:

```txt
kirimDataSensor(suhu, kelembapan, cahaya)
```

Di contoh ini, `suhu`, `kelembapan`, dan `cahaya` adalah data yang diberikan ke fungsi.

## Return Value

Return value adalah data yang dikembalikan oleh fungsi.

Contoh:

```txt
bacaSuhu() mengembalikan angka suhu.
validasiToken() mengembalikan benar atau salah.
ambilThreshold() mengembalikan data batas suhu dan kelembapan.
```

Tidak semua fungsi mengembalikan nilai. Ada fungsi yang hanya melakukan aksi, seperti menyalakan relay atau menulis log.

## Kenapa Fungsi Penting

Fungsi penting karena memudahkan pembaca mencari tanggung jawab kode.

Saat membaca fungsi, tanyakan:

1. Tujuan fungsi ini apa?
2. Parameter apa yang masuk?
3. Nilai apa yang keluar?
4. Fungsi ini memanggil apa?
5. Fungsi ini dipanggil oleh siapa?
6. Apa efek sampingnya?
7. Apa yang terjadi jika error?

## Method dan Class

Pada bahasa seperti C++ dan Kotlin, fungsi bisa berada di dalam class. Fungsi yang berada di dalam class sering disebut method.

Class dapat dianggap seperti cetakan untuk membuat object. Object menyimpan data dan fungsi yang berhubungan.

Contoh konsep:

- class sensor manager mengurus sensor,
- class cache manager mengurus cache,
- class network manager mengurus jaringan.

Nama class nyata harus diverifikasi dari kode.

## Kesimpulan

Fungsi memecah program menjadi tugas kecil. Parameter adalah data masuk. Return value adalah data keluar. Untuk dokumentasi file-by-file, fungsi adalah salah satu bagian paling penting yang harus dijelaskan.

Lanjutkan ke [Array, Object, Struct, dan Enum](./array-object-struct-enum.md).
