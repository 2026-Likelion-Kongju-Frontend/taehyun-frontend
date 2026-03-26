const timeline = document.querySelector(".timeline");
const track = document.querySelector(".timeline-track");

console.log(track.scrollWidth, window.innerWidth);

window.addEventListener("scroll", () => {
    const timelineTop = timeline.offsetTop;
    const timelineHeight = timeline.offsetHeight;
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;

    const start = timelineTop;
    const end = timelineTop + timelineHeight - viewportHeight;

    if (scrollY >= start && scrollY <= end) {
        const progress = (scrollY - start) / (end - start);

        const maxTranslate = track.scrollWidth - window.innerWidth;
        const translateX = progress * maxTranslate;

        track.style.transform = `translateX(-${translateX}px)`;
    }
});