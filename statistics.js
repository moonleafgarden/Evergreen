console.log("Evergreen statistics.js loaded");


function updateStatistics() {

    const total =
        user.interests.length;

    const completed =
        user.completedToday.length;

    const xp =
        Number(user.xp) || 0;

    const coins =
        Number(user.coins) || 0;


    const percent =
        total === 0
            ? 0
            : Math.round(
                completed / total * 100
            );


    const level =
        Math.floor(xp / 100) + 1;


    const completedElement =
        document.getElementById(
            "statCompleted"
        );

    const totalElement =
        document.getElementById(
            "statTotal"
        );

    const percentElement =
        document.getElementById(
            "statPercent"
        );

    const levelElement =
        document.getElementById(
            "statLevel"
        );

    const xpElement =
        document.getElementById(
            "statXP"
        );

    const coinsElement =
        document.getElementById(
            "statCoins"
        );


    if (completedElement) {
        completedElement.textContent =
            completed;
    }

    if (totalElement) {
        totalElement.textContent =
            total;
    }

    if (percentElement) {
        percentElement.textContent =
            percent + "%";
    }

    if (levelElement) {
        levelElement.textContent =
            level;
    }

    if (xpElement) {
        xpElement.textContent =
            xp;
    }

    if (coinsElement) {
        coinsElement.textContent =
            coins;
    }

}
