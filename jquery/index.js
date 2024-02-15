
$("h1").css("color","red");

$(document).keydown(function(event) { 

    $("h1").text(event.key);

 });

 $("button").on("click",function() {

    $("h1").slideUp().slideDown().animate({opacity:0.5}).animate({opacity:1});
    
});
 


