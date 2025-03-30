$(document).ready(function () {
    // Initialize Owl Carousel
    $('#hero-slider').owlCarousel({
        loop: true,
        margin: 0,
        nav: true,
        items: 1,
        smartSpeed: 1000,
        dots: false
    });

    // Set dynamic ScrollSpy offset
    var navbarHeight = $('.navbar').outerHeight();
    $('body').attr('data-bs-offset', navbarHeight);

    // Reinitialize Bootstrap ScrollSpy
    var scrollSpy = new bootstrap.ScrollSpy(document.body, {
        target: '#navbarNav',
        offset: navbarHeight
    });

    // Smooth scrolling for anchor links
    $('a.nav-link, a.btn').on('click', function (e) {
        e.preventDefault();

        var targetId = $(this).attr('href').substring(1);
        var targetElement = $('#' + targetId);

        if (targetElement.length) {
            var targetPosition = targetElement.offset().top - navbarHeight + 1;

            $('html, body').animate({
                scrollTop: targetPosition
            }, 500, function () {
                // Recalculate ScrollSpy after scrolling
                scrollSpy.refresh();
            });
        }
    });

    // Ensure active class updates correctly
    $(window).on('scroll', function () {
        var scrollPos = $(document).scrollTop() + navbarHeight + 10;

        $('.nav-item .nav-link').each(function () {
            var section = $($(this).attr('href'));

            if (section.length) {
                var sectionTop = section.offset().top;
                var sectionBottom = sectionTop + section.outerHeight();

                if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                    $('.nav-item .nav-link').removeClass('active');
                    $(this).addClass('active');
                }
            }
        });
    });
});
