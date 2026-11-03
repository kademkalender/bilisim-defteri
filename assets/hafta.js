/* Okul takviminde bugünün kaçıncı öğretim haftası olduğunu bulur.
   schoolWeek(date, cal) → { w: hafta no, state: "ders" | "tatil" | "once" | "sonra" }
   cal: content/plan.js içindeki BD.calendar. Tatil haftaları sayılmaz.
   Tatilde bir sonraki öğretim haftası, yıl başlamadan 1. hafta, yıl bitince son hafta döner.
   Hafta pazartesi başlar, cumartesi ve pazar o haftaya sayılır. */
window.schoolWeek = function (date, cal) {
  var day = function (s) { var p = s.split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); };
  var monday = function (d) { var m = new Date(d.getFullYear(), d.getMonth(), d.getDate()); m.setDate(m.getDate() - (m.getDay() + 6) % 7); return m; };
  var inBreak = function (m) { return cal.breaks.some(function (b) { return m >= day(b.from) && m <= day(b.to); }); };
  var weeks = [], end = day(cal.end);
  for (var m = monday(day(cal.start)); m <= end; m = new Date(m.getFullYear(), m.getMonth(), m.getDate() + 7)) {
    if (!inBreak(m)) weeks.push(m.getTime());
  }
  var now = monday(date).getTime();
  if (now < weeks[0]) return { w: 1, state: "once" };
  if (now > weeks[weeks.length - 1]) return { w: weeks.length, state: "sonra" };
  for (var i = 0; i < weeks.length; i++) if (weeks[i] >= now) return { w: i + 1, state: weeks[i] === now ? "ders" : "tatil" };
};
