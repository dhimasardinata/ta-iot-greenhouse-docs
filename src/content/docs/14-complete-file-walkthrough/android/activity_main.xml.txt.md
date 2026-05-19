---
title: "android/activity_main.xml.txt"
---

# android/activity_main.xml.txt

File ini adalah layout layar utama aplikasi Android. Layout menentukan susunan tampilan yang dilihat pengguna sebelum dan sesudah dashboard web selesai dimuat.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `android/activity_main.xml.txt` |
| Komponen | Android WebView |
| Level | Pemula |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Kenapa File Ini Ada

`MainActivity.kt.txt` memanggil `setContentView(R.layout.activity_main)`. Artinya Activity membutuhkan layout bernama `activity_main`.

Layout ini menyediakan dua elemen utama:

- `loadingScreen`, yaitu tampilan loading saat dashboard belum selesai dimuat.
- `webView`, yaitu tempat dashboard web TA ditampilkan.

## Kapan File Ini Dipakai

File ini dipakai saat `MainActivity` dibuat. Setelah halaman web selesai dimuat, kode Kotlin menyembunyikan loading screen dan menampilkan WebView.

## Siapa yang Memanggil File Ini

`MainActivity.kt.txt` memanggil layout ini melalui:

```kotlin
setContentView(R.layout.activity_main)
```

Lalu mengambil elemen dengan:

```kotlin
findViewById<WebView>(R.id.webView)
findViewById<LinearLayout>(R.id.loadingScreen)
```

## Isi Penting

Root layout:

- `RelativeLayout`
- lebar dan tinggi `match_parent`
- background putih
- `fitsSystemWindows="true"`

Loading screen:

- icon aplikasi,
- progress bar,
- teks `Memuat Atomic...`.

WebView:

- id `webView`,
- memenuhi layar,
- awalnya `gone`.

## Data Masuk dan Keluar

Layout ini tidak mengambil data dari sensor atau server. File ini hanya mendefinisikan tampilan awal. Data web akan muncul setelah `WebView` memuat URL dari `MainActivity`.

## Error yang Mungkin Terjadi

- Jika id `webView` berubah, `MainActivity` tidak bisa menemukan WebView.
- Jika id `loadingScreen` berubah, layar loading tidak bisa disembunyikan.
- Jika WebView tetap `gone`, dashboard tidak terlihat walaupun halaman sudah selesai.
- Jika teks loading terlalu spesifik ke nama lama, dokumentasi TA perlu menjelaskan bahwa ini label UI, bukan nama proyek.

## Bagian untuk Pemula

File XML ini seperti denah layar. Kotlin mengatur perilakunya, sedangkan XML ini mengatur benda apa saja yang ada di layar.

## Bagian Advanced

Layout memakai `RelativeLayout`, bukan ConstraintLayout. Untuk layar sederhana ini masih cukup. Jika nanti UI Android bertambah kompleks, layout yang lebih modern bisa dipertimbangkan.

## Hubungan ke Sistem TA

File ini membuat aplikasi Android terasa seperti aplikasi, bukan layar kosong. Pengguna melihat loading dulu, lalu dashboard greenhouse muncul setelah halaman web selesai.

Lanjutkan ke [android/MainActivity.kt.txt](./MainActivity.kt.txt.md).
