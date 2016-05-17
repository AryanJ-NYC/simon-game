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
        GREEN = 0,
        RED = 1,
        YELLOW = 2,
        BLUE = 3,
        playerChoicePattern = "",
        currentPattern = "",
        pressNumber = 0;
    buttons = ['#green-button', '#red-button', '#yellow-button', '#blue-button'];

    currentPattern += chooseRandomButton();
    console.log(currentPattern);
    showPattern(currentPattern);

    $('.button').click(function () {
        console.log("Press number: " + pressNumber);
        playerChoicePattern += this.dataset.id;
        console.log("Players choice pattern is: " + playerChoicePattern + ". Real pattern is: " + currentPattern);
        if (playerChoicePattern == currentPattern) {
            console.log("Patterns match!");
            disableButtons();
            playerChoicePattern = "";
            currentPattern += chooseRandomButton();
            showPattern(currentPattern);
            pressNumber = 0;
        } else if (playerChoicePattern.charAt(pressNumber) != currentPattern.charAt(pressNumber)) {
            console.log("Patterns don't match!");
            disableButtons();
            playerChoicePattern = "";
            showPattern(currentPattern);
        } else {
            ++pressNumber;
        }
    });
});

function blackBaseHeightEqualsWidth() {
    var blackBase = $('#black-base');
    var blackCircleWidth = blackBase.width();
    blackBase.height(blackCircleWidth);
}

function blackBaseWidthEqualsHeight() {
    var blackBase = $('#black-base');
    var blackCircleHeight = blackBase.height();
    blackBase.width(blackCircleHeight);
}

function resizeButtons() {
    var buttonRow = $('.button-row'),
        rowHeight = buttonRow.height(),
        rowWidth = buttonRow.width();
    var buttons = $('.button');
    buttons.height(rowHeight * .8);
    
}

function chooseRandomButton() {
    /* chooses a button between 0 and 3:
        GREEN:  0
        RED:    1
        YELLOW: 2
        BLUE:   3
    */
    return Math.floor((Math.random() * 3));
}

function showPattern(pattern) {
    function highlightNextButton(pattern) {
        setTimeout(function () {
            var nextButton = pattern.charAt(i++),
                buttonId = buttons[nextButton];
            console.log(buttonId);
            $(buttonId).css('opacity', 1);
            setTimeout(function () {
                $(buttonId).css('opacity', 0.7);
                enableButtons()
            }, 700);
            if (i < pattern.length) highlightNextButton(pattern);
        }, 1000);
    }
    var i = 0;
    highlightNextButton(pattern);
}

function disableButtons() {
    console.log("DISABLE!");
    $('.button').prop('disabled', true);
}

function enableButtons() {
    console.log("EnABLE!");
    $('.button').prop('disabled', false);
}
