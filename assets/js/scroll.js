let scrollTimeout;
const sections = ["#home", "#about", "#fleet", "#team", "#contact"];
let currentIndex = 0;

function jumpToSection(index) {
    if (index >= 0 && index < sections.length) {
        document.querySelector(sections[index]).scrollIntoView({ behavior: 'smooth' });
    }
}

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
}, { passive: false }); // passive: false is necessary to call preventDefault
