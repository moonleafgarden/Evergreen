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


    /*
       Every 100 XP = 1 level
    */

    const level =
        Math.floor(xp / 100) + 1;


    /* ===========================
       UPDATE STATISTICS
    =========================== */

    const completedElement =
        document.getElementById(
            "statCompleted"
        );

    if (completedElement) {

        completedElement.textContent =
            completed;

    }


    const totalElement =
        document.getElementById(
            "statTotal"
        );

    if (totalElement) {

        totalElement.textContent =
            total;

    }


    const percentElement =
        document.getElementById(
            "statPercent"
        );

    if (percentElement) {

        percentElement.textContent =
            percent + "%";

    }


    const levelElement =
        document.getElementById(
            "statLevel"
        );

    if (levelElement) {

        levelElement.textContent =
            level;

    }


    const xpElement =
        document.getElementById(
            "statXP"
        );

    if (xpElement) {

        xpElement.textContent =
            xp;

    }


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
    document.readyState === "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        updateStatistics
    );

} else {

    updateStatistics();

}
```
