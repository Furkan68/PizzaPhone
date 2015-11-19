postponeFields = ['postponeDate-label', 'postponeDate-element', 'postponeHour-label', 'postponeHour-element'];
couponFields = ['coupon-label', 'coupon-element', 'couponValidate-label', 'couponValidate-element'];
couponShowFields = ['couponShow-label', 'couponShow-element'];

$(document).ready(function(){
	var couponValue = $("input[name=couponShow]:checked").val();
	hideFields(couponFields, couponValue, 0);

        $("input[name=delivery]").change(function(){
           deliveryValue = $("input[name=delivery]:checked").val();
           
           //hide properties that are owned by couponShow
           $("input[name=couponShow]:first").prop('checked',true);
           $("input[name=couponShow]:checked").trigger('change');
           //hide couponShow element + label itself
           hideFields(couponShowFields,deliveryValue,"takeaway");
        });


	$("input[name=couponShow]").change(function(){
		couponValue = $("input[name=couponShow]:checked").val();
		hideFields(couponFields, couponValue, 0);
	});

	$('#couponValidate-element').append('<div id="result"></div>');
	
	$('#couponValidate').click(function(){
		code = $('#coupon').val();
		$.get('verify-coupon', {couponCode: code}, function(data) {
			$('#result').html(data);
		});
	});
	
	var postponedValue = $("input[name=postponed]:checked").val();
	hideFields(postponeFields, postponedValue, 'now');
	
	$("input[name=postponed]").change(function(){
		postponedValue = $("input[name=postponed]:checked").val();
		hideFields(postponeFields, postponedValue, 'now');
	});
	
	$('.datepicker').datepicker({
		dateFormat: 'dd/mm/yy',
		maxDate: '+1w',
		minDate: '0',
		firstDay: 1,
		dayNamesMin: ['Zon', 'Maa', 'Din', 'Woe', 'Don', 'Vrij', 'Zat'],
		monthNames: ['januari','februari','maart','april','mei','juni','juli','augustus','september','oktober','november','december']
	});
});

function hideFields(fields, status, hidestatus)
{
	if (status == hidestatus){
		$.each(fields, function(index, value){
			$('#' + value).hide();
		});
	} else {
		$.each(fields, function(index, value){
			$('#' + value).show();
		});
	}
}

function changeCursor(element)
{
	$(element).css('cursor', 'pointer');
}