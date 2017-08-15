var colours = [
    ['#b70445', '#5d07eb'],
    ['#03fa66', '#e7c008']
];

function hex2rgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return 'rgb(' + parseInt(result[1], 16) + ',' + parseInt(result[2], 16) + ',' + parseInt(result[3], 16) + ')';
}

function rgb2hex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }

    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

function rgbArray(rgb) {
    return rgb.split('(')[1].split(')')[0].split(',');
}

//
// finds transition colour based on mouse position
function transitionColour(from, to, width, x) {

    var m = x / width;
    var r, g, b;

    r = Math.ceil(from[0] * m + to[0] * (1 - m));
    g = Math.ceil(from[1] * m + to[1] * (1 - m));
    b = Math.ceil(from[2] * m + to[2] * (1 - m));

    return rgb2hex('rgb(' + r + ', ' + g + ', ' + b + ')');

}
function generateRandom($min, $max) {
    return Math.floor(Math.random() * ($max - $min + 1));
}
$(function () {
    "use strict";

    var gradientContainer = $('.gradient-container');

    var colors = [
        [235, 181, 150],
        [83, 63, 108],
        [235, 181, 150],
        [83, 63, 108]];

    var step = 0;
//color table indices for:
// current color left
// next color left
// current color right
// next color right
    var colorIndices = [0, 1, 2, 3];

//transition speed
    var gradientSpeed = 0.002;

    function updateGradient() {

        if ($ === undefined) return;

        var c0_0 = colors[colorIndices[0]];
        var c0_1 = colors[colorIndices[1]];
        var c1_0 = colors[colorIndices[2]];
        var c1_1 = colors[colorIndices[3]];

        var istep = 1 - step;
        var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
        var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
        var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
        var color1 = "rgb(" + r1 + "," + g1 + "," + b1 + ")";

        var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
        var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
        var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
        var color2 = "rgb(" + r2 + "," + g2 + "," + b2 + ")";

        gradientContainer.css({
            background: "-webkit-gradient(linear, left top, right top, from(" + color1 + "), to(" + color2 + "))"
        }).css({
            background: "-moz-linear-gradient(left, " + color1 + " 0%, " + color2 + " 100%)"
        });

        step += gradientSpeed;
        if (step >= 1) {
            step %= 1;
            colorIndices[0] = colorIndices[1];
            colorIndices[2] = colorIndices[3];

            //pick two new target color indices
            //do not pick the same as the current one
            colorIndices[1] = ( colorIndices[1] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;
            colorIndices[3] = ( colorIndices[3] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;

        }
    }

    /*if ($('.gradient-container:hover').length === 0) {

        setInterval(updateGradient, 10);
    }*/

    if(window.innerWidth <= 700) {
        setInterval(updateGradient, 10);
    }

    var timeout = null;
    $(document).on("mousemove", function (e) {
        clearTimeout(timeout);
        gradientContainer.removeClass('keyframes');
        timeout = setTimeout(function () {
            gradientContainer.addClass('keyframes');
        }, 2000);

        var xPos = e.pageX,
            width = window.innerWidth,
            yPos = e.pageY,

            //
            // convert hex to rgb
            topLeft = hex2rgb(colours[0][0]),
            topRight = hex2rgb(colours[1][0]),

            bottomLeft = hex2rgb(colours[0][1]),
            bottomRight = hex2rgb(colours[1][1]);

        //
        // get transition colour
        var bottomTransition = transitionColour(rgbArray(bottomRight), rgbArray(bottomLeft), width, xPos);
        var topTransition = transitionColour(rgbArray(topRight), rgbArray(topLeft), width, yPos);

        if ($('.gradient-container:hover').length !== 0) {
            gradientContainer.css({
                'background': 'linear-gradient(' + topTransition + ', ' + bottomTransition + ')'
            });

            /*$('.face').css({
             'background': 'linear-gradient(' + topTransitionbottomTransition + ', ' + bottomTransition + ')'
             });*/
        }

    });
});