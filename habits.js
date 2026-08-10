console.log("Evergreen habits.js loaded");


function createHabits() {

    const container =
        document.getElementById(
            "habitContainer"
        );

    if (!container) {
        return;
    }

    container.innerHTML = "";


    user.interests.forEach(
        function (interest) {

            const habit =
                document.createElement(
                    "div"
                );

            habit.className = "habit";


            const completed =
                user.completedToday
                    .includes(interest);


            habit.innerHTML =
                '<span class="habit-name">' +
                interest +
                '</span>' +

                '<button class="done-btn ' +
                (completed
                    ? "finished"
                    : "") +
                '">' +

                (completed
                    ? "Completed ✓"
                    : "Done") +

                "</button>";


            const button =
                habit.querySelector(
                    ".done-btn"
                );


            button.onclick =
                function () {

                    if (
                        user.completedToday
                            .includes(interest)
                    ) {
                        return;
                    }


                    user.completedToday.push(
                        interest
                    );

                    user.xp += 10;

                    user.coins += 5;


                    saveUser();


                    button.textContent =
                        "Completed ✓";

                    button.classList.add(
                        "finished"
                    );


                    updateProgress();

                    updateGarden();


                    if (
                        typeof updateProfile ===
                        "function"
                    ) {
                        updateProfile();
                    }


                    if (
                        typeof updateStatistics ===
                        "function"
                    ) {
                        updateStatistics();
                    }

                };


            container.appendChild(
                habit
            );

        }
    );


    updateProgress();

}


function updateProgress() {

    const total =
        user.interests.length;

    const completed =
        user.completedToday.length;


    const percent =
        total === 0
            ? 0
            : Math.round(
                completed / total * 100
            );


    const bar =
        document.getElementById(
            "progressFill"
        );

    if (bar) {
        bar.style.width =
            percent + "%";
    }


    const text =
        document.getElementById(
            "progressText"
        );

    if (text) {

        text.textContent =
            completed +
            " / " +
            total +
            " completed";

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
