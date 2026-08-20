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
   CURRENT MONTH
========================================= */

let calendarDate = new Date();

calendarDate.setDate(1);


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
   GET COMPLETED DAYS
========================================= */

function getCompletedDays() {

    const possibleKeys = [
        "doneHabits",
        "completedHabits",
        "habitHistory",
        "evergreenHabitHistory"
    ];

    let data = null;

    for (const key of possibleKeys) {

        const saved = localStorage.getItem(key);

        if (saved) {

            try {

                data = JSON.parse(saved);

                if (data) {
                    break;
                }

            } catch (error) {

                console.warn(
                    `Could not read ${key} from localStorage`
                );

            }

        }

    }

    if (!data) {
        return [];
    }


    /*
        Different possible formats are supported.

        Example:

        {
            "2026-08-01": true,
            "2026-08-02": true
        }

        or:

        [
            "2026-08-01",
            "2026-08-02"
        ]
    */


    if (Array.isArray(data)) {

        return data
            .map(item => {

                if (typeof item === "string") {
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


    if (
        typeof data === "object"
    ) {

        return Object.keys(data)
            .filter(date => {

                const value = data[date];

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


    return [];
}


/* =========================================
   DATE KEY
========================================= */

function getDateKey(
    year,
    month,
    day
) {

    const monthString =
        String(month + 1).padStart(2, "0");

    const dayString =
        String(day).padStart(2, "0");

    return `${year}-${monthString}-${dayString}`;
}


/* =========================================
   TODAY
========================================= */

function getTodayKey() {

    const today = new Date();

    return getDateKey(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
    );

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
            "Calendar elements were not found."
        );

        return;
    }


    const year =
        calendarDate.getFullYear();

    const month =
        calendarDate.getMonth();


    /* -------------------------------------
       TITLE
    ------------------------------------- */

    calendarTitle.textContent =
        `${monthNames[month]} ${year}`;


    /* -------------------------------------
       CLEAR OLD DAYS
    ------------------------------------- */

    calendarDays.innerHTML = "";


    /* -------------------------------------
       FIRST DAY
    ------------------------------------- */

    const firstDay =
        new Date(
            year,
            month,
            1
        );


    /*
        JavaScript:

        Sunday = 0
        Monday = 1
        ...

        We want Monday to be the first day.
    */

    let startingDay =
        firstDay.getDay();

    startingDay =
        startingDay === 0
            ? 6
            : startingDay - 1;


    /* -------------------------------------
       DAYS IN MONTH
    ------------------------------------- */

    const daysInMonth =
        new Date(
            year,
            month + 1,
            0
        ).getDate();


    /* -------------------------------------
       COMPLETED DAYS
    ------------------------------------- */

    const completedDays =
        getCompletedDays();


    const completedSet =
        new Set(completedDays);


    const todayKey =
        getTodayKey();


    /* -------------------------------------
       EMPTY CELLS
    ------------------------------------- */

    for (
        let i = 0;
        i < startingDay;
        i++
    ) {

        const empty =
            document.createElement("div");

        empty.className =
            "calendar-day empty";

        calendarDays.appendChild(empty);

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


        const dateKey =
            getDateKey(
                year,
                month,
                day
            );


        /* ---------------------------------
           DAY NUMBER
        --------------------------------- */

        const number =
            document.createElement("span");

        number.className =
            "calendar-day-number";

        number.textContent =
            day;


        dayElement.appendChild(number);


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
            completedSet.has(dateKey)
        ) {

            dayElement.classList.add(
                "completed"
            );


            const plant =
                document.createElement("span");

            plant.className =
                "calendar-day-icon";

            plant.textContent =
                "🌱";


            dayElement.appendChild(
                plant
            );

        }


        /* ---------------------------------
           CLICK
        --------------------------------- */

        dayElement.addEventListener(
            "click",
            () => {

                console.log(
                    "Calendar date:",
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

            calendarDate.setMonth(
                calendarDate.getMonth() - 1
            );

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

            calendarDate.setMonth(
                calendarDate.getMonth() + 1
            );

            renderCalendar();

        }
    );

}


/* =========================================
   REFRESH WHEN SCREEN OPENS
========================================= */

function refreshEvergreenCalendar() {

    renderCalendar();

}


/* =========================================
   INITIAL RENDER
========================================= */

renderCalendar();


/* =========================================
   OPTIONAL GLOBAL FUNCTION
========================================= */

window.refreshEvergreenCalendar =
    refreshEvergreenCalendar;
