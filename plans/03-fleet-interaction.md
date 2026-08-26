# Task 3: Fleet Section Click-Only Interaction & Removal of Auto-Switching

## Objective
Refactor the aircraft fleet section to eliminate distracting automatic image cycling and hover triggers. Aircraft details and background imagery must only activate upon deliberate click/press by the user.

---

## Target Files & Assets

| File / Asset | Location | Action |
|---|---|---|
| **Fleet Script** | `src/js/fleet.js` | Remove hover listeners, remove `setInterval` rotation, implement click toggle & outside reset |
| **Fleet Styles** | `src/css/components/fleet.css` | Update pointer cursor, active aircraft highlight styling |
| **Fleet HTML** | `index.html` (lines ~393–460) | Remove unnecessary hover classes, ensure accessibility attributes |

---

## Detailed Step-by-Step Implementation

### Step 1: Refactor `src/js/fleet.js`

1. **Simplify State Machine:**
   - Retain two core states: `FLEET_STATE.DEFAULT` and `FLEET_STATE.CLICKED`.
   - Remove `FLEET_STATE.HOVER`.

2. **Remove Auto-Rotation Timers:**
   - Delete `imageRotationInterval`, `stopImageRotation()`, and related interval timers.
   - Delete the `IntersectionObserver` observing fleet rotation.

3. **Remove Hover Event Listeners:**
   - Remove `mouseenter` and `mouseleave` listeners from `fleetHeaders`.

4. **Implement Robust Click Toggle Logic:**
   ```javascript
   let activeHeader = null;

   fleetHeaders.forEach(header => {
       header.addEventListener('click', function (e) {
           e.stopPropagation();

           // Toggle off if clicking the currently active aircraft
           if (activeHeader === this) {
               setState(FLEET_STATE.DEFAULT);
               this.classList.remove('active');
               activeHeader = null;
               return;
           }

           // Deactivate previous header
           if (activeHeader) {
               activeHeader.classList.remove('active');
           }

           // Activate clicked header
           this.classList.add('active');
           activeHeader = this;

           const data = readHeaderData(this);
           setState(FLEET_STATE.CLICKED, data);
       });
   });

   // Reset to default overview when clicking outside aircraft titles
   document.addEventListener('click', function (e) {
       if (!e.target.closest('.fleet-header') && !e.target.closest('#aircraft-info') && activeHeader) {
           setState(FLEET_STATE.DEFAULT);
           if (activeHeader) activeHeader.classList.remove('active');
           activeHeader = null;
       }
   });
   ```

5. **Update `setState(FLEET_STATE.DEFAULT)`:**
   - Ensure clean transition back to the default overview video (`fleetVideo.style.display = 'block'`).
   - Clear info box and reset text elements to their `data-default` values.

### Step 2: Update CSS in `src/css/components/fleet.css`
- Ensure `.fleet-header` has `cursor: pointer;`.
- Add active highlight styles for `.fleet-header.active`:
  ```css
  .fleet-header {
      cursor: pointer;
      user-select: none;
  }

  .fleet-header.active {
      opacity: 1 !important;
      color: #e5a93c !important; /* Brand accent highlight */
  }
  ```

### Step 3: Verify HTML in `index.html`
- Verify aircraft names have correct `data-*` attributes for specs, description, registration, and price.
- Clean up any `.hoverable` classes if obsolete.

---

## Verification & Testing Checklist

- [ ] Moving mouse cursor over aircraft names does NOT trigger background or text changes.
- [ ] No automatic image rotation occurs after any duration of inactivity.
- [ ] Clicking an aircraft (e.g. Cessna 172) smoothly loads its static photo, title, registration, and technical specs.
- [ ] Clicking the active aircraft again reverts smoothly back to default fleet video background.
- [ ] Clicking outside the aircraft list on the background resets the view to default.
- [ ] Touch taps on mobile/tablet viewports trigger selection without double-tap delay.
