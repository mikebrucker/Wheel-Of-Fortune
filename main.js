//             _1234567890_/+1234567890+\/+1234567890+\-_1234567890_
let words = [['  HYPERTEXT     MARKUP       LANGUAGE', 'Code'],
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
            ],
//             _1234567890_/+1234567890+\/+1234567890+\_1234567890_
game = 0,
goToNextRound = 0,
score = 0,
points = 0,
pointsTotal = 0,
bank = 0,
wrongGuesses = 0,
roundComplete = [],
gameWord = [],
guess = false,
beginBoolean = true,
spinBoolean = false,
wrongGuess = false,
cantSolve = true,
tryToSolve = false,
solveInputActive = false;

const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
possiblePoints = ['BANKRUPT', 'BANKRUPT', 300, 350, 400, 450, 500, 500, 550, 600, 600, 650, 700, 700, 750, 800, 800, 850, 900, 900, 1000, 1500, 2000, 'BANKRUPT', 'BANKRUPT', 300, 350, 400, 450, 500, 500, 550, 600, 600, 650, 700, 700, 750, 800, 800, 850, 900, 1000, 1500, 2000, 2500, 'BANKRUPT', 'BANKRUPT', 300, 350, 400, 450, 500, 500, 550, 600, 600, 650, 700, 700, 750, 800, 800, 850, 900, 1000, 2000, 2500, 3500, 'BANKRUPT', 'BANKRUPT', 1000000];

$('.modal').hide();
$('.game').hide();
$('#spin').hide();
$('.block').html("<img class='logo' src='images/logo.png' />");

const logAnswers = () => {
    let puzzleLog = [];
    console.log('Game Answers:');
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    for (let i = 0; i < 10; i++) {
        puzzleLog.push(words[i][0].split(' '));
        for (let j = 0; j < puzzleLog[i].length; j++){
            if (1 > puzzleLog[i][j]) {
                puzzleLog[i].splice(j, 1);
                j--;
            }
        }
        puzzleLog[i] = puzzleLog[i].join(' ');
        console.log('Puzzle ' + (i + 1) + ': ' + puzzleLog[i]);
    }
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    console.log('Call fullLogOfAnswers() For All Possible Games');
}

const fullLogOfAnswers = () => {
    let puzzleLog = [];
    console.log('Full List of Answers:')
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    for (let i = 0; i < words.length; i++) {
        puzzleLog.push(words[i][0].split(' '));
        for (let j = 0; j < puzzleLog[i].length; j++){
            if (1 > puzzleLog[i][j]) {
                puzzleLog[i].splice(j, 1);
                j--;
            }
        }
        puzzleLog[i] = puzzleLog[i].join(' ');
        console.log('Puzzle ' + (i + 1) + ': ' + puzzleLog[i]);
    }
}

const gameOrder = () => {
    let numberOfAnswers = words.length;
    let uniqueGameOrder = [];
    for (let i = 0; i < numberOfAnswers; i++) {
        let x = Math.floor(Math.random() * words.length);
        uniqueGameOrder.push(words[x]);
        words.splice(x, 1);
    }
    words = uniqueGameOrder;
    logAnswers();
}

gameOrder();

const solve = wordGuess => {
    guess = false;
    if (tryToSolve) {
        let solveGuess = wordGuess
        let x = solveGuess.length
        for (let i = 0; i < x; i++) {
            if (solveGuess[i] == ' ') {
                solveGuess.splice(i, 1);
                i -= 1;
            }
        }
        solveGuess = solveGuess.join('');
        let solvePuzzle = [];
        for (let i = 0; i < gameWord.length; i++) {
            solvePuzzle.push(gameWord[i]);
        }
        for (let i = 0; i < gameWord.length; i++) {
            if (solvePuzzle[i] == ' ') {
                solvePuzzle.splice(i, 1);
                i -= 1;
            }
        }
        solvePuzzle = solvePuzzle.join('');
        if (solveGuess == solvePuzzle) {
            for (let i = 0; i < gameWord.length; i++) {
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

$('#solveInput').focus(function() {
    solveInputActive = true;
});

$('#solveInput').blur(function() {
    solveInputActive = false;
});

$('#solvePuzzle').click(function() {
    if (!cantSolve && $('#solveInput').val().length > 0) {
        solve($('#solveInput').val().toUpperCase().split(''));
        $('#spin').fadeOut();
    }
});

$('#input').click(function() {
    $('#keyboard').slideToggle();
});

setTimeout(function() {
    message();
}, 401);

const message = () => {
    spinBoolean = false;
    wrongGuesses = 0;
    setTimeout(function() {
        beginBoolean = true;
        $('.modal').fadeIn();
    }, 401);
    $('#message').html("Wheel Of JavaScript");
    $('#round').html("Get Ready For Round " + (game + 1));
    $('#input').html("Guess Letter");
    for (let i = 0; i < words[game][0].length; i++) {
        roundComplete.push(0);
    }
    cantSolve = true;
    $('#keyboard').slideUp();
}

const winner = () => {
    setTimeout(function() {
        game = 0;
        beginBoolean = true;
        $('.modal').fadeIn();
    }, 401);
    $('.game').fadeOut();

    $('#message').html("You Win Wheel of JavaScript!");
    $('#round').html("You Won $" + bank + "!<div>Would You Like To Play Again?</div>");
    $('#input').html("Guess Letter");
    $('#gameCounter').html('<div>Round: ' + game + '  ||  Wrong Guesses ' + wrongGuesses + '</div>');
    for (let i = 0; i < words[game][0].length; i++) {
        roundComplete.push(0);
    }
    resetGame();
}

const loser = () => {
    $('#message').html("You Lose!");
    $('#round').html("Would You Like To Play Again?");
    $('#input').html("Guess Letter");
    roundComplete = [];
    for (let i = 0; i < words[game][0].length; i++) {
        roundComplete.push(0);   
    }
    $('.game').fadeOut();
    setTimeout(function() {
        game = 0;
        beginBoolean = true;
        $('#gameCounter').html('<div>Round: ' + (game + 1) + '  ||  Wrong Guesses ' + wrongGuesses + '</div>');
        $('.modal').fadeIn();
    }, 1000);
    resetGame();
}

const resetGame = () => {
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
    $('#keyboard').slideUp();
    gameOrder();
    $('#bank').html('Bank: $' + bank);
    $('#points').html('Spin: $' + points);
    $('#pointsTotal').html('Round: $' + pointsTotal);
    for (let i = 0; i < 52; i++) {
        $('#block' + i).html("<img class='logo' src='images/logo.png' />");
        $('#block' + i).css({"background": "radial-gradient(circle, lime, darkgreen)"});
    }
}

const begin = () => {
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
    for (let i = 0; i < gameWord.length; i++) {
        $('#block' + i).css({"background": 'radial-gradient(circle, white, whitesmoke, lightgray)'});
        $('#block' + i).html("");
        if (gameWord[i] === ' ') {
            $('#block' + i).css({"background": "radial-gradient(circle, lime, darkgreen)"});
            $('#block' + i).html("<img class='logo' src='images/logo.png' />");
            roundComplete[i] = 1;
        }
    }
}

const spin = () => {
    $('#input').html('Guess Letter');
    if (!guess) {
        points = possiblePoints[Math.floor(Math.random()*possiblePoints.length)];
        if (points === 'BANKRUPT') {
            pointsTotal = 0;
            $('#pointsTotal').html('Round: $0')
            $('#points').html('Bankrupt');
        } else {
            $('#points').html('Spin: $' + points);
            $('#spin').fadeOut();
            setTimeout(function() {
                spinBoolean = false;
                $('#input').slideDown();
                    guess = true;
            }, 500);
        }
    }
}

$(document).on('keypress', function (event) {
    let letter;
    if (!tryToSolve && !solveInputActive){
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
    startgame('Q');
});
$('#W').click(function() {
    startgame('W');
});
$('#E').click(function() {
    startgame('E');
});
$('#R').click(function() {
    startgame('R');
});
$('#T').click(function() {
    startgame('T');
});
$('#Y').click(function() {
    startgame('Y');
});
$('#U').click(function() {
    startgame('U');
});
$('#I').click(function() {
    startgame('I');
});
$('#O').click(function() {
    startgame('O');
});
$('#P').click(function() {
    startgame('P');
});
$('#A').click(function() {
    startgame('A');
});
$('#S').click(function() {
    startgame('S');
});
$('#D').click(function() {
    startgame('D');
});
$('#F').click(function() {
    startgame('F');
});
$('#G').click(function() {
    startgame('G');
});
$('#H').click(function() {
    startgame('H');
});
$('#J').click(function() {
    startgame('J');
});
$('#K').click(function() {
    startgame('K');
});
$('#L').click(function() {
    startgame('L');
});
$('#Z').click(function() {
    startgame('Z');
});
$('#X').click(function() {
    startgame('X');
});
$('#C').click(function() {
    startgame('C');
});
$('#V').click(function() {
    startgame('V');
});
$('#B').click(function() {
    startgame('B');
});
$('#N').click(function() {
    startgame('N');
});
$('#M').click(function() {
    startgame('M');
});

const startgame = letter => {
    $('#input').html(letter);
    $('#keyboard').slideUp();
    wrongGuess = true;
    if (gameWord.includes(letter)) {
        for (let i = 0; i < gameWord.length; i++) {
            if ((gameWord[i] === letter) && (roundComplete[i] === 0)) {
                pointsTotal += points;
                $('#pointsTotal').html('Round: $' + pointsTotal);
                changeBoardBlock(gameWord, i);
                roundComplete[i] = 1;
                wrongGuess = false;
            }
        }
    }
    if (wrongGuess) {
        wrongGuesses++;
    }
    $('#gameCounter').html('<div>Round: ' + (game + 1) + '  ||  Wrong Guesses ' + wrongGuesses + '</div>');
    goToNextRound = 0;
    for (let i = 0; i < gameWord.length; i++) {
        goToNextRound += roundComplete[i];
        if (goToNextRound === gameWord.length) {
            nextRound();
        }
    }
    guess = false;
    if ((goToNextRound != gameWord.length) && (wrongGuesses < 10)) {
        setTimeout(function() {
            $('#input').slideUp();
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

const changeBoardBlock = (funcGameWord, j) => {
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

const nextRound = () => {
    setTimeout(function() {
        bank += pointsTotal
        $('#bank').html('Bank: $' + bank);
        pointsTotal = 0;
        $('#pointsTotal').html('Round: $' + pointsTotal);
        $('.game').fadeOut();
        for (let i = 0; i < words[game][0].length; i++) {
            $('#block' + i).html("<img class='logo' src='images/logo.png' />");
            $('#block' + i).css({"background": "radial-gradient(circle, lime, darkgreen)"});
            $('#block' + i + ' .align').removeAttr("transform")
        }
        goToNextRound = 0;
        roundComplete = [];
        game++;
        $('#gameCounter').html('<div>Round: ' + (game + 1) + '  ||  Wrong Guesses 0</div>');
        if (game > 9) {
            winner();
        } else {
            message();
        }
    }, 2000);
}

const heightContainer = () => {
    browserHeight = parseInt(window.innerHeight);
    document.querySelector('body').style.minHeight = (browserHeight * 1.25 + 'px');
    document.querySelector('.container').style.minHeight = (browserHeight * 1.25 + 'px');
}

$(window).resize(function() {
    heightContainer();
})

heightContainer();

setInterval(function() {
    let date = new Date();
    let sec = date.getSeconds();
    let mil = date.getMilliseconds();
    $('.container').css({"background": "linear-gradient(to bottom, rgba(0, 0, 0, 0) 33%, hsl(" + ((sec + (0.001 * mil)) * 6) + ", 100%, 50%)"});
    $('html').css({"background": "hsl(" + ((sec + (0.001 * mil)) * 6) + ", 100%, 50%)"});
}, 250);
