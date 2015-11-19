/**
 * 
 */

jQuery(document).ready(function() {
	$zoekStratenForm = jQuery('#zoek_filiaalForm');
	$postcodeVeld = jQuery('#postcode');
	$straat_id = jQuery('#straat_id');
	$zoek_knop = jQuery('#zoekKnop');

	$straat_id.hide();
	$zoek_knop.hide();
	
	$resultaatVeld = jQuery('#resultaatVeldInner');
	
	toonOptionLijst = false;
	

  	$postcodeVeld.keyup(function(){
		postcode = $postcodeVeld.val();
		lengte = postcode.length;
		if (lengte == 4){
			$resultaatVeld.html('');
			jQuery.getJSON(zoek_straten_script, { postcode : postcode }, function(data) {
				$straat_id.removeAttr('disabled');
				jQuery.each(data, function(key, value) {
					if (value == 'found' || value == 'not found'){
						jQuery.getJSON(zoek_filiaal_by_postcode_script, {postcode : postcode}, function(filiaal){
							if (filiaal.naam == null){
								$resultaatVeld.html('Wij leveren niet in deze postcode');
							} else {
								$resultaatVeld.html('Uw filiaal: ' + filiaal.naam + '<br />tel: ' + filiaal.telefoon);
							}
							$straat_id.hide();
							$zoek_knop.hide();
						});
					} else {
						$straat_id.append(jQuery("<option></option>").attr("value", key).text(value));
						toonOptionLijst = true;
					}
				});
				if (toonOptionLijst){
					$straat_id.fadeIn();
					$zoek_knop.fadeIn();
				} else {
					$straat_id.fadeOut();
					$zoek_knop.fadeOut();
				}
			});

		}
	});

  	$zoekStratenForm.submit(function(){
  		url = $zoekStratenForm.attr('action');
  		jQuery.getJSON(url, $zoekStratenForm.serialize(), function(filiaal) {
  			$resultaatVeld.html('mijn filiaal is: <br />' + filiaal.naam + '<br />' + filiaal.telefoon);
  			$resultaatVeld.fadeIn();
  		});
  		return false;
  	});

	/*
		straten = zoekStraten(postcode, straat_idVeld, straat_tekstVeld);
	$postcodeVeld.keyup(function(){
		processPostcodeVeld(postcodeVeld, straat_id, null);
	});
	
	*/
});

