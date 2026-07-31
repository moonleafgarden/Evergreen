console.log("Evergreen 🌲");

// ==========================
// Screens
// ==========================

const welcomeScreen = document.getElementById("welcome");
const interestsScreen = document.getElementById("interests");
const homeScreen = document.getElementById("home");
const gardenScreen = document.getElementById("garden");
const progressScreen = document.getElementById("progress");
const profileScreen = document.getElementById("profile");
const settingsScreen = document.getElementById("settings");

const settingsBtn = document.getElementById("settingsBtn");
const backBtn = document.getElementById("backBtn");
const changeInterestsBtn =
document.getElementById("changeInterestsBtn");

// ==========================
// Navigation
// ==========================

const homeNav = document.getElementById("homeNav");
const gardenNav = document.getElementById("gardenNav");
const progressNav = document.getElementById("progressNav");
const profileNav = document.getElementById("profileNav");

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
// Daily Reset
// ==========================

const today = new Date().toDateString();

const savedDate = localStorage.getItem("today");

if (savedDate !== today) {

    doneHabits = [];
    completedHabits = 0;

    localStorage.setItem(
        "doneHabits",
        JSON.stringify(doneHabits)
    );

    localStorage.setItem(
        "today",
        today
    );

}

// ==========================
// Welcome
// ==========================

nextBtn.addEventListener("click", () => {

    welcomeScreen.classList.remove("active");

    if (selectedInterests.length >= 5) {

        createHabits();

        homeScreen.classList.add("active");

    } else {

        interestsScreen.classList.add("active");

    }

});

// ==========================
// Show Interests
// ==========================

function showInterests(){

    interestContainer.innerHTML = "";

    for(const category in interests){

        const section = document.createElement("div");
        section.className = "category";

        const title = document.createElement("h3");
        title.textContent = category;

        const cards = document.createElement("div");
        cards.className = "cards";

        interests[category].forEach(item=>{

            const card = document.createElement("div");
            card.className = "card";
            card.textContent = item;

            if(selectedInterests.includes(item)){
                card.classList.add("selected");
            }

            card.addEventListener("click",()=>{

                if(selectedInterests.includes(item)){

                    selectedInterests =
                    selectedInterests.filter(i=>i!==item);

                    card.classList.remove("selected");

                }else{

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

    // Save selected interests
    localStorage.setItem(
        "selectedInterests",
        JSON.stringify(selectedInterests)
    );

    // Reset today's completed habits
    doneHabits = [];
    completedHabits = 0;

    localStorage.setItem(
        "doneHabits",
        JSON.stringify(doneHabits)
    );

    // Create new habits
    createHabits();

    // Go back to Home
    interestsScreen.classList.remove("active");
    settingsScreen.classList.remove("active");
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

        // Уже выполнена?
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

            if (!doneHabits.includes(item)) {

                doneHabits.push(item);

                localStorage.setItem(
                    "doneHabits",
                    JSON.stringify(doneHabits)
                );

            }

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
// Navigation
// ==========================

function openScreen(screen) {

homeScreen.classList.remove("active");
gardenScreen.classList.remove("active");
progressScreen.classList.remove("active");
profileScreen.classList.remove("active");
settingsScreen.classList.remove("active");

    homeNav.classList.remove("active");
    gardenNav.classList.remove("active");
    progressNav.classList.remove("active");
    profileNav.classList.remove("active");

    screen.classList.add("active");

    if (screen === homeScreen) homeNav.classList.add("active");
    if (screen === gardenScreen) gardenNav.classList.add("active");
    if (screen === progressScreen) progressNav.classList.add("active");
    if (screen === profileScreen) profileNav.classList.add("active");

}

homeNav.addEventListener("click", () => openScreen(homeScreen));
gardenNav.addEventListener("click", () => openScreen(gardenScreen));
progressNav.addEventListener("click", () => openScreen(progressScreen));
profileNav.addEventListener("click", () => openScreen(profileScreen));


settingsBtn.addEventListener("click", () => {

    openScreen(settingsScreen);

});

backBtn.addEventListener("click", () => {

    openScreen(profileScreen);

});

changeInterestsBtn.addEventListener("click", () => {

    settingsScreen.classList.remove("active");

    interestsScreen.classList.add("active");

    showInterests();

});
