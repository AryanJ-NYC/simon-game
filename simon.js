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
    var buttons = $('.button'),
        buttonWidth = buttons.parent();
    buttons.height(rowHeight * .8);
    buttons.width(rowWidth * .5 * .8);
}