console.log("Evergreen app.js loaded");

/* ===========================
   SCREENS
=========================== */

const welcomeScreen = document.getElementById("welcome");
const profileSetupScreen = document.getElementById("profileSetup");
const interestsScreen = document.getElementById("interests");
const homeScreen = document.getElementById("home");
const gardenScreen = document.getElementById("garden");
const shopScreen = document.getElementById("shop");
const progressScreen = document.getElementById("progress");
const profileScreen = document.getElementById("profile");


/* ===========================
   USER
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


let user = defaultUser;


try {
    const saved =
        JSON.parse(
            localStorage.getItem("evergreenUser")
        );

    if (saved) {
        user = {
            ...defaultUser,
            ...saved
        };
    }

} catch (error) {
    console.log("No saved Evergreen user.");
}


/* ===========================
   SAVE
=========================== */

function saveUser() {

    localStorage.setItem(
        "evergreenUser",
        JSON.stringify(user)
    );

}


/* ===========================
   NAVIGATION
=========================== */

function openScreen(screen) {

    document
        .querySelectorAll(".screen")
        .forEach(item => {
            item.classList.remove("active");
        });

    if (screen) {
        screen.classList.add("active");
    }
}


function setActiveNav(button) {

    document
        .querySelectorAll(".nav-btn")
        .forEach(item => {
            item.classList.remove("active");
        });

    if (button) {
        button.classList.add("active");
    }
}


/* ===========================
   TODAY
=========================== */

function getToday() {

    const date = new Date();

    const year = date.getFullYear();

    const month =
        String(date.getMonth() + 1)
            .padStart(2, "0");

    const day =
        String(date.getDate())
            .padStart(2, "0");

    return year + "-" + month + "-" + day;
}


function checkNewDay() {

    const today = getToday();

    if (!user.lastActiveDate) {

        user.lastActiveDate = today;

        saveUser();

        return;
    }

    if (user.lastActiveDate !== today) {

        user.completedToday = [];

        user.lastActiveDate = today;

        saveUser();
    }
}


/* ===========================
   WELCOME
=========================== */

const nextBtn =
    document.getElementById("nextBtn");


if (nextBtn) {

    nextBtn.onclick = function () {

        if (user.name) {

            openScreen(homeScreen);

            setActiveNav(
                document.getElementById("homeNav")
            );

            if (
                typeof createHabits === "function"
            ) {
                createHabits();
            }

        } else {

            openScreen(
                profileSetupScreen
            );

        }

    };
}


/* ===========================
   NAME
=========================== */

const nameInput =
    document.getElementById("nameInput");

const nameContinueBtn =
    document.getElementById(
        "nameContinueBtn"
    );


if (nameContinueBtn) {

    nameContinueBtn.onclick = function () {

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

        openScreen(
            interestsScreen
        );

    };
}


/* ===========================
   INTERESTS CONTINUE
=========================== */

const continueBtn =
    document.getElementById(
        "continueBtn"
    );


if (continueBtn) {

    continueBtn.onclick = function () {

        if (user.interests.length < 5) {

            alert(
                "Choose at least 5 interests 🌱"
            );

            return;
        }

        saveUser();

        openScreen(homeScreen);

        setActiveNav(
            document.getElementById("homeNav")
        );

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

const homeNav =
    document.getElementById("homeNav");


if (homeNav) {

    homeNav.onclick = function () {

        openScreen(homeScreen);

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

const gardenNav =
    document.getElementById("gardenNav");


if (gardenNav) {

    gardenNav.onclick = function () {

        openScreen(gardenScreen);

        setActiveNav(gardenNav);

        if (
            typeof updateGarden === "function"
        ) {
            updateGarden();
        }

    };
}


/* ===========================
   STATISTICS
=========================== */

const progressNav =
    document.getElementById(
        "progressNav"
    );


if (progressNav) {

    progressNav.onclick = function () {

        openScreen(progressScreen);

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

const profileNav =
    document.getElementById(
        "profileNav"
    );


if (profileNav) {

    profileNav.onclick = function () {

        openScreen(profileScreen);

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

const openShopBtn =
    document.getElementById(
        "openShopBtn"
    );


if (openShopBtn) {

    openShopBtn.onclick = function () {

        openScreen(shopScreen);

    };
}


const backGarden =
    document.getElementById(
        "backGarden"
    );


if (backGarden) {

    backGarden.onclick = function () {

        openScreen(gardenScreen);

        setActiveNav(
            document.getElementById(
                "gardenNav"
            )
        );

    };
}


/* ===========================
   GARDEN DATA
=========================== */

function updateGarden() {

    const coins =
        document.getElementById("coins");

    const coinCount =
        document.getElementById(
            "coinCount"
        );

    if (coins) {
        coins.textContent = user.coins;
    }

    if (coinCount) {
        coinCount.textContent =
            user.coins;
    }
}


/* ===========================
   START
=========================== */

window.addEventListener(
    "load",
    function () {

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

            openScreen(homeScreen);

            setActiveNav(
                document.getElementById(
                    "homeNav"
                )
            );

            if (
                typeof createHabits ===
                "function"
            ) {
                createHabits();
            }

        } else {

            openScreen(welcomeScreen);

        }

    }
);
