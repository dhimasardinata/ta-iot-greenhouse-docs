---
title: "Debugging Dasar"
---

# Debugging Dasar

Halo, rekan developer! Ketika membangun sistem terdistribusi (IoT, backend, frontend, dan mobile), masalah atau *bug* pasti akan muncul.

**Debugging** adalah proses investigasi sistematis untuk menemukan, menganalisis, dan memperbaiki masalah di dalam kode program. Debugging bukan tentang menebak secara acak, melainkan mengumpulkan bukti nyata lewat pencatatan aktivitas sistem (**Logging**).

Mari kita bahas tiga pilar logging utama yang kita gunakan untuk mendebug seluruh komponen proyek Smart Greenhouse ini.

---

## 1. Android Logcat (Proses Debugging Sisi Mobile)

Di sisi Android client ([android/MainActivity.kt.txt](file:///home/dhimasardinata/Dokumen/ta/android/MainActivity.kt.txt)), kita menggunakan utilitas kelas `android.util.Log` bawaan Android SDK untuk mengirimkan pesan log ke **Logcat** (jendela penampil log di Android Studio).

Di dalam kode Android, Anda akan melihat pemanggilan log seperti berikut:

```kotlin
// Mencatat token notifikasi Firebase Cloud Messaging (FCM) untuk pengujian
Log.d("FCM_TOKEN", "Token HP ini: ${task.result}")

// Mencatat jika terjadi error saat memuat dashboard web di dalam WebView
override fun onReceivedError(view: WebView?, request: WebResourceRequest?, error: WebResourceError?) {
    super.onReceivedError(view, request, error)
    Log.e("WEBVIEW_ERROR", "Error: ${error?.description} | URL: ${request?.url}")
}
```

### Cara Membaca Logcat:
*   `Log.d` (*Debug*): Digunakan untuk mencatat informasi umum saat pengembangan (seperti token FCM).
*   `Log.e` (*Error*): Digunakan untuk mencatat kegagalan kritis (seperti kegagalan jaringan atau URL WebView rusak).
*   Gunakan filter pencarian di Android Studio (misal mengetikkan `tag:FCM_TOKEN` atau `tag:WEBVIEW_ERROR`) untuk menyaring baris log tertentu di tengah ribuan log sistem Android lainnya.

---

## 2. WebSerial & WebSockets (Debugging Sisi Gateway/Node)

Karena perangkat mikrokontroler di lapangan tidak selalu terhubung ke komputer via kabel USB, kita menggunakan antarmuka **WebSerial** berbasis WebSocket untuk mengirimkan log debug nirkabel (*wireless debug logging*).

Buka berkas implementasi WebSerial di [gateway/src/WebSerial.cpp](file:///home/dhimasardinata/Dokumen/ta/gateway/src/WebSerial.cpp) dan panel WebSocket di [gateway/src/WebSocketManager.cpp](file:///home/dhimasardinata/Dokumen/ta/gateway/src/WebSocketManager.cpp).

Ketika Gateway beroperasi, ia memancarkan status internalnya:
*   Status koneksi Wi-Fi.
*   Log pengiriman data sensor dari node lokal.
*   Hasil dekripsi payload (berhasil dekrip teks asli atau gagal).

Jika Anda terhubung ke titik akses lokal Gateway (Access Point Mode) atau IP lokalnya via browser, Anda dapat membuka halaman konsol WebSerial bawaan. Halaman ini menangkap kiriman data dari WebSocket dan merendernya secara real-time pada browser konsol klien, sehingga Anda dapat mendebug perangkat tanpa perlu membongkar casing fisik atau mencolokkan kabel serial FTDI/USB.

---

## 3. Laravel Error Logging (Debugging Sisi Server/Backend)

Di sisi server, semua *request* API dari Gateway dan kamera diproses oleh Laravel. Jika terjadi kesalahan koneksi database atau kegagalan pengiriman push notification FCM, Laravel mencatatnya ke dalam file log lokal.

Buka berkas [web/ApiController.php](file:///home/dhimasardinata/Dokumen/ta/web/ApiController.php), kita menggunakan facade `Log` untuk mencatat error penanganan database snapshot dan notifikasi kabut:

```php
// Mencatat error jika query pembuatan snapshot sensor gagal
} catch (\Exception $e) {
    \Illuminate\Support\Facades\Log::error("Snapshot Error: " . $e->getMessage());
}

// Mencatat detail kegagalan ketika mengirim Push Notification FCM ke Firebase
} catch (\Exception $e) {
    \Illuminate\Support\Facades\Log::error('FCM Error: ' . $e->getMessage(), ['trace' => $e->getTraceAsString()]);
}
```

### Cara Membaca Log Laravel:
*   Semua kesalahan di atas ditulis ke dalam berkas log teks di server pada path `storage/logs/laravel.log`.
*   Developer dapat memantau log secara real-time dari terminal server menggunakan perintah Linux:
    ```bash
    tail -f storage/logs/laravel.log
    ```
    Perintah ini akan menampilkan baris error baru secara instan begitu terjadi kegagalan transaksi API dari hardware.

---

## Ringkasan Alur Debugging untuk Proyek TA

Jika data sensor di dashboard web tidak muncul, jangan langsung membongkar perangkat keras Anda! Ikuti urutan investigasi ini:
1.  **Cek Log Laravel**: Apakah request API dari Gateway sampai ke server? Periksa file `laravel.log`. Jika ada tulisan `Snapshot Error`, masalahnya ada di database server.
2.  **Cek WebSerial / Serial Monitor**: Jika tidak ada request masuk ke Laravel, hubungkan komputer ke Gateway via browser WebSerial/USB. Apakah Gateway berhasil menerima data dari Node? Apakah Gateway gagal tersambung Wi-Fi?
3.  **Cek Android Logcat**: Jika web dashboard lancar di laptop tetapi aplikasi Android blank, buka Logcat dan filter tag `WEBVIEW_ERROR`. Periksa apakah ada masalah perizinan internet (*internet permission*) atau HTTPS certificate.

Dengan memanfaatkan sistem log terpadu ini, Anda dapat memetakan letak kesalahan (*root cause*) secara akurat dan menyelesaikannya dengan cepat.

---

Lanjutkan ke bab berikutnya: **[File, Folder, dan Project](./file-folder-project.md)**.
