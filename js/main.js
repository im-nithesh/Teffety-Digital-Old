 AOS.init({
 	duration: 800,
 	easing: 'slide',
 	once: true
 });

(function ($) {

    "use strict";

    $(".loader").delay(1000).fadeOut("slow");
 	$("#overlayer").delay(1000).fadeOut("slow");

    // Parallax Effect
    $(window).on('scroll', function() {
        var scrollPosition = $(window).scrollTop();
        $('.parallax-layer').css('transform', 'translateY(' + scrollPosition * 0.5 + 'px)');
    });    

    // Bootstrap popovers
    $('[data-bs-toggle="popover"]').each(function () {
        new bootstrap.Popover($(this)[0]);
    });
    

    // Window Resize Mobile Menu Fix
    mobileNav();
    

    // Menu elevator animation
    $('a[href*=\\#]:not([href=\\#])').on('click', function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                var width = $(window).width();
                if(width < 991) {
                    $('.menu-trigger').removeClass('active');
                    $('.header-area .nav').slideUp(200);	
                }				
                $('html,body').animate({
                    scrollTop: (target.offset().top) - 130
                }, 700);
                return false;
            }
        }
    });

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
            if (!href || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("/")) {
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


    // Page loading animation
    $(window).on('load', function() {
        if($('.cover').length){
            $('.cover').parallax({
                imageSrc: $('.cover').data('image'),
                zIndex: '1'
            });
        }

        $("#preloader").animate({
            'opacity': '0'
        }, 600, function(){
            setTimeout(function(){
                $("#preloader").css("visibility", "hidden").fadeOut();
            }, 300);
        });
    });


    // Window Resize Mobile Menu Fix
    $(window).on('resize', function() {
        mobileNav();
    });


    // Window Resize Mobile Menu Fix
    function mobileNav() {
        var width = $(window).width();
        $('.submenu').on('click', function() {
            if(width < 992) {
                $('.submenu ul').removeClass('active');
                $(this).find('ul').toggleClass('active');
            }
        });
    }

    //testimonial slider
    $('.testimonial-slider').slick({
        centerMode: true,
        centerPadding: '60px',
        slidesToShow: 3,
        prevArrow: `<i class="fas fa-chevron-left custom-arrow slick-prev"></i>`,
        nextArrow: `<i class="fas fa-chevron-right custom-arrow slick-next"></i>`,
        variableWidth: true,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: '40px',
              slidesToShow: 3
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