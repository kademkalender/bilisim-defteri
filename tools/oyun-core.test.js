/* assets/oyun-core.js testleri. Çalıştırma: node --test tools/ */
var test = require("node:test"), assert = require("node:assert");
var vm = require("vm"), fs = require("fs"), path = require("path");

var ROOT = path.join(__dirname, ".."), box = { console: console };
box.window = box;
vm.createContext(box);
var run = function (f) { vm.runInContext(fs.readFileSync(path.join(ROOT, f), "utf8"), box, { filename: f }); };
["content/program.js", "content/plan.js", "assets/shuffle.js", "assets/oyun-core.js"].forEach(run);
fs.readdirSync(path.join(ROOT, "content/lessons")).filter(function (f) { return /\.js$/.test(f) && f !== "_SABLON.js"; })
  .forEach(function (f) { run("content/lessons/" + f); });
var lessons = Object.keys(box.BD.lessons).map(function (k) { return box.BD.lessons[k]; });
var plain = function (x) { return JSON.parse(JSON.stringify(x)); }; // vm nesnesi başka prototipte, düz nesneye çevir
var sortOf = function (cats, counts) {
  var items = []; counts.forEach(function (n, c) { for (var i = 0; i < n; i++) items.push({ t: cats[c] + i, c: c }); });
  return { cats: cats, items: items };
};

test("oyun türü: story macera, sort.oyun yoksa balon", function () {
  assert.strictEqual(box.gameKind({ story: {} }), "macera");
  assert.strictEqual(box.gameKind({ sort: { oyun: "bant" } }), "bant");
  assert.strictEqual(box.gameKind({ sort: {} }), "balon");
  assert.strictEqual(box.gameKind({}), null);
});

test("en çok 3 tur, her tur başka grup", function () {
  var R = plain(box.gameRounds(sortOf(["a", "b", "c", "d", "e"], [2, 2, 2, 2, 2]), "x"));
  assert.strictEqual(R.length, 3);
  assert.strictEqual(new Set(R.map(function (q) { return q.cat; })).size, 3);
  R.forEach(function (q) { assert.strictEqual(q.need, 2); }); // grupta 2 kart var, 3 istenmez
});

test("iki gruplu derste iki tur, 4'er kart", function () {
  var R = plain(box.gameRounds(sortOf(["a", "b"], [4, 4]), "x"));
  assert.deepStrictEqual(R.map(function (q) { return q.need; }), [4, 4]);
});

test("tek kartlı grup aranmaz, tek grup kalırsa oyun kurulmaz", function () {
  var R = plain(box.gameRounds(sortOf(["a", "b", "c"], [3, 1, 3]), "x"));
  assert.ok(R.every(function (q) { return q.cat !== 1; }));
  assert.deepStrictEqual(plain(box.gameRounds(sortOf(["a", "b"], [3, 1]), "x")), []);
});

test("turlar aynı derste hep aynı", function () {
  var s = sortOf(["a", "b", "c", "d"], [3, 3, 3, 3]);
  assert.deepStrictEqual(plain(box.gameRounds(s, "5-1-1")), plain(box.gameRounds(s, "5-1-1")));
});

test("seçici: yakalanan ve ekrandaki kart gelmez", function () {
  var s = sortOf(["a", "b"], [2, 2]); // 0,1 a; 2,3 b
  for (var k = 0; k < 50; k++) {
    var i = box.gamePick(s.items, 0, [0], [2], Math.random);
    assert.ok(i === 1 || i === 3, "gelen: " + i);
  }
});

test("seçici: aranan kart kalmazsa öteki, hiçbiri kalmazsa -1", function () {
  var s = sortOf(["a", "b"], [2, 2]);
  assert.strictEqual(box.gamePick(s.items, 0, [0, 1], [2], function () { return 0; }), 3);
  assert.strictEqual(box.gamePick(s.items, 0, [0, 1], [2, 3], Math.random), -1);
});

test("seçici: aranan kartlar aşağı yukarı yarı yarıya", function () {
  var s = sortOf(["a", "b", "c"], [3, 3, 3]), hit = 0, N = 2000;
  for (var k = 0; k < N; k++) if (s.items[box.gamePick(s.items, 1, [], [], Math.random)].c === 1) hit++;
  assert.ok(hit / N > 0.4 && hit / N < 0.6, "oran: " + hit / N);
});

test("her dersin oyunu kurulur", function () {
  lessons.forEach(function (L) {
    var k = box.gameKind(L); if (!k) return;
    if (k === "macera") assert.ok(L.story.scenes.length >= 3, L.id);
    else if (k === "bant") assert.ok(L.sort.items.length >= 4, L.id);
    else assert.ok(box.gameRounds(L.sort, L.id).length >= 2, L.id);
  });
});
