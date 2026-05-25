---
title: "Laravel, Vue, and Android"
---

# Laravel, Vue, and Android

Sistem pemantauan greenhouse ini dirancang menggunakan arsitektur **tiga lapis** (Three-Tier Architecture) yang terintegrasi secara dinamis.
1. **Backend (Laravel)** mengelola logika bisnis, penyimpanan data, validasi, dan notifikasi cloud.
2. **Frontend (Vue.js)** menyajikan dasbor interaktif, grafik analisis, dan kontrol aktuator.
3. **Mobile Client (Android)** membungkus antarmuka web melalui kontainer WebView asli (*native*) agar dapat diakses dari smartphone, lengkap dengan sistem notifikasi peringatan dini.

---

## 1. Pembagian Tugas dan Alokasi File

| Lapisan | Teknologi | Peran & Tanggung Jawab | File Terkait |
| :--- | :--- | :--- | :--- |
| **Backend API** | Laravel | Menyediakan endpoint REST API untuk menerima data dari hardware dan mengontrol database. | [PageController.php](file:///home/dhimasardinata/Dokumen/ta/web/PageController.php) |
| **Frontend UI** | Vue.js + Inertia.js | Menerima data awal (*props*) dari Laravel, mengelola state reaktif di browser, dan mengirim aksi kontrol pengguna. | [Controlling.vue](file:///home/dhimasardinata/Dokumen/ta/web/Controlling.vue) |
| **Mobile App** | Android Kotlin | Menampilkan web dasbor di dalam aplikasi native dan berlangganan notifikasi darurat. | [MainActivity.kt.txt](file:///home/dhimasardinata/Dokumen/ta/android/MainActivity.kt.txt) |

---

## 2. Alur Pengolahan Data Integratif

Mari kita ambil satu contoh alur operasional: **Deteksi Kabut Otomatis**.

1. **Hardware (Node Kamera)**: Node kamera mengambil foto kondisi greenhouse, mendeteksi keberadaan kabut secara lokal, lalu mengirimkan payload data ke backend Laravel melalui fungsi `saveCameraData` di [ApiController.php](file:///home/dhimasardinata/Dokumen/ta/web/ApiController.php).
2. **Laravel Backend**: Jika database mencatat `isFoggy = true`, Laravel akan memicu pengiriman notifikasi cloud menggunakan **Firebase Cloud Messaging (FCM)** ke topik `"peringatan_kabut"`.
3. **Android Client**: Aplikasi Android ([MainActivity.kt.txt](file:///home/dhimasardinata/Dokumen/ta/android/MainActivity.kt.txt)) yang berjalan di ponsel pintar operator telah berlangganan (*subscribed*) ke topik tersebut saat inisialisasi:
   ```kotlin
   FirebaseMessaging.getInstance().subscribeToTopic("peringatan_kabut")
       .addOnCompleteListener { task ->
           if (task.isSuccessful) Log.d("FCM_TOPIC", "Sukses gabung grup peringatan_kabut!")
       }
   ```
4. **Notifikasi Diterima**: Jika konfigurasi Firebase dan service penerima Android lengkap tersedia, perangkat operator dapat menerima notifikasi dari topic tersebut. Pada snapshot Android yang terlihat, deklarasi service ada di manifest, tetapi source `MyFirebaseMessagingService` belum terlihat.

---

## 3. Jembatan Unduh File Android-JavaScript (Bridge)

Di dalam browser desktop, mengunduh file log CSV dapat dilakukan dengan mudah menggunakan URL Blob JavaScript standar. Namun, di dalam kontainer **Android WebView**, browser bawaan tidak memiliki akses langsung ke folder penyimpanan lokal handphone secara otomatis.

Untuk memecahkan masalah ini, [MainActivity.kt.txt](file:///home/dhimasardinata/Dokumen/ta/android/MainActivity.kt.txt) menyediakan jembatan JavaScript (*JavaScript Interface*) bernama `AndroidBlobHandler`:

```kotlin
// Inisialisasi jembatan di Android
webView.addJavascriptInterface(object : Any() {
    @android.webkit.JavascriptInterface
    fun getBase64FromBlobData(base64Data: String, mimetype: String, fileName: String) {
        convertBase64ToLogAndDownload(base64Data, mimetype, fileName)
    }
}, "AndroidBlobHandler")
```

Ketika WebView menerima URL download berawalan `blob:`, kode Android:
1. mengenali URL `blob:` di `setDownloadListener`,
2. menyuntikkan JavaScript dengan `evaluateJavascript`,
3. membaca blob sebagai DataURL Base64 melalui `FileReader`,
4. memanggil `AndroidBlobHandler.getBase64FromBlobData`,
5. mendekode Base64 di Kotlin dan mencoba menulis hasilnya ke folder Downloads.

Catatan batas fakta: jalur tulis langsung ke Downloads perlu diuji pada target Android modern. Jika gagal karena aturan Scoped Storage, implementasi bisa perlu dipindahkan ke `MediaStore`, Storage Access Framework, atau jalur `DownloadManager`.

---

## Modul Terkait

Untuk mendalami setiap aspek teknologi ini, Anda dapat merujuk ke modul berikut:
- [Laravel API dan Database Query](./web-laravel-api-database.md)
- [Vue Reactivity dan UI Greenhouse](./web-vue-reactivity-ui.md)
- [Next.js, Fumadocs, dan Search Docs](./docs-platform-next-fumadocs.md)
