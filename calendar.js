/* ===========================
   CALENDAR & DAILY RESET
=========================== */

function getToday() {

    const date = new Date();

    return date.toISOString().split("T")[0];

}


/* ---------- CHECK NEW DAY ---------- */

function checkNewDay() {

    const today = getToday();

    const lastVisit = user.lastVisit;


    // Первый запуск
    if (!lastVisit) {

        user.lastVisit = today;

        saveUser();

        return;

    }


    // Новый день
    if (lastVisit !== today) {

        resetDailyData();

        user.lastVisit = today;

        saveUser();

    }

}


/* ---------- DAILY RESET ---------- */

function resetDailyData() {

    // Сбрасываем только сегодняшние выполненные задания
    user.completed = [];

    saveUser();

}


/* ---------- STREAK ---------- */

function updateStreak() {

    const today = getToday();

    const lastVisit = user.lastVisit;


    if (!lastVisit) {

        user.streak = 1;

        user.lastVisit = today;

        saveUser();

        return;

    }


    if (lastVisit === today) {

        return;

    }


    const last = new Date(lastVisit);
    const current = new Date(today);

    const difference =
        Math.floor(
            (current - last) /
            (1000 * 60 * 60 * 24)
        );


    if (difference === 1) {

        user.streak++;

    } else {

        user.streak = 1;

    }


    user.lastVisit = today;

    saveUser();

}


/* ---------- DATE DISPLAY ---------- */

function updateDate() {

    const dateElement =
        document.getElementById("todayDate");

    if (!dateElement) return;


    const today = new Date();

    dateElement.textContent =
        today.toLocaleDateString(
            "en-US",
            {
                weekday: "long",
                month: "long",
                day: "numeric"
            }
        );

}


/* ---------- START CALENDAR ---------- */

function startCalendar() {

    checkNewDay();

    updateStreak();

    updateDate();

}
