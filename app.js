console.log("Evergreen started 🌲");


// ===========================
// Evergreen App
// ===========================

// Screens
const welcomeScreen = document.getElementById("welcome");
const interestsScreen = document.getElementById("interests");
const homeScreen = document.getElementById("home");

// Buttons
const nextBtn = document.getElementById("nextBtn");
const continueBtn = document.getElementById("continueBtn");

// ===========================
// Open Interests
// ===========================

nextBtn.addEventListener("click", () => {

    welcomeScreen.classList.remove("active");
    interestsScreen.classList.add("active");

});

// ===========================
// Open Home
// ===========================

continueBtn.addEventListener("click", () => {

    interestsScreen.classList.remove("active");
    homeScreen.classList.add("active");

});
