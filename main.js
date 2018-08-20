//            _1234567890_/+1234567890+\/+1234567890+\-_1234567890_
var words = [' HYPERTEXT      MARKUP       LANGUAGE',
             '              CASCADING     STYLE SHEET',
             '              DONUT SHOP      COFFEE',
             ' RECURSION     RECURSION    RECURSION     RECURSION',
             '               JANA IS       SO COOL',
             '             CRAB BISQUE',
             '               THIS IS       ENGLAND',
             '              CAMEL CASE',
             '             GET ELEMENT      BY ID',
             '   I COME        FROM         A LAND     DOWN UNDER']
//            _1234567890_/+1234567890+\/+1234567890+\-_1234567890_
var letter;
var game = 0;
var goToNextRound = 0;
var roundComplete = [];
var gameWord = [];
var guess = false;
var beginBoo = true;
var spinBoo = false;
var score = 0;
var points = 0;
var pointsTotal = 0;
var possiblePoints = [100, 100, 100, 100, 100, 200, 200, 200, 200, 200, 300, 300, 300, 300, 300, 400, 400, 400, 400, 500, 500, 500, 500, 600, 600, 600, 600, 700, 700, 700, 800, 800, 800, 900, 900, 1000, 1000, 1500, 2000, 'BANKRUPT'];
console.log(possiblePoints.length);

$('.modal').hide();
$('.game').hide();
$('#spin').hide();
$('#points').hide();
$('.block').html("<img class='logo' src='images/logo.png' />");

setTimeout(function() {
    message();
}, 401);

function message() {
    setTimeout(function() {
        beginBoo = true;
        $('.modal').fadeIn();
    }, 401);
    $('#message').html("Are You Ready For Wheel Of JavaScript?");
    $('#round').html("Get Ready For Round " + (game + 1));
    $('#input').html("Enter Any Key To Guess");
    for (var i = 0; i < words[game].length; i++) {
        roundComplete.push(0);
    }
    spinBoo = false;
}

function winner() {
    setTimeout(function() {
        beginBoo = true;
        $('.modal').fadeIn();
    }, 401);
    $('#message').html("You Win!!!");
    $('#round').html("Would You Like To Play Again?");
    $('#input').html("");
    game = 0;
    for (var i = 0; i < words[game].length; i++) {
        roundComplete.push(0);
    }
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
    gameWord = words[game].split('');
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
            pointsTotal = 0;
            $('#pointsTotal').html('$0')
            $('#points').html('Bankrupt');
        } else {
            $('#points').html('$' + points);
            $('#spin').fadeOut(400);
            $('#points').hide().fadeIn();
            setTimeout(function() {
                $('#input').fadeIn();
                setTimeout(function() {
                    guess = true;
                },500);
            }, 500);
        }
    }
}
//add more booleans
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

function startgame(letter) {
    if (gameWord.includes(letter)) {
        for (var i = 0; i < gameWord.length; i++) {
            if ((gameWord[i] === letter) && (roundComplete[i] === 0)) {
                pointsTotal += points;
                $('#pointsTotal').html('$' + pointsTotal);
            }
            if (gameWord[i] === letter) {
                $('#block' + i).html("<div class='align'>" + gameWord[i] + "</div>");
            roundComplete[i] = 1;
            }
        }
    }
    goToNextRound = 0;
    for (var i = 0; i < gameWord.length; i++) {
        goToNextRound += roundComplete[i];
        if (goToNextRound === gameWord.length) {
            nextRound();
        }
    }
    guess = false;
    setTimeout(function() {
        $('#input').fadeOut();
        setTimeout(function() {
            setTimeout(function() {
                spinBoo = true;
            }, 500);
            $('#spin').fadeIn();
        }, 500);
    }, 500);
}

function nextRound() {
    setTimeout(function() {
        $('#spin').fadeOut();
        $('.game').fadeOut();
        for (var i = 0; i < words[game].length; i++) {
            $('#block' + i).html("<img class='logo' src='images/logo.png' />");
            $('#block' + i).css({"background": "radial-gradient(circle, lime, darkgreen)"});
        }
        goToNextRound = 0;
        roundComplete = [];
        game++;
        if (game === words.length) {
            winner();
        } else {
            message();
        }
    },1000);
}

function heightContainer() {
    browserHeight = parseInt(window.innerHeight);
    if (browserHeight < 737) {
        document.querySelector('body').style.height = ('736px');
        document.querySelector('.container').style.height = ('736px');
    } else {
        document.querySelector('body').style.height = (browserHeight + 'px');
        document.querySelector('.container').style.height = (browserHeight + 'px');
    }
}

$(window).resize(function() {
    heightContainer();
})

heightContainer();