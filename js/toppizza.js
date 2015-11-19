jQuery(document).ready(function() {

    $('.pizzalijst').hide();
    $('.show_pizza_lijst').click(function() {
        element = $(this).next().slideDown('fast');
    });

    $('.topping').click(function() {
        element = this;
        $element = $(this);
        name = $element.attr('name');
        value = $element.val();
        id = name.split('_').pop();
        $div = $element.closest('div');
        divId = $div.attr('id').split('_').pop();

        $arrAllElements = $div.find('input:checkbox');
        $arrUncheckedElements = $div.find('input:checkbox:not(:checked)');
        $arrCheckedElements = $div.find('input:checkbox:checked');

        if ($arrUncheckedElements.length < 2) {
            $arrAllElements.removeAttr('disabled');
            if ($element.is(':checked')) {
                //alert('aan');
                $('#form_' + divId + '_topping_' + id).remove();
            } else {
                $('#form_' + divId).append('<input type="hidden" id="form_' + divId + '_topping_' + id + '" name="excludeTopping[' + id + ']" value="' + name + '" />');
                //alert('uit');
            }
        } else {
            $arrCheckedElements.attr("disabled", true);
        }
    });

    //do some magic to enable checkbox selection

    var options, a;
    pathArray = window.location.href.split('/');
    protocol = pathArray[0];
    host = pathArray[2];
    url = protocol + '://' + host;

    var options = null;

    var $as = $('input[name="topping"]');
    options = {
        serviceUrl: '/items/topping-by-filter',
        minChars: 1,
        onSelect: newToppingSelected,
    };
    $as.autocomplete(options);

});

//object contains .value & .data (refers to id) object
function newToppingSelected(object, data) {
    $current = $(this);

    //check if items has already been added to the checkbox list:
    $checkboxes = $current.parent().find("input:checkbox");
    numberOfCheckboxes = $checkboxes.length;
    $lastCheckbox = $current.parent().find("input:checkbox:last");
    $lastTr = $lastCheckbox.closest('tr');

    //do we have to create a new checkbox?
    var name = "topping_" + object.data;
    $result = $($.grep($checkboxes, function(object) {
        return $(object).attr('name') === name;
    }));
    if ($result.length > 0) {
        //could say has already been added but we don't feel like doing so right now... ;)
        
        $current.val('');
        return;
    }
    
    $tableRow = null;

    if (numberOfCheckboxes % 2 === 0) {
        $currentTable = $lastCheckbox.closest('table');

        $newTr = $("<tr class=''></tr>")
        if ($lastTr.hasClass('lijn_wit'))
            $lastTr.addClass('lijn_grijs');
        else
            $newTr.addClass('lijn_wit');

        $currentTable.append($newTr);
        $lastTr = $newTr;
    }

    //now let's create a new checkbox!
    $newTdWithInput=$("<td><input type='checkbox' checked='checked' name='"+name+"' class='topping'>"+object.value+"</td>");
    $lastTr.append($newTdWithInput);

    $current.val('');
}