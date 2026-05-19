---
title: "Next.js, Fumadocs, dan Search Docs"
---

# Next.js, Fumadocs, dan Search Docs

`docs-site` adalah aplikasi dokumentasi. Ia memakai Next.js, React, TypeScript, Fumadocs MDX, Orama search, Markdown renderer, dan Scalar API reference.

## Komponen Utama

| Bagian | Peran |
|---|---|
| Next.js App Router | Routing halaman docs, search API, API reference. |
| Fumadocs MDX | Membaca konten Markdown/MDX dari `src/content/docs`. |
| React components | Search UI, Markdown view, Scalar API reference. |
| Orama | Search full-text ringan untuk dokumen. |
| gray-matter | Membaca frontmatter Markdown. |
| Scalar | Menampilkan OpenAPI reference dari `openapi.json`. |
| TypeScript | Menjaga tipe data route, component, dan helper docs. |

## Routing Docs

Root app mengarahkan `/` ke `/docs`. Route `/docs/[[...slug]]` membaca slug dan mencari file Markdown yang cocok. File `index.md` menjadi halaman folder.

Konsep penting:

- slug array,
- fallback ke `00-start-here`,
- path Markdown diubah menjadi URL docs,
- link relatif dinormalisasi agar tetap bekerja.

## Search Docs

Search bekerja dalam dua lapis:

1. Client component menyimpan query, debounce 180 ms, lalu fetch `/api/search?q=...`.
2. Route handler membaca query, memanggil `searchDocs`, lalu mengirim JSON hasil.

`searchDocs` membaca semua markdown, membuat index Orama, lalu mencari title dan content.

Edge case:

- query terlalu pendek tidak perlu search,
- request lama perlu di-abort saat user mengetik lagi,
- Markdown perlu dibersihkan saat membuat excerpt,
- index dibuat per request sehingga cukup untuk docs kecil, tetapi bisa perlu cache jika dokumen makin besar,
- route search dibuat dynamic karena bergantung query runtime.

## Markdown dan Frontmatter

Setiap halaman docs memakai frontmatter:

```md
---
title: "Judul"
---
```

Validator docs mengecek frontmatter, banned term, dan link Markdown. Build Next.js mengecek MDX, TypeScript, dan route.

## Scalar API Reference

Scalar dipasang sebagai client component karena script eksternal dijalankan di browser. Component menunggu script siap, mencari container, lalu memanggil `window.Scalar.createApiReference`.

Edge case:

- script bisa belum siap saat component render,
- component bisa re-render,
- container diberi marker `data-scalar-mounted`,
- `openapi.json` harus bisa diakses dari public path.

## TypeScript dan React State

Docs search memakai:

- `useState` untuk query, result, loading,
- `useMemo` untuk trimmed query,
- `useEffect` untuk debounce dan abort request,
- typed `SearchResult`.

Ini mirip konsep Vue reactivity, tetapi API-nya React.

## File Kode yang Perlu Dibaca

File docs-site belum masuk file-by-file runtime utama TA, tetapi source yang relevan ada di:

- `docs-site/lib/docs.ts`,
- `docs-site/components/DocsSearch.tsx`,
- `docs-site/components/ScalarApiReference.tsx`,
- `docs-site/app/api/search/route.ts`,
- `docs-site/app/docs/[[...slug]]/page.tsx`,
- `docs-site/source.config.ts`,
- `docs-site/src/content/docs`.

## Kapan Ini Penting

Bagian ini penting saat:

- menambah halaman docs baru,
- memperbaiki link,
- mengubah search,
- menambah API reference,
- mengubah struktur folder docs,
- debugging build Next.js atau MDX.
