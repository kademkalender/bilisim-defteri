/* Arayüz ikonları: satır içi SVG yolları (24×24, çizgi). Emoji değil SVG: Pardus'ta renkli emoji yazı tipi olmayabilir.
   Site (assets/app.js) ve tasarım sistemi (tasarim-sistemi.html) aynı listeyi kullanır. Yeni ikon önce buraya eklenir. */
window.BD = window.BD || { lessons: {} };
BD.icons = {
  slayt: '<path d="M8 5v14l11-7z" fill="currentColor"/>',
  defter: '<path d="M4 20h4L19 9l-4-4L4 16z"/>',
  etkinlik: '<path d="M5 3l14 8-6 2-2 6z"/>',
  test: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.7M12 17h.01"/>',
  bulmaca: '<path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z"/>',
  oyun: '<rect x="3" y="4" width="7" height="9" rx="1.5"/><rect x="14" y="4" width="7" height="9" rx="1.5"/><path d="M6.5 17v3M17.5 17v3M4 20h17"/>',
  lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  back: '<path d="M15 5l-7 7 7 7"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  akis: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 3h6v3H9zM9 11h6M9 15h4"/>',
  okul: '<path d="M3 21h18M5 21V10l7-5 7 5v11M10 21v-5h4v5"/>',
  ekran: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',
  wifi: '<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0M12 19.5h.01"/>',
  hareket: '<path d="M3 12h3l3-7 4 14 3-7h5"/>',
  sil: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
  ogrenci: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  ogretmen: '<rect x="3" y="3" width="18" height="12" rx="2"/><path d="M8 21l3-6M16 21l-3-6M7 8h6"/>',
  harita: '<path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2zM9 4v14M15 6v14"/>',
  tahta: '<rect x="2" y="3" width="20" height="13" rx="1.5"/><path d="M6 8h8M6 11.5h5M8 20l2-4M16 20l-2-4"/>',
  tekrar: '<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 3v5h5M4 13a8 8 0 0 0 14.3 4.9L20 16M20 21v-5h-5"/>',
  yazdir: '<path d="M7 9V3h10v6M7 17H4v-7h16v7h-3M7 14h10v7H7z"/>'
};
