var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var randomChosenColour;
var animate;
var type;
var firsttime = true;
var level = 0;
var t=0;
var rest = true;
  var userChosenColour ;


function nextSequence() {
  var randomNumber = Math.trunc((Math.random() * 4));
  return randomNumber;
}

function generate() {
  setTimeout(function() {
    nextSequence();
    randomChosenColour = buttonColours[nextSequence()];
    gamePattern.push(randomChosenColour);
    console.log(gamePattern);
    animate = $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    type = $(animate).attr('id');
    playSound(type);
    userClickedPattern = [];
    level = level + 1;
    $("h1").text("LEVEL " + level);
  }, 700)

}

function playSound(name) {
  var bMusic = new Audio("sounds/" + name + ".mp3")
  bMusic.play()
};

function animatePress(currentColour) {
  $(currentColour).addClass("pressed");
  setTimeout(function() {
    $(currentColour).removeClass("pressed");
  }, 100);
};

function check(a, b) {
  if (a[t] === b[t] && a.length === b.length) {
  // console.log(t);
    return true;

  } else if (a[t] === b[t] && a.length !== b.length) {
   //console.log(t);

    return false;
  } else if (a[t] !== b[t] && a.length !== b.length) {
    rest = true;
      gameover();
    return false;
  } else if (a[t] !== b[t] && a.length === b.length) {
    rest = true;
     gameover();
    return false;
  } else {
    rest = true;
    gameover();
    return false;
  }
}

function gameover() {
  $("h1").text("Game Over, Press Any Key to Restart")
  var aMusic = new Audio("sounds/wrong.mp3")
  aMusic.play();

//$(".btn").off("click");
  $("body").keydown(function() {
    if (rest === true) {
      level = 0;
      console.log("hi body")

      generate();
      rest = false
    }
  })

  $("body").addClass("game-over")


  setTimeout(function() {
    $("body").removeClass("game-over")
    gamePattern = [];

  }, 100)

}


$("body").keydown(function(e) {
  if (e.key === "a" && firsttime === true) {
    generate();
    firsttime = false;
  }
});

$(".btn").on("click", function() {
  userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  t = (userClickedPattern.length-1);
  //console.log(t)
  playSound(userChosenColour);
  animatePress(this);
 console.log(userClickedPattern);
  if (check(gamePattern, userClickedPattern) === true) {
    generate();
  } else {

  //  gameover();
    return false;

  }
});
