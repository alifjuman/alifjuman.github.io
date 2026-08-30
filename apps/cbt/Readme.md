# TEMPLATE GOOGLE SHEETS CBT ONLINE - PANDUAN LENGKAP

## File dalam paket:
1. Code.gs - Kode Apps Script (copy paste)
2. CBT-Hasil-Template.csv - Header Sheet (import opsional)

## LANGKAH 1: Buat Google Sheets

1. Buka https://sheets.google.com
2. Klik Blank spreadsheet
3. Ganti nama jadi: CBT-Hasil-2026
4. Di baris 1 (header), copy paste ini persis (16 kolom):

id | ujianId | ujianNama | nis | nama | kelas | mapel | nilaiPG | nilaiEssay | total | status | waktuMulai | waktuSelesai | durasiMenit | jawabanJSON | timestampServer

ATAU import file CBT-Hasil-Template.csv: File > Import > Upload > Replace current sheet

5. Format header: Bold, background biru #4F46E5, text putih
6. Freeze baris 1: View > Freeze > 1 row

## LANGKAH 2: Pasang Apps Script

1. Di Sheet, klik Extensions > Apps Script
2. Hapus semua kode default
3. Copy paste isi file Code.gs
4. Klik Save (ikon disket), beri nama: CBT Backend

5. Deploy:
   - Klik Deploy > New deployment
   - Type: Web app
   - Description: CBT Hasil v1
   - Execute as: Me (email kamu)
   - Who has access: Anyone (PENTING!)
   - Klik Deploy
   - Authorize > Pilih akun > Advanced > Go to CBT Backend (unsafe) > Allow
   - Copy Web App URL: https://script.google.com/macros/s/AKfycb.../exec

6. Test:
   - Di Apps Script editor, pilih function testAdd > Run
   - Cek Sheet, harus ada 1 baris test masuk
   - Jika ada, hapus baris test tersebut

## LANGKAH 3: Hubungkan ke Aplikasi CBT

1. Buka aplikasi CBT: https://alifjuman.github.io/cbt-online/ (atau file lokal)
2. Login Admin: admin / admin
3. Masuk Pengaturan > Integrasi Google Sheets
4. Paste Web App URL yang tadi di-copy
5. Klik Test Koneksi -> harus muncul "Koneksi Berhasil!"
6. Aktifkan toggle "Aktifkan simpan ke Sheets"

## LANGKAH 4: Test dari Siswa

1. Login sebagai siswa: 20241001 / siswa123
2. Kerjakan ujian dengan token MATH25
3. Submit -> harus muncul toast "Jawaban terkirim ke Google Sheets!"
4. Cek Sheet -> ada baris baru masuk otomatis

## LANGKAH 5: Pengawas Tarik Data

1. Login Pengawas: pengawas / pengawas
2. Rekap Hasil > Tab Google Sheets > Klik "Tarik dari Google Sheets"
3. Data live dari Sheets muncul, bisa Export XLSX

## TROUBLESHOOTING

- Error CORS: Pastikan deploy Who has access = Anyone, bukan Only myself
- Data tidak masuk: Cek Executions di Apps Script (kiri > Executions) lihat log error
- Test Koneksi gagal: Coba buka URL Web App di browser, harus muncul [] atau JSON kosong, bukan error 403

## KEAMANAN

- Web App URL dengan Anyone memang public, tapi hanya bisa append dan read hasil. Untuk lab sekolah aman.
- Jangan share URL ini ke luar sekolah jika tidak ingin orang lain submit palsu
- Untuk extra aman: tambahkan token rahasia di doPost: if(e.parameter.token != "RAHASIA123") return error

## CUSTOM MAPEL

Mapel custom yang kamu tambah di Admin > Kelola Mapel otomatis ikut kesimpan di database.json (bukan di Sheets). Sheets hanya untuk hasil.

Selesai!
