console.log("Evergreen");

/* ===========================
   SCREENS
=========================== */

const screens =
document.querySelectorAll(".screen");

const welcome =
document.getElementById("welcome");

const interestsScreen =
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

const continueBtn =
document.getElementById("continueBtn");

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
   OPEN SCREEN
=========================== */

function openScreen(screen){

    screens.forEach(s=>{

        s.classList.remove("active");

    });

    screen.classList.add("active");

}

/* ===========================
   ACTIVE NAVIGATION
=========================== */

function setActive(button){

    document
    .querySelectorAll(".nav-btn")
    .forEach(btn=>{

        btn.classList.remove("active");

    });

    button.classList.add("active");

}

/* ===========================
   START BUTTON
=========================== */

nextBtn.onclick = ()=>{

    openScreen(interestsScreen);

};

/* ===========================
   CONTINUE BUTTON
=========================== */

continueBtn.onclick = ()=>{

    if(selectedInterests.length < 5){

        alert("Choose at least 5 interests 🌱");
        return;

    }

    createHabits();

    openScreen(home);

    setActive(homeNav);

};

/* ===========================
   BOTTOM NAVIGATION
=========================== */

homeNav.onclick = ()=>{

    openScreen(home);
    setActive(homeNav);

};

gardenNav.onclick = ()=>{

    openScreen(garden);
    setActive(gardenNav);

};

progressNav.onclick = ()=>{

    openScreen(progress);
    setActive(progressNav);

};

profileNav.onclick = ()=>{

    openScreen(profile);
    setActive(profileNav);

};

/* ===========================
   SHOP
=========================== */

if(openShopBtn){

    openShopBtn.onclick = ()=>{

        openScreen(shop);

    };

}

if(backGarden){

    backGarden.onclick = ()=>{

        openScreen(garden);
        setActive(gardenNav);

    };

}

/* ===========================
   START APP
=========================== */

window.onload = ()=>{

    openScreen(welcome);

    if(typeof initInterests === "function"){

        initInterests();

    }

};

/* ===========================
   UPDATE FUNCTIONS
=========================== */

function updateCoins(){

    const coin1 =
    document.getElementById("coinCount");

    const coin2 =
    document.getElementById("coins");

    if(coin1){

        coin1.textContent = coins;

    }

    if(coin2){

        coin2.textContent = coins;

    }

}

function updateStatistics(){

    const completed =
    document.getElementById("statCompleted");

    const total =
    document.getElementById("statTotal");

    const percent =
    document.getElementById("statPercent");

    const level =
    document.getElementById("statLevel");

    if(completed){

        completed.textContent =
        doneHabits.length;

    }

    if(total){

        total.textContent =
        selectedInterests.length;

    }

    if(percent){

        let value = 0;

        if(selectedInterests.length > 0){

            value = Math.round(
                doneHabits.length /
                selectedInterests.length * 100
            );

        }

        percent.textContent =
        value + "%";

    }

    if(level){

        level.textContent =
        Math.floor(xp / 100) + 1;

    }

    updateCoins();

}
