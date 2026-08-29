# CBT Online - Sistem Ujian Berbasis Online + AI Groq

Aplikasi CBT final production ready, single file, siap deploy ke GitHub Pages.

## Fitur
- Login 3 role: Admin (admin/admin), Pengawas (pengawas/pengawas), Siswa (NIS 20241001-20241025 / siswa123)
- Import Siswa XLSX, Export Hasil XLSX & PDF
- Bank Soal: PG 5 opsi single & multi-kunci, Benar/Salah, Essay
- Groq AI: Generate soal & koreksi essay otomatis (auto-detect model)
- GitHub Sync: database.json sebagai database utama

## Cara Deploy ke GitHub Pages
1. Buat repo baru di GitHub, misal `cbt-online`
2. Upload 2 file ini: `index.html` dan `database.json` ke branch main (root)
3. Buka Settings > Pages > Source: Deploy from branch, Branch: main, Folder: / (root) > Save
4. Tunggu 1-2 menit, akses di https://USERNAME.github.io/cbt-online/

## Setting Groq API
1. Daftar di console.groq.com, buat API Key
2. Login sebagai Admin > Pengaturan AI > Paste Key > Test Koneksi
3. Pilih model yang terdeteksi

## Setting GitHub Sync
1. Buat Personal Access Token classic di github.com/settings/tokens (centang repo)
2. Di Admin > Pengaturan > Backup GitHub: isi PAT, Owner, Repo (cbt-online), Branch main, Path database.json
3. Klik Save ke GitHub. Aktifkan Auto-load dari GitHub agar saat dibuka load dari raw.githubusercontent.com

## Struktur database.json
```json
{
  "version": "final-1.0",
  "siswa": [...],
  "bankSoal": [...],
  "ujian": [...],
  "hasil": [...],
  "settings": {...}
}
```

File ini yang akan dibaca pertama kali jika autoLoad aktif.

Dibuat untuk Alif Jum'an - Sumedang, Jawa Barat
