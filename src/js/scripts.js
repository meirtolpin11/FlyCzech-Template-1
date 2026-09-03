

(function ($) {
  "use strict";

  // Declare swiper variable globally
  window.swiper = null;  // Initialize the swiper global variable

  /* Swiper Instance */
  if ($('.swiper').length) {
    window.swiper = new Swiper('.swiper', {
      loop: true,
      speed: 1000,
      autoHeight: false,
      effect: 'fade',
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet: function (index, className) {
          // Initial rendering without the mask
          return `<span class="${className}" style="--duration: 3; --size: 20;"></span>`;
        },
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      autoplay: false
    });
  }

  // this is for fleets
  new Swiper('.swiper-container', {
    slidesPerView: 1,  // Display one item at a time on mobile
    autoHeight: false,
    // autoplay: true,
    loop: true,         // Enable looping
    effect: 'fade',
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    touchStartPreventDefault: false,  // Allow tap events on links inside slides
    preventClicks: false,             // Don't block click events
  });

  new Swiper('.process-swiper', {
    slidesPerView: 1,  // Display one item at a time on mobile
    spaceBetween: 10,   // Space between slides
    loop: true,         // Enable looping
    breakpoints: {
      768: {
        slidesPerView: 'auto',  // Multiple items on desktop
        spaceBetween: 30,       // More space between the items on desktop
      },
    },
  });

  /* Testimonial Slider */
  if ($('.testimonial-slider').length) {
    var testimonialCarousel = new Swiper('.testimonial-slider', {
      pagination: {
        el: '.swiper-testimonial-pagination',
        clickable: true,
      },
      observer: true,
      effect: "cube",
      grabCursor: true,
      cubeEffect: {
        shadow: false,
        slideShadows: false,
      },
      observeParents: true,
      speed: 1400,
      mousewheel: false,
      autoplay: {
        delay: 5000,
      }
    });
  }

  /* Client Slider */
  if ($('.client-slider').length) {
    var clientSwiper = new Swiper('.client-slider', {
      loop: false,
      speed: 1000,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },

      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        414: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
        991: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
        1219: {
          slidesPerView: 5,
          spaceBetween: 25,
        },
      }
    });
  }

  // Airport base card mobile swipe and tab switcher
  function initContactBaseMobileSwipe() {
    const container = document.getElementById('contact-base-cards-container');
    const tabs = document.querySelectorAll('.base-tab-btn');
    const dots = document.querySelectorAll('.base-dot');
    const cards = document.querySelectorAll('.contact-base-card');
    if (!container || !cards.length) return;

    function setActiveIndex(index) {
      tabs.forEach((tab, i) => tab.classList.toggle('active', i === index));
      dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
    }

    tabs.forEach(tab => {
      tab.addEventListener('click', function () {
        const idx = parseInt(this.getAttribute('data-target-base'), 10);
        if (cards[idx]) {
          container.scrollTo({
            left: cards[idx].offsetLeft - container.offsetLeft,
            behavior: 'smooth'
          });
          setActiveIndex(idx);
        }
      });
    });

    dots.forEach(dot => {
      dot.addEventListener('click', function () {
        const idx = parseInt(this.getAttribute('data-target-base'), 10);
        if (cards[idx]) {
          container.scrollTo({
            left: cards[idx].offsetLeft - container.offsetLeft,
            behavior: 'smooth'
          });
          setActiveIndex(idx);
        }
      });
    });

    let scrollTimeout;
    container.addEventListener('scroll', function () {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const scrollLeft = container.scrollLeft;
        const width = container.offsetWidth;
        const activeIdx = Math.round(scrollLeft / (width || 1));
        setActiveIndex(Math.min(Math.max(activeIdx, 0), cards.length - 1));
      }, 50);
    }, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContactBaseMobileSwipe);
  } else {
    initContactBaseMobileSwipe();
  }

})(jQuery);
