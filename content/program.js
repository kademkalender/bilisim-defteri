/* =====================================================================
   ÖĞRETİM PROGRAMI (resmi kaynak)
   Kaynak: MEB Türkiye Yüzyılı Maarif Modeli
   Bilişim Teknolojileri ve Yazılım Dersi Öğretim Programı
   https://tymm.meb.gov.tr/bilisim-teknolojileri-ve-yazilim-dersi/unite/<no>
   5. sınıf, 1-6. tema: 674, 675, 676, 677, 678, 679
   6. sınıf, 1-6. tema: 681, 683, 684, 685, 687, 688

   KURAL: Bu dosyaya yalnızca programdan birebir alınan bilgiler yazılır.
   Her ders bir öğrenme çıktısına (code) ve onun süreç bileşenlerine (a, b, c...) bağlanır.
   Öğrenme çıktısı girilmemiş temalar sitede "eklenecek" olarak görünür.
   hours: yalnızca programdan doğrulanmışsa yazılır, bilinmiyorsa boş bırakılır.

   Kaynaktaki yazım biçimi: ifadeler olduğu gibi alındı, yazım yanlışları da düzeltilmedi.
   Tek istisna kodlar: kaynakta "BTY6.6.3" olarak geçen kod "BTY.6.6.3" yazıldı.
   Tema adlarındaki "Ve" sayfa başlığı biçimi olduğu için "ve" yazıldı.
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
            { k: "b", t: "Geçmişten günümüze bilişim teknolojilerindeki benzerlikleri ve farklılıkları ilişkilendirir." },
            { k: "c", t: "Bilişim teknolojilerini kullanım alanlarına göre gruplandırır." }
          ]},
          { code: "BTY.5.1.2", title: "Bilişim teknolojilerinin birey ve toplum üzerindeki etkilerini özetleyebilme", parts: [
            { k: "a", t: "Farklı bilişim teknolojilerinin olumlu ve olumsuz yönleri ile ilgili çözümleme yapar." },
            { k: "b", t: "Farklı bilişim teknolojilerinin kullanımına göre fiziksel güvenlik önlemleri ile ilgili sınıflandırma yapar." },
            { k: "c", t: "Bilişim teknolojilerini kullanmanın beden ve ruh sağlığı üzerindeki etkilerini kendi cümleleriyle ifade eder." }
          ]},
          { code: "BTY.5.1.3", title: "Dijital vatandaşlık uygulamalarını sınıflandırabilme", parts: [
            { k: "a", t: "Dijital kimlik kavramını belirler." },
            { k: "b", t: "Dijital ayak izinin etkilerini bilişim teknolojilerinin kullanım alanları ile ilişkilendirir." },
            { k: "c", t: "Dijital vatandaşlık uygulamalarını kullanım alanlarına göre gruplandırır." }
          ]},
          { code: "BTY.5.1.4", title: "Yapay zekâ ile ilgili temel kavramları ve özellikleri sorgulayabilme", parts: [
            { k: "a", t: "Yapay zekâ ile ilgili temel kavram ve özelliklere ilişkin merak ettiği konuları tanımlar." },
            { k: "b", t: "Yapay zekâ ile ilgili temel kavram ve özellikleri hakkında sorular sorar." },
            { k: "c", t: "Yapay zekâ ile ilgili temel kavram ve özellikleri hakkında bilgi toplar." },
            { k: "ç", t: "Yapay zekâ ile ilgili temel kavram ve özellikleri hakkında toplanan bilgilerin doğruluğunu değerlendirir." },
            { k: "d", t: "Yapay zekânın olası etkilerine ilişkin topladığı bilgiler üzerinden çıkarım yapar." }
          ]},
          { code: "BTY.5.1.5", title: "Bilgisayar sistemlerini çözümleyebilme", parts: [
            { k: "a", t: "Bilgisayar sistemlerinin temel bileşenlerini belirler." },
            { k: "b", t: "Bilgisayar sistemlerinin temel bileşenleri arasındaki ilişkileri belirler." }
          ]},
          { code: "BTY.5.1.6", title: "Dosya ve klasör yönetimi ile ilgili temel işlemlerle çalışabilme", parts: [
            { k: "a", t: "Temel dosya ve klasör düzenleme işlemlerini belirler." },
            { k: "b", t: "Temel dosya ve klasör düzenleme işlemlerini kullanır." },
            { k: "c", t: "Dosya ve klasör sıkıştırma işlemlerini verimlilik kapsamında değerlendirir." }
          ]}
        ]
      },
      {
        no: 2, name: "Dijital Ürün Tasarımı ve Geliştirme", hours: 12,
        concepts: ["afiş", "arayüz", "belge", "bitmap", "çizim", "dergi", "dosya", "fotoğraf", "görsel", "görsel tasarım", "kelime işlemci", "metin", "piksel", "resim", "sunum", "vektörel"],
        outcomes: [
          { code: "BTY.5.2.1", title: "Görsel düzenleme programlarından yararlanabilme", parts: [
            { k: "a", t: "Görsellerin temel özelliklerini tanır." },
            { k: "b", t: "Uygun görsel düzenleme programını belirler." },
            { k: "c", t: "Belirlenen görsel düzenleme programının arayüz özelliklerini kullanır." },
            { k: "ç", t: "Kullanılan görsel düzenleme programını kullanım alanları/verimliliği açısından değerlendirir." }
          ]},
          { code: "BTY.5.2.2", title: "Görsel için kurgu oluşturabilme", parts: [
            { k: "a", t: "Görsel tasarlanacak gerçek hayat problemini belirler." },
            { k: "b", t: "Görsel hazırlama sürecinde kullanılacak hikâye/senaryo unsurlarını belirler." },
            { k: "c", t: "Belirlenen unsurları kapsayan hikâye/senaryo oluşturur." },
            { k: "ç", t: "Hikâyeyi/senaryoyu bütünlük/kullanışlılık açısından değerlendirir." }
          ]},
          { code: "BTY.5.2.3", title: "Görsel dosyası geliştirebilme", parts: [
            { k: "a", t: "Tasarlanan hikâye/senaryo unsurlarına uygun bir görsel oluşturur." },
            { k: "b", t: "Oluşturulan görseli belirlenen ölçütler açısından değerlendirir." }
          ]},
          { code: "BTY.5.2.4", title: "Kelime işlemci programlarından yararlanabilme", parts: [
            { k: "a", t: "Kelime işlemci programlarının temel özelliklerini tanır." },
            { k: "b", t: "Uygun kelime işlemci programını belirler." },
            { k: "c", t: "Belirlenen kelime işlemci programının arayüz özelliklerini kullanır." },
            { k: "ç", t: "Kullanılan kelime işlemci programını kullanım alanları/verimliliği açısından değerlendirir." }
          ]},
          { code: "BTY.5.2.5", title: "Kelime işlemci dosyası geliştirebilme", parts: [
            { k: "a", t: "Kelime işlemci dosyası oluşturur." },
            { k: "b", t: "Oluşturulan kelime işlemci dosyasını belirlenen ölçütler açısından değerlendirir." }
          ]},
          { code: "BTY.5.2.6", title: "Sunum programlarından yararlanabilme", parts: [
            { k: "a", t: "Sunum programlarının temel özelliklerini tanır." },
            { k: "b", t: "Uygun sunum programını belirler." },
            { k: "c", t: "Belirlenen sunum programının arayüz özelliklerini kullanır." },
            { k: "ç", t: "Kullanılan sunum programını kullanım alanları/verimliliği açısından değerlendirir." }
          ]},
          { code: "BTY.5.2.7", title: "Sunum dosyası geliştirebilme", parts: [
            { k: "a", t: "Sunum dosyası oluşturur." },
            { k: "b", t: "Oluşturulan sunum dosyasını belirlenen ölçütler açısından değerlendirir." }
          ]}
        ]
      },
      {
        no: 3, name: "Bilgisayar Ağları ve İletişim", hours: 6,
        concepts: ["ağ", "ağ bileşenleri", "arama motoru", "ethernet", "internet", "modem", "web tarayıcı", "wi-fi"],
        outcomes: [
          { code: "BTY.5.3.1", title: "Bilgisayar ağları ve bileşenlerini sorgulayabilme", parts: [
            { k: "a", t: "Bilgisayar ağları ve bileşenleri ile ilgili merak ettiği konuları tanımlar." },
            { k: "b", t: "Bilgisayar ağları ve bileşenleri hakkında sorular sorar." },
            { k: "c", t: "Bilgisayar ağları ve bileşenleri hakkında bilgi toplar." },
            { k: "ç", t: "Bilgisayar ağları ve bileşenleri hakkında topladığı bilgilerin doğruluğunu değerlendirir." },
            { k: "d", t: "Bilgisayar ağları ve bileşenleri hakkında topladığı bilgiler hakkında çıkarım yapar." }
          ]},
          { code: "BTY.5.3.2", title: "Bilgisayar ağları ve bağlanma yöntemlerini sınıflandırabilme", parts: [
            { k: "a", t: "Bilgisayar ağlarında kullanılan bağlanma yöntemlerini belirler." },
            { k: "b", t: "Bilgisayar ağlarında kullanılan bağlanma yöntem ve teknolojilerini ilişkilendirir." },
            { k: "c", t: "Bilgisayar ağlarında kullanılan bileşenlerin işlevlerini gruplandırır." }
          ]},
          { code: "BTY.5.3.3", title: "İnternet ile amacına uygun olarak çalışabilme", parts: [
            { k: "a", t: "İnternette bilgiye ulaşmak için uygun kaynakları belirler." },
            { k: "b", t: "Bilginin doğruluğunu değerlendirmek için internetteki farklı bilgi kaynaklarını kullanır." },
            { k: "c", t: "Bilgiye ulaşmak için kullandığı kaynakları uygunluk/verimlilik kapsamında değerlendirir." }
          ]}
        ]
      },
      {
        no: 4, name: "Bilişim Etiği ve Siber Güvenlik", hours: 4,
        concepts: ["bilişim etiği", "dijital ortam", "dijital ortamlarda gizlilik", "dijital ortamlarda güvenlik", "erişilebilirlik", "etik", "kişisel veri", "siber güvenlik"],
        outcomes: [
          { code: "BTY.5.4.1", title: "Bilişim etiği kural ve ilkelerini yorumlayabilme", parts: [
            { k: "a", t: "Bilişim etiği ile ilgili temel kavramları inceler." },
            { k: "b", t: "Bilişim etiği kural ve ilkelerini bağlamdan kopmadan günlük hayatta kullanılacak şekilde dönüştürür." },
            { k: "c", t: "Bilişim etiği kural ve ilkelerine uygun davranmanın önemini yeniden ifade eder." }
          ]},
          { code: "BTY.5.4.2", title: "Dijital ortamlarda gizlilik ve güvenlik önlemlerini yönetebilme", parts: [
            { k: "a", t: "Dijital ortamlarda karşılaşabileceği gizlilik ve güvenlik risklerini belirler." },
            { k: "b", t: "Dijital ortamlarda alabileceği gizlilik ve güvenlik önlemlerini belirler." },
            { k: "c", t: "Dijital ortamlarda bilgi gizliliği ve güvenliğinin temel bileşenlerini ayırt eder." },
            { k: "ç", t: "Dijital ortamda karşılaşılan bir durumu gizlilik ve güvenlik önlemleri açısından değerlendirir." }
          ]}
        ]
      },
      {
        no: 5, name: "Yapay Zekâ", hours: 8,
        concepts: ["etik", "yapay zekâ", "yapay zekâ uygulamaları"],
        outcomes: [
          { code: "BTY.5.5.1", title: "Yapay zekâ uygulamalarını sınıflandırabilme", parts: [
            { k: "a", t: "Yapay zekâ uygulamalarını belirler." },
            { k: "b", t: "Yapay zekâ uygulamalarının çalışma sistemi bileşenlerini ilişkilendirir." },
            { k: "c", t: "Yapay zekâ uygulamalarını alt boyutlara göre gruplandırır." }
          ]},
          { code: "BTY.5.5.2", title: "Yapay zekâya ilişkin etik ve güvenlik/gizlilik önlemlerini yönetebilme", parts: [
            { k: "a", t: "Yapay zekâda etik ve güvenlik/gizlilik risklerini belirler." },
            { k: "b", t: "Yapay zekâda etik ve güvenlik/gizlilik önlemlerini belirler." },
            { k: "c", t: "Yapay zekâda etik ilkelerin ve bilgi güvenliğinin/gizliliğinin temel bileşenlerini ayırt eder." },
            { k: "ç", t: "Yapay zekâ uygulamalarını etik ilkeler ile e-güvenlik/e-gizlilik açısından değerlendirir." }
          ]}
        ]
      },
      {
        no: 6, name: "Yazılım Tasarımı ve Programlama", hours: 24,
        concepts: ["algoritma", "analitik düşünme", "bilgi işlemsel düşünme", "değişken", "doğrusal mantık", "döngü", "hata ayıklama", "karar", "mantıksal operatörler", "matematiksel operatörler", "operatör", "sabit", "test etme"],
        outcomes: [
          { code: "BTY.5.6.1", title: "Problem çözümü için algoritmik düşünebilme", parts: [
            { k: "a", t: "Günlük yaşamda karşılaştığı bir problemi belirler." },
            { k: "b", t: "Belirlediği problemin girdi ve çıktılarını belirler." },
            { k: "c", t: "Belirlediği problemin çözümüne ilişkin işlem adımlarını listeler." },
            { k: "ç", t: "İşlem adımlarını akış şeması ile gösterir." }
          ]},
          { code: "BTY.5.6.2", title: "Algoritma oluşturmada test edebilme-hata ayıklayabilme", parts: [
            { k: "a", t: "Geliştirdiği algoritmayı test eder." },
            { k: "b", t: "Hataları ayıklayarak algoritmayı kullanıma hazır hâle getirir." }
          ]},
          { code: "BTY.5.6.3", title: "Yazılım geliştirme sürecinde kullanılan bileşenlerden yararlanabilme", parts: [
            { k: "a", t: "Yazılım geliştirme sürecinin bileşenlerini tanımlar." },
            { k: "b", t: "Yazılım geliştirme sürecinin bileşenlerini kullanır." },
            { k: "c", t: "Yazılım geliştirme sürecinde kullandığı bileşenleri değerlendirir." }
          ]},
          { code: "BTY.5.6.4", title: "Blok tabanlı ortamda yazılım geliştirme sürecini yönetebilme", parts: [
            { k: "a", t: "Blok tabanlı ortamda yazılım geliştirme sürecini planlar." },
            { k: "b", t: "Blok tabanlı ortamda yazılımı tasarlar." },
            { k: "c", t: "Blok tabanlı ortamda yazılımı oluşturur." },
            { k: "ç", t: "Blok tabanlı ortamda oluşturulan yazılımı değerlendirir." }
          ]}
        ]
      }
    ]
  },
  "6": {
    title: "6. Sınıf",
    themes: [
      {
        no: 1, name: "Bilişim Teknolojilerinin Hayatımızdaki Yeri", hours: 4,
        concepts: ["artırılmış gerçeklik", "bilişim teknolojileri", "gelecek teknolojileri", "giyilebilir teknolojiler", "yapay zekâ", "yenilikçi bilişim teknolojileri"],
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
      {
        no: 2, name: "Dijital Ürün Tasarımı ve Geliştirme", hours: 12,
        concepts: ["fonksiyon", "formül", "grafik", "hesaplama", "hücre", "hücre adı", "montaj", "satır", "sütun", "tablo", "veri", "video"],
        outcomes: [
          { code: "BTY.6.2.1", title: "Tablolama programlarından yararlanabilme", parts: [
            { k: "a", t: "Tablolama programlarının temel özelliklerini tanır." },
            { k: "b", t: "Uygun tablolama programını belirler." },
            { k: "c", t: "Belirlenen tablolama programının arayüz özelliklerini kullanır." },
            { k: "ç", t: "Kullanılan tablolama programını kullanım alanları/verimliliği açısından değerlendirir." }
          ]},
          { code: "BTY.6.2.2", title: "Tablolama programlarının kullanımına yönelik problemleri belirleyebilme", parts: [
            { k: "a", t: "Tablolama programlarının kullanımına uygun gerçek yaşam durumunu belirler." },
            { k: "b", t: "Bağlam içerisinde veriye dayalı cevaplanabilecek araştırma soruları oluşturur." }
          ]},
          { code: "BTY.6.2.3", title: "Tablolama dosyasında kullanılacak verileri toplayabilme ve düzenleyebilme", parts: [
            { k: "a", t: "Tablolama dosyasında kullanılacak verileri toplama süreci için plan yapar." },
            { k: "b", t: "Tablolama dosyasında kullanılacak verileri elde eder." },
            { k: "c", t: "Tablolama dosyasında kullanılacak verileri kullanıma hazır hâle getirir." }
          ]},
          { code: "BTY.6.2.4", title: "Tablolama programları kullanarak bulgulara ulaşabilme", parts: [
            { k: "a", t: "Bulgulara ulaşmak için uygun analiz yöntemlerini seçer." },
            { k: "b", t: "Tablolama programları kullanarak verileri işler." },
            { k: "c", t: "Tablolama programları kullanarak verileri analiz eder." },
            { k: "ç", t: "Tablolama programları kullanarak verileri görselleştirir." }
          ]},
          { code: "BTY.6.2.5", title: "Ses düzenleme programlarından yararlanabilme", parts: [
            { k: "a", t: "Ses düzenleme programlarının temel özelliklerini tanır." },
            { k: "b", t: "Uygun ses düzenleme programını belirler." },
            { k: "c", t: "Belirlenen ses düzenleme programının arayüz özelliklerini kullanır." },
            { k: "ç", t: "Kullanılan ses düzenleme programını kullanım alanları/verimliliği açısından değerlendirir." }
          ]},
          { code: "BTY.6.2.6", title: "Ses dosyası için kurgu oluşturabilme", parts: [
            { k: "a", t: "Ses dosyası hazırlanacak gerçek hayat problemini belirler." },
            { k: "b", t: "Ses dosyası hazırlama sürecinde kullanılacak hikâye/senaryo unsurlarını belirler." },
            { k: "c", t: "Belirlenen unsurları kapsayan hikâye/senaryo oluşturur." },
            { k: "ç", t: "Hikâyeyi/senaryoyu bütünlük/kullanışlılık açısından değerlendirir." }
          ]},
          { code: "BTY.6.2.7", title: "Ses dosyası geliştirebilme", parts: [
            { k: "a", t: "Tasarlanan hikâye/senaryo unsurlarından uyumlu bir ses dosyası oluşturur." },
            { k: "b", t: "Oluşturulan sesi belirlenen ölçütler açısından değerlendirir." }
          ]},
          { code: "BTY.6.2.8", title: "Video düzenleme programlarından yararlanabilme", parts: [
            { k: "a", t: "Video düzenleme programlarının temel özelliklerini tanır." },
            { k: "b", t: "Uygun video düzenleme programını belirler." },
            { k: "c", t: "Belirlenen video düzenleme programının arayüz özelliklerini kullanır." },
            { k: "ç", t: "Kullanılan video düzenleme programını kullanım alanları/verimliliği açısından değerlendirir." }
          ]},
          { code: "BTY.6.2.9", title: "Video dosyası için kurgu oluşturabilme", parts: [
            { k: "a", t: "Video dosyası hazırlanacak gerçek hayat problemini belirler." },
            { k: "b", t: "Video dosyası hazırlama sürecinde kullanılacak hikâye/senaryo unsurlarını belirler." },
            { k: "c", t: "Belirlenen unsurları kapsayan hikâye/senaryo oluşturur." },
            { k: "ç", t: "Hikâyeyi/senaryoyu bütünlük/kullanışlılık açısından değerlendirir." }
          ]},
          { code: "BTY.6.2.10", title: "Video dosyası geliştirebilme", parts: [
            { k: "a", t: "Tasarlanan hikâye/senaryo unsurlarından uyumlu bir video dosyası oluşturur." },
            { k: "b", t: "Oluşturulan videoyu belirlenen ölçütler açısından değerlendirir." }
          ]}
        ]
      },
      {
        no: 3, name: "Bilgisayar Ağları ve İletişim", hours: 4,
        concepts: ["alıcı", "arama motoru", "eş zamanlı iletişim", "farklı zamanlı iletişim", "geri bildirim", "gönderen", "gürültü", "internet tarayıcısı", "kanal", "mesaj"],
        outcomes: [
          { code: "BTY.6.3.1", title: "İnternet ile amacına uygun olarak çalışabilme", parts: [
            { k: "a", t: "İleri düzey arama yapmak için kullanabileceği arama motorlarını belirler." },
            { k: "b", t: "Belirlediği arama motorlarını kullanır." },
            { k: "c", t: "Öğrendiği yeni internet teknolojilerini verimlilik kapsamında değerlendirir." }
          ]},
          { code: "BTY.6.3.2", title: "İletişim teknolojilerini sınıflandırabilme", parts: [
            { k: "a", t: "Farklı ve eş zamanlı iletişim sürecinde kullanılan bileşenleri belirler." },
            { k: "b", t: "İletişim araçlarını türlerine göre ilişkilendirir." },
            { k: "c", t: "İletişim süreci açısından kullanılan araçları gruplandırır." }
          ]},
          { code: "BTY.6.3.3", title: "İletişim teknolojileri ile çalışabilme", parts: [
            { k: "a", t: "Farklı ve eş zamanlı olarak kullanılan iletişim teknolojilerini amacına uygun olarak belirler." },
            { k: "b", t: "Bir e-posta aracını amacına uygun olarak kullanır." },
            { k: "c", t: "İletişim araçlarını kullanım amaçlarına uygunluğu açısından değerlendirir." }
          ]}
        ]
      },
      {
        no: 4, name: "Bilişim Etiği ve Siber Güvenlik", hours: 4,
        concepts: ["bilişim etiği ihlalleri", "bilişim suçları", "güvenlik yazılımları", "lisans türleri", "siber zorbalık", "siber zorbalığın sonuçları", "telif hakkı", "zararlı yazılımlar"],
        outcomes: [
          { code: "BTY.6.4.1", title: "Bilişim etiği kapsamında güvenlik önlemlerini yönetebilme", parts: [
            { k: "a", t: "Bilişim etiği kapsamındaki güvenlik risklerini belirler." },
            { k: "b", t: "Bilişim etiği kapsamındaki güvenlik risklerine karşı alınabilecek önlemleri belirler." },
            { k: "c", t: "Bilişim suçların türlerini bilişim etiği kapsamında ayırt eder." },
            { k: "ç", t: "Karşılaşılan bilişim suçu veya bilişim etiği ihlalini güvenlik önlemleri açısından değerlendirir." }
          ]},
          { code: "BTY.6.4.2", title: "Telif hakkı kavramını sorgulayabilme", parts: [
            { k: "a", t: "Telif hakkı kavramı hakkında merak ettiği konuları tanımlar." },
            { k: "b", t: "Telif hakkı kavramı hakkında sorular sorar." },
            { k: "c", t: "Telif hakkı kavramı hakkında bilgi toplar." },
            { k: "ç", t: "Telif hakkı kavramı hakkında topladığı bilgilerin doğruluğunu değerlendirir." },
            { k: "d", t: "Telif hakkı kavramı hakkında topladığı bilgiler üzerinden çıkarım yapar." }
          ]},
          { code: "BTY.6.4.3", title: "Siber ortamda güvenlik önlemlerini yönetebilme", parts: [
            { k: "a", t: "Siber ortamda güvenlik risklerini belirler." },
            { k: "b", t: "Siber ortamda güvenlik önlemlerini belirler." },
            { k: "c", t: "Siber ortamda bilgi güvenliğinin temel bileşenlerini ayırt eder." },
            { k: "ç", t: "Siber ortamdaki örnek bir durumu güvenlik önlemleri açısından değerlendirir." }
          ]},
          { code: "BTY.6.4.4", title: "Kullanım haklarına göre lisans türlerini karşılaştırabilme", parts: [
            { k: "a", t: "Kullanım haklarına göre lisans türlerinin özellikleri belirler." },
            { k: "b", t: "Kullanım haklarına göre lisans türlerinin benzerliklerini listeler." },
            { k: "c", t: "Kullanım haklarına göre lisans türlerinin farklılıklarını listeler." }
          ]}
        ]
      },
      {
        no: 5, name: "Yapay Zekâ", hours: 10,
        concepts: ["girdi", "model geliştirme", "yapay zekâ araçları", "yapay zekâ teknolojileri"],
        outcomes: [
          { code: "BTY.6.5.1", title: "Yapay zekâ girdileri hakkında bilgi toplayabilme", parts: [
            { k: "a", t: "Yapay zekâ girdileriyle ilgili gerekli bilgilere ulaşmak için kullanacağı araçları belirler." },
            { k: "b", t: "Belirlediği araçları kullanarak yapay zekâ girdileri hakkındaki bilgileri bulur." },
            { k: "c", t: "Yapay zekâ girdileri hakkındaki ulaşılan bilgileri doğrular." },
            { k: "ç", t: "Yapay zekâ girdileri hakkındaki ulaşılan bilgileri kaydeder." }
          ]},
          { code: "BTY.6.5.2", title: "Yapay zekâ araç ve teknolojileri ile çalışabilme", parts: [
            { k: "a", t: "Kullanacağı yapay zekâ aracını amacına uygun olarak belirler." },
            { k: "b", t: "Belirlediği yapay zekâ aracını kullanır." },
            { k: "c", t: "Kullandığı yapay zekâ aracını uygunluk/verimlilik kapsamında değerlendirir." }
          ]},
          { code: "BTY.6.5.3", title: "Yapay zekâ araç ve teknolojileri ile model geliştirebilme", parts: [
            { k: "a", t: "Yapay zekâ araç ve teknolojileri ile yapılacak olan modelde gerçek hayat problemini belirler." },
            { k: "b", t: "Problemin çözümü için bir model oluşturur." },
            { k: "c", t: "Yapay zekâ uygulamasında geliştirilen modeli uygular." },
            { k: "ç", t: "Yapay zekâ uygulamasındaki modelin süreç ve sonuçlarını değerlendirir." }
          ]}
        ]
      },
      {
        no: 6, name: "Yazılım Tasarımı ve Programlama", hours: 34,
        concepts: ["blok tabanlı programlama", "döngüler", "fonksiyon", "hata ayıklama", "karakter hareketleri", "koşul blokları", "planlama", "proje", "sürükle-bırak", "yapay zekâ", "yapay zekâ bileşenleri"],
        outcomes: [
          { code: "BTY.6.6.1", title: "Blok tabanlı ortamda yazılım geliştirme sürecinde kullanılan bileşenlerden yararlanabilme", parts: [
            { k: "a", t: "Blok tabanlı ortamında yazılım geliştirme süreci bileşenlerini tanır." },
            { k: "b", t: "Blok tabanlı ortamda yazılım geliştirme süreci bileşenlerini kullanır." },
            { k: "c", t: "Blok tabanlı ortamda yazılım geliştirme süreci bileşenlerini değerlendirir." }
          ]},
          { code: "BTY.6.6.2", title: "Blok tabanlı ortamda yazılım geliştirme sürecini yönetebilme", parts: [
            { k: "a", t: "Blok tabanlı ortamda yazılım geliştirme sürecini planlar." },
            { k: "b", t: "Blok tabanlı ortamda yazılımı tasarlar." },
            { k: "c", t: "Blok tabanlı ortamda yazılımı oluşturur." },
            { k: "ç", t: "Blok tabanlı ortamda oluşturulan yazılımı değerlendirir." }
          ]},
          { code: "BTY.6.6.3", title: "Blok tabanlı ortamda yapay zekâ destekli ürün ortaya koyabilme", parts: [
            { k: "a", t: "Blok tabanlı ortamda yapay zekâ destekli ürün için gereksinimleri belirler." },
            { k: "b", t: "Blok tabanlı ortamda yapay zekâ destekli ürün için kullanılacak araç gereçleri seçer." },
            { k: "c", t: "Blok tabanlı ortamda yapay zekâ destekli ürün oluşturur." },
            { k: "ç", t: "Blok tabanlı ortamda yapay zekâ destekli ürünü belirlenen ölçütleri karşılayacak şekilde çalışır hâle getirir." }
          ]}
        ]
      }
    ]
  }
};
