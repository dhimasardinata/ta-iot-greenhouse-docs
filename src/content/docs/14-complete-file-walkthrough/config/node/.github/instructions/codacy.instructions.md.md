---
title: "node/.github/instructions/codacy.instructions.md"
---

# node/.github/instructions/codacy.instructions.md

File ini berisi instruksi untuk asisten AI saat berinteraksi dengan Codacy MCP Server.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/.github/instructions/codacy.instructions.md` |
| Komponen | Config |
| Level | Advanced |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Kenapa File Ini Ada

File ini mencoba memastikan perubahan kode yang dibuat dengan bantuan AI tetap diperiksa oleh Codacy. Isinya bukan kode firmware, tetapi aturan kerja untuk alat bantu pengembangan.

## Isi Utama

| Bagian | Fungsi |
|---|---|
| Setelah edit file | Meminta analisis Codacy pada file yang diedit. |
| Jika CLI tidak tersedia | Meminta pengguna sebelum instalasi. |
| Setelah setiap respons | Mengingatkan agar analisis sudah dijalankan jika ada edit. |
| Jika MCP tidak terhubung | Memberi langkah troubleshooting. |
| Dependency dan keamanan | Meminta analisis `trivy` setelah operasi package manager. |

## Hal yang Perlu Diperhatikan

File ini menyebut tool dan prosedur khusus Codacy MCP. Jika Codacy MCP tidak tersedia di lingkungan kerja, instruksi di file ini tidak bisa dijalankan penuh.

## Error yang Mungkin Terjadi

- Jika agent mengikuti file ini tanpa Codacy MCP aktif, proses bisa tersendat.
- Jika repository belum terdaftar di Codacy, beberapa aksi bisa gagal dengan 404.
- Jika aturan ini dipakai untuk file dokumentasi non-source, pemeriksaan bisa kurang relevan.

## Bagian untuk Pemula

File ini seperti aturan untuk asisten otomatis. Maksudnya agar setiap perubahan tetap diperiksa, bukan langsung dipercaya begitu saja.

## Bagian Advanced

Instruksi ini berada di `.github/instructions`, sehingga kemungkinan ditujukan untuk integrasi editor atau agent yang membaca instruksi repository. Ini tidak otomatis memengaruhi firmware saat build.

## Hubungan ke Sistem TA

Aturan ini mendukung proses pengembangan firmware node agar perubahan lebih disiplin diperiksa, terutama untuk keamanan dependency dan kualitas source.

