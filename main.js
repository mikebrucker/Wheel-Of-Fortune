//             _1234567890_/+1234567890+\/+1234567890+\-_1234567890_
var words = [['  HYPERTEXT     MARKUP       LANGUAGE', 'Code'],
             ['              CASCADING     STYLE SHEET', 'Code'],
             ['              RECURSIVE     FUNCTIONS', 'Code'],
             ['              CAMEL CASE', 'Code'],
             ['             GET ELEMENT      BY ID', 'Code'],
             ['              DONUT SHOP      COFFEE', 'Food and Drink'],
             ['             CRAB BISQUE', 'Food and Drink'],
             ['              GUTE NACHT', 'Non-English Phrase'],
             [' THAT RUG     REALLY TIED   THE ROOM      TOGETHER', 'Movie Quote'],
             ['   I COME        FROM         A LAND     DOWN UNDER', 'Music'],
             ['  BETWEEN     THE BURIED     AND ME', 'Music'],
             ['              INNSBRUCK      AUSTRIA', 'Geography'],
             ['             PHILADELPHIA  PENNSYLVANIA', 'Geography'],
             [' SUPER BOWL  LII CHAMPIONS PHILADELPHIA  EAGLES', 'Sports']
            ];
//             _1234567890_/+1234567890+\/+1234567890+\_1234567890_
var letter;
var game = 0;
var goToNextRound = 0;
var score = 0;
var points = 0;
var pointsTotal = 0;
var bank = 0;
var wrongGuesses = 0;
var possiblePoints = [100, 100, 100, 100, 100, 200, 200, 200, 200, 200, 300, 300, 300, 300, 300, 400, 400, 400, 400, 500, 500, 500, 500, 600, 600, 600, 600, 700, 700, 700, 800, 800, 800, 900, 900, 1000, 1000, 1500, 2000, 'BANKRUPT'];
var roundComplete = [];
var gameWord = [];
var guess = false;
var beginBoo = true;
var spinBoo = false;
var wrongGuess = false;

function gameOrder() {
    var numberOfAnswers = words.length;
    var array = words;
    var uniqueGameOrder = [];
    for (var i = 0; i < numberOfAnswers; i++) {
        var x = Math.floor(Math.random() * array.length);
        uniqueGameOrder.push(array[x]);
        array.splice(x, 1);
    }
    words = uniqueGameOrder;
}

gameOrder();
console.log(words);
$('.modal').hide();
$('.game').hide();
$('#spin').hide();
$('.block').html("<img class='logo' src='images/logo.png' />");

setTimeout(function() {
    message();
}, 401);

function message() {
    spinBoo = false;
    wrongGuesses = 0;
    setTimeout(function() {
        beginBoo = true;
        $('.modal').fadeIn();
    }, 401);
    $('#message').html("Are You Ready For Wheel Of JavaScript?");
    $('#round').html("Get Ready For Round " + (game + 1));
    $('#input').html("Enter Any Key To Guess");
    for (var i = 0; i < words[game][0].length; i++) {
        roundComplete.push(0);
    }
}

function winner() {
    for (var i = 0; i < words[game][0].length; i++) {
        $('#block' + i).html("<img class='logo' src='images/logo.png' />");
        $('#block' + i).css({"background": "radial-gradient(circle, lime, darkgreen)"});
    }
    gameOrder();
    wrongGuesses = 0;
    setTimeout(function() {
        game = 0;
        beginBoo = true;
        $('.modal').fadeIn();
    }, 401);
    $('#message').html("You Win!!!");
    $('#round').html("Would You Like To Play Again?");
    $('#input').html("Enter Any Key To Guess");
    for (var i = 0; i < words[game][0].length; i++) {
        roundComplete.push(0);
    }
}

function loser() {
    for (var i = 0; i < words[game][0].length; i++) {
        $('#block' + i).html("<img class='logo' src='images/logo.png' />");
        $('#block' + i).css({"background": "radial-gradient(circle, lime, darkgreen)"});
    }
    gameOrder();
    $('#message').html("You Lose!!!");
    $('#round').html("Would You Like To Play Again?");
    $('#input').html("Enter Any Key To Guess");
    for (var i = 0; i < words[game][0].length; i++) {
        roundComplete.push(0);   
    }
    bank = 0;
    pointsTotal = 0;
    goToNextRound = 0;
    wrongGuesses = 0;
    roundComplete = [];
    $('#bank').html('$' + bank);
    $('#pointsTotal').html('$' + pointsTotal);
    $('.game').fadeOut();
    setTimeout(function() {
        game = 0;
        beginBoo = true;
        $('#gameCounter').html('Game ' + (game + 1));
        $('.modal').fadeIn();
    }, 1000);
}

$('#begin').click(function() {
    begin();
});

function begin() {
    beginBoo = false;
    $('.modal').fadeOut();
    $('#spin').html('SPIN');
    setTimeout(function() {
        $('#input').hide();
        $('.game').fadeIn();
        $('#spin').fadeIn();
        spinBoo = true;
    }, 500);
    gameWord = words[game][0].split('');
    $('#description').html(words[game][1])
    for (var i = 0; i < gameWord.length; i++) {
        $('#block' + i).css({"background": 'radial-gradient(circle, white, whitesmoke, lightgray)'});
        $('#block' + i).html("");
        if (gameWord[i] === ' ') {
            $('#block' + i).css({"background": "radial-gradient(circle, lime, darkgreen)"});
            $('#block' + i).html("<img class='logo' src='images/logo.png' />");
            roundComplete[i] = 1;
        }
    }
}

$('#spin').click(function() {
    spin();
})

function spin() {
    spinBoo = false;
    $('#input').html('Enter Any Key To Guess');
    if (!guess) {
        points = possiblePoints[Math.floor(Math.random()*possiblePoints.length)];
        if (points === 'BANKRUPT') {
            spinBoo = true;
            pointsTotal = 0;
            $('#pointsTotal').html('$0')
            $('#points').html('Bankrupt');
        } else {
            $('#points').html('$' + points);
            $('#spin').fadeOut(400);
            setTimeout(function() {
                $('#input').fadeIn();
                setTimeout(function() {
                    guess = true;
                },500);
            }, 500);
        }
    }
}

document.addEventListener('keypress', function (event) {
    if (!guess) {
        letter = event.key.toUpperCase();
        if ((letter === 'B') && (beginBoo === true)) {
            begin();
        }
        if ((letter === 'S') && (spinBoo === true)) {
            spin();
        }
    }
    if (guess) {
        letter = event.key.toUpperCase();
        document.getElementById('input').innerText = letter;
        startgame(letter);
    }
});

function changeBoardBlock(funcGameWord, j) {
    $('#block' + j).css({"background": "blue"});
    setTimeout(function() {
        $('#block' + j).html("<div class='align'>" + funcGameWord[j] + "</div>");
        $('#block' + j).css({"background": 'radial-gradient(circle, white, whitesmoke, lightgray)'});
    }, 1000);
}

function startgame(letter) {
    wrongGuess = true;
    if (gameWord.includes(letter)) {
        for (var i = 0; i < gameWord.length; i++) {
            if ((gameWord[i] === letter) && (roundComplete[i] === 0)) {
                pointsTotal += points;
                $('#pointsTotal').html('$' + pointsTotal);
                changeBoardBlock(gameWord, i);
                roundComplete[i] = 1;
                wrongGuess = false;
            }
        }
    }
    if (wrongGuess) {
        wrongGuesses++;
    }
    $('#gameCounter').html('<div>Game ' + (game + 1) + '</div><div>Wrong Guesses ' + wrongGuesses + '</div>');
    goToNextRound = 0;
    for (var i = 0; i < gameWord.length; i++) {
        goToNextRound += roundComplete[i];
        if (goToNextRound === gameWord.length) {
            nextRound();
        }
    }
    guess = false;
    if ((goToNextRound != gameWord.length) && (wrongGuesses < 3)) {
        setTimeout(function() {
            $('#input').fadeOut();
            setTimeout(function() {
                setTimeout(function() {
                    spinBoo = true;
                }, 400);
                $('#spin').fadeIn();
            }, 400);
        }, 400);
    }
    if (wrongGuesses > 2) {
        setTimeout(function() {
            loser();
        }, 1000);
    }
}

function nextRound() {
    setTimeout(function() {
        bank += pointsTotal
        $('#bank').html('$' + bank);
        pointsTotal = 0;
        $('#pointsTotal').html('$' + pointsTotal);
        $('.game').fadeOut();
        for (var i = 0; i < words[game][0].length; i++) {
            $('#block' + i).html("<img class='logo' src='images/logo.png' />");
            $('#block' + i).css({"background": "radial-gradient(circle, lime, darkgreen)"});
        }
        goToNextRound = 0;
        roundComplete = [];
        game++;
        $('#gameCounter').html('<div>Game ' + (game + 1) + '</div><div>Wrong Guesses 0</div>');
        if (game > 9) {
            winner();
        } else {
            message();
        }
    }, 2000);
}

$('#pointsTotal').mouseenter(function() {
    $('#bank').fadeIn();
})

$('#bank').mouseleave(function() {
    $('#bank').fadeOut();
})

$('#points').mouseenter(function() {
    $('#gameCounter').fadeIn();
})

$('#gameCounter').mouseleave(function() {
    $('#gameCounter').fadeOut();
})

function heightContainer() {
    browserHeight = parseInt(window.innerHeight);
    if (browserHeight < 769) {
        document.querySelector('body').style.minHeight = ('768px');
        document.querySelector('.container').style.minHeight = ('768px');
    } else {
        document.querySelector('body').style.height = (browserHeight + 'px');
        document.querySelector('.container').style.height = (browserHeight + 'px');
    }
}

$(window).resize(function() {
    heightContainer();
})

heightContainer();

setInterval(function(){
    var date = new Date();
    var sec = date.getSeconds();
    var mil = date.getMilliseconds();
    $('.container').css({"background": "linear-gradient(to bottom, rgba(0, 0, 0, 0) 33%, hsl(" + ((sec + (0.001 * mil)) * 6) + ", 100%, 50%)"});
}, 100);
