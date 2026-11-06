# Local council: two-stage tile inspection startup (Bangladesh)

> **Local council**: these perspectives all come from Claude playing different roles, not from different AI vendors. Treat agreement as a shared starting point to pressure-test, not as independent confirmation.

Roles: Devil's Advocate, Scalability Architect, Compliance Officer, Simplicity Advocate. Members were blind to each other.

## Devil's Advocate
Viable only if reframed as fired-stage inspection and data capture that earns a green-stage add-on. Green-stage and "60-70% before the kiln" rest on zero green data. Thermal at 1.5 m/s sees almost no contrast for a subsurface gap; acoustics is a lab method. Falsifier: bench test on 200+ laminated and 200+ sound green tiles, under 80% detection or over 5% false rejects. The EU 3%/2% figures do not support 60-70%. Green tile is matte, dusty, low contrast and 3D, which pushes toward laser or structured light and against "low-cost". Plant access and willingness to pay are bigger risks than model accuracy. Confidence: medium.

## Scalability Architect
Viable as a narrow, service-heavy pilot. Compute is not the limit; optics, lighting, vibration and per-plant retraining are. A 1,200 mm piece leaves under 0.8 s; line rate of about 10 kHz is needed for 0.15 mm. Falsifier: 20,000+ labelled green images across 3+ shifts, recall under about 90% on cracks and chips at under 2% false rejects. Defect-origin audit of 4-8 weeks. Design edge-first. Spend a few lakh on one camera rig for 2 months before buying 110 lakh of hardware. Confidence: medium.

## Compliance Officer
Not viable as framed until IP and asset ownership are settled in writing. Grant-bought hardware is likely public university property under procurement rules and audit; code, models and datasets likely belong to the university or are jointly claimed. Faculty equity in a spin-out needs disclosure. Factory data and worker footage need a signed data MoU. Automatic set-points shift liability to the vendor. State 60-70% only as a hypothesis. Falsifier: signed IP policy, grant terms and a plant MoU. Confidence: medium (UGC terms and current Bangladeshi data law unverified).

## Simplicity Advocate
Over-built for a pilot with zero green data. Build one node at kiln exit first, log reject reasons, skip cloud analytics and PLC write access, collect 5,000+ green images before any ML. Hand tapping 1 tile in 50, logged against kiln outcome, tests whether lamination matters at near-zero cost. Release hardware money only after the audit and the IP letter. India and Vietnam expansion is irrelevant until one plant renews. Confidence: medium.

## Synthesis (angles, not consensus)

**Shared starting points** (a common prior to stress-test, not corroboration): green-stage detection has no data behind it; 60-70% is unaudited; IP is the cheapest risk to fix and the likeliest to kill the spin-out; sequence should be audit, IP letter, MoU, then hardware. All four share one model's prior that incumbents like SACMI are strong, and none could check plant or grant facts.

**Genuine tensions**
- Is the EU 3% before firing vs 2% after supportive? Devil says it cuts against 60-70%; Scalability reads it as at best 60% of scrap. Both miss that the 3% is already caught by existing inspection. The relevant number is what share of the 2% that escapes was created before the kiln.
- Drop green stage and start at kiln exit (Devil, Simplicity) vs keep it as a measured experiment (Scalability, Compliance).
- Keep the cloud dashboard (original plan) vs defer it (Simplicity) vs edge-first (Scalability).

**Blind spots**: a successful grant pilot may leave founders with nothing they can legally sell (Compliance); willingness to pay is unmodelled; maintenance in dust and heat; root-cause attribution confounded across press, dryer, glaze and kiln; nobody costed a realistic price per station against 1% scrap avoided.

**Suggested direction**: reframe the claim as a hypothesis with go/no-go gates: (1) written IP and asset terms and a plant data MoU; (2) 4-8 week defect-origin audit with marked tiles; (3) 2 months of cheap green-image collection at one press exit, 600x600 only; (4) bench lamination test; (5) only then release the 110 lakh hardware budget. Supported by all four roles; the uncertainty is whether green-stage sensing works at all.
