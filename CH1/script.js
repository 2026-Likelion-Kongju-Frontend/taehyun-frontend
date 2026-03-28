// ========================
// DOM SELECTORS
// ========================

const timelineSection = document.querySelector(".timeline");
const track = document.querySelector(".timeline-track");
const cards = document.querySelectorAll(".project-card");

const prevButton = document.querySelector(".player-prev");
const nextButton = document.querySelector(".player-next");

const playerBar = document.getElementById("player-bar");
const playerProgress = document.querySelector(".player-bar-progress");
const playerTitle = document.querySelector(".player-title");
const playerSubtitle = document.querySelector(".player-subtitle");

const playerStart = document.querySelector(".player-start");
const playerEnd = document.querySelector(".player-end");

// ========================
// STATE
// ========================

let currentIndex = 0;

// ========================
// PLAYER TEXT
// ========================

function updatePlayerText(card) {
    if (!card) return;

    if (playerTitle) {
        playerTitle.textContent = card.dataset.title || "";
    }

    if (playerSubtitle) {
        playerSubtitle.textContent = card.dataset.subtitle || "";
    }

    if (playerStart) {
        playerStart.textContent = card.dataset.date || "";
    }

    if (playerEnd && cards.length > 0) {
        const lastCard = cards[cards.length - 1];
        playerEnd.textContent = lastCard.dataset.date || "";
    }
}

// ========================
// PLAYER BAR VISIBILITY
// ========================

function updatePlayerBarVisibility() {
    if (!timelineSection || !playerBar) return;

    const rect = timelineSection.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

    playerBar.classList.toggle("is-visible", isVisible);
}

// ========================
// NAV BUTTON STATE
// ========================

function updateNavButtons() {
    if (prevButton) {
        prevButton.disabled = currentIndex === 0;
    }

    if (nextButton) {
        nextButton.disabled = currentIndex === cards.length - 1;
    }
}

// ========================
// MOVE TO CARD
// ========================

function goToCard(index) {
    if (!track || cards.length === 0) return;

    const safeIndex = Math.max(0, Math.min(index, cards.length - 1));
    const activeCard = cards[safeIndex];

    if (!activeCard) return;

    currentIndex = safeIndex;

    const cardCenter = activeCard.offsetLeft + activeCard.offsetWidth / 2;
    let translateX = cardCenter - window.innerWidth / 2;

    const maxTranslate = Math.max(track.scrollWidth - window.innerWidth, 0);
    translateX = Math.max(0, Math.min(translateX, maxTranslate));

    track.style.transform = `translateX(-${translateX}px)`;

    cards.forEach((card, i) => {
        card.classList.toggle("is-active", i === currentIndex);
    });

    updatePlayerText(activeCard);

    if (playerProgress) {
        if (cards.length > 1) {
            playerProgress.style.width = `${(currentIndex / (cards.length - 1)) * 100}%`;
        } else {
            playerProgress.style.width = "100%";
        }
    }

    updateNavButtons();
}

// ========================
// EVENTS
// ========================

if (prevButton) {
    prevButton.addEventListener("click", () => {
        goToCard(currentIndex - 1);
    });
}

if (nextButton) {
    nextButton.addEventListener("click", () => {
        goToCard(currentIndex + 1);
    });
}

window.addEventListener("scroll", updatePlayerBarVisibility);

window.addEventListener("resize", () => {
    goToCard(currentIndex);
    updatePlayerBarVisibility();
});

window.addEventListener("load", () => {
    if (cards.length > 0) {
        goToCard(0);
    }
    updatePlayerBarVisibility();
});