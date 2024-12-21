var gameOver = false;

timeOutCount = 0;

var gameInProgress = false;

var level = 0;

var clickCount = -1;

var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

$(document).keypress(function()
{
    if(!gameOver && !gameInProgress)
    {
        gameInProgress = true;
        nextSequence();
    }
    else if(!gameInProgress)
    {
        startOver();
    }
});

$("div.btn").click(function()
{
    if(timeOutCount != 0) return;
    if(!gameInProgress) return;
    clickCount++
    if($(this).attr("id") === gamePattern[clickCount])
    {
        animatePress($(this).attr("id"));
        playSound($(this).attr("id"));
        if(clickCount >= gamePattern.length - 1 && !gameOver)
        {
            resetClickCount();
            timeOutCount++;
            setTimeout(() => {nextSequence(); timeOutCount--;}, 1000);
        }
            
    }
    else
    {
        gameInProgress = false;
        playSound("wrong");
        $("body").addClass("game-over");
        timeOutCount++;
        setTimeout(() => {document.querySelector("body").classList.remove("game-over"); timeOutCount--;}, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        gameOver = true;
    }
});

function nextSequence()
{
    level++;
    $("h1").text("Level " + level);
    showNextColor();
}

function showNextColor()
{
    gameOver = false;
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("div.btn").each(function()
    {
        if($(this).attr("id") === gamePattern[gamePattern.length - 1])
        {
            console.log(gamePattern);
            $(this).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
            playSound($(this).attr("id"));
        }
    });
}

function playSound(name)
{
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor)
{
    $("#"+currentColor).addClass("pressed");
    timeOutCount++;
    setTimeout(() => {document.getElementById(currentColor).classList.remove("pressed"); timeOutCount--;}, 100);
}

function resetClickCount()
{
    clickCount = -1;
}

function startOver()
{
    level = 0;
    resetClickCount();
    gamePattern = [];
    gameInProgress = true;
    nextSequence();
}