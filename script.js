continueBtn.addEventListener("click",()=>{


    if(selectedInterests.length < 5){

        alert("Choose at least 5 interests 🌱");

        return;

    }


    interestsScreen.classList.remove("active");

    homeScreen.classList.add("active");


});
