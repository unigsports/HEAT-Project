# Green-body defect detection: options, evidence and a first experiment

Compiled 6 November 2026 from four independent research members (Claude subagents with web search), following the local council review in `.claude/council-cache/`. **Read the caveats first.** Each member ran only a handful of searches and mostly read search summaries, not full papers. Sources are leads to verify. Items marked "inference" are reasoning, not findings.

**Ground rule for this project: no detection rate, savings percentage or coverage percentage is promised to anyone.** Results are measured and reported, including negative ones, with false rejects beside every detection result.

## 1. What can be sensed, and with what

### Surface and geometry (chips, corner breaks, cracks, lumps, die marks, thickness, flatness)

| Option | Sees | Cannot see | Cost class (inference) | Maturity |
|---|---|---|---|---|
| Line-scan camera with low-angle (raking) line light | Edge chips, corner breaks, open cracks, lumps, die marks, contamination | Hairline closed cracks, absolute flatness | Low | Standard in industry; green-body use is vendor-claimed |
| Area-scan with strobe and raking light | Same | Needs tight sync; smear at 1.5 m/s if strobe is weak | Low | Common in labs |
| Multi-angle dark-field or photometric stereo | Subtle relief on a matte body | Hard at belt speed | Medium | Research; no green-tile reference found |
| Laser line profiler (triangulation) | Thickness, flatness, warp, edge chips, deep cracks | Hairline cracks; dust scatters the laser | Medium to high | Mature in ceramics (System Ceramics "Redline", up to nine laser lines) |
| Structured light / stereo | Full-field 3D | Slow, dust and ambient light sensitive | Medium to high | Little evidence at belt speed |
| Deflectometry | Specular surfaces only | Matte green body | n/a | Unsuited |

Line-rate arithmetic (inference): at 1.5 m/s, 1.0 mm pixel pitch needs 1.5 kHz, 0.5 mm needs 3 kHz, 0.25 mm needs 6 kHz. Long exposure under low light is the main hardware constraint. Do not buy a profiler before camera-only images have been compared.

### Internal and subsurface (laminations, density gradients, moisture)

| Technique | Detects | Line-speed feasibility at 1.5 m/s, 600x600 | Maturity |
|---|---|---|---|
| Ultrasonic pulse velocity (contact) | Density, lamination in green and fired tiles | Poor (point contact on a fragile surface) | Lab, EU NOVAPRESS project; Romagnoli 2007 |
| Air-coupled ultrasound (through-transmission) | Delamination, air inclusions, density | Unproven; about 0.1% air-to-ceramic transmission makes signal weak; a fixed multi-point array is more plausible than a scan | Lab (Warwick); vendor product (Sonotec Sonoair, marketing) |
| Active thermography (flash, laser line, heated line) | Near-surface voids | Not demonstrated on green tiles | Research (EU MONOTONE) |
| Passive thermal camera at dryer exit | Temperature or moisture gradients | Camera speed is fine; sensitivity to buried lamination is doubtful | Not found as a lamination detector |
| Tap, impact or acoustic signature | Cracks in fired roof tiles | No green-tile lamination evidence found | Commercial for fired roof tiles |
| Weight and volume per tile | Bulk density per tile | Easy at line speed | Cheap, plausible link to press faults; no source found |
| Microwave, THz, NIR, X-ray, eddy current, OCT | Not found for this application | Not searched in depth | Unknown |

**Key finding:** the proposal's "thermal camera at the dryer exit plus tap test" for laminations has no supporting source. The documented routes are ultrasound and active thermography. SACMI's published approach (Optima+) is camera-based and claims small cracks and laminations that reach the surface. Treat internal lamination as an open research question, not a product feature.

### Machine learning
- With almost no defect labels, start with anomaly detection trained on good images only (PatchCore, PaDiM, FastFlow, EfficientAD). PatchCore is described in https://arxiv.org/pdf/2106.08265 (benchmark results are on MVTec AD, not a tile line). EfficientAD is the likely edge fit (inference, unverified).
- Supervised YOLO-family detectors need hundreds of labelled boxes per class; use them later, fed by images the anomaly model flags.
- No open dataset of unfired tiles was found. MVTec AD "tile" is another material. The team's own capture is the dataset.

## 2. Who else does this (all vendor material; no public prices found)
- SACMI Optima+: three cameras scan unfired slabs after the press, claims cracks, laminations and dimensions, widths up to 2100 mm. https://ceramicworldweb.com/en/technology/sacmi-optima-digitalised-quality-control-unfired-slabs , https://sacmi.com/control-and-vision-systems/vision-for-ceramics
- System Ceramics: integrity, flatness, decoration, dimensions, usually before firing; typical defect detection about 0.1 mm. https://www.systemceramics.com/pt/noticias/would-you-like-to-optimize-your-production-the-secret-is-a-careful-and-analytical-vision
- I-Tech Intellytile BS: unfired tiles after the inkjet printer, 4K linear camera, tiles up to 160x320 cm. https://ceramicworldweb.com/en/news/i-tech-launches-intellytile-bs
- Patent EP3689568: contrast liquid on edges of unfired tiles to image micro-cracks, at 3-5 m/min. https://data.epo.org/publication-server/rest/v1.2/patents/EP3689568NWA1/document.html
- Academic work found is on fired tiles only.

## 3. Where defects originate (what is and is not known)
- No stage-by-stage reject distribution for any tile plant was found. No published tile-level press-to-sort audit method was found. Both gaps mean the team's own audit is new data.
- CORDIS MECHAGREEN (BRST985319, 1998-2000): about 3% of unfired glazed tile scrapped and about 2% of fired tile scrapped. The two figures have different denominators, come from a project objective statement, are 25+ years old, and are **not** a defect-origin split. The 3% is already caught by existing inspection, so it says nothing about how many escaping defects began before the kiln. The same record says some green-body defects stay hidden until firing. https://cordis.europa.eu/project/id/BRST985319
- Taxonomy (inference, check against a ceramics textbook and plant QC staff): chips and corner breaks (press, handling) are visible green; drying cracks partly; laminations sometimes; black core, crazing, warpage, shade and most glaze pinholes are not visible before firing.
- Bangladesh (news items, dates unchecked): about 31 tile factories; high share of imported raw material; gas supply interruptions disrupt output. https://www.tbsnews.net/node/1534416 , https://www.tbsnews.net/node/1475831 . RAK Bangladesh runs SACMI technology; no source found for any Bangladeshi plant using pre-kiln inspection.

## 4. Recommended sequence (no targets, only gates)

1. **Paper first:** written IP and asset terms from the university and grant office; signed plant data MoU (scope, data ownership, publication rights, confidentiality, no-disruption, worker privacy: camera on the tile only, no people in frame, ethics review).
2. **Origin audit, 2-4 weeks, one press line and one design:** mark tiles at the press exit (heat-stable ceramic ink or code on the back; test survival through dryer, glaze and kiln on about 50 tiles first). Record pass/fail and defect type per tile at post-press, post-dryer, post-glaze, post-kiln and final sort. Report origin stage with confidence intervals and compare by press cavity, shift and powder lot.
3. **Cheap green-image collection, about 2 months, 600x600 only:** line-scan camera (about 4k) with 25-35 mm lens, adjustable raking line light (5-30 degrees), encoder, dust-sealed enclosure with air purge. Photograph 200-500 tiles each at press exit and dryer exit, including deliberately damaged samples, under three light angles. Log powder moisture, press pressure, cycle time, dryer settings, humidity, gas events and powder lot. Label with a second labeller on part of the set.
4. **Lamination bench test, in parallel:** 20-30 pressed tiles, some deliberately laminated (shortened de-airing, raised press speed), tapped with a hammer and microphone, imaged by thermal camera after active heating, tested by air-coupled or dry-contact ultrasound if available. Section every tile for ground truth. Drop any technique that cannot separate classes.
5. **Anomaly-detection prototype** on the good-image set, then compare with what a line operator sees in the same images.

| Gate | Result | Action |
|---|---|---|
| After audit | Almost all reject cost originates after firing | Stop or redirect to post-glaze or post-fire inspection |
| After audit | Meaningful share starts at press, dryer or handling and is visible green | Continue to image collection |
| After audit | Marks lost or origin unrecoverable | Fix marking and repeat |
| After images | Too few defect examples or poor labeller agreement | Extend collection or redefine labels |
| After prototype | Green images cannot be tied to final outcome better than chance | Stop the green-stage idea |
| After prototype | Some defect classes detectable with acceptable false alarms | Larger trial; still no promised percentage |

Hardware budget (about 110 lakh BDT in the proposal) is released only after gates 1-3 pass.
