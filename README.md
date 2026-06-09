# Java Mbako Astro

Project Astro lengkap untuk migrasi artikel WordPress Java Tobacco ke GitHub Pages.

## Cara pakai di lokal

```bash
npm install
npm run dev
```

Buka `http://localhost:4321`.

## Cara upload ke GitHub

Upload semua isi folder ini ke repository `javambako`, lalu commit ke branch `main`.

## Aktifkan GitHub Pages

Masuk ke repository GitHub:

Settings → Pages → Source → GitHub Actions

Setelah push, website akan dibuild otomatis.

## Catatan penting

Workflow sudah diset untuk repo bernama `javambako` dengan URL:

`https://adnanyogi88-dev.github.io/javambako/`

Kalau repository diganti nama, ubah `BASE_PATH` di `.github/workflows/deploy.yml`.
Kalau pakai custom domain, set `BASE_PATH` menjadi `/` dan `SITE_URL` menjadi domain Anda.
