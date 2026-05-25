---
title: "Heatmap"
description: "Rincian teknis visualisasi sebaran spasial menggunakan Leaflet.js, rumus interpolasi IDW (Inverse Distance Weighting) kanvas, koordinat node, dan adaptabilitas ukuran layar."
---

# Heatmap

Visualisasi spasial sebaran parameter lingkungan diimplementasikan pada halaman Heatmap (`Heatmap.vue`). Komponen ini mengintegrasikan peta **Leaflet.js** tanpa proyeksi geografis bumi (menggunakan sistem koordinat kartesian piksel biasa) untuk me-render heatmap halus di atas gambar cetak biru denah rumah kaca.

---

## 1. Konfigurasi Leaflet.js dengan Sistem Koordinat Sederhana

Karena denah berupa file gambar digital biasa, Leaflet diatur menggunakan mode koordinat sederhana **`L.CRS.Simple`**:
*   **Batas Gambar (*Bounds*)**: Koordinat sudut kiri bawah disetel `[0, 0]`, sedangkan sudut kanan atas disetel sesuai ukuran piksel asli gambar denah masing-masing greenhouse.
*   **Indeks Peta Maksimum**: Ditambahkan margin batas gerak geser peta sebesar 20 piksel (`setMaxBounds`) agar gambar denah tidak dapat digeser keluar dari area fokus layar.

---

## 2. Koordinat Node Sensor pada Denah Rumah Kaca

Tiap node sensor ditempatkan pada titik piksel spesifik yang mencerminkan lokasi fisiknya di lapangan:

### Greenhouse 1 (Dimensi: 1024 x 450 Piksel)
*   **Gambar Denah**: `/images/greenhouse_plan.webp`
*   **Koordinat Node `[Y, X]`**:
    *   **Node 1**: `[420, 150]` (Baris bawah kiri)
    *   **Node 2**: `[35, 310]` (Baris atas tengah-kiri)
    *   **Node 3**: `[420, 585]` (Baris bawah tengah)
    *   **Node 4**: `[35, 785]` (Baris atas tengah-kanan)
    *   **Node 5**: `[420, 950]` (Baris bawah kanan)

### Greenhouse 2 (Dimensi: 640 x 500 Piksel)
*   **Gambar Denah**: `/images/greenhouse_plan2.webp`
*   **Koordinat Node `[Y, X]`**:
    *   **Node 6**: `[175, 561]`
    *   **Node 7**: `[175, 159]`
    *   **Node 8**: `[325, 65]`
    *   **Node 9**: `[325, 438]`
    *   **Node 10**: `[405, 278]`

---

## 3. Rumus Matematika Interpolasi Warna (IDW)

Untuk memprediksi nilai suhu/kelembapan pada titik-titik kosong di antara node sensor dan menghasilkan warna gradasi halus, kanvas menggunakan kelas kustom **`CanvasHeatmapLayer`** yang menerapkan algoritma **Inverse-Distance Weighting (IDW)**:

$$\text{Weight} = \frac{1}{(d + \epsilon)^2}$$

*   **Jarak ($d$)**: Jarak Euclidean piksel kalkulasi aktif terhadap piksel sensor node terdekat.
*   **Epsilon ($\epsilon$)**: Nilai toleransi pembagi nol (disetel `1` piksel) agar berat tidak bernilai tak terhingga ketika piksel kalkulasi tepat berada di koordinat node.
*   **Interpolasi**: Nilai intensitas dihitung dengan membagi total jumlah nilai dikali berat terhadap total jumlah berat sensor.
*   **Gradien Warna**: Warna pixel dihitung dengan mencocokkan intensitas ternormalisasi (rentang `[0, 1]`) ke gradien lima warna:
    *   **0.0 (Sangat Dingin / Kering / Gelap)**: Biru (`#2563eb`)
    *   **0.25**: Cyan (`#06b6d4`)
    *   **0.50 (Normal)**: Kuning (`#facc15`)
    *   **0.75**: Oranye (`#fb923c`)
    *   **1.0 (Sangat Panas / Lembap / Terang)**: Merah (`#ef4444`)

---

## 4. Pemotongan Kanvas & Manajemen Resize Layar

Agar gradasi warna heatmap tidak bocor keluar dari bentuk denah bangunan greenhouse yang tidak simetris, sistem menerapkan masking kanvas:
```javascript
const clipPath = `polygon(${left}px ${top}px, ${right}px ${top}px, ${right}px ${bottom}px, ${left}px ${bottom}px)`;
heatCanvas.style.clipPath = clipPath;
```

### Adaptabilitas Layar (`ResizeObserver`):
Saat dasbor dibuka di layar ponsel atau tablet, ukuran kanvas Leaflet dihitung ulang secara reaktif:
1.  **ResizeObserver** mendeteksi perubahan lebar container map.
2.  Memicu fungsi `updateMapHeight()` dengan **debounce timeout 350 milidetik** untuk membatasi penataan ulang ukuran layar yang berlebihan.
3.  Memanggil `map.invalidateSize()` dan memicu `fitBounds` untuk memosisikan ulang denah di tengah layar browser secara proporsional.

Lanjutkan ke bagian **[Controlling Threshold](./controlling-threshold.md)** untuk melihat antarmuka penyetelan ambang batas parameter sensor ini.
