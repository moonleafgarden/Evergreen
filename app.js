console.log("Evergreen app.js loaded");

/* ===========================
   SCREENS
=========================== */

const screens = document.querySelectorAll(".screen");

const welcome = document.getElementById("welcome");
const interests = document.getElementById("interests");
const home = document.getElementById("home");
const garden = document.getElementById("garden");
const shop = document.getElementById("shop");
const progress = document.getElementById("progress");
const profile = document.getElementById("profile");


/* ===========================
   NAVIGATION BUTTONS
=========================== */

const homeNav = document.getElementById("homeNav");
const gardenNav = document.getElementById("gardenNav");
const progressNav = document.getElementById("progressNav");
const profileNav = document.getElementById("profileNav");

const nextBtn = document.getElementById("nextBtn");
const continueBtn = document.getElementById("continueBtn");

const openShopBtn = document.getElementById("openShopBtn");
const backGarden = document.getElementById("backGarden");


/* ===========================
   USER DATA
=========================== */

const defaultUser = {

    name: "Madinabonu",

    interests: [],

    completedToday: [],

    xp: 0,

    coins: 0,

    streak: 0,

    lastActiveDate: null

};


let savedUser =
    JSON.parse(
        localStorage.getItem("evergreenUser")
    );


let user = savedUser
    ? {
        ...defaultUser,
        ...savedUser
    }
    : {
        ...defaultUser
    };


/* ===========================
   SAVE USER
=========================== */

function saveUser() {

    localStorage.setItem(
        "evergreenUser",
        JSON.stringify(user)
    );

}


/* ===========================
   SCREEN
=========================== */

function openScreen(screen) {

    if (!screen) return;

    screens.forEach(screenElement => {

        screenElement.classList.remove("active");

    });

    screen.classList.add("active");

}


/* ===========================
   ACTIVE NAVIGATION
=========================== */

function setActiveNav(button) {

    document
        .querySelectorAll(".nav-btn")
        .forEach(btn => {

            btn.classList.remove("active");

        });


    if (button) {

        button.classList.add("active");

    }

}


/* ===========================
   WELCOME
=========================== */

if (nextBtn) {

    nextBtn.onclick = () => {

        openScreen(interests);

        setActiveNav(null);

    };

}


/* ===========================
   CONTINUE
=========================== */

if (continueBtn) {

    continueBtn.onclick = () => {

        if (user.interests.length < 5) {

            alert(
                "Choose at least 5 interests 🌱"
            );

            return;

        }


        saveUser();

        openScreen(home);

        setActiveNav(homeNav);


        if (
            typeof createHabits === "function"
        ) {

            createHabits();

        }


        if (
            typeof updateStatistics === "function"
        ) {

            updateStatistics();

        }

    };

}


/* ===========================
   HOME
=========================== */

if (homeNav) {

    homeNav.onclick = () => {

        openScreen(home);

        setActiveNav(homeNav);

        if (
            typeof createHabits === "function"
        ) {

            createHabits();

        }

    };

}


/* ===========================
   GARDEN
=========================== */

if (gardenNav) {

    gardenNav.onclick = () => {

        openScreen(garden);

        setActiveNav(gardenNav);

    };

}


/* ===========================
   STATISTICS
=========================== */

if (progressNav) {

    progressNav.onclick = () => {

        openScreen(progress);

        setActiveNav(progressNav);


        if (
            typeof updateStatistics === "function"
        ) {

            updateStatistics();

        }

    };

}


/* ===========================
   PROFILE
=========================== */

if (profileNav) {

    profileNav.onclick = () => {

        openScreen(profile);

        setActiveNav(profileNav);

        updateProfile();

    };

}


/* ===========================
   SHOP
=========================== */

if (openShopBtn) {

    openShopBtn.onclick = () => {

        openScreen(shop);

    };

}


if (backGarden) {

    backGarden.onclick = () => {

        openScreen(garden);

        setActiveNav(gardenNav);

    };

}


/* ===========================
   PROFILE DATA
=========================== */

function updateProfile() {

    const nameElement =
        document.getElementById("profileName");

    if (nameElement) {

        nameElement.textContent =
            user.name;

    }


    const coinElement =
        document.getElementById("coinCount");

    if (coinElement) {

        coinElement.textContent =
            user.coins;

    }


    const xpElement =
        document.getElementById("xpValue");

    if (xpElement) {

        xpElement.textContent =
            user.xp;

    }

}


/* ===========================
   GARDEN DATA
=========================== */

function updateGarden() {

    const coinElement =
        document.getElementById("coins");

    if (coinElement) {

        coinElement.textContent =
            user.coins;

    }


    const coinElement2 =
        document.getElementById("coinCount");

    if (coinElement2) {

        coinElement2.textContent =
            user.coins;

    }

}


/* ===========================
   DAILY DATE
=========================== */

function getToday() {

    const date = new Date();

    return date.toISOString()
        .split("T")[0];

}


/* ===========================
   DAILY CHECK
=========================== */

function checkNewDay() {

    const today = getToday();


    if (!user.lastActiveDate) {

        user.lastActiveDate =
            today;

        saveUser();

        return;

    }


    if (
        user.lastActiveDate !== today
    ) {

        user.completedToday = [];

        user.lastActiveDate =
            today;

        saveUser();

    }

}


/* ===========================
   START APP
=========================== */

window.onload = () => {

    checkNewDay();

    updateProfile();

    updateGarden();


    if (
        typeof updateStatistics === "function"
    ) {

        updateStatistics();

    }


    openScreen(welcome);

};
