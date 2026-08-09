```javascript
console.log("Evergreen app.js loaded");

/* ===========================
   SCREENS
=========================== */

const screens =
    document.querySelectorAll(".screen");

const welcome =
    document.getElementById("welcome");

const profileSetup =
    document.getElementById("profileSetup");

const interests =
    document.getElementById("interests");

const home =
    document.getElementById("home");

const garden =
    document.getElementById("garden");

const shop =
    document.getElementById("shop");

const progress =
    document.getElementById("progress");

const profile =
    document.getElementById("profile");


/* ===========================
   BUTTONS
=========================== */

const nextBtn =
    document.getElementById("nextBtn");

const nameContinueBtn =
    document.getElementById(
        "nameContinueBtn"
    );

const continueBtn =
    document.getElementById(
        "continueBtn"
    );

const homeNav =
    document.getElementById("homeNav");

const gardenNav =
    document.getElementById("gardenNav");

const progressNav =
    document.getElementById("progressNav");

const profileNav =
    document.getElementById("profileNav");

const openShopBtn =
    document.getElementById(
        "openShopBtn"
    );

const backGarden =
    document.getElementById(
        "backGarden"
    );

const nameInput =
    document.getElementById(
        "nameInput"
    );


/* ===========================
   USER DATA
=========================== */

const defaultUser = {

    name: "",

    interests: [],

    completedToday: [],

    xp: 0,

    coins: 0,

    streak: 0,

    lastActiveDate: null,

    decorations: []

};


let savedUser = null;


try {

    savedUser =
        JSON.parse(
            localStorage.getItem(
                "evergreenUser"
            )
        );

} catch (error) {

    console.log(
        "No valid saved user."
    );

}


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

    screens.forEach(
        screenElement => {

            screenElement.classList
                .remove("active");

        }
    );

    screen.classList.add("active");

}


/* ===========================
   NAVIGATION
=========================== */

function setActiveNav(button) {

    document
        .querySelectorAll(".nav-btn")
        .forEach(btn => {

            btn.classList.remove(
                "active"
            );

        });


    if (button) {

        button.classList.add(
            "active"
        );

    }

}


/* ===========================
   WELCOME
=========================== */

if (nextBtn) {

    nextBtn.onclick = () => {

        if (user.name) {

            openScreen(home);

            setActiveNav(homeNav);


            if (
                typeof createHabits ===
                "function"
            ) {

                createHabits();

            }

        } else {

            openScreen(
                profileSetup
            );

        }

    };

}


/* ===========================
   PROFILE SETUP
=========================== */

if (nameContinueBtn) {

    nameContinueBtn.onclick = () => {

        const name =
            nameInput
                ? nameInput.value.trim()
                : "";


        if (!name) {

            alert(
                "Please enter your name 🌱"
            );

            return;

        }


        user.name = name;

        saveUser();


        openScreen(interests);

    };

}


/* ===========================
   INTERESTS
=========================== */

if (continueBtn) {

    continueBtn.onclick = () => {

        if (
            user.interests.length < 5
        ) {

            alert(
                "Choose at least 5 interests 🌱"
            );

            return;

        }


        saveUser();


        openScreen(home);

        setActiveNav(homeNav);


        if (
            typeof createHabits ===
            "function"
        ) {

            createHabits();

        }


        if (
            typeof updateStatistics ===
            "function"
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
            typeof createHabits ===
            "function"
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

        updateGarden();

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
            typeof updateStatistics ===
            "function"
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


        if (
            typeof updateProfile ===
            "function"
        ) {

            updateProfile();

        }

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
   GARDEN DATA
=========================== */

function updateGarden() {

    const coins =
        document.getElementById(
            "coins"
        );

    const coinCount =
        document.getElementById(
            "coinCount"
        );


    if (coins) {

        coins.textContent =
            user.coins;

    }


    if (coinCount) {

        coinCount.textContent =
            user.coins;

    }

}


/* ===========================
   DATE
=========================== */

function getToday() {

    const now =
        new Date();


    const year =
        now.getFullYear();


    const month =
        String(
            now.getMonth() + 1
        ).padStart(2, "0");


    const day =
        String(
            now.getDate()
        ).padStart(2, "0");


    return `${year}-${month}-${day}`;

}


/* ===========================
   NEW DAY
=========================== */

function checkNewDay() {

    const today =
        getToday();


    if (
        !user.lastActiveDate
    ) {

        user.lastActiveDate =
            today;

        user.completedToday = [];

        saveUser();

        return;

    }


    if (
        user.lastActiveDate !==
        today
    ) {

        user.completedToday = [];

        user.lastActiveDate =
            today;

        saveUser();

        console.log(
            "🌱 New Evergreen day!"
        );

    }

}


/* ===========================
   RESET TODAY
=========================== */

function resetToday() {

    user.completedToday = [];

    user.lastActiveDate =
        getToday();


    saveUser();


    if (
        typeof createHabits ===
        "function"
    ) {

        createHabits();

    }


    if (
        typeof updateStatistics ===
        "function"
    ) {

        updateStatistics();

    }


    if (
        typeof updateProgress ===
        "function"
    ) {

        updateProgress();

    }

}


/* ===========================
   RESET DAY BUTTON
=========================== */

const resetDayBtn =
    document.getElementById(
        "resetDayBtn"
    );


if (resetDayBtn) {

    resetDayBtn.onclick = () => {

        const confirmed =
            confirm(
                "Reset today's habits? 🌱"
            );


        if (!confirmed) {

            return;

        }


        resetToday();


        alert(
            "Today's habits were reset 🌱"
        );

    };

}


/* ===========================
   START APP
=========================== */

window.onload = () => {

    checkNewDay();

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


    if (user.name) {

        openScreen(home);

        setActiveNav(homeNav);


        if (
            typeof createHabits ===
            "function"
        ) {

            createHabits();

        }

    } else {

        openScreen(welcome);

    }

};
```
