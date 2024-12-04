let scrollTimeout;
const sectionNums = [0, 3, 4, 5]
const sections = {
    0: "#home",
    1: "#services",
    2: "#experience",
    3: "#fleet",
    4: "#our-team",
    5: "#contact"
};
let currentIndex = 0;


// Smooth scroll to a section
function jumpToSection(index) {
    console.log("jumping to " + index)
    if (index in sections) {
        // Scroll to the section
        console.log(sections[index])
        document.querySelector(sections[index]).scrollIntoView({ behavior: 'smooth' });
        updateActiveNav(index);
    }
}

// Update active class on the navbar
function updateActiveNav(index) {
    console.log("setting - " + index)
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link, i) => {
        if (i === index) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}


function prevButtonOn() {
    document.getElementById("prev-page-button").style.removeProperty("display");
}

function prevButtonOff() {
    document.getElementById("prev-page-button").style.display = "none";
}

function nextButtonOn() {
    document.getElementById("next-page-button").style.removeProperty("display");
}

function nextButtonOff() {
    document.getElementById("next-page-button").style.display = "none";
}


let latestScrollTime = null;
let timeBetweenScrolls = 100;

// Handle scroll/swipe navigation
function handleNavigation(direction) {
    if (direction === 'down') {
        const nextIndex = sectionNums.indexOf(currentIndex) + 1;
        if (nextIndex < sectionNums.length) {
            if (nextIndex === sectionNums.length - 1) {
                nextButtonOff();
            }
            jumpToSection(sectionNums[nextIndex]);
            prevButtonOn();
        }
    } else if (direction === 'up') {
        const prevIndex = sectionNums.indexOf(currentIndex) - 1;
        if (prevIndex >= 0) {
            if (prevIndex === 0) {
                prevButtonOff();
            }
            jumpToSection(sectionNums[prevIndex]);
            nextButtonOn();
        }
    }
}

// Throttle scroll/swipe events
function throttleEvent(callback) {
    if (latestScrollTime == null) {
        latestScrollTime = Date.now();
    } else if (Date.now() - latestScrollTime < timeBetweenScrolls) {
        latestScrollTime = Date.now();
        return false;
    }
    latestScrollTime = Date.now();
    return true;
}

// Handle wheel scrolling
window.addEventListener("wheel", function (e) {
    e.preventDefault();

    if (!throttleEvent()) return;

    if (e.deltaY > 0) {
        handleNavigation('down');
    } else {
        handleNavigation('up');
    }
}, { passive: false });

// Handle touch events for mobile
let touchStartY = 0;
window.addEventListener('touchstart', function (e) {
    touchStartY = e.touches[0].clientY;
}, { passive: false });

window.addEventListener('touchmove', function (e) {
    e.preventDefault();

    if (!throttleEvent()) return;

    const touchEndY = e.touches[0].clientY;
    const deltaY = touchStartY - touchEndY;


    if (deltaY > 0) {
        handleNavigation('down');
    } else {
        handleNavigation('up');
    }
}, { passive: false });


document.getElementById("next-page-button").addEventListener("click", (e) => {
    // Scrolling down
    const nextIndex = sectionNums.indexOf(currentIndex) + 1;
    if (nextIndex < sectionNums.length) {

        if (nextIndex == sectionNums.length - 1) {
            nextButtonOff()
        }
        jumpToSection(sectionNums[nextIndex]);
    }

    prevButtonOn()

});

document.getElementById("prev-page-button").addEventListener("click", (e) => {
    // Scrolling up
    const prevIndex = sectionNums.indexOf(currentIndex) - 1;
    if (prevIndex >= 0) {

        if (prevIndex == 0) {
            prevButtonOff()
        }

        index = sectionNums[prevIndex];
        jumpToSection(sectionNums[prevIndex]);
    }

    nextButtonOn();
});


// Handle clicks on navbar links
document.querySelectorAll(".nav-link").forEach((link, index) => {
    link.addEventListener("click", (e) => {
        e.preventDefault(); // Prevent default link behavior

        // Check if the clicked link is "Services"
        if (link.getAttribute('href') === "#services") {
            console.log("services")
            // If it's the "Services" link, handle the special behavior
            currentIndex = 0; // Set currentIndex to "home"
            jumpToSection(sectionNums[currentIndex]);

            // Then, move to the first slide after scrolling
            setTimeout(() => {
                swiper.slideTo(2); // Go to the first slide
                updateActiveNav(1);
                autoplay = false;

            }, 500); // Delay the slide change to allow smooth scroll to "home"
        } else if (link.getAttribute('href') === "#experience") {
            console.log("experience")
            // If it's the "Services" link, handle the special behavior
            currentIndex = 0; // Set currentIndex to "home"
            jumpToSection(sectionNums[currentIndex]);

            // Then, move to the first slide after scrolling
            setTimeout(() => {
                swiper.slideTo(3); // Go to the first slide
                updateActiveNav(2);
                autoplay = false;
            }, 500); // Delay the slide change to allow smooth scroll to "home"
        } else if (link.getAttribute('href') === "#home") {
            // If it's the "Services" link, handle the special behavior
            currentIndex = 0; // Set currentIndex to "home"
            jumpToSection(sectionNums[currentIndex]);

            // Then, move to the first slide after scrolling
            setTimeout(() => {
                swiper.slideTo(1); // Go to the first slide
                updateActiveNav(0);
                autoplay = true;
            }, 500); // Delay the slide change to allow smooth scroll to "home"
        } else {
            // Normal behavior for other navbar links
            currentIndex = sectionNums[index - 2];
            console.log(index, currentIndex)
            jumpToSection(currentIndex);
        }
    });
});

// Update navbar when scrolling manually
window.addEventListener("scroll", () => {
    let foundIndex = sectionNums.findIndex((index) => {
        const section = document.querySelector(sections[index]);  // Use sectionNums to reference sections
        const rect = section.getBoundingClientRect();
        return rect.top >= 0 && rect.top < window.innerHeight / 2; // Section is within view
    });

    if (foundIndex !== -1 && foundIndex !== sectionNums.indexOf(currentIndex)) {
        currentIndex = sectionNums[foundIndex];  // Get the actual section index
        updateActiveNav(currentIndex);  // Update active navbar
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".nav-link");
    const navbar = document.getElementById("navbar");

    // Handle nav link clicks
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            // Check if window width is less than 992px (for mobile devices)
            if (window.innerWidth < 992) {
                // Initialize Bootstrap Collapse for mobile
                const bsCollapse = new bootstrap.Collapse(navbar, {
                    toggle: false, // Don't toggle state, just hide
                });
                bsCollapse.hide(); // Collapse the navbar
            }
        });
    });

    // Handle clicks outside navbar
    document.addEventListener("click", (event) => {
        if (window.innerWidth < 992) {
            // Check if click is outside navbar and navbar is expanded
            if (!navbar.contains(event.target) && navbar.classList.contains("show")) {
                const bsCollapse = new bootstrap.Collapse(navbar, {
                    toggle: false
                });
                bsCollapse.hide();
            }
        }
    });
});
