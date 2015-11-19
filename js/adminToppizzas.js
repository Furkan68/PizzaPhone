/**
 * 
 */

jQuery(document).ready(function() {
	$('#new_part-label').hide();
	$('#new_part-element').hide();
	$('#part_confirm').hide();
	//$('#parts_list').hide();
	
	$('#part').change(function(){
		$('#part_confirm').show();
		partVal = $('#part').val();
		if (partVal == -99){
			$('#new_part-label').show();
			$('#new_part-element').show();
		}
	});
	
	
	$('#part_confirm').click(function(){
		url = 'items/add-pom-topping';
		partVal = $('#part').val();
		newPartVal = $('#new_part').val();
		$.post(url, {part: partVal, new_part: newPartVal}, function(data){
			$('#parts_list').html(data);
			$('#part').val(0);
			$('#new_part').val('');
			$('#new_part-label').hide();
			$('#new_part-element').hide();
		});
		$('#parts_list').show();
	});
	
	$('.remove_topping').click(function(){
		url = $(this).attr('href');
		alert(url);
		return false;
		//$.get()
	});
	
});
