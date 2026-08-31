# CBT Essay - GitHub Pages + Google Sheets + Groq AI

Sistem ujian CBT Essay 100% frontend, bisa dihost di GitHub Pages.

### Alur
Siswa (GitHub Pages) -> Kirim jawaban ke Google Sheet (via Apps Script) -> Admin tarik data dari Sheet -> Koreksi pakai Groq AI langsung di browser -> Update nilai ke Sheet.

### Setup 5 Menit
1. Buat Google Sheet baru
2. Menu Extensions > Apps Script > Paste kode dari `apps-script/Code.gs`
3. Deploy > New Deployment > Web App > Execute as: Me, Who has access: Anyone
4. Copy URL Web App
5. Buka `index.html` (atau GitHub Pages), Tab Setup > Paste URL + Groq API Key (`gsk_...`) > Autodetect Model

### Deploy ke GitHub Pages
1. Buat repo baru di GitHub
2. Upload `index.html` ke branch `main`
3. Settings > Pages > Source: Deploy from branch, Branch: main, Folder: / (root)
4. Akses: `https://username.github.io/repo-name/`

### File
- `index.html` : Aplikasi utama (single file, siap GitHub Pages)
- `apps-script/Code.gs` : Backend Google Sheets
- `.github/workflows/deploy.yml` : Auto deploy

### Groq Autodetect
Fitur autodetect akan fetch https://api.groq.com/openai/v1/models dengan API key kamu dan otomatis memilih model terbaik yang tersedia.

### Keamanan
- Groq API Key disimpan di localStorage admin saja, tidak terkirim ke Sheet
- Apps Script URL bisa dibatasi aksesnya jika perlu
