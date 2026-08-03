console.log("Evergreen");

/* =========================
   Screens
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
   Buttons
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
   Elements
========================= */

const interestContainer = document.getElementById("interestContainer");
const selectedCount = document.getElementById("selectedCount");
const habitContainer = document.getElementById("habitContainer");

/* =========================
   Saved Data
========================= */

let selectedInterests =
JSON.parse(localStorage.getItem("selectedInterests")) || [];

selectedInterests = [...new Set(selectedInterests)];

let doneHabits =
JSON.parse(localStorage.getItem("doneHabits")) || [];

let xp =
Number(localStorage.getItem("xp")) || 0;

let coins =
Number(localStorage.getItem("coins")) || 0;

let streak =
Number(localStorage.getItem("streak")) || 0;

/* =========================
   Screen Functions
========================= */

function openScreen(screen){

screens.forEach(s=>{

s.classList.remove("active");

});

screen.classList.add("active");

}

/* =========================
   Navigation
========================= */

function setActiveNav(button){

document.querySelectorAll(".nav-btn").forEach(btn=>{

btn.classList.remove("active");

});

button.classList.add("active");

}

/* =========================
   Welcome
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
   Bottom Navigation
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
   Interests
========================= */

function updateSelectedCount(){

selectedCount.textContent =
`Selected: ${selectedInterests.length}`;

}

function saveInterests(){

selectedInterests = [...new Set(selectedInterests)];

localStorage.setItem(

"selectedInterests",

JSON.stringify(selectedInterests)

);

}

/* =========================
   Interest Selection
========================= */

const interestCards = document.querySelectorAll(".interest-card");


interestCards.forEach(card => {


card.onclick = () => {


const interest = card.dataset.interest;


if(selectedInterests.includes(interest)){


selectedInterests =
selectedInterests.filter(i => i !== interest);


card.classList.remove("selected");


}else{


selectedInterests.push(interest);


card.classList.add("selected");


}


updateSelectedCount();

saveInterests();


};


});


/* =========================
   Continue Interests
========================= */

continueBtn.onclick = () => {


if(selectedInterests.length >= 5){


createHabits();


openScreen(home);

setActiveNav(homeNav);


}else{


alert("Choose at least 5 interests 🌱");


}


};


updateSelectedCount();

/* =========================
   Habits
========================= */

const habitIdeas = {

Learning:[
"Read 10 pages 📖",
"Learn 5 new words ✨",
"Study for 20 minutes"
],

Science:[
"Watch a science video 🔬",
"Learn one new fact 🌎",
"Read about nature"
],

Technology:[
"Practice coding 💻",
"Learn a new tech skill",
"Build something"
],

Creativity:[
"Draw something 🎨",
"Write a short idea",
"Create something new"
],

Health:[
"Drink enough water 💧",
"Stretch for 10 minutes",
"Go for a walk 🚶"
],

Growth:[
"Write a journal entry ✍️",
"Plan tomorrow",
"Reflect on your day"
]

};



function createHabits(){


habitContainer.innerHTML = "";

if(doneHabits.includes(habit)){

button.classList.add("completed");

}
let habits = [];


selectedInterests.forEach(interest=>{


if(habitIdeas[interest]){


habits.push(
...habitIdeas[interest]
.slice(0,3)
);


}


});



habits.forEach(habit=>{


const div = document.createElement("div");


div.className = "habit";


div.innerHTML = `

<span>${habit}</span>

<button class="doneBtn">
✓
</button>

`;



const button = div.querySelector(".doneBtn");


button.onclick = ()=>{


if(!doneHabits.includes(habit)){


doneHabits.push(habit);

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


button.classList.add("completed");


}else{


doneHabits =
doneHabits.filter(h => h !== habit);


xp -= 10;

coins -= 5;


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


button.classList.remove("completed");


}


};

if(!doneHabits.includes(habit)){


doneHabits.push(habit);

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


button.classList.add("completed");


}


};



habitContainer.appendChild(div);


});


}
}
