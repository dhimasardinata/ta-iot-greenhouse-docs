---
title: "node/lib/NodeCore/commands/ICommand.h"
---

# node/lib/NodeCore/commands/ICommand.h

File ini adalah interface dasar untuk semua command terminal node.

## Metadata File

| Item | Nilai |
|---|---|
| Source file | `node/lib/NodeCore/commands/ICommand.h` |
| Komponen | Firmware Node |
| Level | Menengah |
| Status | Drafted |
| Terakhir diperiksa | 2026-05-19 |

## Ringkasan Sederhana

`ICommand` memaksa setiap command punya nama, deskripsi, bagian help, aturan auth, hash nama, dan method `execute`.

## Isi Penting

| Bagian | Fungsi |
|---|---|
| `CommandSection` | Mengelompokkan command ke public, sensor, calibration, config, Wi-Fi, atau system. |
| `getName_P` | Nama command dari flash/PROGMEM. |
| `getDescription_P` | Deskripsi command untuk help. |
| `requiresAuth` | Menentukan command perlu login atau tidak. |
| `getNameHash` | Hash FNV-1a untuk lookup command lebih cepat. |
| `execute` | Fungsi yang benar-benar menjalankan command. |

## Catatan Desain

Command bisa override `getNameHash` dengan hash compile-time agar terminal tidak harus menghitung hash nama terus-menerus.

## Hubungan dengan Laporan TA

File ini menjelaskan pola command terminal: setiap fitur operator dibuat sebagai class command yang seragam.
