console.log("Evergreen — statistics.js");

/* ===========================
   STATISTICS
=========================== */

function updateStatistics() {

    const selectedInterests =
        JSON.parse(
            localStorage.getItem("selectedInterests")
        ) || [];

    const doneHabits =
        JSON.parse(
            localStorage.getItem("doneHabits")
        ) || [];

    const xp =
        Number(localStorage.getItem("xp")) || 0;


    /* ===========================
       TOTAL
    =========================== */

    const total =
        selectedInterests.length;


    /* ===========================
       COMPLETED
    =========================== */

    const completed =
        doneHabits.length;


    /* ===========================
       PERCENT
    =========================== */

    const percent =
        total === 0
            ? 0
            : Math.round(
                completed / total * 100
            );


    /* ===========================
       LEVEL
    =========================== */

    const level =
        Math.floor(xp / 100) + 1;


    /* ===========================
       UPDATE HTML
    =========================== */

    const completedElement =
        document.getElementById("statCompleted");

    const totalElement =
        document.getElementById("statTotal");

    const percentElement =
        document.getElementById("statPercent");

    const levelElement =
        document.getElementById("statLevel");


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


    /* ===========================
       PROGRESS BAR
    =========================== */

    const progressFill =
        document.querySelector(
            ".progress-fill"
        );

    if (progressFill) {

        progressFill.style.width =
            percent + "%";

    }


    const progressText =
        document.getElementById(
            "progressText"
        );

    if (progressText) {

        progressText.textContent =
            `${completed} / ${total} completed`;

    }


    /* ===========================
       XP
    =========================== */

    const xpElement =
        document.getElementById("xpValue");

    if (xpElement) {

        xpElement.textContent =
            xp;

    }

}


/* ===========================
   UPDATE WHEN PAGE OPENS
=========================== */

document.addEventListener(
    "DOMContentLoaded",
    updateStatistics
);


/* ===========================
   GLOBAL FUNCTION
=========================== */

window.updateStatistics =
    updateStatistics;
