/* =========================================
   EVERGREEN — CALENDAR
========================================= */

console.log("Evergreen calendar.js loaded");


/* =========================================
   ELEMENTS
========================================= */

const calendarTitle = document.getElementById("calendarTitle");
const calendarDays = document.getElementById("calendarDays");
const prevMonthBtn = document.getElementById("prevMonth");
const nextMonthBtn = document.getElementById("nextMonth");


/* =========================================
   MONTH NAMES
========================================= */

const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];


/* =========================================
   CURRENT MONTH
========================================= */

const today = new Date();

let currentMonth = today.getMonth();
let currentYear = today.getFullYear();


/* =========================================
   DATE KEY
========================================= */

function getDateKey(year, month, day) {

    return (
        year +
        "-" +
        String(month + 1).padStart(2, "0") +
        "-" +
        String(day).padStart(2, "0")
    );

}


/* =========================================
   TODAY KEY
========================================= */

function getTodayKey() {

    return getDateKey(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
    );

}


/* =========================================
   GET COMPLETED DAYS
========================================= */

function getCompletedDays() {

    const keys = [
        "doneHabits",
        "completedHabits",
        "habitHistory",
        "evergreenHabitHistory"
    ];

    for (const key of keys) {

        const saved =
            localStorage.getItem(key);

        if (!saved) {
            continue;
        }

        try {

            const data =
                JSON.parse(saved);


            /* -----------------------------
               ARRAY
            ----------------------------- */

            if (Array.isArray(data)) {

                return data
                    .map(item => {

                        if (
                            typeof item === "string"
                        ) {
                            return item;
                        }

                        if (
                            item &&
                            item.date
                        ) {
                            return item.date;
                        }

                        return null;

                    })
                    .filter(Boolean);

            }


            /* -----------------------------
               OBJECT
            ----------------------------- */

            if (
                typeof data === "object" &&
                data !== null
            ) {

                return Object.keys(data)
                    .filter(date => {

                        const value =
                            data[date];

                        return (
                            value === true ||
                            value === 1 ||
                            value === "true" ||
                            (
                                Array.isArray(value) &&
                                value.length > 0
                            )
                        );

                    });

            }

        } catch (error) {

            console.warn(
                "Calendar could not read:",
                key
            );

        }

    }

    return [];

}


/* =========================================
   RENDER CALENDAR
========================================= */

function renderCalendar() {

    if (
        !calendarTitle ||
        !calendarDays
    ) {

        console.warn(
            "Calendar elements not found."
        );

        return;

    }


    /* -------------------------------------
       TITLE
    ------------------------------------- */

    calendarTitle.textContent =
        `${monthNames[currentMonth]} ${currentYear}`;


    /* -------------------------------------
       CLEAR CALENDAR
    ------------------------------------- */

    calendarDays.innerHTML = "";


    /* -------------------------------------
       FIRST DAY OF MONTH
    ------------------------------------- */

    const firstDay =
        new Date(
            currentYear,
            currentMonth,
            1
        );


    /*
        JavaScript:

        Sunday = 0
        Monday = 1
        Tuesday = 2
        ...

        Our calendar starts Monday.
    */

    let startDay =
        firstDay.getDay();

    if (startDay === 0) {
        startDay = 6;
    } else {
        startDay -= 1;
    }


    /* -------------------------------------
       NUMBER OF DAYS
    ------------------------------------- */

    const daysInMonth =
        new Date(
            currentYear,
            currentMonth + 1,
            0
        ).getDate();


    /* -------------------------------------
       COMPLETED DAYS
    ------------------------------------- */

    const completedDays =
        new Set(
            getCompletedDays()
        );


    const todayKey =
        getTodayKey();


    /* -------------------------------------
       EMPTY CELLS
    ------------------------------------- */

    for (
        let i = 0;
        i < startDay;
        i++
    ) {

        const empty =
            document.createElement("div");

        empty.className =
            "calendar-day empty";

        calendarDays.appendChild(
            empty
        );

    }


    /* -------------------------------------
       CREATE DAYS
    ------------------------------------- */

    for (
        let day = 1;
        day <= daysInMonth;
        day++
    ) {

        const dayElement =
            document.createElement("div");

        dayElement.className =
            "calendar-day";


        /* ---------------------------------
           DATE KEY
        --------------------------------- */

        const dateKey =
            getDateKey(
                currentYear,
                currentMonth,
                day
            );


        /* ---------------------------------
           NUMBER
        --------------------------------- */

        const number =
            document.createElement("span");

        number.className =
            "calendar-day-number";

        number.textContent =
            day;

        dayElement.appendChild(
            number
        );


        /* ---------------------------------
           TODAY
        --------------------------------- */

        if (
            dateKey === todayKey
        ) {

            dayElement.classList.add(
                "today"
            );

        }


        /* ---------------------------------
           COMPLETED
        --------------------------------- */

        if (
            completedDays.has(dateKey)
        ) {

            dayElement.classList.add(
                "completed"
            );


            const icon =
                document.createElement("span");

            icon.className =
                "calendar-day-icon";

            icon.textContent =
                "🌱";

            dayElement.appendChild(
                icon
            );

        }


        /* ---------------------------------
           CLICK
        --------------------------------- */

        dayElement.addEventListener(
            "click",
            () => {

                console.log(
                    "Selected date:",
                    dateKey
                );

            }
        );


        calendarDays.appendChild(
            dayElement
        );

    }

}


/* =========================================
   PREVIOUS MONTH
========================================= */

if (prevMonthBtn) {

    prevMonthBtn.addEventListener(
        "click",
        () => {

            currentMonth--;

            if (
                currentMonth < 0
            ) {

                currentMonth = 11;
                currentYear--;

            }

            renderCalendar();

        }
    );

}


/* =========================================
   NEXT MONTH
========================================= */

if (nextMonthBtn) {

    nextMonthBtn.addEventListener(
        "click",
        () => {

            currentMonth++;

            if (
                currentMonth > 11
            ) {

                currentMonth = 0;
                currentYear++;

            }

            renderCalendar();

        }
    );

}


/* =========================================
   REFRESH CALENDAR
========================================= */

window.refreshEvergreenCalendar =
    function () {

        renderCalendar();

    };


/* =========================================
   INITIALIZE
========================================= */

renderCalendar();
