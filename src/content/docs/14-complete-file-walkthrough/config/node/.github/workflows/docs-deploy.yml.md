---
title: "node/.github/workflows/docs-deploy.yml"
---

# node/.github/workflows/docs-deploy.yml

File ini mengatur deployment dokumentasi statis node ke Netlify.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/.github/workflows/docs-deploy.yml` |
| Komponen | Config |
| Level | Menengah |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Kenapa File Ini Ada

Repository node memiliki folder `docs/`. Workflow ini menyediakan jalur otomatis untuk menerbitkan folder dokumentasi tersebut ke Netlify.

## Pemicu Workflow

Workflow berjalan pada:

- `push` ke `main` atau `master` jika file dalam `docs/**` berubah
- perubahan pada `.github/workflows/docs-deploy.yml`
- `workflow_dispatch` untuk menjalankan manual

## Langkah Utama

| Langkah | Fungsi |
|---|---|
| Checkout | Mengambil source repository. |
| Validate docs entrypoint | Memastikan `docs/index.html` ada. |
| Set up Node.js | Menyiapkan Node.js versi 20. |
| Install Netlify CLI | Memasang `netlify-cli@17.38.1`. |
| Deploy docs | Mengirim folder `docs` ke Netlify production. |

## Secret yang Dibutuhkan

Deployment memakai:

- `NETLIFY_AUTH_TOKEN`
- `NETLIFY_SITE_ID`

Tanpa dua secret ini, proses deploy tidak bisa berhasil.

## Error yang Mungkin Terjadi

- Jika `docs/index.html` tidak ada, workflow berhenti di langkah validasi.
- Jika secret Netlify belum diatur, deploy gagal.
- Jika Netlify CLI berubah perilaku, deploy bisa perlu penyesuaian.

## Bagian untuk Pemula

File ini seperti tombol otomatis untuk menerbitkan dokumentasi. Jika dokumentasi berubah, GitHub bisa mengirim hasilnya ke Netlify.

## Bagian Advanced

Workflow memakai `concurrency` dengan group `docs-deploy-${{ github.ref }}` dan `cancel-in-progress: true`, sehingga deploy lama pada branch yang sama dibatalkan saat run baru masuk.

## Hubungan ke Sistem TA

Dokumentasi node membantu pembacaan dan audit firmware. Workflow ini memastikan dokumentasi tersebut dapat dipublikasikan secara konsisten.

