console.log("Evergreen garden.js loaded");

/* =========================================
   GARDEN DATA
========================================= */

const plantTypes = {

    flower: {
        name: "Flower",
        emoji: "🌸",
        stages: ["🌱", "🌿", "🌷", "🌸"],
        price: 20,
        reward: 15
    },

    tree: {
        name: "Tree",
        emoji: "🌳",
        stages: ["🌱", "🌿", "🌲", "🌳"],
        price: 50,
        reward: 35
    },

    mushroom: {
        name: "Mushroom",
        emoji: "🍄",
        stages: ["🌱", "🌿", "🍄", "🍄"],
        price: 15,
        reward: 12
    }
};


/* =========================================
   GARDEN STORAGE
========================================= */

function getGarden() {

    if (!user.garden) {

        user.garden = [
            null,
            null,
            null,
            null,
            null,
            null
        ];

        saveUser();
    }

    return user.garden;
}


/* =========================================
   PLANT
========================================= */

function plantSeed(plotIndex, plantType) {

    const garden =
        getGarden();

    const plant =
        plantTypes[plantType];

    if (!plant) return;

    if (garden[plotIndex]) {

        alert("This plot already has a plant 🌱");
        return;
    }

    if (user.coins < plant.price) {

        alert("You don't have enough coins 🪙");
        return;
    }

    user.coins -= plant.price;

    garden[plotIndex] = {

        type: plantType,

        stage: 0,

        water: 0,

        lastWatered: null,

        harvested: false

    };

    saveUser();

    renderGarden();

}


/* =========================================
   WATER
========================================= */

function waterPlant(plotIndex) {

    const garden =
        getGarden();

    const plant =
        garden[plotIndex];

    if (!plant) return;

    if (plant.stage >= 3) {

        alert("This plant is already fully grown 🌸");
        return;
    }

    plant.water++;

    plant.lastWatered =
        Date.now();

    /*
       Every 2 waters = one growth stage
    */

    if (plant.water % 2 === 0) {

        plant.stage++;

        if (plant.stage > 3) {
            plant.stage = 3;
        }

    }

    saveUser();

    renderGarden();

}


/* =========================================
   HARVEST
========================================= */

function harvestPlant(plotIndex) {

    const garden =
        getGarden();

    const plant =
        garden[plotIndex];

    if (!plant) return;

    const type =
        plantTypes[plant.type];

    if (plant.stage < 3) {

        alert("Your plant is not fully grown yet 🌱");
        return;
    }

    user.coins += type.reward;

    user.xp += 15;

    garden[plotIndex] = null;

    saveUser();

    renderGarden();

    if (
        typeof updateProfile ===
        "function"
    ) {
        updateProfile();
    }

    if (
        typeof updateStatistics ===
        "function"
    ) {
        updateStatistics();
    }

    alert(
        `You harvested ${type.name}! +${type.reward} 🪙`
    );

}


/* =========================================
   RENDER GARDEN
========================================= */

function renderGarden() {

    const gardenCard =
        document.querySelector(".garden-card");

    if (!gardenCard) return;

    const tree =
        document.getElementById("treeEmoji");

    const garden =
        getGarden();


    /*
       If there are no plants,
       keep the original tree.
    */

    if (
        garden.every(
            plant => plant === null
        )
    ) {

        if (tree) {
            tree.textContent = "🌱";
        }

        return;
    }


    /*
       Show number of grown plants
    */

    const grown =
        garden.filter(
            plant =>
                plant &&
                plant.stage >= 3
        ).length;


    if (tree) {

        if (grown === 0) {
            tree.textContent = "🌱";
        }

        else if (grown < 3) {
            tree.textContent = "🌿";
        }

        else if (grown < 6) {
            tree.textContent = "🌳";
        }

        else {
            tree.textContent = "🌸";
        }

    }


    /*
       Update coins
    */

    const coins =
        document.getElementById("coins");

    if (coins) {
        coins.textContent =
            user.coins;
    }


    /*
       Update garden actions
    */

    garden.forEach(
        (plant, index) => {

            if (!plant) return;

            console.log(
                `Plot ${index}:`,
                plant
            );

        }
    );

}


/* =========================================
   CREATE SIMPLE PLANT BUTTONS
========================================= */

function setupGardenButtons() {

    const gardenCard =
        document.querySelector(".garden-card");

    if (!gardenCard) return;


    /*
       Don't create them twice.
    */

    if (
        document.getElementById(
            "gardenPlantButtons"
        )
    ) {
        return;
    }


    const container =
        document.createElement("div");

    container.id =
        "gardenPlantButtons";

    container.style.display =
        "grid";

    container.style.gridTemplateColumns =
        "repeat(2, 1fr)";

    container.style.gap =
        "10px";

    container.style.marginTop =
        "20px";


    for (
        let i = 0;
        i < 6;
        i++
    ) {

        const button =
            document.createElement("button");

        button.className =
            "plot-action";

        button.textContent =
            `🌱 Plot ${i + 1}`;

        button.onclick =
            () => {

                openPlantMenu(i);

            };

        container.appendChild(
            button
        );

    }


    gardenCard.appendChild(
        container
    );

}


/* =========================================
   PLANT MENU
========================================= */

function openPlantMenu(plotIndex) {

    const garden =
        getGarden();

    const existing =
        garden[plotIndex];


    if (existing) {

        const type =
            plantTypes[existing.type];

        if (
            existing.stage >= 3
        ) {

            harvestPlant(
                plotIndex
            );

        } else {

            waterPlant(
                plotIndex
            );

        }

        return;
    }


    const choice =
        prompt(
            "Choose a plant:\n\n" +
            "flower — 🌸 20 coins\n" +
            "tree — 🌳 50 coins\n" +
            "mushroom — 🍄 15 coins"
        );


    if (!choice) return;


    const type =
        choice.trim().toLowerCase();


    if (
        !plantTypes[type]
    ) {

        alert(
            "Unknown plant 🌱"
        );

        return;
    }


    plantSeed(
        plotIndex,
        type
    );

}


/* =========================================
   START GARDEN
========================================= */

function startGarden() {

    getGarden();

    setupGardenButtons();

    renderGarden();

}


/* =========================================
   START
========================================= */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        startGarden
    );

} else {

    startGarden();

}
