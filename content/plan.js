/* =====================================================================
   HAFTALIK PLAN
   Her hafta 2 ders saati (40+40 dk). Temanın hafta sayısı programdaki ders saatinin yarısı (68 saat, 34 hafta).
   Hafta numaraları, başlıkları ve kazanım dağılımı MEB'den gelmez, ÖRNEKTİR:
   rehber öğretmenin yıllık planına göre güncellenecek.
   lesson: hazır ders dosyasının id'si (content/lessons/ içinde). null ise "Yakında".
   outcome: haftanın bağlı olduğu öğrenme çıktısı (program.js'teki code).
   also: saat az olduğu için aynı haftaya düşen diğer öğrenme çıktıları.
   ===================================================================== */
window.BD = window.BD || { lessons: {} };

BD.plan = {
  "5": [
    { w: 1, theme: 1, outcome: "BTY.5.1.1", title: "Bilişim Teknolojilerini Tanıyalım", lesson: "5-1-1-bilisim-teknolojileri" },
    { w: 2, theme: 1, outcome: "BTY.5.1.2", title: "Bilişim Teknolojilerinin Etkileri ve Dijital Sağlık", lesson: "5-1-2-etkiler-dijital-saglik" },
    { w: 3, theme: 1, outcome: "BTY.5.1.3", title: "Dijital Vatandaşlık", lesson: "5-1-3-dijital-vatandaslik" },
    { w: 4, theme: 1, outcome: "BTY.5.1.4", title: "Yapay Zekâ ile Tanışalım", lesson: "5-1-4-yapay-zeka" },
    { w: 5, theme: 1, outcome: "BTY.5.1.5", title: "Bilgisayar Sistemleri", lesson: "5-1-5-bilgisayar-sistemleri" },
    { w: 6, theme: 1, outcome: "BTY.5.1.5", title: "İşletim Sistemi ve Bilgisayar Sorunları", lesson: "5-1-5-isletim-sistemi-sorunlar" },
    { w: 7, theme: 1, outcome: "BTY.5.1.6", title: "Dosya ve Klasör Yönetimi", lesson: "5-1-6-dosya-klasor" },
    { w: 8, theme: 2, outcome: "BTY.5.2.1", title: "Görsel Düzenleme Programları", lesson: null },
    { w: 9, theme: 2, outcome: "BTY.5.2.2", title: "Görsel İçin Hikâye Kurgulayalım", lesson: null },
    { w: 10, theme: 2, outcome: "BTY.5.2.3", title: "Görselimizi Oluşturalım", lesson: null },
    { w: 11, theme: 2, outcome: "BTY.5.2.4", also: ["BTY.5.2.5"], title: "Kelime İşlemci ile Belge Hazırlayalım", lesson: null },
    { w: 12, theme: 2, outcome: "BTY.5.2.6", title: "Sunum Programları", lesson: null },
    { w: 13, theme: 2, outcome: "BTY.5.2.7", title: "Sunumumuzu Hazırlayalım", lesson: null },
    { w: 14, theme: 3, outcome: "BTY.5.3.1", title: "Bilgisayar Ağları ve Bileşenleri", lesson: null },
    { w: 15, theme: 3, outcome: "BTY.5.3.2", title: "Ağa Bağlanma Yöntemleri", lesson: null },
    { w: 16, theme: 3, outcome: "BTY.5.3.3", title: "İnternette Doğru Bilgiye Ulaşalım", lesson: null },
    { w: 17, theme: 4, outcome: "BTY.5.4.1", title: "Bilişim Etiği", lesson: null },
    { w: 18, theme: 4, outcome: "BTY.5.4.2", title: "Dijital Ortamlarda Gizlilik ve Güvenlik", lesson: null },
    { w: 19, theme: 5, outcome: "BTY.5.5.1", title: "Yapay Zekâ Uygulamalarını Tanıyalım", lesson: null },
    { w: 20, theme: 5, outcome: "BTY.5.5.1", title: "Yapay Zekâ Uygulamaları Nasıl Çalışır?", lesson: null },
    { w: 21, theme: 5, outcome: "BTY.5.5.2", title: "Yapay Zekâda Etik ve Güvenlik Riskleri", lesson: null },
    { w: 22, theme: 5, outcome: "BTY.5.5.2", title: "Yapay Zekâ Uygulamalarını Değerlendirelim", lesson: null },
    { w: 23, theme: 6, outcome: "BTY.5.6.1", title: "Problemi Belirleyelim: Girdi ve Çıktı", lesson: null },
    { w: 24, theme: 6, outcome: "BTY.5.6.1", title: "İşlem Adımları ve Algoritma", lesson: null },
    { w: 25, theme: 6, outcome: "BTY.5.6.1", title: "Akış Şeması", lesson: null },
    { w: 26, theme: 6, outcome: "BTY.5.6.2", title: "Algoritmayı Test Edelim, Hatayı Ayıklayalım", lesson: null },
    { w: 27, theme: 6, outcome: "BTY.5.6.3", title: "Yazılım Geliştirme Sürecinin Bileşenleri", lesson: null },
    { w: 28, theme: 6, outcome: "BTY.5.6.3", title: "Değişken ve Operatörler", lesson: null },
    { w: 29, theme: 6, outcome: "BTY.5.6.3", title: "Karar ve Döngü", lesson: null },
    { w: 30, theme: 6, outcome: "BTY.5.6.4", title: "Blok Tabanlı Proje: Planlama", lesson: null },
    { w: 31, theme: 6, outcome: "BTY.5.6.4", title: "Blok Tabanlı Proje: Tasarım", lesson: null },
    { w: 32, theme: 6, outcome: "BTY.5.6.4", title: "Blok Tabanlı Proje: Oluşturma 1", lesson: null },
    { w: 33, theme: 6, outcome: "BTY.5.6.4", title: "Blok Tabanlı Proje: Oluşturma 2", lesson: null },
    { w: 34, theme: 6, outcome: "BTY.5.6.4", title: "Blok Tabanlı Proje: Değerlendirme", lesson: null }
  ],
  "6": [
    { w: 1, theme: 1, outcome: "BTY.6.1.1", title: "Yenilikçi Bilişim Teknolojileri", lesson: "6-1-1-yenilikci-bt" },
    { w: 2, theme: 1, outcome: "BTY.6.1.2", title: "Bilişim Teknolojilerinin Geleceği", lesson: null },
    { w: 3, theme: 2, outcome: "BTY.6.2.1", also: ["BTY.6.2.2"], title: "Tablolama Programları ve Veri Soruları", lesson: null },
    { w: 4, theme: 2, outcome: "BTY.6.2.3", also: ["BTY.6.2.4"], title: "Veri Toplama ve Tablolarla Analiz", lesson: null },
    { w: 5, theme: 2, outcome: "BTY.6.2.5", also: ["BTY.6.2.6"], title: "Ses Düzenleme ve Kurgu", lesson: null },
    { w: 6, theme: 2, outcome: "BTY.6.2.7", title: "Ses Dosyamızı Oluşturalım", lesson: null },
    { w: 7, theme: 2, outcome: "BTY.6.2.8", also: ["BTY.6.2.9"], title: "Video Düzenleme ve Kurgu", lesson: null },
    { w: 8, theme: 2, outcome: "BTY.6.2.10", title: "Video Dosyamızı Oluşturalım", lesson: null },
    { w: 9, theme: 3, outcome: "BTY.6.3.1", title: "İleri Düzey İnternet Araması", lesson: null },
    { w: 10, theme: 3, outcome: "BTY.6.3.2", also: ["BTY.6.3.3"], title: "İletişim Teknolojileri ve E-posta", lesson: null },
    { w: 11, theme: 4, outcome: "BTY.6.4.1", also: ["BTY.6.4.2"], title: "Bilişim Suçları ve Telif Hakkı", lesson: null },
    { w: 12, theme: 4, outcome: "BTY.6.4.3", also: ["BTY.6.4.4"], title: "Siber Güvenlik ve Lisans Türleri", lesson: null },
    { w: 13, theme: 5, outcome: "BTY.6.5.1", title: "Yapay Zekâ Girdileri", lesson: null },
    { w: 14, theme: 5, outcome: "BTY.6.5.2", title: "Yapay Zekâ Aracı Seçelim", lesson: null },
    { w: 15, theme: 5, outcome: "BTY.6.5.2", title: "Yapay Zekâ Aracını Kullanalım", lesson: null },
    { w: 16, theme: 5, outcome: "BTY.6.5.3", title: "Yapay Zekâ Modeli Oluşturalım", lesson: null },
    { w: 17, theme: 5, outcome: "BTY.6.5.3", title: "Modeli Uygulayalım ve Değerlendirelim", lesson: null },
    { w: 18, theme: 6, outcome: "BTY.6.6.1", title: "Blok Tabanlı Ortamı Tanıyalım", lesson: null },
    { w: 19, theme: 6, outcome: "BTY.6.6.1", title: "Karakter Hareketleri ve Döngüler", lesson: null },
    { w: 20, theme: 6, outcome: "BTY.6.6.1", title: "Koşul Blokları ve Fonksiyonlar", lesson: null },
    { w: 21, theme: 6, outcome: "BTY.6.6.2", title: "Yazılım Projesi: Planlama", lesson: null },
    { w: 22, theme: 6, outcome: "BTY.6.6.2", title: "Yazılım Projesi: Tasarım", lesson: null },
    { w: 23, theme: 6, outcome: "BTY.6.6.2", title: "Yazılım Projesi: Oluşturma 1", lesson: null },
    { w: 24, theme: 6, outcome: "BTY.6.6.2", title: "Yazılım Projesi: Oluşturma 2", lesson: null },
    { w: 25, theme: 6, outcome: "BTY.6.6.2", title: "Yazılım Projesi: Oluşturma 3", lesson: null },
    { w: 26, theme: 6, outcome: "BTY.6.6.2", title: "Yazılım Projesi: Hata Ayıklama", lesson: null },
    { w: 27, theme: 6, outcome: "BTY.6.6.2", title: "Yazılım Projesi: Değerlendirme", lesson: null },
    { w: 28, theme: 6, outcome: "BTY.6.6.3", title: "Yapay Zekâ Destekli Ürün: Gereksinimler", lesson: null },
    { w: 29, theme: 6, outcome: "BTY.6.6.3", title: "Yapay Zekâ Destekli Ürün: Araç Gereç Seçimi", lesson: null },
    { w: 30, theme: 6, outcome: "BTY.6.6.3", title: "Yapay Zekâ Destekli Ürün: Oluşturma 1", lesson: null },
    { w: 31, theme: 6, outcome: "BTY.6.6.3", title: "Yapay Zekâ Destekli Ürün: Oluşturma 2", lesson: null },
    { w: 32, theme: 6, outcome: "BTY.6.6.3", title: "Yapay Zekâ Destekli Ürün: Oluşturma 3", lesson: null },
    { w: 33, theme: 6, outcome: "BTY.6.6.3", title: "Yapay Zekâ Destekli Ürün: Çalıştırma 1", lesson: null },
    { w: 34, theme: 6, outcome: "BTY.6.6.3", title: "Yapay Zekâ Destekli Ürün: Çalıştırma 2", lesson: null }
  ]
};

/* Okul takvimi: öğrenci ana sayfasındaki "Bu hafta" kartı bugünün kaçıncı öğretim haftası olduğunu buradan hesaplar (assets/hafta.js).
   Kaynak: MEB, "2026-2027 Eğitim Öğretim Yılı Takvimi Açıklandı"
   https://www.meb.gov.tr/2026-2027-egitim-ogretim-yili-takvimi-aciklandi/haber/41057/tr
   Her yıl yeni takvimle güncellenmeli. Tarihler YYYY-AA-GG. */
BD.calendar = {
  start: "2026-09-14", // birinci dönem başlangıcı
  end: "2027-06-25",   // ders yılı sonu
  breaks: [
    { from: "2026-11-16", to: "2026-11-20" }, // birinci dönem ara tatili
    { from: "2027-01-25", to: "2027-02-05" }, // yarıyıl tatili
    { from: "2027-03-08", to: "2027-03-12" }  // ikinci dönem ara tatili
  ]
};

/* Varsayılan ayarlar (Öğretmen Masası'ndan değiştirilebilir, tarayıcıda saklanır) */
BD.defaults = {
  role: null,        // ogrenci | ogretmen; boşsa ilk açılışta sorulur
  grade: "5",       // Ana sayfada seçili sınıf
  env: "lab",       // lab | tahta | kagit
  os: "pardus",     // pardus | windows
  internet: true,
  motion: "full"    // full | reduced (yavaş tahtalar için)
};

BD.envs = {
  lab:   { icon: "💻", name: "Bilgisayar laboratuvarı", short: "Laboratuvar", desc: "Her öğrencinin ya da her iki öğrencinin bir bilgisayarı var." },
  tahta: { icon: "🖥️", name: "Sadece etkileşimli tahta", short: "Etkileşimli tahta", desc: "Sınıfta tek ekran var: etkileşimli tahta ya da projeksiyon. Ders öğretmenle birlikte yapılır." },
  kagit: { icon: "✏️", name: "Bilgisayarsız sınıf", short: "Bilgisayarsız", desc: "Bilgisayar ya da elektrik yok. Etkinlikler kâğıt, kalem ve kartlarla yapılır. Çalışma kâğıdı önceden yazdırılır." }
};
