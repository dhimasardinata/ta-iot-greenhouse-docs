---
title: "node/Justfile"
---

# node/Justfile

File ini menyediakan shortcut command untuk pekerjaan umum pada proyek firmware node.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/Justfile` |
| Komponen | Config |
| Level | Dasar |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Kenapa File Ini Ada

Command PlatformIO dan deployment dokumentasi cukup panjang. `Justfile` membuat command itu lebih mudah dijalankan lewat `just build`, `just upload`, dan command lain.

## Recipe yang Tersedia

| Recipe | Command utama | Fungsi |
|---|---|---|
| `default` | `just --list` | Menampilkan daftar recipe. |
| `build` | `pio run` | Build firmware. |
| `upload` | `pio run -t upload` | Upload firmware lewat USB. |
| `clean` | `pio run -t clean` | Membersihkan hasil build. |
| `check` | `pio check --fail-on-defect=medium --skip-packages` | Analisis statis PlatformIO. |
| `test-sim` | `pio test -e native -f test_simulation -v` | Simulasi native. |
| `test-logic` | `pio test -e native -f test_apiclient_flow -v` | Test logika ApiClient. |
| `test-all` | `pio test -e native -v` | Semua test native. |
| `deploy-docs` | `npx netlify-cli deploy --prod --dir=docs` | Deploy dokumentasi lama ke Netlify. |

## Error yang Mungkin Terjadi

- Jika `just` belum terpasang, recipe tidak bisa dijalankan.
- Jika PlatformIO belum siap, recipe `build`, `upload`, `check`, dan test gagal.
- Jika environment test di `platformio.ini` berbeda dari nama di recipe, recipe test tertentu bisa gagal.

## Bagian untuk Pemula

File ini seperti daftar tombol cepat di terminal. Daripada mengetik command panjang, pengguna cukup menjalankan nama recipe yang sudah disiapkan.

## Bagian Advanced

Recipe `test-logic` mengarah ke filter `test_apiclient_flow`, sehingga perlu dipastikan nama test tersebut memang ada di snapshot test saat ini sebelum dijadikan gate final.

## Hubungan ke Sistem TA

Shortcut ini mempercepat build, upload, test, dan deploy dokumentasi untuk firmware node greenhouse.

