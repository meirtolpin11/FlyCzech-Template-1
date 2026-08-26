# Task 2: Training Programs PDF Document

## Objective
Provide prospective pilot students with direct access to a downloadable/viewable comprehensive syllabus and training catalog PDF covering PPL(A), Night Rating, Radio Telephony, and ICAO English courses.

---

## Target Files & Assets

| File / Asset | Location | Action |
|---|---|---|
| **PDF Catalog** | `assets/pdf/FlyCzech-Training-Programs.pdf` | Add training catalog PDF document |
| **Services HTML** | `index.html` (lines ~271–284 in `#services`) | Add Training Programs PDF CTA button |
| **English Locale** | `src/data/en.json` | Add translation key `"training-pdf-button"` |
| **Czech Locale** | `src/data/cs.json` | Add translation key `"training-pdf-button"` |

---

## Detailed Step-by-Step Implementation

### Step 1: Asset Placement
- Create directory `assets/pdf/` if it does not exist.
- Place the syllabus document at `assets/pdf/FlyCzech-Training-Programs.pdf`.

### Step 2: Update Services Section in `index.html`
In `index.html` under `#services` (~line 271), add the new PDF download button alongside the existing WhatsApp CTA:

```html
<!-- Services bottom CTA buttons -->
<div class="services-action-buttons" style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap; margin-top: 25px;">
  <!-- WhatsApp Consultation CTA -->
  <div class="contact-button-wrapper">
    <a class="contact-button contact-button-whatsapp" href="https://wa.me/+420773626601"
      title="Chat with us on WhatsApp" target="_blank" rel="noopener">
      <i class="fa fa-whatsapp" style="font-size:1.25rem"></i>
      <span data-translate="contact-cta"></span>
    </a>
  </div>

  <!-- Download Training Syllabus PDF CTA -->
  <div class="contact-button-wrapper">
    <a class="contact-button contact-button-pdf" href="assets/pdf/FlyCzech-Training-Programs.pdf"
      title="Training Programs PDF" target="_blank" rel="noopener">
      <i class="fa fa-file-pdf-o" style="font-size:1.25rem"></i>
      <span data-translate="training-pdf-button"></span>
    </a>
  </div>
</div>
```

### Step 3: Add Localization Keys

**In `src/data/en.json`:**
```json
"training-pdf-button": "Download Training Syllabus (PDF)",
```

**In `src/data/cs.json`:**
```json
"training-pdf-button": "Stáhnout sylabus výcviku (PDF)",
```

---

## Verification & Testing Checklist

- [ ] Button displays prominently in the Services section on both desktop and mobile viewports.
- [ ] Clicking the button opens `assets/pdf/FlyCzech-Training-Programs.pdf` in a new browser tab (`target="_blank"`).
- [ ] Switching language between `EN` and `CS` updates button text dynamically.
- [ ] Button hover states and responsive wrapping match existing site design system.
