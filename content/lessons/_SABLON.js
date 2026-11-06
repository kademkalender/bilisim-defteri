/* =====================================================================
   YENİ DERS ŞABLONU
   1) Bu dosyayı kopyalayın, adını ders id'siyle aynı yapın: 5-1-1-bilisim-teknolojileri.js
   2) Aşağıdaki alanları doldurun. Her şey bir öğrenme çıktısına ve süreç bileşenine bağlı olmalı.
   3) index.html'deki "Dersler" bölümüne bir <script> satırı ekleyin.
   4) content/plan.js'te ilgili haftanın lesson alanına bu id'yi yazın.
   Ayrıntılı kurallar: ICERIK-REHBERI.md
   ===================================================================== */
BD.lesson({
  id: "5-1-1-ornek",                 // dosya adıyla aynı, Türkçe karakter ve boşluk yok
  grade: "5", theme: 1, week: 1,     // sınıf (metin), tema no, hafta no
  title: "Ders Başlığı",
  outcome: "BTY.5.1.1",              // program.js'teki kod
  covers: ["a", "b"],                // bu dersin işlediği süreç bileşenleri
  duration: "2 ders saati (40+40 dk)",
  hook: "Derse başlarken sorulacak, öğrencinin günlük hayatından bir soru.",

  // Slaytlar. b: hangi süreç bileşenine hizmet ettiği. Son slayt end: true (yazdırmada atlanır).
  // Kullanılabilecek alanlar: emoji, h (başlık), p (paragraf), list (madde listesi),
  // cols ([{h, p}] iki ya da dört kutu), tree (eş aralıklı metin: klasör ağacı, akış)
  // Tahmin et slaytı: reveal (cevap). Önce h ve p ile soru görünür, "Cevabı göster" düğmesi cevabı açar.
  // Görsel (isteğe bağlı, Canva/PowerPoint'ten 1600x900 PNG — bkz. ICERIK-REHBERI.md):
  //   Tam görsel slayt: { img: "01.png", alt: "Ekran okuyucu için açıklama", b: "a" }
  //   Metin + yan görsel: mevcut alanlarla birlikte { side: "02.png", alt: "..." }
  //   Görseller content/img/<ders-id>/ klasöründe durur. alt zorunludur, doğrulayıcı kontrol eder.
  slides: [
    { type: "title", pill: "5. sınıf · 1. hafta", h: "Ders Başlığı", p: "Dersin ana sorusu" },
    { emoji: "💡", h: "Kavram", p: "Kısa ve 10-11 yaşına uygun açıklama.", b: "a" },
    { h: "Örnekler", list: ["Birinci örnek", "İkinci örnek"], b: "b" },
    { emoji: "❓", h: "Tahmin et!", p: "Sınıfa sorulacak soru?", reveal: "Cevap ve kısa açıklama.", b: "b" },
    { emoji: "✏️", h: "Sıra sende!", p: "Deftere Yaz kısmını defterine geçir, sonra etkinliğe başla.", end: true }
  ],

  // İsteğe bağlı: internet olmadan araştırma için bilgi kartları
  // infoCards: [{ h: "Başlık", p: "2-3 cümlelik bilgi" }],

  // Deftere yaz: 3-5 madde. Önemli kavramlar <mark>...</mark> içinde.
  notebook: [
    { t: "<mark>Kavram</mark>: Tanım.", b: "a" }
  ],

  // İsteğe bağlı sınıflandırma oyunu (laboratuvar ve etkileşimli tahtada görünür). c: cats dizisindeki sıra no.
  sort: {
    title: "Oyunun adı", intro: "Kısa yönerge.", b: "b",
    cats: ["Grup 1", "Grup 2"],
    items: [{ t: "Kart 1", c: 0 }, { t: "Kart 2", c: 1 }]
  },

  // İsteğe bağlı sanal masaüstü (lab'da ana etkinlik, tahtada tam genişlik). 5-8 görev, her görev tek işlem,
  // ipucu (hint) zorunlu, solution zorunlu. Kontrol türleri ve kurallar: ICERIK-REHBERI.md "Sanal masaüstü".
  // sim: {
  //   start: { "siir.txt": 6144, "kedim.png": 839680 },        // sayı: dosya boyutu (bayt), nesne: klasör
  //   tasks: [
  //     { id: "ana", b: "a", text: "Masaüstünde 5A_Ayşe gibi adını taşıyan bir klasör oluştur.",
  //       check: { type: "exists", path: "Masaüstü/*", kind: "folder", format: "ogrenci", as: "ana" },
  //       hint: { windows: "Boş yere sağ tıkla → Yeni → Klasör", pardus: "Boş yere sağ tıkla → Klasör Oluştur…" },
  //       show: "Masaüstü", success: "Klasörün hazır!" },
  //     { id: "tasi", b: "b", text: "kedim.png dosyasını {ana} klasörüne taşı.",
  //       check: { type: "allIn", ext: ["png"], to: "Masaüstü/{ana}" },
  //       hint: "Dosyayı sürükleyip klasörün üstüne bırak.", show: "Masaüstü/kedim.png" }
  //   ],
  //   solution: [["mkdir", "Masaüstü", "5A_Ayşe"], ["move", "Masaüstü/kedim.png", "Masaüstü/5A_Ayşe"]]
  // },

  // ÜÇ ORTAMIN ÜÇÜ DE ZORUNLU. Hiçbir etkinlik internet gerektirmemeli.
  // Bilgisayar adımlarında Pardus ve Windows yönergesini ayrı yazın: { t, pardus, windows }
  activities: {
    lab: {
      title: "", goal: "", needs: ["Her öğrenciye ya da her iki öğrenciye bir bilgisayar"], b: ["a", "b"],
      steps: ["Adım 1", { t: "Programı aç.", pardus: "Menü → Ofis → LibreOffice Writer", windows: "Başlat → Not Defteri" }],
      online: "İsteğe bağlı: internet varsa yapılabilecek ek araştırma (yoksa bu alanı silin)."
    },
    tahta: {
      title: "", goal: "", needs: ["Etkileşimli tahta ya da projeksiyon"], b: ["a", "b"],
      steps: ["Öğretmenle birlikte yapılan adımlar"]
    },
    kagit: {
      title: "", goal: "", needs: ["Yazdırılmış çalışma kâğıdı"], b: ["a", "b"],
      steps: ["Kâğıt, kalem ve kartlarla yapılan adımlar"],
      // Çalışma kâğıdındaki görevler: table (head + rows), lines (n satır), box (çizim alanı)
      sheet: [
        { h: "1. Görev", type: "table", head: ["Sütun 1", "Sütun 2"], rows: [["", ""]] },
        { h: "2. Görev", type: "lines", n: 3 },
        { h: "3. Görev", type: "box", height: 150 }
      ]
    }
  },

  // Farklılaştırma: programdaki destekleme ve zenginleştirme önerilerinden yararlanın
  diff: {
    destek: { who: "Etkinlikte zorlanan öğrenciler için", items: [""] },
    zengin: { who: "Etkinliği erken bitiren öğrenciler için", items: [""] }
  },

  // Test: 3-5 soru, 3 seçenek. a: doğru seçeneğin sırası (0'dan başlar).
  // hint: ilk yanlışta görünen ipucu, cevabı söylemez. why: ikinci yanlışta doğru cevapla görünen neden.
  quiz: [
    { q: "Soru?", o: ["Seçenek A", "Seçenek B", "Seçenek C"], a: 0, b: "a", hint: "Nereye bakacağını söyleyen ipucu.", why: "Doğru cevabın tek cümlelik nedeni." }
  ],

  // Bulmaca: 6-8 kelime. Izgara otomatik oluşur. Boşluklu kelime kullanmayın.
  crossword: [
    { a: "Kelime", c: "İpucu" }
  ],

  assessment: { tool: "Kontrol listesi", items: ["Ölçüt (a)"] },

  // Ders akışı: toplam 80 dk
  flow: [
    { part: "1. ders" },
    { m: 5, h: "Giriş", d: "" },
    { part: "2. ders" },
    { m: 10, h: "Kapanış", d: "" }
  ],

  teacherNotes: [""]
});
