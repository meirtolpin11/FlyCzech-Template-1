// Get all the hoverable headers
const fleetHeaders = document.querySelectorAll('.header');

// Set the default background image
let defaultBackgroundImage = 'assets/images/fleet/all.jpg'; // Default image
let defaultDescription = 'Discover our fleet of top-class aircraft, each designed to offer an exceptional flying experience.';
let defaultTitle = 'Our Fleet';
let defaultReg = '';
let defaultPrice = '';
let defaultRange = '';
let defaultNightRated = '';
let defaultAvionics = '';

// Set the default background image
document.getElementById('fleet').style.backgroundImage = `url(${defaultBackgroundImage})`; // Set default background image

// Get the description paragraph elements
const fleetDescriptionText = document.getElementById('fleet-text');
const fleetTitle = document.getElementById('fleet-title');
const aircraftReg = document.getElementById('aircraft-reg');

// Get the aircraft information elements
const priceElement = document.getElementById('price');
const rangeElement = document.getElementById('range');
const nightRatedElement = document.getElementById('night-rated');
const avionicsTypeElement = document.getElementById('avionics-type');
const aircraftInfo = document.getElementById('aircraft-info');

// Function to change background image and description on hover
fleetHeaders.forEach(header => {
    header.addEventListener('mouseenter', function () {
        const imageUrl = this.getAttribute('data-image');
        const description = this.getAttribute('data-description');
        const title = this.getAttribute('data-title');
        const reg = this.getAttribute('data-aircraft-reg');
        const price = this.getAttribute('data-price');
        const range = this.getAttribute('data-range');
        const nightRated = this.getAttribute('data-night-rated');
        const avionics = this.getAttribute('data-avionics');

        // Change background image
        document.getElementById('fleet').style.backgroundImage = `url(${imageUrl})`;

        // Change description based on hover
        fleetDescriptionText.textContent = description;
        fleetTitle.textContent = title;
        aircraftReg.textContent = reg;

        // Update the aircraft details
        priceElement.textContent = price;
        rangeElement.textContent = range;
        nightRatedElement.textContent = nightRated;
        avionicsTypeElement.textContent = avionics;

        // Show the aircraft info when hovering
        aircraftInfo.style.display = 'block';
    });

    header.addEventListener('mouseleave', function () {
        // Revert to the selected default background image and other default values
        document.getElementById('fleet').style.backgroundImage = `url(${defaultBackgroundImage})`;

        // Revert back to the default description
        fleetDescriptionText.textContent = defaultDescription;
        fleetTitle.textContent = defaultTitle;
        aircraftReg.textContent = defaultReg;  // Clear aircraft registration info

        // Clear the aircraft details
        priceElement.textContent = defaultPrice;
        rangeElement.textContent = defaultRange;
        nightRatedElement.textContent = defaultNightRated;
        avionicsTypeElement.textContent = defaultAvionics;

        // Hide the aircraft info when not hovering
        if (!defaultTitle) {
            aircraftInfo.style.display = 'none';
        }
    });

    header.addEventListener('click', function () {
        // Set the default values based on the clicked header
        defaultBackgroundImage = this.getAttribute('data-image');
        defaultDescription = this.getAttribute('data-description');
        defaultTitle = this.getAttribute('data-title');
        defaultReg = this.getAttribute('data-aircraft-reg');
        defaultPrice = this.getAttribute('data-price');
        defaultRange = this.getAttribute('data-range');
        defaultNightRated = this.getAttribute('data-night-rated');
        defaultAvionics = this.getAttribute('data-avionics');

        console.log('New Default Values:');
        console.log('Background:', defaultBackgroundImage);
        console.log('Description:', defaultDescription);
        console.log('Title:', defaultTitle);
        console.log('Price:', defaultPrice);
        console.log('Range:', defaultRange);
        console.log('Night Rated:', defaultNightRated);
        console.log('Avionics:', defaultAvionics);

        // Immediately update the UI with the selected defaults (optional)
        document.getElementById('fleet').style.backgroundImage = `url(${defaultBackgroundImage})`;
        fleetDescriptionText.textContent = defaultDescription;
        fleetTitle.textContent = defaultTitle;
        aircraftReg.textContent = defaultReg;
        priceElement.textContent = defaultPrice;
        rangeElement.textContent = defaultRange;
        nightRatedElement.textContent = defaultNightRated;
        avionicsTypeElement.textContent = defaultAvionics;

        // Show the aircraft info by default
        aircraftInfo.style.display = 'block';
    });
});
