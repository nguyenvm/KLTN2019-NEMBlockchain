/* CARD REVEAL */
(function($) {
    $(document).ready(function() {
        $(document).on('click.card', '.card', function(e) {
            if ($(this).find('.card-reveal').length) {
                if ($(e.target).is($('.card-reveal .card-title')) || $(e.target).is($('.card-reveal .card-title i'))) {
                    // Make Reveal animate down and display none
                    $(this).find('.card-reveal').velocity({
                        translateY: 0
                    }, {
                        duration: 225,
                        queue: false,
                        easing: 'easeInOutQuad',
                        complete: function() {
                            $(this).css({
                                display: 'none'
                            });
                        }
                    });
                } else if ($(e.target).is($('.card .activator')) ||
                    $(e.target).is($('.card .activator i'))) {
                    $(this).find('.card-reveal').css({
                        display: 'block'
                    }).velocity("stop", false).velocity({
                        translateY: '-100%'
                    }, {
                        duration: 300,
                        queue: false,
                        easing: 'easeInOutQuad'
                    });
                }
            }
        });
    });
}(jQuery));
//Social reveal
$(document).ready(function($) {
    $('.card-share > a').on('click', function(e) {
        e.preventDefault() // prevent default action - hash doesn't appear in url
        $(this).parent().find('div').toggleClass('social-reveal-active');
        $(this).toggleClass('share-expanded');
    });
});