console.log("Evergreen — garden.js");

/* ===========================
   GARDEN
=========================== */

function updateGardenDisplay() {

    const tree =
        document.getElementById("treeEmoji");

    if (!tree) return;


    const habitContainer =
        document.getElementById("habitContainer");


    const total =
        habitContainer
            ? habitContainer.querySelectorAll(".habit").length
            : 0;


    const completed =
        typeof getCompletedToday === "function"
            ? getCompletedToday().length
            : 0;


    const percent =
        total === 0
            ? 0
            : completed / total * 100;


    /* ---------- TREE ---------- */

    if (percent === 0) {

        tree.textContent = "🌱";

    } else if (percent < 30) {

        tree.textContent = "🌿";

    } else if (percent < 60) {

        tree.textContent = "🌳";

    } else if (percent < 100) {

        tree.textContent = "🌲";

    } else {

        tree.textContent = "🌸";

    }


    /* ---------- COINS ---------- */

    updateGardenCoins();

}


/* ===========================
   COINS
=========================== */

function updateGardenCoins() {

    if (
        typeof getCompletedToday !== "function"
    ) {
        return;
    }


    const today =
        getTodayKey();


    const data =
        dailyData[today];


    const coins =
        data
            ? data.coins
            : 0;


    document
        .querySelectorAll("#coins, #coinCount")
        .forEach(element => {

            element.textContent = coins;

        });

}


/* ===========================
   GARDEN INIT
=========================== */

function initializeGarden() {

    updateGardenDisplay();

}


/* ===========================
   MAKE AVAILABLE
=========================== */

window.updateGarden =
    updateGardenDisplay;


/* ===========================
   START
=========================== */

document.addEventListener(
    "DOMContentLoaded",
    initializeGarden
);
