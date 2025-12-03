// * This script handles the Netflix-style scrolling and auto-slide *

$(document).ready(function () {

    // * Grab the carousel track (the scrollable row of images) *
    const track = $(".carousel-track");

    // * Move right when user clicks the next button *
    $(".next").click(function () {
        track.animate({ scrollLeft: track.scrollLeft() + 350 }, 400);
    });

    // * Move left when user clicks the prev button *
    $(".prev").click(function () {
        track.animate({ scrollLeft: track.scrollLeft() - 350 }, 400);
    });

    // * Automatic movement — yeah, like Netflix auto scroll *
    setInterval(() => {
        track.animate({ scrollLeft: track.scrollLeft() + 350 }, 600);
    }, 3500); // * Every 3.5 seconds *
});
