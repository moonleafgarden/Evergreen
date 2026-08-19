console.log("Evergreen garden.js loaded");

/* =========================================
   PLANTS
========================================= */

const plantTypes = {

    flower: {
        name: "Flower",
        emoji: "🌸",
        stages: ["🌱", "🌿", "🌷", "🌸"],
        price: 20,
        reward: 15
    },

    mushroom: {
        name: "Mushroom",
        emoji: "🍄",
        stages: ["🌱", "🌿", "🍄", "🍄"],
        price: 15,
        reward: 12
    },

    tree: {
        name: "Tree",
        emoji: "🌳",
        stages: ["🌱", "🌿", "🌲", "🌳"],
        price: 50,
        reward: 35
    }

};


/* =========================================
   GARDEN DATA
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
   PLANT SEED
========================================= */

function plantSeed(plotIndex, type) {

    const garden = getGarden();
    const plant = plantTypes[type];

    if (!plant) return;


    if (garden[plotIndex]) {

        alert("This plot already has a plant 🌱");
        return;

    }


    if (user.coins < plant.price) {

        alert(
            `You need ${plant.price} 🪙`
        );

        return;

    }


    user.coins -= plant.price;


    garden[plotIndex] = {

        type: type,

        stage: 0,

        water: 0

    };


    saveUser();

    renderGarden();

}


/* =========================================
   WATER
========================================= */

function waterPlant(plotIndex) {

    const garden = getGarden();
    const plant = garden[plotIndex];

    if (!plant) return;


    if (plant.stage >= 3) {

        harvestPlant(plotIndex);

        return;

    }


    plant.water++;


    if (plant.water % 2 === 0) {

        plant.stage++;

    }


    if (plant.stage > 3) {

        plant.stage = 3;

    }


    saveUser();

    renderGarden();

}


/* =========================================
   HARVEST
========================================= */

function harvestPlant(plotIndex) {

    const garden = getGarden();
    const plant = garden[plotIndex];

    if (!plant) return;


    if (plant.stage < 3) {

        alert(
            "The plant is still growing 🌱"
        );

        return;

    }


    const type =
        plantTypes[plant.type];


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
        `🌸 ${type.name} harvested!\n+${type.reward} 🪙`
    );

}


/* =========================================
   PLANT MENU
========================================= */

function openPlantMenu(plotIndex) {

    const garden = getGarden();
    const existing = garden[plotIndex];


    /* Existing plant */

    if (existing) {

        if (existing.stage >= 3) {

            harvestPlant(plotIndex);

        } else {

            waterPlant(plotIndex);

        }

        return;

    }


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
                id="closePlantMenu"
            >
                ×
            </button>

            <h2>🌱 Choose a Seed</h2>

            <p>
                What would you like to grow?
            </p>


            <div class="seed-options">


                <button
                    class="seed-option"
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


    document
        .getElementById(
            "closePlantMenu"
        )
        .onclick = () => {

            menu.remove();

        };


    menu
        .querySelectorAll(
            ".seed-option"
        )
        .forEach(button => {

            button.onclick = () => {

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
   RENDER GARDEN
========================================= */

function renderGarden() {

    const garden = getGarden();

    const tree =
        document.getElementById(
            "treeEmoji"
        );


    if (tree) {

        const plants =
            garden.filter(
                plant => plant !== null
            );


        if (plants.length === 0) {

            tree.textContent = "🌱";

        } else {

            const mature =
                plants.filter(
                    plant =>
                        plant.stage >= 3
                ).length;


            if (mature >= 5) {

                tree.textContent = "🌸";

            } else if (mature >= 3) {

                tree.textContent = "🌳";

            } else {

                tree.textContent = "🌿";

            }

        }

    }


    const coins =
        document.getElementById("coins");


    if (coins) {

        coins.textContent =
            user.coins;

    }

}


/* =========================================
   CREATE PLOTS
========================================= */

function createGardenPlots() {

    const gardenCard =
        document.querySelector(
            ".garden-card"
        );


    if (!gardenCard) {

        console.error(
            "❌ .garden-card not found"
        );

        return;

    }


    let plots =
        document.getElementById(
            "gardenPlots"
        );


    if (plots) return;


    plots =
        document.createElement("div");


    plots.id =
        "gardenPlots";


    plots.className =
        "garden-plots";


    for (
        let i = 0;
        i < 6;
        i++
    ) {

        const button =
            document.createElement(
                "button"
            );


        button.className =
            "garden-plot";


        button.textContent =
            "🌱";


        button.type =
            "button";


        button.onclick =
            () => {

                updatePlotButton(
                    button,
                    i
                );

                openPlantMenu(i);

            };


        plots.appendChild(button);

    }


    gardenCard.appendChild(plots);


    updateAllPlotButtons();

}


/* =========================================
   UPDATE ONE PLOT
========================================= */

function updatePlotButton(
    button,
    index
) {

    const garden =
        getGarden();

    const plant =
        garden[index];


    if (!plant) {

        button.textContent =
            "🌱";

        return;

    }


    const type =
        plantTypes[
            plant.type
        ];


    button.textContent =
        type.stages[
            plant.stage
        ];

}


/* =========================================
   UPDATE ALL PLOTS
========================================= */

function updateAllPlotButtons() {

    const plots =
        document.querySelectorAll(
            ".garden-plot"
        );


    plots.forEach(
        (button, index) => {

            updatePlotButton(
                button,
                index
            );

        }
    );

}


/* =========================================
   START GARDEN
========================================= */

function startGarden() {

    console.log(
        "🌱 Starting Garden..."
    );


    if (
        typeof user ===
        "undefined"
    ) {

        console.error(
            "❌ User is not available"
        );

        return;

    }


    getGarden();

    createGardenPlots();

    renderGarden();

}


/* =========================================
   START AFTER HTML
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
