

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

  // Airport base card switcher in contact section
  function initContactBaseSwitcher() {
    const baseCards = document.querySelectorAll('.contact-base-card');
    const lkltIframe = document.getElementById('map-iframe-lklt');
    const lkprIframe = document.getElementById('map-iframe-lkpr');

    baseCards.forEach(card => {
      card.addEventListener('click', function (e) {
        if (e.target.closest('.base-maps-link')) return; // Allow direct maps link navigation
        const base = this.getAttribute('data-base');
        baseCards.forEach(c => c.classList.remove('active'));
        this.classList.add('active');

        if (base === 'lklt') {
          if (lkltIframe) lkltIframe.style.display = 'block';
          if (lkprIframe) lkprIframe.style.display = 'none';
        } else if (base === 'lkpr') {
          if (lkltIframe) lkltIframe.style.display = 'none';
          if (lkprIframe) lkprIframe.style.display = 'block';
        }
      });

      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.click();
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContactBaseSwitcher);
  } else {
    initContactBaseSwitcher();
  }

})(jQuery);
