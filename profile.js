console.log("Evergreen profile.js loaded");


/* =========================
   UPDATE PROFILE
========================= */

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
            Number(user.xp) || 0;
    }


    const coinElement =
        document.getElementById("coinCount");

    if (coinElement) {
        coinElement.textContent =
            Number(user.coins) || 0;
    }


    const interestsElement =
        document.getElementById("profileInterests");

    if (interestsElement) {

        interestsElement.innerHTML = "";

        if (
            !user.interests ||
            user.interests.length === 0
        ) {

            interestsElement.innerHTML =
                `<span class="empty-interests">
                    No interests yet
                </span>`;

        } else {

            user.interests.forEach(
                interest => {

                    const tag =
                        document.createElement(
                            "span"
                        );

                    tag.className =
                        "profile-interest";

                    tag.textContent =
                        interest;

                    interestsElement.appendChild(
                        tag
                    );

                }
            );

        }

    }

}


/* =========================
   BACK
========================= */

const profileBackBtn =
    document.getElementById(
        "profileBackBtn"
    );

if (profileBackBtn) {

    profileBackBtn.onclick = () => {

        openScreen(
            document.getElementById("home")
        );

        setActiveNav(
            document.getElementById("homeNav")
        );

    };

}


/* =========================
   CHANGE INTERESTS
========================= */

const changeInterestsBtn =
    document.getElementById(
        "changeInterestsBtn"
    );

if (changeInterestsBtn) {

    changeInterestsBtn.onclick = () => {

        openScreen(
            document.getElementById("interests")
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


/* =========================
   APPEARANCE
========================= */

const appearanceBtn =
    document.getElementById(
        "appearanceBtn"
    );

if (appearanceBtn) {

    appearanceBtn.onclick = () => {

        alert(
            "🎨 Appearance settings will be available soon."
        );

    };

}


/* =========================
   LANGUAGE
========================= */

const languageBtn =
    document.getElementById(
        "languageBtn"
    );

if (languageBtn) {

    languageBtn.onclick = () => {

        alert(
            "🌍 Language settings will be available soon."
        );

    };

}


/* =========================
   ABOUT
========================= */

const aboutBtn =
    document.getElementById(
        "aboutBtn"
    );

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


/* =========================
   RESET
========================= */

const resetBtn =
    document.getElementById(
        "resetBtn"
    );

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

        if (
            typeof updateGarden ===
            "function"
        ) {
            updateGarden();
        }

        if (
            typeof updateProgress ===
            "function"
        ) {
            updateProgress();
        }

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
