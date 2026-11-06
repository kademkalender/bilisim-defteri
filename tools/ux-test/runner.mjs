/* Sentetik kullanılabilirlik testi: betiklenmiş persona her versiyonda görevleri yapar.
   Çalıştırma: node tools/ux-test/runner.mjs   (sonra: node tools/ux-test/report.mjs)
   npm paketi yok: yüklü Chrome başsız açılır, Node'un yerleşik WebSocket'iyle (Node 22+) DevTools protokolü kullanılır.
   Ekran videosu Page.startScreencast kareleridir (results/videos/<görev>-<versiyon>/), rapor onları oynatır.
   Projeye özel her şey ux-test.config.mjs içindedir; bu dosya düzenlenmez. */
import cp from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import config from "./ux-test.config.mjs";

var HERE = path.dirname(fileURLToPath(import.meta.url));
var REPO = path.resolve(HERE, "..", "..");
var OUT = path.join(HERE, "results");
var sleep = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };

// Sabit tempo (saniye). Süre ölçülmez, bu modelle hesaplanır.
var TEMPO = { point: 0.65, press: 0.26, key: 0.15, think: 1.9, wheel: 0.25 };
var PACE = config.pace || 1; // videodaki gerçek bekleme = model süresi × PACE

function findChrome() {
  var list = [process.env.BD_CHROME];
  if (process.platform === "win32") [process.env.PROGRAMFILES, process.env["PROGRAMFILES(X86)"], process.env.LOCALAPPDATA].forEach(function (d) { if (d) list.push(path.join(d, "Google/Chrome/Application/chrome.exe")); });
  else if (process.platform === "darwin") list.push("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", "/Applications/Chromium.app/Contents/MacOS/Chromium");
  else ["google-chrome", "google-chrome-stable", "chromium", "chromium-browser"].forEach(function (n) { try { list.push(cp.execSync("command -v " + n, { encoding: "utf8" }).trim()); } catch (e) {} });
  return list.filter(function (p) { return p && fs.existsSync(p); })[0] || null;
}

// Versiyonun dosyaları: ref verilmişse git'ten results/versions/<id>/ altına çıkarılır (çalışma kopyasına dokunulmaz)
function versionDir(v) {
  if (!v.ref) return v.dir ? path.resolve(REPO, v.dir) : REPO;
  var dir = path.join(OUT, "versions", v.id), tar = path.join(OUT, "versions", v.id + ".tar");
  if (!fs.existsSync(path.join(dir, "index.html"))) {
    fs.mkdirSync(dir, { recursive: true });
    cp.execFileSync("git", ["-C", REPO, "archive", "--format=tar", "-o", tar, v.ref]);
    cp.execFileSync("tar", ["-xf", path.join("..", v.id + ".tar")], { cwd: dir }); // göreli yol: GNU tar "C:" önekini uzak makine sanar
    fs.rmSync(tar, { force: true });
  }
  return dir;
}
function fileUrl(dir, file) { return "file:///" + path.join(dir, file).replace(/\\/g, "/").replace(/^\//, ""); }

// Saati sabitler: "bu hafta" iki versiyonda da aynı olsun
function freezeDate(iso) {
  return "(function(){var R=Date,off=new R(" + JSON.stringify(iso) + ").getTime()-R.now();" +
    "function D(a,b,c,d,e,f,g){if(!(this instanceof D))return new R(R.now()+off).toString();var n=arguments.length;" +
    "return n===0?new R(R.now()+off):n===1?new R(a):new R(a,b,c===undefined?1:c,d||0,e||0,f||0,g||0);}" +
    "D.prototype=R.prototype;D.now=function(){return R.now()+off;};D.UTC=R.UTC;D.parse=R.parse;Date=D;})();";
}

async function browser(vp) {
  var chrome = findChrome();
  if (!chrome) throw new Error("Chrome bulunamadı (BD_CHROME ile yol verin)");
  if (typeof WebSocket === "undefined") throw new Error("Node 22+ gerekli (yerleşik WebSocket)");
  var dir = fs.mkdtempSync(path.join(os.tmpdir(), "bd-ux-"));
  var proc = cp.spawn(chrome, ["--headless=new", "--remote-debugging-port=0", "--user-data-dir=" + dir, "--no-first-run", "--no-default-browser-check", "--allow-file-access-from-files", "--hide-scrollbars", "about:blank"], { stdio: "ignore" });
  var ws = null;
  for (var i = 0; i < 100 && !ws; i++) {
    await sleep(100);
    try {
      var port = fs.readFileSync(path.join(dir, "DevToolsActivePort"), "utf8").split("\n")[0];
      var pg = (await (await fetch("http://127.0.0.1:" + port + "/json")).json()).filter(function (x) { return x.type === "page"; })[0];
      if (pg) ws = new WebSocket(pg.webSocketDebuggerUrl);
    } catch (e) {}
  }
  if (!ws) { proc.kill(); throw new Error("Chrome açılamadı"); }
  await new Promise(function (r) { ws.onopen = r; });
  var id = 0, pending = {}, listeners = [], errors = [];
  ws.onmessage = function (m) {
    var d = JSON.parse(m.data);
    if (d.id && pending[d.id]) { pending[d.id](d); delete pending[d.id]; }
    if (d.method === "Runtime.exceptionThrown") errors.push(d.params.exceptionDetails.exception ? d.params.exceptionDetails.exception.description : d.params.exceptionDetails.text);
    if (d.method) listeners.forEach(function (f) { f(d); });
  };
  var send = function (method, params) { return new Promise(function (r, j) { var n = ++id; pending[n] = function (d) { if (d.error) j(new Error(method + ": " + JSON.stringify(d.error))); else r(d.result); }; ws.send(JSON.stringify({ id: n, method: method, params: params || {} })); }); };
  await send("Runtime.enable"); await send("Page.enable");
  await send("Emulation.setDeviceMetricsOverride", { width: vp.width, height: vp.height, deviceScaleFactor: 1, mobile: false });
  return {
    send: send, errors: errors, on: function (f) { listeners.push(f); },
    eval: async function (expr) { var r = await send("Runtime.evaluate", { expression: expr, returnByValue: true, awaitPromise: true }); if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception ? r.exceptionDetails.exception.description : r.exceptionDetails.text); return r.result.value; },
    close: function () { try { ws.close(); } catch (e) {} proc.kill(); setTimeout(function () { try { fs.rmSync(dir, { recursive: true, force: true }); } catch (e) {} }, 800); }
  };
}

// Sayfa içi yardımcılar: hedef bulma, görünürlük, persona izi (dokunma halkası, düşünce balonu)
var PAGE = "window.__ux=window.__ux||(function(){" +
  "function vis(e){return e&&e.getClientRects().length>0&&getComputedStyle(e).visibility!=='hidden';}" +
  "function find(t){var l=[].slice.call(document.querySelectorAll(t.css)).filter(vis);" +
  "if(t.text!=null)l=l.filter(function(e){return e.textContent.replace(/[›→]/g,'').replace(/\\s+/g,' ').trim()===t.text;});return l[0]||null;}" +
  "function top(){var h=document.querySelector('.top');if(!h)return 0;var p=getComputedStyle(h).position;return p==='sticky'||p==='fixed'?Math.max(0,h.getBoundingClientRect().bottom):0;}" +
  "function box(t){var e=find(t);if(!e)return null;var q=e.getBoundingClientRect(),x=q.left+q.width/2,y=q.top+q.height/2;" +
  "if(t.at){x=t.at.x<0?q.right+t.at.x:q.left+t.at.x;y=t.at.y<0?q.bottom+t.at.y:q.top+t.at.y;}" +
  "return {x:x,y:y,top:q.top,bottom:q.bottom,h:q.height,vh:innerHeight,hb:top(),point:!!t.at};}" +
  "function layer(id,css){var d=document.getElementById(id);if(!d){d=document.createElement('div');d.id=id;d.style.cssText=css;document.documentElement.appendChild(d);}return d;}" +
  "function dot(x,y,right){var d=layer('ux-dot','position:fixed;z-index:2147483647;pointer-events:none;width:34px;height:34px;margin:-17px 0 0 -17px;border-radius:50%;transition:opacity .5s');" +
  "d.style.left=x+'px';d.style.top=y+'px';d.style.border='4px solid '+(right?'#C2410C':'#E11D48');d.style.background='rgba(225,29,72,.18)';d.style.opacity='1';clearTimeout(d.t);d.t=setTimeout(function(){d.style.opacity='0';},650);}" +
  "function say(s){var d=layer('ux-say','position:fixed;z-index:2147483646;pointer-events:none;right:12px;bottom:12px;max-width:420px;background:#14213D;color:#fff;font:600 15px/1.35 system-ui,sans-serif;padding:8px 12px;border-radius:10px;opacity:.94');d.textContent='💭 '+s;}" +
  "return {find:find,box:box,dot:dot,say:say};})();";

function T(css, text, at) { return typeof css === "object" ? css : { css: css, text: text == null ? null : text, at: at || null }; }
function label(t) { return t.css + (t.text != null ? " «" + t.text + "»" : ""); }

async function runOne(task, v, vp) {
  var b = await browser(vp), dir = versionDir(v), events = [], m = { taps: 0, keys: 0, thinks: 0, wheel: 0, scrollPx: 0, counted: {}, model: 0 };
  (config.counted || []).forEach(function (c) { m.counted[c.id] = 0; });
  var vdir = path.join(OUT, "videos", task.id + "-" + v.id);
  fs.rmSync(vdir, { recursive: true, force: true }); fs.mkdirSync(vdir, { recursive: true });
  var frames = [], t0 = 0;
  b.on(function (d) {
    if (d.method !== "Page.screencastFrame") return;
    var n = frames.length, f = String(n).padStart(4, "0") + ".jpg";
    fs.writeFileSync(path.join(vdir, f), Buffer.from(d.params.data, "base64"));
    frames.push({ f: f, t: d.params.metadata.timestamp });
    b.send("Page.screencastFrameAck", { sessionId: d.params.sessionId }).catch(function () {});
  });
  var log = function (type, detail) { events.push({ task: task.id, version: v.id, t: +m.model.toFixed(2), type: type, detail: detail }); };
  var spend = async function (sec) { m.model += sec; await sleep(sec * 1000 * PACE); };
  var ux = function (expr) { return b.eval(PAGE + expr); };

  // Hazırlık (videoya girmez): saat, temiz kayıt, başlangıç ayarları
  await b.send("Page.addScriptToEvaluateOnNewDocument", { source: freezeDate(config.date) });
  var url = fileUrl(dir, "index.html");
  await b.send("Page.navigate", { url: url + "#home" }); await sleep(700);
  await b.eval("localStorage.clear();" + Object.keys(task.start.storage || {}).map(function (k) { return "localStorage.setItem(" + JSON.stringify(k) + "," + JSON.stringify(JSON.stringify(task.start.storage[k])) + ");"; }).join(""));
  await b.send("Page.navigate", { url: "about:blank" }); await sleep(150);
  await b.send("Page.navigate", { url: url + task.start.hash }); await sleep(900);

  var p = {
    T: T,
    say: async function (s) { m.thinks++; log("say", s); await ux("__ux.say(" + JSON.stringify(s) + ")"); await spend(TEMPO.think); },
    exists: async function (t) { t = T(t); return !!(await ux("__ux.box(" + JSON.stringify(t) + ")")); },
    // Ekranda, kaydırmadan görünüyor mu (üstteki yapışkan bant hariç)
    visible: async function (t) {
      t = T(t); var q = await ux("__ux.box(" + JSON.stringify(t) + ")");
      if (!q) return false;
      if (q.point) return q.y >= q.hb + 4 && q.y <= q.vh - 4;
      return q.top >= q.hb - 1 && q.bottom <= q.vh + 1 || (q.h > q.vh - q.hb && q.top >= q.hb - 1 && q.top < q.vh * 0.5);
    },
    // Hedef ekranda değilse fare tekerleğiyle kaydırır; her kaydırma sayılır
    reveal: async function (t, why) {
      t = T(t); var moved = 0;
      for (var i = 0; i < 40; i++) {
        var q = await ux("__ux.box(" + JSON.stringify(t) + ")");
        if (!q) { await sleep(150); continue; }
        if (await p.visible(t)) break;
        var down = q.point ? q.y > q.vh - 4 : q.bottom > q.vh + 1 && q.top > q.hb;
        var dy = down ? 120 : -120;
        await b.send("Input.dispatchMouseEvent", { type: "mouseWheel", x: vp.width / 2, y: vp.height / 2, deltaX: 0, deltaY: dy });
        m.wheel++; m.scrollPx += Math.abs(dy); moved++; await spend(TEMPO.wheel);
      }
      if (!(await p.visible(t))) throw new Error("Could not reveal element: " + label(t));
      if (moved) { log("scroll", { target: label(t), ticks: moved, why: why || null }); if (m.counted.kaydirma != null) m.counted.kaydirma++; }
      return moved > 0;
    },
    // Göz gezdirme: hedefi bilmeden sayfada arama (dolayım sayılır)
    browse: async function (t, why) { await p.count("dolayim", why); return p.reveal(t, why); },
    count: async function (id, why) { m.counted[id] = (m.counted[id] || 0) + 1; log("count", { id: id, why: why || null }); },
    // Persona kuralı: listedeki ilk hedef ekranda görünüyorsa o; yoksa var olan ilk hedef
    find: async function (list) {
      list = list.map(T);
      for (var i = 0; i < list.length; i++) if (await p.visible(list[i])) return list[i];
      for (i = 0; i < list.length; i++) if (await p.exists(list[i])) return list[i];
      return null;
    },
    tap: async function (t, opts) {
      t = T(t); opts = opts || {};
      await p.reveal(t, opts.why);
      var q = await ux("__ux.box(" + JSON.stringify(t) + ")"), right = opts.button === "right";
      await spend(TEMPO.point);
      await ux("__ux.dot(" + q.x + "," + q.y + "," + right + ")");
      await b.send("Input.dispatchMouseEvent", { type: "mouseMoved", x: q.x, y: q.y });
      var n = opts.double ? 2 : 1;
      for (var i = 1; i <= n; i++) {
        await b.send("Input.dispatchMouseEvent", { type: "mousePressed", x: q.x, y: q.y, button: right ? "right" : "left", buttons: right ? 2 : 1, clickCount: i });
        await b.send("Input.dispatchMouseEvent", { type: "mouseReleased", x: q.x, y: q.y, button: right ? "right" : "left", buttons: 0, clickCount: i });
        m.taps++;
      }
      log("tap", { target: label(t), button: right ? "right" : "left", double: !!opts.double });
      await spend(TEMPO.press * n);
    },
    type: async function (text) {
      for (var i = 0; i < text.length; i++) { await b.send("Input.insertText", { text: text[i] }); m.keys++; await spend(TEMPO.key); }
      log("type", text);
    },
    key: async function (key) {
      var codes = { Enter: 13, Escape: 27, Tab: 9, ArrowDown: 40, ArrowUp: 38, ArrowLeft: 37, ArrowRight: 39, Delete: 46, Backspace: 8 };
      var base = { key: key, code: key, windowsVirtualKeyCode: codes[key] || 0 };
      await b.send("Input.dispatchKeyEvent", Object.assign({ type: "rawKeyDown" }, base));
      if (key === "Enter") await b.send("Input.dispatchKeyEvent", Object.assign({ type: "char", text: "\r" }, base));
      await b.send("Input.dispatchKeyEvent", Object.assign({ type: "keyUp" }, base));
      m.keys++; log("key", key); await spend(TEMPO.key);
    },
    eval: function (expr) { return b.eval(expr); },
    wait: function (ms) { return sleep(ms); },
    note: function (k, val) { log("note", { k: k, v: val }); }
  };

  var res = { task: task.id, version: v.id, ok: false, success: false, error: null };
  await b.send("Page.startScreencast", { format: "jpeg", quality: 50, maxWidth: 1024, maxHeight: Math.round(vp.height * 1024 / vp.width), everyNthFrame: 1 });
  await sleep(600);
  try {
    await p.say(task.scenario);
    var path_ = await task.run(p, v);
    res.ok = true;
    res.path = path_ || null;
    res.success = !!(await task.success(p, v));
    log("result", res.success ? "başarılı" : "başarısız");
  } catch (e) {
    res.error = String(e.message || e).split("\n")[0];
    log("error", res.error);
  }
  await sleep(1200);
  await b.send("Page.stopScreencast").catch(function () {});
  await sleep(300);
  fs.writeFileSync(path.join(vdir, "frames.json"), JSON.stringify(frames));
  res.metrics = { taps: m.taps, keys: m.keys, thinks: m.thinks, wheel: m.wheel, scrollPx: m.scrollPx, counted: m.counted, model: +m.model.toFixed(1) };
  res.pageErrors = b.errors.slice();
  res.frames = frames.length;
  b.close();
  return { res: res, events: events };
}

async function main() {
  var only = process.argv.slice(2); // isteğe bağlı: görev id'leri
  var vp = config.viewport || { width: 1366, height: 657 };
  fs.mkdirSync(OUT, { recursive: true });
  var results = [], events = [];
  for (var task of config.tasks) {
    if (only.length && only.indexOf(task.id) < 0) continue;
    for (var v of config.versions) {
      process.stdout.write(task.id + " · " + v.id + " … ");
      var r = await runOne(task, v, vp);
      results.push(r.res); events = events.concat(r.events);
      console.log(r.res.ok ? (r.res.success ? "OK" : "OK (başarısız)") : "HATA: " + r.res.error, r.res.metrics.model + " sn", r.res.frames + " kare", r.res.pageErrors.length ? "sayfa hatası: " + r.res.pageErrors.length : "");
    }
  }
  var mPath = path.join(OUT, "metrics.json"), ePath = path.join(OUT, "events.json");
  if (only.length && fs.existsSync(mPath)) { // kısmi koşu: diğer görevlerin sonuçları korunur
    results = JSON.parse(fs.readFileSync(mPath, "utf8")).results.filter(function (x) { return only.indexOf(x.task) < 0; }).concat(results);
    events = JSON.parse(fs.readFileSync(ePath, "utf8")).filter(function (x) { return only.indexOf(x.task) < 0; }).concat(events);
  }
  fs.writeFileSync(mPath, JSON.stringify({ date: config.date, viewport: vp, tempo: TEMPO, results: results }, null, 1));
  fs.writeFileSync(ePath, JSON.stringify(events, null, 1));
  console.log("Yazıldı: " + path.relative(REPO, mPath) + ", " + path.relative(REPO, ePath));
}
main().catch(function (e) { console.error(e); process.exit(1); });
