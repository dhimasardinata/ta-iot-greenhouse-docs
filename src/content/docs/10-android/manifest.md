---
title: "Manifest"
---

# Manifest

Manifest menjelaskan permission dan komponen aplikasi Android.

## Bukti dari Kode

`AndroidManifest.xml.txt` mendefinisikan permission:

- `INTERNET`
- `ACCESS_NETWORK_STATE`
- `WRITE_EXTERNAL_STORAGE` sampai SDK 29
- `READ_EXTERNAL_STORAGE` sampai SDK 32

Manifest juga mendefinisikan:

- `MainActivity` sebagai launcher,
- `MyFirebaseMessagingService` untuk Firebase Messaging.

## Risiko

`MyFirebaseMessagingService` disebut di manifest, tetapi file service tersebut tidak terlihat di snapshot awal. Perlu diverifikasi di project Android lengkap.

Lanjutkan ke [Activity](./activity.md).
