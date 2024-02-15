
gamePattern = [];

userClickedPattern=[];

buttonColours = ["red", "blue", "green", "yellow"];

randomChosenColour =buttonColours[nextSequence()];

gamePattern.push(randomChosenColour);

function nextSequence() {

   randomNumber= Math.floor(3*Math.random())+1;

   return randomNumber;


}

$("#"+randomChosenColour);



 $(".btn").on("click",function(event){

    userClickedPattern.push(event.target.id);
    playSound(event.target.id);
    $(event.target).animate({opacity:0.3}).animate({opacity:1});

    console.log(userClickedPattern);

 });

function playSound(name) {

    switch (name) {

        case "blue":
            var audio_blue = new Audio('sounds/blue.mp3');
            audio_blue.play();
            
            break;

        case "green":
            var audio_green = new Audio('sounds/green.mp3');
            audio_green.play();
        break;

        case "red":
            var audio_red = new Audio('sounds/red.mp3');
            audio_red.play();
        break;

        case "yellow":
            var audio_yellow = new Audio('sounds/yellow.mp3');
            audio_yellow.play();
        break;


    
        default:
            var audio_yellow = new Audio('sounds/wrong.mp3');
            audio_yellow.play();
            break;
    }



}