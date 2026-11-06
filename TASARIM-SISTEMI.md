# Tasarım sistemi

Omurga İstanbul Senin'in Senin UI sisteminden uyarlandı: token katmanları, ölçüler, yazı tipi ve bileşen biçimleri. Renkler bu projenin. Değerlerin tek kaynağı `assets/style.css` içindeki `:root` bloğudur.

Canlı katalog: `tasarim-sistemi.html` (çift tıklayınca açılır). Renkler, yazı, ölçüler, ikonlar, ses ve yazım ile 32 bileşen sitenin kendi stilleriyle ve gerçek ders verisiyle çizilir. Her bileşenin Önizleme, Çeşitler ve Kod sekmesi, Özellikler paneli ve kullanım kuralları vardır. Üstteki Görünüm düğmesi öğretmen ve öğrenci hâlini değiştirir. Yeni arayüz bu bileşenlerle yapılır; yeni bileşen önce kataloğa eklenir.

## Kurallar

- Renk, köşe, boşluk ve kontrol yüksekliği yazarken doğrudan değer değil token kullan.
- Sadece açık tema. Senin UI'daki koyu tema alınmadı.
- Düz metin ve kontrollerde kontrast en az 4,5:1 olmalı. Soluk projeksiyon için bu sınırın altına inme.
- Ana renk eylem ve seçili durum içindir. Sarı yalnızca vurgu içindir, geniş alanlarda zemin olmaz.

## Renkler

| Token | Değer | Kullanım |
|---|---|---|
| `--action-primary` | `#1E4FA3` | Ana düğme, seçili durum, bağlantı, 5. sınıf |
| `--action-primary-hover` | `#183F82` | Üzerine gelince |
| `--action-primary-pressed` | `#133268` | Basılınca |
| `--action-primary-subtle` | `#E6EEFA` | Açık lacivert zemin |
| `--surface-default` | `#FFFFFF` | Kart |
| `--surface-subtle` | `#F1F2F7` | Sayfa zemini |
| `--surface-hover` | `#F6F7FA` | Nötr kontrol üzerine gelince |
| `--surface-setting` | `#E6E3DC` | Üst bantta rol ve A+ düğmesinin bej zemini |
| `--text-primary` | `#1F2430` | Ana yazı |
| `--text-secondary` | `#5B6270` | Yardımcı yazı |
| `--border-default` | `#E1E4EC` | Kart kenarı |
| `--border-strong` | `#C5CAD3` | Kontrol kenarı |
| `--feedback-success` / `-subtle` | `#157A4C` / `#E3F4EB` | Doğru, tamamlandı, hazır |
| `--feedback-error` / `-subtle` | `#D1242F` / `#FDECEC` | Yanlış, silme onayı |
| `--grade-6` / `-subtle` | `#B8480A` / `#FDEDE3` | 6. sınıf |
| `--highlight` / `-subtle` | `#FFD23F` / `#FFF3C4` | Fosforlu kalem vurgusu |
| `--notebook-line` / `--notebook-margin` | `#D5DBE8` / `#E58A8A` | Defter çizgisi ve kenar çizgisi |
| `--slide-bg` / `--slide-bg-light` | `#12306B` / `#1E4FA3` | Slayt zemini |

Beyaz yazıyla kontrast: lacivert 7,77:1, kiremit 5,29:1.

### Öğrenci görünümü renkleri

| Token | Değer | Kullanım |
|---|---|---|
| `--theme-1` … `--theme-6` | `#0B7169` `#6B3FA0` `#1D5FA8` `#B0263A` `#2E6B30` `#A8460F` | Temanın rengi: "Bu hafta" kartı, Bütün dersler kartları, ders bandı |
| `--sec-slayt` | `#1E4FA3` | Sunum bölümü |
| `--sec-defter` | `#FFD23F` | Deftere yaz bölümü, üstünde yazı koyu |
| `--sec-etkinlik` | `#157A4C` | Etkinlik bölümü |
| `--sec-test` | `#5B3FB5` | Mini test bölümü |
| `--sec-bulmaca` | `#B8480A` | Bulmaca bölümü |
| `--sec-oyun` | `#B0263A` | Oyun (sınıflandırma) bölümü, beyaz yazıyla 6,6:1 |

Beyaz yazıyla en düşük kontrast 5,29:1 (bulmaca), defter sarısında koyu yazı 10,75:1. Renk tek başına bilgi taşımaz: bölümün adı, ikonu ve "Bitti ✓" ya da "Sıradaki" rozeti hep yazılı.

## Yazı

- **Mulish**, siteye gömülü: `assets/mulish.css`. Firefox `file://` altında ayrı font dosyası yüklemediği için dosya base64 olarak CSS'in içindedir. Lisans: `assets/mulish-OFL.txt`.
- Kod ve kazanım kodları sistemin eş aralıklı yazı tipiyle yazılır (`--font-mono`).
- Taban boyut `--base` (17 px, A+ modunda 20 px). Başlıklar 800 ağırlığındadır.

## Ölçüler

| Grup | Tokenlar |
|---|---|
| Boşluk | `--space-1` 4, `-2` 8, `-3` 12, `-4` 16, `-5` 20, `-6` 24, `-8` 32, `-10` 40 px |
| Köşe | `--radius-sm` 8, `-md` 12, `-lg` 14, `-xl` 18 px, `-pill` 999 px |
| Kontrol | `--size-control-sm` 40, `-md` 50 px |
| Gölge | `--shadow-sm`, `--shadow-md` |

## Bileşenler

- **Düğme (`.btn`):** 50 px, `--radius-lg`. Varsayılanı beyaz zemin ve lacivert kenarlıktır, `.primary` dolu laciverttir. Bir görünümde tek birincil düğme hedeflenir.
- **Üst bant (`.top`):** İki rolde de açık zeminde (`--surface-subtle`), altta ince çizgi. Logo karesi lacivert.
- **Seçim düğmesi (`.chip-btn`):** 40 px, `--radius-md`. Seçilince dolu lacivert olur. Üst bantta 48 px, beyaz zemin ve ince kenarlık; açık olan sayfa dolu lacivert. Rol ve A+ ayar olduğu için ince ayraçla ayrılır, bej zeminli ve kenarlıksızdır. A+ yalnızca öğretmende görünür, basılıyken lacivert. A+ açıkken sayfa genişliği 1320 px olur. 1180 px'in altında bant düğmelerinin iç boşluğu 8 px, arama kutusu en az 160 px: öğretmen bandı 1024 px'te de tek satırdır.
- **Kart (`.card`):** Beyaz zemin, 1 px `--border-default`, `--radius-xl`.
- **Etiket (`.tag`):** Açık zemin ve aynı ailenin koyu yazısı.
- **Hafta satırı (`.week`):** Hafta numarası ve ders adı aynı satırda (`7. hafta · Dosya ve Klasör Yönetimi`). Durum etiketi sabit genişliktedir, kodlar aynı sütunda durur. Öğrencide hazır olmayan satır soluktur ve açılmaz. Öğretmende her satır açılır, bu yüzden yazı soluk değildir; durumu etiket söyler. Çalışma kâğıtları sayfasında satır bağlantıdır, doğrudan kâğıdı açar. Etkinlik haftası (Code Week, dönem sonu) iki rolde de açılmayan soluk satırdır, kodu yoktur, etiketi "Etkinlik haftası"; bir önceki haftanın temasında durur.
- **Ders sekmesi (`.tab`, öğretmen):** Ortak alt çizgide durur, etkin olanın çizgisi kalın ve koyu. Numara karesi bölümün renginde (`--sec-*`, ders planı gri), biten bölümde yeşil ✓ olur. Öğretmen bölüm kartlarını kullanmaz: derste sık bölüm değiştirdiği için her bölüm tek tıkla açılır. Öğretmende bölümün içinde renkli başlık yoktur, sekme adı ve rengi zaten gösterir; yerinde tek satır açıklama durur (`.block-hint`). Sunum sekmesi açılınca sekmeler üste kayar, slayt ekrana sığacak kadar büyür.
- **Renkli kartlar (iki rol):** Tasarım seçimi `mockups/` içindeki B yönü. Düz renkli büyük kartlar, gölge ve gradyan yok, ikonlar satır içi SVG, emoji değil. Liste `assets/ikonlar.js` içinde (`BD.icons`), `app.js` onları `icon()` ile çizer. Düğme ve ortam ikonları da bu listeden gelir; geri bildirim mesajlarındaki emoji (🎉, 👏) süs olarak kalır.
  - Üst bant açık zeminde: logo ve kilit ikonlu "Öğretmen" düğmesi. Arama öğrencide yok.
  - Ana sayfa: iki sınıf kartı (`.grade-card`; seçili olan iki sınıfta da dolu mavi, sınıfın rengi yalnızca seçili olmayan kartın numarasında), "Bu hafta" kartı (`.wk-hero`, temanın renginde, büyük hafta numarası), altında 11 haftalık (560 px ve altında 5 haftalık) hafta şeridi (`.wk-strip`, ‹ › ile sayfa geçer, sayfa dönem sınırını geçmez ve üstünde dönem yazar, dönemin ucundaki ‹ › mavi dolu ve öbür dönemin adını taşır; takvim haftasında "takvim", etkinlik haftasında (5. Code Week, 18. dönem sonu) "etkinlik" yazar; etkinlik haftasının kartı koyu zeminde not gösterir). Haftanın dersi hazır değilse kart en yakın hazır derse götüren düğmeyi gösterir ("Son hazır ders: 7. hafta").
  - Ders: temanın renginde bant (`.lesson-band`) ve ilerleme. Girişte bölüm kartları (`.sec-card`): 1000 px üstünde tek sıra, ortada 3'lü, dar ekranda 2'li. Alttaki düğme sıradaki bölümü açar ve 768 px yükseklikte ekranda kalır. Kart numarası %85 opak, renkli zeminde en az 4,26:1. Bölümün içinde renkli kare başlık ve "Bölümler" düğmesi. Sekme çubuğu öğrencide gizli.
  - Öğretmen: ana sayfada aynı sınıf kartları (öğretmende 64 px, kısa) ve "Bu hafta" kartı (kazanım kodu, "Derse git" ve "Çalışma kâğıdı"), altında temalara bölünmüş hafta listesi. Tema başlıklarında temanın renginde numara karesi (`.tn-sq`). Ders bandında tema, süre ve kazanım kodu.
  - Öğretmen masası: her ayar ayrı kart, başlıkta renkli ikon karesi (`.sq-sm`), seçili seçenekte ✓.
  - Slayt kaydırmadan ekrana sığacak kadar büyür (`.deck` genişliği ekran yüksekliğinden hesaplanır, en az 520 px).
  - Sanal masaüstünün yüksekliği `100vh - 320px` (420–620 px): 768 px yükseklikte görev çubuğu ekranda kalır.
  - Bütün dokunma alanları en az 48 px.
- **Defter (`.notebook`):** Çizgili kâğıt ve kırmızı kenar çizgisi kalır, yazı Mulish'tir. Bölümün kimliği budur, sade karta çevrilmez.
