/**
 * weergeven van de afbeeldingen bij de poms
 */
jQuery(document).ready(function() {
	$basic_pizza = $('#basic_pizza');
	$toppingFotos = $('.toppingfoto');
	var posPizza = $basic_pizza.offset();

	$toppingFotos.hide();

	$('.toggleImage').click(function(){
		val = $(this).val();
		$toppingfoto = $('#toppingfoto-' + val);
		if ($(this).is(':checked')){
			$toppingfoto.show();
		} else {
			$toppingfoto.hide();
		}
		$toppingFotos.offset({left: posPizza.left, top: posPizza.top});
	});
});