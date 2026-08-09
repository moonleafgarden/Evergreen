console.log("Statistics loaded");


/* ===========================
   UPDATE STATISTICS
=========================== */

function updateStatistics() {

    if (typeof user === "undefined") {
        return;
    }


    const completed =
        user.completedToday.length;

    const total =
        document.querySelectorAll(".habit").length;


    const percent =
        total === 0
        ? 0
        : Math.round(
            (completed / total) * 100
        );


    /* Completed */

    const completedElement =
        document.getElementById("statCompleted");

    if (completedElement) {

        completedElement.textContent =
            completed;

    }


    /* Total */

    const totalElement =
        document.getElementById("statTotal");

    if (totalElement) {

        totalElement.textContent =
            total;

    }


    /* Percentage */

    const percentElement =
        document.getElementById("statPercent");

    if (percentElement) {

        percentElement.textContent =
            percent + "%";

    }


    /* Level */

    const levelElement =
        document.getElementById("statLevel");

    if (levelElement) {

        const level =
            Math.floor(user.xp / 100) + 1;

        levelElement.textContent =
            level;

    }


    /* XP */

    const xpElement =
        document.getElementById("xpValue");

    if (xpElement) {

        xpElement.textContent =
            user.xp;

    }


    /* Coins */

    const coinElement =
        document.getElementById("coinCount");

    if (coinElement) {

        coinElement.textContent =
            user.coins;

    }

}


/* ===========================
   START
=========================== */

if (
    typeof user !== "undefined"
) {

    updateStatistics();

}
