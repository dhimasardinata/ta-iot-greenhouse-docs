---
title: "Penanganan Error (Error Handling)"
description: "Rincian mekanisme penangkapan eksepsi runtime, pencatatan log kesalahan WebView, manajemen pesan Toast, dan analisis risiko penanganan error saat ini."
---

# Penanganan Error (Error Handling)

Aplikasi client Android menerapkan penanganan kesalahan (*error handling*) pada tingkat WebView dan operasi sistem I/O (input/output) penyimpanan berkas. Rincian implementasi di dalam [MainActivity.kt.txt](file:///home/dhimasardinata/Dokumen/ta/android/MainActivity.kt.txt) dibagi menjadi tiga kategori utama.

---

## 1. Kegagalan Pemuatan Jaringan WebView

WebView menggunakan objek kustom `WebViewClient` untuk menangani transisi halaman dan memantau status pemuatan. Apabila terjadi kegagalan muat (misalnya karena server luring, DNS bermasalah, atau hilangnya koneksi internet), aplikasi menangkap kejadian tersebut via metode override `onReceivedError`:

```kotlin
webView.webViewClient = object : WebViewClient() {
    override fun onPageFinished(view: WebView?, url: String?) {
        super.onPageFinished(view, url)
        loadingScreen.visibility = View.GONE
        webView.visibility = View.VISIBLE
    }

    override fun onReceivedError(view: WebView?, request: WebResourceRequest?, error: WebResourceError?) {
        super.onReceivedError(view, request, error)
        Log.e("WEBVIEW_ERROR", "Error: ${error?.description} | URL: ${request?.url}")
    }
}
```

### Mekanisme Kerja:
1.  **Pencatatan Logcat**: Deskripsi kesalahan (`error?.description`) beserta URL tujuan (`request?.url`) yang gagal dimuat akan dicatat ke dalam log sistem Android dengan tag kritis **`WEBVIEW_ERROR`** pada tingkat keparahan Error (`Log.e`).
2.  **Dampak Visual**: Transisi UI tetap dipicu melalui `onPageFinished`, di mana spinner loading disembunyikan (`View.GONE`) dan WebView dipaksa tampil (`View.VISIBLE`).

> [!WARNING]
> **Analisis Risiko Antarmuka**: Karena aplikasi tidak memiliki halaman error luring kustom (*offline custom fallback*), ketika koneksi internet terputus total atau domain `ta.atomic.web.id` tidak dapat dijangkau, WebView hanya akan menampilkan layar putih kosong bawaan browser (atau halaman peringatan bawaan Chromium *ERR_CONNECTION_REFUSED*). Tidak tersedia tombol retry visual bagi pengguna biasa di dalam tata letak aplikasi.

---

## 2. Kegagalan Pengunduhan File Standard (`DownloadManager`)

Saat WebView memicu *download listener* untuk tautan unduhan non-blob biasa, kode dibungkus dalam blok pelindung `try-catch` untuk mengantisipasi kegagalan antrean sistem:

```kotlin
try {
    val request = DownloadManager.Request(Uri.parse(url))
    // ... konfigurasi destinasi dan nama berkas ...
    val dm = getSystemService(Context.DOWNLOAD_SERVICE) as DownloadManager
    dm.enqueue(request)
    Toast.makeText(this@MainActivity, "Mengunduh file: $fileName", Toast.LENGTH_SHORT).show()
} catch (e: Exception) {
    Toast.makeText(this@MainActivity, "Gagal: ${e.message}", Toast.LENGTH_SHORT).show()
}
```

### Penanganan Kegagalan:
*   Jika sistem operasi gagal mengantrekan proses unduhan (misal karena layanan `DOWNLOAD_SERVICE` dinonaktifkan oleh pengguna, memori internal penuh, atau format URL tidak valid), eksepsi ditangkap oleh `catch (e: Exception)`.
*   Aplikasi memunculkan peringatan instan berupa pesan **Toast** berdurasi pendek (`LENGTH_SHORT`) yang menampilkan teks pesan error native dari sistem: `"Gagal: [Pesan Kesalahan]"`.

---

## 3. Kegagalan Pemrosesan Data Ekspor (Blob & Base64)

Operasi ekspor data sensor CSV dari dasbor web diproses secara manual dengan memecah string Base64 dan menulis biner langsung ke memori internal menggunakan `FileOutputStream`. Bagian ini memiliki risiko kegagalan I/O yang tinggi, sehingga dibungkus dalam blok `try-catch` terdedikasi:

```kotlin
private fun convertBase64ToLogAndDownload(base64Data: String, mimetype: String, fileName: String) {
    try {
        val pureBase64 = base64Data.substring(base64Data.indexOf(",") + 1)
        val fileAsBytes = Base64.decode(pureBase64, Base64.DEFAULT)
        val filePath = File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS), fileName)

        val os = FileOutputStream(filePath, false)
        os.write(fileAsBytes)
        os.flush()
        os.close()

        Toast.makeText(this@MainActivity, "Berhasil simpan ke Downloads: $fileName", Toast.LENGTH_LONG).show()
    } catch (e: Exception) {
        Toast.makeText(this@MainActivity, "Gagal memproses file: ${e.message}", Toast.LENGTH_SHORT).show()
    }
}
```

### Titik Kegagalan & Respon Aplikasi:
*   **Indeks Header Tidak Ditemukan**: Jika format data biner yang dikirim oleh Javascript via bridge tidak memiliki koma (bukan format DataURL valid), metode `indexOf(",")` dapat menghasilkan indeks bermasalah, memicu *IndexOutOfBoundsException*.
*   **Base64 Rusak**: Jika string Base64 terpotong saat transmisi dari WebView, fungsi `Base64.decode` akan melempar *IllegalArgumentException*.
*   **I/O Disk Penuh/Terkunci**: Jika media penyimpanan internal penuh, berkas dikunci oleh sistem, atau izin akses ditolak pada perangkat Android lama, `FileOutputStream` melempar *IOException*.
*   **Respon Toast**: Seluruh kegagalan tersebut akan dicegah agar tidak membuat aplikasi mogok (*crash / force close*). Sebagai gantinya, aplikasi memunculkan pesan Toast informatif kepada pengguna: `"Gagal memproses file: [Pesan Kesalahan]"`.

Lanjutkan ke bagian **[Build APK](./build-apk.md)** untuk melihat panduan kompilasi APK.
