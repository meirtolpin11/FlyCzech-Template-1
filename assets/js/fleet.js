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
let clickedHeaderData = null; // Store the data of the clicked header for later use

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
    clickedHeaderData = null; // Reset clicked header data
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
        if (isPermanentView && !clickedHeaderData) return; // Ignore hover if permanent view is active and no clicked header data

        // Temporarily show hover details
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

    // On hover out, revert to the clicked header's details if permanent
    header.addEventListener('mouseleave', function () {
        if (isPermanentView && clickedHeaderData) {
            // Revert to the clicked header details
            fleetElement.style.backgroundImage = clickedHeaderData.imageUrl;
            fleetDescriptionText.textContent = clickedHeaderData.description;
            fleetTitle.textContent = clickedHeaderData.title;
            aircraftReg.textContent = clickedHeaderData.reg;
            priceElement.textContent = clickedHeaderData.price;
            rangeElement.textContent = clickedHeaderData.range;
            nightRatedElement.textContent = clickedHeaderData.nightRated;
            avionicsTypeElement.textContent = clickedHeaderData.avionics;
            aircraftInfo.style.display = 'block'; // Keep aircraft info visible
        } else {
            resetToDefault(); // Revert to default if not permanent
        }
    });

    header.addEventListener('click', function () {
        isPermanentView = true; // Mark permanent view as active

        // Store clicked header's data for later use
        clickedHeaderData = {
            imageUrl: `url(${this.getAttribute('data-image')})`,
            description: this.getAttribute('data-description'),
            title: this.getAttribute('data-title'),
            reg: this.getAttribute('data-aircraft-reg'),
            price: this.getAttribute('data-price'),
            range: this.getAttribute('data-range'),
            nightRated: this.getAttribute('data-night-rated'),
            avionics: this.getAttribute('data-avionics')
        };

        // Update persistent view
        fleetVideo.style.display = 'none'; // Hide the video
        fleetElement.style.backgroundImage = clickedHeaderData.imageUrl; // Set the persistent image
        fleetDescriptionText.textContent = clickedHeaderData.description;
        fleetTitle.textContent = clickedHeaderData.title;
        aircraftReg.textContent = clickedHeaderData.reg;
        priceElement.textContent = clickedHeaderData.price;
        rangeElement.textContent = clickedHeaderData.range;
        nightRatedElement.textContent = clickedHeaderData.nightRated;
        avionicsTypeElement.textContent = clickedHeaderData.avionics;
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
