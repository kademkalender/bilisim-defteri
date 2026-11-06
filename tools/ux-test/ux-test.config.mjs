/* Sentetik test: 768 px düzeltmeleri (38e90c7) öncesi ve sonrası.
   Persona kuralı iki versiyonda aynıdır: görevle doğrudan eşleşen, ekranda görünen düğmeye tıklar;
   yoksa hafta oklarına döner (dolayım); hedef ekranın dışındaysa aşağı kaydırır (her kaydırma sayılır). */
var LESSON = "5-1-6-dosya-klasor";
var STU = { role: "ogrenci", grade: "5", env: "lab", os: "pardus", internet: true, motion: "full" };
var TEA = { role: "ogretmen", grade: "5", env: "lab", os: "pardus", internet: true, motion: "full" };

var week7 = [
  { css: ".wk-hero button[data-wk]", text: "Son hazır ders: 7. hafta" }, // yalnız yeni versiyonda var
  { css: ".wk-nav button[data-wk='7']" }, // eski versiyonun hafta okları
  { css: ".wk-strip .wk-chip[data-wk='7']" } // yeni versiyonun hafta şeridi
];
async function bodyHas(p, css) { return p.eval("(function(){var e=document.querySelector(" + JSON.stringify(css) + ");return !!e&&!e.hidden&&e.getClientRects().length>0;})()"); }
async function poll(p, fn) { for (var i = 0; i < 30; i++) { if (await fn()) return true; await p.wait(100); } return false; }

export default {
  date: "2026-11-06T10:00:00+03:00", // 8. hafta: bu haftanın dersi hazır değil
  viewport: { width: 1366, height: 657 },
  pace: 1,
  versions: [
    { id: "once", label: "Önce (995abb4)", ref: "995abb4" },
    { id: "sonra", label: "Sonra (7f0ae27, şimdiki)", ref: null }
  ],
  counted: [
    { id: "kaydirma", label: "Ekran dışındaki hedef için kaydırma" },
    { id: "dolayim", label: "Hedefe giden yolu ararken dolayım" }
  ],
  tasks: [
    {
      id: "G1", role: "Öğrenci", title: "7. haftanın dersini aç, Sunum'u başlat",
      scenario: "Öğretmen 7. haftanın dersini açmamı söyledi. Dersi açıp Sunum'u başlatacağım.",
      start: { hash: "#home", storage: { "bd:settings": STU } },
      run: async function (p) {
        var t = await p.find(week7);
        await p.say(t.text ? "Burada 7. hafta yazan bir düğme var." : "7. hafta okuna basarım.");
        await p.tap(t);
        await p.say("7. hafta açıldı, Başla'ya tıklarım.");
        await p.tap({ css: ".wk-hero a.btn", text: "Başla" });
        var s = await p.find([{ css: "#secNext" }, { css: ".sec-card[data-tab=slayt]" }]);
        await p.say("Sunum'u başlatırım.");
        await p.tap(s);
      },
      success: async function (p) { return poll(p, async function () { return (await bodyHas(p, "#b-slayt")) && /^1 \//.test(await p.eval("(document.getElementById('count')||{}).textContent||''")); }); }
    },
    {
      id: "G2", role: "Öğrenci", title: "Etkinlikte ilk görev: 5A_Ayse klasörü",
      scenario: "Etkinliğe geçip sanal masaüstündeki ilk görevi yapacağım: 5A_Ayse klasörünü oluşturmak.",
      start: { hash: "#ders-" + LESSON, storage: { "bd:settings": STU } },
      run: async function (p) {
        var t = await p.find([{ css: ".sec-card[data-tab=etkinlik]" }, { css: "#t-etkinlik" }]);
        await p.tap(t);
        await p.reveal({ css: ".sim-now" }, "görev kartını okumak için");
        await p.say("Masaüstünde boş bir yere sağ tıklarım.");
        await p.tap({ css: ".sim-list.desk", at: { x: 40, y: -15 } }, { button: "right", why: "masaüstünün boş yeri" });
        await p.tap({ css: ".sim-menu [role=menuitem]", text: "Yeni" });
        await p.tap({ css: ".sim-menu [role=menuitem]", text: "Klasör" });
        await p.type("5A_Ayse");
        await p.key("Enter");
      },
      success: async function (p) { return poll(p, async function () { return /^Görev 2 /.test(await p.eval("(document.querySelector('.sim-now small')||{}).textContent||''")); }); }
    },
    {
      id: "G3", role: "Öğretmen", title: "En yakın hazır dersin çalışma kâğıdı",
      scenario: "Bu hafta hazır ders yok. Hazır olan en yakın dersin çalışma kâğıdını açacağım.",
      start: { hash: "#home", storage: { "bd:settings": TEA } },
      run: async function (p) {
        var t = await p.find(week7);
        if (t.text) await p.say("Son hazır ders düğmesi var, ona tıklarım.");
        else { await p.say("Hazır ders düğmesi yok. Önceki haftaya bakarım."); await p.count("dolayim", "hazır derse giden düğme yok, hafta okuyla aranıyor"); }
        await p.tap(t);
        await p.say("7. hafta hazır. Çalışma kâğıdını açarım.");
        await p.tap({ css: ".wk-hero a.btn", text: "Çalışma kâğıdı" });
      },
      success: async function (p) { return poll(p, async function () { return (await p.eval("location.hash")) === "#yazdir-" + LESSON; }); }
    },
    {
      id: "G4", role: "Öğretmen", guard: true, title: "Sunum'da 3 slayt ilerle, Ders planı'na dön",
      scenario: "Derste Sunum'a geçip 3 slayt ilerleyeceğim, sonra Ders planı'na döneceğim.",
      start: { hash: "#ders-" + LESSON, storage: { "bd:settings": TEA } },
      run: async function (p) {
        await p.tap({ css: "#t-slayt" });
        for (var i = 0; i < 3; i++) await p.tap({ css: "#next" });
        p.slide = await p.eval("document.getElementById('count').textContent"); p.note("slayt", p.slide);
        await p.say("Dördüncü slayttayım. Ders planı'na dönerim.");
        await p.tap({ css: "#t-akis" });
      },
      success: async function (p) {
        var ok = await poll(p, function () { return bodyHas(p, "#b-akis"); });
        return ok && /^4 \//.test(p.slide || "");
      }
    }
  ],
  report: {
    title: "Sentetik test: 768 px düzeltmeleri",
    question: "38e90c7'deki 768 px düzeltmeleri (ekrana sığma, \"Son hazır ders\" düğmesi) öğrenci ve öğretmenin sık yaptığı dört işi kısalttı mı, bir şeyi bozdu mu?",
    headline: "Dört görevin dördü iki versiyonda da başarılı. Tıklama sayısı aynı (14 ve 14). Fark kaydırmada: eski versiyonda persona iki görevde hedefi ekranın altında buldu ve 4 kaydırma adımı attı, yeni versiyonda hiç kaydırmadı. Model süresindeki fark küçük (toplam 35,8 sn'ye karşı 34,7 sn) ve kaydırma adımına verdiğimiz 0,25 sn'lik varsayıma dayanıyor.",
    findings: [
      "<b>Ders ekranındaki kaydırma kalktı (G2, G4).</b> Eski versiyonda öğretmenin Sunum'unda <i>Sonraki</i> düğmesi ekranın altındaydı (2 adım kaydırma) ve geri dönmek için sekmelere yukarı çıkmak gerekti (1 adım). Öğrencinin sanal masaüstünde boş yer de ekranın dışındaydı (1 adım). Yeni versiyonda üçü de ilk bakışta görünüyor.",
      "<b>Koruma görevi (G4) bozulmadı, iyileşti.</b> Öğretmen akışında yeni versiyon hiçbir ölçüde geride kalmadı.",
      "<b>\"Son hazır ders\" düğmesi bu testte tıklama kazandırmadı (G1, G3).</b> En yakın hazır ders (7. hafta) bugünün bir önceki haftası olduğu için eski versiyondaki <i>‹ 7. hafta</i> oku da tek tıkta aynı yere götürdü. İki versiyon eşit: 3 ve 2 tıklama, aynı süre. Yeni düğmenin farkı yalnızca öğretmen görevinde (G3) persona kuralının saydığı 1 dolayım: eski versiyonda \"hazır ders\" diyen bir düğme yok, persona oka dönüyor. Bu bir tıklama değil, bir arama adımı.",
      "<b>Eski versiyonda öğrencinin <i>Başla: Sunum</i> düğmesi ekranın altında kaldı (G1).</b> Persona yine de kaydırmadı, çünkü ekranda görünen <i>Sunum</i> kartı aynı işi yapıyor. Bu yüzden G1'de fark çıkmadı."
    ],
    notes: {
      G1: "Eski versiyon hafta okunu ve <i>Sunum</i> kartını, yeni versiyon <i>Son hazır ders</i> düğmesini ve <i>Başla: Sunum</i> düğmesini kullandı. İkisi de doğrudan yol; dolayım sayılmadı.",
      G3: "Eski versiyonda dolayım: hazır derse giden bir düğme yok, persona önceki hafta okuna döndü.",
      G4: "Koruma görevi: yeni versiyonun öğretmenin sık yaptığı işi bozmadığını kontrol eder."
    },
    limits: [
      "Tek ekran boyutu: 1366×657, yani 1366×768 bir dizüstünde tarayıcının içi. Daha küçük laboratuvar ekranları ve büyük yazı modu denenmedi.",
      "Tek bir betiklenmiş yol. Okuma süresi, kararsızlık, yanlış tıklama yok. Gerçek 10–12 yaş öğrenciler farklı davranabilir.",
      "G1 ve G3'te en yakın hazır ders bir hafta geride. Aradaki boşluk büyüdükçe (ör. 12. haftada) <i>Son hazır ders</i> düğmesinin kazandırdığı tıklama artar; bu durum ölçülmedi.",
      "Süreler ölçüm değil model. Kaydırma adımının 0,25 sn olması bizim varsayımımız; farkın tamamı bu sayıdan ve kaydırmadan önceki bekleyişten geliyor.",
      "Güncel başsız Chrome kullanıldı; okullardaki Chrome 84 değil.",
      "Videolar saniyede 5 kare. Animasyonların akıcılığı değil, ekranda ne olduğu görülür."
    ]
  }
};
