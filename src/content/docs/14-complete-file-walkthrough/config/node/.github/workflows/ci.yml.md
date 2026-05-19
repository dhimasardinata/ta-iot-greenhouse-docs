---
title: "node/.github/workflows/ci.yml"
---

# node/.github/workflows/ci.yml

File ini mengatur workflow CI utama untuk build, test, analisis statis, dan fault injection node.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/.github/workflows/ci.yml` |
| Komponen | Config |
| Level | Menengah |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Kenapa File Ini Ada

Firmware node perlu dicek otomatis setiap ada push atau pull request ke `main` atau `master`. File ini memastikan build dan test dasar tidak hanya bergantung pada pengecekan manual.

## Pemicu Workflow

Workflow berjalan pada:

- `push` ke branch `main` atau `master`
- `pull_request` ke branch `main` atau `master`

## Job Utama

| Job | Fungsi |
|---|---|
| `build-and-test` | Install dependency, audit NPM, install PlatformIO, cek standar, build firmware, dan menjalankan native test. |
| `static-analysis` | Menjalankan governance check dan `pio check` dengan `cppcheck` serta `clang-tidy`. |
| `fault-injection-e2e` | Menjalankan test JavaScript untuk skenario fault injection cache CRC. |

## Versi Tool

Workflow memakai:

- Node.js `20`
- Python `3.11`
- PlatformIO `6.1.15`
- `actions/checkout@v6.0.0`
- `actions/setup-node@v6.0.0`
- `actions/setup-python@v6.0.0`
- `actions/cache@v5.0.0`

## Urutan Pemeriksaan

CI menjalankan `npm ci`, `npm audit --audit-level=high`, `python3 scripts/check_coding_standard.py`, `pio run`, dan `pio test -e native`. Analisis statis baru berjalan setelah job build-and-test sukses.

## Error yang Mungkin Terjadi

- Jika `npm audit` menemukan risiko level tinggi, CI gagal sebelum build.
- Jika PlatformIO dependency tidak cocok, `pio run` gagal.
- Jika native test tidak sesuai dengan perubahan source, CI gagal di `pio test -e native`.
- Jika `pio check --fail-on-defect=low` menemukan defect level rendah atau lebih tinggi, analisis statis gagal.

## Bagian untuk Pemula

File ini seperti pemeriksa otomatis di GitHub. Setiap perubahan penting akan dicoba dibangun dan dites agar masalah terlihat lebih awal.

## Bagian Advanced

Job `static-analysis` bergantung pada `build-and-test`, sehingga analisis statis tidak berjalan jika build dasar sudah gagal. Ini menghemat waktu tetapi bisa menunda temuan statis sampai build diperbaiki.

## Hubungan ke Sistem TA

CI membantu membuktikan firmware node masih bisa dibangun dan test dasarnya berjalan sebelum dipakai sebagai bagian sistem IoT greenhouse.

