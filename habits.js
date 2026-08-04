/* ===========================
   HABITS
=========================== */

let doneHabits =
load("doneHabits", []);

let xp =
load("xp", 0);

let coins =
load("coins", 0);

function createHabits(){

    const container =
    document.getElementById("habitContainer");

    if(!container) return;

    container.innerHTML = "";

    selectedInterests.forEach(item=>{

        const habit =
        document.createElement("div");

        habit.className = "habit";

        habit.innerHTML = 
        <span>${item}</span>
        <button class="done-btn">
        ${doneHabits.includes(item)
        ? "Completed ✓"
        : "Done"}
        </button>
        ;

        const btn =
        habit.querySelector(".done-btn");

        if(doneHabits.includes(item)){

            btn.classList.add("finished");

        }

        btn.onclick = ()=>{

            if(doneHabits.includes(item))
            return;

            doneHabits.push(item);

            xp += 10;
            coins += 5;

            save(
                "doneHabits",
                doneHabits
            );

            save("xp", xp);
            save("coins", coins);

            btn.textContent =
            "Completed ✓";

            btn.classList.add("finished");

        };

        container.appendChild(habit);

    });

}
