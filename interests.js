console.log("Evergreen interests.js loaded");

const interestContainer =
    document.getElementById(
        "interestContainer"
    );

const selectedCount =
    document.getElementById(
        "selectedCount"
    );

const searchInput =
    document.getElementById("search");


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


function renderInterests(search) {

    if (!interestContainer) {
        return;
    }

    interestContainer.innerHTML = "";

    const query =
        (search || "")
            .trim()
            .toLowerCase();


    for (
        const category in interestsData
    ) {

        const filtered =
            interestsData[category].filter(
                item =>
                    item
                        .toLowerCase()
                        .includes(query)
            );


        if (filtered.length === 0) {
            continue;
        }


        const title =
            document.createElement("h3");

        title.textContent =
            category;

        interestContainer.appendChild(
            title
        );


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
                card.classList.add(
                    "selected"
                );
            }


            card.onclick =
                function () {

                    toggleInterest(
                        item,
                        card
                    );

                };


            cards.appendChild(card);

        });


        interestContainer.appendChild(
            cards
        );

    }


    updateSelectedCount();

}


function toggleInterest(
    item,
    card
) {

    if (
        user.interests.includes(item)
    ) {

        user.interests =
            user.interests.filter(
                interest =>
                    interest !== item
            );

        card.classList.remove(
            "selected"
        );

    } else {

        user.interests.push(item);

        card.classList.add(
            "selected"
        );

    }


    saveUser();

    updateSelectedCount();

}


function updateSelectedCount() {

    if (!selectedCount) {
        return;
    }

    selectedCount.textContent =
        "Selected: " +
        user.interests.length;
}


if (searchInput) {

    searchInput.addEventListener(
        "input",
        function () {

            renderInterests(
                searchInput.value
            );

        }
    );

}


renderInterests();
