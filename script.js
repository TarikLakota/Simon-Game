
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keypress(function(){
    if(!started){
        nextSequence();
        started = true;
    }
});

$(".btn").click(function(){

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
    

});

function nextSequence(){

    userClickedPattern = [];

    level++;
    $(".level-title").text("level " + level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour); 
    
    $("#"+randomChosenColour).fadeOut(120).fadeIn(120);
    playSound(randomChosenColour);
    
}

function playSound(name){
    var audio = new Audio("sounds/" + name +".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentNumb){
    if(userClickedPattern[currentNumb] === gamePattern[currentNumb])
    {
       if(userClickedPattern.length === gamePattern.length){
        setTimeout(function(){
            nextSequence();
        }, 1000);
       }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        } ,200);
        $("h1").text("Game over, Press Any Key to restart")
        startOver();
    }
    
}

function startOver(){
    level = 0;
    started = false;
    gamePattern = [];
}