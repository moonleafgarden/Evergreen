console.log("Evergreen started 🌲");

// ==========================
// Screens
// ==========================

const welcomeScreen = document.getElementById("welcome");
const interestsScreen = document.getElementById("interests");
const homeScreen = document.getElementById("home");

// ==========================
// Buttons
// ==========================

const nextBtn = document.getElementById("nextBtn");
const continueBtn = document.getElementById("continueBtn");

// ==========================
// Containers
// ==========================

const interestContainer = document.getElementById("interestContainer");
const selectedCount = document.getElementById("selectedCount");
const habitContainer = document.getElementById("habitContainer");

// ==========================
// Saved Data
// ==========================

let selectedInterests =
JSON.parse(localStorage.getItem("selectedInterests")) || [];

let doneHabits =
JSON.parse(localStorage.getItem("doneHabits")) || [];

let completedHabits = doneHabits.length;

// ==========================
// Welcome
// ==========================

nextBtn.addEventListener("click", () => {

    welcomeScreen.classList.remove("active");
    interestsScreen.classList.add("active");

});

// ==========================
// Show Interests
// ==========================

function showInterests() {

    interestContainer.innerHTML = "";

    for (const category in interests) {

        const section = document.createElement("div");
        section.className = "category";

        const title = document.createElement("h3");
        title.textContent = category;

        const cards = document.createElement("div");
        cards.className = "cards";

        interests[category].forEach(item => {

            const card = document.createElement("div");
            card.className = "card";
            card.textContent = item;

            if (selectedInterests.includes(item)) {
                card.classList.add("selected");
            }

            card.addEventListener("click", () => {

                if (selectedInterests.includes(item)) {

                    selectedInterests =
                        selectedInterests.filter(i => i !== item);

                    card.classList.remove("selected");

                } else {

                    selectedInterests.push(item);

                    card.classList.add("selected");

                }

                localStorage.setItem(
                    "selectedInterests",
                    JSON.stringify(selectedInterests)
                );

                selectedCount.textContent =
                    `Selected: ${selectedInterests.length}`;

            });

            cards.appendChild(card);

        });

        section.appendChild(title);
        section.appendChild(cards);

        interestContainer.appendChild(section);

    }

    selectedCount.textContent =
        `Selected: ${selectedInterests.length}`;

}

showInterests();

// ==========================
// Continue
// ==========================

continueBtn.addEventListener("click", () => {

    if (selectedInterests.length < 5) {

        alert("Choose at least 5 interests 🌱");
        return;

    }

    createHabits();

    interestsScreen.classList.remove("active");
    homeScreen.classList.add("active");

});

// ==========================
// Create Habits
// ==========================

function createHabits() {

    habitContainer.innerHTML = "";

    completedHabits = doneHabits.length;

    selectedInterests.forEach(item => {

        const habit = document.createElement("div");
        habit.className = "habit";

        const text =
            habitIdeas[item] || "Complete this activity";

        habit.innerHTML = `
            <span>
                ${item}
                <br>
                <small>${text}</small>
            </span>

            <button class="done-btn">
                Done
            </button>
        `;

        const doneBtn =
            habit.querySelector(".done-btn");

        // Если привычка уже выполнена
        if (doneHabits.includes(item)) {

            doneBtn.classList.add("finished");
            doneBtn.textContent = "Completed ✓";

        }

        doneBtn.addEventListener("click", () => {

            if (doneBtn.classList.contains("finished")) {
                return;
            }

            doneBtn.classList.add("finished");
            doneBtn.textContent = "Completed ✓";

            doneHabits.push(item);

            localStorage.setItem(
                "doneHabits",
                JSON.stringify(doneHabits)
            );

            completedHabits = doneHabits.length;

            updateProgress();

        });

        habitContainer.appendChild(habit);

    });

    updateProgress();

}

// ==========================
// Update Progress
// ==========================

function updateProgress() {

    const total = selectedInterests.length;

    const percent =
        total === 0 ? 0 : (completedHabits / total) * 100;

    document.querySelector(".progress-fill").style.width =
        percent + "%";

    document.getElementById("progressText").textContent =
        `${completedHabits} / ${total} completed`;

}

// ==========================
// Auto Load
// ==========================

if (selectedInterests.length >= 5) {

    welcomeScreen.classList.remove("active");
    interestsScreen.classList.remove("active");
    homeScreen.classList.add("active");

    createHabits();

}
