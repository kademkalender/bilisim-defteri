/* 5. Sınıf · Tema 1 · BTY.5.1.2 Bilişim teknolojilerinin birey ve toplum üzerindeki etkilerini özetleyebilme
   Süreç bileşenleri: a) olumlu ve olumsuz yönleri çözümler  b) fiziksel güvenlik önlemlerini sınıflandırır
   c) beden ve ruh sağlığı üzerindeki etkileri kendi cümleleriyle ifade eder
   Programdaki uygulamalardan: tartışma ve listeleme, hatalı kullanımı inceleme, ergonomi, dijital sağlığın üç boyutu, öz değerlendirme formu */
BD.lesson({
  id: "5-1-2-etkiler-dijital-saglik",
  grade: "5", theme: 1, week: 2,
  title: "Bilişim Teknolojilerinin Etkileri ve Dijital Sağlık",
  outcome: "BTY.5.1.2",
  covers: ["a", "b", "c"],
  duration: "2 ders saati (40+40 dk)",
  hook: "Uzun süre tablet ya da bilgisayar kullandıktan sonra hiç gözlerin yandı mı, boynun ağrıdı mı? Teknoloji çok işe yarar ama doğru kullanmazsak bedenimizi yorar. Bugün teknolojiyle nasıl sağlıklı arkadaş olacağımızı öğreneceğiz.",

  slides: [
    { type: "title", pill: "5. sınıf · 2. hafta", h: "Teknoloji ve Sağlığım", p: "Bilişim teknolojileri bize neler kazandırıyor, nelere dikkat etmeliyiz?" },
    { emoji: "❓", h: "Tahmin et: Can'a ne oldu?", p: "Can tatil günü sabahtan akşama kadar tablette oyun oynadı. Akşam gözleri yandı, boynu ağrıdı, gece uyuyamadı. Sence neden?", reveal: "Saatlerce ara vermeden ekrana baktı, eğilerek oturdu ve yatmadan önce de oynadı. Teknoloji suçlu değil, kullanma biçimi önemli!", b: "c" },
    { emoji: "⚖️", h: "Madalyonun iki yüzü", cols: [
      { h: "Olumlu yönler", p: "Hızlı iletişim, bilgiye kolay ulaşma, uzaktaki akrabayla görüntülü konuşma, ödev ve öğrenme." },
      { h: "Olumsuz yönler", p: "Aşırı ekran süresi, oyun ve dijital bağımlılık, kişisel bilgilerin yayılması, yüz yüze görüşmenin azalması." }
    ], b: "a" },
    { h: "Aynı teknoloji, iki farklı etki", cols: [
      { h: "Telefon", p: "Olumlu: Ailemi hemen ararım. Olumsuz: Yolda bakarsam kaza yapabilirim." },
      { h: "Tablet", p: "Olumlu: Ders videosu izlerim. Olumsuz: Saatlerce oyunda kalabilirim." },
      { h: "Sosyal medya", p: "Olumlu: Haberleşmeyi kolaylaştırır. Olumsuz: Kişisel bilgiler yayılabilir." },
      { h: "Bulut", p: "Olumlu: Dosyam kaybolmaz. Olumsuz: İnternet yoksa açamam." }
    ], b: "a" },
    { emoji: "🔋", h: "Dijital bağımlılık nedir?", p: "Teknolojiyi bırakmak istediğimiz hâlde bırakamamaktır. Bazı işaretleri:", list: ["Oyun bitince sinirlenmek ya da üzülmek", "Uykudan, yemekten, arkadaşlarla oyundan vazgeçmek", "Her bildirimde hemen ekrana bakmak"], b: "c" },
    { emoji: "💻", h: "Ergonomi: Doğru oturuş", p: "Ergonomi, araçların vücudumuza uygun olması ve onları doğru kullanmamızdır.", list: ["Sırtın sandalyeye yaslı, ayakların yere bassın.", "Ekran göz hizanda ya da biraz altında olsun.", "Ekranla arana bir kol boyu mesafe koy.", "Klavyede bileklerin düz dursun."], b: "c" },
    { emoji: "👀", h: "Tahmin et: Ekrana bakarken gözümüz ne yapar?", p: "Normalde gözlerimizi dakikada 15-20 kez kırparız. Sence ekrana dikkatle bakarken ne olur?", reveal: "Gözümüzü çok daha az kırparız, gözümüz kurur ve yorulur. Çözüm: Her 20 dakikada bir, 20 saniye boyunca uzağa bak.", b: "c" },
    { h: "Fiziksel güvenlik: Hangi cihazda ne yapmalı? 🔌", cols: [
      { h: "Bilgisayar", p: "Yanına içecek koyma. Havalandırma deliklerini kapatma." },
      { h: "Telefon ve tablet", p: "Şarj olurken yastık altına koyma. Yolda yürürken ekrana bakma." },
      { h: "Kulaklık", p: "Sesi yarıdan fazla açma. Uzun kullandıysan kulaklarını dinlendir." },
      { h: "Priz ve kablolar", p: "Islak elle dokunma. Fişi kablosundan çekme." }
    ], b: "b" },
    { emoji: "💚", h: "Dijital sağlığın üç boyutu", list: ["Bedenim: Ekran süresi, doğru oturuş, göz yorgunluğu", "Zihnim: Uyku, bildirimler, dikkat, ekransız mola (dijital detoks)", "Duygularım: Çevrim içi nezaket, empati, siber zorbalık", "Biri seni internette üzerse cevap verme, güvendiğin bir yetişkine söyle."], b: "c" },
    { emoji: "😴", h: "Tahmin et: Yatmadan önce video izlersem?", p: "Yatağa girmeden hemen önce tablette video izlemek uykunu nasıl etkiler?", reveal: "Ekranın ışığı beynine \"Daha gündüz!\" der, uykun kaçar. Yatmadan 1 saat önce ekranı kapat, kitap oku.", b: "c" },
    { emoji: "✏️", h: "Sıra sende!", p: "Deftere Yaz kısmını defterine geçir, sonra etkinliğe başla.", end: true }
  ],

  notebook: [
    { t: "Bilişim teknolojilerinin <mark>olumlu</mark> (hızlı iletişim, bilgiye ulaşma) ve <mark>olumsuz</mark> (bağımlılık, gizlilik sorunları, aşırı ekran süresi) yönleri vardır.", b: "a" },
    { t: "<mark>Dijital bağımlılık</mark>: Teknolojiyi bırakmak istediğimiz hâlde bırakamamaktır. <mark>Ekran süresi</mark>: Ekran başında geçirdiğimiz zamandır.", b: "c" },
    { t: "<mark>Ergonomi</mark>: Araçların vücudumuza uygun olması ve doğru kullanılmasıdır. Dik otur, ekranı göz hizasına ve bir kol boyu uzağa koy.", b: "c" },
    { t: "<mark>Fiziksel güvenlik</mark> cihaza göre değişir: Bilgisayarın yanına içecek koyma, kulaklığın sesini çok açma, prize ıslak elle dokunma.", b: "b" },
    { t: "Uzun ekran kullanımı <mark>göz yorgunluğu, bel ağrısı ve uykusuzluk</mark> yapabilir. 20 dakikada bir mola ver, yatmadan önce ekranı kapat.", b: "c" }
  ],

  sort: {
    title: "Bu önlem hangi cihaz için?",
    intro: "Her güvenlik önlemini ait olduğu cihazın altına yerleştir.",
    b: "b",
    cats: ["Bilgisayar", "Telefon ve tablet", "Kulaklık", "Priz ve kablolar"],
    items: [
      { t: "Klavyenin yanına içecek koyma", c: 0 }, { t: "Kasanın havalandırma deliklerini kapatma", c: 0 },
      { t: "Şarj olurken yastık altına koyma", c: 1 }, { t: "Yolda yürürken ekrana bakma", c: 1 },
      { t: "Sesi yarıdan fazla açma", c: 2 }, { t: "Uzun kullandıysan kulaklarını dinlendir", c: 2 },
      { t: "Islak elle dokunma", c: 3 }, { t: "Fişi kablosundan çekme", c: 3 }, { t: "Geçilen yola kablo bırakma", c: 3 }
    ]
  },

  activities: {
    lab: {
      title: "Dijital sağlık afişim",
      goal: "Bedenin, zihnin ve duyguların için dijital sağlık kurallarını anlatan bir afiş hazırla.",
      needs: ["Her öğrenciye ya da her iki öğrenciye bir bilgisayar"],
      b: ["a", "b", "c"],
      steps: [
        "Önce oturuşunu kontrol et: Sırtın yaslı mı, ayakların yerde mi, ekran bir kol boyu uzakta mı? Yanındaki arkadaşınla birbirinize bakın.",
        { t: "Bir sunu programı aç.", pardus: "Menü → Ofis → LibreOffice Impress", windows: "Başlat → PowerPoint ya da LibreOffice Impress" },
        "Slaytın başlığına \"Dijital Sağlık Kurallarım\" yaz.",
        "Üç bölüm oluştur: Bedenim, Zihnim, Duygularım. Her bölüme kendi cümlelerinle iki kural yaz.",
        "Bir cihaz seç ve onun için bir fiziksel güvenlik kuralı ekle. Kuralın yanına cihazın adını yaz.",
        "En alta bir teknolojinin bir olumlu ve bir olumsuz yönünü yaz.",
        "Afişini Dosya → Farklı Kaydet ile Belgeler klasörüne 5A_Ayşe_DijitalSaglik gibi kendi sınıfın ve adınla kaydet.",
        "20 saniye göz molası ver: Pencereden ya da sınıfın öbür ucuna bak.",
        "Arkadaşının afişini incele. Onun bir kuralını defterine yaz."
      ],
      online: "Öğretmeninin önerdiği güvenilir bir sağlık sitesinden göz ya da uyku sağlığıyla ilgili bir öneri daha bulup afişine ekleyebilirsin. Kaynağını altına yaz."
    },
    tahta: {
      title: "Madalyonun iki yüzü ve hata dedektifi",
      goal: "Teknolojilerin olumlu ve olumsuz yönlerini sınıfça tartış, hatalı kullanımı bul ve güvenlik önlemlerini grupla.",
      needs: ["Etkileşimli tahta ya da projeksiyon", "Bir masa ve sandalye (canlandırma için)"],
      b: ["a", "b", "c"],
      steps: [
        "Öğretmen tahtayı ikiye böler: Olumlu ve Olumsuz.",
        "Telefon, tablet, sosyal medya ve bulut için sırayla görüş alınır. Öğretmen her görüşü doğru sütuna yazar.",
        "Hata dedektifi: Bir gönüllü öğrenci masada kambur, ekrana çok yakın ve bacak bacak üstüne oturur. Sınıf en az 3 hata bulur.",
        "Başka bir gönüllü doğru oturuşu gösterir. Sınıf ergonomi slaytındaki 4 maddeyle karşılaştırır.",
        "Gönüllüler tahtaya gelip \"Bu önlem hangi cihaz için?\" oyununu oynar.",
        "Neden-sonuç zinciri: Öğretmen \"Gece geç saate kadar oyun\" yazar. Sınıf sonuçlarını sırayla ekler: uykusuzluk → sabah yorgunluk → derste dikkat dağınıklığı."
      ]
    },
    kagit: {
      title: "Olumlu-olumsuz ve güvenlik kartları",
      goal: "Gruplarla teknolojilerin iki yüzünü listele, güvenlik kartlarını cihazlara göre dağıt ve çalışma kâğıdını doldur.",
      needs: ["Yazdırılmış çalışma kâğıdı", "Önlemlerin yazılı olduğu küçük kartlar (öğretmen hazırlar)", "Kalem"],
      b: ["a", "b", "c"],
      steps: [
        "Sınıf 4 gruba ayrılır. Her grup bir teknoloji alır: telefon, tablet, sosyal medya, bulut.",
        "Gruplar 5 dakikada kendi teknolojilerinin olumlu ve olumsuz yönlerini listeler.",
        "Sözcüler listelerini okur, öğretmen tahtaya yazar.",
        "Öğretmen güvenlik kartlarını dağıtır. Gruplar kartları tahtadaki cihaz başlıklarının altına yapıştırır.",
        "Herkes çalışma kâğıdını tek başına doldurur.",
        "Son görevde kendine bir dijital sağlık sözü yaz ve sözünü defterinin kapağının içine de geçir."
      ],
      sheet: [
        { h: "1. Olumlu ve olumsuz yönleri yaz.", type: "table", head: ["Teknoloji", "Olumlu yönü", "Olumsuz yönü"], rows: [["Telefon", "", ""], ["Tablet", "", ""], ["Sosyal medya", "", ""]] },
        { h: "2. Bu önlem hangi cihaz için?", type: "table", head: ["Önlem", "Cihaz"], rows: [["Sesi yarıdan fazla açma.", ""], ["Şarj olurken yastık altına koyma.", ""], ["Yanına içecek koyma.", ""], ["Islak elle dokunma.", ""]] },
        { h: "3. Neden ne olur? Sonucunu yaz.", type: "table", head: ["Neden", "Sonuç"], rows: [["Saatlerce eğilerek oturmak", ""], ["Yatmadan önce video izlemek", ""], ["Ara vermeden ekrana bakmak", ""]] },
        { h: "4. Kendime dijital sağlık sözüm:", type: "lines", n: 2 }
      ]
    }
  },

  diff: {
    destek: { who: "Etkinlikte zorlanan öğrenciler için", items: [
      "Olumlu ve olumsuz yön kartlarını gülen yüz ve üzgün yüz çizilmiş iki kutuya ayır.",
      "Ergonomi slaytındaki 4 maddeyi birer küçük resimle çiz.",
      "Sadece telefon için bir olumlu ve bir olumsuz yön yaz."
    ] },
    zengin: { who: "Etkinliği erken bitiren öğrenciler için", items: [
      "Bilişim teknolojilerinin beden ve ruh sağlığına etkilerini anlatan kısa bir rapor yaz. Raporda olumlu ve olumsuz yönlere yer ver.",
      "Bir hafta boyunca ekran süresi günlüğü tut. Bu günlük sadece senin içindir, kimseyle paylaşmak zorunda değilsin.",
      "Sınıf için \"Göz molası zamanı!\" hatırlatma afişi tasarla."
    ] }
  },

  quiz: [
    { q: "Aşağıdakilerden hangisi bilişim teknolojilerinin olumsuz yönüdür?", o: ["Akrabayla görüntülü konuşmak", "Bilgiye hızlı ulaşmak", "Saatlerce oyun oynayıp uykusuz kalmak"], a: 2, b: "a", hint: "Sağlığımıza zarar veren seçeneği bul.", why: "Uykusuz kalmak sağlığa zarar verir. Diğer ikisi teknolojinin olumlu yönleridir." },
    { q: "Bulut depolamanın olumlu yönü hangisidir?", o: ["Dosyam kaybolmaz", "İnternetsiz de açılır", "Göz yorgunluğunu azaltır"], a: 0, b: "a", hint: "Bilgisayarın bozulsa buluttaki dosyana ne olur?", why: "Bulutta saklanan dosya, bilgisayar bozulsa da kaybolmaz." },
    { q: "Telefon şarj olurken ne yapmalıyız?", o: ["Yastığın altına koymalıyız", "Düz ve açık bir yere koymalıyız", "Üstünü örtmeliyiz"], a: 1, b: "b", why: "Şarj olan telefon ısınır. Üstü kapalı kalırsa çok ısınabilir.", hint: "Şarj olurken telefonun hava alması gerekir." },
    { q: "Hangisi ergonomik oturuştur?", o: ["Ekrana yaklaşıp eğilmek", "Sırtı yaslı, ayaklar yerde", "Yatakta uzanmak"], a: 1, b: "c", hint: "Boynunu ve belini yormayan oturuşu düşün.", why: "Sırtı yaslayıp ayakları yere basmak boynu ve beli yormaz." },
    { q: "Yatmadan hemen önce ekrana bakmak neye yol açabilir?", o: ["Uykunun kaçmasına", "Gözlerin dinlenmesine", "Boyun ağrısının geçmesine"], a: 0, b: "c", hint: "Ekranın ışığı beyne \"daha gündüz\" der.", why: "Ekranın ışığı uykuyu geciktirir, bu yüzden uykumuz kaçabilir." }
  ],

  crossword: [
    { a: "Ergonomi", c: "Araçların vücudumuza uygun olması ve doğru kullanılması" },
    { a: "Bağımlılık", c: "Teknolojiyi bırakmak isteyip bırakamamak: dijital ..." },
    { a: "Ekran", c: "... süresi: Ekran başında geçirdiğimiz zaman" },
    { a: "Uyku", c: "Yatmadan önce ekrana bakmak bunu kaçırır" },
    { a: "Kulaklık", c: "Sesini yarıdan fazla açmamamız gereken cihaz" },
    { a: "Mola", c: "Gözlerimizi dinlendirmek için 20 dakikada bir verdiğimiz şey" },
    { a: "Empati", c: "Kendini başkasının yerine koyup onu anlamak" },
    { a: "Zorbalık", c: "İnternette birini üzmek, ona kötü davranmak: siber ..." }
  ],

  assessment: {
    tool: "Öz değerlendirme formu (Evet / Kısmen / Henüz değil)",
    items: [
      "Bir teknolojinin olumlu ve olumsuz yönlerini söyleyebilirim. (a)",
      "Güvenlik önlemlerini cihazlara göre ayırabilirim. (b)",
      "Uzun ekran kullanımının gözüme, belime ve uykuma etkisini kendi cümlelerimle anlatabilirim. (c)",
      "Ergonomik oturuşu gösterebilirim. (c)",
      "Kendime bir dijital sağlık sözü belirledim. (c)",
      "Öğrenci formun sonunda bir güçlü yönünü ve geliştirmek istediği bir yönünü yazar."
    ]
  },

  flow: [
    { part: "1. ders" },
    { m: 5, h: "Giriş", d: "\"Gözlerin yandı mı, boynun ağrıdı mı?\" sorusu. Can'ın hikâyesi (Tahmin et)." },
    { m: 20, h: "Slayt", d: "Olumlu ve olumsuz yönler, bağımlılık, ergonomi, göz kırpma tahmini, fiziksel güvenlik, dijital sağlığın üç boyutu, uyku tahmini." },
    { m: 10, h: "Deftere Yaz", d: "Öğrenciler 5 maddeyi defterlerine geçirir." },
    { m: 5, h: "Bu önlem hangi cihaz için? oyunu", d: "Sınıflandırma oyunu." },
    { part: "2. ders" },
    { m: 25, h: "Etkinlik", d: "Sınıf ortamına göre dijital sağlık afişi, hata dedektifi ya da güvenlik kartları." },
    { m: 5, h: "Öz değerlendirme", d: "Öğrenciler formu işaretler, bir güçlü ve bir gelişime açık yönünü yazar." },
    { m: 10, h: "Mini test ve bulmaca", d: "Herkes dijital sağlık sözünü sesli ya da içinden söyleyerek kapanış." }
  ],

  teacherNotes: [
    "Öğrencilere günde kaç saat ekran kullandıkları sorulmamalıdır. Ekran süresi günlüğü yalnızca isteğe bağlı ve kişiseldir, toplanmaz ve sınıfta okunmaz.",
    "Siber zorbalık yalnızca kavram ve başa çıkma yolu (cevap verme, bir yetişkine söyle) düzeyinde ele alınır. Bir öğrenci yaşadığı bir durumu anlatırsa sınıfta ayrıntıya girmeyin, okulun rehberlik servisine yönlendirin.",
    "Hata dedektifi canlandırmasında gönüllü öğrenci seçin. Öğrenciler birbirinin gerçek oturuşu yüzünden eleştirilmemelidir, \"hata\" canlandırılan karaktere aittir.",
    "\"20 dakikada bir, 20 saniye uzağa bak\" kuralını ders boyunca uygulayabilirsiniz: Laboratuvarda 20. dakikada herkes birlikte göz molası verebilir.",
    "Bu ders BTY.5.1.3 (Dijital vatandaşlık) dersine hazırlıktır. Çevrim içi nezaket ve siber zorbalık gelecek hafta dijital vatandaşlık içinde tekrar ele alınır."
  ]
});
