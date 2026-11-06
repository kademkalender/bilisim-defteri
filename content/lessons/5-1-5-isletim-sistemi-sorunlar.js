/* 5. Sınıf · Tema 1 · BTY.5.1.5 Bilgisayar sistemlerini çözümleyebilme (2. ders, 6. hafta)
   Süreç bileşenleri: a) temel bileşenleri belirler  b) bileşenler arasındaki ilişkileri belirler
   Programdaki uygulamalardan: işletim sisteminin görevleri ve bileşenleri, farklı işletim sistemleri,
   D/Y eğitsel oyunu ("Günün BT Uzmanı"), donanım ve yazılım sorunları, sorun çözme algoritması afişi */
BD.lesson({
  id: "5-1-5-isletim-sistemi-sorunlar",
  grade: "5", theme: 1, week: 6,
  title: "İşletim Sistemi ve Bilgisayar Sorunları",
  outcome: "BTY.5.1.5",
  covers: ["a", "b"],
  duration: "2 ders saati (40+40 dk)",
  hook: "Okulumuzda müdür, zil ve ders programı olmasaydı ne olurdu? Herkes nereye gideceğini şaşırırdı! Bilgisayarın da bir yöneticisi var. Bugün onu tanıyacak ve bilgisayar bozulduğunda bir uzman gibi düşünmeyi öğreneceğiz.",

  slides: [
    { type: "title", pill: "5. sınıf · 6. hafta", h: "İşletim Sistemi ve Bilgisayar Sorunları", p: "Bilgisayarın yöneticisi kim? Bir sorun çıkınca ne yaparız?" },
    { emoji: "❓", h: "Tahmin et: Okulun müdürü olmasaydı?", p: "Zil çalmasa, ders programı olmasa, kimse hangi sınıfa gireceğini bilmese ne olurdu?", reveal: "Her şey karışırdı! Bilgisayarda bu düzeni işletim sistemi sağlar. O, bilgisayarın müdürüdür.", b: "b" },
    { emoji: "💻", h: "İşletim sistemi nedir?", p: "Bilgisayar açılınca ilk çalışan, donanımı ve diğer programları yöneten yazılımdır.", list: ["Örnekler: Pardus, Windows. Telefonların da işletim sistemi vardır.", "Pardus, Türkiye'de geliştirilen işletim sistemidir.", "Kullanıcı arayüzü: Ekranda gördüğümüz masaüstü, simgeler ve menüler."], b: "a" },
    { h: "İşletim sisteminin görevleri ⚙️", cols: [
      { h: "Çekirdek", p: "İşletim sisteminin kalbi. Donanımla programlar arasında köprü kurar." },
      { h: "Dosya yönetimi", p: "Dosyaları klasörlerde düzenler, saklar ve bulur." },
      { h: "Bellek yönetimi", p: "Açık programlara bellekte yer ayırır." },
      { h: "İşlem yönetimi", p: "Aynı anda çalışan programlar arasında sırayı belirler." }
    ], b: "a" },
    { h: "İşletim sistemi bir köprüdür", tree: "👤 KULLANICI    Şarkıya çift tıkladım\n      ↓\n🖥️  ARAYÜZ      Tıklamayı iletti\n      ↓\n⚙️  İŞLETİM S.  Programı açtı, belleğe aldı\n      ↓\n🔊 DONANIM     Hoparlörden müzik çaldı", b: "b" },
    { emoji: "❓", h: "Tahmin et: Neden tek işletim sistemi yok?", p: "Okullarda Pardus da Windows da var. Neden herkes aynı işletim sistemini kullanmıyor?", reveal: "Farklı ülkeler ve şirketler farklı ihtiyaçlar için geliştirir. Bazıları ücretsizdir, bazıları ücretli. Telefon, bilgisayar ve tahta için de ayrı işletim sistemleri vardır.", b: "a" },
    { h: "Donanım sorunu mu, yazılım sorunu mu? 🔧", cols: [
      { h: "Donanım sorunu", p: "Parçada ya da kabloda sorun var: Kablo çıkmış, yazıcıda kâğıt bitmiş, farenin pili bitmiş." },
      { h: "Yazılım sorunu", p: "Programda ya da ayarda sorun var: Ses kısılmış, program donmuş, yanlış yazıcı seçilmiş." }
    ], b: "b" },
    { h: "Sorun çözme adımları", tree: "1. Tanımla        Ne çalışmıyor?\n      ↓\n2. Kontrol et     Kablo takılı mı? Cihaz açık mı?\n      ↓\n3. Ayara bak      Ses açık mı? Doğru cihaz seçili mi?\n      ↓\n4. Yeniden başlat Programı kapatıp aç.\n      ↓\n5. Yardım iste    Öğretmenine haber ver.", b: "b" },
    { emoji: "❓", h: "Tahmin et: Hoparlörden ses yok!", p: "Ali şarkıyı açtı ama hiç ses gelmiyor. Önce neye bakmalı?", reveal: "Önce kolay olanlara: Ses simgesi kısık mı? Hoparlörün kablosu takılı mı, açık mı? Çoğu sorun bu basit adımlarla çözülür. Pes etme!", b: "b" },
    { emoji: "🛑", h: "Sorun çözerken güvenlik", list: ["Kasayı asla kendin açma.", "Fişe dokunurken ellerin kuru olsun.", "Bilmediğin bir ayarı değiştirmeden önce sor.", "Çözemezsen öğretmenine söyle. Bu da bir çözüm adımıdır!"], b: "b" },
    { emoji: "✏️", h: "Sıra sende!", p: "Deftere Yaz kısmını defterine geçir, sonra etkinliğe başla.", end: true }
  ],

  notebook: [
    { t: "<mark>İşletim sistemi</mark>: Bilgisayarı ve programları yöneten yazılımdır. Örnek: Pardus, Windows. Ekranda gördüğümüz bölümüne <mark>kullanıcı arayüzü</mark> denir.", b: "a" },
    { t: "Görevleri: <mark>dosya yönetimi, bellek yönetimi, işlem yönetimi</mark>. İşletim sisteminin kalbine <mark>çekirdek</mark> denir.", b: "a" },
    { t: "İşletim sistemi kullanıcı, programlar ve donanım arasında <mark>köprü</mark> kurar.", b: "b" },
    { t: "<mark>Donanım sorunu</mark> parçada ya da kabloda, <mark>yazılım sorunu</mark> programda ya da ayardadır.", b: "b" },
    { t: "Sorun çözme adımları: <mark>Tanımla → Kontrol et → Ayara bak → Yeniden başlat → Yardım iste</mark>.", b: "b" }
  ],

  sort: {
    title: "Donanım sorunu mu, yazılım sorunu mu?",
    intro: "Her sorunu doğru gruba yerleştir.",
    b: "b",
    cats: ["Donanım sorunu", "Yazılım sorunu"],
    items: [
      { t: "Farenin pili bitti", c: 0 }, { t: "Yazıcıda kâğıt kalmadı", c: 0 },
      { t: "Hoparlörün kablosu çıkmış", c: 0 }, { t: "Klavyenin bir tuşu kırık", c: 0 },
      { t: "Bilgisayarın sesi kısık", c: 1 }, { t: "Program dondu, tıklamaya cevap vermiyor", c: 1 },
      { t: "Belge yanlış yazıcıya gönderildi", c: 1 }, { t: "Ekran dili yanlış seçilmiş", c: 1 }
    ]
  },

  activities: {
    lab: {
      title: "İşletim sistemimi tanıyorum",
      goal: "Bilgisayarındaki işletim sistemini bul, işlem ve bellek yönetimini gözünle gör, bir yazılım ayarını kontrol et.",
      needs: ["Her öğrenciye ya da her iki öğrenciye bir bilgisayar", "Sorun kartları (öğretmen notlarında)"],
      b: ["a", "b"],
      steps: [
        "Bilgisayar açılırken ekranı izle. İşletim sisteminin adı ya da simgesi göründü mü? Defterine yaz.",
        { t: "İşletim sisteminin adını ve sürümünü bul.", pardus: "Uygulamalar menüsünde \"Hakkında\" ya da \"Sistem Bilgisi\" diye ara.", windows: "Başlat → Ayarlar → Sistem → Hakkında" },
        { t: "Görev Yöneticisi'ni aç. Açık programları ve kullandıkları belleği gör.", pardus: "Uygulamalar menüsünde \"Görev Yöneticisi\" ya da \"Sistem Gözlemcisi\" diye ara.", windows: "Ctrl + Shift + Esc tuşlarına aynı anda bas." },
        { t: "Bir yazı programı aç ve Görev Yöneticisi'ne geri dön. Listeye yeni bir işlem eklendi mi?", pardus: "Menü → Ofis → LibreOffice Writer", windows: "Başlat → Not Defteri" },
        { t: "Yazı programını kapat. Görev Yöneticisi'nde listeden çıktığını gör. Bu, işletim sisteminin işlem ve bellek yönetimidir.", pardus: "Pencerenin sağ üstündeki × düğmesine tıkla.", windows: "Pencerenin sağ üstündeki X düğmesine tıkla." },
        { t: "Ses ayarını bul. Sesi kapat, sonra yeniden aç.", pardus: "Alt paneldeki hoparlör simgesine tıkla.", windows: "Görev çubuğunun sağındaki hoparlör simgesine tıkla." },
        "Arkadaşına bir sorun kartı oku. O da sorun çözme adımlarıyla çözümü anlatsın. Sonra yer değiştirin.",
        { t: "Bütün programları kapat. Görev Yöneticisi'nde hiçbir işlemi kendin sonlandırma.", pardus: "Her pencerenin sağ üstündeki × düğmesine tıkla.", windows: "Her pencerenin sağ üstündeki X düğmesine tıkla." }
      ]
    },
    tahta: {
      title: "Günün BT Uzmanı",
      goal: "Doğru-yanlış oyunuyla işletim sistemini pekiştir, sorun çözme algoritmasını sınıfça kur ve sorun kartlarını çöz.",
      needs: ["Etkileşimli tahta ya da projeksiyon", "Her öğrenciye bir kâğıt (bir yüzünde D, öbür yüzünde Y)", "Sorun kartları"],
      b: ["a", "b"],
      steps: [
        "Herkes kâğıdının bir yüzüne büyük bir D, öbür yüzüne Y yazar.",
        "Öğretmen, öğretmen notlarındaki 8 önermeyi sırayla okur. Öğrenciler doğru bildikleri yüzü kaldırır.",
        "Yanlış cevap veren oturur, öğretmen doğrusunu hemen açıklar. Ayakta kalanlar \"Günün BT Uzmanı\" olur.",
        "Tahtaya sorun çözme algoritması 5 adım olarak, oklarla çizilir.",
        "Gruplar birer sorun kartı alır. Algoritmayı kullanarak çözümü anlatır, sorunun donanım mı yazılım mı olduğunu söyler.",
        "Gönüllüler \"Donanım sorunu mu, yazılım sorunu mu?\" oyununu oynar."
      ]
    },
    kagit: {
      title: "Sorun çözme afişi",
      goal: "Grubunla bir bilgisayar sorununu çözen bir algoritma afişi hazırla, çalışma kâğıdını doldur.",
      needs: ["Yazdırılmış çalışma kâğıdı", "Sorun kartları", "A3 kâğıt, boya kalemleri"],
      b: ["a", "b"],
      steps: [
        "Sınıf 4 gruba ayrılır. Her grup bir sorun kartı alır: yazıcı çalışmıyor, bilgisayar açılmıyor, hoparlörden ses gelmiyor, fare hareket etmiyor.",
        "Gruplar sorunun olası nedenlerini listeler ve her nedenin yanına donanım mı yazılım mı olduğunu yazar.",
        "Gruplar 5 adımlı sorun çözme algoritmasını kendi sorunlarına göre oklarla bir afişe çizer.",
        "Afişler sınıfa asılır. Her grup afişini anlatır, diğer gruplar başka bir çözüm önerebilir.",
        "Herkes çalışma kâğıdını tek başına doldurur."
      ],
      sheet: [
        { h: "1. İşletim sisteminin görevleri ne yapar? Yaz.", type: "table", head: ["Görev", "Ne yapar?"], rows: [["Dosya yönetimi", ""], ["Bellek yönetimi", ""], ["İşlem yönetimi", ""], ["Kullanıcı arayüzü", ""]] },
        { h: "2. Donanım mı, yazılım mı? Ne yaparsın?", type: "table", head: ["Sorun", "Donanım / Yazılım", "Çözüm"], rows: [["Farenin pili bitti.", "", ""], ["Bilgisayarın sesi kısık.", "", ""], ["Yazıcıda kâğıt kalmadı.", "", ""], ["Program dondu.", "", ""]] },
        { h: "3. Bilgisayar açılmıyor. Sorun çözme adımlarına göre ilk iki adımda ne yaparsın?", type: "lines", n: 2 }
      ]
    }
  },

  diff: {
    destek: { who: "Etkinlikte zorlanan öğrenciler için", items: [
      "Sorun kartlarını \"Donanım\" ve \"Yazılım\" yazan iki kutuya ayır.",
      "Sorun çözme adımlarının 5 kartını doğru sıraya diz.",
      "İşletim sisteminin görevlerini resimlerle eşleştir: klasör resmi dosya yönetimi, sıra bekleyen öğrenciler işlem yönetimi."
    ] },
    zengin: { who: "Etkinliği erken bitiren öğrenciler için", items: [
      "Bir grup arkadaşınla bilgisayarın bir parçasını seç. Görevini ve işletim sistemiyle nasıl çalıştığını sınıfa anlat.",
      "Telefon, bilgisayar ve etkileşimli tahtanın işletim sistemlerini karşılaştıran bir tablo hazırla: Ne işe yarar? Hangi cihazda çalışır?",
      "\"Bilgisayarım açılmıyor\" sorunu için evde ailene anlatabileceğin bir sorun çözme kartı hazırla."
    ] }
  },

  quiz: [
    { q: "Bilgisayarı ve programları yöneten yazılım hangisidir?", o: ["Kelime işlemci", "İşletim sistemi", "Oyun programı"], a: 1, b: "a", hint: "Pardus ve Windows bu yazılım türüne örnektir.", why: "İşletim sistemi bilgisayarı ve programları yönetir. Pardus ve Windows birer işletim sistemidir." },
    { q: "Açık programlara bellekte yer ayırmak hangi görevdir?", o: ["Bellek yönetimi", "Dosya yönetimi", "Kullanıcı arayüzü"], a: 0, b: "a", hint: "Programlar çalışırken bilgileri nerede tutar?", why: "Açık programlara bellekte yer ayırmak, işletim sisteminin bellek yönetimi görevidir." },
    { q: "Şarkıya çift tıkladın, hoparlörden müzik geldi. Aradaki köprü hangisidir?", o: ["Yazıcı", "İşletim sistemi", "Klavye"], a: 1, b: "b", hint: "Komutunu alıp hoparlöre ileten yazılımı düşün.", why: "İşletim sistemi komutunu alır ve hoparlöre iletir. Aradaki köprü odur." },
    { q: "Hangisi yazılım sorunudur?", o: ["Farenin pili bitti", "Program dondu", "Yazıcıda kâğıt yok"], a: 1, b: "b", hint: "Yazılım sorunu dokunabildiğin parçalarda değil, programlarda olur.", why: "Donan program bir yazılım sorunudur. Pil ve kâğıt donanım sorunudur." },
    { q: "Hoparlörden ses gelmiyor. İlk ne yapmalısın?", o: ["Kasayı açarım", "Ses ayarına ve kabloya bakarım", "Yeni hoparlör alırım"], a: 1, b: "b", why: "Sorun çözerken önce kolay ve güvenli adımlara bakılır.", hint: "Önce kendi başına güvenle bakabileceğin şeyleri düşün." }
  ],

  crossword: [
    { a: "Pardus", c: "Türkiye'de geliştirilen işletim sistemi" },
    { a: "Çekirdek", c: "İşletim sisteminin kalbi" },
    { a: "Arayüz", c: "Ekranda gördüğümüz simge ve menüler: kullanıcı ..." },
    { a: "Bellek", c: "Açık programlara burada yer ayrılır" },
    { a: "Donanım", c: "Kablo çıkması bu tür bir sorundur" },
    { a: "Yazılım", c: "Programın donması bu tür bir sorundur" },
    { a: "Kablo", c: "Ses gelmezse takılı olup olmadığına bakarız" },
    { a: "Yardım", c: "Çözemezsek son adımda öğretmenden bunu isteriz" }
  ],

  assessment: {
    tool: "Dereceli puanlama anahtarı (afiş ya da sorun kartı çözümü) ve gözlem",
    items: [
      "İşletim sistemini tanımlar ve iki örnek verir. (a)",
      "İşletim sisteminin dosya, bellek ve işlem yönetimi görevlerini açıklar. (a)",
      "İşletim sisteminin kullanıcı, program ve donanım arasındaki köprü rolünü bir örnekle anlatır. (b)",
      "Bir sorunun donanım mı yazılım mı olduğunu doğru belirler. (b)",
      "Sorun çözme adımlarını sırasıyla ve güvenli biçimde uygular. (b)",
      "Her ölçüt 3 düzeyde puanlanır: 3 tam, 2 kısmen, 1 geliştirilmeli. Sebat eden, pes etmeden yeni yol deneyen öğrenci gözlem notuyla desteklenir."
    ]
  },

  flow: [
    { part: "1. ders" },
    { m: 5, h: "Giriş", d: "\"Okulun müdürü olmasaydı?\" sorusu ve ilk \"Tahmin et\" slaytı." },
    { m: 20, h: "Slayt", d: "İşletim sistemi, görevleri, köprü akışı, neden farklı işletim sistemleri, donanım ve yazılım sorunları, sorun çözme adımları, ses tahmini, güvenlik." },
    { m: 10, h: "Deftere Yaz", d: "Öğrenciler 5 maddeyi defterlerine geçirir." },
    { m: 5, h: "Donanım mı, yazılım mı? oyunu", d: "Sınıflandırma oyunu." },
    { part: "2. ders" },
    { m: 25, h: "Etkinlik", d: "Sınıf ortamına göre işletim sistemini keşif, Günün BT Uzmanı ya da sorun çözme afişi." },
    { m: 5, h: "Farklılaştırma", d: "Destekleme ve zenginleştirme kartları." },
    { m: 10, h: "Mini test ve bulmaca", d: "\"Sorun çıkınca pes etmem, adım adım denerim\" cümlesiyle kapanış." }
  ],

  teacherNotes: [
    "Günün BT Uzmanı önermeleri: 1) İşletim sistemi bilgisayar açılınca ilk çalışan yazılımdır. (D) 2) Pardus bir donanımdır. (Y) 3) Farenin pilinin bitmesi yazılım sorunudur. (Y) 4) Bellek yönetimi açık programlara yer ayırır. (D) 5) Telefonların işletim sistemi yoktur. (Y) 6) Bir sorun çıkınca ilk iş kasayı açmaktır. (Y) 7) Kullanıcı arayüzü ekranda gördüğümüz menü ve simgelerdir. (D) 8) Pardus Türkiye'de geliştirilmiştir. (D)",
    "Sorun kartları: Yazıcı çalışmıyor. Bilgisayar açılmıyor. Hoparlörden ses gelmiyor. Fare hareket etmiyor. Ekranda hiçbir şey görünmüyor. Program dondu.",
    "Laboratuvarda Pardus menü adları sürüme göre değişebilir (XFCE'de Görev Yöneticisi, GNOME'da Sistem Gözlemcisi). Dersten önce bir bilgisayarda adımları deneyin.",
    "Görev Yöneticisi'nde öğrencilerin işlem sonlandırmasına izin vermeyin. Bu derste yalnızca bakılır.",
    "Programın vurguladığı gibi sorun çözmede sebat önemlidir. İlk denemede çözemeyen öğrenciye \"Hangi adımı denedin, sıradaki adım ne?\" diye sorun."
  ]
});
