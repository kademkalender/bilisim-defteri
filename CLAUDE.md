# Bilişim Defteri: Claude Code için proje notları

5. ve 6. sınıf Bilişim Teknolojileri ve Yazılım dersi için, MEB Türkiye Yüzyılı Maarif Modeli öğrenme çıktılarına bağlı ders sitesi. YTÜ BÖTE stajyerleri geliştiriyor. Kullanıcılar 10–12 yaş öğrenciler ve BT öğretmenleri.

Ayrıntılar: `README.md` (yapı), `ICERIK-REHBERI.md` (ders yazma kuralları). Ders içeriğiyle ilgili her işte önce `ICERIK-REHBERI.md` dosyasını oku.

## Değişmez kurallar

1. **İnternetsiz çalışmalı.** Site `index.html` dosyasına çift tıklanarak (`file://`) açılır. Bu yüzden:
   - `fetch`, ES modülleri (`import`/`export`), dış CDN, dış font, dış görsel yok.
   - İçerik `.json` değil, `BD.lesson({...})` çağıran `.js` dosyalarıdır ve `index.html`'e `<script>` ile eklenir.
2. **Eski tarayıcı.** Hedef Chrome 84+ ve Firefox 78+ (Pardus ve eski laboratuvar bilgisayarları).
   - Not: Okul bilgisayarlarındaki tarayıcı sürümü henüz doğrulanmadı. 84'ün altında çıkarsa flex `gap` yerine `margin` kullanılacak.
   - CSS'te `color-mix`, `:has`, container query, `@layer` ve iç içe CSS kullanma.
   - JS'te ES2019 üstü sözdizimi kullanma: `?.`, `??`, `replaceAll`, `at()`, top-level await yok. Mevcut kod `var` ve `function` kullanıyor, bu üsluba uy.
3. **Kazanıma bağlılık.** `content/program.js` dosyasına sadece MEB programından birebir metin yazılır, uydurma kod ya da ifade eklenmez. Emin değilsen alanı `outcomes: null` bırak ve kullanıcıya sor.
4. **Üç sınıf ortamı.** Her dersin `activities` alanında `lab`, `tahta` ve `kagit` etkinliklerinin üçü de dolu olmalı. Bilgisayar adımlarında `pardus` ve `windows` yönergeleri ayrı yazılır.
5. **Sadece açık tema.** Koyu tema ekleme.
6. **Bağımlılık yok.** Kullanıcı istemedikçe npm paketi, framework ya da build adımı ekleme. Site düz HTML, CSS ve JS olarak kalmalı. Geliştirme araçları (test, doğrulama) `tools/` altında olabilir ve siteye dahil edilmez.

## Yapı

- `index.html`: Giriş dosyası, tüm script sıralaması burada.
- `assets/app.js`: Tek bir IIFE. Hash tabanlı yönlendirme: `#home`, `#sinif-5`, `#ders-<id>`, `#yazdir-<id>`, `#kazanimlar`, `#ogretmen`. Görünümler `viewX()` ile HTML döndürür, olaylar `bindX()` ile bağlanır.
- `assets/crossword.js`: `buildCrossword(entries)` fonksiyonu. Kelime + ipucu listesinden ızgara kurar. Harf temizleme tek yerde: `cwClean(s)`.
- `assets/shuffle.js`: `shuffleOrder(n, dersId)`. Sınıflandırma kartlarını ders id'sine göre hep aynı, karışık sırada verir.
- `assets/style.css`: Renkler `:root` içindeki değişkenlerden gelir.
- `content/program.js`: Resmi öğrenme çıktıları.
- `content/plan.js`: Haftalık plan, varsayılan ayarlar, sınıf ortamları.
- `content/lessons/*.js`: Dersler. Şablon: `_SABLON.js`.
- Ayarlar ve öğrenci ilerlemesi `localStorage` içinde `bd:` önekiyle saklanır.

## Dil

- Arayüz ve içerik Türkçe. Öğrenciye "sen", öğretmene "siz" diye hitap edilir.
- Büyük-küçük harf dönüşümlerinde `toLocaleUpperCase("tr")` ve `toLocaleLowerCase("tr")` kullan (İ/ı sorunu).
- Kod yorumları Türkçe olabilir. Değişken adları İngilizce ya da Türkçe karakter içermeyen Türkçe olabilir.

## Ponytail ile çalışma

- Ponytail'in "az kod" ilkesi bu projede de geçerli. Ama şu özellikler bilinçli gereksinimdir, fazlalık sayılmaz ve kesilmez:
  - üç sınıf ortamı (`lab`, `tahta`, `kagit`)
  - Pardus ve Windows yönergeleri
  - yazdırılabilir çalışma kâğıdı
  - internetsiz çalışma
  - Chrome 84 uyumu
  - kazanım haritası
  - bulmaca oluşturucunun çoklu denemesi
  - erişilebilirlik (alt metin, klavye, büyük yazı modu)
  - `tools/dogrula.js` kontrolleri
- Testler sadece Node'un yerleşik `node:test` modülüyle `tools/` altına yazılır. npm paketi eklenmez.
- `shortcut:` yorumları Türkçe yazılabilir.
- Bir Ponytail önerisi bu dosyadaki değişmez kurallarla çakışırsa bu dosya kazanır.

## Git güvenliği

- Şu komutları benden açıkça izin almadan ASLA çalıştırma: `git reset --hard`, `git checkout -- <dosya>`, `git restore`, `git clean`, `git stash drop`, `git push --force`, `git rebase`, `git branch -D`, `rm -rf`.
- Bir şeyi test etmek için geçici değişiklik gerekiyorsa önce commit at ya da işi `/tmp` altındaki geçici bir kopyada yap.
- Commit edilmemiş değişiklik varken riskli bir işlem yapman gerekiyorsa önce bana sor.

## Bir değişiklikten sonra

- `index.html` dosyasını tarayıcıda `file://` ile aç ve konsolda hata olmadığını kontrol et.
- Ders eklediysen: üç ortamı tek tek dene, bulmacada ipucu eksik olmadığına bak, `#yazdir-<id>` sayfasının yazdırma önizlemesini kontrol et, `#kazanimlar` sayfasında dersin doğru yerde göründüğünü doğrula.
- Varsa `node tools/dogrula.js` komutunu çalıştır.
