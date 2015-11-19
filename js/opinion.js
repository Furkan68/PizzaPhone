$("input[name='adviestext']").parent().append($("<ul class='errors'></ul>"));
$("input[name='gevondentext']").parent().append($("<ul class='errors'></ul>"));

$("input[name='gevonden']").change(function(){
    var radioValue = $("input[name='gevonden']:checked").val();
    if(radioValue=='nee'){
        $('#gevondentext').show();
    }else{
        $('#gevondentext').hide();
        $("input[name='gevondentext']").next(".errors").empty();
    }
});


$("input[name='advies']").change(function(){
    var radioValue = $("input[name='advies']:checked").val();
    if(radioValue=='nee'){
        $('#adviestext').show();
    }else{
        $('#adviestext').hide();
        $("input[name='adviestext']").next(".errors").empty();
    }
});


$("#frmOpinion").submit(function(e){
    
    var advies = ($("input[name='advies']:checked").val()=='nee' && $("input[name='adviestext']").val().length==0);
    var gevonden=($("input[name='gevonden']:checked").val()=='nee' && $("input[name='gevondentext']").val().length==0);
    var $adviesTextParent = $("input[name='adviestext']").next(".errors");
    var $gevondenTextParent = $("input[name='gevondentext']").next(".errors");
    
    if(advies){
        $adviesTextParent.empty();
        $("<li>Gelieve een reden op te geven</li>").appendTo($adviesTextParent);
       
    }
    if(gevonden){
        $gevondenTextParent.empty();
        $("<li>Gelieve een reden op te geven</li>").appendTo($gevondenTextParent);
    }
    
    if(gevonden && advies){
        $("#gevondentext").focus();
    }else{
        if(advies){
            $("#adviestext").focus();
        }else 
            $("#gevondentext").focus();
    }
    var result = !gevonden && !advies;
    return result;
});