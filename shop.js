console.log("Evergreen shop.js loaded");


function updateShop() {

    const coins =
        document.getElementById("shopCoins");

    if (coins) {
        coins.textContent =
            user.coins;
    }

}


window.addEventListener(
    "load",
    updateShop
);
