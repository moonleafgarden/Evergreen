document.addEventListener("DOMContentLoaded", () => {

    const calendarTitle = document.getElementById("calendarTitle");
    const calendarDays = document.getElementById("calendarDays");
    const prevMonthBtn = document.getElementById("prevMonth");
    const nextMonthBtn = document.getElementById("nextMonth");

    if (
        !calendarTitle ||
        !calendarDays ||
        !prevMonthBtn ||
        !nextMonthBtn
    ) {
        console.error("Calendar elements not found.");
        return;
    }


    // =========================================
    // CURRENT MONTH
    // =========================================

    let currentDate = new Date();

    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();


    // =========================================
    // MONTH NAMES
    // =========================================

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


    // =========================================
    // TODAY
    // =========================================

    const today = new Date();

    const todayKey =
        `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;


    // =========================================
    // GET COMPLETED DAYS
    // =========================================

    function getCompletedDays() {

        /*
         * We expect habits.js to save completed days.
         *
         * Supported formats:
         *
         * completedDates = [
         *   "2026-08-01",
         *   "2026-08-02"
         * ]
         *
         * If there is no saved data,
         * the calendar simply shows no completed days.
         */

        try {

            const saved =
                localStorage.getItem("completedDates");

            if (!saved) {
                return [];
            }

            const data = JSON.parse(saved);

            if (Array.isArray(data)) {
                return data;
            }

            return [];

        } catch (error) {

            console.error(
                "Could not read completed dates:",
                error
            );

            return [];
        }
    }


    // =========================================
    // CREATE DATE KEY
    // =========================================

    function createDateKey(year, month, day) {

        return (
            `${year}-` +
            `${String(month + 1).padStart(2, "0")}-` +
            `${String(day).padStart(2, "0")}`
        );

    }


    // =========================================
    // RENDER CALENDAR
    // =========================================

    function renderCalendar() {

        calendarDays.innerHTML = "";


        // Month title

        calendarTitle.textContent =
            `${monthNames[currentMonth]} ${currentYear}`;


        // First day of month

        const firstDay =
            new Date(
                currentYear,
                currentMonth,
                1
            );


        // Number of days in month

        const daysInMonth =
            new Date(
                currentYear,
                currentMonth + 1,
                0
            ).getDate();


        /*
         * JS:
         *
         * Sunday = 0
         * Monday = 1
         *
         * Our calendar:
         *
         * Monday = first column
         *
         * Therefore convert Sunday from 0 to 7.
         */

        let startingDay =
            firstDay.getDay();

        if (startingDay === 0) {
            startingDay = 7;
        }

        startingDay -= 1;


        // =========================================
        // EMPTY DAYS BEFORE MONTH
        // =========================================

        for (
            let i = 0;
            i < startingDay;
            i++
        ) {

            const emptyDay =
                document.createElement("div");

            emptyDay.classList.add(
                "calendar-day",
                "empty"
            );

            calendarDays.appendChild(
                emptyDay
            );
        }


        // =========================================
        // COMPLETED DAYS
        // =========================================

        const completedDays =
            getCompletedDays();


        // =========================================
        // CREATE DAYS
        // =========================================

        for (
            let day = 1;
            day <= daysInMonth;
            day++
        ) {

            const dayElement =
                document.createElement("div");


            dayElement.classList.add(
                "calendar-day"
            );


            // Number

            const number =
                document.createElement("span");

            number.classList.add(
                "calendar-number"
            );

            number.textContent = day;


            dayElement.appendChild(
                number
            );


            // Date key

            const dateKey =
                createDateKey(
                    currentYear,
                    currentMonth,
                    day
                );


            // =====================================
            // TODAY
            // =====================================

            if (dateKey === todayKey) {

                dayElement.classList.add(
                    "today"
                );

                const todayMark =
                    document.createElement("span");

                todayMark.classList.add(
                    "today-mark"
                );

                todayMark.textContent = "✨";

                dayElement.appendChild(
                    todayMark
                );
            }


            // =====================================
            // COMPLETED
            // =====================================

            if (
                completedDays.includes(
                    dateKey
                )
            ) {

                dayElement.classList.add(
                    "completed"
                );

                const completedMark =
                    document.createElement("span");

                completedMark.classList.add(
                    "completed-mark"
                );

                completedMark.textContent = "🌱";

                dayElement.appendChild(
                    completedMark
                );
            }


            // =====================================
            // ADD DAY
            // =====================================

            calendarDays.appendChild(
                dayElement
            );
        }

    }


    // =========================================
    // PREVIOUS MONTH
    // =========================================

    prevMonthBtn.addEventListener(
        "click",
        () => {

            currentMonth--;

            if (currentMonth < 0) {

                currentMonth = 11;
                currentYear--;

            }

            renderCalendar();

        }
    );


    // =========================================
    // NEXT MONTH
    // =========================================

    nextMonthBtn.addEventListener(
        "click",
        () => {

            currentMonth++;

            if (currentMonth > 11) {

                currentMonth = 0;
                currentYear++;

            }

            renderCalendar();

        }
    );


    // =========================================
    // INITIAL RENDER
    // =========================================

    renderCalendar();


    // =========================================
    // UPDATE WHEN STORAGE CHANGES
    // =========================================

    window.addEventListener(
        "storage",
        () => {

            renderCalendar();

        }
    );


    /*
     * Allows other JS files to refresh
     * the calendar after completing a habit.
     */

    window.refreshEvergreenCalendar =
        renderCalendar;

});
