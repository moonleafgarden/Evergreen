console.log("Evergreen");

/* ===========================
SCREENS
=========================== */

const screens = document.querySelectorAll(".screen");

const welcome = document.getElementById("welcome");
const interests = document.getElementById("interests");
const home = document.getElementById("home");
const garden = document.getElementById("garden");
const shop = document.getElementById("shop");
const progress = document.getElementById("progress");
const profile = document.getElementById("profile");

/* ===========================
BUTTONS
=========================== */

const nextBtn = document.getElementById("nextBtn");
const continueBtn = document.getElementById("continueBtn");

const homeNav = document.getElementById("homeNav");
const gardenNav = document.getElementById("gardenNav");
const progressNav = document.getElementById("progressNav");
const profileNav = document.getElementById("profileNav");

const openShopBtn = document.getElementById("openShopBtn");
const backGarden = document.getElementById("backGarden");

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
BOTTOM NAVIGATION
=========================== */

function setActive(button){

document.querySelectorAll(".nav-btn").forEach(btn=>{

btn.classList.remove("active");

});

button.classList.add("active");

}
/* ===========================
WELCOME
=========================== */

nextBtn.onclick = () => {

openScreen(interests);

};

/* ===========================
CONTINUE
=========================== */

continueBtn.onclick = () => {

openScreen(home);

setActive(homeNav);

};

/* ===========================
BOTTOM NAVIGATION
=========================== */

homeNav.onclick = () => {

openScreen(home);

setActive(homeNav);

};

gardenNav.onclick = () => {

openScreen(garden);

setActive(gardenNav);

};

progressNav.onclick = () => {

openScreen(progress);

setActive(progressNav);

};

profileNav.onclick = () => {

openScreen(profile);

setActive(profileNav);

};

/* ===========================
SHOP
=========================== */

openShopBtn.onclick = () => {

openScreen(shop);

};

backGarden.onclick = () => {

openScreen(garden);

setActive(gardenNav);

};

/* ===========================
START
=========================== */

window.onload = () => {

openScreen(welcome);

};
