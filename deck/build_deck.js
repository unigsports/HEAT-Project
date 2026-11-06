// Builds DBL_Group_Proposal.pptx. Run: node build_deck.js
const pptxgen = require("pptxgenjs");
const path = require("path");
const SKILL = process.env.PPTX_SKILL_DIR;
const { applyTheme } = require(path.join(SKILL, "scripts/apply_theme.js"));

const THEME = {
  name: "Kiln",
  headFontFace: "Cambria",
  bodyFontFace: "Calibri",
  colors: {
    dk1: "1F1A17", lt1: "FFFFFF", dk2: "7A2E22", lt2: "F1ECE7",
    accent1: "D9622B", accent2: "1F7A8C", accent3: "6B8E4E",
    accent4: "B8755B", accent5: "5A6470", accent6: "E0A526",
    hlink: "1F7A8C", folHlink: "7A2E22",
  },
};
const H = THEME.colors;

(async () => {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
  pres.title = "Ceramic Intelligence Loop - Pilot proposal for DBL Ceramics";
  pres.author = "Ceramic Intelligence Loop research team";
  const C = pres.SchemeColor;
  const FOOT = "Ceramic Intelligence Loop  |  Pilot partnership proposal for DBL Ceramics Ltd.";

  // ---- layouts
  pres.defineSlideMaster({
    title: "DARK", background: { color: H.dk1 },
    objects: [
      { placeholder: { options: { name: "title", type: "title", x: 0.6, y: 1.7, w: 8.8, h: 1.3, fontSize: 40, bold: true, color: C.background1, valign: "bottom", align: "left", margin: 0 }, text: "" } },
      { placeholder: { options: { name: "body", type: "body", x: 0.6, y: 3.1, w: 8.2, h: 1.2, fontSize: 18, color: C.background2, valign: "top", margin: 0 }, text: "" } },
    ],
  });
  pres.defineSlideMaster({
    title: "CONTENT", background: { color: H.lt1 },
    objects: [
      { placeholder: { options: { name: "title", type: "title", x: 0.5, y: 0.35, w: 9.0, h: 0.8, fontSize: 28, bold: true, color: C.text1, valign: "middle", align: "left", margin: 0 }, text: "" } },
      { text: { text: FOOT, options: { x: 0.5, y: 5.2, w: 7.5, h: 0.3, fontSize: 9, color: C.accent5, margin: 0 } } },
    ],
    slideNumber: { x: 9.0, y: 5.2, w: 0.5, h: 0.3, fontSize: 9, color: H.accent5, align: "right" },
  });

  const addTitle = (s, t) => s.addText(t, { placeholder: "title" });
  const box = (s, x, y, w, h, fill, name) => s.addShape(pres.ShapeType.roundRect, { x, y, w, h, fill: { color: fill }, line: { color: fill }, rectRadius: 0.08, objectName: name });
  const txt = (s, t, o) => s.addText(t, Object.assign({ isTextBox: true, margin: 0, fontSize: 14, color: C.text1, valign: "top" }, o));
  const bullets = (items, size) => items.map((t, i) => ({ text: t, options: { bullet: true, fontSize: size || 14, breakLine: i < items.length - 1, paraSpaceAfter: 6 } }));
  const dot = (s, x, y, label, fill) => {
    s.addShape(pres.ShapeType.ellipse, { x, y, w: 0.5, h: 0.5, fill: { color: fill }, line: { color: fill }, objectName: "marker " + label });
    s.addText(label, { x, y, w: 0.5, h: 0.5, isTextBox: true, margin: 0, align: "center", valign: "middle", fontSize: 14, bold: true, color: C.background1 });
  };

  // ================= 1. Title
  pres.addSection({ title: "Opening" });
  let s = pres.addSlide({ masterName: "DARK", sectionTitle: "Opening" });
  txt(s, "PILOT PARTNERSHIP PROPOSAL  |  DBL CERAMICS LTD.", { x: 0.6, y: 1.1, w: 8, h: 0.4, fontSize: 12, color: C.accent1, charSpacing: 2, bold: true });
  addTitle(s, "Ceramic Intelligence Loop");
  s.addText("Stop firing tiles you will throw away. Pre-kiln defect detection, fired-tile AI inspection and a live factory dashboard, built in Bangladesh for Bangladeshi lines.", { placeholder: "body" });
  txt(s, "November 2026  |  University research team, with support proposed under the UGC HEAT Academic Transformation Fund (Window 3a, STEM)", { x: 0.6, y: 4.7, w: 8.5, h: 0.4, fontSize: 11, color: C.accent5 });
  // kiln glyph: row of tiles, one orange
  for (let i = 0; i < 9; i++) s.addShape(pres.ShapeType.rect, { x: 0.6 + i * 0.42, y: 0.55, w: 0.34, h: 0.34, fill: { color: i === 6 ? H.accent1 : H.dk2 }, line: { color: H.dk1 }, objectName: "tile " + i });
  s.addNotes("Open with the one-line promise: every defective tile that enters the kiln burns gas for nothing. We propose a 24-month pilot on one DBL line.");

  // ================= 2. Problem
  pres.addSection({ title: "The problem" });
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "The problem" });
  addTitle(s, "Every defective tile in the kiln burns gas for nothing");
  const stats = [
    ["Same gas", "Firing a reject costs the same gas as firing a first-grade tile. The kiln is the largest single energy user in a tile plant.", H.accent1],
    ["Found late", "Most defects are found at the sorting line, after the dryer, glaze line and kiln have all added cost.", H.accent2],
    ["Recyclable", "Green scrap goes straight back to the mill. Fired scrap is chemically inert: landfill, or crushed at a loss.", H.accent3],
  ];
  stats.forEach((st, i) => {
    const x = 0.5 + i * 3.1;
    box(s, x, 1.4, 2.9, 2.6, H.lt2, "stat card " + i);
    txt(s, st[0], { x: x + 0.25, y: 1.55, w: 2.4, h: 0.9, fontSize: 32, bold: true, color: st[2], fontFace: "Cambria" });
    txt(s, st[1], { x: x + 0.25, y: 2.5, w: 2.45, h: 1.4, fontSize: 12.5, color: C.text1 });
  });
  txt(s, "Today DBL, like every plant in the country, finds out which tiles failed only at the sorting line, after the dryer, the glaze line and the kiln have all added cost. Gas is the input the industry cannot get more of. The cheapest kilowatt is the one not spent on a tile that was already broken at the press.", { x: 0.5, y: 4.2, w: 9, h: 0.9, fontSize: 13, color: C.accent5 });
  s.addNotes("No scrap rate is claimed here. DBL's own scrap by stage will be measured in the first-phase audit.");

  // ================= 3. Cost of late detection (chart)
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "The problem" });
  addTitle(s, "What one tile stopped before the kiln is worth");
  s.addChart(pres.ChartType.bar, [{ name: "BDT per tile", labels: ["Kiln gas", "Body + glaze material", "Total per tile"], values: [11.4, 54, 65.4] }], {
    x: 0.5, y: 1.3, w: 5.0, h: 3.7, barDir: "col", chartColors: [H.accent1],
    showTitle: true, title: "Cost sunk in one 600×600 tile, BDT (illustrative)", titleFontSize: 12, titleColor: H.dk1, titleFontFace: "+mn-lt",
    showValue: true, dataLabelPosition: "outEnd", dataLabelFormatCode: "0.0", dataLabelFontSize: 11, dataLabelColor: H.dk1, dataLabelFontFace: "+mn-lt",
    catAxisLabelFontSize: 11, catAxisLabelColor: H.accent5, catAxisLabelFontFace: "+mn-lt", catGridLine: { style: "none" },
    valAxisLabelFontSize: 10, valAxisLabelColor: H.accent5, valAxisLabelFontFace: "+mn-lt", valGridLine: { color: H.lt2, size: 0.75 }, valAxisMaxVal: 80, valAxisMajorUnit: 20,
    valAxisTitle: "BDT per tile", showValAxisTitle: true, valAxisTitleFontSize: 10, valAxisTitleColor: H.accent5, valAxisTitleFontFace: "+mn-lt",
    showLegend: false,
  });
  box(s, 5.8, 1.3, 3.7, 3.7, H.lt2, "assumptions card");
  txt(s, "How to read this", { x: 6.0, y: 1.45, w: 3.3, h: 0.4, fontSize: 12, bold: true, color: C.accent2 });
  s.addText(bullets([
    "A 600×600 tile is 0.36 m²",
    "Kiln gas about 0.38 m³ per tile at BDT 30/m³ (assumed)",
    "Body and glaze material about BDT 150/m² (assumed), fully recovered when a tile is rejected green",
    "Every 100 tiles per day stopped before firing is worth about BDT 21 lakh a year over 330 days",
    "No rate of rejection is claimed. DBL's own numbers replace every assumption here",
  ], 11.5), { x: 6.0, y: 1.9, w: 3.35, h: 3.0, isTextBox: true, margin: 0, color: C.text1, valign: "top" });
  s.addNotes("This slide values a single tile, not a percentage of output. Gas and material prices are assumptions to be confirmed with DBL. Labour, fired-waste disposal and downtime are not counted.");

  // ================= 4. Architecture
  pres.addSection({ title: "The system" });
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "The system" });
  addTitle(s, "Two inspection nodes and one brain");
  const stations = ["Press", "GREEN NODE", "Dryer", "Glaze & print", "Kiln", "FIRED NODE", "Sorting"];
  const sw = 1.2, gap = 0.1, x0 = 0.5;
  stations.forEach((n, i) => {
    const node = n === "GREEN NODE" || n === "FIRED NODE";
    const x = x0 + i * (sw + gap);
    s.addShape(pres.ShapeType.roundRect, { x, y: 3.3, w: sw, h: 0.8, rectRadius: 0.06, fill: { color: node ? H.accent1 : H.lt2 }, line: { color: node ? H.accent1 : H.lt2 }, objectName: "station " + n });
    s.addText(n, { x, y: 3.3, w: sw, h: 0.8, isTextBox: true, margin: 0.05, align: "center", valign: "middle", fontSize: node ? 11 : 12, bold: node, color: node ? C.background1 : C.text1 });
    if (i < stations.length - 1) s.addShape(pres.ShapeType.rightArrow, { x: x + sw - 0.02, y: 3.6, w: gap + 0.04, h: 0.2, fill: { color: H.accent5 }, line: { color: H.accent5 }, objectName: "arrow " + i });
  });
  // brain
  s.addShape(pres.ShapeType.roundRect, { x: 2.3, y: 1.35, w: 5.4, h: 1.1, rectRadius: 0.08, fill: { color: H.accent2 }, line: { color: H.accent2 }, objectName: "cloud brain" });
  s.addText([{ text: "Cloud dashboard + root-cause engine", options: { bold: true, fontSize: 15, breakLine: true } }, { text: "Every tile logged. Defect trends correlated with press pressure, dryer and kiln-zone telemetry. Shift reports, task allocation, R&D database.", options: { fontSize: 11.5 } }], { x: 2.5, y: 1.4, w: 5.0, h: 1.0, isTextBox: true, margin: 0, color: C.background1, valign: "middle" });
  // arrows up from nodes to brain, down to press/kiln
  s.addShape(pres.ShapeType.upArrow, { x: x0 + 1 * (sw + gap) + 0.45, y: 2.5, w: 0.3, h: 0.75, fill: { color: H.accent1 }, line: { color: H.accent1 }, objectName: "green data up" });
  s.addShape(pres.ShapeType.upArrow, { x: x0 + 5 * (sw + gap) + 0.45, y: 2.5, w: 0.3, h: 0.75, fill: { color: H.accent1 }, line: { color: H.accent1 }, objectName: "fired data up" });
  s.addShape(pres.ShapeType.downArrow, { x: x0 + 0 * (sw + gap) + 0.45, y: 2.5, w: 0.3, h: 0.75, fill: { color: H.accent3 }, line: { color: H.accent3 }, objectName: "press setpoint down" });
  s.addShape(pres.ShapeType.downArrow, { x: x0 + 4 * (sw + gap) + 0.45, y: 2.5, w: 0.3, h: 0.75, fill: { color: H.accent3 }, line: { color: H.accent3 }, objectName: "kiln setpoint down" });
  txt(s, "Orange arrows: inspection data up to the cloud.  Green arrows: corrective set-points back to the machines (advisory in the pilot, automated via OPC-UA later).", { x: 0.5, y: 4.3, w: 9, h: 0.4, fontSize: 11, color: C.accent5 });
  txt(s, "Green node rejects before the dryer: scrap goes back to the mill. Fired node grades and traces what the kiln created. The brain connects the two so the cause of a defect, not just the defect, gets fixed.", { x: 0.5, y: 4.7, w: 9, h: 0.5, fontSize: 12.5, color: C.text1 });

  // ================= 5. Green node table
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "The system" });
  addTitle(s, "Green-stage node: what we aim to catch, and how");
  const hdr = (t) => ({ text: t, options: { bold: true, color: H.lt1, fill: { color: H.dk2 }, fontSize: 11.5 } });
  const cell = (t, o) => ({ text: t, options: Object.assign({ fontSize: 11, color: H.dk1 }, o || {}) });
  const conf = (t, c) => ({ text: t, options: { fontSize: 11, bold: true, color: c, align: "center" } });
  const rows = [
    [hdr("Green-body defect (press exit / dryer exit)"), hdr("Sensor"), hdr("Outlook")],
    [cell("Edge chips, corner breaks, surface and drying cracks"), cell("Line-scan camera with low-angle grazing light; matte green surface gives good contrast"), conf("Likely", H.accent3)],
    [cell("Thickness variation, uneven die fill"), cell("3D laser line profiler, height map at ±50 µm"), conf("Likely", H.accent3)],
    [cell("Density variation (root of later warpage and calibre spread)"), cell("Load cell under the belt + 3D volume from the profiler = bulk density of every tile"), conf("Likely", H.accent3)],
    [cell("Powder lumps, contamination, die marks, print misregistration"), cell("2D vision, model trained on DBL's own tile designs"), conf("Likely", H.accent3)],
    [cell("Glaze drips, missing glaze, wet-glaze pinholes"), cell("2D vision after the glaze line"), conf("To test", H.accent6)],
    [cell("Internal lamination (press de-airing failure)"), cell("Open research item: air-coupled ultrasound, active thermography and tap tests are candidates, each tested on a bench with sectioned tiles first"), conf("Research", H.accent4)],
  ];
  s.addTable(rows, { x: 0.5, y: 1.3, w: 9.0, colW: [3.1, 4.7, 1.2], border: { type: "solid", pt: 0.5, color: H.lt2 }, fill: { color: H.lt1 }, rowH: 0.45, valign: "middle", autoPage: false, fontFace: "Calibri" });
  txt(s, "Not catchable before the kiln: black core, kiln-induced warpage, shade variation, crazing, roller marks. Those belong to the fired node. Which defects start before the kiln, and how many, is what the first-phase audit with DBL will measure. No detection rate is promised.", { x: 0.5, y: 4.55, w: 9, h: 0.6, fontSize: 11.5, color: C.accent5 });

  // ================= 6. Fired node
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "The system" });
  addTitle(s, "Fired-stage node: surface AI plus 3D flatness");
  box(s, 0.5, 1.3, 4.4, 3.7, H.lt2, "surface card");
  box(s, 5.1, 1.3, 4.4, 3.7, H.lt2, "flatness card");
  dot(s, 0.7, 1.45, "AI", H.accent2); dot(s, 5.3, 1.45, "3D", H.accent1);
  txt(s, "Surface inspection", { x: 1.35, y: 1.5, w: 3.4, h: 0.4, fontSize: 16, bold: true });
  txt(s, "Dimensional compliance", { x: 5.95, y: 1.5, w: 3.4, h: 0.4, fontSize: 16, bold: true });
  s.addText(bullets([
    "One-stage detector (YOLOv8/v10 family) running on an edge GPU, under 20 ms per tile",
    "Trained on DBL's digital-print designs so marble veins and rustic textures are not flagged as defects",
    "Classes: cracks, pinholes, edge chips, spots, glaze faults, print errors, shade variation",
    "Grades A / B / reject consistently across three shifts; no fatigue, no inspector caution bias",
    "Starts from 1,532 real defect images already collected locally; grows to >10,000 on the line",
  ], 11.5), { x: 0.7, y: 2.0, w: 4.0, h: 2.9, isTextBox: true, margin: 0, color: C.text1, valign: "top" });
  s.addText(bullets([
    "Laser profiler builds a height map of every tile at line speed",
    "Computes centre curvature, edge curvature, warpage, wedging and calibre as defined in ISO 10545-2",
    "Tolerance ±0.5% of the diagonal (±2.1 mm on 300×300, ±4.2 mm on 600×600); sensor resolves ±50 µm",
    "Replaces manual calliper spot checks with a record for every tile",
    "Trends feed the root-cause engine: calibre drift points at the kiln, wedging points at the press",
  ], 11.5), { x: 5.3, y: 2.0, w: 4.0, h: 2.9, isTextBox: true, margin: 0, color: C.text1, valign: "top" });

  // ================= 7. Loop
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "The system" });
  addTitle(s, "Closing the loop: detect, diagnose, correct");
  const steps = [
    ["1", "Detect", "Both nodes log every tile with time, position, defect class and measurements.", H.accent1],
    ["2", "Diagnose", "The engine correlates defect bursts with press pressure, dryer temperature, glaze density and kiln-zone curves. Black core at 02:40? Kiln zone 2 drifted at 02:10.", H.accent2],
    ["3", "Correct", "Pilot phase: a recommended set-point appears on the operator's screen with the evidence; the operator confirms. Later phase: OPC-UA writes the set-point and logs it.", H.accent3],
  ];
  steps.forEach((st, i) => {
    const x = 0.5 + i * 3.1;
    box(s, x, 1.4, 2.9, 3.0, H.lt2, "step card " + st[1]);
    dot(s, x + 0.25, 1.6, st[0], st[3]);
    txt(s, st[1], { x: x + 0.9, y: 1.6, w: 1.9, h: 0.5, fontSize: 18, bold: true, valign: "middle" });
    txt(s, st[2], { x: x + 0.25, y: 2.3, w: 2.45, h: 2.0, fontSize: 12.5 });
    if (i < 2) s.addShape(pres.ShapeType.rightArrow, { x: x + 2.9, y: 2.75, w: 0.2, h: 0.3, fill: { color: H.accent5 }, line: { color: H.accent5 }, objectName: "step arrow " + i });
  });
  txt(s, "We do not ask DBL to let a prototype drive the press. Automation is earned, after the recommendations have been right for months and the audit log proves it.", { x: 0.5, y: 4.6, w: 9, h: 0.5, fontSize: 12.5, color: C.accent5, italic: true });

  // ================= 8. Dashboard
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "The system" });
  addTitle(s, "A factory dashboard, not just a camera");
  const feats = [
    ["Live line view, anywhere", "Defect rate, grade split and OEE per line on a phone, updated every minute. No waiting for the end-of-shift report.", H.accent2],
    ["Reports that write themselves", "Shift and daily quality reports, in Bangla and English, generated from the tile log and emailed to management.", H.accent1],
    ["Workforce orchestration", "Defect bursts open a task for the right technician with the evidence attached; closure is tracked.", H.accent3],
    ["R&D defect database", "Every tile DBL makes becomes a labelled record. Compare bodies, glazes, suppliers and kiln curves with data instead of memory.", H.accent6],
  ];
  feats.forEach((f, i) => {
    const x = 0.5 + (i % 2) * 4.65, y = 1.35 + Math.floor(i / 2) * 1.85;
    box(s, x, y, 4.35, 1.65, H.lt2, "feature " + i);
    s.addShape(pres.ShapeType.ellipse, { x: x + 0.2, y: y + 0.2, w: 0.35, h: 0.35, fill: { color: f[2] }, line: { color: f[2] }, objectName: "feature dot " + i });
    txt(s, f[0], { x: x + 0.7, y: y + 0.15, w: 3.5, h: 0.45, fontSize: 15, bold: true, valign: "middle" });
    txt(s, f[1], { x: x + 0.7, y: y + 0.65, w: 3.5, h: 0.95, fontSize: 11.5 });
  });

  // ================= 9. Why not Italy
  pres.addSection({ title: "Why us" });
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Why us" });
  addTitle(s, "Why not just buy it from Italy?");
  const h2 = (t, c) => ({ text: t, options: { bold: true, color: H.lt1, fill: { color: c }, fontSize: 11.5 } });
  const cmp = [
    [h2("", H.accent5), h2("Imported proprietary systems", H.accent5), h2("Ceramic Intelligence Loop", H.dk2)],
    [cell("Price per inspection station", { bold: true }), cell("USD 200,000–500,000 (BDT 2.4–6 crore)"), cell("Indicative BDT 25–40 lakh hardware per station, to be fixed after the pilot, plus a software subscription")],
    [cell("Support", { bold: true }), cell("Service engineer flown in; weeks of downtime risk"), cell("Team in Dhaka, same-day response, spare parts stocked locally")],
    [cell("Data", { bold: true }), cell("Lives in the vendor's cloud and format"), cell("Stays on DBL's servers; open formats; DBL owns its defect database")],
    [cell("Which lines", { bold: true }), cell("Designed for the vendor's own new lines"), cell("Retrofits any line, including older Italian and KEDA presses, via OPC-UA")],
    [cell("Models", { bold: true }), cell("Closed; new designs wait for a vendor update"), cell("Open models retrained on DBL's own tiles in days")],
    [cell("Green-stage inspection", { bold: true }), cell("Available on top-end slab lines only"), cell("Core of the system; built for standard tile formats")],
  ];
  s.addTable(cmp, { x: 0.5, y: 1.3, w: 9.0, colW: [2.1, 3.3, 3.6], border: { type: "solid", pt: 0.5, color: H.lt2 }, fill: { color: H.lt1 }, rowH: 0.46, valign: "middle", autoPage: false, fontFace: "Calibri" });
  txt(s, "Imported systems are excellent machines. They were priced for Sassuolo, not for a tier-2 line in Gazipur. Our aim is a price local plants can afford, with the data kept at home.", { x: 0.5, y: 4.65, w: 9, h: 0.5, fontSize: 11.5, color: C.accent5 });

  // ================= 10. Ask / Get
  pres.addSection({ title: "The pilot" });
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "The pilot" });
  addTitle(s, "What we ask of DBL, and what DBL gets");
  box(s, 0.5, 1.3, 4.4, 3.75, H.lt2, "ask card");
  box(s, 5.1, 1.3, 4.4, 3.75, H.dk2, "get card");
  txt(s, "We ask", { x: 0.75, y: 1.45, w: 3.9, h: 0.45, fontSize: 18, bold: true, color: C.accent1 });
  txt(s, "DBL gets", { x: 5.35, y: 1.45, w: 3.9, h: 0.45, fontSize: 18, bold: true, color: C.background1 });
  s.addText(bullets([
    "One production line as the pilot site for 24 months",
    "Two mounting positions: press exit and kiln exit, with power, air and network",
    "Read access to press, dryer and kiln telemetry (PLC tags or logs)",
    "A production engineer as counterpart, about four hours a week",
    "An MoU covering line access, data ownership and what may be published",
  ], 12.5), { x: 0.75, y: 2.0, w: 3.95, h: 3.0, isTextBox: true, margin: 0, color: C.text1, valign: "top" });
  s.addText(bullets([
    "Both inspection nodes installed and operated at no hardware cost during the pilot",
    "Ownership of its defect database and a licence to keep running the system afterwards",
    "Quarterly savings report against its own baseline",
    "First-mover position: the reference plant for a Bangladeshi Industry 4.0 product",
    "Option to co-own the spin-out company that commercialises the system",
  ], 12.5), { x: 5.35, y: 2.0, w: 3.95, h: 3.0, isTextBox: true, margin: 0, color: C.background1, valign: "top" });

  // ================= 11. Timeline
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "The pilot" });
  addTitle(s, "24-month pilot plan");
  const phases = [
    ["Months 1–6", "Install", "Green node on one line. Encoder sync, enclosures, data collection on live production. Baseline scrap and gas audit with DBL.", H.accent1],
    ["Months 7–12", "Green model live", "Advisory rejection at the press exit, then automatic diversion. First published results.", H.accent4],
    ["Months 13–18", "Fired node + dashboard", "Surface AI and 3D flatness at the kiln exit. Live dashboard and automatic shift reports in use by DBL staff.", H.accent2],
    ["Months 19–24", "Root cause + handover", "Correlation engine on telemetry, operator-confirmed set-points, OPC-UA interface demonstrated. Training and handover.", H.accent3],
  ];
  s.addShape(pres.ShapeType.line, { x: 0.7, y: 1.75, w: 8.6, h: 0, line: { color: H.lt2, width: 3 }, objectName: "timeline rail" });
  phases.forEach((p, i) => {
    const x = 0.5 + i * 2.3;
    s.addShape(pres.ShapeType.ellipse, { x: x + 0.1, y: 1.6, w: 0.3, h: 0.3, fill: { color: p[3] }, line: { color: p[3] }, objectName: "phase dot " + i });
    txt(s, p[0], { x, y: 2.0, w: 2.1, h: 0.35, fontSize: 11, bold: true, color: p[3], charSpacing: 1 });
    txt(s, p[1], { x, y: 2.35, w: 2.1, h: 0.5, fontSize: 15, bold: true });
    txt(s, p[2], { x, y: 2.9, w: 2.1, h: 1.6, fontSize: 11.5 });
  });
  txt(s, "Milestones mirror the funded research plan: testbed, green-stage model, mid-project publication, 3D fusion, edge deployment with OPC-UA, cloud dashboard and final publication.", { x: 0.5, y: 4.6, w: 9, h: 0.5, fontSize: 11.5, color: C.accent5 });

  // ================= 12. Economics
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "The pilot" });
  addTitle(s, "What the pilot will measure with DBL");
  const econ = [["BDT 0", "hardware cost to DBL during the 24-month pilot; equipment is funded by the research grant", H.accent3], ["Measured", "savings are measured against DBL's own baseline, with no assumed target", H.accent1], ["Local", "support, spares and retraining from Dhaka, with data kept on DBL's servers", H.accent2]];
  econ.forEach((e, i) => {
    const y = 1.35 + i * 1.2;
    box(s, 0.5, y, 4.4, 1.05, H.lt2, "econ card " + i);
    txt(s, e[0], { x: 0.7, y: y + 0.1, w: 1.7, h: 0.85, fontSize: 22, bold: true, color: e[2], fontFace: "Cambria", valign: "middle" });
    txt(s, e[1], { x: 2.45, y: y + 0.1, w: 2.35, h: 0.85, fontSize: 11, valign: "middle" });
  });
  box(s, 5.1, 1.35, 4.4, 3.6, H.dk2, "measure card");
  txt(s, "Baseline and results, reported quarterly", { x: 5.35, y: 1.5, w: 3.9, h: 0.5, fontSize: 15, bold: true, color: C.background1 });
  s.addText(bullets([
    "Where each reject originates: press, dryer, glaze or kiln",
    "Scrap by stage and gas per m², before and during the pilot",
    "Which green-stage defects the cameras and laser can actually see",
    "False rejects reported next to every detection result",
    "Internal laminations: tested on a bench with sectioned tiles before any claim",
  ], 12), { x: 5.35, y: 2.1, w: 3.9, h: 2.7, isTextBox: true, margin: 0, color: C.background1, valign: "top" });
  s.addNotes("We report what we find, including negative results. DBL decides after the audit whether to continue to the next phase.");

  // ================= 13. Risks
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "The pilot" });
  addTitle(s, "Risks we expect, and how we handle them");
  const risks = [
    ["Internal laminations are invisible to cameras", "Treated as a research question: bench tests of ultrasound, active thermography and tap tests on sectioned tiles first. Weight and volume per tile is a cheap indirect check."],
    ["Heat, dust and vibration at the kiln exit", "IP67 enclosures with air knives and active cooling; fail-open mode so a sensor fault never stops the line."],
    ["Locked PLCs or vendor protocols", "Read-only telemetry first; advisory set-points through the operator; OPC-UA write-back only where DBL and the machine vendor agree."],
    ["Rare defects, too few examples", "Synthetic defect generation guided by ceramic engineers, plus two years of live production data."],
    ["A prototype that is accurate but not reliable", "Reliability is a tracked metric from month one: uptime, false-reject rate and mean time between interventions."],
  ];
  risks.forEach((r, i) => {
    const y = 1.3 + i * 0.72;
    s.addShape(pres.ShapeType.ellipse, { x: 0.5, y: y + 0.12, w: 0.28, h: 0.28, fill: { color: H.accent1 }, line: { color: H.accent1 }, objectName: "risk dot " + i });
    txt(s, r[0], { x: 0.95, y, w: 3.3, h: 0.65, fontSize: 12.5, bold: true, valign: "middle" });
    txt(s, r[1], { x: 4.4, y, w: 5.1, h: 0.65, fontSize: 11.5, valign: "middle" });
    if (i < risks.length - 1) s.addShape(pres.ShapeType.line, { x: 0.95, y: y + 0.7, w: 8.55, h: 0, line: { color: H.lt2, width: 0.75 }, objectName: "risk rule " + i });
  });

  // ================= 14. Team & funding
  pres.addSection({ title: "Closing" });
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Closing" });
  addTitle(s, "Team and funding");
  box(s, 0.5, 1.3, 4.4, 3.75, H.lt2, "team card");
  box(s, 5.1, 1.3, 4.4, 3.75, H.lt2, "funding card");
  txt(s, "Who", { x: 0.75, y: 1.45, w: 3.9, h: 0.45, fontSize: 18, bold: true, color: C.accent2 });
  txt(s, "Funding status", { x: 5.35, y: 1.45, w: 3.9, h: 0.45, fontSize: 18, bold: true, color: C.accent2 });
  s.addText(bullets([
    "University research group combining ceramic engineering with computer vision and IoT",
    "Preliminary dataset of 1,532 real defect images collected with a local manufacturer; baseline mAP 0.587 on static images",
    "Two PhD researchers and one research assistant dedicated to the project",
    "Partnering plant engineers join the team for the pilot",
  ], 12.5), { x: 0.75, y: 2.0, w: 3.95, h: 3.0, isTextBox: true, margin: 0, color: C.text1, valign: "top" });
  s.addText(bullets([
    "Proposal submitted to the UGC Higher Education Acceleration and Transformation (HEAT) project, Academic Transformation Fund, Window 3a STEM",
    "Requested budget BDT 299.15 lakh over 24 months (May 2026 to May 2028), of which BDT 110 lakh is inspection hardware",
    "Award pending; the pilot starts within 90 days of award",
    "Spin-out company planned to commercialise the system after the pilot, with DBL invited as launch partner",
  ], 12.5), { x: 5.35, y: 2.0, w: 3.95, h: 3.0, isTextBox: true, margin: 0, color: C.text1, valign: "top" });

  // ================= 15. Next steps (dark)
  s = pres.addSlide({ masterName: "DARK", sectionTitle: "Closing" });
  addTitle(s, "Next steps");
  s.addText([
    { text: "1.  Site visit and line selection at DBL Ceramics", options: { breakLine: true, fontSize: 18, paraSpaceAfter: 8 } },
    { text: "2.  MoU on line access, data ownership and publication", options: { breakLine: true, fontSize: 18, paraSpaceAfter: 8 } },
    { text: "3.  Baseline audit: scrap rate, gas per m², current sorting accuracy", options: { breakLine: true, fontSize: 18, paraSpaceAfter: 8 } },
    { text: "4.  Green node installed within 90 days of grant award", options: { fontSize: 18 } },
  ], { x: 0.6, y: 3.0, w: 8.6, h: 2.0, isTextBox: true, margin: 0, color: C.background2, valign: "top" });
  for (let i = 0; i < 9; i++) s.addShape(pres.ShapeType.rect, { x: 0.6 + i * 0.42, y: 0.55, w: 0.34, h: 0.34, fill: { color: i === 2 ? H.accent1 : H.dk2 }, line: { color: H.dk1 }, objectName: "tile end " + i });

  const out = path.join(__dirname, "DBL_Group_Proposal.pptx");
  await pres.writeFile({ fileName: out });
  await applyTheme(out, THEME);
  console.log("wrote", out);
})();
