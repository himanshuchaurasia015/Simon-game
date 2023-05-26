var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = []; //colors chosen by random no.
var userClickedPattern = []; // colors chosen by user
var started = false;
var level = 0;

$(document).keypress(function () {
  if (!started) {
    $("h1").text("level " + level);
    nextSequence();
    started = true;
  }
});

// when user click on any btn
$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function nextSequence() {
  console.log("3");

  userClickedPattern = [];
  level++;
  //to select random color btn
  $("h1").text("level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  var blinkButton = $("#" + randomChosenColour);
  blinkButton.fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}
//to animate pressed btn
function animatePress(currentColour) {
  var pressedBtn = $("#" + currentColour);
  pressedBtn.addClass("pressed");
  setTimeout(function () {
    pressedBtn.removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
