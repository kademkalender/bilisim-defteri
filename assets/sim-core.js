/* =====================================================================
   Sanal masaüstü: mantık katmanı
   DOM'a dokunmaz. Tarayıcıda window.SimCore olur, Node'da vm ile yüklenir
   (tools/sim.test.js, tools/dogrula.js). Her şey bellekte, gerçek dosya
   sistemine erişim yok.

   Durum: { os, fs: Masaüstü ağacı, trash: [{node, from}], ui, answers, vars }
   İşlem: ["move", "Masaüstü/siir.txt", "Masaüstü/5A_Ayse"] gibi bir dizi.
   apply(durum, işlem) eski durumu değiştirmez, yenisini ve bir olay döndürür.
   ===================================================================== */
(function (root) {
  var ROOT = "Masaüstü", TRASH = "@trash";
  var EXT = { pardus: "odt", windows: "txt" };
  // Sıkıştırınca kalan oran. .odt, .docx, resim ve ses zaten sıkıştırılmış biçimler, az küçülür.
  var RATIO = { txt: 0.3, odt: 0.93, docx: 0.93, png: 0.97, jpg: 0.98, mp3: 0.98, ogg: 0.98 };
  var TEXT_EXT = ["txt", "odt", "docx"];

  var lower = function (s) { return String(s).toLocaleLowerCase("tr"); };
  var clone = function (o) { return JSON.parse(JSON.stringify(o)); };
  var extOf = function (name) { var m = /\.([^.\/]+)$/.exec(name); return m ? lower(m[1]) : ""; };
  var stem = function (name) { return name.replace(/\.[^.\/]+$/, ""); };
  var parentOf = function (p) { return p.replace(/\/[^\/]*$/, ""); };
  var baseOf = function (p) { return p.replace(/^.*\//, ""); };
  var same = function (a, b) { return lower(a) === lower(b); };
  var trashName = function (os) { return os === "pardus" ? "Çöp Kutusu" : "Geri Dönüşüm Kutusu"; };

  function fail(msg) { var e = new Error(msg); e.sim = true; throw e; }

  // start: { "ad.txt": boyut, "Klasör": { ... } }. Sayı dosya, nesne klasördür.
  function build(name, spec) {
    if (typeof spec === "number") return { name: name, kind: "file", size: spec };
    return { name: name, kind: "folder", children: Object.keys(spec).map(function (k) { return build(k, spec[k]); }) };
  }
  function create(start, os) {
    return { os: os === "pardus" ? "pardus" : "windows", fs: build(ROOT, start || {}), trash: [],
      ui: { menu: false, app: null, text: "", file: null, opened: null }, answers: {}, vars: {} };
  }

  function child(dir, name) {
    for (var i = 0; i < dir.children.length; i++) if (same(dir.children[i].name, name)) return dir.children[i];
    return null;
  }
  function find(st, path) {
    var parts = String(path).split("/"), n = st.fs;
    if (!same(parts[0], n.name)) return null;
    for (var i = 1; i < parts.length; i++) {
      if (n.kind !== "folder") return null;
      n = child(n, parts[i]);
      if (!n) return null;
    }
    return n;
  }
  function need(st, path) { var n = find(st, path); if (!n) fail("Bu öğe bulunamadı."); return n; }
  function folder(st, path) { var n = need(st, path); if (n.kind !== "folder") fail("Burası bir klasör değil."); return n; }
  function size(n) {
    if (n.kind !== "folder") return n.size;
    return n.children.reduce(function (t, c) { return t + size(c); }, 0);
  }
  function remove(st, path) {
    var dir = folder(st, parentOf(path)), n = need(st, path);
    dir.children.splice(dir.children.indexOf(n), 1);
    return n;
  }
  function validName(dir, name, except) {
    name = String(name == null ? "" : name).trim();
    if (!name || name === "." || name === "..") fail("Ad boş olamaz.");
    if (/[\\\/:*?"<>|]/.test(name)) fail("Ad şu işaretleri içeremez: \\ / : * ? \" < > |");
    var c = child(dir, name);
    if (c && c !== except) fail("Burada «" + name + "» adında bir öğe zaten var.");
    return name;
  }
  function inside(path, dir) { return same(path, dir) || lower(dir).indexOf(lower(path) + "/") === 0; }

  var OPS = {
    mkdir: function (st, dir, name) {
      var d = folder(st, dir);
      name = validName(d, name);
      d.children.push({ name: name, kind: "folder", children: [] });
      return { path: dir + "/" + name, name: name, kind: "folder", msg: "«" + name + "» klasörü oluşturuldu." };
    },
    rename: function (st, path, name) {
      var n = need(st, path), old = n.name;
      if (path === ROOT) fail("Masaüstünün adı değiştirilemez.");
      name = String(name == null ? "" : name).trim();
      if (n.kind !== "folder" && extOf(old) && !extOf(name)) name += "." + extOf(old); // uzantı silinirse eskisi kalır
      name = validName(folder(st, parentOf(path)), name, n);
      n.name = name;
      return { path: parentOf(path) + "/" + name, name: old, kind: n.kind, msg: "«" + old + "» adı «" + name + "» oldu." };
    },
    copy: function (st, path, dest) {
      var n = need(st, path), d = folder(st, dest);
      if (n.kind === "folder" && inside(path, dest)) fail("Bir klasör kendi içine kopyalanamaz.");
      var c = clone(n), base = stem(n.name), e = n.kind === "folder" ? "" : (extOf(n.name) ? "." + n.name.split(".").pop() : "");
      if (n.kind === "folder") base = n.name;
      for (var i = 1; child(d, c.name); i++) {
        var tag = st.os === "pardus" ? " (kopya" + (i > 1 ? " " + i : "") + ")" : " - Kopya" + (i > 1 ? " (" + i + ")" : "");
        c.name = base + tag + e;
      }
      d.children.push(c);
      return { path: dest + "/" + c.name, name: n.name, kind: n.kind, msg: "«" + n.name + "» kopyalandı: " + baseOf(dest) + " içinde «" + c.name + "»." };
    },
    move: function (st, path, dest) {
      var n = need(st, path), d = folder(st, dest);
      if (same(parentOf(path), dest)) fail("«" + n.name + "» zaten bu klasörde.");
      if (n.kind === "folder" && inside(path, dest)) fail("Bir klasör kendi içine taşınamaz.");
      if (child(d, n.name)) fail(baseOf(dest) + " içinde «" + n.name + "» adında bir öğe zaten var.");
      remove(st, path);
      d.children.push(n);
      return { path: dest + "/" + n.name, name: n.name, kind: n.kind, msg: "«" + n.name + "» " + baseOf(dest) + " içine taşındı." };
    },
    "delete": function (st, path) {
      if (path === ROOT) fail("Masaüstü silinemez.");
      var n = remove(st, path);
      st.trash.push({ node: n, from: parentOf(path) });
      if (st.ui.file && inside(path, st.ui.file)) { st.ui.app = null; st.ui.file = null; st.ui.text = ""; }
      return { path: path, name: n.name, kind: n.kind, msg: "«" + n.name + "» " + trashName(st.os) + "'na taşındı." };
    },
    restore: function (st, i) {
      var t = st.trash[i];
      if (!t) fail("Böyle bir silinmiş öğe yok.");
      var from = find(st, t.from) && find(st, t.from).kind === "folder" ? t.from : ROOT, d = folder(st, from);
      validName(d, t.node.name);
      st.trash.splice(i, 1);
      d.children.push(t.node);
      return { path: from + "/" + t.node.name, name: t.node.name, kind: t.node.kind, msg: "«" + t.node.name + "» geri yüklendi: " + baseOf(from) + "." };
    },
    zip: function (st, path) {
      var n = need(st, path);
      if (n.kind === "zip") fail("Bu zaten sıkıştırılmış bir dosya.");
      var entries = [], walk = function (x, rel) {
        if (x.kind === "folder") return x.children.forEach(function (c) { walk(c, rel + "/" + c.name); });
        entries.push({ path: rel, size: x.size, zsize: Math.round(x.size * (RATIO[extOf(x.name)] || 0.9)) });
      };
      walk(n, n.name);
      var d = folder(st, parentOf(path)), name = validName(d, (n.kind === "folder" ? n.name : stem(n.name)) + ".zip");
      var z = { name: name, kind: "zip", size: entries.reduce(function (t, x) { return t + x.zsize; }, 0) + 22 + entries.length * 70, before: size(n), entries: entries };
      d.children.push(z);
      return { path: parentOf(path) + "/" + name, name: n.name, kind: n.kind, msg: "«" + n.name + "» sıkıştırıldı: " + fmtSize(z.before) + " → " + fmtSize(z.size) + "." };
    },
    open: function (st, path) {
      st.ui.menu = false;
      if (path === TRASH) { st.ui.opened = TRASH; return { path: path, msg: trashName(st.os) + " açıldı." }; }
      var n = need(st, path);
      st.ui.opened = path;
      if (n.kind === "file" && TEXT_EXT.indexOf(extOf(n.name)) >= 0) { st.ui.app = "yazi"; st.ui.file = path; st.ui.text = n.text || ""; }
      return { path: path, name: n.name, kind: n.kind, msg: "«" + n.name + "» açıldı." };
    },
    menu: function (st, on) { st.ui.menu = !!on; return { msg: on ? "Menü açıldı." : "" }; },
    app: function (st, name) {
      st.ui.menu = false; st.ui.app = name; st.ui.file = null; st.ui.text = "";
      return { msg: "Yazı programı açıldı." };
    },
    close: function (st) { st.ui.app = null; st.ui.file = null; st.ui.text = ""; return { msg: "Program kapatıldı." }; },
    type: function (st, text) { st.ui.text = String(text); return { msg: "" }; },
    save: function (st, dir, name) {
      if (!st.ui.app) fail("Önce yazı programını aç.");
      var d = folder(st, dir);
      name = String(name == null ? "" : name).trim();
      if (name && !extOf(name)) name += "." + EXT[st.os];
      var old = name ? child(d, name) : null;
      if (old && old.kind !== "file") fail("Burada «" + name + "» adında bir klasör var.");
      name = validName(d, name, old);
      var bytes = unescape(encodeURIComponent(st.ui.text)).length, n = old || { name: name, kind: "file" };
      n.text = st.ui.text;
      n.size = extOf(name) === "odt" ? 8200 + bytes : bytes; // .odt içi zip'li bir pakettir, boşken de ~8 KB
      if (!old) d.children.push(n);
      st.ui.file = dir + "/" + name;
      return { path: st.ui.file, name: name, kind: "file", msg: "«" + name + "» " + baseOf(dir) + " içine kaydedildi." };
    },
    answer: function (st, taskId, i) { st.answers[taskId] = i; return { msg: "" }; }
  };

  function apply(st, op) {
    if (!OPS[op[0]]) throw new Error("Bilinmeyen işlem: " + op[0]);
    var s = clone(st);
    try {
      var ev = OPS[op[0]].apply(null, [s].concat(op.slice(1)));
      ev.op = op[0];
      return { state: s, ev: ev };
    } catch (e) {
      if (!e.sim) throw e;
      return { state: st, ev: { op: op[0], err: e.message } };
    }
  }

  /* ---------- Görev kontrolü ---------- */
  var FORMATS = {
    // sınıf + şube + _ + ad: 5A_Ayşe. Sonuna ek gelebilir: 5A_Ayşe_Bilgisayar
    ogrenci: /^\d{1,2}[a-zçğıöşü]_[a-zçğıöşü]{2,}/
  };
  function formatMsg(name) {
    if (/\s/.test(name)) return "«" + name + "» adında boşluk var. Boşluk yerine _ kullan. Adını değiştirmek için F2'ye bas ya da sağ tıkla.";
    return "«" + name + "» istenen biçimde değil. Biçim: sınıf + şube + _ + adın. Örnek: 5A_Ayşe";
  }
  function fill(s, vars) { return String(s).replace(/\{(\w+)\}/g, function (m, k) { return vars && vars[k] != null ? vars[k] : m; }); }
  function glob(pat, s) {
    var re = lower(pat).split("*").map(function (x) { return x.replace(/[.+?^${}()|[\]\\]/g, "\\$&"); }).join(".*");
    return new RegExp("^" + re + "$").test(lower(s));
  }
  function files(n, path, out) {
    if (n.kind === "folder") n.children.forEach(function (c) { files(c, path + "/" + c.name, out); });
    else out.push({ node: n, path: path });
    return out;
  }

  // Sonuç: { ok, warn?, bind? }. bind: { ad: değer } sonraki görevlerin yollarına girer.
  function check(st, c, task) {
    var v = st.vars, i;
    switch (c.type) {
      case "exists":
        var p = fill(c.path, v), d = find(st, parentOf(p));
        if (!d || d.kind !== "folder") return { ok: false };
        var m = d.children.filter(function (x) { return glob(baseOf(p), x.name) && (!c.kind || x.kind === c.kind); });
        if (c.format) {
          var good = m.filter(function (x) { return !/\s/.test(x.name) && FORMATS[c.format].test(lower(x.name)); });
          if (!good.length) return m.length ? { ok: false, warn: formatMsg(m[0].name) } : { ok: false };
          m = good;
        }
        if (!m.length) return { ok: false };
        var b = {}; if (c.as) b[c.as] = m[0].kind === "folder" ? m[0].name : stem(m[0].name);
        return { ok: true, bind: b };
      case "allIn":
        var to = fill(c.to, v), all = files(st.fs, ROOT, []).filter(function (f) { return c.ext.indexOf(extOf(f.node.name)) >= 0; });
        // silinen dosya taşınmış sayılmaz: görevi silerek geçmek olmasın
        var thrown = st.trash.filter(function (t) { return t.node.kind === "file" && c.ext.indexOf(extOf(t.node.name)) >= 0; })[0];
        if (thrown) return { ok: false, warn: "«" + thrown.node.name + "» " + trashName(st.os) + "'nda. Önce geri yükle, sonra taşı." };
        return { ok: all.length > 0 && all.every(function (f) { return same(parentOf(f.path), to); }) };
      case "inTrash":
        return { ok: st.trash.some(function (t) { return glob(fill(c.name, v), t.node.name); }) };
      case "ui":
        var val = st.ui[c.key];
        return { ok: typeof c.value === "string" && val != null ? glob(fill(c.value, v), String(val)) : val === c.value };
      case "typed":
        return { ok: new RegExp("[a-zçğıöşü]{" + (c.min || 2) + ",}", "i").test(st.ui.text) };
      case "answer":
        return { ok: st.answers[task.id] === c.correct };
      case "all":
        var bind = {}, warn;
        for (i = 0; i < c.of.length; i++) {
          var r = check(st, c.of[i], task);
          if (r.bind) for (var k in r.bind) bind[k] = r.bind[k];
          if (!r.ok) return { ok: false, warn: r.warn };
          warn = warn || r.warn;
        }
        return { ok: true, bind: bind };
    }
    throw new Error("Bilinmeyen kontrol türü: " + c.type);
  }

  // Sıradaki görev tamamlandıkça ilerler. Biten görevin bağladığı adlar durumun vars alanına yazılır.
  function advance(st, tasks, idx) {
    var done = [], warn = null, s = st;
    while (idx < tasks.length) {
      var r = check(s, tasks[idx].check, tasks[idx]);
      if (!r.ok) { warn = r.warn || null; break; }
      if (r.bind && Object.keys(r.bind).length) { s = clone(s); for (var k in r.bind) s.vars[k] = r.bind[k]; }
      done.push(tasks[idx].id); idx++;
    }
    return { state: s, idx: idx, done: done, warn: warn };
  }

  /* ---------- Yanlış işlem ---------- */
  var CHANGES = ["mkdir", "rename", "copy", "move", "delete", "zip", "save"];
  var WANT = { mkdir: "yeni klasör oluşturmak", rename: "adını değiştirmek", copy: "kopyalamak", move: "taşımak", "delete": "silmek", zip: "sıkıştırmak", save: "kaydetmek", open: "açmak", menu: "menüyü açmak", app: "programı açmak", type: "yazmak", answer: "soruyu cevaplamak" };
  function expected(task) {
    if (task.op) return [].concat(task.op);
    var c = task.check, map = function (c) {
      if (c.type === "all") return [].concat.apply([], c.of.map(map));
      if (c.type === "exists") return c.kind === "zip" ? ["zip"] : ["mkdir", "rename", "save"];
      return { allIn: ["move"], inTrash: ["delete"], typed: ["type"], answer: ["answer"] }[c.type] ||
        ({ menu: ["menu"], app: ["app"], opened: ["open"] }[c.key]) || [];
    };
    return map(c);
  }
  function feedback(task, ev, os) {
    if (!task || ev.err || CHANGES.indexOf(ev.op) < 0) return null;
    var want = expected(task);
    if (want.indexOf(ev.op) >= 0) return null;
    var q = "«" + ev.name + "» " + (ev.kind === "folder" ? "klasörü" : "dosyası");
    var did = {
      mkdir: "Yeni bir klasör oluşturdun", save: "Bir dosya kaydettin",
      rename: "«" + ev.name + "» " + (ev.kind === "folder" ? "klasörünün" : "dosyasının") + " adını değiştirdin",
      copy: q + "nı kopyaladın", move: q + "nı taşıdın", "delete": q + "nı sildin", zip: q + "nı sıkıştırdın"
    }[ev.op].replace("klasörünı", "klasörünü");
    return did + ", ama bu görevde yapman gereken: " + WANT[want[0]] + ". " +
      (ev.op === "delete" ? "Geri al düğmesine bas ya da " + trashName(os) + "'ndan geri yükle." : "Geri al düğmesiyle (Ctrl+Z) eski haline döndürebilirsin.");
  }

  // Çözümü baştan sona oynatır. Test ve doğrulayıcı kullanır. {ext} işletim sisteminin yazı uzantısı olur.
  function play(sim, os) {
    var st = create(sim.start, os), idx = advance(st, sim.tasks, 0).idx, errors = [];
    (sim.solution || []).forEach(function (op, i) {
      op = op.map(function (x) { return typeof x === "string" ? x.replace(/\{ext\}/g, EXT[st.os]) : x; });
      var r = apply(st, op);
      if (r.ev.err) errors.push((i + 1) + ". adım " + JSON.stringify(op) + ": " + r.ev.err);
      var a = advance(r.state, sim.tasks, idx);
      st = a.state; idx = a.idx;
    });
    return { state: st, idx: idx, errors: errors };
  }

  function fmtSize(b) {
    if (b < 1024) return b + " bayt";
    if (b < 1024 * 1024) return Math.round(b / 1024) + " KB";
    return (b / 1048576).toFixed(1).replace(".", ",") + " MB";
  }

  root.SimCore = {
    ROOT: ROOT, TRASH: TRASH, EXT: EXT, create: create, apply: apply, find: find, size: size,
    check: check, advance: advance, expected: expected, feedback: feedback, play: play, fill: fill,
    fmtSize: fmtSize, trashName: trashName, extOf: extOf, stem: stem, parentOf: parentOf, baseOf: baseOf, KNOWN: ["exists", "allIn", "inTrash", "ui", "typed", "answer", "all"]
  };
})(typeof window !== "undefined" ? window : this);
