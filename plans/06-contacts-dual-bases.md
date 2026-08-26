# Task 6: Contacts Section Dual Airport Bases (LKPR & LKLT)

## Objective
Update the contact section to represent FlyCzech's two operating bases: Prague Letňany (LKLT) and Prague Václav Havel Airport (LKPR) with clear base cards, direct Google Maps navigation links, and an interactive dual-map view.

---

## Target Files & Assets

| File / Asset | Location | Action |
|---|---|---|
| **Contact HTML** | `index.html` (lines ~658–730 in `#contact`) | Restructure layout into dual base cards with interactive map tabs |
| **English Locale** | `src/data/en.json` | Add base titles and address keys for LKLT & LKPR |
| **Czech Locale** | `src/data/cs.json` | Add base titles and address keys for LKLT & LKPR |
| **Contact Styles** | `src/css/style.css` (or `src/css/common.css`) | Style base badges, interactive tab switchers, and responsive grid |

---

## Detailed Step-by-Step Implementation

### Step 1: Design & Structure in `index.html`
Update `#contact` section (~line 665) to present both operating bases clearly:

```html
<div class="row align-items-center">
  <!-- Contact info and base cards -->
  <div class="col-lg-6">
    <div class="contact-circle-wrapper" style="display: flex; flex-direction: column; gap: 15px;">
      
      <!-- Primary communication channels -->
      <div class="contact-circle">
        <a class="contact-icon" href="tel:+420773626601" title="Call Us"><i class="fa fa-phone"></i></a>
        <a href="tel:+420773626601" style="text-decoration: none; color: inherit;">
          <span class="contact-info" data-translate="contact-phone">+420 773 626 601</span>
        </a>
      </div>

      <div class="contact-circle">
        <a class="contact-icon" href="https://wa.me/+420773626601" title="Chat on WhatsApp" target="_blank" rel="noopener"><i class="fa fa-whatsapp"></i></a>
        <a href="https://wa.me/+420773626601" target="_blank" rel="noopener" style="text-decoration: none; color: inherit;">
          <span class="contact-info" data-translate="contact-whatsapp">Chat with us on WhatsApp</span>
        </a>
      </div>

      <div class="contact-circle">
        <a class="contact-icon" href="mailto:info@flyczech.eu" title="Send Email"><i class="fa fa-envelope"></i></a>
        <a href="mailto:info@flyczech.eu" style="text-decoration: none; color: inherit;">
          <span class="contact-info" data-translate="contact-email">info@flyczech.eu</span>
        </a>
      </div>

      <!-- Base 1: LKLT (Letňany) -->
      <div class="contact-base-card p-3 rounded" style="background: #ffffff; border: 1px solid #e0e0e0; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 5px;">
          <strong style="color: #222;" data-translate="contact-base-lklt-title">Base Prague Letňany (LKLT)</strong>
          <span class="badge bg-primary text-white" style="font-size: 0.75rem;">LKLT</span>
        </div>
        <p style="margin: 0; font-size: 0.95rem; color: #555;">
          <i class="fa fa-map-marker text-danger" style="margin-right: 6px;"></i>
          <span data-translate="contact-base-lklt-address">FlyCzech s.r.o., Hůlkova, 197 00 Praha 19</span>
        </p>
        <a href="https://maps.app.goo.gl/2z5RKhMu3m4Roq21A" target="_blank" rel="noopener" style="font-size: 0.85rem; color: #0d6efd; text-decoration: underline; margin-top: 4px; display: inline-block;">
          Open LKLT in Google Maps <i class="fa fa-external-link"></i>
        </a>
      </div>

      <!-- Base 2: LKPR (Václav Havel Airport Prague) -->
      <div class="contact-base-card p-3 rounded" style="background: #ffffff; border: 1px solid #e0e0e0; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 5px;">
          <strong style="color: #222;" data-translate="contact-base-lkpr-title">Base Prague Václav Havel (LKPR)</strong>
          <span class="badge bg-primary text-white" style="font-size: 0.75rem;">LKPR</span>
        </div>
        <p style="margin: 0; font-size: 0.95rem; color: #555;">
          <i class="fa fa-map-marker text-danger" style="margin-right: 6px;"></i>
          <span data-translate="contact-base-lkpr-address">FlyCzech s.r.o., General Aviation, Aviatická, 161 00 Praha 6</span>
        </p>
        <a href="https://maps.google.com/?q=Aviatick%C3%A1+161+00+Praha+6" target="_blank" rel="noopener" style="font-size: 0.85rem; color: #0d6efd; text-decoration: underline; margin-top: 4px; display: inline-block;">
          Open LKPR in Google Maps <i class="fa fa-external-link"></i>
        </a>
      </div>

      <!-- Social Icons -->
      <div class="contact-circle social-icons">
        <a class="contact-icon" href="https://www.facebook.com/flyczech" title="Facebook" target="_blank" rel="noopener"><i class="fa fa-facebook"></i></a>
        <a class="contact-icon" href="https://www.instagram.com/flyczech" title="Instagram" target="_blank" rel="noopener"><i class="fa fa-instagram"></i></a>
      </div>
    </div>
  </div>

  <!-- Interactive Dual Map Column -->
  <div class="col-lg-6 google-maps text-center">
    <!-- Map Switcher Tabs -->
    <div class="btn-group mb-3" role="group" aria-label="Airport Map Switcher">
      <button type="button" id="btn-map-lklt" class="btn btn-sm btn-outline-dark active" onclick="switchBaseMap('lklt')">
        <i class="fa fa-plane"></i> Letňany (LKLT)
      </button>
      <button type="button" id="btn-map-lkpr" class="btn btn-sm btn-outline-dark" onclick="switchBaseMap('lkpr')">
        <i class="fa fa-plane"></i> Václav Havel (LKPR)
      </button>
    </div>

    <!-- Map Iframes -->
    <div style="height: 380px; width: 100%; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
      <iframe id="map-iframe-lklt"
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2211.427444748304!2d14.5243626!3d50.1275467!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470bed50ab240e5b%3A0x810017243311ce41!2sFlyCzech%20s.r.o.!5e1!3m2!1sen!2scz!4v1731859860377!5m2!1sen!2scz"
        width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy">
      </iframe>
      <iframe id="map-iframe-lkpr"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2559.043818617871!2d14.2882353!3d50.1062086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470b95333f2bb9ab%3A0x1d322c335fa3240e!2sAviatick%C3%A1%2C%20161%2000%20Praha%206!5e0!3m2!1sen!2scz!4v1731859900000!5m2!1sen!2scz"
        width="100%" height="100%" style="border:0; display: none;" allowfullscreen="" loading="lazy">
      </iframe>
    </div>
  </div>
</div>
```

### Step 2: Map Tab Switcher Script (in `src/js/scripts.js` or inline)
```javascript
function switchBaseMap(base) {
    const lkltMap = document.getElementById('map-iframe-lklt');
    const lkprMap = document.getElementById('map-iframe-lkpr');
    const lkltBtn = document.getElementById('btn-map-lklt');
    const lkprBtn = document.getElementById('btn-map-lkpr');

    if (base === 'lklt') {
        lkltMap.style.display = 'block';
        lkprMap.style.display = 'none';
        lkltBtn.classList.add('active');
        lkprBtn.classList.remove('active');
    } else {
        lkltMap.style.display = 'none';
        lkprMap.style.display = 'block';
        lkprBtn.classList.add('active');
        lkltBtn.classList.remove('active');
    }
}
```

### Step 3: Localization Updates

**In `src/data/en.json`:**
```json
"contact-base-lklt-title": "Base Prague Letňany (LKLT)",
"contact-base-lklt-address": "FlyCzech s.r.o., Hůlkova, 197 00 Praha 19",
"contact-base-lkpr-title": "Base Prague Václav Havel (LKPR)",
"contact-base-lkpr-address": "FlyCzech s.r.o., General Aviation, Aviatická, 161 00 Praha 6"
```

**In `src/data/cs.json`:**
```json
"contact-base-lklt-title": "Základna Praha Letňany (LKLT)",
"contact-base-lklt-address": "FlyCzech s.r.o., Hůlkova, 197 00 Praha 19",
"contact-base-lkpr-title": "Základna Praha Václav Havel (LKPR)",
"contact-base-lkpr-address": "FlyCzech s.r.o., Terminál 3 / GA, Aviatická, 161 00 Praha 6"
```

---

## Verification & Testing Checklist

- [ ] Both LKLT and LKPR base cards render clearly with address and distinct badges.
- [ ] Map tab buttons switch between the LKLT (Letňany) and LKPR (Václav Havel) map views smoothly.
- [ ] "Open in Google Maps" links open the respective location pin in Google Maps in a new tab.
- [ ] Section remains completely responsive and well-spaced on mobile, tablet, and wide desktop screens.
- [ ] Switching between EN and CS translates base titles and addresses without layout breakage.
