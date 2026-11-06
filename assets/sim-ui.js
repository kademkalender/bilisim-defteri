/* =====================================================================
   Sanal masaüstü: görünüm ve etkileşim
   SimUI.mount(kök, { lesson, os, wide, store, onDone }) masaüstünü kurar.
   Mantık assets/sim-core.js'te. Burada sadece çizim, fare, dokunma ve klavye var.
   Aynı anda tek pencere açılır: Dosya Yöneticisi, yazı programı ya da görüntüleyici.
   ===================================================================== */
(function () {
  var C = window.SimCore;
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };

  // Menü adları işletim sistemine göre. Logo yok, sadece genel ikonlar.
  var LBL = {
    windows: { start: "Başlat", fm: "Dosya Gezgini", writer: "Not Defteri", untitled: "Adsız", open: "Aç", cut: "Kes", copy: "Kopyala", paste: "Yapıştır",
      rename: "Yeniden adlandır", zip: "ZIP dosyasına sıkıştır", del: "Sil", restore: "Geri yükle", newMenu: "Yeni", newFolder: "Klasör", newName: "Yeni klasör",
      file: "Dosya", saveAs: "Farklı kaydet", exit: "Çıkış", saveIn: "Kaydedilecek yer", fileName: "Dosya adı", save: "Kaydet", cancel: "İptal" },
    pardus: { start: "Uygulamalar", fm: "Dosya Yöneticisi", writer: "LibreOffice Writer", untitled: "Adsız 1", open: "Aç", cut: "Kes", copy: "Kopyala", paste: "Yapıştır",
      rename: "Yeniden Adlandır…", zip: "Sıkıştır…", del: "Çöp Kutusuna Taşı", restore: "Geri Yükle", newMenu: null, newFolder: "Klasör Oluştur…", newName: "Adsız Klasör",
      file: "Dosya", saveAs: "Farklı Kaydet…", exit: "Kapat", saveIn: "Klasörde kaydet", fileName: "Ad", save: "Kaydet", cancel: "İptal",
      office: "Ofis", system: "Sistem" }
  };

  var P = {
    folder: '<path d="M2 6.5A2 2 0 0 1 4 4.5h5l2 2h9a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z"/>',
    file: '<path d="M5 2h9l5 5v15H5z"/><path class="pl" d="M14 2v5h5"/>',
    doc: '<path class="pl" d="M8 11h8M8 14h8M8 17h5"/>',
    img: '<circle class="pf" cx="10" cy="11.5" r="1.6"/><path class="pf" d="M7 19l3.5-4 2 2 2.5-3 3 5z"/>',
    audio: '<path class="pl" d="M10.5 18.5a1.8 1.8 0 1 1-1-1.6V10l5.5-1.5v7"/>',
    zip: '<path class="pl" d="M11 4v2h2v2h-2v2h2v2h-2v3h2v3h-2z"/>',
    trash: '<path d="M5.5 7h13l-1.2 14H6.7z"/><path class="pl" d="M3 7h18M9.5 7V4h5v3M10 11v6M14 11v6"/>',
    // görev ve düğme ikonları (çizgi)
    arrow: '<path d="M4 12h14M13 6l6 6-6 6"/>', pencil: '<path d="M4 20l4-1 11-11-3-3L5 16z"/>',
    copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M4 16V4h12"/>', grid: '<path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z"/>',
    key: '<rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h1M10 10h1M14 10h1M18 10h1M7 14h10"/>',
    ask: '<circle cx="12" cy="12" r="10"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.7M12 17h.01"/>',
    disk: '<path d="M5 3h11l3 3v15H5zM8 3v5h7V3M8 21v-7h8v7"/>', look: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
    bulb: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.4.3.5.7.5 1.1h6c0-.4.2-.8.5-1.1A6 6 0 0 0 12 3z"/>',
    undo: '<path d="M9 14L4 9l5-5M4 9h11a5 5 0 0 1 0 10h-3"/>', again: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5"/>',
    dots: '<circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/>',
    up: '<path d="M15 18l-6-6 6-6"/>', x: '<path d="M6 6l12 12M18 6L6 18"/>', ok: '<path d="M5 12l5 5L20 7"/>'
  };
  var svg = function (k, cls) { return '<svg class="' + (cls || "si") + '" viewBox="0 0 24 24" aria-hidden="true">' + P[k] + '</svg>'; };
  var TYPE = { txt: "doc", odt: "doc", docx: "doc", png: "img", jpg: "img", mp3: "audio", ogg: "audio" };
  var typeOf = function (n) { return n.kind === "folder" ? "folder" : n.kind === "zip" ? "zip" : TYPE[C.extOf(n.name)] || "doc"; };
  var fileIcon = function (t) { return t === "folder" ? svg("folder", "fi fi-folder") : t === "trash" ? svg("trash", "fi fi-trash") : '<svg class="fi fi-' + t + '" viewBox="0 0 24 24" aria-hidden="true">' + P.file + P[t] + '</svg>'; };
  var TASK_ICON = { mkdir: "folder", move: "arrow", rename: "pencil", copy: "copy", "delete": "trash", zip: "zip", menu: "grid", app: "doc", type: "key", answer: "ask", save: "disk", open: "look" };

  function mount(root, o) {
    var L = o.lesson, sim = L.sim, os = o.os === "pardus" ? "pardus" : "windows", T = LBL[os], key = "sim:" + L.id;
    var saved = o.store.get(key, null);
    var ver = sim.tasks.map(function (t) { return t.id; }).join(",");
    if (saved && (saved.os !== os || saved.ver !== ver)) saved = null; // işletim sistemi ya da dersin görevleri değiştiyse baştan
    var st = saved ? saved.state : C.create(sim.start, os), idx = saved ? saved.idx : 0, hints = saved ? saved.hints : 0;
    var hist = [], lastOp = null, wrongs = 0, hintStep = 0, msg = null, doneAt = saved ? saved.at : null;
    // Ekran durumu: kaydedilmez
    var win = null, sel = null, clip = null, edit = null, menu = null, saveDlg = null, hintOn = false, focusKey = null, live = "";

    var vars = function () { var v = {}; for (var k in st.vars) v[k] = st.vars[k]; v.cop = C.trashName(os); return v; };
    // Henüz bilinmeyen ad (ör. öğrencinin klasörü) örnek biçimiyle görünür
    var txt = function (x) { return x == null ? "" : C.fill(x && typeof x === "object" ? (x[os] || x.windows || x.pardus) : x, vars()).replace(/\{\w+\}/g, "5A_Adın"); };
    var task = function () { return sim.tasks[idx]; };
    var persist = function () {
      doneAt = idx >= sim.tasks.length ? doneAt || new Date().toISOString() : null;
      o.store.set(key, { os: os, ver: ver, state: st, idx: idx, hints: hints, at: doneAt });
    };
    var snap = function () { return { state: st, idx: idx, win: win && JSON.parse(JSON.stringify(win)) }; };
    var paneDir = function (p) { return p === "desk" ? C.ROOT : win && win.dir; };
    var itemKey = function (pane, path) { return "i|" + pane + "|" + path; };

    /* ---------- İşlem çalıştır ---------- */
    function exec(op, quiet) {
      var r = C.apply(st, op), t = task();
      if (r.ev.err) { say(r.ev.err, "warn"); render(); return null; }
      if (op[0] !== "menu" && !(op[0] === "type" && lastOp === "type")) hist.push(snap());
      lastOp = op[0]; st = r.state; hintOn = false;
      var a = C.advance(st, sim.tasks, idx);
      st = a.state;
      if (a.done.length) {
        idx = a.idx; wrongs = 0; hintStep = 0;
        var last = sim.tasks[idx - 1];
        msg = { kind: "ok", text: txt(last.success) || "Aferin, görev tamam!", pop: true };
        live = (r.ev.msg ? r.ev.msg + " " : "") + "Görev tamam. " + (task() ? "Sıradaki görev: " + txt(task().text) : "Bütün görevleri bitirdin!");
        if (o.onDone) o.onDone(idx >= sim.tasks.length);
      } else {
        var fb = C.feedback(t, r.ev, os);
        if (op[0] === "answer") fb = "Bu cevap doğru değil. Bir daha düşün.";
        if (fb) {
          wrongs++;
          if (wrongs >= 3 && hintStep === 0) fb += " Zorlanıyorsan İpucu düğmesine tıkla.";
          msg = { kind: "warn", text: fb };
        } else if (a.warn) msg = { kind: "warn", text: a.warn };
        else if (!quiet && r.ev.msg) msg = { kind: "info", text: r.ev.msg };
        live = msg && msg.kind !== "info" ? (r.ev.msg ? r.ev.msg + " " : "") + msg.text : r.ev.msg;
      }
      persist(); render();
      return r.ev;
    }
    function say(text, kind) { msg = { kind: kind || "info", text: text }; live = text; }
    function undo() {
      var h = hist.pop();
      if (!h) { say("Geri alınacak bir işlem yok."); render(); return; }
      st = h.state; idx = h.idx; win = h.win; lastOp = null; edit = null; menu = null; saveDlg = null;
      if (win && win.dir && win.dir !== C.TRASH && !C.find(st, win.dir)) win = null;
      say("Son işlem geri alındı."); persist(); render();
      if (o.onDone) o.onDone(idx >= sim.tasks.length);
    }
    function restart() {
      hist.push(snap());
      st = C.create(sim.start, os); idx = 0; hints = 0; wrongs = 0; hintStep = 0; win = null; sel = null; clip = null; edit = null; menu = null; saveDlg = null; saved = null;
      say("Baştan başladın. Fikrini değiştirirsen Geri al düğmesine tıkla."); persist(); render();
      if (o.onDone) o.onDone(false);
    }
    function hint() {
      var t = task(); if (!t) return;
      hints++; hintStep++;
      if (hintStep === 1) { say("İpucu: " + txt(t.hint)); }
      else { hintOn = true; say("İpucu: " + txt(t.hint) + " Yapacağın yer ekranda yanıp sönüyor."); }
      persist(); render();
    }

    /* ---------- Komutlar (menü, klavye, dokunma hepsi buraya gelir) ---------- */
    function openPath(path) {
      if (path === C.TRASH) { win = { type: "fm", dir: C.TRASH }; focusKey = "@win"; return exec(["open", C.TRASH]); }
      var n = C.find(st, path); if (!n) return;
      var isText = n.kind === "file" && /^(txt|odt|docx)$/.test(C.extOf(n.name)); // yazı dosyası yazı programında açılır
      if (n.kind === "folder" || n.kind === "zip") win = { type: "fm", dir: path };
      else if (!isText) win = { type: "view", path: path };
      focusKey = isText ? "text" : "@win"; // açılan pencereye geç
      exec(["open", path]);
    }
    function cmd(c, pane, path) {
      menu = null;
      var dir = paneDir(pane);
      switch (c) {
        case "open": return openPath(path);
        case "cut": case "copy": clip = { op: c, path: path }; say("«" + C.baseOf(path) + "» " + (c === "cut" ? "kesildi" : "kopyalandı") + ". Şimdi gideceği yerde " + T.paste + "'ı seç (Ctrl+V)."); return render();
        case "paste":
          if (!clip) { say("Önce bir öğeyi kes ya da kopyala."); return render(); }
          var ok = exec([clip.op === "cut" ? "move" : "copy", clip.path, dir]);
          if (ok && clip.op === "cut") clip = null;
          return;
        case "rename": edit = { path: path, pane: pane }; return render();
        case "newfolder": edit = { newIn: dir, pane: pane }; return render();
        case "zip": return exec(["zip", path]);
        case "delete": sel = null; return exec(["delete", path]);
        case "restore": return exec(["restore", +path]);
        case "app": win = null; focusKey = "text"; return exec(["app", "yazi"]);
        case "fm": if (st.ui.app) exec(["close"], true); win = { type: "fm", dir: C.ROOT }; st.ui.menu = false; return render();
        case "close": if (st.ui.app) return exec(["close"]); win = null; return render();
        case "saveas": focusKey = "sname"; saveDlg = { dir: st.ui.file ? C.parentOf(st.ui.file) : C.ROOT, name: st.ui.file ? C.stem(C.baseOf(st.ui.file)) : T.untitled }; return render();
      }
    }
    function itemMenu(pane, path) {
      if (pane === "trash") return [["restore", T.restore]];
      if (path === C.TRASH) return [["open", T.open]];
      var n = C.find(st, path), items = [["open", T.open], ["cut", T.cut], ["copy", T.copy]];
      if (n && n.kind === "folder" && clip) items.push(["pastein", T.paste]);
      return items.concat([["rename", T.rename], ["zip", T.zip], ["delete", T.del]]);
    }
    function bgMenu(pane) {
      if (pane === "trash" || pane === "zip") return [];
      var nw = T.newMenu ? [["sub:new", T.newMenu, [["newfolder", T.newFolder]]]] : [["newfolder", T.newFolder]];
      return nw.concat([["paste", T.paste, null, !clip]]);
    }
    function startMenu() {
      return os === "pardus"
        ? [["sub:ofis", T.office, [["app", T.writer]]], ["sub:sistem", T.system, [["fm", T.fm]]]]
        : [["app", T.writer], ["fm", T.fm]];
    }
    function showMenu(items, x, y, pane, path, isStart) {
      if (!items.length) return;
      menu = { items: items, x: x, y: y, pane: pane, path: path, start: !!isStart, stack: [] };
      focusKey = "m|0"; render();
    }
    // kb: klavyeden açıldı. Odak hep bir öğede olduğu için boş alan komutları (yeni klasör, yapıştır) da eklenir.
    // Ctrl+Shift+N tarayıcıya ayrılmış, sayfaya ulaşmıyor.
    function menuAt(el, pane, path, kb) {
      var r = el.getBoundingClientRect(), s = scr().getBoundingClientRect();
      var items = path != null ? itemMenu(pane, path).concat(kb && path !== C.TRASH ? bgMenu(pane) : []) : bgMenu(pane);
      showMenu(items, r.left - s.left + 20, r.top - s.top + r.height / 2, pane, path);
    }

    /* ---------- Çizim ---------- */
    var scr = function () { return root.querySelector(".sim-screen"); };
    var moreBtn = function (name) { return '<button type="button" class="sim-more" tabindex="-1" aria-label="' + esc(name) + ' için menü" data-more="1">' + svg("dots") + '</button>'; };
    // Seçimi yerinde günceller: tıklanan öğe DOM'da kalır, çift tık ve dokunma bozulmaz.
    function markSel() {
      Array.prototype.forEach.call(root.querySelectorAll(".sim-item[role=option]"), function (x) {
        var on = !!sel && x.getAttribute("data-pane") === sel.pane && x.getAttribute("data-path") === sel.path, mb = x.querySelector(".sim-more");
        x.classList.toggle("sel", on); x.setAttribute("aria-selected", on); x.tabIndex = -1;
        if (on && !mb) x.insertAdjacentHTML("beforeend", moreBtn(x.querySelector(".sim-name").textContent));
        if (!on && mb) x.removeChild(mb);
      });
      Array.prototype.forEach.call(root.querySelectorAll(".sim-list"), function (l) {
        var it = l.querySelector(".sim-item.sel[role=option]") || l.querySelector(".sim-item[role=option]");
        if (it) it.tabIndex = 0; else l.tabIndex = 0;
      });
    }
    function itemHtml(pane, path, name, t, extra) {
      var k = itemKey(pane, path), isSel = sel && sel.pane === pane && sel.path === path;
      if (edit && edit.path === path && edit.pane === pane) return '<div class="sim-item sel" data-path="' + esc(path) + '">' + fileIcon(t) + '<input class="sim-edit" data-f="edit" aria-label="Yeni ad" value="' + esc(name) + '"></div>';
      return '<div class="sim-item' + (isSel ? " sel" : "") + (clip && clip.op === "cut" && clip.path === path ? " cut" : "") + '" role="option" aria-selected="' + !!isSel + '" tabindex="-1" data-f="' + esc(k) + '" data-pane="' + pane + '" data-path="' + esc(path) + '" data-kind="' + t + '">' +
        fileIcon(t) + '<span class="sim-name">' + esc(name) + '</span>' + (extra || "") +
        (isSel ? moreBtn(name) : "") + '</div>';
    }
    function listHtml(pane, dir, label) {
      var d = C.find(st, dir), items = d.children.slice().sort(function (a, b) { return (a.kind === "folder" ? 0 : 1) - (b.kind === "folder" ? 0 : 1) || a.name.localeCompare(b.name, "tr"); });
      var h = items.map(function (n) { return itemHtml(pane, dir + "/" + n.name, n.name, typeOf(n), pane === "win" ? '<small>' + (n.kind === "folder" ? n.children.length + " öğe" : C.fmtSize(n.size)) + '</small>' : ""); }).join("");
      if (edit && edit.newIn === dir && edit.pane === pane) h += '<div class="sim-item sel">' + fileIcon("folder") + '<input class="sim-edit" data-f="edit" aria-label="Yeni klasörün adı" value="' + esc(T.newName) + '"></div>';
      if (pane === "desk") h += itemHtml("desk", C.TRASH, C.trashName(os), "trash");
      return '<div class="sim-list ' + pane + '" role="listbox" aria-label="' + esc(label) + '" data-pane="' + pane + '" data-dir="' + esc(dir) + '" tabindex="-1" data-f="l|' + pane + '">' + h + '</div>';
    }
    function winHtml() {
      if (st.ui.app) {
        var name = st.ui.file ? C.baseOf(st.ui.file) : T.untitled;
        return '<div class="sim-win editor" role="dialog" aria-label="' + esc(T.writer) + '">' +
          '<div class="sim-title"><span>' + esc(name + " - " + T.writer) + '</span><button type="button" class="sim-x" data-cmd="close" data-f="c|close" aria-label="Kapat">' + svg("x") + '</button></div>' +
          '<div class="sim-tb"><button type="button" class="sim-tbtn" data-filemenu="1" data-f="c|filemenu" data-show="ui:save">' + esc(T.file) + ' ▾</button><button type="button" class="sim-tbtn" data-cmd="saveas" data-f="c|saveas">' + svg("disk") + ' ' + esc(T.saveAs) + '</button></div>' +
          '<textarea class="sim-text" data-f="text" data-show="ui:text" aria-label="Yazı alanı" spellcheck="false">' + esc(st.ui.text) + '</textarea>' +
          (saveDlg ? saveHtml() : "") + '</div>';
      }
      if (!win) return "";
      if (win.type === "view") {
        var n = C.find(st, win.path); if (!n) { win = null; return ""; }
        return '<div class="sim-win" role="dialog" aria-label="' + esc(n.name) + '"><div class="sim-title"><span>' + esc(n.name) + '</span><button type="button" class="sim-x" data-cmd="close" data-f="c|close" aria-label="Kapat">' + svg("x") + '</button></div>' +
          '<div class="sim-view">' + fileIcon(typeOf(n)) + '<p><b>' + esc(n.name) + '</b> · ' + C.fmtSize(n.size) + '</p><p class="hint">Bu bir alıştırma. ' + (typeOf(n) === "audio" ? "Ses çalınmıyor." : "Resmin kendisi gösterilmiyor.") + '</p></div></div>';
      }
      var dir = win.dir, title = dir === C.TRASH ? C.trashName(os) : C.baseOf(dir), body, z = dir !== C.TRASH && C.find(st, dir);
      if (dir === C.TRASH) {
        body = '<div class="sim-list win" role="listbox" aria-label="' + esc(title) + '" data-pane="trash" data-dir="' + C.TRASH + '" tabindex="-1" data-f="l|trash">' +
          (st.trash.length ? st.trash.map(function (t, i) { return itemHtml("trash", String(i), t.node.name, typeOf(t.node), '<small>' + esc(C.baseOf(t.from)) + "'dan" + '</small>'); }).join("") : '<p class="sim-empty">Boş</p>') + '</div>';
      } else if (z && z.kind === "zip") {
        body = '<div class="sim-zip"><table><thead><tr><th>Dosya</th><th>Önceki boyut</th><th>Sıkıştırılmış</th></tr></thead><tbody>' +
          z.entries.map(function (e) { return '<tr><td>' + esc(e.path.replace(/^[^\/]*\//, "")) + '</td><td>' + C.fmtSize(e.size) + '</td><td>' + C.fmtSize(e.zsize) + (e.size ? ' <small>(%' + Math.round(100 - 100 * e.zsize / e.size) + ' küçüldü)</small>' : "") + '</td></tr>'; }).join("") +
          '</tbody><tfoot><tr><th>Toplam</th><th>' + C.fmtSize(z.before) + '</th><th>' + C.fmtSize(z.size) + '</th></tr></tfoot></table></div>';
      } else if (z) body = listHtml("win", dir, title);
      else { win = null; return ""; }
      var crumbs = dir === C.TRASH ? title : dir.split("/").join(" › ");
      return '<div class="sim-win" role="dialog" aria-label="' + esc(T.fm + ": " + title) + '">' +
        '<div class="sim-title"><span>' + esc(T.fm) + '</span><button type="button" class="sim-x" data-cmd="close" data-f="c|close" aria-label="Kapat">' + svg("x") + '</button></div>' +
        '<div class="sim-path"><button type="button" data-up="1" data-f="c|up" aria-label="Üst klasör"' + (dir === C.ROOT || dir === C.TRASH ? " disabled" : "") + '>' + svg("up") + '</button><span>' + esc(crumbs) + '</span></div>' + body +
        (z && z.kind === "folder" ? '<div class="sim-status">' + z.children.length + ' öğe · ' + C.fmtSize(C.size(z)) + '</div>' : "") + '</div>';
    }
    function folders(n, path, out) {
      out.push(path);
      n.children.forEach(function (c) { if (c.kind === "folder") folders(c, path + "/" + c.name, out); });
      return out;
    }
    function saveHtml() {
      return '<div class="sim-dlg" role="dialog" aria-label="' + esc(T.saveAs) + '"><h4>' + esc(T.saveAs) + '</h4>' +
        '<label>' + esc(T.saveIn) + '<select data-f="sdir">' + folders(st.fs, C.ROOT, []).map(function (p) { return '<option' + (p === saveDlg.dir ? " selected" : "") + ' value="' + esc(p) + '">' + esc(p.split("/").join(" › ")) + '</option>'; }).join("") + '</select></label>' +
        '<label>' + esc(T.fileName) + '<span class="sim-row"><input data-f="sname" value="' + esc(saveDlg.name) + '"><b>.' + C.EXT[os] + '</b></span></label>' +
        '<div class="sim-row"><button type="button" class="btn primary" data-dosave="1" data-f="c|dosave">' + esc(T.save) + '</button><button type="button" class="btn" data-nosave="1" data-f="c|nosave">' + esc(T.cancel) + '</button></div></div>';
    }
    function menuHtml() {
      if (!menu) return "";
      var items = menu.stack.length ? menu.stack[menu.stack.length - 1] : menu.items;
      return '<div class="sim-menu' + (menu.start ? " start" : "") + '" role="menu" style="left:' + Math.round(menu.x) + 'px;' + (menu.start ? "bottom:" + Math.round(menu.y) : "top:" + Math.round(menu.y)) + 'px">' +
        (menu.stack.length ? '<button type="button" role="menuitem" data-mi="back" data-f="m|back" class="sim-back">‹ Geri</button>' : "") +
        items.map(function (m, i) { return '<button type="button" role="menuitem" data-mi="' + i + '" data-f="m|' + i + '"' + (m[3] ? ' aria-disabled="true" class="off"' : "") + (m[2] ? ' aria-haspopup="true"' : "") + '>' + esc(m[1]) + (m[2] ? ' <span aria-hidden="true">›</span>' : "") + '</button>'; }).join("") + '</div>';
    }
    function panelHtml() {
      var t = task(), n = sim.tasks.length;
      var list = '<ol class="sim-tasks">' + sim.tasks.map(function (x, i) {
        return '<li class="' + (i < idx ? "done" : i === idx ? "now" : "next") + '">' + (i < idx ? svg("ok") : '<span>' + (i + 1) + '</span>') + '<span>' + esc(txt(x.text)) + '</span></li>';
      }).join("") + '</ol>';
      var head;
      if (!t) {
        var used = hints;
        head = '<div class="sim-done' + (msg && msg.pop ? " pop" : "") + '"><b>Tebrikler!</b><p>' + n + ' görevi tamamladın, ' + (used ? used + " kez ipucu kullandın." : "hiç ipucu kullanmadın.") + '</p><p class="hint">' + (doneAt ? esc(new Date(doneAt).toLocaleString("tr")) + ' · ' : "") + 'Bu ekranı öğretmenine gösterebilirsin.</p></div>';
      } else {
        var c = t.check, q = c.type === "answer" ? '<div class="sim-opts" role="group" aria-label="Cevaplar">' + c.options.map(function (op, i) { return '<button type="button" class="btn" data-ans="' + i + '" data-f="a|' + i + '">' + esc(op) + '</button>'; }).join("") + '</div>' : "";
        head = '<div class="sim-now' + (msg && msg.pop ? " pop" : "") + '"><small>Görev ' + (idx + 1) + ' / ' + n + '</small><div class="sim-now-t">' + svg(TASK_ICON[C.expected(t)[0]] || "look", "si big") + '<b>' + esc(txt(t.text)) + '</b></div>' + q + '</div>';
      }
      return '<div class="sim-panel">' + head +
        (msg ? '<div class="sim-msg ' + msg.kind + '">' + esc(msg.text) + '</div>' : "") +
        '<div class="sim-tools">' + (t ? '<button type="button" class="btn' + (wrongs >= 3 && hintStep === 0 ? " glow" : "") + '" data-hint="1" data-f="c|hint">' + svg("bulb") + ' İpucu</button>' : "") +
        '<button type="button" class="btn" data-undo="1" data-f="c|undo"' + (hist.length ? "" : " disabled") + '>' + svg("undo") + ' Geri al</button>' +
        '<button type="button" class="btn" data-restart="1" data-f="c|restart">' + svg("again") + ' Baştan başla</button></div>' + list + '</div>';
    }
    // hold: ad kutusu açıkken başka yere basıldı. Ad hemen kaydedilir ama ekran tıklama bitince çizilir,
    // yoksa basılan düğme DOM'dan kalkar ve tıklama kaybolur.
    var hold = false, dirty = false;
    function release() { setTimeout(function () { if (!hold) return; hold = false; if (dirty) render(); }, 0); }
    function render() {
      if (hold) { dirty = true; return; }
      dirty = false;
      var a = document.activeElement, had = root.contains(a);
      if (had && !focusKey && a.getAttribute("data-f")) focusKey = a.getAttribute("data-f");
      var desk = listHtml("desk", C.ROOT, "Masaüstü");
      var bar = '<div class="sim-bar"><button type="button" class="sim-start" data-start="1" data-f="c|start" aria-haspopup="true" data-show="ui:start">' + svg("grid") + '<span>' + esc(T.start) + '</span></button>' +
        '<button type="button" class="sim-task' + (win && win.type === "fm" ? " on" : "") + '" data-cmd="fm" data-f="c|fm">' + svg("folder") + '<span>' + esc(T.fm) + '</span></button>' +
        (st.ui.app ? '<span class="sim-task on">' + svg("doc") + '<span>' + esc(T.writer) + '</span></span>' : "") + '</div>';
      root.innerHTML = '<div class="sim ' + os + (o.wide ? " wide" : "") + '">' + panelHtml() +
        '<div class="sim-screen" role="application" aria-label="Sanal masaüstü (' + (os === "pardus" ? "Pardus" : "Windows") + ' görünümü)">' + desk + winHtml() + bar + menuHtml() + '</div>' +
        '<div class="sr" role="status" aria-live="polite"></div></div>';
      // ipucu vurgusu: hedef görünmüyorsa görünen en yakın üst klasör
      if (hintOn && task() && task().show) {
        var s = txt(task().show), el = null;
        if (/^ui:/.test(s)) el = root.querySelector('[data-show="' + s + '"]');
        else if (/\.$/.test(s)) { el = root.querySelector('.sim-item[data-path^="' + s.replace(/"/g, '\\"') + '"]'); s = C.parentOf(s); } // "Masaüstü/ad." uzantısı belli olmayan dosya
        while (!el && s && !/^ui:/.test(s)) {
          el = root.querySelector('.sim-item[data-path="' + s.replace(/"/g, '\\"') + '"]');
          if (s === C.ROOT || s.indexOf("/") < 0) break;
          s = C.parentOf(s);
        }
        if (!el) el = root.querySelector(".sim-list.desk");
        el.classList.add("sim-hint");
      }
      markSel(); // roving tabindex: her listede tek öğe sekmeyle odaklanır
      var mEl = root.querySelector(".sim-menu"), sc = scr();
      if (mEl && !menu.start) { // menü ekranın dışına taşmasın
        mEl.style.left = Math.max(8, Math.min(menu.x, sc.clientWidth - mEl.offsetWidth - 8)) + "px";
        mEl.style.top = Math.max(8, Math.min(menu.y, sc.clientHeight - mEl.offsetHeight - 8)) + "px";
      }
      var f = focusKey && root.querySelector('[data-f="' + focusKey.replace(/"/g, '\\"') + '"]');
      if (f && f.disabled) f = null; // devre dışı düğme odak alamaz
      if (focusKey === "@win") f = root.querySelector(".sim-win .sim-list [tabindex='0']") || root.querySelector(".sim-win .sim-list") || root.querySelector(".sim-win .sim-x");
      if (root.querySelector(".sim-edit")) f = root.querySelector(".sim-edit"); // ad kutusu açıksa odak onda
      if (f) {
        f.focus();
        if (focusKey === "sname") f.select();
        if (f.classList.contains("sim-edit")) { var v = f.value, dot = v.lastIndexOf("."); f.setSelectionRange(0, dot > 0 && !edit.newIn ? dot : v.length); }
      } else if (had) { var l2 = root.querySelector(".sim-win .sim-list") || root.querySelector(".sim-list.desk"); if (l2) (l2.querySelector("[tabindex='0']") || l2).focus(); }
      focusKey = null;
      if (msg && msg.pop) msg.pop = false;
      if (live) { var lv = root.querySelector("[aria-live]"), t2 = live; live = ""; setTimeout(function () { lv.textContent = t2; }, 60); }
    }

    /* ---------- Olaylar ---------- */
    // eat: bu dokunuşu biz işledik (açma, uzun basış, sürükleme), arkasından gelen tıklama yutulur. Her yeni basışta sıfırlanır.
    var drag = null, press = null, eat = false, lastType = "mouse";
    var skip = function () { eat = true; };
    function itemOf(e) { var it = e.target.closest && e.target.closest(".sim-item[role=option]"); return it && root.contains(it) ? it : null; }
    function select(it, focus) {
      sel = { pane: it.getAttribute("data-pane"), path: it.getAttribute("data-path") };
      focusKey = focus === false ? null : it.getAttribute("data-f");
    }
    function commitEdit(input) {
      if (!edit) return;
      var e = edit, v = input.value; edit = null;
      if (e.newIn) { var made = exec(["mkdir", e.newIn, v]); if (made) { sel = { pane: e.pane, path: made.path }; focusKey = itemKey(e.pane, made.path); render(); } }
      else if (v.trim() && v !== C.baseOf(e.path)) {
        var ev = exec(["rename", e.path, v]);
        if (ev) { sel = { pane: e.pane, path: ev.path }; focusKey = itemKey(e.pane, ev.path); render(); }
      } else render();
    }

    root.addEventListener("pointerdown", function (e) {
      var inp = root.querySelector(".sim-edit");
      if (!edit || !inp || e.target === inp) return;
      hold = true;
      window.addEventListener("pointerup", release, { capture: true, once: true });
      window.addEventListener("pointercancel", release, { capture: true, once: true });
      commitEdit(inp);
    }, true);
    root.addEventListener("pointerdown", function (e) {
      lastType = e.pointerType; eat = false;
      if (menu && !e.target.closest(".sim-menu")) { menu = null; if (st.ui.menu) exec(["menu", false], true); else render(); return; }
      var it = itemOf(e), bgList = !it && e.pointerType !== "mouse" && e.target.closest(".sim-list");
      if (bgList) { // dokunmada boş alana uzun basış = sağ tık (yeni klasör, yapıştır)
        press = { x: e.clientX, y: e.clientY, id: e.pointerId, type: e.pointerType, bg: true };
        press.timer = setTimeout(function () { if (!press || !press.bg) return; press = null; skip(); var s0 = scr().getBoundingClientRect(); showMenu(bgMenu(bgList.getAttribute("data-pane")), e.clientX - s0.left, e.clientY - s0.top, bgList.getAttribute("data-pane"), null); }, 550);
        return;
      }
      if (!it || e.button > 0 || e.target.closest(".sim-more")) return;
      var was = sel && sel.path === it.getAttribute("data-path") && sel.pane === it.getAttribute("data-pane");
      press = { x: e.clientX, y: e.clientY, it: it, was: was, type: e.pointerType, id: e.pointerId };
      if (!was) { select(it, false); markSel(); }
      if (e.pointerType !== "mouse") press.timer = setTimeout(function () { // uzun basış = sağ tık
        if (!press || drag) return;
        var p = press; press = null; skip();
        menuAt(p.it, p.it.getAttribute("data-pane"), p.it.getAttribute("data-path"));
      }, 550);
    });
    root.addEventListener("pointermove", function (e) {
      if (!press || press.id !== e.pointerId) return;
      if (press.bg) { if (Math.abs(e.clientX - press.x) + Math.abs(e.clientY - press.y) > 10) { clearTimeout(press.timer); press = null; } return; }
      if (!drag && Math.abs(e.clientX - press.x) + Math.abs(e.clientY - press.y) > 10 && press.it.getAttribute("data-path") !== C.TRASH && press.it.getAttribute("data-pane") !== "trash") {
        clearTimeout(press.timer);
        var g = document.createElement("div");
        g.className = "sim-ghost"; g.innerHTML = press.it.innerHTML;
        root.querySelector(".sim").appendChild(g);
        drag = { path: press.it.getAttribute("data-path"), ghost: g };
        try { root.setPointerCapture(e.pointerId); } catch (x) {}
      }
      if (drag) { drag.ghost.style.left = e.clientX + "px"; drag.ghost.style.top = e.clientY + "px"; }
    });
    function endPress(e) {
      if (!press) return;
      clearTimeout(press.timer);
      var p = press; press = null;
      if (p.bg) return;
      if (drag) {
        var d = drag; drag = null; d.ghost.parentNode.removeChild(d.ghost); skip();
        if (e.type === "pointercancel") return;
        var under = document.elementFromPoint(e.clientX, e.clientY), target = under && under.closest(".sim-item[role=option]"), list = under && under.closest(".sim-list");
        if (!under || !root.contains(under)) return;
        var tp = target && target.getAttribute("data-path"), dest = null;
        if (tp === C.TRASH) { sel = null; return exec(["delete", d.path]); }
        if (target && target.getAttribute("data-kind") === "folder" && tp !== d.path) dest = tp;
        else if (list && list.getAttribute("data-pane") !== "trash") dest = list.getAttribute("data-dir");
        else if (under.closest(".sim-win") && win && win.dir && win.dir !== C.TRASH) dest = win.dir;
        if (dest && dest !== C.parentOf(d.path)) exec(["move", d.path, dest]);
        return;
      }
      // dokunmada seçili öğeye ikinci dokunuş açar
      if (p.type !== "mouse" && p.was && e.type === "pointerup" && p.it.getAttribute("data-pane") !== "trash") { skip(); openPath(p.it.getAttribute("data-path")); }
    }
    root.addEventListener("pointerup", endPress);
    root.addEventListener("pointercancel", endPress);

    root.addEventListener("click", function (e) {
      if (eat) { eat = false; return; }
      var b = e.target.closest("button");
      if (b && root.contains(b)) {
        if (b.hasAttribute("data-more")) { var it = b.closest(".sim-item"); return menuAt(b, it.getAttribute("data-pane"), it.getAttribute("data-path")); }
        if (b.hasAttribute("data-mi")) return menuPick(b.getAttribute("data-mi"));
        if (b.hasAttribute("data-start")) { if (menu && menu.start) { menu = null; return exec(["menu", false], true); } var r = b.getBoundingClientRect(), s = scr().getBoundingClientRect(); menu = { items: startMenu(), x: r.left - s.left, y: s.bottom - r.top + 4, start: true, stack: [] }; focusKey = "m|0"; return exec(["menu", true]); }
        if (b.hasAttribute("data-filemenu")) { var r2 = b.getBoundingClientRect(), s2 = scr().getBoundingClientRect(); return showMenu([["saveas", T.saveAs], ["close", T.exit]], r2.left - s2.left, r2.bottom - s2.top); }
        if (b.hasAttribute("data-cmd")) return cmd(b.getAttribute("data-cmd"));
        if (b.hasAttribute("data-up")) { win.dir = C.parentOf(win.dir); sel = null; focusKey = null; return render(); }
        if (b.hasAttribute("data-hint")) return hint();
        if (b.hasAttribute("data-undo")) return undo();
        if (b.hasAttribute("data-restart")) return restart();
        if (b.hasAttribute("data-ans")) { focusKey = b.getAttribute("data-f"); return exec(["answer", task().id, +b.getAttribute("data-ans")]); }
        if (b.hasAttribute("data-nosave")) { saveDlg = null; focusKey = "text"; return render(); }
        if (b.hasAttribute("data-dosave")) return doSave();
        return;
      }
      if (!itemOf(e) && e.target.closest(".sim-list") && sel) { sel = null; markSel(); }
    });
    root.addEventListener("dblclick", function (e) {
      // dokunmada çift dokunuş da dblclick üretir; açma zaten ikinci dokunuşla oldu, yerine gelen öğe açılmasın
      if (lastType !== "mouse") return;
      var it = itemOf(e);
      if (it && it.getAttribute("data-pane") !== "trash") openPath(it.getAttribute("data-path"));
    });
    root.addEventListener("contextmenu", function (e) {
      if (!e.target.closest(".sim-screen") || e.target.closest("textarea, input")) return;
      e.preventDefault();
      if (press) { clearTimeout(press.timer); press = null; skip(); }
      if (menu) return;
      var it = itemOf(e), list = e.target.closest(".sim-list"), s = scr().getBoundingClientRect();
      if (it) { select(it, false); showMenu(itemMenu(it.getAttribute("data-pane"), it.getAttribute("data-path")), e.clientX - s.left, e.clientY - s.top, it.getAttribute("data-pane"), it.getAttribute("data-path")); }
      else if (list) showMenu(bgMenu(list.getAttribute("data-pane")), e.clientX - s.left, e.clientY - s.top, list.getAttribute("data-pane"), null);
    });
    function menuPick(i) {
      if (i === "back") { menu.stack.pop(); focusKey = "m|0"; return render(); }
      var items = menu.stack.length ? menu.stack[menu.stack.length - 1] : menu.items, m = items[+i];
      if (!m || m[3]) return;
      if (m[2]) { menu.stack.push(m[2]); focusKey = "m|0"; return render(); }
      var pane = menu.pane, path = menu.path, wasStart = menu.start;
      if (m[0] === "pastein") { menu = null; if (!clip) return; var ok = exec([clip.op === "cut" ? "move" : "copy", clip.path, path]); if (ok && clip.op === "cut") clip = null; return; }
      if (wasStart) st.ui.menu = false;
      else if (path != null && pane !== "trash") focusKey = itemKey(pane, path); // odak menüyü açan öğeye döner
      cmd(m[0], pane, path);
    }
    function doSave() {
      var dir = root.querySelector('[data-f="sdir"]').value, name = root.querySelector('[data-f="sname"]').value;
      saveDlg = null; focusKey = "text";
      if (!exec(["save", dir, name])) { saveDlg = { dir: dir, name: name }; render(); }
    }
    var typing = null;
    root.addEventListener("input", function (e) {
      if (!e.target.classList.contains("sim-text")) return;
      var v = e.target.value; clearTimeout(typing);
      typing = setTimeout(function () { focusKey = "text"; var pos = e.target.selectionStart; exec(["type", v], true); var t = root.querySelector(".sim-text"); if (t) t.setSelectionRange(pos, pos); }, 400);
    });
    root.addEventListener("focusout", function (e) {
      if (e.target.classList && e.target.classList.contains("sim-edit") && edit) setTimeout(function () { if (edit && root.querySelector(".sim-edit") === e.target) commitEdit(e.target); }, 0);
    });

    root.addEventListener("keydown", function (e) {
      eat = false;
      var k = e.key, ctrl = e.ctrlKey || e.metaKey, t = e.target;
      if (t.classList.contains("sim-edit")) {
        if (k === "Enter") { e.preventDefault(); commitEdit(t); }
        else if (k === "Escape") { e.preventDefault(); var ed = edit; edit = null; focusKey = ed.path ? itemKey(ed.pane, ed.path) : null; render(); }
        return;
      }
      if (t.classList.contains("sim-text")) {
        if (ctrl && (k === "s" || k === "S")) { e.preventDefault(); clearTimeout(typing); if (t.value !== st.ui.text) exec(["type", t.value], true); cmd("saveas"); }
        return;
      }
      if (t.closest(".sim-dlg")) { if (k === "Enter" && t.tagName === "INPUT") { e.preventDefault(); doSave(); } else if (k === "Escape") { saveDlg = null; focusKey = "text"; render(); } return; }
      if (ctrl && (k === "z" || k === "Z")) { e.preventDefault(); return undo(); }
      if (menu) {
        var mis = Array.prototype.slice.call(root.querySelectorAll(".sim-menu [role=menuitem]")), at = mis.indexOf(document.activeElement);
        if (k === "ArrowDown" || k === "ArrowUp") { e.preventDefault(); mis[(at + (k === "ArrowDown" ? 1 : mis.length - 1)) % mis.length].focus(); }
        else if (k === "ArrowRight" && t.getAttribute("aria-haspopup")) { e.preventDefault(); menuPick(t.getAttribute("data-mi")); }
        else if (k === "ArrowLeft" && menu.stack.length) { e.preventDefault(); menuPick("back"); }
        else if (k === "Escape" || k === "Tab") { e.preventDefault(); var wasStart = menu.start; focusKey = menu.path != null ? itemKey(menu.pane, menu.path) : wasStart ? "c|start" : null; menu = null; if (wasStart) exec(["menu", false], true); else render(); }
        return;
      }
      var it = t.closest && t.closest(".sim-item[role=option]"), list = t.closest && t.closest(".sim-list");
      if (k === "Escape" && (win || st.ui.app) && t.closest(".sim-win")) { e.preventDefault(); focusKey = null; return cmd("close"); }
      if (!list) return;
      var pane = list.getAttribute("data-pane"), all = Array.prototype.slice.call(list.querySelectorAll(".sim-item[role=option]"));
      if (/^Arrow/.test(k)) {
        e.preventDefault();
        if (!all.length) return;
        var i = all.indexOf(it), n = i < 0 ? 0 : k === "ArrowRight" || k === "ArrowDown" ? Math.min(all.length - 1, i + 1) : Math.max(0, i - 1);
        select(all[n], false); markSel(); all[n].focus(); return;
      }
      if ((k === "Backspace" || (e.altKey && k === "ArrowLeft")) && pane === "win" && win.dir !== C.ROOT) { e.preventDefault(); win.dir = C.parentOf(win.dir); sel = null; focusKey = null; return render(); }
      if (k === "ContextMenu" || (e.shiftKey && k === "F10")) { e.preventDefault(); return it ? menuAt(it, pane, it.getAttribute("data-path"), true) : menuAt(list, pane, null); }
      if (ctrl && (k === "v" || k === "V")) { e.preventDefault(); return cmd("paste", pane); }
      if (!it) return;
      var path = it.getAttribute("data-path");
      if (k === "Enter") { e.preventDefault(); return pane === "trash" ? cmd("restore", pane, path) : openPath(path); }
      if (path === C.TRASH || pane === "trash") return;
      if (k === "F2") { e.preventDefault(); return cmd("rename", pane, path); }
      if (k === "Delete") { e.preventDefault(); return cmd("delete", pane, path); }
      if (ctrl && (k === "c" || k === "C" || k === "x" || k === "X")) { e.preventDefault(); return cmd(k.toLowerCase() === "c" ? "copy" : "cut", pane, path); }
    });

    render();
    if (o.onDone) o.onDone(idx >= sim.tasks.length);
  }

  window.SimUI = { mount: mount };
})();
