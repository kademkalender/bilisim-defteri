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

## 2026-11-03 · Kadem Kalender + Claude Code (Opus 5.5)

**Ne yapıldı**
- GitHub'dan güncelleme alındı: efee7946-cmd'nin 2026-11-01 tarihli 36 commit'i (`7baaacb`..`da9f446`) ileri sarmayla çekildi, çakışma yok. `dogrula.js`: 0 hata, 0 uyarı.
- Oturum başı kontrolü kuruldu: `tools/hooks/oturum-basi.js` (SessionStart hook'u, `.claude/settings.json`). Gelen commit'leri, push edilmemiş commit'leri ve commit edilmemiş değişiklikleri bildiriyor. Sadece fetch yapıyor, pull yapmıyor.
- CLAUDE.md'ye "Oturum başı" bölümü eklendi. README'ye hook izni notu eklendi. `.claude/settings.local.json` `.gitignore`'a eklendi.
- `2382ff7` Okul takvimi: `BD.calendar` (2026-2027 MEB takvimi) ve `assets/hafta.js`. Tatil haftaları sayılmıyor, 1. dönem 18, yıl 37 öğretim haftası. Test: `tools/hafta.test.js` (10 kontrol).
- `b8388bc` Öğretmen görünümü de B tasarımına geçti: açık üst bant, "Bu hafta" kartı, renkli tema kareleri, ders bandı, bölüm renginde sekmeler, kart kart Öğretmen Masası.
- `59f6793` Öğrenci görünümü B tasarımına geçti: sınıf kartları, "Bu hafta" kartı ve hafta okları, `#dersler`, ders bandı ve 5 bölüm kartı. Öğretmen görünümünün yerleşimi aynı.
- `c01470d` Tasarım seçenekleri: `mockups/` altında üç yön (A sade, B renkli kartlar, C uygulama gibi). Her yön için ana sayfa ve ders sayfası, 1366 ve 1920 px ekran görüntüleri var. Mevcut tasarımın değerlendirmesi `mockups/README.md` dosyasında. Siteye dokunulmadı.

**Kararlar**
- Öğretmen derste sık bölüm değiştirdiği için bölüm kartlarını kullanmıyor, renkli sekmelerle her bölüm tek tıkla açılıyor. 1366×768'de öğretmenin slaytı biraz kayıyor (slayt en az 520 px), 1920'de sığıyor.
- Kullanıcı B (renkli kartlar) yönünü seçti. Bu turda yalnızca öğrenci görünümü değişti, öğretmen yerleşimi sonraki iş.
- "Bu hafta" MEB takviminden hesaplanıyor, çünkü öğretmenin ayarı öğrenci bilgisayarına ulaşmıyor. Hoca "x. haftayı açın" diyor: öğrenci ‹ › oklarıyla önceki ve sonraki haftaya tek tıkla geçiyor. Oklarla seçilen hafta bellekte, sayfa yenilenince bu haftaya dönüyor.
- Plandaki hafta adları hâlâ örnek. Hafta numarası takvimden doğru gelse de o haftanın konusu rehber öğretmenin planıyla tutmayabilir.
- Öğrenci derse bölüm kartlarıyla giriyor (her bölüm için bir tık fazla). Alttaki düğme sıradaki bölümü açıyor, bölüm sonundaki "Sonraki bölüm" düğmesi duruyor.
- Sunum'un ✓'i önceki karar gereği saklanmıyor; yenilenince bölüm kartında da "Bitti" gidiyor.
- Betik dal adını sabit yazmıyor, takip edilen uzak dalı (`@{u}`) kullanıyor (dal şu an `master`).
- fetch 15 sn içinde biterse sonuç güncel. İnternet yoksa uyarı verip eski bilgiyi gösteriyor, oturum engellenmiyor.

**Yarım kalan işler**
- [ ] Gelen `program.js` metni MEB programıyla elle karşılaştırılmadı.
- [ ] `BD.calendar` her yıl yeni MEB takvimiyle güncellenmeli. Okul bilgisayarlarının saati yanlışsa "Bu hafta" yanlış çıkar, oklar ve "Bütün dersler" yedek yol.
- [ ] İçerikteki emojiler (etkinlikte 🎯 🧰, ortam seçiminde 💻 🖥️ ✏️, bulmaca ve oyun mesajları) Pardus'ta kutu olarak görünebilir, denenmedi.
- [ ] Yeni tasarım Firefox 78 ve gerçek Pardus makinesinde denenmedi (sadece macOS'ta Chrome 156).

---

## 2026-11-01 · efee7946-cmd + Claude Code (Opus 5.5)

**Ne yapıldı**
- `7baaacb` Ana sayfa hafta numarasıyla ders seçimine çevrildi: sınıf seçimi, 36 haftalık ızgara, seçilen haftanın kartı. Arama kutusu hafta numarasını anlıyor (`7`, `7. hafta`).
- `b1ae8d9` Tasarım sistemi kuruldu: Senin UI omurgası, lacivert ana renk, gömülü Mulish. Kurallar `TASARIM-SISTEMI.md` dosyasında.
- `3c5e41b` Rol ayrımı: site ilk açılışta rol soruyor. Öğrenci sunum ve ekranda doldurulan çalışma kâğıdını görüyor, öğretmen ayrıca ders akışı, ölçme, notlar ve yazdırmayı görüyor.
- `bb52df6` Ders sayfası sekmeli oldu: aynı anda tek bölüm görünüyor, bölüm sonunda "Sonraki bölüm" düğmesi var.
- `c8d46eb` Design review (`/outsider-design-review`, 4 yüksek, 11 orta, 7 düşük bulgu) sonrası yüksek önemli 4 bulgu düzeltildi: "Bu hafta" ayrımı, A+ tüm yazıları büyütüyor, sayfa başlığı ve odak değişiyor, "İçeriğe geç" bağlantısı, geri bildirimde ✓ ve ✕ işaretleri.
- `9cd7b8e` Kalan 18 bulgu ele alındı: test kaydı ve yeniden çözme, sekmede ✓, geri tuşuyla sekme geçmişi, açılır oyun ve destekleme bölümleri, boş haftada en yakın ders, geniş arama, slayt ve bulmacanın küçük ekran düzeni, kâğıtta alt metnin kalkması, ders sıfırlama onayı, role göre metinler.
- `b893861` Destekleme ve zenginleştirme bölümü ders sayfasından kaldırıldı.
- `ce2ca92` Gestalt değerlendirmesinin öncelikli 4 düzeltmesi: hafta ızgarası, üst menü, alt çizgili sekmeler, Rol ve A+ ayrımı.
- `8e8b04d` Ana sayfa hafta listesine çevrildi: öğretmen temalara bölünmüş `7. hafta · Ders adı` satırları, öğrenci 1. ve 2. dönem altında aynı satırlar. Hafta ızgarası ve "Bu hafta" ayarı kalktı, son açılan ders üstte (`bd:last`). `#sinif-N` sınıfı seçip ana sayfayı açıyor.
- `8fb11e8` `content/program.js` iki sınıfın altı temasıyla MEB ünite sayfalarından birebir dolduruldu (5. sınıf 24 çıktı, 79 bileşen; 6. sınıf 25 çıktı, 88 bileşen). 1. temadaki kısaltılmış ifadeler düzeltildi.
- `eaa95f3` Plan iki sınıfta 34 haftaya tamamlandı. "Ders akışı" sekmesi "Ders planı" oldu ve öğretmende ilk sekme. Hafta satırından süreç bileşenleri ve "Derse başlarken" kalktı. `tools/dogrula.js` hafta sayısını ve haftasız çıktıyı da denetliyor.
- `7e7c78d` A+ düğmesi öğrenci görünümünden kalktı.
- `c819166` Öğrenci dönem başlığından hazır ders sayısı kalktı, yalnızca açma oku var. Öğretmen başlığındaki saat, hafta ve hazır ders sayısı duruyor.
- `af9a59c` İkinci design review (2 yüksek, 7 orta, 8 düşük bulgu) sonrası kalan 13 bulgu düzeltildi: aramadan seçilen hafta açılıp ekrana geliyor (`#sinif-5-8`), arama sonucu ekran okuyucuya bildiriliyor, tema başlığında hafta aralığı, öğrenciden kod ve tema kalktı, Kazanım Haritası temalara bölündü (1280 px'te 11.898 px'ten 3.186 px'e).
- `6b46472` İkinci Gestalt taramasının 6 düzeltmesi: hafta satırında kodlar aynı sütunda, öğretmende soluk satır yok, ana sayfanın alt kartları kalktı, haritada hafta kazanımın yanına geçti, tek kod etiketi biçimi, sekme boşlukları (blok arası 24 px).
- `a634751` Çalışma Kâğıtları ayrı sayfa oldu (`#kagitlar`), üst menüye eklendi. Öğretmen Masası'nda yalnızca ayarlar kaldı.
- `b49c18c` Öğrenciye "Bu sayfa açılmadı" uyarısı gösterilmiyor.
- `27ef16e` Üst bant düzeltmeleri: öğretmen arama yazısı "Ders, hafta, kod", marka-arama-menü boşluğu 16 px, menüde "Kazanım Haritası", A+ için ekran okuyucu adı "Yazıyı büyüt".
- Testler: `node tools/dogrula.js` 0 hata, 0 uyarı. `file://` açılışı headless Chrome ile denendi, konsol hatası yok. Tıklamalı akışlar localhost'ta denendi. 375 px genişlikte altı sayfada yatay taşma yok. A+ açıkken 375 ve 882 px'te taşma yok. Sekme geçmişi, test kaydı ve yenileme `file://` altında gerçek Chrome'da (CDP) denendi, konsol hatası yok. 375 px'te üç dersin hiçbir slaytı taşmıyor.

**Kararlar**
- Ana renk lacivert `#1E4FA3`, 6. sınıf kiremit `#B8480A`. Üst başlık lacivert dolu bant.
- Defter hissi kalıyor (çizgili kâğıt, kırmızı kenar), Comic Sans kalktı. Sarı yalnızca vurguda kullanılıyor.
- Mulish `assets/mulish.css` içine data URI olarak gömüldü, çünkü Firefox `file://` altında ayrı font dosyası yüklemiyor. Site yaklaşık 76 KB büyüdü.
- Destekleme ve zenginleştirme şimdilik gereksiz bulundu, ekrandan kalktı. İçerik ders dosyalarındaki `diff` alanında ve `_SABLON.js` içinde duruyor, geri açmak için metin yazmak gerekmez. Renk değişkenleri (`--support`, `--enrich`) de silindi.
- Sınıfta öğretmen sunumu tahtada, öğrenciler kendi bilgisayarında açıyor. Rol seçimi `S.role` ile bilgisayarda saklanıyor. Şifre yok, bu güvenlik değil düzen ayrımı: öğrenci rol düğmesinden öğretmen görünümüne geçebilir.
- Öğrencide ortam hep `lab`, işletim sistemi `navigator.platform` ile seçiliyor, çünkü öğretmenin ayarı öğrencinin bilgisayarına ulaşmıyor.
- Öğretmenin arama yazısı haftayı söylemeli, çünkü öğretmen dersi hafta numarasıyla arıyor. Üst bant yaklaşık 1100 px altında iki satıra iniyor (112 px); okul ekranlarının genişliği doğrulanmadı.
- Öğrenci görünümünde `#kazanimlar`, `#kagitlar`, `#ogretmen` ve `#yazdir-<id>` adresleri uyarı göstermeden ana sayfayı açıyor. Adres çubuğu yazılan adreste kalıyor.
- Test cevapları `bd:quiz:<id>` içinde saklanıyor ve ilerleme silmeye dahil. Sunum sekmesinin ✓'i saklanmıyor, sayfa yenilenince gidiyor, çünkü sunumu öğretmen yönetiyor.
- Sekme değişimi `history.pushState` ile geçmişe yazılıyor, adres değişmiyor. Yenilemede Sunum'a dönme kuralı korundu.
- Slayt düğmeleri uçlarda `disabled` değil `aria-disabled`: odak kaybolmasın, ok tuşları çalışsın.
- 760 px altında üst bant sabit değil. Öğretmende yüksekliği 258 px olarak kaldı, ama sayfayla kayıyor.
- Ders sıfırlama artık onay soruyor (10-31 inceleme bulgusu 2'nin onay kısmı). Düğme yine yalnızca öğretmen görünümünde, şifre yok.
- Üst menüden 5. ve 6. Sınıf kalktı, çünkü ana sayfadaki sınıf seçiciyle aynı görünüp farklı iş yapıyordu. Sınıf sayfası da ana sayfayla birleşti.
- Ders sekmeleri hap yerine ortak alt çizgide. Rol ve A+ ayar olduğu için ayraçla ayrılıyor, 760 px altında ayraç yok.
- Alt alta uzun ders sayfası öğrenciyi yorduğu için sekmelere geçildi. Açık sekme bellekte tutuluyor, sayfa yenilenince Sunum'a dönüyor: sonraki sınıf önceki öğrencinin yerinden başlamıyor.
- "Derse başlarken" kutusu slaytların altına, bilgi kartları Etkinlik sekmesine, ortam seçimi Etkinlik sekmesinin başına taşındı.
- Öğretmen görüşmesi yapılamadığı için research benchmark ve netnografiyle yürütüldü. Bulgular doğrulanmış kullanıcı araştırması sayılmaz.
- Asıl problem altyapı değil, öğrenciye ait resmî bilişim ders kitabının olmaması. Altyapı bir kısıt.
- Öğretmen dersi tarihle değil hafta numarasıyla arıyor. Bu bilginin kaynağı netleşmedi.
- Izgara yetmedi, çünkü öğretmen de haftayı kaçırabiliyor: hafta numarası ders adıyla birlikte yazılıyor. Sitede "gerçek hafta" bilgisi tutulmuyor.
- Öğrenci tema adlarından bir şey anlamadığı için listesi temaya değil döneme bölünüyor. Dönem sınırı `TERM1 = 18` varsayımı. Hazır satır öğretmeninki gibi açılıyor.
- Program metni elle değil, ünite sayfalarından betikle çekildi. Kaynaktaki yazım yanlışları korundu ("Bilişim suçların türlerini" gibi). Tek istisna: kaynaktaki `BTY6.6.3` kodu `BTY.6.6.3` yazıldı. Tema adlarındaki "Ve" başlık biçimi sayıldı, "ve" yazıldı.
- Kullanıcı tüm temaların 1. tema gibi hafta satırlarıyla görünmesini istedi. Temanın hafta sayısı ders saatinin yarısı. Hafta adları ve kazanım dağılımı MEB'den gelmiyor, Claude'un örneği.
- Saatin yetmediği haftalarda iki çıktı birlikte işleniyor (`also` alanı). `plan.js`'teki hafta başlıkları `program.js` kuralına tabi değil, kazanım metinleri öyle.
- Öğretmen derse önce plana bakıyor, sonra sunuma geçiyor. Öğrenci yine Sunum ile başlıyor. Sayfa yenilenince her rol kendi ilk sekmesine dönüyor.
- A+ tahta için, öğrenci kendi bilgisayarından açıyor: düğme yalnızca öğretmende. Öğrenci rolünde büyük yazı kapalı, öğretmene dönünce ayar geri geliyor. Görme güçlüğü olan öğrenci tarayıcının Ctrl + `+` kısayolunu kullanabilir. `CLAUDE.md` büyük yazı modunu gereksinim sayıyor, kullanıcı öğrenci için kaldırılmasını istedi.
- Ekranlarda ortak ad "Kazanım". Sayfa altındaki kaynak cümlesinde ve `<meta>` açıklamasında MEB'in "öğrenme çıktıları" adı kaldı.
- Site bilgisayardan açılıyor, telefon hedef değil. Öğrencinin iki tıkla derse girmesi, rol düğmesiyle öğretmen görünümüne geçebilmesi ve hazır olmayan haftaları "Yakında" ile görmesi bilinçli: bu review'da kullanıcı onayladı, bulgu sayılmadı.
- Ana sayfada Kazanım Haritası, Çalışma Kâğıtları ve Öğretmen Masası kartları yok: hepsi üst menüde ya da hafta satırında var. Çalışma Kâğıtları ve Kazanım Haritası Öğretmen Masası'nda da yok, ikisi de ayrı sayfa. Yeni sayfa yeni bileşen yazmadan `.unit` ve `.week` ile kuruldu.
- Süreç bileşenleri ana sayfada tekrar edilmiyor, Ders planı sekmesinde duruyor. "Derse başlarken" metni yalnızca Sunum sekmesinde kaldı. Öğrenci satırı açılır kaldı, açılınca yalnızca "Derse gir" var.

**Yarım kalan işler**
- [ ] Hafta adları ve kazanım dağılımı örnek, rehber öğretmenin yıllık planıyla karşılaştırılmalı. 6. sınıf 2. temada 6 haftaya 10 çıktı düşüyor.
- [ ] Site 36 hafta ve `TERM1 = 18` varsayıyor, program 34 haftalık saat veriyor. Aradaki 2 hafta ve dönem sınırı yıllık planla netleşmeli. 2. dönemin açık gelmesi denenmedi.
- [ ] 375 px'te sekmeler üç satıra sarılıyor, etkin sekmenin çizgisi ortak çizginin üstünde kalıyor. İlk kullanımda gözlenmeli.
- [ ] Odak, başlık, slayt sayacı ve arama sonucu bildirimi gerçek ekran okuyucuyla denenmedi.
- [ ] Bulmaca tamamen çözülünce sekmeye ✓ gelmesi ve dokunmatikte 40 px slayt noktaları denenmedi.
- [ ] Önizleme panelinde, geçmişi 50 kayıt sınırına dayanmış sekmede `history.back()` önceki sayfa yüklemesine atladı. Temiz sekmede ve `file://` altında sorun yok. Uzun süreli kullanımda gerçek Chrome'da denenmeli.
- [ ] Yeni ana sayfa ve tasarım sistemi Chrome 84 ve Firefox 78'de denenmedi. Gömülü fontun Firefox `file://` altında çalıştığı doğrulanmalı.
- [ ] Yeni tasarımda gerçek yazdırma önizlemesi ile tahta ve bilgisayarsız ortamların etkinlik görünümü denenmedi.
- [ ] İşletim sistemi algılama gerçek bir Pardus bilgisayarında denenmedi. Öğretmen sekmelerinde mobil genişlik denenmedi.
- [ ] Etkinlik sekmesi kısaldı ama 375 px'te hâlâ 3.530 px. İlk kullanımda gözlenmeli.

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
