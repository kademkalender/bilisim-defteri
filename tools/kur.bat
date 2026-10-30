@echo off
REM Bilişim Defteri — git hook kurulumu (Windows)
REM Kullanım: tools\kur.bat
setlocal
cd /d "%~dp0\.."
git config core.hooksPath tools/hooks
echo Kuruldu: her commit oncesi 'node tools/dogrula.js' otomatik calisacak.
endlocal
