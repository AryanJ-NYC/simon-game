$(document).ready(function () {
    blackBaseHeightEqualsWidth();
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

