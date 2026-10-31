/* Çengel bulmaca oluşturucu
   Girdi: [{ a: "Kelime", c: "İpucu" }, ...]
   Çıktı: { rows, cols, cells: {"r,c": "HARF"}, words: [{a, clue, r, c, dir: "a"|"d", n}], skipped: [] }
   Kelimeler en uzundan başlayarak, en çok kesişim ve en derli toplu ızgara verecek şekilde yerleştirilir. */

/* Bulmaca harflerini temizler. Hem oluşturucu hem app.js'teki kutu girişi bunu kullanır.
   Şapkalı harfler düz harfe çevrilir (Â→A, Î→İ, Û→U), Türkçe alfabe dışındaki her şey atılır. */
window.cwClean = function (s) {
  return String(s).normalize("NFC").toLocaleUpperCase("tr")
    .replace(/Â/g, "A").replace(/Î/g, "İ").replace(/Û/g, "U")
    .replace(/[^A-ZÇĞİÖŞÜ]/g, "");
};
window.buildCrossword = function (entries) {
  var base = entries.map(function (e) { return { a: cwClean(e.a), clue: e.c }; })
    .filter(function (e) { return e.a.length > 1; })
    .sort(function (x, y) { return y.a.length - x.a.length; });
  // Farklı başlangıç kelimeleriyle dene; en az kelime atlayan, sonra en derli toplu ızgarayı seç
  var best = null;
  for (var s = 0; s < base.length; s++) {
    var order = [base[s]].concat(base.filter(function (_, i) { return i !== s; }));
    var res = attempt(order);
    var area = res.rows * res.cols;
    if (!best || res.skipped.length < best.skipped.length || (res.skipped.length === best.skipped.length && area < best.rows * best.cols)) best = res;
    if (best.skipped.length === 0 && s >= 3) break;
  }
  return best;
};

function attempt(words) {
  var grid = {};
  var K = function (r, c) { return r + "," + c; };
  var get = function (r, c) { return grid[K(r, c)]; };
  var placed = [], skipped = [];

  function score(w, r, c, dir) {
    var dr = dir === "d" ? 1 : 0, dc = dir === "a" ? 1 : 0;
    if (get(r - dr, c - dc) || get(r + dr * w.length, c + dc * w.length)) return -1;
    var inter = 0;
    for (var i = 0; i < w.length; i++) {
      var rr = r + dr * i, cc = c + dc * i, cell = get(rr, cc);
      if (cell) {
        if (cell.ch !== w[i] || cell.dirs[dir]) return -1;
        inter++;
      } else if (get(rr + dc, cc + dr) || get(rr - dc, cc - dr)) return -1;
    }
    return inter;
  }
  function bounds(extra) {
    var b = { r0: Infinity, r1: -Infinity, c0: Infinity, c1: -Infinity };
    var add = function (r, c) { b.r0 = Math.min(b.r0, r); b.r1 = Math.max(b.r1, r); b.c0 = Math.min(b.c0, c); b.c1 = Math.max(b.c1, c); };
    Object.keys(grid).forEach(function (k) { var p = k.split(",").map(Number); add(p[0], p[1]); });
    if (extra) { add(extra.r, extra.c); add(extra.r + (extra.dir === "d" ? extra.w.length - 1 : 0), extra.c + (extra.dir === "a" ? extra.w.length - 1 : 0)); }
    return b;
  }
  function place(e, r, c, dir) {
    var dr = dir === "d" ? 1 : 0, dc = dir === "a" ? 1 : 0;
    for (var i = 0; i < e.a.length; i++) {
      var k = K(r + dr * i, c + dc * i);
      var cell = grid[k] || { ch: e.a[i], dirs: {} };
      cell.dirs[dir] = true; grid[k] = cell;
    }
    placed.push({ a: e.a, clue: e.clue, r: r, c: c, dir: dir });
  }

  function tryPlace(e) {
    var best = null;
    Object.keys(grid).forEach(function (k) {
      var p = k.split(",").map(Number), cell = grid[k];
      for (var i = 0; i < e.a.length; i++) {
        if (e.a[i] !== cell.ch) continue;
        ["a", "d"].forEach(function (dir) {
          var r = dir === "d" ? p[0] - i : p[0], c = dir === "a" ? p[1] - i : p[1];
          var s = score(e.a, r, c, dir);
          if (s < 1) return;
          var b = bounds({ w: e.a, r: r, c: c, dir: dir });
          var w = b.c1 - b.c0 + 1, h = b.r1 - b.r0 + 1;
          var val = s * 100 - Math.max(w, h) * 3 - w * h * 0.1;
          if (!best || val > best.val) best = { r: r, c: c, dir: dir, val: val };
        });
      }
    });
    if (best) { place(e, best.r, best.c, best.dir); return true; }
    return false;
  }
  place(words[0], 0, 0, "a");
  var pending = words.slice(1), progress = true;
  while (pending.length && progress) {
    progress = false;
    pending = pending.filter(function (e) { var ok = tryPlace(e); if (ok) progress = true; return !ok; });
  }
  skipped = pending;

  var b = bounds();
  placed.forEach(function (p) { p.r -= b.r0; p.c -= b.c0; });
  var cells = {};
  Object.keys(grid).forEach(function (k) { var p = k.split(",").map(Number); cells[K(p[0] - b.r0, p[1] - b.c0)] = grid[k].ch; });
  var starts = [];
  placed.forEach(function (p) { var k = K(p.r, p.c); if (starts.indexOf(k) < 0) starts.push(k); });
  starts.sort(function (x, y) { var a = x.split(",").map(Number), z = y.split(",").map(Number); return a[0] - z[0] || a[1] - z[1]; });
  placed.forEach(function (p) { p.n = starts.indexOf(K(p.r, p.c)) + 1; });
  return { rows: b.r1 - b.r0 + 1, cols: b.c1 - b.c0 + 1, cells: cells, words: placed, skipped: skipped };
}
