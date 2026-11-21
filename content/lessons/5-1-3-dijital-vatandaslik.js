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
    { type: "title", pill: "5. sınıf · 3. hafta", h: "Dijital Vatandaşlık", p: "İnternette kimiz, hangi izleri bırakıyoruz ve nasıl iyi bir dijital vatandaş oluruz?" },
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

  // Oyun: hikâyeli macera. Her sahnede tam bir uygun seçim (ok: true) olur; res seçimin sonucudur.
  story: {
    title: "Ece'nin dijital günü",
    intro: "Ece'nin bir gününde doğru yolu sen seç. Her seçim onun dijital ayak izine eklenir.",
    scenes: [
      { yer: "Dijital kimlik", text: "Ece yeni bir kelime oyununa üye oluyor. Oyun ondan bir kullanıcı adı istiyor. Hangisini yazsın?",
        choices: [
          { t: "EceYildiz2015", res: "Bu adda Ece'nin gerçek adı ve doğum yılı var. Onu tanımayan biri kim olduğunu ve kaç yaşında olduğunu öğrenir." },
          { t: "KelimeAvcisi42", ok: true, res: "Güzel seçim! Bu ad Ece'yi anlatıyor ama kim olduğunu ele vermiyor. Dijital kimliği güvende." },
          { t: "Ece_Cumhuriyet_Ortaokulu", res: "Okulun adı, Ece'nin nerede olduğunu söyler. Kullanıcı adına okul ve adres yazılmaz." }
        ] },
      { yer: "Sosyal medya", text: "Sınıf gezisinde Ece, arkadaşı Mert'in çok komik bir fotoğrafını çekti. Fotoğrafı paylaşmak istiyor.",
        choices: [
          { t: "Önce Mert'e sorarım. İzin verirse paylaşırım.", ok: true, res: "Doğru! Başkasının fotoğrafı ancak onun izniyle paylaşılır." },
          { t: "Hemen paylaşırım, herkes gülsün.", res: "Paylaşılan fotoğraf internette iz bırakır; silinse bile biri kaydetmiş olabilir. Mert bunu istemeyebilir." }
        ] },
      { yer: "Oyun", text: "Ece oyunda bir maçı kaybetti. Rakibi sohbete \"Çok kötü oynuyorsun!\" yazdı.",
        choices: [
          { t: "Ben de ona kaba bir şey yazarım.", res: "Kaba mesaj kavgayı büyütür ve Ece'nin dijital ayak izine eklenir. Silse bile ekran görüntüsü alınmış olabilir." },
          { t: "Oyunu bırakıp bir gün küserim.", res: "Küsmek Ece'yi üzer ama sorunu çözmez. Kaba mesaj sürerse bir büyüğün bilmesi gerekir." },
          { t: "Cevap vermem. Sürerse ekran görüntüsünü alıp bir büyüğüme söylerim.", ok: true, res: "Harika! Kaba mesaja cevap verilmez; sürerse ekran görüntüsü alınır ve güvenilen bir büyüğe hemen söylenir." }
        ] },
      { yer: "Oyun", text: "Tanımadığı biri Ece'ye mesaj attı: \"Şifreni ver, hesabına bedava altın yükleyeyim.\"",
        choices: [
          { t: "Bedava altın! Şifremi veririm.", res: "Şifreyi alan kişi hesaba girip her şeyi alabilir. Şifre kimseyle paylaşılmaz, en yakın arkadaşla bile." },
          { t: "Şifremi vermem, mesajı aileme gösteririm.", ok: true, res: "Doğru! Şifre, dijital kimliğin anahtarıdır. Şüpheli mesajı bir büyüğe göstermek Ece'yi korur." }
        ] },
      { yer: "Alışveriş ve bankacılık", text: "Ece internette çok beğendiği bir kalem kutusu gördü. Site kart bilgisi istiyor.",
        choices: [
          { t: "Ailemle birlikte bakarız, alışverişi onlar yapar.", ok: true, res: "Çok iyi! İnternetten alışveriş ailenle birlikte yapılır, kart bilgisi paylaşılmaz." },
          { t: "Annemin kartını alıp numarayı kendim yazarım.", res: "Kart bilgisi yalnızca aile büyüğü tarafından yazılır. İzinsiz alışveriş aileyi zor durumda bırakabilir." }
        ] },
      { yer: "Eğitim", text: "Ödev teslimine az kaldı. Bir arkadaşı \"Benimkini kopyala, kimse anlamaz\" dedi.",
        choices: [
          { t: "Kopyalarım, nasılsa zaman yok.", res: "Başkasının ödevini kendi adıyla göndermek dürüst değildir. Ece öğrenme fırsatını da kaçırır." },
          { t: "Kendim yaparım. Takıldığım yeri öğretmenime kibar bir mesajla sorarım.", ok: true, res: "Süper! Ödevi kendin yapmak ve öğretmene kibarca yazmak, eğitimde dijital vatandaşlıktır." }
        ] }
    ],
    end: "Ece'nin günü bitti! Kullanıcı adı güvende, paylaşımları izinli, mesajları kibar. Dijital ayak izi tertemiz."
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
        "Kartını Dosya → Farklı Kaydet ile Belgeler klasörüne 5A_Ayse_DijitalKimlik gibi kendi sınıfın ve adınla kaydet.",
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
    { q: "Hangisi güvenli bir kullanıcı adıdır?", o: ["AyseYilmaz2015", "KitapKurdu42", "Ali_5B_okulum"], a: 1, b: "a", why: "KitapKurdu42 adını, yaşını ve okulunu söylemez.", hint: "Seni tanımayan biri bu addan neler öğrenebilir?" },
    { q: "İnternete yazdığın bir yorumu sildin. Hangisi doğrudur?", o: ["Kesinlikle yok olmuştur", "Biri ekran görüntüsü almış olabilir", "Sadece öğretmen görebilir"], a: 1, b: "b", hint: "Sen silmeden önce yorumunu başkaları da gördü.", why: "Silmeden önce biri ekran görüntüsü almış olabilir. İnternete yazılan kolay kolay yok olmaz." },
    { q: "İnternette bir oyuncak aradın. Sonra başka sitelerde hep onun reklamını görüyorsun. Neden?", o: ["Dijital ayak izin yüzünden", "Bilgisayar bozuk olduğu için", "Tesadüf olduğu için"], a: 0, b: "b", hint: "İnternette gezdiğin yerler arkanda bir şey bırakır.", why: "Aramaların dijital ayak izi bırakır. Siteler reklamları buna göre gösterir." },
    { q: "Oyunda biri senden şifreni istiyor. Ne yapmalısın?", o: ["Arkadaşsa veririm", "Vermem ve bir yetişkine söylerim", "Yarısını veririm"], a: 1, b: "c", hint: "Şifre kimseyle paylaşılmayan bir bilgidir.", why: "Şifre arkadaşla bile paylaşılmaz. Biri isterse bir yetişkine haber verilir." },
    { q: "\"İzin almadan arkadaşının fotoğrafını paylaşmamak\" hangi alandaki bir kuraldır?", o: ["Sosyal medya", "Alışveriş", "Bankacılık"], a: 0, b: "c", hint: "Fotoğraflar en çok nerede paylaşılır?", why: "Fotoğraflar sosyal medyada paylaşılır, bu da bir sosyal medya kuralıdır." }
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
