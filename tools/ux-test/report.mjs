/* runner.mjs çıktısından tek dosyalık HTML rapor: results/report.html (videolar içine gömülü).
   Çalıştırma: node tools/ux-test/report.mjs */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import config from "./ux-test.config.mjs";

var HERE = path.dirname(fileURLToPath(import.meta.url));
var OUT = path.join(HERE, "results");
var M = JSON.parse(fs.readFileSync(path.join(OUT, "metrics.json"), "utf8"));
var E = JSON.parse(fs.readFileSync(path.join(OUT, "events.json"), "utf8"));
var R = config.report || {};
var STEP = 200; // rapora her 200 ms'de bir kare (dosya boyutu için)

function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
function get(t, v) { return M.results.filter(function (r) { return r.task === t && r.version === v; })[0] || null; }
function num(x) { return String(x).replace(".", ","); }
function cell(r, f) { return r && r.ok ? f(r) : "–"; } // akla yatkın yol yoksa ya da koşu hata verdiyse boş

var rows = [
  ["Tıklama", function (r) { return r.metrics.taps; }],
  ["Tuş", function (r) { return r.metrics.keys; }],
  ["Kaydırma adımı (120 px)", function (r) { return r.metrics.wheel; }]
].concat((config.counted || []).map(function (c) { return [c.label, function (r) { return r.metrics.counted[c.id] || 0; }]; }),
  [["Model süresi (sn)", function (r) { return r.metrics.model; }]]);

function video(t, v) {
  var dir = path.join(OUT, "videos", t + "-" + v), list;
  try { list = JSON.parse(fs.readFileSync(path.join(dir, "frames.json"), "utf8")); } catch (e) { return '<p class="muted">Video yok.</p>'; }
  var keep = [], last = -1e9;
  list.forEach(function (f, i) { if (f.t * 1000 - last >= STEP || i === list.length - 1) { keep.push(f); last = f.t * 1000; } });
  var t0 = keep.length ? keep[0].t : 0;
  var data = keep.map(function (f) { return { t: Math.round((f.t - t0) * 1000), s: "data:image/jpeg;base64," + fs.readFileSync(path.join(dir, f.f)).toString("base64") }; });
  return '<div class="player" data-frames="' + esc(JSON.stringify(data)) + '"><img alt="' + esc(t + " · " + v + " ekran kaydı") + '"><div class="ctl"><button type="button">Oynat</button><input type="range" min="0" value="0" aria-label="Kare"><span class="tm">0,0 sn</span></div></div>';
}

function steps(t, v) {
  var l = E.filter(function (e) { return e.task === t && e.version === v && e.type !== "note"; });
  return '<ol class="steps">' + l.map(function (e) {
    var d = e.detail, txt = e.type === "say" ? "💭 " + d : e.type === "tap" ? (d.button === "right" ? "Sağ tık: " : "Tık: ") + d.target
      : e.type === "scroll" ? "Kaydırma ×" + d.ticks + ": " + d.target : e.type === "count" ? "Dolayım: " + (d.why || d.id)
      : e.type === "type" ? "Yazdı: " + d : e.type === "key" ? "Tuş: " + d : e.type === "result" ? "Sonuç: " + d : e.type === "error" ? "Hata: " + d : e.type;
    return '<li class="ev-' + e.type + '"><span>' + num(e.t.toFixed(1)) + ' sn</span>' + esc(txt) + '</li>';
  }).join("") + '</ol>';
}

var V = config.versions, total = {};
V.forEach(function (v) { total[v.id] = { taps: 0, wheel: 0, model: 0, counted: {}, ok: 0 }; });
M.results.forEach(function (r) {
  var s = total[r.version]; if (!s || !r.ok) return;
  s.ok += r.success ? 1 : 0; s.taps += r.metrics.taps; s.wheel += r.metrics.wheel; s.model += r.metrics.model;
  Object.keys(r.metrics.counted).forEach(function (k) { s.counted[k] = (s.counted[k] || 0) + r.metrics.counted[k]; });
});
var nTask = config.tasks.length;

var html = '<!doctype html><html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>' + esc(R.title || "Sentetik test") + '</title><style>' +
  ':root{--bg:#F4F6FB;--card:#fff;--ink:#14213D;--muted:#55607A;--line:#DCE1EC;--blue:#1E4FA8;--good:#0F7A4A;--bad:#B42318;--warn:#FFF4D6}' +
  '*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.5 system-ui,"Segoe UI",sans-serif}' +
  '.wrap{max-width:1180px;margin:0 auto;padding:24px 16px 64px}h1{font-size:28px;margin:0 0 6px}h2{font-size:21px;margin:36px 0 12px}h3{font-size:17px;margin:0 0 8px}' +
  '.muted{color:var(--muted)}.warn{background:var(--warn);border:1px solid #E9C46A;border-radius:12px;padding:12px 16px;margin:16px 0}' +
  '.card{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:16px;margin:12px 0}' +
  '.kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px}.kpi b{display:block;font-size:26px}.kpi small{color:var(--muted)}' +
  'table{border-collapse:collapse;width:100%;font-size:15px}th,td{border-bottom:1px solid var(--line);padding:6px 8px;text-align:left;vertical-align:top}td.n{text-align:right;font-variant-numeric:tabular-nums}' +
  '.better{color:var(--good);font-weight:700}.worse{color:var(--bad);font-weight:700}.tag{display:inline-block;font-size:12px;font-weight:700;padding:1px 8px;border-radius:99px;background:#E8EEF9;color:var(--blue)}' +
  '.pair{display:grid;grid-template-columns:1fr 1fr;gap:12px}@media(max-width:800px){.pair{grid-template-columns:1fr}}' +
  '.player img{width:100%;display:block;border:1px solid var(--line);border-radius:8px;background:#ddd;aspect-ratio:' + M.viewport.width + '/' + M.viewport.height + '}' +
  '.ctl{display:flex;gap:8px;align-items:center;margin-top:6px}.ctl input{flex:1}.ctl button{font:inherit;padding:4px 12px;border-radius:8px;border:1px solid var(--line);background:#fff;cursor:pointer}.tm{font-variant-numeric:tabular-nums;min-width:64px;text-align:right}' +
  '.steps{font-size:13px;padding-left:0;list-style:none;margin:8px 0 0}.steps li{padding:2px 0}.steps span{display:inline-block;width:56px;color:var(--muted)}.ev-scroll,.ev-count{color:var(--bad)}.ev-error{color:var(--bad);font-weight:700}' +
  'ul.f li{margin:6px 0}' +
  '</style></head><body><div class="wrap">' +
  '<h1>' + esc(R.title) + '</h1><p class="muted">' + esc(R.question) + '</p>' +
  '<div class="warn"><b>Bu bir sentetik test, kullanıcı araştırması değil.</b> Görevleri betiklenmiş bir persona yaptı; süreler ölçülmedi, sabit bir tempo modeliyle hesaplandı. Sayılar iki versiyonu aynı yol kuralıyla karşılaştırır; gerçek öğrencilerin ne yapacağını söylemez.</div>' +
  '<h2>Özet</h2><div class="kpis">' + V.map(function (v) {
    var s = total[v.id];
    return '<div class="card kpi"><h3>' + esc(v.label) + '</h3><b>' + s.ok + ' / ' + nTask + '</b><small>görev başarılı</small><p style="margin:8px 0 0">' + s.taps + ' tıklama · ' + s.wheel + ' kaydırma adımı · ' +
      (config.counted || []).map(function (c) { return (s.counted[c.id] || 0) + " " + c.label.toLocaleLowerCase("tr"); }).join(" · ") + ' · ' + num(s.model.toFixed(1)) + ' sn</p></div>';
  }).join("") + '</div>' +
  (R.headline ? '<p>' + R.headline + '</p>' : "") +
  '<h2>Bulgular</h2><ul class="f">' + (R.findings || []).map(function (f) { return '<li>' + f + '</li>'; }).join("") + '</ul>' +
  '<h2>Görevler</h2>' + config.tasks.map(function (t) {
    var a = get(t.id, V[0].id), b = get(t.id, V[1].id);
    return '<div class="card"><h3>' + esc(t.id + " · " + t.role + ": " + t.title) + (t.guard ? ' <span class="tag">koruma</span>' : "") + '</h3><p class="muted" style="margin:0 0 8px">' + esc(t.scenario) + '</p>' +
      '<table><thead><tr><th></th>' + V.map(function (v) { return '<th style="text-align:right">' + esc(v.label) + '</th>'; }).join("") + '</tr></thead><tbody>' +
      '<tr><td>Başarı</td>' + [a, b].map(function (r) { return '<td class="n">' + (r && r.ok ? (r.success ? "✓" : "✕") : "–") + '</td>'; }).join("") + '</tr>' +
      rows.map(function (row) {
        var x = cell(a, row[1]), y = cell(b, row[1]), cls = typeof x === "number" && typeof y === "number" && x !== y ? (y < x ? "better" : "worse") : "";
        return '<tr><td>' + esc(row[0]) + '</td><td class="n">' + num(x) + '</td><td class="n ' + cls + '">' + num(y) + '</td></tr>';
      }).join("") + '</tbody></table>' +
      ((R.notes || {})[t.id] ? '<p>' + R.notes[t.id] + '</p>' : "") +
      '<div class="pair" style="margin-top:12px">' + V.map(function (v) { return '<div><b>' + esc(v.label) + '</b>' + video(t.id, v.id) + steps(t.id, v.id) + '</div>'; }).join("") + '</div></div>';
  }).join("") +
  '<h2>Kurulum</h2><div class="card"><ul>' +
  '<li>Versiyonlar: ' + V.map(function (v) { return esc(v.label); }).join(" ve ") + '. Eski versiyon git\'ten ayrı klasöre çıkarıldı.</li>' +
  '<li>Tarayıcı: başsız Chrome, <code>file://</code>, ekran ' + M.viewport.width + '×' + M.viewport.height + ' px, her koşuda boş profil.</li>' +
  '<li>Tarih ' + esc(M.date.slice(0, 10)) + ' olarak sabitlendi (9. hafta, dersi hazır değil). İlk ziyaret, kayıtlı ilerleme yok.</li>' +
  '<li>Persona kuralı iki versiyonda aynı: görevle doğrudan eşleşen, ekranda görünen düğmeye tıklar; yoksa hafta oklarına döner (dolayım); hedef ekranın dışındaysa fare tekerleğiyle kaydırır.</li>' +
  '<li>Tempo: fareyi götürme ' + num(M.tempo.point) + ' sn + tıklama ' + num(M.tempo.press) + ' sn, tuş ' + num(M.tempo.key) + ' sn, düşünme ' + num(M.tempo.think) + ' sn, kaydırma adımı ' + num(M.tempo.wheel) + ' sn (bu sonuncusu bizim varsayımımız).</li>' +
  '</ul></div>' +
  '<h2>Sınırlar</h2><ul class="f">' + (R.limits || []).map(function (f) { return '<li>' + f + '</li>'; }).join("") + '</ul>' +
  '</div><script>' +
  'document.querySelectorAll(".player").forEach(function(p){var F=JSON.parse(p.getAttribute("data-frames")),img=p.querySelector("img"),r=p.querySelector("input"),b=p.querySelector("button"),tm=p.querySelector(".tm"),i=0,timer=null;' +
  'if(!F.length)return;r.max=F.length-1;function show(n){i=n;img.src=F[n].s;r.value=n;tm.textContent=(F[n].t/1000).toFixed(1).replace(".",",")+" sn";}' +
  'function stop(){clearTimeout(timer);timer=null;b.textContent="Oynat";}' +
  'function step(){if(i>=F.length-1){stop();return;}var d=F[i+1].t-F[i].t;timer=setTimeout(function(){show(i+1);step();},Math.max(16,d));}' +
  'b.onclick=function(){if(timer){stop();return;}if(i>=F.length-1)show(0);b.textContent="Durdur";step();};r.oninput=function(){stop();show(+r.value);};show(0);});' +
  '</script></body></html>';

var file = path.join(OUT, "report.html");
fs.writeFileSync(file, html);
console.log("Yazıldı: " + file + " (" + (fs.statSync(file).size / 1048576).toFixed(1) + " MB)");
