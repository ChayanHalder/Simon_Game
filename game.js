const buttonColor = ["red","blue","green","yellow"];
let gamePattern = [];
let userClickPattern = [];

let start = false;
$(document).keypress(function(){
    if(!start){
        nextSequence();
        start = true;
    }
})

let level = 0;
function nextSequence(){
    let randomNumber = Math.floor(Math.random()*4)
    let randomColor = buttonColor[randomNumber];
    gamePattern.push(randomColor);
    animSound(randomColor);
    level++;
    $("h1").text("Level "+level);
}

$(".btn").on("click",function(event){
    let userChosenColor = event.target.id;
    userClickPattern.push(userChosenColor);
    animSound(userChosenColor);
    checkAnswer();
});

function checkAnswer(){
    for(let i=0;i<userClickPattern.length;i++){
        if(gamePattern[i] != userClickPattern[i])
        {
            animSound("wrong");
            userClickPattern = [];
            gamePattern = [];
            $("h1").html("Game Over <br> Press A Key to Start");
            level = 0;
            start = false;
            break;
        }
    }
    if(start && gamePattern.length == userClickPattern.length){
        console.log("success");
        userClickPattern = [];
        setTimeout(function(){
            nextSequence();
        },1000);
    }
}

function animSound(ids){

    if(ids=="wrong"){
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
    }else{
        $("."+ ids).fadeOut(100).fadeIn(100);
        $("."+ ids).on("click" ,function(){
            let self = $(this);
            self.addClass("pressed");
            setTimeout(function(){
                self.removeClass("pressed");
            },100);
        });        
    }

    switch(ids){
        case "red" :
            let red = new Audio("sounds/red.mp3");
            red.play();
            break;
        case "blue" :
            let blue = new Audio("sounds/blue.mp3");
            blue.play();
            break;
        case "green" :
            let green = new Audio("sounds/green.mp3");
            green.play();
            break;        
        case "yellow" :
            let yellow = new Audio("sounds/yellow.mp3");
            yellow.play();
            break;
        case "wrong" :
            let wrong = new Audio("sounds/wrong.mp3");
            wrong.play();
            break;
    }
}

