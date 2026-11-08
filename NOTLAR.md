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

## 2026-11-08 · Kadem Kalender + Claude Code (Opus 5.5)

**Ne yapıldı**
- GitHub'dan güncelleme alındı: efee7946-cmd'nin 44 commit'i (`ab39f28` … `214347b`, 2026-11-06 ve 2026-11-07), `git pull --no-rebase` ile çakışmasız ileri sarıldı. 29 dosya, +2461 / −457 satır.
- Gelenler: site review düzeltmeleri ve SVG ikonlar (`assets/ikonlar.js`), tasarım sistemi kataloğu (`tasarim-sistemi.html`), yazım rehberi (`YAZIM-REHBERI.md`), sentetik kullanılabilirlik testi (`tools/ux-test/`), hafta şeridi, dönemler ve özel haftalar (`content/plan.js`), telefon ve okul monitörü düzeni, maskot (`assets/maskot.webp`, `assets/maskot-64.png`), yazı/boşluk/köşe tokenları, emojisiz arayüz, oyunda sürükle-bırak, "Sınıf ayarları" adı, aramada eş anlamlılar. CLAUDE.md'ye 7. kural (arayüz katalogdan yapılır).
- Değişen dosyalar: `assets/app.js`, `assets/style.css`, `assets/sim-ui.js`, `content/plan.js`, 8 ders dosyası ve `_SABLON.js`, `index.html`, `tools/dogrula.js`, README, CLAUDE.md, ICERIK-REHBERI, TASARIM-SISTEMI, NOTLAR, `.gitignore`; yeniler yukarıda.
- `node tools/dogrula.js`: 0 hata, 0 uyarı. `node --test tools/*.test.js`: 33/33.

---

## 2026-11-07 · efee7946-cmd + Claude Code (Opus 5.5)

**Ne yapıldı**
- Öğrencinin bölüm seçme sayfasına (ders girişi) outsider-design-review (1880×900, 1366×657, 375×740). Kontrast ve dokunma alanında sorun yok. Bulgular: okul monitöründe altta 312 px (%35) boşluk, biten kart bitmeyenden ayırt edilmiyor, "Başla" düğmesi sıradaki kartın hizasında değil, telefonda Başla düğmesi ekranın 345 px altında.
- Bölüm kartları: geniş monitörde kart (230 px), ikon karesi (64 px) ve Başla düğmesi (60 px) `--k` ile büyür; alt boşluk 312 → 225 px. Biten kart beyaz zeminli, kenarı, ikon karesi ve etiketi bölüm renginde (`--c`); yazı kontrastı en az 5,36:1.
- Telefon (560 px ve altı): üst çubuk iki satır (logo ve arama, altında kaydırılan menü), ders sekmeleri tek satır kaydırılır, bölüm başlığı sarar, defter başlığı uzarsa alta iner, sınıf kartındaki ✓ küçüldü, hafta şeridi ve kazanım tablosu 375 px'e sığar, bölüm kartları 140 px (Başla 1145 → 875 px). 375 px'te ana sayfa, ders girişi, defter, kazanımlar ve öğretmen ders sayfası yatay kaymadan denendi; 1366 px değişmedi.
- Katalogdaki "Ekran" notunda kaçırılmamış kesme işareti (`px'ten`, a244162) katalog betiğini kırıyordu, düzeltildi.
- Testler 33/33, dogrula 0 hata, konsol temiz.
- Kalan bulgular: "Başla" düğmesi ders bandına, ilerlemenin yanına taşındı (`.band-cta`, beyaz `.btn.on-color`, yalnız Bölümler açıkken; telefonda bandın altında tam genişlik, 315. pikselde, ilk ekranda). Okul monitöründe kartlar 3×2 (260 px), alt boşluk kalmadı. Kartın ekran okuyucu adı "Sunum, 11 slayt, sıradaki"; numara `aria-hidden`. Bant başlığı kalan yeri alır, dar ekranda kendi satırında. Testler 33/33, dogrula 0, sentetik G1/G3 yeni sürüm OK.

- Bölüm sayfasına Gestalt değerlendirmesi ve düzeltmeleri: Başla düğmesinde sıradaki bölümün renkli ikon karesi (`.cta-sq`, kartla bağ); kartların üstünde görünür "Bölümler" başlığı (bant ile kartlar iki grup; her temanın bant rengi bir bölüm rengine yakın olduğu için renk değiştirilmedi); kart numarası 1.1rem ve tam opak (en az 5,29:1); monitörde ders adı 1.7rem ve ilerleme çubuğu 140 px, ad tek satır, sayfa ekrana sığar (901/900); dizüstünde kart 260 px, alt boşluk 167 → 104 px. Testler 33/33, dogrula 0.

- Siteye bütüncül outsider-design-review: eksik his görsel kimlik yokluğu ve ana sayfada ilerleme izi olmamasından geliyor.
- Görsel kimlik: kullanıcının uygulama logosu (mavi defter karakteri) maskot oldu. Beyaz arka plan saydam yapıldı, `assets/maskot.webp` (420 px, 34 KB) ve sekme simgesi `assets/maskot-64.png`. Logoda 46 px, hafta kartının sağında 150 px (760 px ve altında gizli), ders bitti mesajında ve boş durumlarda 110 px. Katalogda Maskot bileşeni. Testler 33/33, dogrula 0.

- Ana sayfa başlığı: öğrencide "Merhaba! Sınıfını seç" yerine "Merhaba!" (1.5rem, eskiden 2.2rem) ve sınıf kartlarının üstünde "Sınıfın" etiketi. Sayfanın en büyük yazısı artık hafta kartındaki ders adı (1.9rem). Öğretmen başlığı da 1.5rem. Sentetik G1/G3 OK, dogrula 0.
- Sınıf seçici küçülür (Gestalt 1): sınıf bir kez seçilince (`S.gradeSet`, `BD.defaults`'ta false) kartlar 52 px'e iner ve başlıkla aynı satırda sağa geçer ("Sınıfın" etiketiyle); telefonda başlığın altında. İlk açılışta büyük kartlar. 1366×768'de şerit 689 → 534 px, telefonda ana sayfa tek ekrana sığar. İki rol, 5/6 geçişi ve odak denendi. Testler 33/33, G1/G3 OK.
- Kullanıcı küçük seçiciden sonra altın boş kaldığını söyledi: öğrencide açılan yeri Bu hafta kartı alıyor (761 px ve üstü: 310 px, ders adı 2.5rem, maskot 250 px, büyük Başla). 1366×768'de sayfa 648 px'te biter, 1880×900'de ekrana tam oturur.
- Marka kimliği tamamlama: maskot ders sonlarında 64 px (`.end-msg`, `endMsg()`): etkinlik bitti, test sonucu, oyun "Hepsi doğru!", bulmaca tamam, sanal masaüstü "Tebrikler!". Maskotun açık mavisi token oldu (`--accent-light: #5BC2F7`, görselden ölçüldü) ve "Sıradaki" etiketinde kullanıldı (koyu yazıyla 7,8:1). İlerleme çubuğunda kullanılmadı: tema bantlarının üstünde 2,7–3,9:1, beyaz dolgu daha net. Katalogda Maskot "Bitiş mesajı" çeşidi, Geri bildirim "Bitti" çeşidi ve Renkler güncel.
- Üst bant beyaz oldu (`--surface-default`, altta ince çizgi ve `--shadow-sm`); gri sayfa zemininden ayrılır. Açık mavi (`#E3F4FD`, altta `--accent-light` çizgi) denendi, kullanıcı beğenmedi; lacivertte maskot zeminde kayboldu. Rol ve A+ bej zeminde kaldı.
- Yeni skill'ler: `cognitive-walkthrough` projeye göre yeniden yazıldı (dört soru, persona, adım tablosu); mastepanoski/claude-skills deposundan `ui-design-review`, `wcag-accessibility-audit`, `don-norman-principles-audit`, `information-architecture-audit`, `ux-audit-rethink` okunup kuruldu. Walkthrough (öğrenci, bu haftanın testi): görev 4 adımda tamamlanıyor; bulgular "Testi yeniden çöz" test bitmeden çıkıyor, Sunum'a çeken "Sıradaki", sonuç cümlesi "bitti" demiyor.
- UI tasarım incelemesi (ui-design-review, 69/100) ve altı önerinin hepsi:
  1. Yazı ölçeği: `--fs-xs` … `--fs-4xl` (8 basamak); CSS'teki ~50 farklı rem boyutu bu basamaklara bağlandı. Kalınlık 400/700/900 (600 ve 800 kalktı). Slayt, sanal masaüstü, yazdırma, bulmaca hücresi ve ikon kareleri kendi ölçüsünde.
  2. Bölüm içi: öğrencide bölüm başlığı bölüm renginde dolu şerit (`section.block[data-sec]`, `--c`; defterde koyu yazı). Kullanıcı ince çizgi ile dolu şerit arasından dolu şeridi seçti. Test sorusu `--fs-lg`, şıklar beyaz, 2 px `--border-strong`, 400 kalınlık. Şerit yükselttiği için sunum `100vh - 24rem`'e göre boyutlanır, 1366×768'de düğmeler ekranda (765/768).
  3. Boşluk: margin, padding ve gap'teki ham px değerleri `--space-*` tokenlarına (yaklaşık 45 yer); ortalama için kullanılan eksi değerler px kaldı.
  4. Emoji kaldırıldı (kullanıcı onayı): "✓ Doğru!", bitişte kutlamayı maskot ve konfeti taşır; YAZIM-REHBERI güncellendi. İkonlar zaten 2,2 çizgi ve yuvarlak uç, değişmedi.
  5. Köşe: `--radius-lg` (14 px) kalktı, yerine `--radius-md` (12); içerikteki 6 px köşeler `--radius-sm`.
  6. Ders girişinde kartların altında dersin `hook` sorusu "Düşün" kutusunda (var olan Bilgi kutusu bileşeni, `--fs-lg`). 1366×768'de alt boşluk 252 → yaklaşık 90 px. Okul monitöründe kartlar yeniden tek sıra (312 px), sayfa ekrana sığar.
  Telefon (375) ve monitör (1880×900) denendi, yatay taşma yok.
- Don Norman ilkeleri denetimi (don-norman-principles-audit, 7,5/10; öğrenci testi, oyun, sanal masaüstü ve öğretmen araması 1366×768'de denendi). Dokuz bulgudan kullanıcının seçtiği dördü yapıldı:
  - Sınıflandırma oyununa sürükle-bırak (pointer olayları, fare ve dokunma; 6 px altı kayma tıklama sayılır). Dokunarak taşıma kaldı. Kart alanı da hedef: kart sürükleyerek ya da dokunarak geri konabilir (kullanıcı seçimi). Yönerge: "Kartı doğru kutuya sürükle ya da önce karta, sonra kutuya dokun."
  - Kart taşınınca eski "Kontrol et" mesajı silinir.
  - Testte klavyeyle seçilen şık kilitlenince odak aynı sorunun açık şıkkına, sonra sıradaki soruya, test bitince sonuç kutusuna geçer (fareyle seçimde odak değişmez).
  - Sonuç cümlesi "Testi bitirdin! 4 sorudan 2'si ilk denemede doğru."; sıfır doğruda "Testi bitirdin! Doğru cevapları gördün. Bir daha çözmek ister misin?" (kullanıcı seçimi). Hepsi doğru cümlesi değişmedi.
  Katalog (Sınıflandırma kartı, Test sorusu) ve YAZIM-REHBERI güncel. Testler 33/33, dogrula 0.
- Bilgi mimarisi denetimi (information-architecture-audit, 72/100: düzen 4, gezinme 4, etiketler 3, arama 3). Sekiz bulgudan kullanıcının seçtiği dördü yapıldı:
  - "Etkinlik" kelimesi ders bölümüne ayrıldı: Code Week ve dönem sonu haftası artık "Özel hafta" (çipte "özel", listede ve aramada "Özel hafta"; kullanıcı seçimi). Haftanın kendi adı değişmedi.
  - "Öğretmen masası" → "Sınıf ayarları" (kullanıcı seçimi). Adres `#ogretmen` aynı kaldı; menü, sayfa başlığı, ders içi yönergeler, katalog, README ve rehberler güncel.
  - Arama: eş anlamlılar (`SYN`: kodlama → programlama/algoritma, zip/rar → sıkıştır, word/writer → kelime işlemci, powerpoint/impress/slayt → sunu, şifre ↔ parola, virüs → zararlı, photoshop/gimp → görsel düzenleme, scratch → blok). Sonuç yoksa "\"zip\" için sonuç yok. Ders adı ya da hafta numarası yazın." 8'den fazla sonuçta altta "İlk 8 sonuç. Daha fazlası için aramayı daraltın.", ekran okuyucu toplam sayıyı duyar.
  - Tema ve sınıf başlıklarındaki numara kutusu `aria-hidden`; tema başlığında gizli "Tema 1: " (önceden "1Bilişim…", "55. sınıf" okunuyordu).
  Testler 33/33, dogrula 0.

**Kararlar**
- Bölüm içi renk: dolu şerit (kullanıcı seçimi). Arayüzde emoji yok (kullanıcı seçimi). Ders girişi boşluğu "Düşün" sorusuyla doldu (kullanıcı seçimi).
- Görsel kimlik için maskot yönü seçildi (desen ve konu çizimi yerine).
- Maskot ders içinde yalnızca sonda çıkar (bitiş ve sonuç mesajları); çalışırken görünmez. Selam balonu ve maskot adı şimdilik yok (kullanıcı kararı).
- Maskotun tek pozu var; sevinen, düşünen gibi pozlar raster görselden üretilemez, çizerden gelirse eklenir.
- Ana sayfada ilerleme izi yapılmayacak (kullanıcı: öğrenciler geriye bakmak isteyebilir, öğretmenler plandan geride olabilir).
- Başla düğmesi kaldırılmadı, banda taşındı (kullanıcı "tüm bulguları çöz" dedi, yer kararı Claude'un).

**Yarım kalan işler**
- [x] Dizüstünde kartların altındaki boşluk: "Düşün" kutusuyla doldu.
- [ ] Walkthrough bulgusu: "Testi yeniden çöz" yalnızca test bitince ya da onayla. ("Testi bitirdin!" yapıldı.)
- [ ] Bilgi mimarisi bulguları (yapılmadı): kâğıt başlıkları sekme adlarıyla aynı değil ("Kendimi değerlendiriyorum" / Mini test, "Defterime yazıyorum" / Deftere yaz); `#dersler` sayfasına hiçbir yerden bağlantı yok (kaldırılsın mı, bağlansın mı?); öğretmen ders sayfasında önceki/sonraki hafta yok; "Yazdırılacak kâğıt ve cevap anahtarı" → "Çalışma kâğıdı".
- [ ] Norman bulguları (yapılmadı): öğretmende "Ders planı" 1 numara olduğu için bölüm numaraları öğrenciyle kayıyor; sanal masaüstünde yeni klasörde simgeler yer değiştiriyor; ders başlığındaki "‹" ile "‹ Bölümler" farklı yere gidiyor; öğrencide "Öğretmen" düğmesindeki kilit simgesi; ilk açılışta sınıf seçilmeden 5 işaretli.
- [ ] Mavi temada (Tema 3) maskot zemine yakın; istenirse beyaz hale.
- [ ] Pencere daraltılıp genişletilince hafta şeridi 5 haftada kalıyor (yenileyince düzelir).
- [x] Gestalt 1 (sınıf seçimi seçildikten sonra küçülsün) ve 4 (hafta kartının boş sağ tarafı): yapıldı.

---

## 2026-11-06 · efee7946-cmd + Claude Code (Opus 5.5)

**Ne yapıldı**
- GitHub'dan güncelleme alındı: Kadem Kalender'in 27 commit'i (`3c44016` … `995abb4`, 2026-11-03 ile 2026-11-06 arası), çakışma olmadan ileri sarıldı. 55 dosya, +3650 / −109 satır.
- Gelenler: oturum başı hook'u (`3c44016`), üç tasarım seçeneği mockup'ı (`c01470d`), okul takvimi (`2382ff7`), öğrenci ve öğretmen görünümünde renkli kart tasarımı (`59f6793`, `b8388bc`), sanal masaüstü ve testleri (`6dc3954` … `54fba73`), Oyun bölümü (`fa9221a`), emoji taraması (`5892da3`), 5. sınıf 1-6. hafta dersleri (`ad519b3`, `d953bd7`, `06ccb1f`).
- Testler: `node tools/dogrula.js` 0 hata, 0 uyarı. `file://` açılışı CDP ile denendi, konsol hatası yok. `node --test tools/*.test.js` ilk çalıştırmada 32/33 ("dersin görevleri değişince eski kayıt baştan başlar" testi tüm testlerle birlikte çalışırken düştü). Tek başına geçti, ikinci tam çalıştırmada 33/33.
- Siteye /outsider-design-review yapıldı (1366×768, 1024×768): 1 yüksek, 6 orta, 3 düşük bulgu. En büyük sorun 768 px yükseklikte önemli düğmelerin ekran dışında kalmasıydı.
- `38e90c7` Review düzeltmelerinin hepsi: bölüm kartları geniş ekranda tek sıra (Başla 790 → 536 px), sanal masaüstü görev çubuğu ekranda (962 → 726 px), öğretmen slaytı 597 → 853 px ve çubuğu tek satır, öğretmende bölüm başlığı yerine tek satır açıklama, hazır olmayan hafta kartında "Son hazır ders" düğmesi, bölüm numarası kontrastı 2,88 → en az 4,26:1, öğretmen sınıf kartları 104 → 64 px, öğretmen üst bandı 1024 px'te tek satır. İkonlar `assets/ikonlar.js`'e taşındı; ortam, yazdır ve tekrar düğmeleri emoji değil SVG. `--surface-setting` token'ı eklendi. Testler 33/33, `file://` konsolu temiz.
- `0c27acc` Tasarım sistemi kataloğu `tasarim-sistemi.html` (Senin UI örnek alındı): Renkler (canlı değer ve kontrast), Yazı, Ölçüler, İkonlar ve 6 grupta 32 bileşen. Her bileşende Önizleme / Çeşitler / Kod sekmesi, Özellikler paneli, kullanım kuralları; üstte Öğretmen/Öğrenci görünümü. Bileşenler sitenin `style.css`'iyle ve 5-1-6 dersinin verisiyle çizilir. CLAUDE.md'ye 7. kural, README ve TASARIM-SISTEMI.md'ye bağlantı. `file://` altında 36 sayfa konsol hatasız, 375 px'te taşma yok, testler 33/33, dogrula 0.
- `5b924ee` Yazım rehberi `YAZIM-REHBERI.md` (ses tonu ve arayüz metni, Senin UI ses tonu rehberi örnek alındı) ve katalogda "Ses ve yazım" sayfası. Kararlar kullanıcıya örnekli sorularla soruldu. CLAUDE.md, README, ICERIK-REHBERI ve TASARIM-SISTEMI rehbere bağlandı.
- `a8f081d` Yazım rehberi siteye uygulandı: düğmelerde ok yok, sayfa adları cümle düzeninde, öğrenciye görev dili, kutlama dışında emoji yok, "tıkla", öğretmene ayrı bölüm açıklamaları. Mini testte iki deneme: ilk yanlışta ipucu (`hint`), ikincide neden (`why`) ve doğru cevap; sonuç ilk denemedeki doğruları sayar. 8 dersteki 37 soruya `hint`/`why` yazıldı, `dogrula.js` eksikte uyarır, eski test kayıtları okunur. Testler 33/33, dogrula 0, `file://` konsolu temiz.
- `99da9d9` Sentetik kullanılabilirlik testi `tools/ux-test/` (paketsiz: başsız Chrome + Node). Betiklenmiş persona 4 görevi 768 px düzeltmeleri öncesinde (`995abb4`) ve sonrasında yaptı, 1366×657, tarih 8. haftaya sabit. 8/8 koşu başarılı. Tıklama eşit (14 ve 14); eski sürümde 4 kaydırma adımı ve 1 dolayım vardı, yenide yok (Sunum'da "Sonraki" düğmesi ve sanal masaüstündeki boş yer artık ekranda). "Son hazır ders" düğmesi bu testte tıklama kazandırmadı, çünkü hazır ders bir hafta gerideydi. Rapor `tools/ux-test/results/report.html`, git dışı.
- Öğrencinin 3. hafta görevi için sentetik replay (3 persona, tahmin) ve benchmark (Code.org, Khan Academy, takvim uygulamaları). HMW: "Öğretmenin tahtada söylediği hafta numarasıyla dersi arayan öğrencinin, o haftanın dersini haftaları tek tek gezmeden açma ihtiyacını, site öğrenciyi her zaman takvimin haftasında karşılıyor, sınıf ise çoğu zaman başka bir haftayı işliyor gerçeğine rağmen nasıl karşılayabiliriz?" İçgörünün ikinci yarısı varsayım, görüşmeyle doğrulanmadı.
- Code.org tarzı hafta listesi (tema başlığı + bölüm baloncukları) denendi, kullanıcı beğenmedi, geri alındı (commit yok).
- `cb0aafc` Ana sayfada hafta okları yerine 11 haftalık hafta şeridi: ‹ › kaydırmadan sayfa geçer, açılışta takvim haftası seçili ve "takvim" yazar, kart başlığı "Takvime göre bu hafta". 8'den 3. haftanın dersine 6 tık yerine 2 tık. Yan kartlar kaldırıldı (öğrenci ve öğretmen). Katalogda Hafta okları ve Yan kart yerine Hafta şeridi. Testler 33/33, dogrula 0, `file://` sentetik koşular hatasız.
- `2530f00` Takvime 2. dönem başlangıcı (`term2`, 19. hafta); hafta şeridi dönem sınırını geçmez, üstünde "1. dönem"/"2. dönem" yazar. İki sınıfta 5. hafta Code Week, 18. hafta dönem sonu etkinlik haftası (`event: true`, tema/kazanım/ders yok, `note` gösterilir); sonraki haftalar kaydı, plan 36 hafta. Hazır 5. sınıf dersleri 6, 7, 8. haftaya geçti. Şeritte "etkinlik", kartta koyu zemin; dogrula etkinlik haftasını denetler. Sentetik test tarihi 13 Kasım (9. hafta). Testler 33/33, dogrula 0.
- Dönem geçişi belli olsun diye şeritte dönemin ucundaki ‹ › mavi dolu ve öbür dönemin adını taşır ("2. dönem", "1. dönem"); şeridin üstündeki dönem adı büyüdü ve koyulaştı. Katalogda "1. dönemin son sayfası" çeşidi.
- Ana sayfaya outsider-design-review (öğrenci ve öğretmen, 1280 ve 375 px). Kontrast, dokunma alanı ve erişilebilir adlarda sorun yok. Bulgular düzeltildi: aramada etkinlik haftası etiketi, kelime kelime arama ve not araması, öğretmen listesinde etkinlik haftaları, şeritte seçilen haftanın temasının açılması, geçersiz hafta adresinde takvim haftası, şerit altı boşluk, 560 px ve altında 5 haftalık şerit. Testler 33/33, dogrula 0, sentetik G1/G3 OK.
- Öğrenci ana sayfasına Gestalt değerlendirmesi. Seçili durum tek renk dilinde: sınıf kartı iki sınıfta da seçiliyken dolu mavi (hafta şeridi gibi), sınıfın rengi yalnızca seçili olmayan kartın numarasında. Kalan öneriler: tamamlanmış sınıf seçimini küçültmek (katalogda bileşen gerekir), etkinlik haftası ve ‹ › düğmelerini ayrıştırmak, hafta kartının yarı boş sağ tarafı.
- Hafta şeridi: takvim haftası kesikli mavi çerçeveli, seçili haftanın üstünde karta bakan mavi üçgen (kutu ile kart bağı), ‹ › çerçevesiz. Etkinlik haftaları eski görünümünde (kullanıcı kararı).
- Okul monitörü: 1500 px'ten geniş ve 880 px'ten yüksek ekranda içerik 1440 px, yazı 22 px, boşluklar ve px bileşen ölçüleri `--k` ile %30 büyük. Dizüstü (1366×768) ve 1280×1024 değişmez. Sunum slaytı monitörde 861 px (dizüstünde 528 px); üst kısım büyüdüğü için ölçeksiz hâlden küçük.
- Sayfa altındaki alt bilgi (YTÜ BÖTE, MEB kaynağı) kaldırıldı (kullanıcı isteği).

**Kararlar**
- 2. dönem 19. haftada başlar; 5. hafta Code Week, 18. hafta dönem sonu etkinlik haftası, iki sınıfta da (kullanıcı kararı). Plandaki ders başlıkları ve kazanım dağılımı yine örnek.
- Oturum başında GitHub'daki yeni commit'ler çekilir (CLAUDE.md "Oturum başı").
- Önce site düzeltilir, sonra tasarım sistemi kataloğu (`tasarim-sistemi.html`, repoda, sitenin `style.css`'ini kullanan, açık tema) yazılır ve "yeni arayüz katalogdan yapılır" kuralı CLAUDE.md'ye eklenir.
- Ekran ölçüsü olarak 1366×768 esas alındı; okul bilgisayarlarının çözünürlüğü doğrulanmadı.
- Öğretmen Sunum sekmesini açınca sayfa sekmeleri üste getirecek kadar kayar; slaytın büyümesi buna bağlı.
- Katalog ayarları (sekme, zemin, görünüm) `bdds:` önekiyle saklanır, sitenin `bd:` kayıtlarına karışmaz.
- Sitede bir bileşenin işaretlemesi değişirse katalog aynı commit'te güncellenir (CLAUDE.md kural 7).
- Ses tonu: öğrenciye oyun arkadaşı (görev dili; puan, seviye, rozet yok), öğretmene yardımcı asistan (ne ve neden, en fazla iki cümle). Site "biz" demez.
- Ünlem öğrenci kutlamasında ve göreve çağıran tek cümlede; emoji yalnızca öğrenci kutlamasında. Öğretmen metninde ikisi de yok.
- Yanlış cevapta ilk seferde ipucu ve bir hak daha, ikincide doğru cevap ve neden.
- Başlık ve sayfa adları cümle düzeninde; düğme fiil ve okusuz; ekranla ilgili fiil "tıkla".
- Ders, tema ve kazanım adları gibi resmî adlar cümle düzenine çevrilmez, MEB'deki gibi kalır (kullanıcı kararı).
- Yazı tipi Mulish kalır (Atkinson Hyperlegible ve Lexend ile karşılaştırıldı); dosya adı ve kod eş aralıklı yazılır.
- Site sınıfın hangi haftada olduğunu bilmez (internet ve ortak kayıt yok); şerit takvim haftasını "takvim" diye işaretler, "bu hafta" demez. Asıl kaynak öğretmenin söylediği hafta.
- Ana sayfada yan kart yok; şerit "Bu haftaya dön" ve "Bütün dersler"in işini görüyor (kullanıcı kararı).
- Sentetik test sonuçları kullanıcı araştırması diye sunulmaz; aracın çıktıları (`results/`) git'e girmez, `package.json` eklenmez.
- Geri bildirim ve etkinlik etiketlerindeki emoji (🎉 👏 🌟 🎯 📋 🌐 📇) süs olarak kaldı; yalnızca ikon görevindekiler SVG oldu.

**Yarım kalan işler**
- [ ] Katalog `app.js`'teki işaretlemenin elle kopyası; ikisi otomatik karşılaştırılmıyor.
- [ ] Kadem kataloğu ve 7. kuralı görmedi.
- [ ] 37 test sorusunun ipucu ve neden metinleri Claude'un yazdığı ilk taslak; ekipte biri içerik olarak gözden geçirmeli.
- [ ] Kadem yazım rehberini ve test değişikliğini görmedi.
- [ ] Kadem bölüm kartı dizilişi ve öğretmen bölüm başlığı değişikliklerini görmedi.
- [ ] Öğretmen ana sayfasında "Kaldığınız yer" kartı da kalktı; öğretmen isterse geri eklenebilir.
- [ ] `#dersler` (Bütün dersler) sayfasına ana sayfadan bağlantı kalmadı; sayfa kaldırılmalı mı karar verilmeli.
- [ ] Sentetik testin eski versiyonu (995abb4) yeni hafta numaralarıyla koşmuyor (ders orada 7. haftada); karşılaştırma tarihî.
- [ ] "Öğretmen takvimden ne sıklıkla sapıyor" ve "haftayı öğrenciye nasıl söylüyor" soruları bir öğretmene sorulmalı.
- [ ] İnceleme soruları: öğrencide arama ve A+ gizli (büyük yazıya ihtiyacı olan öğrenci?), "Öğretmen" düğmesindeki kilit ikonu, hazır olmayan haftanın kartı tam tema renginde.
- [ ] Pardus ayarında sanal masaüstünün sağ tık menüsü "Yeni › Klasör" gösteriyor; ders yönergesi Pardus için "Klasör Oluştur…" diyor. Hangisinin doğru olduğuna bakılmalı.
- [ ] Sentetik test yalnızca bir haftalık boşlukla denendi; hazır derse uzak bir haftada (ör. 12. hafta) "Son hazır ders" düğmesi ölçülmedi.
- [ ] `tools/sim-tarayici.test.js` içindeki "eski kayıt baştan başlar" testi tüm testlerle birlikte koşunca ara sıra düşüyor. Süre sınırına ya da bekleme süresine bakılmalı.

---

## 2026-11-06 · Kadem Kalender + Claude Code (Opus 5.5)

**Ne yapıldı**
- GitHub kontrol edildi: gelen ya da giden commit yok.
- `5892da3` Emoji taraması. Eski Windows ve Pardus'ta kutu görünebilecek yeni emojiler (U+1F900 sonrası) değiştirildi: 🧩 🧠 → ⚙️, 🥽 → 👓, 🤖 → ☁️, 🧰 → 📋. Tam ekran düğmesindeki ⛶ kaldırıldı. `dogrula.js` yeni emojide uyarıyor, kural ICERIK-REHBERI.md §3'te.
- `ad519b3` 5-1-1 Bilişim Teknolojilerini Tanıyalım (BTY.5.1.1, a-b-c). 11 slayt, 7 bilgi kartı. Etkinlikler: lab'da dün-bugün sunusu, tahtada kavram kavanozu, kâğıtta zaman tüneli afişi. Ayrıca "Teknoloji hangi alanda?" oyunu, 5 soru, 8 kelimelik bulmaca ve dereceli puanlama anahtarı var. Etkinlikler programdaki öğrenme-öğretme uygulamalarından alındı.
- `ad519b3` Yeni slayt alanı `reveal` ("Tahmin et" slaytı): önce soru görünür, "Cevabı göster" düğmesi cevabı açar. Şablona ve rehbere eklendi.
- `d953bd7` 5-1-2 Bilişim Teknolojilerinin Etkileri ve Dijital Sağlık (BTY.5.1.2, a-b-c). Programdan: olumlu-olumsuz tartışması, hatalı kullanımı bulma (tahtada canlandırma), ergonomi, cihaza göre güvenlik önlemleri, dijital sağlığın üç boyutu, öz değerlendirme formu. Ekran süresi günlüğü isteğe bağlı ve kişisel (ICERIK-REHBERI.md §6). Aynı tarayıcı kontrolleri yapıldı, çalışma kâğıdı 4 sayfa.
- `06ccb1f` 5-1-3 Dijital Vatandaşlık, 5-1-4 Yapay Zekâ ile Tanışalım (beş süreç bileşeni a-b-c-ç-d), 6. hafta 5-1-5-isletim-sistemi-sorunlar (BTY.5.1.5'in ikinci dersi). 5-1-5'e bankamatik ve bit-bayt Tahmin et slaytları eklendi. Etkinlikler programdaki öğrenme-öğretme uygulamalarından alındı. İnternet gerektirenler (ad-soyad araması, yapay zekâ araçları) yalnızca `online` alanında ve öğretmen notunda.
- 5. sınıf 1-7. haftaların hepsinin dersi var.
- Başsız Chrome'da denendi: üç ortam, cevap düğmesi (fare ve ok tuşu), 11 slaytın ekran görüntüsü, kazanım haritası, yazdırma (4 sayfa). Konsolda hata yok. `node --test tools/*.test.js` 33/33.

**Kararlar**
- Dört kutulu (`cols`) slaytlarda büyük emoji kullanılmaz, 1366 px'te slayt taşıyor. Emoji başlığın sonuna konur.
- Emoji süs olarak kalır. Görünmezse de metin anlaşılır olmalı.

**Yarım kalan işler**
- [ ] Emojiler ve yeni ders gerçek Pardus ve Windows bilgisayarında denenmedi. Pardus'ta renkli emoji yazı tipi olup olmadığı bilinmiyor.
- [ ] 5-1-1, 5-1-2, 5-1-3, 5-1-4 ve 6. hafta dersi ekipten biri tarafından okunup onaylanmadı.
- [ ] 6. hafta laboratuvar adımlarındaki Pardus menü adları (Hakkında, Görev Yöneticisi / Sistem Gözlemcisi) gerçek Pardus'ta denenmedi.
- [ ] Tarayıcı testi bir kez 20 dakikadan uzun takıldı (bilgisayarda başka bir oturumun çok sayıda Chrome'u açıktı). Tek başına yeniden çalıştırınca 2 dakikada 8/8 geçti. Tekrar ederse `tools/sim-tarayici.test.js`'te Chrome açılışına süre sınırı gerekebilir. (ICERIK-REHBERI.md §7).
- [ ] Slayt taşmasını otomatik yakalayan bir kontrol yok. Şimdilik ekran görüntüsüyle bakılıyor.

---

## 2026-11-05 · Kadem Kalender + Claude Code (Opus 5.5)

**Ne yapıldı**
- GitHub kontrol edildi: gelen ya da giden commit yok.
- `6dc3954` Sanal masaüstü mantık katmanı `assets/sim-core.js` ve `tools/sim.test.js`. Dosya sistemi bellekte, işlemler saf fonksiyon, görev kontrolleri bildirimsel (`exists`, `allIn`, `inTrash`, `ui`, `typed`, `answer`, `all`).
- `41d9d50` Arayüz `assets/sim-ui.js`: masaüstü, Dosya Yöneticisi, çöp, zip tablosu, yazı programı, Farklı Kaydet. Fare, dokunma (uzun basış, ⋯ düğmesi) ve klavye (oklar, Enter, F2, Delete, Ctrl+C/X/V/Z, Shift+F10). İpucu iki aşamalı, geri al, baştan başla, özet ekranı. İlerleme `bd:sim:<ders>`.
- `06ae88c` 5-1-6 senaryosu (8 görev), `9eda7db` 5-1-5 senaryosu (6 görev). 6-1-1'e simülasyon eklenmedi.
- `102c965` Ortamlar: lab'da simülasyon ana etkinlik, altında "Şimdi gerçek bilgisayarında dene" düğmesiz. Tahtada tam genişlik. Ders planında kontrol listesi, yazdırmada gözlem tablosu.
- `e6b9926` `dogrula.js` çözümü Windows ve Pardus için oynatır. ICERIK-REHBERI.md ve _SABLON.js'e `sim` kuralları yazıldı.
- `0014aad` /ponytail-review'un 1. ve 2. bulgusu: taşıma görevi dosya silinerek geçilemez, boş dosyada %NaN yok.
- `fa9221a` Sınıflandırma oyunu etkinliğin altından kendi bölümüne taşındı: Etkinlik → Oyun → Mini test (oyunu olan bütün derslerde).
- İki senaryo başsız Chrome'da fare, sadece klavye ve 390 px dokunmayla baştan sona oynatıldı. Her birinde yanlış işlem ve ipucu denendi, konsolda hata yok.

**Kararlar**
- Öğrenci bilgisayarları Windows: öğrenci görünümü Windows varsayar, Linux'ta (Pardus tahta) Pardus. Öğretmen görünümü Öğretmen Masası ayarını kullanır.
- Windows'ta çöpün adı "Geri Dönüşüm Kutusu", Pardus'ta "Çöp Kutusu".
- Klavyeyle yeni klasör: Shift+F10 menüsü. Ctrl+Shift+N tarayıcıya ayrılmış, sayfaya ulaşmıyor.
- Sıkıştırma oranları gerçekçi: .txt çok küçülür, .odt/.docx/resim/ses az. 5-1-6 öğretmen notu buna göre düzeltildi.
- Öğretmen kontrol listesi ekranda işaretlenmez (tek bilgisayarda 30 öğrenci), yazdırılan gözlem tablosu kullanılır.

**Yarım kalan işler**
- [x] Review 3: `54fba73` `tools/sim-tarayici.test.js` (8 test, yaklaşık 2 dk, Chrome yoksa atlanır).
- [x] Review 4 ve 5: `46d192d` görevler değişince eski kayıt baştan başlar. Ad kutusu açıkken basılan düğme ilk basışta çalışır. İkisi de düzeltme geri alınınca kırmızıya dönen testlerle doğrulandı.
- [ ] Gerçek tablette yazarken sanal klavyenin kapanıp kapanmadığı, Firefox 78 ve Pardus tahtada deneme.

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
- [ ] `BD.calendar` her yıl yeni MEB takvimiyle güncellenmeli. Okul bilgisayarlarının saati yanlışsa takvim haftası yanlış çıkar, hafta şeridi yedek yol.
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
