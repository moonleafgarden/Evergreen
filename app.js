console.log("Evergreen");

/* =========================
   SCREENS
========================= */

const screens = document.querySelectorAll(".screen");

const welcome = document.getElementById("welcome");
const interestsPage = document.getElementById("interests");
const home = document.getElementById("home");
const garden = document.getElementById("garden");
const progress = document.getElementById("progress");
const profile = document.getElementById("profile");
const shop = document.getElementById("shop");

/* =========================
   BUTTONS
========================= */

const nextBtn = document.getElementById("nextBtn");
const continueBtn = document.getElementById("continueBtn");

const homeNav = document.getElementById("homeNav");
const gardenNav = document.getElementById("gardenNav");
const progressNav = document.getElementById("progressNav");
const profileNav = document.getElementById("profileNav");

const openShopBtn = document.getElementById("openShopBtn");
const backGarden = document.getElementById("backGarden");

/* =========================
   ELEMENTS
========================= */

const interestContainer =
document.getElementById("interestContainer");

const selectedCount =
document.getElementById("selectedCount");

const habitContainer =
document.getElementById("habitContainer");

/* =========================
   SAVE DATA
========================= */

let selectedInterests =
JSON.parse(localStorage.getItem("selectedInterests")) || [];

selectedInterests =
[...new Set(selectedInterests)];

let doneHabits =
JSON.parse(localStorage.getItem("doneHabits")) || [];

let xp =
Number(localStorage.getItem("xp")) || 0;

let coins =
Number(localStorage.getItem("coins")) || 0;

let streak =
Number(localStorage.getItem("streak")) || 0;

/* =========================
   SCREEN FUNCTIONS
========================= */

function openScreen(screen){

screens.forEach(s=>{

s.classList.remove("active");

});

screen.classList.add("active");

}

/* =========================
   NAVIGATION
========================= */

function setActiveNav(button){

document.querySelectorAll(".nav-btn")
.forEach(btn=>{

btn.classList.remove("active");

});

button.classList.add("active");

}

/* =========================
   WELCOME
========================= */

nextBtn.onclick = () => {

if(selectedInterests.length >= 5){

createHabits();

openScreen(home);

setActiveNav(homeNav);

}else{

openScreen(interestsPage);

}

};

/* =========================
   BOTTOM NAVIGATION
========================= */

homeNav.onclick = () => {

openScreen(home);
setActiveNav(homeNav);

};

gardenNav.onclick = () => {

openScreen(garden);
setActiveNav(gardenNav);

};

progressNav.onclick = () => {

openScreen(progress);
setActiveNav(progressNav);

};

profileNav.onclick = () => {

openScreen(profile);
setActiveNav(profileNav);

};

if(openShopBtn){

openShopBtn.onclick = () => {

openScreen(shop);

};

}

if(backGarden){

backGarden.onclick = () => {

openScreen(garden);

};

}

/* =========================
   INTERESTS
========================= */

function updateSelectedCount(){

selectedCount.textContent =
`Selected: ${selectedInterests.length}`;

}

function saveInterests(){

selectedInterests =
[...new Set(selectedInterests)];

localStorage.setItem(

"selectedInterests",

JSON.stringify(selectedInterests)

);

}

function showInterests(){

interestContainer.innerHTML = "";

for(const category in interests){

const title =
document.createElement("h3");

title.textContent = category;

interestContainer.appendChild(title);

const box =
document.createElement("div");

box.className = "cards";

   interests[category].forEach(item=>{

const card =
document.createElement("div");

card.className = "card";

card.textContent = item;

if(selectedInterests.includes(item)){

card.classList.add("selected");

}

card.onclick = ()=>{

if(selectedInterests.includes(item)){

selectedInterests =
selectedInterests.filter(i=>i!==item);

card.classList.remove("selected");

}else{

selectedInterests.push(item);

selectedInterests =
[...new Set(selectedInterests)];

card.classList.add("selected");

}

updateSelectedCount();

saveInterests();

};

box.appendChild(card);

});

interestContainer.appendChild(box);

}

updateSelectedCount();

}

/* =========================
   CONTINUE
========================= */

continueBtn.onclick = ()=>{

if(selectedInterests.length < 5){

alert("Choose at least 5 interests 🌱");

return;

}

doneHabits = [];

localStorage.setItem(

"doneHabits",

JSON.stringify(doneHabits)

);

createHabits();

openScreen(home);

setActiveNav(homeNav);

};

showInterests();

/* =========================
   HABITS
========================= */

function createHabits(){

habitContainer.innerHTML = "";

selectedInterests.forEach(item=>{

const habit = document.createElement("div");

habit.className = "habit";

habit.innerHTML = `
<span>${item}</span>
<button class="done-btn">
${doneHabits.includes(item) ? "Completed ✓" : "Done"}
</button>
`;

const btn = habit.querySelector(".done-btn");

if(doneHabits.includes(item)){
btn.classList.add("finished");
}

btn.onclick = ()=>{

if(doneHabits.includes(item)) return;

doneHabits.push(item);

xp += 10;
coins += 5;

localStorage.setItem(
"doneHabits",
JSON.stringify(doneHabits)
);

localStorage.setItem(
"xp",
xp
);

localStorage.setItem(
"coins",
coins
);

btn.textContent = "Completed ✓";
btn.classList.add("finished");

updateProgress();

updateProfile();

};

habitContainer.appendChild(habit);

});

updateProgress();

}

/* =========================
   PROGRESS
========================= */

function updateProgress(){

const total = selectedInterests.length;
const completed = doneHabits.length;

const percent =
total === 0 ? 0 :
(completed / total) * 100;

const bar =
document.querySelector(".progress-fill");

if(bar){
bar.style.width = percent + "%";
}

const text =
document.getElementById("progressText");

if(text){
text.textContent =
`${completed} / ${total} completed`;
}

const tree =
document.getElementById("treeEmoji");

if(tree){

if(percent === 0){
tree.textContent = "🌱";
}
else if(percent < 30){
tree.textContent = "🌿";
}
else if(percent < 60){
tree.textContent = "🌳";
}
else if(percent < 100){
tree.textContent = "🌲";
}
else{
tree.textContent = "🌸";
}

}

}

/* =========================
   PROFILE
========================= */

function updateProfile(){

const coin =
document.getElementById("coinCount");

if(coin){
coin.textContent = coins;
}

}

/* =========================
   START
========================= */

window.onload = ()=>{

showInterests();

updateProfile();

updateProgress();

openScreen(welcome);

};
