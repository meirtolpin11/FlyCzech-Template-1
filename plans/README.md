# FlyCzech Website — Modular Implementation Plans

This directory contains standalone, step-by-step implementation plans for each required change to the FlyCzech website. Each plan is designed to be executed, reviewed, and tested independently as a focused unit of work.

---

## Recommended Execution Order: Easy / Fast ➔ Hard / Takes Time

Below is the optimized execution order sorted by **complexity, blast radius, and implementation speed** (quickest wins first):

| Order | Plan File | Task Name | Complexity & Est. Time | Key Focus Area |
| :---: |---|---|:---:|---|
| **1** | [02-training-pdf.md](file:///workspaces/FlyCzech-Template-1/plans/02-training-pdf.md) | **Training Programs PDF** | 🟢 **Very Easy** (~5–10 min) | Asset drop, 1 button in `#services`, 2 locale strings. |
| **2** | [01-hero-video.md](file:///workspaces/FlyCzech-Template-1/plans/01-hero-video.md) | **Hero Section Video Update** | 🟢 **Very Easy** (~5–10 min) | Asset drop, update `<source>` & `<video>` attributes. |
| **3** | [04-pricing-pdf.md](file:///workspaces/FlyCzech-Template-1/plans/04-pricing-pdf.md) | **Consolidated Price List PDF** | 🟡 **Easy / Quick** (~10–15 min) | Asset drop, hook up price buttons in `#services` & `#aircraft-info`. |
| **4** | [05-our-team-interaction.md](file:///workspaces/FlyCzech-Template-1/plans/05-our-team-interaction.md) | **Our Team Click Interaction** | 🟡 **Moderate** (~15–20 min) | JS refactor: remove hover, add click toggle & click-outside reset. |
| **5** | [03-fleet-interaction.md](file:///workspaces/FlyCzech-Template-1/plans/03-fleet-interaction.md) | **Fleet Click Interaction & Auto-Switch Removal** | 🔴 **More Complex** (~25–35 min) | JS state machine refactor: remove intervals/hover, manage video/image transitions. |
| **6** | [06-contacts-dual-bases.md](file:///workspaces/FlyCzech-Template-1/plans/06-contacts-dual-bases.md) | **Dual Airport Bases (LKPR & LKLT)** | 🔴 **More Complex** (~30–40 min) | HTML/CSS layout restructuring, interactive dual map tab switcher, mobile responsiveness. |

---

## Plan Directory (Page Structure Flow)

| Plan File | Task Name | Core Files Involved |
|---|---|---|
| [01-hero-video.md](file:///workspaces/FlyCzech-Template-1/plans/01-hero-video.md) | **1. Hero Section Video Update** | `index.html`, `src/js/video.js`, `assets/images/` |
| [02-training-pdf.md](file:///workspaces/FlyCzech-Template-1/plans/02-training-pdf.md) | **2. Training Programs PDF** | `index.html`, `src/data/en.json`, `src/data/cs.json`, `assets/pdf/` |
| [03-fleet-interaction.md](file:///workspaces/FlyCzech-Template-1/plans/03-fleet-interaction.md) | **3. Fleet Click-Only Interaction** | `src/js/fleet.js`, `src/css/components/fleet.css`, `index.html` |
| [04-pricing-pdf.md](file:///workspaces/FlyCzech-Template-1/plans/04-pricing-pdf.md) | **4. Consolidated Price List PDF** | `index.html`, `src/data/en.json`, `src/data/cs.json`, `assets/pdf/` |
| [05-our-team-interaction.md](file:///workspaces/FlyCzech-Template-1/plans/05-our-team-interaction.md) | **5. Our Team Click-Only Interaction** | `src/js/our-team.js`, `src/css/components/our-team.css`, `index.html` |
| [06-contacts-dual-bases.md](file:///workspaces/FlyCzech-Template-1/plans/06-contacts-dual-bases.md) | **6. Dual Airport Bases (LKPR & LKLT)** | `index.html`, `src/data/en.json`, `src/data/cs.json`, `src/css/style.css` |

---

## Recommended Workflow

1. **Pick a Task:** Review the respective plan document (`plans/0X-*.md`).
2. **Execute Changes:** Implement the HTML, JS, CSS, and localization updates specified in the plan.
3. **Verify:** Follow the verification checklist at the bottom of the plan document.
4. **Commit:** Commit the atomic change with a clear semantic message (e.g. `feat(fleet): switch aircraft selection from hover to click interaction`).
