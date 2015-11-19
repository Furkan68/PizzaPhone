/**
 * 
 */

jQuery(document).ready(function() {
	$('#button_type').click(function(){
		$form = $('#add_type_form');
		url = $form.attr('action');
		$.post(url, $form.serialize(), function(data){
			$('#item_contents').html(data);
		});
		$('#result_type').hide();
		/*
		type = $('#itemtype').val();
		$.post('combos/select-type', {itemtype: $('#itemtype').val()}, function(data){
			$('#result_type').html(data);
		});
		*/
	});

});
