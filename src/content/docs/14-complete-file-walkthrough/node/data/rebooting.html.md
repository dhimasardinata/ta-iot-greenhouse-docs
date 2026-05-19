---
title: "node/data/rebooting.html"
---

# node/data/rebooting.html

File ini adalah halaman informasi ketika node akan reboot setelah konfigurasi berhasil.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/data/rebooting.html` |
| Komponen | Firmware Node |
| Level | Pemula |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

File ini bertugas memberi tahu pengguna bahwa konfigurasi berhasil dan node sedang reboot agar bisa masuk mode normal.

## Posisi File dalam Sistem

`PortalServer.Routes.cpp` mengirim halaman ini pada route `/success`. Halaman ini juga memiliki meta refresh ke `http://%HOST_NAME%.local/`.

## Kenapa File Ini Dibutuhkan

Setelah Wi-Fi berhasil, node perlu restart atau berpindah mode. Halaman ini membuat pengguna tahu bahwa perangkat sedang berubah state, bukan gagal.

## Alur Kerja File

1. Portal menyatakan koneksi sukses.
2. Browser menerima halaman rebooting.
3. Halaman menampilkan pesan sukses.
4. Meta refresh menunggu 15 detik.
5. Browser mencoba membuka hostname mDNS node.

## Konsep Dasar yang Perlu Dipahami

- Meta refresh adalah instruksi HTML untuk membuka alamat lain setelah jeda.
- `%HOST_NAME%` adalah placeholder yang diproses oleh firmware/template.
- mDNS `.local` membantu membuka perangkat lokal dengan nama, bukan IP.

## Dependency Internal

| Dependency | Fungsi |
|---|---|
| `node/lib/NodeCore/web/PortalServer.Routes.cpp` | Mengirim halaman ini dari route `/success`. |
| `node/lib/NodeCore/web/PortalServer.cpp` | Mengelola state portal dan reboot. |
| `node/include/generated/WebAppData.h` | Menyimpan asset ini dalam firmware. |

## Input

Input utamanya adalah placeholder hostname dari firmware.

## Output

Output berupa tampilan sukses dan redirect otomatis ke alamat node.

## Error Handling

Jika mDNS tidak tersedia atau hostname tidak resolvable, redirect bisa gagal. Pengguna perlu membuka IP node secara manual.

## Catatan Keamanan

Tidak ada data rahasia diproses langsung di file ini.

## Catatan Debugging

Jika halaman tidak redirect, cek nilai hostname dari `ConfigManager`, status mDNS, dan apakah perangkat sudah tersambung ke jaringan yang sama dengan browser.

## Hubungan dengan Laporan TA

File ini mendukung alur captive portal dan transisi dari setup Wi-Fi ke operasi normal node.
