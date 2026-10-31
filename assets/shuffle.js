/* Sınıflandırma oyunu için tekrarlanabilir karıştırma
   shuffleOrder(n, seedText): 0..n-1 sayılarını seedText'e (ders id'si) göre karıştırır.
   Aynı ders hep aynı sırayı alır. Sıra orijinalle aynı çıkarsa bir kez daha karıştırılır.
   tools/dogrula.js de bunu yükler: karışmayan sıra HATA sayılır. */
window.shuffleOrder = function (n, seedText) {
  // FNV-1a ile metinden tohum, mulberry32 ile sayı üretimi
  var h = 2166136261, i;
  for (i = 0; i < seedText.length; i++) { h ^= seedText.charCodeAt(i); h = Math.imul(h, 16777619); }
  var rand = function () {
    h = (h + 0x6D2B79F5) | 0;
    var t = Math.imul(h ^ (h >>> 15), 1 | h);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  var order = [];
  for (i = 0; i < n; i++) order.push(i);
  for (var round = 0; round < 2; round++) {
    for (i = n - 1; i > 0; i--) { var j = Math.floor(rand() * (i + 1)), t = order[i]; order[i] = order[j]; order[j] = t; }
    if (order.some(function (v, k) { return v !== k; })) break;
  }
  return order;
};
