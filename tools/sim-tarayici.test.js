/* Sanal masaüstünü gerçek tarayıcıda baştan sona oynatan testler. Çalıştırma: node --test tools/*.test.js
   npm paketi yok: yüklü Chrome/Chromium başsız açılır, Node'un yerleşik WebSocket'iyle (Node 22+)
   DevTools protokolü üzerinden fare, dokunma ve klavye olayları gönderilir.
   Chrome bulunamazsa testler atlanır. Yol elle verilebilir: BD_CHROME=/yol/chrome node --test tools/
   Her senaryo bir öğrenci gibi oynanır: bir yanlış işlem, iki kez ipucu, sonra bütün görevler. */
var test = require("node:test"), assert = require("node:assert");
var cp = require("child_process"), fs = require("fs"), os = require("os"), path = require("path");

var SITE = "file://" + path.join(__dirname, "..", "index.html").replace(/\\/g, "/").replace(/^([A-Za-z]):/, "/$1:");
var sleep = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };

function findChrome() {
  var list = [process.env.BD_CHROME];
  if (process.platform === "darwin") {
    list.push("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", path.join(os.homedir(), "Applications/Google Chrome.app/Contents/MacOS/Google Chrome"), "/Applications/Chromium.app/Contents/MacOS/Chromium");
    try { cp.execSync("mdfind \"kMDItemCFBundleIdentifier == 'com.google.Chrome'\"", { encoding: "utf8", timeout: 5000 }).split("\n").forEach(function (p) { if (p) list.push(p + "/Contents/MacOS/Google Chrome"); }); } catch (e) {}
  } else if (process.platform === "win32") {
    [process.env.PROGRAMFILES, process.env["PROGRAMFILES(X86)"], process.env.LOCALAPPDATA].forEach(function (d) { if (d) list.push(path.join(d, "Google/Chrome/Application/chrome.exe")); });
  } else {
    ["google-chrome", "google-chrome-stable", "chromium", "chromium-browser"].forEach(function (n) { try { list.push(cp.execSync("command -v " + n, { encoding: "utf8" }).trim()); } catch (e) {} });
  }
  return list.filter(function (p) { return p && fs.existsSync(p); })[0] || null;
}
var CHROME = findChrome();
var SKIP = typeof WebSocket === "undefined" ? "Node 22+ gerekli (yerleşik WebSocket)" : !CHROME ? "Chrome bulunamadı (BD_CHROME ile yol verin)" : false;

async function start(opts) {
  opts = opts || {};
  var dir = fs.mkdtempSync(path.join(os.tmpdir(), "bd-chrome-"));
  var proc = cp.spawn(CHROME, ["--headless=new", "--remote-debugging-port=0", "--user-data-dir=" + dir, "--no-first-run", "--no-default-browser-check", "--allow-file-access-from-files", "about:blank"], { stdio: "ignore" });
  var ws = null, portFile = path.join(dir, "DevToolsActivePort");
  for (var i = 0; i < 100 && !ws; i++) {
    await sleep(100);
    try {
      var port = fs.readFileSync(portFile, "utf8").split("\n")[0];
      var pg = (await (await fetch("http://127.0.0.1:" + port + "/json")).json()).filter(function (x) { return x.type === "page"; })[0];
      if (pg) ws = new WebSocket(pg.webSocketDebuggerUrl);
    } catch (e) {}
  }
  if (!ws) { proc.kill(); throw new Error("Chrome açılamadı: " + CHROME); }
  await new Promise(function (r) { ws.onopen = r; });
  var id = 0, pending = {}, errors = [];
  ws.onmessage = function (m) {
    var d = JSON.parse(m.data);
    if (d.id && pending[d.id]) { pending[d.id](d); delete pending[d.id]; }
    if (d.method === "Runtime.exceptionThrown") errors.push(d.params.exceptionDetails.exception ? d.params.exceptionDetails.exception.description : d.params.exceptionDetails.text);
    if (d.method === "Runtime.consoleAPICalled" && d.params.type === "error") errors.push(d.params.args.map(function (a) { return a.value || a.description; }).join(" "));
  };
  var send = function (method, params) { return new Promise(function (r, j) { var n = ++id; pending[n] = function (d) { if (d.error) j(new Error(method + ": " + JSON.stringify(d.error))); else r(d.result); }; ws.send(JSON.stringify({ id: n, method: method, params: params || {} })); }); };
  await send("Runtime.enable"); await send("Page.enable");
  await send("Emulation.setDeviceMetricsOverride", { width: opts.width || 1366, height: opts.height || 650, deviceScaleFactor: 1, mobile: !!opts.touch });
  if (opts.touch) await send("Emulation.setTouchEmulationEnabled", { enabled: true, maxTouchPoints: 5 });

  var b = {
    errors: errors, send: send,
    eval: async function (expr) { var r = await send("Runtime.evaluate", { expression: expr, returnByValue: true, awaitPromise: true }); if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception.description); return r.result.value; },
    open: async function (hash) { await send("Page.navigate", { url: "about:blank" }); await sleep(150); await send("Page.navigate", { url: SITE + hash }); await sleep(800); },
    // Önce ayarlar yazılır, sonra sayfa temiz açılır
    go: async function (hash, settings, extra) {
      await b.open("#home");
      await b.eval("localStorage.clear();localStorage.setItem('bd:settings'," + JSON.stringify(JSON.stringify(settings)) + ");" + (extra || ""));
      await b.open(hash);
    },
    at: async function (sel) {
      for (var t = 0; t < 20; t++) {
        var r = await b.eval("(function(){var e=document.querySelector(" + JSON.stringify(sel) + ");if(!e)return null;e.scrollIntoView({block:'nearest'});var q=e.getBoundingClientRect();return {x:q.left+q.width/2,y:q.top+q.height/2};})()");
        if (r) return r;
        await sleep(100);
      }
      throw new Error("Bulunamadı: " + sel);
    },
    mouse: function (type, p, extra) { return send("Input.dispatchMouseEvent", Object.assign({ type: type, x: p.x, y: p.y, button: "left", clickCount: 1, buttons: type === "mouseReleased" ? 0 : 1 }, extra || {})); },
    click: async function (sel, n) { var p = await b.at(sel); for (var i = 1; i <= (n || 1); i++) { await b.mouse("mousePressed", p, { clickCount: i }); await b.mouse("mouseReleased", p, { clickCount: i }); } await sleep(120); },
    rightAt: async function (p) { await b.mouse("mousePressed", p, { button: "right", buttons: 2 }); await b.mouse("mouseReleased", p, { button: "right", buttons: 0 }); await sleep(120); },
    right: async function (sel) { await b.rightAt(await b.at(sel)); },
    // boş alan: masaüstünde sol alt (sağı pencere kaplayabilir), pencerede sağ alt
    corner: function (sel) { return b.eval("(function(){var e=document.querySelector(" + JSON.stringify(sel) + ");e.scrollIntoView({block:'nearest'});var q=e.getBoundingClientRect();return {x:" + (/desk/.test(sel) ? "q.left+40" : "q.right-40") + ",y:q.bottom-15};})()"); },
    drag: async function (sel, to) {
      var a = await b.at(sel), z = await b.at(to);
      await b.mouse("mousePressed", a);
      for (var i = 1; i <= 8; i++) await b.mouse("mouseMoved", { x: a.x + (z.x - a.x) * i / 8, y: a.y + (z.y - a.y) * i / 8 });
      await b.mouse("mouseReleased", z); await sleep(150);
    },
    touch: async function (p, ms) { await send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [p] }); await sleep(ms); await send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] }); await sleep(250); },
    tap: async function (sel) { await b.touch(await b.at(sel), 60); },
    longPress: async function (sel) { await b.touch(await b.at(sel), 800); },
    key: async function (key, mods) {
      var codes = { Enter: 13, Escape: 27, Tab: 9, ArrowDown: 40, ArrowUp: 38, ArrowLeft: 37, ArrowRight: 39, F2: 113, F10: 121, Delete: 46, Backspace: 8, ContextMenu: 93 };
      var base = { key: key, code: key.length === 1 ? "Key" + key.toUpperCase() : key, windowsVirtualKeyCode: codes[key] || key.toUpperCase().charCodeAt(0), modifiers: mods || 0 };
      await send("Input.dispatchKeyEvent", Object.assign({ type: "rawKeyDown" }, base));
      if (key === "Enter" && !mods) await send("Input.dispatchKeyEvent", Object.assign({ type: "char", text: "\r" }, base));
      await send("Input.dispatchKeyEvent", Object.assign({ type: "keyUp" }, base));
      await sleep(80);
    },
    type: async function (text) { await send("Input.insertText", { text: text }); await sleep(80); },
    task: function () { return b.eval("(function(){var p=document.querySelector('.sim-now small');return p?p.textContent:document.querySelector('.sim-done')?'BİTTİ':null;})()"); },
    msg: function () { return b.eval("(document.querySelector('.sim-msg')||{}).textContent||''"); },
    // menüde etiketi tam eşleşen satır (sondaki › hariç)
    pick: async function (label, viaTouch) {
      var i = await b.eval("(function(){var m=[].slice.call(document.querySelectorAll('.sim-menu [role=menuitem]'));for(var i=0;i<m.length;i++)if(m[i].textContent.replace('›','').trim()===" + JSON.stringify(label) + ")return m[i].getAttribute('data-mi');return null;})()");
      if (i == null) throw new Error("Menüde yok: " + label);
      if (viaTouch) await b.tap('.sim-menu [data-mi="' + i + '"]'); else await b.click('.sim-menu [data-mi="' + i + '"]');
    },
    // klavyeyle: okla in, Enter
    menuKey: async function (label) {
      for (var i = 0; i < 14; i++) {
        if (await b.eval("(document.activeElement.textContent||'').replace('›','').trim()===" + JSON.stringify(label))) return b.key("Enter");
        await b.key("ArrowDown");
      }
      throw new Error("Menüde yok: " + label);
    },
    tabTo: async function (cond, back) {
      for (var i = 0; i < 60; i++) {
        if (await b.eval("(function(){var a=document.activeElement;return !!(" + cond + ");})()")) return;
        await b.key("Tab", back ? 8 : 0);
      }
      throw new Error("Tab ile ulaşılamadı: " + cond);
    },
    arrowTo: async function (p) {
      var at = "document.activeElement.getAttribute('data-path')===" + JSON.stringify(p);
      for (var i = 0; i < 25; i++) { if (await b.eval(at)) return; await b.key("ArrowRight"); }
      for (i = 0; i < 25; i++) { if (await b.eval(at)) return; await b.key("ArrowLeft"); }
      throw new Error("Okla bulunamadı: " + p);
    },
    // dokunmada: seçili değilse ilk dokunuş seçer, ikincisi açar
    tapOpen: async function (sel) { if (!(await b.eval("document.querySelector(" + JSON.stringify(sel) + ").classList.contains('sel')"))) await b.tap(sel); await b.tap(sel); },
    close: function () { try { ws.close(); } catch (e) {} proc.kill(); setTimeout(function () { try { fs.rmSync(dir, { recursive: true, force: true }); } catch (e) {} }, 500); }
  };
  return b;
}

var STU = { role: "ogrenci", grade: "5", env: "lab", os: "pardus", internet: true, motion: "full" };
var P = function (p) { return '[data-path="' + p + '"]'; };
var D516 = "#ders-5-1-6-dosya-klasor", D515 = "#ders-5-1-5-bilgisayar-sistemleri";
var FILES = { "odev1.odt": "Yazilar", "siir.txt": "Yazilar", "notlar.txt": "Yazilar", "taslak_eski.txt": "Yazilar", "kedim.png": "Resimler", "tatil.jpg": "Resimler", "sarki.mp3": "Sesler", "kayit.ogg": "Sesler" };

// Ortak başlangıç: öğrenci, Etkinlik bölümü, masaüstü görünür
async function lesson(opts, hash, extra) {
  var b = await start(opts);
  await b.go(hash, STU, extra);
  if (opts && opts.touch) await b.tap(".sec-card[data-tab=etkinlik]"); else await b.click(".sec-card[data-tab=etkinlik]");
  await b.eval("scrollTo(0, document.querySelector('#sim').getBoundingClientRect().top + scrollY - 70)");
  return b;
}
async function run(t, opts, hash, body, extra) {
  var b = await lesson(opts, hash, extra);
  try { await body(b); assert.strictEqual(await b.task(), "BİTTİ"); assert.deepStrictEqual(b.errors, []); }
  finally { b.close(); }
}
// yanlış işlem uyarısı ve iki aşamalı ipucu (ikincisi ekranda vurgu yapar)
async function wrongAndHint(b, wrong, viaTouch) {
  await wrong();
  assert.match(await b.msg(), /ama bu görevde yapman gereken/);
  if (viaTouch) await b.tap("[data-undo]"); else await b.click("[data-undo]");
  for (var i = 0; i < 2; i++) { if (viaTouch) await b.tap("[data-hint]"); else await b.click("[data-hint]"); }
  assert.ok(await b.eval("!!document.querySelector('.sim-hint')"), "ikinci ipucu yeri vurgulamalı");
}

test("5-1-6 fareyle", { skip: SKIP, timeout: 120000 }, function (t) {
  return run(t, {}, D516, async function (b) {
    await wrongAndHint(b, async function () { await b.right(".desk " + P("Masaüstü/taslak_eski.txt")); await b.pick("Sil"); });
    await b.rightAt(await b.corner(".sim-list.desk")); await b.pick("Yeni"); await b.pick("Klasör"); await b.type("5A Ayşe"); await b.key("Enter");
    assert.match(await b.msg(), /boşluk/);
    await b.right(".desk " + P("Masaüstü/5A Ayşe")); await b.pick("Yeniden adlandır"); await b.type("5A_Ayşe"); await b.key("Enter");
    await b.click(".desk " + P("Masaüstü/5A_Ayşe"), 2);
    for (var n of ["Yazilar", "Resimler", "Sesler"]) { await b.rightAt(await b.corner(".sim-list.win")); await b.pick("Yeni"); await b.pick("Klasör"); await b.type(n); await b.key("Enter"); }
    for (var f in FILES) await b.drag(".desk " + P("Masaüstü/" + f), ".win " + P("Masaüstü/5A_Ayşe/" + FILES[f]));
    await b.click(".win " + P("Masaüstü/5A_Ayşe/Resimler"), 2);
    await b.right(".win " + P("Masaüstü/5A_Ayşe/Resimler/kedim.png")); await b.pick("Yeniden adlandır"); await b.type("5A_Ayşe_Resim1"); await b.key("Enter");
    await b.click("[data-up]"); await b.click(".win " + P("Masaüstü/5A_Ayşe/Yazilar"), 2);
    await b.right(".win " + P("Masaüstü/5A_Ayşe/Yazilar/siir.txt")); await b.pick("Kopyala");
    await b.rightAt(await b.corner(".sim-list.desk")); await b.pick("Yapıştır");
    await b.right(".win " + P("Masaüstü/5A_Ayşe/Yazilar/taslak_eski.txt")); await b.pick("Sil");
    await b.click(".desk " + P("@trash"), 2);
    await b.right(".desk " + P("Masaüstü/5A_Ayşe")); await b.pick("ZIP dosyasına sıkıştır");
    await b.click(".desk " + P("Masaüstü/5A_Ayşe.zip"), 2);
    assert.ok(await b.eval("!!document.querySelector('.sim-zip table')"), "zip tablosu açılmalı");
    await b.click('[data-ans="0"]'); assert.match(await b.msg(), /doğru değil/);
    await b.click('[data-ans="1"]');
  });
});

test("5-1-5 fareyle", { skip: SKIP, timeout: 120000 }, function (t) {
  return run(t, {}, D515, async function (b) {
    await wrongAndHint(b, async function () { await b.right(".desk " + P("Masaüstü/odev1.odt")); await b.pick("Sil"); });
    await b.click("[data-start]"); await b.pick("Not Defteri");
    await b.click(".sim-text"); await b.type("Ayşe"); await sleep(600);
    await b.click('[data-ans="2"]'); await b.click('[data-ans="1"]');
    await b.click('[data-f="c|saveas"]'); await b.type("Ayşe_Bilgisayar"); await b.click("[data-dosave]");
    assert.match(await b.msg(), /biçimde değil/);
    await b.click('[data-f="c|saveas"]'); await b.type("5A_Ayşe_Bilgisayar"); await b.click("[data-dosave]");
    await b.click('[data-f="c|close"]'); await b.click(".desk " + P("Masaüstü/5A_Ayşe_Bilgisayar.txt"), 2);
  });
});

test("5-1-6 sadece klavyeyle", { skip: SKIP, timeout: 120000 }, function (t) {
  var inDesk = "a.closest('.sim-list.desk')", inWin = "a.closest('.sim-win .sim-list')";
  return run(t, {}, D516, async function (b) {
    await b.tabTo(inDesk);
    await b.arrowTo("Masaüstü/notlar.txt"); await b.key("Delete");
    assert.match(await b.msg(), /ama bu görevde yapman gereken/);
    await b.key("z", 2);
    await b.tabTo("a.getAttribute('data-f')==='c|hint'", true); await b.key("Enter"); await b.key("Enter");
    await b.tabTo(inDesk);
    await b.key("F10", 8); await b.menuKey("Yeni"); await b.menuKey("Klasör"); await b.type("5A_Ayşe"); await b.key("Enter");
    await b.key("Enter");
    for (var n of ["Yazilar", "Resimler", "Sesler"]) { await b.key("ContextMenu"); await b.menuKey("Yeni"); await b.menuKey("Klasör"); await b.type(n); await b.key("Enter"); }
    for (var f in FILES) {
      await b.tabTo(inDesk, true); await b.arrowTo("Masaüstü/" + f); await b.key("x", 2);
      await b.tabTo(inWin); await b.arrowTo("Masaüstü/5A_Ayşe/" + FILES[f]); await b.key("F10", 8); await b.menuKey("Yapıştır");
    }
    await b.arrowTo("Masaüstü/5A_Ayşe/Resimler"); await b.key("Enter");
    await b.arrowTo("Masaüstü/5A_Ayşe/Resimler/kedim.png"); await b.key("F2"); await b.type("5A_Ayşe_Resim1"); await b.key("Enter");
    await b.key("Backspace"); await b.arrowTo("Masaüstü/5A_Ayşe/Yazilar"); await b.key("Enter");
    await b.arrowTo("Masaüstü/5A_Ayşe/Yazilar/siir.txt"); await b.key("c", 2);
    await b.tabTo(inDesk, true); await b.key("v", 2);
    await b.tabTo(inWin); await b.arrowTo("Masaüstü/5A_Ayşe/Yazilar/taslak_eski.txt"); await b.key("Delete");
    await b.tabTo(inDesk, true); await b.arrowTo("@trash"); await b.key("Enter");
    await b.tabTo(inDesk, true); await b.arrowTo("Masaüstü/5A_Ayşe"); await b.key("ContextMenu"); await b.menuKey("ZIP dosyasına sıkıştır");
    await b.arrowTo("Masaüstü/5A_Ayşe.zip"); await b.key("Enter");
    await b.tabTo("a.getAttribute('data-ans')==='2'", true); await b.key("Enter");
    await b.tabTo("a.getAttribute('data-ans')==='1'", true); await b.key("Enter");
  });
});

test("5-1-5 sadece klavyeyle", { skip: SKIP, timeout: 120000 }, function (t) {
  return run(t, {}, D515, async function (b) {
    await b.tabTo("a.closest('.sim-list.desk')"); await b.arrowTo("Masaüstü/kedim.png"); await b.key("F2"); await b.type("kedi2"); await b.key("Enter");
    assert.match(await b.msg(), /ama bu görevde yapman gereken/);
    await b.key("z", 2);
    await b.tabTo("a.getAttribute('data-f')==='c|hint'", true); await b.key("Enter"); await b.key("Enter");
    await b.tabTo("a.getAttribute('data-f')==='c|start'"); await b.key("Enter"); await b.menuKey("Not Defteri");
    await b.type("Ayşe"); await sleep(600);
    await b.tabTo("a.getAttribute('data-ans')==='0'", true); await b.key("Enter");
    await b.tabTo("a.getAttribute('data-ans')==='1'"); await b.key("Enter");
    await b.tabTo("a.getAttribute('data-f')==='text'"); await b.key("s", 2 | 8); await b.type("5A Ayşe_Bilgisayar"); await b.key("Enter");
    assert.match(await b.msg(), /boşluk/);
    await b.tabTo("a.getAttribute('data-f')==='text'"); await b.key("s", 2 | 8); await b.type("5A_Ayşe_Bilgisayar"); await b.key("Enter");
    await b.tabTo("a.getAttribute('data-f')==='c|close'", true); await b.key("Enter");
    await b.tabTo("a.closest('.sim-list.desk')"); await b.arrowTo("Masaüstü/5A_Ayşe_Bilgisayar.txt"); await b.key("Enter");
  });
});

var PHONE = { width: 390, height: 760, touch: true };
// telefonda masaüstünün boş yerine uzun basış (sağ tık yerine)
async function pressBg(b, list) {
  var p = await b.eval("(function(){document.querySelector('.sim-bar').scrollIntoView({block:'end'});var q=document.querySelector(" + JSON.stringify(list) + ").getBoundingClientRect();return {x:q.left+q.width/2,y:q.bottom-15};})()");
  await b.touch(p, 800);
}

test("5-1-6 dokunmayla (390 px telefon)", { skip: SKIP, timeout: 120000 }, function (t) {
  return run(t, PHONE, D516, async function (b) {
    await wrongAndHint(b, async function () { await b.tap(".desk " + P("Masaüstü/siir.txt")); await b.tap(".desk " + P("Masaüstü/siir.txt") + " .sim-more"); await b.pick("Sil", true); }, true);
    await pressBg(b, ".sim-list.desk"); await b.pick("Yeni", true); await b.pick("Klasör", true); await b.type("5A_Ayşe"); await b.key("Enter");
    await b.tapOpen(".desk " + P("Masaüstü/5A_Ayşe"));
    for (var n of ["Yazilar", "Resimler", "Sesler"]) { await pressBg(b, ".sim-win .sim-list"); await b.pick("Yeni", true); await b.pick("Klasör", true); await b.type(n); await b.key("Enter"); }
    await b.tap('[data-f="c|close"]');
    for (var f in FILES) {
      await b.longPress(".desk " + P("Masaüstü/" + f)); await b.pick("Kes", true);
      await b.tapOpen(".desk " + P("Masaüstü/5A_Ayşe"));
      await b.tap(".win " + P("Masaüstü/5A_Ayşe/" + FILES[f])); await b.tap(".win " + P("Masaüstü/5A_Ayşe/" + FILES[f]) + " .sim-more"); await b.pick("Yapıştır", true);
      await b.tap('[data-f="c|close"]');
    }
    await b.tapOpen(".desk " + P("Masaüstü/5A_Ayşe")); await b.tapOpen(".win " + P("Masaüstü/5A_Ayşe/Resimler"));
    await b.longPress(".win " + P("Masaüstü/5A_Ayşe/Resimler/kedim.png")); await b.pick("Yeniden adlandır", true); await b.type("5A_Ayşe_Resim1"); await b.key("Enter");
    await b.tap("[data-up]"); await b.tapOpen(".win " + P("Masaüstü/5A_Ayşe/Yazilar"));
    await b.longPress(".win " + P("Masaüstü/5A_Ayşe/Yazilar/siir.txt")); await b.pick("Kopyala", true);
    await b.tap('[data-f="c|close"]'); await pressBg(b, ".sim-list.desk"); await b.pick("Yapıştır", true);
    await b.tapOpen(".desk " + P("Masaüstü/5A_Ayşe")); await b.tapOpen(".win " + P("Masaüstü/5A_Ayşe/Yazilar"));
    await b.longPress(".win " + P("Masaüstü/5A_Ayşe/Yazilar/taslak_eski.txt")); await b.pick("Sil", true);
    await b.tap('[data-f="c|close"]'); await b.tapOpen(".desk " + P("@trash")); await b.tap('[data-f="c|close"]');
    await b.longPress(".desk " + P("Masaüstü/5A_Ayşe")); await b.pick("ZIP dosyasına sıkıştır", true);
    await b.tapOpen(".desk " + P("Masaüstü/5A_Ayşe.zip"));
    await b.tap('[data-ans="0"]'); await b.tap('[data-ans="1"]');
  });
});

test("5-1-5 dokunmayla (390 px telefon)", { skip: SKIP, timeout: 120000 }, function (t) {
  return run(t, PHONE, D515, async function (b) {
    await wrongAndHint(b, async function () { await b.longPress(".desk " + P("Masaüstü/kedim.png")); await b.pick("Sil", true); }, true);
    await b.tap("[data-start]"); await b.pick("Not Defteri", true);
    await b.tap(".sim-text"); await b.type("Ayşe"); await sleep(600);
    await b.tap('[data-ans="0"]'); await b.tap('[data-ans="1"]');
    await b.tap('[data-f="c|filemenu"]'); await b.pick("Farklı kaydet", true); await b.type("5A_Ayşe_Bilgisayar"); await b.tap("[data-dosave]");
    await b.tap('[data-f="c|close"]'); await b.tapOpen(".desk " + P("Masaüstü/5A_Ayşe_Bilgisayar.txt"));
  });
});

test("ad kutusu açıkken basılan düğme tek basışta çalışır", { skip: SKIP, timeout: 120000 }, async function () {
  var b = await lesson({}, D516);
  try {
    await b.right(".desk " + P("Masaüstü/siir.txt")); await b.pick("Yeniden adlandır"); await b.type("siirim");
    await b.click("[data-hint]");
    assert.match(await b.msg(), /^İpucu/, "ipucu ilk basışta açılmalı");
    assert.ok(await b.eval("!!document.querySelector('.desk " + P("Masaüstü/siirim.txt").replace(/"/g, '\\"') + "')"), "ad kaydedilmeli");
  } finally { b.close(); }
});

test("dersin görevleri değişince eski kayıt baştan başlar", { skip: SKIP, timeout: 120000 }, async function () {
  var old = "localStorage.setItem('bd:sim:5-1-6-dosya-klasor', JSON.stringify({ os: 'windows', ver: 'eski,gorevler', state: SimCore.create({}, 'windows'), idx: 3, hints: 0 }))";
  var b = await lesson({}, D516, old);
  try { assert.strictEqual(await b.task(), "Görev 1 / 8"); assert.ok(await b.eval("!!document.querySelector('.desk " + P("Masaüstü/siir.txt").replace(/"/g, '\\"') + "')")); }
  finally { b.close(); }
});
