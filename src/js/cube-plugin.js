$(function () {
    "use strict";

    var cube = $(".cube"),
        q = 0.2;

    function handleMouse(e) {
        var x = e.clientX - window.innerWidth / 2,
            y = e.clientY - window.innerHeight / 2,
            i;

        x = x * q * 1.5;
        y = -y * q;

        $(cube).attr("style", "transform: rotate3d(0, 1, 0, " + x + "deg) rotate3d(1, 0, 0, " + y + "deg)");
    }

    function handleStart() {
        var x = -100,
            y = 200,
            cube = $(".cube"),
            i;

        x = x * q * 1.5;
        y = -y * q;

        $(cube).attr("style", "transform: rotate3d(0, 1, 0, " + x + "deg) rotate3d(1, 0, 0, " + y + "deg)");
    }

    handleStart();

    document.addEventListener("mousemove", handleMouse);
});