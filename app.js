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

continueBtn.addEventListener("click", () => {

    interestsScreen.classList.remove("active");
    homeScreen.classList.add("active");

});


const interestContainer = document.getElementById("interestContainer");

function showInterests(){

    interestContainer.innerHTML="";


    for(let category in interests){

        const section=document.createElement("div");

        section.className="category";


        section.innerHTML=`

        <h3>${category}</h3>

        <div class="cards">

        ${interests[category].map(item=>`

            <div class="card">
                ${item}
            </div>

        `).join("")}

        </div>

        `;


        interestContainer.appendChild(section);

    }

}


showInterests();
