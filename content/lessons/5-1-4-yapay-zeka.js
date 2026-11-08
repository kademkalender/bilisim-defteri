/* 5. Sınıf · Tema 1 · BTY.5.1.4 Yapay zekâ ile ilgili temel kavramları ve özellikleri sorgulayabilme
   Süreç bileşenleri: a) merak ettiği konuları tanımlar  b) sorular sorar  c) bilgi toplar
   ç) toplanan bilgilerin doğruluğunu değerlendirir  d) olası etkilerine ilişkin çıkarım yapar
   Programdaki uygulamalardan: "Makineler düşünebilir mi?", doğal ve yapay zekâ karşılaştırması, Neden-Nasıl-Ne zaman soruları,
   zaman çizelgesi (Turing, Cahit Arf, satranç, Go), karakter canlandırma, doğru-yanlış bilgi kartları, alanlara göre etkiler */
BD.lesson({
  id: "5-1-4-yapay-zeka",
  grade: "5", theme: 1, week: 4,
  title: "Yapay Zekâ ile Tanışalım",
  outcome: "BTY.5.1.4",
  covers: ["a", "b", "c", "ç", "d"],
  duration: "2 ders saati (40+40 dk)",
  hook: "Telefon yüzünü tanıyıp kilidi açıyor, robot süpürge evin haritasını çıkarıyor. Sence bu makineler düşünüyor mu? Bugün bir araştırmacı gibi merak edecek, soru soracak ve cevapları kontrol edeceğiz.",

  slides: [
    { type: "title", pill: "5. sınıf · 4. hafta", h: "Yapay Zekâ ile Tanışalım", p: "Makineler düşünebilir mi? Merak et, sor, araştır, doğrula!" },
    { emoji: "❓", h: "Tahmin et: Makineler düşünebilir mi?", p: "Telefon yüzünü tanıyor, robot süpürge evin haritasını çıkarıyor. Sence bunlar bizim gibi düşünüyor mu?", reveal: "Bilim insanları bunu 70 yılı aşkın süredir tartışıyor! Yapay zekâ çok sayıda örnekten öğrenip tahmin yapar ama bizim gibi hissetmez.", b: "a" },
    { emoji: "💡", h: "Yapay zekâ nedir?", p: "Bilgisayarların örneklerden öğrenerek tanıma, tahmin ve karar verme yapmasını sağlayan teknolojidir.", list: ["Örnekler: sesli asistan, yüz tanıma, sürücüsüz (otonom) araba, robot süpürge"], b: "a" },
    { h: "Doğal zekâ ve yapay zekâ", cols: [
      { h: "Doğal zekâ", p: "İnsanların ve hayvanların zekâsı. Merak eder, hisseder, hayal kurar. Birkaç örnekle öğrenebilir." },
      { h: "Yapay zekâ", p: "İnsanların yaptığı makinelerin zekâsı. Çok hızlı hesaplar ama binlerce örneğe ihtiyaç duyar. Duygusu yoktur." }
    ], b: "a" },
    { emoji: "🔍", h: "Merak et, soru sor", p: "İyi bir araştırmacı soru sorarak başlar.", list: ["Neden? Yapay zekâ neden bazen hata yapar?", "Nasıl? Telefon yüzümü nasıl tanıyor?", "Ne zaman? İlk yapay zekâ ne zaman yapıldı?", "Şimdi sıra sende: Sen ne merak ediyorsun?"], b: "b" },
    { emoji: "⏳", h: "Yapay zekânın kısa tarihi", list: ["1950: Alan Turing \"Makineler düşünebilir mi?\" diye sordu.", "1959: Cahit Arf \"Makine düşünebilir mi ve nasıl düşünebilir?\" konulu bir konferans verdi.", "1997: Bir bilgisayar satrançta dünya şampiyonunu yendi.", "2016: Yapay zekâ Go oyununda dünya şampiyonunu yendi."], b: "c" },
    { emoji: "❓", h: "Tahmin et: Paradaki bilim insanı", p: "10 Türk lirasının arka yüzünde bir matematikçinin resmi var. 1959'da makinelerin düşünüp düşünemeyeceğini soran bu bilim insanı kim?", reveal: "Cahit Arf! Ünlü bir Türk matematikçidir. Yapay zekâyı Türkiye'de ilk tartışanlardandır.", b: "c" },
    { emoji: "✅", h: "Bilgi dedektifi: Bu bilgi doğru mu?", list: ["Kim yazmış? Kaynak güvenilir mi?", "Başka bir kaynak da aynısını söylüyor mu?", "Ne zaman yazılmış? Güncel mi?", "Gerçek mi, yoksa abartılı bir iddia mı?"], b: "ç" },
    { emoji: "❓", h: "Tahmin et: Doğru mu, yanlış mı?", p: "\"Yapay zekâ her zaman doğruyu söyler.\" Sence bu bilgi doğru mu?", reveal: "Yanlış! Yapay zekâ öğrendiği örneklerdeki hataları da öğrenir ve bazen yanlış cevap verir. Bu yüzden bilgiyi başka kaynaklardan da kontrol ederiz.", b: "ç" },
    { h: "Yapay zekâ neleri değiştirebilir? 🔮", cols: [
      { h: "Sağlık", p: "Doktorlara röntgendeki hastalığı bulmada yardım eder." },
      { h: "Tarım", p: "Bitki hastalıklarını erken fark eder, sulamayı ayarlar." },
      { h: "Turizm", p: "Dijital rehber olur, gezilecek yerler önerir." },
      { h: "İş ve eğitim", p: "Bazı işleri hızlandırır. Bazı meslekler değişebilir." }
    ], b: "d" },
    { emoji: "✏️", h: "Sıra sende!", p: "Deftere Yaz kısmını defterine geçir, sonra etkinliğe başla.", end: true }
  ],

  // Bilgi toplama (c) ve doğrulama (ç) internet olmadan bu kartlarla yapılır.
  infoCards: [
    { h: "Alan Turing", p: "İngiliz matematikçi. 1950'de \"Makineler düşünebilir mi?\" diye sordu ve Turing testi denen bir test önerdi." },
    { h: "John McCarthy", p: "Amerikalı bilim insanı. 1956'daki bir toplantıda bu alana \"yapay zekâ\" adını verenlerdendir." },
    { h: "Cahit Arf", p: "Türk matematikçi (1910-1997). 1959'da \"Makine düşünebilir mi ve nasıl düşünebilir?\" konferansını verdi. Resmi 10 TL'nin arka yüzündedir." },
    { h: "Satranç (1997)", p: "Her hamlede milyonlarca olasılığı hesaplayan bir bilgisayar, satrançta dünya şampiyonunu yendi." },
    { h: "Go oyunu (2016)", p: "Satrançtan çok daha fazla olasılığı olan Go oyununda bir yapay zekâ dünya şampiyonunu yendi." },
    { h: "Nasıl öğrenir?", p: "Çok sayıda örnekten öğrenir. Binlerce kedi fotoğrafı görünce yeni bir fotoğrafta kedi olup olmadığını tahmin eder." },
    { h: "Hata yapar mı?", p: "Evet. Örnekler eksik ya da yanlışsa yanılır, bu yüzden başka kaynaklardan kontrol edilir. Duyguları yoktur." }
  ],

  notebook: [
    { t: "<mark>Yapay zekâ</mark>: Bilgisayarların örneklerden öğrenerek tanıma, tahmin ve karar verme yapmasıdır. <mark>Doğal zekâ</mark> insanların ve hayvanların zekâsıdır.", b: "a" },
    { t: "Merak ettiğimi <mark>Neden? Nasıl? Ne zaman?</mark> sorularıyla sorarım.", b: "b" },
    { t: "Yapay zekânın tarihi: <mark>Alan Turing (1950)</mark> ve <mark>Cahit Arf (1959)</mark> makinelerin düşünüp düşünemeyeceğini sordu.", b: "c" },
    { t: "Bilginin <mark>doğruluğunu</mark> kontrol ederim: Kim yazmış? Başka bir kaynak da aynısını söylüyor mu?", b: "ç" },
    { t: "Yapay zekâ sağlık, tarım ve turizmde işleri kolaylaştırır ama <mark>hata yapabilir</mark> ve bazı meslekleri değiştirebilir.", b: "d" }
  ],

  sort: {
    title: "Doğal zekâ mı, yapay zekâ mı?",
    intro: "Her örneği doğru zekâ türüne yerleştir.",
    b: "a",
    cats: ["Doğal zekâ", "Yapay zekâ"],
    items: [
      { t: "Köpeğin sahibini sesinden tanıması", c: 0 }, { t: "Bebeğin yürümeyi öğrenmesi", c: 0 },
      { t: "Arının çiçeği bulması", c: 0 }, { t: "Bir öğrencinin şiir yazması", c: 0 },
      { t: "Telefonun yüzü tanıyıp kilidi açması", c: 1 }, { t: "Robot süpürgenin evin haritasını çıkarması", c: 1 },
      { t: "Çeviri uygulamasının cümleyi çevirmesi", c: 1 }, { t: "Navigasyonun trafiğe göre yol bulması", c: 1 }
    ]
  },

  activities: {
    lab: {
      title: "Yapay zekâ araştırma kartım",
      goal: "Merak ettiğin bir konuyu seç, sorular sor, bilgi kartlarından cevap topla, doğruluğunu kontrol et ve bir çıkarım yap.",
      needs: ["Her öğrenciye ya da her iki öğrenciye bir bilgisayar", "Bilgi kartları (ekranda ya da yazdırılmış)"],
      b: ["a", "b", "c", "ç", "d"],
      steps: [
        { t: "Bir kelime işlemci programı aç.", pardus: "Menü → Ofis → LibreOffice Writer", windows: "Başlat → Word ya da LibreOffice Writer" },
        "Başlığa yapay zekâ hakkında merak ettiğin konuyu yaz. Örnek: \"Yapay zekâ nasıl öğrenir?\"",
        "Bu konu hakkında \"Neden?\", \"Nasıl?\" ve \"Ne zaman?\" ile başlayan üç soru yaz.",
        "Bilgi kartlarını oku. Sorularının cevaplarını kendi cümlelerinle yaz.",
        "Her cevabın yanına hangi karttan aldığını yaz. Aynı bilgiyi iki kaynakta da bulduysan yanına (doğrulandı) yaz.",
        "\"Bence yapay zekâ gelecekte ... alanında ... değiştirecek, çünkü ...\" cümlesini tamamla.",
        "Belgeni Dosya → Farklı Kaydet ile Belgeler klasörüne 5A_Ayse_YapayZeka gibi kendi sınıfın ve adınla kaydet.",
        "Yanındaki arkadaşının sorularından birini oku ve cevaplamaya çalış."
      ],
      online: "Öğretmeninin izin verdiği, çocuklar için güvenli bir kaynakta sorularından birinin cevabını ara. Bulduğun bilgiyi bilgi kartlarıyla karşılaştır: Aynı mı, farklı mı?"
    },
    tahta: {
      title: "Zekâ haritası ve zaman çizelgesi",
      goal: "Doğal ve yapay zekâyı karşılaştır, sorular sor, zaman çizelgesi kur, bilgileri doğrula ve geleceğe dair çıkarım yap.",
      needs: ["Etkileşimli tahta ya da projeksiyon", "Bilgi kartları (çalışma kâğıdıyla yazdırılır)"],
      b: ["a", "b", "c", "ç", "d"],
      steps: [
        "\"Makineler düşünebilir mi?\" Evet diyenler ve hayır diyenler birer gerekçe söyler.",
        "Tahtaya \"Zekâ\" yazılır, altına \"Doğal zekâ\" ve \"Yapay zekâ\" dalları açılır. Gönüllüler \"Doğal zekâ mı, yapay zekâ mı?\" oyununu oynar.",
        "Gruplar birer örnek alır (robot süpürge, yüz tanıma, çeviri, sürücüsüz araba) ve Neden, Nasıl, Ne zaman soruları hazırlar.",
        "Tahtaya bir zaman çizelgesi çizilir. Gönüllüler bilgi kartlarından 1950, 1956, 1959, 1997 ve 2016 olaylarını yazar.",
        "Karakter canlandırma: Bir öğrenci Alan Turing, bir öğrenci Cahit Arf olur ve bilgi kartına dayanarak kendini 30 saniyede tanıtır.",
        "Öğretmen öğretmen notlarındaki 4 iddiayı okur. Sınıf doğru ya da yanlış der ve hangi karttan kontrol ettiğini söyler.",
        "Her grup bir çıkarım cümlesi yazar: \"Yapay zekâ 10 yıl sonra ... alanını değiştirebilir, çünkü ...\""
      ]
    },
    kagit: {
      title: "Bilgi dedektifleri",
      goal: "Merak ettiğin soruları yaz, iddiaları bilgi kartlarıyla kontrol et ve yapay zekânın etkileri hakkında bir çıkarım yap.",
      needs: ["Yazdırılmış çalışma kâğıdı (bilgi kartları dahil)", "Bir soru kutusu"],
      b: ["a", "b", "c", "ç", "d"],
      steps: [
        "Herkes yapay zekâ hakkında merak ettiği bir soruyu küçük bir kâğıda yazıp soru kutusuna atar.",
        "Sınıf 4'er kişilik gruplara ayrılır. Her gruba bilgi kartları verilir.",
        "Gruplar çalışma kâğıdındaki iddiaları bilgi kartlarıyla karşılaştırır, doğru ya da yanlış diye işaretler ve hangi kartta bulduklarını yazar.",
        "Gruplar kararlarını karşılaştırır. Farklı karar varsa kart birlikte okunur.",
        "Öğretmen soru kutusundan sorular çeker, gruplar kartlara bakarak cevaplar.",
        "Herkes çalışma kâğıdındaki soru tablosunu ve son çıkarım sorusunu tek başına doldurur."
      ],
      sheet: [
        { h: "1. Merak ettiğim konu: ................................................ Sorularım:", type: "table", head: ["Soru türü", "Sorum"], rows: [["Neden?", ""], ["Nasıl?", ""], ["Ne zaman?", ""]] },
        { h: "2. Doğru mu, yanlış mı? Bilgi kartlarıyla kontrol et.", type: "table", head: ["İddia", "D / Y", "Hangi kartta buldum?"], rows: [["Yapay zekâ her zaman doğruyu söyler.", "", ""], ["Cahit Arf 1959'da makinelerin düşünüp düşünemeyeceğini sordu.", "", ""], ["Yapay zekâ ilk kez 2020'de ortaya çıktı.", "", ""], ["Bir bilgisayar 1997'de satranç dünya şampiyonunu yendi.", "", ""], ["Yapay zekânın duyguları vardır.", "", ""]] },
        { h: "3. Bence yapay zekâ gelecekte hangi alanı nasıl değiştirecek? Nedenini de yaz.", type: "lines", n: 2 }
      ]
    }
  },

  diff: {
    destek: { who: "Etkinlikte zorlanan öğrenciler için", items: [
      "Bulmaca bölümünü çöz. Her kelime için \"Bu ne demek?\" sorusuna bir cümleyle cevap ver.",
      "Doğal zekâ ve yapay zekâ örnek kartlarını iki gruba ayır.",
      "Sadece bir soru türüyle (Nasıl?) bir soru yaz ve bilgi kartlarından cevabını bul."
    ] },
    zengin: { who: "Etkinliği erken bitiren öğrenciler için", items: [
      "Yapay zekânın tarımda (bitki hastalığı, sulama) ve turizmde (dijital müze gezisi, gezi önerisi) nasıl kullanılabileceğine örnekler yaz.",
      "Alan Turing ya da Cahit Arf'ın gözünden \"Bugünün yapay zekâsını görseydim...\" diye başlayan kısa bir mektup yaz.",
      "Yapay zekânın olumlu ve olumsuz etkilerini bir tabloda karşılaştır ve kendi görüşünü yaz."
    ] }
  },

  quiz: [
    { q: "Hangisi doğal zekâya örnektir?", o: ["Telefonun yüz tanıması", "Bebeğin yürümeyi öğrenmesi", "Robot süpürgenin çalışması"], a: 1, b: "a", hint: "Doğal zekâ makinelerde değil, canlılarda olur.", why: "Bebeğin yürümeyi öğrenmesi doğal zekâdır. Diğer ikisi makinedir." },
    { q: "Hangisi araştırmaya başlamak için iyi bir sorudur?", o: ["Yapay zekâ yüzümü nasıl tanır?", "Robot süpürge mavi mi?", "Yapay zekâ güzel mi?"], a: 0, b: "b", why: "İyi bir soru, cevabını araştırarak öğrenebileceğimiz bir şeyi sorar.", hint: "Kişiden kişiye değişen bir cevabı araştıramazsın." },
    { q: "1959'da makinelerin düşünüp düşünemeyeceğini soran Türk matematikçi kimdir?", o: ["Cahit Arf", "Alan Turing", "John McCarthy"], a: 0, b: "c", hint: "Seçeneklerden yalnızca biri Türk.", why: "Cahit Arf, makinelerin düşünüp düşünemeyeceğini soran Türk matematikçidir." },
    { q: "Bir bilginin doğru olup olmadığını anlamak için ne yapmalıyız?", o: ["İlk okuduğumuza inanırız", "Başka kaynakla karşılaştırırız", "En uzun yazıyı seçeriz"], a: 1, b: "ç", hint: "Bir bilgiyi tek bir yerden okumak yeter mi?", why: "Bir bilgiyi başka kaynaklarla karşılaştırınca doğru olup olmadığını anlarız." },
    { q: "Yapay zekânın tarımdaki olası etkisi hangisidir?", o: ["Bitki hastalıklarını erken fark etmek", "Yağmur yağdırmak", "Toprağın rengini değiştirmek"], a: 0, b: "d", hint: "Yapay zekâ fotoğraflara bakıp bir şeyleri fark edebilir.", why: "Yapay zekâ bitki fotoğraflarına bakıp hastalığı erkenden fark edebilir." }
  ],

  crossword: [
    { a: "Turing", c: "1950'de makinelerin düşünüp düşünemeyeceğini sordu" },
    { a: "Arf", c: "10 TL'deki matematikçi: Cahit ..." },
    { a: "Doğal", c: "İnsan ve hayvanların zekâsı: ... zekâ" },
    { a: "Satranç", c: "1997'de bilgisayarın şampiyonu yendiği oyun" },
    { a: "Örnek", c: "Yapay zekâ binlerce ... görerek öğrenir" },
    { a: "Kaynak", c: "Bilgiyi başka bir ... ile karşılaştırırız" },
    { a: "Tahmin", c: "Yapay zekâ öğrendiklerine bakarak bunu yapar" },
    { a: "Tarım", c: "Yapay zekâ bu alanda bitki hastalığı bulur" }
  ],

  assessment: {
    tool: "Frayer modeli, çalışma sayfası ve gözlem formu",
    items: [
      "Frayer modeli: \"Yapay zekâ\" için tanım, özellikler, örnekler ve örnek olmayanlar yazılır. (a)",
      "Merak ettiği bir konuyu belirler. (a)",
      "Neden, Nasıl ve Ne zaman ile başlayan anlamlı sorular sorar. (b)",
      "Bilgi kartlarından sorularına uygun bilgi toplar. (c)",
      "İddiaları kaynakla karşılaştırarak doğru ya da yanlış olduğuna karar verir. (ç)",
      "Topladığı bilgilere dayanarak yapay zekânın bir alandaki olası etkisi hakkında gerekçeli çıkarım yapar. (d)"
    ]
  },

  flow: [
    { part: "1. ders" },
    { m: 5, h: "Giriş", d: "\"Makineler düşünebilir mi?\" beyin fırtınası ve ilk \"Tahmin et\" slaytı." },
    { m: 20, h: "Slayt", d: "Yapay zekâ ve doğal zekâ, soru türleri, kısa tarih, Cahit Arf tahmini, bilgi dedektifi, doğru-yanlış tahmini, alanlara göre etkiler." },
    { m: 10, h: "Deftere Yaz", d: "Öğrenciler 5 maddeyi defterlerine geçirir. Kendi cümleleriyle bir yapay zekâ tanımı da yazarlar." },
    { m: 5, h: "Doğal zekâ mı, yapay zekâ mı? oyunu", d: "Sınıflandırma oyunu." },
    { part: "2. ders" },
    { m: 25, h: "Etkinlik", d: "Sınıf ortamına göre araştırma kartı, zekâ haritası ve zaman çizelgesi ya da bilgi dedektifleri." },
    { m: 5, h: "Farklılaştırma", d: "Destekleme ve zenginleştirme kartları." },
    { m: 10, h: "Mini test ve bulmaca", d: "Her grup çıkarım cümlesini okuyarak kapanış." }
  ],

  teacherNotes: [
    "Tahtada okunacak 4 iddia: 1) \"Yapay zekâ her zaman doğruyu söyler.\" (Yanlış) 2) \"Cahit Arf 1959'da makinelerin düşünüp düşünemeyeceğini sordu.\" (Doğru) 3) \"Yapay zekânın duyguları vardır.\" (Yanlış) 4) \"Bir bilgisayar 1997'de satranç dünya şampiyonunu yendi.\" (Doğru)",
    "Bilgi kartları, internet olmadan bilgi toplama (c) ve doğrulama (ç) yapılabilsin diye hazırlandı. Kartlar çalışma kâğıdıyla birlikte yazdırılır.",
    "Programda öğretmen rehberliğinde güvenli, filtreli yapay zekâ destekli eğitim araçlarının sınırlı kullanımı önerilir. Bu isteğe bağlıdır. Öğrencilerden kişisel hesap açmaları istenmemelidir.",
    "Karakter canlandırmasında öğrenciler bilgi kartındaki bilgiye bağlı kalır. Bilinmeyen ayrıntılar uydurulmamalıdır, bu da doğru bilgi alışkanlığının bir parçasıdır.",
    "Bu ders 5. temadaki yapay zekâ derslerine (BTY.5.5.1, BTY.5.5.2) hazırlıktır. Etik ve güvenlik konuları orada ayrıntılı işlenir."
  ]
});
