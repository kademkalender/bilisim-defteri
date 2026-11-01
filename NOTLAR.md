# Çalışma günlüğü

Her oturumun sonunda bir kayıt eklenir. **En yeni kayıt en üstte.**

Kayıt şablonu:

```
## YYYY-AA-GG · Kim çalıştı
**Ne yapıldı**
- <kısa hash> Açıklama
**Kararlar**
- ...
**Yarım kalan işler**
- [ ] ...
```

---

## 2026-11-01 · efee7946-cmd + Claude Code (Opus 5.5)

**Ne yapıldı**
- `7baaacb` Ana sayfa hafta numarasıyla ders seçimine çevrildi: sınıf seçimi, 36 haftalık ızgara, seçilen haftanın kartı. Arama kutusu hafta numarasını anlıyor (`7`, `7. hafta`).
- `b1ae8d9` Tasarım sistemi kuruldu: Senin UI omurgası, lacivert ana renk, gömülü Mulish. Kurallar `TASARIM-SISTEMI.md` dosyasında.
- Testler: `node tools/dogrula.js` 0 hata, 0 uyarı. `file://` açılışı headless Chrome ile denendi, konsol hatası yok. Tıklamalı akışlar localhost'ta denendi. 375 px genişlikte altı sayfada yatay taşma yok.

**Kararlar**
- Ana renk lacivert `#1E4FA3`, 6. sınıf kiremit `#B8480A`. Üst başlık lacivert dolu bant.
- Defter hissi kalıyor (çizgili kâğıt, kırmızı kenar), Comic Sans kalktı. Sarı yalnızca vurguda kullanılıyor.
- Mulish `assets/mulish.css` içine data URI olarak gömüldü, çünkü Firefox `file://` altında ayrı font dosyası yüklemiyor. Site yaklaşık 76 KB büyüdü.
- Destekleme kartlarına teal `#0B7169`, zenginleştirme kartlarına mor `#5B3FB5` verildi.
- Öğretmen görüşmesi yapılamadığı için research benchmark ve netnografiyle yürütüldü. Bulgular doğrulanmış kullanıcı araştırması sayılmaz.
- Asıl problem altyapı değil, öğrenciye ait resmî bilişim ders kitabının olmaması. Altyapı bir kısıt.
- Öğretmen dersi tarihle değil hafta numarasıyla arıyor. Bu bilginin kaynağı netleşmedi.
- `S.week` artık son seçilen hafta anlamına geliyor. Ana sayfa ve Öğretmen Masası aynı değeri kullanıyor.

**Yarım kalan işler**
- [ ] Plan 5. sınıfta 7. haftada, 6. sınıfta 2. haftada bitiyor. Hafta numaraları örnek, yıllık plana göre güncellenmeli.
- [ ] Ana sayfadaki hafta seçimi, sınıf sayfasındaki "Bu hafta" etiketini de değiştiriyor. Ayrılıp ayrılmayacağına karar verilmeli.
- [ ] Arama kavramları bulmuyor ("uzantı"), "ağ" da "Sağlık"ı buluyor.
- [ ] Yeni ana sayfa ve tasarım sistemi Chrome 84 ve Firefox 78'de denenmedi. Gömülü fontun Firefox `file://` altında çalıştığı doğrulanmalı.
- [ ] Yeni tasarımda gerçek yazdırma önizlemesi ile tahta ve bilgisayarsız ortamların etkinlik görünümü denenmedi.

---

## 2026-10-31 · Kadem Kalender + Claude Code (Opus 5.5)

**Ne yapıldı**
- `0d383ce` Ponytail eklentisi kuruldu ve hook'ları incelendi. CLAUDE.md'ye "Ponytail ile çalışma" bölümü eklendi.
- Tüm repo denetlendi (`/ponytail-audit`), 10 bulgu çıktı. Uygulanan düzeltmeler:
  - `224a165`, `f2f9ff6` Erişilebilirlik: slayt düğmelerinde Boşluk tuşu düğmeye basıyor (oklar ve Esc çalışmaya devam ediyor). `main` üzerindeki `aria-live` kaldırıldı.
  - `5332aef` Tarayıcı uyumu: tam ekranda `inset` yerine `top/right/bottom/left`. Hedef Chrome 84+ ve Firefox 78+ oldu.
  - `b9f5511` Sınıflandırma kartları ders id'sinden tohum alan Fisher–Yates ile karışıyor (`assets/shuffle.js`). Bulmacada Â→A, Î→İ, Û→U dönüşümü tek yerde yapılıyor (`cwClean`, `assets/crossword.js`).
  - `a067aa8` Öğrenci ilerlemesini silme. Öğretmen Masası'nda tüm bilgisayar için (site içi onay kutusuyla), ders sayfasında sadece o ders için.
  - `59038f1` `dogrula.js`'e üç HATA kontrolü: karışmayan kartlar, temizlenince harf kaybeden bulmaca kelimesi, ızgarada ipucusuz harf dizisi.
  - `5d25ffb` Temizlik: biriken `resize` ve `fullscreenchange` dinleyicileri, `#ders-constructor` gibi adresler, boş bulmacada yazdırma sayfasının çökmesi, ölü kod.
- Testler headless Chrome 156 ile `file://` üzerinden yapıldı ve 40 kontrolün 40'ı geçti: klavyeyle slaytlar, 7 kartlı sınıflandırma ve "Zekâ" bulmacası (geçici kopyada), ilerleme silme. `/ponytail-review` çalıştırıldı.
- NOTLAR.md (bu dosya) eklendi, CLAUDE.md'ye günlük kuralı yazıldı.

**Kararlar**
- Ponytail'in "az kod" ilkesi geçerli, ama CLAUDE.md'deki bilinçli gereksinimler kesilmez. Çakışırsa CLAUDE.md kazanır.
- Ponytail incelemesi: hook'lar ağa bağlanmıyor, webhook sadece adres girilirse çalışıyor. "Ledger" seçeneği açık ve `~/.config/ponytail/band/` altına görev kaydı yazıyor.
- Hedef tarayıcı Chrome 84+, çünkü flex `gap` kalıyor. Okul bilgisayarlarında 84'ün altı çıkarsa `gap` yerine `margin` kullanılacak.
- Kart karıştırma tekrarlanabilir: aynı ders hep aynı sırayı verir. Sıra orijinalle aynı çıkarsa bir kez daha karıştırılır, yine aynıysa `dogrula.js` HATA verir.
- İlerleme silme sadece `bd:act:`, `bd:nb:`, `bd:cw:` kayıtlarını siliyor. Ayarlar (`bd:settings`, `bd:big`, `bd:printOpts`) hiç silinmiyor. `confirm()` kullanılmıyor.
- "Bu dersin ilerlemesini sıfırla" bir bağlantı değil düğme (bir işlem yaptığı için) ve onay sormuyor.
- Testler sadece Node'un yerleşik `node:test` modülüyle `tools/` altına yazılacak, npm paketi eklenmeyecek.

**Yarım kalan işler**
- [ ] Okul bilgisayarlarındaki Chrome ve Firefox sürümleri doğrulanmalı.
- [ ] İnceleme bulgusu 1: Ders sıfırlandıktan sonra "N kayıt silindi" mesajını ekran okuyucu okumayabilir. Önerilen çözüm, mesajı `setTimeout` ile 100 ms sonra yazmak. Karar bekliyor.
- [ ] İnceleme bulgusu 2: Ders sıfırlama düğmesi öğrencinin de açabildiği öğretmen panelinde ve onay sormuyor. Karar bekliyor.
- [ ] 40 kontrollü tarayıcı test betiği repoda değil, oturumun scratchpad klasöründe kaldı. Kalıcı olması isteniyorsa `tools/` altına taşınmalı (çalışması için Chrome ve Node 22 gerekir).
- [ ] Gerçek ekran okuyucuyla ve gerçek Chrome 84'te deneme yapılmadı.
- [ ] README yol haritasına eklendi: ders içeriği değişince kayıtlı "Yaptım" ve defter işaretleri kayabilir.

---

## 2026-10-30 · Kadem Kalender

*Bu kayıt git geçmişinden sonradan özetlendi.*

**Ne yapıldı**
- `25c300c` İlk demo: kazanım merkezli yapı ve 3 ders (5-1-5, 5-1-6, 6-1-1).
- `f66c715` Hassas konular kuralı netleştirildi. `hours` alanının nasıl doldurulacağı belgelendi.
- `219fb35` `tools/dogrula.js` içerik doğrulama betiği eklendi.
- `ae4b600` Doğrulayıcı git pre-commit hook'una bağlandı. Kurulum `tools/kur.sh` ve `tools/kur.bat` ile yapılıyor.
- `774bede` Slaytlara görsel desteği: tam görsel (`img`) ve metin + yan görsel (`side`).
- `de82fb5` CLAUDE.md'ye Git güvenliği bölümü eklendi.

**Kararlar**
- Hassas konularda yasak, ticari marka ve uygulama adlarıyla sınırlı. Bilim ve teknoloji tarihindeki kişiler anılabilir (örneğin Ada Lovelace).
- `hours` alanı sadece MEB kaynağından doğrulanmışsa yazılır.
- Doğrulayıcı npm paketi kullanmıyor, Node'un `vm` modülüyle çalışıyor. HATA commit'i durduruyor. Bilgisayarda Node yoksa hook commit'i engellemiyor, sadece uyarıyor.
- Slayt görselleri 1600×900 PNG olacak, tercihen 300 KB altında. Telifsiz olacak ve `alt` metni zorunlu.
- Bir oturumda `git reset --hard` commit edilmemiş işi sildi. O yüzden riskli git komutları artık açık izin olmadan çalıştırılmıyor.

**Yarım kalan işler**
- [ ] `content/img/5-1-6-dosya-klasor/ornek-01.png` ve `ornek-02.png` geçici görseller. Gerçek görsellerle değiştirilmeli.
- [ ] Diğer yarım işler git geçmişinden çıkarılamadı. Bkz. README "Yol haritası".
