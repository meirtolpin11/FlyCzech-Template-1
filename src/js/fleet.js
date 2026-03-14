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
// State machine — 'DEFAULT' | 'HOVER' | 'CLICKED'
// ---------------------------------------------------------------------------
const FLEET_STATE = { DEFAULT: 'DEFAULT', HOVER: 'HOVER', CLICKED: 'CLICKED' };
let state = FLEET_STATE.DEFAULT;
let clickedHeaderData = null;

// Consolidated timers — always clear via clearAllTimers()
const timers = { fadeIn: null, fadeOut: null, bgRemove: null };
function clearAllTimers() {
    clearTimeout(timers.fadeIn);
    clearTimeout(timers.fadeOut);
    clearTimeout(timers.bgRemove);
}

// Image objects reused across interactions
const currentImg         = new Image();
const currentImgInterval = new Image();
let imageRotationInterval = null;

// Pause image rotation when the fleet section scrolls out of view
const fleetObserver = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) stopImageRotation();
}, { threshold: 0.1 });
fleetObserver.observe(fleetElement);

function stopImageRotation() {
    clearInterval(imageRotationInterval);
    imageRotationInterval = null;
    currentImgInterval.onload = null;
}

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
        aircraftMoreInfo.style.display = 'inline-block';
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
        clickedHeaderData = null;
        clearAllTimers();
        stopImageRotation();

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
        resetMessage.style.display      = 'none';

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

    } else if (newState === FLEET_STATE.HOVER) {
        if (!data.imageUrl) return;
        clearAllTimers();
        stopImageRotation();

        let imageIndex = 1;
        const baseUrl  = data.imageUrl.replace('.jpg', '');
        const firstUrl = `${baseUrl}-${imageIndex}.jpg`;

        // Assign onload BEFORE setting src to avoid cached-image race condition
        currentImg.onload = null;
        currentImg.onload = () => {
            fleetElement.style.backgroundImage = `url(${firstUrl})`;
            resetMessage.style.display = 'block';

            fleetVideo.style.opacity    = '0';
            fleetVideo.style.transition = 'opacity 0.5s ease';
            timers.fadeOut = setTimeout(() => {
                fleetVideo.style.display = 'none';
            }, 300);

            imageIndex = (imageIndex % 3) + 1;
            imageRotationInterval = setInterval(() => {
                const rotatedUrl = `${baseUrl}-${imageIndex}.jpg`;
                currentImgInterval.onload = null;
                currentImgInterval.onload = () => {
                    fleetElement.style.backgroundImage = `url(${rotatedUrl})`;
                };
                currentImgInterval.src = rotatedUrl;
                imageIndex = (imageIndex % 3) + 1;
            }, 5000);
        };
        currentImg.src = firstUrl;

        showAircraftInfo(data);

    } else if (newState === FLEET_STATE.CLICKED) {
        clickedHeaderData = data;
        stopImageRotation();

        const imageUrl = data.imageUrl.replace(/^url\(['"]?|['"]?\)$/g, '').trim();
        currentImg.onload = null;
        currentImg.onload = () => {
            fleetElement.style.backgroundImage = `url(${imageUrl})`;
            fleetVideo.style.display = 'none';
        };
        currentImg.src = imageUrl;

        showAircraftInfo(data);
        resetMessage.style.display = 'block';
    }
}

// ---------------------------------------------------------------------------
// Event listeners
// ---------------------------------------------------------------------------
fleetHeaders.forEach(header => {
    header.addEventListener('mouseenter', function () {
        if (state === FLEET_STATE.CLICKED) return;
        setState(FLEET_STATE.HOVER, readHeaderData(this));
    });

    header.addEventListener('mouseleave', function () {
        stopImageRotation();
        currentImg.onload = null;

        if (state === FLEET_STATE.CLICKED && clickedHeaderData) {
            fleetElement.style.backgroundImage = clickedHeaderData.imageUrl;
            showAircraftInfo(clickedHeaderData);
        } else {
            setState(FLEET_STATE.DEFAULT);
        }
    });

    header.addEventListener('click', function (e) {
        if (e.target.id === 'reset-message') return;
        const data = readHeaderData(this);
        // If hover already set a rotation image, freeze it; otherwise start from -1
        if (state === FLEET_STATE.HOVER) {
            data.imageUrl = fleetElement.style.backgroundImage;
        } else {
            data.imageUrl = `url(${data.imageUrl.replace('.jpg', '')}-1.jpg)`;
        }
        setState(FLEET_STATE.CLICKED, data);
    });
});

fleetElement.addEventListener('click', function (event) {
    if (!event.target.closest('.fleet-header')) {
        setState(FLEET_STATE.DEFAULT);
    }
});
