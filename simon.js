$(document).ready(function () {
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
        BLUE = 3;
    buttons = ['#green-button', '#red-button', '#yellow-button', '#blue-button'];
    var currentPattern = [];
    currentPattern.push(chooseRandomButton());
    showPattern(currentPattern);

    // TODO player move
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
    $('.button').prop('disabled', true);
    for (var i = 0; i < pattern.length; i++) {
        var buttonId = buttons[pattern[i]];
        $(buttonId).css('opacity', 0.7);
        setTimeout(function() {
            $(buttonId).css('opacity', 1);
            $('.button').prop('disabled', false);
        }, 1000);
    }
}
