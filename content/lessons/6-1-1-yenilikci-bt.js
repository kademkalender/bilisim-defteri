/* 6. Sınıf · Tema 1 · BTY.6.1.1 Yenilikçi bilişim teknolojilerini sınıflandırabilme
   Süreç bileşenleri: a) kavramları belirler  b) günlük hayatı kolaylaştırmadaki rolüyle ilişkilendirir  c) kullanım alanlarına göre gruplandırır */
BD.lesson({
  id: "6-1-1-yenilikci-bt",
  grade: "6", theme: 1, week: 1,
  title: "Yenilikçi Bilişim Teknolojileri",
  outcome: "BTY.6.1.1",
  covers: ["a", "b", "c"],
  duration: "2 ders saati (40+40 dk)",
  hook: "Telefonun kamerasını bir odaya tuttuğunda ekranda olmayan bir koltuk görsen, bu sihir mi? Hayır, bu bir yenilikçi bilişim teknolojisi! Bugün hayatımıza yeni giren teknolojileri tanıyacağız.",

  slides: [
    { type: "title", pill: "6. Sınıf · 1. Hafta", h: "Yenilikçi Bilişim Teknolojileri", p: "Hayatımıza yeni giren teknolojiler neler ve işimizi nasıl kolaylaştırıyor?" },
    { emoji: "💡", h: "Yenilikçi bilişim teknolojisi nedir?", p: "Hayatımıza yeni giren ve bir işi eskisinden farklı, daha kolay ya da daha hızlı yapmamızı sağlayan teknolojilerdir.", b: "a" },
    { emoji: "📱", h: "Artırılmış gerçeklik (AR)", p: "Gerçek dünyanın üzerine dijital görüntüler ekler. Örnek: Telefon kamerasıyla odaya sanal bir mobilya yerleştirmek, kitaptaki resmin ekranda canlanması.", b: "a" },
    { emoji: "🥽", h: "Sanal gerçeklik (VR)", p: "Özel bir gözlükle bizi tamamen dijital bir dünyaya götürür. Örnek: Sınıftan çıkmadan bir müzeyi gezmek.", b: "a" },
    { h: "AR ile VR arasındaki fark", cols: [
      { h: "Artırılmış gerçeklik", p: "Gerçek dünyayı görmeye devam ederiz, üstüne dijital görüntü eklenir." },
      { h: "Sanal gerçeklik", p: "Gerçek dünyayı görmeyiz, tamamen dijital bir ortamdayız." }
    ], b: "a" },
    { emoji: "⌚", h: "Giyilebilir teknolojiler", p: "Üzerimizde taşıdığımız akıllı cihazlardır. Örnek: Adım sayan bileklik, nabız ölçen akıllı saat, akıllı gözlük.", b: "a" },
    { emoji: "🤖", h: "Yapay zekâ ve bulut", list: ["Yapay zekâ: Örneklerden öğrenip tahmin yapan sistemler. Örnek: Sesli asistan, anlık çeviri.", "Bulut depolama: Dosyaları internetteki bilgisayarlarda saklamak. Her cihazdan ulaşabiliriz."], b: "a" },
    { h: "Hayatımızı nasıl kolaylaştırıyorlar?", list: ["Sağlık: Akıllı saat kalp atışını takip eder.", "Eğitim: AR kitaplarla konuyu 3 boyutlu görürüz.", "Ulaşım: Yapay zekâlı harita en kısa yolu bulur.", "İletişim: Anlık çeviri farklı dilleri konuşanları buluşturur."], b: "b" },
    { h: "Kullanım alanlarına göre gruplandıralım", cols: [
      { h: "Sağlık", p: "Akıllı saat, yapay zekâlı röntgen inceleme" },
      { h: "Eğitim", p: "AR kitap, sanal müze gezisi" },
      { h: "Sanayi", p: "Robot kol, akıllı fabrika" },
      { h: "Eğlence ve iletişim", p: "VR oyun, görüntülü görüşme, anlık çeviri" }
    ], b: "c" },
    { emoji: "⚖️", h: "Her teknolojinin iki yüzü var", p: "Bu teknolojiler hayatımızı kolaylaştırır ama kişisel verilerimizin korunması ve ekran süremiz gibi konularda dikkatli olmalıyız.", b: "b" },
    { emoji: "✏️", h: "Sıra sende!", p: "Deftere Yaz kısmını defterine geçir, sonra etkinliğe başla.", end: true }
  ],

  infoCards: [
    { h: "Artırılmış Gerçeklik (AR)", p: "Kamera ile gördüğümüz gerçek görüntünün üstüne bilgisayar görüntüsü ekler. Telefon ve tabletlerle kullanılır. Eğitimde, alışverişte ve oyunlarda kullanılır." },
    { h: "Sanal Gerçeklik (VR)", p: "Başa takılan bir gözlükle kullanıcıyı tamamen dijital bir ortama taşır. Sanal müze gezileri, eğitim simülasyonları ve oyunlarda kullanılır." },
    { h: "Giyilebilir Teknolojiler", p: "Akıllı saat, akıllı bileklik ve akıllı gözlük gibi üzerimizde taşıdığımız cihazlardır. Adım, nabız ve uyku gibi bilgileri ölçebilirler." },
    { h: "Yapay Zekâ", p: "Bilgisayarların örneklerden öğrenerek tahmin yapmasını sağlar. Sesli asistanlar, çeviri uygulamaları ve öneri sistemleri yapay zekâ kullanır." },
    { h: "Bulut Depolama", p: "Dosyalarımızı kendi bilgisayarımız yerine internetteki büyük bilgisayarlarda saklamaktır. İnternet olan her yerden dosyalarımıza ulaşabiliriz." },
    { h: "Robotlar", p: "Fabrikalarda tekrar eden ya da tehlikeli işleri yapan makinelerdir. Bazı robotlar yapay zekâ ile çevresini algılayabilir." }
  ],

  notebook: [
    { t: "<mark>Yenilikçi bilişim teknolojileri</mark>: Hayatımıza yeni giren ve işlerimizi kolaylaştıran teknolojilerdir.", b: "a" },
    { t: "<mark>Artırılmış gerçeklik (AR)</mark> gerçek dünyanın üstüne dijital görüntü ekler. <mark>Sanal gerçeklik (VR)</mark> bizi tamamen dijital bir dünyaya götürür.", b: "a" },
    { t: "Diğer örnekler: <mark>giyilebilir teknolojiler</mark> (akıllı saat), <mark>yapay zekâ</mark> (sesli asistan), <mark>bulut depolama</mark>.", b: "a" },
    { t: "Bu teknolojiler sağlık, eğitim, ulaşım ve iletişimde <mark>hayatımızı kolaylaştırır</mark>. Kişisel verilerimizi korumaya dikkat etmeliyiz.", b: "b" },
    { t: "Kullanım alanları: <mark>sağlık, eğitim, sanayi, eğlence, iletişim</mark>.", b: "c" }
  ],

  sort: {
    title: "Teknoloji fuarı: Hangi alana ait?",
    intro: "Her teknolojiyi en çok kullanıldığı alana yerleştir.",
    b: "c",
    cats: ["Sağlık", "Eğitim", "Sanayi", "Eğlence", "İletişim"],
    items: [
      { t: "Nabız ölçen akıllı saat", c: 0 }, { t: "Röntgeni inceleyen yapay zekâ", c: 0 },
      { t: "AR ile canlanan ders kitabı", c: 1 }, { t: "Sanal müze gezisi", c: 1 },
      { t: "Araba üreten robot kol", c: 2 }, { t: "Akıllı fabrika sensörü", c: 2 },
      { t: "VR oyunu", c: 3 }, { t: "Müzik öneren uygulama", c: 3 },
      { t: "Anlık çeviri", c: 4 }, { t: "Görüntülü görüşme", c: 4 }
    ]
  },

  activities: {
    lab: {
      title: "Teknoloji kataloğu",
      goal: "Üç yenilikçi teknolojiyi seç ve her biri için bir katalog sayfası hazırla.",
      needs: ["Her öğrenciye ya da her iki öğrenciye bir bilgisayar"],
      b: ["a", "b", "c"],
      steps: [
        "Bilgi kartlarından 3 teknoloji seç.",
        { t: "Bir sunu programı aç.", pardus: "Menü → Ofis → LibreOffice Impress", windows: "PowerPoint ya da LibreOffice Impress" },
        "Her teknoloji için bir slayt hazırla: adı, ne işe yaradığı, hangi alanda kullanıldığı.",
        "Her slayta \"Hayatımı nasıl kolaylaştırır?\" başlığıyla bir cümle ekle.",
        "Her slayta \"Nelere dikkat etmeliyim?\" başlığıyla bir cümle ekle.",
        "Sununu SınıfınŞuben_Adın_Teknoloji adıyla kaydet.",
        "Bir arkadaşına sununu göster ve onun sunusundan yeni öğrendiğin bir şeyi defterine yaz."
      ],
      online: "Seçtiğin teknolojiyle ilgili öğretmeninin önerdiği güvenilir bir siteden bir örnek daha bulabilirsin. Bulduğun bilginin kaynağını slayta yaz."
    },
    tahta: {
      title: "Teknoloji fuarı",
      goal: "Teknolojileri sınıfça tanı, kullanım alanlarına göre grupla ve artılarını eksilerini tartış.",
      needs: ["Etkileşimli tahta ya da projeksiyon"],
      b: ["a", "b", "c"],
      steps: [
        "Sınıf rastgele 5 gruba ayrılır. Her gruba bir bilgi kartı verilir.",
        "Gruplar 5 dakika içinde kartlarındaki teknolojiyi tartışır: Ne işe yarar? Kim kullanır? Bir riski var mı?",
        "Her gruptan bir sözcü 1 dakikada kendi teknolojisini sınıfa tanıtır.",
        "Gönüllüler tahtaya gelip aşağıdaki \"Teknoloji fuarı\" oyununu oynar.",
        "Sınıfça tartışın: Bir teknoloji birden fazla alanda kullanılabilir mi? Örnek verin."
      ]
    },
    kagit: {
      title: "Teknoloji kartları ve poster",
      goal: "Bilgi kartlarıyla bir teknolojiyi tanı, bir poster hazırla ve sınıfa sun.",
      needs: ["Yazdırılmış çalışma kâğıdı (bilgi kartları dahil)", "A4 ya da A3 kâğıt, boya kalemleri"],
      b: ["a", "b", "c"],
      steps: [
        "Öğretmen bilgi kartlarını keserek gruplara dağıtır.",
        "Her grup kartındaki teknolojiyi okur ve bir poster hazırlar: teknolojinin resmi, adı, kullanım alanı.",
        "Postere \"Hayatımızı nasıl kolaylaştırır?\" ve \"Nelere dikkat etmeliyiz?\" bölümlerini ekleyin.",
        "Posterler duvara asılır, gruplar sırayla tanıtım yapar.",
        "Herkes çalışma kâğıdındaki tabloyu ve AR mı VR mı sorularını doldurur."
      ],
      sheet: [
        { h: "1. Teknolojileri kullanım alanına göre grupla", type: "table", head: ["Teknoloji", "Kullanım alanı"], rows: [["Nabız ölçen akıllı saat", ""], ["AR ile canlanan ders kitabı", ""], ["Araba üreten robot kol", ""], ["Anlık çeviri", ""], ["VR oyunu", ""]] },
        { h: "2. AR mı, VR mı? Yanına yaz.", type: "table", head: ["Durum", "AR / VR"], rows: [["Gözlük takıp sanal bir uzay istasyonunu geziyorum.", ""], ["Telefonumu masaya tutunca ekranda bir dinozor beliriyor.", ""], ["Kamerayla odama bakınca sanal bir koltuk görüyorum.", ""]] },
        { h: "3. Bir yenilikçi teknoloji seç. Hayatını nasıl kolaylaştırır?", type: "lines", n: 3 }
      ]
    }
  },

  diff: {
    destek: { who: "Etkinlikte zorlanan öğrenciler için", items: ["Kavram kartlarıyla eşleştirme yap: Teknolojinin adını tanımıyla eşleştir.", "Sadece 3 teknolojiyle çalış: akıllı saat, AR kitap, robot kol.", "Bir teknolojinin hayatını nasıl değiştirdiğini anlatan kısa bir resim çiz."] },
    zengin: { who: "Etkinliği erken bitiren öğrenciler için", items: ["İlk bilgisayar programını yazan kişi olarak bilinen Ada Lovelace hakkında bilgi topla ve sınıfa anlat.", "Birden fazla alanda kullanılan bir teknoloji bul ve her alan için bir örnek yaz.", "Ailene bir yenilikçi teknolojiyi tanıtan kısa bir broşür hazırla."] }
  },

  quiz: [
    { q: "Telefon kamerasıyla odaya bakınca ekranda sanal bir koltuk görmek hangi teknolojiye örnektir?", o: ["Sanal gerçeklik", "Artırılmış gerçeklik", "Bulut depolama"], a: 1, b: "a" },
    { q: "Aşağıdakilerden hangisi giyilebilir teknolojidir?", o: ["Akıllı saat", "Masaüstü bilgisayar", "Yazıcı"], a: 0, b: "a" },
    { q: "Anlık çeviri uygulaması günlük hayatı nasıl kolaylaştırır?", o: ["Dosyaları küçültür", "Farklı dilleri konuşan insanların anlaşmasını sağlar", "Kalp atışını ölçer"], a: 1, b: "b" },
    { q: "Araba fabrikasında çalışan robot kol hangi kullanım alanına girer?", o: ["Sanayi", "Eğlence", "Sağlık"], a: 0, b: "c" }
  ],

  crossword: [
    { a: "Bulut", c: "Dosyaları internetteki bilgisayarlarda saklama" },
    { a: "Giyilebilir", c: "Akıllı saat ve bileklik gibi üzerimizde taşıdığımız teknolojiler" },
    { a: "Sanal", c: "Gözlük takınca tamamen dijital bir dünyaya girdiğimiz gerçeklik türü" },
    { a: "Artırılmış", c: "Gerçek dünyanın üstüne dijital görüntü ekleyen gerçeklik türü" },
    { a: "Sağlık", c: "Nabız ölçen akıllı saat bu kullanım alanına girer" },
    { a: "Robot", c: "Fabrikalarda tekrar eden işleri yapan makine" },
    { a: "Çeviri", c: "Yapay zekânın başka dildeki yazıyı dilimize aktarması" },
    { a: "Eğitim", c: "AR ile canlanan ders kitabı bu kullanım alanına girer" }
  ],

  assessment: {
    tool: "Kontrol listesi ve Frayer modeli",
    items: [
      "AR, VR, giyilebilir teknoloji, yapay zekâ ve bulut depolamayı tanımlar. (a)",
      "AR ile VR arasındaki farkı bir örnekle açıklar. (a)",
      "Bir yenilikçi teknolojinin günlük hayatı nasıl kolaylaştırdığını örnekle anlatır. (b)",
      "Teknolojileri kullanım alanlarına göre doğru gruplandırır. (c)",
      "Frayer modeli: \"Yenilikçi bilişim teknolojisi\" kavramı için tanım, özellikler, örnekler ve örnek olmayanlar yazılır."
    ]
  },

  flow: [
    { part: "1. ders" },
    { m: 5, h: "Giriş", d: "AR koltuk sorusu. Öğrencilere bildikleri yeni teknolojileri sorma." },
    { m: 20, h: "Slayt", d: "Kavramlar: AR, VR, giyilebilir teknoloji, yapay zekâ, bulut." },
    { m: 10, h: "Deftere Yaz", d: "Öğrenciler 5 maddeyi defterlerine geçirir." },
    { m: 5, h: "Teknoloji fuarı oyunu", d: "Sınıflandırma oyunu." },
    { part: "2. ders" },
    { m: 25, h: "Etkinlik", d: "Sınıf ortamına göre katalog, fuar ya da poster çalışması." },
    { m: 5, h: "Farklılaştırma", d: "Destekleme ve zenginleştirme kartları." },
    { m: 10, h: "Mini test ve bulmaca", d: "Teknolojinin iki yüzü üzerine kısa tartışmayla kapanış." }
  ],

  teacherNotes: [
    "Bilgi kartları, internet olmadan araştırma yapılabilmesi için hazırlandı. İnternet olan okullarda öğrenciler ek kaynak da kullanabilir.",
    "Okulda AR destekli materyal yoksa 3. slaytı göstermek ya da bir öğrencinin telefonundaki örneği tahtaya yansıtmak yeterlidir. Öğrencilerden telefon getirmeleri istenmemelidir.",
    "Bu ders BTY.6.1.2 (Bilişim teknolojilerinin geleceği) dersine hazırlık niteliğindedir. Posterler bir sonraki derste de kullanılabilir.",
    "Kişisel veri ve ekran süresi konularında öğrencilerin kendi bilgilerini paylaşmaya zorlanmaması gerekir."
  ]
});
