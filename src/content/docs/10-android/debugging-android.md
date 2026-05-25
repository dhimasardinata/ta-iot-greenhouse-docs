---
title: "Panduan Debugging"
description: "Strategi analisis masalah aplikasi Android client menggunakan filter Logcat, inspeksi konsol JavaScript WebView jarak jauh, dan solusi pemecahan masalah umum."
---

# Panduan Debugging

Pendeteksian bug (*debugging*) pada aplikasi client Android berfokus pada pemantauan daur hidup WebView, integritas jaringan, hak akses penyimpanan, serta status pengiriman pesan push Firebase Cloud Messaging (FCM).

---

## 1. Pemantauan Logcat Sistem

Sistem logging bawaan Android (**Logcat**) merupakan alat utama untuk memantau status internal aplikasi. Dalam [MainActivity.kt.txt](file:///home/dhimasardinata/Dokumen/ta/android/MainActivity.kt.txt), terdapat tiga tag log khusus yang dipasang untuk menyaring informasi penting:

| Tag Logcat | Tingkat Log | Pemicu Kejadian | Tindakan Diagnostik |
| :--- | :--- | :--- | :--- |
| **`FCM_TOKEN`** | Debug (`Log.d`) | Muncul jika pemanggilan token FCM berhasil. | Pastikan token tercetak di log. Jika tidak muncul, periksa koneksi perangkat dan konfigurasi Firebase pada project Android lengkap. |
| **`FCM_TOPIC`** | Debug (`Log.d`) | Muncul saat pendaftaran topik `"peringatan_kabut"` berhasil dikonfirmasi. | Memastikan perangkat sukses bergabung ke antrean siaran push notifikasi sensor greenhouse. |
| **`WEBVIEW_ERROR`** | Error (`Log.e`) | Dipicu saat `onReceivedError` menangkap kegagalan muat jaringan pada WebView. | Digunakan untuk mengidentifikasi kesalahan DNS, hilangnya koneksi internet perangkat, atau server dasbor mati. |

### Perintah Penyaringan Logcat via Terminal (ADB)
Jika Anda menggunakan komputer pengembangan yang terhubung ke ponsel Android via kabel USB dengan Android Debug Bridge (ADB) aktif, jalankan perintah berikut untuk memfilter log penting ini:
```bash
adb logcat -s FCM_TOKEN:D FCM_TOPIC:D WEBVIEW_ERROR:E
```

---

## 2. Inspeksi Konsol JavaScript WebView Jarak Jauh (Remote Debugging)

Karena antarmuka aplikasi berjalan di dalam WebView, log konsol JavaScript halaman web tidak selalu terlihat langsung di Logcat. Anda dapat menghubungkan konsol browser komputer ke WebView perangkat:

### Langkah Inspeksi:
1.  **Aktifkan Opsi Pengembang**: Masuk ke pengaturan ponsel Android Anda -> *Tentang Ponsel* -> Ketuk *Build Number* sebanyak 7 kali hingga Opsi Pengembang aktif. Masuk ke Opsi Pengembang dan centang **USB Debugging**.
2.  **Hubungkan Perangkat**: Sambungkan ponsel ke komputer dengan kabel data USB.
3.  **Buka Google Chrome**: Buka browser Google Chrome di komputer Anda dan ketikkan alamat berikut di bilah alamat:
    ```text
    chrome://inspect/#devices
    ```
4.  **Temukan Target WebView**: Di bawah daftar perangkat, cari target yang memuat `https://ta.atomic.web.id/`.
5.  **Buka DevTools**: Klik **Inspect** jika target tersedia. Ketersediaan target bergantung pada mode debug/build aplikasi dan kebijakan WebView perangkat.

---

## 3. Matriks Pemecahan Masalah Umum (Troubleshooting)

| Gejala Masalah | Penyebab Kemungkinan | Solusi Penanganan |
| :--- | :--- | :--- |
| **Layar aplikasi putih kosong terus-menerus** | Perangkat kehilangan koneksi internet atau domain dasbor `ta.atomic.web.id` luring. | Periksa logcat untuk tag `WEBVIEW_ERROR`. Hubungkan ponsel ke Wi-Fi / jaringan seluler yang stabil dan luncurkan ulang aplikasi. |
| **Layar loading spinner tidak pernah hilang** | Transisi halaman WebView terhambat oleh pengalihan URL berulang (*redirect loops*) atau script macet di `onPageFinished`. | Buka inspeksi jarak jauh (`chrome://inspect`) dan periksa tab *Console* atau *Network* untuk melacak script dasbor yang gagal dimuat. |
| **Ekspor berkas CSV gagal tanpa Toast sukses** | Script injeksi Javascript tidak dapat berjalan atau string Base64 yang dikirim kosong. | Pastikan format ekspor dari sisi backend web menggunakan pemicu unduhan HTML standar agar terintersepsi oleh skrip pengunduh di Kotlin. |
| **Notifikasi peringatan embun/kabut tidak masuk** | Pendaftaran topic FCM gagal, konfigurasi Firebase belum lengkap, atau service penerima background belum tersedia. | Periksa apakah logcat menampilkan `Sukses gabung grup peringatan_kabut!`. Pastikan file Firebase config dan source `MyFirebaseMessagingService` ada di project Android lengkap. |
| **Unduhan file PDF/biasa macet di antrean** | Layanan sistem `DownloadManager` dinonaktifkan atau memori penuh. | Periksa aplikasi sistem Unduhan (*Downloads*) bawaan HP, bersihkan memori perangkat, atau setel ulang izin aplikasi di Pengaturan Sistem. |

Lanjutkan ke bagian **[Android File Reference](./file-reference/index.md)** untuk melihat indeks berkas kode sumber.
