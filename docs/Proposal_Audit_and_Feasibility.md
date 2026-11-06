# Ceramic Intelligence Loop — Proposal Audit, Technical Feasibility and Startup Assessment

Prepared 5 November 2026 from the uploaded HEAT / ATF Window 3a (STEM) submission:
`Final_W-3a_STEM_Section-A.docx`, `Final_W-3a_STEM_Section-B.docx`, `Annex-1.docx`.
(The fourth upload, `Ceramic_Tile_Defect_Detection_System`, arrived as a 0-byte file and could not be read.)

> **Update 6 Nov 2026:** all percentage targets in this report (60–70% pre-kiln coverage, 55–80% cost reduction, payback claims) are withdrawn from the customer-facing materials. The project promises no detection rate or savings percentage. See `Green_Body_Detection_Options.md` for the evidence review and the gated experiment plan.

---

## Part 1 — Number and consistency mismatches (fix before the final submission)

Ranked by how likely a reviewer is to catch it. Budget arithmetic was recomputed line by line.

### 1.1 Budget table (Section A, Q18)

| # | Where | Stated | Recomputed | Verdict |
|---|-------|--------|------------|---------|
| 1 | 4112302 *Camera and accessories* subtotal | **34.20** | 21.60 + 9.60 = **31.20** | **Wrong.** With 31.20 the parent line 41123 (102.00) is correct; with 34.20 it would be 105.00. Change 34.20 → 31.20. |
| 2 | 41123 Machineries & Equipment | 102.00 | 31.20 + 30.00 + 7.20 + 6.00 + 27.60 = 102.00 | OK (only once #1 is fixed) |
| 3 | 41122 ICT equipment | 24.60 | 12 + 9.6 + 1.5 + 1.5 = 24.60 | OK |
| 4 | 31113 Allowances | 52.80 | 16.8 + 12 + 12 + 12 = 52.80 | OK |
| 5 | 32111 Administrative | 36.20 | sum of 11 lines = 36.20 | OK |
| 6 | Total Revenue | 134.55 | 134.55 | OK |
| 7 | Total Capital | 164.60 | 24.6 + 102 + 36 + 2 = 164.60 | OK |
| 8 | Grand total | 299.15 | 134.55 + 164.60 = 299.15 | OK, matches Q5, Annex 1c |
| 9 | "Base + 20% margin" lines | 21.6 / 9.6 / 30 / 12 / 9.6 / 18 | 18, 8, 25, 10, 8, 15 × 1.2 | OK |
| 10 | Q17b "No item exceeds 15%" | — | largest item 30.00 = 10.0% of 299.15 | OK |
| 11 | 4113301 Computer software | 36.00 | no breakdown | Not an error, but 36 lakh of "software" in a project whose novelty is *open source* will be questioned. Itemise (annotation tooling, cloud hosting for 2 years, OPC-UA stack licences, MES hosting). |

### 1.2 Cost-comparison and savings claims

| # | Where | Problem | Suggested fix |
|---|-------|---------|---------------|
| 12 | Q16 "A commercial European inspection machine costs approx. **$200,000–500,000 (120 Lakh BDT)**" | USD 200k ≈ **244 lakh** and USD 500k ≈ **610 lakh** at ~122 BDT/USD. 120 lakh ≈ USD 98k. The bracket does not convert. | "USD 200–500k (≈ BDT 245–610 lakh)". |
| 13 | Q16 "representing a **95% cost reduction**" | Nothing in the document produces 95%. Our full hardware stack is 110.4 lakh; vs 245–610 lakh that is a 55–82% reduction. | "a 55–80% reduction in capital cost per inspection station". |
| 14 | Q20 item 5 "**15% reduction in energy intensity** per unit of production" vs Q16 "rejecting just **1%** of waste before the kiln saves millions of BDT" | The two figures are not reconciled. Firing is ~60% of thermal energy (your own number); if green rejects are 2–3% of pieces (EU plant data: ~3% unfired scrap), the direct kiln-energy saving is 2–3% of kiln energy ≈ 1.5–2% of plant thermal energy. 15% is not defensible from green rejection alone. | Claim "2–5% plant specific-energy reduction (green-stage rejection plus drift correction)", and note the larger saving is *material* (green scrap is 100% recyclable). The "1% saves millions" line is roughly right: ~970 tiles/day × 0.38 m³ × BDT 30 ≈ BDT 24–37 lakh/yr in gas for a 35,000 m²/day plant. |

### 1.3 Technical specifications that contradict each other

| # | Where | Problem | Suggested fix |
|---|-------|---------|---------------|
| 15 | **">600 tiles/min"** — appears 5× (Q6, Q9-3, Q12, Q15, Q16) and "600 units/min" in SWOT | 600 tiles/min = 10 tiles/s = ~5 m/s belt. A whole 35,000 m²/day plant of 600×600 tiles makes ~97,000 tiles/day = **~67 tiles/min across all lines** (~22/min per line). Even 300×300 tiles on one line are ~90/min. The figure is 5–10× too high and reviewers from industry will notice. | ">120 tiles/min per line (≈1.5 m/s belt), or ≥1,500 m²/h", and keep the <20 ms latency (which is fine). |
| 16 | SWOT Weakness 3: "the **sub-millisecond (<20 ms)** latency" | 20 ms is 20,000 µs; not sub-millisecond. | "the sub-20 ms latency". |
| 17 | **3D profiler accuracy "±1000 µm"** — Q11b, Q17 item 3 (twice), Annex 1a M4, Annex 1b indicator 3 | ±1 mm is far too coarse. ISO 10545-2 tolerances for centre curvature / warpage are ±0.5% of the diagonal: ±2.1 mm for 300×300, ±4.2 mm for 600×600; thickness ±5% (≈±0.5 mm). A measuring device should resolve ≤10% of the tolerance, i.e. ≤±200 µm for 300 mm tiles. The named units (LMI Gocator, Keyence LJ-X) deliver ±10–50 µm Z. It also contradicts "micro-cracks (100–200 µm)" in Q11b. | Specify "±50 µm Z-repeatability, ±100 µm absolute over 600 mm". |
| 18 | **YOLO version** — Q6 "YOLOv10 (NMS-free)"; Q9-3 and Annex M2 "YOLOv8/v10"; Q11b and Q12 "YOLOv8 architecture… C2f"; Q10-3 "YOLOv10 with C2f modules"; Q13, Q15, Annex 1c "YOLOv10" | Six places, three different answers. C2f is the YOLOv8 block; YOLOv10 replaces it with C2fCIB/PSA and consistent dual assignment (NMS-free). "YOLOv10 with C2f" is technically mixed. | Pick one sentence and reuse it: "Ultralytics YOLOv8/YOLOv10 family; final architecture chosen by benchmark on the testbed." |
| 19 | 8K line-scan over a 600 mm tile = 75 µm/pixel; a 100 µm crack is 1.3 px | Marginal for the "100–200 µm micro-crack" claim. 16K gives 37 µm/px. | State 16K, or move the micro-crack claim to "≥200 µm". |
| 20 | Q20 item 15 "detection **accuracy of 95.00%**" vs Annex 1b "mAP@0.5 > 0.950" | Accuracy and mAP are different metrics; baseline 0.587 mAP on 1,532 *static* images → 0.95 on *dynamic*, two-node, green + fired data is a very large jump. | Keep mAP as the indicator, call the Q20 number "mAP ≥ 0.95", and consider a 0.90 commitment with 0.95 as stretch. |

### 1.4 Dates, counts, and copy-paste leftovers

| # | Where | Problem | Suggested fix |
|---|-------|---------|---------------|
| 21 | Annex 1b columns "**Baseline Value in Year 2024**" / "Desired Standard in Year 2028" | Commencement is 28/05/2026 (Q4). The template says the base year is the year of contract signing. | 2026 and 2028. |
| 22 | Annex 1b indicator 5 "**3** MS/PhD students" vs budget: 2 PhD honoraria + 1 Research Assistant | Consistent only if the RA is an enrolled MS student. | Say "2 PhD + 1 MS (RA)". |
| 23 | Q17 item 7 *Automated Conveyor Testbed & Rejection Actuators* — relevance: "High-speed **stacking and palletizing** of finished products" | Copied from another proposal; a testbed does not palletize. | "Simulates line motion, encoder-triggered acquisition and pneumatic rejection of defective tiles." |
| 24 | Q21 "live demonstrations of the vision system and **robotic arm**" | There is no robotic arm anywhere in the budget. | Delete "and robotic arm". |
| 25 | Q11a cites **Lario et al. (2025), Zhang et al. (2019), Chen et al. (2022)**; none is in Q23 References; none of the six listed references is cited in the text | Reviewers check this. | Add the three missing entries; cite the six existing ones where they belong (e.g. Cumbajin 2024 and Wan 2022 in the lit review). |
| 26 | Q7 "firing… often **>60%**" vs Q8 "**approximately 60%**" | Minor. | Use one phrasing. |
| 27 | Q7/Q11a/Q13/SWOT name SACMI products "**Classy-AI**", "**OneVision**", "**MDX**" | Could not be verified on SACMI's public catalogue. SACMI's verifiable green-stage system is **Optima+** (unfired slab inspection, 3 cameras, 3D); pre-kiln: **Flawmaster**, **Processmaster**; kiln exit: **BreakVision**, **PlanVision**; platform **HERE**. System Ceramics' sorter is **Qualitron**. | Replace with verifiable names. |

### 1.5 One non-numeric item that can disqualify the whole file

Section A is required to be **anonymous** ("inclusion of any personal or institutional information… will make the proposal ineligible"). Q20 items 10 and 11 name **"IICT"** six times, and Q22 says the university is "one of the oldest and most prestigious technological institutions in the country". Replace "IICT" with "the entity" and drop the identifying sentence. This is the single most important edit in the file.

---

## Part 2 — How good is the idea?

**Strong.** The problem is real, timed well, and framed the right way:

- Gas is the binding constraint of the Bangladeshi ceramic industry (BCMEA has repeatedly warned that gas-price hikes raise production cost 10–35%, and 22–25 factories have had disrupted production from shortages). A product that says "stop firing tiles you will throw away" sells itself to a plant manager.
- Pre-kiln inspection is exactly where SACMI positions its newest product (Optima+), which confirms the direction. Nobody in Bangladesh offers a local, open, retrofit version.
- The data moat is genuine: a factory that runs your cameras on every tile gives you the only defect database in the country.

**Where the proposal over-reaches (and should be scoped down in the pitch, not in the grant):**

1. **Seven objectives, four product layers, two years.** Vision testbed + green node + fired node + 3D metrology + cloud MES + root-cause engine + autonomous M2M control is a 5-year company roadmap, not a 24-month sub-project. The grant can keep the ambition; the execution plan must sequence it: green node first, fired node second, dashboard third, M2M last and *advisory-only*.
2. **Autonomous write-back to the press/kiln PLC.** No plant will let a university prototype change press pressure or burner set-points without an operator in the loop, and SACMI/System PLCs are often locked. Promise "recommended set-points, operator-confirmed, with an audit log" during the project. Autonomous control is a later product.
3. **80 / 20 split (green / fired).** See Part 3. Realistic: roughly half to two-thirds of eventual rejects have a green-stage precursor you can see or measure. The rest (black core, pyroplastic warpage, shade variation, crazing, glaze devitrification, kiln roller marks) are created *in* the kiln or glaze line and can only be caught at the fired node. Keep the fired node in scope; it is also where the most mature academic work is, so it de-risks the publications.

---

## Part 3 — Can green-body defects actually be detected? (the core technical question)

Yes for most of them, with sensors you can afford. The honest map:

| Green-stage defect (after press / after dryer) | Visible to a camera? | Best low-cost sensor | Confidence |
|---|---|---|---|
| Edge chips, corner breaks | Yes (matte green surface helps; less specular than fired glaze) | Line-scan or area-scan camera + low-angle grazing light | **High** |
| Surface cracks ≥ 0.2 mm, drying cracks | Yes with grazing light | Same | **High** |
| Thickness variation / uneven die fill | Not from 2D; yes from height map | 3D laser line profiler (height map, ±50 µm) | **High** |
| Density variation (the root of warpage & calibre spread) | Not optically | **Weight + 3D volume → bulk density per tile** (load cell under the belt + profiler). Cheap, novel, publishable. SACMI does this with X-ray. | **High** for relative density, medium for absolute |
| Powder lumps, contamination, dirty die marks, print misregistration (after glaze/digital print, still unfired) | Yes | 2D vision, trained model | **High** |
| Glaze drips, missing glaze, pinholes in wet glaze | Mostly yes | 2D vision | Medium (many pinholes open only during firing) |
| **Internal lamination** (de-airing failure in the press) | **Usually no** unless it reaches the edge | (a) acoustic: impact/tap + microphone and resonance-frequency shift (proven on roof tiles, very cheap); (b) **active thermography** right after the dryer: a lamination is a thermal barrier and shows as a cold/hot patch on a 2–3 kHz IR camera; (c) laser ultrasonics (too expensive) | **Medium** — this is the genuine research risk and the genuine differentiator. Budget a thermal camera (≈ BDT 4–8 lakh) and a microphone array; both fit inside the existing 20% margins. |
| Moisture non-uniformity after dryer | Not optically | NIR moisture sensor or IR thermography of the dryer exit | Medium |

What you **cannot** catch before the kiln: black core, kiln-induced warpage and calibre drift, shade variation, crazing, glaze devitrification, roller marks, over/under-firing. These need the fired-stage node, and their *trends* are what the root-cause engine correlates with kiln telemetry.

**Realistic coverage statement for the pitch:** "60–70% of structural rejects caught before the kiln; 100% of rejects classified and traced to a stage by the two nodes together." Keep 80% as the stretch target in the grant indicators, but measure it.

**Energy reality check (per 600×600 porcelain tile, ~7–8 kg):** kiln ≈ 14 MJ ≈ 0.38 m³ gas ≈ BDT 11 at BDT 30/m³. Material + glaze + grinding/handling of the body is worth several times the gas. The gas story is the political story (national energy security); the money story for the factory is **recovered raw material and avoided fired waste**. Tell both, in that order to UGC and in the reverse order to DBL.

---

## Part 4 — Startup potential in Bangladesh

**Verdict: a fundable, profitable SME with a clear first customer; not (on the home market alone) a venture-scale company. Regional expansion is what makes it venture-scale.**

- **Home market.** Tile segment ≈ BDT 7,150 crore/yr domestic (FY25), ~30+ tile factories, perhaps 80–120 production lines in total. Priced at BDT 25–40 lakh per inspection station plus a subscription for the MES, that is a one-time addressable market of roughly BDT 50–80 crore plus a few crore a year of recurring revenue. That sustains a 15–30 person company comfortably. It does not sustain a VC round by itself.
- **The real prize** is the same product sold into India (Morbi alone has >800 tile units), Vietnam, Indonesia and Egypt, where SACMI and System Ceramics pricing (USD 200–500k per station) is equally out of reach for tier-2 plants. Bangladesh is the proving ground; a DBL reference site is the sales tool.
- **Why you can win the home market:** price (3–5× cheaper), local support within hours instead of an Italian service visit, data stays in the factory, retrofit onto KEDA/older Italian lines that SACMI will not touch, and Bangla-language dashboards and reports for shift staff.
- **Risks that decide whether the startup exists at all:**
  1. **IP and asset ownership under ATF.** Equipment bought with the grant belongs to the university; the IP follows the university's policy. Before the pilot, agree in writing: a separate company, a licence from the university (royalty or equity), and a rule that the university testbed is for research while factory installations are company-owned. Settle this now while everyone is friendly.
  2. **Data access.** Every milestone in Annex 1 assumes "unhindered access to the partner factory line". Get a signed MoU with DBL (or whichever plant) that covers camera installation, data ownership, and publication rights.
  3. **Reliability, not accuracy, is what sells.** A system that stops the line once a week is removed within a month. Budget engineering time for IP67 enclosures, air knives, encoder sync, and a "fail-open" mode.
  4. **Team.** You need one person who has stood on a ceramic line at 3 a.m. — a production engineer from a plant — alongside the ML people.

**Funding path after the grant:** DBL pilot (paid at cost) → Startup Bangladesh / iDEA seed or a Hi-Tech Park incubation slot → second and third plant installs → a regional pilot (Morbi) → Series A. Alternatively, a joint venture where DBL Group takes equity in exchange for being the exclusive launch site: DBL Group already runs textiles, pharma, ceramics and IT, so a tech JV is in character for them.

**Bottom line:** the grant is gettable once the arithmetic and anonymity issues in Part 1 are fixed; the technology is feasible for the defects that matter most; the startup is viable if you own the IP, land one reference factory, and plan from day one for the region rather than for 30 Bangladeshi plants.

---

### Sources consulted
- DBL Ceramics capacity (35,000 m²/day, 3 lines): https://www.tbsnews.net/economy/corporates/dbl-ceramics-celebrates-6th-anniversary-633550 , https://idlc.com/mbr/article.php?id=502
- Bangladesh ceramics market and gas pressure: https://www.tbsnews.net/node/1475831 , https://www.tbsnews.net/node/1534416 , https://www.thedailystar.net/business/news/gas-price-hike-raise-ceramic-production-cost-1769215 , https://www.bssnews.net/business/337446
- SACMI pre-kiln and kiln-exit vision products: https://sacmi.com/control-and-vision-systems/vision-for-ceramics , https://ceramicworldweb.com/en/technology/sacmi-optima-digitalised-quality-control-unfired-slabs
- Green-body defect origin and scrap rates (EU BRST985319): https://cordis.europa.eu/project/id/BRST985319/de
- Unfired tile imaging and acoustic inspection: https://www.vision-systems.com/cameras-accessories/article/16737375/roof-tiles-inspected-with-sound-and-vision
