console.log("Evergreen habits.js loaded");

/* ===========================
   HABITS
=========================== */

function createHabits() {

    const container =
        document.getElementById("habitContainer");

    if (!container) return;

    container.innerHTML = "";


    user.interests.forEach(interest => {

        const habit =
            document.createElement("div");

        habit.className = "habit";


        const completed =
            user.completedToday.includes(interest);


        habit.innerHTML = `

            <span class="habit-name">
                ${interest}
            </span>

            <button class="done-btn ${completed ? "finished" : ""}">
                ${completed ? "Completed ✓" : "Done"}
            </button>

        `;


        const button =
            habit.querySelector(".done-btn");


        button.onclick = () => {

            /* Already completed */

            if (
                user.completedToday.includes(interest)
            ) {

                return;

            }


            /* ===========================
               COMPLETE HABIT
            =========================== */

            user.completedToday.push(
                interest
            );


            /* ===========================
               XP
            =========================== */

            user.xp += 10;


            /* ===========================
               COINS
            =========================== */

            user.coins += 5;


            /* ===========================
               STREAK
            =========================== */

            /*
               Streak increases only once
               when the first habit of the
               current day is completed.
            */

            if (
                user.completedToday.length === 1
            ) {

                user.streak += 1;

            }


            /* ===========================
               SAVE
            =========================== */

            saveUser();


            /* ===========================
               BUTTON
            =========================== */

            button.textContent =
                "Completed ✓";

            button.classList.add(
                "finished"
            );


            /* ===========================
               UPDATE HOME
            =========================== */

            updateProgress();


            /* ===========================
               UPDATE PROFILE
            =========================== */

            if (
                typeof updateProfile ===
                "function"
            ) {

                updateProfile();

            }


            /* ===========================
               UPDATE GARDEN
            =========================== */

            if (
                typeof updateGarden ===
                "function"
            ) {

                updateGarden();

            }


            /* ===========================
               UPDATE STATISTICS
            =========================== */

            if (
                typeof updateStatistics ===
                "function"
            ) {

                updateStatistics();

            }

        };


        container.appendChild(habit);

    });


    updateProgress();

}


/* ===========================
   HOME PROGRESS
=========================== */

function updateProgress() {

    const total =
        user.interests.length;


    const completed =
        user.completedToday.length;


    const percent =
        total === 0
            ? 0
            : Math.round(
                (completed / total) * 100
            );


    /* ===========================
       PROGRESS BAR
    =========================== */

    const bar =
        document.getElementById(
            "progressFill"
        );


    if (bar) {

        bar.style.width =
            percent + "%";

    }


    /* ===========================
       PROGRESS TEXT
    =========================== */

    const text =
        document.getElementById(
            "progressText"
        );


    if (text) {

        text.textContent =
            `${completed} / ${total} completed`;

    }


    /* ===========================
       TREE
    =========================== */

    const tree =
        document.getElementById(
            "treeEmoji"
        );


    if (tree) {

        if (percent === 0) {

            tree.textContent =
                "🌱";

        }

        else if (percent < 30) {

            tree.textContent =
                "🌿";

        }

        else if (percent < 60) {

            tree.textContent =
                "🌳";

        }

        else if (percent < 100) {

            tree.textContent =
                "🌲";

        }

        else {

            tree.textContent =
                "🌸";

        }

    }

}
