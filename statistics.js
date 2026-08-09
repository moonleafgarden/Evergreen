```javascript
console.log("Evergreen statistics.js loaded");

/* ===========================
   STATISTICS
=========================== */

function updateStatistics() {

    if (typeof user === "undefined") {
        return;
    }


    const total =
        user.interests
            ? user.interests.length
            : 0;


    const completed =
        user.completedToday
            ? user.completedToday.length
            : 0;


    const xp =
        Number(user.xp) || 0;


    const coins =
        Number(user.coins) || 0;


    const percent =
        total === 0
            ? 0
            : Math.round(
                (completed / total) * 100
            );


    /* ===========================
       LEVEL
    =========================== */

    const level =
        Math.floor(xp / 100) + 1;


    /* ===========================
       COMPLETED
    =========================== */

    const completedElement =
        document.getElementById(
            "statCompleted"
        );


    if (completedElement) {

        completedElement.textContent =
            completed;

    }


    /* ===========================
       TOTAL
    =========================== */

    const totalElement =
        document.getElementById(
            "statTotal"
        );


    if (totalElement) {

        totalElement.textContent =
            total;

    }


    /* ===========================
       PERCENT
    =========================== */

    const percentElement =
        document.getElementById(
            "statPercent"
        );


    if (percentElement) {

        percentElement.textContent =
            percent + "%";

    }


    /* ===========================
       LEVEL
    =========================== */

    const levelElement =
        document.getElementById(
            "statLevel"
        );


    if (levelElement) {

        levelElement.textContent =
            level;

    }


    /* ===========================
       XP
    =========================== */

    const xpElement =
        document.getElementById(
            "statXP"
        );


    if (xpElement) {

        xpElement.textContent =
            xp;

    }


    /* ===========================
       COINS
    =========================== */

    const coinsElement =
        document.getElementById(
            "statCoins"
        );


    if (coinsElement) {

        coinsElement.textContent =
            coins;

    }

}


/* ===========================
   UPDATE WHEN PAGE LOADS
=========================== */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        updateStatistics
    );

} else {

    updateStatistics();

}
```
