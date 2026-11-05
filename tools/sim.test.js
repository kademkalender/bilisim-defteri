/* assets/sim-core.js testleri. Çalıştırma: node --test tools/ */
var test = require("node:test"), assert = require("node:assert");
var vm = require("vm"), fs = require("fs"), path = require("path");

var ROOT = path.join(__dirname, "..");
var box = { window: {} };
box.window.BD = { lessons: {}, lesson: function (L) { box.window.BD.lessons[L.id] = L; } };
vm.createContext(box);
var load = function (f) { vm.runInContext("var window = this.window, BD = window.BD;" + fs.readFileSync(path.join(ROOT, f), "utf8"), box); };
load("assets/sim-core.js");
fs.readdirSync(path.join(ROOT, "content/lessons")).filter(function (f) { return /\.js$/.test(f) && f !== "_SABLON.js"; })
  .forEach(function (f) { load("content/lessons/" + f); });
var C = box.window.SimCore, plain = function (o) { return JSON.parse(JSON.stringify(o)); };

var start = { "siir.txt": 6000, "kedim.png": 800000, "Eski": { "not.txt": 1000 } };
var run = function (st, op) { var r = C.apply(st, op); assert.ok(!r.ev.err, r.ev.err); return r.state; };

test("klasör oluştur, taşı, kopyala, sil, geri yükle", function () {
  var s0 = C.create(start, "windows");
  var s = run(s0, ["mkdir", "Masaüstü", "Yazilar"]);
  s = run(s, ["move", "Masaüstü/siir.txt", "Masaüstü/Yazilar"]);
  assert.ok(C.find(s, "Masaüstü/Yazilar/siir.txt"));
  assert.ok(!C.find(s, "Masaüstü/siir.txt"));
  assert.ok(!C.find(s0, "Masaüstü/Yazilar"), "eski durum değişmemeli");
  s = run(s, ["copy", "Masaüstü/Yazilar/siir.txt", "Masaüstü/Yazilar"]);
  assert.ok(C.find(s, "Masaüstü/Yazilar/siir - Kopya.txt"));
  s = run(s, ["delete", "Masaüstü/Eski"]);
  assert.strictEqual(s.trash.length, 1);
  s = run(s, ["restore", 0]);
  assert.ok(C.find(s, "Masaüstü/Eski/not.txt"));
});

test("Pardus'ta kopya adı ve kayıt uzantısı farklı", function () {
  var s = run(C.create(start, "pardus"), ["copy", "Masaüstü/siir.txt", "Masaüstü"]);
  assert.ok(C.find(s, "Masaüstü/siir (kopya).txt"));
  s = run(s, ["app", "yazi"]); s = run(s, ["type", "Ayşe"]); s = run(s, ["save", "Masaüstü", "deneme"]);
  assert.ok(C.find(s, "Masaüstü/deneme.odt"));
});

test("geçersiz işlem durumu değiştirmez, nazik hata verir", function () {
  var s = C.create(start, "windows"), r = C.apply(s, ["mkdir", "Masaüstü", "siir.txt"]);
  assert.ok(r.ev.err); assert.strictEqual(r.state, s);
  assert.ok(C.apply(s, ["move", "Masaüstü/Eski", "Masaüstü/Eski"]).ev.err, "klasör kendi içine taşınamaz");
  assert.ok(C.apply(s, ["rename", "Masaüstü/siir.txt", "a/b"]).ev.err);
});

test("yeniden adlandırmada silinen uzantı korunur", function () {
  var s = run(C.create(start, "windows"), ["rename", "Masaüstü/kedim.png", "5A_Ali_Resim1"]);
  assert.ok(C.find(s, "Masaüstü/5A_Ali_Resim1.png"));
});

test("sıkıştırma: yazı çok, resim az küçülür", function () {
  var s = run(C.create(start, "windows"), ["zip", "Masaüstü/siir.txt"]);
  s = run(s, ["zip", "Masaüstü/kedim.png"]);
  var t = C.find(s, "Masaüstü/siir.zip").entries[0], p = C.find(s, "Masaüstü/kedim.zip").entries[0];
  assert.ok(t.zsize / t.size < 0.5);
  assert.ok(p.zsize / p.size > 0.9);
  s = run(s, ["zip", "Masaüstü/Eski"]);
  assert.strictEqual(C.find(s, "Masaüstü/Eski.zip").before, 1000);
});

test("öğrenci adı biçimi: Türkçe harf kabul, boşluk uyarı", function () {
  var task = { id: "t", check: { type: "exists", path: "Masaüstü/*", kind: "folder", format: "ogrenci", as: "ana" } };
  var adv = function (name) { return C.advance(run(C.create({}, "windows"), ["mkdir", "Masaüstü", name]), [task], 0); };
  var a = adv("5A_Ayşe");
  assert.strictEqual(a.idx, 1); assert.strictEqual(a.state.vars.ana, "5A_Ayşe");
  assert.strictEqual(adv("6ç_İlknur").idx, 1);
  var w = adv("5A Ayşe"); assert.strictEqual(w.idx, 0); assert.ok(/boşluk/.test(w.warn));
  w = adv("Ayşe"); assert.strictEqual(w.idx, 0); assert.ok(/Biçim/.test(w.warn));
});

test("yanlış işlem mesajı görevin işlemini söyler", function () {
  var task = { id: "t", check: { type: "exists", path: "Masaüstü/yeni.txt" } };
  var r = C.apply(C.create(start, "windows"), ["delete", "Masaüstü/Eski"]);
  var m = C.feedback(task, r.ev, "pardus");
  assert.ok(/«Eski» klasörünü sildin/.test(m), m);
  assert.ok(/adını değiştirmek|klasör oluşturmak/.test(m));
  assert.ok(/Çöp Kutusu/.test(m));
  assert.strictEqual(C.feedback(task, C.apply(C.create(start, "windows"), ["open", "Masaüstü/Eski"]).ev), null, "açmak yanlış sayılmaz");
});

test("taşıma görevi dosya silinerek geçilemez", function () {
  var task = { id: "t", check: { type: "allIn", ext: ["txt"], to: "Masaüstü/Eski" } };
  var s = run(C.create(start, "windows"), ["delete", "Masaüstü/siir.txt"]);
  var a = C.advance(s, [task], 0);
  assert.strictEqual(a.idx, 0, "çöpte .txt varken tamamlanmamalı");
  assert.ok(/geri yükle/.test(a.warn), a.warn);
  s = run(run(s, ["restore", 0]), ["move", "Masaüstü/siir.txt", "Masaüstü/Eski"]);
  assert.strictEqual(C.advance(s, [task], 0).idx, 1);
});

test("boş dosya sıkıştırılabilir (boyut 0)", function () {
  var s = run(run(run(C.create({}, "windows"), ["app", "yazi"]), ["save", "Masaüstü", "bos"]), ["zip", "Masaüstü/bos.txt"]);
  assert.strictEqual(C.find(s, "Masaüstü/bos.zip").entries[0].size, 0);
});

var sims = Object.keys(box.window.BD.lessons).map(function (k) { return box.window.BD.lessons[k]; }).filter(function (L) { return L.sim; });
sims.forEach(function (L) {
  ["windows", "pardus"].forEach(function (os) {
    test(L.id + " çözümü bütün görevleri bitirir (" + os + ")", function () {
      var r = C.play(L.sim, os);
      assert.deepStrictEqual(plain(r.errors), []);
      assert.strictEqual(r.idx, L.sim.tasks.length, "takılan görev: " + (L.sim.tasks[r.idx] || {}).id);
    });
  });
  test(L.id + " görevleri boş masaüstünde kendiliğinden bitmez", function () {
    assert.strictEqual(C.advance(C.create(L.sim.start, "windows"), L.sim.tasks, 0).idx, 0);
  });
});
