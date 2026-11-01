# Bilişim Defteri

5. ve 6. sınıf **Bilişim Teknolojileri ve Yazılım** dersi için hazırlanan, **Maarif Modeli öğrenme çıktılarına bağlı** ve **Türkiye'nin her okulunda çalışacak şekilde** tasarlanmış ders sitesi.

YTÜ BÖTE stajyerleri tarafından geliştirilmektedir.

---

## Hızlı başlangıç

Kurulum yok. `index.html` dosyasına çift tıklayın, site tarayıcıda açılır. İnternet gerekmez.

Okula götürmek için klasörün tamamını USB belleğe kopyalayın ve okul bilgisayarında `index.html` dosyasını açın.

**Ekibe katılınca bir kez** `tools/kur.sh` (Pardus/Linux/macOS) ya da `tools/kur.bat` (Windows) çalıştırın. Bundan sonra her commit öncesi `node tools/dogrula.js` otomatik çalışır, hata varsa commit durur.

---

## Temel ilkeler

### 1. Her şey bir kazanıma bağlı
- Resmi öğrenme çıktıları ve süreç bileşenleri `content/program.js` içindedir ve **sadece MEB programından birebir** alınır.
- Her ders tek bir öğrenme çıktısına (`outcome`) bağlanır ve işlediği süreç bileşenlerini (`covers`) belirtir.
- Her slayt, deftere yaz maddesi, etkinlik ve test sorusu hangi süreç bileşenine hizmet ettiğini (`b`) gösterir.
- **Kazanım Haritası** sayfası hangi süreç bileşeninin hangi derste işlendiğini, hangilerinin eksik kaldığını otomatik gösterir.

### 2. Her okul aynı şartlarda değil
Öğretmen, **Öğretmen Masası**'ndan okulunun şartlarını bir kez seçer:

| Ayar | Seçenekler | Ne değişir? |
|---|---|---|
| Sınıf ortamı | 💻 Bilgisayar laboratuvarı · 🖥️ Sadece etkileşimli tahta · ✏️ Bilgisayarsız sınıf | Her derste o ortama özel etkinlik gösterilir |
| İşletim sistemi | Pardus · Windows | Etkinlik yönergeleri o sistemin menülerine göre yazılır |
| İnternet | Var · Yok / çok yavaş | İsteğe bağlı çevrim içi öneriler gizlenir, bilgi kartları kullanılır |

Bu ilkelere göre:
- **İnternet gerekmez.** Tüm içerik sitenin içindedir. Dış font, dış kütüphane, video bağlantısı yoktur. Araştırma etkinlikleri için dersin içinde **bilgi kartları** vardır.
- **Bilgisayar gerekmez.** Her dersin bir **yazdırılabilir çalışma kâğıdı** vardır: konu özeti, deftere yaz, bilgisayarsız etkinlik, test, boş bulmaca ve cevap anahtarı. Programdaki "teknolojik altyapı yoksa basılı kaynaklar kullanılabilir" notuna dayanır.
- **Pardus öncelikli.** MEB okullarındaki bilgisayarlar ve etkileşimli tahtalar (ETAP) çoğunlukla Pardus kullanır. Yönergeler LibreOffice gibi Pardus'ta hazır gelen programlara göre yazılır.
- **Eski bilgisayarlarda çalışır.** Toplam boyut birkaç yüz KB'dir. Chrome 84+, Firefox 78+ hedeflenir. Yeni CSS özellikleri (color-mix, :has, container query) kullanılmaz.
- **Etkileşimli tahtaya uygun.** Dokunmayla oynanan oyunlar (sürükle-bırak yerine dokun-yerleştir), tam ekran slayt ve büyük yazı (A+) modu vardır.

### 3. Dersteki akışa uygun
Öğretmen sunumu tahtada açar, öğrenciler aynı dersi kendi bilgisayarında açar. Site ilk açılışta "Öğrenciyim / Öğretmenim" diye sorar ve seçimi o bilgisayarda hatırlar. Şifre yoktur: bu bir güvenlik değil, düzen ayrımıdır.

Ders sayfası sekmelidir, aynı anda tek bölüm görünür. **Öğrencinin** sekmeleri:

1. **Sunum:** Öğretmenle birlikte takip edilir.
2. **Deftere yaz:** Sadece yazılması gereken 3–5 madde.
3. **Etkinlik:** Adım adım, bilgisayarın işletim sistemine göre. Sınıflandırma oyunu, **destekleme** ve **zenginleştirme** altta açılır bölümlerde.
4. **Mini test:** Anında geri bildirim. Cevaplar saklanır, test yeniden çözülebilir.
5. **Bulmaca:** Kelime + ipucu listesinden otomatik oluşan çengel bulmaca.

Biten bölümün sekmesinde numara yerine ✓ görünür. Tarayıcının geri tuşu önceki sekmeye döner.

**Öğretmen** bunlara ek olarak "Ders akışı" sekmesinde öğrenme çıktısını, 80 dakikalık ders akışını, ölçme aracını, notları, yazdırılacak kâğıdı ve cevap anahtarını görür. Kazanım Haritası ve Öğretmen Masası da yalnızca öğretmen görünümündedir.

Öğretmen derse ana sayfadan hafta numarasıyla ulaşır: sınıfı ve 36 haftadan birini seçer, o haftanın kazanımı ve dersi aynı sayfada açılır. Arama kutusu da hafta numarasını anlar (`7`, `7. hafta`).

---

## Klasör yapısı

```
bilisim-defteri/
├─ index.html                  Sitenin giriş dosyası
├─ assets/
│  ├─ style.css                Tasarım (sadece açık tema)
│  ├─ mulish.css               Gömülü yazı tipi (lisans: mulish-OFL.txt)
│  ├─ app.js                   Sayfalar, oyunlar, test, yazdırma
│  ├─ crossword.js             Bulmaca oluşturucu ve harf temizleme (cwClean)
│  └─ shuffle.js               Sınıflandırma kartları için tekrarlanabilir karıştırma
├─ content/
│  ├─ program.js               Resmi öğrenme çıktıları (MEB'den birebir)
│  ├─ plan.js                  Haftalık plan + varsayılan ayarlar
│  └─ lessons/
│     ├─ _SABLON.js            Yeni ders şablonu
│     ├─ 5-1-5-bilgisayar-sistemleri.js
│     ├─ 5-1-6-dosya-klasor.js
│     └─ 6-1-1-yenilikci-bt.js
├─ README.md
├─ NOTLAR.md                   Çalışma günlüğü (en yeni kayıt üstte)
├─ TASARIM-SISTEMI.md          Renk, yazı, ölçü ve bileşen kuralları
└─ ICERIK-REHBERI.md           Ders yazarken uyulacak kurallar
```

İçerikler `.json` değil `.js` dosyasıdır. Böylece site sunucu olmadan, çift tıklayarak ve internetsiz açılabilir.

---

## Yeni ders ekleme

1. `content/lessons/_SABLON.js` dosyasını kopyalayın, adını ders id'siyle aynı yapın.
2. Alanları `ICERIK-REHBERI.md` kurallarına göre doldurun.
3. `index.html` içindeki "Dersler" bölümüne `<script src="content/lessons/DOSYA.js"></script>` satırını ekleyin.
4. `content/plan.js` içinde ilgili haftanın `lesson` alanına ders id'sini yazın.
5. Siteyi açıp üç sınıf ortamını da deneyin ve çalışma kâğıdını yazdırma önizlemesinde kontrol edin.
6. `node tools/dogrula.js` komutunu çalıştırıp hata çıkmadığından emin olun.

---

## İçeriği doğrulama

```
node tools/dogrula.js
```

`content/program.js`, `content/plan.js` ve `content/lessons/` içindeki ders dosyalarını tarayıcıdaki gibi sırayla yükler (npm paketi kullanmaz, sitenin parçası değildir) ve `ICERIK-REHBERI.md` kurallarına göre kontrol eder.

**HATA (kırmızı, çıkış kodu 1):** outcome kodu `program.js`'te yok, bir süreç bileşeni için slayt/defter/test eksik, `lab`/`tahta`/`kagit` etkinliklerinden biri boş ya da covers'ı kapsamıyor, `kagit` etkinliğinde `sheet` yok, test cevap indeksi geçersiz, sınıflandırma kartları karıştırılınca orijinal sırada kalıyor, bulmaca kelimesi temizlenince harf kaybediyor (boşluk, tire, tanınmayan harf), bulmacaya yerleşmeyen kelime var, ızgarada ipucusuz bir harf dizisi oluşmuş, `plan.js`'teki bir ders id'si yok ya da `index.html`'e eklenmemiş, dosya adı ders id'siyle uyuşmuyor.

**UYARI (sarı):** `lab` etkinliğinde program/menü açma geçen bir adımda Pardus/Windows yönergesi yok, ders akışı toplamı 80 dk değil, slayt/defter/adım/test/bulmaca sayıları `ICERIK-REHBERI.md` §4'teki önerilen aralığın dışında.

`_SABLON.js` taranmaz.

---

## Demo durumu

| Sınıf | Tema | Öğrenme çıktıları | Hazır ders |
|---|---|---|---|
| 5 | 1. Bilişim Teknolojilerinin Hayatımızdaki Yeri | BTY.5.1.1 – 5.1.6 eklendi | BTY.5.1.5, BTY.5.1.6 |
| 6 | 1. Bilişim Teknolojilerinin Hayatımızdaki Yeri | BTY.6.1.1 – 6.1.2 eklendi | BTY.6.1.1 |
| 5–6 | 2.–6. temalar | Eklenecek | – |

**Hafta numaraları örnektir**, rehber öğretmenin yıllık planına göre `content/plan.js` içinde güncellenmelidir.

---

## Yol haritası

- [ ] 5. ve 6. sınıf Tema 1'in kalan dersleri (BTY.5.1.1–5.1.4, BTY.6.1.2)
- [ ] Diğer temaların öğrenme çıktılarının `program.js`'e eklenmesi
- [ ] Rehber öğretmenin yıllık planına göre hafta düzeni
- [ ] Slaytlara görsel ekleme desteği (Canva / PowerPoint'ten PNG)
- [ ] Yönetim paneli (Supabase): ders formu, slayt yükleme, bulmaca önizleme. Panel içeriği yine bu `.js` biçiminde dışa aktarabilmeli, böylece internetsiz kullanım bozulmaz.
- [ ] Kayıtlı "Yaptım" ve defter işaretleri adım sırasına göre tutuluyor. Ders içeriğinde adım ya da madde eklenip silinince işaretler kayabilir. Adımlara sabit kimlik vermek ya da içerik değişince kayıtları sıfırlamak gerekebilir.
- [ ] Gerçek sınıfta kullanılabilirlik testi (öğrenci gözlemi + öğretmen görüşmesi)

---

## Kaynaklar

- MEB TYMM Bilişim Teknolojileri ve Yazılım, 5. sınıf 1. tema: https://tymm.meb.gov.tr/bilisim-teknolojileri-ve-yazilim-dersi/unite/674
- MEB TYMM Bilişim Teknolojileri ve Yazılım, 6. sınıf 1. tema: https://tymm.meb.gov.tr/bilisim-teknolojileri-ve-yazilim-dersi/unite/681
