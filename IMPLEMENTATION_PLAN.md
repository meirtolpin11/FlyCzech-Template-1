# FlyCzech Website — Technical Implementation Plan

This document outlines the step-by-step technical implementation required to fulfill the requested changes to the FlyCzech website.

---

## 1. Home Page Video Change
**Goal:** Replace the current hero video (`per.mov`) with a new official FlyCzech video.

### Tasks:
1. **Asset Placement:**
   - Place the new video file (e.g., `flyczech-hero.mp4`) in `assets/images/` or a new `assets/videos/` directory.
   - Place a corresponding fallback poster image (e.g., `flyczech-hero-poster.jpg`).
2. **Modify `index.html`:**
   - Locate the hero video element (approx. line 148).
   - Update the `<source>` tag: `<source id="video-source-1" src="assets/images/flyczech-hero.mp4" type="video/mp4">`.
   - Update the `<video>` poster attribute: `poster="assets/images/flyczech-hero-poster.jpg"`.

---

## 2. Training Programs PDF
**Goal:** Add a downloadable PDF for training programs.

### Tasks:
1. **Asset Placement:**
   - Place the syllabus PDF in a new directory: `assets/pdf/Training-Programs.pdf`.
2. **Modify `index.html`:**
   - In the Services section (`#services`, approx. line 271), locate the `.contact-button-wrapper-slide-2` containing the contact/price buttons.
   - Add a new anchor tag (`<a>`) styled as a button pointing to the PDF:
     ```html
     <div class="contact-button-wrapper pricelist-button-wrapper-slide-2">
       <a class="contact-button contact-button-whatsapp" href="assets/pdf/Training-Programs.pdf" target="_blank" title="Training Programs PDF">
         <i class="fa fa-file-pdf-o" style="font-size:1.25rem"></i> <span data-translate="training-pdf"></span>
       </a>
     </div>
     ```
3. **Localization (`src/data/en.json` & `cs.json`):**
   - Add `"training-pdf": "Training Syllabus (PDF)"` to `en.json`.
   - Add `"training-pdf": "Sylabus výcviku (PDF)"` to `cs.json`.

---

## 3. Planes Page: Click-to-View & Remove Auto-Switching
**Goal:** Disable hover interactions and automatic image rotation; activate plane details only on click.

### Tasks:
1. **Modify `src/js/fleet.js`:**
   - **Remove Hover Logic:** Delete the `header.addEventListener('mouseenter', ...)` and `header.addEventListener('mouseleave', ...)` blocks (approx. lines 183-199).
   - **Remove Auto-Switching:** Delete the `setInterval` logic responsible for rotating images (approx. line 148-157).
   - **Update Click Logic:** Modify the `header.addEventListener('click', ...)` to handle toggling. If the clicked plane is already active, revert to `FLEET_STATE.DEFAULT`. Otherwise, set it to `FLEET_STATE.CLICKED` and load the static image.
2. **Modify `index.html`:**
   - Remove the `hoverable` class from the `fleet-header` `<h1>` elements to remove CSS hover effects if any.

---

## 4. One PDF for All Prices
**Goal:** Provide a single PDF containing prices for all services and aircraft, linked from each plane.

### Tasks:
1. **Asset Placement:**
   - Place the pricing PDF: `assets/pdf/FlyCzech-Price-List.pdf`.
2. **Modify `index.html`:**
   - Locate the `#aircraft-info` div (approx. line 402).
   - Add a new link next to the "More Info" button:
     ```html
     <a class="contact-button contact-button-more-info" href="assets/pdf/FlyCzech-Price-List.pdf" target="_blank">
       <i class="fa fa-file-pdf-o"></i> <span data-translate="price-list"></span>
     </a>
     ```
   - Update the general Price List buttons in the Services and Navigation sections to ensure their `href` points to `assets/pdf/FlyCzech-Price-List.pdf`.

---

## 5. Our Team Page: Click-to-View Only
**Goal:** Change team member selection from hover to click.

### Tasks:
1. **Modify `src/js/our-team.js`:**
   - Remove the `mouseenter` and `mouseleave` event listeners attached to `headers`.
   - Implement a `click` event listener:
     ```javascript
     let activeHeader = null;
     headers.forEach(header => {
         header.addEventListener('click', function (e) {
             e.stopPropagation(); // Prevent document click from triggering
             if (activeHeader === this) {
                 // Revert to default if clicking the active one
                 teamSection.style.backgroundImage = defaultTeamBg;
                 descriptionText.textContent = descriptionText.getAttribute('data-default');
                 teamMemberTitle.textContent = teamMemberTitle.getAttribute('data-default');
                 activeHeader = null;
             } else {
                 // Set new active member
                 teamSection.style.backgroundImage = `url(${this.getAttribute('data-image')})`;
                 descriptionText.textContent = this.getAttribute('data-description');
                 teamMemberTitle.textContent = this.getAttribute('data-title');
                 activeHeader = this;
             }
         });
     });

     // Click outside to reset
     document.addEventListener('click', function(e) {
         if (!e.target.closest('.header') && activeHeader) {
             teamSection.style.backgroundImage = defaultTeamBg;
             descriptionText.textContent = descriptionText.getAttribute('data-default');
             teamMemberTitle.textContent = teamMemberTitle.getAttribute('data-default');
             activeHeader = null;
         }
     });
     ```
2. **Modify `index.html`:**
   - Remove the `hoverable` class from the team `header` `<h1>` elements.

---

## 6. Contacts Section: LKPR and LKLT Addresses
**Goal:** Display two distinct addresses and map locations.

### Tasks:
1. **Modify `index.html`:**
   - In the `#contact` section (approx. line 665), restructure the layout.
   - Currently, there is a `row` with contact icons on the left (`col-md-6`) and a single Google Map on the right (`col-md-6`).
   - We will split the address details to explicitly list LKLT and LKPR.
   - **Address Block Updates:** Add two distinct address blocks with location pins.
   - **Map Updates:** Either stack two smaller maps, use a tabbed interface to switch between LKLT and LKPR maps, or link the pins directly to Google Maps and keep a central map zoomed out to show both. *Recommended: Add a tab toggle or two distinct side-by-side cards.*
2. **Localization (`src/data/en.json` & `cs.json`):**
   - Add translation keys for the new base names and addresses.
   ```json
   "contact-address-lklt": "LKLT Base: Hůlkova, 197 00 Praha 19",
   "contact-address-lkpr": "LKPR Base: Aviatická, 161 00 Praha 6"
   ```
3. **CSS Updates (`src/css/style.css`):**
   - Ensure the new dual-address layout remains responsive on mobile devices.
