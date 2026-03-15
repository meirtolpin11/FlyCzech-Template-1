// Constants and state
const sectionNums = [0, 3, 4, 5];
const sections = {
    0: "#home",
    1: "#services",
    2: "#experience",
    3: "#fleet-div",
    4: "#team",
    5: "#contact"
};
let currentIndex = 0;
let isNavigating = false;       // lock during scroll animation
let touchStartY = 0;
let touchStartX = 0;
let touchStartTime = 0;

// Navigation functions
function jumpToSection(index) {
    if (index in sections) {
        isNavigating = true;
        const section = document.querySelector(sections[index]);
        const top = section.offsetTop;
        window.scrollTo({ top, behavior: 'smooth' });
        updateActiveNav(index);
        setTimeout(() => { isNavigating = false; }, 700);
    }
}

function updateActiveNav(index) {
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link, i) => {
        if (i === index) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}

// Button visibility functions
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

// Navigation handlers
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

// Event handlers
let wheelTimeout = null;
function handleWheelScroll(e) {
    e.preventDefault();
    if (isNavigating) return;
    if (wheelTimeout) return;          // ignore rapid wheel ticks (trackpad inertia)
    const direction = e.deltaY > 0 ? 'down' : 'up';
    handleNavigation(direction);
    wheelTimeout = setTimeout(() => { wheelTimeout = null; }, 600);
}

function handleTouchStart(e) {
    touchStartY = e.touches[0].clientY;
    touchStartX = e.touches[0].clientX;
    touchStartTime = Date.now();
}

function handleTouchEnd(e) {
    if (isNavigating) return;

    let element = e.target;
    while (element) {
        if (element.classList && element.classList.contains('allow-scroll')) return;
        if (element.classList && (element.classList.contains('swiper') || element.classList.contains('swiper-container'))) return;
        element = element.parentElement;
    }

    const touchEndY = e.changedTouches[0].clientY;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaY = touchStartY - touchEndY;
    const deltaX = Math.abs(touchEndX - touchStartX);
    const elapsed = Date.now() - touchStartTime;

    // Reject horizontal-dominant swipes
    if (deltaX > Math.abs(deltaY)) return;

    const velocity = Math.abs(deltaY) / elapsed;   // px/ms
    const isFlick  = velocity > 0.3;               // fast flick (industry standard ~0.3 px/ms)
    const isDrag   = Math.abs(deltaY) > 50;        // deliberate slow drag

    if (!isFlick && !isDrag) return;

    const direction = deltaY > 0 ? 'down' : 'up';
    handleNavigation(direction);
}

function handleNavButtonClick(direction) {
    if (direction === 'next') {
        const nextIndex = sectionNums.indexOf(currentIndex) + 1;
        if (nextIndex < sectionNums.length) {
            if (nextIndex === sectionNums.length - 1) {
                nextButtonOff();
            }
            jumpToSection(sectionNums[nextIndex]);
            prevButtonOn();
        }
    } else {
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

function handleNavLinkClick(link, index) {
    const href = link.getAttribute('href');

    setTimeout(() => {
        switch (href) {
            case '#services':
                jumpToSection(0);
                swiper.slideTo(2);
                updateActiveNav(1);
                autoplay = false;
                break;
            case '#experience':
                jumpToSection(0);
                swiper.slideTo(3);
                updateActiveNav(2);
                autoplay = false;
                break;
            case '#home':
                jumpToSection(0);
                swiper.slideTo(1);
                updateActiveNav(0);
                autoplay = true;
                break;
            default:
                currentIndex = sectionNums[index - 2];
                jumpToSection(currentIndex);
        }
    }, 0);
}

// Event listeners
window.addEventListener("wheel", handleWheelScroll, { passive: false });
window.addEventListener('touchstart', handleTouchStart, { passive: true });
window.addEventListener('touchend', handleTouchEnd, { passive: true });

document.getElementById("next-page-button").addEventListener("click", () => handleNavButtonClick('next'));
document.getElementById("prev-page-button").addEventListener("click", () => handleNavButtonClick('prev'));

document.querySelectorAll(".nav-link").forEach((link, index) => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        handleNavLinkClick(link, index);
    });
});

// Scroll observer
let scrollTimeout;
window.addEventListener("scroll", () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }

    scrollTimeout = window.requestAnimationFrame(() => {
        let foundIndex = sectionNums.findIndex((index) => {
            const section = document.querySelector(sections[index]);
            const rect = section.getBoundingClientRect();
            return rect.top >= 0 && rect.top < window.innerHeight / 2;
        });

        if (foundIndex !== -1 && foundIndex !== sectionNums.indexOf(currentIndex)) {
            currentIndex = sectionNums[foundIndex];
            updateActiveNav(currentIndex);
        }
    });
});

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", () => {
    // jumpToSection(0);

    const navLinks = document.querySelectorAll(".nav-link");
    const navbar = document.getElementById("navbar");

    function handleMobileNavigation() {
        if (window.innerWidth < 992) {
            const bsCollapse = new bootstrap.Collapse(navbar, {
                toggle: false
            });
            bsCollapse.hide();
        }
    }

    navLinks.forEach(link => {
        link.addEventListener("click", handleMobileNavigation);
    });

    document.addEventListener("click", (event) => {
        if (window.innerWidth < 992) {
            if (!navbar.contains(event.target) && navbar.classList.contains("show")) {
                handleMobileNavigation();
            }

            const servicesCategories = document.querySelectorAll('.services-category');
            let clickedInsideServices = false;

            servicesCategories.forEach(category => {
                if (category.contains(event.target)) {
                    clickedInsideServices = true;
                }
            });

            if (!clickedInsideServices) {
                servicesCategories.forEach(category => {
                    category.classList.remove('active');
                });
            }
        }
    });
});
