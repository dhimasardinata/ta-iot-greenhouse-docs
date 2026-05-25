---
title: "Python and Shell Scripts"
---

# Python and Shell Scripts

Dalam pengembangan sistem berbasis mikrokontroler, terdapat banyak langkah berulang (*repetitive tasks*) yang membosankan dan rentan terhadap kesalahan manusia (*human error*).

Untuk mengatasi hal tersebut, proyek ini menyediakan serangkaian **Script Python dan Shell** otomatisasi. Script ini berjalan di komputer pengembang (PC) selama proses kompilasi dan penyebaran (*deployment*), bukan berjalan di dalam runtime perangkat keras ESP8266/ESP32.

---

## 1. Daftar Script Otomatisasi Proyek

| Kategori Script | File Script | Peran & Deskripsi |
| :--- | :--- | :--- |
| **Kompilasi Massal** | `node/scripts/build_all.py` | Mengompilasi kode firmware untuk berbagai varian lingkungan (*environments*) secara berturut-turut. |
| **Penyebaran OTA** | `node/scripts/build_and_ota.py` | Memicu kompilasi biner lalu mengunggah artifact `.bin` ke endpoint OTA files API. |
| **Injeksi Konfigurasi** | `node/scripts/inject_config.py` | Membaca file konfigurasi lokal `node_id.ini` lalu menuliskannya ke dalam file header C++ sebelum kompilasi dimulai. |
| **Konversi Aset Web** | `node/scripts/web_to_header.py` | Mengonversi halaman antarmuka web (HTML, CSS, JS) menjadi format array byte C++ agar dapat disimpan di memori `PROGMEM` flash. |
| **Konversi Sertifikat**| `node/scripts/convert_certs.py` | Mengonversi sertifikat root SSL (PEM format) ke tipe data C++ array untuk validasi koneksi HTTPS. |
| **Analisis Memori** | `node/scripts/analyze_stack.py` | Membaca berkas keluaran `-fstack-usage` GCC untuk melacak konsumsi memori stack fungsi-fungsi C++. |
| **Sanitasi Repositori**| `node/scripts/sanitize_for_public.py` | Membersihkan kunci token rahasia, kata sandi Wi-Fi produksi, dan kredensial sensitif lainnya sebelum kode diunggah ke publik. |

---

## 2. Studi Kasus: Dinamika Injeksi Konfigurasi

Mengubah ID Greenhouse (`GH_ID`) atau ID Node (`NODE_ID`) secara manual di dalam kode sumber C++ sebelum melakukan flash ke 10 node yang berbeda sangat rawan kesalahan.

Proyek ini mengatasi hal tersebut dengan menggunakan script `node/scripts/inject_config.py`. Script ini dipasang sebagai *pre-script* di PlatformIO. Sebelum compiler GCC dijalankan, Python secara otomatis:

1. Membaca nilai variabel dari file konfigurasi `node/node_id.ini`.
2. Membaca ID Greenhouse, ID Node, Versi Firmware, dan Token API.
3. Menulis file header C++ sementara di `include/generated/node_config.h`:
   ```cpp
   #ifndef DYNAMIC_NODE_CONFIG_H
   #define DYNAMIC_NODE_CONFIG_H
   #define GH_ID 1
   #define NODE_ID 3
   #define FIRMWARE_VERSION "1.2.0"
   #define FACTORY_API_TOKEN "token_rahasia_anda"
   #endif
   ```
4. Melakukan manipulasi rute unggahan pada PlatformIO: jika unggahan menggunakan mode nirkabel (`espota`), Python akan mengarahkan `UPLOAD_PORT` ke IP node tujuan secara otomatis, sedangkan jika memakai USB/Serial, Python membiarkan PlatformIO mendeteksi port COM secara mandiri.

---

## 3. Bahaya dan Masalah Umum Script Otomatisasi

Selama menggunakan script otomatisasi, pengembang perlu memperhatikan aspek-aspek keamanan berikut:
- **Kredensial Bocor**: Kata sandi portal, kredensial Wi-Fi lapangan, atau token API produksi dapat secara tidak sengaja tertulis keras (*hardcoded*) di dalam script. Manfaatkan file konfigurasi lokal seperti `node_id.ini` yang dikecualikan dari Git (`.gitignore`).
- **File Cache Kedaluwarsa**: Kompilator kadang-kadang tidak mendeteksi perubahan jika file header dihasilkan ulang tanpa memicu perubahan timestamp berkas kode utama. Script `node/scripts/inject_config.py` mengatasi ini dengan mendefinisikan flag makro kompilasi cache secara unik di lingkungan build PlatformIO:
  ```python
  env.AppendUnique(
      CPPDEFINES=[
          ("PIO_GH_ID_CACHE", gh_id_i),
          ("PIO_NODE_ID_CACHE", node_id_i),
      ]
  )
  ```
- **Ketidakcocokan Path Relatif**: Menjalankan script dari folder yang salah (misalnya di luar folder root `node/`) dapat merusak penulisan file biner hasil kompilasi. Selalu gunakan path absolut atau resolusi path berbasis direktori kerja script di Python.
