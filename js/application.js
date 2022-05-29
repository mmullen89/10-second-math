var timer = null;
var startTime = 10;
var answer;
var points = 0;
var gameStarted = false;

var generateEquation = function () {
  var equationDiv = $("#equation");
  //Generates random integer from 0 to 10
  var firstNum = Math.floor((Math.random() * 11)+1);
  var secondNum = Math.floor((Math.random() * 11)+1);

  answer = firstNum + secondNum; 
  equationDiv.html(firstNum + " + " + secondNum + " = ?");
}

var updateTime = function(amount) {
  startTime += amount;
  $("#timer").html(startTime + " s");
}

var updatePoints = function(amount) {
  points += amount;
  $("#pointTotal").text(points);
}

var startTimer = function () {
  
  if (!timer) {
    timer = setInterval(function () {
      updateTime(-1);
      if (startTime === 0) {
        window.clearInterval(timer);
        timer = null;
        gameStarted = false;
        updateTime(10);
        $("#pointTotal").text(0);
      }
    }, 1000);
  }

}

var showIcon = function () {
  var randomNum = Math.floor((Math.random() * 4)+1);
  switch (randomNum) {
    case 1:
      $(".alien").removeClass('hidden');
      setTimeout(function() {
        $(".alien").addClass('hidden');
      }, 1000);
      break;
    case 2:
      $(".astronaut").removeClass('hidden');
      setTimeout(function() {
        $(".astronaut").addClass('hidden');
      }, 1000);
      break;
    case 3:
      $(".planet").removeClass('hidden');
      setTimeout(function() {
        $(".planet").addClass('hidden');
      }, 1000); 
      break;
    case 4:
      $(".spaceship").removeClass('hidden');
      setTimeout(function() {
        $(".spaceship").addClass('hidden');
      }, 1000); 
      break;
  }
}


$(document).ready(function () {
  
  var answerField = $("#answer");
  generateEquation();

  answerField.on('keyup', function() {
    var userAnswer = Number(answerField.val());
    
    if (userAnswer === answer) { 
      if (!gameStarted) {
        gameStarted = true;
        startTimer();
      } 
      answerField.val('');
      showIcon();
      generateEquation();
      updateTime(1);
      updatePoints(1);
    }
  });

  $('#startGame').on('click', function() {
    startTime = 10;
    startTimer();
    generateEquation();
  });

})

