let gamePattern = [];
let userClickedPattern = [];
let buttonColors = ['red', 'blue', 'green', 'yellow'];

let level = 0;
let gameStarted = true;
document.addEventListener('keypress', () => {

    if (gameStarted) {
        $('h1').text(`Level ${level}`);
        nextSequence();
        gameStarted = false;
    }
})


function nextSequence() {
    userClickedPattern = [];
    let random = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[random]
    gamePattern.push(randomChosenColor);
    playSound(randomChosenColor);
    $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100).fadeIn(100);
    level++;
    $('h1').text(`Level ${level}`);
    return random;
}

$('.btn').click(function (e) {
    let userChosenColour = e.currentTarget.id;
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    console.log(gamePattern);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
})


function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            console.log('success');
            setTimeout(() => {
                nextSequence();

            }, 1000);
        }
    }
    else {
        console.log('lost');
        playSound('wrong')
        $('body').addClass('game-over')
        $('h1').text("Game Over, Press Any Key to Restart")
        setTimeout(() => {
            $('body').removeClass('game-over');
        }, 200)

        startOver();
    }
}


function playSound(name) {
    var audio = new Audio(`sounds\\${name}.mp3`);
    audio.play();
}

function animatePress(currentColour) {

    $(`#${currentColour}`).addClass('pressed');
    setTimeout(function () {
        $(`#${currentColour}`).removeClass('pressed');
    }, 100)
}

function startOver() {
    level = 0;
    gamePattern = [];
    gameStarted = true;

}