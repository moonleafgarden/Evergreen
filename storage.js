/* ===========================
   STORAGE
=========================== */

const Storage = {

    get(key, defaultValue) {

        const value = localStorage.getItem(key);

        return value ? JSON.parse(value) : defaultValue;

    },

    set(key, value) {

        localStorage.setItem(key, JSON.stringify(value));

    }

};

/* ---------- USER DATA ---------- */

let user = {

    interests: Storage.get("interests", []),

    completed: Storage.get("completed", []),

    coins: Storage.get("coins", 0),

    xp: Storage.get("xp", 0),

    level: Storage.get("level", 1),

    streak: Storage.get("streak", 0),

    decorations: Storage.get("decorations", []),

    lastVisit: Storage.get("lastVisit", "")

};

function saveUser() {

    Storage.set("interests", user.interests);

    Storage.set("completed", user.completed);

    Storage.set("coins", user.coins);

    Storage.set("xp", user.xp);

    Storage.set("level", user.level);

    Storage.set("streak", user.streak);

    Storage.set("decorations", user.decorations);

    Storage.set("lastVisit", user.lastVisit);

}


/* ===========================
   NAVIGATION
=========================== */

const screens =
document.querySelectorAll(".screen");

function openScreen(id){

screens.forEach(screen=>{

screen.classList.remove("active");

});

document
.getElementById(id)
.classList.add("active");

}

/* ---------- Bottom Navigation ---------- */

document
.getElementById("homeNav")
.onclick = () => openScreen("home");

document
.getElementById("gardenNav")
.onclick = () => openScreen("garden");

document
.getElementById("progressNav")
.onclick = () => openScreen("progress");

document
.getElementById("profileNav")
.onclick = () => openScreen("profile");

/* ---------- Shop ---------- */

const shopBtn =
document.getElementById("openShopBtn");

if(shopBtn){

shopBtn.onclick = ()=>{

openScreen("shop");

};

}

const backBtn =
document.getElementById("backGarden");

if(backBtn){

backBtn.onclick = ()=>{

openScreen("garden");

};

}
/* ===========================
   APP START
=========================== */

window.onload = () => {

    openScreen("welcome");

};
