/* ===========================
   CALENDAR
=========================== */

let streak =
load("streak", 0);

let lastDay =
load("lastDay", "");

function checkNewDay(){

    const today =
    new Date().toLocaleDateString();

    if(lastDay !== today){

        lastDay = today;

        doneHabits = [];

        save(
            "doneHabits",
            doneHabits
        );

        save(
            "lastDay",
            lastDay
        );

        createHabits();

        updateStatistics();

    }

}
