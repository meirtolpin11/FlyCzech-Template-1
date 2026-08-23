# FlyCzech Website — Required Changes Specification

This document details all requested modifications, functional requirements, technical specifications, and file mappings for the **FlyCzech** website codebase located at `D:/work/FlyCzech-Template-1`.

---

## Table of Contents
1. [Summary of Requirements](#1-summary-of-requirements)
2. [Detailed Change Specifications](#2-detailed-change-specifications)
   - [2.1 Hero Section: New FlyCzech Video](#21-hero-section-new-flyczech-video)
   - [2.2 Training Programs: Dedicated PDF Document](#22-training-programs-dedicated-pdf-document)
   - [2.3 Fleet / Planes Section: Click-Only Interaction & Price PDF Links](#23-fleet--planes-section-click-only-interaction--price-pdf-links)
   - [2.4 All-Inclusive Services & Fleet Pricing PDF](#24-all-inclusive-services--fleet-pricing-pdf)
   - [2.5 Our Team Section: Press/Click Interaction Only](#25-our-team-section-pressclick-interaction-only)
   - [2.6 Contacts Section: Dual Airport Locations (LKPR & LKLT)](#26-contacts-section-dual-airport-locations-lkpr--lklt)
3. [File & Asset Mapping](#3-file--asset-mapping)
4. [Localization Updates (`en.json` & `cs.json`)](#4-localization-updates-enjson--csjson)
5. [Implementation Plan & Verification Checklist](#5-implementation-plan--verification-checklist)

---

## 1. Summary of Requirements

| # | Component | Current State | Required Change |
|---|---|---|---|
| **1** | **Hero Video** | Uses generic `assets/images/per.mov` | Replace with official FlyCzech branding video. |
| **2** | **Training Programs** | Links to external web pages only | Add downloadable/viewable syllabus & training programs PDF. |
| **3** | **Fleet / Planes** | Auto-rotates images & activates on hover | **Disable automatic switching**. Display details **only upon click/press**. Add direct link on each aircraft to pricing PDF. |
| **4** | **Pricing PDF** | Incomplete / separate price points | Provide one consolidated PDF covering all services, courses, and aircraft rental rates. |
| **5** | **Our Team** | Changes background and bio on hover | **No hover transitions**. Show team member bio/details **only upon click/press**. |
| **6** | **Contacts** | Single address (Letňany only) | Display **two distinct base addresses**: **LKPR** (Prague Václav Havel) & **LKLT** (Letňany). |

---

## 2. Detailed Change Specifications

### 2.1 Hero Section: New FlyCzech Video
* **Objective:** Ensure the first visual impression is authentic FlyCzech footage.
* **Requirements:**
  - Replace `assets/images/per.mov` with the new FlyCzech video (e.g., `assets/videos/flyczech-hero.mp4` / `assets/images/flyczech-hero.mp4`).
  - Ensure modern web format (`.mp4` H.264 / WebM) optimized for fast web streaming with lightweight poster fallback (`hero-1.jpg`).
  - Maintain `autoplay`, `muted`, `loop`, `playsinline` attributes.
  - Verify seamless playback across desktop and mobile screens.

### 2.2 Training Programs: Dedicated PDF Document
* **Objective:** Provide potential pilot students with a comprehensive, downloadable training prospectus.
* **Requirements:**
  - Add a downloadable/openable Training Programs PDF (`FlyCzech-Training-Programs.pdf`) covering:
    - Private Pilot License (PPL(A))
    - Night Rating (VFR Night)
    - Radio Telephony Certification
    - ICAO English Examination & Courses
  - Add a primary CTA button (e.g., *"Download Training Syllabus (PDF)"* / *"Stáhnout sylabus výcviku (PDF)"*) in the Services slide.
  - Ensure links open in a new tab (`target="_blank" rel="noopener"`).

### 2.3 Fleet / Planes Section: Click-Only Interaction & Price PDF Links
* **Objective:** Clean, intentional aircraft browsing without accidental hover triggers or distracting auto-switching, plus transparent pricing access.
* **Requirements:**
  - **No Automatic Switching / No Interval Rotations:** Remove `imageRotationInterval` and timer loops that automatically cycle plane images or reset states unexpectedly.
  - **Click/Press to View Details:**
    - Remove `mouseenter` and `mouseleave` triggers.
    - An aircraft's details, specs, registration, and background image must only activate when the user explicitly clicks/presses the aircraft name.
    - Clicking the background or a reset button returns to the default fleet overview.
  - **Pricing PDF Link per Aircraft:**
    - Every aircraft card/info box must include a prominent link/button leading directly to the consolidated Price List PDF.

### 2.4 All-Inclusive Services & Fleet Pricing PDF
* **Objective:** A single, authoritative price list document for all offerings.
* **Requirements:**
  - Store the unified PDF in `assets/pdf/FlyCzech-Price-List.pdf` (or `assets/docs/`).
  - Content coverage:
    - Aircraft hourly rental rates (Cessna 150, Cessna 172, Bristell B23, Tecnam P2008JC) + fuel/hour packages & 10-hour discount terms.
    - Pilot training courses (PPL, Night Rating, Radio, ICAO English).
    - Sightseeing & experience flights (Stará Boleslav, Průhonice Castle, Castles around Prague).
  - Link this unified PDF in:
    - Navbar / Header Price List action.
    - Services / Training section.
    - Fleet details panel (`aircraft-info`).
    - Experience flights section.

### 2.5 Our Team Section: Press/Click Interaction Only
* **Objective:** Align team interaction with the fleet section for a consistent user experience.
* **Requirements:**
  - **Remove Hover Activation:** Disable `mouseenter` and `mouseleave` listeners in `src/js/our-team.js`.
  - **Click to Inspect:**
    - Clicking Josef Pavlíček or Robert Scribuck updates the section background, displayed title, and bio text.
    - Clicking outside or clicking an active member again can toggle back to the default team overview (`all.jpg`).
  - Support touch tap smoothly on mobile viewports.

### 2.6 Contacts Section: Dual Airport Locations (LKPR & LKLT)
* **Objective:** Accurately represent FlyCzech's two operating bases.
* **Requirements:**
  - Display two airport addresses clearly in the contact section:
    1. **LKLT (Letňany Airport / Letiště Letňany):**
       - Address: *FlyCzech s.r.o., Hůlkova, 197 00 Praha 19, Czechia*
       - Coordinates / Maps Link: Direct Google Maps link to Letňany base.
    2. **LKPR (Václav Havel Airport Prague / Letiště Václava Havla Praha):**
       - Address: *FlyCzech Base LKPR, Aviatická, 161 00 Praha 6 - Ruzyně, Czechia*
       - Coordinates / Maps Link: Direct Google Maps link to Terminal / General Aviation base.
  - Provide clear UI tags/badges for `LKLT` and `LKPR`.
  - Dual map embed options or interactive tab/switch to view both map locations.

---

## 3. File & Asset Mapping

| Component | Target File(s) | Action |
|---|---|---|
| **Hero Video** | `index.html`<br>`src/js/video.js`<br>`assets/images/` | Update `<source>` to new FlyCzech video; update poster image. |
| **Training PDF** | `index.html`<br>`assets/pdf/` | Add training catalog PDF and CTA buttons in `#services`. |
| **Fleet Interaction** | `src/js/fleet.js`<br>`src/css/components/fleet.css`<br>`index.html` | Remove hover & interval rotation. Implement click handler & add PDF link in `#aircraft-info`. |
| **Team Interaction** | `src/js/our-team.js`<br>`src/css/components/our-team.css` | Remove hover listeners; bind background/bio switch to click events. |
| **Contacts Section** | `index.html`<br>`src/data/en.json`<br>`src/data/cs.json` | Add LKPR & LKLT contact cards, map embeds, and address links. |
| **Price List PDF** | `assets/pdf/FlyCzech-Price-List.pdf`<br>`index.html` | Link all pricing CTAs and aircraft info links to the central PDF. |

---

## 4. Localization Updates (`en.json` & `cs.json`)

### English (`src/data/en.json`) Additions/Updates:
```json
{
  "training-pdf-button": "Download Training Syllabus (PDF)",
  "price-list-pdf-button": "Complete Price List (PDF)",
  "fleet-price-pdf-link": "View Full Price List (PDF)",
  "contact-base-lklt-title": "Base Prague Letňany (LKLT)",
  "contact-base-lklt-address": "FlyCzech s.r.o., Hůlkova, 197 00 Praha 19",
  "contact-base-lkpr-title": "Base Prague Václav Havel (LKPR)",
  "contact-base-lkpr-address": "FlyCzech s.r.o., General Aviation, Aviatická, 161 00 Praha 6"
}
```

### Czech (`src/data/cs.json`) Additions/Updates:
```json
{
  "training-pdf-button": "Stáhnout sylabus výcviku (PDF)",
  "price-list-pdf-button": "Kompletní ceník služeb (PDF)",
  "fleet-price-pdf-link": "Zobrazit kompletní ceník (PDF)",
  "contact-base-lklt-title": "Základna Praha Letňany (LKLT)",
  "contact-base-lklt-address": "FlyCzech s.r.o., Hůlkova, 197 00 Praha 19",
  "contact-base-lkpr-title": "Základna Praha Václav Havel (LKPR)",
  "contact-base-lkpr-address": "FlyCzech s.r.o., Terminál 3 / GA, Aviatická, 161 00 Praha 6"
}
```

---

## 5. Implementation Plan & Verification Checklist

- [ ] **Phase 1: Assets Preparation**
  - [ ] Place new FlyCzech hero video in `assets/images/` or `assets/videos/`.
  - [ ] Place Training Programs PDF in `assets/pdf/`.
  - [ ] Place Consolidated Services & Rental Price List PDF in `assets/pdf/`.
- [ ] **Phase 2: Interaction Logic Updates**
  - [ ] Refactor `src/js/fleet.js` to eliminate hover triggers and auto-rotation intervals; activate on click only.
  - [ ] Refactor `src/js/our-team.js` to eliminate hover transitions; switch team bio on click only.
- [ ] **Phase 3: HTML & UI Templates**
  - [ ] Update `#home` video element.
  - [ ] Add PDF links to `#services` (Training programs) and `#fleet-div` (Aircraft spec card).
  - [ ] Update `#contact` to render both LKPR and LKLT bases with respective addresses and map links.
- [ ] **Phase 4: Multi-language Support**
  - [ ] Add and sync translation keys in `en.json` and `cs.json`.
- [ ] **Phase 5: Testing & Quality Assurance**
  - [ ] Verify click behavior on desktop and touch devices.
  - [ ] Test PDF download/view links across all browsers.
  - [ ] Validate responsive layout on mobile, tablet, and desktop viewports.
