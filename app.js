console.log("Evergreen — app.js");

/* =========================
   SCREENS
========================= */

const screens = document.querySelectorAll(".screen");

const welcome = document.getElementById("welcome");
const interests = document.getElementById("interests");
const home = document.getElementById("home");
const garden = document.getElementById("garden");
const shop = document.getElementById("shop");
const progress = document.getElementById("progress");
const profile = document.getElementById("profile");


/* =========================
   BUTTONS
========================= */

const nextBtn = document.getElementById("nextBtn");
const continueBtn = document.getElementById("continueBtn");

const homeNav = document.getElementById("homeNav");
const gardenNav = document.getElementById("gardenNav");
const progressNav = document.getElementById("progressNav");
const profileNav = document.getElementById("profileNav");

const openShopBtn = document.getElementById("openShopBtn");
const backGarden = document.getElementById("backGarden");


/* =========================
   OPEN SCREEN
========================= */

function openScreen(screen) {

    if (!screen) {
        console.error("Screen not found");
        return;
    }

    screens.forEach(s => {
        s.classList.remove("active");
    });

    screen.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================
   ACTIVE NAV
========================= */

function setActive(button) {

    document.querySelectorAll(".nav-btn")
        .forEach(btn => {
            btn.classList.remove("active");
        });

    if (button) {
        button.classList.add("active");
    }
}


/* =========================
   WELCOME
========================= */

if (nextBtn) {

    nextBtn.addEventListener("click", () => {

        openScreen(interests);

    });

}


/* =========================
   INTERESTS
========================= */

if (continueBtn) {

    continueBtn.addEventListener("click", () => {

        const selected =
            JSON.parse(
                localStorage.getItem("selectedInterests")
            ) || [];

        if (selected.length < 5) {

            alert("Choose at least 5 interests 🌱");

            return;
        }

        openScreen(home);

        setActive(homeNav);

        if (typeof createHabits === "function") {
            createHabits();
        }

    });

}


/* =========================
   HOME
========================= */

if (homeNav) {

    homeNav.addEventListener("click", () => {

        openScreen(home);

        setActive(homeNav);

    });

}


/* =========================
   GARDEN
========================= */

if (gardenNav) {

    gardenNav.addEventListener("click", () => {

        openScreen(garden);

        setActive(gardenNav);

        if (typeof updateGarden === "function") {
            updateGarden();
        }

    });

}


/* =========================
   STATISTICS
========================= */

if (progressNav) {

    progressNav.addEventListener("click", () => {

        openScreen(progress);

        setActive(progressNav);

        if (typeof updateStatistics === "function") {
            updateStatistics();
        }

    });

}


/* =========================
   PROFILE
========================= */

if (profileNav) {

    profileNav.addEventListener("click", () => {

        openScreen(profile);

        setActive(profileNav);

    });

}


/* =========================
   SHOP
========================= */

if (openShopBtn) {

    openShopBtn.addEventListener("click", () => {

        openScreen(shop);

    });

}


/* =========================
   BACK TO GARDEN
========================= */

if (backGarden) {

    backGarden.addEventListener("click", () => {

        openScreen(garden);

        setActive(gardenNav);

    });

}


/* =========================
   START
========================= */

window.addEventListener("DOMContentLoaded", () => {

    openScreen(welcome);

});
