console.log("Evergreen");

const screens=document.querySelectorAll(".screen");

const welcome=document.getElementById("welcome");
const interestsPage=document.getElementById("interests");
const home=document.getElementById("home");
const garden=document.getElementById("garden");
const progress=document.getElementById("progress");
const profile=document.getElementById("profile");

const nextBtn=document.getElementById("nextBtn");
const continueBtn=document.getElementById("continueBtn");

const homeNav=document.getElementById("homeNav");
const gardenNav=document.getElementById("gardenNav");
const progressNav=document.getElementById("progressNav");
const profileNav=document.getElementById("profileNav");

const interestContainer=document.getElementById("interestContainer");
const selectedCount=document.getElementById("selectedCount");
const habitContainer=document.getElementById("habitContainer");

let selectedInterests=
JSON.parse(localStorage.getItem("selectedInterests"))||[];

let doneHabits=
JSON.parse(localStorage.getItem("doneHabits"))||[];

function openScreen(screen){

screens.forEach(s=>s.classList.remove("active"));

screen.classList.add("active");

}

nextBtn.onclick=()=>{

if(selectedInterests.length>=5){

createHabits();

openScreen(home);

}else{

openScreen(interestsPage);

}

};

homeNav.onclick=()=>openScreen(home);
gardenNav.onclick=()=>openScreen(garden);
progressNav.onclick=()=>openScreen(progress);
profileNav.onclick=()=>openScreen(profile);

function showInterests(){

interestContainer.innerHTML="";

for(const category in interests){

const title=document.createElement("h3");
title.textContent=category;

interestContainer.appendChild(title);

const box=document.createElement("div");
box.className="cards";

interests[category].forEach(item=>{

const card=document.createElement("div");

card.className="card";

card.textContent=item;

if(selectedInterests.includes(item))
card.classList.add("selected");

card.onclick=()=>{

if(selectedInterests.includes(item)){

selectedInterests=
selectedInterests.filter(i=>i!==item);

card.classList.remove("selected");

}else{

selectedInterests.push(item);

card.classList.add("selected");

}

selectedCount.textContent=
`Selected: ${selectedInterests.length}`;

};

box.appendChild(card);

});

interestContainer.appendChild(box);

}

selectedCount.textContent=
`Selected: ${selectedInterests.length}`;

}

continueBtn.onclick=()=>{

if(selectedInterests.length<5){

alert("Choose at least 5 interests.");

return;

}

localStorage.setItem(
"selectedInterests",
JSON.stringify(selectedInterests)
);

doneHabits=[];

localStorage.setItem(
"doneHabits",
JSON.stringify(doneHabits)
);

createHabits();

openScreen(home);

};

showInterests();

function createHabits(){

habitContainer.innerHTML="";

selectedInterests.forEach(item=>{

const habit=document.createElement("div");

habit.className="habit";

habit.innerHTML=`
<span>${item}</span>
<button class="done-btn">
${doneHabits.includes(item)
?"Completed ✓"
:"Done"}
</button>
`;

const btn=habit.querySelector(".done-btn");

if(doneHabits.includes(item))
btn.classList.add("finished");

btn.onclick=()=>{

if(doneHabits.includes(item)) return;

doneHabits.push(item);

localStorage.setItem(
"doneHabits",
JSON.stringify(doneHabits)
);

btn.textContent="Completed ✓";
btn.classList.add("finished");

updateProgress();

};

habitContainer.appendChild(habit);

});

updateProgress();

}

function updateProgress(){

const total=selectedInterests.length;

const completed=doneHabits.length;

const percent=
total===0
?0
:completed/total*100;

document.querySelector(".progress-fill").style.width=
percent+"%";

document.getElementById("progressText").textContent=
`${completed} / ${total} completed`;

const statCompleted=document.getElementById("statCompleted");
const statTotal=document.getElementById("statTotal");
const statPercent=document.getElementById("statPercent");

if(statCompleted) statCompleted.textContent=completed;
if(statTotal) statTotal.textContent=total;
if(statPercent) statPercent.textContent=Math.round(percent)+"%";

const tree=document.getElementById("treeEmoji");

if(tree){

if(percent===0)
tree.textContent="🌱";

else if(percent<30)
tree.textContent="🌿";

else if(percent<60)
tree.textContent="🌳";

else if(percent<100)
tree.textContent="🌲";

else
tree.textContent="🌸";

}

}

window.onload=()=>{

const today=new Date().toDateString();

if(localStorage.getItem("today")!==today){

localStorage.setItem("today",today);

doneHabits=[];

localStorage.setItem(
"doneHabits",
JSON.stringify(doneHabits)
);

}

showInterests();

if(selectedInterests.length>=5){

createHabits();

openScreen(home);

}else{

openScreen(welcome);

}

};
