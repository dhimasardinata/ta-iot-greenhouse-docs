---
title: "android/AndroidManifest.xml.txt"
---

# android/AndroidManifest.xml.txt

File ini adalah salinan manifest Android. Manifest adalah file pengenal aplikasi: Android membaca file ini untuk tahu permission apa yang diminta, Activity mana yang pertama dibuka, dan service apa yang boleh berjalan.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `android/AndroidManifest.xml.txt` |
| Komponen | Android WebView |
| Level | Pemula |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Kenapa File Ini Ada

Aplikasi Android pada proyek TA ini membuka dashboard web melalui WebView. Manifest dibutuhkan agar aplikasi bisa:

- memakai internet,
- mengetahui status jaringan,
- menulis atau membaca file download pada versi Android lama,
- membuka `MainActivity` saat ikon aplikasi ditekan,
- dan mendaftarkan service Firebase Cloud Messaging.

## Kapan File Ini Dipakai

File ini dipakai oleh sistem build Android saat APK dibuat, lalu dipakai Android saat aplikasi di-install dan dijalankan.

## Siapa yang Memanggil File Ini

Pengguna tidak memanggil manifest secara langsung. Android OS dan proses build yang membacanya.

## Isi Penting

Permission yang terlihat:

- `INTERNET`
- `ACCESS_NETWORK_STATE`
- `WRITE_EXTERNAL_STORAGE` sampai SDK 29
- `READ_EXTERNAL_STORAGE` sampai SDK 32

Komponen aplikasi yang terlihat:

- `.MainActivity`
- `.MyFirebaseMessagingService`

`MainActivity` memiliki intent launcher, jadi Activity ini menjadi pintu masuk aplikasi.

## Data Masuk dan Keluar

Manifest tidak memproses data sensor. Inputnya adalah deklarasi XML. Outputnya adalah perilaku aplikasi saat di-install dan dijalankan oleh Android.

## Error yang Mungkin Terjadi

- Jika `INTERNET` hilang, WebView tidak bisa membuka dashboard.
- Jika service FCM tidak cocok dengan class sebenarnya, notifikasi bisa gagal.
- Jika permission storage tidak cocok dengan target Android baru, download/export bisa bermasalah.
- Jika Activity launcher salah, aplikasi bisa tidak punya layar utama.

## Bagian untuk Pemula

Anggap manifest seperti kartu identitas aplikasi. Isinya memberi tahu Android, "aplikasi ini butuh internet dan layar pertamanya adalah MainActivity".

## Bagian Advanced

`android:exported="true"` pada Activity launcher memang diperlukan untuk Activity yang punya intent filter launcher pada Android modern. Namun service FCM yang juga `exported="true"` perlu ditinjau lagi saat file Android asli tersedia, karena service notifikasi biasanya perlu dibatasi sesuai kebutuhan.

## Hubungan ke Sistem TA

Manifest mengaktifkan sisi mobile dari sistem. Tanpa file ini, aplikasi Android tidak bisa menjadi pintu masuk pengguna ke dashboard greenhouse.

Lanjutkan ke [android/activity_main.xml.txt](./activity_main.xml.txt.md).
