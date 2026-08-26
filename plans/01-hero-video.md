# Task 1: Hero Section Video Update

## Objective
Replace the generic placeholder hero video (`assets/images/per.mov`) with official FlyCzech branding video footage, optimized for web streaming with poster fallback and reduced-motion accessibility.

---

## Target Files & Assets

| File / Asset | Location | Action |
|---|---|---|
| **Video Asset** | `assets/images/flyczech-hero.mp4` (or `assets/videos/flyczech-hero.mp4`) | Add web-optimized MP4 (H.264 / AAC) |
| **Poster Image** | `assets/images/bg/hero-1.jpg` (or `assets/images/flyczech-hero-poster.jpg`) | Set as video poster fallback |
| **Hero HTML** | `index.html` (lines ~148–153) | Update `<video>` and `<source>` elements |
| **Video Script** | `src/js/video.js` | Verify autoplay and reduced-motion handling |

---

## Detailed Step-by-Step Implementation

### Step 1: Asset Preparation
- Ensure the video is encoded as `.mp4` using H.264 video codec and AAC audio codec for universal browser compatibility.
- Ensure the poster fallback image is lightweight and matches the initial frame of the video.

### Step 2: Update `index.html`
Locate the Hero slide video element in `index.html` (~line 148):

```html
<!-- BEFORE -->
<video preload="none" id="background-video-1" class="background-video" playsinline muted autoplay muted
  loop preload="none" poster="assets/images/bg/hero-1.jpg">
  <source id="video-source-1" src="assets/images/per.mov" type="video/mp4">
</video>

<!-- AFTER -->
<video preload="metadata" id="background-video-hero" class="background-video" playsinline muted autoplay loop poster="assets/images/bg/hero-1.jpg">
  <source id="video-source-hero" src="assets/images/flyczech-hero.mp4" type="video/mp4">
</video>
```

*Note: Clean up duplicated attributes (`muted`, `preload`) and ensure unique ID (`background-video-hero` or keep `background-video-1` if referenced in `video.js`).*

### Step 3: Verify / Update `src/js/video.js`
Ensure `src/js/video.js` properly plays the video on load while respecting user accessibility settings:

```javascript
window.addEventListener('load', function () {
    const heroVideo = document.getElementById("background-video-hero") || document.getElementById("background-video-1");
    if (heroVideo && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        heroVideo.play().catch(err => {
            console.warn('Autoplay prevented by browser policy:', err);
        });
    }
});
```

---

## Verification & Testing Checklist

- [ ] Video autoplays seamlessly on desktop Chrome, Firefox, Safari, and Edge.
- [ ] Video loops continuously without black flicker between iterations.
- [ ] Mobile devices (iOS / Android) correctly display either inline video or poster image without breaking layout.
- [ ] Accessibility: Video pauses or does not autoplay when OS `prefers-reduced-motion` is enabled.
- [ ] Fallback: Poster image renders immediately while video stream buffers.
