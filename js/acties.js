/**
 * toepassen van alternerende lijnen
 */
jQuery(document).ready(function() {
	$('.gestreept tr').addClass('lijn_wit');
	$('.gestreept tr:odd').removeClass('lijn_wit').addClass('lijn_grijs');
});