/* =====================================================================
   Bilişim Defteri — uygulama
   - İnternetsiz çalışır: tüm içerik content/ klasöründeki .js dosyalarından gelir (fetch yok).
   - Sayfalar adres çubuğundaki # ile seçilir: #home, #sinif-5, #ders-<id>, #kazanimlar, #kagitlar, #ogretmen, #yazdir-<id>
   - Ayarlar (rol, sınıf, sınıf ortamı, işletim sistemi, internet) tarayıcıda saklanır.
   - Rol: öğretmen ve öğrenci aynı siteyi farklı görür. Şifre yok, bu bir güvenlik değil düzen ayrımıdır.
   ===================================================================== */
(function () {
  "use strict";
  var BD = window.BD;

  /* ---------- Yardımcılar ---------- */
  var $ = function (s, el) { return (el || document).querySelector(s); };
  var $$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  var store = {
    get: function (k, d) { try { var v = localStorage.getItem("bd:" + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem("bd:" + k, JSON.stringify(v)); } catch (e) {} }
  };
  var S = Object.assign({}, BD.defaults, store.get("settings", {}));
  var saveSettings = function () { store.set("settings", S); };
  var isStudent = function () { return S.role === "ogrenci"; };
  // Öğrenci kendi bilgisayarındadır: ortam hep laboratuvar, işletim sistemi bilgisayarın kendisinden.
  // Öğretmenin ayarları öğrencinin bilgisayarına ulaşmaz.
  var envNow = function () { return isStudent() ? "lab" : S.env; };
  var osNow = function () { return !isStudent() ? S.os : /win/i.test(navigator.platform) ? "windows" : "pardus"; };
  // Hareket açık mı: Öğretmen Masası ayarı ve sistemin "hareketi azalt" tercihi. CSS aynı iki koşula ayrıca bakar.
  var motionOn = function () { return S.motion !== "reduced" && !(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches); };
  var applyMotion = function () { document.documentElement.classList.toggle("anim", S.motion !== "reduced"); };
  // Sınıfı kaldırıp yeniden ekler ki CSS animasyonu baştan oynasın. Sadece kullanıcı bir şeye basınca çağrılır.
  var flash = function (el, cls) { el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); };
  // Kutlama: öğenin ortasından 12 parça konfeti, 1 sn sonra silinir. Ekran okuyucudan gizli.
  var CONFETTI = ["#1E4FA3", "#B8480A", "#FFD23F", "#157A4C", "#5B3FB5", "#0B7169"];
  var celebrate = function (el) {
    if (!motionOn()) return;
    var c = document.createElement("span"), h = "";
    for (var i = 0; i < 12; i++) h += '<i style="transform:rotate(' + i * 30 + 'deg)"><b style="background:' + CONFETTI[i % 6] + '"></b></i>';
    c.className = "confetti"; c.setAttribute("aria-hidden", "true"); c.innerHTML = h; el.appendChild(c);
    setTimeout(function () { if (c.parentNode) c.parentNode.removeChild(c); }, 1000);
  };
  var norm = function (s) { return String(s).toLocaleLowerCase("tr").replace(/ı/g, "i").normalize("NFD").replace(/[̀-ͯ]/g, ""); };

  // Öğrenci ilerlemesini siler: act:<id>:<ortam>, nb:<id>, cw:<id>, quiz:<id>, son açılan ders (last). lessonId yoksa tüm dersler.
  // Ayarlar (settings, big, printOpts) bu öneklerle başlamadığı için hiç dokunulmaz.
  function clearProgress(lessonId) {
    var keys = [];
    try {
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i) || "", m = /^bd:(act|nb|cw|quiz):(.+)$/.exec(k);
        if (k === "bd:last" && (!lessonId || store.get("last") === lessonId)) keys.push(k);
        if (!m) continue;
        var id = m[1] === "act" ? m[2].replace(/:[^:]*$/, "") : m[2];
        if (!lessonId || id === lessonId) keys.push(k);
      }
      keys.forEach(function (k) { localStorage.removeItem(k); });
    } catch (e) {}
    return keys.length;
  }

  function outcome(code) {
    var g = code.split(".")[1];
    var th = (BD.program[g] || { themes: [] }).themes;
    for (var i = 0; i < th.length; i++) {
      var list = th[i].outcomes || [];
      for (var j = 0; j < list.length; j++) if (list[j].code === code) return list[j];
    }
    return null;
  }
  function lessonById(id) { return Object.prototype.hasOwnProperty.call(BD.lessons, id) ? BD.lessons[id] : null; }
  function theme(g, no) { return BD.program[g].themes[no - 1]; }
  function lessonsFor(code) { return Object.keys(BD.lessons).map(function (k) { return BD.lessons[k]; }).filter(function (l) { return l.outcome === code; }); }
  var gTag = function (g) { return '<span class="tag ' + (g === "6" ? "g6" : "") + '">' + g + '. Sınıf</span>'; };
  // Öğrenci görünümünün ikonları. Emoji değil SVG: Pardus'ta renkli emoji yazı tipi olmayabilir.
  var ICON = {
    slayt: '<path d="M8 5v14l11-7z" fill="currentColor"/>',
    defter: '<path d="M4 20h4L19 9l-4-4L4 16z"/>',
    etkinlik: '<path d="M5 3l14 8-6 2-2 6z"/>',
    test: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.7M12 17h.01"/>',
    bulmaca: '<path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z"/>',
    lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
    back: '<path d="M15 5l-7 7 7 7"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'
  };
  var icon = function (k) { return '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true">' + ICON[k] + '</svg>'; };
  var envLabel = function () { var e = BD.envs[S.env]; return e.icon + " " + e.short; };
  var osLabel = function () { return osNow() === "pardus" ? "Pardus" : "Windows"; };

  /* ---------- Ana sayfa: sınıf seçimi ve temalara bölünmüş hafta listesi ---------- */
  var WEEKS = 36; // okul yılı; program 68 saatle 34 haftayı dolduruyor
  function lastLesson() { var id = store.get("last", null); return id ? lessonById(id) : null; }
  function planCodes(p) { return [p.outcome].concat(p.also || []); }
  // Satır açılınca: öğrenci derse giriş düğmesini, öğretmen kazanım, düğmeler ve ders akışını görür
  function weekDetail(p) {
    var L = p.lesson ? lessonById(p.lesson) : null;
    if (isStudent()) return '<div class="row"><a class="btn primary" href="#ders-' + L.id + '">Derse gir →</a></div>';
    var head = planCodes(p).map(function (c) { var o = outcome(c); return '<p><span class="tag code">' + c + '</span> ' + esc(o ? o.title : "") + '</p>'; }).join("");
    if (!L) return head + '<p class="hint">Bu haftanın dersi henüz hazır değil.</p>';
    return head + '<div class="row"><a class="btn primary" href="#ders-' + L.id + '">Derse git →</a><a class="btn" href="#yazdir-' + L.id + '">🖨️ Çalışma kâğıdı</a></div>' +
      '<details class="wk-flow"><summary>Ders akışı (' + esc(L.duration) + ')</summary>' + flowHtml(L) + '</details>';
  }
  // Hazır satır açılır. Öğrencide hazır olmayan satırda açılacak bir şey yoktur.
  function weekRow(x) {
    var name = '<span><b class="wk">' + x.w + '. hafta</b> · ' + esc(x.title) + '</span>';
    var tags = '<span class="row">' + (isStudent() ? "" : planCodes(x).map(function (c) { return '<span class="tag code">' + c + '</span>'; }).join("")) + (x.lesson ? '<span class="tag ready">Hazır</span>' : '<span class="tag soon">Yakında</span>') + '</span>';
    if (isStudent() && !x.lesson) return '<li data-w="' + x.w + '"><div class="week soon">' + name + tags + '</div></li>';
    return '<li data-w="' + x.w + '"><details class="week-d"><summary class="week' + (x.lesson ? "" : " soon") + '">' + name + tags + '</summary><div class="week-body">' + weekDetail(x) + '</div></details></li>';
  }
  var CHEV = '<span class="chev" aria-hidden="true"></span>';
  // Aramadan seçilen hafta: kapalı tema ya da dönem açılır, satır ekrana gelir
  function showWeek(w) {
    var li = $('#wkList li[data-w="' + w + '"]'); if (!li) return;
    li.closest("details.unit").open = true;
    var d = $("details.week-d", li), row = $(".week", li);
    if (d) d.open = true; else row.tabIndex = -1;
    row.classList.add("week-hit");
    row.focus({ preventScroll: true });
    row.scrollIntoView({ block: "center" });
  }
  /* Öğrenci: "Bu hafta" kartı. Hafta MEB takviminden (content/plan.js → BD.calendar, assets/hafta.js) hesaplanır,
     öğretmen "7. haftayı açın" deyince öğrenci oklarla önceki ya da sonraki haftaya geçer. */
  var shownWeek = {}; // sınıf → oklarla seçilen hafta. Bellekte durur, sayfa yenilenince bu haftaya döner.
  function nowWeek() { return BD.calendar && window.schoolWeek ? window.schoolWeek(new Date(), BD.calendar) : { w: 1, state: "once" }; }
  function weekHero(g) {
    var plan = (BD.plan[g] || []).slice().sort(function (a, b) { return a.w - b.w; });
    if (!plan.length) return '<div class="empty">Bu sınıfın dersleri henüz eklenmedi.</div>';
    var now = nowWeek(), nowW = Math.min(now.w, plan[plan.length - 1].w);
    var i = Math.max(0, plan.map(function (x) { return x.w; }).indexOf(shownWeek[g] || nowW));
    var p = plan[i], prev = plan[i - 1], next = plan[i + 1], L = p.lesson ? lessonById(p.lesson) : null, last = lastLesson();
    var label = p.w !== now.w ? "Seçtiğin hafta" : { ders: "Bu hafta", tatil: "Tatilden sonraki ilk hafta", once: "Okulun ilk haftası", sonra: "Yılın son haftası" }[now.state];
    var navBtn = function (x, dir) {
      if (!x) return '<button type="button" disabled></button>';
      var t = x.w + ". hafta", s = '<span>' + esc(x.title) + '</span>';
      return '<button type="button" data-wk="' + x.w + '" aria-label="' + (dir < 0 ? "Önceki" : "Sonraki") + ' hafta: ' + t + ' · ' + esc(x.title) + '">' + (dir < 0 ? "<b>‹ " + t + "</b>" + s : s + "<b>" + t + " ›</b>") + '</button>';
    };
    var side = (p.w !== nowW
        ? '<button type="button" class="side-card" data-wk="' + nowW + '"><span class="sq" style="background:var(--theme-' + plan.filter(function (x) { return x.w === nowW; })[0].theme + ')">' + icon("clock") + '</span><span><small>Bu haftaya dön</small>' + nowW + '. hafta</span></button>'
        : last && String(last.grade) === g && (!L || last.id !== L.id) ? '<a class="side-card" href="#ders-' + last.id + '"><span class="sq" style="background:var(--theme-' + last.theme + ')">' + icon("clock") + '</span><span><small>Kaldığın yer · ' + last.week + '. hafta</small>' + esc(last.title) + '</span></a>' : "") +
      '<a class="side-card" href="#dersler"><span class="sq">' + icon("bulmaca") + '</span><span><small>Hepsi</small>Bütün dersler</span></a>';
    return '<div class="label-h">' + label + '</div><div class="wk-grid"><div>' +
      '<div class="wk-hero" style="background:var(--theme-' + p.theme + ')"><div class="wk-no" aria-hidden="true"><b>' + p.w + '</b><small>hafta</small></div><div>' +
        '<h2><span class="sr">' + p.w + '. hafta: </span>' + esc(p.title) + '</h2>' +
        (L ? '<a class="btn on-color" href="#ders-' + L.id + '">Başla →</a>' : '<p>Bu haftanın dersi henüz hazır değil.</p>') +
      '</div></div>' +
      '<div class="wk-nav">' + navBtn(prev, -1) + navBtn(next, 1) + '</div></div>' +
      '<div class="side-cards">' + side + '</div></div>';
  }
  function weekList(g) {
    var last = lastLesson();
    if (isStudent()) return weekHero(g);
    var openNo = last && String(last.grade) === g ? last.theme : 1;
    var units = BD.program[g].themes.map(function (t) {
      var weeks = (BD.plan[g] || []).filter(function (x) { return x.theme === t.no; });
      var ready = weeks.filter(function (x) { return x.lesson; }).length;
      var span = weeks.length ? (weeks.length > 1 ? weeks[0].w + "–" + weeks[weeks.length - 1].w : weeks[0].w) + ". hafta" : "";
      var info = [span, t.hours ? t.hours + " ders saati" : "", ready ? ready + " ders hazır" : ""].filter(Boolean).join(" · ");
      var body = '<ul class="weeks">' + weeks.map(weekRow).join("") + '</ul>';
      return '<details class="unit"' + (t.no === openNo ? " open" : "") + '>' +
        '<summary><div class="unit-h"><h2><span class="tn">' + t.no + '.</span> ' + esc(t.name) + '</h2><small>' + info + CHEV + '</small></div></summary>' + body + '</details>';
    }).join("");
    return units;
  }
  function viewHome() {
    var last = lastLesson();
    if (isStudent()) return '<div class="hello"><h1>Merhaba! Sınıfını seç</h1></div>' +
      '<div class="grade-cards" id="wkGrades" role="group" aria-label="Sınıf seçimi">' + ["5", "6"].map(function (g) { return '<button type="button" class="grade-card' + (g === "6" ? " g6" : "") + '" data-g="' + g + '" aria-pressed="' + (S.grade === g) + '"><b>' + g + '</b><span>Sınıf</span></button>'; }).join("") + '</div>' +
      '<div id="wkList">' + weekList(S.grade) + '</div>';
    return '<div class="hello"><h1>Hangi dersi işleyeceksiniz?</h1><p>Haftalar temalara göre sıralı. Bir haftaya basınca kazanım ve ders akışı açılır. Hafta adları ve dağılımı örnektir, MEB programından gelmez.</p></div>' +
      (last ? '<section class="card resume" aria-label="Kaldığınız yer"><div><span class="hint">Kaldığınız yer · ' + last.grade + '. Sınıf</span><div><b>' + last.week + '. hafta</b> · ' + esc(last.title) + '</div></div><a class="btn primary" href="#ders-' + last.id + '">Devam et →</a></section>' : "") +
      '<div class="row" id="wkGrades" role="group" aria-label="Sınıf seçimi">' + ["5", "6"].map(function (g) { return '<button type="button" class="chip-btn" data-g="' + g + '" aria-pressed="' + (S.grade === g) + '">' + g + '. Sınıf</button>'; }).join("") + '</div>' +
      '<div id="wkList">' + weekList(S.grade) + '</div>' +
      '<div class="env-banner"><span><b>Sınıf ortamı:</b> ' + envLabel() + ' · ' + osLabel() + ' · ' + (S.internet ? "İnternet var" : "İnternet yok") + '</span><span class="hint">Etkinlikler okulunuzun şartlarına göre gösterilir.</span><a class="btn" href="#ogretmen">Değiştir</a></div>';
  }
  function bindHome() {
    $("#wkGrades").onclick = function (e) {
      var b = e.target.closest("button"); if (!b) return;
      S.grade = b.getAttribute("data-g"); saveSettings();
      $$("button", this).forEach(function (x) { x.setAttribute("aria-pressed", x === b); });
      $("#wkList").innerHTML = weekList(S.grade);
    };
    // Öğrencinin hafta okları ve "Bu haftaya dön": kart yenilenir, odak aynı yöndeki oka döner
    $("#wkList").onclick = function (e) {
      var b = e.target.closest("[data-wk]"); if (!b) return;
      var nav = $$(".wk-nav button"), k = nav.indexOf(b);
      shownWeek[S.grade] = +b.getAttribute("data-wk");
      this.innerHTML = weekList(S.grade);
      var f = k >= 0 && !$$(".wk-nav button")[k].disabled ? $$(".wk-nav button")[k] : $(".wk-hero a, .wk-hero h2", this);
      if (f.tagName === "H2") f.tabIndex = -1;
      f.focus();
    };
  }

  /* Öğrenci: Bütün dersler (yalnızca hazır olanlar, renkli kartlar) */
  function viewAll() {
    var g = S.grade, plan = (BD.plan[g] || []).slice().sort(function (a, b) { return a.w - b.w; });
    var ready = plan.filter(function (x) { return x.lesson && lessonById(x.lesson); });
    return '<div class="hello"><h1>Bütün dersler</h1><p>' + g + '. sınıfın hazır dersleri. Öğretmeninin söylediği haftaya bas.</p></div>' +
      (ready.length ? '<div class="all-cards">' + ready.map(function (x) {
        return '<a href="#ders-' + x.lesson + '" style="background:var(--theme-' + x.theme + ')"><span class="wk-no" aria-hidden="true"><b>' + x.w + '</b><small>hafta</small></span><span><span class="sr">' + x.w + '. hafta: </span>' + esc(x.title) + '</span></a>';
      }).join("") + '</div>' : '<div class="empty">Bu sınıfın hazır dersi henüz yok.</div>') +
      (plan.length > ready.length ? '<p class="hint">' + (plan.length - ready.length) + ' ders daha hazırlanıyor.</p>' : "") +
      '<div class="row"><a class="btn" href="#home">← Ana sayfa</a></div>';
  }

  /* ---------- Ders sayfası ---------- */
  var imgSrc = function (id, file) { return "content/img/" + id + "/" + file; };
  var imgBlock = function (id, file, alt, imgClass) {
    return '<img' + (imgClass ? ' class="' + imgClass + '"' : "") + ' src="' + imgSrc(id, file) + '" alt="' + esc(alt) + '" data-imgfallback>' +
      '<div class="img-fallback" role="img" aria-label="' + esc(alt) + '">' + esc(alt) + '</div>';
  };
  function slideHtml(id, s, i) {
    var num = '<span class="num">' + (i + 1) + '</span>' + (s.b ? '<span class="bil t-only">süreç bileşeni ' + esc(s.b) + '</span>' : "");
    if (s.type === "title") return '<div class="slide title-slide' + (i === 0 ? " on" : "") + '"><span class="pill">' + esc(s.pill) + '</span><h3>' + esc(s.h) + '</h3><p>' + esc(s.p) + '</p>' + num + '</div>';
    if (s.img) return '<div class="slide slide-img' + (i === 0 ? " on" : "") + '"><div class="slide-img-wrap">' + imgBlock(id, s.img, s.alt) + '</div>' + num + '</div>';
    var body = (s.emoji ? '<div class="big-emoji" aria-hidden="true">' + s.emoji + '</div>' : "") +
      '<h3>' + esc(s.h) + '</h3>' +
      (s.p ? '<p>' + esc(s.p) + '</p>' : "") +
      (s.list ? '<ul>' + s.list.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join("") + '</ul>' : "") +
      (s.cols ? '<div class="cols">' + s.cols.map(function (c) { return '<div><b>' + esc(c.h) + '</b>' + esc(c.p) + '</div>'; }).join("") + '</div>' : "") +
      (s.tree ? '<div class="tree">' + esc(s.tree) + '</div>' : "");
    if (s.side) return '<div class="slide slide-split' + (i === 0 ? " on" : "") + '"><div class="slide-text">' + body + '</div><div class="slide-side-img">' + imgBlock(id, s.side, s.alt) + '</div>' + num + '</div>';
    return '<div class="slide' + (i === 0 ? " on" : "") + '">' + body + num + '</div>';
  }
  function bindSlideImages(root) {
    $$("img[data-imgfallback]", root).forEach(function (img) {
      img.addEventListener("error", function () {
        var wrap = img.closest(".slide-img-wrap, .slide-side-img, .print-img-wrap");
        if (wrap) wrap.classList.add("err");
      });
    });
  }

  function stepHtml(st, i, done, key) {
    var t = typeof st === "string" ? { t: st } : st;
    var os = "";
    if (t.pardus || t.windows) {
      var txt = osNow() === "pardus" ? (t.pardus || t.windows) : (t.windows || t.pardus);
      os = '<span class="os"><b>' + osLabel() + ':</b> ' + esc(txt) + '</span>';
    }
    return '<li class="' + (done ? "done" : "") + '"><span>' + esc(t.t) + os + '</span><button type="button" data-i="' + i + '" data-key="' + key + '">' + (done ? "Yaptım ✓" : "Yaptım") + '</button></li>';
  }

  function activityHtml(L) {
    var env = envNow(), A = L.activities[env];
    var key = "act:" + L.id + ":" + env;
    var done = store.get(key, []);
    var html = '<div class="card activity">' +
      '<div class="row t-only"><span class="tag">' + BD.envs[env].icon + ' ' + BD.envs[env].short + '</span>' + (A.b || []).map(function (b) { return '<span class="tag code t-only">' + L.outcome + '.' + b + '</span>'; }).join("") + '</div>' +
      '<h3>' + esc(A.title) + '</h3>' +
      '<div class="goal"><b>🎯 Hedef:</b> ' + esc(A.goal) + '</div>' +
      (A.needs ? '<div class="needs">' + A.needs.map(function (n) { return '<span>🧰 ' + esc(n) + '</span>'; }).join("") + '</div>' : "") +
      '<ol class="act-steps" data-key="' + key + '" data-total="' + A.steps.length + '">' + A.steps.map(function (st, i) { return stepHtml(st, i, done.indexOf(i) >= 0, key); }).join("") + '</ol>' +
      '<div class="finish' + (done.length === A.steps.length ? " show" : "") + '">🎉 Tebrikler, etkinliği bitirdin!</div>';
    if (A.online) html += S.internet
      ? '<div class="goal"><b>🌐 İnternet varsa:</b> ' + esc(A.online) + '</div>'
      : '<div class="goal"><b>📴 İnternet yok:</b> Bu etkinlik için internete gerek yok. Araştırma için yukarıdaki bilgi kartlarını kullanın.</div>';
    if (env === "kagit") html += '<div class="row"><a class="btn primary" href="#yazdir-' + L.id + '">🖨️ Çalışma kâğıdını aç ve yazdır</a><span class="hint">Kâğıtta konu özeti, etkinlik, test ve boş bulmaca var.</span></div>';
    html += '</div>';
    if (L.sort && env !== "kagit") html += sortHtml(L);
    return html;
  }

  function sortHtml(L) {
    var s = L.sort;
    return '<details class="fold"><summary>🧩 Sınıflandırma oyunu</summary><div id="sort">' + (s.b ? '<span class="tag code t-only">' + L.outcome + '.' + s.b + '</span>' : "") +
      '<h3 style="margin:8px 0 4px;font-size:1.15rem">' + esc(s.title) + '</h3><p class="hint" style="margin:0 0 10px">' + esc(s.intro) + ' Önce bir karta, sonra doğru kutuya dokun.</p>' +
      '<div class="sort-pool" id="sortPool"></div><div class="sort-cats" style="margin-top:10px">' +
      s.cats.map(function (c, i) { return '<div class="sort-cat" data-c="' + i + '" role="button" tabindex="0" aria-label="' + esc(c) + ' kutusu"><h4>' + esc(c) + '</h4><div class="in"></div></div>'; }).join("") +
      '</div><div class="row" style="margin-top:10px"><button type="button" class="btn primary" id="sortCheck">Kontrol et</button><button type="button" class="btn" id="sortReset">Baştan başla</button><span class="fb" id="sortMsg"></span></div></div></details>';
  }

  function flowHtml(L) {
    return '<ol class="flow">' + L.flow.map(function (f) {
      return f.part ? '<li><span></span><span class="part">' + esc(f.part) + '</span></li>' : '<li><span class="min">' + f.m + ' dk</span><span><b>' + esc(f.h) + ':</b> ' + esc(f.d) + '</span></li>';
    }).join("") + '</ol>';
  }

  // Biten bölümün sekmesinde numara yerine ✓ görünür.
  function setTabDone(key, on) {
    var t = $("#t-" + key); if (!t) return;
    t.classList.toggle("done", on);
    $("span", t).textContent = on ? "✓" : t.getAttribute("data-n");
    if (on) t.setAttribute("aria-label", t.getAttribute("data-name") + ", tamamlandı"); else t.removeAttribute("aria-label");
    updateHub();
  }
  // Öğrencinin bölüm kartları: biten "Bitti ✓", ilk bitmeyen "Sıradaki", alttaki düğme sıradaki bölümü açar
  function updateHub() {
    var cards = $$(".sec-card"); if (!cards.length) return;
    var done = 0, next = null;
    cards.forEach(function (c) {
      var key = c.getAttribute("data-tab"), d = $("#t-" + key).classList.contains("done"), b = $(".badge", c);
      if (d) done++;
      var isNext = !d && !next; if (isNext) next = c;
      c.classList.toggle("done", d); c.classList.toggle("next", isNext);
      b.textContent = d ? "Bitti ✓" : isNext ? "Sıradaki" : b.getAttribute("data-n");
    });
    var cta = $("#secNext");
    cta.hidden = !next; $("#secDone").hidden = !!next;
    if (next) { cta.setAttribute("data-tab", next.getAttribute("data-tab")); cta.textContent = "Başla: " + $("b", next).textContent + " →"; }
    var bp = $("#bandProg");
    if (bp) { $("span", bp).textContent = done + " / " + cards.length + " bitti"; $(".bar span", bp).style.width = Math.round(done / cards.length * 100) + "%"; }
  }

  // Açık sekme bellekte durur: ortam değişince yerinde kalır, sayfa yenilenince (sonraki sınıf) ilk sekmeye döner.
  function firstTab() { return isStudent() ? "hub" : "akis"; }
  var lessonTab = {}, tabBack = null; // tabBack: ekrandaki dersin sekmesini geçmişten değiştirir
  function viewLesson(id) {
    var L = lessonById(id);
    if (!L) return viewNotFound();
    var oc = outcome(L.outcome), Th = theme(L.grade, L.theme);
    var nbDone = store.get("nb:" + id, []), T = !isStudent();
    var envBtns = Object.keys(BD.envs).map(function (k) { return '<button type="button" class="chip-btn" data-env="' + k + '" aria-pressed="' + (S.env === k) + '">' + BD.envs[k].icon + ' ' + BD.envs[k].short + '</button>'; }).join("");
    var hasCw = L.crossword && L.crossword.length;

    var tabs = (T ? [["akis", "Ders planı"]] : [["hub", "Bölümler"]]).concat([["slayt", "Sunum"], ["defter", "Deftere yaz"], ["etkinlik", "Etkinlik"], ["test", "Mini test"]], hasCw ? [["bulmaca", "Bulmaca"]] : []);
    var active = tabs.some(function (t) { return t[0] === lessonTab[id]; }) ? lessonTab[id] : firstTab();
    var panel = function (key, title, text, body) {
      var i = tabs.map(function (t) { return t[0]; }).indexOf(key), nx = key === "hub" ? null : tabs[i + 1];
      var head = key === "hub" ? '<h2 class="sr">' + title + '</h2>'
        : '<div class="block-h">' + (T ? "" : '<span class="sq sec-' + key + '">' + icon(key) + '</span>') + '<div><h2>' + title + '</h2><p>' + text + '</p></div>' +
          (T ? "" : '<button type="button" class="btn sec-back" data-tab="hub" style="margin-left:auto">' + icon("back") + ' Bölümler</button>') + '</div>';
      return '<section class="block" id="b-' + key + '" role="tabpanel" aria-labelledby="t-' + key + '"' + (key === active ? "" : " hidden") + '>' +
        head + body +
        (nx ? '<div class="tab-next"><button type="button" class="btn primary" data-tab="' + nx[0] + '">Sonraki bölüm: ' + nx[1] + ' →</button></div>' : "") +
      '</section>';
    };

    return '' +
      (T ? '<nav class="crumbs"><a href="#home">Ana sayfa</a> › <a href="#sinif-' + L.grade + '">' + L.grade + '. Sınıf</a> › Tema ' + L.theme + ' › ' + L.week + '. Hafta</nav>' +
        '<div class="lesson-head"><div class="meta">' + gTag(L.grade) + '<span>' + L.week + '. Hafta</span><span>·</span><span>Tema ' + L.theme + ': ' + esc(Th.name) + '</span><span>·</span><span>⏱ ' + esc(L.duration) + '</span></div><h1>' + esc(L.title) + '</h1></div>'
      : '<div class="lesson-band" style="background:var(--theme-' + L.theme + ')"><a class="back" href="#home" aria-label="Ana sayfa">' + icon("back") + '</a><div><small>' + L.grade + '. Sınıf · ' + L.week + '. hafta</small><h1>' + esc(L.title) + '</h1></div>' +
        '<div class="band-prog" id="bandProg"><span></span><div class="bar"><span></span></div></div></div>' +
        panel("hub", "Bölümler", "", '<div class="sec-cards">' + tabs.slice(1).map(function (t, i) {
          var n = { slayt: L.slides.length + " slayt", defter: L.notebook.length + " madde", etkinlik: L.activities.lab.steps.length + " adım", test: L.quiz.length + " soru", bulmaca: hasCw ? L.crossword.length + " kelime" : "" }[t[0]];
          return '<button type="button" class="sec-card sec-' + t[0] + '" data-tab="' + t[0] + '"><span class="sq">' + icon(t[0]) + '</span><span class="badge" data-n="' + (i + 1) + '">' + (i + 1) + '</span><b>' + t[1] + '</b><small>' + n + '</small></button>';
        }).join("") + '</div><div class="sec-cta"><button type="button" class="btn primary" id="secNext" data-tab="slayt">Başla: Sunum →</button><p id="secDone" class="progress full" hidden>Bütün bölümleri bitirdin! İstediğin bölüme tekrar bakabilirsin.</p></div>')) +

      '<div class="tabs" id="tabs" role="tablist" aria-label="Ders bölümleri">' + tabs.map(function (t, i) {
        var on = t[0] === active;
        return '<button type="button" class="tab" role="tab" id="t-' + t[0] + '" data-tab="' + t[0] + '" data-n="' + (i + 1) + '" data-name="' + t[1] + '" aria-controls="b-' + t[0] + '" aria-selected="' + on + '" tabindex="' + (on ? 0 : -1) + '"><span>' + (i + 1) + '</span>' + t[1] + '</button>';
      }).join("") + '</div>' +

      panel("slayt", "Sunum", T ? "Tahtaya yansıtın. Öğrenciler aynı sunumu kendi bilgisayarında açar." : "Öğretmenin hangi slaytta olduğunu söyleyecek.",
        '<div class="deck" id="deck"><div class="stage" tabindex="0" role="group" aria-label="Ders slaytları">' + L.slides.map(function (s, i) { return slideHtml(id, s, i); }).join("") + '</div>' +
        '<div class="deck-bar"><button type="button" id="prev" aria-label="Önceki slayt">← <span class="w">Önceki</span></button><span class="count" id="count" aria-live="polite">1 / ' + L.slides.length + '</span><button type="button" id="next" aria-label="Sonraki slayt"><span class="w">Sonraki</span> →</button>' +
        '<div class="dots" id="dots">' + L.slides.map(function (_, i) { return '<button type="button" aria-label="' + (i + 1) + '. slayt" class="' + (i === 0 ? "on" : "") + '" data-i="' + i + '"></button>'; }).join("") + '</div>' +
        '<button type="button" id="fs">⛶ Tam ekran</button></div></div>' +
        '<div class="hint">' + (T ? "Slayta tıklayıp ← → ok tuşlarıyla geçebilirsiniz. Tam ekrandan Esc ile çıkılır." : "Slayta tıklayıp ← → ok tuşlarıyla geçebilirsin. Tam ekrandan Esc ile çıkılır.") + '</div>' +
        (T ? '<div class="hook"><b>Derse başlarken</b>' + esc(L.hook) + '</div>' : "")) +

      (T ? panel("akis", "Ders planı", "Bu bölüm öğrenci görünümünde yer almaz.",
        '<div class="card outcome"><div class="title">Kazanım: <code>' + L.outcome + '</code> ' + esc(oc ? oc.title : "") + '</div>' +
        '<ul class="bil-list">' + (oc ? oc.parts : []).map(function (p) {
          var on = L.covers.indexOf(p.k) >= 0;
          return '<li><span class="tick ' + (on ? "" : "no") + '">' + (on ? "✓" : p.k) + '</span><span><b>' + p.k + ')</b> ' + esc(p.t) + (on ? "" : ' <span class="hint">(başka derste)</span>') + '</span></li>';
        }).join("") + '</ul></div>' +
        '<div class="card teach-card"><h3>Ders akışı (' + esc(L.duration) + ')</h3>' + flowHtml(L) +
        '<h3>Ölçme ve değerlendirme: ' + esc(L.assessment.tool) + '</h3><ul>' + L.assessment.items.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join("") + '</ul>' +
        '<h3>Notlar</h3><ul>' + L.teacherNotes.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join("") + '</ul>' +
        '<div class="row"><a class="btn" href="#yazdir-' + id + '">🖨️ Yazdırılacak kâğıt ve cevap anahtarı</a><button type="button" class="btn" id="resetLesson">🧹 Bu dersin ilerlemesini sıfırla</button><span class="hint" id="resetMsg" role="status"></span></div>' +
        '<div class="confirm-box" id="resetBox" style="margin-top:8px" hidden><p style="margin:0 0 8px"><b>Emin misiniz?</b> Bu bilgisayarda bu dersin öğrenci ilerlemesi silinecek. Bu işlem geri alınamaz.</p>' +
        '<div class="row"><button type="button" class="btn primary" id="resetYes">Evet, sıfırla</button><button type="button" class="btn" id="resetNo">Vazgeç</button></div></div></div>') : "") +

      panel("defter", "Deftere yaz", "Sadece bu maddeleri defterine geçir. Yazdıkça yanındaki kutuyu işaretle.",
        '<div class="notebook"><h3>' + esc(L.title) + '</h3><ul class="nb-list" id="nb">' +
        L.notebook.map(function (n, i) { var d = nbDone.indexOf(i) >= 0; return '<li class="' + (d ? "done" : "") + '"><input type="checkbox" id="nb-' + i + '" data-i="' + i + '"' + (d ? " checked" : "") + '><label for="nb-' + i + '">' + n.t + '</label></li>'; }).join("") +
        '</ul><div class="nb-foot"><span class="progress" id="nbProg"></span></div></div>') +

      panel("etkinlik", "Etkinlik", 'Adımları sırayla yap. Bitirdiğin adımda "Yaptım"a bas.',
        (T ? '<div class="env-switch"><span class="lbl">Sınıf ortamı:</span>' + envBtns + '<span class="hint">Seçime göre etkinlik değişir.</span></div>' +
          (S.env === "kagit" ? '<div class="hook"><b>Bilgisayarsız sınıf</b>Bu dersin tamamını çalışma kâğıdıyla yapabilirsiniz. <a href="#yazdir-' + id + '">Çalışma kâğıdını aç →</a></div>' : "") : "") +
        (L.infoCards ? '<h3 style="font-size:1.1rem">📇 Bilgi kartları <span class="hint" style="font-weight:400">internet olmadan araştırma için</span></h3><div class="info-cards">' + L.infoCards.map(function (c) { return '<div class="info-card"><h3>' + esc(c.h) + '</h3><p>' + esc(c.p) + '</p></div>'; }).join("") + '</div>' : "") +
        '<div id="actWrap">' + activityHtml(L) + '</div>') +

      panel("test", "Mini test", L.quiz.length + " soru. Ne kadar öğrendiğini kontrol et.",
        '<div id="quiz">' + L.quiz.map(function (q, qi) {
          return '<div class="q" data-q="' + qi + '"><p>' + (qi + 1) + '. ' + esc(q.q) + '</p><div class="opts">' +
            q.o.map(function (o, oi) { return '<button type="button" data-o="' + oi + '">' + String.fromCharCode(65 + oi) + ') ' + esc(o) + '</button>'; }).join("") + '</div><div class="fb"></div></div>';
        }).join("") + '</div><div class="score" id="score" aria-live="polite"></div><div class="row"><button type="button" class="btn" id="quizAgain" hidden>🔁 Testi yeniden çöz</button></div>') +

      (hasCw ? panel("bulmaca", "Haftanın bulmacası", "Bir kutuya tıkla ve yaz. Aynı kutuya tekrar tıklarsan yön değişir. İpucuna tıklayınca o kelimeye gidersin.", '<div class="cw" id="cw"></div>') : "") +

      (T ? '<div class="pager"><a class="btn" href="#sinif-' + L.grade + '">← ' + L.grade + '. Sınıf dersleri</a></div>' : "");
  }

  function bindLesson(id) {
    var L = BD.lessons[id];
    store.set("last", id); // ana sayfadaki "Kaldığın yer"
    // Ortam değiştirme
    $$("[data-env]").forEach(function (b) { b.onclick = function () { S.env = b.getAttribute("data-env"); saveSettings(); var y = window.scrollY; render(true); window.scrollTo(0, y); }; });

    // Slaytlar
    var deck = $("#deck"), stage = $(".stage", deck), slides = $$(".slide", deck), dots = $$("#dots button"), cur = 0;
    bindSlideImages(deck);
    // Küçük ekranda sahne kareye yakındır (style.css), yazı da oranla büyür.
    var fit = function () { var w = stage.clientWidth; stage.style.fontSize = (window.innerWidth <= 560 ? Math.max(11, w / 30) : Math.max(9, w / 46)) + "px"; };
    fit(); window.onresize = fit;
    var go = function (i) {
      var n = Math.max(0, Math.min(slides.length - 1, i));
      if (n !== cur) { slides[n].classList.remove("in-l", "in-r"); slides[n].classList.add(n > cur ? "in-r" : "in-l"); } // ileri sağdan, geri soldan
      cur = n;
      slides.forEach(function (s, k) { s.classList.toggle("on", k === cur); });
      dots.forEach(function (d, k) { d.classList.toggle("on", k === cur); });
      $("#count").textContent = (cur + 1) + " / " + slides.length;
      // disabled değil: uçta düğme odağı kaybetmesin, ok tuşları çalışmaya devam etsin
      $("#prev").setAttribute("aria-disabled", cur === 0);
      $("#next").setAttribute("aria-disabled", cur === slides.length - 1);
      if (cur === slides.length - 1) setTabDone("slayt", true);
    };
    go(0);
    $("#prev").onclick = function () { go(cur - 1); };
    $("#next").onclick = function () { go(cur + 1); };
    dots.forEach(function (d) { d.onclick = function () { go(+d.getAttribute("data-i")); }; });
    stage.addEventListener("click", function (e) { var r = stage.getBoundingClientRect(); go(e.clientX - r.left > r.width / 2 ? cur + 1 : cur - 1); });
    var setFs = function (on) {
      deck.classList.toggle("fs", on); $("#fs").textContent = on ? "✕ Kapat" : "⛶ Tam ekran";
      try { if (on && deck.requestFullscreen) deck.requestFullscreen().catch(function () {}); else if (!on && document.fullscreenElement) document.exitFullscreen().catch(function () {}); } catch (e) {}
      setTimeout(fit, 60);
    };
    $("#fs").onclick = function () { setFs(!deck.classList.contains("fs")); };
    document.onfullscreenchange = function () { if (!document.fullscreenElement && deck.classList.contains("fs")) setFs(false); };
    deck.addEventListener("keydown", function (e) {
      if (e.key === " " && e.target.tagName === "BUTTON") return; // Boşluk düğmenin kendisine bassın; oklar ve Esc çalışmaya devam etsin
      if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") { e.preventDefault(); go(cur + 1); }
      if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); go(cur - 1); }
      if (e.key === "Escape" && deck.classList.contains("fs")) setFs(false);
    });

    // Sekmeler: aynı anda tek bölüm görünür
    var tabBtns = $$("#tabs .tab");
    // Her sekme değişimi geçmişe yazılır, geri tuşu önceki sekmeye döner. Adres değişmez, yenileyince yine ilk sekme açılır.
    var setHistory = function (fn, key) { try { history[fn]({ tab: key }, ""); } catch (e) {} };
    var showTab = function (key, focus, fromHistory) {
      if (!fromHistory && key !== lessonTab[id]) setHistory("pushState", key);
      lessonTab[id] = key;
      tabBtns.forEach(function (t) {
        var on = t.getAttribute("data-tab") === key;
        t.setAttribute("aria-selected", on); t.tabIndex = on ? 0 : -1;
        if (on && focus && !isStudent()) t.focus();
        $("#b-" + t.getAttribute("data-tab")).hidden = !on;
      });
      if (focus && isStudent()) { var hd = $("#b-" + key + " h2"); hd.tabIndex = -1; hd.focus({ preventScroll: true }); }
      if (key === "slayt") fit(); // gizliyken genişliği sıfırdı
      var bar = $(".top"), top = $(isStudent() ? ".lesson-band" : "#tabs").getBoundingClientRect().top - (getComputedStyle(bar).position === "sticky" ? bar.offsetHeight : 0) - 12;
      if (top < 0) window.scrollBy(0, top);
    };
    lessonTab[id] = $('#tabs .tab[aria-selected="true"]').getAttribute("data-tab");
    setHistory("replaceState", lessonTab[id]);
    tabBack = { id: id, show: function (key) { showTab(key, false, true); } };
    $("#app").onclick = function (e) {
      var b = e.target.closest("[data-tab]");
      if (b) showTab(b.getAttribute("data-tab"), b.classList.contains("tab-next") || !b.classList.contains("tab"));
    };
    $("#tabs").addEventListener("keydown", function (e) {
      var d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0; if (!d) return;
      var i = tabBtns.indexOf(document.activeElement), n = tabBtns[(i + d + tabBtns.length) % tabBtns.length];
      e.preventDefault(); showTab(n.getAttribute("data-tab"), true);
    });

    // Defter
    var nbKey = "nb:" + id;
    var nbProg = function () { var n = store.get(nbKey, []).length, t = L.notebook.length, el = $("#nbProg"); el.textContent = n === t ? "✓ Hepsini yazdın (" + n + "/" + t + ")" : "Yazılan: " + n + " / " + t; el.classList.toggle("full", n === t); setTabDone("defter", n === t); };
    $("#nb").addEventListener("change", function (e) {
      var i = +e.target.getAttribute("data-i"), arr = store.get(nbKey, []).filter(function (x) { return x !== i; });
      if (e.target.checked) arr.push(i);
      store.set(nbKey, arr); e.target.parentNode.classList.toggle("done", e.target.checked); nbProg();
      if (e.target.checked) { flash(e.target, "pop"); if (arr.length === L.notebook.length) flash($("#nbProg"), "pop"); }
    });
    nbProg();

    bindActivity(L);

    // Test: cevaplar defter ve etkinlik işaretleri gibi saklanır
    var quizKey = "quiz:" + id, picks = store.get(quizKey, {});
    var showAnswer = function (qEl, pick, live) {
      var q = L.quiz[+qEl.getAttribute("data-q")], btns = $$(".opts button", qEl), b = btns[pick], fb = $(".fb", qEl);
      btns.forEach(function (x) { x.disabled = true; });
      btns[q.a].classList.add("right");
      if (pick === q.a) { fb.textContent = "Doğru! 👏"; fb.className = "fb r"; if (live) flash(b, "hop"); }
      else { b.classList.add("wrong"); if (live) flash(b, "shake"); fb.textContent = "Olmadı. Doğru cevap ✓ işaretli olan." + (q.why ? " " + q.why : ""); fb.className = "fb w"; }
    };
    var quizState = function (live) {
      var keys = Object.keys(picks), correct = keys.filter(function (k) { return picks[k] === L.quiz[k].a; }).length, all = keys.length === L.quiz.length;
      $("#score").textContent = all ? "Sonuç: " + L.quiz.length + " soruda " + correct + " doğru " + (correct === L.quiz.length ? "🌟" : "") : "";
      $("#quizAgain").hidden = !keys.length;
      setTabDone("test", all);
      if (live && all && correct === L.quiz.length) celebrate($("#score"));
    };
    $$(".q").forEach(function (qEl) {
      var qi = qEl.getAttribute("data-q");
      if (picks[qi] != null) showAnswer(qEl, picks[qi], false);
      $(".opts", qEl).addEventListener("click", function (e) {
        var b = e.target.closest("button"); if (!b || b.disabled) return;
        picks[qi] = +b.getAttribute("data-o"); store.set(quizKey, picks);
        showAnswer(qEl, picks[qi], true); quizState(true);
      });
    });
    $("#quizAgain").onclick = function () {
      picks = {}; store.set(quizKey, picks);
      $$(".q").forEach(function (qEl) {
        $$(".opts button", qEl).forEach(function (x) { x.disabled = false; x.classList.remove("right", "wrong", "hop", "shake"); });
        var fb = $(".fb", qEl); fb.textContent = ""; fb.className = "fb";
      });
      quizState(false);
      $(".q .opts button").focus();
    };
    quizState(false);

    if (L.crossword && L.crossword.length) bindCrossword(L);

    if ($("#resetLesson")) $("#resetLesson").onclick = function () { $("#resetBox").hidden = false; $("#resetMsg").textContent = ""; $("#resetNo").focus(); };
    if ($("#resetNo")) $("#resetNo").onclick = function () { $("#resetBox").hidden = true; $("#resetLesson").focus(); };
    if ($("#resetYes")) $("#resetYes").onclick = function () {
      var n = clearProgress(id), y = window.scrollY;
      render(true); window.scrollTo(0, y);
      $("#resetMsg").textContent = n + " kayıt silindi.";
      $("#resetLesson").focus();
    };
  }

  function bindActivity(L) {
    var ol = $(".act-steps");
    if (ol) ol.addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b) return;
      var key = ol.getAttribute("data-key"), i = +b.getAttribute("data-i"), arr = store.get(key, []);
      var on = arr.indexOf(i) < 0;
      arr = arr.filter(function (x) { return x !== i; }); if (on) arr.push(i);
      store.set(key, arr);
      b.parentNode.classList.toggle("done", on); b.textContent = on ? "Yaptım ✓" : "Yaptım";
      if (on) flash(b.parentNode, "pop");
      var all = arr.length === +ol.getAttribute("data-total");
      $(".finish").classList.toggle("show", all);
      setTabDone("etkinlik", all);
      if (on && all) celebrate($(".finish"));
    });
    if (ol) setTabDone("etkinlik", store.get(ol.getAttribute("data-key"), []).length === +ol.getAttribute("data-total"));
    if (L.sort && $("#sort")) bindSort(L);
  }

  function bindSort(L) {
    var s = L.sort, pool = $("#sortPool"), sel = null;
    var shuffled = window.shuffleOrder(s.items.length, L.id);
    var reset = function () {
      pool.innerHTML = shuffled.map(function (i) { return '<button type="button" class="chip" data-i="' + i + '">' + esc(s.items[i].t) + '</button>'; }).join("");
      $$(".sort-cat .in").forEach(function (x) { x.innerHTML = ""; });
      $("#sortMsg").textContent = ""; sel = null; mark();
    };
    var mark = function () { $$(".sort-cat").forEach(function (c) { c.classList.toggle("target", !!sel); }); };
    $("#sort").addEventListener("click", function (e) {
      var chip = e.target.closest(".chip"), cat = e.target.closest(".sort-cat");
      if (chip) { $$(".chip", $("#sort")).forEach(function (c) { c.classList.remove("sel", "land"); }); if (sel === chip) { sel = null; } else { sel = chip; chip.classList.add("sel"); } chip.classList.remove("ok", "bad"); mark(); e.stopPropagation(); return; }
      if (cat && sel) { sel.classList.remove("sel"); $(".in", cat).appendChild(sel); flash(sel, "land"); sel = null; mark(); }
    });
    $$(".sort-cat").forEach(function (c) { c.addEventListener("keydown", function (e) { if ((e.key === "Enter" || e.key === " ") && sel) { e.preventDefault(); c.click(); } }); });
    $("#sortCheck").onclick = function () {
      var placed = 0, ok = 0;
      $$(".sort-cat").forEach(function (cat) {
        var ci = +cat.getAttribute("data-c");
        $$(".chip", cat).forEach(function (ch) { placed++; var good = s.items[+ch.getAttribute("data-i")].c === ci; ch.classList.toggle("ok", good); ch.classList.toggle("bad", !good); if (good) ok++; });
      });
      var m = $("#sortMsg");
      if (!placed) { m.textContent = "Önce kartları kutulara yerleştir."; m.className = "fb w"; }
      else if (ok === s.items.length) { m.textContent = "🎉 Hepsi doğru!"; m.className = "fb r"; celebrate(m); }
      else { m.textContent = ok + " / " + s.items.length + " doğru. " + (placed < s.items.length ? "Yerleştirilmemiş kartlar var. " : "") + "✕ işaretli kartları başka kutuya taşı."; m.className = "fb w"; }
    };
    $("#sortReset").onclick = reset;
    reset();
  }

  /* ---------- Bulmaca ---------- */
  function bindCrossword(L) {
    var X = window.buildCrossword(L.crossword), K = function (r, c) { return r + "," + c; }, root = $("#cw");
    var nums = {}; X.words.forEach(function (w) { nums[K(w.r, w.c)] = w.n; });
    var board = "";
    for (var r = 0; r < X.rows; r++) for (var c = 0; c < X.cols; c++) {
      var k = K(r, c);
      board += X.cells[k] ? '<div class="cw-cell" data-k="' + k + '">' + (nums[k] ? '<span class="cw-num">' + nums[k] + '</span>' : "") + '<input maxlength="2" aria-label="Satır ' + (r + 1) + ' sütun ' + (c + 1) + '" autocomplete="off" spellcheck="false"></div>' : "<div></div>";
    }
    var list = function (dir) { return X.words.filter(function (w) { return w.dir === dir; }).sort(function (a, b) { return a.n - b.n; }).map(function (w) { return '<li data-w="' + X.words.indexOf(w) + '"><b>' + w.n + '.</b> ' + esc(w.clue) + ' <small>(' + w.a.length + ')</small></li>'; }).join(""); };
    root.innerHTML = '<div class="cw-board-wrap"><div class="cw-board" style="--cols:' + X.cols + ';grid-template-columns:repeat(' + X.cols + ',var(--cell))">' + board + '</div></div>' +
      '<div class="cw-clues"><div><h3>➡️ Soldan sağa</h3><ol>' + list("a") + '</ol></div><div><h3>⬇️ Yukarıdan aşağıya</h3><ol>' + list("d") + '</ol></div>' +
      '<div class="row"><button type="button" class="btn primary" id="cwCheck">Kontrol et</button><button type="button" class="btn" id="cwHint">Bir harf göster</button><button type="button" class="btn" id="cwClear">Temizle</button></div><div class="cw-msg" id="cwMsg" aria-live="polite"></div></div>';

    var cellEl = function (k) { return $('.cw-cell[data-k="' + k + '"]', root); };
    var inp = function (k) { var el = cellEl(k); return el && $("input", el); };
    var cellsOf = function (w) { var out = []; for (var i = 0; i < w.a.length; i++) out.push(K(w.r + (w.dir === "d" ? i : 0), w.c + (w.dir === "a" ? i : 0))); return out; };
    var wordsAt = function (k) { return X.words.filter(function (w) { return cellsOf(w).indexOf(k) >= 0; }); };
    var saveKey = "cw:" + L.id, saved = store.get(saveKey, {});
    Object.keys(saved).forEach(function (k) { var i = inp(k); if (i) i.value = saved[k]; });
    var persist = function () { var o = {}; $$(".cw-cell", root).forEach(function (el) { var v = $("input", el).value; if (v) o[el.getAttribute("data-k")] = v; }); store.set(saveKey, o); };
    var msg = function (t, good) { var m = $("#cwMsg"); m.textContent = t; m.className = "cw-msg " + (good ? "r" : "w"); };
    var cur = null, curWord = null;
    function select(k, w) {
      var opts = wordsAt(k);
      curWord = w && opts.indexOf(w) >= 0 ? w : (curWord && opts.indexOf(curWord) >= 0 ? curWord : opts[0]);
      cur = k;
      $$(".cw-cell", root).forEach(function (el) { el.classList.remove("hl", "active"); });
      cellsOf(curWord).forEach(function (x) { cellEl(x).classList.add("hl"); });
      cellEl(k).classList.add("active");
      $$(".cw-clues li", root).forEach(function (li) { li.classList.toggle("on", +li.getAttribute("data-w") === X.words.indexOf(curWord)); });
      var i = inp(k); if (document.activeElement !== i) i.focus();
    }
    function step(d) { var cs = cellsOf(curWord), i = cs.indexOf(cur) + d; if (i >= 0 && i < cs.length) select(cs[i], curWord); }
    var wasSolved = {}, wasAll = false, ready = false; // ready: açılıştaki kayıtlı çözümler dalga yapmasın
    function solved() {
      var all = true;
      X.words.forEach(function (w, wi) {
        var ok = cellsOf(w).every(function (k, i) { return inp(k).value === w.a[i]; });
        $('.cw-clues li[data-w="' + wi + '"]', root).classList.toggle("solved", ok);
        if (ok) cellsOf(w).forEach(function (k, i) {
          var el = cellEl(k); el.classList.add("ok");
          if (ready && !wasSolved[wi]) { el.style.animationDelay = Math.min(i * 50, 600) + "ms"; flash(el, "wave"); }
        });
        wasSolved[wi] = ok;
        if (!ok) all = false;
      });
      if (all && ready && !wasAll) celebrate(root); // mesaj metni değişince silinmesin diye bulmaca kutusuna
      wasAll = all;
      setTabDone("bulmaca", all);
      return all;
    }
    $$(".cw-cell", root).forEach(function (el) {
      var k = el.getAttribute("data-k"), i = $("input", el);
      i.addEventListener("mousedown", function (e) { if (cur === k) { e.preventDefault(); var o = wordsAt(k); if (o.length > 1) select(k, o.filter(function (w) { return w !== curWord; })[0]); } });
      i.addEventListener("focus", function () { if (cur !== k) select(k); });
      i.addEventListener("input", function () {
        var ch = window.cwClean(i.value).slice(-1);
        i.value = ch; el.classList.remove("ok", "bad"); persist(); $("#cwMsg").textContent = "";
        if (solved()) msg("🎉 Harika! Bulmacayı tamamen çözdün.", true);
        if (ch) { flash(i, "pop"); step(1); }
      });
      i.addEventListener("keydown", function (e) {
        var p = k.split(",").map(Number);
        var mv = function (dr, dc, dir) { var n = K(p[0] + dr, p[1] + dc); if (X.cells[n]) select(n, wordsAt(n).filter(function (x) { return x.dir === dir; })[0]); e.preventDefault(); };
        if (e.key === "Backspace" && !i.value) { e.preventDefault(); step(-1); inp(cur).value = ""; persist(); }
        else if (e.key === "ArrowRight") mv(0, 1, "a"); else if (e.key === "ArrowLeft") mv(0, -1, "a");
        else if (e.key === "ArrowDown") mv(1, 0, "d"); else if (e.key === "ArrowUp") mv(-1, 0, "d");
      });
    });
    $$(".cw-clues li", root).forEach(function (li) { li.onclick = function () { var w = X.words[+li.getAttribute("data-w")]; select(cellsOf(w)[0], w); }; });
    $("#cwCheck").onclick = function () {
      var filled = 0, wrong = 0, total = Object.keys(X.cells).length;
      $$(".cw-cell", root).forEach(function (el) {
        var v = $("input", el).value; el.classList.remove("ok", "bad"); if (!v) return; filled++;
        if (v === X.cells[el.getAttribute("data-k")]) el.classList.add("ok"); else { el.classList.add("bad"); wrong++; }
      });
      if (solved()) msg("🎉 Harika! Bulmacayı tamamen çözdün.", true);
      else if (!filled) msg("Önce birkaç kutuyu doldur.", false);
      else if (wrong) msg(wrong + " harf yanlış, ✕ işaretli kutulara tekrar bak.", false);
      else msg("Şimdiye kadar hepsi doğru! " + (total - filled) + " kutu kaldı.", true);
    };
    $("#cwHint").onclick = function () {
      var t = cur && inp(cur).value !== X.cells[cur] ? cur : Object.keys(X.cells).filter(function (k) { return inp(k).value !== X.cells[k]; })[0];
      if (!t) return; inp(t).value = X.cells[t]; cellEl(t).classList.add("ok"); persist(); select(t);
      if (solved()) msg("🎉 Harika! Bulmacayı tamamen çözdün.", true);
    };
    $("#cwClear").onclick = function () { $$(".cw-cell", root).forEach(function (el) { $("input", el).value = ""; el.classList.remove("ok", "bad"); }); persist(); solved(); $("#cwMsg").textContent = ""; };
    solved(); ready = true;
  }

  /* ---------- Kazanım haritası ---------- */
  function viewMap() {
    var html = '<nav class="crumbs"><a href="#home">Ana sayfa</a> › Kazanım Haritası</nav>' +
      '<div class="section-h"><h1>Kazanım Haritası</h1><p>Her kazanımın süreç bileşenleri ve onları işleyen dersler. Yeşil: hazır bir derste işleniyor. Boş: henüz ders yok. Hazır dersi olan temalar açık gelir.</p></div>';
    ["5", "6"].forEach(function (g) {
      var total = 0, covered = 0, units = "";
      BD.program[g].themes.forEach(function (t) {
        var tHead = '<div class="unit-h"><h3><span class="tn">' + t.no + '.</span> ' + esc(t.name) + '</h3><small>';
        if (!t.outcomes) { units += '<div class="unit">' + tHead + 'Kazanımlar eklenecek</small></div></div>'; return; }
        var rows = "", tTotal = 0, tCovered = 0;
        t.outcomes.forEach(function (o) {
          var ls = lessonsFor(o.code);
          var weeks = (BD.plan[g] || []).filter(function (x) { return planCodes(x).indexOf(o.code) >= 0; }).map(function (x) { return x.w; });
          rows += '<tr class="oc"><td><code>' + o.code + '</code></td><td colspan="2">' + esc(o.title) + (weeks.length ? ' <span class="hint">· ' + weeks.join(", ") + '. hafta</span>' : "") + '</td></tr>';
          o.parts.forEach(function (p) {
            tTotal++;
            var by = ls.filter(function (l) { return l.covers.indexOf(p.k) >= 0; });
            if (by.length) tCovered++;
            rows += '<tr><td style="padding-left:24px"><span class="tag ' + (by.length ? "ready" : "soon") + '">' + p.k + '</span></td><td>' + esc(p.t) + '</td><td>' +
              (by.length ? by.map(function (l) { return '<a href="#ders-' + l.id + '">' + esc(l.title) + '</a>'; }).join("<br>") : '<span class="hint">Ders yok</span>') + '</td></tr>';
          });
        });
        total += tTotal; covered += tCovered;
        units += '<details class="unit"' + (tCovered ? " open" : "") + '><summary>' + tHead + (t.hours ? t.hours + " ders saati · " : "") + tCovered + '/' + tTotal + ' süreç bileşeni' + CHEV + '</small></div></summary>' +
          '<div class="cov-wrap"><table class="cov-table"><thead><tr><th style="width:120px">Kod</th><th>Kazanım / süreç bileşeni</th><th style="width:220px">Ders</th></tr></thead><tbody>' + rows + '</tbody></table></div></details>';
      });
      var pct = total ? Math.round(covered / total * 100) : 0;
      html += '<section><div class="row" style="justify-content:space-between;margin-bottom:10px"><h2>' + g + '. Sınıf</h2><div><span class="stat">' + covered + '/' + total + '</span> <span class="hint">süreç bileşeni hazır (%' + pct + ')</span><div class="cov-bar" style="width:220px"><span style="width:' + pct + '%"></span></div></div></div>' +
        units + '</section>';
    });
    return html;
  }

  /* ---------- Çalışma kâğıtları ---------- */
  function viewSheets() {
    var lessons = Object.keys(BD.lessons).map(function (k) { return BD.lessons[k]; }).sort(function (a, b) { return a.week - b.week; });
    return '<nav class="crumbs"><a href="#home">Ana sayfa</a> › Çalışma Kâğıtları</nav>' +
      '<div class="section-h"><h1>Çalışma Kâğıtları</h1><p>Her ders için yazdırılabilir sayfa: konu özeti, deftere yaz, bilgisayarsız etkinlik, test, boş bulmaca ve isteğe bağlı cevap anahtarı. Yalnızca hazır dersler listelenir.</p></div>' +
      ["5", "6"].map(function (g) {
        var rows = lessons.filter(function (l) { return String(l.grade) === g; }).map(function (l) {
          return '<li><a class="week" href="#yazdir-' + l.id + '"><span><b class="wk">' + l.week + '. hafta</b> · ' + esc(l.title) + '</span><span class="row"><span class="tag code">' + l.outcome + '</span><span aria-hidden="true">→</span></span></a></li>';
        }).join("");
        return '<section class="unit"><div class="unit-h"><h2>' + g + '. Sınıf</h2></div>' + (rows ? '<ul class="weeks">' + rows + '</ul>' : '<div class="unit-note">Bu sınıfın hazır dersi henüz yok.</div>') + '</section>';
      }).join("");
  }

  /* ---------- Öğretmen masası ---------- */
  function viewTeacher() {
    var optBtn = function (key, val, label, small) { return '<button type="button" data-set="' + key + '" data-val="' + val + '" aria-pressed="' + (String(S[key]) === String(val)) + '">' + label + (small ? '<small>' + esc(small) + '</small>' : "") + '</button>'; };
    return '<nav class="crumbs"><a href="#home">Ana sayfa</a> › Öğretmen Masası</nav>' +
      '<div class="section-h"><h1>Öğretmen Masası</h1><p>Okulunuzun şartlarını bir kez ayarlayın. Ders sayfalarındaki etkinlikler ve yönergeler buna göre değişir. Ayarlar bu bilgisayarda saklanır.</p></div>' +
      '<div class="card">' +
        '<div class="setting"><h3>🏫 Sınıf ortamı</h3><div class="opt-group">' + Object.keys(BD.envs).map(function (k) { return optBtn("env", k, BD.envs[k].icon + " " + BD.envs[k].name, BD.envs[k].desc); }).join("") + '</div></div>' +
        '<div class="setting"><h3>🐧 Bilgisayarlardaki işletim sistemi</h3><div class="opt-group">' + optBtn("os", "pardus", "Pardus", "MEB okullarında ve etkileşimli tahtalarda (ETAP) yaygın") + optBtn("os", "windows", "Windows", "Etkinlik yönergeleri Windows menülerine göre yazılır") + '</div></div>' +
        '<div class="setting"><h3>🌐 İnternet bağlantısı</h3><div class="opt-group">' + optBtn("internet", "true", "İnternet var", "İsteğe bağlı çevrim içi araştırma önerileri gösterilir") + optBtn("internet", "false", "İnternet yok / çok yavaş", "Sadece site içindeki bilgi kartları kullanılır") + '</div></div>' +
        '<div class="setting"><h3>🎞️ Animasyonlar</h3><div class="opt-group">' + optBtn("motion", "full", "Açık", "Sayfa geçişleri, düğme hissi ve kutlamalar") + optBtn("motion", "reduced", "Azaltılmış", "Yavaş tahtalar için: hareket yok, sadece renk değişir") + '</div></div>' +
        '<div class="setting"><h3>🧹 Öğrenci ilerlemesi</h3><p class="hint" style="margin:0">Bu bilgisayarda kayıtlı "Yaptım" işaretleri, defter kutuları, test cevapları, bulmaca harfleri ve son açılan ders. Bilgisayarı başka bir sınıf kullanacaksa silin. Ayarlarınız silinmez.</p>' +
          '<div class="row"><button type="button" class="btn" id="clrAsk">Bu bilgisayardaki öğrenci ilerlemesini sil</button><span class="hint" id="clrMsg" role="status"></span></div>' +
          '<div class="confirm-box" id="clrBox" hidden><p style="margin:0 0 8px"><b>Emin misiniz?</b> Bu bilgisayardaki bütün derslerin öğrenci ilerlemesi silinecek. Bu işlem geri alınamaz.</p>' +
          '<div class="row"><button type="button" class="btn primary" id="clrYes">Evet, sil</button><button type="button" class="btn" id="clrNo">Vazgeç</button></div></div></div>' +
      '</div>';
  }
  function bindTeacher() {
    var box = $("#clrBox"), ask = $("#clrAsk"), clrMsg = $("#clrMsg");
    ask.onclick = function () { box.hidden = false; clrMsg.textContent = ""; $("#clrNo").focus(); };
    $("#clrNo").onclick = function () { box.hidden = true; ask.focus(); };
    $("#clrYes").onclick = function () { var n = clearProgress(); box.hidden = true; clrMsg.textContent = n + " kayıt silindi."; ask.focus(); };
    $$("[data-set]").forEach(function (b) {
      b.onclick = function () {
        var k = b.getAttribute("data-set"), v = b.getAttribute("data-val");
        S[k] = k === "internet" ? v === "true" : v; saveSettings(); applyMotion();
        $$('[data-set="' + k + '"]').forEach(function (x) { x.setAttribute("aria-pressed", x === b); });
      };
    });
  }

  /* ---------- Yazdırılabilir çalışma kâğıdı ---------- */
  var printOpts = store.get("printOpts", { konu: true, defter: true, etkinlik: true, test: true, bulmaca: true, cevap: false, gorsel: false });
  function viewPrint(id) {
    var L = lessonById(id); if (!L) return viewNotFound();
    var oc = outcome(L.outcome), A = L.activities.kagit;
    var box = function (k, label) { return '<label><input type="checkbox" data-po="' + k + '"' + (printOpts[k] ? " checked" : "") + '> ' + label + '</label>'; };
    var h = '<div class="print-bar no-print"><a class="btn" href="#ders-' + id + '">← Derse dön</a><button type="button" class="btn primary" id="doPrint">🖨️ Yazdır</button>' +
      box("konu", "Konu özeti") + box("defter", "Deftere yaz") + box("etkinlik", "Etkinlik") + box("test", "Test") + box("bulmaca", "Bulmaca") + box("cevap", "Cevap anahtarı") + box("gorsel", "Slayt görselleri") +
      '<span class="hint" id="printMsg"></span></div>';
    h += '<div class="sheet">';
    h += '<div class="row" style="justify-content:space-between"><b>Bilişim Teknolojileri ve Yazılım · ' + L.grade + '. Sınıf · ' + L.week + '. Hafta</b><span>' + L.outcome + '</span></div>';
    h += '<h1 style="margin-top:8px">' + esc(L.title) + '</h1><div class="who"><div>Ad Soyad:</div><div>Sınıf/Şube:</div><div>No:</div></div>';
    h += '<p style="margin:0;font-size:.9rem"><b>Kazanım:</b> ' + L.outcome + ' ' + esc(oc ? oc.title : "") + '</p>';
    if (printOpts.konu) {
      h += '<h2>Konu özeti</h2>' + L.slides.filter(function (s) { return s.type !== "title" && !s.end && (!s.img || printOpts.gorsel); }).map(function (s) {
        return '<div class="keep" style="margin-bottom:8px"><b>' + esc(s.h || "") + '</b>' + (s.p ? ' ' + esc(s.p) : "") +
          (s.list ? '<ul>' + s.list.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join("") + '</ul>' : "") +
          (s.cols ? '<ul>' + s.cols.map(function (c) { return '<li><b>' + esc(c.h) + ':</b> ' + esc(c.p) + '</li>'; }).join("") + '</ul>' : "") +
          (s.tree ? '<pre style="margin:4px 0;font-family:var(--font-mono);font-size:.85rem">' + esc(s.tree) + '</pre>' : "") +
          (printOpts.gorsel && (s.img || s.side) ? '<div class="print-img-wrap">' + imgBlock(L.id, s.img || s.side, s.alt, "print-slide-img") + '</div>' : "") +
          '</div>';
      }).join("");
      if (L.infoCards) h += '<div class="keep"><b>Bilgi kartları</b><ul>' + L.infoCards.map(function (c) { return '<li><b>' + esc(c.h) + ':</b> ' + esc(c.p) + '</li>'; }).join("") + '</ul></div>';
    }
    if (printOpts.defter) h += '<h2>Defterime yazıyorum</h2><ol>' + L.notebook.map(function (n) { return '<li>' + n.t.replace(/<\/?mark>/g, "") + '</li>'; }).join("") + '</ol>';
    if (printOpts.etkinlik) {
      h += '<h2>Etkinlik: ' + esc(A.title) + '</h2><p style="margin:0 0 6px"><b>Hedef:</b> ' + esc(A.goal) + '</p>';
      if (A.needs) h += '<p style="margin:0 0 6px;font-size:.9rem"><b>Gerekenler:</b> ' + A.needs.map(esc).join(", ") + '</p>';
      h += '<ol>' + A.steps.map(function (s) { return '<li>' + esc(typeof s === "string" ? s : s.t) + '</li>'; }).join("") + '</ol>';
      (A.sheet || []).forEach(function (t) {
        h += '<div class="keep" style="margin-top:12px"><b>' + esc(t.h) + '</b>';
        if (t.type === "table") h += '<table style="margin-top:6px"><tr>' + t.head.map(function (x) { return '<th>' + esc(x) + '</th>'; }).join("") + '</tr>' + t.rows.map(function (r) { return '<tr>' + r.map(function (x) { return '<td>' + (x ? esc(x) : "&nbsp;") + '</td>'; }).join("") + '</tr>'; }).join("") + '</table>';
        if (t.type === "lines") { h += '<div class="lines">'; for (var i = 0; i < (t.n || 3); i++) h += '<div></div>'; h += '</div>'; }
        if (t.type === "box") h += '<div style="border:1.5px dashed #555;height:' + (t.height || 160) + 'px;margin-top:6px;border-radius:8px"></div>';
        h += '</div>';
      });
    }
    if (printOpts.test) h += '<h2>Kendimi değerlendiriyorum</h2>' + L.quiz.map(function (q, i) { return '<div class="q-print keep"><b>' + (i + 1) + '. ' + esc(q.q) + '</b><br>' + q.o.map(function (o, oi) { return '<span>' + String.fromCharCode(65 + oi) + ') ' + esc(o) + '</span>'; }).join("") + '</div>'; }).join("");
    var X = L.crossword && L.crossword.length ? window.buildCrossword(L.crossword) : null;
    if (printOpts.bulmaca && X) {
      var nums = {}, grid = "";
      X.words.forEach(function (w) { nums[w.r + "," + w.c] = w.n; });
      for (var r = 0; r < X.rows; r++) for (var c = 0; c < X.cols; c++) { var k = r + "," + c; grid += X.cells[k] ? '<div class="c">' + (nums[k] ? '<small>' + nums[k] + '</small>' : "") + '</div>' : "<div></div>"; }
      var cl = function (d) { return X.words.filter(function (w) { return w.dir === d; }).sort(function (a, b) { return a.n - b.n; }).map(function (w) { return '<li>' + w.n + '. ' + esc(w.clue) + ' (' + w.a.length + ')</li>'; }).join(""); };
      h += '<h2>Bulmaca</h2><div class="keep"><div class="print-cw" style="grid-template-columns:repeat(' + X.cols + ',30px)">' + grid + '</div>' +
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;font-size:.9rem"><div><b>Soldan sağa</b><ul style="list-style:none;padding:0">' + cl("a") + '</ul></div><div><b>Yukarıdan aşağıya</b><ul style="list-style:none;padding:0">' + cl("d") + '</ul></div></div></div>';
    }
    if (printOpts.cevap) {
      h += '<h2>Cevap anahtarı (öğretmen için)</h2><p style="margin:0">' + L.quiz.map(function (q, i) { return (i + 1) + ") " + String.fromCharCode(65 + q.a); }).join(" · ") + '</p>';
      if (X) { h += '<p style="margin:6px 0 0">Bulmaca: ' + X.words.slice().sort(function (a, b) { return a.n - b.n || (a.dir > b.dir ? 1 : -1); }).map(function (w) { return w.n + (w.dir === "a" ? "→" : "↓") + " " + w.a; }).join(", ") + '</p>'; }
      if (L.sort) h += '<p style="margin:6px 0 0">Sınıflandırma: ' + L.sort.cats.map(function (c, ci) { return '<b>' + esc(c) + ':</b> ' + L.sort.items.filter(function (x) { return x.c === ci; }).map(function (x) { return esc(x.t); }).join(", "); }).join(" · ") + '</p>';
    }
    h += '<div class="foot">Bilişim Defteri · MEB Türkiye Yüzyılı Maarif Modeli BTY programına göre hazırlanmıştır.</div></div>';
    return h;
  }
  function bindPrint(id) {
    bindSlideImages($(".sheet"));
    $("#doPrint").onclick = function () { try { window.print(); } catch (e) {} setTimeout(function () { $("#printMsg").textContent = "Yazdırma penceresi açılmadıysa: Ctrl + P"; }, 600); };
    $$("[data-po]").forEach(function (c) { c.onchange = function () { printOpts[c.getAttribute("data-po")] = c.checked; store.set("printOpts", printOpts); render(true); }; });
  }

  /* ---------- Rol seçimi ---------- */
  function viewRole() {
    return '<div class="hello"><h1>Bu bilgisayarı kim kullanıyor?</h1><p>Seçim bu bilgisayarda hatırlanır. Sonradan üstteki düğmeyle değiştirilebilir.</p></div>' +
      '<div class="role-pick" id="rolePick">' +
        '<button type="button" class="role-card" data-role="ogrenci"><span aria-hidden="true">🧑‍🎓</span><b>Öğrenciyim</b><small>Sunum, defter, etkinlik, test ve bulmaca</small></button>' +
        '<button type="button" class="role-card" data-role="ogretmen"><span aria-hidden="true">🧑‍🏫</span><b>Öğretmenim</b><small>Ders planı, sunum, notlar ve yazdırma</small></button>' +
      '</div>';
  }
  function bindRole() {
    $("#rolePick").onclick = function (e) {
      var b = e.target.closest("button"); if (!b) return;
      S.role = b.getAttribute("data-role"); saveSettings(); applyRole(); render(false);
    };
  }
  function applyRole() {
    var c = document.documentElement.classList;
    c.toggle("role-yok", !S.role); c.toggle("role-ogrenci", isStudent());
    c.toggle("big", !isStudent() && store.get("big", false)); // A+ tahta için: öğrenci kendi bilgisayarında, düğmesi de yok
    var name = isStudent() ? "Öğrenci" : "Öğretmen";
    $("#q").placeholder = isStudent() ? "🔍 Ders ya da hafta ara…" : "🔍 Ders, hafta, kod";
    $("#roleBtn").innerHTML = isStudent() ? icon("lock") + "Öğretmen" : "Rol: " + name;
    $("#roleBtn").setAttribute("aria-label", isStudent() ? "Öğretmen girişi" : "Rol: " + name + ". Değiştirmek için bas.");
  }

  function viewNotFound() { return '<div class="empty"><h2>Bu sayfa bulunamadı</h2><p>' + (isStudent() ? "Ana sayfaya dönüp sınıfını seçebilirsin." : "Ana sayfadan sınıf ve hafta seçebilirsiniz.") + '</p><a class="btn" href="#home">Ana sayfaya dön</a></div>'; }

  /* ---------- Arama ---------- */
  function initSearch() {
    var qIn = $("#q"), res = $("#results"), status = $("#searchStatus");
    var items = [];
    // Hazır derslerde defter maddeleri, slayt başlıkları ve bulmaca kelimeleri de aranır.
    var lessonWords = function (id) {
      var L = id ? lessonById(id) : null; if (!L) return "";
      return L.notebook.map(function (n) { return n.t.replace(/<[^>]+>/g, ""); }).concat(L.slides.map(function (s) { return s.h || ""; }), (L.crossword || []).map(function (c) { return c.a + " " + c.c; })).join(" ");
    };
    ["5", "6"].forEach(function (g) { (BD.plan[g] || []).forEach(function (p) { var cs = planCodes(p), ts = cs.map(function (c) { var o = outcome(c); return c + " " + (o ? o.title : ""); }).join(" "); items.push({ g: g, t: p.title, w: p.w, code: cs.join(", "), lesson: p.lesson, nt: norm(p.title), ots: cs.map(function (c) { var o = outcome(c); return o ? o.title : ""; }), hay: norm(p.title + " " + ts + " " + lessonWords(p.lesson)) }); }); });
    // Kısa sorgu kelime başından eşleşir: "ağ" "Sağlık"ı bulmasın.
    var matches = function (hay, v) { return v.length > 3 ? hay.indexOf(v) >= 0 : (" " + hay.replace(/[^a-z0-9.]+/g, " ")).indexOf(" " + v) >= 0; };
    qIn.addEventListener("input", function () {
      var v = norm(qIn.value.trim());
      // "7", "7. hafta", "7.hafta", "hafta 7": hafta numarasıyla arama
      var wm = /^(?:hafta\s*)?(\d{1,2})(?:\s*\.?\s*(?:hafta)?)?$/.exec(v), wk = wm ? +wm[1] : 0;
      if (v.length < 2 && !wk) { res.classList.remove("show"); status.textContent = ""; return; }
      // Başlığında geçenler önce gelir; başlıkta geçmeyen sonuçta nedeni (kazanım adı) yazar
      var inTitle = function (x) { return wk || matches(x.nt, v); };
      var hits = items.filter(function (x) { return wk ? x.w === wk : matches(x.hay, v); }).sort(function (a, b) { return (inTitle(a) ? 0 : 1) - (inTitle(b) ? 0 : 1); }).slice(0, 8);
      res.innerHTML = hits.length ? hits.map(function (x) { var why = inTitle(x) ? "" : x.ots.filter(function (o) { return matches(norm(o), v); })[0]; return '<a href="' + (x.lesson ? "#ders-" + x.lesson : "#sinif-" + x.g + "-" + x.w) + '">' + esc(x.t) + '<small>' + x.g + '. Sınıf · ' + x.w + '. Hafta · ' + (isStudent() ? "" : x.code + ' · ') + (x.lesson ? "Hazır" : "Yakında") + '</small>' + (why ? '<small>' + esc(why) + '</small>' : "") + '</a>'; }).join("") : wk >= 1 && wk <= WEEKS ? "<div>" + wk + ". hafta için plan henüz girilmedi.</div>" : "<div>Sonuç bulunamadı.</div>";
      status.textContent = hits.length ? hits.length + " sonuç bulundu" : res.textContent;
      res.classList.add("show");
    });
    res.addEventListener("click", function (e) { if (e.target.closest("a")) { res.classList.remove("show"); qIn.value = ""; } });
    document.addEventListener("click", function (e) { if (!e.target.closest(".search")) res.classList.remove("show"); });
    qIn.addEventListener("keydown", function (e) { if (e.key === "Escape") res.classList.remove("show"); if (e.key === "Enter") { var a = $("a", res); if (a) { location.hash = a.getAttribute("href"); res.classList.remove("show"); qIn.value = ""; } } });
  }

  /* ---------- Yönlendirme ---------- */
  function render(keepScroll) {
    var h = (location.hash || "#home").slice(1), app = $("#app"), m;
    app.onclick = null; tabBack = null;
    app.classList.toggle("enter", !keepScroll); // yerinde yenilemede (ortam, yazdırma seçeneği) geçiş yok
    // Öğrenci öğretmen sayfalarına adresle gelirse ana sayfayı görür (cevap anahtarı yazdırma sayfasında)
    if (isStudent() && /^(kazanimlar$|kagitlar$|ogretmen$|yazdir-)/.test(h)) h = "home";
    // #sinif-5: dersteki yol bilgisinden gelinir, ana sayfayı o sınıfla açar. #sinif-5-8: aramadan gelinir, 8. haftayı da gösterir
    var showW = 0;
    if ((m = h.match(/^sinif-(5|6)(?:-(\d+))?$/))) { S.grade = m[1]; showW = +m[2] || 0; saveSettings(); h = "home"; try { history.replaceState(null, "", "#home"); } catch (e) {} }
    if (showW && isStudent()) { shownWeek[S.grade] = showW; showW = 0; }
    if (!S.role) { app.innerHTML = viewRole(); bindRole(); }
    else if (h === "home" || h === "") { app.innerHTML = viewHome(); bindHome(); }
    else if ((m = h.match(/^ders-(.+)$/))) { app.innerHTML = viewLesson(m[1]); if (lessonById(m[1])) bindLesson(m[1]); }
    else if ((m = h.match(/^yazdir-(.+)$/))) { app.innerHTML = viewPrint(m[1]); if (lessonById(m[1])) bindPrint(m[1]); }
    else if (h === "kazanimlar") app.innerHTML = viewMap();
    else if (h === "kagitlar") app.innerHTML = viewSheets();
    else if (h === "dersler") app.innerHTML = viewAll();
    else if (h === "ogretmen") { app.innerHTML = viewTeacher(); bindTeacher(); }
    else app.innerHTML = viewNotFound();
    $$(".top nav a").forEach(function (a) { if (a.getAttribute("href") === "#" + h) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current"); });
    if (!keepScroll) window.scrollTo(0, 0);
    var head = $("#app h1, #app h2");
    document.title = head && h !== "home" && h !== "" ? head.textContent + " · Bilişim Defteri" : "Bilişim Defteri";
    // Sayfa değişince odak başlığa geçer, ekran okuyucu yeni sayfayı okur. İlk açılışta ve yerinde yenilemede odak değişmez.
    if (!keepScroll && rendered) focusHead();
    if (showW && S.role) showWeek(showW);
    rendered = true;
  }
  var rendered = false;
  function focusHead() {
    var head = $("#app h1, #app h2");
    if (head) { head.tabIndex = -1; head.focus({ preventScroll: true }); }
  }

  window.addEventListener("hashchange", function () { render(false); });
  window.addEventListener("popstate", function (e) {
    var m = /^#ders-(.+)$/.exec(location.hash); if (!m) return;
    var key = e.state && e.state.tab || firstTab();
    lessonTab[m[1]] = key;
    if (tabBack && tabBack.id === m[1]) tabBack.show(key);
  });
  var bigBtn = $("#bigText");
  var setBig = function (on) { document.documentElement.classList.toggle("big", on); bigBtn.setAttribute("aria-pressed", on); store.set("big", on); };
  bigBtn.onclick = function () { setBig(!document.documentElement.classList.contains("big")); };
  setBig(store.get("big", false));
  applyMotion();
  applyRole();
  $("#skip").onclick = function (e) { e.preventDefault(); focusHead(); };
  $("#roleBtn").onclick = function () { S.role = null; saveSettings(); applyRole(); render(false); };
  initSearch();
  render(false);
})();
