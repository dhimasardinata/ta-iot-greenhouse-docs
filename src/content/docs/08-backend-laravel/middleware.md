---
title: "Middleware"
---

# Middleware

Middleware adalah lapisan yang memproses request sebelum sampai ke controller atau sebelum response dikirim.

## Status Bukti

File middleware tidak terlihat di snapshot awal. Controller juga tidak memperlihatkan langsung middleware route yang dipakai.

## Middleware yang Mungkin Relevan

Secara konsep Laravel, middleware bisa dipakai untuk:

- autentikasi user,
- token API,
- rate limiting,
- CSRF protection,
- role/permission,
- logging request.

Namun detail middleware sistem ini belum terkonfirmasi dari kode.

## Catatan untuk File-by-File

Jika route/middleware nanti ditemukan, dokumentasi harus menjelaskan endpoint mana yang dilindungi dan siapa yang boleh mengaksesnya.

Lanjutkan ke [Authentication](./authentication.md).
