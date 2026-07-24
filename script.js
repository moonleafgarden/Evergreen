// ==========================
// Evergreen Script
// ==========================

// Screens
const welcome = document.querySelector(".welcome-screen");
const choose = document.querySelector(".choose-screen");
const home = document.querySelector(".home-screen");

// Buttons
const nextBtn = document.getElementById("nextBtn");
const continueBtn = document.getElementById("continueBtn");

// Interests
const interests = [
    "📖 Reading","🇬🇧 English","🇪🇸 Spanish","➗ Math","🧪 Science",
    "💻 Programming","🎯 SAT","📝 IELTS","✍️ Writing","🎓 School",
    "🚀 Space","🌿 Nature","🏛 History","🗺 Geography","🧠 Psychology",
    "💰 Finance","🧬 Biology","🌋 Geology","🏃 Sport","🚴 Cycling",
    "🏋 Gym","🧘 Yoga","🚶 Walking","💧 Drink Water","🥗 Healthy Eating",
    "😴 Sleep","🎨 Drawing","📷 Photography","🎵 Music","🎹 Piano",
    "🎤 Singing","🍳 Cooking","🧁 Baking","🤖 AI","🌐 Web Development",
    "📱 App Development","🎮 Game Development","🧹 Cleaning","🪴 Gardening",
    "✈ Travel","👨‍👩‍👧 Family","🏎 Formula 1","⚽ Football",
    "🏀 Basketball","🎾 Tennis","♟ Chess","🎬 Movies",
    "📺 TV Shows","🎭 Anime","🎮 Gaming"
];

const container = document.getElementById("interestContainer");
const search = document.getElementById("search");
const selectedCount = document.getElementById("selectedCount");

let selected = [];

// ---------- Welcome ----------
nextBtn.addEventListener("click", () => {

    welcome.style.display = "none";
    choose.style.display = "block";

});

// ---------- Cards ----------
function renderCards(list){

    container.innerHTML = "";

    list.forEach(item => {

        const card = document.createElement("div");

        card.className = "card";
        card.textContent = item;

        if(selected.includes(item)){
            card.classList.add("selected");
        }

        card.addEventListener("click", () => {

            if(selected.includes(item)){

                selected = selected.filter(i => i !== item);

                card.classList.remove("selected");

            }else{

                selected.push(item);

                card.classList.add("selected");

            }

            selectedCount.textContent = `Selected: ${selected.length}`;

        });

        container.appendChild(card);

    });

}

renderCards(interests);

// ---------- Search ----------
search.addEventListener("input", () => {

    const value = search.value.toLowerCase();

    const filtered = interests.filter(item =>
        item.toLowerCase().includes(value)
    );

    renderCards(filtered);

});

// ---------- Continue ----------
continueBtn.addEventListener("click", () => {

    if(selected.length < 5){

        alert("Please select at least 5 interests.");
        return;

    }

    choose.style.display = "none";
    home.style.display = "block";

});

// ---------- Habit Buttons ----------
const doneButtons = document.querySelectorAll(".done-btn");
const progressFill = document.querySelector(".progress-fill");
const progressText = document.querySelector(".progress p");

let completed = 0;
const total = doneButtons.length;

function updateProgress(){

    progressText.textContent = `${completed} / ${total} completed`;
    progressFill.style.width = `${completed / total * 100}%`;

}

doneButtons.forEach(button => {

    button.addEventListener("click", () => {

        if(button.classList.contains("finished")) return;

        button.classList.add("finished");
        button.textContent = "Completed";

        completed++;

        updateProgress();

    });

});

updateProgress();
