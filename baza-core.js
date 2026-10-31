/* ============================================================
   Tibbiy jihozlar bazasi — umumiy yadro
   CSV o'qish, ustunlar xaritasi, paketlash (gzip), sana yordamchilari.
   Brauzerda ham (baza.html), Node'da ham (sinov) ishlaydi.
   ============================================================ */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.BazaCore = factory();
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  /* ---------- CSV ---------- */
  function parseCSV(text, delim) {
    if (text.charCodeAt(0) === 0xFEFF) text = text.slice(1);
    if (!delim) {
      const first = text.slice(0, text.indexOf("\n") < 0 ? text.length : text.indexOf("\n"));
      delim = [";", ",", "\t"].sort((a, b) => first.split(b).length - first.split(a).length)[0];
    }
    const rows = []; let row = [], field = "", i = 0, q = false; const n = text.length;
    while (i < n) {
      const c = text[i];
      if (q) {
        if (c === '"') { if (text[i + 1] === '"') { field += '"'; i += 2; continue; } q = false; i++; continue; }
        field += c; i++; continue;
      }
      if (c === '"') { q = true; i++; continue; }
      if (c === delim) { row.push(field); field = ""; i++; continue; }
      if (c === "\r") { i++; continue; }
      if (c === "\n") { row.push(field); rows.push(row); row = []; field = ""; i++; continue; }
      field += c; i++;
    }
    if (field !== "" || row.length) { row.push(field); rows.push(row); }
    const header = (rows.shift() || []).map(h => h.trim());
    const out = [];
    for (const r of rows) {
      if (r.length === 1 && r[0] === "") continue;
      const o = {};
      for (let k = 0; k < header.length; k++) { const v = r[k]; if (v !== undefined && v !== "") o[header[k]] = v; }
      out.push(o);
    }
    return { header, rows: out };
  }

  /* ---------- sanalar ---------- */
  const RE_DMY = /^(\d{1,2})[./-](\d{1,2})[./-](\d{4})(?:[ T].*)?$/;
  const RE_ISO = /^(\d{4})-(\d{2})-(\d{2})/;
  function toISO(s) {                        // "04.02.2025 0:00:00" -> "2025-02-04"
    if (!s) return "";
    const m = RE_DMY.exec(s.trim());
    if (m) { const y = +m[3]; if (y < 1900 || y > 2100) return ""; return m[3] + "-" + m[2].padStart(2, "0") + "-" + m[1].padStart(2, "0"); }
    const k = RE_ISO.exec(s.trim()); return k ? k[0] : "";
  }
  function fromISO(s) { if (!s) return ""; const m = RE_ISO.exec(s); return m ? m[3] + "." + m[2] + "." + m[1] : s; }

  /* ---------- Изделие ustunlari ---------- */
  // Saytga umuman kirmaydiganlar (maxfiy yoki kerak emas)
  const EXCLUDE = new Set(["Сумма_догов", "Сумма1", "Сумма2", "Сумма3", "Тип_изделия", "Гр_изделия", "Вид_изделия"]);
  const DATE_COLS = new Set(["Док_дат", "Дата_догов", "Извещ1", "Извещ2", "Извещ3", "Эксп_дат_1", "Эксп_дат_2", "Эксп_дат_3", "Эксп_дат_4",
    "Эксп_датп_1", "Эксп_датп_2", "Эксп_датп_3", "Эксп_датп_4", "Лаб_дат_1", "Лаб_дат_2", "Лаб_дат_3", "Лаб_дат_4", "Лаб_дат_5",
    "Клин_дат_1", "Клин_дат_2", "Клин_дат_3", "Клин_датп_1", "Клин_датп_2", "Клин_датп_3", "През_1_дат", "През_2_дат", "През_3_дат", "През_4_дат",
    "Эксп_дат", "Рег_дат1", "Рег_дат2", "Рег_дат3", "Дата_забора", "Дата_окон", "Дата_корр", "Эксп_дат2", "Рег_дат12", "Дата_забора2", "Дата_забора3",
    "Дата_изм_нд", "Дата_карточки"]);

  // Qidiruv indeksi — har ish uchun qisqa massiv, shu tartibda
  const IDX = ["Док_ном", "Док_дат", "Дата_карточки", "Ном_договора", "Дата_догов", "ном_архив", "Статус", "Страна", "Фирма_произв", "Держатель РУ",
    "Представитель", "Эксп_1", "Эксп_2", "Эксп_3", "Эксп_4", "Лаб_1", "Лаб_2", "Лаб_3", "Лаб_4", "Лаб_5", "Клин_1", "Клин_2", "Клин_3",
    "Код_док_ГУ", "Нормдок", "Вопр1_през", "Вопр2_през", "Вопр3_през", "Вопр4_през", "Эксп_реш", "Эксп_дат", "През_1_дат", "През_2_дат",
    "През_3_дат", "През_4_дат", "Рег_дат1", "Рег_дат2", "Дата_корр", "Дата_забора", "Сост_дел", "Сост_опл", "Сост_рег", "Реестр", "Исполнит",
    "папка", "Направл", "Наим_изделия", "Наим_издел_lat", "Наим_издел_мнр", "Рег_ном", "Рег_ном2"];
  const IDX_POS = {}; IDX.forEach((c, i) => IDX_POS[c] = i);

  const FULL_CHUNK = 200;        // bitta "to'liq" paketda nechta ish (Док_ном oralig'i)
  const IDX_CHUNK = 4000;        // bitta indeks paketida nechta ish
  const PIDX_CHUNK = 12000;      // ilova nomlari indeksi

  // Ma'lumotnomalar: CSV nomi -> {k: kalit ustun, f: olinadigan ustunlar}
  const SPR = {
    strany: { csv: "Страны", k: "Ном_стран", f: ["Тип_страны", "Наим_стран", "Наим_стран_узб"] },
    tip_stran: { csv: "Типы_стран", k: "Ном_стран", f: ["Наим_тип_страны", "Наим_узблат"] },
    status: { csv: "Статус", k: "Код_сост", f: ["Наим_состоян", "Наим_состоянузб", "Наим_состоянлат", "пор_вых"] },
    sost_del: { csv: "Сост_делопр", k: "Код_сост", f: ["Наим_состоян", "пор_вых", "практив"] },
    sost_opl: { csv: "Сост_опл", k: "Код_сост", f: ["Наим_состоян"] },
    sost_reg: { csv: "Сост_рег", k: "Код_сост", f: ["Наим_состоян", "пор_вых", "практив"] },
    reestr: { csv: "сост_реестра", k: "Код реестра", f: ["Наим_реестра"] },
    ispoln: { csv: "Реестры", k: "Код реестра", f: ["Наим_реестра", "должность", "ПрАктив"] },
    eksperty: { csv: "Эксперты", k: "Док_ном", f: ["Фамилия", "Имя", "Отч", "Предприятие", "Должность", "Неактив"] },   // pasport, uy manzili, telefon — YO'Q
    lab: { csv: "Лаборатории", k: "Док_ном", f: ["Наим_лабор_кор", "Наим_лаб_полн", "Актив"] },
    klin: { csv: "Клиники", k: "Док_ном", f: ["Наим_клиники", "Основ_деятел"] },
    razr: { csv: "Разрешения", k: "Код разр", f: ["Наим_разр_рус", "Наим_разр_узб"] },
    resh_eksp: { csv: "Тип_реш_Эксп", k: "Ном_реш", f: ["Наим_решкр", "Наим_решРус"] },
    resh_lab: { csv: "Тип_реш_лаб", k: "Ном_реш", f: ["Наим_решкр", "Наим_решРус"] },
    resh_klin: { csv: "Тип_реш_клин", k: "Ном_реш", f: ["Наим_решкр", "Наим_решРус"] },
    resh_prez: { csv: "Тип_реш_през", k: "Ном_реш", f: ["Наим_решкр", "Наим_решРус"] },
    resh_eksov: { csv: "Тип_реш_эксов", k: "Ном_реш", f: ["Наим_решкр", "Наим_решРус"] },
    eksp_lab: { csv: "эксп_лаб", k: "Код_эксп", f: ["Код_лаб", "Эксперт"] },
    papki: { csv: "папки", k: "id_pap", f: ["имя_папки"] },
    prez: { csv: "Президиумы", k: "Презид_ID", f: ["Номер_през", "Дата_през"], dates: ["Дата_през"] },
    vopr: { csv: "Вопросы_през", k: null, f: null },           // ustunlar fayl kelganda aniqlanadi
    tip_izd: { csv: "Типы_изделий", k: "Ном_типа", f: ["Наимен_типа", "abrev"] },
  };
  const FIRMA = { csv: "Производители", k: "Док_ном", f: ["Наим_Фирмы_произ", "Наим_фирм_рус", "Наим_фирм_узбlat", "Наим_фирм_анг", "Страна_произв"] }; // bank rekvizitlari — YO'Q
  const ADRES = { csv: "Адреспроизв", k: null, f: null };
  const MESTOREG = { csv: "Месторег" };
  const PRIL = { csv: "Приложение" };

  const nrm = s => String(s || "").trim().toLowerCase().replace(/ё/g, "е").replace(/\s+/g, "_");
  function findCSV(files, name) {           // files: {nomi: matn}
    const want = nrm(name);
    for (const k of Object.keys(files)) if (nrm(k.replace(/\.csv$/i, "")) === want) return files[k];
    return null;
  }

  /* ---------- paketlash ---------- */
  async function gzipStr(str) {
    const cs = new CompressionStream("gzip"); const w = cs.writable.getWriter();
    w.write(new TextEncoder().encode(str)); w.close();
    return new Uint8Array(await new Response(cs.readable).arrayBuffer());
  }
  async function gunzipToStr(u8) {
    const ds = new DecompressionStream("gzip"); const w = ds.writable.getWriter();
    w.write(u8); w.close();
    return new TextDecoder().decode(await new Response(ds.readable).arrayBuffer());
  }

  function sprTable(files, spec, log) {
    const txt = findCSV(files, spec.csv);
    if (!txt) { log && log("  ! " + spec.csv + ".csv topilmadi — bo'sh qoldi"); return {}; }
    const { header, rows } = parseCSV(txt);
    const k = spec.k || header[0];
    const f = spec.f || header.filter(h => h !== k);
    const out = {};
    for (const r of rows) {
      const id = (r[k] || "").trim(); if (!id) continue;
      const o = {};
      for (const c of f) if (r[c] !== undefined) o[c] = (spec.dates && spec.dates.includes(c)) ? toISO(r[c]) : r[c];
      out[id] = o;
    }
    return out;
  }

  // files: {"Изделие.csv": "...matn...", ...}; log: funksiya; qaytaradi: {meta, docs:{nom: Uint8Array|obj}}
  async function build(files, log) {
    log = log || (() => { });
    const docs = {}; const counts = {};
    const put = async (name, obj) => { const s = JSON.stringify(obj); docs[name] = await gzipStr(s); return s.length; };

    // 1) ma'lumotnomalar
    const spr = {};
    for (const key of Object.keys(SPR)) { spr[key] = sprTable(files, SPR[key], log); counts[key] = Object.keys(spr[key]).length; }
    log("Ma'lumotnomalar: " + Object.keys(spr).map(k => k + "=" + counts[k]).join(", "));
    await put("spr", spr);

    // 2) firmalar va manzillar
    const firma = sprTable(files, FIRMA, log); counts.firma = Object.keys(firma).length;
    const fids = Object.keys(firma).map(Number).sort((a, b) => a - b);
    let fchunks = 0;
    for (let i = 0; i < fids.length; i += 4000) { const o = {}; for (const id of fids.slice(i, i + 4000)) o[id] = firma[id]; await put("firma_" + fchunks, o); fchunks++; }
    const adres = sprTable(files, ADRES, log); counts.adres = Object.keys(adres).length;
    const aids = Object.keys(adres).map(Number).sort((a, b) => a - b);
    let achunks = 0;
    for (let i = 0; i < aids.length; i += 5000) { const o = {}; for (const id of aids.slice(i, i + 5000)) o[id] = adres[id]; await put("adres_" + achunks, o); achunks++; }
    log("Производители: " + counts.firma + " (" + fchunks + " paket), Адреспроизв: " + counts.adres + " (" + achunks + " paket)");

    // 3) Месторег -> ish bo'yicha mamlakatlar
    const mr = {};
    { const t = findCSV(files, MESTOREG.csv); if (t) { for (const r of parseCSV(t).rows) { const d = r["ИД_Изделия"], c = r["ИД_страны"]; if (d && c) (mr[d] = mr[d] || []).push(c); } } }

    // 4) Приложение -> ish bo'yicha ilovalar + nomlar indeksi
    const pr = {}; const pidx = [];
    { const t = findCSV(files, PRIL.csv);
      if (t) { const { rows } = parseCSV(t);
        for (const r of rows) { const d = r["Код_изд"]; if (!d) continue;
          const nom = r["Наим_приложения"] || "", nov = r["Наим_приложения_нов"] || "";
          (pr[d] = pr[d] || []).push([r["Пор_ном"] || "", r["Номер"] || "", nom, nov !== nom ? nov : "", r["Пор_ном_нов"] || ""]);
          const nm = nov || nom; if (nm) pidx.push([+d, nm]);
        }
        counts.pril = rows.length; }
      else log("  ! Приложение.csv topilmadi"); }
    let pchunks = 0;
    for (let i = 0; i < pidx.length; i += PIDX_CHUNK) { await put("pidx_" + pchunks, pidx.slice(i, i + PIDX_CHUNK)); pchunks++; }
    log("Приложение: " + (counts.pril || 0) + " qator, nom indeksi " + pchunks + " paket");

    // 5) Изделие -> indeks + to'liq yozuvlar
    const t = findCSV(files, "Изделие"); if (!t) throw new Error("Изделие.csv topilmadi");
    const { rows } = parseCSV(t);
    counts.izd = rows.length;
    rows.sort((a, b) => (+a["Док_ном"]) - (+b["Док_ном"]));
    const idx = []; const full = {};
    for (const r of rows) {
      const id = +r["Док_ном"]; if (!id) continue;
      const rec = {};
      for (const c of Object.keys(r)) { if (EXCLUDE.has(c)) continue; const v = r[c]; if (v === "" || v == null) continue; rec[c] = DATE_COLS.has(c) ? toISO(v) : v; }
      if (mr[id]) rec.mr = mr[id];
      if (pr[id]) rec.pr = pr[id];
      full[id] = rec;
      idx.push(IDX.map(c => (rec[c] === undefined ? "" : rec[c])));
    }
    let ichunks = 0;
    for (let i = 0; i < idx.length; i += IDX_CHUNK) { await put("idx_" + ichunks, idx.slice(i, i + IDX_CHUNK)); ichunks++; }
    const fkeys = Object.keys(full).map(Number).sort((a, b) => a - b);
    const ranges = {};
    for (const id of fkeys) { const ch = Math.floor(id / FULL_CHUNK); (ranges[ch] = ranges[ch] || {})[id] = full[id]; }
    for (const ch of Object.keys(ranges)) await put("full_" + ch, ranges[ch]);
    log("Изделие: " + counts.izd + " ish, indeks " + ichunks + " paket, to'liq " + Object.keys(ranges).length + " paket");

    const meta = { ver: new Date().toISOString(), counts, idx: ichunks, firma: fchunks, adres: achunks, pidx: pchunks, fullChunk: FULL_CHUNK,
      fullKeys: Object.keys(ranges).map(Number).sort((a, b) => a - b), idxFields: IDX };
    docs.meta = meta;
    const total = Object.values(docs).reduce((s, d) => s + (d.length || 0), 0);
    log("Jami paket: " + Object.keys(docs).length + " ta, hajmi " + (total / 1048576).toFixed(2) + " MB (siqilgan)");
    return { meta, docs };
  }

  return { parseCSV, toISO, fromISO, IDX, IDX_POS, FULL_CHUNK, SPR, FIRMA, build, gzipStr, gunzipToStr, nrm, findCSV };
});
