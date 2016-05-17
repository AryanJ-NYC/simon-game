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
        currentPattern = "";
    buttons = ['#green-button', '#red-button', '#yellow-button', '#blue-button'];

    currentPattern += chooseRandomButton();
    console.log(currentPattern);
    showPattern(currentPattern);
    $('.button').click(function () {
        playerChoicePattern += this.dataset.id;
        if (playerChoicePattern == currentPattern) {
            console.log("Patterns Match");
            disableButtons();
            currentPattern += chooseRandomButton();
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
    setTimeout(function () {
        for (var i = 0; i < pattern.length; i++) {
            var buttonId = buttons[pattern[i]];
            $(buttonId).css('opacity', 1);
            setTimeout(function () {
                $(buttonId).css('opacity', 0.7);
                enableButtons()
            }, 1000);
        }
    }, 2000);
}

function disableButtons() {
    $('.button').prop('disabled', true);
}

function enableButtons() {
    $('.button').prop('disabled', false);
}
