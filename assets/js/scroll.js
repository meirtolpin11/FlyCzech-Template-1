let scrollTimeout;
const sections = ["#home", "#fleet", "#our-team", "#contact"];
let currentIndex = 0;

// Smooth scroll to a section
function jumpToSection(index) {
    if (index >= 0 && index < sections.length) {
        document.querySelector(sections[index]).scrollIntoView({ behavior: 'smooth' });
        updateActiveNav(index);
    }
}

// Update active class on the navbar
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

// Handle wheel scrolling
window.addEventListener("wheel", function (e) {
    e.preventDefault(); // Prevent default scroll behavior

    clearTimeout(scrollTimeout); // Clear the timeout to avoid multiple triggers

    scrollTimeout = setTimeout(() => {
        if (e.deltaY > 0) {
            // Scrolling down
            if (currentIndex < sections.length - 1) {
                currentIndex++;
                jumpToSection(currentIndex);
            }
        } else {
            // Scrolling up
            if (currentIndex > 0) {
                currentIndex--;
                jumpToSection(currentIndex);
            }
        }
    }, 100);
}, { passive: false });

// Handle clicks on navbar links
document.querySelectorAll(".nav-link").forEach((link, index) => {
    link.addEventListener("click", (e) => {
        e.preventDefault(); // Prevent default link behavior
        currentIndex = index;
        jumpToSection(index);
    });
});

// Update navbar when scrolling manually
window.addEventListener("scroll", () => {
    let foundIndex = sections.findIndex((selector) => {
        const section = document.querySelector(selector);
        const rect = section.getBoundingClientRect();
        return rect.top >= 0 && rect.top < window.innerHeight / 2; // Section is within view
    });

    if (foundIndex !== -1 && foundIndex !== currentIndex) {
        currentIndex = foundIndex;
        updateActiveNav(currentIndex);
    }
});
