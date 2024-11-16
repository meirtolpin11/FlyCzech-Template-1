// Get all the hoverable headers
const fleetHeaders = document.querySelectorAll('.fleet-header');

// Default elements and content
const fleetElement = document.getElementById('fleet');
const fleetVideo = document.getElementById('fleet-video');
const fleetDescriptionText = document.getElementById('fleet-text');
const fleetTitle = document.getElementById('fleet-title');
const aircraftReg = document.getElementById('aircraft-reg');
const priceElement = document.getElementById('price');
const rangeElement = document.getElementById('range');
const nightRatedElement = document.getElementById('night-rated');
const avionicsTypeElement = document.getElementById('avionics-type');
const aircraftInfo = document.getElementById('aircraft-info');

// Default content
let defaultBackgroundImage = ''; // Initially empty, updated on background click
let isDefaultView = true; // Tracks whether the default view is active
let isPermanentView = false; // Tracks whether the details are permanent (set by click)

const defaultBackgroundVideo = 'assets/videos/fleet/fleet.mov';
const defaultDescription = 'Discover our fleet of top-class aircraft, each designed to offer an exceptional flying experience.';
const defaultTitle = 'Our Fleet';
const defaultReg = '';
const defaultPrice = '';
const defaultRange = '';
const defaultNightRated = '';
const defaultAvionics = '';

// Function to reset to the default view
function resetToDefault() {
    isDefaultView = true; // Mark default view as active
    isPermanentView = false; // Mark permanent view as inactive
    fleetVideo.style.display = 'block'; // Show the video
    fleetElement.style.backgroundImage = ''; // Remove any background image

    // Reset text content to defaults
    fleetDescriptionText.textContent = defaultDescription;
    fleetTitle.textContent = defaultTitle;
    aircraftReg.textContent = defaultReg;
    priceElement.textContent = defaultPrice;
    rangeElement.textContent = defaultRange;
    nightRatedElement.textContent = defaultNightRated;
    avionicsTypeElement.textContent = defaultAvionics;
    aircraftInfo.style.display = 'none'; // Hide the aircraft info
}

// Hover behavior for headers (temporary view)
fleetHeaders.forEach(header => {
    header.addEventListener('mouseenter', function () {
        if (isPermanentView) return; // Ignore hover if in permanent view

        const imageUrl = this.getAttribute('data-image');
        const description = this.getAttribute('data-description');
        const title = this.getAttribute('data-title');
        const reg = this.getAttribute('data-aircraft-reg');
        const price = this.getAttribute('data-price');
        const range = this.getAttribute('data-range');
        const nightRated = this.getAttribute('data-night-rated');
        const avionics = this.getAttribute('data-avionics');

        fleetVideo.style.display = 'none'; // Hide the video
        fleetElement.style.backgroundImage = `url(${imageUrl})`; // Set the image
        fleetDescriptionText.textContent = description;
        fleetTitle.textContent = title;
        aircraftReg.textContent = reg;
        priceElement.textContent = price;
        rangeElement.textContent = range;
        nightRatedElement.textContent = nightRated;
        avionicsTypeElement.textContent = avionics;
        aircraftInfo.style.display = 'block'; // Show the aircraft info
    });

    // On hover out, revert to the default view if not permanent
    header.addEventListener('mouseleave', function () {
        if (isPermanentView) return; // Don't reset if permanent view is active
        resetToDefault();
    });

    header.addEventListener('click', function () {
        isPermanentView = true; // Mark permanent view as active

        // Set the clicked airplane as the persistent view
        const imageUrl = this.getAttribute('data-image');
        defaultBackgroundImage = `url(${imageUrl})`;

        // Update persistent defaults
        fleetVideo.style.display = 'none'; // Hide the video
        fleetElement.style.backgroundImage = defaultBackgroundImage; // Set the persistent image
        fleetDescriptionText.textContent = this.getAttribute('data-description');
        fleetTitle.textContent = this.getAttribute('data-title');
        aircraftReg.textContent = this.getAttribute('data-aircraft-reg');
        priceElement.textContent = this.getAttribute('data-price');
        rangeElement.textContent = this.getAttribute('data-range');
        nightRatedElement.textContent = this.getAttribute('data-night-rated');
        avionicsTypeElement.textContent = this.getAttribute('data-avionics');
        aircraftInfo.style.display = 'block'; // Keep aircraft info visible
    });
});

// Event listener for the fleet background to restore the default view
fleetElement.addEventListener('click', function (event) {
    // Check if the click is outside the headers
    if (!event.target.closest('.fleet-header')) {
        resetToDefault(); // Reset to defaults
    }
});
