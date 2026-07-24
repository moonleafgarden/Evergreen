console.log("Evergreen started 🌲");


// ===========================
// Evergreen App
// ===========================

// Screens
const welcomeScreen = document.getElementById("welcome");
const interestsScreen = document.getElementById("interests");
const homeScreen = document.getElementById("home");

// Buttons
const nextBtn = document.getElementById("nextBtn");
const continueBtn = document.getElementById("continueBtn");

// ===========================
// Open Interests
// ===========================

nextBtn.addEventListener("click", () => {

    welcomeScreen.classList.remove("active");
    interestsScreen.classList.add("active");

});

// ===========================
// Open Home
// ===========================

continueBtn.addEventListener("click",()=>{


    if(selectedInterests.length < 5){

        alert("Choose at least 5 interests 🌱");

        return;

    }


    createHabits();


    interestsScreen.classList.remove("active");

    homeScreen.classList.add("active");


});

const interestContainer = document.getElementById("interestContainer");

let selectedInterests = [];


function showInterests(){

    interestContainer.innerHTML="";


    for(let category in interests){

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


            card.addEventListener("click",()=>{


                if(selectedInterests.includes(item)){


                    selectedInterests =
                    selectedInterests.filter(
                        i=>i!==item
                    );


                    card.classList.remove("selected");


                }else{


                    selectedInterests.push(item);

                    card.classList.add("selected");


                }


                document.getElementById("selectedCount")
                .textContent =
                `Selected: ${selectedInterests.length}`;


            });


            cards.appendChild(card);


        });


        section.appendChild(title);

        section.appendChild(cards);

        interestContainer.appendChild(section);

    }

}


showInterests();


const habitContainer = document.getElementById("habitContainer");


function createHabits(){

    habitContainer.innerHTML = "";


    selectedInterests.forEach(item=>{


        const habit = document.createElement("div");

        habit.className = "habit";


        const text = habitIdeas[item] || item;


        habit.innerHTML = `

            <span>
                ${item}
                <br>
                <small>${text}</small>
            </span>


            <button class="done-btn">
                Done
            </button>

        `;


        habitContainer.appendChild(habit);


const doneBtn = habit.querySelector(".done-btn");


doneBtn.addEventListener("click",()=>{


    if(doneBtn.classList.contains("finished")){
        return;
    }


    doneBtn.classList.add("finished");

doneBtn.textContent = "Completed ✓";

completedHabits++;

updateProgress();
    

});

}


let completedHabits = 0;

     function updateProgress(){

    const total = selectedInterests.length;


    const percent =
    (completedHabits / total) * 100;


    document.querySelector(".progress-fill")
    .style.width = percent + "%";


    document.getElementById("progressText")
    .textContent =
    `${completedHabits} / ${total} completed`;

                }doneBtn.textContent = "Completed ✓";

completedHabits++;

updateProgress();
