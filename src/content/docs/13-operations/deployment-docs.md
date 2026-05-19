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

Folder `docs-site/src/content/docs/` sudah berisi konten Markdown, tetapi `docs-site` belum terlihat memiliki `package.json`, `next.config`, `source.config.ts`, atau app Next.js. Artinya konten sudah mulai dibuat, tetapi platform web sesuai stack final belum lengkap.

## Deployment Lama yang Terlihat

`node/.github/workflows/docs-deploy.yml` deploy folder `node/docs` ke Netlify. Itu adalah dokumentasi node lama, bukan platform TA lengkap di `docs-site`.

## Implikasi

Batch konten tetap berguna, tetapi tahap berikutnya perlu scaffold platform docs agar konten ini bisa dirender sebagai website profesional sesuai `stacks.md`.

Lanjutkan ke [Troubleshooting Produksi](./troubleshooting-produksi.md).
