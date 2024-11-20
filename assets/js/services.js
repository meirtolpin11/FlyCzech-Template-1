
// Select all pagination bullets
const paginationBullets = document.querySelectorAll('.swiper-pagination-bullet');

// Add event listener for each bullet's animation end to trigger next slide
paginationBullets.forEach(bullet => {
    console.log(bullet)
    bullet.addEventListener('animationend', () => {
        console.log("Animation ended");
        swiper.slideNext();  // Move to next slide when animation ends
    });
});

// Ensure we reset the animation for each bullet after the slide changes
swiper.on('slideChange', () => {
    paginationBullets.forEach(bullet => {
        bullet.style.animation = 'none';  // Remove animation to reset it
        bullet.offsetHeight;  // Trigger reflow to re-apply the animation
        bullet.style.animation = '';  // Re-apply animation style
    });
});