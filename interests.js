/* ===========================
   INTERESTS
=========================== */

const interestContainer =
    document.getElementById("interestContainer");

const selectedCount =
    document.getElementById("selectedCount");

const searchInput =
    document.getElementById("search");

const continueBtn =
    document.getElementById("continueBtn");


/* ---------- INTEREST DATA ---------- */

const interestsData = {

    Learning: [
        "Reading",
        "English",
        "Spanish",
        "French",
        "Japanese",
        "Math",
        "SAT",
        "IELTS"
    ],

    Science: [
        "Space",
        "Nature",
        "Biology",
        "Physics",
        "Astronomy"
    ],

    Technology: [
        "Programming",
        "Web Development",
        "AI",
        "App Development",
        "UI Design"
    ],

    Creativity: [
        "Drawing",
        "Photography",
        "Music",
        "Dancing",
        "Cooking",
        "Baking"
    ],

    Health: [
        "Cycling",
        "Badminton",
        "Running",
        "Yoga",
        "Sleep",
        "Healthy Eating"
    ],

    Growth: [
        "Discipline",
        "Goals",
        "Confidence",
        "Time Management",
        "Journaling"
    ]

};


/* ---------- RENDER INTERESTS ---------- */

function renderInterests(search = "") {

    interestContainer.innerHTML = "";

    const query =
        search.trim().toLowerCase();


    for (const category in interestsData) {

        const filtered =
            interestsData[category].filter(item =>
                item.toLowerCase().includes(query)
            );


        if (filtered.length === 0) {
            continue;
        }


        const title =
            document.createElement("h3");

        title.textContent = category;

        interestContainer.appendChild(title);


        const cards =
            document.createElement("div");

        cards.className = "cards";


        filtered.forEach(item => {

            const card =
                document.createElement("div");

            card.className = "card";

            card.textContent = item;


            if (
                user.interests.includes(item)
            ) {

                card.classList.add("selected");

            }


            card.addEventListener("click", () => {

                toggleInterest(item, card);

            });


            cards.appendChild(card);

        });


        interestContainer.appendChild(cards);

    }


    updateSelectedCount();

}


/* ---------- SELECT / UNSELECT ---------- */

function toggleInterest(item, card) {

    if (user.interests.includes(item)) {

        user.interests =
            user.interests.filter(
                interest => interest !== item
            );

        card.classList.remove("selected");

    } else {

        user.interests.push(item);

        user.interests =
            [...new Set(user.interests)];

        card.classList.add("selected");

    }


    saveUser();

    updateSelectedCount();

}


/* ---------- COUNTER ---------- */

function updateSelectedCount() {

    if (!selectedCount) return;

    selectedCount.textContent =
        `Selected: ${user.interests.length}`;

}


/* ---------- SEARCH ---------- */

if (searchInput) {

    searchInput.addEventListener(
        "input",
        () => {

            renderInterests(
                searchInput.value
            );

        }
    );

}


/* ---------- CONTINUE ---------- */

if (continueBtn) {

    continueBtn.addEventListener(
        "click",
        () => {

            if (user.interests.length < 5) {

                alert(
                    "Choose at least 5 interests 🌱"
                );

                return;

            }


            saveUser();

            renderInterests();

            openScreen(Screens.home);

            setActiveNav(
                document.getElementById("homeNav")
            );


            if (
                typeof createHabits === "function"
            ) {

                createHabits();

            }

        }
    );

}


/* ---------- INITIAL RENDER ---------- */

renderInterests();
