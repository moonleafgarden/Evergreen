const interests = {

Learning: [
"English",
"Math",
"SAT",
"IELTS",
"Reading",
"Coding"
],

Science: [
"Biology",
"Chemistry",
"Physics",
"Astronomy",
"Nature"
],

Technology: [
"Programming",
"AI",
"Robotics",
"Web Design",
"Game Development"
],

Creativity: [
"Drawing",
"Writing",
"Music",
"Dancing",
"Photography"
],

Health: [
"Workout",
"Cycling",
"Healthy Food",
"Sleep",
"Meditation"
],

Growth: [
"Discipline",
"Productivity",
"Confidence",
"Habits",
"Self Improvement"
]

};

const interestContainer =
document.getElementById("interestContainer");

const selectedCount =
document.getElementById("selectedCount");

let selectedInterests =
JSON.parse(localStorage.getItem("selectedInterests")) || [];

selectedInterests =
[...new Set(selectedInterests)];

function saveInterests(){

localStorage.setItem(
"selectedInterests",
JSON.stringify(selectedInterests)
);

}
function showInterests(){

interestContainer.innerHTML = "";

for(const category in interests){

const title = document.createElement("h3");
title.textContent = category;

interestContainer.appendChild(title);

const cards = document.createElement("div");
cards.className = "cards";

interests[category].forEach(item=>{

const card = document.createElement("div");

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

selectedCount.textContent =
`Selected: ${selectedInterests.length}`;

saveInterests();

};

cards.appendChild(card);

});

interestContainer.appendChild(cards);

}

selectedCount.textContent =
`Selected: ${selectedInterests.length}`;

}

showInterests();
