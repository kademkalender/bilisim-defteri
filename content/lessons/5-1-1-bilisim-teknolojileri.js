/* 5. Sınıf · Tema 1 · BTY.5.1.1 Günlük yaşamda kullanılan bilişim teknolojilerini sınıflandırabilme
   Süreç bileşenleri: a) temel kavramları belirler  b) geçmişten günümüze benzerlik ve farklılıkları ilişkilendirir
   c) kullanım alanlarına göre gruplandırır
   Programdaki uygulamalardan: kavram kavanozu, daktilo/teyp/ilk bilgisayar karşılaştırması, kullanım alanına göre gruplama, grup sunumu */
BD.lesson({
  id: "5-1-1-bilisim-teknolojileri",
  grade: "5", theme: 1, week: 1,
  title: "Bilişim Teknolojilerini Tanıyalım",
  outcome: "BTY.5.1.1",
  covers: ["a", "b", "c"],
  duration: "2 ders saati (40+40 dk)",
  hook: "Bu sabah uyandığından beri kaç teknoloji kullandın? Çalan alarm, açılan televizyon, okul zili, servisteki harita... Parmaklarınla say bakalım. Bugün bunların ortak adını öğreneceğiz!",

  slides: [
    { type: "title", pill: "5. sınıf · 1. hafta", h: "Bilişim Teknolojilerini Tanıyalım", p: "Her gün kullandığımız teknolojiler neler, dün nasıldı, bugün nasıl?" },
    { emoji: "❓", h: "Tahmin et: Bu ne?", p: "Hem saat, hem fotoğraf makinesi, hem harita, hem müzik çalar, hem de mektup. Üstelik cebine sığıyor!", reveal: "Akıllı telefon! Eskiden bu işlerin her biri için ayrı bir cihaz gerekiyordu.", b: "b" },
    { h: "Dört anahtar kavram 🔑", cols: [
      { h: "Bilgi", p: "Öğrendiğimiz şeyler. Örnek: Yarın yağmur yağacağını bilmek." },
      { h: "İletişim", p: "Duygu, düşünce ve bilgiyi başkasıyla paylaşmak. Konuşmak, yazmak, mesaj atmak." },
      { h: "Teknoloji", p: "İşimizi kolaylaştıran araçlar. Tekerlek de bir teknolojidir!" },
      { h: "Bilişim", p: "Bilginin bilgisayar gibi araçlarla toplanması, saklanması, işlenmesi ve iletilmesi." }
    ], b: "a" },
    { emoji: "💡", h: "Bilişim teknolojileri nedir?", p: "Bilgiyi toplamak, saklamak, işlemek ve başkalarına iletmek için kullandığımız araçlardır.", list: ["Örnekler: bilgisayar, akıllı telefon, tablet, etkileşimli tahta, yazıcı.", "Bilgi ve iletişim teknolojileri (BİT): Bilgiyi paylaşmamızı ve haberleşmemizi sağlayan teknolojiler."], b: "a" },
    { emoji: "☁️", h: "Bulut bilişim ve sosyal medya", cols: [
      { h: "Bulut bilişim", p: "Dosyaları kendi bilgisayarımız yerine internetteki bilgisayarlarda saklamak. İnternet olan her yerden açabiliriz." },
      { h: "Sosyal medya", p: "İnsanların internette yazı, fotoğraf ve video paylaştığı ortamlar. Çoğu 13 yaşından büyükler için yapılmıştır." }
    ], b: "a" },
    { emoji: "🚀", h: "Bu teknolojileri neden kullanırız?", list: ["Hayatı kolaylaştırır: Ödevi evden göndermek.", "Hızlandırır: Mektup günler sürer, mesaj saniyeler.", "Maliyeti azaltır: Kâğıttan, yoldan ve paradan tasarruf.", "Verimliliği artırır: Aynı sürede daha çok iş yapmak."], b: "a" },
    { emoji: "❓", h: "Tahmin et: Dedemlerin yazı makinesi", p: "Tuşlarına basınca harfler doğrudan kâğıda basılırdı. Yanlış yazarsan silemezdin, sayfayı baştan yazardın. Bu makinenin adı ne?", reveal: "Daktilo! Bugün aynı işi bilgisayardaki yazı programıyla yapıyoruz. Hatayı tek tuşla siliyor, yazımızı kaydediyoruz.", b: "b" },
    { h: "İşler aynı, araçlar farklı ⏳", cols: [
      { h: "Daktilo → Yazı programı", p: "İkisi de yazı yazar. Bugün silebilir, kaydedebilir, yazdırabiliriz." },
      { h: "Teyp → Müzik uygulaması", p: "İkisi de müzik çalar. Bugün binlerce şarkı tek cihazda." },
      { h: "Mektup → Mesaj ve e-posta", p: "İkisi de haber iletir. Mektup günler sürer, mesaj saniyeler." },
      { h: "İlk bilgisayarlar → Dizüstü, telefon", p: "İkisi de hesap yapar. Bugünküler çok daha küçük ve hızlı." }
    ], b: "b" },
    { emoji: "🐘", h: "Tahmin et: İlk bilgisayar kaç kilo?", p: "Bir dizüstü bilgisayar 2 kilo kadardır. Peki 1946'da yapılan ENIAC adlı bilgisayar kaç kiloydu?", reveal: "Yaklaşık 27 bin kilo, yani 4-5 fil kadar! Koca bir odayı dolduruyordu. Bugün ondan güçlü bir bilgisayar çantamıza sığıyor.", b: "b" },
    { h: "Nerelerde kullanırız? 📂", cols: [
      { h: "Eğitim", p: "Etkileşimli tahta, dijital ders kitabı, eğitim videoları" },
      { h: "Sağlık", p: "Hastane randevu sistemi, tansiyon ölçen dijital cihaz" },
      { h: "Ulaşım", p: "Navigasyon, akıllı ulaşım kartı, trafik kameraları" },
      { h: "Sinema ve televizyon", p: "Dijital kamera, animasyon programları, uydu yayını" }
    ], b: "c" },
    { emoji: "✏️", h: "Sıra sende!", p: "Deftere Yaz kısmını defterine geçir, sonra etkinliğe başla.", end: true }
  ],

  // Kavram kavanozu etkinliğinde gruplar internet olmadan bu kartlardan araştırır.
  infoCards: [
    { h: "Bilgi", p: "Öğrenerek, gözlem yaparak ya da okuyarak edindiğimiz her şey. Örnek: hava durumu." },
    { h: "İletişim", p: "Duygu, düşünce ve bilgiyi paylaşmak. Örnek: konuşmak, yazmak, mesaj göndermek." },
    { h: "Teknoloji", p: "İşimizi kolaylaştırmak için ürettiğimiz araçlar. Örnek: tekerlek, saat, bilgisayar." },
    { h: "Bilişim", p: "Bilginin bilgisayarla toplanması, saklanması, işlenmesi ve iletilmesi." },
    { h: "BİT", p: "Bilgi ve iletişim teknolojileri: telefon, bilgisayar, televizyon, radyo, internet." },
    { h: "Bulut Bilişim", p: "Dosyaları internetteki bilgisayarlarda saklamak. Her yerden ulaşılır, internet gerekir." },
    { h: "Sosyal Medya", p: "İnternette yazı, fotoğraf ve video paylaşılan ortamlar. Çoğu 13 yaş üstü içindir." }
  ],

  notebook: [
    { t: "<mark>Bilgi</mark> öğrendiğimiz şeylerdir. <mark>İletişim</mark> bilgiyi ve düşüncemizi başkasıyla paylaşmaktır.", b: "a" },
    { t: "<mark>Bilişim teknolojileri</mark>: Bilgiyi toplamak, saklamak, işlemek ve iletmek için kullandığımız araçlardır. Örnek: bilgisayar, tablet, akıllı telefon.", b: "a" },
    { t: "<mark>Bulut bilişim</mark> dosyaları internetteki bilgisayarlarda saklamaktır. Bilişim teknolojileri işimizi <mark>kolaylaştırır ve hızlandırır</mark>.", b: "a" },
    { t: "Geçmişten bugüne <mark>işler aynı kaldı, araçlar değişti</mark>. Daktilo yerine yazı programı, mektup yerine mesaj kullanıyoruz. Cihazlar küçüldü ve hızlandı.", b: "b" },
    { t: "Bilişim teknolojilerini <mark>kullanım alanlarına</mark> göre gruplandırırız: eğitim, sağlık, ulaşım, iletişim, sinema ve televizyon.", b: "c" }
  ],

  sort: {
    title: "Teknoloji hangi alanda?",
    intro: "Her teknolojiyi en çok kullanıldığı alana yerleştir.",
    b: "c",
    cats: ["Eğitim", "Sağlık", "Ulaşım", "İletişim", "Sinema ve televizyon"],
    items: [
      { t: "Etkileşimli tahta", c: 0 }, { t: "Dijital ders kitabı", c: 0 },
      { t: "Hastane randevu sistemi", c: 1 }, { t: "Dijital tansiyon aleti", c: 1 },
      { t: "Navigasyon", c: 2 }, { t: "Akıllı ulaşım kartı", c: 2 },
      { t: "Görüntülü görüşme", c: 3 }, { t: "E-posta", c: 3 },
      { t: "Animasyon programı", c: 4 }, { t: "Uydu yayını", c: 4 }
    ]
  },

  activities: {
    lab: {
      title: "Dün ve bugün sunumu",
      goal: "Bir kullanım alanı seç, o alandaki bilişim teknolojilerinin dününü ve bugününü anlatan 3 slaytlık bir sunu hazırla.",
      needs: ["Her öğrenciye ya da her iki öğrenciye bir bilgisayar"],
      b: ["a", "b", "c"],
      steps: [
        "Bir kullanım alanı seç: eğitim, sağlık, ulaşım, iletişim ya da sinema ve televizyon.",
        { t: "Bir sunu programı aç.", pardus: "Menü → Ofis → LibreOffice Impress", windows: "Başlat → PowerPoint ya da LibreOffice Impress" },
        "1. slayta seçtiğin alanın adını ve kendi adını yaz.",
        "2. slayta bu alanda eskiden kullanılan bir teknolojiyi ve bugünkü hâlini yaz. Örnek: kara tahta → etkileşimli tahta.",
        "Aynı slayta bir benzerlik ve bir farklılık yaz.",
        "3. slayta \"Hayatımızı nasıl kolaylaştırıyor?\" başlığıyla iki cümle yaz.",
        "Sununu Dosya → Farklı Kaydet ile Belgeler klasörüne 5A_Ayse_DunBugun gibi kendi sınıfın ve adınla kaydet.",
        "Sununu yanındaki arkadaşına göster. Onun sunusundan öğrendiğin bir şeyi defterine yaz."
      ],
      online: "Seçtiğin alandaki bir teknolojinin eski fotoğrafını öğretmeninin önerdiği güvenilir bir siteden bulup slayta ekleyebilirsin. Fotoğrafın nereden alındığını altına yaz."
    },
    tahta: {
      title: "Kavram kavanozu",
      goal: "Temel kavramları gruplarla araştır, sınıfa tanıt, sonra teknolojileri kullanım alanlarına göre grupla.",
      needs: ["Etkileşimli tahta ya da projeksiyon", "İçinde kavram kâğıtları olan bir kavanoz ya da kutu", "Bilgi kartları (çalışma kâğıdıyla yazdırılır)"],
      b: ["a", "b", "c"],
      steps: [
        "Sınıf 7 gruba ayrılır. Her grubun sözcüsü kavanozdan bir kavram kâğıdı çeker.",
        "Gruplar kendi kavramının bilgi kartını 5 dakika okur ve bir günlük hayat örneği bulur.",
        "Her grup sözcüsü kavramını 1 dakikada sınıfa tanıtır. Diğer gruplar en az bir soru sorar.",
        "Öğretmen \"Dün ve bugün\" slaytını açar. Sınıf her eşleşme için bir benzerlik ve bir farklılık söyler.",
        "Gönüllüler tahtaya gelip \"Teknoloji hangi alanda?\" oyununu oynar.",
        "Sınıfça tartışın: Görüntülü görüşme sadece iletişimde mi kullanılır? Başka hangi alanda kullanılabilir?"
      ]
    },
    kagit: {
      title: "Zaman tüneli afişi",
      goal: "Bir teknolojinin dününü ve bugününü anlatan bir afiş hazırla, çalışma kâğıdını doldur.",
      needs: ["Yazdırılmış çalışma kâğıdı (bilgi kartları dahil)", "A4 ya da A3 kâğıt, boya kalemleri"],
      b: ["a", "b", "c"],
      steps: [
        "Sınıf 4 gruba ayrılır. Her grup bir eşleşme alır: daktilo-yazı programı, teyp-müzik uygulaması, mektup-mesaj, ilk bilgisayar-dizüstü bilgisayar.",
        "Grup, kâğıdın sol yarısına eski teknolojiyi, sağ yarısına bugünkü hâlini çizer.",
        "Ortaya bir ok çizip üstüne \"Benzerlik\", altına \"Farklılık\" yazarlar.",
        "Afişin altına bu teknolojinin hangi kullanım alanında olduğunu yazarlar.",
        "Afişler tahtaya sırayla asılır ve bir zaman tüneli oluşur. Her grup 1 dakikada afişini anlatır.",
        "Herkes çalışma kâğıdındaki görevleri tek başına doldurur."
      ],
      sheet: [
        { h: "1. Dün ve bugün: Benzerlik ve farklılığı yaz.", type: "table", head: ["Dün → Bugün", "Benzerlik", "Farklılık"], rows: [["Daktilo → Yazı programı", "", ""], ["Teyp → Müzik uygulaması", "", ""], ["Mektup → Mesaj", "", ""]] },
        { h: "2. Teknolojileri kullanım alanına göre grupla.", type: "table", head: ["Teknoloji", "Kullanım alanı"], rows: [["Etkileşimli tahta", ""], ["Navigasyon", ""], ["Hastane randevu sistemi", ""], ["Görüntülü görüşme", ""], ["Animasyon programı", ""]] },
        { h: "3. Bilişim teknolojileri hayatımızı nasıl kolaylaştırır? Kendi hayatından bir örnek yaz.", type: "lines", n: 3 }
      ]
    }
  },

  diff: {
    destek: { who: "Etkinlikte zorlanan öğrenciler için", items: [
      "\"Bilişim teknolojileri\" kavramını ortaya yazıp etrafına bildiğin örnekleri ekleyerek bir kavram haritası yap.",
      "Araç kartlarını (daktilo, yazı programı, teyp, müzik uygulaması, mektup, mesaj) \"Dün\" ve \"Bugün\" diye iki sıraya diz.",
      "Kart eşleştirme: Teknoloji kartlarını sınıf panosundaki kullanım alanı başlıklarının altına yapıştır."
    ] },
    zengin: { who: "Etkinliği erken bitiren öğrenciler için", items: [
      "Evde bir aile büyüğüne çocukken hangi teknolojileri kullandığını sor. Cevaplarını bir röportaj olarak yaz.",
      "Telefonun 1876'dan bugüne nasıl değiştiğini gösteren bir zaman çizelgesi çiz.",
      "Hem eğitimde hem sağlıkta kullanılan bir teknoloji bul ve iki alandaki kullanımını yaz."
    ] }
  },

  quiz: [
    { q: "Bilgiyi toplamak, saklamak, işlemek ve iletmek için kullandığımız araçlara ne denir?", o: ["Bilişim teknolojileri", "El aletleri", "Doğal kaynaklar"], a: 0, b: "a", hint: "Bilgisayar ve telefon bilgiyle ne yapar? Onları düşün.", why: "Bilgiyi toplayan, saklayan, işleyen ve ileten araçlara bilişim teknolojileri denir." },
    { q: "Dosyalarını internette saklayıp okuldan da evden de açıyorsun. Buna ne denir?", o: ["Sosyal medya", "Bulut bilişim", "Daktilo"], a: 1, b: "a", hint: "Dosyaların saklandığı bu yeri gökyüzündeki bir şeye benzetiriz.", why: "Dosyaları internette saklayıp her yerden açmaya bulut bilişim denir." },
    { q: "Daktilo ile bilgisayardaki yazı programının benzerliği nedir?", o: ["İkisi de internete bağlanır", "İkisinde de hata silinir", "İkisiyle de yazı yazılır"], a: 2, b: "b", why: "İş aynı kaldı: yazı yazmak. Silme ve kaydetme ise yazı programının getirdiği farklılıktır.", hint: "İki aracın ikisinin de yaptığı işi düşün." },
    { q: "Bugünkü bilgisayarların ilk bilgisayarlardan farkı nedir?", o: ["Daha küçük ve hızlıdır", "Daha büyük ve ağırdır", "Elektrik kullanmaz"], a: 0, b: "b", hint: "İlk bilgisayarlar koca bir odayı kaplardı.", why: "Bilgisayarlar zamanla küçüldü ve hızlandı. Bugün cebimize sığıyorlar." },
    { q: "Navigasyon hangi kullanım alanına girer?", o: ["Sağlık", "Ulaşım", "Sinema ve televizyon"], a: 1, b: "c", hint: "Navigasyon sana nasıl gideceğini söyler.", why: "Navigasyon yol bulmamıza yardım eder, bu yüzden ulaşım alanına girer." }
  ],

  crossword: [
    { a: "Bilgi", c: "Öğrendiğimiz ve anladığımız şeyler" },
    { a: "İletişim", c: "Düşüncemizi ve bilgimizi başkasıyla paylaşmak" },
    { a: "Teknoloji", c: "İşimizi kolaylaştırmak için ürettiğimiz araçlar" },
    { a: "Bilişim", c: "Bilginin bilgisayarla toplanması, saklanması, işlenmesi ve iletilmesi" },
    { a: "Bulut", c: "Dosyaları internetteki bilgisayarlarda saklamaya ... bilişim denir" },
    { a: "Daktilo", c: "Yazı programından önce kullanılan, hatası silinemeyen yazı makinesi" },
    { a: "Teyp", c: "Kasetle müzik çalan eski cihaz" },
    { a: "Ulaşım", c: "Navigasyon bu kullanım alanına girer" }
  ],

  assessment: {
    tool: "Dereceli puanlama anahtarı (grup sunumu ya da afiş)",
    items: [
      "İçerik: Bilgi, iletişim, teknoloji ve bilişim kavramlarını doğru açıklar. (a)",
      "İçerik: Bir teknolojinin dünü ile bugünü arasında bir benzerlik ve bir farklılık söyler. (b)",
      "İçerik: Teknolojileri kullanım alanlarına göre doğru gruplandırır. (c)",
      "Düzen: Sunu ya da afiş başlıklı, okunaklı ve sıralıdır.",
      "Sunum: Grubunu 1 dakikada anlaşılır biçimde tanıtır, gelen soruyu yanıtlar.",
      "Her ölçüt 3 düzeyde puanlanır: 3 tam, 2 kısmen, 1 geliştirilmeli. Grup içi katkı gözlem formuyla izlenebilir."
    ]
  },

  flow: [
    { part: "1. ders" },
    { m: 5, h: "Giriş", d: "\"Bu sabahtan beri kaç teknoloji kullandın?\" sorusu. Öğrencilerin bildikleri teknolojiler tahtaya yazılır." },
    { m: 20, h: "Slayt", d: "Akıllı telefon tahmini, dört kavram, BİT, bulut bilişim ve sosyal medya, neden kullanırız, daktilo ve ENIAC tahminleri, kullanım alanları." },
    { m: 10, h: "Deftere Yaz", d: "Öğrenciler 5 maddeyi defterlerine geçirir." },
    { m: 5, h: "Teknoloji hangi alanda? oyunu", d: "Sınıflandırma oyunu." },
    { part: "2. ders" },
    { m: 25, h: "Etkinlik", d: "Sınıf ortamına göre dün ve bugün sunumu, kavram kavanozu ya da zaman tüneli afişi." },
    { m: 5, h: "Farklılaştırma", d: "Destekleme ve zenginleştirme kartları." },
    { m: 10, h: "Mini test ve bulmaca", d: "\"İşler aynı kaldı, araçlar değişti\" cümlesiyle kapanış." }
  ],

  teacherNotes: [
    "\"Tahmin et\" slaytlarında cevabı göstermeden önce birkaç öğrencinin tahminini alın. ENIAC sorusunda \"Kaç fil?\" diye sormak ilgiyi artırır.",
    "Kavram kavanozu için kavramları (bilgi, iletişim, teknoloji, bilişim, BİT, bulut bilişim, sosyal medya) ayrı kâğıtlara yazıp katlayın. Bilgi kartları çalışma kâğıdıyla yazdırılır, internet gerekmez.",
    "Sosyal medya yalnızca kavram olarak tanıtılır. Öğrencilere hesapları olup olmadığı sorulmamalıdır. Çoğu uygulamanın 13 yaş sınırı olduğunu hatırlatın.",
    "Zenginleştirmedeki röportaj ödevi isteğe bağlıdır. Aile büyüğü olmayan ya da ulaşamayan öğrenci bir komşu ya da öğretmenle de yapabilir.",
    "Bu ders BTY.5.1.2 (Bilişim teknolojilerinin etkileri) dersine hazırlıktır. \"Neden kullanırız?\" slaytındaki faydalar gelecek hafta olumsuz yönlerle birlikte ele alınır."
  ]
});
