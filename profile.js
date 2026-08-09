console.log("Evergreen profile.js loaded");

/* ===========================
   PROFILE
=========================== */

function updateProfile() {

    if (typeof user === "undefined") {
        return;
    }

    const nameElement =
        document.getElementById("profileName");

    if (nameElement) {
        nameElement.textContent =
            user.name || "Evergreen User";
    }


    const xpElement =
        document.getElementById("xpValue");

    if (xpElement) {
        xpElement.textContent =
            user.xp || 0;
    }


    const coinElement =
        document.getElementById("coinCount");

    if (coinElement) {
        coinElement.textContent =
            user.coins || 0;
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

    changeInterestsBtn.onclick = () => {

        openScreen(interests);

        setActiveNav(null);

    };

}


/* ===========================
   RESET PROGRESS
=========================== */

const resetBtn =
    document.getElementById("resetBtn");

if (resetBtn) {

    resetBtn.onclick = () => {

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

        updateProgress();


        if (
            typeof updateStatistics ===
            "function"
        ) {

            updateStatistics();

        }


        if (
            typeof createHabits ===
            "function"
        ) {

            createHabits();

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
    document.getElementById("aboutBtn");

if (aboutBtn) {

    aboutBtn.onclick = () => {

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

    appearanceBtn.onclick = () => {

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

    languageBtn.onclick = () => {

        alert(
            "🌍 Language settings " +
            "will be available soon."
        );

    };

}
```
