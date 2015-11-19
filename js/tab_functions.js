/**
 * general javascript functions
 */

function initFancybox()
{
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
}

function processPostcodeVeld(postcode, straat_id, straat_tekst, straatOntbreekt) {
    $postcode = jQuery(postcode);
    $straat_id = jQuery(straat_id);
    $straat_tekst = jQuery(straat_tekst);

    postcodeValue = $postcode.val();
    if (postcodeValue.length == 4) {
        zoekStraten(postcode, straat_id, straat_tekst, straatOntbreekt);

        if ($straat_id.val() != '') {
            hideVeldLabel(straat_tekst);
        } else {
            hideVeldLabel(straat_id);
            $(straatOntbreekt).hide();
            if ($straat_tekst.val() == '') {
                hideVeldLabel(straat_tekst);
            }
        }
    } else {
        hideVeldLabel(straat_id);
        hideVeldLabel(straat_tekst);
        $(straatOntbreekt).hide();
    }
}

function zoekStraten(postcodeVeld, straat_id, straat_tekst, straatOntbreekt) {
    $postcode = jQuery(postcodeVeld);
    $straat_id = jQuery(straat_id);
    selectedId = (($straat_id.attr('data')==null)?0:$straat_id.attr('data'));
    $straat_tekst = jQuery(straat_tekst);
    $straatOntbreekt = jQuery(straatOntbreekt);

    postcodeValue = $postcode.val();

    straat_idValue = jQuery(straat_id + " :selected").val();
    straat_tekstValue = ($straat_tekst.val() == tekst_leveren_niet) ? '' : $straat_tekst.val();

    if (jQuery(straat_id + " option").size() > 1) {
        jQuery(straat_id + " option").remove();
        jQuery(straat_id).append(jQuery("<option></option>").attr("value", 0).text('kies uw straat'));
    }
    jQuery.getJSON(zoek_straten_script, {postcode: postcodeValue}, function(data) {

        
        $straat_tekst.removeAttr('disabled');
        $straat_id.removeAttr('disabled');
        jQuery.each(data, function(key, value) {
            if (value == 'found' || value == 'not found') {
                toonOptionLijst = false;
                if (value == 'not found') {
                    jQuery(straat_tekst).val(tekst_leveren_niet).attr('disabled', true);
                } else {
                    jQuery(straat_tekst).val(straat_tekstValue);
                }
            } else {
                var $indStraat = jQuery("<option></option>").attr("value", key).text(value);

                $straat_id.append($indStraat);
                toonOptionLijst = true;
            }
        });
        if (toonOptionLijst) {
            showVeldLabel(straat_id);
            hideVeldLabel(straat_tekst);
            $straat_tekst.val('');
            
            $straat_id.val(selectedId).change();
            $straatOntbreekt.show();
        } else {
            hideVeldLabel(straat_id);
            showVeldLabel(straat_tekst);
            $straatOntbreekt.hide();
        }
    });
}

function hideVeldLabel(veld)
{
    jQuery(veld).fadeOut('slow');
    jQuery(veld + '-label').fadeOut('slow');
}

function showVeldLabel(veld)
{
    jQuery(veld).fadeIn('slow');
    jQuery(veld + '-label').fadeIn('slow');
}