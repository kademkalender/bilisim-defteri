/* =====================================================================
   ÖĞRETİM PROGRAMI (resmi kaynak)
   Kaynak: MEB Türkiye Yüzyılı Maarif Modeli
   Bilişim Teknolojileri ve Yazılım Dersi Öğretim Programı
   https://tymm.meb.gov.tr/bilisim-teknolojileri-ve-yazilim-dersi/unite/674  (5. sınıf, 1. tema)
   https://tymm.meb.gov.tr/bilisim-teknolojileri-ve-yazilim-dersi/unite/681  (6. sınıf, 1. tema)

   KURAL: Bu dosyaya yalnızca programdan birebir alınan bilgiler yazılır.
   Her ders bir öğrenme çıktısına (code) ve onun süreç bileşenlerine (a, b, c...) bağlanır.
   Öğrenme çıktısı girilmemiş temalar sitede "Kazanımlar eklenecek" olarak görünür.
   ===================================================================== */
window.BD = window.BD || { lessons: {} };
BD.lesson = function (o) { BD.lessons[o.id] = o; };

BD.program = {
  "5": {
    title: "5. Sınıf",
    themes: [
      {
        no: 1, name: "Bilişim Teknolojilerinin Hayatımızdaki Yeri", hours: 14,
        concepts: ["bilgi", "bilgi ve iletişim teknolojileri", "bilgisayar sistemleri", "bilişim teknolojileri", "bulut bilişim", "çıkış birimi", "depolama birimi", "dijital ayak izi", "dijital bağımlılık", "dijital etik", "dijital kimlik", "dijital vatandaşlık", "doğal zekâ", "donanım", "dosya", "dosya yönetimi", "dosya uzantısı", "ergonomi", "ekran süresi", "giriş birimi", "iletişim", "işletim sistemi", "klasör", "klasör yapısı", "sosyal medya", "teknoloji bağımlılığı", "veri sıkıştırma", "yapay zekâ", "yapay zekâ tarihi", "yazılım"],
        outcomes: [
          { code: "BTY.5.1.1", title: "Günlük yaşamda kullanılan bilişim teknolojilerini sınıflandırabilme", parts: [
            { k: "a", t: "Bilişim teknolojilerine ilişkin temel kavramları belirler." },
            { k: "b", t: "Geçmişten günümüze bilişim teknolojilerindeki benzerlik ve farklılıkları ilişkilendirir." },
            { k: "c", t: "Bilişim teknolojilerini kullanım alanlarına göre gruplandırır." }
          ]},
          { code: "BTY.5.1.2", title: "Bilişim teknolojilerinin birey ve toplum üzerindeki etkilerini özetleyebilme", parts: [
            { k: "a", t: "Farklı bilişim teknolojilerinin olumlu ve olumsuz yönlerini çözümler." },
            { k: "b", t: "Kullanımlarına göre fiziksel güvenlik önlemlerini sınıflandırır." },
            { k: "c", t: "Bilişim teknolojilerinin beden ve ruh sağlığı üzerindeki etkilerini kendi cümleleriyle ifade eder." }
          ]},
          { code: "BTY.5.1.3", title: "Dijital vatandaşlık uygulamalarını sınıflandırabilme", parts: [
            { k: "a", t: "Dijital kimlik kavramını belirler." },
            { k: "b", t: "Dijital ayak izinin etkilerini bilişim teknolojilerinin kullanım alanlarıyla ilişkilendirir." },
            { k: "c", t: "Dijital vatandaşlık uygulamalarını kullanım alanlarına göre gruplandırır." }
          ]},
          { code: "BTY.5.1.4", title: "Yapay zekâ ile ilgili temel kavramları ve özellikleri sorgulayabilme", parts: [
            { k: "a", t: "Yapay zekâya ilişkin merak ettiği konuları tanımlar." },
            { k: "b", t: "Temel kavram ve özellikleri hakkında sorular sorar." },
            { k: "c", t: "Bu konularda bilgi toplar." },
            { k: "ç", t: "Topladığı bilgilerin doğruluğunu değerlendirir." },
            { k: "d", t: "Yapay zekânın olası etkileri hakkında topladığı bilgilerden çıkarım yapar." }
          ]},
          { code: "BTY.5.1.5", title: "Bilgisayar sistemlerini çözümleyebilme", parts: [
            { k: "a", t: "Bilgisayar sistemlerinin temel bileşenlerini belirler." },
            { k: "b", t: "Bu bileşenler arasındaki ilişkileri belirler." }
          ]},
          { code: "BTY.5.1.6", title: "Dosya ve klasör yönetimi ile ilgili temel işlemlerle çalışabilme", parts: [
            { k: "a", t: "Temel dosya ve klasör düzenleme işlemlerini belirler." },
            { k: "b", t: "Bu işlemleri kullanır." },
            { k: "c", t: "Dosya ve klasör sıkıştırmasını verimlilik kapsamında değerlendirir." }
          ]}
        ]
      },
      { no: 2, name: "Dijital Ürün Tasarımı ve Geliştirme", outcomes: null },
      { no: 3, name: "Bilgisayar Ağları ve İletişim", outcomes: null },
      { no: 4, name: "Bilişim Etiği ve Siber Güvenlik", outcomes: null },
      { no: 5, name: "Yapay Zekâ", outcomes: null },
      { no: 6, name: "Yazılım Tasarımı ve Programlama", outcomes: null }
    ]
  },
  "6": {
    title: "6. Sınıf",
    themes: [
      {
        no: 1, name: "Bilişim Teknolojilerinin Hayatımızdaki Yeri", hours: 4,
        concepts: ["artırılmış gerçeklik", "bilişim teknolojileri", "geleceğin teknolojileri", "giyilebilir teknolojiler", "yapay zekâ", "yenilikçi bilişim teknolojileri"],
        outcomes: [
          { code: "BTY.6.1.1", title: "Yenilikçi bilişim teknolojilerini sınıflandırabilme", parts: [
            { k: "a", t: "Yenilikçi bilişim teknolojilerine ilişkin kavramları belirler." },
            { k: "b", t: "Yenilikçi teknolojileri, bilişim teknolojilerinin günlük hayatı kolaylaştırmadaki rolüyle ilişkilendirir." },
            { k: "c", t: "Yenilikçi bilişim teknolojilerini kullanım alanlarına göre gruplandırır." }
          ]},
          { code: "BTY.6.1.2", title: "Bilişim teknolojinin gelecekteki durumlarına yönelik çıkarım yapabilme", parts: [
            { k: "a", t: "Bilişim teknolojilerinin günümüze kadar olan gelişiminden yola çıkarak varsayımlarda bulunur." },
            { k: "b", t: "Bilişim teknolojilerinin gelecekteki olası durumlarına yönelik örüntüleri listeler." },
            { k: "c", t: "Bilişim teknolojilerinin gelecekteki olası durumlarına yönelik karşılaştırmalar yapar." },
            { k: "ç", t: "Bilişim teknolojilerinin olası gelişimlerinin toplum üzerindeki etkilerine ilişkin önermeler sunar." },
            { k: "d", t: "Bilişim teknolojilerinin olası gelişimlerinin toplum üzerindeki etkilerini değerlendirir." }
          ]}
        ]
      },
      { no: 2, name: "Dijital Ürün Tasarımı ve Geliştirme", hours: 12, outcomes: null },
      { no: 3, name: "Bilgisayar Ağları ve İletişim", hours: 4, outcomes: null },
      { no: 4, name: "Bilişim Etiği ve Siber Güvenlik", hours: 4, outcomes: null },
      { no: 5, name: "Yapay Zekâ", outcomes: null },
      { no: 6, name: "Yazılım Tasarımı ve Programlama", hours: 34, outcomes: null }
    ]
  }
};
