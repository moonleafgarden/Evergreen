// Select all buttons
const buttons = document.querySelectorAll(".done-btn");

// Progress
let completed = 0;
const total = buttons.length;

const progressText = document.querySelector(".progress p");
const progressFill = document.querySelector(".progress-fill");

// Update progress
function updateProgress() {

    progressText.textContent = `${completed} / ${total} completed`;

    progressFill.style.width = `${(completed / total) * 100}%`;

}

// Button click
buttons.forEach(button => {

    button.addEventListener("click", () => {

        if(button.classList.contains("finished")) return;

        button.classList.add("finished");

        button.textContent = "Completed";

        completed++;

        updateProgress();

    });

});

// Start
updateProgress();
