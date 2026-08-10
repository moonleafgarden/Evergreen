```javascript
console.log("Evergreen navigation.js loaded");

/* ===========================
   SCREENS
=========================== */

const Screens = {
    welcome: document.getElementById("welcome"),
    profileSetup: document.getElementById("profileSetup"),
    interests: document.getElementById("interests"),
    home: document.getElementById("home"),
    garden: document.getElementById("garden"),
    shop: document.getElementById("shop"),
    progress: document.getElementById("progress"),
    profile: document.getElementById("profile")
};


/* ===========================
   OPEN SCREEN
=========================== */

function openScreen(screen) {

    if (!screen) {
        return;
    }


    document
        .querySelectorAll(".screen")
        .forEach(item => {

            item.classList.remove("active");

        });


    screen.classList.add("active");

}


/* ===========================
   ACTIVE NAV
=========================== */

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
   HOME
=========================== */

const homeNav =
    document.getElementById("homeNav");


if (homeNav) {

    homeNav.addEventListener(
        "click",
        () => {

            openScreen(Screens.home);

            setActiveNav(homeNav);


            if (
                typeof createHabits ===
                "function"
            ) {

                createHabits();

            }

        }
    );

}


/* ===========================
   GARDEN
=========================== */

const gardenNav =
    document.getElementById("gardenNav");


if (gardenNav) {

    gardenNav.addEventListener(
        "click",
        () => {

            openScreen(Screens.garden);

            setActiveNav(gardenNav);


            if (
                typeof updateGarden ===
                "function"
            ) {

                updateGarden();

            }

        }
    );

}


/* ===========================
   STATISTICS
=========================== */

const progressNav =
    document.getElementById("progressNav");


if (progressNav) {

    progressNav.addEventListener(
        "click",
        () => {

            openScreen(Screens.progress);

            setActiveNav(progressNav);


            if (
                typeof updateStatistics ===
                "function"
            ) {

                updateStatistics();

            }

        }
    );

}


/* ===========================
   PROFILE
=========================== */

const profileNav =
    document.getElementById("profileNav");


if (profileNav) {

    profileNav.addEventListener(
        "click",
        () => {

            openScreen(Screens.profile);

            setActiveNav(profileNav);


            if (
                typeof updateProfile ===
                "function"
            ) {

                updateProfile();

            }

        }
    );

}


/* ===========================
   SHOP
=========================== */

const openShopBtn =
    document.getElementById("openShopBtn");


if (openShopBtn) {

    openShopBtn.addEventListener(
        "click",
        () => {

            openScreen(Screens.shop);


            if (
                typeof renderShop ===
                "function"
            ) {

                renderShop();

            }

        }
    );

}


/* ===========================
   BACK TO GARDEN
=========================== */

const backGarden =
    document.getElementById("backGarden");


if (backGarden) {

    backGarden.addEventListener(
        "click",
        () => {

            openScreen(Screens.garden);

            setActiveNav(gardenNav);


            if (
                typeof updateGarden ===
                "function"
            ) {

                updateGarden();

            }

        }
    );

}


/* ===========================
   WELCOME → PROFILE
=========================== */

const nextBtn =
    document.getElementById("nextBtn");


if (nextBtn) {

    nextBtn.addEventListener(
        "click",
        () => {

            if (
                typeof user !==
                "undefined" &&
                user.name
            ) {

                openScreen(Screens.home);

                setActiveNav(homeNav);


                if (
                    typeof createHabits ===
                    "function"
                ) {

                    createHabits();

                }

            } else {

                openScreen(
                    Screens.profileSetup
                );

            }

        }
    );

}


/* ===========================
   PROFILE SETUP → INTERESTS
=========================== */

const nameContinueBtn =
    document.getElementById(
        "nameContinueBtn"
    );


if (nameContinueBtn) {

    nameContinueBtn.addEventListener(
        "click",
        () => {

            const nameInput =
                document.getElementById(
                    "nameInput"
                );


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


            if (
                typeof user ===
                "undefined"
            ) {

                return;

            }


            user.name = name;


            if (
                typeof saveUser ===
                "function"
            ) {

                saveUser();

            }


            openScreen(
                Screens.interests
            );

        }
    );

}


/* ===========================
   INTERESTS → HOME
=========================== */

const continueBtn =
    document.getElementById(
        "continueBtn"
    );


if (continueBtn) {

    continueBtn.addEventListener(
        "click",
        () => {

            if (
                typeof user ===
                "undefined"
            ) {

                return;

            }


            if (
                user.interests.length <
                5
            ) {

                alert(
                    "Choose at least 5 interests 🌱"
                );

                return;

            }


            if (
                typeof saveUser ===
                "function"
            ) {

                saveUser();

            }


            openScreen(
                Screens.home
            );

            setActiveNav(homeNav);


            if (
                typeof createHabits ===
                "function"
            ) {

                createHabits();

            }

        }
    );

}


/* ===========================
   INITIAL SCREEN
=========================== */

function startNavigation() {

    if (
        typeof user !==
        "undefined" &&
        user.name
    ) {

        openScreen(Screens.home);

        setActiveNav(homeNav);


        if (
            typeof createHabits ===
            "function"
        ) {

            createHabits();

        }

    } else {

        openScreen(Screens.welcome);

    }

}
```
