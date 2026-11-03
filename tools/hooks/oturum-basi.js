#!/usr/bin/env node
/* Claude Code SessionStart hook'u: GitHub'daki yeni commit'leri bildirir.
   Sadece bilgi verir: fetch dışında depoya hiçbir şey yazmaz (pull, merge yok).
   Çıktı stdout'a gider, Claude Code bunu oturuma bağlam olarak ekler.
   Ne olursa olsun 0 ile çıkar, oturumu engellemez. */
var execFileSync = require("child_process").execFileSync;
var path = require("path");

var root = process.env.CLAUDE_PROJECT_DIR || path.join(__dirname, "..", "..");

function git(args, timeout) {
  return execFileSync("git", args, {
    cwd: root,
    encoding: "utf8",
    timeout: timeout || 10000,
    stdio: ["ignore", "pipe", "ignore"],
    env: Object.assign({}, process.env, { GIT_TERMINAL_PROMPT: "0" })
  }).replace(/\s+$/, ""); // baştaki boşluk git status sütununun parçası, silinmemeli
}

function list(title, text) {
  console.log(title + (text ? "\n" + text.split("\n").map(function (l) { return "  " + l; }).join("\n") : " yok."));
}

try {
  console.log("## Oturum başı: GitHub kontrolü");

  try { git(["fetch", "origin"], 15000); }
  catch (e) { console.log("Uyarı: git fetch yapılamadı (internet yok ya da erişim sorunu). Aşağıdaki bilgiler eski olabilir."); }

  var up;
  try { up = git(["rev-parse", "--abbrev-ref", "@{u}"]); }
  catch (e) { console.log("Bu dalın takip ettiği uzak dal yok, karşılaştırma yapılamadı."); }

  if (up) {
    console.log("Dal: " + git(["rev-parse", "--abbrev-ref", "HEAD"]) + " ↔ " + up);
    list("Gelen (" + up + "'da olup yerelde olmayan) commit'ler:",
      git(["log", "--format=%h %an %ad %s", "--date=short", "HEAD..@{u}"]));
    list("Push edilmemiş yerel commit'ler:",
      git(["log", "--format=%h %an %ad %s", "--date=short", "@{u}..HEAD"]));
  }

  list("Commit edilmemiş değişiklikler:", git(["status", "--porcelain"]));
} catch (e) {
  console.log("Oturum başı kontrolü çalışamadı: " + e.message);
}
process.exit(0);
