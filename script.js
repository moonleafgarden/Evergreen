// ==========================
// Screens
// ==========================

const welcome = document.querySelector(".welcome-screen");
const choose = document.querySelector(".choose-screen");
const home = document.querySelector(".home-screen");

document.getElementById("nextBtn").onclick = () => {

    welcome.style.display = "none";
    choose.style.display = "block";

};

// ==========================
// Interests
// ==========================

const interests = [

"📖 Reading",
"🇬🇧 English",
"🇪🇸 Spanish",
"➗ Math",
"🧪 Science",
"💻 Programming",
"🎯 SAT",
"📝 IELTS",
"✍️ Writing",
"🎓 School",

"🚀 Space",
"🌿 Nature",
"🏛 History",
"🗺 Geography",
"🧠 Psychology",
"💰 Finance",
"🧬 Biology",
"🌋 Geology",

"🏃 Sport",
"🚴 Cycling",
"🏋 Gym",
"🧘 Yoga",
"🚶 Walking",
"💧 Drink Water",
"🥗 Healthy Eating",
"😴 Sleep",

"🎨 Drawing",
"📷 Photography",
"🎵 Music",
"🎹 Piano",
"🎤 Singing",
"🍳 Cooking",
"🧁 Baking",

"🤖 AI",
"🌐 Web Development",
"📱 App Development",
"🎮 Game Development",

"🧹 Cleaning",
"🪴 Gardening",
"✈ Travel",
"👨‍👩‍👧 Family",

"🏎 Formula 1",
"⚽ Football",
"🏀 Basketball",
"🎾 Tennis",
"♟ Chess",
"🎬 Movies",
"📺 TV Shows",
"🎭 Anime",
"🎮 Gaming"

];

const container = document.getElementById("interestContainer");
const selectedCount = document.getElementById("selectedCount");

let selected = [];

function displayCards(list){

    container.innerHTML = "";

    list.forEach(item=>{

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

        container.appendChild(card);

    });

}

displayCards(interests);

// ==========================
// Search
// ==========================

const
