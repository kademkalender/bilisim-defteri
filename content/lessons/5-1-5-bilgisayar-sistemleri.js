/* 5. Sınıf · Tema 1 · BTY.5.1.5 Bilgisayar sistemlerini çözümleyebilme
   Süreç bileşenleri: a) temel bileşenleri belirler  b) bileşenler arasındaki ilişkileri belirler */
BD.lesson({
  id: "5-1-5-bilgisayar-sistemleri",
  grade: "5", theme: 1, week: 5,
  title: "Bilgisayar Sistemleri",
  outcome: "BTY.5.1.5",
  covers: ["a", "b"],
  duration: "2 ders saati (40+40 dk)",
  hook: "Bankamatikten para çekerken neler oluyor? Kartı takıyoruz, şifreyi giriyoruz, makine bir şeyler yapıyor, sonra para ve fiş çıkıyor. Bilgisayar da tam olarak böyle çalışır!",

  slides: [
    { type: "title", pill: "5. Sınıf · 5. Hafta", h: "Bilgisayar Sistemleri", p: "Bilgisayar hangi parçalardan oluşur ve bu parçalar nasıl birlikte çalışır?" },
    { emoji: "⚙️", h: "Bilgisayar sistemi nedir?", p: "Donanım, yazılım ve kullanıcı birlikte çalışarak bir bilgisayar sistemi oluşturur. Biri eksik olursa sistem çalışmaz.", b: "a" },
    { h: "Donanım ve yazılım", cols: [
      { h: "Donanım", p: "Bilgisayarın elle dokunabildiğimiz fiziksel parçaları: klavye, fare, ekran, kasa." },
      { h: "Yazılım", p: "Bilgisayara ne yapacağını söyleyen programlar. Dokunamayız, sadece ekranda görürüz." }
    ], b: "a" },
    { emoji: "🐧", h: "İşletim sistemi", p: "Bilgisayar açılınca ilk çalışan, donanımı ve diğer programları yöneten yazılımdır. Örnekler: Pardus, Windows. Pardus, Türkiye'de geliştirilen işletim sistemidir.", b: "a" },
    { h: "Giriş birimleri ⌨️", p: "Bilgisayara bilgi göndermemizi sağlar.", list: ["Klavye, fare", "Mikrofon, kamera", "Tarayıcı", "Etkileşimli tahtanın dokunmatik ekranı"], b: "a" },
    { h: "Çıkış birimleri 🔊", p: "Bilgisayarın işlediği bilgiyi bize gösterir ya da duyurur.", list: ["Ekran (monitör)", "Hoparlör, kulaklık", "Yazıcı", "Projeksiyon cihazı"], b: "a" },
    { h: "İşlem ve depolama birimleri", cols: [
      { h: "İşlemci", p: "Bilgisayarın beyni. Gelen bilgileri işler ve hesaplar." },
      { h: "Depolama", p: "Bilgileri saklar: sabit disk, USB bellek, hafıza kartı. Bilgisayar kapansa da bilgiler kaybolmaz." }
    ], b: "a" },
    { h: "Parçalar birlikte nasıl çalışır?", tree: "⌨️  GİRİŞ      Klavyede A tuşuna bastım\n      ↓\n⚙️  İŞLEM      İşlemci bu tuşu tanıdı\n      ↓\n🖥️  ÇIKIŞ      Ekranda A harfi göründü\n      ↓\n💾 DEPOLAMA   Kaydedince dosya saklandı", b: "b" },
    { h: "Bilgisayarın dili: bit ve bayt", list: ["Bilgisayar her şeyi 0 ve 1 ile saklar.", "Her bir 0 ya da 1'e bit denir.", "8 bit bir araya gelince 1 bayt olur.", "Bir harf yaklaşık 1 bayt yer kaplar."], b: "a" },
    { emoji: "✏️", h: "Sıra sende!", p: "Deftere Yaz kısmını defterine geçir, sonra etkinliğe başla.", end: true }
  ],

  notebook: [
    { t: "<mark>Bilgisayar sistemi</mark>: Donanım, yazılım ve kullanıcının birlikte çalışmasıdır.", b: "a" },
    { t: "<mark>Donanım</mark> bilgisayarın fiziksel parçalarıdır. <mark>Yazılım</mark> bilgisayara ne yapacağını söyleyen programlardır.", b: "a" },
    { t: "<mark>İşletim sistemi</mark> bilgisayarı yöneten yazılımdır. Örnek: Pardus, Windows.", b: "a" },
    { t: "<mark>Giriş birimi</mark> bilgisayara bilgi verir (klavye, fare, mikrofon). <mark>Çıkış birimi</mark> sonucu gösterir (ekran, hoparlör, yazıcı).", b: "a" },
    { t: "Bilgisayar sırayla çalışır: <mark>Giriş → İşlem → Çıkış</mark>. Bilgiler depolama birimlerinde saklanır.", b: "b" }
  ],

  sort: {
    title: "Giriş mi, çıkış mı, depolama mı?",
    intro: "Her parçayı doğru gruba yerleştir.",
    b: "a",
    cats: ["Giriş birimi", "Çıkış birimi", "Depolama birimi"],
    items: [
      { t: "Klavye", c: 0 }, { t: "Fare", c: 0 }, { t: "Mikrofon", c: 0 }, { t: "Kamera", c: 0 }, { t: "Tarayıcı", c: 0 },
      { t: "Ekran", c: 1 }, { t: "Hoparlör", c: 1 }, { t: "Yazıcı", c: 1 }, { t: "Projeksiyon", c: 1 },
      { t: "USB bellek", c: 2 }, { t: "Sabit disk", c: 2 }, { t: "Hafıza kartı", c: 2 }
    ]
  },

  // Sanal masaüstü: laboratuvar ve tahtada etkinliğin başında açılır. Yazım kuralları: ICERIK-REHBERI.md
  sim: {
    start: { "odev1.odt": 18432, "kedim.png": 839680, "sarki.mp3": 3355443 },
    tasks: [
      { id: "menu", b: "a",
        text: { windows: "Ekranın altındaki Başlat düğmesine bas ve menüyü aç.", pardus: "Ekranın sol altındaki Uygulamalar düğmesine bas ve menüyü aç." },
        check: { type: "ui", key: "menu", value: true },
        hint: { windows: "Görev çubuğundaki Başlat düğmesine bir kez tıkla.", pardus: "Alt paneldeki Uygulamalar düğmesine bir kez tıkla." },
        show: "ui:start",
        success: "Bu menüyü işletim sistemi gösterir. İşletim sistemi, bilgisayarı yöneten yazılımdır." },
      { id: "program", b: "a",
        text: { windows: "Menüden Not Defteri'ni bul ve aç.", pardus: "Menüden Ofis → LibreOffice Writer'ı bul ve aç." },
        check: { type: "ui", key: "app", value: "yazi" },
        hint: { windows: "Başlat menüsünde Not Defteri yazısına tıkla.", pardus: "Uygulamalar menüsünde Ofis'e, sonra LibreOffice Writer'a tıkla." },
        show: "ui:start",
        success: "Yazı programı da bir yazılımdır. Donanım ve yazılım birlikte çalışır." },
      { id: "yaz", b: "b",
        text: "Klavyeyle adını yaz.",
        check: { type: "typed", min: 2 },
        hint: "Yazı alanının içine tıkla ve klavyeden adını yaz.",
        show: "ui:text",
        success: "Ekranda harflerin göründü!" },
      { id: "gic", b: "b",
        text: "Adını yazarken ne oldu? Doğru sırayı seç.",
        check: { type: "answer", options: ["Ekrana dokundum → hoparlör işledi → klavyede gördüm", "Klavyeye bastım → işlemci işledi → ekranda gördüm", "İşlemciye bastım → klavye işledi → yazıcıda gördüm"], correct: 1 },
        hint: "Giriş birimi bilgiyi bilgisayara verir, çıkış birimi sonucu gösterir. Hangi tuşlara bastın, harfleri nerede gördün?",
        success: "Doğru! Klavye giriş, işlemci işlem, ekran çıkış birimidir: Giriş → İşlem → Çıkış." },
      { id: "kaydet", b: "a",
        text: "Dosyayı masaüstüne SınıfınŞuben_Adın_Bilgisayar adıyla kaydet. Örnek: 5A_Ayşe_Bilgisayar",
        check: { type: "exists", path: "Masaüstü/*_Bilgisayar.*", kind: "file", format: "ogrenci", as: "dosya" },
        hint: { windows: "Dosya → Farklı kaydet'e bas (Ctrl + Shift + S). Kaydedilecek yer: Masaüstü. Adını yaz ve Kaydet'e bas.", pardus: "Dosya → Farklı Kaydet…'e bas (Ctrl + Shift + S). Klasörde kaydet: Masaüstü. Adını yaz ve Kaydet'e bas." },
        show: "ui:save",
        success: "Kaydettin! Dosyan artık depolama biriminde duruyor. Bilgisayarı kapatsan da silinmez." },
      { id: "bul", b: "a",
        text: "Programı kapat. Kaydettiğin dosyayı masaüstünde bul ve aç.",
        check: { type: "ui", key: "opened", value: "Masaüstü/{dosya}.*" },
        hint: "Pencerenin sağ üstündeki X ile programı kapat. Sonra masaüstünde dosyanı bul ve çift tıkla.",
        show: "Masaüstü/{dosya}.",
        success: "Buldun! Dosyan depolama biriminden yeniden açıldı." }
    ],
    // Testler ve doğrulayıcı bu adımları oynatır. {ext}: Pardus'ta odt, Windows'ta txt.
    solution: [
      ["menu", true], ["app", "yazi"], ["type", "Ayşe"], ["answer", "gic", 1],
      ["save", "Masaüstü", "5A_Ayşe_Bilgisayar"], ["close"], ["open", "Masaüstü/5A_Ayşe_Bilgisayar.{ext}"]
    ]
  },

  activities: {
    lab: {
      title: "Bilgisayarımı tanıyorum",
      goal: "Kendi bilgisayarının parçalarını bul ve Giriş → İşlem → Çıkış sırasını kendin dene.",
      needs: ["Her öğrenciye ya da her iki öğrenciye bir bilgisayar"],
      b: ["a", "b"],
      steps: [
        "Masandaki bilgisayarın giriş birimlerini say ve defterine yaz.",
        "Çıkış birimlerini say ve defterine yaz. Hoparlör ya da kulaklık var mı?",
        { t: "Ekranın köşesindeki menü düğmesine ve açılış ekranına bak. Bilgisayarında hangi işletim sistemi var?", pardus: "Pardus logosunu ve menüsünü göreceksin.", windows: "Başlat düğmesinde Windows logosunu göreceksin." },
        { t: "Bir yazı programı aç.", pardus: "Menü → Ofis → LibreOffice Writer", windows: "Başlat → Not Defteri" },
        "Klavyeden adını yaz. Hangi tuşa bastığını, işlemcinin ne yaptığını ve ekranda ne gördüğünü düşün: Giriş → İşlem → Çıkış.",
        "Altına bir cümle yaz: \"Klavyeye bastım, işlemci işledi, ekranda gördüm.\"",
        { t: "Dosyayı masaüstüne SınıfınŞuben_Adın_Bilgisayar adıyla kaydet. Böylece depolama birimini de kullanmış olursun.", pardus: "Dosya → Farklı Kaydet (Ctrl + Shift + S)", windows: "Dosya → Farklı Kaydet (Ctrl + Shift + S)" }
      ]
    },
    tahta: {
      title: "Ayağa kalk, otur! Sınıf oyunu",
      goal: "Parçaların giriş, çıkış ya da depolama birimi olduğunu sınıfça birlikte bul.",
      needs: ["Etkileşimli tahta ya da projeksiyon"],
      b: ["a", "b"],
      steps: [
        "Öğretmen tahtada bir parçanın adını söyler.",
        "Giriş birimiyse öğrenciler ayağa kalkar, çıkış birimiyse oturur, depolama birimiyse elini kaldırır.",
        "Tartışmalı bir örnek: Dokunmatik ekran hem giriş hem çıkış birimidir. Neden?",
        "Gönüllü öğrenciler tahtaya gelip aşağıdaki sınıflandırma oyununu sırayla oynar.",
        "Sınıfça bankamatik örneğini konuşun: Kart ve tuşlar giriş, ekran ve para çıkışı çıkış. Arada işlem yapan ne?",
        "Herkes defterine bir Giriş → İşlem → Çıkış örneği yazar: \"Yazıcıdan ödev çıktısı almak\"."
      ]
    },
    kagit: {
      title: "Bilgisayarı çiz, parçalarını bul",
      goal: "Bilgisayar olmadan parçaları ve aralarındaki ilişkiyi kâğıt üzerinde göster.",
      needs: ["Yazdırılmış çalışma kâğıdı", "Kalem, boya kalemi"],
      b: ["a", "b"],
      steps: [
        "Öğretmen ya da gönüllü bir öğrenci konu özetini sınıfa yüksek sesle okur.",
        "Çalışma kâğıdındaki tabloda her parçanın türünü yaz: G (giriş), Ç (çıkış), D (depolama).",
        "Boş kutuya bir masaüstü bilgisayar çiz ve en az 4 parçasını oklarla etiketle.",
        "\"Yazıcıdan ödev çıktısı almak\" için Giriş → İşlem → Çıkış zincirini yaz.",
        "Sıra arkadaşınla kâğıtlarınızı değiştirip birbirinizi kontrol edin."
      ],
      sheet: [
        { h: "1. Parçaların türünü yaz (G / Ç / D)", type: "table", head: ["Parça", "Tür", "Parça", "Tür"], rows: [["Klavye", "", "Hoparlör", ""], ["USB bellek", "", "Mikrofon", ""], ["Ekran", "", "Yazıcı", ""], ["Fare", "", "Sabit disk", ""], ["Kamera", "", "Projeksiyon", ""]] },
        { h: "2. Bir bilgisayar çiz ve en az 4 parçasını etiketle", type: "box", height: 170 },
        { h: "3. \"Yazıcıdan ödev çıktısı almak\" için Giriş → İşlem → Çıkış zincirini yaz", type: "table", head: ["GİRİŞ", "İŞLEM", "ÇIKIŞ"], rows: [["", "", ""], ["", "", ""]] }
      ]
    }
  },

  diff: {
    destek: { who: "Etkinlikte zorlanan öğrenciler için", items: ["Sadece 6 parçayla çalış: klavye, fare, mikrofon, ekran, hoparlör, yazıcı.", "Önce \"bana bilgi veriyor mu, benden bilgi alıyor mu?\" diye sor.", "Parça kartlarını resimli bir bilgisayar görseli üzerinde eşleştir."] },
    zengin: { who: "Etkinliği erken bitiren öğrenciler için", items: ["Okuldaki bilgisayar dışı cihazlarda (bankamatik, POS cihazı, etkileşimli tahta) giriş ve çıkış birimlerini bul.", "Hem giriş hem çıkış birimi olan 3 cihaz bul ve nedenini yaz.", "Donanım ve yazılım eşleştirme listesi hazırla: Hangi program hangi donanımı kullanır?"] }
  },

  quiz: [
    { q: "Aşağıdakilerden hangisi giriş birimidir?", o: ["Hoparlör", "Klavye", "Yazıcı"], a: 1, b: "a" },
    { q: "Aşağıdakilerden hangisi bir yazılımdır?", o: ["Fare", "Pardus", "Ekran"], a: 1, b: "a" },
    { q: "Bilgisayar kapansa bile bilgileri saklayan birim hangisidir?", o: ["İşlemci", "USB bellek", "Hoparlör"], a: 1, b: "a" },
    { q: "Yazıcıdan çıktı alırken doğru sıra hangisidir?", o: ["Çıkış → Giriş → İşlem", "Giriş → İşlem → Çıkış", "İşlem → Çıkış → Giriş"], a: 1, b: "b", why: "Önce komutu veririz (giriş), bilgisayar işler (işlem), yazıcı yazdırır (çıkış)." }
  ],

  crossword: [
    { a: "Klavye", c: "Yazı yazmak için kullandığımız giriş birimi" },
    { a: "Ekran", c: "Görüntüyü gösteren çıkış birimi" },
    { a: "İşlemci", c: "Bilgisayarın beyni" },
    { a: "Donanım", c: "Bilgisayarın elle dokunabildiğimiz parçaları" },
    { a: "Yazılım", c: "Bilgisayara ne yapacağını söyleyen programlar" },
    { a: "Pardus", c: "Türkiye'de geliştirilen işletim sistemi" },
    { a: "Fare", c: "İmleci hareket ettirdiğimiz giriş birimi" },
    { a: "Bayt", c: "8 bitin bir araya gelmesiyle oluşan birim" }
  ],

  assessment: {
    tool: "Kontrol listesi",
    items: [
      "Donanım ve yazılıma birer örnek verir. (a)",
      "Giriş, çıkış ve depolama birimlerini doğru gruplandırır. (a)",
      "İşletim sisteminin görevini kendi cümleleriyle açıklar. (a)",
      "Bir işlem için Giriş → İşlem → Çıkış sırasını doğru kurar. (b)"
    ]
  },

  flow: [
    { part: "1. ders" },
    { m: 5, h: "Giriş", d: "Bankamatik sorusuyla dikkat çekme. Öğrencilerin bildiği bilgisayar parçalarını tahtaya yazma." },
    { m: 20, h: "Slayt", d: "Donanım, yazılım, işletim sistemi, giriş, çıkış, işlem ve depolama birimleri." },
    { m: 10, h: "Deftere Yaz", d: "Öğrenciler 5 maddeyi defterlerine geçirir." },
    { m: 5, h: "Sınıflandırma oyunu", d: "Gönüllülerle tahtada ya da bireysel olarak." },
    { part: "2. ders" },
    { m: 5, h: "Tekrar", d: "Giriş → İşlem → Çıkış zincirini sınıfça bir örnekle hatırlama." },
    { m: 20, h: "Etkinlik", d: "Sınıf ortamına göre seçilen etkinlik." },
    { m: 5, h: "Farklılaştırma", d: "Destekleme ve zenginleştirme kartları." },
    { m: 10, h: "Mini test ve bulmaca", d: "Kapanış ve kontrol listesiyle değerlendirme." }
  ],

  teacherNotes: [
    "Okulda bilgisayar yoksa Öğretmen Masası'ndan Bilgisayarsız ortamı seçin ve çalışma kâğıdını önceden yazdırın.",
    "Etkileşimli tahtalarda (ETAP) Pardus yüklüdür. İşletim sistemi örneği olarak tahtanın kendisini gösterebilirsiniz.",
    "Bit ve bayt konusu bu derste sadece tanıtılır. Piksel ve sıkıştırma örnekleri Dosya ve Klasör Yönetimi dersinde tekrar edilir.",
    "Kasa açılarak iç parçalar gösterilecekse öğretmen gözetiminde ve elektrik bağlantısı kesik olarak yapılmalıdır."
  ]
});
