// ---------------------------------------------------------------------------
// Fleet section — interactive aircraft display
// ---------------------------------------------------------------------------

// DOM references
const resetMessage         = document.getElementById('reset-message');
const fleetHeaders         = document.querySelectorAll('.fleet-header');
const fleetElement         = document.getElementById('fleet');
const fleetVideo           = document.getElementById('fleet-video');
const fleetDescriptionText = document.getElementById('fleet-text');
const fleetTitle           = document.getElementById('fleet-title');
const aircraftReg          = document.getElementById('aircraft-reg');
const priceElement         = document.getElementById('price');
const rangeElement         = document.getElementById('range');
const speedElement         = document.getElementById('speed');
const nightRatedElement    = document.getElementById('night-rated');
const avionicsTypeElement  = document.getElementById('avionics-type');
const aircraftInfo         = document.getElementById('aircraft-info');
const aircraftMoreInfo     = document.getElementById('aircraft-more-info');

// ---------------------------------------------------------------------------
// State machine — 'DEFAULT' | 'CLICKED'
// ---------------------------------------------------------------------------
const FLEET_STATE = { DEFAULT: 'DEFAULT', CLICKED: 'CLICKED' };
let state = FLEET_STATE.DEFAULT;
let activeHeader = null;

// Consolidated timers — always clear via clearAllTimers()
const timers = { fadeIn: null, fadeOut: null, bgRemove: null };
function clearAllTimers() {
    clearTimeout(timers.fadeIn);
    clearTimeout(timers.fadeOut);
    clearTimeout(timers.bgRemove);
}

// Image object reused across interactions
const currentImg = new Image();

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function showAircraftInfo(data) {
    fleetDescriptionText.setAttribute('keep-text', '1');
    fleetTitle.setAttribute('keep-text', '1');
    fleetDescriptionText.textContent = data.description;
    fleetTitle.textContent           = data.title;
    aircraftReg.textContent          = data.reg;
    priceElement.textContent         = data.price;
    rangeElement.textContent         = data.range;
    speedElement.textContent         = data.speed;
    nightRatedElement.textContent    = data.nightRated;
    avionicsTypeElement.textContent  = data.avionics;
    aircraftInfo.style.display       = 'block';
    if (data.url) {
        aircraftMoreInfo.href = data.url;
        aircraftMoreInfo.style.display = 'block';
    } else {
        aircraftMoreInfo.style.display = 'none';
    }
}

function readHeaderData(header) {
    return {
        imageUrl:    header.getAttribute('data-image'),
        description: header.getAttribute('data-description'),
        title:       header.getAttribute('data-title'),
        reg:         header.getAttribute('data-aircraft-reg'),
        price:       header.getAttribute('data-price'),
        range:       header.getAttribute('data-range'),
        speed:       header.getAttribute('data-speed'),
        nightRated:  header.getAttribute('data-night-rated'),
        avionics:    header.getAttribute('data-avionics'),
        url:         header.getAttribute('data-url'),
    };
}

// ---------------------------------------------------------------------------
// State transitions
// ---------------------------------------------------------------------------
function setState(newState, data) {
    state = newState;

    if (newState === FLEET_STATE.DEFAULT) {
        clearAllTimers();

        fleetDescriptionText.textContent = fleetDescriptionText.getAttribute('data-default');
        fleetTitle.textContent           = fleetTitle.getAttribute('data-default');
        fleetDescriptionText.removeAttribute('keep-text');
        fleetTitle.removeAttribute('keep-text');
        aircraftReg.textContent         = '';
        priceElement.textContent        = '';
        rangeElement.textContent        = '';
        speedElement.textContent        = '';
        nightRatedElement.textContent   = '';
        avionicsTypeElement.textContent = '';
        aircraftInfo.style.display      = 'none';
        aircraftMoreInfo.style.display  = 'none';
        if (resetMessage) resetMessage.style.display = 'none';

        fleetVideo.style.display = 'block';
        fleetVideo.style.opacity = '0';
        timers.fadeIn = setTimeout(() => {
            fleetVideo.style.transition = 'opacity 0.5s ease';
            fleetVideo.style.opacity    = '1';
            timers.bgRemove = setTimeout(() => {
                currentImg.onload = null;
                fleetElement.style.backgroundImage = '';
            }, 300);
        }, 10);

    } else if (newState === FLEET_STATE.CLICKED) {
        clearAllTimers();

        const imageUrl = (data.imageUrl || '').replace(/^url\(['"]?|['"]?\)$/g, '').trim();
        currentImg.onload = () => {
            fleetElement.style.backgroundImage = `url("${imageUrl}")`;
            fleetVideo.style.display = 'none';
        };
        if (imageUrl) {
            currentImg.src = imageUrl;
            if (currentImg.complete && currentImg.naturalWidth !== 0) {
                fleetElement.style.backgroundImage = `url("${imageUrl}")`;
                fleetVideo.style.display = 'none';
            }
        }

        showAircraftInfo(data);
        if (resetMessage) resetMessage.style.display = 'block';
    }
}

// ---------------------------------------------------------------------------
// Event listeners
// ---------------------------------------------------------------------------
fleetHeaders.forEach(header => {
    function toggleHeader(e) {
        e.stopPropagation();

        // Toggle off if clicking the currently active aircraft
        if (activeHeader === header) {
            setState(FLEET_STATE.DEFAULT);
            header.classList.remove('active');
            activeHeader = null;
            return;
        }

        // Deactivate previous header
        if (activeHeader) {
            activeHeader.classList.remove('active');
        }

        // Activate clicked header
        header.classList.add('active');
        activeHeader = header;

        const data = readHeaderData(header);
        setState(FLEET_STATE.CLICKED, data);
    }

    header.addEventListener('click', toggleHeader);
    header.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleHeader(e);
        }
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
