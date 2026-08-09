```javascript
/* ===========================
   CALENDAR & DAILY RESET
=========================== */

function getToday() {

    const date = new Date();

    const year =
        date.getFullYear();

    const month =
        String(date.getMonth() + 1)
            .padStart(2, "0");

    const day =
        String(date.getDate())
            .padStart(2, "0");

    return `${year}-${month}-${day}`;

}


/* ===========================
   CHECK NEW DAY
=========================== */

function checkNewDay() {

    const today =
        getToday();


    if (!user.lastActiveDate) {

        user.lastActiveDate =
            today;

        user.completedToday = [];

        saveUser();

        return;

    }


    if (
        user.lastActiveDate !==
        today
    ) {

        user.completedToday = [];

        user.lastActiveDate =
            today;

        saveUser();


        if (
            typeof createHabits ===
            "function"
        ) {

            createHabits();

        }


        if (
            typeof updateStatistics ===
            "function"
        ) {

            updateStatistics();

        }

        console.log(
            "🌱 New Evergreen day!"
        );

    }

}


/* ===========================
   DAILY RESET
=========================== */

function resetDailyData() {

    user.completedToday = [];

    user.lastActiveDate =
        getToday();

    saveUser();


    if (
        typeof createHabits ===
        "function"
    ) {

        createHabits();

    }


    if (
        typeof updateStatistics ===
        "function"
    ) {

        updateStatistics();

    }

}


/* ===========================
   STREAK
=========================== */

function updateStreak() {

    const today =
        getToday();

    const lastDate =
        user.lastActiveDate;


    if (!lastDate) {

        user.streak = 1;

        user.lastActiveDate =
            today;

        saveUser();

        return;

    }


    if (lastDate === today) {

        return;

    }


    const last =
        new Date(lastDate);

    const current =
        new Date(today);


    const difference =
        Math.floor(
            (
                current - last
            ) /
            (1000 * 60 * 60 * 24)
        );


    if (difference === 1) {

        user.streak++;

    } else {

        user.streak = 1;

    }


    user.lastActiveDate =
        today;

    saveUser();

}


/* ===========================
   DATE DISPLAY
=========================== */

function updateDate() {

    const dateElement =
        document.getElementById(
            "todayDate"
        );


    if (!dateElement) return;


    const today =
        new Date();


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


/* ===========================
   START CALENDAR
=========================== */

function startCalendar() {

    checkNewDay();

    updateStreak();

    updateDate();

}


/* ===========================
   START
=========================== */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        startCalendar
    );

} else {

    startCalendar();

}
```
