# Tasarım sistemi

Omurga İstanbul Senin'in Senin UI sisteminden uyarlandı: token katmanları, ölçüler, yazı tipi ve bileşen biçimleri. Renkler bu projenin. Değerlerin tek kaynağı `assets/style.css` içindeki `:root` bloğudur.

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
| `--surface-brand` | `#1E4FA3` | Üst başlık bandı |
| `--surface-default` | `#FFFFFF` | Kart |
| `--surface-subtle` | `#F1F2F7` | Sayfa zemini |
| `--surface-hover` | `#F6F7FA` | Nötr kontrol üzerine gelince |
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
- **Seçim düğmesi (`.chip-btn`):** 40 px, `--radius-md`. Seçilince dolu lacivert olur. Üst bantta şeffaf durur, seçilince beyaz olur. Rol ve A+ ayar olduğu için ince ayraçla ayrılır ve kenarlıksızdır. A+ yalnızca öğretmende görünür.
- **Kart (`.card`):** Beyaz zemin, 1 px `--border-default`, `--radius-xl`.
- **Etiket (`.tag`):** Açık zemin ve aynı ailenin koyu yazısı.
- **Hafta satırı (`.week`):** Hafta numarası ve ders adı aynı satırda (`7. hafta · Dosya ve Klasör Yönetimi`). Ders hazır değilse yazı soluk. Satır açılır; öğrencide hazır olmayan satır açılmaz.
- **Ders sekmesi (`.tab`):** Ortak alt çizgide durur, etkin olanın çizgisi kalın ve lacivert. Numara dairesi kalır, biten bölümde ✓ olur.
- **Defter (`.notebook`):** Çizgili kâğıt ve kırmızı kenar çizgisi kalır, yazı Mulish'tir. Bölümün kimliği budur, sade karta çevrilmez.
