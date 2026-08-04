/* ===========================
   STORAGE
=========================== */

const Storage = {

    get(key, defaultValue) {

        const value = localStorage.getItem(key);

        return value ? JSON.parse(value) : defaultValue;

    },

    set(key, value) {

        localStorage.setItem(key, JSON.stringify(value));

    }

};

/* ---------- USER DATA ---------- */

let user = {

    interests: Storage.get("interests", []),

    completed: Storage.get("completed", []),

    coins: Storage.get("coins", 0),

    xp: Storage.get("xp", 0),

    level: Storage.get("level", 1),

    streak: Storage.get("streak", 0),

    decorations: Storage.get("decorations", []),

    lastVisit: Storage.get("lastVisit", "")

};

function saveUser() {

    Storage.set("interests", user.interests);

    Storage.set("completed", user.completed);

    Storage.set("coins", user.coins);

    Storage.set("xp", user.xp);

    Storage.set("level", user.level);

    Storage.set("streak", user.streak);

    Storage.set("decorations", user.decorations);

    Storage.set("lastVisit", user.lastVisit);

}
