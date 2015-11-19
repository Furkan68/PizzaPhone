jQuery(document).ready(function() {
	$('.details').hide();
	$('.toon_detail').click(function(){
		$('.details').hide();
		$el = $(this).parent().next().toggle();
	});
});
