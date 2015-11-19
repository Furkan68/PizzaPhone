/**
 * 
 */

/*ophalen van straten bij postcode */
jQuery(document).ready(function() {
    jQuery('.fbox').fancybox({
        'height': 500,
        'onClosed': function() {
            parent.location.reload(true);
        }
    });
    jQuery('.fbox_klein').fancybox({
        'height': 200,
        'width': 370,
        'onClosed': function() {
            parent.location.reload(true);
        }
    });
    jQuery('.sub_regels').hide();
    jQuery('.toon_sub_regels').click(function() {
        id = $(this).attr('id').split('_').pop();
        veld = '#sub_regel_' + id;
        jQuery(veld).toggle();
    });
    jQuery('.bevestig').click(function() {
        veld = jQuery(this);
        if (veld.is(':checked')) {
            var a = confirm("weet u zeker dat u dit item wilt wissen?");
            if (a) {
                veld.attr('checked', true);
            } else {
                veld.attr('checked', false);
            }
        }
    });
    $('.description').hide();
    $('.description-title').click(function() {
        $('.description').hide();
        $(this).parent().next().show();
    });
    $('.edit-photo').hide();
    $('.edit-photo-show').click(function() {
        $('.edit-photo').hide();
        $(this).next().show();
    });
    $('#button_add_type').click(function() {
        type = $('#itemtype').val();
        $.post('combos/select-type', {itemtype: $('#itemtype').val()}, function(data) {
            $('#result_type').html(data).show();
        });
    });
    $('.pijlen a').live('click', function(e) {
        e.preventDefault();
        var url = $(this).attr('href');
        var $clicked = $(this);
        $.get(url, function(data) {

            if (data.success)
            {
                moveRow($clicked.closest('div.item'), data.direction);
            }
        });
    });

    $("#photoEditForm").submit(function(e) {
        e.preventDefault();

        var postData = new FormData();
        jQuery.each($("#photo")[0].files, function(i, file) {
            postData.append('file-' + i, file);
        });
        
        postData.append('soort',this.elements.soort.value);
        postData.append('helft',this.elements.helft.value);
        
        var formURL = $(this).attr("action");
        $.ajax(
                {
                    url: formURL,
                    data: postData,
                    cache: false,
                    contentType: false,
                    processData: false,
                    type: 'POST',
                    success: function(data, textStatus, jqXHR)
                    {
                        if (data.success) {
                            //close current fbox!
                            console.debug('closing fancy box!');
                            parent.$.fancybox.close();
                        } else
                        {
                            console.debug(data.message);
                            $('div.error').html(data.message);
                        }
                    },
                    error: function(jqXHR, textStatus, errorThrown)
                    {

                    }
                });
    });
});

function moveRow($row, direction) {
    var previous = $row.prev('div.item');
    var next = $row.next('div.item');

    switch (direction) {
        case 'up':
            $row.insertBefore(previous);
            $row.hide();
            $row.fadeIn();
            break;
        case 'down':
            $row.insertAfter(next);
            $row.hide();
            $row.fadeIn();
            break;
    }
}