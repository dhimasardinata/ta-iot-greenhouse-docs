---
title: "AndroidManifest Android"
description: "Analisis AndroidManifest.xml berdasarkan deklarasi yang terlihat pada snapshot Android."
---

# AndroidManifest Android

Berkas manifest pada snapshot ini terlihat sebagai [AndroidManifest.xml.txt](file:///home/dhimasardinata/Dokumen/ta/android/AndroidManifest.xml.txt). File ini mendeklarasikan permission, `MainActivity`, referensi theme/resource, dan satu service Firebase Messaging.

---

## 1. Pendaftaran Aktivitas Utama (`MainActivity`)

Aktivitas utama dideklarasikan sebagai titik masuk tunggal (*Launcher Activity*) aplikasi:
```xml
<activity
    android:name=".MainActivity"
    android:exported="true"
    android:label="@string/app_name"
    android:theme="@style/Theme.Atomic">

    <intent-filter>
        <action android:name="android.intent.action.MAIN"/>
        <category android:name="android.intent.category.LAUNCHER"/>
    </intent-filter>
</activity>
```

### Parameter Konfigurasi:
*   **`android:name=".MainActivity"`**: Menunjuk ke kelas Kotlin [MainActivity.kt.txt](file:///home/dhimasardinata/Dokumen/ta/android/MainActivity.kt.txt).
*   **`android:exported="true"`**: Mengizinkan sistem operasi Android di luar aplikasi untuk memulai aktivitas ini (wajib disetel true untuk launcher utama).
*   **`android:theme="@style/Theme.Atomic"`**: Mengarah ke resource theme. File resource theme belum terlihat pada snapshot, jadi detail tampilannya belum bisa dipastikan dari folder Android ini saja.
*   **`Intent Filter`**: Kombinasi `action.MAIN` dan `category.LAUNCHER` menjadikan `MainActivity` entrypoint launcher aplikasi.

---

## 2. Pendaftaran Layanan Notifikasi Latar Belakang (`Firebase`)

Manifest mendaftarkan service Firebase Cloud Messaging:
```xml
<service
    android:name=".MyFirebaseMessagingService"
    android:exported="true">
    <intent-filter>
        <action android:name="com.google.firebase.MESSAGING_EVENT" />
    </intent-filter>
</service>
```
Deklarasi ini menunjukkan aplikasi mengharapkan kelas `.MyFirebaseMessagingService` untuk menangani event `com.google.firebase.MESSAGING_EVENT`. Namun, source service tersebut belum terlihat di snapshot Android. Karena itu, halaman ini tidak menganggap perilaku render notifikasi background sudah terkonfirmasi.

---

## 3. Konfigurasi Pencadangan Otomatis (Backup Rules)

Manifest menyetel:

```xml
android:allowBackup="true"
android:dataExtractionRules="@xml/data_extraction_rules"
android:fullBackupContent="@xml/backup_rules"
```

Artinya aplikasi merujuk aturan backup Android. File XML `data_extraction_rules` dan `backup_rules` belum terlihat pada snapshot, sehingga isi aturan backup belum bisa dijelaskan secara pasti.

Lanjutkan ke bagian **[MainActivity](./activity.md)** untuk melihat logika eksekusi kode Kotlin.
