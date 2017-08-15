$(function () {
    "use strict";

    var cube = document.getElementsByClassName("cube"),
        q = 0.2;

    function handleMouse(e) {
        var x = e.clientX - window.innerWidth / 2,
            y = e.clientY - window.innerHeight / 2,
            i;

        x = x * q * 1.5;
        y = -y * q;

        for (i = 0; i < cube.length; i++) {
            cube[i].style.transform = "rotateY(" + x + "deg) rotateX(" + y + "deg)";
        }
    }

    function handleStart() {
        var x = -100,
            y = 200,
            cube = document.getElementsByClassName("cube"),
            i;

        x = x * q * 1.5;
        y = -y * q;

        for (i = 0; i < cube.length; i++) {
            cube[i].style.transform = "rotateY(" + x + "deg) rotateX(" + y + "deg)";
        }
    }

    handleStart();

    document.addEventListener("mousemove", function(e) {
      var selfTarget = e;
      setTimeout(handleMouse(selfTarget), 200);
    });
});