console.log("Evergreen statistics.js loaded");

/* ===========================
   UPDATE STATISTICS
=========================== */

function updateStatistics() {

    const completed =
        user.completedToday.length;

    const total =
        document.querySelectorAll(
            "#habitContainer .habit"
        ).length;

    const percent =
        total === 0
            ? 0
            : Math.round(
                (completed / total) * 100
            );


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
       TOTAL INTERESTS
    =========================== */

    const totalElement =
        document.getElementById(
            "statTotal"
        );

    if (totalElement) {

        totalElement.textContent =
            user.interests.length;

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

        const level =
            Math.floor(user.xp / 100) + 1;

        levelElement.textContent =
            level;

    }

}


/* ===========================
   UPDATE WHEN PAGE LOADS
=========================== */

window.addEventListener(
    "load",
    () => {

        updateStatistics();

    }
);
