// ========================
// DOM SELECTORS
// ========================

const timeline = document.querySelector(".timeline");
const track = document.querySelector(".timeline-track");
const cards = document.querySelectorAll(".project-card");
const playerBar = document.getElementById("player-bar");
const playerProgress = document.querySelector(".player-bar-progress");
const playerTitle = document.querySelector(".player-title");
const playerSubtitle = document.querySelector(".player-subtitle");

// ========================
// PLAYER TEXT UPDATE
// ========================

function updatePlayerText(card) {
    if (!card) return;

    if (playerTitle) {
        playerTitle.textContent = card.dataset.title || "";
    }

    if (playerSubtitle) {
        playerSubtitle.textContent = card.dataset.subtitle || "";
    }
}

// ========================
// TIMELINE HEIGHT
// ========================

function setTimelineHeight() {
    if (!timeline || cards.length === 0) return;

    timeline.style.height = `${cards.length * 100}vh`;
}

// ========================
// PLAYER BAR VISIBILITY
// ========================

function updatePlayerBarVisibility(scrollY, start, end) {
    if (!playerBar) return;

    if (scrollY >= start && scrollY <= end) {
        playerBar.classList.add("is-visible");
    } else {
        playerBar.classList.remove("is-visible");
    }
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

    updatePlayerBarVisibility(scrollY, start, end);

    // timeline 시작 전
    if (scrollY < start) {
        playerProgress.style.width = "0%";
        track.style.transform = "translateX(0)";

        cards.forEach((card, index) => {
            card.classList.toggle("is-active", index === 0);
        });

        updatePlayerText(cards[0]);
        return;
    }

    // timeline 끝난 후
    if (scrollY > end) {
        const lastIndex = cards.length - 1;
        const lastCard = cards[lastIndex];

        let translateX = 0;

        if (lastCard) {
            const cardCenter = lastCard.offsetLeft + lastCard.offsetWidth / 2;
            translateX = cardCenter - window.innerWidth / 2;
        }

        const maxTranslate = Math.max(track.scrollWidth - window.innerWidth, 0);
        translateX = Math.max(0, Math.min(translateX, maxTranslate));

        track.style.transform = `translateX(-${translateX}px)`;
        playerProgress.style.width = "100%";

        cards.forEach((card, index) => {
            card.classList.toggle("is-active", index === lastIndex);
        });

        updatePlayerText(lastCard);
        return;
    }

    // timeline 진행 중
    const progress = (scrollY - start) / (end - start);
    const snappedIndex = Math.round(progress * (cards.length - 1));
    const activeCard = cards[snappedIndex];

    let translateX = 0;

    if (activeCard) {
        const cardCenter = activeCard.offsetLeft + activeCard.offsetWidth / 2;
        translateX = cardCenter - window.innerWidth / 2;
    }

    const maxTranslate = Math.max(track.scrollWidth - window.innerWidth, 0);
    translateX = Math.max(0, Math.min(translateX, maxTranslate));

    track.style.transform = `translateX(-${translateX}px)`;
    playerProgress.style.width = `${(snappedIndex / (cards.length - 1)) * 100}%`;

    cards.forEach((card, index) => {
        card.classList.toggle("is-active", index === snappedIndex);
    });

    updatePlayerText(activeCard);
}

// ========================
// INIT
// ========================

function initTimeline() {
    setTimelineHeight();

    if (cards.length > 0) {
        cards[0].classList.add("is-active");
        updatePlayerText(cards[0]);
    }

    updateTimeline();
}

window.addEventListener("load", initTimeline);
window.addEventListener("resize", () => {
    setTimelineHeight();
    updateTimeline();
});
window.addEventListener("scroll", updateTimeline);