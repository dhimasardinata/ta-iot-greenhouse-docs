---
title: "node/lib/NodeCore/commands/SetTokenCommand.cpp"
---

# node/lib/NodeCore/commands/SetTokenCommand.cpp

File ini mengimplementasikan command `settoken`.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/commands/SetTokenCommand.cpp` |
| Komponen | Firmware Node |
| Level | Lanjutan |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

Command ini mengatur token upload, token OTA, atau keduanya. Ia juga bisa menampilkan status token tanpa membuka nilai token asli.

## Aksi yang Didukung

`show` menampilkan status, `default` mengembalikan default pabrik/inherit, `none` atau `clear` menghapus override, dan nilai lain disimpan sebagai token baru.

## Catatan Keamanan

Token asli tidak dicetak. File ini hanya mencetak status seperti `set`, `empty`, `factory-default`, `override-set`, atau sumber token efektif.

## Error Handling

Format token tidak lazim tetap boleh disimpan, tetapi diberi warning karena token biasanya berbentuk `ID|SECRET`.
