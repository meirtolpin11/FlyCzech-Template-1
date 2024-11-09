(function ($) {
  "use strict";

  /* Preloader */
  var preloader = $("#preloader");


  $(window).on('load', function () {
    preloader.fadeOut('slow');
  });


  /* Sticky Header */
  var header = $(".page-header");
  var mobileNav = $(".mobile-nav");
  var toggleClass = "is-sticky";
  var scrollLast = 0;


  function toggleHeader() {
    var scrollTop = $(window).scrollTop();
    var direction = scrollTop > scrollLast ? 'down' : 'up';
    scrollLast = scrollTop;

    if (scrollTop > 300 && direction == 'up') {
      if (!header.hasClass(toggleClass)) {
        header.addClass(toggleClass);
        mobileNav.animate({ opacity: 0 }, 100, function () {
          mobileNav.animate({ opacity: 1 }, 100);
        });
      }
    } else {
      header.removeClass(toggleClass);
      if (scrollTop > 300) {
        mobileNav.css('opacity', '0');
      }

    }
  }


  $(window).on('scroll', toggleHeader);

  /* Single page Anchor Menu */

  window.addEventListener('DOMContentLoaded', event => {
    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#navbar');
    if (mainNav) {
      new bootstrap.ScrollSpy(document.body, {
        target: '#navbar',
        offset: 40,
      });
    };

    // Function to check if the device is a mobile device based on screen width
    function isMobileDevice() {
      return window.innerWidth <= 992; // Adjust the width as needed for your design
    }
    // Get the necessary elements
    const navbarToggler = document.querySelector('.menu-toggler');
    const navItemsContainer = document.querySelector('#navbar');


    // Function to handle the click event
    function handleNavItemClick(event) {
      if (isMobileDevice() && event.target.classList.contains('nav-link')) {
        navbarToggler.click();
      }
    }

    // Attach the click event listener only if it's a mobile device
    if (isMobileDevice()) {
      navItemsContainer.addEventListener('click', handleNavItemClick);
    }


  });

  /* Menu Toggler */
  var menu = $('.menu-toggler');


  menu.on('click', function () {
    menu.toggleClass('open');
    if (menu.hasClass('open')) {
      $('html').addClass('no-scroll');
      $('body').addClass('no-scroll');
    }
    else {
      $('html').removeClass('no-scroll');
      $('body').removeClass('no-scroll');
    }
  });


  /* Swiper Instance */
  if ($('.swiper').length) {
    var swiper = new Swiper('.swiper', {
      loop: true,

      speed: 1000,
      autoHeight: false,
      effect: 'fade',
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
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
    spaceBetween: 10,   // Space between the slides
    autoplay: true,
    loop: true,         // Enable looping
    pagination: {
      el: '.swiper-pagination',  // Optional pagination (you can hide this if you don't need it)
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',  // Next slide button
      prevEl: '.swiper-button-prev',  // Previous slide button
    },
  });

  new Swiper('.process-swiper', {
    slidesPerView: 1,  // Display one item at a time on mobile
    spaceBetween: 10,   // Space between slides
    loop: true,         // Enable looping
    navigation: {
      nextEl: '.swiper-button-next',  // Next slide button
      prevEl: '.swiper-button-prev',  // Previous slide button
    },
    breakpoints: {
      // When screen is larger than 768px, show the content in grid
      768: {
        slidesPerView: 'auto',  // Multiple items on desktop
        spaceBetween: 30,       // More space between the items on desktop
      },
    },
  });
  /* Lottie Player */
  // const playerContainers = document.querySelectorAll(".service-box");
  // playerContainers.forEach(container => {
  //   container.addEventListener("mouseover", () => {
  //     const player = container.querySelector("lottie-player");
  //     player.setDirection(1);
  //     player.play();
  //   });

  //   container.addEventListener("mouseleave", () => {
  //     const player = container.querySelector("lottie-player");
  //     player.setDirection(-1);
  //     player.play();
  //   });
  // });



  /* Project Slider */
  if ($('.project-thumb-carousel').length) {
    var projectThumbCarousel = new Swiper('.project-thumb-carousel', {
      slidesPerView: 1,
      spaceBetween: 0,
      freeMode: true,
      effect: 'fade',
      speed: 1400,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      loop: true,
      grabCursor: true,
      autoplay: false,
      thumbs: {
        swiper: projectContentCarousel
      }
    });
  }


  if ($('.project-content-carousel').length) {
    var projectContentCarousel = new Swiper('.project-content-carousel', {
      pagination: {
        el: '.swiper-project-pagination',
        clickable: true,
      },
      observer: true,
      observeParents: true,
      speed: 1400,
      mousewheel: false,
      grabCursor: true,
      autoplay: false,
      autoplay: {
        delay: 5000,
      },
      thumbs: {
        swiper: projectThumbCarousel
      }
    });
  }


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

})(jQuery);


// Jump between sections

// let isScrolling = false; // Prevent multiple scroll actions while processing

// const links = document.querySelectorAll('.nav-link');
// const sections = Array.from(links).map(link => document.querySelector(link.getAttribute('href')));

// function jumpToSection(targetIndex) {
//   // Ensure the targetIndex is within bounds
//   if (targetIndex < 0 || targetIndex >= sections.length) return;

//   // Change the URL hash to the target section's href
//   window.location.hash = links[targetIndex].getAttribute('href');
// }

// window.addEventListener('wheel', function (event) {
//   event.preventDefault();  // Prevent default scrolling behavior

//   if (isScrolling) return;  // Ignore if already processing a scroll event

//   isScrolling = true; // Set scrolling state to true

//   // Get the current scroll position relative to the viewport
//   let currentScrollPosition = window.scrollY + window.innerHeight / 2; // Middle of the viewport
//   let currentSectionIndex = null;

//   // Find the current section in view
//   for (let i = 0; i < sections.length; i++) {
//     let sectionTop = sections[i].offsetTop;
//     let sectionBottom = sectionTop + sections[i].offsetHeight;
//     if (currentScrollPosition >= sectionTop && currentScrollPosition < sectionBottom) {
//       currentSectionIndex = i;
//       break;
//     }
//   }

//   if (event.deltaY > 0) {
//     // Scroll down: Go to the next section
//     if (currentSectionIndex !== null && currentSectionIndex < sections.length - 1) {
//       jumpToSection(currentSectionIndex + 1);
//     }
//   } else {
//     // Scroll up: Go to the previous section
//     if (currentSectionIndex !== null && currentSectionIndex > 0) {
//       jumpToSection(currentSectionIndex - 1);
//     }
//   }

//   // Reset scrolling state after a short delay
//   setTimeout(() => {
//     isScrolling = false; // Allow the next scroll event
//   }, 600);  // Adjust timeout to match desired speed between jumps
// });

// // Optional: Handle touch events (if you want to handle mobile devices as well)
// window.addEventListener('touchstart', function (event) {
//   event.preventDefault();  // Prevent touch scrolling
// });
