console.log("Evergreen garden.js loaded");

/* =========================================
   PLANT DATA
========================================= */

const plantTypes = {

    flower: {
        name: "Flower",
        emoji: "🌸",
        stages: ["🌱", "🌿", "🌷", "🌸"],
        price: 20,
        reward: 15,
        growth: 25
    },

    mushroom: {
        name: "Mushroom",
        emoji: "🍄",
        stages: ["🌱", "🌿", "🍄", "🍄"],
        price: 15,
        reward: 12,
        growth: 25
    },

    tree: {
        name: "Tree",
        emoji: "🌳",
        stages: ["🌱", "🌿", "🌲", "🌳"],
        price: 50,
        reward: 35,
        growth: 25
    }

};


/* =========================================
   GARDEN DATA
========================================= */

function getGarden() {

    if (!Array.isArray(user.garden)) {

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
   CREATE GARDEN
========================================= */

function createGarden() {

    const gardenArea =
        document.querySelector(".garden-area");

    if (!gardenArea) return;

    gardenArea.innerHTML = "";

    const garden =
        getGarden();


    garden.forEach((plant, index) => {

        const plot =
            document.createElement("div");

        plot.className =
            "garden-plot";


        /* =========================
           EMPTY PLOT
        ========================= */

        if (!plant) {

            plot.innerHTML = `

                <div class="plot-empty">
                    🌱
                </div>

                <h3 class="plot-title">
                    Empty Plot
                </h3>

                <button
                    class="plot-action"
                    type="button"
                >
                    🌱 Plant
                </button>

            `;


            const button =
                plot.querySelector(
                    ".plot-action"
                );


            button.onclick = () => {

                openSeedMenu(index);

            };


            gardenArea.appendChild(plot);

            return;

        }


        /* =========================
           PLANT
        ========================= */

        const type =
            plantTypes[plant.type];


        if (!type) {

            garden[index] = null;

            saveUser();

            return;

        }


        const growth =
            Math.min(
                plant.growth || 0,
                100
            );


        const stage =
            Math.min(
                Math.floor(
                    growth / 25
                ),
                3
            );


        const mature =
            growth >= 100;


        if (mature) {

            plot.classList.add(
                "mature"
            );

        }


        if (
            !mature &&
            plant.needsWater
        ) {

            plot.classList.add(
                "needs-water"
            );

        }


        plot.innerHTML = `

            <div class="garden-plant">

                <div class="plant-emoji">
                    ${type.stages[stage]}
                </div>

                <div class="plant-name">
                    ${type.name}
                </div>

                <div class="plant-growth">

                    <div
                        class="plant-growth-fill"
                        style="width:${growth}%"
                    ></div>

                </div>

                <div class="plant-status">

                    ${
                        mature
                        ? "🌸 Ready to harvest!"
                        : plant.needsWater
                            ? "💧 Needs water"
                            : `Growing — ${growth}%`
                    }

                </div>

                <div class="plant-actions">

                    ${
                        mature

                        ? `
                            <button
                                class="plant-btn harvest-btn"
                                type="button"
                            >
                                ✂️ Harvest
                            </button>
                        `

                        : `
                            <button
                                class="plant-btn water-btn"
                                type="button"
                            >
                                💧 Water
                            </button>

                            <button
                                class="plant-btn"
                                type="button"
                            >
                                🌱 Care
                            </button>
                        `
                    }

                </div>

            </div>

        `;


        /* =========================
           WATER
        ========================= */

        const waterButton =
            plot.querySelector(
                ".water-btn"
            );


        if (waterButton) {

            waterButton.onclick =
                () => {

                    waterPlant(index);

                };

        }


        /* =========================
           HARVEST
        ========================= */

        const harvestButton =
            plot.querySelector(
                ".harvest-btn"
            );


        if (harvestButton) {

            harvestButton.onclick =
                () => {

                    harvestPlant(index);

                };

        }


        gardenArea.appendChild(plot);

    });


    updateGardenCoins();

}


/* =========================================
   SEED MENU
========================================= */

function openSeedMenu(plotIndex) {

    const oldMenu =
        document.getElementById(
            "plantMenu"
        );


    if (oldMenu) {

        oldMenu.remove();

    }


    const menu =
        document.createElement("div");


    menu.id =
        "plantMenu";


    menu.className =
        "plant-menu";


    menu.innerHTML = `

        <div class="plant-menu-box">

            <button
                class="plant-menu-close"
                type="button"
                id="closePlantMenu"
            >
                ×
            </button>

            <h2>
                🌱 Choose a Seed
            </h2>

            <p>
                What would you like to grow?
            </p>

            <div class="seed-options">


                <button
                    class="seed-option"
                    type="button"
                    data-seed="flower"
                >

                    <span class="seed-icon">
                        🌸
                    </span>

                    <strong>
                        Flower
                    </strong>

                    <small>
                        20 🪙
                    </small>

                </button>


                <button
                    class="seed-option"
                    type="button"
                    data-seed="mushroom"
                >

                    <span class="seed-icon">
                        🍄
                    </span>

                    <strong>
                        Mushroom
                    </strong>

                    <small>
                        15 🪙
                    </small>

                </button>


                <button
                    class="seed-option"
                    type="button"
                    data-seed="tree"
                >

                    <span class="seed-icon">
                        🌳
                    </span>

                    <strong>
                        Tree
                    </strong>

                    <small>
                        50 🪙
                    </small>

                </button>


            </div>

        </div>

    `;


    document.body.appendChild(menu);


    const closeButton =
        document.getElementById(
            "closePlantMenu"
        );


    closeButton.onclick =
        () => {

            menu.remove();

        };


    menu
        .querySelectorAll(
            ".seed-option"
        )
        .forEach(button => {

            button.onclick =
                () => {

                    const type =
                        button.dataset.seed;


                    menu.remove();


                    plantSeed(
                        plotIndex,
                        type
                    );

                };

        });

}


/* =========================================
   PLANT SEED
========================================= */

function plantSeed(
    plotIndex,
    typeName
) {

    const garden =
        getGarden();


    const type =
        plantTypes[typeName];


    if (!type) return;


    if (garden[plotIndex]) {

        alert(
            "This plot already has a plant 🌱"
        );

        return;

    }


    if (
        user.coins <
        type.price
    ) {

        alert(
            `You need ${type.price} 🪙`
        );

        return;

    }


    user.coins -=
        type.price;


    garden[plotIndex] = {

        type: typeName,

        growth: 0,

        needsWater: true,

        waterCount: 0,

        lastWatered: null

    };


    saveUser();


    createGarden();

}


/* =========================================
   WATER PLANT
========================================= */

function waterPlant(
    plotIndex
) {

    const garden =
        getGarden();


    const plant =
        garden[plotIndex];


    if (!plant) return;


    if (
        plant.growth >= 100
    ) {

        return;

    }


    if (
        !plant.needsWater
    ) {

        alert(
            "This plant doesn't need water yet 💧"
        );

        return;

    }


    plant.needsWater =
        false;


    plant.waterCount =
        (plant.waterCount || 0) + 1;


    plant.growth =
        Math.min(
            (plant.growth || 0) + 25,
            100
        );


    plant.lastWatered =
        Date.now();


    /*
       If it isn't fully grown,
       it will need water again.
    */

    if (
        plant.growth < 100
    ) {

        plant.needsWater =
            true;

    }


    saveUser();


    createGarden();


    updateGardenCoins();

}


/* =========================================
   CARE
========================================= */

function carePlant(
    plotIndex
) {

    const garden =
        getGarden();


    const plant =
        garden[plotIndex];


    if (!plant) return;


    if (
        plant.growth >= 100
    ) {

        return;

    }


    alert(
        "🌱 Your plant looks healthy!"
    );

}


/* =========================================
   HARVEST
========================================= */

function harvestPlant(
    plotIndex
) {

    const garden =
        getGarden();


    const plant =
        garden[plotIndex];


    if (!plant) return;


    if (
        plant.growth < 100
    ) {

        alert(
            "The plant is still growing 🌱"
        );

        return;

    }


    const type =
        plantTypes[plant.type];


    user.coins +=
        type.reward;


    user.xp +=
        15;


    garden[plotIndex] =
        null;


    saveUser();


    createGarden();


    updateGardenCoins();


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
        `🌸 ${type.name} harvested!\n\n+${type.reward} 🪙\n+15 XP ⭐`
    );

}


/* =========================================
   COINS
========================================= */

function updateGardenCoins() {

    const coins =
        document.getElementById(
            "coins"
        );


    if (coins) {

        coins.textContent =
            user.coins;

    }


    const coinCount =
        document.getElementById(
            "coinCount"
        );


    if (coinCount) {

        coinCount.textContent =
            user.coins;

    }

}


/* =========================================
   START GARDEN
========================================= */

function startGarden() {

    console.log(
        "🌱 Starting Evergreen Garden"
    );


    if (
        typeof user ===
        "undefined"
    ) {

        console.error(
            "❌ User not found"
        );

        return;

    }


    getGarden();

    createGarden();

}


/* =========================================
   PAGE LOAD
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
