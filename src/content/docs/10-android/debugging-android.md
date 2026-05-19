---
title: "Debugging Android"
---

# Debugging Android

Debugging Android berfokus pada WebView, jaringan, permission, download, dan FCM.

## Area Cek

1. Logcat tag `FCM_TOKEN`, `FCM_TOPIC`, dan `WEBVIEW_ERROR`.
2. Koneksi internet perangkat.
3. URL dashboard.
4. Permission storage.
5. DownloadManager queue.
6. Blob export bridge.
7. Firebase topic subscription.

## Gejala Umum

| Gejala | Area Dicek |
|---|---|
| Web tidak muncul | Internet, URL, WebView error |
| Loading tidak hilang | `onPageFinished`, redirect/error |
| Export gagal | blob handler, storage permission |
| Notifikasi kabut tidak masuk | FCM token, topic, service |
| Download biasa gagal | DownloadManager, URL, permission |

Lanjutkan ke [File Reference Android](./file-reference/index.md).
