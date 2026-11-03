/* assets/hafta.js testleri. Çalıştırma: node --test tools/ */
var test = require("node:test"), assert = require("node:assert");
var vm = require("vm"), fs = require("fs"), path = require("path");

var box = { window: {} };
box.window.BD = { lessons: {} };
vm.createContext(box);
["content/plan.js", "assets/hafta.js"].forEach(function (f) {
  vm.runInContext("var window = this.window, BD = window.BD;" + fs.readFileSync(path.join(__dirname, "..", f), "utf8"), box);
});
var cal = box.window.BD.calendar, week = function (s) { var p = s.split("-"); return JSON.parse(JSON.stringify(box.window.schoolWeek(new Date(+p[0], +p[1] - 1, +p[2]), cal))); }; // vm nesnesi başka prototipte, düz nesneye çevir

test("ilk gün 1. hafta", function () { assert.deepStrictEqual(week("2026-09-14"), { w: 1, state: "ders" }); });
test("hafta sonu o haftaya sayılır", function () { assert.deepStrictEqual(week("2026-09-20"), { w: 1, state: "ders" }); });
test("3 Kasım 2026 8. hafta", function () { assert.deepStrictEqual(week("2026-11-03"), { w: 8, state: "ders" }); });
test("ara tatilde sonraki öğretim haftası", function () { assert.deepStrictEqual(week("2026-11-18"), { w: 10, state: "tatil" }); });
test("ara tatilden sonra hafta atlamaz", function () { assert.deepStrictEqual(week("2026-11-23"), { w: 10, state: "ders" }); });
test("1. dönem 18 hafta", function () { assert.deepStrictEqual(week("2027-01-22"), { w: 18, state: "ders" }); });
test("yarıyılın iki haftası da tatil", function () {
  assert.deepStrictEqual(week("2027-01-27"), { w: 19, state: "tatil" });
  assert.deepStrictEqual(week("2027-02-03"), { w: 19, state: "tatil" });
});
test("2. dönem ilk gün 19. hafta", function () { assert.deepStrictEqual(week("2027-02-08"), { w: 19, state: "ders" }); });
test("yıl başlamadan 1. hafta", function () { assert.deepStrictEqual(week("2026-08-20"), { w: 1, state: "once" }); });
test("yıl bitince son hafta", function () { assert.deepStrictEqual(week("2027-07-10"), { w: 37, state: "sonra" }); });
