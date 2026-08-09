/* ===========================
   NAVIGATION
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


/* ---------- OPEN SCREEN ---------- */

function openScreen(screen) {

    document.querySelectorAll(".screen").forEach(item => {
        item.classList.remove("active");
    });

    if (screen) {
        screen.classList.add("active");
    }

}


/* ---------- ACTIVE NAV ---------- */

function setActiveNav(button) {

    document.querySelectorAll(".nav-btn").forEach(item => {
        item.classList.remove("active");
    });

    if (button) {
        button.classList.add("active");
    }

}


/* ---------- NAVIGATION BUTTONS ---------- */

document.getElementById("homeNav")?.addEventListener("click", () => {

    openScreen(Screens.home);

    setActiveNav(
        document.getElementById("homeNav")
    );

});


document.getElementById("gardenNav")?.addEventListener("click", () => {

    openScreen(Screens.garden);

    setActiveNav(
        document.getElementById("gardenNav")
    );

});


document.getElementById("progressNav")?.addEventListener("click", () => {

    openScreen(Screens.progress);

    setActiveNav(
        document.getElementById("progressNav")
    );

});


document.getElementById("profileNav")?.addEventListener("click", () => {

    openScreen(Screens.profile);

    setActiveNav(
        document.getElementById("profileNav")
    );

});


/* ---------- GARDEN SHOP ---------- */

document.getElementById("openShopBtn")?.addEventListener("click", () => {

    openScreen(Screens.shop);

});


document.getElementById("backGarden")?.addEventListener("click", () => {

    openScreen(Screens.garden);

    setActiveNav(
        document.getElementById("gardenNav")
    );

});
