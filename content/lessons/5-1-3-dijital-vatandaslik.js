/* 5. Sınıf · Tema 1 · BTY.5.1.3 Dijital vatandaşlık uygulamalarını sınıflandırabilme
   Süreç bileşenleri: a) dijital kimlik kavramını belirler  b) dijital ayak izinin etkilerini kullanım alanlarıyla ilişkilendirir
   c) dijital vatandaşlık uygulamalarını kullanım alanlarına göre gruplandırır
   Programdaki uygulamalardan: dijital kimlik kartım, ad-soyad arama örneği, ayak izi çalışma kâğıdı, yardım kaynakları, alanlara göre poster */
BD.lesson({
  id: "5-1-3-dijital-vatandaslik",
  grade: "5", theme: 1, week: 3,
  title: "Dijital Vatandaşlık",
  outcome: "BTY.5.1.3",
  covers: ["a", "b", "c"],
  duration: "2 ders saati (40+40 dk)",
  hook: "Kumsalda yürüdüğünde arkanda ayak izlerin kalır. Peki internette gezinirken de iz bırakıyor musun? Bugün internetteki kimliğimizi ve izlerimizi tanıyacağız.",

  slides: [
    { type: "title", pill: "5. Sınıf · 3. Hafta", h: "Dijital Vatandaşlık", p: "İnternette kimiz, hangi izleri bırakıyoruz ve nasıl iyi bir dijital vatandaş oluruz?" },
    { emoji: "❓", h: "Tahmin et: İnternette yürürsek?", p: "Kumda yürürsen ayak izin kalır, dalga gelince silinir. İnternette gezinirken de iz bırakır mıyız?", reveal: "Evet! Paylaşımlar, yorumlar, beğeniler ve aramalar iz bırakır. Ama bu izleri dalga silmez, yıllarca kalabilir.", b: "b" },
    { emoji: "👤", h: "Dijital kimlik nedir?", p: "İnternetteki hesaplarımız ve hakkımızdaki bilgilerin tamamıdır. Gerçek kimliğimiz gibi bizi tanıtır.", list: ["Kullanıcı adı ve profil resmi", "Oyun ve eğitim platformu hesapları", "Paylaşımlarımız ve gizlilik ayarlarımız"], b: "a" },
    { h: "Güvenli kullanıcı adı seçelim 🔐", cols: [
      { h: "Güvenli", p: "KitapKurdu42, YildizKasif, MaviBalina. Kim olduğunu, nerede okuduğunu söylemez." },
      { h: "Güvensiz", p: "AyseYilmaz2015, Ali_5B_okulum. Adını, yaşını ve okulunu herkese söyler." }
    ], b: "a" },
    { emoji: "👣", h: "Dijital ayak izi", p: "İnternette yaptığımız her şeyin arkada bıraktığı izdir.", list: ["Paylaştığın fotoğraflar ve yorumlar", "Beğendiğin videolar, aradığın kelimeler", "Oyunlarda yazdığın mesajlar", "Silsen bile biri kaydetmiş olabilir."], b: "b" },
    { h: "Ayak izi her alanda oluşur", cols: [
      { h: "Sosyal medya", p: "Bugün paylaşılan bir fotoğraf yıllar sonra da görülebilir." },
      { h: "Eğitim", p: "Eğitim platformundaki ödevlerin ve mesajların kayıtlıdır." },
      { h: "Oyun", p: "Oyunda yazılan kaba bir mesaj ekran görüntüsüyle yayılabilir." },
      { h: "Alışveriş", p: "Aradığın ürünler kaydedilir ve sana reklam olarak geri döner." }
    ], b: "b" },
    { emoji: "❓", h: "Tahmin et: Silinen yorum", p: "Bir öğrenci internete kaba bir yorum yazdı, sonra pişman olup sildi. Yorum gerçekten yok oldu mu?", reveal: "Belki de hayır! Biri ekran görüntüsü almış olabilir. Yazmadan önce düşün: Bunu yüz yüze de söyler miydim?", b: "b" },
    { emoji: "🌍", h: "Dijital vatandaşlık nedir?", p: "Teknolojiyi güvenli, saygılı ve sorumlu kullanmaktır. Gerçek hayattaki gibi internette de kurallara uyarız.", list: ["Kibar ve saygılı iletişim kurmak", "Kişisel bilgilerini korumak", "Başkasının emeğine ve fotoğrafına saygı göstermek", "Doğruluğundan emin olmadan paylaşmamak"], b: "c" },
    { h: "Alanlara göre dijital vatandaşlık", cols: [
      { h: "Eğitim", p: "Öğretmenine kibar mesaj yazmak, ödevini kopyalamadan yapmak." },
      { h: "Sosyal medya", p: "Yaş sınırına uymak, izin almadan kimsenin fotoğrafını paylaşmamak." },
      { h: "Oyun", p: "Kaybedince kaba yazmamak, şifreni kimseyle paylaşmamak." },
      { h: "Alışveriş ve bankacılık", p: "Kart bilgisini paylaşmamak, alışverişi ailenle yapmak." }
    ], b: "c" },
    { emoji: "🆘", h: "Bir sorun olursa kime söylerim?", p: "Seni üzen ya da korkutan bir mesaj alırsan cevap verme, ekran görüntüsünü al ve hemen söyle.", list: ["Ailem", "Öğretmenim", "Okulumun rehberlik servisi", "Bilgi Teknolojileri ve İletişim Kurumu (BTK)"], b: "c" },
    { emoji: "✏️", h: "Sıra sende!", p: "Deftere Yaz kısmını defterine geçir, sonra etkinliğe başla.", end: true }
  ],

  notebook: [
    { t: "<mark>Dijital kimlik</mark>: İnternetteki hesaplarımız ve hakkımızdaki bilgilerin tamamıdır. Kullanıcı adında gerçek adımı, yaşımı ve okulumu kullanmam.", b: "a" },
    { t: "<mark>Dijital ayak izi</mark>: İnternette yaptığımız her şeyin bıraktığı izdir. Silinse bile kalabilir.", b: "b" },
    { t: "Ayak izi her alanda oluşur: <mark>sosyal medya, eğitim, oyun, alışveriş</mark>. Paylaşmadan önce düşünürüm.", b: "b" },
    { t: "<mark>Dijital vatandaşlık</mark>: Teknolojiyi güvenli, saygılı ve sorumlu kullanmaktır.", b: "c" },
    { t: "Sorun yaşarsam cevap vermem, <mark>aileme, öğretmenime ya da rehberlik servisine</mark> söylerim.", b: "c" }
  ],

  sort: {
    title: "Bu kural hangi alanda?",
    intro: "Her dijital vatandaşlık uygulamasını ait olduğu alana yerleştir.",
    b: "c",
    cats: ["Eğitim", "Sosyal medya", "Oyun", "Alışveriş ve bankacılık"],
    items: [
      { t: "Öğretmene ödev mesajını kibar yazmak", c: 0 }, { t: "Ödevi kopyalamadan kendin yapmak", c: 0 },
      { t: "İzin almadan arkadaşının fotoğrafını paylaşmamak", c: 1 }, { t: "Yaş sınırına uymak", c: 1 },
      { t: "Kaybedince kaba mesaj yazmamak", c: 2 }, { t: "Oyun şifreni kimseye vermemek", c: 2 },
      { t: "Kart bilgisini paylaşmamak", c: 3 }, { t: "Alışverişi ailenle birlikte yapmak", c: 3 }
    ]
  },

  activities: {
    lab: {
      title: "Dijital kimlik kartım",
      goal: "Hayali bir hesap için güvenli bir dijital kimlik kartı hazırla. Gerçek hesap açmıyoruz.",
      needs: ["Her öğrenciye ya da her iki öğrenciye bir bilgisayar"],
      b: ["a", "b", "c"],
      steps: [
        { t: "Bir kelime işlemci programı aç.", pardus: "Menü → Ofis → LibreOffice Writer", windows: "Başlat → Word ya da LibreOffice Writer" },
        "Başlığa \"Dijital Kimlik Kartım\" yaz. Altına \"Bu kart hayali bir hesap içindir.\" yaz.",
        "Güvenli bir kullanıcı adı yaz. İçinde gerçek adın, soyadın, okulun ve doğum yılın olmasın.",
        { t: "Profil resmi yerine bir şekil ekle.", pardus: "Writer: Ekle → Şekil", windows: "Word: Ekle → Şekiller. Writer: Ekle → Şekil" },
        "\"Hakkımda\" bölümüne kişisel bilgi vermeden iki cümle yaz: sevdiğin kitap, hobin.",
        "\"Profilimi kimler görebilir?\" sorusuna cevabını ve nedenini yaz.",
        "En alta \"Bu hesapta uyacağım 3 kural\" başlığıyla üç dijital vatandaşlık kuralı yaz. Kuralların farklı alanlardan olsun.",
        "Kartını Dosya → Farklı Kaydet ile Belgeler klasörüne 5A_Ayşe_DijitalKimlik gibi kendi sınıfın ve adınla kaydet.",
        "Arkadaşınla kartlarınızı değiştirin. Kartta kişisel bilgi var mı, birlikte kontrol edin."
      ]
    },
    tahta: {
      title: "Ayak izi yolu",
      goal: "Farklı alanlardaki ayak izlerini sınıfça değerlendir, yerine ne yapılması gerektiğini bul.",
      needs: ["Etkileşimli tahta ya da projeksiyon", "Yeşil ve kırmızı tahta kalemi"],
      b: ["a", "b", "c"],
      steps: [
        "Öğretmen tahtaya bir yol ve üstüne 6 ayak izi çizer. Her ize öğretmen notlarındaki bir durumu yazar.",
        "Sınıf her durum için karar verir: Güzel iz mi, dikkat isteyen iz mi? Öğretmen izi yeşile ya da kırmızıya boyar.",
        "Her izin hangi alanda oluştuğu (sosyal medya, eğitim, oyun, alışveriş) izin yanına yazılır.",
        "Kırmızı izler için \"Yerine ne yapmalıydı?\" diye sorulur.",
        "Canlandırma: İki gönüllü \"Oyunda biri senden şifreni istiyor\" durumunu canlandırır. Sınıf doğru davranışı söyler.",
        "Gönüllüler tahtaya gelip \"Bu kural hangi alanda?\" oyununu oynar."
      ],
      online: "Öğretmen tahtada bir arama motoruna kendi adını ve soyadını yazar, sonuçları sınıfla birlikte inceler: Bu bilgiler ne zamandan beri orada? Kimler görebilir? Öğrencilerin adı aranmaz."
    },
    kagit: {
      title: "Kimlik kartı ve alan posterleri",
      goal: "Hayali dijital kimlik kartını doldur, grubunla bir alan için dijital vatandaşlık posteri hazırla.",
      needs: ["Yazdırılmış çalışma kâğıdı", "Renkli kartlar (grup oluşturmak için)", "A3 kâğıt, boya kalemleri"],
      b: ["a", "b", "c"],
      steps: [
        "Herkes çalışma kâğıdındaki hayali dijital kimlik kartını doldurur.",
        "Yanındaki arkadaşı kartı kontrol eder: Kartta kişisel bilgi var mı?",
        "Renkli kartlarla 4 grup oluşur: eğitim, sosyal medya, oyun, alışveriş ve bankacılık.",
        "Her grup kendi alanı için 3 dijital vatandaşlık kuralı ve 1 ayak izi örneği içeren bir poster hazırlar.",
        "Gruplar posterlerini sunar. Gelen sorulara saygılı bir dille cevap verirler.",
        "Herkes çalışma kâğıdındaki ayak izi tablosunu ve son soruyu doldurur."
      ],
      sheet: [
        { h: "1. Hayali dijital kimlik kartım (gerçek bilgi yazma!)", type: "table", head: ["Bölüm", "Benim kartım"], rows: [["Kullanıcı adı", ""], ["Profil resmi yerine ne çizerim?", ""], ["Hakkımda (kişisel bilgi yok)", ""], ["Profilimi kimler görebilir?", ""]] },
        { h: "2. Bu ayak izi hangi alanda oluşur, ne etkisi olabilir?", type: "table", head: ["Durum", "Alan", "Olası etkisi"], rows: [["Tatil fotoğrafını ev adresiyle paylaşmak", "", ""], ["Oyunda kaba bir mesaj yazmak", "", ""], ["İnternette bir oyuncak aramak", "", ""]] },
        { h: "3. Bir sorun yaşarsam kime söylerim? Üç kişi ya da kurum yaz.", type: "lines", n: 2 }
      ]
    }
  },

  diff: {
    destek: { who: "Etkinlikte zorlanan öğrenciler için", items: [
      "Sınıflandırma panosu: Sosyal medya, alışveriş, bankacılık ve eğitim kartlarının altına uygun kural kartlarını yapıştır.",
      "Öğretmeninle \"Oyunda tanımadığın biri sana mesaj atıyor\" senaryosunu canlandır, doğru davranışı söyle.",
      "Güvenli ve güvensiz kullanıcı adı kartlarını iki gruba ayır."
    ] },
    zengin: { who: "Etkinliği erken bitiren öğrenciler için", items: [
      "Sınıfın için \"Güvenli İnternet Kılavuzu\" hazırla: her alan için bir kural ve nedenini yaz.",
      "Dijital kimlik ve güvenlik konusunda arkadaşlarına sorulacak 5 soruluk bir bilgi yarışması hazırla.",
      "\"Dijital ayak izim\" konulu kısa bir radyo programı metni yaz ve sınıfa oku."
    ] }
  },

  quiz: [
    { q: "Hangisi güvenli bir kullanıcı adıdır?", o: ["AyseYilmaz2015", "KitapKurdu42", "Ali_5B_okulum"], a: 1, b: "a", why: "KitapKurdu42 adını, yaşını ve okulunu söylemez." },
    { q: "İnternete yazdığın bir yorumu sildin. Hangisi doğrudur?", o: ["Kesinlikle yok olmuştur", "Biri ekran görüntüsü almış olabilir", "Sadece öğretmen görebilir"], a: 1, b: "b" },
    { q: "İnternette bir oyuncak aradın. Sonra başka sitelerde hep onun reklamını görüyorsun. Neden?", o: ["Dijital ayak izin yüzünden", "Bilgisayar bozuk olduğu için", "Tesadüf olduğu için"], a: 0, b: "b" },
    { q: "Oyunda biri senden şifreni istiyor. Ne yapmalısın?", o: ["Arkadaşsa veririm", "Vermem ve bir yetişkine söylerim", "Yarısını veririm"], a: 1, b: "c" },
    { q: "\"İzin almadan arkadaşının fotoğrafını paylaşmamak\" hangi alandaki bir kuraldır?", o: ["Sosyal medya", "Alışveriş", "Bankacılık"], a: 0, b: "c" }
  ],

  crossword: [
    { a: "Kimlik", c: "İnternetteki hesaplarımız ve bilgilerimiz: dijital ..." },
    { a: "Kullanıcı", c: "... adı: İnternette kendimizi tanıttığımız isim" },
    { a: "Vatandaş", c: "Teknolojiyi güvenli ve saygılı kullanan kişi: dijital ..." },
    { a: "Şifre", c: "Oyunda biri isterse bile kimseye vermediğimiz gizli kelime" },
    { a: "Gizlilik", c: "Profilimizi kimlerin görebileceğini seçtiğimiz ayarlar" },
    { a: "Saygı", c: "İnternette de başkalarına göstermemiz gereken davranış" },
    { a: "Rehberlik", c: "Sorun yaşarsak okulda başvurabileceğimiz servis" },
    { a: "Reklam", c: "Aradığımız ürün başka sitelerde bize bu şekilde geri döner" }
  ],

  assessment: {
    tool: "Frayer modeli, dereceleme ölçeği (poster) ve akran değerlendirme",
    items: [
      "Frayer modeli: \"Dijital ayak izi\" için tanım, özellikler, örnekler ve örnek olmayanlar yazılır. (b)",
      "Dijital kimliği tanımlar, güvenli bir kullanıcı adı oluşturur. (a)",
      "Bir ayak izinin hangi alanda oluştuğunu ve olası etkisini söyler. (b)",
      "Dijital vatandaşlık uygulamalarını kullanım alanlarına göre doğru gruplandırır. (c)",
      "Poster: Kurallar doğru ve alana uygun, görsel ve yazı anlaşılır. (c)",
      "Akran değerlendirme: Arkadaşının kartında kişisel bilgi olup olmadığını kontrol eder, saygılı geri bildirim verir."
    ]
  },

  flow: [
    { part: "1. ders" },
    { m: 5, h: "Giriş", d: "Kumsaldaki ayak izi sorusu ve ilk \"Tahmin et\" slaytı." },
    { m: 20, h: "Slayt", d: "Dijital kimlik, güvenli kullanıcı adı, ayak izi ve alanlara göre etkileri, silinen yorum, dijital vatandaşlık, yardım kaynakları." },
    { m: 10, h: "Deftere Yaz", d: "Öğrenciler 5 maddeyi defterlerine geçirir." },
    { m: 5, h: "Bu kural hangi alanda? oyunu", d: "Sınıflandırma oyunu." },
    { part: "2. ders" },
    { m: 25, h: "Etkinlik", d: "Sınıf ortamına göre dijital kimlik kartı, ayak izi yolu ya da alan posterleri." },
    { m: 5, h: "Farklılaştırma", d: "Destekleme ve zenginleştirme kartları." },
    { m: 10, h: "Mini test ve bulmaca", d: "\"Yüz yüze söylemeyeceğim şeyi internete de yazmam\" cümlesiyle kapanış." }
  ],

  teacherNotes: [
    "Ayak izi yolu için 6 durum: 1) Tatil fotoğrafını ev adresiyle paylaşmak 2) Eğitim platformunda öğretmene teşekkür mesajı yazmak 3) Oyunda kaybedince kaba mesaj yazmak 4) Arkadaşının komik fotoğrafını izinsiz paylaşmak 5) Okuduğu bir kitap için güzel bir yorum yazmak 6) Ödev konusunu arama motorunda aramak.",
    "Dijital kimlik kartı hayalidir. Öğrencilerden gerçek hesap adlarını, şifrelerini ya da hangi uygulamaları kullandıklarını söylemeleri istenmemelidir.",
    "Ad-soyad arama örneğinde yalnızca öğretmenin kendi adı aranır. Öğrencilerin adları aranmaz, sonuçlarda istenmeyen içerik çıkma ihtimaline karşı aramayı dersten önce bir kez deneyin.",
    "Çoğu sosyal medya uygulamasının 13 yaş sınırı vardır. Bu derste sosyal medya kullanımı özendirilmez, yalnızca kurallar anlatılır.",
    "Bir öğrenci internette yaşadığı rahatsız edici bir durumu anlatırsa sınıfta ayrıntıya girmeyin, okulun rehberlik servisine yönlendirin."
  ]
});
