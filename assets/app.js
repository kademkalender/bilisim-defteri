/* =====================================================================
   Bilişim Defteri — uygulama
   - İnternetsiz çalışır: tüm içerik content/ klasöründeki .js dosyalarından gelir (fetch yok).
   - Sayfalar adres çubuğundaki # ile seçilir: #home, #sinif-5, #ders-<id>, #kazanimlar, #ogretmen, #yazdir-<id>
   - Ayarlar (bu hafta, sınıf ortamı, işletim sistemi, internet) tarayıcıda saklanır.
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
  var norm = function (s) { return String(s).toLocaleLowerCase("tr").replace(/ı/g, "i").normalize("NFD").replace(/[̀-ͯ]/g, ""); };

  BD.lesson = BD.lesson || function (o) { BD.lessons[o.id] = o; };

  function outcome(code) {
    var g = code.split(".")[1];
    var th = (BD.program[g] || { themes: [] }).themes;
    for (var i = 0; i < th.length; i++) {
      var list = th[i].outcomes || [];
      for (var j = 0; j < list.length; j++) if (list[j].code === code) return list[j];
    }
    return null;
  }
  function theme(g, no) { return BD.program[g].themes[no - 1]; }
  function planWeek(g, w) { return (BD.plan[g] || []).filter(function (x) { return x.w === w; })[0] || null; }
  function lessonsFor(code) { return Object.keys(BD.lessons).map(function (k) { return BD.lessons[k]; }).filter(function (l) { return l.outcome === code; }); }
  var gTag = function (g) { return '<span class="tag ' + (g === "6" ? "g6" : "") + '">' + g + '. Sınıf</span>'; };
  var envLabel = function () { var e = BD.envs[S.env]; return e.icon + " " + e.short; };
  var osLabel = function () { return S.os === "pardus" ? "Pardus" : "Windows"; };

  /* ---------- Ana sayfa ---------- */
  function viewHome() {
    var now = ["5", "6"].map(function (g) {
      var p = planWeek(g, S.week);
      if (!p) return '<div class="now-item">' + gTag(g) + '<div><b>Bu hafta için plan eklenmedi</b><small>Yıllık plana göre eklenecek</small></div></div>';
      var inner = gTag(g) + '<div><b>' + esc(p.title) + '</b><small><span class="tag code">' + p.outcome + '</span> ' + (p.lesson ? "Derse git →" : "Yakında hazır olacak") + '</small></div>';
      return p.lesson ? '<a class="now-item" href="#ders-' + p.lesson + '">' + inner + '</a>' : '<div class="now-item">' + inner + '</div>';
    }).join("");
    return '' +
      '<div class="hello"><h1>Merhaba! Hangi sınıftasın?</h1>' +
      '<p>Sınıfını seç, bu haftanın dersini aç. Slaytı takip et, Deftere Yaz kısmını defterine geçir, sonra etkinliği yap.</p></div>' +
      '<div class="grades">' +
        '<a class="grade-card" href="#sinif-5"><div class="grade-num">5</div><h2>5. Sınıf</h2><p>Bilişim Teknolojileri ve Yazılım</p><span class="grade-go">Derslere git →</span></a>' +
        '<a class="grade-card g6" href="#sinif-6"><div class="grade-num">6</div><h2>6. Sınıf</h2><p>Bilişim Teknolojileri ve Yazılım</p><span class="grade-go">Derslere git →</span></a>' +
      '</div>' +
      '<section class="week-now" aria-label="Bu haftanın dersleri"><h2>📌 Bu hafta (' + S.week + '. hafta)</h2><div class="grid-auto">' + now + '</div></section>' +
      '<div class="env-banner"><span><b>Sınıf ortamı:</b> ' + envLabel() + ' · ' + osLabel() + ' · ' + (S.internet ? "İnternet var" : "İnternet yok") + '</span><span class="hint">Etkinlikler okulunuzun şartlarına göre gösterilir.</span><a class="btn" href="#ogretmen">Değiştir</a></div>' +
      '<div class="grid-auto">' +
        '<a class="card" style="text-decoration:none;color:inherit" href="#kazanimlar"><b>🎯 Kazanım Haritası</b><div class="hint">Hangi öğrenme çıktısı hangi derste işleniyor?</div></a>' +
        '<a class="card" style="text-decoration:none;color:inherit" href="#ogretmen"><b>🖨️ Çalışma Kâğıtları</b><div class="hint">Bilgisayarsız sınıflar için yazdırılabilir dersler</div></a>' +
        '<a class="card" style="text-decoration:none;color:inherit" href="#ogretmen"><b>🧑‍🏫 Öğretmen Masası</b><div class="hint">Haftayı ve okul şartlarını ayarla</div></a>' +
      '</div>';
  }

  /* ---------- Sınıf sayfası ---------- */
  function viewGrade(g) {
    var P = BD.program[g];
    var units = P.themes.map(function (t) {
      var weeks = (BD.plan[g] || []).filter(function (x) { return x.theme === t.no; });
      var hasCur = weeks.some(function (x) { return x.w === S.week; });
      var ready = weeks.filter(function (x) { return x.lesson; }).length;
      var info = (t.hours ? t.hours + " ders saati" : "") + (weeks.length ? " · " + weeks.length + " hafta" : "") + (ready ? " · " + ready + " ders hazır" : "");
      var body;
      if (!t.outcomes) {
        body = '<div class="unit-note">Bu temanın öğrenme çıktıları ve ders planı eklenecek.</div>';
      } else {
        body = '<ul class="weeks">' + weeks.map(function (x) {
          var cur = x.w === S.week ? " current" : "";
          var tag = x.lesson ? '<span class="tag ready">Hazır</span>' : '<span class="tag soon">Yakında</span>';
          var inner = '<span class="wk">' + x.w + '. Hafta</span><span>' + esc(x.title) + (cur ? ' <span class="tag now">Bu hafta</span>' : "") +
            '<span class="codes"><span class="tag code">' + x.outcome + '</span></span></span>' + tag;
          return '<li>' + (x.lesson ? '<a class="week' + cur + '" href="#ders-' + x.lesson + '">' + inner + '</a>' : '<div class="week disabled' + cur + '">' + inner + '</div>') + '</li>';
        }).join("") + '</ul>';
      }
      return '<details class="unit"' + (hasCur || (t.no === 1 && !(BD.plan[g] || []).some(function (x) { return x.w === S.week; })) ? " open" : "") + '>' +
        '<summary><div class="unit-h"><h2><span class="tn">' + t.no + '.</span>' + esc(t.name) + '</h2><small>' + info + ' ›</small></div></summary>' + body + '</details>';
    }).join("");
    return '<nav class="crumbs"><a href="#home">Ana sayfa</a> › ' + P.title + '</nav>' +
      '<div class="grade-head"><div class="grade-num ' + (g === "6" ? "g6" : "") + '">' + g + '</div><div><h1>' + P.title + '</h1><p class="hint" style="margin:4px 0 0">Bilişim Teknolojileri ve Yazılım · Temalar ve öğrenme çıktıları MEB Türkiye Yüzyılı Maarif Modeli programından. Hafta dağılımı örnektir.</p></div></div>' +
      '<div>' + units + '</div>';
  }

  /* ---------- Ders sayfası ---------- */
  var imgSrc = function (id, file) { return "content/img/" + id + "/" + file; };
  var imgBlock = function (id, file, alt, imgClass) {
    return '<img' + (imgClass ? ' class="' + imgClass + '"' : "") + ' src="' + imgSrc(id, file) + '" alt="' + esc(alt) + '" data-imgfallback>' +
      '<div class="img-fallback" role="img" aria-label="' + esc(alt) + '">' + esc(alt) + '</div>';
  };
  function slideHtml(id, s, i) {
    var num = '<span class="num">' + (i + 1) + '</span>' + (s.b ? '<span class="bil">süreç bileşeni ' + esc(s.b) + '</span>' : "");
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
      var txt = S.os === "pardus" ? (t.pardus || t.windows) : (t.windows || t.pardus);
      os = '<span class="os"><b>' + osLabel() + ':</b> ' + esc(txt) + '</span>';
    }
    return '<li class="' + (done ? "done" : "") + '"><span>' + esc(t.t) + os + '</span><button type="button" data-i="' + i + '" data-key="' + key + '">' + (done ? "Yaptım ✓" : "Yaptım") + '</button></li>';
  }

  function activityHtml(L) {
    var A = L.activities[S.env];
    var key = "act:" + L.id + ":" + S.env;
    var done = store.get(key, []);
    var html = '<div class="card activity">' +
      '<div class="row"><span class="tag">' + BD.envs[S.env].icon + ' ' + BD.envs[S.env].short + '</span>' + (A.b || []).map(function (b) { return '<span class="tag bil">' + L.outcome + '.' + b + '</span>'; }).join("") + '</div>' +
      '<h3>' + esc(A.title) + '</h3>' +
      '<div class="goal"><b>🎯 Hedef:</b> ' + esc(A.goal) + '</div>' +
      (A.needs ? '<div class="needs">' + A.needs.map(function (n) { return '<span>🧰 ' + esc(n) + '</span>'; }).join("") + '</div>' : "") +
      '<ol class="act-steps" data-key="' + key + '" data-total="' + A.steps.length + '">' + A.steps.map(function (st, i) { return stepHtml(st, i, done.indexOf(i) >= 0, key); }).join("") + '</ol>' +
      '<div class="finish' + (done.length === A.steps.length ? " show" : "") + '">🎉 Tebrikler, etkinliği bitirdin! Aşağıdaki zenginleştirme görevlerine bakabilirsin.</div>';
    if (A.online) html += S.internet
      ? '<div class="goal"><b>🌐 İnternet varsa:</b> ' + esc(A.online) + '</div>'
      : '<div class="goal"><b>📴 İnternet yok:</b> Bu etkinlik için internete gerek yok. Araştırma için yukarıdaki bilgi kartlarını kullanın.</div>';
    if (S.env === "kagit") html += '<div class="row"><a class="btn primary" href="#yazdir-' + L.id + '">🖨️ Çalışma kâğıdını aç ve yazdır</a><span class="hint">Kâğıtta konu özeti, etkinlik, test ve boş bulmaca var.</span></div>';
    html += '</div>';
    if (L.sort && S.env !== "kagit") html += sortHtml(L);
    return html;
  }

  function sortHtml(L) {
    var s = L.sort;
    return '<div class="card" id="sort"><div class="row"><span class="tag">🧩 Sınıflandırma oyunu</span>' + (s.b ? '<span class="tag bil">' + L.outcome + '.' + s.b + '</span>' : "") + '</div>' +
      '<h3 style="margin:8px 0 4px;font-size:1.15rem">' + esc(s.title) + '</h3><p class="hint" style="margin:0 0 10px">' + esc(s.intro) + ' Önce bir karta, sonra doğru kutuya dokun.</p>' +
      '<div class="sort-pool" id="sortPool"></div><div class="sort-cats" style="margin-top:10px">' +
      s.cats.map(function (c, i) { return '<div class="sort-cat" data-c="' + i + '" role="button" tabindex="0" aria-label="' + esc(c) + ' kutusu"><h4>' + esc(c) + '</h4><div class="in"></div></div>'; }).join("") +
      '</div><div class="row" style="margin-top:10px"><button type="button" class="btn primary" id="sortCheck">Kontrol et</button><button type="button" class="btn" id="sortReset">Baştan başla</button><span class="fb" id="sortMsg"></span></div></div>';
  }

  function viewLesson(id) {
    var L = BD.lessons[id];
    if (!L) return viewNotFound();
    var oc = outcome(L.outcome), T = theme(L.grade, L.theme);
    var nbDone = store.get("nb:" + id, []);
    var envBtns = Object.keys(BD.envs).map(function (k) { return '<button type="button" class="chip-btn" data-env="' + k + '" aria-pressed="' + (S.env === k) + '">' + BD.envs[k].icon + ' ' + BD.envs[k].short + '</button>'; }).join("");
    var hasCw = L.crossword && L.crossword.length;

    return '' +
      '<nav class="crumbs"><a href="#home">Ana sayfa</a> › <a href="#sinif-' + L.grade + '">' + L.grade + '. Sınıf</a> › Tema ' + L.theme + ' › ' + L.week + '. Hafta</nav>' +
      '<div class="lesson-head"><div class="meta">' + gTag(L.grade) + '<span>' + L.week + '. Hafta</span><span>·</span><span>Tema ' + L.theme + ': ' + esc(T.name) + '</span><span>·</span><span>⏱ ' + esc(L.duration) + '</span></div><h1>' + esc(L.title) + '</h1></div>' +

      '<div class="card outcome"><div class="title">Öğrenme çıktısı: <code>' + L.outcome + '</code> ' + esc(oc ? oc.title : "") + '</div>' +
      '<ul class="bil-list">' + (oc ? oc.parts : []).map(function (p) {
        var on = L.covers.indexOf(p.k) >= 0;
        return '<li><span class="tick ' + (on ? "" : "no") + '">' + (on ? "✓" : p.k) + '</span><span><b>' + p.k + ')</b> ' + esc(p.t) + (on ? "" : ' <span class="hint">(başka derste)</span>') + '</span></li>';
      }).join("") + '</ul></div>' +

      '<div class="env-switch"><span class="lbl">Sınıf ortamı:</span>' + envBtns + '<span class="hint">Seçime göre etkinlik değişir.</span></div>' +
      (S.env === "kagit" ? '<div class="hook" style="background:var(--accent-soft)"><b>Bilgisayarsız sınıf</b>Bu dersin tamamını çalışma kâğıdıyla yapabilirsiniz. <a href="#yazdir-' + id + '">Çalışma kâğıdını aç →</a></div>' : "") +
      '<div class="hook"><b>Derse başlarken</b>' + esc(L.hook) + '</div>' +

      '<div class="steps-nav">' +
        '<a href="#ders-' + id + '" data-jump="b-slayt"><span>1</span>Slayt</a>' +
        '<a href="#ders-' + id + '" data-jump="b-defter"><span>2</span>Deftere Yaz</a>' +
        '<a href="#ders-' + id + '" data-jump="b-etkinlik"><span>3</span>Etkinlik</a>' +
        '<a href="#ders-' + id + '" data-jump="b-test"><span>4</span>Mini Test</a>' +
        (hasCw ? '<a href="#ders-' + id + '" data-jump="b-bulmaca"><span>5</span>Bulmaca</a>' : "") +
      '</div>' +

      '<section class="block" id="b-slayt"><div class="block-h"><div class="n">1</div><div><h2>Slaytı takip et</h2><p>Öğretmenin hangi slaytta olduğunu söyleyecek.</p></div></div>' +
        '<div class="deck" id="deck"><div class="stage" tabindex="0" aria-label="Ders slaytları">' + L.slides.map(function (s, i) { return slideHtml(id, s, i); }).join("") + '</div>' +
        '<div class="deck-bar"><button type="button" id="prev">← Önceki</button><span class="count" id="count">1 / ' + L.slides.length + '</span><button type="button" id="next">Sonraki →</button>' +
        '<div class="dots" id="dots">' + L.slides.map(function (_, i) { return '<button type="button" aria-label="' + (i + 1) + '. slayt" class="' + (i === 0 ? "on" : "") + '" data-i="' + i + '"></button>'; }).join("") + '</div>' +
        '<button type="button" id="fs">⛶ Tam ekran</button></div></div>' +
        '<div class="hint">Slayta tıklayıp ← → ok tuşlarıyla geçebilirsin. Tam ekrandan Esc ile çıkılır.</div>' +
        (L.infoCards ? '<h3 style="font-size:1.1rem">📇 Bilgi kartları <span class="hint" style="font-weight:400">internet olmadan araştırma için</span></h3><div class="info-cards">' + L.infoCards.map(function (c) { return '<div class="info-card"><h3>' + esc(c.h) + '</h3><p>' + esc(c.p) + '</p></div>'; }).join("") + '</div>' : "") +
      '</section>' +

      '<section class="block" id="b-defter"><div class="block-h"><div class="n">2</div><div><h2>Deftere yaz</h2><p>Sadece bu maddeleri defterine geçir. Yazdıkça yanındaki kutuyu işaretle.</p></div></div>' +
        '<div class="notebook"><h3>' + esc(L.title) + '</h3><ul class="nb-list" id="nb">' +
        L.notebook.map(function (n, i) { var d = nbDone.indexOf(i) >= 0; return '<li class="' + (d ? "done" : "") + '"><input type="checkbox" id="nb-' + i + '" data-i="' + i + '"' + (d ? " checked" : "") + '><label for="nb-' + i + '">' + n.t + '</label></li>'; }).join("") +
        '</ul><div class="nb-foot"><span class="progress" id="nbProg"></span></div></div>' +
      '</section>' +

      '<section class="block" id="b-etkinlik"><div class="block-h"><div class="n">3</div><div><h2>Etkinlik</h2><p>Adımları sırayla yap. Bitirdiğin adımda "Yaptım"a bas.</p></div></div>' +
        '<div id="actWrap">' + activityHtml(L) + '</div>' +
        '<div class="diff">' + ["destek", "zengin"].map(function (k) { var c = L.diff[k]; return '<div class="diff-card ' + (k === "zengin" ? "zen" : "") + '"><span class="who">' + esc(c.who) + '</span><h3>' + (k === "destek" ? "🤝 Destekleme" : "🚀 Zenginleştirme") + '</h3><ul>' + c.items.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join("") + '</ul></div>'; }).join("") + '</div>' +
      '</section>' +

      '<section class="block" id="b-test"><div class="block-h"><div class="n">4</div><div><h2>Mini test</h2><p>' + L.quiz.length + ' soru. Ne kadar öğrendiğini kontrol et.</p></div></div>' +
        '<div id="quiz">' + L.quiz.map(function (q, qi) {
          return '<div class="q" data-q="' + qi + '"><p>' + (qi + 1) + '. ' + esc(q.q) + '</p><div class="opts">' +
            q.o.map(function (o, oi) { return '<button type="button" data-o="' + oi + '">' + String.fromCharCode(65 + oi) + ') ' + esc(o) + '</button>'; }).join("") + '</div><div class="fb"></div></div>';
        }).join("") + '</div><div class="score" id="score" aria-live="polite"></div>' +
      '</section>' +

      (hasCw ? '<section class="block" id="b-bulmaca"><div class="block-h"><div class="n">5</div><div><h2>Haftanın bulmacası</h2><p>Bir kutuya tıkla ve yaz. Aynı kutuya tekrar tıklarsan yön değişir. İpucuna tıklayınca o kelimeye gidersin.</p></div></div><div class="cw" id="cw"></div></section>' : "") +

      '<details class="teach"><summary>🧑‍🏫 Öğretmen için: ders akışı, ölçme ve notlar</summary>' +
        '<h4>Ders akışı (' + esc(L.duration) + ')</h4><ol class="flow">' + L.flow.map(function (f) {
          return f.part ? '<li><span></span><span class="part">' + esc(f.part) + '</span></li>' : '<li><span class="min">' + f.m + ' dk</span><span><b>' + esc(f.h) + ':</b> ' + esc(f.d) + '</span></li>';
        }).join("") + '</ol>' +
        '<h4>Ölçme ve değerlendirme: ' + esc(L.assessment.tool) + '</h4><ul>' + L.assessment.items.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join("") + '</ul>' +
        '<h4>Notlar</h4><ul>' + L.teacherNotes.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join("") + '</ul>' +
        '<p><a class="btn" href="#yazdir-' + id + '">🖨️ Çalışma kâğıdı ve cevap anahtarı</a></p>' +
      '</details>' +
      '<div class="pager"><a class="btn" href="#sinif-' + L.grade + '">← ' + L.grade + '. Sınıf dersleri</a><a class="btn" href="#home">Ana sayfa</a></div>';
  }

  function bindLesson(id) {
    var L = BD.lessons[id];
    $$("[data-jump]").forEach(function (a) { a.addEventListener("click", function (e) { e.preventDefault(); document.getElementById(a.getAttribute("data-jump")).scrollIntoView({ behavior: "smooth" }); }); });

    // Ortam değiştirme
    $$("[data-env]").forEach(function (b) { b.onclick = function () { S.env = b.getAttribute("data-env"); saveSettings(); var y = window.scrollY; render(true); window.scrollTo(0, y); }; });

    // Slaytlar
    var deck = $("#deck"), stage = $(".stage", deck), slides = $$(".slide", deck), dots = $$("#dots button"), cur = 0;
    bindSlideImages(deck);
    var fit = function () { stage.style.fontSize = Math.max(9, stage.clientWidth / 46) + "px"; };
    fit(); window.addEventListener("resize", fit);
    var go = function (i) {
      cur = Math.max(0, Math.min(slides.length - 1, i));
      slides.forEach(function (s, k) { s.classList.toggle("on", k === cur); });
      dots.forEach(function (d, k) { d.classList.toggle("on", k === cur); });
      $("#count").textContent = (cur + 1) + " / " + slides.length;
    };
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
    document.addEventListener("fullscreenchange", function () { if (!document.fullscreenElement && deck.classList.contains("fs")) setFs(false); });
    deck.addEventListener("keydown", function (e) {
      if (e.target.tagName === "BUTTON") return; // Boşluk/Enter düğmenin kendi işini yapsın
      if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") { e.preventDefault(); go(cur + 1); }
      if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); go(cur - 1); }
      if (e.key === "Escape" && deck.classList.contains("fs")) setFs(false);
    });

    // Defter
    var nbKey = "nb:" + id;
    var nbProg = function () { var n = store.get(nbKey, []).length, t = L.notebook.length, el = $("#nbProg"); el.textContent = n === t ? "✓ Hepsini yazdın (" + n + "/" + t + ")" : "Yazılan: " + n + " / " + t; el.classList.toggle("full", n === t); };
    $("#nb").addEventListener("change", function (e) {
      var i = +e.target.getAttribute("data-i"), arr = store.get(nbKey, []).filter(function (x) { return x !== i; });
      if (e.target.checked) arr.push(i);
      store.set(nbKey, arr); e.target.parentNode.classList.toggle("done", e.target.checked); nbProg();
    });
    nbProg();

    bindActivity(L);

    // Test
    var answered = 0, correct = 0;
    $$(".q").forEach(function (qEl) {
      var q = L.quiz[+qEl.getAttribute("data-q")];
      $(".opts", qEl).addEventListener("click", function (e) {
        var b = e.target.closest("button"); if (!b || b.disabled) return;
        var pick = +b.getAttribute("data-o"), btns = $$(".opts button", qEl), fb = $(".fb", qEl);
        btns.forEach(function (x) { x.disabled = true; });
        btns[q.a].classList.add("right");
        if (pick === q.a) { correct++; fb.textContent = "Doğru! 👏"; fb.className = "fb r"; }
        else { b.classList.add("wrong"); fb.textContent = "Olmadı. Doğru cevap yeşil olan." + (q.why ? " " + q.why : ""); fb.className = "fb w"; }
        answered++;
        if (answered === L.quiz.length) $("#score").textContent = "Sonuç: " + L.quiz.length + " soruda " + correct + " doğru " + (correct === L.quiz.length ? "🌟" : "");
      });
    });

    if (L.crossword && L.crossword.length) bindCrossword(L);
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
      $(".finish").classList.toggle("show", arr.length === +ol.getAttribute("data-total"));
    });
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
      if (chip) { $$(".chip", $("#sort")).forEach(function (c) { c.classList.remove("sel"); }); if (sel === chip) { sel = null; } else { sel = chip; chip.classList.add("sel"); } chip.classList.remove("ok", "bad"); mark(); e.stopPropagation(); return; }
      if (cat && sel) { sel.classList.remove("sel"); $(".in", cat).appendChild(sel); sel = null; mark(); }
    });
    $$(".sort-cat").forEach(function (c) { c.addEventListener("keydown", function (e) { if ((e.key === "Enter" || e.key === " ") && sel) { e.preventDefault(); c.click(); } }); });
    $("#sortCheck").onclick = function () {
      var placed = 0, ok = 0;
      $$(".sort-cat").forEach(function (cat) {
        var ci = +cat.getAttribute("data-c");
        $$(".chip", cat).forEach(function (ch) { placed++; var good = s.items[+ch.getAttribute("data-i")].c === ci; ch.classList.toggle("ok", good); ch.classList.toggle("bad", !good); if (good) ok++; });
      });
      var m = $("#sortMsg");
      if (ok === s.items.length) { m.textContent = "🎉 Hepsi doğru!"; m.className = "fb r"; }
      else { m.textContent = ok + " / " + s.items.length + " doğru. " + (placed < s.items.length ? "Yerleştirilmemiş kartlar var. " : "") + "Kırmızı kartları başka kutuya taşı."; m.className = "fb w"; }
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
    root.innerHTML = '<div class="cw-board-wrap"><div class="cw-board" style="grid-template-columns:repeat(' + X.cols + ',var(--cell))">' + board + '</div></div>' +
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
    function solved() {
      var all = true;
      X.words.forEach(function (w) {
        var ok = cellsOf(w).every(function (k, i) { return inp(k).value === w.a[i]; });
        $('.cw-clues li[data-w="' + X.words.indexOf(w) + '"]', root).classList.toggle("solved", ok);
        if (!ok) all = false;
      });
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
        if (ch) step(1);
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
      else if (wrong) msg(wrong + " harf yanlış, kırmızı kutulara tekrar bak.", false);
      else msg("Şimdiye kadar hepsi doğru! " + (total - filled) + " kutu kaldı.", true);
    };
    $("#cwHint").onclick = function () {
      var t = cur && inp(cur).value !== X.cells[cur] ? cur : Object.keys(X.cells).filter(function (k) { return inp(k).value !== X.cells[k]; })[0];
      if (!t) return; inp(t).value = X.cells[t]; cellEl(t).classList.add("ok"); persist(); select(t);
      if (solved()) msg("🎉 Harika! Bulmacayı tamamen çözdün.", true);
    };
    $("#cwClear").onclick = function () { $$(".cw-cell", root).forEach(function (el) { $("input", el).value = ""; el.classList.remove("ok", "bad"); }); persist(); solved(); $("#cwMsg").textContent = ""; };
    solved();
  }

  /* ---------- Kazanım haritası ---------- */
  function viewMap() {
    var html = '<nav class="crumbs"><a href="#home">Ana sayfa</a> › Kazanım Haritası</nav>' +
      '<div class="section-h"><h1>Kazanım Haritası</h1><p>Her öğrenme çıktısının süreç bileşenleri ve onları işleyen dersler. Yeşil: hazır bir derste işleniyor. Boş: henüz ders yok.</p></div>';
    ["5", "6"].forEach(function (g) {
      var total = 0, covered = 0, rows = "";
      BD.program[g].themes.forEach(function (t) {
        if (!t.outcomes) { rows += '<tr><td colspan="3"><b>Tema ' + t.no + ':</b> ' + esc(t.name) + ' <span class="hint">· öğrenme çıktıları eklenecek</span></td></tr>'; return; }
        rows += '<tr><td colspan="3" style="background:var(--paper)"><b>Tema ' + t.no + ':</b> ' + esc(t.name) + (t.hours ? ' <span class="hint">· ' + t.hours + ' ders saati</span>' : "") + '</td></tr>';
        t.outcomes.forEach(function (o) {
          var ls = lessonsFor(o.code);
          var weeks = (BD.plan[g] || []).filter(function (x) { return x.outcome === o.code; }).map(function (x) { return x.w; });
          rows += '<tr class="oc"><td><code>' + o.code + '</code></td><td>' + esc(o.title) + '</td><td>' + (weeks.length ? weeks.join(", ") + ". hafta" : "-") + '</td></tr>';
          o.parts.forEach(function (p) {
            total++;
            var by = ls.filter(function (l) { return l.covers.indexOf(p.k) >= 0; });
            if (by.length) covered++;
            rows += '<tr><td style="padding-left:24px"><span class="tag ' + (by.length ? "ready" : "soon") + '">' + p.k + '</span></td><td>' + esc(p.t) + '</td><td>' +
              (by.length ? by.map(function (l) { return '<a href="#ders-' + l.id + '">' + esc(l.title) + '</a>'; }).join("<br>") : '<span class="hint">Ders yok</span>') + '</td></tr>';
          });
        });
      });
      var pct = total ? Math.round(covered / total * 100) : 0;
      html += '<section><div class="row" style="justify-content:space-between;margin-bottom:10px"><h2>' + g + '. Sınıf</h2><div><span class="stat">' + covered + '/' + total + '</span> <span class="hint">süreç bileşeni hazır (%' + pct + ')</span><div class="cov-bar" style="width:220px"><span style="width:' + pct + '%"></span></div></div></div>' +
        '<div class="cov-wrap"><table class="cov-table"><thead><tr><th style="width:120px">Kod</th><th>Öğrenme çıktısı / süreç bileşeni</th><th style="width:220px">Ders</th></tr></thead><tbody>' + rows + '</tbody></table></div></section>';
    });
    return html;
  }

  /* ---------- Öğretmen masası ---------- */
  function viewTeacher() {
    var weeks = ""; for (var i = 1; i <= 36; i++) weeks += '<option value="' + i + '"' + (i === S.week ? " selected" : "") + '>' + i + '. hafta</option>';
    var optBtn = function (key, val, label, small) { return '<button type="button" data-set="' + key + '" data-val="' + val + '" aria-pressed="' + (String(S[key]) === String(val)) + '">' + label + (small ? '<small>' + esc(small) + '</small>' : "") + '</button>'; };
    var lessonList = Object.keys(BD.lessons).map(function (k) { return BD.lessons[k]; }).sort(function (a, b) { return a.grade - b.grade || a.week - b.week; });
    return '<nav class="crumbs"><a href="#home">Ana sayfa</a> › Öğretmen Masası</nav>' +
      '<div class="section-h"><h1>Öğretmen Masası</h1><p>Okulunuzun şartlarını bir kez ayarlayın. Ders sayfalarındaki etkinlikler ve yönergeler buna göre değişir. Ayarlar bu bilgisayarda saklanır.</p></div>' +
      '<div class="card">' +
        '<div class="setting"><h3>📌 Bu hafta</h3><div class="row"><select id="weekSel">' + weeks + '</select><span class="hint">Ana sayfadaki "Bu hafta" kutusu buna göre değişir.</span></div></div>' +
        '<div class="setting"><h3>🏫 Sınıf ortamı</h3><div class="opt-group">' + Object.keys(BD.envs).map(function (k) { return optBtn("env", k, BD.envs[k].icon + " " + BD.envs[k].name, BD.envs[k].desc); }).join("") + '</div></div>' +
        '<div class="setting"><h3>🐧 Bilgisayarlardaki işletim sistemi</h3><div class="opt-group">' + optBtn("os", "pardus", "Pardus", "MEB okullarında ve etkileşimli tahtalarda (ETAP) yaygın") + optBtn("os", "windows", "Windows", "Etkinlik yönergeleri Windows menülerine göre yazılır") + '</div></div>' +
        '<div class="setting"><h3>🌐 İnternet bağlantısı</h3><div class="opt-group">' + optBtn("internet", "true", "İnternet var", "İsteğe bağlı çevrim içi araştırma önerileri gösterilir") + optBtn("internet", "false", "İnternet yok / çok yavaş", "Sadece site içindeki bilgi kartları kullanılır") + '</div></div>' +
      '</div>' +
      '<section><h2 style="margin-bottom:10px">🖨️ Çalışma kâğıtları</h2><p class="hint" style="margin:0 0 10px">Her ders için yazdırılabilir sayfa: konu özeti, deftere yaz, bilgisayarsız etkinlik, test, boş bulmaca ve isteğe bağlı cevap anahtarı.</p><div class="grid-auto">' +
        lessonList.map(function (l) { return '<a class="card" style="text-decoration:none;color:inherit" href="#yazdir-' + l.id + '">' + gTag(l.grade) + ' <span class="tag code">' + l.outcome + '</span><div style="margin-top:6px"><b>' + esc(l.title) + '</b></div><div class="hint">' + l.week + '. hafta</div></a>'; }).join("") +
      '</div></section>' +
      '<section><h2 style="margin-bottom:10px">📚 Diğer</h2><div class="grid-auto"><a class="card" style="text-decoration:none;color:inherit" href="#kazanimlar"><b>🎯 Kazanım Haritası</b><div class="hint">Hangi süreç bileşeni hangi derste işleniyor</div></a></div></section>';
  }
  function bindTeacher() {
    $("#weekSel").onchange = function (e) { S.week = +e.target.value; saveSettings(); };
    $$("[data-set]").forEach(function (b) {
      b.onclick = function () {
        var k = b.getAttribute("data-set"), v = b.getAttribute("data-val");
        S[k] = k === "internet" ? v === "true" : v; saveSettings();
        $$('[data-set="' + k + '"]').forEach(function (x) { x.setAttribute("aria-pressed", x === b); });
      };
    });
  }

  /* ---------- Yazdırılabilir çalışma kâğıdı ---------- */
  var printOpts = store.get("printOpts", { konu: true, defter: true, etkinlik: true, test: true, bulmaca: true, cevap: false, gorsel: false });
  function viewPrint(id) {
    var L = BD.lessons[id]; if (!L) return viewNotFound();
    var oc = outcome(L.outcome), K = BD.envs.kagit, A = L.activities.kagit;
    var box = function (k, label) { return '<label><input type="checkbox" data-po="' + k + '"' + (printOpts[k] ? " checked" : "") + '> ' + label + '</label>'; };
    var h = '<div class="print-bar no-print"><a class="btn" href="#ders-' + id + '">← Derse dön</a><button type="button" class="btn primary" id="doPrint">🖨️ Yazdır</button>' +
      box("konu", "Konu özeti") + box("defter", "Deftere yaz") + box("etkinlik", "Etkinlik") + box("test", "Test") + box("bulmaca", "Bulmaca") + box("cevap", "Cevap anahtarı") + box("gorsel", "Slayt görselleri") +
      '<span class="hint" id="printMsg"></span></div>';
    h += '<div class="sheet">';
    h += '<div class="row" style="justify-content:space-between"><b>Bilişim Teknolojileri ve Yazılım · ' + L.grade + '. Sınıf · ' + L.week + '. Hafta</b><span>' + L.outcome + '</span></div>';
    h += '<h1 style="margin-top:8px">' + esc(L.title) + '</h1><div class="who"><div>Ad Soyad:</div><div>Sınıf/Şube:</div><div>No:</div></div>';
    h += '<p style="margin:0;font-size:.9rem"><b>Öğrenme çıktısı:</b> ' + L.outcome + ' ' + esc(oc ? oc.title : "") + '</p>';
    if (printOpts.konu) {
      h += '<h2>Konu özeti</h2>' + L.slides.filter(function (s) { return s.type !== "title" && !s.end; }).map(function (s) {
        return '<div class="keep" style="margin-bottom:8px"><b>' + esc(s.h || s.alt || "") + '</b>' + (s.p ? ' ' + esc(s.p) : "") +
          (s.list ? '<ul>' + s.list.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join("") + '</ul>' : "") +
          (s.cols ? '<ul>' + s.cols.map(function (c) { return '<li><b>' + esc(c.h) + ':</b> ' + esc(c.p) + '</li>'; }).join("") + '</ul>' : "") +
          (s.tree ? '<pre style="margin:4px 0;font-family:var(--mono);font-size:.85rem">' + esc(s.tree) + '</pre>' : "") +
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
    if (printOpts.bulmaca && L.crossword) {
      var X = window.buildCrossword(L.crossword), nums = {}, grid = "";
      X.words.forEach(function (w) { nums[w.r + "," + w.c] = w.n; });
      for (var r = 0; r < X.rows; r++) for (var c = 0; c < X.cols; c++) { var k = r + "," + c; grid += X.cells[k] ? '<div class="c">' + (nums[k] ? '<small>' + nums[k] + '</small>' : "") + '</div>' : "<div></div>"; }
      var cl = function (d) { return X.words.filter(function (w) { return w.dir === d; }).sort(function (a, b) { return a.n - b.n; }).map(function (w) { return '<li>' + w.n + '. ' + esc(w.clue) + ' (' + w.a.length + ')</li>'; }).join(""); };
      h += '<h2>Bulmaca</h2><div class="keep"><div class="print-cw" style="grid-template-columns:repeat(' + X.cols + ',30px)">' + grid + '</div>' +
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;font-size:.9rem"><div><b>Soldan sağa</b><ul style="list-style:none;padding:0">' + cl("a") + '</ul></div><div><b>Yukarıdan aşağıya</b><ul style="list-style:none;padding:0">' + cl("d") + '</ul></div></div></div>';
    }
    if (printOpts.cevap) {
      h += '<h2>Cevap anahtarı (öğretmen için)</h2><p style="margin:0">' + L.quiz.map(function (q, i) { return (i + 1) + ") " + String.fromCharCode(65 + q.a); }).join(" · ") + '</p>';
      if (L.crossword) { var X2 = window.buildCrossword(L.crossword); h += '<p style="margin:6px 0 0">Bulmaca: ' + X2.words.slice().sort(function (a, b) { return a.n - b.n || (a.dir > b.dir ? 1 : -1); }).map(function (w) { return w.n + (w.dir === "a" ? "→" : "↓") + " " + w.a; }).join(", ") + '</p>'; }
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

  function viewNotFound() { return '<div class="empty"><h2>Bu sayfa bulunamadı</h2><p>Ana sayfaya dönüp sınıfını seçebilirsin.</p><a class="btn" href="#home">Ana sayfaya dön</a></div>'; }

  /* ---------- Arama ---------- */
  function initSearch() {
    var qIn = $("#q"), res = $("#results");
    var items = [];
    ["5", "6"].forEach(function (g) { (BD.plan[g] || []).forEach(function (p) { var o = outcome(p.outcome); items.push({ g: g, t: p.title, w: p.w, code: p.outcome, lesson: p.lesson, hay: norm(p.title + " " + p.outcome + " " + (o ? o.title : "")) }); }); });
    qIn.addEventListener("input", function () {
      var v = norm(qIn.value.trim());
      if (v.length < 2) { res.classList.remove("show"); return; }
      var hits = items.filter(function (x) { return x.hay.indexOf(v) >= 0; }).slice(0, 8);
      res.innerHTML = hits.length ? hits.map(function (x) { return '<a href="' + (x.lesson ? "#ders-" + x.lesson : "#sinif-" + x.g) + '">' + esc(x.t) + '<small>' + x.g + '. Sınıf · ' + x.w + '. Hafta · ' + x.code + ' · ' + (x.lesson ? "Hazır" : "Yakında") + '</small></a>'; }).join("") : "<div>Sonuç bulunamadı.</div>";
      res.classList.add("show");
    });
    res.addEventListener("click", function (e) { if (e.target.closest("a")) { res.classList.remove("show"); qIn.value = ""; } });
    document.addEventListener("click", function (e) { if (!e.target.closest(".search")) res.classList.remove("show"); });
    qIn.addEventListener("keydown", function (e) { if (e.key === "Escape") res.classList.remove("show"); if (e.key === "Enter") { var a = $("a", res); if (a) { location.hash = a.getAttribute("href"); res.classList.remove("show"); qIn.value = ""; } } });
  }

  /* ---------- Yönlendirme ---------- */
  function render(keepScroll) {
    var h = (location.hash || "#home").slice(1), app = $("#app"), m;
    if (h === "home" || h === "") app.innerHTML = viewHome();
    else if ((m = h.match(/^sinif-(5|6)$/))) app.innerHTML = viewGrade(m[1]);
    else if ((m = h.match(/^ders-(.+)$/))) { app.innerHTML = viewLesson(m[1]); if (BD.lessons[m[1]]) bindLesson(m[1]); }
    else if ((m = h.match(/^yazdir-(.+)$/))) { app.innerHTML = viewPrint(m[1]); if (BD.lessons[m[1]]) bindPrint(m[1]); }
    else if (h === "kazanimlar") app.innerHTML = viewMap();
    else if (h === "ogretmen") { app.innerHTML = viewTeacher(); bindTeacher(); }
    else app.innerHTML = viewNotFound();
    var section = h.indexOf("ders-5") === 0 || h.indexOf("yazdir-5") === 0 ? "sinif-5" : h.indexOf("ders-6") === 0 || h.indexOf("yazdir-6") === 0 ? "sinif-6" : h;
    $$(".top nav a").forEach(function (a) { if (a.getAttribute("href") === "#" + section) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current"); });
    if (!keepScroll) window.scrollTo(0, 0);
  }

  window.addEventListener("hashchange", function () { render(false); });
  var bigBtn = $("#bigText");
  var setBig = function (on) { document.documentElement.classList.toggle("big", on); bigBtn.setAttribute("aria-pressed", on); store.set("big", on); };
  bigBtn.onclick = function () { setBig(!document.documentElement.classList.contains("big")); };
  setBig(store.get("big", false));
  initSearch();
  render(false);
})();
