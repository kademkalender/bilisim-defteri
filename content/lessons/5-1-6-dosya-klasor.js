/* 5. Sınıf · Tema 1 · BTY.5.1.6 Dosya ve klasör yönetimi ile ilgili temel işlemlerle çalışabilme
   Süreç bileşenleri: a) temel işlemleri belirler  b) bu işlemleri kullanır  c) sıkıştırmayı verimlilik kapsamında değerlendirir */
BD.lesson({
  id: "5-1-6-dosya-klasor",
  grade: "5", theme: 1, week: 8,
  title: "Dosya ve Klasör Yönetimi",
  outcome: "BTY.5.1.6",
  covers: ["a", "b", "c"],
  duration: "2 ders saati (40+40 dk)",
  hook: "Bir kütüphanede bütün kitaplar yere karışık atılmış olsaydı aradığın kitabı nasıl bulurdun? Raflar ve etiketler olmasaydı ne olurdu? Bilgisayarda da dosyaları düzenli tutmazsak aynı şey olur.",

  slides: [
    { type: "title", pill: "5. sınıf · 8. hafta", h: "Dosya ve Klasör Yönetimi", p: "Bilgisayarımızı nasıl düzenli tutarız?" },
    { img: "ornek-01.png", alt: "Masaüstünde karışık duran, türlerine göre gruplanmamış, üst üste dağılmış dosyalar (geçici örnek görsel)." },
    { emoji: "📄", h: "Dosya nedir?", p: "Bilgisayarda kaydettiğimiz her bilgi bir dosyadır: bir resim, bir şarkı, bir yazı.", b: "a" },
    { emoji: "📁", h: "Klasör nedir?", p: "Klasör, dosyaları düzenli saklamak için kullandığımız bir raftır. Bir klasörün içinde başka klasörler de olabilir.", b: "a" },
    { h: "Dosya uzantıları", p: "Dosya adında noktadan sonra gelen kısma uzantı denir. Uzantı dosyanın türünü gösterir.", cols: [
      { h: "Yazı", p: ".odt  .docx  .txt" },
      { h: "Resim", p: ".png  .jpg" },
      { h: "Ses", p: ".mp3  .ogg" },
      { h: "Sıkıştırılmış", p: ".zip" }
    ], b: "a" },
    { h: "Temel işlemler", list: ["Oluştur: yeni klasör aç", "Yeniden adlandır: adını değiştir (F2)", "Kopyala: aynısından bir tane daha yap", "Taşı: yerini değiştir", "Sil: Çöp Kutusu'na gönder", "Ara: adını yazarak bul"], b: "a" },
    { h: "Düzenli bir klasör örneği", p: "İpucu: Kısa ve anlaşılır isim ver. Boşluk yerine _ kullanabilirsin.", side: "ornek-02.png", alt: "Düzenli bir klasör ağacı: üstte 5A_Ayse ana klasörü, altında Resimler, Yazilar ve Sesler adında üç alt klasör (geçici örnek görsel).", b: "b" },
    { emoji: "🎒", h: "Sıkıştırma nedir?", p: "Kıyafetleri çantaya katlayarak koyarsak daha az yer kaplar. Sıkıştırma da dosyaların kapladığı alanı küçültür. Birçok dosyayı tek bir .zip dosyasında toplar.", b: "c" },
    { h: "Ne zaman sıkıştırmalıyız?", cols: [
      { h: "Sıkıştır 👍", p: "Birçok dosyayı birlikte göndereceğin zaman. Bilgisayarda yer azaldığında. Eski dosyaları saklarken." },
      { h: "Sıkıştırma 👎", p: "Her gün kullandığın bir dosyayı. Her seferinde açmak zaman kaybettirir." }
    ], b: "c" },
    { emoji: "✏️", h: "Sıra sende!", p: "Deftere Yaz kısmını defterine geçir, sonra etkinliğe başla.", end: true }
  ],

  notebook: [
    { t: "<mark>Dosya</mark>: Bilgisayarda kaydettiğimiz her bilgidir (resim, ses, yazı). <mark>Klasör</mark>: Dosyaları düzenli saklamak için kullandığımız raftır.", b: "a" },
    { t: "<mark>Uzantı</mark>: Dosya adında noktadan sonra gelen kısımdır. Dosyanın türünü gösterir. Örnek: .odt yazı, .png resim, .mp3 ses.", b: "a" },
    { t: "Temel işlemler: <mark>oluştur, yeniden adlandır, kopyala, taşı, sil, ara</mark>. Kopyalayınca dosya iki tane olur, taşıyınca yeri değişir.", b: "a" },
    { t: "Dosyalara <mark>kısa ve anlaşılır</mark> isimler veririz. Örnek: 5A_Ayse_Odev1.odt", b: "b" },
    { t: "<mark>Sıkıştırma</mark> dosyaların kapladığı alanı küçültür (.zip). Göndermek ve saklamak için kullanılır. Her gün kullandığımız dosyalar için gerekmez.", b: "c" }
  ],

  sort: {
    title: "Masaüstünü toparla!",
    intro: "Dosyaları uzantılarına bakarak doğru klasöre yerleştir.",
    b: "b",
    cats: ["📁 Yazilar", "📁 Resimler", "📁 Sesler"],
    items: [
      { t: "odev1.odt", c: 0 }, { t: "siir.txt", c: 0 }, { t: "rapor.docx", c: 0 },
      { t: "kedim.png", c: 1 }, { t: "tatil.jpg", c: 1 }, { t: "logo.png", c: 1 },
      { t: "sarki.mp3", c: 2 }, { t: "kayit.ogg", c: 2 }, { t: "zil.mp3", c: 2 }
    ]
  },

  // Sanal masaüstü: laboratuvar ve tahtada etkinliğin başında açılır. Yazım kuralları: ICERIK-REHBERI.md
  sim: {
    start: {
      "odev1.odt": 18432, "siir.txt": 6144, "notlar.txt": 9216, "taslak_eski.txt": 5120,
      "kedim.png": 839680, "tatil.jpg": 1468006, "sarki.mp3": 3355443, "kayit.ogg": 1153433
    },
    tasks: [
      { id: "ana", b: "a", op: ["mkdir", "rename"],
        text: "Masaüstünde yeni bir klasör oluştur. Adı sınıfın, şuben ve adın olsun. Örnek: 5A_Ayse",
        check: { type: "exists", path: "Masaüstü/*", kind: "folder", format: "ogrenci", as: "ana" },
        hint: { windows: "Masaüstünde boş bir yere sağ tıkla → Yeni → Klasör. Adını yaz ve Enter'a bas. Klavyeyle: Shift + F10 → Yeni → Klasör.", pardus: "Masaüstünde boş bir yere sağ tıkla → Klasör Oluştur…. Adını yaz ve Enter'a bas. Klavyeyle: Shift + F10 → Klasör Oluştur…." },
        show: "Masaüstü",
        success: "Klasörün hazır! Dosyalarını burada toplayacaksın." },
      { id: "alt", b: "b",
        text: "{ana} klasörünün içine Yazilar, Resimler ve Sesler adında 3 klasör oluştur.",
        check: { type: "all", of: [
          { type: "exists", path: "Masaüstü/{ana}/Yazilar", kind: "folder" },
          { type: "exists", path: "Masaüstü/{ana}/Resimler", kind: "folder" },
          { type: "exists", path: "Masaüstü/{ana}/Sesler", kind: "folder" }] },
        hint: "{ana} klasörünü çift tıklayarak aç. İçinde boş bir yere sağ tıkla ve yeni klasör oluştur (klavyeyle Shift + F10). Bunu üç kez yap.",
        show: "Masaüstü/{ana}",
        success: "Klasör içinde klasör: tıpkı bir raftaki bölmeler gibi!" },
      { id: "tasi", b: "b",
        text: "Dosyaları uzantılarına göre taşı: yazılar (.txt .odt) Yazilar'a, resimler (.png .jpg) Resimler'e, sesler (.mp3 .ogg) Sesler'e.",
        check: { type: "all", of: [
          { type: "allIn", ext: ["txt", "odt", "docx"], to: "Masaüstü/{ana}/Yazilar" },
          { type: "allIn", ext: ["png", "jpg"], to: "Masaüstü/{ana}/Resimler" },
          { type: "allIn", ext: ["mp3", "ogg"], to: "Masaüstü/{ana}/Sesler" }] },
        hint: "Dosyayı sürükleyip doğru klasörün üstüne bırak. Ya da dosyaya sağ tıkla → Kes, sonra klasörü açıp boş bir yere sağ tıkla → Yapıştır.",
        show: "Masaüstü/{ana}",
        success: "Masaüstün toparlandı! Her dosya türüne göre kendi klasöründe." },
      { id: "ad", b: "b",
        text: "Resimler klasöründeki kedim.png dosyasının adını {ana}_Resim1 yap.",
        check: { type: "exists", path: "Masaüstü/{ana}/Resimler/{ana}_Resim1.png", kind: "file" },
        hint: { windows: "Dosyayı seç ve F2'ye bas ya da sağ tıkla → Yeniden adlandır. Uzantıya (.png) dokunma.", pardus: "Dosyayı seç ve F2'ye bas ya da sağ tıkla → Yeniden Adlandır…. Uzantıya (.png) dokunma." },
        show: "Masaüstü/{ana}/Resimler/kedim.png",
        success: "Artık dosyanın adı ne olduğunu ve kimin olduğunu söylüyor." },
      { id: "kopya", b: "a", op: "copy",
        text: "Yazilar klasöründeki siir.txt dosyasını masaüstüne kopyala.",
        check: { type: "all", of: [
          { type: "exists", path: "Masaüstü/siir.txt", kind: "file" },
          { type: "exists", path: "Masaüstü/{ana}/Yazilar/siir.txt", kind: "file" }] },
        hint: "siir.txt dosyasına sağ tıkla → Kopyala. Sonra masaüstünde boş bir yere sağ tıkla → Yapıştır.",
        show: "Masaüstü/{ana}/Yazilar/siir.txt",
        success: "Şimdi siir.txt iki yerde var: Yazilar'da ve masaüstünde. Taşısaydın tek yerde kalırdı. Kopyalamakla taşımanın farkı bu." },
      { id: "sil", b: "a", op: ["delete", "open"],
        text: "Yazilar klasöründeki taslak_eski.txt dosyasını sil. Sonra {cop}'nu açıp içine bak.",
        check: { type: "all", of: [
          { type: "inTrash", name: "taslak_eski.txt" },
          { type: "ui", key: "opened", value: "@trash" }] },
        hint: "Dosyayı seç ve Delete tuşuna bas ya da sağ tıkla → Sil. Sonra masaüstündeki {cop} simgesini çift tıkla.",
        show: "Masaüstü/{ana}/Yazilar/taslak_eski.txt",
        success: "Silinen dosya hemen yok olmaz, {cop}'nda bekler. Yanlışlıkla silersen geri yükleyebilirsin." },
      { id: "zip", b: "c",
        text: "{ana} klasörünü sıkıştır.",
        check: { type: "exists", path: "Masaüstü/{ana}.zip", kind: "zip" },
        hint: { windows: "{ana} klasörüne sağ tıkla → ZIP dosyasına sıkıştır.", pardus: "{ana} klasörüne sağ tıkla → Sıkıştır…." },
        show: "Masaüstü/{ana}",
        success: "Sıkıştırdın! Şimdi {ana}.zip dosyasını çift tıklayıp aç ve boyutlara bak." },
      { id: "kiyas", b: "c",
        text: "{ana}.zip dosyasını aç ve boyutları karşılaştır. En çok hangi dosyalar küçüldü?",
        check: { type: "answer", options: ["Resimler (.png .jpg)", "Düz yazı dosyaları (.txt)", "Ses dosyaları (.mp3 .ogg)"], correct: 1 },
        hint: "Zip dosyasını çift tıkla. Tablonun son sütunundaki \"% küçüldü\" yazısına bak.",
        show: "Masaüstü/{ana}.zip",
        success: "Doğru! Düz yazı çok küçülür. Resim ve ses dosyaları zaten sıkıştırılmış biçimlerdir, pek küçülmez. Sıkıştırma en çok, birçok dosyayı birlikte gönderirken işe yarar." }
    ],
    // Testler ve doğrulayıcı bu adımları oynatıp bütün görevlerin bittiğini kontrol eder.
    solution: [
      ["mkdir", "Masaüstü", "5A_Ayse"],
      ["mkdir", "Masaüstü/5A_Ayse", "Yazilar"], ["mkdir", "Masaüstü/5A_Ayse", "Resimler"], ["mkdir", "Masaüstü/5A_Ayse", "Sesler"],
      ["move", "Masaüstü/odev1.odt", "Masaüstü/5A_Ayse/Yazilar"], ["move", "Masaüstü/siir.txt", "Masaüstü/5A_Ayse/Yazilar"],
      ["move", "Masaüstü/notlar.txt", "Masaüstü/5A_Ayse/Yazilar"], ["move", "Masaüstü/taslak_eski.txt", "Masaüstü/5A_Ayse/Yazilar"],
      ["move", "Masaüstü/kedim.png", "Masaüstü/5A_Ayse/Resimler"], ["move", "Masaüstü/tatil.jpg", "Masaüstü/5A_Ayse/Resimler"],
      ["move", "Masaüstü/sarki.mp3", "Masaüstü/5A_Ayse/Sesler"], ["move", "Masaüstü/kayit.ogg", "Masaüstü/5A_Ayse/Sesler"],
      ["rename", "Masaüstü/5A_Ayse/Resimler/kedim.png", "5A_Ayse_Resim1.png"],
      ["copy", "Masaüstü/5A_Ayse/Yazilar/siir.txt", "Masaüstü"],
      ["delete", "Masaüstü/5A_Ayse/Yazilar/taslak_eski.txt"], ["open", "@trash"],
      ["zip", "Masaüstü/5A_Ayse"], ["open", "Masaüstü/5A_Ayse.zip"], ["answer", "kiyas", 1]
    ]
  },

  activities: {
    lab: {
      title: "Kendi klasör düzenimi kuruyorum",
      goal: "Kendi klasörünü oluştur, içine dosya kaydet, dosyaları düzenle ve klasörünü sıkıştır.",
      needs: ["Her öğrenciye ya da her iki öğrenciye bir bilgisayar"],
      b: ["a", "b", "c"],
      steps: [
        { t: "Masaüstünde yeni bir klasör oluştur ve adını SınıfınŞuben_Adın yap. Örnek: 5A_Ayse", pardus: "Masaüstünde boş bir yere sağ tıkla → Klasör Oluştur", windows: "Masaüstünde boş bir yere sağ tıkla → Yeni → Klasör" },
        "Bu klasörün içine Resimler, Yazilar ve Sesler adında 3 klasör daha oluştur.",
        { t: "Bir yazı programında \"Bugün dosya ve klasör yönetimini öğrendim.\" yaz ve Yazilar klasörüne kaydet.", pardus: "LibreOffice Writer kullan. Dosyan .odt uzantılı olacak.", windows: "Not Defteri kullan. Dosyan .txt uzantılı olacak." },
        { t: "Bir resim programında basit bir çizim yap ve Resimler klasörüne kaydet.", pardus: "LibreOffice Draw kullan, PNG olarak dışa aktar.", windows: "Paint kullan, PNG olarak kaydet." },
        "Resminin adını kendi adınla değiştir. Örnek: 5A_Ayse_Resim1. Kısayol: dosyayı seç ve F2'ye bas.",
        "Yazı dosyanın bir kopyasını oluştur: Dosyayı seç, Ctrl + C, sonra Ctrl + V. Kaç dosya oldu?",
        "Kopyayı Sesler klasörüne taşı. Sonra kopyayı Çöp Kutusu'na gönder.",
        { t: "Ana klasörünü sıkıştır. Sonra iki dosyanın boyutunu karşılaştır: hangisi daha küçük?", pardus: "Klasöre sağ tıkla → Sıkıştır (ya da Arşiv Oluştur) → .zip seç. Boyut için: sağ tık → Özellikler", windows: "Klasöre sağ tıkla → Gönder → Sıkıştırılmış (zip) klasör (Windows 11: ZIP dosyasına sıkıştır). Boyut için: sağ tık → Özellikler" },
        "Öğretmenine klasörünü göster."
      ]
    },
    tahta: {
      title: "Masaüstünü birlikte toparlıyoruz",
      goal: "Dosya ve klasör işlemlerini tahtada sınıfça uygula, sıkıştırmanın ne zaman işe yaradığını tartış.",
      needs: ["Etkileşimli tahta ya da projeksiyon"],
      b: ["a", "b", "c"],
      steps: [
        "Öğretmen tahtada karışık bir masaüstü açar ya da 2. slaytı gösterir.",
        "Öğrenciler sırayla yönerge verir, öğretmen ya da gönüllü öğrenci uygular: \"Sağ tıkla, yeni klasör oluştur, adını Resimler yap.\"",
        "Yeniden adlandırma, kopyalama, taşıma ve silme işlemleri tahtada birer kez gösterilir.",
        "Gönüllüler sırayla tahtaya gelip aşağıdaki \"Masaüstünü toparla\" oyununu oynar.",
        "Öğretmen bir klasörü sıkıştırır ve önceki ile sonraki boyutu tahtada gösterir.",
        "Sınıfça tartışın: Hangi durumlarda sıkıştırmak işe yarar, hangi durumlarda zaman kaybettirir?"
      ]
    },
    kagit: {
      title: "Zarf klasörler",
      goal: "Kâğıt kartlar ve zarflarla dosya ve klasör düzenini canlandır.",
      needs: ["Yazdırılmış çalışma kâğıdı", "Grup başına 4 zarf ya da katlanmış A4", "Üzerine dosya adları yazılmış 9 küçük kart"],
      b: ["a", "b", "c"],
      steps: [
        "Gruplar 9 dosya kartını (odev1.odt, kedim.png, sarki.mp3 ...) karışık halde alır.",
        "Zarfların üstüne klasör adlarını yazın: Yazilar, Resimler, Sesler. Dördüncü zarfa grubunuzun adını yazın.",
        "Kartları uzantılarına bakarak doğru zarfa yerleştirin. Sonra üç zarfı grup zarfının içine koyun: işte klasör içinde klasör!",
        "Kopyalama ve taşımayı canlandırın: Bir kartın aynısını yazın (kopyala), bir kartı başka zarfa koyun (taşı).",
        "Sıkıştırmayı canlandırın: Bir A4 kâğıdını katlayarak küçültün. Ne kazandık, ne kaybettik? (Daha az yer kaplar ama açmak zaman alır.)",
        "Çalışma kâğıdındaki klasör ağacını doldurun."
      ],
      sheet: [
        { h: "1. Dosyaları uzantılarına göre doğru klasöre yaz", type: "table", head: ["Dosya", "Hangi klasör?"], rows: [["odev1.odt", ""], ["kedim.png", ""], ["sarki.mp3", ""], ["tatil.jpg", ""], ["kayit.ogg", ""], ["siir.txt", ""]] },
        { h: "2. Kendi klasör ağacını çiz: Ana klasör ve içinde 3 klasör", type: "box", height: 160 },
        { h: "3. Kopyalamak ile taşımak arasındaki fark nedir?", type: "lines", n: 2 },
        { h: "4. Sınıfın tüm resimlerini öğretmenine tek seferde göndereceksin. Sıkıştırmak işe yarar mı? Neden?", type: "lines", n: 2 }
      ]
    }
  },

  diff: {
    destek: { who: "Etkinlikte zorlanan öğrenciler için", items: ["Önce sadece ana klasörünü ve Resimler klasörünü oluştur.", "Uzantı eşleştirmesini sadece 3 türle yap: .odt, .png, .mp3", "Öğretmeninle birlikte bir dosyayı sürükleyerek klasöre taşı."] },
    zengin: { who: "Etkinliği erken bitiren öğrenciler için", items: ["Bir yazı dosyasını ve bir resim dosyasını ayrı ayrı sıkıştır. Hangisi daha çok küçüldü? Nedenini tahmin et.", "Yazilar klasörünün içine Tema1 ve Tema2 alt klasörleri aç.", "Arama özelliğini kullanarak bir dosyayı adının sadece bir kısmını yazıp bul."] }
  },

  quiz: [
    { q: "Aşağıdakilerden hangisi bir ses dosyasıdır?", o: ["tatil.png", "kayit.ogg", "odev.odt"], a: 1, b: "a", hint: "Uzantıya bak: noktadan sonra gelen kısım dosyanın türünü söyler.", why: ".ogg bir ses dosyasıdır. .png resim, .odt yazı dosyasıdır." },
    { q: "Bir dosyayı kopyalayınca ne olur?", o: ["Dosya silinir", "Dosyanın aynısından bir tane daha oluşur", "Dosyanın yeri değişir"], a: 1, b: "a", hint: "Kopyalamak ile kesmek arasındaki farkı düşün.", why: "Kopyalayınca dosya yerinde kalır ve aynısından bir tane daha oluşur." },
    { q: "Hangisi daha iyi bir dosya adıdır?", o: ["asdfgh.png", "yeni yeni son1.png", "5A_Ali_Resim1.png"], a: 2, b: "b", hint: "Dosyanın içinde ne olduğu adından anlaşılmalı.", why: "5A_Ali_Resim1.png kimin ve ne olduğunu söyler. Diğer adlar bir şey anlatmaz." },
    { q: "Odev1.odt dosyası Masaüstünde duruyor. Onu Yazilar klasörüne koymak istiyorsun. Masaüstünde kalmamalı. Hangi işlemi yaparsın?", o: ["Taşı", "Kopyala", "Yeniden adlandır"], a: 0, b: "b", hint: "Dosya iki tane mi olmalı, yoksa sadece yeri mi değişmeli? Deftere yaz bölümünün 3. maddesine bak.", why: "Taşıyınca dosyanın yeri değişir ve Masaüstünde kalmaz. Kopyalasaydın iki tane olurdu." },
    { q: "Hangi durumda dosyaları sıkıştırmak en çok işe yarar?", o: ["Her gün açtığımız bir dosyada", "Çok sayıda dosyayı tek seferde gönderirken", "Dosyanın adını değiştirirken"], a: 1, b: "c", why: "Sıkıştırma göndermeyi ve saklamayı kolaylaştırır. Sık kullanılan dosyada ise her seferinde açmak zaman kaybettirir.", hint: "Sıkıştırınca birçok dosya tek bir dosyaya dönüşür." }
  ],

  crossword: [
    { a: "Dosya", c: "Bilgisayarda kaydettiğimiz resim, ses ya da yazı" },
    { a: "Klasör", c: "Dosyaları içinde düzenli sakladığımız raf" },
    { a: "Uzantı", c: "Dosya adında noktadan sonra gelen, türünü gösteren kısım" },
    { a: "Kaydet", c: "Çalışmamızın kaybolmaması için yaptığımız işlem" },
    { a: "Kopyala", c: "Bir dosyanın aynısından bir tane daha oluşturmak" },
    { a: "Masaüstü", c: "Bilgisayar açılınca karşımıza çıkan ilk ekran" },
    { a: "Taşı", c: "Dosyayı bir klasörden alıp başka bir klasöre götürmek" },
    { a: "Sıkıştırma", c: "Dosyaların kapladığı alanı küçültme işlemi" }
  ],

  assessment: {
    tool: "Kontrol listesi",
    items: [
      "Dosya ve klasör kavramlarını ayırt eder. (a)",
      "Verilen uzantıların dosya türünü doğru söyler. (a)",
      "Klasör oluşturur, yeniden adlandırır, kopyalar, taşır ve siler. (b)",
      "Dosyalarına anlaşılır isimler verir ve doğru klasöre kaydeder. (b)",
      "Sıkıştırmanın hangi durumda işe yaradığını gerekçesiyle açıklar. (c)"
    ]
  },

  flow: [
    { part: "1. ders" },
    { m: 5, h: "Giriş", d: "Kütüphane sorusu ve karışık masaüstü slaytı ile dikkat çekme." },
    { m: 20, h: "Slayt", d: "Dosya, klasör, uzantı ve temel işlemler. İşlemler tahtada canlı gösterilir." },
    { m: 10, h: "Deftere Yaz", d: "Öğrenciler 5 maddeyi defterlerine geçirir." },
    { m: 5, h: "Masaüstünü toparla", d: "Sınıflandırma oyunu." },
    { part: "2. ders" },
    { m: 25, h: "Etkinlik", d: "Sınıf ortamına göre seçilen etkinlik. Sıkıştırma adımı mutlaka yapılır." },
    { m: 5, h: "Farklılaştırma", d: "Destekleme ve zenginleştirme kartları." },
    { m: 10, h: "Mini test ve bulmaca", d: "Sıkıştırmanın verimliliği üzerine kısa tartışmayla kapanış." }
  ],

  teacherNotes: [
    "Okul bilgisayarlarında Derin Dondurucu ya da benzeri bir program varsa öğrenci dosyaları yeniden başlatınca silinir. Etkinliği aynı derste bitirin.",
    "Pardus'ta varsayılan yazı biçimi .odt, Windows'ta Not Defteri ile .txt olur. Uzantı farkını öğrencilere fırsat olarak gösterin.",
    "Sıkıştırmada düz metin (.txt) dosyaları çok küçülür. .odt, .docx, .png, .jpg ve ses dosyaları pek küçülmez, çünkü bu biçimler zaten sıkıştırılmıştır. Sanal masaüstündeki zip tablosu bu farkı gösterir, zenginleştirme etkinliğinde tartışılabilir.",
    "Öğrencilerin klasör adlarında Türkçe karakter ve boşluk kullanmamaları ileride sorun yaşamamaları için önerilir."
  ]
});
