/**
 * weergeven van de afbeeldingen bij de poms
 */
jQuery(document).ready(function() {
	$linkerfoto = $('#links5050');
	$rechterfoto = $('#rechts5050');
	$inputItems = $('.changefoto');
	
	$inputItems.click(function(){
		$img = $(this);
		kant = $img.attr('name');
		id = $img.attr('value');
		pizzaNaam = id + '.jpg';
		if (kant == 'left'){
			$linkerfoto.attr('src', server + '/fotos/fifty-fifty/links/' + pizzaNaam);
		} else {
			$rechterfoto.attr('src', server + '/fotos/fifty-fifty/rechts/' + pizzaNaam);
		}
	});
	
})
