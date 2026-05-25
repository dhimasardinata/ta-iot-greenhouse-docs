---
title: "Tabel Users"
description: "Rincian spesifikasi kolom tabel users, tipe data, indeks unik email, dan kegunaannya untuk autentikasi administratif."
---

# Tabel Users

Tabel `users` menyimpan akun pengguna administratif jika dashboard memakai login berbasis session Laravel. File login/auth lengkap tidak ada di snapshot, tetapi tabel ini adalah bentuk umum yang diperlukan untuk kontrol akses admin.

---

## Spesifikasi Struktur Kolom Tabel (`users`)

| Nama Kolom | Jenis Tipe Data | Aturan Constraint | Default | Deskripsi Fungsi |
|---|---|---|---|---|
| **id** | `int` unsigned | `PRIMARY KEY`, `AUTO_INCREMENT` | - | ID unik pengguna admin. |
| **name** | `varchar(255)` | `NOT NULL` | - | Nama lengkap administrator. |
| **email** | `varchar(255)` | `UNIQUE INDEX`, `NOT NULL` | - | Alamat email (digunakan untuk login). |
| **password** | `varchar(255)` | `NOT NULL` | - | Password akun, terenkripsi hash bcrypt. |
| **remember_token** | `varchar(100)` | `NULLABLE` | `NULL` | Token token persisten untuk fitur login "Remember Me". |
| **created_at** | `timestamp` | `NULLABLE` | `NULL` | Waktu pendaftaran akun dibuat. |
| **updated_at** | `timestamp` | `NULLABLE` | `NULL` | Waktu modifikasi terakhir data akun. |

---

## Indeks Database (Indexes)

*   **PRIMARY KEY (`id`)**: Indeks utama cepat.
*   **UNIQUE INDEX (`users_email_unique`)**: Kunci unik pada kolom `email` untuk mencegah pendaftaran dua akun dengan email yang sama dan mempercepat verifikasi lookup email saat login.

---

## Contoh Data Baris Seeder

Seeder proyek dapat mengisi satu akun default untuk pengujian lokal. Nilai berikut hanya contoh bentuk data, bukan kredensial yang harus dipakai produksi:

| id | name | email | password | remember_token |
|---|---|---|---|---|
| 1 | Administrator TA | admin@greenhouse.org | `$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi` | `NULL` |

Gunakan password yang diganti per deployment dan jangan menaruh kredensial produksi di dokumentasi publik.

Lanjutkan ke bagian **[Tabel Greenhouses](./tabel-greenhouses.md)** untuk mempelajari wadah rumah kaca anggrek.
