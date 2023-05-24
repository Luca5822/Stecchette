let sticks = document.getElementsByClassName("stick");
for (let i = 0; i < sticks.length; i++) {
    sticks[i].addEventListener("click", function () {
        stecchettaClick(this);
    });
}

function stecchettaClick(stecchetta) {
    console.log(stecchetta);
    if (!stecchetta.classList.contains("del")) {
        console.log("del");
        stecchetta.classList.add("del");
    }
}

document.getElementById("reset-button").addEventListener("click", function () {
    let sticks = document.getElementsByClassName("stick");
    for (let i = 0; i < sticks.length; i++) {
        sticks[i].classList.remove("del");
    }
});
