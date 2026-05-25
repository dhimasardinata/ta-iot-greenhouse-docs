---
title: "Debugging Frontend Web"
description: "Panduan penyelesaian masalah visual Leaflet, optimasi performa kanvas, penanganan bentrokan event sentuh, dan penanganan CSRF 419."
---

# Debugging Frontend Web

Bagian ini menyajikan panduan diagnosis dan solusi praktis untuk memecahkan masalah render antarmuka (*UI glitches*), optimasi performa kanvas heatmap di perangkat dengan spesifikasi rendah, dan sinkronisasi sesi browser.

---

## 1. Peta Leaflet.js Abu-Abu Sebagian (Container Size Glitch)

### Masalah:
Saat memindahkan tab greenhouse atau mengubah orientasi layar, area peta Leaflet.js sering kali tidak ter-render sepenuhnya (hanya muncul kotak abu-abu di beberapa sudut).
*   **Penyebab**: Leaflet mendeteksi ukuran kontainer map sebelum transisi transisi CSS layout selesai sepenuhnya.
*   **Solusi**:
    1.  Di dalam [Heatmap.vue](file:///home/dhimasardinata/Dokumen/ta/web/Heatmap.vue), inisialisasi map dibungkus di dalam `nextTick()` Vue.
    2.  Setiap kali tab greenhouse aktif diubah, transisi penampung diberi jeda waktu (`setTimeout` selama 300ms s.d 350ms) sebelum memicu pembersihan memori kanvas dan pemanggilan fungsi penyelarasan ukuran peta bawaan:
        ```javascript
        setTimeout(() => {
            map.invalidateSize(); // Memaksa Leaflet menghitung ulang dimensi kontainer
            map.fitBounds(bounds);
        }, 350);
        ```

---

## 2. Optimasi Kinerja Canvas Heatmap (Lagging pada Perangkat Mobile)

### Masalah:
Perhitungan matematika Inverse-Distance Weighting (IDW) pixel-demi-pixel pada canvas heatmap sangat memakan CPU, menyebabkan dasbor macet saat peta digeser pada ponsel berspesifikasi rendah.
*   **Penyebab**: Perhitungan berjalan di resolusi piksel 1:1.
*   **Solusi**:
    1.  **Dukungan Resolusi Skala (`RESOLUTION = 2`)**: Di dalam fungsi loop rendering kanvas, piksel dikelompokkan per 2 piksel (skala resolution). Hal ini memangkas jumlah iterasi loop hingga 75% tanpa mengurangi kehalusan gradasi warna heatmap.
    2.  **Debouncing Resize (`ResizeObserver`)**: Perubahan ukuran layar dipantau oleh `ResizeObserver`. Namun, pemanggilan kalkulasi tinggi peta ditahan menggunakan pengatur waktu debounce **350 milidetik** agar kalkulasi tidak dijalankan terus menerus selama browser sedang dalam proses transisi diseret:
        ```javascript
        clearTimeout(resizeDebounceTimer);
        resizeDebounceTimer = setTimeout(() => {
            updateMapHeight();
            map.invalidateSize();
        }, 350);
        ```

---

## 3. Penanganan Double-Tap dan Offset Marker pada Layar Sentuh

### Masalah:
Di ponsel layar sentuh, mengetuk pin marker node sering kali memicu penutupan popup tooltip secara instan atau marker tidak responsif saat diketuk berturut-turut.
*   **Penyebab**: Bentrokan penanganan event mouseover-mouseout Leaflet bawaan dengan emulasi event touch mobile.
*   **Solusi**:
    1.  **Tapped Recently Guard**: Ditambahkan bendera pengaman temporal `tappedRecently` (durasi 300ms) untuk mengunci popup agar tetap terbuka ketika event tap terdeteksi di ponsel:
        ```javascript
        marker.on("click", () => {
            cancelPopupClose();
            tappedRecently = true;
            marker.openPopup();
            setTimeout(() => { tappedRecently = false; }, 300);
        });
        ```
    2.  **Offset Marker Atas**: Untuk node yang posisinya berada di area atas layar ($Y > 200$), popup tooltip diberi offset khusus (`popup-bottom` CSS class) untuk mencegah popup keluar dari batas pandang layar.

---

## 4. Masalah CSRF Token Kedaluwarsa (HTTP Error 419)

### Masalah:
Ketika admin meninggalkan tab dasbor Controlling terbuka selama beberapa jam tanpa aktivitas dan mencoba menekan tombol Simpan, browser menampilkan pesan kesalahan atau menolak aksi simpan.
*   **Penyebab**: Sesi login dan token CSRF di backend telah kedaluwarsa demi keamanan session timeout.
*   **Solusi**:
    Intercept kesalahan respons Axios secara global. Jika terdeteksi status respons `419` (CSRF Token Mismatch), lakukan pemuatan ulang halaman secara penuh (`location.reload()`) untuk mengalihkan paksa browser pengguna kembali ke halaman Login.

Lanjutkan ke bagian **[File Reference](./file-reference/index.md)** untuk melihat ringkasan pemetaan berkas kode dasbor web ini.
