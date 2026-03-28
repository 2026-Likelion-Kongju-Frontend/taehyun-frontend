// ========================
// DOM SELECTORS
// ========================

const timeline = document.querySelector(".timeline");
const track = document.querySelector(".timeline-track");
const cards = document.querySelectorAll(".project-card");
const playerProgress = document.querySelector(".player-bar-progress");

// 첫 카드 기본 활성화
if (cards.length > 0) {
    cards[0].classList.add("is-active");
}

// ========================
// TIMELINE SCROLL
// ========================

function updateTimeline() {
    if (!timeline || !track || cards.length === 0 || !playerProgress) return;

    const timelineTop = timeline.offsetTop;
    const timelineHeight = timeline.offsetHeight;
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;

    const start = timelineTop;
    const end = timelineTop + timelineHeight - viewportHeight;

    if (scrollY < start) {
        playerProgress.style.width = "0%";
        track.style.transform = "translateX(0)";
        cards.forEach((card, index) => {
            card.classList.toggle("is-active", index === 0);
        });
        return;
    }

    if (scrollY > end) {
        playerProgress.style.width = "100%";

        const maxTranslate = Math.max(track.scrollWidth - window.innerWidth, 0);
        track.style.transform = `translateX(-${maxTranslate}px)`;

        cards.forEach((card, index) => {
            card.classList.toggle("is-active", index === cards.length - 1);
        });
        return;
    }

    const progress = (scrollY - start) / (end - start);
    const maxTranslate = Math.max(track.scrollWidth - window.innerWidth, 0);
    const translateX = progress * maxTranslate;

    track.style.transform = `translateX(-${translateX}px)`;
    playerProgress.style.width = `${progress * 100}%`;

    const viewportCenter = translateX + window.innerWidth / 2;

    let closestCard = null;
    let closestDistance = Infinity;

    cards.forEach((card) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(viewportCenter - cardCenter);

        if (distance < closestDistance) {
            closestDistance = distance;
            closestCard = card;
        }
    });

    cards.forEach((card) => {
        card.classList.remove("is-active");
    });

    if (closestCard) {
        closestCard.classList.add("is-active");
    }
}

window.addEventListener("scroll", updateTimeline);
window.addEventListener("resize", updateTimeline);
window.addEventListener("load", updateTimeline);