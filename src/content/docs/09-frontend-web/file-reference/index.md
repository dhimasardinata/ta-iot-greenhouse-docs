---
title: "File Reference Frontend Web"
description: "Daftar rujukan berkas kode sumber komponen Vue.js di frontend dasbor web beserta deskripsi peran fisiknya."
---

# File Reference Frontend Web

Bagian ini menyajikan direktori rujukan cepat untuk seluruh berkas kode sumber komponen Vue.js yang diimplementasikan pada dasbor web Central Hub. Berkas-berkas nyata ini berlokasi di dalam folder [web/](file:///home/dhimasardinata/Dokumen/ta/web/) pada repositori utama.

---

## Daftar Berkas Komponen Utama

Klik tautan berkas di bawah ini untuk melihat langsung kode sumber fisiknya di editor Anda:

### 1. **[Controlling.vue](file:///home/dhimasardinata/Dokumen/ta/web/Controlling.vue)**
*   **Peran Utama**: Pusat pengelolaan penyetelan batas operasional sensor (*threshold*) dan penjadwalan aktuator (*scheduling*).
*   **Fitur Kunci**:
    *   Editor slider ambang batas dua arah terintegrasi Vueform Slider.
    *   Pengelola daftar jadwal berkala aktuator dengan penanganan kartu-kartu visual `ScheduleCard`.
    *   Mekanisme validasi format jam terbalik (`hasInvalidTimes`) dan pelindung batas maksimal jadwal (4/4).
    *   Penjaga navigasi tab reaktif (`confirmTabChange`) untuk mencegah perubahan yang belum disimpan terbuang.

### 2. **[Heatmap.vue](file:///home/dhimasardinata/Dokumen/ta/web/Heatmap.vue)**
*   **Peran Utama**: Menyusun peta sebaran spasial parameter suhu, kelembapan, dan intensitas cahaya per greenhouse.
*   **Fitur Kunci**:
    *   Integrasi peta Leaflet.js sistem koordinat kartesian piksel sederhana `L.CRS.Simple`.
    *   Kanvas interpolasi dinamis kustom `CanvasHeatmapLayer` menggunakan algoritma matematika IDW (Inverse Distance Weighting).
    *   Penskalaan tinggi peta adaptif ponsel dengan ResizeObserver ter-debounce 350ms.
    *   Penempatan koordinat Marker pin node sensor presisi piksel pada gambar denah WebP.
