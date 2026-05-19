---
title: "JavaScript and TypeScript Tooling"
---

# JavaScript and TypeScript Tooling

JavaScript dan TypeScript muncul pada script pengembangan, test, asset web firmware, dan platform dokumentasi Next.js. Konsep yang sering muncul adalah `import`, `export`, `const`, `async`, JSON, package, script npm, dan fungsi helper.

Dalam proyek TA ini, JavaScript tidak hanya untuk tampilan. Ia juga dipakai untuk tooling, halaman firmware lokal, dan pengujian perilaku cache atau reproduksi bug.

## Di Mana Dipakai

| Area | Bentuk Kode | Peran |
|---|---|---|
| Frontend Vue | `.vue`, `axios`, `ref`, `computed`, `watch` | Dashboard, heatmap, kontrol threshold, kontrol jadwal. |
| Asset firmware node | HTML/CSS/JS di `node/data/` | Dashboard lokal, portal Wi-Fi, terminal, halaman update. |
| Asset firmware gateway | HTML/JS di `PROGMEM` | Portal konfigurasi gateway dan terminal WebSerial. |
| Tooling node | script JavaScript di `node/tools/` dan `node/test/` | Reproduksi bug, watcher, fault injection. |
| Docs site | TypeScript/TSX di `docs-site/` | Routing docs, search, rendering Markdown, API reference. |

## `async` dan Request

Kode web memakai operasi async untuk request API. Contohnya `axios.get(...)` di Vue dan `fetch(...)` di search docs.

Hal yang perlu diperhatikan:

- request bisa gagal,
- response bisa tidak sesuai bentuk yang diharapkan,
- request lama bisa selesai setelah state UI berubah,
- loading state perlu dikembalikan walau terjadi error,
- request pencarian perlu debounce agar tidak membanjiri endpoint.

## JSON

JSON menjadi format tengah antara firmware, backend, frontend, dan docs tooling.

Risiko JSON:

- field bisa hilang,
- angka bisa datang sebagai string,
- timestamp bisa beda format,
- data nested perlu dicek sebelum dibaca,
- payload terlalu besar bisa membebani firmware atau browser.

## `const`, Object, dan Copy

`const` di JavaScript mencegah variabel di-reassign, tetapi isi object atau array masih bisa berubah.

```js
const data = [];
data.push(1); // masih bisa
```

Di Vue, state reactive biasanya disimpan dalam `ref` atau `computed`, sehingga perubahan harus mengikuti pola reactivity, bukan hanya copy object sembarangan.

## File yang Relevan

- [Controlling.vue](../14-complete-file-walkthrough/web/Controlling.vue.md)
- [Heatmap.vue](../14-complete-file-walkthrough/web/Heatmap.vue.md)
- [node/data/terminal.js](../14-complete-file-walkthrough/node/data/terminal.js.md)
- [node/data/crypto.js](../14-complete-file-walkthrough/node/data/crypto.js.md)
- [repo-watchers.js](../14-complete-file-walkthrough/scripts/node/tools/watch/repo-watchers.js.md)
