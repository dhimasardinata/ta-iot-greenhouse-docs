---
title: "Permission"
---

# Permission

Permission adalah izin yang diminta aplikasi Android.

## Permission yang Terlihat

| Permission | Fungsi |
|---|---|
| `INTERNET` | Membuka dashboard web. |
| `ACCESS_NETWORK_STATE` | Membaca status jaringan. |
| `WRITE_EXTERNAL_STORAGE` | Menulis file download pada Android lama. |
| `READ_EXTERNAL_STORAGE` | Membaca file storage pada Android lama. |

## Hubungan dengan Fitur

WebView membutuhkan internet. Download/export file membutuhkan akses penyimpanan atau DownloadManager, tergantung versi Android.

## Catatan Android Baru

Pada Android modern, aturan storage berubah. Karena manifest memakai `maxSdkVersion`, perilaku download perlu diuji pada target SDK yang dipakai project lengkap.

Lanjutkan ke [WebView Loading](./webview-loading.md).
