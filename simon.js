var GREEN = 0,
    RED = 1,
    YELLOW = 2,
    BLUE = 3,
    buttons = $('.button');

$(document).ready(function () {
    disableButtons();
    blackBaseHeightEqualsWidth();
    resizeButtons();

    var initialWindowHeight = $(window).height(),
        initialWindowWidth = $(window).width;
    
    $(window).resize(function () {
        var currentWindowHeight = $(window).height(),
            currentWindowWidth = $(window).width();
        if (currentWindowWidth != initialWindowWidth) { // width changed
            blackBaseHeightEqualsWidth();
        } else if (currentWindowHeight != initialWindowHeight) { // height changed
            blackBaseWidthEqualsHeight();
        }
        resizeButtons();
    });

    var powerOn = true,
        playerChoicePattern = "",
        currentPattern = "",
        pressNumber = 0;

    currentPattern += chooseRandomButton();
    updateScoreboard(currentPattern);
    showPattern(currentPattern);

    buttons.click(function () {
        playerChoicePattern += parseInt(this.dataset.id);
        if (playerChoicePattern == currentPattern) {
            disableButtons();
            playerChoicePattern = "";
            currentPattern += chooseRandomButton();
            updateScoreboard(currentPattern);
            showPattern(currentPattern);
            pressNumber = 0;
        } else if (playerChoicePattern.charAt(pressNumber) != currentPattern.charAt(pressNumber)) {
            disableButtons();
            playerChoicePattern = "";
            showPattern(currentPattern);
            pressNumber = 0;
        } else {
            ++pressNumber;
        }
    });

    buttons.mousedown(function () {
        playSound(parseInt(this.dataset.id));
    });
});

function blackBaseHeightEqualsWidth() {
    var blackBase = $('#black-base');
    var blackCircleWidth = blackBase.css("width");
    blackBase.height(blackCircleWidth);
}

function blackBaseWidthEqualsHeight() {
    var blackBase = $('#black-base');
    blackBase.width(blackBase.height());
}

function resizeButtons() {
    var rowHeight = $('#black-base').height();
    var width = $('#black-base').width();
    console.log("Height: " + rowHeight + " Width: " + width);
    buttons.height(rowHeight * .45);
    buttons.width(width * .45);
}

function chooseRandomButton() {
    /* chooses a button between 0 and 3:
        GREEN:  0
        RED:    1
        YELLOW: 2
        BLUE:   3
    */
    return Math.floor((Math.random() * 4));
}

function showPattern(pattern) {
    var i = 0;
    highlightNextButton(pattern);

    function highlightNextButton(pattern) {
        setTimeout(function () {
            var color = parseInt(pattern.charAt(i++)),
                buttonIds = ['#green-button', '#red-button', '#yellow-button', '#blue-button'],
                buttonId = buttonIds[color],
                button = $(buttonId),
                patternLength = pattern.length;
            button.css('opacity', 1); // light up button
            playSound(color);
            setTimeout(function () {
                button.css('opacity', 0.7);
                if (i >= patternLength) enableButtons();
            }, 700);
            if (i < patternLength) highlightNextButton(pattern);
        }, 1000);
    }
}
function disableButtons() {
    buttons.prop('disabled', true);
}

function enableButtons() {
    buttons.prop('disabled', false);
}

function updateScoreboard(currentPattern) {
    $('#score-counter').text(currentPattern.length - 1);
}

function playSound(color) {
    switch (color) {
        case GREEN:
            var greenButtonAudio = document.getElementById('green-button-audio');
            greenButtonAudio.currentTime = 0;
            greenButtonAudio.play();
            break;
        case RED:
            var redButtonAudio = document.getElementById('red-button-audio');
            redButtonAudio.currentTime = 0;
            redButtonAudio.play();
            break;
        case YELLOW:
            var yellowButtonAudio = document.getElementById('yellow-button-audio');
            yellowButtonAudio.currentTime = 0;
            yellowButtonAudio.play();
            break;
        case BLUE:
            var blueButtonAudio = document.getElementById('blue-button-audio');
            blueButtonAudio.currentTime = 0;
            blueButtonAudio.play();
            break;
    }
}
