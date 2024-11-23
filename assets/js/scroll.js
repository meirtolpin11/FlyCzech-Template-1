let scrollTimeout;
const sectionNums = [0, 2, 3, 4]
const sections = {
    0: "#home",
    1: "#services",
    2: "#fleet",
    3: "#our-team",
    4: "#contact"
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
            const nextIndex = sectionNums.indexOf(currentIndex) + 1;
            console.log(nextIndex)
            if (nextIndex < sectionNums.length) {
                jumpToSection(sectionNums[nextIndex]);
            }
        } else {
            // Scrolling up
            const prevIndex = sectionNums.indexOf(currentIndex) - 1;
            if (prevIndex >= 0) {
                index = sectionNums[prevIndex];
                jumpToSection(sectionNums[prevIndex]);
            }
        }
    }, 100);
}, { passive: false });

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

            }, 500); // Delay the slide change to allow smooth scroll to "home"
        } else if (link.getAttribute('href') === "#home") {
            // If it's the "Services" link, handle the special behavior
            currentIndex = 0; // Set currentIndex to "home"
            jumpToSection(sectionNums[currentIndex]);

            // Then, move to the first slide after scrolling
            setTimeout(() => {
                swiper.slideTo(1); // Go to the first slide
                updateActiveNav(0);
            }, 500); // Delay the slide change to allow smooth scroll to "home"
        } else {
            // Normal behavior for other navbar links
            currentIndex = index;
            jumpToSection(sectionNums[index]);
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
