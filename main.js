//             _1234567890_/+1234567890+\/+1234567890+\-_1234567890_
var words = [['  HYPERTEXT     MARKUP       LANGUAGE', 'Code'],
             ['              CASCADING     STYLE SHEET', 'Code'],
             ['              RECURSIVE     FUNCTIONS', 'Code'],
             ['              CAMEL CASE', 'Code'],
             ['             GET ELEMENT      BY ID', 'Code'],
             ['              DONUT SHOP      COFFEE', 'Food and Drink'],
             ['             CRAB BISQUE', 'Food and Drink'],
             ['             KANSAS CITY  STYLE BARBECUE', 'Food and Drink'],
             ['              GUTE NACHT', 'Non-English Phrase'],
             [' THAT RUG     REALLY TIED   THE ROOM      TOGETHER', 'Movie Quote'],
             ['               SUPER         TROOPERS', 'Movie'],
             [' STAR TREK    THE WRATH     OF KHAN', 'Movie'],
             ['               RICK AND       MORTY', 'Television'],
             ['               GAME OF       THRONES', 'Television'],
             ['               JERRY         SEINFELD', 'Television'],
             ['   I COME        FROM         A LAND     DOWN UNDER', 'Music'],
             ['  BETWEEN     THE BURIED     AND ME', 'Music'],
             ['  SUMMER       SLAUGHTER     FESTIVAL', 'Music'],
             ['  WHO LET    THE DOGS OUT  BY BAHA MEN', 'Music'],
             ['              INNSBRUCK      AUSTRIA', 'Geography'],
             ['             PHILADELPHIA  PENNSYLVANIA', 'Geography'],
             ['                KILAUEA   VOLCANO HAWAII', 'Geography'],
             [' SUPER BOWL  LII CHAMPIONS PHILADELPHIA  EAGLES', 'Sports'],
             [' WASHINGTON   CAPITAL       ALEXANDER    OVECHKIN', 'Sports'],
             ['              BUTTERFLY     SWIMMING', 'Sports']
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
var roundComplete = [];
var gameWord = [];
var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
var possiblePoints = ['BANKRUPT', 'BANKRUPT', 300, 350, 400, 450, 500, 500, 550, 600, 600, 650, 700, 700, 750, 800, 800, 850, 900, 900, 1000, 1500, 2000, 'BANKRUPT', 'BANKRUPT', 300, 350, 400, 450, 500, 500, 550, 600, 600, 650, 700, 700, 750, 800, 800, 850, 900, 1000, 1500, 2000, 2500, 'BANKRUPT', 'BANKRUPT', 300, 350, 400, 450, 500, 500, 550, 600, 600, 650, 700, 700, 750, 800, 800, 850, 900, 1000, 2000, 2500, 3500, 'BANKRUPT', 'BANKRUPT', 1000000];
var guess = false;
var beginBoolean = true;
var spinBoolean = false;
var wrongGuess = false;
var cantSolve = true;
var tryToSolve = false;

$('.modal').hide();
$('.game').hide();
$('#spin').hide();
$('.block').html("<img class='logo' src='images/logo.png' />");

function logAnswers() {
    var puzzleLog = [];
    for (var i = 0; i < words.length; i++) {
        puzzleLog.push(words[i][0].split(' '));
        for (var j = 0; j < puzzleLog[i].length; j++){
            if (1 > puzzleLog[i][j]) {
                puzzleLog[i].splice(j, 1);
                j--;
            }
        }
        puzzleLog[i] = puzzleLog[i].join(' ');
        console.log('Puzzle ' + (i + 1) + ': ' + puzzleLog[i]);
    }
}

function gameOrder() {
    var numberOfAnswers = words.length;
    var uniqueGameOrder = [];
    for (var i = 0; i < numberOfAnswers; i++) {
        var x = Math.floor(Math.random() * words.length);
        uniqueGameOrder.push(words[x]);
        words.splice(x, 1);
    }
    words = uniqueGameOrder;
    logAnswers();
}

gameOrder();

function solve(guess) {
    if (tryToSolve) {
        var solveGuess = guess
        var x = solveGuess.length
        for (var i = 0; i < x; i++) {
            if (solveGuess[i] == ' ') {
                solveGuess.splice(i, 1);
                i -= 1;
            }
        }
        solveGuess = solveGuess.join('');
        var solvePuzzle = [];
        for (var i = 0; i < gameWord.length; i++) {
            solvePuzzle.push(gameWord[i]);
        }
        for (var i = 0; i < gameWord.length; i++) {
            if (solvePuzzle[i] == ' ') {
                solvePuzzle.splice(i, 1);
                i -= 1;
            }
        }
        solvePuzzle = solvePuzzle.join('');
        if (solveGuess == solvePuzzle) {
            for (var i = 0; i < gameWord.length; i++) {
                if (gameWord[i] != ' ') {
                    changeBoardBlock(gameWord, i);
                }
                roundComplete[i] = 1;
            }
            setTimeout(function() {
                nextRound();
                $('input').val('');
            }, 1000);
        } else {
            setTimeout(function() {
                loser();
                $('input').val('');
            }, 1000);
        }
    }
}

$('#begin').click(function() {
    begin();
});

$('#spin').click(function() {
    spin();
});

$('#solve').mouseenter(function() {
    tryToSolve = true;
});

$('#solve').mouseleave(function() {
    tryToSolve = false;
});

$('#solvePuzzle').click(function() {
    if (!cantSolve && $('#solveInput').val().length > 0) {
        solve($('#solveInput').val().toUpperCase().split(''));
        $('#spin').fadeOut();
    }
});

$('#input').click(function() {
    $('#keyboard').slideDown();
});

setTimeout(function() {
    message();
}, 401);

function message() {
    spinBoolean = false;
    wrongGuesses = 0;
    setTimeout(function() {
        beginBoolean = true;
        $('.modal').fadeIn();
    }, 401);
    $('#message').html("Wheel Of JavaScript");
    $('#round').html("Get Ready For Round " + (game + 1));
    $('#input').html("Guess Letter");
    for (var i = 0; i < words[game][0].length; i++) {
        roundComplete.push(0);
    }
    cantSolve = true;
}

function winner() {
    setTimeout(function() {
        game = 0;
        beginBoolean = true;
        $('.modal').fadeIn();
    }, 401);
    $('.game').fadeOut();

    $('#message').html("You Win Wheel of JavaScript!");
    $('#round').html("You Won $" + bank + "!<div>Would You Like To Play Again?</div>");
    $('#input').html("Guess Letter");
    $('#gameCounter').html('<div>Game ' + game + '</div><div>Wrong Guesses ' + wrongGuesses + '</div>');
    for (var i = 0; i < words[game][0].length; i++) {
        roundComplete.push(0);
    }
    resetGame();
}

function loser() {
    $('#message').html("You Lose!");
    $('#round').html("Would You Like To Play Again?");
    $('#input').html("Guess Letter");
    roundComplete = [];
    for (var i = 0; i < words[game][0].length; i++) {
        roundComplete.push(0);   
    }
    $('.game').fadeOut();
    setTimeout(function() {
        game = 0;
        beginBoolean = true;
        $('#gameCounter').html('<div>Game ' + (game + 1) + '</div><div>Wrong Guesses ' + wrongGuesses + '</div>');
        $('.modal').fadeIn();
    }, 1000);
    resetGame();
}

function resetGame() {
    bank = 0;
    points = 0;
    pointsTotal = 0;
    wrongGuesses = 0;
    goToNextRound = 0;
    guess = false;
    beginBoolean = true;
    spinBoolean = false;
    wrongGuess = false;
    cantSolve = true;
    tryToSolve = false;
    gameOrder();
    $('#bank').html('$' + bank);
    $('#points').html('$' + points);
    $('#pointsTotal').html('$' + pointsTotal);
    for (var i = 0; i < 52; i++) {
        $('#block' + i).html("<img class='logo' src='images/logo.png' />");
        $('#block' + i).css({"background": "radial-gradient(circle, lime, darkgreen)"});
    }
}

function begin() {
    beginBoolean = false;
    cantSolve = false;
    $('.modal').fadeOut();
    setTimeout(function() {
        $('#input').hide();
        $('.game').fadeIn();
        $('#spin').fadeIn();
        spinBoolean = true;
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

function spin() {
    spinBoolean = false;
    $('#input').html('Guess Letter');
    if (!guess) {
        points = possiblePoints[Math.floor(Math.random()*possiblePoints.length)];
        if (points === 'BANKRUPT') {
            spinBoolean = true;
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
    if (!tryToSolve){
        if (!guess) {
            letter = event.key.toUpperCase();
            if ((letter === 'B') && (beginBoolean === true)) {
                begin();
            }
            if ((letter === 'S') && (spinBoolean === true)) {
                spin();
            }
        }
        if (guess) {
            letter = event.key.toUpperCase();
            if (alphabet.includes(letter)) {
                startgame(letter);
            }
        }
    }
});

$('#Q').click(function() {
    letter = 'Q';
    startgame(letter);
});
$('#W').click(function() {
    letter = 'W';
    startgame(letter);
});
$('#E').click(function() {
    letter = 'E';
    startgame(letter);
});
$('#R').click(function() {
    letter = 'R';
    startgame(letter);
});
$('#T').click(function() {
    letter = 'T';
    startgame(letter);
});
$('#Y').click(function() {
    letter = 'Y';
    startgame(letter);
});
$('#U').click(function() {
    letter = 'U';
    startgame(letter);
});
$('#I').click(function() {
    letter = 'I';
    startgame(letter);
});
$('#O').click(function() {
    letter = 'O';
    startgame(letter);
});
$('#P').click(function() {
    letter = 'P';
    startgame(letter);
});
$('#A').click(function() {
    letter = 'A';
    startgame(letter);
});
$('#S').click(function() {
    letter = 'S';
    startgame(letter);
});
$('#D').click(function() {
    letter = 'D';
    startgame(letter);
});
$('#F').click(function() {
    letter = 'F';
    startgame(letter);
});
$('#G').click(function() {
    letter = 'G';
    startgame(letter);
});
$('#H').click(function() {
    letter = 'H';
    startgame(letter);
});
$('#J').click(function() {
    letter = 'J';
    startgame(letter);
});
$('#K').click(function() {
    letter = 'K';
    startgame(letter);
});
$('#L').click(function() {
    letter = 'L';
    startgame(letter);
});
$('#Z').click(function() {
    letter = 'Z';
    startgame(letter);
});
$('#X').click(function() {
    letter = 'X';
    startgame(letter);
});
$('#C').click(function() {
    letter = 'C';
    startgame(letter);
});
$('#V').click(function() {
    letter = 'V';
    startgame(letter);
});
$('#B').click(function() {
    letter = 'B';
    startgame(letter);
});
$('#N').click(function() {
    letter = 'N';
    startgame(letter);
});
$('#M').click(function() {
    letter = 'M';
    startgame(letter);
});


function startgame(letter) {
    $('#input').html(letter);
    $('#keyboard').slideUp();
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
    if ((goToNextRound != gameWord.length) && (wrongGuesses < 10)) {
        setTimeout(function() {
            $('#input').fadeOut();
            setTimeout(function() {
                setTimeout(function() {
                    spinBoolean = true;
                }, 400);
                $('#spin').fadeIn();
                $('#input').html("Guess Letter");
            }, 400);
        }, 400);
    }
    if (wrongGuesses > 9) {
        setTimeout(function() {
            loser();
        }, 1000);
    }
}

function changeBoardBlock(funcGameWord, j) {
    if ($('#block' + j).html().length < 1) {
        $('#block' + j).css({"background": "blue"});
        setTimeout(function() {
            $('#block' + j).html("<div class='align'>" + funcGameWord[j] + "</div>");
            $('#block' + j).css({"background": "radial-gradient(circle, white, whitesmoke, lightgray)"});
            if (funcGameWord[j] == 'W') {
                $('#block' + j + ' .align').css({"transform": "scaleX(0.8) translateX(-4%)"})
            }
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
            $('#block' + i + ' .align').removeAttr("transform")
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

function heightContainer() {
    browserHeight = parseInt(window.innerHeight);
    document.querySelector('body').style.minHeight = (browserHeight * 1.25 + 'px');
    document.querySelector('.container').style.minHeight = (browserHeight * 1.25 + 'px');
}

$(window).resize(function() {
    heightContainer();
})

heightContainer();

setInterval(function() {
    var date = new Date();
    var sec = date.getSeconds();
    var mil = date.getMilliseconds();
    $('.container').css({"background": "linear-gradient(to bottom, rgba(0, 0, 0, 0) 33%, hsl(" + ((sec + (0.001 * mil)) * 6) + ", 100%, 50%)"});
}, 250);
