---
title: "node/data/connecting.html"
---

# node/data/connecting.html

File ini adalah halaman status ketika node sedang mencoba koneksi Wi-Fi.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/data/connecting.html` |
| Komponen | Firmware Node |
| Level | Pemula |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

File ini bertugas memberi tahu pengguna bahwa node sedang mencoba menyambung ke jaringan Wi-Fi setelah kredensial disimpan.

## Posisi File dalam Sistem

File ini dilayani oleh `PortalServer` lewat route `/connecting`. Halaman ini muncul setelah `/save` menerima SSID dan password.

## Kenapa File Ini Dibutuhkan

Koneksi Wi-Fi tidak langsung selesai. Pengguna perlu melihat status proses, bukan halaman kosong. Halaman ini menjadi jembatan antara submit kredensial dan hasil sukses/gagal.

## Alur Kerja File

1. Pengguna menyimpan Wi-Fi dari portal.
2. Firmware mengirim halaman connecting.
3. JavaScript memanggil `/status`.
4. Jika status sukses, pengguna diarahkan ke halaman sukses/reboot.
5. Jika status gagal, halaman menampilkan pesan error atau kembali ke portal.

## Konsep Dasar yang Perlu Dipahami

- Polling berarti browser mengecek status berulang-ulang.
- Status koneksi berasal dari firmware, bukan dari halaman ini.
- Halaman transisi membantu operator memahami proses yang sedang berjalan.

## Dependency Internal

| Dependency | Fungsi |
|---|---|
| `node/lib/NodeCore/web/PortalServer.Routes.cpp` | Mengirim halaman ini dan menyediakan `/status`. |
| `node/include/generated/WebAppData.h` | Menyimpan halaman ini sebagai asset firmware. |

## Input

Input utama adalah response JSON dari `/status`.

## Output

Output berupa tampilan progres koneksi, pesan sukses/gagal, dan kemungkinan perpindahan halaman.

## Error Handling

Jika request `/status` gagal, halaman perlu tetap memberi indikasi bahwa proses belum selesai atau koneksi mungkin terputus. Detail perilaku final mengikuti JavaScript di file ini.

## Catatan Keamanan

Tidak ada password ditulis langsung di halaman ini. Namun status yang ditampilkan sebaiknya tidak membocorkan detail sensitif seperti isi password.

## Catatan Debugging

Jika setelah submit Wi-Fi halaman terus loading, cek log `PORTAL`, status `WifiManager`, dan response `/status`.

## Hubungan dengan Laporan TA

File ini mendukung alur setup node dan pengalaman pengguna saat perangkat masuk mode konfigurasi Wi-Fi.
