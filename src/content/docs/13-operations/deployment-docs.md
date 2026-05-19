---
title: "Deployment Docs"
---

# Deployment Docs

Deployment docs adalah proses menerbitkan dokumentasi agar bisa dibaca dari browser.

## Stack Target dari `stacks.md`

Stack akhir yang direkomendasikan:

- Next.js
- Fumadocs
- MDX
- Tailwind CSS
- shadcn/ui dan Radix UI
- Lucide React
- Shiki
- Mermaid
- Pagefind atau Orama
- OpenAPI 3.1 dan Scalar atau Fumadocs OpenAPI

## Status Snapshot Saat Ini

Platform dokumentasi sudah dibuat di `docs-site` dan diterbitkan ke Netlify:

- route docs utama: `/docs`,
- renderer Markdown file-by-file: `lib/docs.ts` dan `components/MarkdownView.tsx`,
- search JSON: `/api/search` memakai Orama,
- API reference: `/api-reference` memakai OpenAPI 3.1 dan Scalar CDN,
- file spesifikasi API: `/openapi.json`,
- konfigurasi deploy: `netlify.toml`.

URL produksi:

```text
https://ta-iot-greenhouse-docs.netlify.app
```

## Deployment Lama yang Terlihat

`node/.github/workflows/docs-deploy.yml` deploy folder `node/docs` ke Netlify. Itu adalah dokumentasi node lama, bukan platform TA lengkap di `docs-site`.

## Implikasi

Konten dan platform sudah berada di satu website. Jika ada perubahan source TA, langkah berikutnya adalah memperbarui halaman file-by-file dan menjalankan validasi docs sebelum deploy ulang.

Lanjutkan ke [Troubleshooting Produksi](./troubleshooting-produksi.md).
