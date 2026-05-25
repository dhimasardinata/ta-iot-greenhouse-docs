---
title: "Kompilasi Aplikasi (Build APK)"
description: "Catatan build APK berdasarkan snapshot Android yang tersedia dan prasyarat yang masih perlu diverifikasi."
---

# Kompilasi Aplikasi (Build APK)

Build APK adalah proses mengubah source Android menjadi berkas aplikasi yang bisa dipasang di ponsel. Pada snapshot repo ini, folder [android/](file:///home/dhimasardinata/Dokumen/ta/android/) hanya memperlihatkan tiga file teks: `AndroidManifest.xml.txt`, `activity_main.xml.txt`, dan `MainActivity.kt.txt`.

Artinya, dokumentasi ini belum bisa memastikan perintah build final, versi Android Gradle Plugin, `minSdk`, `targetSdk`, struktur module `app/`, atau file Firebase config. Halaman ini menjelaskan apa yang sudah bisa dicek dari snapshot dan apa yang perlu ada jika project Android lengkap ingin dibuild.

---

## 1. Status Bukti Snapshot

Yang sudah terlihat:

- kode Kotlin `MainActivity` ada sebagai file teks,
- layout utama ada sebagai file teks XML,
- manifest ada sebagai file teks XML,
- aplikasi memuat `https://ta.atomic.web.id/`,
- aplikasi memakai WebView, FCM topic `peringatan_kabut`, `DownloadManager`, dan bridge `AndroidBlobHandler`.

Yang belum terlihat di snapshot:

- `settings.gradle` atau `settings.gradle.kts`,
- `build.gradle` project dan module,
- `gradlew` atau `gradlew.bat`,
- folder `app/src/main/`,
- resource lengkap seperti `strings.xml`, theme, icon, backup rules,
- `google-services.json`,
- source `MyFirebaseMessagingService`.

---

## 2. Bentuk Project yang Dibutuhkan

Jika ingin membuild APK dari kode ini, tiga file teks tersebut perlu masuk ke struktur project Android lengkap. Bentuk umumnya seperti ini:

```text
android-project/
  settings.gradle
  build.gradle
  app/
    build.gradle
    src/main/
      AndroidManifest.xml
      java/.../MainActivity.kt
      res/layout/activity_main.xml
      res/values/strings.xml
      res/values/themes.xml
```

Setelah struktur lengkap ada, barulah perintah seperti `./gradlew assembleDebug` atau `./gradlew assembleRelease` dapat dipakai. Karena wrapper Gradle belum terlihat pada snapshot, perintah tersebut tidak bisa diverifikasi dari repo ini saja.

## 3. Risiko Sebelum Build

Beberapa referensi manifest mengarah ke resource yang belum terlihat pada snapshot, misalnya `@style/Theme.Atomic`, `@mipmap/ic_launcher`, `@xml/data_extraction_rules`, dan `@xml/backup_rules`. Manifest juga mendaftarkan `.MyFirebaseMessagingService`, tetapi source service tersebut belum terlihat di folder Android snapshot.

Sebelum membuat APK final, pastikan resource dan service yang dirujuk manifest benar-benar ada di project Android lengkap.

Lanjutkan ke bagian **[Debugging Android](./debugging-android.md)** untuk melihat taktik pencarian bug.
