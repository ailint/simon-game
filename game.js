var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;

// detect keypress and change the h1
$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

// detect button clicks, get the id and add it to userClickedPattern

$(".btn").click(function() {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});


function nextSequence() {

    userClickedPattern = [];

    // increase level by 1
    level++;
    // update the h1 to new level number
    $("#level-title").text("Level " + level)

    // generate a number from 0-3
    var randomNumber = Math.floor(Math.random() * 4);

    // get a color from buttonColors using the randomNumber and add it to gamePattern array
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    // show the user the gamePattern and play sound associated with color
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

}

function playSound(name) {
    var sound_file = "sounds/" + name + ".mp3";
    var sound = new Audio(sound_file);
    sound.play();
};

function animatePress(currentColour) {

    var activeButton = $("#" + currentColour);
    activeButton.addClass("pressed");

    setTimeout(function() {
        activeButton.removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }

    } else {

        console.log("wrong");

        playSound("wrong");

        // add game-over class and remove for flash effect
        $("body").addClass("game-over");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        // change h1 to say game over
        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver()
    };

}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
