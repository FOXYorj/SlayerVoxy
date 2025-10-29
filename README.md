# Slayervoxy GitHub Sitesi

Modern ve renkli bir GitHub Pages sitesi. Google ile giriş, profil modalı, uzantı kartları, "Hakkımda" ve telif bilgileri içerir.

## Canlı Yayın

- GitHub Pages ayarlarından `main` veya `docs` (bu klasörü) yayınlayın.
- Site kökü olarak `github-site/` klasörünü kullanabilirsiniz.

## Yapı

- `index.html`: Ana sayfa (Google Sign-In, uzantı kartları, ticker, profil)
- `css/main.css`: Modern ve renkli tema
- `js/app.js`: Google girişi, toast, profil modalı
- `pages/yt-favorites.html`, `pages/yt-beautify.html`: Detay sayfaları

## Google Sign-In

- `index.html` içinde `YOUR_GOOGLE_CLIENT_ID` değerini kendi OAuth client ID’nizle değiştirin.
- OAuth konsolunda yetkili köken: `https://<kullanici>.github.io`
- Yetkili yönlendirme URL’si gerekmez (One Tap/ID), ancak gerekli kapsamları ekleyin.

## Geliştirme

Yerelde hızlıca test etmek için basit bir HTTP sunucu:

```bash
python -m http.server 5512
# Sonra: http://localhost:5512/github-site/index.html
```

## Uzantı Linkleri

- ZIP indirme linkleri GitHub reposu ZIP’lerine ayarlanmıştır:
  - `https://github.com/erayy0143/yt-favorites/archive/refs/heads/main.zip`
  - `https://github.com/erayy0143/yt-beautify/archive/refs/heads/main.zip`

  Altın Paslanmaz...