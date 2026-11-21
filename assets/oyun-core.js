/* Oyun bölümünün mantığı. DOM'a dokunmaz. Test: node --test tools/oyun-core.test.js
   gameKind(L): dersin oyunu. story varsa "macera", yoksa sort.oyun ("balon" | "yakala" | "bant", yoksa "balon").
   gameRounds(sort, seedText): balon ve yakala turları [{cat, need}]. Her turda bir grup aranır.
   gamePick(items, target, caught, onScreen, rand): ekrana gelecek sıradaki kartın sıra no'su, yoksa -1. */
window.GAME_KINDS = ["balon", "yakala", "bant"];
window.gameKind = function (L) {
  if (L.story) return "macera";
  if (!L.sort) return null;
  return L.sort.oyun || "balon";
};
// En çok 3 tur. Her tur ayrı bir grubu arar; grubun kartları azsa hepsi, 2 gruplu derste 4, ötekinde 3 kart.
// Aranan grubun dışında kart kalmalı (yoksa ekrana yanlış kart gelmez): bu yüzden en az 2 grup gerekir.
window.gameRounds = function (sort, seedText) {
  var counts = sort.cats.map(function () { return 0; }), cats = [];
  sort.items.forEach(function (x) { counts[x.c]++; });
  counts.forEach(function (n, c) { if (n >= 2) cats.push(c); });
  if (cats.length < 2) return [];
  var need = cats.length === 2 ? 4 : 3;
  return window.shuffleOrder(cats.length, seedText).slice(0, 3).map(function (k) {
    var c = cats[k];
    return { cat: c, need: Math.min(need, counts[c]) };
  });
};
// Aranan kartlarla ötekiler aşağı yukarı yarı yarıya gelir. Yakalanan aranan kart bir daha gelmez,
// öteki kartlar tekrar gelebilir. Ekranda olan kart ikinci kez çıkmaz.
window.gamePick = function (items, target, caught, onScreen, rand) {
  var t = [], o = [];
  items.forEach(function (x, i) {
    if (onScreen.indexOf(i) >= 0 || caught.indexOf(i) >= 0) return;
    (x.c === target ? t : o).push(i);
  });
  var pool = t.length && (!o.length || rand() < 0.5) ? t : o;
  return pool.length ? pool[Math.floor(rand() * pool.length)] : -1;
};
