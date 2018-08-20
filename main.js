//            1234567890A_1234567890ABC_1234567890ABC_1234567890AB
var words = [' HYPERTEXT      MARKUP       LANGUAGE',
             '              CASCADING    STYLE SHEET',
             '              DONUT SHOP      COFFEE',
//            1234567890A_1234567890ABC_1234567890ABC_1234567890AB
             ' RECURSION    RECURSION     RECURSION    RECURSION',
             '               JANA IS       SO COOL',
             '             CRAB BISQUE',
             '               THIS IS       ENGLAND',
             '              CAMEL CASE',
             '             GET ELEMENT      BY ID',
             '   I COME    FROM A LAND    DOWN UNDER']
var letter;
var game = 0;
var goToNextRound = 0;
var roundComplete = [];
var gameWord = [];
var guess = false;

$('.modal').hide();
$('.game').hide();
$('.block').html("<img class='logo' src='images/logo.png' />");

setTimeout(function() {
    message();
}, 400);

function message() {
    setTimeout(function() {
        $('.modal').fadeIn();
    }, 400);
    $('#message').html("Are You Ready For Wheel Of JavaScript?");
    $('#round').html("Get Ready For Round " + (game + 1));
    $('#input').html("Enter Any Key To Guess");
    for (var i = 0; i < words[game].length; i++) {
        roundComplete.push(0);
    }
}

function winner() {
    setTimeout(function() {
        $('.modal').fadeIn();
    }, 400);
    $('#message').html("You Win!!!");
    $('#round').html("Would You Like To Play Again?");
    $('#input').html("");
    game = 0;
    for (var i = 0; i < words[game].length; i++) {
        roundComplete.push(0);
    }
}

$('#begin').click(function() {
    $('.modal').fadeOut();
    setTimeout(function() {
        $('.game').fadeIn();
        guess = true;
    }, 400);
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
});

document.addEventListener('keypress', function (event) {
    if (guess) {
        letter = event.key.toUpperCase();
        document.getElementById('input').innerText = letter;
        startgame(letter);
    }
});

function startgame(letter) {
    if (gameWord.includes(letter)) {
        for (var i = 0; i < gameWord.length; i++) {
            if (gameWord[i] === letter) {
                $('#block' + i).html("<div>" + gameWord[i] + "</div>");
                // $('#block' + i).css({"background": 'radial-gradient(circle, white, whitesmoke, lightgray)'});
                roundComplete[i] = 1;
            }
        }
    }
    goToNextRound = 0;
    for (var i = 0; i < gameWord.length; i++) {
        goToNextRound += roundComplete[i];
        if (goToNextRound === gameWord.length) {
            guess = false;
            nextRound();
        }
    }
}

function nextRound() {
    setTimeout(function() {
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
    },666);
}

function heightContainer() {
    browserHeight = parseInt(window.innerHeight);
    document.querySelector('.container').style.height = (browserHeight + 'px');
}

$(window).resize(function() {
    heightContainer();
})

heightContainer();