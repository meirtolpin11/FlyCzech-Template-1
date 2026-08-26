# Task 4: Consolidated Services & Fleet Pricing PDF Integration

## Objective
Integrate a unified, authoritative Price List PDF covering all aircraft hourly rental rates, pilot training courses, and sightseeing experience packages across all relevant website sections.

---

## Target Files & Assets

| File / Asset | Location | Action |
|---|---|---|
| **Price List PDF** | `assets/pdf/FlyCzech-Price-List.pdf` | Add consolidated pricing document |
| **Fleet Info Panel** | `index.html` (lines ~402–415 in `#aircraft-info`) | Add direct Price List PDF link per aircraft |
| **Services Section** | `index.html` (lines ~278–283) | Fix empty price button `href` to point to PDF |
| **Mobile Fleet Slides** | `index.html` (lines ~487–570) | Add Price List PDF links to mobile aircraft cards |
| **English Locale** | `src/data/en.json` | Add translation keys `"price-list-pdf-button"`, `"fleet-price-pdf-link"` |
| **Czech Locale** | `src/data/cs.json` | Add translation keys `"price-list-pdf-button"`, `"fleet-price-pdf-link"` |

---

## Detailed Step-by-Step Implementation

### Step 1: Asset Placement
- Place the consolidated PDF document at `assets/pdf/FlyCzech-Price-List.pdf`.

### Step 2: Update Fleet Desktop Info Box in `index.html`
In `index.html` under `#aircraft-info` (~line 402), add a secondary CTA button for the Price List:

```html
<div id="aircraft-info" class="aircraft-info">
  <p><strong data-translate="price-per-hour-label"></strong> <span id="price"></span></p>
  <p><strong data-translate="range-label"></strong> <span id="range"></span></p>
  <p><strong data-translate="speed-label"></strong> <span id="speed"></span></p>
  <p><strong data-translate="night-rated-label"></strong> <span id="night-rated"></span></p>
  <p><strong data-translate="avionics-label"></strong> <span id="avionics-type"></span></p>
  <p><strong data-translate="base-airport-label"></strong> <span id="base-airport">LKLT</span></p>
  
  <div class="aircraft-buttons" style="display: flex; gap: 10px; margin-top: 15px; flex-wrap: wrap;">
    <a id="aircraft-more-info" class="contact-button contact-button-more-info" href="#" target="_blank" rel="noopener">
      <i class="fa fa-external-link"></i> <span data-translate="more-info"></span>
    </a>
    <a class="contact-button contact-button-pdf" href="assets/pdf/FlyCzech-Price-List.pdf" target="_blank" rel="noopener">
      <i class="fa fa-file-pdf-o"></i> <span data-translate="fleet-price-pdf-link"></span>
    </a>
  </div>
</div>
```

### Step 3: Update Services Price List CTA in `index.html`
In `index.html` under `#services` (~line 278), attach the direct PDF path:

```html
<div class="contact-button-wrapper pricelist-button-wrapper-slide-2">
  <a class="contact-button contact-button-pdf" href="assets/pdf/FlyCzech-Price-List.pdf" title="Price List" target="_blank" rel="noopener">
    <i class="fa fa-file-pdf-o" style="font-size:1.25rem"></i> <span data-translate="price-list-pdf-button"></span>
  </a>
</div>
```

### Step 4: Update Mobile Fleet Slides in `index.html`
Add the PDF link to each mobile aircraft card (~lines 504, 525, 546, 567):

```html
<p>
  <a href="https://www.flyczech.eu/flotila/cessna-c172sp-ok-mil" target="_blank" rel="noopener">
    <i class="fa fa-external-link"></i> <span data-translate="more-info"></span>
  </a>
  &nbsp;|&nbsp;
  <a href="assets/pdf/FlyCzech-Price-List.pdf" target="_blank" rel="noopener">
    <i class="fa fa-file-pdf-o"></i> <span data-translate="fleet-price-pdf-link"></span>
  </a>
</p>
```

### Step 5: Localization Updates

**In `src/data/en.json`:**
```json
"price-list-pdf-button": "Complete Price List (PDF)",
"fleet-price-pdf-link": "View Full Price List (PDF)",
```

**In `src/data/cs.json`:**
```json
"price-list-pdf-button": "Kompletní ceník služeb (PDF)",
"fleet-price-pdf-link": "Zobrazit kompletní ceník (PDF)",
```

---

## Verification & Testing Checklist

- [ ] All pricing buttons and links resolve properly to `assets/pdf/FlyCzech-Price-List.pdf`.
- [ ] Links open in a new tab without interrupting navigation on the main website.
- [ ] Each aircraft info card on desktop shows both "More Info" and "View Full Price List (PDF)".
- [ ] Mobile swiper aircraft slides display the price list link cleanly.
- [ ] Language switching accurately updates all button text in English and Czech.
