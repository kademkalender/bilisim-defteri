#!/bin/sh
# Bilişim Defteri — git hook kurulumu (Pardus/Linux/macOS)
# Kullanım: tools/kur.sh
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
chmod +x tools/hooks/pre-commit
git config core.hooksPath tools/hooks
echo "Kuruldu: her commit öncesi 'node tools/dogrula.js' otomatik çalışacak."
