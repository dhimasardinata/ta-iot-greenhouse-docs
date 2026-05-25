---
title: "Android File Reference"
description: "Peta referensi berkas kode sumber aplikasi client Android Tugas Akhir, lokasi berkas fisik di repositori, serta deskripsi fungsional masing-masing komponen."
---

# Android File Reference

Bagian ini menyediakan indeks tautan langsung ke berkas Android yang terlihat pada snapshot. Folder [android/](file:///home/dhimasardinata/Dokumen/ta/android/) saat ini berisi tiga file teks utama, bukan project Gradle lengkap.

---

## Indeks Berkas Kode Sumber

Berikut adalah daftar berkas fisik utama yang membentuk aplikasi client Android beserta perannya:

### 1. [AndroidManifest.xml.txt](file:///home/dhimasardinata/Dokumen/ta/android/AndroidManifest.xml.txt)
*   **Lokasi Repositori**: `/home/dhimasardinata/Dokumen/ta/android/AndroidManifest.xml.txt`
*   **Tipe Berkas**: Konfigurasi Manifes XML
*   **Peran Utama**:
    *   Mendefinisikan package placeholder dan referensi theme/resource.
    *   Mendaftarkan kelas aktivitas utama `MainActivity` sebagai titik masuk (*launcher entrypoint*) aplikasi.
    *   Mendaftarkan izin sistem standar (`INTERNET`, `ACCESS_NETWORK_STATE`) dan izin penyimpanan luar (`WRITE_EXTERNAL_STORAGE`, `READ_EXTERNAL_STORAGE`) dengan batasan versi SDK.
    *   Mendeklarasikan service Firebase Cloud Messaging `MyFirebaseMessagingService`; source service tersebut belum terlihat di snapshot.

### 2. [activity_main.xml.txt](file:///home/dhimasardinata/Dokumen/ta/android/activity_main.xml.txt)
*   **Lokasi Repositori**: `/home/dhimasardinata/Dokumen/ta/android/activity_main.xml.txt`
*   **Tipe Berkas**: Layout Antarmuka XML
*   **Peran Utama**:
    *   Menyusun struktur hierarki komponen UI pada layar utama menggunakan `RelativeLayout` dengan kecocokan batas jendela (`fitsSystemWindows="true"`).
    *   Menyediakan komponen penampung loading screen (`loadingScreen` dengan `LinearLayout`) berisi `ImageView` ikon peluncur, ProgressBar spinner pemuatan, dan TextView teks `"Memuat Atomic..."`.
    *   Menyediakan komponen mesin rendering WebView (`webView`) yang diletakkan menumpuk di latar belakang dengan visibilitas awal disembunyikan (`gone`).

### 3. [MainActivity.kt.txt](file:///home/dhimasardinata/Dokumen/ta/android/MainActivity.kt.txt)
*   **Lokasi Repositori**: `/home/dhimasardinata/Dokumen/ta/android/MainActivity.kt.txt`
*   **Tipe Berkas**: Berkas Kode Kotlin (Activity)
*   **Peran Utama**:
    *   Mengatur alur inisiasi aplikasi pada metode daur hidup `onCreate()`.
    *   Menginisialisasi Firebase Messaging, mengambil token perangkat untuk Logcat, dan berlangganan ke topik siaran `"peringatan_kabut"`.
    *   Mengatur konfigurasi internal WebView (mengaktifkan Javascript dan DOM Storage).
    *   Mendaftarkan jembatan Javascript native `AndroidBlobHandler` untuk menangkap pengiriman string ekspor CSV Base64.
    *   Memasang `DownloadListener` untuk menangani pemisahan tipe unduhan berkas (skema URL standar didelegasikan ke `DownloadManager` sistem, skema URL `blob:` diintersepsi menggunakan teknik injeksi script JS evaluasi instan).
    *   Mengontrol visibilitas kontainer layout loading screen dan WebView pada event `onPageFinished()` serta melakukan pencatatan log jika terjadi error jaringan di `onReceivedError()`.
    *   Melakukan operasi konversi string Base64 biner kembali menjadi array byte dan menulisnya ke disk penyimpanan direktori Downloads fisik ponsel di dalam blok `try-catch` terproteksi.

---

## Status Cakupan Berkas Walkthrough

Berkas di atas juga muncul pada walkthrough lengkap. Jika project Android lengkap tersedia di luar snapshot ini, file Gradle, resource, dan service Firebase perlu ditambahkan ke dokumentasi secara terpisah.
