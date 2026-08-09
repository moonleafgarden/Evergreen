console.log("Evergreen — habits.js");

/* ===========================
   HABIT IDEAS
=========================== */

const habitIdeas = {

    Learning: [
        "Read 10 pages 📖",
        "Learn 5 new words ✨",
        "Study for 20 minutes 📝"
    ],

    Science: [
        "Learn one new fact 🔬",
        "Read about nature 🌿",
        "Watch a science video 🌎"
    ],

    Technology: [
        "Practice coding 💻",
        "Learn one tech concept ⚙️",
        "Build something small 🛠️"
    ],

    Creativity: [
        "Draw something 🎨",
        "Write a short idea ✍️",
        "Create something new ✨"
    ],

    Health: [
        "Drink enough water 💧",
        "Stretch for 10 minutes 🧘",
        "Go for a walk 🚶"
    ],

    Growth: [
        "Write a journal entry 📔",
        "Plan tomorrow 🌱",
        "Reflect on your day 🌙"
    ],

    English: [
        "Learn 5 new English words 🇬🇧",
        "Listen to English for 10 minutes 🎧",
        "Read in English for 10 minutes 📖"
    ],

    Math: [
        "Solve 5 math problems ➗",
        "Practice one math topic 🧮",
        "Review today's mistakes ✏️"
    ],

    Reading: [
        "Read for 15 minutes 📚",
        "Read 10 pages 🌿",
        "Write down one interesting idea 💡"
    ],

    Programming: [
        "Code for 20 minutes 💻",
        "Learn one programming concept 🧠",
        "Build a tiny feature ⚙️"
    ],

    SAT: [
        "Solve 5 SAT Math questions 🎯",
        "Review one SAT topic 📐",
        "Learn from one mistake ✏️"
    ],

    IELTS: [
        "Learn 5 IELTS words 🌍",
        "Listen to English for 10 minutes 🎧",
        "Practice one IELTS question 📝"
    ],

    Space: [
        "Learn one space fact 🌌",
        "Read about a planet 🪐",
        "Learn about one space object 🔭"
    ],

    Nature: [
        "Learn about one plant 🌿",
        "Learn one nature fact 🌎",
        "Spend time outside 🍃"
    ],

    Biology: [
        "Learn one biology fact 🧬",
        "Review one biology topic 🔬",
        "Read about an organism 🌱"
    ],

    Physics: [
        "Learn one physics concept ⚡",
        "Solve 3 physics questions 📐",
        "Review one formula 🧠"
    ],

    Astronomy: [
        "Learn one astronomy fact 🌌",
        "Read about a star ⭐",
        "Explore one planet 🪐"
    ],

    Cycling: [
        "Go cycling 🚲",
        "Cycle for 20 minutes 🌿",
        "Practice cycling skills 🚴"
    ],

    Discipline: [
        "Complete one important task 🎯",
        "Stay focused for 20 minutes ⏳",
        "Finish what you started 🌱"
    ],

    Goals: [
        "Work on one goal 🎯",
        "Write one step toward your goal ✨",
        "Review your goals 📋"
    ],

    Confidence: [
        "Write one thing you did well ✨",
        "Try something outside your comfort zone 🌱",
        "Write one positive thought 💚"
    ],

    Cooking: [
        "Cook something simple 🍳",
        "Learn one cooking skill 👩‍🍳",
        "Help prepare dinner 🥗"
    ],

    Baking: [
        "Bake something 🍪",
        "Learn one baking technique 🧁",
        "Try a new recipe 📖"
    ]

};


/* ===========================
   DATE
=========================== */

function getTodayKey(){

    const now = new Date();

    const year = now.getFullYear();

    const month =
        String(now.getMonth() + 1).padStart(2, "0");

    const day =
        String(now.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;

}


/* ===========================
   DAILY DATA
=========================== */

let todayKey = getTodayKey();

let dailyData =
    JSON.parse(
        localStorage.getItem("dailyData")
    ) || {};


/* ===========================
   CREATE TODAY
=========================== */

function prepareToday(){

    todayKey = getTodayKey();

    if(!dailyData[todayKey]){

        dailyData[todayKey] = {

            completed: [],

            xp: 0,

            coins: 0

        };

        saveDailyData();

    }

}


/* ===========================
   SAVE
=========================== */

function saveDailyData(){

    localStorage.setItem(
        "dailyData",
        JSON.stringify(dailyData)
    );

}


/* ===========================
   GET TODAY COMPLETED
=========================== */

function getCompletedToday(){

    prepareToday();

    return dailyData[todayKey].completed;

}


/* ===========================
   CREATE HABITS
=========================== */

function createHabits(){

    const container =
        document.getElementById("habitContainer");

    if(!container) return;

    prepareToday();

    container.innerHTML = "";

    const completed =
        getCompletedToday();

    let habits = [];


    /* ===========================
       CREATE FROM INTERESTS
    =========================== */

    if(
        typeof selectedInterests !== "undefined"
    ){

        selectedInterests.forEach(interest => {

            if(habitIdeas[interest]){

                habits.push(
                    ...habitIdeas[interest]
                );

            }

        });

    }


    /* ===========================
       REMOVE DUPLICATES
    =========================== */

    habits =
        [...new Set(habits)];


    /* ===========================
       LIMIT
    =========================== */

    habits =
        habits.slice(0, 12);


    /* ===========================
       EMPTY STATE
    =========================== */

    if(habits.length === 0){

        container.innerHTML = `

            <div class="habit">

                <span>
                    Choose some interests first 🌱
                </span>

            </div>

        `;

        updateHabitStats();

        return;

    }


    /* ===========================
       CREATE CARDS
    =========================== */

    habits.forEach(habitName => {

        const habit =
            document.createElement("div");

        habit.className = "habit";


        const isCompleted =
            completed.includes(habitName);


        habit.innerHTML = `

            <span>
                ${habitName}
            </span>

            <button
                class="done-btn ${
                    isCompleted ? "finished" : ""
                }"
            >
                ${
                    isCompleted
                    ? "Completed ✓"
                    : "Done"
                }
            </button>

        `;


        const button =
            habit.querySelector(".done-btn");


        button.onclick = () => {

            toggleHabit(
                habitName,
                button
            );

        };


        container.appendChild(habit);

    });


    updateHabitStats();

}


/* ===========================
   TOGGLE HABIT
=========================== */

function toggleHabit(
    habitName,
    button
){

    prepareToday();

    const completed =
        dailyData[todayKey].completed;


    /* ===========================
       COMPLETE
    =========================== */

    if(!completed.includes(habitName)){

        completed.push(habitName);

        dailyData[todayKey].xp += 10;

        dailyData[todayKey].coins += 5;

        button.textContent =
            "Completed ✓";

        button.classList.add(
            "finished"
        );

    }


    /* ===========================
       UNCOMPLETE
    =========================== */

    else{

        dailyData[todayKey].completed =
            completed.filter(
                habit => habit !== habitName
            );

        dailyData[todayKey].xp =
            Math.max(
                0,
                dailyData[todayKey].xp - 10
            );

        dailyData[todayKey].coins =
            Math.max(
                0,
                dailyData[todayKey].coins - 5
            );

        button.textContent =
            "Done";

        button.classList.remove(
            "finished"
        );

    }


    saveDailyData();

    updateHabitStats();

    updateGarden();

}


/* ===========================
   HABIT STATS
=========================== */

function updateHabitStats(){

    prepareToday();

    const completed =
        dailyData[todayKey].completed.length;


    const container =
        document.getElementById(
            "habitContainer"
        );


    const total =
        container
        ? container.querySelectorAll(".habit").length
        : 0;


    const percent =
        total === 0
        ? 0
        : Math.round(
            completed / total * 100
        );


    /* Progress bar */

    const bar =
        document.querySelector(
            ".progress-fill"
        );

    if(bar){

        bar.style.width =
            percent + "%";

    }


    /* Progress text */

    const text =
        document.getElementById(
            "progressText"
        );

    if(text){

        text.textContent =
            `${completed} / ${total} completed`;

    }


    /* Statistics */

    const statCompleted =
        document.getElementById(
            "statCompleted"
        );

    const statTotal =
        document.getElementById(
            "statTotal"
        );

    const statPercent =
        document.getElementById(
            "statPercent"
        );


    if(statCompleted)
        statCompleted.textContent =
            completed;


    if(statTotal)
        statTotal.textContent =
            total;


    if(statPercent)
        statPercent.textContent =
            percent + "%";


    /* XP */

    const xpValue =
        document.getElementById(
            "xpValue"
        );

    if(xpValue){

        xpValue.textContent =
            dailyData[todayKey].xp;

    }


    /* Coins */

    const coins =
        dailyData[todayKey].coins;


    document
        .querySelectorAll(
            "#coinCount, #coins"
        )
        .forEach(element => {

            element.textContent =
                coins;

        });


}


/* ===========================
   GARDEN
=========================== */

function updateGarden(){

    prepareToday();

    const completed =
        dailyData[todayKey].completed.length;


    const container =
        document.getElementById(
            "habitContainer"
        );


    const total =
        container
        ? container.querySelectorAll(".habit").length
        : 0;


    const percent =
        total === 0
        ? 0
        : completed / total * 100;


    const tree =
        document.getElementById(
            "treeEmoji"
        );


    if(!tree) return;


    if(percent === 0){

        tree.textContent = "🌱";

    }

    else if(percent < 30){

        tree.textContent = "🌿";

    }

    else if(percent < 60){

        tree.textContent = "🌳";

    }

    else if(percent < 100){

        tree.textContent = "🌲";

    }

    else{

        tree.textContent = "🌸";

    }

}


/* ===========================
   RESET DAY
=========================== */

function resetToday(){

    prepareToday();

    dailyData[todayKey] = {

        completed: [],

        xp: 0,

        coins: 0

    };


    saveDailyData();

    createHabits();

    updateGarden();

}


/* ===========================
   NEW DAY CHECK
=========================== */

function checkNewDay(){

    const newKey =
        getTodayKey();


    if(newKey !== todayKey){

        todayKey =
            newKey;

        prepareToday();

        createHabits();

    }

}


/* ===========================
   START
=========================== */

prepareToday();

console.log(
    "Today's habits ready:",
    todayKey
);
