console.log("Evergreen profile.js loaded");


function updateProfile() {

    const nameElement =
        document.getElementById(
            "profileName"
        );

    const xpElement =
        document.getElementById(
            "xpValue"
        );

    const coinElement =
        document.getElementById(
            "coinCount"
        );


    if (nameElement) {
        nameElement.textContent =
            user.name ||
            "Evergreen User";
    }

    if (xpElement) {
        xpElement.textContent =
            user.xp;
    }

    if (coinElement) {
        coinElement.textContent =
            user.coins;
    }

}


/* ===========================
   CHANGE INTERESTS
=========================== */

const changeInterestsBtn =
    document.getElementById(
        "changeInterestsBtn"
    );


if (changeInterestsBtn) {

    changeInterestsBtn.onclick =
        function () {

            openScreen(
                document.getElementById(
                    "interests"
                )
            );

            setActiveNav(null);

            if (
                typeof renderInterests ===
                "function"
            ) {
                renderInterests();
            }

        };

}


/* ===========================
   RESET
=========================== */

const resetBtn =
    document.getElementById(
        "resetBtn"
    );


if (resetBtn) {

    resetBtn.onclick =
        function () {

            const confirmed =
                confirm(
                    "Reset all your Evergreen progress? 🌱"
                );


            if (!confirmed) {
                return;
            }


            user.xp = 0;

            user.coins = 0;

            user.streak = 0;

            user.completedToday = [];

            user.decorations = [];


            saveUser();


            updateProfile();

            updateGarden();


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


            alert(
                "Your progress has been reset 🌱"
            );

        };

}


/* ===========================
   ABOUT
=========================== */

const aboutBtn =
    document.getElementById(
        "aboutBtn"
    );


if (aboutBtn) {

    aboutBtn.onclick =
        function () {

            alert(
                "🌲 Evergreen\n\n" +
                "Grow a little every day.\n\n" +
                "Build habits, learn new things " +
                "and watch your garden grow."
            );

        };

}


/* ===========================
   APPEARANCE
=========================== */

const appearanceBtn =
    document.getElementById(
        "appearanceBtn"
    );


if (appearanceBtn) {

    appearanceBtn.onclick =
        function () {

            alert(
                "🎨 Appearance settings " +
                "will be available soon."
            );

        };

}


/* ===========================
   LANGUAGE
=========================== */

const languageBtn =
    document.getElementById(
        "languageBtn"
    );


if (languageBtn) {

    languageBtn.onclick =
        function () {

            alert(
                "🌍 Language settings " +
                "will be available soon."
            );

        };

}
