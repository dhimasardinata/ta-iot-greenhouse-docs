---
title: "Folder Overview: Other"
---

# Folder Overview: Other

Folder ini disiapkan untuk file yang tidak masuk komponen utama.

## Status Inventory Awal

Kategori Other berisi file existing documentation, placeholder README, dan snapshot context yang tidak menjadi runtime source utama. File seperti ini dicatat di coverage agar tidak hilang, tetapi diberi status `Skipped With Reason` jika memang bukan source yang perlu dijelaskan file-by-file.

## Contoh yang Di-skip

- `goal.md` sebagai instruksi dokumentasi,
- `node/README.md`,
- `node/SECURITY.md`,
- `node/docs/*`,
- `gateway/lib/README`,
- `gateway/test/README`,
- `node/tools/context/*`.

## Aturan

Jika nanti ada file Other yang ternyata source penting, statusnya harus diubah dari skip menjadi pending dan dibuatkan halaman file-by-file.

Lihat [Coverage Report](../coverage-report.md) untuk status terbaru.
