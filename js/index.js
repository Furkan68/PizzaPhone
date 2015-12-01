/**
 *
 */

jQuery(document).ready(function () {
    initFancybox();

    $('html').on('click', function (e) {
        if (typeof $(e.target).data('original-title') == 'undefined' && !$(e.target).parents().is('.popover.in')) {
            $('[data-original-title]').popover('hide');
        }
    });

    $('.product-edit').click(function () {
        var el = $(this);
        var a = el.attr('pizza-no');
        var parent = el.parent().closest('.product-details');
        var b = parent.find('.ingredients');
        var c = b.attr('pizza-no');
        if (a == c) {
            b.toggle();
            $( this ).toggleClass(function() {
                if ( $( this ).is( ".fa-arrow-down" ) ) {
                    return "fa-arrow-up";
                } else {
                    return "fa-arrow-down";
                }
            });
            //$( this ).toggleClass( "fa-minus" );
        }
    });



    $('.gestreept tr').addClass('lijn_wit');
    $('.gestreept tr:odd').removeClass('lijn_wit').addClass('lijn_grijs');

    $('.swap_image').mouseover(function () {
        img = $(this);
        imgsrc = img.attr('src');
        newImgsrc = imgsrc.replace('.jpg', 'Over.jpg');
        img.attr('src', newImgsrc);
    });
    $('.swap_image').mouseout(function () {
        img = $(this);
        imgsrc = img.attr('src');
        newImgsrc = imgsrc.replace('Over.jpg', '.jpg');
        img.attr('src', newImgsrc);
    });

    $("#frmNewsLetter  input[type='submit']").click(function () {
        var $form = $("#frmNewsLetter");
        $form.parent('div').find('div.info').remove();
        $.post($form.attr('action'), $form.serialize(), function (data) {
            var $message = null;
            if (data.Code === 400) {
                $message = $('<div class="info error"></div>').text(data.Message);

            } else {
                $message = $('<div class="info"></div>').text('U bent nu ingeschreven op onze nieuwsbrief!');
            }

            $form.parent('div').append($message);
            $form.find('input[name="email"]').val('');
        });
        return false;
    });

    /* SLIDER */

    var interval = 4000;

    function slide() {
        $('#slideshow > div:first')
            .fadeOut(1000)
            .next()
            .fadeIn(1000)
            .end()
            .appendTo('#slideshow');
        $('#slideshow ul li').removeClass('active');
        $('#slideshow ul li:eq(' + index + ')').addClass('active');
        index = index < maxindex - 1 ? index + 1 : 0;
        setTimeout(slide, interval)
    }

    $("#slideshow > div:gt(0)").hide();
    var index = 1;
    var maxindex = $('#slideshow > div').length;
    $(function () {
        setTimeout(slide, interval);
    });
    for (var i = 0; i < maxindex; i++) {
        $('#slideshow ul').append('<li class="' + (i == 0 ? 'active' : '') + '"></li>');
    }

    ///* phone settings */
    //if ($(window).width() >= 761)
    //{
    //    $("#bestelmenu").collapse('show');
    //    $("#bestelcombomenu").collapse('show');
    //    $("#bestelbon").collapse('show');
    //    $("#filialen").collapse('show');
    //}
    //$(window).resize(function() {
    //    if ($(window).width() >= 761)
    //    {
    //        $("#bestelmenu").collapse('show');
    //        $("#bestelcombomenu").collapse('show');
    //        $("#bestelbon").collapse('show');
    //        $("#filialen").collapse('show');
    //    }
    //});

    /*$( "#slide1" ).hide();
     $( ".facebook" ).mouseover(function() {
     $( "#slide1" ).toggle( "fade" );
     });*/
});