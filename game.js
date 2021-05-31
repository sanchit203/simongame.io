var buttonColor = ["red","green","blue","yellow"];
var gamepattern = [];
var level = "0";
var index = "0";
function nextSequence()
{
    clickPattern = [];
    $(document).off("keypress");
    $("h1").off("click");
    var randomNumber = Math.floor(Math.random()*4);
    var randomColor = buttonColor[randomNumber];
    gamepattern.push(randomColor);
    changeLevel();
}

function colorShow()
{
    var color = gamepattern[gamepattern.length -1];
    var colorID = '#' + color;
    $(colorID).fadeOut("fast").fadeIn("fast");
    makeSound(level-1);
    selectClick();
}
function makeSound(key)
{
    var sound = "sounds/" + gamepattern[key] + ".mp3";
    var audio = new Audio(sound);
    audio.play();
}
function changeLevel()
{
    level++;
    $("h1").text("Level " + level);
    colorShow();
}
function wrongSelect()
{
    var sound= new Audio("sounds/wrong.mp3");
    sound.play();
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 100);
    gamepattern =[];
    level=0;
    $("h1").text("Game Over, Press Any Key or Touch me to Restart");
    start();
}
function start()
{
    if(gamepattern.length==0)
    {
        $(document).on("keypress", function()
        {
            nextSequence();
        });
        $("h1").on("click", function(){
            nextSequence();
        });
    }
}
function checkClick(val)
{
    $(".btn").off("click");
    if(index<level)
    {
        if(gamepattern[index]===val)
        {
            makeSound(index);
            $("#" + val).addClass("pressed");
            setTimeout(function(){
                $("#" + val).removeClass("pressed");
            }, 100);
            index++;
            if(index<level)
            {
                selectClick();
            }
        }
        else
        {
            makeSound(index);
            index = "0";
            wrongSelect();
        }
    }
    if(index===level)
    {
        index = "0";
        setTimeout(function(){
            nextSequence();
        }, 800);
    }
}
function selectClick()
{
    $(".btn").on("click",function(event){
        var clicked = event.target.classList[1];
        checkClick(clicked);
    });
}

start();