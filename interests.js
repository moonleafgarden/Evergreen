/* ===========================
   INTERESTS
=========================== */

let selectedInterests =
load("selectedInterests", []);

function updateSelectedCount(){

    const counter =
    document.getElementById("selectedCount");

    if(counter){

        counter.textContent =
        Selected: ${selectedInterests.length};

    }

}

function initInterests(){

    const cards =
    document.querySelectorAll(".card");

    cards.forEach(card=>{

        const name =
        card.textContent.trim();

        if(selectedInterests.includes(name)){

            card.classList.add("selected");

        }

        card.onclick = ()=>{

            card.classList.toggle("selected");

            if(selectedInterests.includes(name)){

                selectedInterests =
                selectedInterests.filter(i=>i!==name);

            }else{

                selectedInterests.push(name);

            }

            save(
                "selectedInterests",
                selectedInterests
            );

            updateSelectedCount();

        };

    });

    updateSelectedCount();

}
