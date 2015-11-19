/**
 * script voor het ophalen van de straten horende bij een bepaald filiaal
 * tim@comoweb.be
 * 2010 12 21
 */

var prevPostcode = null;

/*ophalen van straten bij postcode */
$(document).ready(function() {
	straat_id = '#straat_id';
	straat_tekst = '#straat_tekst';
	postcodeVeld = '#postcodeVeldFullForm';
	straatOntbreekt = '#straat_ontbreekt_link';
	
	$straat_id = jQuery(straat_id);
	$straat_tekst = jQuery(straat_tekst);
	$postcodeVeld = jQuery(postcodeVeld);
	$straatOntbreekt = jQuery(straatOntbreekt);
	
	$straatOntbreekt.hide();
	
	processPostcodeVeld(postcodeVeld, straat_id, straat_tekst, straatOntbreekt);
	prevPostcode = $postcodeVeld.val();
	
	$postcodeVeld.change(function(){
		if (prevPostcode != $postcodeVeld.val()){
			processPostcodeVeld(postcodeVeld, straat_id, straat_tekst, straatOntbreekt);
			prevPostcode = $postcodeVeld.val();
		}
	});
});

