#!/usr/bin/env node
/* =====================================================================
   Bilişim Defteri — içerik doğrulama betiği
   Sitenin parçası değildir, npm paketi kullanmaz. Node'un yerleşik
   vm modülüyle program.js, plan.js, crossword.js, shuffle.js ve content/lessons/
   altındaki ders dosyalarını tarayıcıdaki gibi sırayla yükler ve
   ICERIK-REHBERI.md kurallarına göre kontrol eder.

   Kullanım: node tools/dogrula.js
   HATA varsa çıkış kodu 1, yoksa 0 döner. _SABLON.js atlanır.
   ===================================================================== */
"use strict";
var fs = require("fs");
var path = require("path");
var vm = require("vm");

var ROOT = path.join(__dirname, "..");
var errors = [];
var warnings = [];

function err(file, msg) { errors.push({ file: file, msg: msg }); }
function warn(file, msg) { warnings.push({ file: file, msg: msg }); }

/* ---------- Sandbox: içerik dosyalarını tarayıcıdaki gibi yükle ---------- */
var sandbox = { console: console };
sandbox.window = sandbox;
vm.createContext(sandbox);

function loadFile(relPath) {
  var full = path.join(ROOT, relPath);
  var code = fs.readFileSync(full, "utf8");
  new vm.Script(code, { filename: relPath }).runInContext(sandbox);
}

loadFile("content/program.js");
loadFile("content/plan.js");
loadFile("assets/crossword.js");
loadFile("assets/shuffle.js");

var lessonsDir = path.join(ROOT, "content/lessons");
var lessonFiles = fs.readdirSync(lessonsDir).filter(function (f) {
  return f.slice(-3) === ".js" && f !== "_SABLON.js";
});

var fileForId = {};
lessonFiles.forEach(function (f) {
  var relPath = "content/lessons/" + f;
  var before = Object.keys(sandbox.BD.lessons || {});
  loadFile(relPath);
  var after = Object.keys(sandbox.BD.lessons);
  var added = after.filter(function (id) { return before.indexOf(id) < 0; });
  var baseName = f.slice(0, -3);
  if (added.length !== 1) {
    err(relPath, "dosya tam olarak bir BD.lesson({...}) çağırmalı (bulunan: " + added.length + ")");
    return;
  }
  var id = added[0];
  fileForId[id] = relPath;
  if (id !== baseName) err(relPath, "ders id'si \"" + id + "\" dosya adıyla eşleşmiyor (beklenen: \"" + baseName + "\")");
});

var BD = sandbox.BD;
var indexHtml = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");

function findOutcome(code) {
  var grades = Object.keys(BD.program || {});
  for (var i = 0; i < grades.length; i++) {
    var themes = BD.program[grades[i]].themes || [];
    for (var j = 0; j < themes.length; j++) {
      var list = themes[j].outcomes;
      if (!list) continue;
      for (var k = 0; k < list.length; k++) if (list[k].code === code) return list[k];
    }
  }
  return null;
}

/* ---------- Ders bazlı kontroller ---------- */
function checkLesson(f, L) {
  // HATA: outcome kodu program.js'te var mı
  if (!findOutcome(L.outcome)) err(f, "outcome kodu \"" + L.outcome + "\" program.js'te bulunamadı");

  var covers = L.covers || [];

  // HATA: covers'taki her bileşen için en az bir slayt, bir defter maddesi, bir test sorusu
  var slideB = {}, nbB = {}, quizB = {};
  (L.slides || []).forEach(function (s) { if (s.b) slideB[s.b] = true; });
  (L.notebook || []).forEach(function (n) { if (n.b) nbB[n.b] = true; });
  (L.quiz || []).forEach(function (q) { if (q.b) quizB[q.b] = true; });
  covers.forEach(function (k) {
    if (!slideB[k]) err(f, "süreç bileşeni \"" + k + "\" için slayt (b alanı) yok");
    if (!nbB[k]) err(f, "süreç bileşeni \"" + k + "\" için defter maddesi (b alanı) yok");
    if (!quizB[k]) err(f, "süreç bileşeni \"" + k + "\" için test sorusu (b alanı) yok");
  });

  // HATA/UYARI: slayt görselleri (img/side) — alt metni zorunlu, dosya var mı, boyut
  (L.slides || []).forEach(function (s, i) {
    var file = s.img || s.side;
    if (!file) return;
    if (!s.alt || !String(s.alt).trim()) {
      err(f, "slayt " + (i + 1) + ": img/side kullanılıyor ama alt metni yok");
    }
    var imgPath = path.join(ROOT, "content/img", L.id, file);
    if (!fs.existsSync(imgPath)) {
      err(f, "slayt " + (i + 1) + ": görsel dosyası bulunamadı (content/img/" + L.id + "/" + file + ")");
    } else {
      var size = fs.statSync(imgPath).size;
      if (size > 300 * 1024) {
        warn(f, "slayt " + (i + 1) + ": görsel \"" + file + "\" " + Math.round(size / 1024) + " KB (önerilen ≤300 KB)");
      }
    }
  });

  // HATA: activities.lab/tahta/kagit dolu mu + b kapsamı + kagit.sheet
  // UYARI: adım sayısı 5-9, lab'da program/menü adımlarında pardus/windows
  var A = L.activities || {};
  ["lab", "tahta", "kagit"].forEach(function (envKey) {
    var a = A[envKey];
    if (!a || !a.title || !a.goal || !a.steps || !a.steps.length) {
      err(f, "activities." + envKey + " dolu değil (title/goal/steps gerekli)");
      return;
    }
    var b = a.b || [];
    var missing = covers.filter(function (k) { return b.indexOf(k) < 0; });
    if (missing.length) err(f, "activities." + envKey + ".b şu bileşenleri kapsamıyor: " + missing.join(", "));

    if (envKey === "kagit" && (!a.sheet || !a.sheet.length)) err(f, "activities.kagit.sheet alanı yok");

    if (a.steps.length < 5 || a.steps.length > 9) warn(f, "activities." + envKey + " adım sayısı " + a.steps.length + " (önerilen 5-9)");

    if (envKey === "lab") {
      a.steps.forEach(function (st, i) {
        var text = typeof st === "string" ? st : (st.t || "");
        var hasOS = typeof st === "object" && st !== null && (st.pardus || st.windows);
        if (!hasOS && /program|menü|menu/i.test(text)) {
          warn(f, "activities.lab adım " + (i + 1) + ": program/menü açma geçiyor ama pardus/windows yönergesi yok (kontrol edin)");
        }
      });
    }
  });

  // HATA: test sorularında cevap indeksi geçerli mi
  (L.quiz || []).forEach(function (q, i) {
    if (typeof q.a !== "number" || q.a < 0 || q.a >= (q.o || []).length) {
      err(f, "quiz sorusu " + (i + 1) + ": cevap indeksi (a: " + q.a + ") geçersiz");
    }
  });

  // HATA: sınıflandırma kartları karışmıyorsa oyun cevabı kendisi gösterir
  if (L.sort && L.sort.items && L.sort.items.length) {
    var order = sandbox.shuffleOrder(L.sort.items.length, L.id);
    if (order.every(function (v, i) { return v === i; })) {
      err(f, "sınıflandırma kartları karıştırılınca orijinal sırada kalıyor (kart sayısını ya da sırasını değiştirin)");
    }
  }

  if (L.crossword && L.crossword.length) {
    // HATA: temizlenince harf kaybeden kelime (boşluk, tire, tanınmayan harf)
    L.crossword.forEach(function (e) {
      var raw = String(e.a).normalize("NFC"), clean = sandbox.cwClean(raw);
      if (clean.length !== raw.length) {
        err(f, "bulmaca kelimesi \"" + e.a + "\" bulmacaya \"" + clean + "\" olarak giriyor (boşluk, tire ya da tanınmayan harf var)");
      }
    });

    // HATA: bulmacada yerleşmeyen kelime var mı
    var built = sandbox.buildCrossword(L.crossword);
    if (built.skipped && built.skipped.length) {
      err(f, "bulmacaya yerleşmeyen kelime(ler): " + built.skipped.map(function (w) { return w.a; }).join(", "));
    }

    // HATA: ızgaradaki 2+ harflik her dizi yerleştirilmiş bir kelime olmalı (ipucusuz harf dizisi olmasın)
    var placedKeys = built.words.map(function (w) { return w.dir + ":" + w.r + "," + w.c + ":" + w.a; });
    ["a", "d"].forEach(function (dir) {
      var dr = dir === "d" ? 1 : 0, dc = dir === "a" ? 1 : 0;
      for (var r = 0; r < built.rows; r++) for (var c = 0; c < built.cols; c++) {
        if (!built.cells[r + "," + c] || built.cells[(r - dr) + "," + (c - dc)]) continue;
        var run = "", rr = r, cc = c;
        while (built.cells[rr + "," + cc]) { run += built.cells[rr + "," + cc]; rr += dr; cc += dc; }
        if (run.length > 1 && placedKeys.indexOf(dir + ":" + r + "," + c + ":" + run) < 0) {
          err(f, "bulmaca ızgarasında ipucusuz harf dizisi: " + run + " (" + (dir === "a" ? "soldan sağa" : "yukarıdan aşağıya") + ", satır " + (r + 1) + " sütun " + (c + 1) + ")");
        }
      }
    });
  }

  // UYARI: ICERIK-REHBERI.md §4 ölçüleri
  var slideCount = (L.slides || []).length;
  if (slideCount < 7 || slideCount > 11) warn(f, "slayt sayısı " + slideCount + " (önerilen 7-11)");
  var nbCount = (L.notebook || []).length;
  if (nbCount < 3 || nbCount > 5) warn(f, "defter madde sayısı " + nbCount + " (önerilen 3-5)");
  var quizCount = (L.quiz || []).length;
  if (quizCount < 3 || quizCount > 5) warn(f, "test soru sayısı " + quizCount + " (önerilen 3-5)");
  var cwCount = (L.crossword || []).length;
  if (cwCount < 6 || cwCount > 8) warn(f, "bulmaca kelime sayısı " + cwCount + " (önerilen 6-8)");

  // UYARI: ders akışı toplamı 80 dk
  var total = 0;
  (L.flow || []).forEach(function (step) { if (typeof step.m === "number") total += step.m; });
  if (total !== 80) warn(f, "ders akışı toplamı " + total + " dk (beklenen 80 dk)");
}

Object.keys(BD.lessons).forEach(function (id) {
  checkLesson(fileForId[id] || (id + ".js"), BD.lessons[id]);
});

/* ---------- plan.js kontrolleri ---------- */
Object.keys(BD.plan || {}).forEach(function (grade) {
  BD.plan[grade].forEach(function (entry) {
    if (!entry.lesson) return;
    var f = "content/plan.js";
    if (!BD.lessons[entry.lesson]) {
      err(f, grade + ". sınıf " + entry.w + ". hafta: lesson id \"" + entry.lesson + "\" bulunamadı");
      return;
    }
    var scriptTag = "content/lessons/" + entry.lesson + ".js";
    if (indexHtml.indexOf(scriptTag) < 0) {
      err(f, grade + ". sınıf " + entry.w + ". hafta: \"" + scriptTag + "\" index.html'e <script> olarak eklenmemiş");
    }
  });
});

/* ---------- Sonuçlar ---------- */
console.log("Bilişim Defteri doğrulama\n");
if (errors.length) {
  console.log("HATA (" + errors.length + "):");
  errors.forEach(function (e) { console.log("  ✗ " + e.file + ": " + e.msg); });
}
if (warnings.length) {
  console.log((errors.length ? "\n" : "") + "UYARI (" + warnings.length + "):");
  warnings.forEach(function (w) { console.log("  ⚠ " + w.file + ": " + w.msg); });
}
if (!errors.length && !warnings.length) console.log("Hata ya da uyarı yok, her şey tamam.");
console.log("\nToplam: " + errors.length + " hata, " + warnings.length + " uyarı.");
process.exit(errors.length ? 1 : 0);
