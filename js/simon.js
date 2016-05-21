var GREEN = 0,
    RED = 1,
    YELLOW = 2,
    BLUE = 3,
    buttonSpeed = 1000,
    lightSpeed = 900,
    buttons = $('.button'),
    currentPattern = "",
    playerChoicePattern = "",
    pressNumber = 0,
    strictMode = document.getElementById('strict-mode-select').checked;

$(document).ready(function () {
    disableButtons();
    blackBaseHeightEqualsWidth();
    resizeButtons();
    resetGame();

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

    buttons.click(function () {
        playerChoicePattern += parseInt(this.dataset.id);
        if (playerChoicePattern == currentPattern) {
            // correct pattern
            buttonSpeed *= .92;
            lightSpeed *= .92;
            disableButtons();
            playerChoicePattern = "";
            currentPattern += chooseRandomButton();
            updateScoreboard(currentPattern);
            showPattern(currentPattern);
            pressNumber = 0;
        } else if (playerChoicePattern.charAt(pressNumber) != currentPattern.charAt(pressNumber)) {
            // incorrect pattern
            $('#score-display').text("! !");
            if (strictMode) {
                setTimeout(resetGame, 750);
            } else {
                disableButtons();
                playerChoicePattern = "";
                showPattern(currentPattern);
                pressNumber = 0;
                setTimeout(updateScoreboard, 750, currentPattern);
            }
        } else {
            // ongoing pattern
            ++pressNumber;
        }
    });

    buttons.mousedown(function () {
        playSound(parseInt(this.dataset.id));
    });

    var strictModeSelect = $('#strict-mode-select');
    strictModeSelect.change(function () {
        strictMode = this.checked;
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
            }, lightSpeed);
            if (i < patternLength) highlightNextButton(pattern);
        }, buttonSpeed);
    }
}
function disableButtons() {
    buttons.prop('disabled', true);
    $('#reset-button').prop('disabled', true);
}

function enableButtons() {
    buttons.prop('disabled', false);
    $('#reset-button').prop('disabled', false);
}

function updateScoreboard(currentPattern) {
    $('#score-display').text(currentPattern.length - 1);
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

function resetGame() {
    disableButtons();
    currentPattern = "";
    currentPattern += chooseRandomButton();
    playerChoicePattern = "";
    updateScoreboard(currentPattern);
    showPattern(currentPattern);
    pressNumber = 0;
}
