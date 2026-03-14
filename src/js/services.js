
// Select all pagination bullets
const paginationBullets = document.querySelectorAll('.swiper-pagination-bullet');
var autoplay = true

// Add event listener for each bullet's animation end to trigger next slide
paginationBullets.forEach(bullet => {
    bullet.addEventListener('animationend', () => {
        if (autoplay) {
            // swiper.slideNext();  // Move to next slide when animation ends
        } else {
            bullet.style.background = "skyBlue";
        }
    });
    bullet.addEventListener('click', () => {
        autoplay = false;
        paginationBullets.forEach(bul => {
            bul.style.removeProperty("background");
        });
    });
});

// Apply mask to the first bullet when swiper is initialized
const firstBullet = document.querySelector('.swiper-pagination .swiper-pagination-bullet');
if (firstBullet) {
    const maskElement = document.createElement('div');
    maskElement.classList.add('mask');
    firstBullet.appendChild(maskElement);  // Add mask to first bullet
}

// Ensure we reset the animation for each bullet after the slide changes
swiper.on('slideChange', () => {
    // Remove mask from all bullets
    const bullets = document.querySelectorAll('.swiper-pagination .swiper-pagination-bullet');

    bullets.forEach(bullet => {
        bullet.querySelector('.mask')?.remove();  // Remove mask if present
    });

    // Add mask to the active bullet
    const activeBullet = document.querySelector('.swiper-pagination .swiper-pagination-bullet-active');
    if (activeBullet) {
        const maskElement = document.createElement('div');
        maskElement.classList.add('mask');
        activeBullet.appendChild(maskElement);  // Add mask to active bullet
    }

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

// Mobile onclick
function handleServiceCategoryClick(element) {
    // Check if we're on a phone
    const isPhone = window.getComputedStyle(element).getPropertyValue('--is-phone') === '1';

    // Get the URL from the data attribute
    const url = element.getAttribute('data-url');

    if (isPhone) {
        const isActive = element.classList.contains('active');

        if (isActive) {
            // Second tap: collapse the card
            element.classList.remove('active');
        } else {
            // First tap: expand the card
            document.querySelectorAll('.services-category').forEach(el => el.classList.remove('active'));
            element.classList.add('active');
        }
    } else {
        // Non-phone: Open the URL in a new tab
        if (url) {
            window.open(url, '_blank');
        }
    }
}

// Attach the function to the onclick event
document.querySelectorAll('.services-category').forEach(element => {
    element.onclick = function () {
        handleServiceCategoryClick(this);
    };
});
