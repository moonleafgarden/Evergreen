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
const interests = {

    "📚 Learning":[
        "📖 Reading",
        "📚 Books",
        "✍️ Writing",
        "📝 Journaling",
        "🎓 School",
        "🎯 SAT",
        "📝 IELTS",
        "🇬🇧 English",
        "🇺🇸 American English",
        "🇬🇧 British English",
        "🇦🇺 Australian English",
        "🇪🇸 Spanish",
        "🇫🇷 French",
        "🇯🇵 Japanese",
        "📖 Vocabulary",
        "🎧 Listening",
        "🗣 Speaking",
        "✏️ Grammar"
    ],

    "🔬 Science":[
        "🚀 Space",
        "🌌 Astronomy",
        "☀️ Sun",
        "🌙 Moon",
        "🪐 Planets",
        "🌠 Stars",
        "🌍 Earth",
        "🌊 Ocean",
        "🌿 Nature",
        "🌳 Forest",
        "🌺 Plants",
        "🐶 Animals",
        "🦋 Insects",
        "🧬 Biology",
        "⚛ Physics",
        "⚗ Chemistry",
        "🪨 Geology",
        "🌦 Weather"
    ],

    "💻 Technology":[
        "💻 Programming",
        "🌐 Web Development",
        "📱 App Development",
        "🤖 AI",
        "🧠 Machine Learning",
        "⌨️ HTML",
        "🎨 CSS",
        "⚡ JavaScript",
        "🐍 Python",
        "☕ Java",
        "⚙️ C++",
        "🎮 Game Development",
        "🔒 Cybersecurity"
    ],

    "🎨 Creativity":[
        "🎨 Drawing",
        "🖌 Painting",
        "📷 Photography",
        "🎥 Filmmaking",
        "🎬 Video Editing",
        "🎵 Music",
        "🎹 Piano",
        "🎤 Singing",
        "💃 Dancing",
        "🎭 Acting",
        "🍳 Cooking",
        "🧁 Baking"
    ],

    "🏃 Health":[
        "🏃 Running",
        "🚴 Cycling",
        "🏋 Gym",
        "🧘 Yoga",
        "🚶 Walking",
        "💧 Drink Water",
        "🥗 Healthy Eating",
        "😴 Better Sleep",
        "🧘 Meditation"
    ],

    "⚽ Sports":[
        "⚽ Football",
        "🏀 Basketball",
        "🏐 Volleyball",
        "🎾 Tennis",
        "🏸 Badminton",
        "🏓 Table Tennis",
        "🥊 Boxing",
        "🏎 Formula 1",
        "🏍 MotoGP"
    ],

    "🌱 Personal Growth":[
        "📅 Discipline",
        "🎯 Goals",
        "📈 Self Improvement",
        "💪 Confidence",
        "🧠 Memory",
        "❤️ Gratitude",
        "⏰ Time Management",
        "🌿 Healthy Habits"
    ]
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
function renderCards(data){

    container.innerHTML = "";

    for(const category in data){

        // Category title
        const title = document.createElement("h3");
        title.className = "category-title";
        title.textContent = category;

        container.appendChild(title);

        // Cards wrapper
        const wrapper = document.createElement("div");
        wrapper.className = "cards";

        data[category].forEach(item=>{

            const card = document.createElement("div");

            card.className = "card";

            card.textContent = item;

            if(selected.includes(item)){
                card.classList.add("selected");
            }

            card.onclick = ()=>{

                if(selected.includes(item)){

                    selected = selected.filter(i=>i!==item);

                    card.classList.remove("selected");

                }else{

                    selected.push(item);

                    card.classList.add("selected");

                }

                selectedCount.textContent =
                `Selected: ${selected.length}`;

            };

            wrapper.appendChild(card);

        });

        container.appendChild(wrapper);

    }

}
// ---------- Search ----------
// ---------- Search ----------
search.addEventListener("input", () => {

    const value = search.value.toLowerCase();

    const filtered = {};

    for (const category in interests) {

        const result = interests[category].filter(item =>
            item.toLowerCase().includes(value)
        );

        if (result.length > 0) {
            filtered[category] = result;
        }

    }

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
