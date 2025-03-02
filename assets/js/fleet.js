// Get the reset message element
const resetMessage = document.getElementById('reset-message');

// Default elements and content
const fleetHeaders = document.querySelectorAll('.fleet-header');
const fleetElement = document.getElementById('fleet');
const fleetVideo = document.getElementById('fleet-video');
const fleetDescriptionText = document.getElementById('fleet-text');
const fleetTitle = document.getElementById('fleet-title');
const aircraftReg = document.getElementById('aircraft-reg');
const priceElement = document.getElementById('price');
const rangeElement = document.getElementById('range');
const speedElement = document.getElementById('speed');
const nightRatedElement = document.getElementById('night-rated');
const avionicsTypeElement = document.getElementById('avionics-type');
const aircraftInfo = document.getElementById('aircraft-info');

// Default content
let defaultBackgroundImage = ''; // Initially empty, updated on background click
let isDefaultView = true; // Tracks whether the default view is active
let isPermanentView = false; // Tracks whether the details are permanent (set by click)
let clickedHeaderData = null; // Store the data of the clicked header for later use

const defaultBackgroundVideo = 'assets/videos/fleet/fleet.mov';
const defaultReg = '';
const defaultPrice = '';
const defaultRange = '';
const defaultSpeed = '';
const defaultNightRated = '';
const defaultAvionics = '';

let imageRotationInterval = null; // Stores the interval for image rotation

let mouseEnterTimeout = null;
let resetTimeout = null

function resetToDefault() {
    isDefaultView = true; // Mark default view as active
    isPermanentView = false; // Mark permanent view as inactive
    clickedHeaderData = null; // Reset clicked header data

    clearTimeout(mouseEnterTimeout)
    clearTimeout(resetTimeout)

    // Reset text content to defaults
    fleetDescriptionText.textContent = fleetDescriptionText.getAttribute('data-default');
    fleetTitle.textContent = fleetTitle.getAttribute('data-default');
    fleetDescriptionText.removeAttribute('keep-text');
    fleetTitle.removeAttribute('keep-text');


    aircraftReg.textContent = defaultReg;
    priceElement.textContent = defaultPrice;
    rangeElement.textContent = defaultRange;
    speedElement.textContent = defaultSpeed;
    nightRatedElement.textContent = defaultNightRated;
    avionicsTypeElement.textContent = defaultAvionics;
    aircraftInfo.style.display = 'none'; // Hide the aircraft info

    // Hide reset message when reset
    resetMessage.style.display = 'none';

    // Ensure the video is in the DOM and starts hidden
    fleetVideo.style.display = 'block';
    fleetVideo.style.opacity = '0';

    // Fade in the video
    resetTimeout = setTimeout(() => {
        fleetVideo.style.transition = 'opacity 0.5s ease'; // Smooth fade
        fleetVideo.style.opacity = '1'; // Start fading in

        // Remove the background photo after the fade-in completes
        setTimeout(() => {
            currentImg.onload = null
            fleetElement.style.backgroundImage = ''; // Remove the photo
        }, 300); // Match the fade-in duration (0.5s)
    }, 10); // Small delay to ensure CSS transition applies
}

let currentImg = new Image(); // Create single image object
let currentImgInterval = new Image(); // Create single image object

// Hover behavior for headers (temporary view)
fleetHeaders.forEach(header => {
    header.addEventListener('mouseenter', function () {
        if (isPermanentView && !clickedHeaderData) return; // Ignore hover if permanent view is active and no clicked header data

        console.log("mouse enter - clear timeout")
        clearTimeout(mouseEnterTimeout)
        clearTimeout(resetTimeout)

        const imageUrl = this.getAttribute('data-image');
        const description = this.getAttribute('data-description');
        const title = this.getAttribute('data-title');
        const reg = this.getAttribute('data-aircraft-reg');
        const price = this.getAttribute('data-price');
        const range = this.getAttribute('data-range');
        const speed = this.getAttribute('data-speed');
        const nightRated = this.getAttribute('data-night-rated');
        const avionics = this.getAttribute('data-avionics');

        if (imageUrl == null) {
            return
        }

        // Start rotating random images
        let imageIndex = 1;
        const imageUrlWithoutExtension = imageUrl.replace('.jpg', '');
        const randomImageUrl = `${imageUrlWithoutExtension}-${imageIndex}.jpg`;

        // Cancel any previous onload handler
        console.log('Setting initial image:', randomImageUrl);
        currentImg.onload = null;
        currentImg.onload = () => {
            console.log('Initial image loaded');
            fleetElement.style.backgroundImage = `url(${randomImageUrl})`;

            // Fade out the video
            fleetVideo.style.opacity = '0';
            fleetVideo.style.transition = 'opacity 0.5s ease';
        };
        currentImg.src = randomImageUrl;

        imageIndex = (imageIndex % 3) + 1; // Cycle through images 1 to 3

        imageRotationInterval = setInterval(() => {
            const imageUrlWithoutExtension = imageUrl.replace('.jpg', '');
            const randomImageUrl = `${imageUrlWithoutExtension}-${imageIndex}.jpg`;
            console.log('Rotating to image:', randomImageUrl);

            // Cancel previous onload handler
            currentImgInterval.onload = null;

            // Set new onload handler and src
            currentImgInterval.onload = () => {
                console.log('Rotated image loaded');

                // Show reset message when hovering over header
                resetMessage.style.display = 'block';

                // Fade out the video
                fleetVideo.style.opacity = '0';
                fleetVideo.style.transition = 'opacity 0.5s ease';

                // After the fade-out completes, set display: none
                mouseEnterTimeout = setTimeout(() => {
                    console.log('Video fade out complete');
                    fleetVideo.style.display = 'none';
                }, 300); // Match the transition duration

                fleetElement.style.backgroundImage = `url(${randomImageUrl})`;
            };
            currentImgInterval.src = randomImageUrl;

            imageIndex = (imageIndex % 3) + 1; // Cycle through images 1 to 3
        }, 3000);


        fleetDescriptionText.setAttribute('keep-text', '1');
        fleetTitle.setAttribute('keep-text', '1');
        fleetDescriptionText.textContent = description;
        fleetTitle.textContent = title;
        aircraftReg.textContent = reg;
        priceElement.textContent = price;
        rangeElement.textContent = range;
        speedElement.textContent = speed;
        nightRatedElement.textContent = nightRated;
        avionicsTypeElement.textContent = avionics;
        aircraftInfo.style.display = 'block'; // Show the aircraft info

    });

    // On hover out, revert to the clicked header's details if permanent
    header.addEventListener('mouseleave', function () {
        console.log("mouse-leave")
        clearInterval(imageRotationInterval); // Stop rotating images
        imageRotationInterval = null;

        if (isPermanentView && clickedHeaderData) {
            currentImg.onload = null
            // Revert to the clicked header details with the selected random image
            fleetElement.style.backgroundImage = clickedHeaderData.imageUrl;
            fleetDescriptionText.textContent = clickedHeaderData.description;
            fleetDescriptionText.setAttribute('keep-text', '1');
            fleetTitle.textContent = clickedHeaderData.title;
            fleetTitle.setAttribute('keep-text', '1');
            aircraftReg.textContent = clickedHeaderData.reg;
            priceElement.textContent = clickedHeaderData.price;
            rangeElement.textContent = clickedHeaderData.range;
            speedElement.textContent = clickedHeaderData.speed;
            nightRatedElement.textContent = clickedHeaderData.nightRated;
            avionicsTypeElement.textContent = clickedHeaderData.avionics;
            aircraftInfo.style.display = 'block'; // Keep aircraft info visible
        } else {
            resetToDefault(); // Revert to default if not permanent
        }
    });

    header.addEventListener('click', function (e) {
        // Skip if clicked element has id "reset-message"
        if (e.target.id === 'reset-message') {
            return;
        }

        isPermanentView = true; // Mark permanent view as active

        // Store clicked header's data for later use
        clickedHeaderData = {
            imageUrl: fleetElement.style.backgroundImage, // Use the random image URL
            description: this.getAttribute('data-description'),
            title: this.getAttribute('data-title'),
            reg: this.getAttribute('data-aircraft-reg'),
            price: this.getAttribute('data-price'),
            range: this.getAttribute('data-range'),
            speed: this.getAttribute('data-speed'),
            nightRated: this.getAttribute('data-night-rated'),
            avionics: this.getAttribute('data-avionics')
        };


        currentImg.onload = null;
        currentImg.onload = () => {
            fleetElement.style.backgroundImage = `url(${clickedHeaderData.imageUrl.trim()})`; // Set background after load

            // Update persistent view
            fleetVideo.style.display = 'none'; // Hide the video
        };
        // Extract the URL from the background-image CSS property and remove url() wrapper
        const imageUrl = clickedHeaderData.imageUrl.replace(/^url\(['"]?|['"]?\)$/g, '').trim();
        currentImg.src = imageUrl;

        fleetDescriptionText.textContent = clickedHeaderData.description;
        fleetDescriptionText.setAttribute('keep-text', 1);
        fleetTitle.textContent = clickedHeaderData.title;
        fleetTitle.setAttribute('keep-text', 1);
        aircraftReg.textContent = clickedHeaderData.reg;
        priceElement.textContent = clickedHeaderData.price;
        rangeElement.textContent = clickedHeaderData.range;
        speedElement.textContent = clickedHeaderData.speed;
        nightRatedElement.textContent = clickedHeaderData.nightRated;
        avionicsTypeElement.textContent = clickedHeaderData.avionics;
        aircraftInfo.style.display = 'block'; // Keep aircraft info visible

        // Hide reset message when clicked
        resetMessage.style.display = 'block';
    });
});

// Event listener for the fleet background to restore the default view
fleetElement.addEventListener('click', function (event) {
    // Check if the click is outside the headers
    if (!event.target.closest('.fleet-header')) {
        resetToDefault(); // Reset to defaults
    }
});
