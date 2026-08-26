# Task 5: Our Team Section Click-Only Interaction

## Objective
Convert team member selection from hover triggers to deliberate click/press interactions, matching the fleet section UX model with toggle-off and click-outside reset behavior.

---

## Target Files & Assets

| File / Asset | Location | Action |
|---|---|---|
| **Team Script** | `src/js/our-team.js` | Remove hover listeners, implement click toggle & click-outside reset |
| **Team Styles** | `src/css/components/our-team.css` | Add pointer cursor and active selection styling |
| **Team HTML** | `index.html` (lines ~588–653) | Clean up hover classes and verify attributes |

---

## Detailed Step-by-Step Implementation

### Step 1: Refactor `src/js/our-team.js`

1. **Remove Hover Event Listeners:**
   - Remove `header.addEventListener('mouseenter', ...)` and `header.addEventListener('mouseleave', ...)`.

2. **Implement Click Selection & Reset Logic:**
   ```javascript
   const headers         = document.querySelectorAll('.header');
   const teamSection     = document.getElementById('our-team');
   const descriptionText = document.getElementById('description-text');
   const teamMemberTitle = document.getElementById('team-member-title');

   const defaultTeamBg = 'url("assets/images/team/all.jpg")';
   teamSection.style.backgroundImage = defaultTeamBg;

   let activeHeader = null;

   function resetTeamSection() {
       teamSection.style.backgroundImage = defaultTeamBg;
       descriptionText.textContent = descriptionText.getAttribute('data-default') || '';
       teamMemberTitle.textContent = teamMemberTitle.getAttribute('data-default') || '';
       descriptionText.removeAttribute('keep-text');
       teamMemberTitle.removeAttribute('keep-text');
       if (activeHeader) {
           activeHeader.classList.remove('active');
           activeHeader = null;
       }
   }

   headers.forEach(header => {
       header.addEventListener('click', function (e) {
           e.stopPropagation();

           // If already active, toggle off back to team overview
           if (activeHeader === this) {
               resetTeamSection();
               return;
           }

           // Deactivate previous active member
           if (activeHeader) {
               activeHeader.classList.remove('active');
           }

           // Activate clicked member
           this.classList.add('active');
           activeHeader = this;

           descriptionText.setAttribute('keep-text', '1');
           teamMemberTitle.setAttribute('keep-text', '1');

           teamSection.style.backgroundImage = `url(${this.getAttribute('data-image')})`;
           descriptionText.textContent = this.getAttribute('data-description');
           teamMemberTitle.textContent = this.getAttribute('data-title');
       });
   });

   // Reset on click outside headers
   document.addEventListener('click', function (e) {
       if (!e.target.closest('.header') && !e.target.closest('.paragraph-section') && activeHeader) {
           resetTeamSection();
       }
   });
   ```

### Step 2: Update CSS in `src/css/components/our-team.css`
- Ensure `.header` has `cursor: pointer;` and `user-select: none;`.
- Add active highlight styles for `.header.active`:
  ```css
  .our-team-background .header {
      cursor: pointer;
      user-select: none;
  }

  .our-team-background .header.active {
      opacity: 1 !important;
      color: #e5a93c !important;
  }
  ```

---

## Verification & Testing Checklist

- [ ] Hovering over Josef Pavlíček or Robert Scribuck does NOT change the background image or bio text.
- [ ] Clicking on Josef updates the background photo to Josef's image and renders his title and bio.
- [ ] Clicking on Robert seamlessly switches background photo, title, and bio to Robert.
- [ ] Clicking on the currently active team member toggles the view back to the team overview (`all.jpg`) and default intro text.
- [ ] Clicking outside the names on the section background resets to the team overview.
- [ ] Mobile swiper team slides continue to expand/collapse biographies properly on tap.
