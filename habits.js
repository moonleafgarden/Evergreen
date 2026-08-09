console.log("Evergreen — app.js");

/* ===========================
   SCREENS
=========================== */

const Screens = {

    welcome: document.getElementById("welcome"),
    interests: document.getElementById("interests"),
    home: document.getElementById("home"),
    garden: document.getElementById("garden"),
    shop: document.getElementById("shop"),
    progress: document.getElementById("progress"),
    profile: document.getElementById("profile")

};


/* ===========================
   USER DATA
=========================== */

let user =
    JSON.parse(
        localStorage.getItem("evergreenUser")
    ) || {

        interests: [],
        xp: 0,
        coins: 0,
        level: 1,
        streak: 0,
        completedToday: [],
        lastActiveDate: null

    };


/* ===========================
   CLEAN USER DATA
=========================== */

if (!Array.isArray(user.interests)) {
    user.interests = [];
}

if (!Array.isArray(user.completedToday)) {
    user.completedToday = [];
}

if (typeof user.xp !== "number") {
    user.xp = Number(user.xp) || 0;
}

if (typeof user.coins !== "number") {
    user.coins = Number(user.coins) || 0;
}

if (typeof user.streak !== "number") {
    user.streak = Number(user.streak) || 0;
}


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
   OPEN SCREEN
=========================== */

function openScreen(screen) {

    if (!screen) {
        console.error("Screen does not exist.");
        return;
    }


    document
        .querySelectorAll(".screen")
        .forEach(element => {

            element.classList.remove("active");

        });


    screen.classList.add("active");


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* ===========================
   NAVIGATION
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
   BUTTONS
=========================== */

const nextBtn =
    document.getElementById("nextBtn");

const homeNav =
    document.getElementById("homeNav");

const gardenNav =
    document.getElementById("gardenNav");

const progressNav =
    document.getElementById("progressNav");

const profileNav =
    document.getElementById("profileNav");

const openShopBtn =
    document.getElementById("openShopBtn");

const backGarden =
    document.getElementById("backGarden");


/* ===========================
   WELCOME
=========================== */

if (nextBtn) {

    nextBtn.addEventListener(
        "click",
        () => {

            openScreen(
                Screens.interests
            );

        }
    );

}


/* ===========================
   HOME
=========================== */

if (homeNav) {

    homeNav.addEventListener(
        "click",
        () => {

            openScreen(
                Screens.home
            );

            setActiveNav(homeNav);

        }
    );

}


/* ===========================
   GARDEN
=========================== */

if (gardenNav) {

    gardenNav.addEventListener(
        "click",
        () => {

            openScreen(
                Screens.garden
            );

            setActiveNav(gardenNav);


            if (
                typeof updateGarden === "function"
            ) {

                updateGarden();

            }

        }
    );

}


/* ===========================
   STATISTICS
=========================== */

if (progressNav) {

    progressNav.addEventListener(
        "click",
        () => {

            openScreen(
                Screens.progress
            );

            setActiveNav(progressNav);


            if (
                typeof updateStatistics === "function"
            ) {

                updateStatistics();

            }

        }
    );

}


/* ===========================
   PROFILE
=========================== */

if (profileNav) {

    profileNav.addEventListener(
        "click",
        () => {

            openScreen(
                Screens.profile
            );

            setActiveNav(profileNav);

        }
    );

}


/* ===========================
   SHOP
=========================== */

if (openShopBtn) {

    openShopBtn.addEventListener(
        "click",
        () => {

            openScreen(
                Screens.shop
            );

        }
    );

}


/* ===========================
   BACK TO GARDEN
=========================== */

if (backGarden) {

    backGarden.addEventListener(
        "click",
        () => {

            openScreen(
                Screens.garden
            );

            setActiveNav(gardenNav);

        }
    );

}


/* ===========================
   START
=========================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        saveUser();

        openScreen(
            Screens.welcome
        );

    }
);
