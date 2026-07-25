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
// Home
// ==========================

const habitContainer = document.getElementById("habitContainer");

// ==========================
// Interests
// ==========================

const interestContainer = document.getElementById("interestContainer");
const selectedCount = document.getElementById("selectedCount");

let selectedInterests = [];

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

            card.addEventListener("click", () => {

                if (selectedInterests.includes(item)) {

                    selectedInterests =
                        selectedInterests.filter(i => i !== item);

                    card.classList.remove("selected");

                } else {

                    selectedInterests.push(item);

                    card.classList.add("selected");

                }

                selectedCount.textContent =
                    `Selected: ${selectedInterests.length}`;

            });

            cards.appendChild(card);

        });

        section.appendChild(title);
        section.appendChild(cards);

        interestContainer.appendChild(section);

    }

}

showInterests();


// ==========================
// Progress
// ==========================

let completedHabits = 0;

// ==========================
// Continue
// ==========================

continueBtn.addEventListener("click", () => {

    if (selectedInterests.length < 5) {

        alert("Choose at least 5 interests 🌱");
        return;

    }

    createHabits();

    localStorage.setItem(
    "selectedInterests",
    JSON.stringify(selectedInterests)
);

    interestsScreen.classList.remove("active");
    homeScreen.classList.add("active");

});

// ==========================
// Create Habits
// ==========================

function createHabits() {

    habitContainer.innerHTML = "";

    completedHabits = 0;
    updateProgress();

    selectedInterests.forEach(item => {

        const habit = document.createElement("div");
        habit.className = "habit";

        const text = habitIdeas[item] || "Complete this activity";

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

        const doneBtn = habit.querySelector(".done-btn");

        doneBtn.addEventListener("click", () => {

            if (doneBtn.classList.contains("finished")) {
                return;
            }

            doneBtn.classList.add("finished");
            doneBtn.textContent = "Completed ✓";

            completedHabits++;
            updateProgress();

        });

        habitContainer.appendChild(habit);

    });

}

// ==========================
// Update Progress
// ==========================

function updateProgress() {

    const total = selectedInterests.length;

    const percent = total === 0
        ? 0
        : (completedHabits / total) * 100;

    document.querySelector(".progress-fill").style.width =
        percent + "%";

    document.getElementById("progressText").textContent =
        `${completedHabits} / ${total} completed`;

}


// ==========================
// Load Saved Data
// ==========================

const savedInterests = JSON.parse(
    localStorage.getItem("selectedInterests")
);

if (savedInterests && savedInterests.length > 0) {

    selectedInterests = savedInterests;

    createHabits();

    welcomeScreen.classList.remove("active");
    interestsScreen.classList.remove("active");
    homeScreen.classList.add("active");

}
