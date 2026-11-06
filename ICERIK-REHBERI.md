# İçerik Rehberi

Bilişim Defteri'ne ders yazarken uyulacak kurallar. Amaç: her dersin **kazanıma bağlı**, **her okulda uygulanabilir** ve **ekipteki herkes yazmış olsa da aynı kalitede** olması.

---

## 1. Kazanıma bağlılık

- **Önce kazanım, sonra içerik.** Derse başlamadan programdaki öğrenme çıktısını, süreç bileşenlerini, içerik çerçevesini ve "Öğrenme-Öğretme Uygulamaları" bölümünü okuyun.
- `program.js` dosyasına **sadece MEB programından birebir** metin yazılır. Kod ve ifadeyi değiştirmeyin, kısaltmayın.
- Her ders `covers` alanında işlediği süreç bileşenlerini listeler. Listelenen her bileşen için en az **bir slayt, bir deftere yaz maddesi, bir etkinlik adımı ve bir test sorusu** olmalı.
- Programın önerdiği etkinliklerden (ör. bankamatik örneği, raf benzetmesi, Frayer modeli) yararlanın. Farklılaştırma için programdaki destekleme ve zenginleştirme önerilerine bakın.
- Programda geçmeyen konuları derse eklemeyin. Merak uyandıracak ek bilgiler zenginleştirme kartına konabilir.

## 2. Her okulda uygulanabilirlik

- **Üç ortamın üçü de zorunlu:** `lab`, `tahta`, `kagit`. Bir ortamı boş bırakmayın.
- **Hiçbir etkinlik internet gerektirmez.** İnternet gerektiren öneriler sadece `online` alanına yazılır ve isteğe bağlıdır. Araştırma gerekiyorsa `infoCards` ile bilgiyi derse koyun.
- **Pardus önce.** Bilgisayar adımlarında `pardus` ve `windows` yönergelerini ayrı yazın. Pardus'ta LibreOffice (Writer, Impress, Calc, Draw) gibi hazır gelen programları kullanın. Lisans gerektiren programları zorunlu tutmayın.
- **Öğrenciden cihaz istemeyin.** Telefon, tablet, kişisel hesap ya da e-posta gerektiren adım yazmayın.
- **Kâğıt etkinliği gerçekten uygulanabilir olsun:** Kâğıt, kalem, zarf, kart gibi her okulda bulunan malzemeler kullanılır. `sheet` alanındaki görevler tek başına anlaşılır olmalı.
- Çalışma kâğıdı yazdırma önizlemesinde mümkünse **en fazla 3–4 sayfa** olmalı.

## 3. Dil ve yaş uyumu (10–12 yaş)

- Kısa cümleler. Bir cümlede bir bilgi.
- Öğrenciye **"sen"** diye, öğretmen notlarında **"siz"** diye hitap edin.
- Önce günlük hayattan örnek, sonra kavram. ("Kütüphanede raflar olmasaydı…" → klasör)
- Yabancı terimlerin Türkçesini kullanın: "dosya uzantısı", "işlemci". Kısaltmaları ilk geçtiği yerde açın: "Artırılmış gerçeklik (AR)".
- Deftere yaz maddeleri **3–5 madde**, her madde en fazla 2 cümle. Anahtar kavram `<mark>` içinde.
- **Emoji süstür, anlam taşımaz.** Emoji görünmezse cümle yine anlaşılmalı. Eski Windows ve Pardus'ta kutu görünmemesi için 🤖 🧠 🧩 gibi U+1F900 sonrası yeni emojiler kullanılmaz (`dogrula.js` uyarır). Yerine 💡 📱 💻 ⚙️ ☁️ 👓 gibi eski emojileri seçin.

## 4. Bölüm bölüm ölçüler

| Bölüm | Ölçü |
|---|---|
| Slayt | 7–11 slayt. Bir slaytta en fazla 4 madde. İlk slayt başlık, son slayt "Sıra sende!" (`end: true`) |
| Deftere yaz | 3–5 madde |
| Etkinlik | 5–9 adım. Her adım tek bir iş |
| Sınıflandırma oyunu | 2–5 grup, 6–12 kart |
| Test | 3–5 soru, 3 seçenek. Yanıltıcı seçenekler mantıklı olmalı |
| Bulmaca | 6–8 kelime, kelimeler derste geçmiş olmalı. Boşluklu kelime yok |
| Ders akışı | Toplam 80 dakika (40+40) |

### Tahmin et slaytı

- Merak uyandırmak için slayta `reveal` alanı eklenir. Önce `h` ve `p` ile soru görünür, öğretmen sınıfın tahminlerini alır, sonra "Cevabı göster" düğmesine basar.
- Bir derste 2–3 tane yeterli. Cevap 1–2 cümle. Çalışma kâğıdının konu özetinde cevap da yazılır.

### Slayt görselleri (isteğe bağlı)

- Canva ya da PowerPoint'ten **1600×900 piksel PNG** olarak dışa aktarılır, `content/img/<ders-id>/` klasörüne konur.
- Görsel içinde yazı varsa 10–11 yaşın okuyabileceği büyüklükte olmalı.
- Telif hakkı olan görsel kullanılmaz; ekip kendi ürettiği ya da telifsiz görselleri kullanır.
- `alt` metni zorunludur: görseli göremeyen/yükleyemeyen biri için anlamlı bir açıklama. Doğrulayıcı eksikse hata verir.
- Dosya boyutu tercihen **300 KB altında** olmalı (eski bilgisayarlar ve USB bellekten çalıştırma için). Doğrulayıcı büyükse uyarır.
- İki kullanım şekli: tam görsel slayt (`img`) ve metin + yan görsel slayt (`side`). Örnekler `_SABLON.js` içinde.

### Sanal masaüstü (`sim`, isteğe bağlı)

Dosya, klasör ya da program açma gibi bilgisayar becerisi öğreten derslerde etkinliğin başına bir sanal masaüstü konabilir. Öğrenci her adımı ekranda gerçekten yapar, site kontrol eder. Laboratuvarda ana etkinlik olur, tahtada tam genişlikte açılır, bilgisayarsız sınıfta görünmez. Gerçek bilgisayar adımları (`activities.lab.steps`) altta düğmesiz kalır, öğretmen Ders planındaki kontrol listesiyle bakar.

- **5–8 görev.** Her görev tek bir işlem türüdür: klasör oluştur, taşı, yeniden adlandır, kopyala, sil, sıkıştır, program aç, kaydet.
- Her görevde `id`, `text`, `b`, `check`, `hint` zorunludur, `success` önerilir. `b` dersin `covers` alanında olmalı.
- `text`, `hint` ve `success` düz metin ya da `{ pardus: "...", windows: "..." }` olabilir. Menü adları işletim sistemine göre değişir (Windows: "Yeni → Klasör", Pardus: "Klasör Oluştur…").
- `hint` yapılacak yeri tarif eder. `show` ikinci ipucunda yanıp sönecek yeri gösterir: bir yol (`"Masaüstü/{ana}"`), `"ui:start"` (Başlat/Uygulamalar), `"ui:save"`, `"ui:text"`, `"@trash"`.
- `check` bildirimseldir, kod yazılmaz:

| Tür | Ne zaman tamam? | Örnek |
|---|---|---|
| `exists` | Yolda öğe var. `format: "ogrenci"` adı 5A_Ayşe biçiminde ister, `as` adı sonraki görevlere `{ad}` olarak verir | `{ type: "exists", path: "Masaüstü/*", kind: "folder", format: "ogrenci", as: "ana" }` |
| `allIn` | Bu uzantılı bütün dosyalar o klasörde | `{ type: "allIn", ext: ["png", "jpg"], to: "Masaüstü/{ana}/Resimler" }` |
| `inTrash` | Dosya çöpte | `{ type: "inTrash", name: "taslak.txt" }` |
| `ui` | Menü açık (`menu`), program açık (`app: "yazi"`), son açılan (`opened`) | `{ type: "ui", key: "menu", value: true }` |
| `typed` | Yazı programına en az `min` harf yazıldı | `{ type: "typed", min: 2 }` |
| `answer` | Görev panelindeki kısa soru doğru cevaplandı | `{ type: "answer", options: ["…", "…", "…"], correct: 1 }` |
| `all` | Hepsi birden | `{ type: "all", of: [ … ] }` |

- Yanlış işlem mesajı görevin işleminden otomatik çıkar. Kopyalama gibi koşuldan anlaşılmayan işlemlerde `op: "copy"` yazın.
- **`solution` zorunludur:** Görevleri bitiren işlem listesi. `node tools/dogrula.js` ve `node --test tools/*.test.js` bunu Windows ve Pardus için ayrı ayrı oynatır, bitmeyen ya da eksik çözüm HATA verir. Kaydedilen dosyanın uzantısı için `{ext}` yazın (Pardus'ta odt, Windows'ta txt).
- Dosya boyutları gerçekçi olsun. Sıkıştırmada .txt çok küçülür. .odt, .docx, resim ve ses zaten sıkıştırılmış biçimlerdir, pek küçülmez.
- Örnek: `content/lessons/5-1-6-dosya-klasor.js`.

## 5. Ölçme ve değerlendirme

- Programda önerilen araçlardan birini seçin: kontrol listesi, dereceli puanlama anahtarı, gözlem formu, Frayer modeli, öz ve akran değerlendirme.
- Ölçütlerin yanına hangi süreç bileşenini ölçtüğünü yazın: "(a)".

## 6. Hassas konular

- Ekran süresi, bağımlılık, kişisel veri gibi konularda öğrenciyi kendi bilgisini paylaşmaya zorlamayın.
- Ticari marka ve uygulama adları yerine genel ifadeler kullanın ("sesli asistan", "görüntülü görüşme uygulaması"). Bilim ve teknoloji tarihindeki kişiler anılabilir.
- Görsel ve metinleri başka sitelerden kopyalamayın. Her içerik ekip tarafından üretilir.

## 7. Yayınlamadan önce kontrol listesi

- [ ] `outcome` ve `covers` doğru, `program.js` ile birebir uyumlu
- [ ] `covers` içindeki her süreç bileşeni slayt, defter, etkinlik ve testte var
- [ ] Üç ortamın etkinliği de dolu ve internetsiz uygulanabilir
- [ ] Bilgisayar adımlarında Pardus ve Windows yönergesi var
- [ ] Sanal masaüstü varsa: 5–8 görev, her görevde ipucu var, `solution` var ve `dogrula.js` hatasız
- [ ] Bulmacada kelime atlanmıyor (sayfada tüm ipuçları görünüyor)
- [ ] Çalışma kâğıdı yazdırma önizlemesinde düzgün
- [ ] Kazanım Haritası'nda ders doğru yerde görünüyor
- [ ] Slayt görseli varsa `alt` metni var, `content/img/<ders-id>/` içinde ve 300 KB altında
- [ ] Ekipten başka bir kişi dersi okudu ve onayladı
