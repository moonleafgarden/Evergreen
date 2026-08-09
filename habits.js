console.log("Evergreen habits.js loaded");

/* ===========================
   HABIT CONTAINER
=========================== */

const habitContainer =
    document.getElementById("habitContainer");


/* ===========================
   HABIT IDEAS
=========================== */

const habitIdeas = {

    Learning: [
        "Read 10 pages 📖",
        "Learn 5 new words ✨",
        "Study for 20 minutes 📚"
    ],

    Science: [
        "Learn one new science fact 🔬",
        "Read about space 🌌",
        "Explore nature 🌿"
    ],

    Technology: [
        "Practice coding 💻",
        "Learn a new tech skill",
        "Build something"
    ],

    Creativity: [
        "Draw something 🎨",
        "Write a short idea ✍️",
        "Create something new ✨"
    ],

    Health: [
        "Drink enough water 💧",
        "Stretch for 10 minutes",
        "Go for a walk 🚶"
    ],

    Growth: [
        "Write a journal entry 📔",
        "Plan tomorrow",
        "Reflect on your day 🌱"
    ]

};


/* ===========================
   CREATE HABITS
=========================== */

function createHabits() {

    if (!habitContainer) return;


    habitContainer.innerHTML = "";


    let habits = [];


    /*
       Для каждого выбранного интереса
       ищем подходящую категорию.
    */

    user.interests.forEach(interest => {

        for (const category in habitIdeas) {

            /*
               Пока используем простое
               соответствие интересов категориям.
            */

            const learning =
                [
                    "Reading",
                    "English",
                    "Spanish",
                    "French",
                    "Japanese",
                    "Math",
                    "SAT",
                    "IELTS"
                ];

            const science =
                [
                    "Space",
                    "Nature",
                    "Biology",
                    "Physics",
                    "Astronomy"
                ];

            const technology =
                [
                    "Programming",
                    "Web Development",
                    "AI",
                    "App Development",
                    "UI Design"
                ];

            const creativity =
                [
                    "Drawing",
                    "Photography",
                    "Music",
                    "Dancing",
                    "Cooking",
                    "Baking"
                ];

            const health =
                [
                    "Cycling",
                    "Badminton",
                    "Running",
                    "Yoga",
                    "Sleep",
                    "Healthy Eating"
                ];

            const growth =
                [
                    "Discipline",
                    "Goals",
                    "Confidence",
                    "Time Management",
                    "Journaling"
                ];


            let categoryList = [];


            if (category === "Learning") {
                categoryList = learning;
            }

            if (category === "Science") {
                categoryList = science;
            }

            if (category === "Technology") {
                categoryList = technology;
            }

            if (category === "Creativity") {
                categoryList = creativity;
            }

            if (category === "Health") {
                categoryList = health;
            }

            if (category === "Growth") {
                categoryList = growth;
            }


            if (
                categoryList.includes(interest)
            ) {

                habits.push(
                    ...habitIdeas[category]
                );

                break;

            }

        }

    });


    /*
       Убираем одинаковые привычки.
    */

    habits =
        [...new Set(habits)];


    /*
       Если почему-то привычек нет,
       показываем сообщение.
    */

    if (habits.length === 0) {

        habitContainer.innerHTML = `
            <div class="habit">
                <span>
                    Choose some interests 🌱
                </span>
            </div>
        `;

        return;

    }


    /* ===========================
       CREATE EACH HABIT
    =========================== */

    habits.forEach(habitName => {

        const habit =
            document.createElement("div");

        habit.className = "habit";


        const completed =
            user.completedToday.includes(
                habitName
            );


        habit.innerHTML = `

            <span>${habitName}</span>

            <button class="done-btn ${
                completed ? "finished" : ""
            }">

                ${
                    completed
                    ? "Completed ✓"
                    : "Done"
                }

            </button>

        `;


        const button =
            habit.querySelector(".done-btn");


        /* ===========================
           DONE BUTTON
        =========================== */

        button.onclick = () => {

            /*
               Уже выполнено —
               ничего больше не добавляем.
            */

            if (
                user.completedToday
                    .includes(habitName)
            ) {

                return;

            }


            /*
               Добавляем привычку
               в выполненные сегодня.
            */

            user.completedToday.push(
                habitName
            );


            /*
               Награды
            */

            user.xp += 10;

            user.coins += 5;


            /*
               Сохраняем ВСЁ.
            */

            saveUser();


            /*
               Меняем кнопку.
            */

            button.textContent =
                "Completed ✓";

            button.classList.add(
                "finished"
            );


            /*
               Обновляем интерфейс.
            */

            updateProgress();

            updateProfile();

            updateGarden();


            if (
                typeof updateStatistics ===
                "function"
            ) {

                updateStatistics();

            }

        };


        habitContainer.appendChild(
            habit
        );

    });


    updateProgress();

}


/* ===========================
   PROGRESS
=========================== */

function updateProgress() {

    const total =
        document.querySelectorAll(
            "#habitContainer .habit"
        ).length;


    const completed =
        user.completedToday.length;


    const percent =
        total === 0
        ? 0
        : Math.min(
            100,
            (completed / total) * 100
        );


    const fill =
        document.querySelector(
            ".progress-fill"
        );


    if (fill) {

        fill.style.width =
            percent + "%";

    }


    const text =
        document.getElementById(
            "progressText"
        );


    if (text) {

        text.textContent =
            `${completed} / ${total} completed`;

    }


    const tree =
        document.getElementById(
            "treeEmoji"
        );


    if (tree) {

        if (percent === 0) {

            tree.textContent = "🌱";

        }

        else if (percent < 30) {

            tree.textContent = "🌿";

        }

        else if (percent < 60) {

            tree.textContent = "🌳";

        }

        else if (percent < 100) {

            tree.textContent = "🌲";

        }

        else {

            tree.textContent = "🌸";

        }

    }

}


/* ===========================
   START
=========================== */

createHabits();
