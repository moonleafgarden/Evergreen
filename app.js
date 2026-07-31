console.log("Evergreen 🌲");

// ======================
// SCREENS
// ======================

const welcomeScreen = document.getElementById("welcome");
const interestsScreen = document.getElementById("interests");
const homeScreen = document.getElementById("home");
const gardenScreen = document.getElementById("garden");
const progressScreen = document.getElementById("progress");
const profileScreen = document.getElementById("profile");

// ======================
// NAVIGATION
// ======================

const homeNav = document.getElementById("homeNav");
const gardenNav = document.getElementById("gardenNav");
const progressNav = document.getElementById("progressNav");
const profileNav = document.getElementById("profileNav");

// ======================
// BUTTONS
// ======================

const nextBtn = document.getElementById("nextBtn");
const continueBtn = document.getElementById("continueBtn");
const changeInterestsBtn =
document.getElementById("changeInterestsBtn");

// ======================
// CONTAINERS
// ======================

const interestContainer =
document.getElementById("interestContainer");

const selectedCount =
document.getElementById("selectedCount");

const habitContainer =
document.getElementById("habitContainer");

// ======================
// LOCAL STORAGE
// ======================

let selectedInterests =
JSON.parse(localStorage.getItem("selectedInterests")) || [];

let doneHabits =
JSON.parse(localStorage.getItem("doneHabits")) || [];

let completedHabits = doneHabits.length;

// ======================
// DAILY RESET
// ======================

const today = new Date().toDateString();

const savedDate =
localStorage.getItem("today");

if(savedDate !== today){

    doneHabits = [];
    completedHabits = 0;

    localStorage.setItem(
        "doneHabits",
        JSON.stringify(doneHabits)
    );

    localStorage.setItem(
        "today",
        today
    );

}

// ======================
// OPEN SCREEN
// ======================

function openScreen(screen){

    const screens = [
        welcomeScreen,
        interestsScreen,
        homeScreen,
        gardenScreen,
        progressScreen,
        profileScreen
    ];

    screens.forEach(s=>{
        if(s) s.classList.remove("active");
    });

    screen.classList.add("active");

    homeNav.classList.remove("active");
    gardenNav.classList.remove("active");
    progressNav.classList.remove("active");
    profileNav.classList.remove("active");

    if(screen===homeScreen)
        homeNav.classList.add("active");

    if(screen===gardenScreen)
        gardenNav.classList.add("active");

    if(screen===progressScreen)
        progressNav.classList.add("active");

    if(screen===profileScreen)
        profileNav.classList.add("active");

}

// ======================
// NAVIGATION
// ======================

homeNav.onclick=()=>openScreen(homeScreen);

gardenNav.onclick=()=>openScreen(gardenScreen);

progressNav.onclick=()=>openScreen(progressScreen);

profileNav.onclick=()=>openScreen(profileScreen);

// ======================
// START BUTTON
// ======================

nextBtn.onclick=()=>{

    if(selectedInterests.length>=5){

        createHabits();

        openScreen(homeScreen);

    }else{

        openScreen(interestsScreen);

    }

};

// ======================
// CHANGE INTERESTS
// ======================

if(changeInterestsBtn){

changeInterestsBtn.onclick=()=>{

    showInterests();

    openScreen(interestsScreen);

};

}

// ======================
// SHOW INTERESTS
// ======================

function showInterests(){

    interestContainer.innerHTML="";

    for(const category in interests){

        const section=document.createElement("div");
        section.className="category";

        const title=document.createElement("h3");
        title.textContent=category;

        const cards=document.createElement("div");
        cards.className="cards";

        interests[category].forEach(item=>{

            const card=document.createElement("div");

            card.className="card";
            card.textContent=item;

            if(selectedInterests.includes(item)){
                card.classList.add("selected");
            }

            card.onclick=()=>{

                if(selectedInterests.includes(item)){

                    selectedInterests=
                    selectedInterests.filter(i=>i!==item);

                    card.classList.remove("selected");

                }else{

                    selectedInterests.push(item);

                    card.classList.add("selected");

                }

                localStorage.setItem(
                    "selectedInterests",
                    JSON.stringify(selectedInterests)
                );

                selectedCount.textContent=
                `Selected: ${selectedInterests.length}`;

            };

            cards.appendChild(card);

        });

        section.appendChild(title);
        section.appendChild(cards);

        interestContainer.appendChild(section);

    }

    selectedCount.textContent=
    `Selected: ${selectedInterests.length}`;

}

// ======================
// CONTINUE
// ======================

continueBtn.onclick=()=>{

    if(selectedInterests.length<5){

        alert("Choose at least 5 interests 🌱");

        return;

    }

    localStorage.setItem(
        "selectedInterests",
        JSON.stringify(selectedInterests)
    );

    doneHabits=[];

    completedHabits=0;

    localStorage.setItem(
        "doneHabits",
        JSON.stringify(doneHabits)
    );

    createHabits();

    openScreen(homeScreen);

};

showInterests();

// ======================
// CREATE HABITS
// ======================

function createHabits(){

    habitContainer.innerHTML="";

    completedHabits=doneHabits.length;

    selectedInterests.forEach(item=>{

        const habit=document.createElement("div");

        habit.className="habit";

        const description=
        habitIdeas[item] || "Complete this activity";

        habit.innerHTML=`
            <span>
                ${item}
                <br>
                <small>${description}</small>
            </span>

            <button class="done-btn">
                ${doneHabits.includes(item)
                    ? "Completed ✓"
                    : "Done"}
            </button>
        `;

        const btn=
        habit.querySelector(".done-btn");

        if(doneHabits.includes(item)){

            btn.classList.add("finished");

        }

        btn.onclick=()=>{

            if(btn.classList.contains("finished"))
                return;

            btn.classList.add("finished");

            btn.textContent="Completed ✓";

            doneHabits.push(item);

            completedHabits++;

            localStorage.setItem(
                "doneHabits",
                JSON.stringify(doneHabits)
            );

            updateProgress();

        };

        habitContainer.appendChild(habit);

    });

    updateProgress();

}

// ======================
// UPDATE PROGRESS
// ======================

function updateProgress(){

    const total=selectedInterests.length;

    const percent=
    total===0
    ?0
    :(completedHabits/total)*100;

    document.querySelector(".progress-fill").style.width=
    percent+"%";

    document.getElementById("progressText").textContent=
    `${completedHabits} / ${total} completed`;

}

// ======================
// AUTO LOAD
// ======================

window.onload=()=>{

    showInterests();

    if(selectedInterests.length>=5){

        createHabits();

        openScreen(homeScreen);

    }else{

        openScreen(welcomeScreen);

    }

};
