
// Select all pagination bullets
const paginationBullets = document.querySelectorAll('.swiper-pagination-bullet');
var autoplay = true

// Add event listener for each bullet's animation end to trigger next slide
paginationBullets.forEach(bullet => {
    console.log(bullet)
    bullet.addEventListener('animationend', () => {
        console.log("Animation ended");
        if (autoplay) {
            // swiper.slideNext();  // Move to next slide when animation ends
        }
    });
    bullet.addEventListener('click', () => {
        autoplay = false;
    });
});


// Ensure we reset the animation for each bullet after the slide changes
swiper.on('slideChange', () => {
    paginationBullets.forEach(bullet => {
        bullet.style.animation = 'none';  // Remove animation to reset it
        bullet.offsetHeight;  // Trigger reflow to re-apply the animation
        bullet.style.animation = '';  // Re-apply animation style
    });

    // Update the navbar with the current slide index
    if (isSwiperInFocus()) {
        updateActiveNav(swiper.realIndex);
    }
});

// Function to check if Swiper is in focus
function isSwiperInFocus() {
    const swiperContainer = document.querySelector('.swiper');  // Or the relevant class if it's different
    return swiperContainer === document.activeElement || isElementInViewport(swiperContainer);
}

// Function to check if the Swiper container is in the viewport
function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return rect.top >= 0 && rect.bottom <= window.innerHeight;
}