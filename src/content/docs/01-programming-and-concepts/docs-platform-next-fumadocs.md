---
title: "Next.js, Fumadocs, dan Search Docs"
---

# Next.js, Fumadocs, dan Search Docs

Di dalam proyek ini, platform dokumentasi (`docs-site`) dirancang sebagai aplikasi modern yang dibangun menggunakan **Next.js App Router**, **Fumadocs MDX**, **Orama Search Engine**, dan **Scalar API Reference**.

Dengan menggunakan platform ini, pengembang dapat dengan mudah menulis materi pembelajaran, memperbarui referensi API secara otomatis, serta menyediakan fitur pencarian yang cepat dan responsif.

---

## Komponen Utama Arsitektur

Berikut adalah teknologi utama yang digunakan untuk membangun sistem dokumentasi:

| Teknologi | Peran & Tanggung Jawab | File Terkait |
| :--- | :--- | :--- |
| **Next.js App Router** | Mengatur routing halaman dokumentasi, pencarian API, dan rendering sisi server. | `app/docs/[[...slug]]/page.tsx` |
| **Fumadocs MDX** | Membaca konten statis dari file Markdown/MDX di folder konten. | `source.config.ts` |
| **Orama** | Mesin pencarian teks lengkap (*full-text search*) yang dioperasikan secara lokal di server. | `lib/docs.ts` |
| **Scalar** | Menampilkan antarmuka referensi OpenAPI yang interaktif secara langsung. | `components/ScalarApiReference.tsx` |
| **gray-matter** | Mem-parsing metadata frontmatter yang didefinisikan pada bagian atas file Markdown. | `lib/docs.ts` |

---

## Mekanisme Routing dan Resolusi Halaman

Semua halaman dokumentasi disimpan di bawah folder `src/content/docs`. Next.js menggunakan *catch-all route* berupa `[[...slug]]` untuk meresolusi path secara dinamis.

Pada file `app/docs/[[...slug]]/page.tsx`, URL dipetakan langsung ke file Markdown fisik:
- Endpoint utama `/docs` akan diarahkan secara otomatis ke halaman awal `/docs/00-start-here`.
- Struktur folder seperti `01-programming-and-concepts/docs-platform-next-fumadocs.md` diubah menjadi slug URL ramah pengembang: `/docs/01-programming-and-concepts/docs-platform-next-fumadocs`.
- Fungsi `normalizeDocHref` di `lib/docs.ts` memvalidasi tautan internal secara otomatis agar link relatif antar file Markdown tidak terputus saat di-render.

---

## Pencarian Dokumen Berkinerja Tinggi

Pencarian teks lengkap pada dokumentasi ini berjalan di dua sisi:

### 1. Sisi Klien (Client-Side)
Pada `components/DocsSearch.tsx`, UI pencarian menggunakan React Hooks untuk mengelola masukan pengguna:
- **Debounce 180 ms**: Mencegah request dikirim setiap kali tombol ditekan, melainkan menunggu jeda ketikan selesai.
- **AbortController**: Jika pengguna terus mengetik, request sebelumnya yang masih berjalan akan di-abort secara otomatis agar menghemat bandwidth dan meningkatkan responsivitas.

Contoh implementasi debounce & request abort:
```ts
const controller = new AbortController();
const timer = window.setTimeout(async () => {
  setLoading(true);
  try {
    const response = await fetch(
      `/api/search?q=${encodeURIComponent(trimmed)}`,
      { signal: controller.signal }
    );
    // pemrosesan hasil pencarian...
  } catch (error) {
    if (!controller.signal.aborted) {
      setResults([]);
    }
  }
}, 180);
```

### 2. Sisi Server (API Route)
Request pencarian ditangani oleh API Route di `app/api/search/route.ts`. Route ini membaca parameter query lalu memanggil fungsi `searchDocs` di `lib/docs.ts`.

Orama diinisialisasi dan diindeks secara dinamis per request untuk dokumen skala kecil ini:
```ts
const db = create({
  schema: {
    content: "string",
    href: "string",
    title: "string",
  },
});

await insertMultiple(
  db,
  entries.map((entry) => ({
    content: entry.content,
    href: entry.href,
    title: entry.title,
  }))
);
```

---

## Integrasi Scalar API Reference

Scalar digunakan untuk menampilkan interaksi REST API yang didokumentasikan dalam format OpenAPI (JSON). Karena Scalar memuat elemen berat dan interaksi DOM browser, komponen `components/ScalarApiReference.tsx` memuat script-nya sebagai Client Component.

Untuk mencegah masalah daur hidup React (seperti inisialisasi ganda saat re-render), komponen memanfaatkan penanda data DOM:
```ts
if (container && !container.hasAttribute("data-scalar-mounted")) {
  container.setAttribute("data-scalar-mounted", "true");
  window.Scalar.createApiReference({
    spec: { url: "/openapi.json" },
    // konfigurasi Scalar lainnya
  });
}
```

---

## Kapan Anda Perlu Membuka Bagian Ini?

Modifikasi pada komponen atau fungsi docs ini diperlukan apabila Anda ingin:
1. Menambahkan halaman dokumentasi baru atau melakukan penataan ulang struktur folder.
2. Memperbaiki masalah pemetaan tautan internal di markdown.
3. Melakukan kustomisasi tampilan UI kolom pencarian atau performa mesin pencari Orama.
4. Mengupdate spesifikasi API reference dengan memodifikasi file `openapi.json`.
