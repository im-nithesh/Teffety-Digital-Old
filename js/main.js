 AOS.init({
 	duration: 800,
 	easing: 'slide',
 	once: true
 });

(function ($) {

    "use strict";

    //Overlay Effects
    $(".loader").delay(2500).fadeOut("slow");
 	$("#overlayer").delay(2800).fadeOut("slow");

    //video-lazyload
    const $lazyVideo = $('.lazy-hero-video');

    if ('IntersectionObserver' in window && $lazyVideo.length) {
      const observer = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const video = entry.target;
            video.src = $(video).data('src');
            video.load();
            obs.unobserve(video);
          }
        });
    });
    observer.observe($lazyVideo[0]);
    } else {
      // Fallback if IntersectionObserver not supported
      $lazyVideo.attr('src', $lazyVideo.data('src'));
    }

    // Parallax Effect
    $(window).on('scroll', function() {
        var scrollPosition = $(window).scrollTop();
        $('.parallax-layer').css('transform', 'translateY(' + scrollPosition * 0.5 + 'px)');
    });    

    // Bootstrap popovers
    $('[data-bs-toggle="popover"]').each(function () {
        new bootstrap.Popover($(this)[0]);
    });
    

    // Menu elevator animation
    $('.menu-trigger').on('click', function () {
        $(this).toggleClass('active'); // animate the icon
        $('.header-area .nav').slideToggle(500);
        const $social = $('.header-area .social');
        if ($social.is(':visible')) {
            $social.slideUp(300);
        } else {
            $social.slideDown(300, function () {
                $(this).css('display', 'flex'); // restore flex after slideDown
            });
        }
        

    });

    // Auto-close menu when nav link is clicked (mobile only)
    $('.header-area .nav li a').on('click', function () {
        if ($(window).width() < 991) {
            $('.header-area .nav').slideUp(500);
            $('.header-area .social').slideUp(300);
            $('.menu-trigger').removeClass('active');
        }
    });

    // Remove styles on window resize (desktop)
    $(window).on('resize', function () {
        if ($(window).width() > 991) {
            $('.header-area .nav').removeAttr('style');
            $('.header-area .social').removeAttr('style');
        }
    });

    //Smooth Scroll
    $(document).ready(function () {
        $(document).on("scroll", onScroll);
        
        //smoothscroll
        $('a[href^="#"]').on('click', function (e) {
            e.preventDefault();
            $(document).off("scroll");
            
            $('a').each(function () {
                $(this).removeClass('active');
            })
            $(this).addClass('active');
            
            var target = this.hash,
            menu = target;
                var target = $(this.hash);
            $('html, body').stop().animate({
                scrollTop: (target.offset().top)
            }, 500, 'swing', function () {
                window.location.hash = target;
                $(document).on("scroll", onScroll);
            });
        });
    });

    //navlinks highlighter
    function onScroll(event) {
        var scrollPos = $(document).scrollTop();
    
        $('.nav a').each(function () {
            var currLink = $(this);
            var href = currLink.attr("href");
    
            // Skip if href is undefined or is an external link or a full page redirect
            if (!href || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("/")) {
                return; // skip this link
            }
    
            var refElement = $(href);
            if (refElement.length) {
                if (refElement.position().top <= scrollPos &&
                    refElement.position().top + refElement.height() > scrollPos) {
                    $('.nav ul li a').removeClass("active");
                    currLink.addClass("active");
                } else {
                    currLink.removeClass("active");
                }
            }
        });
    }


    // About Item Flip Card
    // Select all the flip buttons
    var flipButtons = document.querySelectorAll (".flip-btn");

    // Loop through each button and add a click event listener
    flipButtons.forEach (function (flip_button) {
    flip_button.addEventListener ("click", function () {
        
        // Find the parent item element
        var item = flip_button.closest (".image-area");

        // Find the front and back images
        var front = item.querySelector (".front");
        var back = item.querySelector (".back");

        // Toggle the flip classes
        front.classList.toggle ("flipped");
        back.classList.toggle ("flipped");

        // Use jQuery for text replacement
        const $spanContainer = $(flip_button);
        const $existingSpan = $spanContainer.find('span');

        // If currently showing the back face
        if (back.classList.contains('flipped')) {
            const $typingSpan = $('<span></span>')
            .addClass('typing-effect')
            .text('Keerthana Chandrasekaran');

            $existingSpan.replaceWith($typingSpan);

        } else {
            // When flipping back to front face (fish)
            const $originalSpan = $('<span></span>')
            .attr('id', 'btn-text')
            .addClass('wiggle')
            .text('The Person Behind the Pixels');

            $existingSpan.replaceWith($originalSpan);
        }
    });
    });

    //Certifiacte slider
    $('.certificate-slider').slick({
        centerMode: true,
        slidesToShow: 5,
        infinity: true,
        autoplay: true,
        autoplaySpeed: 1000,
        arrows: false,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              centerMode: true,
              slidesToShow: 3
            }
          },
          {
            breakpoint: 480,
            settings: {
              centerMode: true,
              slidesToShow: 1
            }
          }
        ]
      });

    //testimonial slider
    $('.testimonial-slider').slick({
        centerMode: true,
        
        prevArrow: `<i class="fas fa-chevron-left custom-arrow slick-prev"></i>`,
        nextArrow: `<i class="fas fa-chevron-right custom-arrow slick-next"></i>`,
        variableWidth: true,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: '40px',
              slidesToShow: 1
            }
          },
          {
            breakpoint: 480,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: '40px',
              slidesToShow: 1
            }
          }
        ]
      });


})(window.jQuery);