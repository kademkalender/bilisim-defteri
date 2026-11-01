/* =====================================================================
   HAFTALIK PLAN
   Her hafta 2 ders saati (40+40 dk). Hafta numaraları ÖRNEKTİR:
   rehber öğretmenin yıllık planına göre güncellenecek.
   lesson: hazır ders dosyasının id'si (content/lessons/ içinde). null ise "Yakında".
   outcome: haftanın bağlı olduğu öğrenme çıktısı (program.js'teki code).
   ===================================================================== */
window.BD = window.BD || { lessons: {} };

BD.plan = {
  "5": [
    { w: 1, theme: 1, outcome: "BTY.5.1.1", title: "Bilişim Teknolojilerini Tanıyalım", lesson: null },
    { w: 2, theme: 1, outcome: "BTY.5.1.2", title: "Bilişim Teknolojilerinin Etkileri ve Dijital Sağlık", lesson: null },
    { w: 3, theme: 1, outcome: "BTY.5.1.3", title: "Dijital Vatandaşlık", lesson: null },
    { w: 4, theme: 1, outcome: "BTY.5.1.4", title: "Yapay Zekâ ile Tanışalım", lesson: null },
    { w: 5, theme: 1, outcome: "BTY.5.1.5", title: "Bilgisayar Sistemleri", lesson: "5-1-5-bilgisayar-sistemleri" },
    { w: 6, theme: 1, outcome: "BTY.5.1.5", title: "İşletim Sistemi ve Bilgisayar Sorunları", lesson: null },
    { w: 7, theme: 1, outcome: "BTY.5.1.6", title: "Dosya ve Klasör Yönetimi", lesson: "5-1-6-dosya-klasor" }
  ],
  "6": [
    { w: 1, theme: 1, outcome: "BTY.6.1.1", title: "Yenilikçi Bilişim Teknolojileri", lesson: "6-1-1-yenilikci-bt" },
    { w: 2, theme: 1, outcome: "BTY.6.1.2", title: "Bilişim Teknolojilerinin Geleceği", lesson: null }
  ]
};

/* Varsayılan ayarlar (Öğretmen Masası'ndan değiştirilebilir, tarayıcıda saklanır) */
BD.defaults = {
  week: 7,          // "Bu hafta"
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
