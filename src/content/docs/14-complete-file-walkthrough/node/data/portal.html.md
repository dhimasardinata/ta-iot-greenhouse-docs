---
title: "node/data/portal.html"
---

# node/data/portal.html

File ini adalah halaman captive portal untuk setup Wi-Fi node.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/data/portal.html` |
| Komponen | Firmware Node |
| Level | Menengah |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

File ini bertugas membantu pengguna memilih jaringan Wi-Fi, memasukkan password, menyimpan kredensial, melakukan scan ulang, mengirim waktu browser, dan meminta factory reset saat node berada di portal mode.

## Posisi File dalam Sistem

File ini dilayani oleh `PortalServer`, bukan dashboard normal `AppServer`. Portal aktif ketika node belum berhasil tersambung ke Wi-Fi atau masuk mode konfigurasi.

## Kenapa File Ini Dibutuhkan

Node harus bisa dikonfigurasi tanpa kabel serial dan tanpa aplikasi khusus. Dengan captive portal, pengguna cukup tersambung ke access point node lalu membuka halaman konfigurasi.

## Kapan File Ini Dipakai

File ini dipakai saat `WifiManager` berada pada state `PORTAL_MODE`. Route `/` di portal mode mengirim halaman ini.

## Alur Kerja File

1. Browser membuka halaman portal.
2. JavaScript meminta scan jaringan lewat `/scan`.
3. Daftar jaringan diambil dari `/networks`.
4. Pengguna memilih SSID atau mengisi SSID manual.
5. Password dienkripsi di browser jika `CryptoJS` tersedia.
6. Form dikirim ke `/save`.
7. Portal menampilkan halaman connecting.
8. Status koneksi dipantau lewat `/status`.

## API yang Dipakai

| Endpoint | Fungsi |
|---|---|
| `/scan` | Meminta firmware melakukan scan Wi-Fi. |
| `/networks` | Mengambil hasil scan jaringan. |
| `/save` | Mengirim SSID, password, dan opsi hidden network. |
| `/status` | Memantau status testing koneksi. |
| `/time?epoch=...` | Mengirim waktu browser untuk validasi timestamp. |
| `/factory-reset` | Meminta reset total konfigurasi. |
| `/rescan` | Meminta reboot untuk scan ulang. |

## Konsep Dasar yang Perlu Dipahami

- Captive portal adalah halaman konfigurasi lokal yang muncul saat perangkat menjadi access point.
- SSID adalah nama jaringan Wi-Fi.
- Hidden network adalah jaringan yang tidak menyiarkan nama secara normal.
- AES-CBC dipakai untuk mengamankan payload password sebelum dikirim.

## Dependency Internal

| Dependency | Fungsi |
|---|---|
| `node/lib/NodeCore/web/PortalServer.Routes.cpp` | Mendaftarkan route portal dan memproses `/save`. |
| `node/data/crypto.js` | Menyediakan API CryptoJS minimal untuk enkripsi password. |
| `node/include/generated/WebAppData.h` | Menampung asset portal dalam firmware. |

## Input

Input berupa hasil scan Wi-Fi, SSID pilihan, password, opsi hidden network, klik factory reset, klik rescan, dan waktu browser.

## Output

Output berupa request POST ke firmware, password terenkripsi dengan prefix `ENC:` jika enkripsi berhasil, dan navigasi ke halaman connecting.

## Error Handling

Jika scan gagal, halaman menampilkan pesan sesuai error seperti `sta_disabled` atau mode scan AP-off. Jika `CryptoJS` tidak tersedia, halaman memberi peringatan bahwa password akan dikirim tanpa enkripsi dan meminta konfirmasi.

## Catatan Keamanan

File ini penting untuk keamanan kredensial Wi-Fi. Password dikirim sebagai `ENC:<iv>:<ciphertext>` ketika library crypto tersedia. Kode firmware tetap perlu memvalidasi panjang SSID, panjang password, karakter aman, format payload, dan timestamp.

## Catatan Performa

Portal berjalan di ESP8266 dengan heap terbatas. Scan Wi-Fi bisa berat, sehingga firmware bisa menunda scan atau mematikan AP sementara ketika heap rendah.

## Catatan Debugging

Jika portal tidak menampilkan jaringan, cek endpoint `/scan` dan `/networks`. Jika password selalu gagal, cek apakah waktu browser terkirim ke `/time` dan apakah dekripsi di firmware berhasil.

## Hubungan dengan Laporan TA

File ini mendukung pembahasan konfigurasi node, captive portal, keamanan password Wi-Fi, local fallback, dan setup perangkat lapangan.
