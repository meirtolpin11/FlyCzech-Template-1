window.onload = function () {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.getElementById("background-video-1").play();
    }
}